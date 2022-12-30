<template>
  <div class="survey-flood">
    <table-component :customHeight="customHeight" :columns="columns" :tableData="tableData"> </table-component>
    <!-- <table :height="customHeight"  stripe :columns="columns" :data="tableData"> </table> -->
    <!-- <Table :columns="columns" stripe :data="tableData" :height="customHeight"></Table> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { TableComponent } from "@/components";
import { publicApi, reportApi } from "@/api";
import { Table } from "iview";
import { SucMessage } from "@suc/ui";
const columns = [
  {
    title: "序号",
    type: "index",
    width: 60,
  },
  {
    title: "站点名称",
    key: "stnm",
    width: 200,
  },
  {
    title: "最高水位",
    key: "zgsw",
  },
  {
    title: "发生时间",
    key: "zgtm",
    width: 150,
  },
  {
    title: "最低水位",
    key: "zdsw",
  },
  {
    title: "发生时间",
    key: "zdtm",
    width: 150,
  },

  {
    title: "1日",
    key: "avg1",
    // width: 150,
    // renderHeader: (h: any) => {
    //   return h("div", [h("div", { style: { textAlign: "center" } }, "1日"), h("div", { style: { textAlign: "center" } }, "平均水位")]);
    // },
  },
  {
    title: "2日",
    key: "avg2",
  },
  {
    title: "3日",
    key: "avg3",
  },
  {
    title: "4日",
    key: "avg4",
  },
  {
    title: "5日",
    key: "avg5",
  },
  {
    title: "6日",
    key: "avg6",
  },
  {
    title: "7日",
    key: "avg7",
  },
  {
    title: "8日",
    key: "avg8",
  },
  {
    title: "9日",
    key: "avg9",
  },
  {
    title: "10日",
    key: "avg10",
  },
  {
    title: "11日",
    key: "avg11",
  },
  {
    title: "12日",
    key: "avg12",
  },
  {
    title: "13日",
    key: "avg13",
  },
  {
    title: "14日",
    key: "avg14",
  },
  {
    title: "15日",
    key: "avg15",
  },
  {
    title: "16日",
    key: "avg16",
  },
  {
    title: "17日",
    key: "avg17",
  },
  {
    title: "18日",
    key: "avg18",
  },
  {
    title: "19日",
    key: "avg19",
  },
  {
    title: "20日",
    key: "avg20",
  },
  {
    title: "21日",
    key: "avg21",
  },
  {
    title: "22日",
    key: "avg22",
  },
  {
    title: "23日",
    key: "avg23",
  },
  {
    title: "24日",
    key: "avg24",
  },
  {
    title: "25日",
    key: "avg25",
  },
  {
    title: "26日",
    key: "avg26",
  },
  {
    title: "27日",
    key: "avg27",
  },
  {
    title: "28日",
    key: "avg28",
  },
  {
    title: "29日",
    key: "avg29",
  },
  {
    title: "30日",
    key: "avg30",
  },
  {
    title: "31日",
    key: "avg31",
  },
];
@Component({
  components: {
    TableComponent,
    Table, // 年报的表格组件
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
      month: this.$utils.dateFormat(new Date(this.report.date), "yyyy-MM"),
    };
    const url = "wjServer/fangxunjc/z/zMonthReport";
    const data = await publicApi.getWithParam(url, params);
    if (data.result == true) {
      this.tableData = data.data;
    } else {
      this.tableData = [];
      this.$SucMessage.error("获取失败");
    }
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
