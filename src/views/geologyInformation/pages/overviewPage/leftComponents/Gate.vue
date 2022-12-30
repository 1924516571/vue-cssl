<template>
  <!-- 物质仓库-->
  <div class="enterprise-view">
    <div class="enterprise-item">
      <search-component @input="getSearch"></search-component>
    </div>
    <div class="table-item" >
      <table-page :tableData="tableData" :columns="columns" :show-total=true :customHeight="tableHeight" :pageParams="pageParams" @row-click="rowClick" @get-page="getPage" @get-size="getSize"> </table-page>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { TablePage, SearchComponent } from "@/components";
import { overview, publicApi } from "@/api";

@Component({
  components: {
    TablePage,
    SearchComponent,
  },
})
export default class Enterprise extends Vue {
  @Prop() flag!: boolean;

  @Watch("flag", { immediate: true })
  getHeight(val: any) {
    let h = document.documentElement.children[1].clientHeight - 250;
    this.tableHeight = val ? 400 : h;
  }

  columns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "仓库名称",
      key: "ckmc",
    },
    {
      title: "区域名称",
      key: "areaName",
      width:120,
    },
    {
      title: "经度",
      key: "lon",
      width:120,
    },
    {
      title: "纬度",
      key: "lat",
      width:120,
    },
    {
      title: "管理单位",
      key: "dwnm",
      width:120,
    },
    {
      title: "地址",
      key: "szd",
    },
    // {
    //   title: "负责人",
    //   key: "RVNM",
    // },
    {
      title: "传真",
      key: "fax",
    },
    {
      title: "电话",
      key: "tel",
    },
  ];
  tableData: any[] = [];
  tableHeight: any = 400;

  pageParams: any = {
    current: 1,
    total: 0,
    pageSize: 30,
  };
  tableParams: any = {
    pageNumber: 1,
    pageSize: 30,
    ckmc: "",
    areaCode: "",
  };

  mounted() {
    this.getGateTable();
  }

  async getGateTable() {
    let that = this;
    that.tableParams.pageNumber = that.pageParams.current;
    that.tableParams.pageSize = that.pageParams.pageSize;
    this.tableParams.areaCode = localStorage.getItem("areaCode");
    const url = "wjServer/dataCeter/wareHouse/page";
    const data = await publicApi.getWithParam(url, that.tableParams);
    if (data.result == true) {
      this.tableData = data.data.rows;
      this.pageParams.total = parseInt(data.data.total);
    } else {
      this.tableData = [];
    }
  }

  getSearch(val: string) {
    this.tableParams.ckmc = val;
    this.getGateTable();
  }

  getPage(page: number) {
    this.pageParams.current = page;
    this.getGateTable();
  }

  getSize(size: number) {
    this.pageParams.current = 1;
    this.pageParams.pageSize = size;
    this.getGateTable();
  }

  @Emit()
  rowClick(row: any) {}
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
