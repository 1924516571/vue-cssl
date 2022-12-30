<template>
  <!-- 雨量站-->
  <div class="enterprise-view">
    <div class="enterprise-item">
      <search-component @input="getSearch"></search-component>
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
      type: "index",
      title: "序号",
    },
    {
      title: "站名",
      key: "zdmc",
      width: 120,
    },
    {
      title: "今日累计雨量",
      key: "todayTotal",
      width: 120,
    },
    {
      title: "昨日雨量",
      key: "yesterdayTotal",
      width: 120,
    },
    {
      title: "近1小时雨量",
      key: "yl1hour",
      width: 120,
    },
    {
      title: "近3小时雨量",
      key: "yl3hour",
      width: 120,
    },
    {
      title: "近6小时雨量",
      key: "yl6hour",
      width: 120,
    },
    {
      title: "近12小时雨量",
      key: "yl12hour",
      width: 120,
    },
    {
      title: "近24小时雨量",
      key: "yl24hour",
      width: 120,
    },
    {
      title: "近48小时雨量",
      key: "yl48hour",
      width: 120,
    },
    {
      title: "更新时间",
      key: "zxsjsj",
    },
  ];
  tableData: any[] = [];
  tableHeight: any = 400;

  pageParams: any = {
    current: 1,
    pageSize: 30,
    total: 0,
  };
  tableParams: any = {
    pageNumber: "",
    pageSize: "",
    zdmc: "",
  };

  mounted() {
    this.getYlzData();
  }

  async getYlzData() {
    let that = this;
    let url = "wjServer/fangxunjc/yuqing/infoList";
    that.tableParams.pageNumber = that.pageParams.current;
    that.tableParams.pageSize = that.pageParams.pageSize;
    let data = await publicApi.getWithParam(url, that.tableParams);
    if (data.result == true) {
      this.tableData = data.data.rows;
      //  this.tableData= data.data.rows.map((item:any)=>{
      //            return Object.assign(item,{key:"Ylz"})
      //   })
      this.pageParams.total = parseInt(data.data.total);
    } else {
      this.tableData = [];
    }
  }

  getSearch(val: string) {
    this.tableParams.zdmc = val;
    this.getYlzData();
  }

  getPage(page: number) {
    this.pageParams.current = page;
    this.getYlzData();
  }

  getSize(size: number) {
    this.pageParams.current = 1;
    this.pageParams.pageSize = size;
    this.getYlzData();
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
