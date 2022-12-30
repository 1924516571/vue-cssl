<template>
  <!--雨情数据报表-->
  <div class="survey-flood">
    <div class="top-item">
   
      <div class="top-sel">
        <label>时间选择：</label>
        <!-- <suc-date-picker v-model="report.ylks" :options="{ type: 'date', clearable: false }" style="width: 150px"></suc-date-picker>
        <label>至</label> -->
        <suc-date-picker v-model="report.yljs" :options="{ type: 'date', clearable: false }" style="width: 150px"></suc-date-picker>
      </div>
      <div class="top-sel">
        <span style="margin-right:30px">
          <suc-button type="primary" :debounce="800" @on-click="onSearch">查询</suc-button>
        </span>
        <span>
          <suc-button type="primary" :config="{ ghost: true }" :debounce="800" @on-click="exportExcel">导出</suc-button>
        </span>
      </div>
    </div>
    <!-- 内容部分 -->
    <div class="content">
      <div class="bottom scroll">
        <!-- <report :swData="rqData" :sqData="sqData" :bb="chuan"></report> -->
        <div class="river">
          <div class="river-item"></div>
          <div class="river-item">
            <span><v-chart :options="options" :autoresize="true" style="width:100%;height:70%;margin-bottom:5%"></v-chart></span>
            <span><v-chart :options="options1" :autoresize="true" style="width:100%;height:70%;"></v-chart></span>
            <div class="river-item-table">
              <h2 style="text-align:center;margin:20px;">泵站运行记录表</h2>
              <table-no :columns="columns" :tableData="tableData"> </table-no>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { SucInput, SucSelect, SucButton, SucDatePicker } from "@suc/ui";
import { Report } from "./floodPage";
import { TableNo } from "@/components";
import dayjs from "dayjs";
import { publicApi } from "@/api";
@Component({
  components: {
    SucSelect,
    SucInput,
    SucButton,
    SucDatePicker,
    Report,
    TableNo,
  },
})
export default class ReportSelect extends Vue {
  areaOptions: any = []; //区域数据
  get options() {
    return {
      color: ["#5397ff", "#ffab3d", "#36b56e", "#c088ff"],
      title: {
        text: "雨情分析",
        x: "center",
        y: "top",
        textAlign: "center",
        textStyle: {
          fontWeight: "normal",
          color: "#333333",
        },
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: this.rqData.legendData,
        // itemHeight: 7,
        // itemWidth: 6,
        // icon: "rect",
        // orient: "vertical",
        right: 100,
        top: 0,
      },
      grid: {
        //grid 区域是否包含坐标轴的刻度标签
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        // type: "category",
        type: "time",
        boundaryGap: false,
        axisLine: {
          show: false,
          // symbol: "arrow",
          // lineStyle: {
          //   type: "dashed",
          //   // ...
          // },
        },
        axisTick: {
          show: true,
          inside: true,
          interval: 0,
          lineStyle: {
            color: "#acb1b7",
          },
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: "#666",
          rotate: 45,
          formatter: (value: any) => {
            return dayjs(value).format("YYYY-MM-DD");
          },
          // rich:{ //x轴中间间隔
          //    with:50
          // }
        },
      },
      yAxis: {
        type: "value",
        name: "雨量(mm)",
        nameTextStyle: {
          color: "#333",
        },

        axisLine: {
          show: false,
          lineStyle: {
            color: ["#0087ED"],
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          color: "#999",
        },
        axisLabel: {
          color: "#999",
        },
        // scale:true,
        // min: 0,
        // max: 3,
        splitNumber: 15,
        boundaryGap: [0.5, 0.5], //两边留白  boundaryGap:false   两边不留白
      },
      series: this.rqData.seriesData,
    };
  }
  get options1() {
    return {
      color: ["#5397ff", "#ffab3d", "#36b56e", "#c088ff"],
      title: {
        text: "水情分析",
        x: "center",
        y: "top",
        textAlign: "center",
        textStyle: {
          fontWeight: "normal",
          color: "#333333",
        },
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: this.sqData.legendData,
        right: 100,
        top: 0,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "time",
        boundaryGap: false,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: true,
          inside: true,
          interval: 0,
          lineStyle: {
            color: "#acb1b7",
          },
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: "#666",
          rotate: 45,
          formatter: (value: any) => {
            return dayjs(value).format("YYYY-MM-DD");
          },
        },
      },
      yAxis: {
        type: "value",
        name: "水位线(mm)",
        nameTextStyle: {
          color: "#333",
        },

        axisLine: {
          show: false,
          lineStyle: {
            color: ["#0087ED"],
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          color: "#999",
        },
        axisLabel: {
          color: "#999",
        },
        // scale:true,
        // min: 0,
        // max: 3,
        splitNumber: 15,
        boundaryGap: [0.5, 0.5], //两边留白  boundaryGap:false   两边不留白
      },
      series: this.sqData.seriesData,
    };
  }
  tableData: any = [];
  columns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "区域",
      key: "qy",
    },
    {
      title: "站名",
      key: "zd",
    },
    {
      title: "机组",
      key: "jz",
    },
    {
      title: "机组开启时间",
      key: "ontime",
    },
    {
      title: "机组关闭时间",
      key: "offtime",
    },
    {
      title: "泵站运行时间",
      key: "runtime",
    },
    {
      title: "总排水量(m²)",
      key: "totalrain",
    },
    {
      title: "设计流量(m²/s)",
      key: "desigin",
    },
    {
      title: "外排河道",
      key: "outriver",
    },
  ];
  pageParams: any = {
    total: 0,
    current: 1,
    pageSize: 20,
  };
  report: any = {
    yljs: new Date(),
  };

  onloadParams: any = {
    endTime: "",
  };

  rqData: any = {
    legendData: [],
    xAxisData: [],
    seriesData: [],
  };

  sqData: any = {
    legendData: [],
    xAxisData: [],
    seriesData: [],
  };
  mounted() {
    this.getonPageData(); //页面数据
  }

  //  导出表格
  exportExcel() {
    let url =
      process.env.VUE_APP_BASE +
      "/api/wjServer/hs/reportForm/monthFlowStatisticsExport?areaCode=" +
      this.report.areaCode +
      "&formType=" +
      this.report.bbSel +
      "&stationName=" +
      this.report.stationName +
      "&yearMonth=" +
      this.$utils.dateFormat(new Date(this.report.date), "yyyy-MM");
    window.location.href = url; //原窗口打开
    // window.open(url); // 重新打开新窗口
  }


  async getonPageData() {
    this.onloadParams = {
      endTime: this.$utils.dateFormat(new Date(this.report.yljs), "yyyy-MM-dd"),
    };
    this.tableData = [
      {
        qy: "武进",
        zd: "西平牛",
        jz: "泵站M2",
        ontime: "2022-12-55",
        offtime: "2021-12-55",
        runtime: "03:05:06",
        totalrain: "55730",
        desigin: "5",
        outriver: "青龙兵",
      },
      {
        qy: "武进131",
        zd: "西平牛",
        jz: "泵站M2",
        ontime: "2022-12-55",
        offtime: "2021-12-55",
        runtime: "03:05:06",
        totalrain: "55730",
        desigin: "5",
        outriver: "青龙兵",
      },
      {
        qy: "武进水电费水电费",
        zd: "西平牛范围分为",
        jz: "泵站M2",
        ontime: "2022-12-55",
        offtime: "2021-12-55",
        runtime: "03:05:06",
        totalrain: "55730",
        desigin: "5",
        outriver: "青龙兵",
      },
    ];

    // 雨情数据
    const yq = [
      {
        stcd: "HD00001",
        stnm: "小时最大降雨量",
        data: [
          ["2022-02-14", 6],
          ["2022-02-15", 7.589],
          ["2022-02-16", 7.589],
          ["2022-02-17", 7.516],
          ["2022-02-18", 7.477],
          ["2022-02-19", 7.394],
          ["2022-02-20", 7.306],
          ["2022-02-21", 7.176],
          ["2022-02-22", 7.066],
          ["2022-02-23", 6.985],
          ["2022-02-24", 6.948],
        ],
      },
      //   {
      //     stcd: "HD00002",
      //     stnm: "最低水位",
      //     data: [
      //       ["2022-02-16", 7.589],
      //       ["2022-02-17", 7.533],
      //       ["2022-02-18", 7.493],
      //       ["2022-02-19", 7.413],
      //       ["2022-02-20", 7.323],
      //       ["2022-02-21", 7.193],
      //       ["2022-02-22", 7.082],
      //       ["2022-02-23", 7.001],
      //       ["2022-02-24", 6.968],
      //     ],
      //   },
      {
        stcd: "HD00003",
        stnm: "日降雨量",
        data: [
          ["2022-02-14", 7],
          ["2022-02-15", 7.589],
          ["2022-02-16", 7.589],
          ["2022-02-17", 7.523],
          ["2022-02-18", 7.485],
          ["2022-02-19", 7.404],
          ["2022-02-20", 7.312],
          ["2022-02-21", 7.178],
          ["2022-02-22", 7.058],
          ["2022-02-23", 6.988],
          ["2022-02-24", 6.953],
        ],
      },
    ];

    // 水情数据
    const sq = [
      {
        stcd: "HD00001",
        stnm: "小时最大降雨量",
        data: [
          ["2022-02-14", 6],
          ["2022-02-15", 7.589],
          ["2022-02-16", 7.589],
          ["2022-02-17", 7.516],
          ["2022-02-18", 7.477],
          ["2022-02-19", 7.394],
          ["2022-02-20", 7.306],
          ["2022-02-21", 7.176],
          ["2022-02-22", 7.066],
          ["2022-02-23", 6.985],
          ["2022-02-24", 6.948],
        ],
      },
      //   {
      //     stcd: "HD00002",
      //     stnm: "最低水位",
      //     data: [
      //       ["2022-02-16", 7.589],
      //       ["2022-02-17", 7.533],
      //       ["2022-02-18", 7.493],
      //       ["2022-02-19", 7.413],
      //       ["2022-02-20", 7.323],
      //       ["2022-02-21", 7.193],
      //       ["2022-02-22", 7.082],
      //       ["2022-02-23", 7.001],
      //       ["2022-02-24", 6.968],
      //     ],
      //   },
      {
        stcd: "HD00003",
        stnm: "日降雨量",
        data: [
          ["2022-02-14", 7],
          ["2022-02-15", 7.589],
          ["2022-02-16", 7.589],
          ["2022-02-17", 7.523],
          ["2022-02-18", 7.485],
          ["2022-02-19", 7.404],
          ["2022-02-20", 7.312],
          ["2022-02-21", 7.178],
          ["2022-02-22", 7.058],
          ["2022-02-23", 6.988],
          ["2022-02-24", 6.953],
        ],
      },
    ];
    this.rqData.seriesData = yq.map((item: any) => {
      return {
        name: item.stnm,
        smooth: true,
        type: "line",
        data: item.data ? item.data : [],
      };
    });
    this.sqData.seriesData = yq.map((item: any) => {
      return {
        name: item.stnm,
        smooth: true,
        type: "line",
        data: item.data ? item.data : [],
      };
    });

    this.rqData.legendData = yq.map((item: any) => item.stnm);
    this.sqData.legendData = sq.map((item: any) => item.stnm);
  }

  // 查询
  onSearch() {
    this.getonPageData();
  }
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
@import "@/styles/commonVariables.scss";
@import "@/styles/common.scss";

.survey-flood {
  width: 100%;
  height: 100%;
  padding: 10px;
  background: #efeff1;
  .top-item {
    width: 100%;
    height: 62px;
    display: flex;
    line-height: 62px;
    margin-bottom: 10px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
    border-radius: 3px;
    background: #fff;
    .top-sel {
      margin-right: 10px;
      &:nth-of-type(1) {
        margin-left: 10px;
      }
      &:nth-of-type(2) {
        margin-right: 50px;
      }
      label {
        margin: 0 10px;
      }
    }
  }
  .btn {
    margin-right: 10px;
  }
  .content {
    height: calc(100% - 72px);
    width: 100%;
    border-top: 1px solid #dde4eb;
    background: #fff;
    font-size: 14px;
    color: #666666;
    .bottom {
      height: 100%;
      width: 100%;
      overflow-x: hidden;
      overflow-y: hidden;
      .river {
        width: 100%;
        height: 100%;
        &-item {
          &:first-of-type {
            position: relative;
            font-size: 16px;
            padding: 20px 34px;
            color: #333333;
            line-height: 16px;
          }
          &:nth-of-type(2) {
            height: calc(100% - 60px);
            .river-item-table {
              height: 100%;
              width: 100%;
              position: relative;
              margin-top: 100px;
            }
          }
        }
      }
    }
    .bottom:hover {
      overflow-y: auto;
    }
    #{$deep}.el-table::before {
      height: 0;
    }
  }
}
</style>
