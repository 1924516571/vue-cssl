<template>
  <!-- 运行流量报表  -->
  <div class="report-flood">
    <div class="report bg-shadow">
      <div class="top">
        <!-- 页面引用组件时组件名需要分开 -->
        <report-select @reportClick="reportClick"></report-select>
      </div>
      <div class="content">
        <div class="title">
          <span>{{ title }}</span>
        </div>
        <div class="date">
          <span>{{ date }}</span>
           <span>单位:累计运行流量(m³)</span>
        </div>
        <div class="content-item">
          <component :is="currentTab" :report="report" :clickShow="clickShow"></component>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { SucInput, SucSelect, SucButton } from "@suc/ui";
import { SelectConfig, SelectOptions } from "@suc/ui/interfaces";
import { TablePage } from "@/components";
import { ReportSelect,swrb} from "./reportPage";
@Component({
  components: {
    SucSelect,
    SucInput,
    SucButton,
    TablePage,
    ReportSelect,
    swrb
  },
})
export default class ReportFlood extends Vue {
  currentTab: string = "swrb"; //当前是哪一个组件
  date: any = "";
  title: string = "武进区多站多情日报";
  report: any = {};
  clickShow: boolean = false; //table 表格的显示与隐藏
  mounted() {
    this.clickShow = true;
    this.init(this.report);
  }

  // 先子先点击 然后传过来数据，页面初始化时传入
  reportClick(data: any) {
    this.report = data;
    this.init(this.report);
    this.clickShow = false;
    this.$nextTick(() => {
      this.clickShow = true;
    });
  }
  init(key: any) {
       this.date = "日期：" + this.$utils.dateFormat(new Date(key.date), "yyyy年MM月dd日");
        this.currentTab = "swrb";
  }
}
</script>
<style lang="scss" scoped>
.report-flood {
  padding: 10px;
  width: 100%;
  height: 100%;
  background-color: #f8f8f9;
  .report {
    height: 100%;
    .top {
      padding: 14px;
      display: flex;
      .top-item {
        display: flex;
      }
      .btn {
        margin-right: 10px;
      }
    }
    .content {
      padding: 0 14px;
      height: calc(100% - 62px);
      font-size: 14px;
      color: #666666;
      .title {
        font-size: 30px;
        color: #333333;
        text-align: center;
      }
      .date {
        display: flex;
        justify-content: space-between;
      }
      .content-item {
        height: calc(100% - 66px);
        padding-top: 20px;
      }
    }
  }
}
</style>
