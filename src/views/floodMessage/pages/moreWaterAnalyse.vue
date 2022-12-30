<template>
  <!--水情数据报表-->
  <div class="survey-flood">
    <div class="top-item">
      <div class="top-sel">
        <label>多站水情站点:</label>
        <el-select v-model="report.stcd" multiple collapse-tags style="margin-left: 10px;" placeholder="请选择" clearable size="mini" @change="changeSelect">
          <el-checkbox v-model="checked" @change="selectAll">全选</el-checkbox>
          <el-option v-for="item in zdOptions" :label="item.label" :value="item.value" :key="item.value"> </el-option>
        </el-select>
      </div>
      <div class="top-sel">
        <label>时间选择：</label>
        <suc-date-picker v-model="report.startTime" :options="{ type: 'date', clearable: false }" style="width: 150px"></suc-date-picker>
        <label>至</label>
        <suc-date-picker v-model="report.endTime" :options="{ type: 'date', clearable: false }" style="width: 150px"></suc-date-picker>
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
        <!-- <more-water-station :swData="swData" :bb="aa"></more-water-station> -->
        <div class="river">
          <div class="river-item">多站水情分析</div>
          <div class="river-item">
            <v-chart :options="options" :autoresize="true" style="width:100%;height:100%;"></v-chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { SucInput, SucSelect, SucButton, SucDatePicker, SucCol, SucCheckbox, SucCheckboxGroup, SucRow } from "@suc/ui";
import { MoreWaterStation } from "./floodPage";
import { SelectConfig, SelectOptions } from "@suc/ui/interfaces";
import { infoApi, publicApi } from "@/api";
@Component({
  components: {
    SucSelect,
    SucInput,
    SucButton,
    SucDatePicker,
    MoreWaterStation,
    SucCol,
    SucCheckbox,
    SucCheckboxGroup,
    SucRow,
  },
})
export default class ReportSelect extends Vue {
  zdOptions: any = []; //站点数组
  checked: boolean = false;
  get options() {
    return {
      color: ["#5397ff", "#36b56e", "#ffab3d", "#c088ff"],
      title: {
        // text: "水情分析",
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
        data: this.swData.legendData,
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
        type: "category",
        boundaryGap: false,
        data: this.swData.xAxisData,
        axisTick: {
          lineStyle: {
            color: "#acb1b7",
          },
        },
        axisLabel: {
          color: "#666",
        },
      },
      yAxis: {
        type: "value",
        name: "水位(m)",
        // min: 0,
        // max: 10,

        // splitNumber: 20,
        // boundaryGap:[0.02,0.02],
        max: function(value: any) {
          return value.max;
        },
        min: function(value: any) {
          return value.min;
        },
        nameTextStyle: {
          color: "#333",
        },
        splitLine: {
          color: "#999",
        },
        axisLabel: {
          color: "#999",
        },
      },
      // dataZoom: [
      //   {
      //     type: "inside",
      //     start: 0,
      //     end: 20,
      //   },
      //   {
      //     start: 0,
      //     end: 20,
      //   },
      // ],
      series: this.swData.seriesData,
    };
  }

  report: any = {
    stcd: "",
    startTime: new Date(new Date(new Date().getTime() - 1 * 1000 * 3600 * 24)),
    endTime: new Date(),
  };

  onloadParams: any = {
    sqzd: "",
    starTime: "",
    endTime: "",
  };

  swData: any = {
    legendData: [],
    xAxisData: [],
    seriesData: [],
  };

  // 图表的参数
  echartParams: any = {
    stcds: "",
    startTime: "",
    endTime: "",
  };

  //x轴参数
  xParams: any = {
    startTime: "",
    endTime: "",
  };

  mounted() {
    this.getzdData(); //获取站点数据
    this.getEchartData(); //获取图表的数据
    // this.getOnpageData();
  }

  // 查询
  onSearch() {
    this.getEchartData();
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

  async getzdData() {
    this.zdOptions = [];
    const url = "wjServer/dataCenter/stbprpb/zz";
    const data = await publicApi.getNoParam(url);
    this.zdOptions =
      data.result == true
        ? data.data.map((e: any) => {
            return {
              value: e.stcd,
              label: e.stnm,
            };
          })
        : [];
  }

  async getEchartData() {
    this.swData.xAxisData = [];
    this.swData.legendData = [];
    this.swData.seriesData = [];

    this.echartParams.stcds = this.report.stcd.toString();
    this.echartParams.startTime = this.$utils.dateFormat(new Date(this.report.startTime), "yyyy-MM-dd");
    this.echartParams.endTime = this.$utils.dateFormat(new Date(this.report.endTime), "yyyy-MM-dd");

    this.xParams.startTime = this.$utils.dateFormat(new Date(this.report.startTime), "yyyy-MM-dd");
    this.xParams.endTime = this.$utils.dateFormat(new Date(this.report.endTime), "yyyy-MM-dd");

    const xurl = "wjServer/fangxunjc/z/xLineOfMore";
    const xdata = await publicApi.getWithParam(xurl, this.xParams);
    if (xdata.result == true) {
      this.swData.xAxisData = xdata.data;
    } else {
      this.$Message.error("获取数据失败");
    }

    // 整体数据
    const yurl = "wjServer/fangxunjc/z/lineOfMore";
    const ydata = await publicApi.getWithParam(yurl, this.echartParams);
    if (ydata.result == true) {
      // ydata.data = [
      //   { name: "辛安塘(金城桥)", data: [2.2, 3.6, 5.4] },
      //   { name: "小东门站", data: [1.1, 6.8, 7.2] },
      //   { name: "北门翻水站", data: [3.2, 3.5, 3.4] },
      // ];
      this.swData.seriesData = ydata.data.map((item: any) => {
        return {
          name: item.name,
          type: "line",
          data: item.data,
        };
      });
      ydata.data.forEach((e: any) => {
        this.swData.legendData.push(e.name);
      });
    } else {
      this.$Message.error("获取数据失败");
    }
  }
  async getOnpageData() {
    this.onloadParams = {
      sqzd: this.report.stcd,
      starTime: this.$utils.dateFormat(new Date(this.report.starTime), "yyyy-MM-dd"),
      endTime: this.$utils.dateFormat(new Date(this.report.endTime), "yyyy-MM-dd"),
    };

    const sw = [
      {
        stcd: "HD00001",
        stnm: "南夏墅站",
        data: [
          ["2022-02-16", 3],
          ["2022-02-17", 7.516],
          ["2022-02-18", 7.477],
          ["2022-02-19", 7.394],
          ["2022-02-20", 7.306],
          ["2022-02-21", 2.2],
          ["2022-02-22", 7.066],
          ["2022-02-23", 6.985],
          ["2022-02-24", 6.948],
        ],
      },
      {
        stcd: "HD00002",
        stnm: "湖塘镇站",
        data: [
          ["2022-02-16", 5],
          ["2022-02-17", 7.533],
          ["2022-02-18", 7.493],
          ["2022-02-19", 7.413],
          ["2022-02-20", 7.323],
          ["2022-02-21", 2.2],
          ["2022-02-22", 7.082],
          ["2022-02-23", 7.001],
          ["2022-02-24", 6.968],
        ],
      },
      {
        stcd: "HD00003",
        stnm: "牛塘镇站",
        data: [
          ["2022-02-16", 6.2],
          ["2022-02-17", 7.523],
          ["2022-02-18", 7.485],
          ["2022-02-19", 7.404],
          ["2022-02-20", 7.312],
          ["2022-02-21", 3.25],
          ["2022-02-22", 7.058],
          ["2022-02-23", 6.988],
          ["2022-02-24", 6.953],
        ],
      },
      {
        stcd: "HD00004",
        stnm: "洛阳镇站",
        data: [
          ["2022-02-16", 7.6],
          ["2022-02-17", 7.523],
          ["2022-02-18", 7.485],
          ["2022-02-19", 7.404],
          ["2022-02-20", 7.312],
          ["2022-02-21", 7.36],
          ["2022-02-22", 7.058],
          ["2022-02-23", 6.988],
          ["2022-02-24", 6.953],
        ],
      },
      {
        stcd: "HD00005",
        stnm: "郑陆镇站",
        data: [
          ["2022-02-16", 8],
          ["2022-02-17", 7.523],
          ["2022-02-18", 7.485],
          ["2022-02-19", 7.404],
          ["2022-02-20", 7.312],
          ["2022-02-21", 5.6365],
          ["2022-02-22", 7.058],
          ["2022-02-23", 6.988],
          ["2022-02-24", 6.953],
        ],
      },
    ];
    this.swData.seriesData = sw.map((item: any) => {
      return {
        name: item.stnm,
        smooth: true,
        type: "line",
        data: item.data ? item.data : [],
      };
    });
    this.swData.legendData = sw.map((item: any) => item.stnm);
  }

  selectAll() {
    this.report.stcd = [];
    if (this.checked) {
      this.zdOptions.map((item: any) => {
        this.report.stcd.push(item.value);
      });
    } else {
      this.report.stcd = [];
    }
  }

  changeSelect(val: any) {
    if (val.length === this.zdOptions.length) {
      this.checked = true;
    } else {
      this.checked = false;
    }
  }
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
@import "@/styles/commonVariables.scss";

.survey-flood {
  width: 100%;
  height: 100%;
  display: relative;
  padding: 10px;
  margin-bottom: 10px;
  //   background: #f8f8f9;
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
    border-top: 1px solid #dde4eb;
    // background: rgb(17, 218, 67);
    background: #fff;
    // padding: 0 14px;
    padding-left: 14px;
    font-size: 14px;
    color: #666666;
    .bottom {
      height: 100%;
      width: 100%;
      overflow: auto;
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
            border-bottom: 1px solid #dde4eb;
            &:before {
              content: "";
              position: absolute;
              top: 21px;
              left: 20px;
              width: 4px;
              height: 14px;
              background-color: #3983f3;
              border-radius: 4px;
            }
          }
          &:nth-of-type(2) {
            height: calc(100% - 60px);
          }
        }
      }
    }
  }
}
#{$deep}.el-checkbox {
  .el-checkbox__label {
    padding-left: 6px;
  }
}
</style>
