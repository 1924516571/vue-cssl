<template>
  <div class="pie-view">
    <panel-view :heading="title">
      <div class="chart">
        <v-chart
          :options="options"
          :autoresize="true"
          style="width: 100%; height: 100%"
        ></v-chart>
      </div>
    </panel-view>
  </div>
</template>
<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Emit,
  Model,
  Watch,
} from "vue-property-decorator";
import { PanelView } from "@/components";
@Component({
  components: {
    PanelView,
  },
})
export default class ModuleView extends Vue {
  @Prop() title!: string;
  // @Prop({
  //   type: Array,
  //   default: () => {
  //     return ["#ff826e", "#feb543", "#58dde0", "#5397ff", "#5f77ec", "#ffab3d"];
  //   }
  // })
  // color: any;
  @Prop({
    type: Array,
    default: () => {
      return [
        {
          value: 48,
          name: "巡查问题",
        },
        {
          value: 72,
          name: "投诉举报",
        },
        {
          value: 78,
          name: "任务事件",
        },
        {
          value: 102,
          name: "工程进度",
        },
      ];
    },
  })
  echartData: any;
  // @Watch('echartData', { deep: true })
  // getEchart (val: any) {
  //   debugger
  // }
  getTotal() {
    let total = 0;
    this.echartData.forEach((e: any) => {
      total += e.value;
    });
    return total;
  }
  color: any[] = [
    "#ff826e",
    "#feb543",
    "#58dde0",
    "#5397ff",
    "#5f77ec",
    "#FF7F50",
    "#F0E68C",
  ];
  get options() {
    return {
      color: this.color,
      tooltip: {
        trigger: "item",
      },
      title: {
        text: this.getTotal() + "件",
        subtext: "任务数量",
        x: "28%",
        y: "center",
        // left: "28%",
        // top: "center",
        textStyle: {
          fontSize: 28,
          fontWeight: "normal",
        },
        subtextStyle: {
          fontSize: 14,
          align: "center",
        },
      },
      legend: {
        top: "center",
        right: "10%",
        orient: "vertical",
        itemWidth: 10,
        itemHeight: 10,
        icon: "circle",
        formatter: (name: string) => {
          let percent: any = 0;
          let total = this.getTotal();
          let target = 0;
          this.echartData.forEach((e: any) => {
            if (e.name == name) {
              percent = ((e.value / total) * 100).toFixed(2);
              target = e.value;
            }
          });
          return [
            "{b|" +
            name +
            "}" +
            "  " +
            "{a|" +
            target +
            "}" +
            "  " +
            "{b|" +
            percent / 1 +
            "%" +
            "}",
          ];
        },
        textStyle: {
          rich: {
            a: {
              color: "#333",
            },
            b: {
              color: "#999",
            },
          },
        },
      },
      series: [
        {
          name: "任务数量",
          type: "pie",
          radius: ["48%", "65%"],
          center: ["35%", "50%"],
          labelLine: {
            show: false,
          },
          label: {
            show: false,
          },
          data: this.echartData,
        },
      ],
    };
  }
}
</script>
<style lang="scss" scoped>
.pie-view {
  width: 100%;
  height: 100%;
  .chart {
    height: calc(100% - 52px);
    border-top: 1px solid #dde4eb;
    padding: 10px;
  }
}
</style>
