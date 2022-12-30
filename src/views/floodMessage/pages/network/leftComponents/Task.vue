<template>
  <!-- 雨水管网-->
  <div class="enterprise-view">
    <div class="enterprise-item">
      <search-component @input="getSearch"></search-component>
    </div>
    <div class="enterprise-item">
      <div class="site-amount flex-class">
        <div class="site-amount-item flex-class">
          <div v-for="(site, index) in siteCountList" :key="'site' + index">
            <div class="site-text flex-class">
              <span>{{ site.name }}</span>
              <span style="font-size: 20px">{{ site.amount }}</span>
            </div>
            <div class="bg-icon">
              <span :class="site.iconClass"></span>
            </div>
          </div>
        </div>
        <div class="blue-bg site-text" @click="getToggle">
          <span
            style="font-size: 20px"
            class="iconfont icon-jiancexiangqing"
          ></span>
        </div>
      </div>
    </div>
    <div class="table-item" @mouseenter="enterTable" @mouseleave="leaveTable">
      <table-page
        :tableData="tableData"
        :columns="columns"
        :customHeight="tableHeight"
        :pageParams="pageParams"
        @get-page="getPage"
        @get-size="getSize"
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
  Watch,
} from "vue-property-decorator";
import { TablePage, SearchComponent } from "@/components";
import { networkApi } from "@/api";
@Component({
  components: {
    TablePage,
    SearchComponent,
  },
})
export default class Enterprise extends Vue {
  siteCountList: any[] = [
    {
      name: "任务事件数量",
      amount: "0",
      iconClass: "iconfont icon-qiye",
    },
  ];
  columns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "片区",
      key: "PQMC",
    },
    {
      title: "任务名称",
      key: "RWMC",
      width: "120"
    },
    {
      title: "站点名称",
      key: "JCSB",
    },
    {
      title: "发布人",
      key: "FBR",
    },
    {
      title: "发布时间",
      key: "GMT_CREATE",
      width: "150"
    },
    {
      title: "任务状态",
      key: "STATUS",
    },
    {
      title: "接收人",
      key: "JSR",
    },
    {
      title: "任务类型",
      key: "RWLX",
    },
  ];
  tableData: any[] = [];
  tableHeight: any = document.documentElement.children[1].clientHeight - 380;
  @Emit()
  getToggle() {
    return true;
  }
  @Emit()
  enterTable() {}
  @Emit()
  leaveTable() {}
  pageParams: any = {
    current: 1,
    total: 0,
    pageSize: 30,
  };
  tableParams: any = {
    currentPage: 1,
    name: "",
    pqid: "",
    status: "",
    pageSize: 30,
  };
  mounted() {
    this.getTaskList();
  }
  async getTaskList() {
    let that = this;
    that.tableParams.currentPage = that.pageParams.current;
    that.tableParams.pageSize = that.pageParams.pageSize;
    let data = await networkApi.getTaskList(that.tableParams);
    that.tableData = data.data;
    that.siteCountList[0].amount = data.totalCount;
    that.pageParams.total = data.totalCount;
  }
  getSearch(val: string) {
    this.tableParams.name = val;
    this.getTaskList();
  }
  getPage(page: number) {
    this.pageParams.current = page;
    this.getTaskList();
  }
  getSize(size: number) {
    this.pageParams.current = 1;
    this.pageParams.pageSize = size;
    this.getTaskList();
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
.enterprise-view {
  width: 100%;
  height: 100%;
  padding-left: 14px;
  .enterprise-item {
    padding: 0 14px 14px 0;
  }
  .table-item {
    height: 100%;
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
      }
      .bg-icon {
        position: absolute;
        top: 5%;
        right: 10px;
        color: rgba($color: #ffffff, $alpha: 0.2);
        .icon-qiye:before {
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
