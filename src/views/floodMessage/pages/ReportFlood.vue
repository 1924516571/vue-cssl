<template>
  <!-- 汛情报表  -->
  <div class="report-flood">
    <div class="report bg-shadow">
      <div class="top">
        <report-select @reportClick="reportClick"></report-select>
      </div>
      <div class="content">
        <div class="title">
          <span>{{ title }}</span>
        </div>
        <div class="date">
          <span>{{ date }}</span>
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
import { ReportSelect, swrb, swyb, ylrb, ylyb, tfnb, tfxqnb, ylnb, swnb, xqzb,yqzb} from "./allReportPage";

@Component({
  components: {
    SucSelect,
    SucInput,
    SucButton,
    TablePage,
    ReportSelect,
    swrb,
    swyb,
    ylrb,
    ylyb,
    tfnb,
    tfxqnb,
    ylnb,
    swnb,
    xqzb,
    yqzb
  },
})
export default class ReportFlood extends Vue {
  currentTab: string = "swrb";
  date: any = this.$utils.dateFormat(new Date(), "yyyy年MM月dd日");
  title: string = "武进区全站点水位日报表";
  report: any = {};
  clickShow: boolean = false;
  mounted() {
    this.clickShow = true;
    this.init(this.report);
  }

  //点击子组件点击事件 将对象传递过来
  reportClick(data: any) {
    this.report = data;
    this.init(this.report);
    this.clickShow = false;
    this.$nextTick(() => {
      this.clickShow = true;
    });
  }
  init(key: any) {
    switch (key.bbSel) {
      case "1":
        this.title = "武进区全站点水位日报表";
        this.date = "日期：" + this.$utils.dateFormat(new Date(key.date), "yyyy年MM月dd日");
        this.currentTab = "swrb";
        break;
      // case "2":
      //   this.title = "武进区全站点水位年报表";
      //   this.date = "日期：" + this.$utils.dateFormat(new Date(key.year), "yyyy年");
      //   this.currentTab = "swnb";
      //   break;

      case "2":
        this.title = "武进区全站点水位月报表";
        this.date = "日期: " + this.$utils.dateFormat(new Date(key.swdate), "yyyy年MM月");
        this.currentTab = "swyb";
        break;
      case "3":
        this.title = "武进区" + this.report.swmc + "全年逐日水位统计表";
        this.date = "日期: " + this.$utils.dateFormat(new Date(key.swndate), "yyyy年");
        this.currentTab = "swnb";
        break;

      case "4":
        this.title = "武进区全站点雨量日报表";
        this.date = "日期：" + this.$utils.dateFormat(new Date(key.yldate), "yyyy年MM月dd日");
        this.currentTab = "ylrb";
        break;
      case "5":
        this.title = "武进区全站点雨量月报表";
        this.date = "日期：" + this.$utils.dateFormat(new Date(key.ylydate), "yyyy年MM月");
        this.currentTab = "ylyb";
        break;
      case "6":
        this.title = "武进区" + this.report.ylswmc + "站点全年逐日雨量统计表";
        this.date = "日期：" + this.$utils.dateFormat(new Date(key.ylndate), "yyyy年");
        this.currentTab = "ylnb";
        break;

      case "7":
        this.title = this.$utils.dateFormat(new Date(key.tfxqndate), "yyyy年") + "台汛期统计表（5月-10月）";
        this.date = "日期：" + this.$utils.dateFormat(new Date(key.tfxqndate), "yyyy年");
        this.currentTab = "tfxqnb";
        break;
      case "8":
        this.title = this.$utils.dateFormat(new Date(key.tfndate), "yyyy年") + "台风统计表";
        // this.title = `${this.$utils.dateFormat(new Date(key.tfndate), 'yyyy年')}`+"台风统计表"
        this.date = "日期：" + this.$utils.dateFormat(new Date(key.tfndate), "yyyy年");
        this.currentTab = "tfnb";
        break;
      case "9":
        this.title = "武进区"+this.$utils.dateFormat(new Date(key.xqndate), "yyyy年") + "汛期水位、雨量汇总表";
        this.date = "日期：" + this.$utils.dateFormat(new Date(key.xqndate), "yyyy年");
        this.currentTab = "xqzb";
        break;

      case "10":
        this.title = this.$utils.dateFormat(new Date(key.yqndate), "yyyy年") + "水位统计表（5月-9月）";
        this.date = "日期：" + this.$utils.dateFormat(new Date(key.yqndate), "yyyy年");
        this.currentTab = "yqzb";
        break;

      // case "3":
      //   this.title = "江宁区水位历史数据查询表";
      //   this.date = null;
      //   this.currentTab = "swls";
      //   break;
      // case "4":
      //   this.title = "江宁区全站点雨量日报表";
      //   this.date = "日期：" + this.$utils.dateFormat(new Date(key.date), "yyyy年MM月dd日");
      //   this.currentTab = "ylrb";
      //   break;
      // case "5":
      //   this.title = "江宁区全站点雨量月报表";
      //   this.date = "日期：" + this.$utils.dateFormat(new Date(key.date), "yyyy年MM月");
      //   this.currentTab = "ylyb";
      //   break;
      // case "6":
      //   this.title = "江宁区" + this.report.ylswmc + "站点全年逐日雨量统计表";
      //   this.date = "日期：" + this.$utils.dateFormat(new Date(key.ylndate), "yyyy年");
      //   this.currentTab = "ylnb";
      //   break;
      // case "7":
      //   this.title = "江宁区雨量历史数据查询";
      //   this.date = null;
      //   this.currentTab = "ylls";
      //   break;
      // case "8":
      //   this.title = "江宁区小型水库报汛情况统计表";
      //   this.date = "日期：" + this.$utils.dateFormat(new Date(key.xsksj), "yyyy年MM月dd日");
      //   this.currentTab = "xskbx";
      //   break;
      // case "9":
      //   this.title = "江宁区工情综合统计报表";
      //   this.date = "统计时间段：" + this.$utils.dateFormat(new Date(key.gqzhtjks), "yyyy年MM月dd日") + "至" + this.$utils.dateFormat(new Date(key.gqzhtjjs), "yyyy年MM月dd日");
      //   this.currentTab = "gqzhtj";
      //   break;
      // case "10":
      //   this.title = "江宁区工情运行统计报表";
      //   this.date = "统计时间段：" + this.$utils.dateFormat(new Date(key.gqyxtjks), "yyyy年MM月dd日 HH:mm:ss") + " 至 " + this.$utils.dateFormat(new Date(key.gqyxtjjs), "yyyy年MM月dd日 HH:mm:ss");
      //   this.currentTab = "gqyxtj";
      //   break;
      case "11":
        this.title = "江宁区工情排水记录报表";
        this.date = "统计时间段：" + this.$utils.dateFormat(new Date(key.gqbzpsks), "yyyy年MM月dd日 HH:mm:ss") + "至" + this.$utils.dateFormat(new Date(key.gqbzpsjs), "yyyy年MM月dd日 HH:mm:ss");
        this.currentTab = "gqpsjl";
        break;
      case "12":
        this.title = "降雨量同期对比统计报表";
        this.date = "统计时间段：" + this.$utils.dateFormat(new Date(key.jyltqdbks), "yyyy年MM月") + "至" + this.$utils.dateFormat(new Date(key.jyltqdbjs), "yyyy年MM月");
        this.currentTab = "jyltqdb";
        break;
      case "13":
        this.title = "泵机运行时长详情表";
        this.date = "统计时间段：" + this.$utils.dateFormat(new Date(key.bjkssj), "yyyy年MM月dd日 HH:mm:ss") + " 至 " + this.$utils.dateFormat(new Date(key.bjjssj), "yyyy年MM月dd日 HH:mm:ss");
        this.currentTab = "bjyxsc";
        break;
    }
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
      // overflow-y: auto;
      .title {
        font-size: 30px;
        color: #333333;
        text-align: center;
      }
      .date {
        display: flex;
      }
      .content-item {
        height: calc(100% - 66px);
        padding-top: 20px;
      }
    }
  }
}
</style>
