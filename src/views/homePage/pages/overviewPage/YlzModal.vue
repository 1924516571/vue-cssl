<template>
  <div>
    <ol-overlay :position="info.coords" :offset="info.offset" category="clickLabel" ref="test">
      <div class="map-modal1">
        <div class="map-header">
          <span class="cl">{{ info.data.name }}</span>
          <img src="../../../../assets/gb.png" @click="mapClick" />
        </div>
        <div class="process-item">
          <suc-date-picker v-model="date" :options="{ type: 'datetimerange', size: 'large' }" @on-change="getDate" style="width: 340px; margin-right: 10px"></suc-date-picker>
          <suc-button type="primary" :debounce="800" :config="{ size: 'large' }" @on-click="getInfo">搜索</suc-button>
          <div style="padding-left:15px">
            <suc-button type="primary" :debounce="400" :config="{ ghost: true, size: 'large' }" @on-click="onExport">导出</suc-button>
          </div>
          <span class="icon" v-if="iconFlag" @click="onChangeIcon"> <i class="el-icon-s-fold iconsize"></i></span>
          <span class="icon" v-else @click="onChangeTableIcon"> <i class="el-icon-s-data iconsize"></i></span>
        </div>
        <div class="swTitle">
          <span>雨量最大: {{ rainObject.maxRain ? rainObject.maxRain + "mm" : "--" }} 时间:{{ rainObject.maxRainData || "--" }}</span>
          <span>累计雨量:{{ rainObject.grandTotal + "mm" || "--" }}</span>
        </div>
        <div class="map-body">
          <div style="height: 550px;width:100%;overflow:hidden;" v-if="iconFlag">
            <v-chart :options="options1" :autoresize="true" style="width: 100%;height: 100%;	"></v-chart>
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
    title: "累计雨量(mm)",
    key: "maxRain",
    width: 550,
  },
  {
    title: "发生时间",
    key: "date",
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

  // date: any = [new Date(new Date(new Date().getTime()).setHours(8, 0, 0, 0)), new Date()];
  date: any = [];
  iconFlag: boolean = true;

  columns: Array<any> = columns;

  // customHeight: any = document.documentElement.children[1].clientHeight - 240;
  customHeight: any = 500;

  // 雨量站参数
  YlzParam: any = {
    zdbh: "",
    startTime: "",
    endTime: "",
  };
  color: any[] = ["#5f77ec", "#5397ff", "#58dde0", "#feb543"];
  // 雨量直线图
  options1: any = {
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
      boundaryGap: true, //两端留白，默认是true
      max: function(value: any) {
        if (value.max < 5) {
          value.max = 5;
        } else {
          value.max = value.max;
        }
        return value.max;
      },
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
      splitLine: {
        show: false,
      },
      data: [],
    },
    yAxis: {
      name: "雨\n量\n(mm)",
      min: 0,
      max: 10,
      splitNumber: 10,
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
        name: "雨量",
        type: "bar",
        barMinHeight: 2,
        lineStyle: {},
        // barWidth: 30,
        // barGap: "20%",
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
        data: [],
      },
      // {
      //   name: "雨量",
      //   type: "line",
      //   lineStyle: {
      //     color: "#95F204",
      //   },
      //   tooltip: {
      //     trigger: "item",
      //     show: false,
      //   },
      //   data: [],
      // },
    ],
  };

  getDate(date: any) {
    this.YlzParam.startTime = date[0];
    this.YlzParam.endTime = date[1];
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
    this.getLine();
  }

  ylzInfoArray: any = [];
  // 最大雨量和最小雨量
  rainObject: any = {
    maxRain: "",
    maxRainData: "",
    minRain: "",
    minRainData: "",
  };

  async getLine() {
    this.YlzParam.startTime = this.$utils.dateFormat(new Date(this.date[0]), "yyyy-MM-dd HH:mm:ss");
    this.YlzParam.endTime = this.$utils.dateFormat(new Date(this.date[1]), "yyyy-MM-dd HH:mm:ss");
    this.YlzParam.zdbh = this.info.data.id;
    let ylzurl = "wjServer/fangxunjc/yuqing/rainBarPc";
    let data = await publicApi.getWithParam(ylzurl, this.YlzParam);
    if (data.result) {
      this.options1.xAxis.data = [];
      this.options1.series[0].data = [];
      // this.options1.series[1].data = [];
      this.rainObject = {
        maxRain: data.data.maxRain,
        maxRainData: data.data.maxRainData,
        minRain: data.data.minRain,
        minRainData: data.data.minRainData,
        grandTotal: data.data.grandTotal,
      };
      this.ylzInfoArray = data.data.dtos; //图表数据
      /*   this.ylzInfoArray = [
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:00:00",
          maxRain: "0.5",
          maxDate: "",
          dayRain: "",
        },
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:05:00",
          maxRain: "0.3",
          maxDate: "",
          dayRain: "",
        },
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:15:00",
          maxRain: "0.6",
          maxDate: "",
          dayRain: "",
        },
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:20:00",
          maxRain: "0.5",
          maxDate: "",
          dayRain: "",
        },
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:25:00",
          maxRain: "0.3",
          maxDate: "",
          dayRain: "",
        },
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:30:00",
          maxRain: "0.6",
          maxDate: "",
          dayRain: "",
        },
          {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:00:00",
          maxRain: "0.5",
          maxDate: "",
          dayRain: "",
        },
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:05:00",
          maxRain: "0.3",
          maxDate: "",
          dayRain: "",
        },
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:15:00",
          maxRain: "0.6",
          maxDate: "",
          dayRain: "",
        },
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:20:00",
          maxRain: "0.5",
          maxDate: "",
          dayRain: "",
        },
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:25:00",
          maxRain: "0.3",
          maxDate: "",
          dayRain: "",
        },
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:30:00",
          maxRain: "0.6",
          maxDate: "",
          dayRain: "",
        },
          {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:00:00",
          maxRain: "0.5",
          maxDate: "",
          dayRain: "",
        },
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:05:00",
          maxRain: "0.3",
          maxDate: "",
          dayRain: "",
        },
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:15:00",
          maxRain: "0.6",
          maxDate: "",
          dayRain: "",
        },
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:20:00",
          maxRain: "0.5",
          maxDate: "",
          dayRain: "",
        },
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:25:00",
          maxRain: "0.3",
          maxDate: "",
          dayRain: "",
        },
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:30:00",
          maxRain: "0.6",
          maxDate: "",
          dayRain: "",
        },
         {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:25:00",
          maxRain: "0.3",
          maxDate: "",
          dayRain: "",
        },
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:30:00",
          maxRain: "0.6",
          maxDate: "",
          dayRain: "",
        },
         {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:25:00",
          maxRain: "0.3",
          maxDate: "",
          dayRain: "",
        },
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:30:00",
          maxRain: "0.6",
          maxDate: "",
          dayRain: "",
        },
         {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:25:00",
          maxRain: "0.3",
          maxDate: "",
          dayRain: "",
        },
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:30:00",
          maxRain: "0.6",
          maxDate: "",
          dayRain: "",
        },
         {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:25:00",
          maxRain: "0.3",
          maxDate: "",
          dayRain: "",
        },
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:30:00",
          maxRain: "0.6",
          maxDate: "",
          dayRain: "",
        },
         {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:25:00",
          maxRain: "0.3",
          maxDate: "",
          dayRain: "",
        },
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:30:00",
          maxRain: "0.6",
          maxDate: "",
          dayRain: "",
        },
         {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:25:00",
          maxRain: "0.3",
          maxDate: "",
          dayRain: "",
        },
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:30:00",
          maxRain: "0.6",
          maxDate: "",
          dayRain: "",
        },
         {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:25:00",
          maxRain: "0.3",
          maxDate: "",
          dayRain: "",
        },
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:30:00",
          maxRain: "0.6",
          maxDate: "",
          dayRain: "",
        },
         {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:25:00",
          maxRain: "0.3",
          maxDate: "",
          dayRain: "",
        },
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:30:00",
          maxRain: "0.6",
          maxDate: "",
          dayRain: "",
        },
         {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:25:00",
          maxRain: "0.3",
          maxDate: "",
          dayRain: "",
        },
        {
          zdmc: "海洋泾花板塘闸",
          zdbm: "",
          date: "2022-07-19 08:30:00",
          maxRain: "0.6",
          maxDate: "",
          dayRain: "",
        }];
     
      */

      //数组反向
      let reverseArr: any = [];
      this.ylzInfoArray.forEach((element: any) => {
        reverseArr.unshift(element);
      });
      this.tableData = reverseArr;
      this.ylzInfoArray.forEach((e: any) => {
        this.options1.xAxis.data.push(e.date);
        this.options1.series[0].data.push(e.maxRain);
        // this.options1.series[1].data.push(e.maxRain);
      });
      let arr = this.options1.series[0].data;
      let max = Math.max(...arr);
      if (max != 0) {
        this.options1.yAxis.max = max;
      } else {
        this.options1.yAxis.max = 10;
      }
    }
  }

  // 导出
  onExport() {
    let url =
      process.env.VUE_APP_BASE +
      "/api/wjServer/fangxunjc/yuqing/exportRainBarPc?zdbh=" +
      this.YlzParam.zdbh +
      "&startTime=" +
      this.$utils.dateFormat(new Date(this.date[0]), "yyyy-MM-dd HH") +
      "&endTime=" +
      this.$utils.dateFormat(new Date(this.date[1]), "yyyy-MM-dd HH");
    window.location.href = url; //原窗口打开
    // window.open(url); // 重新打开新窗口
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
    display: flex;
    align-items: center;
    font-size: 20px;
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
    // height: auto;
    // margin-top: 5%;
    height: auto;
    margin-top: 3%;
    overflow: hidden;
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
