<template>
  <!-- 抢险队伍-->
  <div class="enterprise-view">
    <div class="enterprise-item">
      <search-component @input="getSearch"></search-component>
    </div>
    <div class="table-item">
      <table-page :tableData="tableData" :columns="columns" :show-total=true :customHeight="tableHeight" :pageParams="pageParams" @row-click="rowClick" @get-page="getPage" @get-size="getSize"> </table-page>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { TablePage, SearchComponent } from "@/components";
import { publicApi } from "@/api";

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
    // this.getSewage();
  }

  columns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "队伍名称",
      key: "name",
    },
    {
      title: "所属区域",
      key: "areaName",
      width: 120,
    },
    {
      title: "负责人",
      key: "manager",
    },
    {
      title: "电话",
      key: "tel",
    },
    {
      title: "现有人数",
      key: "nownum",
    },
    {
      title: "机构性质",
      key: "jgTypeName",
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
    pageNum: "",
    pageSize: "",
    dwmc: "",
    areaCode: "",
  };

  mounted() {
    this.getQxdwData();
  }

  async getQxdwData() {
    let that = this;
    that.tableParams.areaCode = localStorage.getItem("areaCode");
    that.tableParams.pageNum = that.pageParams.current;
    that.tableParams.pageSize = that.pageParams.pageSize;
    const url = "wjServer/dataCenter/fxdw/page";
    publicApi.getWithParam(url, this.tableParams).then((data: any) => {
      if (data.result == true) {
        data.data.rows.forEach((e: any) => {
          Object.assign(e, { key: "QXDW" });
        });
        this.tableData = data.data.rows;
        this.pageParams.total = parseInt(data.data.total);
      } else {
        this.tableData = [];
      }
    });
  }

  getSearch(val: string) {
    this.tableParams.dwmc = val;
    this.getQxdwData();
  }

  getPage(page: number) {
    this.pageParams.current = page;
    this.getQxdwData();
  }

  getSize(size: number) {
    this.pageParams.current = 1;
    this.pageParams.pageSize = size;
    this.getQxdwData();
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
