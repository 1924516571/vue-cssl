<template>
  <!-- 任务事件，雨水，排污，窨井 -->
  <div class="monitor-view">
    <div class="monitor-item">
      <search-component
        @input="getInput"
      ></search-component>
    </div>
    <div class="monitor-item">
      <div class="site-amount flex-class">
        <div class="site-amount-item flex-class">
          <div v-for="(site, index) in siteCountList" :key="'site' + index">
            <div class="site-text flex-class">
              <span>{{ site.name }}</span>
              <span style="font-size:20px">{{ site.amount }}</span>
            </div>
            <div class="bg-icon">
              <span :class="site.iconClass"></span>
            </div>
          </div>
        </div>
        <div class="blue-bg site-text" @click="getToggle">
          <span
            style="font-size:20px"
            class="iconfont icon-jiancexiangqing"
          ></span>
        </div>
      </div>
    </div>
    <div class="table-item">
      <table-page
        :tableData="tableData"
        :columns="columns"
        :customHeight="tableHeight"
        :pageParams="pageParams"
      >
      </table-page>
    </div>
  </div>
</template>
<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Emit,
  Model,
  Watch
} from "vue-property-decorator";
import { State, Mutation, Action, namespace } from "vuex-class";
import { SearchComponent, TableComponent } from "../../public";
import { TablePage } from "@/components";
import { networkApi } from "../../../../../api";
@Component({
  components: {
    SearchComponent,
    TableComponent,
    TablePage
  }
})
export default class Monitor extends Vue {
  @State netWork: any;
  @Mutation setRightToggle: any;
  // @Prop({
  //   type:Array,
  //   default:() => []
  // }) siteCountList:any;
  @Prop({
    type:Array,
    default:() => []
  }) columns:any;
  @Prop({
    type:Array,
    default:() => []
  }) tableData:any
  siteCountList: any[] = [
    {
      name: "监测站点",
      amount: "0",
      iconClass: "iconfont icon-zhandian"
    },
    // {
    //   name: "预警站点",
    //   amount: "0",
    //   iconClass: "iconfont icon-yujing"
    // }
  ];
  // columns: any = [
  //   {
  //     title: "序号",
  //     type: "index"
  //   },
  //   {
  //     title: "区域",
  //     key: "MC"
  //   },
  //   {
  //     title: "管网名称",
  //     key: "GWMC"
  //   },
  //   {
  //     title: "站点名称",
  //     key: "SBMC"
  //   },
  //   {
  //     title: "最新水位",
  //     key: "VALU",
  //     slot: "level"
  //   }
  // ];
  // tableData: any = []
  tableHeight: any = document.documentElement.children[1].clientHeight - 360;
  tableRowClassName({ row }: any) {
    // return row.SW == "升" ? "warning-row" : "";
    return row.STAT == "异常" ? "warning-row" : "";
  }
  getToggle() {
    this.netWork.rightToggle = !this.netWork.rightToggle;
    this.setRightToggle(this.netWork.rightToggle);
  }
  @Emit()
  enterTable() {}
  @Emit()
  leaveTable() {}

  pageParams: any = {
    current: 1,
    total: 0,
    pageSize: 30
  };
  
  // 搜索
  getInput(val: any) {
    
  }
}
</script>
<style lang="scss">
.table-view {
  .el-table .warning-row {
    color: #ff5a47;
  }
}
</style>
<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
.monitor-view {
  width: 100%;
  height: 100%;
  padding-left: 14px;
  .monitor-item {
    padding: 0 14px 14px 0;
  }
  .table-item {
    height: 100%;
    .levelIcon {
      display: inline-block;
      width: 50%;
    }
    .arrow-up {
      color: $state-red;
    }
    .arrow-down {
      color: $state-green;
    }
  }
  .flex-class {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .site-amount {
    width: 100%;
    height: 50px;
    &-item {
      width: calc(100% - 40px);
      padding-right: 10px;

      > div {
        width: 100%;
        height: 100%;
        position: relative;
        padding: 10px 15px;
        &:first-child {
          background-image: $blue-gradient;
          border-radius: $border-radius;
        }
        &:nth-child(2) {
          background-image: $red-gradient;
          border-radius: $border-radius;
        }
      }
      .bg-icon {
        position: absolute;
        top: 5%;
        right: 10px;
        color: rgba($color: #ffffff, $alpha: 0.2);
        .icon-zhandian:before,
        .icon-yujing:before {
          font-size: 30px;
        }
      }
    }
    .site-text {
      font-size: $font-size-base;
      color: #ffffff;
    }
    .blue-bg {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 10px;
      height: 100%;
      background-image: $blue-gradient;
      border-radius: $border-radius;
      cursor: pointer;
    }
  }
}
</style>
