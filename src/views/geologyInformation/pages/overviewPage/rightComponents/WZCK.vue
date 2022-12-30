<template>
  <div class="site scroll">
    <div class="site-item">
      <panel-view heading="物资概况">
        <div class="site-item-content">
          <v-chart :options="options" :autoresize="true"></v-chart>
        </div>
      </panel-view>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { PanelView } from "@/components";
import { publicApi } from "@/api";
@Component({
  components: {
    PanelView,
  },
})
export default class Wzck extends Vue {
  @Prop({
    type: Object,
    default: () => {},
  })
  row: any; //父页面传过来的值
  // color: any = ["#5397ff", "#58dde0", "#ffab3d"];
  @Watch("row", { deep: true, immediate: true })
  getRow(row: any) {
    this.getEcharts();
  }
  xAxisData: any[] = [];
  seriesData: any[] = [];
  get options() {
    return {
      color: ["#5470C6"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      // grid: {
      //   left: "4%",
      //   right: "10%",
      //   bottom: "3%",
      //   containLabel: true, //防止容器覆盖其他组件
      // },
      xAxis: [
        {
          type: "category",
          data: this.xAxisData,
          axisTick: {
            show: true,
            inside: true,
            lineStyle: {
              color: "#acb1b7",
            },
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#acb1b7",
            },
          },
          axisLabel: {
            color: "#666",
            interval: 0, //强制显示x轴
            rotate: -20,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            color: "#999",
            formatter: "{value}",
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            color: "#999",
          },
        },
      ],
      series: [
        {
          name: "数量",
          type: "bar",
          barWidth: "20",
          data: this.seriesData,
        },
      ],
    };
  }

  //  参数
  detailParams: any = {
    ckid: "",
  };

  async getEcharts() {
    this.detailParams.ckid = this.row.ckid;
    const url = "wjServer/dataCeter/wareHouse/getWuziByCk";
    const data = await publicApi.getWithParam(url, this.detailParams);
    if (data.result == true) {
      // this.options.yAxis.data = data.data.x;
      // this.options.series[0].data = data.data.num;
      // this.options.series[0].data = data.data.x;
      // this.options.yAxis.data = data.data.num;
      this.xAxisData = data.data.x;
      this.seriesData = data.data.num;
    }
  }
}
</script>

<style lang="scss">
.site {
  position: relative;
  overflow: auto;
  .site-item {
    font-size: 14px;
    color: #666;
    .site-item-content {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
