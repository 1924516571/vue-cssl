<template>
  <!--雨水关系分析-->
  <div class="survey-flood">
    <div class="top-item">
      <div class="top-sel">
        <label>分析对象：</label>
        <suc-select v-model="report.asyncObj" :options="asyncObjData" style="width: 150px" @on-change="aa"></suc-select>
      </div>
      <div class="allSel" v-if="report.asyncObj == '0'">
        <div class="top-sel">
          <label>河道：</label>
          <suc-select
            v-model="report.river"
            :options="riverData"
            :config="{
              clearable: true,
            }"
            style="width: 150px"
          ></suc-select>
        </div>
        <div class="top-sel">
          <label>时间选择：</label>
          <suc-date-picker v-model="report.ylks" :options="{ type: 'date', clearable: false }" style="width: 150px"></suc-date-picker>
          <label>至</label>
          <suc-date-picker v-model="report.yljs" :options="{ type: 'date', clearable: false }" style="width: 150px"></suc-date-picker>
        </div>
      </div>

      <div class="allSel" v-if="report.asyncObj == '1'">
        <div class="top-sel">
          <label>雨量站点：</label>
          <suc-select
            v-model="report.ylstation"
            :options="rainStationsData"
            :config="{
              clearable: true,
            }"
            style="width: 150px"
          ></suc-select>
        </div>
        <div class="top-sel">
          <label>水情站点：</label>
          <suc-select
            v-model="report.waterstation"
            :options="waterStationsData"
            :config="{
              clearable: true,
            }"
            style="width: 150px"
          ></suc-select>
        </div>
        <div class="top-sel">
          <label>时间选择：</label>
          <suc-date-picker v-model="report.ylks" :options="{ type: 'date', clearable: false }" style="width: 150px"></suc-date-picker>
          <label>至</label>
          <suc-date-picker v-model="report.yljs" :options="{ type: 'date', clearable: false }" style="width: 150px"></suc-date-picker>
        </div>
      </div>
      <div class="top-sel">
        <span style="margin-right:30px">
          <suc-button type="primary" :debounce="800" @on-click="onSearch">查询</suc-button>
        </span>
        <span>
          <suc-button type="primary" :config="{ ghost: true }" :debounce="800">导出</suc-button>
        </span>
      </div>
    </div>
    <!-- 内容部分 -->
    <div class="content">
      <div class="bottom scroll">
        <div style="height:100%">
          <v-chart :options="yQoptions" :autoresize="true" style="width:100%;height:70%;"></v-chart>
        </div>
        <div style="height:100%">
          <v-chart :options="options" :autoresize="true" style="width:100%;height:70%;"></v-chart>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, Emit } from "vue-property-decorator";
import { SucInput, SucSelect, SucButton, SucDatePicker } from "@suc/ui";
import { Rain } from "./floodPage";
import { SelectOptions } from "@suc/ui/interfaces";
import { publicApi } from "@/api";
@Component({
  components: {
    SucSelect,
    SucInput,
    SucButton,
    SucDatePicker,
    Rain,
  },
})
export default class ReportSelect extends Vue {
  // 雨情
  get yQoptions() {
    return {
      color: ["#ffab3d", "#c088ff"],
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
        name: "雨量(mm)",
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
  //水情
  get options() {
    return {
      color: ["#5397ff", "#36b56e", "#ffab3d", "#c088ff"],
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
        right: "8%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: this.sqData.xAxisData,
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
        name: "水位线(m)",
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
      series: this.sqData.seriesData,
    };
  }

  aa(val: any) {
    if (val == "1") {
      this.report.river = "";
    } else {
      this.report.ylstation = "";
      this.report.waterstation = "";
    }
  }
  asyncObjData: SelectOptions = [
    { value: "0", label: "河道" },
    { value: "1", label: "湖泊" },
  ]; //分析对象数据
  riverData: any = []; //河道
  rainStationsData: SelectOptions = []; //雨量站点
  waterStationsData: SelectOptions = []; //水情站点

  report: any = {
    asyncObj: "0", //分析对象
    river: "", //河流参数
    ylstation: "", //雨量站点
    waterstation: "", //水情站点
    ylks: new Date(new Date(new Date().getTime() - 7 * 1000 * 3600 * 24)),
    yljs: new Date(),
  };

  chuan: any = {};

  //  雨情数据
  swData: any = {
    legendData: [],
    xAxisData: [],
    seriesData: [],
  };

  // 水情数据
  sqData: any = {
    legendData: [],
    xAxisData: [],
    seriesData: [],
  };
  mounted() {
    this.getRiver();
    this.getylzdData();
    this.getsqzdData();
    this.getallOptions(); //所有站点
    // this.getonPageData(); //页面数据
  }

  async getRiver() {
    const url = "wjServer/dataCenter/baseinfo/riverinfo/getAllRiver";
    const data = await publicApi.getNoParam(url);
    if (data.result == true) {
      this.riverData = data.data.map((e: any) => {
        return {
          value: e.rvCd,
          label: e.rvNm,
        };
      });
    } else {
      this.$Message.error("获取失败");
    }
  }

  // 雨量站
  async getylzdData() {
    this.rainStationsData = [];
    const url = "wjServer/dataCenter/stbprpb/pp";
    const data = await publicApi.getNoParam(url);
    if (data.result == true) {
      this.rainStationsData = data.data.map((e: any) => {
        return {
          value: e.stcd,
          label: e.stnm,
        };
      });
    } else {
      this.$Message.error("获取失败");
    }
  }
  // 水情
  async getsqzdData() {
    this.waterStationsData = [];
    const url = "wjServer/dataCenter/stbprpb/zz";
    const data = await publicApi.getNoParam(url);
    if (data.result == true) {
      this.waterStationsData = data.data.map((e: any) => {
        return {
          value: e.stcd,
          label: e.stnm,
        };
      });
    } else {
      this.$Message.error("获取失败");
    }
  }

  async getonPageData() {
    // this.swData.legendData = [];
    // this.swData.xAxisData = [];
    // this.swData.seriesData = [];
  }

  async getXdata() {
    let xParams = {
      startTime: this.$utils.dateFormat(new Date(this.report.ylks), "yyyy-MM-dd"),
      endTime: this.$utils.dateFormat(new Date(this.report.yljs), "yyyy-MM-dd"),
    };
    const url = "wjServer/fangxunjc/z/xLine";
    const data = await publicApi.getWithParam(url, xParams);
    if (data.result == true) {
      this.swData.xAxisData = data.data;
      this.sqData.xAxisData = data.data;
    } else {
      this.$Message.error("获取信息失败");
      this.swData.xAxisData = [];
      this.sqData.xAxisData = [];
    }
  }

  async getallOptions() {
    this.getXdata();
    let Params = {
      type: this.report.asyncObj,
      riverCode: this.report.river,
      rainCode: this.report.ylstation,
      waterCode: this.report.waterstation,
      startTime: this.$utils.dateFormat(new Date(this.report.ylks), "yyyy-MM-dd"),
      endTime: this.$utils.dateFormat(new Date(this.report.yljs), "yyyy-MM-dd"),
    };
    const url = "wjServer/fangxunjc/yuqing/rainStationAnalyze";
    const data = await publicApi.getWithParam(url, Params);
    if (data.result == true) {
      data.data[0].lineList.forEach((e: any) => {
        this.swData.legendData.push(e.name);
      });
      this.swData.seriesData = data.data[0].lineList.map((e: any) => {
        return {
          name: e.name,
          type: "bar",
          data: e.data ? e.data : [],
        };
      });
      data.data[1].lineList.forEach((e: any) => {
        this.sqData.legendData.push(e.name);
      });
      this.sqData.seriesData = data.data[1].lineList.map((e: any) => {
        return {
          name: e.name,
          type: "line",
          data: e.data ? e.data : [],
        };
      });
    } else {
      this.$Message.error("获取失败");
    }
  }

  // 查询
  onSearch() {
    // this.$emit("reportClick", this.report);
    // this.getonPageData();
    this.getallOptions();
  }
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
@import "@/styles/commonVariables.scss";

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
    .allSel {
      display: flex;
    }
    .top-sel {
      margin-right: 10px;
      &:nth-of-type(3) {
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
    background: #fff;
    padding-left: 14px;
    font-size: 14px;
    color: #666666;
    .bottom {
      height: 100%;
      width: 100%;
      overflow: auto;
    }
  }
}
</style>
