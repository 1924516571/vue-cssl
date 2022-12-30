<template>
  <!-- 重点水位 -->
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
      <template v-slot:bjList="{ row }">
        <div class="bjzt" v-for="(item, index) in row.bjList" :key="index">
          <template v-if="item == 1">
            <img src="@/assets/monFlood/1.gif" />
          </template>
          <template v-if="item == 0">
            <img src="@/assets/monFlood/2.gif" />
          </template>
        </div>
      </template>
      <!-- 闸门 -->
      <template v-slot:zwList="{ row }">
       <div class="bjzt" v-for="(item, index) in row.zmList" :key="index">
          <template v-if="item != 0">
            <img src="@/assets/monFlood/3.gif" />
          </template>
          <template v-if="item == 0">
            <img src="@/assets/monFlood/4.gif" />
          </template>
        </div>
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
export default class zdgc extends Vue {
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
      type: "index",
    },
    {
      title: "站点名称",
      key: "stationName",
    },
    {
      title: "内河水位(m)",
      key: "nhsw",
    },
  ];
  hoverColumns: any[] = [
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
      width: 130,
    },
    {
      title: "外河水位(m)",
      key: "whsw",
      width: 130,
    },
    {
      title: "泵机状态",
      key: "bjList",
      slot: "bjList",
      width: 220,
    },
    {
      title: "警戒液位(m)",
      key: "jjsw",
      width: 130,
    },
    {
      title: "闸门状态",
      slot: "zwList",
      width: 90,
    },
    {
      title: "更新时间",
      key: "ntime",
      width: 140,
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
    stationName: "",
  };
  originData: any = []
  async getTableData() {
    let that = this;
    let url = "wjServer/fangxunjc/zhabengzhanyx/infoList"
    that.tableParams.pageNumber = that.pageParams.current;
    that.tableParams.pageSize = that.pageParams.pageSize;
    const data = await publicApi.getWithParam(url,that.tableParams);
    that.pageParams.total = parseInt(data.data.total);
    that.tableData = data.data.rows;
  }
  // 搜索
  getInput(val: any) {
    this.tableParams.stationName = val;
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
    color: #999;
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
        .bjzt {
          display: inline-flex;
          align-items: center;
        }
      }
  .flex-class {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
}
</style>
