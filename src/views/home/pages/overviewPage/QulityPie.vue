<template>
  <div class="qulity-view">
    <suc-tabs class="tabs ">
      <suc-tab-pane label="监测数据">
        <div class="more" @click.stop="jumpTo(1)"><i class="el-icon-more"></i></div>
        <table-component class="table" :columns="columns" :tableData="warnData"></table-component>
      </suc-tab-pane>
      <suc-tab-pane label="报警数据">
        <div class="more" @click.stop="jumpTo(2)"><i class="el-icon-more"></i></div>
        <table-component class="table" :columns="columns1" :tableData="faultData"></table-component>
      </suc-tab-pane>
    </suc-tabs>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { PanelView, TableComponent } from "@/components";
import { Tooltip } from "iview";
import { SucTabs, SucTabPane } from "@suc/ui";
import bus from "@/eventBus";
import { infoApi } from "@/api";

@Component({
  components: {
    PanelView,
    Tooltip,
    SucTabs,
    SucTabPane,
    TableComponent,
  },
})
export default class QulityPie extends Vue {
  user: any = JSON.parse(localStorage.getItem("userInfo") || "");
  columns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "对象名称",
      key: "xzqy",
    },
    {
      title: "对象类型",
      key: "stationName",
    },
    {
      title: "业务部门",
      key: "warningType",
    },
    {
      title: "所在区域",
      key: "szqy",
    },
    {
      title: "监测内容",
      key: "warningContent",
    },
    {
      title: "更新时间",
      key: "warningStartTime",
    },
  ];
  columns1: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "对象名称",
      key: "xzqy",
    },
    {
      title: "对象类型",
      key: "stationName",
    },
    {
      title: "业务部门",
      key: "deviceType",
    },
    {
      title: "所在区域",
      key: "szqy",
    },
    {
      title: "报警内容",
      key: "problemType",
    },
    {
      title: "故障开始时间",
      key: "faultStartDate",
    },
  ];
  warnData: any[] = [];
  faultData: any[] = [];
  mounted() {
    this.getTableData();
  }

  jumpTo(val: any) {
    // let index = this.$route.path.replace('/',"")
    if (val == 1) {
      this.$router.push("/main/film/alarm");
    } else {
      this.$router.push("/main/film/fault");
    }
  }

  async getTableData() {
    bus.$on("sendEvent", (data: any) => {
      //   this.warnData = data.warningInfo.list;
      //   this.faultData = data.faultInfo.list;
      this.warnData = [
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
      ];
      this.faultData = [
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufwwdw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
        { xzqy: "前洲街道", stationName: "污水厂泵站", deviceType: "水泵", szqy: "常州", problemType: "yufaufwufw", faultStartDate: "2021-12-14 14:36:02" },
      ];
    });
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
$deep: "::v-deep";
.qulity-view {
  width: 100%;
  height: 100%;
  .tabs {
    height: 100%;
    // .jiance {
    //   height: 50%;
    //   .table {
    //     height: 380px;
    //     overflow: hidden;
    //     margin-top: 20px; //防止遮盖更多
    //   }
    // }
    .table {
      height: 380px;
      margin-top: 20px; //防止遮盖更多
    }

    .more {
      float: right;
      padding-right: 10px;
      i {
        font-size: 18px;
        cursor: pointer;
        color: #5397ff;
      }
    }
  }
  #{$deep}.ivu-tabs-ink-bar {
    height: 2px !important;
  }

  #{$deep}.ivu-tabs-nav {
    width: 70%;
    margin-left: 15%;
    margin-right: 15%;
  }
  #{$deep}.ivu-tabs-tab {
    width: 50% !important;
    text-align: center;
  }
  #{$deep}.ivu-tabs-bar {
    margin-bottom: 0px;
  }
}
</style>
