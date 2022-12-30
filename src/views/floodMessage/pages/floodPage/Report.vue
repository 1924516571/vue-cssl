<template>
  <div class="river">
    <div class="river-item"></div>
    <div class="river-item">
      <span><v-chart :options="options" :autoresize="true" style="width:100%;height:70%;margin-bottom:5%"></v-chart></span>
      <span><v-chart :options="options1" :autoresize="true" style="width:100%;height:70%;"></v-chart></span>
      <div class="river-item-table">
        <h2 style="text-align:center;margin:20px;">泵站运行记录表</h2>
        <table-no :columns="columns" :tableData="tableData"> </table-no>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { TableNo } from "@/components";
import dayjs from "dayjs";

@Component({
  components: {
    TableNo,
  },
})
export default class RiverWater extends Vue {
  @Prop() swData: any;
  @Prop() sqData: any;
  @Prop() bb: any;
  get options() {
    return {
      color: ["#5397ff", "#ffab3d", "#36b56e", "#c088ff"],
      title: {
        text: "雨情分析",
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
        data: this.swData.legendData,
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
      series: this.swData.seriesData,
    };
  }
  get options1() {
    return {
      color: ["#5397ff", "#ffab3d", "#36b56e", "#c088ff"],
      title: {
        text: "水情分析",
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
        right: 100,
        top: 0,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "time",
        boundaryGap: false,
        axisLine: {
          show: false,
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
        },
      },
      yAxis: {
        type: "value",
        name: "水位线(mm)",
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
    this.onpage();
  }

  //   查
  columns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "区域",
      key: "qy",
    },
    {
      title: "站名",
      key: "zd",
    },
    {
      title: "机组",
      key: "jz",
    },
    {
      title: "机组开启时间",
      key: "ontime",
    },
    {
      title: "机组关闭时间",
      key: "offtime",
    },
    {
      title: "泵站运行时间",
      key: "runtime",
    },
    {
      title: "总排水量(m²)",
      key: "totalrain",
    },
    {
      title: "设计流量(m²/s)",
      key: "desigin",
    },
    {
      title: "外排河道",
      key: "outriver",
    },
  ];

  tableData: any = [];
  pageParams: any = {
    total: 0,
    current: 1,
    pageSize: 20,
  };

  async onpage() {
    // this.stationParams.currentPage = this.pageParams.current;
    // this.stationParams.pageSize = this.pageParams.pageSize;
    // var url = "jnsw/hoistingShaf/page";
    // infoApi.onpage(this.stationParams, url).then((data: any) => {
    //   if (data) {
    //     this.pageParams.total = data.totalCount;
    //     this.tableData = data.data;
    //   }
    // });
    this.tableData = [
      {
        qy: "武进",
        zd: "西平牛",
        jz: "泵站M2",
        ontime: "2022-12-55",
        offtime: "2021-12-55",
        runtime: "03:05:06",
        totalrain: "55730",
        desigin: "5",
        outriver: "青龙兵",
      },
      {
        qy: "武进131",
        zd: "西平牛",
        jz: "泵站M2",
        ontime: "2022-12-55",
        offtime: "2021-12-55",
        runtime: "03:05:06",
        totalrain: "55730",
        desigin: "5",
        outriver: "青龙兵",
      },
      {
        qy: "武进水电费水电费",
        zd: "西平牛范围分为",
        jz: "泵站M2",
        ontime: "2022-12-55",
        offtime: "2021-12-55",
        runtime: "03:05:06",
        totalrain: "55730",
        desigin: "5",
        outriver: "青龙兵",
      },
    ];
  }
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
    }
    &:nth-of-type(2) {
      height: calc(100% - 60px);
      .river-item-table {
        height: 100%;
        width: 100%;
        position: relative;
        margin-top: 100px;
      }
    }
  }
}
</style>
