<template>
  <div class="network-view">
    <div class="item-view left">
        <div class="tab-btns">
          <template>
            <suc-tabs @on-click="getTab">
              <suc-tab-pane label="河道">
                <monitor
                  @enter-table="enterTable"
                  @leave-table="leaveTable"
                  @getSjzt="getSjzt"
                  @getParams="getParams"
                ></monitor>
              </suc-tab-pane>
              <suc-tab-pane label="实时雨量">
                <task></task>
                <!-- <tab-table
                  :columns="taskColumns"
                  :tableData="tableData"
                ></tab-table> -->
              </suc-tab-pane>
              <suc-tab-pane label="重点水位">
                <rain-water @row-click="rainClick"></rain-water>
                <!-- <tab-table
                  :columns="rainwaterColumns"
                  :tableData="tableData"
                ></tab-table> -->
              </suc-tab-pane>
              <suc-tab-pane label="重点工程">
                <enterprise @rowClick="qyRowClick"></enterprise>
                <!-- <tab-table
                  :columns="enterpriseColumns"
                  :tableData="tableData"
                ></tab-table> -->
              </suc-tab-pane>
              
              <suc-tab-pane label="运行简报">
                <mani></mani>
                <tab-table
                  :columns="maniColumns"
                  :tableData="tableData"
                ></tab-table>
              </suc-tab-pane>
            </suc-tabs>
          </template>
        </div>
    </div>
    <!--  监测点水位  -->
    <transition name="slide-fade">
      <div class="item-view right" v-if="rightToggle">
        <panel-view heading="水位历史记录">
          <template slot="right">
            <suc-date-picker
              v-model="floodParams.date"
              :options="options"
              style="width: 60%"
            ></suc-date-picker>
          </template>
          <div class="item-panel">
            <level-table
              :floodParams="floodParams"
              @right-toggle="ontoggle"
            ></level-table>
          </div>
        </panel-view>
        <div class="close-btn bg-shadow" @click="getRightshow">
          <span>×</span>
        </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <div class="item-view right" v-if="netWork.rightToggle">
        <div class="right-item">
          <panel-view heading="雨水管网自动监测设备情况">
            <div class="item-panel">
              <equipment></equipment>
            </div>
          </panel-view>
        </div>
        <div class="right-item">
          <panel-view heading="雨水管网旱流预警情况">
            <div class="item-panel">
              <warning-condition></warning-condition>
            </div>
          </panel-view>
        </div>
        <div class="right-item">
          <panel-view heading="雨水管网旱流预警分布">
            <div class="item-panel">
              <warning-distribution></warning-distribution>
            </div>
          </panel-view>
        </div>
      </div>
    </transition>
    <div class="item-view center" v-if="show">
      <detail :url="url" @goback="goback"></detail>
    </div>
    <div
      class="table-hover"
      v-show="seen"
      @mouseenter="enterTable2"
      @mouseleave="leaveTable2"
    >
      <table-page
        :tableData="netWork.tabTable"
        :columns="hoverColumns"
        :customHeight="tableHeight"
        :tableRowClassName="tableRowClassName"
        :pageParams="pageParams"
        @row-click="rowClick"
        @get-size="getSize"
        @get-page="getPage"
        @sort-change="sortChange"
      >
        <template v-slot:level="{ row }">
          <div>
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
            <span v-else>-</span>
          </div>
        </template>
        <template v-slot:state="{ row }">
          <div
            v-if="row.STAT"
            :class="[
              row.STAT == '异常'
                ? 'red-state'
                : row.STAT == '正常'
                ? 'green-state'
                : 'status-wx',
              'state-bg',
            ]"
          >
            <span>{{ row.STAT }}</span>
          </div>
          <div v-else><span>-</span></div>
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
  Watch,
} from "vue-property-decorator";
import { State, Mutation, Action, namespace } from "vuex-class";
import {
  SucCol,
  SucCheckbox,
  SucCheckboxGroup,
  SucRow,
  SucTabs,
  SucTabPane,
  SucDatePicker,
} from "@suc/ui";
import { PanelView, TablePage } from "@/components";
import { Monitor, Enterprise, Mani, RainWater, Task } from "./leftComponents";
import {
  Equipment,
  WarningCondition,
  WarningDistribution,
} from "./rightComponents";
import { Detail } from "./detailComponents";

import { networkApi, overview } from "@/api";
import { getPipeNetworkIcon } from "@/constants/mapIcon";
import { LevelTable } from "./rightComponents";
import { DatePickerOptions } from "@suc/ui/interfaces";
const mapStore = namespace("mapStore");
@Component({
  components: {
    SucCheckbox,
    SucCheckboxGroup,
    SucRow,
    SucCol,
    SucTabs,
    SucTabPane,
    PanelView,
    TablePage,
    Monitor,
    Enterprise,
    Mani,
    RainWater,
    Task,
    Equipment,
    WarningCondition,
    WarningDistribution,
    Detail,
    LevelTable,
    SucDatePicker,
  },
})
export default class NetworkPanel extends Vue {
  @Prop({
    type: Object,
    default: () => {},
  })
  listType!: any;
  @Prop({
    type: Object,
    default: () => {},
  })
  listMap!: any;
  @State netWork: any;
  @Mutation setTabTable: any;
  @Mutation setRow: any;
  @mapStore.Mutation setMarkers: any;
  @mapStore.Mutation setMarkerFlag: any;
  @Emit()
  rainClick() {}
  url: string = this.$route.path;
  markers: any[] = [];
  markerArr: any[] = [];
  show: boolean = false; //详情页
  seen: boolean = false;
  rightToggle: boolean = false;
  checkboxGroupValue: string[] = [
    "监测点",
    // '窨井',
    "风险单位",
    "任务事件",
  ];
  floodParams: any = {
    row: {},
    date: [],
    rowflag: false,
    dateflag: false,
  };
  options: DatePickerOptions = {
    type: "datetimerange",
  };
  getCheck(val: any) {
    this.markers = [];
    this.setMarkers([]);
    val.forEach((e: any) => {
      this.match(e);
    });
  }
  getRightshow() {
    this.rightToggle = false;
  }
  match(key: any) {
    switch (key) {
      case "任务事件":
        this.getTaskGis();
        break;
      case "监测点":
        this.getMonitorGis();
        break;
      /*
      case '窨井':
        this.getManiGis()
        break*/
      case "风险单位":
        this.getSewageGis();
        break;
    }
  }
  hoverColumns: any = [
    {
      title: "序号",
      type: "index",
    },
    {
      title: "区域",
      key: "MC",
      width: 80,
    },
    {
      title: "站点名称",
      key: "SBMC",
    },
    {
      title: "最新水位(米)",
      key: "VALU",
      slot: "level",
      sortable: "custom",
    },
    {
      title: "更新时间",
      key: "UPDATETIME",
      sortable: "custom",
      width: 160,
    },
    {
      title: "报警状态",
      key: "state",
      slot: "state",
      sortable: "custom",
    },
  ];
  // hoverData: any[] = []
  tableHeight: any = document.documentElement.children[1].clientHeight - 360;
  tableRowClassName({ row }: any) {
    if (row.SBZT != "在线") {
      return "gray-row";
    }
    if (row.STAT == "异常") {
      return "warning-row";
    }
    // return row.STAT == '异常' ? 'warning-row' : ''
  }
  enterTable() {
    this.seen = true;
    this.getCurTable();
  }
  leaveTable() {
    this.seen = false;
  }
  enterTable2() {
    this.seen = true;
    this.getCurTable();
  }
  leaveTable2() {
    this.seen = false;
  }
  rowClick(row: any) {
    this.rightToggle = true;
    this.floodParams.row = row;
    let timers = new Date().getTime() - 3 * 1000 * 3600 * 24;
    this.floodParams.date = [
      new Date(new Date(timers).setHours(0, 0, 0, 0)),
      new Date(),
    ];
    this.$emit("rowEvents", row);
  }
  //水位线
  ontoggle() {
    this.rightToggle = false;
  }
  goback(val: boolean) {
    this.markers = [];
    this.getMonitorGis();
    this.getTaskGis();
    this.getSewageGis();
    // this.getManiGis()
    this.show = val;
    this.$emit("listType", {});
  }
  getTab(name: any) {
    // this.tableData = [];
    // this.hoverColumns = [];
    // this.hoverData = [];
    this.tableParams.currentPage = this.pageParams.current;
    this.tableParams.pageSize = this.pageParams.pageSize;
    if (name == 0) {
      this.getTableData();
    } else if (name == 1) {
      // this.getTaskList()
    } else if (name == 2) {
      // this.getRainwaterTable()
    } else if (name == 3) {
      // this.getSewage()
    } else if (name == 4) {
      // this.getManiTable()
    } else {
    }
  }
  mounted() {
    this.show = false;
    this.markers = [];
    this.getTableData();
    this.getMonitorGis();
    this.getTaskGis();
    this.getSewageGis();
    // this.getManiGis()
  }
  // 监测点
  pageParams: any = {
    current: 1,
    total: 0,
    pageSize: 30,
  };
  tableParams: any = {
    // currentPage: 1,
    // pageSize: 30,
    gwmc: "",
    sjzt: [],
    pqmc: "",
  };
  getSjzt(sjzt: any) {
    this.tableParams.sjzt = sjzt;
    this.getTableData();
  }
  getParams(param: any) {
    this.tableParams.pqmc = param.pqmc;
    this.tableParams.gwmc = param.gwmc;
    this.getTableData();
  }
  async getTableData() {
    let that = this;
    // that.hoverData = [];
    // that.tableParams.currentPage = that.pageParams.current
    // that.tableParams.pageSize = that.pageParams.pageSize
    that.pageParams.current = 1;
    const tabledata = await networkApi.getCurTableData(that.tableParams);
    let data = tabledata.data;
    this.originData = data;
    this.tableData = data;
    // that.hoverData = data;
    that.pageParams.total = data.length;
    // this.getCurTable();
  }
  async getMonitorGis() {
    let data = await networkApi.getMonitorGis();
    this.markerArr = data
      .filter((e: any) => e.JD && e.WD)
      .map((item: any, i: any) => {
        return {
          id: item.SBID,
          name: item.ZDMC,
          lon: item.JD,
          lat: item.WD,
          info: item,
          coords: [item.JD, item.WD],
          type: item.STATUS,
          style: {
            image: {
              icon: {
                anchor: [0.5, 1],
                scale: 0.5,
                src: getPipeNetworkIcon(item.SBZT, item.STATUS),
              },
            },
          },
        };
      });
    this.markers = this.markers.concat(this.markerArr);
    this.setMarkers(this.markers);
  }
  
  curtableData: any = [];
  getSize(size: number) {
    this.pageParams.current = 1;
    this.pageParams.pageSize = size;
    this.getCurTable();
  }
  getPage(page: number) {
    this.pageParams.current = page;
    this.getCurTable();
  }
  getCurTable() {
    let data: any = this.tableData;
    this.curtableData = data.slice(
      (this.pageParams.current - 1) * this.pageParams.pageSize,
      this.pageParams.current * this.pageParams.pageSize
    );
    this.setTabTable(this.curtableData);
  }
  //按数字排序
  getAsc(a: any, b: any) {
    return a[this.type] - b[this.type];
  }
  getDesc(a: any, b: any) {
    return b[this.type] - a[this.type];
  }
  //按日期排序
  getDateDesc(a: any, b: any) {
    return (
      Date.parse(b[this.type].replace(/-/g, "/")) -
      Date.parse(a[this.type].replace(/-/g, "/"))
    );
  }
  getDateAsc(a: any, b: any) {
    return (
      Date.parse(a[this.type].replace(/-/g, "/")) -
      Date.parse(b[this.type].replace(/-/g, "/"))
    );
  }
  //字符串排序
  getStrAsc(a: any, b: any) {
    return (a[this.type] + "").localeCompare(b[this.type] + "");
  }
  getStrDesc(a: any, b: any) {
    return (b[this.type] + "").localeCompare(a[this.type] + "");
  }
  type: string = "";
  originData: any = [];
  sortChange(sortInfo: any) {
    let data: any = this.originData;
    this.type = sortInfo.prop == "state" ? "STAT" : sortInfo.prop;
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
      if (this.type == "UPDATETIME") {
        this.tableData = unList.concat(list.sort(this.getDateAsc));
      } else if (this.type == "STAT") {
        this.tableData = unList.concat(list.sort(this.getStrAsc));
      } else {
        this.tableData = unList.concat(list.sort(this.getAsc));
      }
    } else if (sortInfo.order == "descending") {
      if (this.type == "UPDATETIME") {
        this.tableData = list.sort(this.getDateDesc).concat(unList);
      } else if (this.type == "STAT") {
        this.tableData = list.sort(this.getStrDesc).concat(unList);
      } else {
        this.tableData = list.sort(this.getDesc).concat(unList);
      }
    } else {
      this.tableData = this.originData;
    }
    this.getCurTable();
  }

  // changeTable(data: any){
  //   this.originData = data;
  //   console.log(this.netWork.tabData)
  //   // this.getCurTable();
  // }

  // 任务事件

  tableData: any[] = [];
  // async getTaskList () {
  //   let data = await networkApi.getTaskList(this.tableParams1)
  //   this.tableData = data.data
  // }
  async getTaskGis() {
    let data = await networkApi.getTaskGis();
    let gisData = data.map((arr: any, index: number) => {
      let item = {
        id: "task" + arr.id,
        name: arr.name,
        lon: arr.jd,
        lat: arr.wd,
        coords: [arr.jd, arr.wd],
      };
      return item;
    });
    let filterGis = gisData.filter((item: any) => {
      if (item.lon && item.lat) {
        return item;
      }
    });
    let icon = require("@/assets/map/任务事件-已完成.png");
    this.getGisData(filterGis, icon);
  }
  // 雨水管网

  async getSewageGis() {
    let that = this;
    let data = await overview.getSewageGis();
    let gisData = data.map((arr: any) => {
      let item = {
        id: "net" + arr[0],
        name: arr[1],
        lon: arr[2],
        lat: arr[3],
        coords: [arr[2], arr[3]],
      };
      return item;
    });
    let icon = require("@/assets/map/企业.png");
    that.getGisData(gisData, icon);
  }
  // 窨井

  async getManiGis() {
    let that = this;
    let data = await overview.getManiGis();
    let gisData = data.map((item: any) => {
      return {
        id: item.YJID,
        name: item.ZDMC,
        lon: item.JD,
        lat: item.WD,
        info: item,
        coords: [item.JD, item.WD],
      };
    });
    let icon = require("@/assets/map/窨井-正常.png");
    that.getGisData(gisData, icon);
  }
  // 地图
  getGisData(gisdata: any, icon: any) {
    let source = {
      style: {
        image: {
          icon: {
            scale: 0.5,
            anchor: [0.5, 1],
            src: icon,
          },
        },
      },
    };
    gisdata = gisdata.filter((e: any) => e.lon && e.lat);
    let arr = gisdata.map((item: any) => {
      return Object.assign(item, source);
    });
    this.markers = this.markers.concat(arr);
    this.setMarkers(this.markers);
  }
  @Watch("listType", { deep: true, immediate: true })
  onChange() {
    if (this.listType.SBID) {
      this.show = true;
      this.setMarkerFlag("");
      this.setMarkers([]);
      this.setRow(this.listType);
    }
  }
  @Watch("listMap", { deep: true, immediate: true })
  onMapList() {
    if (this.listMap.SBID) {
      this.rowClick(this.listMap);
    }
  }

  //企业列表点击
  qyRowClick(row: any) {
    this.$emit("qyRowClick", row);
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
.network-view {
  width: 100%;
  height: 100%;
  position: relative;
  top: 50px;
  .item-view {
    height: 100%;
    background-color: #ffffff;
    box-shadow: 2px 0px 10px 0px rgba(0, 0, 0, 0.12);
    position: relative;
    .close-btn {
      position: absolute;
      top: 0;
      left: -24px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 60px;
      font-size: 30px;
      color: #9a9a9a;
      pointer-events: auto;
      cursor: pointer;
    }
  }
  .left {
    width: 450px;
    float: left;
    pointer-events: auto;
  }
  .right {
    width: 560px;
    float: right;
  }
  .center {
    width: 100%;
    height: 100%;
    padding: 10px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: $pages-bg;
  }
  .check-btns {
    padding: 0 14px 14px;
    border-bottom: 1px solid $border-color;
  }
  .tab-btns {
    padding: 14px 0;
    height: calc(100% - 88px);
  }
  .right-item {
    &:first-of-type {
      height: 18%;
    }
    &:nth-of-type(2) {
      height: 30%;
    }
    &:nth-of-type(3) {
      height: 40%;
    }
  }
  .item-panel {
    width: 100%;
    height: calc(100% - 52px);
    padding: 5px 14px;
  }
  .table-hover {
    padding-bottom: 10px;
    width: 44%;
    // height: 70%;
    position: absolute;
    top: 263px;
    left: 14px;
    z-index: inherit;
    background-color: #ffffff;
    pointer-events: auto;
    cursor: pointer;
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
    .state-bg {
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
    .green-state {
      background-color: $state-green;
    }
    .red-state {
      background-color: $state-red;
    }
  }
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
}
.unyjd {
  position: absolute;
  left: 480px;
  bottom: 15px;
}
</style>
