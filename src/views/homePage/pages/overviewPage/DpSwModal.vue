<template>
  <!-- 大屏水位弹框 -->
  <div>
    <el-dialog :title="title" :visible.sync="model" close-on-click-modal:false :before-close="onCancel" v-if="model">
      <div class="process-item">
        <suc-date-picker v-model="date" :options="{ type: 'datetimerange', size: 'large' }" @on-change="getDate" style="width: 340px; margin-right: 10px"></suc-date-picker>
        <suc-button type="primary" :debounce="800" :config="{ size: 'large' }" @on-click="getInfo">搜索</suc-button>
        <div style="padding-left:15px;">
          <suc-button type="primary" :debounce="800" :config="{ ghost: true, size: 'large',long:true }" @on-click="onExport">导出</suc-button>
        </div>
        <span class="icon" v-if="iconFlag" @click="onChangeIcon"><i class="el-icon-s-fold iconsize"></i></span>
        <span class="icon" v-else @click="onChangeTableIcon"> <i class="el-icon-s-data iconsize"></i></span>
      </div>
      <div class="swTitle">
        <span>水位最高: {{ rainObject.tFcShuiweihistoryMax.jssw || "--" }} 时间:{{ zgswTime || "--" }}</span
        ><span>水位最低:{{ rainObject.tFcShuiweihistoryMin.jssw || "--" }} 时间:{{ zdswTime || "--" }}</span>
      </div>
      <div class="map-body">
        <div class="map-body-item" v-if="iconFlag">
          <div style="position:absolute;top:0;right:0">
            <el-checkbox v-model="checked" @change="onChangCheckStatus"><span class="jjswStyle">警戒水位</span></el-checkbox>
          </div>
          <v-chart :options="options" :autoresize="true" style="width: 100%;height: 100%;	"></v-chart>
        </div>
        <div class="map-body-item" style="padding-top:20px" v-else>
          <table-component :customHeight="customHeight" :columns="columns" :tableData="tableData"></table-component>
        </div>
      </div>
    </el-dialog>
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
export default class CreatePolluters1 extends Vue {
  @Prop() title: string | undefined; //  父组件传子组件的值
  @Prop() model!: boolean; //控制弹框显隐
  @Prop() stcdId!: any; //雨量站编号
  @Prop() info: any;

  tableData: Array<any> = [];
  // date: any = [new Date(new Date(new Date().getTime() - 24 * 60 * 60 * 1000).setHours(8, 0, 0, 0)), new Date()];
  date: any = [];
  iconFlag: boolean = true;
  columns: Array<any> = columns;
  customHeight: any = 500;
  @Watch("stcdId")
  getData() {
    this.getLine();
  }
  // 雨量站参数
  sWLineParam: any = {
    stcd: "",
    startTime: "",
    endTime: "",
  };
  color: any[] = ["#0d7680", "#5397ff", "#58dde0", "#feb543"];

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
      // top: "15%",
      right: "2%",
      // bottom: "18%",
      left: "7%",
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
                color: "#0d7680", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(83,151,255,0.1)", // 100% 处的颜色
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

  @Emit()
  toggle(val: boolean) {
    return val;
  }
  onCancel() {
    this.toggle(false);
  }
  mounted() {
    let timeArray = (this.$utils as any).getTodayDate();
    let a = new Date(timeArray[0]);
    let b = new Date(timeArray[1]);
    this.date = [a, b];
    this.getLine();
  }
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
  jssjMaxArray: any = []; //最高水位发生时间集合
  jssjMinArray: any = []; //最小水位发生时间集合
  zgswTime: any = "";
  zdswTime: any = "";
  async getLine() {
    this.checked = false;
    this.options.series[0].markLine.data[0].yAxis = "";
    this.sWLineParam.startTime = this.$utils.dateFormat(new Date(this.date[0]), "yyyy-MM-dd HH:mm:ss"); //2022-05-25T00:00:00.000Z
    this.sWLineParam.endTime = this.$utils.dateFormat(new Date(this.date[1]), "yyyy-MM-dd  HH:mm:ss");
    this.sWLineParam.stcd = this.stcdId;
    let ylzurl = "wjServer/fangxunjc/z/line";
    let data = await publicApi.getWithParam(ylzurl, this.sWLineParam);
    if (data.result) {
      this.options.xAxis.data = [];
      this.options.series[0].data = [];
      this.realWater = data.data.z;
      // this.options.series[0].markLine.data[0].name = "警戒水位：" + (data.data.warnZ || "-") + "m";
      // this.options.series[0].markLine.data[0].yAxis = data.data.warnZ || 0;
      this.warnZ = data.data.warnZ; //警戒水位
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
::v-deep.el-dialog__wrapper {
  .el-dialog {
    width: 60%;
    .el-dialog__header {
      background-color: #0d7680;
      height: 3rem;
      line-height: 3rem;
      padding: 0;
      .el-dialog__headerbtn {
        top: 0;
        font-size: 18px;
      }
    }
    .el-dialog__title {
      color: #fff;
      padding-left: 1rem;
      line-height: 0;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }
    .el-dialog__footer {
      border-top: 1px solid #e8eaec;
    }
  }
}

.swTitle {
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
}
.process-item {
  // padding: 10px 10px;
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
  height: auto;
  width: 100%;
  position: relative;
  &-item {
    height: 550px;
    width: 100%;
    .jjswStyle {
      color: green;
      font-weight: 600;
      font-size: 15px;
    }
  }

  // div {
  //   height: 30px;
  //   display: flex;
  //   align-items: center;
  //   // &:last-child {
  //   //   justify-content: space-between;
  //   // }
  // }
}

.map-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
}

#{$deep}.suc-button.ivu-btn.ivu-btn-primary {
  color: #fff;
  border-color: #0d7680;
  background: #0d7680;
}
#{$deep}.table-view {
  .el-table {
    font-size: 18px;
  }
}
</style>
