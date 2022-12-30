<template>
  <div class="survey-flood">
    <table-component :customHeight="tableHeight" :columns="columns" :tableData="tableData"> </table-component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { TableComponent } from "@/components";
import { publicApi, reportApi } from "@/api";
@Component({
  components: {
    TableComponent,
  },
})
export default class YlyModal extends Vue {
  @Prop({
    type: Object,
    default: () => {},
  })
  rowList!: any;
  @Prop({
    type: Object,
    default: () => {},
  })
  report!: any;
  tableHeight: any = 400;
  tableData: any = [];
  columns: any = [
    {
      type: "index",
      title: "序号",
    },
    {
      key: "idtm",
      title: "日期",
    },
    {
      key: "az",
      title: "日量",
    },
  ];
  async getData() {
    let params = {
      time: this.$utils.dateFormat(new Date(this.report.ylydate), "yyyy-MM"),
      stcd: this.rowList.stcd,
    };
    this.tableData = [];
    const url = "wjServer/fangxunjc/yuqing/yuliangMonthlyInfo";
    const data = await publicApi.getWithParam(url, params);
    if (data.result == true) {
      this.tableData = data.data;
    } else {
      this.tableData = [];
      this.$SucMessage.error("获取失败");
    }
  }

  @Watch("rowList", { deep: true, immediate: true })
  getReport() {
    if (this.rowList && this.rowList.stcd) {
      this.getData();
    }
  }
}
</script>

<style lang="scss" scoped>
.btn_overlook {
  color: #4078f1;
  cursor: pointer;
}
</style>
