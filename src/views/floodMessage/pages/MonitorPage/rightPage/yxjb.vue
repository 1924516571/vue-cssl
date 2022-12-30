<template>
  <!-- 涵闸监测 -->
  <div class="mon-jc scoll">
    <div class="des">
      截止到{{rowList.yesterdayDate}}
      23:59:59,{{rowList.areaName}}泵站在线数{{rowList.onlineStationNum}}座，在线率：{{rowList.onlineRate}}%，故障率：{{rowList.stationFaultRate}}%；运行事件{{rowList.problemNum}}件，已处理{{rowList.handleProblemNum}}条，未处理{{rowList.unHandleProblemNum}}条，完成率：{{rowList.completionRate}}%；报警信息{{rowList.warningNum}}条，正在报警{{rowList.nowWarningNum}}条，历史报警{{rowList.historyWarningNum}}条。
    </div>
    <div class="bb">
      <panel-view heading="武进区泵站运行情况">
        <table-no :columns="columns1" :tableData="tableData"> </table-no>
      </panel-view>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { PanelView, TableNo } from "@/components";
import { publicApi } from "@/api";
@Component({
  components: {
    TableNo,
    PanelView,
  },
})
export default class MainPanel extends Vue {
  model: boolean = false;
  rowList: any = {};
  userInfo: any = JSON.parse(localStorage.getItem("userInfo") || "");
  tableData: Array<any> = [];
  columns1: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "区域",
      key: "xzqy",
    },
    {
      title: "泵站名称",
      key: "bzmc",
    },
    {
      title: "总流量",
      key: "totalQ",
    },
    {
      title: "开机时间",
      key: "beginTime",
      width: 92,
    },
    {
      title: "关机时间",
      key: "endTime",
      width: 70,
    },
    {
      title: "设计流量(m³/s)",
      key: "zjll",
      width: 88,
    },
  ];

  mounted() {
      this.getData()
  }

  async getData() {
    let url = "wjServer/fangxunjc/zhabengzhanyx/briefReport";
    let data = await publicApi.getWithParam(url,{areaCode:this.userInfo.areaCode});
    this.tableData = data.data.runningList
    this.rowList = data.data
  }
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
.mon-jc {
  width: 100%;
  height: 100%;
  padding: 15px;
  overflow-y: auto;

  .des {
    text-indent: 20px;
    font-size: 13px;
  }
  h3 {
    margin-top: 20px;
  }
  .bb {
    margin: auto;
    height: 500px;
    margin-bottom: 5%;
    margin-top: 40px;
  }
}
</style>
