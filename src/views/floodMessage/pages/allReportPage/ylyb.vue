<template>
  <div class="survey-flood">
    <!-- v-if="tableData.length >0" -->
    <table-component  :customHeight="tableHeight" :columns="columns" :tableData="tableData">
      <template v-slot:yl="{ row }">
        <div class="btn">
          <span @click="details(row)" style="color: #5397ff;cursor: pointer;">预览</span>
        </div>
      </template>
    </table-component>
    <suc-modal :config="config" v-model="show">
      <yly-modal :rowList="rowList" :report="report"></yly-modal>
    </suc-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { TableComponent } from "@/components";
import { publicApi, reportApi } from "@/api";
import { YlyModal } from "./model";
import { SucModal, SucMessage } from '@suc/ui';
import { ModalConfig } from "@suc/ui/interfaces";
@Component({
  components: {
    TableComponent,
    YlyModal,
    SucModal,
  },
})
export default class Ylyb extends Vue {
  @Prop({
    type: Object,
    default: () => {},
  })
  report!: any;
  @Prop() clickShow!: boolean;
  show: boolean = false;
  config: ModalConfig = {
    transfer: false,
    "footer-hide": true,
    title: "工情信息",
    width: 1000,
  };
  rowList: any = {};
  tableHeight: any = document.documentElement.children[1].clientHeight - 240;
  tableData: any = [];
  columns: any = [
    {
      type: "index",
      title: "序号",
    },
    {
      key: "stnm",
      title: "站点名称",
    },
    {
      key: "first",
      title: "上旬",
    },
    {
      key: "mid",
      title: "中旬",
      width: "",
    },
    {
      key: "last",
      title: "下旬",
    },
    {
      key: "total",
      title: "总量",
      // }, {
      //     key: "",
      //     title: "降水"
    },
    {
      key: "max",
      title: "最大日量",
    },
    {
      key: "maxT",
      title: "日期",
    },
    {
      slot: "yl",
      title: "月报预览",
    },
  ];

  async getData() {
    let params = {
      time: this.$utils.dateFormat(new Date(this.report.ylydate), "yyyy-MM"),
    };
    this.tableData = [];
    const url = "wjServer/fangxunjc/yuqing/yuliangMonthly" 
    const data = await publicApi.getWithParam(url,params);
    if(data.result==true){
        this.tableData = data.data
    }else{
        this.tableData = [];
        this.$SucMessage.error("获取失败")
    }
  }

  @Watch("clickShow", { deep: true, immediate: true })
  getReport() {
    if (this.report.bbSel && this.clickShow) {
      this.show = false;
      this.rowList = {};
      this.tableHeight = document.documentElement.children[1].clientHeight - 240;
      this.getData();
    }
  }
  
  // 详情的点击
  details(row: any) {
    this.config.title = row.stnm;
    this.rowList = row;
    this.show = true;
  }
}
</script>

<style lang="scss" scoped>
.btn_overlook {
  color: #4078f1;
  cursor: pointer;
}
</style>
