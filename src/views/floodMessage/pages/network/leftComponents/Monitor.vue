<template>
  <!-- 管网监测点 -->
  <div class="monitor-view">
    <div class="monitor-item">
      <suc-input v-model="pq" placeholder="片区" style="margin-right: 10px;"></suc-input>
      <search-component
        placeholderTxt="请输入管网名称"
        @input="getInput"
      ></search-component>
    </div>
    <div class="monitor-item">
      <div class="site-amount flex-class">
        <div class="site-amount-item flex-class">
          <div v-for="(site, index) in siteCountList" :key="'site' + index" @click="onclick(site.name)" >
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
    <div class="table-item" @mouseenter="enterTable" @mouseleave="leaveTable">
      <table-page
        :tableData="netWork.tabTable"
        :columns="columns"
        :customHeight="tableHeight"
        :tableRowClassName="tableRowClassName"
        :pageParams="pageParams"
        @getPage="getPage"
        @getSize="getSize"
      >
        <template v-slot:level="{ row }">
          <span class="levelIcon">{{ row.VALU }}</span>
          <span
            v-if="row.SW == '降'"
            :class="row.STAT == '正常' ? 'arrow-down' : 'arrow-up'"
            class="iconfont icon-jiantouxia"
          ></span>
          <span
            v-else-if="row.SW == '升'"
            :class="row.STAT == '正常' ? 'arrow-down' : 'arrow-up'"
            class="iconfont icon-jiantou"
          ></span>
          <span v-else> -</span>
        </template>
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
import {SucInput} from "@suc/ui"
@Component({
  components: {
    SearchComponent,
    TableComponent,
    TablePage,
    SucInput
  }
})
export default class Monitor extends Vue {
  @State netWork: any;
  @Mutation setRightToggle: any;
  @Mutation setTabTable: any;
  siteCountList: any[] = [
    {
      name: "监测站点",
      amount: "0",
      iconClass: "iconfont icon-zhandian"
    },
    {
      name: "预警站点",
      amount: "0",
      iconClass: "iconfont icon-yujing"
    }
  ];
  columns: any = [
    {
      title: "序号",
      type: "index"
    },
    {
      title: "区域",
      key: "MC",
      width: 80
    },
    {
      title: "站点名称",
      key: "SBMC",
    },
    {
      title: "最新水位",
      key: "VALU",
      slot: "level",
      sortable: 'custom'
    }
  ];
  // tableData: any = []
  tableHeight: any = document.documentElement.children[1].clientHeight - 360;
  tableRowClassName({ row }: any) {
    if(row.SBZT!="在线"){
      return "gray-row"
    }
    if(row.STAT == "异常"){
      return "warning-row"
    }
    // return row.STAT == "异常" ? "warning-row" : "";
  }
  getToggle() {
    this.netWork.rightToggle = !this.netWork.rightToggle;
    this.setRightToggle(this.netWork.rightToggle);
  }
  @Emit()
  enterTable() {}
  @Emit()
  leaveTable() {}
  mounted() {
    this.getTableData();
    this.getAmount();
  }
  pq: string = ''
  // 监测点表格数据
  pageParams: any = {
    current: 1,
    total: 0,
    pageSize: 30
  };
  tableParams: any = {
    // currentPage: 1,
    // pageSize: 30,
    pqmc: "",
    gwmc: "",
    sjzt:[]
  };
  originData: any = []
  async getTableData() {
    let that = this;
    // that.tableData = [];
    // that.tableParams.currentPage = that.pageParams.current;
    const tabledata = await networkApi.getCurTableData(that.tableParams);
    let data = tabledata.data;
    // that.tableData = data;
    this.originData = data;
    that.pageParams.total = data.length;
    this.getCurTable();
    // that.$emit('hover-data',this.tableData);
  }
  // 搜索
  getInput(val: any) {
    this.tableParams.gwmc = val;
    this.tableParams.pqmc = this.pq;
    this.$emit("getParams",this.tableParams)
    this.getTableData();
  }
  // 站点数量
  async getAmount() {
    let that = this;
    const amount = await networkApi.getAmount();
    let { devices, warndevices } = amount;
    that.siteCountList[0].amount = devices;
    that.siteCountList[1].amount = warndevices;
  }

  onclick(name: string){
    this.tableParams.sjzt = []
    if(name == '预警站点'){
      this.tableParams.sjzt.push('D')
    }
    this.getTableData();
    this.$emit("getSjzt", this.tableParams.sjzt)
  }

  tableData: any = [];
  getPage(page: any){
    this.pageParams.current = page;
    this.getCurTable()
  }
  getSize(size: any){
    this.pageParams.current = 1
    this.pageParams.pageSize = size;
    this.getCurTable()
  }

  getCurTable(){
    let data = this.originData;
    this.tableData = data.slice((this.pageParams.current - 1) * this.pageParams.pageSize,this.pageParams.current * this.pageParams.pageSize)
    this.setTabTable(this.tableData)
  }
}
</script>
<style lang="scss">
.table-view {
  .el-table .warning-row {
    color: #ff5a47;
  }
  .el-table .gray-row {
    color: #999;
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
    &:first-of-type{
      display: flex;
      flex-wrap: nowrap;
    }
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
        width: 180px;
        height: 100%;
        position: relative;
        padding: 10px 15px;
        cursor: pointer;
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
