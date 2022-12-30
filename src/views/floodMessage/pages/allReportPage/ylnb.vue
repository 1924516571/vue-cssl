<template>
  <div>
    <suc-table :data="tableData" :height="tableHeight" stripe border>
      <suc-table-column v-for="(item, index) in columns" :key="index" :prop="item.prop" :label="item.label" :width="item.width" align="center"> </suc-table-column>
    </suc-table>
    <suc-table :data="lastRowData" border :show-header="false" :span-method="handleSpan">
      <suc-table-column v-for="(item, index) in lastRowCol" :key="index" :prop="item.prop" :label="item.label" :width="item.width" align="center"> </suc-table-column>
    </suc-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { SucTable, SucTableColumn } from "@suc/ui";
import { publicApi, reportApi } from "@/api";
@Component({
  components: {
    SucTable,
    SucTableColumn,
  },
})
export default class Ylnb extends Vue {
  @Prop()
  report: any;
  @Prop() clickShow!: boolean;
  //   @Watch("report",{immediate: true, deep: true})
  //   changeReport(){
  //       this.getRainYearData();
  //   }
  @Watch("clickShow", { deep: true, immediate: true })
  getReport() {
    if (this.report.bbSel && this.clickShow) {
      this.tableHeight = document.documentElement.children[1].clientHeight - 240;
      this.getRainYearData();
    }
  }

  tableHeight: any = document.documentElement.children[1].clientHeight - 240;
  tableData: any = [];
  lastRowData: any = [
    {
      txt1: "年累计",
      txt2: "降雨天数",
      txt3: "最大降雨",
      txt4: "发生时间",
    },
  ];
  lastRowCol: any = [
    {
      prop: "txt1",
      label: "年累计",
      width: "",
    },
    {
      prop: "val1",
      label: "年累计值",
      width: "",
    },
    {
      prop: "txt2",
      label: "降雨天数",
      width: "",
    },
    {
      prop: "val2",
      label: "降雨天数值",
      width: "",
    },
    {
      prop: "txt3",
      label: "最大降雨",
      width: "",
    },
    {
      prop: "val3",
      label: "最大降雨值",
      width: "",
    },
    {
      prop: "txt4",
      label: "发生时间",
      width: "",
    },
    {
      prop: "val4",
      label: "发生时间值",
      width: "",
    },
    {
      prop: "",
      label: "空格",
      width: "",
    },
  ];
  columns: any = [
    // {
    //   prop: "aaa",
    //   label: "日期",
    //   width: "",
    // },
    // {
    //   prop: "bbb",
    //   label: "1月",
    //   width: "",
    // },
    // {
    //   prop: "",
    //   label: "2月",
    //   width: "",
    // },
    // {
    //   prop: "",
    //   label: "3月",
    //   width: "",
    // },
    // {
    //   prop: "",
    //   label: "4月",
    //   width: "",
    // },
    // {
    //   prop: "",
    //   label: "5月",
    //   width: "",
    // },
    // {
    //   prop: "",
    //   label: "6月",
    //   width: "",
    // },
    // {
    //   prop: "",
    //   label: "7月",
    //   width: "",
    // },
    // {
    //   prop: "",
    //   label: "8月",
    //   width: "",
    // },
    // {
    //   prop: "",
    //   label: "9月",
    //   width: "",
    // },
    // {
    //   prop: "",
    //   label: "10月",
    //   width: "",
    // },
    // {
    //   prop: "",
    //   label: "11月",
    //   width: "",
    // },
    // {
    //   prop: "",
    //   label: "12月",
    //   width: "",
    // },
  ];
  handleSpan({ row, column, rowIndex, columnIndex }: any) {
    if (rowIndex === 0 && columnIndex === 8) {
      return {
        rowspan: 1,
        colspan: 4,
      };
    }
  }

  params: any = {
    stcd: "",
    time: "",
  };
  mounted() {
    this.getRainYearData();
  }

  async getRainYearData() {
    // debugger
    this.tableData = [];
    this.lastRowData = [];
    this.params.stcd = this.report.stcd;
    this.params.time = this.$utils.dateFormat(this.report.ylndate, "yyyy");
    const url = "wjServer/fangxunjc/yuqing/yuliangYearly"
    let  {data} = await publicApi.getWithParam(url,this.params);
    console.log(data,"lll");
    
    this.columns = [];
    for (let key in data.header) {
      this.columns.push({
        prop: key,
        label: data.header[key],
      });
    }
    console.log(this.columns,"666");
    
    this.tableData = data.list;
    this.lastRowData.push({
      txt1: "年累计",
      val1: data.yearTotal,
      txt2: "降雨天数",
      val2: data.rainDay,
      txt3: "最大降雨",
      val3: data.max,
      txt4: "发生时间",
      val4: data.maxT,
    });
  }
}
</script>

<style scoped></style>
