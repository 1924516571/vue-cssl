<template>
  <div>
    <table-component :customHeight="tableHeight" :columns="columns" :tableData="tableData"> </table-component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { TableComponent } from "@/components";
import { publicApi, reportApi } from "@/api";

const columns = [
  {
    type: "index",
    title: "序号",
    width: 60,
  },
  {
    key: "stnm",
    title: "站点名称",
    width: 150,
  },
  {
    key: "maxyl",
    title: "最大时段雨量",
    width: 120,
  },
  {
    key: "fssj",
    title: "发生时间",
    width: 120,
  },
  {
    key: "sumyl",
    title: "当日累计雨量",
    width: 120,
  },
  {
    key: "yl8",
    title: "8-9时",
    width: 90,
  },
  {
    key: "yl9",
    title: "9-10时",
    width: 90,
  },
  {
    key: "yl10",
    title: "10-11时",
    width: 90,
  },
  {
    key: "yl11",
    title: "11-12时",
    width: 90,
  },
  {
    key: "yl12",
    title: "12-13时",
    width: 90,
  },
  {
    key: "yl13",
    title: "13-14时",
    width: 90,
  },
  {
    key: "yl14",
    title: "14-15时",
    width: 90,
  },
  {
    key: "yl15",
    title: "15-16时",
    width: 90,
  },
  {
    key: "yl16",
    title: "16-17时",
    width: 90,
  },
  {
    key: "yl17",
    title: "17-18时",
    width: 90,
  },
  {
    key: "yl18",
    title: "18-19时",
    width: 90,
  },
  {
    key: "yl19",
    title: "19-20时",
    width: 90,
  },
  {
    key: "yl20",
    title: "20-21时",
    width: 90,
  },
  {
    key: "yl21",
    title: "21-22时",
    width: 90,
  },
  {
    key: "yl22",
    title: "22-23时",
    width: 90,
  },
  {
    key: "yl23",
    title: "23-0时",
    width: 90,
  },
  {
    key: "yl0",
    title: "0-1时",
    width: 90,
  },
  {
    key: "yl1",
    title: "1-2时",
    width: 90,
  },
  {
    key: "yl2",
    title: "2-3时",
    width: 90,
  },
  {
    key: "yl3",
    title: "3-4时",
    width: 90,
  },
  {
    key: "yl4",
    title: "4-5时",
    width: 90,
  },
  {
    key: "yl5",
    title: "5-6时",
    width: 90,
  },
  {
    key: "yl6",
    title: "6-7时",
    width: 90,
  },
  {
    key: "yl7",
    title: "7-8时",
    width: 90,
  },
];
@Component({
  components: {
    TableComponent,
  },
})
export default class Ylrb extends Vue {
  @Prop({
    type: Object,
    default: () => {},
  })
  report!: any;
  @Prop() clickShow!: boolean;
  tableHeight: any = document.documentElement.children[1].clientHeight - 240;
  tableData: any = [];
  columns: any = columns;

  async getData() {
    let params = {
      date: this.$utils.dateFormat(new Date(this.report.yldate), "yyyy-MM-dd"),
    };
    const url = "wjServer/fangxunjc/yuqing/yuliangDaily";
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
      this.tableHeight = document.documentElement.children[1].clientHeight - 240;
      this.getData();
    }
  }
}
</script>

<style scoped></style>
