<template>
  <!-- 全区整体情况组件 -->
  <div class="status-bar">
    <div class="bar-item">
      <div class="icon-color" :class="title.icon"></div>
      <span>{{ title.name }}</span>
      <span class="large-font">{{ title.amount }}</span>
      <span>{{ title.dw }}</span>
    </div>
    <div class="bar-item">
      <slot></slot>
      <!-- <v-chart
        :options="options"
        :autoresize="true"
        style="width:100%;height:100%;"
      ></v-chart> -->
    </div>
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
} from 'vue-property-decorator'
@Component
export default class StatusBar extends Vue {
  @Prop({
    type: Object,
    default: () => {
      return {
        icon: '',
        name: '',
        amount: '',
        dw: ''
      }
    }
  })
  title: any
  // @Prop({
  //   type: Object,
  //   default: () => {
  //     return {
  //       color: ['#5397ff', '#ff5a47'],
  //       legendData: [],
  //       xData: [],
  //       yData1: [],
  //       yData2: []
  //     }
  //   }
  // })
  // barData: any
  // options: any = {
  //   color: this.barData.color,
  //   tooltip: {
  //     trigger: 'axis'
  //   },
  //   grid: {
  //     top: '15%',
  //     containLable: true
  //   },
  //   legend: {
  //     x: 'right',
  //     icon: 'circle',
  //     itemWidth: 10,
  //     itemHeight: 10,
  //     data: this.barData.legendData
  //   },
  //   xAxis: {
  //     type: 'category',
  //     axisLine: {
  //       show: false
  //     },
  //     axisTick: {
  //       show: false
  //     },
  //     axisLabel: {
  //       rotate: -30,
  //       color: '#666'
  //     },
  //     splitLine: {
  //       show: false
  //     },
  //     data: this.barData.xData
  //   },
  //   yAxis: {
  //     name: '单位：家',
  //     nameTextStyle: {
  //       color: '#999'
  //     },
  //     axisLine: {
  //       show: false
  //     },
  //     axisTick: {
  //       show: false
  //     },
  //     splitLine: {
  //       color: '#999'
  //     }
  //   },
  //   series: [
  //     {
  //       name: this.barData.legendData[0],
  //       type: 'bar',
  //       stack: '总量',
  //       barWidth: 14,
  //       data: this.barData.yData1
  //     },
  //     {
  //       name: this.barData.legendData[1],
  //       type: 'bar',
  //       stack: '总量',
  //       data: this.barData.yData2
  //     }
  //   ]
  // }
}
</script>
<style lang="scss" scoped>
.status-bar {
  width: 100%;
  height: 100%;
  .bar-item {
    .icon-color {
      padding-right: 6px;
      color: #3a7bef;
    }
    .large-font {
      display: inline-block;
      padding-right: 6px;
      font-size: 22px;
    }
    &:first-of-type {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #333;
    }
    &:nth-of-type(2) {
      height: calc(100% - 30px);
    }
  }
}
</style>
