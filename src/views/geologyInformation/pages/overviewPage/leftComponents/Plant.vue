<template>
  <!-- 泵站-->
  <div class="enterprise-view">
    <div class="enterprise-item">
      <search-component @input="getSearch"></search-component>
    </div>
    <div class="enterprise-item">
      <div class="site-amount flex-class">
        <div class="site-amount-item flex-class">
          <div class="site-text flex-class" @click="onWater">
            <span>水位站</span>
            <span style="font-size: 20px">{{ this.zbzCount.waterStationCount }}</span>
          </div>
          <div class="site-text flex-class" @click="onAlarm">
            <span>超警戒</span>
            <span style="font-size: 20px">{{ this.zbzCount.moreWarnningCount }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="table-item">
      <table-page :tableData="tableData" :columns="columns" :show-total="true" :customHeight="tableHeight" :pageParams="pageParams" @row-click="rowClick" @get-page="getPage" @get-size="getSize">
        <!-- 运行状态 -->
        <template v-slot:bjList="{ row }">
          <span class="bjzt" v-for="(item, index) in row.bjList" :key="index">
            <template v-if="item == 1">
              <img src="@/assets/monFlood/1.gif" />
            </template>
            <template v-if="item == 0">
              <img src="@/assets/monFlood/2.gif" />
            </template>
          </span>
        </template>
        <!-- 闸门 -->
        <template v-slot:zmList="{ row }">
          <span v-for="(item, index) in row.zmList" :key="index">
            <template v-if="item != 0">
              <img src="@/assets/monFlood/3.gif" />
            </template>
            <template v-if="item == 0">
              <img src="@/assets/monFlood/4.gif" />
            </template>
          </span>
        </template>

        <!-- 闸门开度 -->

        <template v-slot:zmkd="{ row }">
          <span v-for="(item, index) in row.zmkd" :key="index">
            {{ item + "," + index }}
          </span>
        </template>

        <!-- 状态显示 -->
        <!-- <template v-slot:overWarningSw="{ row }">
          <span
            :style="{
              color: row.overWarningSw > 0 ? 'red' : 'green',
            }"
            >{{ row.overWarningSw }}</span
          >
        </template> -->
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
    let h = document.documentElement.children[1].clientHeight - 400;
    this.tableHeight = val ? 300 : h;
  }

  @Prop() value!: string;
  @Watch("value")
  getTableData(val: any) {
    if (val == "2") {
      this.tableParams.warn = false;
      this.getPlantTable();
    }
  }

  zbzCount: any = {
    waterStationCount: "0",
    moreWarnningCount: "0",
  };

  columns: any[] = [
    {
      title: "序号",
      type: "index",
    },
    {
      title: "站点名称",
      key: "stationName",
      width: 130,
    },
    {
      title: "内河水位(m)",
      key: "nhsw",
      width: 150,
    },
    {
      title: "外河水位(m)",
      key: "whsw",
      width: 150,
    },
    {
      title: "运行状态",
      slot: "bjList",
      width: 90,
    },
    {
      title: "警戒水位(m)",
      key: "jjsw",
      width: 130,
      sortable: "custom",
    },
    {
      title: "闸门状态",
      slot: "zmList",
      width: 90,
    },
    {
      title: "闸门开度",
      slot: "zmkd",
      width: 90,
    },
    {
      title: "运行流量",
      key: "yxll",
    },
    {
      title: "过水流量",
      key: "gsll",
    },
    {
      title: "设计流量",
      key: "sjll",
    },
    {
      title: "闸口数量",
      key: "zksl",
    },
    {
      title: "更新时间",
      key: "ntime",
      width: 140,
      sortable: "custom",
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
    pageNumber: "",
    pageSize: "",
    stationName: "",
    warn: false,
  };

  //  水位站点击
  onWater() {
    this.tableParams.warn = false;
    this.getPlantTable();
  }
  // 超警戒点击
  onAlarm() {
    this.tableParams.warn = true;
    this.getPlantTable();
  }

  mounted() {
    this.getZbzCount();
    this.getPlantTable();
  }

  // 闸泵站数量
  async getZbzCount() {
    let that = this;
    let url = "wjServer/fangxunjc/zhabengzhanyx/getWarnStationNum";
    let data = await publicApi.getNoParam(url);
    if (data.result) {
      (that.zbzCount.waterStationCount = data.data.total), (that.zbzCount.moreWarnningCount = data.data.warnCount);
    } else {
      this.$SucMessage.error(data.desc);
    }
  }
  async getPlantTable() {
    let that = this;
    that.tableParams.pageNumber = that.pageParams.current;
    that.tableParams.pageSize = that.pageParams.pageSize;
    const url = "wjServer/fangxunjc/zhabengzhanyx/infoList";
    let data = await publicApi.getWithParam(url, that.tableParams);
    if (data.result == true) {
      let arr = data.data.rows;
      let newarr: any[] = [];
      arr.map((item: any, index: any) => {
        newarr.push(Object.assign(item, { zmkd: item.zmList }));
      });
      this.tableData = newarr;
      this.pageParams.total = parseInt(data.data.total);
    } else {
      this.tableData = [];
    }
  }

  getSearch(val: string) {
    this.tableParams.stationName = val;
    this.getPlantTable();
  }

  getPage(page: number) {
    this.pageParams.current = page;
    this.getPlantTable();
  }

  getSize(size: number) {
    this.pageParams.current = 1;
    this.pageParams.pageSize = size;
    this.getPlantTable();
  }

  @Emit()
  rowClick(row: any) {}
}
</script>
<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";

.enterprise-view {
  //   position: relative;
  width: 100%;
  height: 100%;
  padding-left: 14px;

  .enterprise-item {
    // display: flex;
    padding: 0 14px 14px 0;
  }

  .table-item {
    height: 100%;
    .status {
      display: flex;
      justify-content: center;
      padding: 3px 8px;
      width: 50px;
      border-radius: 2px;
      color: #ffffff;
    }
    .status-wx {
      background-color: #999;
    }
    .status-green {
      background-color: #5bc172;
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
          margin-right: 40px;
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
