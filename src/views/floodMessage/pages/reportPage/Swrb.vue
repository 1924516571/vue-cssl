<template>
  <div class="survey-flood">
    <table-component :customHeight="customHeight" :columns="columns" :tableData="tableData"> </table-component>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { TableComponent } from "@/components";
import { publicApi } from "@/api";
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
  //   {
  //     title: "平均水位",
  //     key: "avg",
  //   },
  {
    title: "0点",
    key: "sw0",
  },
  {
    title: "1点",
    key: "sw1",
  },
  {
    title: "2点",
    key: "sw2",
  },
  {
    title: "3点",
    key: "sw3",
  },
  {
    title: "4点",
    key: "sw4",
  },
  {
    title: "5点",
    key: "sw5",
  },
  {
    title: "6点",
    key: "sw6",
  },
  {
    title: "7点",
    key: "sw7",
  },
  {
    title: "8点",
    key: "sw8",
  },
  {
    title: "9点",
    key: "sw9",
  },
  {
    title: "10点",
    key: "sw10",
  },
  {
    title: "11点",
    key: "sw11",
  },
  {
    title: "12点",
    key: "sw12",
  },
  {
    title: "13点",
    key: "sw13",
  },
  {
    title: "14点",
    key: "sw14",
  },
  {
    title: "15点",
    key: "sw15",
  },
  {
    title: "16点",
    key: "sw16",
  },
  {
    title: "17点",
    key: "sw17",
  },
  {
    title: "18点",
    key: "sw18",
  },
  {
    title: "19点",
    key: "sw19",
  },
  {
    title: "20点",
    key: "sw20",
  },
  {
    title: "21点",
    key: "sw21",
  },
  {
    title: "22点",
    key: "sw22",
  },
  {
    title: "23点",
    key: "sw23",
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
      stcds: this.report.stcd.toString(),
      date: this.$utils.dateFormat(new Date(this.report.date), "yyyy-MM-dd"),
    };
    const url = "wjServer/fangxunjc/z/daylyMoreStReport";
    const data = await publicApi.getWithParam(url, params);
    if (data.result == true) {
      this.tableData = data.data;
    }
  }
  @Watch("clickShow", { deep: true, immediate: true })
  getReport() {
    if (this.clickShow) {
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
