<template>
  <!--水情数据报表-->
  <div class="survey-flood">
    <div class="top-item">
      <div class="top-sel">
        <label>水情站点：</label>
        <el-select v-model="report.stcd" placeholder="请选择" size="mini" style="width: 150px" @change="changeSelect">
          <el-option v-for="item in typeOpt" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </div>
      <div class="top-sel">
        <label>时间选择：</label>
        <suc-date-picker v-model="report.startTime" :options="{ type: 'date', clearable: false }" style="width: 150px"></suc-date-picker>
        <label>至</label>
        <!-- @on-change="changeDate" -->
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
        <div class="river">
          <div class="river-item">{{ title }}水情分析</div>
          <div class="river-item">
            <div v-if="flag" class="noData">暂无数据</div>
            <v-chart v-else :options="options" :autoresize="true" style="width:100%;height:70%;"></v-chart>
            <div class="river-item-table">
              <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams" @get-page="getPage" @get-size="getSize"> </table-page>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { SucInput, SucSelect, SucButton, SucDatePicker, IOption } from "@suc/ui";
import { SelectConfig, SelectOptions } from "@suc/ui/interfaces";
import { publicApi } from "@/api";
import dayjs from "dayjs";
import { TablePage } from "@/components";
@Component({
  components: {
    SucSelect,
    SucInput,
    SucButton,
    SucDatePicker,
    TablePage,
    IOption,
  },
})
export default class ReportSelect extends Vue {
  typeOpt: SelectOptions = [];
  report: any = {
    stcd: "ys_sw_016",
    startTime: new Date(new Date(new Date().getTime() - 6 * 1000 * 3600 * 24)),
    endTime: new Date(),
  };
  title: any = "望虞河谢桥站";
  flag: any = true;
  swData: any = {
    legendData: [],
    xAxisData: [],
    seriesData: [],
  };
  get options() {
    return {
      color: ["#5397ff", "#36b56e", "#ffab3d", "#FF0000"],
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
        name: "水位：米",
        max: function(value: any) {
          return (value.max + 0.05).toFixed(2) ;
        },
        min: function(value: any) {
          return value.min;
        },
        // splitNumber: 20,
        // boundaryGap: [0.1, 0.1],
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
      series: this.swData.seriesData,
    };
  }

  mounted() {
    this.getzdData(); //获取水情站点名称
    this.getEchartData(); //获取图表的数据
    this.onpage(); //表单数据
  }

  changeSelect(value: any) {
    let obj: any = {};
    obj = this.typeOpt.find((item: any) => {
      return item.value === value;
    });
    this.title = obj.label;
  }

  columns: any[] = [
    {
      type: "index",
      title: "序号",
      width: 60,
    },
    {
      title: "站点",
      key: "zdmc",
      width: 200,
    },
    {
      title: "日期",
      key: "tm",
    },
    {
      title: "最高水位",
      key: "zgsw",
      with: 100,
    },
    {
      title: "出现时间",
      key: "fssj1",
    },
    {
      title: "最低水位",
      key: "zdsw",
      with: 60,
    },
    {
      title: "警戒水位",
      key: "jjsw",
      with: 60,
    },
    {
      title: "出现时间",
      key: "fssj2",
    },
    {
      title: "日均水位",
      key: "pjsw",
    },
  ];

  tableData: any = [];
  pageParams: any = {
    total: 0,
    current: 1,
    pageSize: 20,
  };
  // 分页的参数
  onpageParams: any = {
    stcd: "",
    startTime: "",
    endTime: "",
    pageNum: "",
    pageSize: "",
  };

  // 图表的参数
  echartParams: any = {
    stcd: "",
    startTime: "",
    endTime: "",
  };

  // 查询
  onSearch() {
    this.getEchartData();
    this.onpage();
  }

  async onpage() {
    this.onpageParams.stcd = this.report.stcd;
    this.onpageParams.startTime = this.$utils.dateFormat(new Date(this.report.startTime), "yyyy-MM-dd HH:mm:ss");
    this.onpageParams.endTime = this.$utils.dateFormat(new Date(this.report.endTime), "yyyy-MM-dd HH:mm:ss");
    this.onpageParams.pageNum = this.pageParams.current;
    this.onpageParams.pageSize = this.pageParams.pageSize;
    var url = "wjServer/fangxunjc/z/formPage";
    publicApi.getWithParam(url, this.onpageParams).then((data: any) => {
      if (data.result == true) {
        this.tableData = data.data.rows;
        this.pageParams.total = parseInt(data.data.total);
      }
    });
  }

  getPage(page: any) {
    this.pageParams.current = page;
    this.onpage();
  }
  getSize(size: any) {
    this.pageParams.current = 1;
    this.pageParams.pageSize = size;
    this.onpage();
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
    this.typeOpt = [];
    const url = "wjServer/dataCenter/stbprpb/zz";
    const data = await publicApi.getNoParam(url);
    this.typeOpt =
      data.result == true
        ? data.data.map((e: any) => {
            return {
              value: e.stcd,
              label: e.stnm,
            };
          })
        : [];
    // this.report.stcd = this.typeOpt[0].value;
  }
  //
  async getEchartData() {
    this.swData.xAxisData = [];
    this.swData.legendData = [];
    this.swData.seriesData = [];
    this.echartParams = {
      stcd: this.report.stcd,
      startTime: this.$utils.dateFormat(new Date(this.report.startTime), "yyyy-MM-dd"),
      endTime: this.$utils.dateFormat(new Date(this.report.endTime), "yyyy-MM-dd"),
    };

    const xurl = "wjServer/fangxunjc/z/xLine";
    const xdata = await publicApi.getWithParam(xurl, this.echartParams);
    if (xdata.result == true) {
      this.swData.xAxisData = xdata.data;
    } else {
      this.$Message.error("获取数据失败");
    }
    const yurl = "wjServer/fangxunjc/z/dayLine";
    const ydata = await publicApi.getWithParam(yurl, this.echartParams);
    if (ydata.result == true) {
      let array: any = [];
      array = ydata.data.map((item: any) => {
        return {
          name: item.name,
          type: "line",
          data: item.data,
        };
      });
      //  数组中第二 第三位置互换
      var aa = array[1];
      array[1] = array[2];
      array[2] = aa;
      if (array[0].data.length > 0) {
        this.swData.seriesData = array;
        array.forEach((e: any) => {
          this.swData.legendData.push(e.name);
          this.flag = false;
        });
      } else {
        this.flag = true;
      }
    } else {
      this.$Message.error("获取数据失败");
      this.flag = true;
    }
  }

  // changeDate(date: any) {
  //   const test = new Date(date); //中国标准时间
  //   this.report.startTime = new Date(test.getTime() - 6 * 1000 * 3600 * 24);
  // }
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
        .noData {
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
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
  }
}
</style>
