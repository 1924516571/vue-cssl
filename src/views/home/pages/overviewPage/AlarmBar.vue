<template>
  <div class="alarm-view">
    <!-- <panel-view heading="待办任务">
			<template v-slot:right>
        		<div class="more"  @click.stop="jumpTo()"><i class="el-icon-more"></i></div>
      		</template>
			  <alarm-flood></alarm-flood>
		</panel-view> -->
    <suc-tabs class="tabs">
      <suc-tab-pane label="统计报表">
        <div class="more" @click.stop="jumpTo(1)"><i class="el-icon-more"></i></div>
          <table-component class="table" :columns="columns" :tableData="warnData"></table-component>
      </suc-tab-pane>
      <suc-tab-pane label="运行简报">
        <div class="more" @click.stop="jumpTo(2)"><i class="el-icon-more"></i></div>
          <table-component class="table" :columns="columns1" :tableData="faultData"></table-component>
      </suc-tab-pane>
    </suc-tabs>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { AlarmFlood } from "../dispatchPage";
import { PanelView, TableComponent } from "@/components";
import { SucTabs, SucTabPane } from "@suc/ui";
import { homeApi, publicApi } from "@/api";
import bus from "@/eventBus";
@Component({
  components: {
    PanelView,
    AlarmFlood,
    SucTabs,
    SucTabPane,
    TableComponent,
  },
})
export default class ModuleView extends Vue {
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
      title: "所在区域",
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

  async getTableData() {
    bus.$on("sendEvent", (data: any) => {
      //   this.warnData = data.warningInfo.list;
      //   this.faultData = data.faultInfo.list;
      this.warnData = [
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

  jumpTo() {
    this.$router.push({ path: "/main/assessment/operateManage" });
  }
}
</script>
//
<style lang="scss" scoped>
// .alarm-view {
//   .vueol-overlay {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 160px;
//     height: 36px;
//     background-color: #fec017;
//     border-radius: 2px;
//     color: #fff;
//     font-size: 14px;
//     box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
//   }
// }
</style>
<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
$deep: "::v-deep";
.alarm-view {
  width: 100%;
  height: 100%;
  .tabs {
    height: 100%;
    // .jiance {
    //   height: 50%;
    //   .table {
    //     height: 300px;
    //     overflow: hidden;
    //     margin-top: 20px; //防止遮盖更多
    //   }
    // }
    .table {
      height: 290px;
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
</style>
