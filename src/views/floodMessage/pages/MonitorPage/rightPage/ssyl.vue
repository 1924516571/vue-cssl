<template>
  <!-- 实时雨量 -->
  <div class="monitor-view">
    <div class="monitor-item">
      <search-component
        placeholderTxt="请输入站点名称"
        @input="getInput"
      ></search-component>
    </div>
    <div class="table-item" v-show="!seen" @mouseenter="onenter" @mouseleave="onleave">
      <table-page
        :tableData="tableData"
        :columns="columns"
        :customHeight='630'
        :tableRowClassName="tableRowClassName"
        :pageParams="pageParams"
        @getPage="getPage"
        @getSize="getSize"
      >
      </table-page>
    </div>
	<div class="hover-table" v-show="seen" @mouseenter="onenter" @mouseleave="onleave">
		<table-page
			ref="hovertable"
			:columns="hoverColumns"
			:tableData="tableData"
			:pageParams="pageParams"
			:customHeight="630"
			@get-page="getPage"
			@get-size="getSize"
			@row-click="rowClick"
			:tableRowClassName="tableRowClassName"
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
import { SearchComponent, TableComponent } from "@/components";
import { TablePage } from "@/components";
import { publicApi } from "@/api";
import {SucInput} from "@suc/ui"
@Component({
  components: {
    SearchComponent,
    TableComponent,
    TablePage,
    SucInput
  }
})
export default class ssyl extends Vue {
  @State netWork: any;
  @Mutation setRightToggle: any;
  @Mutation setTabTable: any;
  seen: boolean = false;
  onenter() {
    this.seen = true;
  }
  onleave() {
    this.seen = false;
  }

  rowParams: any = {};
  rowClick(row: any) {
    this.rowParams = {};
    this.$nextTick(() => {
      this.rowParams = row;
    });
    this.$emit("rowEvents", row);
  }
  tableData:any = [];
  columns: any = [
    {
      title: "序号",
      type: "index"
    },
    {
      title: "监测河道",
      key: "jchd",
      width: 80
    },
    {
      title: "站点名称",
      key: "zdmc",
    },
	{
      title: "最新数据时间",
      key: "zxsjsj",
    },
  ];
  hoverColumns: any[] = [
	  {
      title: "序号",
      type: "index"
    },
    {
      title: "监测河道",
      key: "jchd",
      width: 80
    },
    {
      title: "站点名称",
      key: "zdmc",
    },
	{
      title: "最新数据时间",
      key: "zxsjsj",
    },
	{
      title: "近1小时雨量",
      key: "yl1hour",
    },
	{
      title: "近3小时雨量",
      key: "yl3hour",
    },
	{
      title: "近6小时雨量",
      key: "yl6hour",
    },
	{
      title: "近12小时雨量",
      key: "yl12hour",
    },
	{
      title: "近24小时雨量",
      key: "yl24hour",
    },
	{
      title: "近一周雨量",
      key: "yl1week",
    },
  ]
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
  }
  pq: string = ''
  // 监测点表格数据
  pageParams: any = {
    current: 1,
    total: 0,
    pageSize: 30
  };
  tableParams: any = {
    pageNumber: 1,
    pageSize: 30,
    zdmc: "",
  };
  originData: any = []
  async getTableData() {
    let that = this;
    let url = "wjServer/fangxunjc/yuqing/infoList"
    that.tableParams.pageNumber = that.pageParams.current;
    that.tableParams.pageSize = that.pageParams.pageSize;
    const data = await publicApi.getWithParam(url,that.tableParams);
    that.pageParams.total = parseInt(data.data.total);
    that.tableData = data.data.rows;
  }
  // 搜索
  getInput(val: any) {
    this.tableParams.zdmc = val;
    this.$emit("getParams",this.tableParams)
    this.getTableData();
  }

  getPage(page: any){
    this.pageParams.current = page;
    this.getTableData()
  }
  getSize(size: any){
    this.pageParams.current = 1
    this.pageParams.pageSize = size;
    this.getTableData()
  }

}
</script>
<style lang="scss">
.table-view {
  .el-table .warning-row {
    color: #ff5a47;
  }
  .el-table .gray-row {
    color: rgb(26, 24, 24);
  }
}
</style>
<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
.monitor-view {
  width: 100%;
  height: 100%;
  padding: 15px;
  .monitor-item {
    padding: 0 14px 14px 0;
    &:first-of-type{
      display: flex;
      flex-wrap: nowrap;
    }
  }
  .table-item {
	padding-right: 0;
	// height: calc(100% - 106px);
  }
  .hover-table {
        // height: calc(100% - 140px);
        position: absolute;
        top: 195px;
        left: 25px;
        z-index: 9999;
        background-color: #ffffff;
        pointer-events: auto;
        cursor: pointer;
      }
  .flex-class {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
}
</style>
