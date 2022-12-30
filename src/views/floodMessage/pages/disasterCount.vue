<template>
  <!-- 灾情统计汇总 -->
  <div class="outbox">
    <div class="top bg-shadow">
      <div class="top-sel">
        <label>时间选择：</label>
        <suc-date-picker v-model="report.year" :options="{ type: 'year', clearable: false }" style="width: 150px;" ></suc-date-picker>
      </div>
      <div class="top-sel">
        <label>报表类型：</label>
        <suc-select v-model="report.bblx" :options="bblxData" style="width: 200px"></suc-select>
      </div>
      <div class="top-sel">
        <span style="margin-right:30px">
          <suc-button type="primary" :debounce="800" @on-click="onSearch">生成报表</suc-button>
        </span>
        <span>
          <suc-button type="primary" :config="{ ghost: true }" :debounce="800" @on-click="exportExcel">导出</suc-button>
        </span>
      </div>
    </div>
    <div class="content bg-shadow">
      <div class="bottom">
        <component :is="currentTab" :report="report1" :clickShow="clickShow" :title="title"></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { SucInput, SucSelect, SucButton, SucDatePicker } from "@suc/ui";
import { SelectOptions } from "@suc/ui/interfaces";
import { hlzh, slgc } from "./floodPage/reportPage";
import { publicApi } from "@/api";
@Component({
  components: {
    SucSelect,
    SucInput,
    SucButton,
    SucDatePicker,
    hlzh,
    slgc,
  },
})
export default class ReportSelect extends Vue {
  report1!: any;
  clickShow: any = false;
  bblxData: SelectOptions = [
    { label: "1.洪涝受灾统计表", value: "1" },
    { label: "2.水利工程情况统计表", value: "2" },
  ];
  title: any = "";
  currentTab: string = "";

  report: any = {
    year: new Date(),
    bblx: "",
  };

  onloadParams: any = {
    year: "",
    bblx: "",
  };

  mounted() {
    // this.init(this.report.bblx);
    this.report.bblx = "1";
    this.getonPageData(); //页面数据
  }

  onSearch() {
    this.report1 = "678";
    this.init(this.report.bblx);
    this.getonPageData();
    this.clickShow = false;
    this.$nextTick(() => {
      this.clickShow = true;
    });
  }

  init(key: any) {
    switch (key) {
      case "1":
        this.title = "常州市武进区洪涝灾害基本情况统计表";
        this.currentTab = "hlzh";
        break;
      case "2":
        this.title = "水利工程情况统计表";
        this.currentTab = "slgc";
        break;
    }
  }

  async getonPageData() {
    this.onloadParams = {
      year: this.$utils.dateFormat(new Date(this.report.year), "yyyy"),
      bblx: this.report.bblx,
    };
    console.log(this.onloadParams, "---");
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
}
</script>

<style lang="scss" scoped>
$deep: "::v-deep";
// @import "@/styles/commonVariables.scss";
.outbox {
  width: 100%;
  height: 100%;
  padding: 10px;
  background: #efeff1;
  .top {
    width: 100%;
    height: 62px;
    line-height: 62px;
    display: flex;
    margin-bottom: 10px;
    // box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
    border-radius: 3px;
    // background: #fff;
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
  .content {
    height: calc(100% - 72px);
    width: 100%;
    // padding: 0 14px;
    border-top: 1px solid #dde4eb;
    color: #666666;

    .bottom {
      height: 100%;
      width: 100%;
      //    overflow-x: auto;
      //  overflow-y: hidden;
      //   overflow: auto;
      //   overflow-x: auto;
      // // //   overflow-y: hidden;
      // // //    overflow-y: auto;
    }
  }
}
</style>
