<template>
  <!-- 易捞点-->
  <div class="enterprise-view">
    <div class="enterprise-item">
      <search-component @input="getSearch" placeholderTxt="名称"></search-component>
    </div>
    <div class="table-item">
      <table-page :tableData="tableData" :columns="columns" :show-total=true :customHeight="tableHeight" :pageParams="pageParams" @row-click="rowClick" @get-page="getPage" @get-size="getSize">
      </table-page>
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
  }

  columns: any[] = [
    {
      title: "序号",
      type: "index",
    },
    {
      title: "名称",
      key: "name",
      width: 120,
    },
    {
      title: "经度",
      key: "lon",
       width: 120,
    },
    {
      title: "纬度",
      key: "lat",
       width: 120,
    },
    {
      title: "隐患名称",
      key: "trouble",
      width: 120,
    },
    {
      title: "联系电话",
      key: "tel",
      width: 120,
    },
    {
      title: "备注",
      key: "nt",
      width: 120,
    },
  ];
  tableData: any[] = [];
  tableHeight: any = "";

  @Emit()
  getToggle() {
    return true;
  }
  pageParams: any = {
    current: 1,
    total: 0,
    pageSize: 30,
  };
  tableParams: any = {
    pageNum: "",
    name: "",
    pageSize: "",
  };

  mounted() {
    this.getYldData();
  }

  async getYldData() {
    let that = this;
    that.tableData = [];
    that.tableParams.pageNum = that.pageParams.current;
    that.tableParams.pageSize = that.pageParams.pageSize;
    let url = "wjServer/dataCenter/baseinfo/yilaodian/page";
    publicApi.getWithParam(url, that.tableParams).then((data: any) => {
      if (data) {
        that.tableData = data.data.rows;
        that.pageParams.total = parseInt(data.data.total);
      } else {
        that.tableData = [];
      }
    });
  }

  getSearch(val: string) {
    this.tableParams.name = val;
    this.getYldData();
  }

  getPage(page: number) {
    this.pageParams.current = page;
    this.getYldData();
  }

  getSize(size: number) {
    this.pageParams.current = 1;
    this.pageParams.pageSize = size;
    this.getYldData();
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
