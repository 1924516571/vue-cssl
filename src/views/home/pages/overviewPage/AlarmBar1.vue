<template>
  <div class="alarm-view">
    <panel-view heading="本月管网预警统计">
      <div class="alarm">
        <div class="note">
          <span>以<span style="color:#ffab3d">本月无雨14天 统计20个片区</span>的预警情况 其中<span style="color:#ff5a47">预警站点：300个</span></span>
        </div>
        <div class="alarm-item">
          <v-chart
            :options="options"
            :autoresize="true"
            style="width:100%;height:100%;"
          ></v-chart>
        </div>
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
  Watch
} from "vue-property-decorator";
import { PanelView } from "@/components";
@Component({
  components: {
    PanelView
  }
})
export default class AlarmBar extends Vue {
  color: any[] = ["#feb543"];
  options: any = {
    color: this.color,
    tooltip: {
      trigger: "item"
    },
    grid: {
      top: "15%",
      right: "5%",
      left: "8%",
      bottom: "5%",
      containLable: true
    },
    // legend: {
    //   x: "left",
    //   icon: "circle",
    //   itemWidth: 10,
    //   itemHeight: 10,
    //   data: ["问题个数", "事件个数"]
    // },
    xAxis: {
      type: "value",
      position: "top",
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        // rotate: -30,
        color: "#666"
      },
      splitLine: {
        show: false
      }
      //   data: [
      //     'A片区',
      //     'B片区',
      //     'C片区',
      //     'D片区',
      //     'E片区',
      //     'F片区',
      //     'G片区',
      //     'H片区'
      //   ]
    },
    yAxis: {
      type: "category",
      name: "预警数",
      nameTextStyle: {
        padding: [0, 45, -8, 0],
        color: "#999"
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        color: "#999"
      },
      data: [
        "A片区",
        "B片区",
        "C片区",
        "D片区",
        "E片区",
        "F片区",
        "G片区",
        "H片区"
      ]
    },
    series: [
      {
        name: "个数",
        type: "bar",
        // stack: "总量",
        barWidth: 12,
        data: [709, 917, 455, 610, 719, 433, 544, 285]
      }
      //   {
      //     name: "问题个数",
      //     type: "bar",
      //     stack: "总量",
      //     data: [9, 7, 5, 61, 19, 33, 44, 85]
      //   }
    ]
  };
}
</script>
<style lang="scss" scoped>
.alarm-view {
  width: 100%;
  height: 100%;

  .alarm {
    padding: 14px;
    height: calc(100% - 52px);
    border-top: 1px solid #dde4eb;
    .note{
      font-size: 14px;
      color: #999;
    }
    &-item {
      height: calc(100% - 20px);
    }
  }
}
</style>
