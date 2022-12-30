<template>
  <!-- 闸站-->
  <div class="enterprise-view">
    <div class="enterprise-item">
      <search-component @input="getSearch"></search-component>
    </div>
    <!-- <div class="enterprise-item">
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
        </div> -->
    <div class="table-item" @mouseenter="enterTable" @mouseleave="leaveTable">
      <table-page :tableData="tableData" :columns="columns" :customHeight="tableHeight" :pageParams="pageParams" @row-click="rowClick" @get-page="getPage" @get-size="getSize">
        <!-- 闸门状态 -->
        <template v-slot:zwList="{ row }">
          <span>
            <a>
              <template v-if="row.valveRun == true">
                <img src="@/assets/monFlood/3.gif" />
              </template>
              <template v-if="row.valveRun == false">
                <img src="@/assets/monFlood/4.gif" />
              </template>
            </a>
          </span>
        </template>
        <!-- 状态 -->
        <template v-slot:zt="{ row }">
          <span
            :style="{
              color: row.zt == '正常' ? 'green' : 'red',
            }"
            >{{ row.zt }}</span
          >
        </template>
      </table-page>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { TablePage, SearchComponent } from "@/components";
import { overview } from "@/api";

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
    //  console.log(document.documentElement.clientHeight,"浏览器的高度是");  这个能拿到浏览器的高度
    let h = document.documentElement.children[1].clientHeight - 250;
    this.tableHeight = val ? 400 : h;

    // this.getSewage();
  }

  //   siteCountList: any[] = [
  //     {
  //       name: "窨井数量",
  //       amount: "0",
  //       iconClass: "iconfont icon-qiye",
  //     },
  //   ];
  columns: any[] = [
    {
      type: "index",
      title: "序号",
    },

    {
      title: "闸站名称",
      key: "mc",
      width:120
    },
    {
      title: "闸门状态",
      slot: "zwList",
      width: 90,
    },
    {
      title: "闸上水位",
      key: "zssw",
    },
    {
      title: "警戒水位",
      key: "jjsw",
    },
    {
      title: "超警戒水位",
      key: "cjjsw",
    },
    {
      title: "历史最高水位",
      key: "lszg",
        width:120
    },
    {
      title: "所在河道",
      key: "szhd",
      width:120
    },
    {
      title: "更新时间",
      key: "gxsj",
      width:120
    },
    {
      title: "状态",
      slot: "zt",
    },
  ];
  tableData: any[] = [];
  tableHeight: any = 400;

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
    mc: "",
    pageSize: 30,
  };

  mounted() {
    this.getManiTable();
  }

  async getManiTable() {
    let that = this;
    that.tableParams.currentPage = that.pageParams.current;
    that.tableParams.pageSize = that.pageParams.pageSize;
    // let data = await overview.getManiTable(that.tableParams);
    // if (data.data && data.data.length > 0) {
    //   that.tableData = data.data.map((e: any) => {
    //     return Object.assign(e, { key: "EXYJ" });
    //   });
    // }
    // that.siteCountList[0].amount = data.totalCount;
    // that.pageParams.total = data.totalCount;
    that.tableData = [
      {
        mc: "我是闸站名称",
        valveRun: true,
        zssw: "我是闸上水位",
        jjsw: "我是警戒水位",
        cjjsw: "超警戒水位",
        lszg: "我是历史最高水位",
        szhd: "我是所在河道",
        gxsj:"2022-3-14",
        zt:"正常"
      },
        {
        mc: "我是闸站名称",
        valveRun: false,
        zssw: "我是闸上水位",
        jjsw: "我是警戒水位",
        cjjsw: "超警戒水位",
        lszg: "我是历史最高水位",
        szhd: "我是所在河道",
        gxsj:"2022-3-13",
        zt:"异常"
      },
    ];
  }

  getSearch(val: string) {
    this.tableParams.mc = val;
    this.getManiTable();
  }

  getPage(page: number) {
    this.pageParams.current = page;
    this.getManiTable();
  }

  getSize(size: number) {
    this.pageParams.current = 1;
    this.pageParams.pageSize = size;
    this.getManiTable();
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
