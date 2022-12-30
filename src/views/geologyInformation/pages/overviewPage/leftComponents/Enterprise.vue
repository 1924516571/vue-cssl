<template>
  <!-- 河道 -->
  <div class="enterprise-view">
    <div class="enterprise-item">
      <search-component @input="getSearch"></search-component>
    </div>
    <div class="enterprise-item">
      <div class="site-amount flex-class">
        <div class="site-amount-item flex-class">
          <div class="site-text flex-class" @click="onWater">
            <span>水位站</span>
            <span style="font-size: 20px">{{ this.riverCount.waterStationCount }}</span>
          </div>
          <div class="site-text flex-class" @click="onAlarm">
            <span>超警戒</span>
            <span style="font-size: 20px">{{ this.riverCount.moreWarnningCount }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="table-item">
      <table-page
        :tableData="tableData"
        :show-total="true"
        :columns="enterpriseColumns"
        :customHeight="tableHeight"
        :pageParams="pageParams"
        @row-click="rowClick"
        @get-page="getPage"
        @get-size="getSize"
        @sort-change="sortChange"
      >
        <template v-slot:online="{ row }">
          <div v-if="row.online" :class="['status-green', 'status']">
            <span>正常</span>
          </div>

          <div v-else :class="['status-wx', 'status']">
            <span>离线</span>
          </div>
        </template>
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

  @Watch("flag")
  getHeight(val: any) {
    let h = document.documentElement.children[1].clientHeight - 400;
    this.tableHeight = val ? 300 : h;
  }
  @Prop() value!: string;
  @Watch("value")
  getTableData(val: any) {
    if (val == "0") {
      // this.getRiverCount();
      this.tableParams.warn = false;
      this.getRiverInfo();
    }
  }

  enterpriseColumns: any[] = [
    {
      title: "序号",
      type: "index",
    },
    {
      title: "河道名称",
      key: "rvnm",
    },
    {
      title: "河道代表站",
      key: "stnm",
    },
    {
      title: "当前水位(m)",
      key: "z",
      sortable: "custom",
      width: 120,
    },
    {
      title: "警戒水位(m)",
      key: "jjsw",
      sortable: "custom",
      width: 120,
    },
    {
      title: "超警戒水位(m)",
      key: "overWarn",
      sortable: "custom",
      width: 120,
    },
    {
      title: "保证水位(m)",
      key: "bzZ",
      width: 120,
    },
    {
      title: "历史最高(m)",
      key: "maxZ",
      width: 120,
    },
    {
      title: "更新时间",
      key: "tm",
      sortable: "custom",
      width: 150,
    },
    {
      title: "状态",
      slot: "online",
      sortable: "custom",
    },
  ];
  tableData: any[] = [];
  tableHeight: any = 350; 

  @Emit()
  getToggle() {
    return true;
  }

  pageParams: any = {
    current: 1,
    pageSize: 30,
    total: 0,
  };
  riverCount: any = {
    waterStationCount: "0",
    moreWarnningCount: "0",
  };
  tableParams: any = {
    pageNumber: "",
    pageSize: "",
    rvnm: "",
    warn: false,
  };

  //  水位站点击
  onWater() {
    this.tableParams.warn = false;
    this.getRiverInfo();
  }
  // 超警戒点击
  onAlarm() {
    this.tableParams.warn = true;
    this.getRiverInfo();
  }

  mounted() {
    this.getRiverCount();
    this.getRiverInfo();
  }

  //获取河道信息
  async getRiverInfo() {
    let that = this;
    let url = "wjServer/dataCenter/baseinfo/riverinfo/gisRiver";
    that.tableParams.pageNumber = that.pageParams.current;
    that.tableParams.pageSize = that.pageParams.pageSize;
    publicApi.getWithParam(url, that.tableParams).then((data: any) => {
      if (data.result == true) {
        that.tableData = data.data.rows;
        that.originData = data.data.rows;
        that.pageParams.total = parseInt(data.data.total);
      } else {
        this.tableData = [];
      }
    });
  }
  //  河道水位统计信息
  async getRiverCount() {
    let that = this;
    let url = "wjServer/fangxunjc/z/riverCount";
    let data = await publicApi.getNoParam(url);
    if (data.result) {
      (that.riverCount.waterStationCount = data.data.total), (that.riverCount.moreWarnningCount = data.data.warnCount);
    } else {
      this.$SucMessage.error(data.desc);
    }
  }

  //按数字排序
  getAsc(a: any, b: any) {
    return a[this.type] - b[this.type];
  }

  getDesc(a: any, b: any) {
    return b[this.type] - a[this.type];
  }

  // 按日期排序
  getDateDesc(a: any, b: any) {
    return Date.parse(b[this.type].replace(/-/g, "/")) - Date.parse(a[this.type].replace(/-/g, "/"));
  }

  getDateAsc(a: any, b: any) {
    return Date.parse(a[this.type].replace(/-/g, "/")) - Date.parse(b[this.type].replace(/-/g, "/"));
  }
  originData: any = [];
  type: string = "";
  sortChange(sortInfo: any) {
    let data: any = this.originData;
    this.type = sortInfo.prop; //拿到列的属性
    let unList: any = [];
    let list: any = [];
    data.forEach((e: any, index: any) => {
      if (!e[this.type]) {
        unList.push(e);
      } else {
        list.push(e);
      }
    });
    if (sortInfo.order == "ascending") {
      if (this.type == "tm") {
        this.tableData = unList.concat(list.sort(this.getDateAsc));
      } else {
        this.tableData = unList.concat(list.sort(this.getAsc));
      }
    } else if (sortInfo.order == "descending") {
      if (this.type == "tm") {
        this.tableData = list.sort(this.getDateDesc).concat(unList);
      } else {
        this.tableData = list.sort(this.getDesc).concat(unList);
      }
    } else {
      this.tableData = this.originData;
    }
    // this.getRiverInfo();
  }

  getSearch(val: string) {
    this.tableParams.rvnm = val;
    this.getRiverInfo();
  }

  getPage(page: number) {
    this.pageParams.current = page;
    this.getRiverInfo();
  }

  getSize(size: number) {
    this.pageParams.current = 1;
    this.pageParams.pageSize = size;
    this.getRiverInfo();
  }

  @Emit()
  rowClick(row: any) {
    //  this.$emit('rowClick',row)
    // return row
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
