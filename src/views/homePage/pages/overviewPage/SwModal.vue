<template>
  <div>
    <ol-overlay :position="info.coords" :offset="info.offset" category="clickLabel" ref="test">
      <div class="map-modal1">
        <div class="map-header">
          <span class="cl"
            >{{ info.data.name }}:<span>{{ realWater ? realWater + "m" : "" }}</span></span
          >
          <img src="../../../../assets/gb.png" @click="mapClick" />
        </div>
        <div class="process-item">
          <suc-date-picker v-model="date" :options="{ type: 'datetimerange', size: 'large' }" @on-change="getDate" style="width: 340px; margin-right: 10px"></suc-date-picker>
          <suc-button type="primary" :debounce="800" :config="{ size: 'large' }" @on-click="getInfo">搜索</suc-button>
          <div style="padding-left:15px;">
            <suc-button type="primary" :debounce="400" :config="{ ghost: true, size: 'large' }" @on-click="onExport">导出</suc-button>
          </div>
          <span class="icon" v-if="iconFlag" @click="onChangeIcon"> <i class="el-icon-s-fold iconsize"></i></span>
          <span class="icon" v-else @click="onChangeTableIcon"> <i class="el-icon-s-data iconsize"></i></span>
        </div>
        <div class="swTitle">
          <span>水位最高: {{ rainObject.tFcShuiweihistoryMax.jssw || "--" }} 时间:{{ zgswTime || "--" }}</span
          ><span>水位最低:{{ rainObject.tFcShuiweihistoryMin.jssw || "--" }} 时间:{{ zdswTime || "--" }}</span>
        </div>
        <div class="map-body">
          <div style="height: 550px;width:100%;overflow:hidden;" v-if="iconFlag">
            <div style="position:absolute;right:20px;top:130px">
              <el-checkbox v-model="checked" @change="onChangCheckStatus"><span style="color:green;font-weight:600;font-size:15px">警戒水位</span> </el-checkbox>
            </div>
            <v-chart :options="options" :autoresize="true" style="width: 100%;height: 100%;	"></v-chart>
          </div>
          <div style="height: 550px;width:100%;" v-else>
            <table-component :customHeight="customHeight" :columns="columns" :tableData="tableData"></table-component>
          </div>
        </div>
      </div>
    </ol-overlay>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { SucSelect, SucButton, SucInput, SucFormItem, SucDatePicker, SucModal } from "@suc/ui";
import { overview, networkApi, publicApi } from "@/api";
import { TableComponent } from "@/components";
const columns = [
  {
    title: "实时水位(m)",
    key: "jssw",
    width: 550,
  },
  {
    title: "发生时间",
    key: "jssj",
    width: 550,
  },
];
@Component({
  components: {
    SucButton,
    SucDatePicker,
    SucModal,
    TableComponent,
  },
})
export default class OverView extends Vue {
  @Prop() info: any;
  tableData: Array<any> = [];
  // date: any = [new Date(new Date(new Date().getTime() - 24 * 60 * 60 * 1000).setHours(8, 0, 0, 0)), new Date()];
  date: any = [];
  iconFlag: boolean = true;
  columns: Array<any> = columns;
  customHeight: any = 500;
  zgswTime: any = ""; //最高水位发生时间
  zdswTime: any = ""; //最低水位发生时间

  // 雨量站参数
  sWLineParam: any = {
    stcd: "",
    startTime: "",
    endTime: "",
  };
  color: any[] = ["#5f77ec", "#5397ff", "#58dde0", "#feb543"];

  options: any = {
    color: this.color,
    title: {
      show: true,
      text: "",
      x: "right",
      y: "top",
      textStyle: {
        // 主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
        fontFamily: "Arial",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "normal",
        color: "#999",
      },
    },
    tooltip: {
      trigger: "axis",
    },
    grid: {
      top: "15%",
      right: "2%",
      // left:'1%',
      bottom: "18%",
      // left: "3%",
      containLable: true,
    },

    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
      axisLabel: {
        // rotate: -30,
        // show:true,
        color: "#666",
        // interval:1
        fontSize: "16",
      },
      interval: 0,
      splitLine: {
        show: false,
      },
      data: [],
    },
    yAxis: {
      name: "水\n位\n(m)",
      min: 0,
      max: 10,
      nameLocation: "left",
      nameTextStyle: {
        color: "#999",
        fontSize: 15,
        padding: [0, 120, 0, 0],
      },
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
      splitLine: {
        color: "#999",
      },
      axisLabel: {
        textStyle: {
          show: true,
          fontSize: "16",
          color: "#666",
        },
      },
    },
    series: [
      {
        name: "水位变化",
        type: "line",
        lineStyle: {},
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#5397ff", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(83,151,255,0.2)", // 100% 处的颜色
              },
            ],
          },
        },
        markPoint: {
          data: [
            { type: "max", name: "Max" },
            { type: "min", name: "Min" },
          ],
        },
        markLine: {
          silent: true,
          symbol: "none",
          data: [
            {
              yAxis: "",
              lineStyle: {
                type: "solid",
                color: "#eb4e3c",
              },
              label: {
                position: "insideMiddleTop",
                color: "#eb4e3c",
                // backgroundColor: "#eb4e3c",
                padding: [3, 5, 3, 5],
                formatter: "{b}",
                fontSize: "20",
              },
            },
          ],
        },
        data: [],
      },

      //   {
      //     name: "雨量",
      //     type: "line",
      //     lineStyle: {
      //       color: "#95F204",
      //     },
      //     tooltip: {
      //       trigger: "item",
      //       show: false,
      //     },
      //     data: [],
      //   },
    ],
  };

  getDate(date: any) {
    this.sWLineParam.startTime = date[0];
    this.sWLineParam.endTime = date[1];
  }
  getInfo() {
    this.getLine();
  }

  onChangeIcon() {
    this.iconFlag = false;
  }

  onChangeTableIcon() {
    this.iconFlag = true;
  }

  mapClick() {
    this.$emit("close", false);
  }

  mounted() {
    // 判断当前开始时间是不是早晨8点
    let timeArray = (this.$utils as any).getTodayDate();
    this.date = timeArray;
    console.log(this.date, "????");
    this.getLine();
  }
  // getTodayDate() {
  //   let nowDate = new Date();
  //   let nowEightTime = new Date(nowDate.getTime()).setHours(8, 0, 0, 0);
  //   if (nowDate.getTime() < nowEightTime) {
  //     this.date = [new Date(new Date(new Date().getTime() - 24 * 60 * 60 * 1000).setHours(8, 0, 0, 0)), new Date()];
  //   } else {
  //     this.date = [new Date(new Date().getTime()).setHours(8, 0, 0, 0), new Date()];
  //   }
  // }
  // 导出
  onExport() {
    let url =
      process.env.VUE_APP_BASE +
      "/api/wjServer/fangxunjc/z/export?stcd=" +
      this.sWLineParam.stcd +
      "&startTime=" +
      this.$utils.dateFormat(new Date(this.date[0]), "yyyy-MM-dd HH:mm:ss") +
      "&endTime=" +
      this.$utils.dateFormat(new Date(this.date[1]), "yyyy-MM-dd HH:mm:ss");
    window.location.href = url; //原窗口打开
    // window.open(url); // 重新打开新窗口
  }

  ylzInfoArray: any = [];
  rainObject: any = {
    tFcShuiweihistoryMax: {
      jssw: "",
    },
    tFcShuiweihistoryMin: {
      jssw: "",
    },
  };
  realWater: any = "";
  //水位警戒
  warnZ: any = "";
  // 水位最大
  swYmax: any = "";
  // 水位最小
  swYmin: any = "";
  reverseArray: any = [];

  checked: boolean = false;

  async getLine() {
    this.checked = false;
    this.options.series[0].markLine.data[0].yAxis = "";
    this.sWLineParam.startTime = this.$utils.dateFormat(new Date(this.date[0]), "yyyy-MM-dd HH:mm:ss"); //2022-05-25T00:00:00.000Z
    this.sWLineParam.endTime = this.$utils.dateFormat(new Date(this.date[1]), "yyyy-MM-dd  HH:mm:ss");
    this.sWLineParam.stcd = this.info.data.id;
    let ylzurl = "wjServer/fangxunjc/z/line";
    let data = await publicApi.getWithParam(ylzurl, this.sWLineParam);
    if (data.result) {
      this.options.xAxis.data = [];
      this.options.series[0].data = [];
      this.realWater = data.data.z;
      // this.options.series[0].markLine.data[0].name = "警戒水位：" + (data.data.warnZ || "-") + "m";
      // this.options.series[0].markLine.data[0].yAxis = data.data.warnZ || 0;
      this.warnZ = data.data.warnZ;
      const arr = data.data.tFcShuiweihistories;
      const arr2 = arr.reverse(); //正
      const arr3 = arr.slice().reverse(); //倒
      this.tableData = arr3;
      let maxNumber: any = Math.max.apply(
        Math,
        arr2.map((item: any, index: any) => {
          return item.jssw;
        })
      );
      let minNumber: any = Math.min.apply(
        Math,
        arr2.map((item: any, index: any) => {
          return item.jssw;
        })
      );
      for (let index = 0; index < arr2.length; index++) {
        if (arr2[index].jssw == maxNumber) {
          this.zgswTime = arr2[index].jssj;
          break;
        }
      }
      for (let index = 0; index < arr2.length; index++) {
        if (arr2[index].jssw == minNumber) {
          this.zdswTime = arr2[index].jssj;
          break;
        }
      }
      this.rainObject.tFcShuiweihistoryMax.jssw = data.data.tFcShuiweihistoryMax.jssw; //最高水位
      this.rainObject.tFcShuiweihistoryMin.jssw = data.data.tFcShuiweihistoryMin.jssw; //最低水位
      if (arr.length > 0) {
        arr2.forEach((e: any) => {
          this.options.xAxis.data.push(e.jssj);
          this.options.series[0].data.push(e.jssw);
          // this.options.series[1].data.push(e.maxRain);
        });
        let arr = this.options.series[0].data;
        var max = Math.max(...arr);
        var min = Math.min(...arr);
        this.options.yAxis.max = (max + 0.01).toFixed(2);
        this.options.yAxis.min = (min - 0.01).toFixed(2);
        this.swYmax = this.options.yAxis.max; //水位最大值
        this.swYmin = this.options.yAxis.min; //水位最小值
      }
    }
  }
  //警戒水位是否选择
  onChangCheckStatus() {
    if (this.checked) {
      this.options.series[0].markLine.data[0].name = "警戒水位：" + (this.warnZ || "-") + "m";
      this.options.yAxis.max = Math.max(this.warnZ, this.swYmax);
      if (this.warnZ <= this.swYmin) {
        this.options.yAxis.min = Math.min(this.warnZ, this.swYmin) - 0.01;
      } else {
        this.options.yAxis.min = Math.min(this.warnZ, this.swYmin);
      }
      this.options.series[0].markLine.data[0].yAxis = this.warnZ;
    } else {
      this.options.yAxis.min = this.swYmin;
      this.options.yAxis.max = this.swYmax;
      this.options.series[0].markLine.data[0].yAxis = "";
    }
  }
}
</script>

<style lang="scss" scoped>
$deep: "::v-deep";
.map-modal1 {
  width: auto;
  box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.08);

  .map-header {
    width: auto;
    height: 50px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #002060;
    color: #fff;
    padding: 0 15px;

    img {
      width: 10px;
      height: 10px;
      cursor: pointer;
    }
    .cl {
      color: #f7f40b;
    }
    .detail {
      position: absolute;
      right: 10%;
      cursor: pointer;
    }
  }
  .swTitle {
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
  }
  .process-item {
    padding: 10px 10px;
    display: flex;
    position: relative;
    .icon {
      position: absolute;
      // font-size: 20px;
      right: 20px;
      cursor: pointer;
      .iconsize {
        font-size: 25px;
      }
    }
  }

  .map-body {
    padding: 0 10px;
    height: auto;
    // margin-top: 5%;
    width: 1100px;
    .noData {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    div {
      height: 30px;
      display: flex;
      align-items: center;
      // &:last-child {
      //   justify-content: space-between;
      // }
    }
  }

  .map-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 0;
  }
}
#{$deep}.vueol-overlay {
  width: 1100px;
}
#{$deep}.table-view {
  .el-table {
    width: 1050px;
    overflow: hidden;
    font-size: 18px;
  }
}
</style>
