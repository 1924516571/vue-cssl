<template>
  <div class="survey-flood">
    <Table :columns="columns" stripe :data="tableData" :height="customHeight"></Table>
    <div class="tableCount">
      <span>年最高：</span>
      <span>{{ list.max }}</span>
      <span>{{ list.maxT }}</span>
      <span>年最低：</span>
      <span>{{ list.min }}</span>
      <span>{{ list.minT }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { publicApi, reportApi } from "@/api";
import { Table } from "iview";
const columns = [
  {
    title: "日期",
    key: "data",
    width: 90,
  },
  {
    title: "1月8点/平均",
    width: 150,
    key: "1",
    renderHeader: (h: any) => {
      return h("div", [h("div", { style: { textAlign: "center" } }, "1月"), h("div", { style: { textAlign: "center" } }, "8点/平均")]);
    },
  },
  {
    title: "2月8点/平均",
    width: 150,
    key: "2",
    renderHeader: (h: any) => {
      return h("div", [h("div", { style: { textAlign: "center" } }, "2月"), h("div", { style: { textAlign: "center" } }, "8点/平均")]);
    },
  },
  {
    title: "3月8点/平均",
    width: 150,
    key: "3",
    renderHeader: (h: any) => {
      return h("div", [h("div", { style: { textAlign: "center" } }, "3月"), h("div", { style: { textAlign: "center" } }, "8点/平均")]);
    },
  },
  {
    title: "4月8点/平均",
    width: 150,
    key: "4",
    renderHeader: (h: any) => {
      return h("div", [h("div", { style: { textAlign: "center" } }, "4月"), h("div", { style: { textAlign: "center" } }, "8点/平均")]);
    },
  },
  {
    title: "5月8点/平均",
    width: 150,
    key: "5",
    renderHeader: (h: any) => {
      return h("div", [h("div", { style: { textAlign: "center" } }, "5月"), h("div", { style: { textAlign: "center" } }, "8点/平均")]);
    },
  },
  {
    title: "6月8点/平均",
    width: 150,
    key: "6",
    renderHeader: (h: any) => {
      return h("div", [h("div", { style: { textAlign: "center" } }, "6月"), h("div", { style: { textAlign: "center" } }, "8点/平均")]);
    },
  },
  {
    title: "7月8点/平均",
    width: 150,
    key: "7",
    renderHeader: (h: any) => {
      return h("div", [h("div", { style: { textAlign: "center" } }, "7月"), h("div", { style: { textAlign: "center" } }, "8点/平均")]);
    },
  },
  {
    title: "8月8点/平均",
    width: 150,
    key: "8",
    renderHeader: (h: any) => {
      return h("div", [h("div", { style: { textAlign: "center" } }, "8月"), h("div", { style: { textAlign: "center" } }, "8点/平均")]);
    },
  },
  {
    title: "9月8点/平均",
    width: 150,
    key: "9",
    renderHeader: (h: any) => {
      return h("div", [h("div", { style: { textAlign: "center" } }, "9月"), h("div", { style: { textAlign: "center" } }, "8点/平均")]);
    },
  },
  {
    title: "10月8点/平均",
    width: 150,
    key: "10",
    renderHeader: (h: any) => {
      return h("div", [h("div", { style: { textAlign: "center" } }, "10月"), h("div", { style: { textAlign: "center" } }, "8点/平均")]);
    },
  },
  {
    title: "11月8点/平均",
    width: 150,
    key: "11",
    renderHeader: (h: any) => {
      return h("div", [h("div", { style: { textAlign: "center" } }, "11月"), h("div", { style: { textAlign: "center" } }, "8点/平均")]);
    },
  },
  {
    title: "12月8点/平均",
    width: 150,
    key: "12",
    renderHeader: (h: any) => {
      return h("div", [h("div", { style: { textAlign: "center" } }, "12月"), h("div", { style: { textAlign: "center" } }, "8点/平均")]);
    },
  },
];
@Component({
  components: {
    Table,
  },
})
export default class MainPanel extends Vue {
  @Prop({
    type: Object,
    default: () => {},
  })
  report!: any;
  @Prop() clickShow!: boolean;
  customHeight: any = document.documentElement.children[1].clientHeight - 280;
  tableData: Array<any> = [];
  list: any = {};
  columns: Array<any> = columns;
  async getData() {
    let params = {
      stcd: this.report.swstcd,
      year: this.$utils.dateFormat(new Date(this.report.swndate), "yyyy"),
    };
    const url = "wjServer/fangxunjc/z/zYearReport "
    const {data} = await publicApi.getWithParam(url,params);
    this.list = data;
    if (data) {
      this.tableData.forEach((it: any, key: any) => {
        Object.keys(it).forEach((keya: any) => {
          Object.keys(data).forEach((keyb: any) => {
            if (keya == keyb) {
              Object.keys(data[keyb]).forEach((keyc: any) => {
                if (keyc == it.id) {
                  it[keya] = data[keyb][keyc];
                }
              });
            }
          });
        });
      });
    } else {
      this.init();
    }
  }
  mounted() {
    this.init();
  }
  init() {
    this.tableData = [];
    for (let i = 0; i < 35; i++) {
      this.tableData.push({
        data: i + 1,
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: "",
        10: "",
        11: "",
        12: "",
        id: i + 1,
      });
    }
    this.tableData.forEach((it: any) => {
      if (it.data == 32) {
        it.data = "月最高";
        it.id = "max";
      } else if (it.data == 33) {
        it.data = "发生时间";
        it.id = "maxT";
      } else if (it.data == 34) {
        it.data = "月最低";
        it.id = "min";
      } else if (it.data == 35) {
        it.data = "发生时间";
        it.id = "minT";
      }
    });
    console.log(this.tableData, "[[[");
  }
  @Watch("clickShow", { deep: true, immediate: true })
  getReport() {
    if (this.report.bbSel && this.clickShow) {
      this.customHeight = document.documentElement.children[1].clientHeight - 280;
      this.getData();
    }
  }
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
.survey-flood {
  width: 100%;
  height: 100%;
  #{$deep}.ivu-table-wrapper {
    border: none;
    .ivu-table {
      &::before,
      &::after {
        background: none;
      }
      tr {
        th,
        td {
          border: none;
        }
      }
    }
  }
  .tableCount {
    width: 100%;
    height: 35px;
    display: flex;
    border-top: 1px solid #e9e9e9;
    span {
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 35px;
    }
  }
}
</style>
