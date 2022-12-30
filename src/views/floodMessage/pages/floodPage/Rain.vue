<template>
  <div class="river">
    <div class="river-item">{{ cc.ylstation == "0" ? "礼家站水晴分析" : "洛阳站水晴分析" }}</div>
    <div class="river-item">
      <v-chart :options="options" :autoresize="true" style="width:100%;height:70%;"></v-chart>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop,Watch } from "vue-property-decorator";
import { TablePage } from "@/components";
import dayjs from "dayjs";

@Component({
  components: {
    TablePage,
  },
})
export default class RiverWater extends Vue {
  @Prop() sqData: any;
  @Prop() cc: any;
  get options() {
    return {
      color: ["#5397ff", "#ffab3d", "#36b56e", "#c088ff"],
      title: {
        text: `${this.cc.ylstation == "0" ? "礼家站水晴分析" : "洛阳站水晴分析"}`,
        x: "center",
        y: "top",
        textAlign: "center",
        textStyle: {
          fontWeight: "normal",
          color: "#333333",
        },
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: this.sqData.legendData,
        // itemHeight: 7,
        // itemWidth: 6,
        // icon: "rect",
        // orient: "vertical",
        right: 100,
        top: 0,
      },
      grid: {
        //grid 区域是否包含坐标轴的刻度标签
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        // type: "category",
        type: "time",
        boundaryGap: false,
        axisLine: {
          show: false,
          // symbol: "arrow",
          // lineStyle: {
          //   type: "dashed",
          //   // ...
          // },
        },
        axisTick: {
          show: true,
          inside: true,
          interval: 0,
          lineStyle: {
            color: "#acb1b7",
          },
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: "#666",
          rotate: 45,
          formatter: (value: any) => {
            return dayjs(value).format("YYYY-MM-DD");
          },
          // rich:{ //x轴中间间隔
          //    with:50
          // }
        },
      },
      yAxis: {
        type: "value",
        name: "雨量(mm)",
        nameTextStyle: {
          color: "#333",
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: ["#0087ED"],
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          color: "#999",
        },
        axisLabel: {
          color: "#999",
        },
        // scale:true,
        // min: 0,
        // max: 3,
        splitNumber: 15,
        boundaryGap: [0.5, 0.5], //两边留白  boundaryGap:false   两边不留白
      },
      series: this.sqData.seriesData,
    };
  }

  mounted() {
    // this.onpage();
  }

// @Watch('cc',{ immediate: true })  监听父组件给子组件传的值的变化
//    onpage() {
//        console.log(this.cc,"[[");
       
//   }
}
</script>

<style lang="scss" scoped>
.river {
  width: 100%;
  height: 100%;
  &-item {
    &:first-of-type {
      position: relative;
      font-size: 16px;
      padding: 20px 34px;
      color: #333333;
      line-height: 16px;
      border-bottom: 1px solid #dde4eb;
      &:before {
        content: "";
        position: absolute;
        top: 21px;
        left: 20px;
        width: 4px;
        height: 14px;
        background-color: #3983f3;
        border-radius: 4px;
      }
    }
    &:nth-of-type(2) {
      height: calc(100% - 60px);
      .river-item-table {
        height: 100%;
        width: 100%;
        position: relative;
        margin-top: 100px;
        // .btn {
        //   color: #5397ff;
        //   cursor: pointer;
        //   span {
        //     display: inline-block;
        //     margin-right: 10px;
        //     &:nth-of-type(2) {
        //       color: #ff5a47;
        //     }
        //   }
        // }
      }
    }
  }
}
</style>
