<template>
  <div class="survey-flood">
    <table-component :customHeight="customHeight" :columns="columns" :tableData="tableData"> </table-component>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { TableComponent } from "@/components";
import { publicApi, reportApi } from "@/api";
import { SucMessage } from "@suc/ui";
const columns = [
  {
    title: "序号",
    type: "index",
    width: 60,
  },
  {
    title: "台风名称",
    key: "stnm",
    width: 200,
  },
  {
    title: "起始时间",
    key: "beginTime",
  },
  {
    title: "结束时间",
    key: "endTime",
    // width: 150,
  },
  {
    title: "台风半径",
    key: "tfbj",
  },
  {
    title: "平均水位",
    key: "pjsw",
    // width: 150,
  },
  {
    title: "累计雨量",
    key: "total",
  },
];

@Component({
  components: {
    TableComponent,
  },
})
export default class MainPanel extends Vue {
  @Prop({
    type: Object,
    default: () => {},
  })
  report!: any;
  @Prop() clickShow!: boolean;
  customHeight: any = document.documentElement.children[1].clientHeight - 240;
  tableData: Array<any> = [];
  columns: Array<any> = columns;
  async getData() {
    let params = {
      date: this.$utils.dateFormat(new Date(this.report.tfndate), "yyyy"),
    };
    // const url = "wjServer/fangxunjc/z/zDayReport";
    // const data = await publicApi.getWithParam(url, params);
    // if (data.result == true) {
    //   this.tableData = data.data;
    // } else {
    //   this.tableData = [];
    //   this.$SucMessage.error("获取失败");
    // }
    this.tableData = [
      { stnm: "测试台风名称", beginTime: "测试开始时间", endTime: "测试结束时间", tfbj: "测试台风半径", pjsw: "测试平均水位", total: "测试累计雨量" },
      { stnm: "测试台风名称", beginTime: "测试开始时间", endTime: "测试结束时间", tfbj: "测试台风半径", pjsw: "测试平均水位", total: "测试累计雨量" },
    ];
  }
  @Watch("clickShow", { deep: true, immediate: true })
  getReport() {
    if (this.report.bbSel && this.clickShow) {
      this.customHeight = document.documentElement.children[1].clientHeight - 240;
      this.getData();
    }
  }
}
</script>
<style lang="scss" scoped>
.survey-flood {
  width: 100%;
  height: 100%;
}
</style>
