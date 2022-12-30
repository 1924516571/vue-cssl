<template>
  <!-- 水位变化列表 -->
  <div class="module-view">
    <div class="line-view">
      <div class="heading" @click="onGlobalClick">
        <span>水位变化过程线</span>
      </div>
      <div class="line-item">
        <v-chart
          :options="options"
          :autoresize="true"
          style="width:100%;height:100%;"
        ></v-chart>
      </div>
    </div>
    <div class="line-view">
      <div class="heading" @click="onGlobalClick">
        <span>水位变化列表</span>
      </div>
      <div class="line-item">
        <table-page
          :columns="columns"
          :tableData="tableData"
          :pageParams="pageParams"
          @get-size="getSize"
          @get-page="getPage"
        ></table-page>
      </div>
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
import { State, Mutation, Action, namespace } from 'vuex-class'
import { floodApi } from '@/api'
import { TablePage } from '@/components'
import { networkApi,infoApi } from "@/api";
@Component({
  components: {
    TablePage
  }
})
export default class LevelTable extends Vue {
  // @State flood: any
  // @Mutation setFloodRightToggle: any
  @Prop({
    type: Object,
    default: () => {}
  })
  floodParams: any
  @Watch('floodParams', { deep: true, immediate: true })
  getFloodParams (data: any) {
    if (Object.keys(data.row).indexOf('SBID') != -1) {
      let st = this.$utils.dateFormat(data.date[0], 'yyyy-MM-dd HH:mm:ss')
      let et = this.$utils.dateFormat(data.date[1], 'yyyy-MM-dd HH:mm:ss')
      this.hisParams.beginTime = st
      this.hisParams.endTime = et
      this.hisParams.sbId = data.row.SBID
      this.hisParams.yjid = data.row.YJID
      this.getLineData()
      this.getHisData()
    }else{
      // this.setFloodRightToggle(false)
      this.$emit('right-toggle',false)
    }
  }
  columns: any[] = [
    {
      title: '序号',
      type: 'index'
    },
    {
      title: '区域',
      key: 'pqmc'
    },
    {
      title: '站点名称',
      key: 'yjmc'
    },
    {
      title: '水位（米）',
      key: 'value'
    },
    {
      title: '时间',
      key: 'time'
    }
  ]
  tableData: any[] = []
  color: any[] = ['#5f77ec', '#5397ff', '#58dde0', '#feb543']
  options: any = {
    color: this.color,
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      top: '15%',
      // right:'1%',
      // left:'1%',
      bottom: '18%',
      containLable: true
    },
    // legend: {
    //   x: 'right',
    //   icon: 'circle',
    //   itemWidth: 10,
    //   itemHeight: 10,
    //   data: ['监控数量', '预警数量']
    // },

    xAxis: {
      type: 'category',
      // boundaryGap: false,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        // rotate: -30,
        color: '#666'
      },
      splitLine: {
        show: false
      },
      data: []
    },
    yAxis: {
      name: '单位：',
      min:0,
      max:10,
      nameTextStyle: {
        color: '#999'
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        color: '#999'
      }
    },
    series: [
      {
        name: '水位变化',
        type: 'line',
        lineStyle: {},
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#5397ff' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(83,151,255,0.2)' // 100% 处的颜色
              }
            ]
          }
        },
        data: [],
        markLine:{
          symbol: 'none',
          silent: true,
          lineStyle: { normal: { type: 'dashed' } },
          label: { position: 'start' },
          data:[
            {
              yAxis: 0.02,
              lineStyle: { width: 1.6, color: '#EE8262' },
              label: { show: false }
            },
            {
              yAxis: 0.05,
              lineStyle: { width: 1.6, color: '#B5C334' },
              label: { show: false }
            },
            {
              yAxis: 0.05,
              lineStyle: { width: 1.6, color: '#FCCE10' },
              label: { show: false }
            },
            {
              yAxis: 0.05,
              lineStyle: { width: 1.6, color: '#60C0DD' },
              label: { show: false }
            },
            {
              yAxis: 0.05,
              lineStyle: { width: 1.6, color: '#B4EEB4' },
              label: { show: false }
            }
          ]
        },
        markPoint:{
          silent: true,
          label: { fontSize: 13 },
          data: [
            {
              yAxis: 0.02,
              x: '20%',
              symbolSize: 0.1,
              label: {
                textStyle: { color: '#fff' },
                padding: [3, 8],
                fontSize: 16,
                borderRadius: 13,
                backgroundColor: 'EE8262',
                position: 'left',
                formatter: '井深：0.02'
              }
            },
            {
              yAxis: 0.05,
              x: '40%',
              symbolSize: 0.1,
              label: {
                textStyle: { color: '#fff' },
                padding: [3, 8],
                fontSize: 16,
                borderRadius: 13,
                backgroundColor: '#B5C334',
                position: 'left',
                formatter: '报警水位：0.05'
              }
            },
            {
              yAxis: 0.05,
              x: '60%',
              symbolSize: 0.1,
              label: {
                textStyle: { color: '#fff' },
                padding: [3, 8],
                fontSize: 16,
                borderRadius: 13,
                backgroundColor: '#FCCE10',
                position: 'left',
                formatter: '警戒水位：0.05'
              }
            },
            {
              yAxis: 0.05,
              x: '80%',
              symbolSize: 0.1,
              label: {
                textStyle: { color: '#fff' },
                padding: [3, 8],
                fontSize: 16,
                borderRadius: 13,
                backgroundColor: '#60C0DD',
                position: 'left',
                formatter: '提醒水位：0.05'
              }
            },
            {
              yAxis: 0.05,
              x: '100%',
              symbolSize: 0.1,
              label: {
                textStyle: { color: '#fff' },
                padding: [3, 8],
                fontSize: 16,
                borderRadius: 13,
                backgroundColor: '#B4EEB4',
                position: 'left',
                formatter: '预警水位：0.05'
              }
            }
          ]
        }
      }
    ]
  }
  onGlobalClick (e: any) {
    // this.flood.rightToggle = false
    // this.setFloodRightToggle(this.flood.rightToggle)
    this.$emit('right-toggle',false)
    document.removeEventListener('click', this.onGlobalClick)
  }
  mounted () {
    // this.getHisData()
  }
  pageParams: any = {
    current: 1,
    total: 0,
    pageSize: 10
  }
  hisParams: any = {
    beginTime: '2020-01-13 00:00:00',
    endTime: '2020-01-13 10:00:00',
    currentPage: 1,
    pageSize: 10,
    sbId: '1'
  }
  async getHisData () {
    let that = this;
    that.tableData = [];
    that.hisParams.currentPage = that.pageParams.current;
    that.hisParams.pageSize = that.pageParams.pageSize;
    let hisData = await networkApi.getTrendData(that.hisParams);
    let { gwinfo, data } = hisData.data;
    that.pageParams.total = data.totalSum;
    if(data && data.list.length > 0){
      that.tableData = data.list.map((item: any) => {
        return {
          pqmc: gwinfo && gwinfo[0].pqmc,
          yjmc: gwinfo && gwinfo[0].gwmc,
          time: item.time,
          value: item.value
        }
      })
    }
  }
  async getLineData () {
    let that = this;
    that.options.xAxis.data = [];
    that.options.series[0].data = [];
    let lineData = await networkApi.getTrendData(that.hisParams);
    let { linelist } = lineData.data;
    if(linelist){
      that.options.xAxis.data = linelist[0];
      that.options.series[0].data = linelist[1];
    }
    this.onYjLine();
  }
  async onYjLine () {
    let url = 'jnsw/manhole/get/' + this.hisParams.yjid;
    let data = await infoApi.onpage({}, url);
    this.options.series[0].markLine.data[0].yAxis = data.sd || 0;
    this.options.series[0].markLine.data[1].yAxis = data.tpsw || 0;
    this.options.series[0].markLine.data[2].yAxis = data.jjsw || 0;
    this.options.series[0].markLine.data[3].yAxis = data.txsw || 0;
    this.options.series[0].markLine.data[4].yAxis = data.yjsw || 0;
    this.options.series[0].markPoint.data[0].yAxis = data.sd || 0;
    this.options.series[0].markPoint.data[0].label.formatter = '井深：' + (data.sd || 0);
    this.options.series[0].markPoint.data[1].yAxis = data.tpsw;
    this.options.series[0].markPoint.data[1].label.formatter = '报警水位：' + (data.tpsw || 0);
    this.options.series[0].markPoint.data[2].yAxis = data.jjsw;
    this.options.series[0].markPoint.data[2].label.formatter = '警戒水位：' + (data.jjsw || 0);
    this.options.series[0].markPoint.data[3].yAxis = data.txsw;
    this.options.series[0].markPoint.data[3].label.formatter = '提醒水位：' + (data.txsw || 0);
    this.options.series[0].markPoint.data[4].yAxis = data.yjsw;
    this.options.series[0].markPoint.data[4].label.formatter = '预警水位：' + (data.yjsw || 0);
    this.options.yAxis.max = parseFloat(data.sd + 0.5).toFixed(1);
  }
  getSize (size: number) {
    this.pageParams.current = 1;
    this.pageParams.pageSize = size;
    this.getHisData()
  }
  getPage (page: number) {
    this.pageParams.current = page;
    this.getHisData()
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/commonVariables.scss';
.module-view {
  width: 100%;
  height: 100%;
  .line-view {
    width: 100%;
    &:first-of-type {
      height: 40%;
    }
    &:nth-of-type(2) {
      height: 55%;
    }

    .heading {
      padding: 5px;
      font-size: $font-size-base;
      color: $heading-color;
      cursor: pointer;
    }
    .line-item {
      height: calc(100% - 45px);
    }
  }
}
</style>
