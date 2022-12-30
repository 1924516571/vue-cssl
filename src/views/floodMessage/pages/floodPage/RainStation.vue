<template>
  <div class="river">
    <div class="river-item">{{ swData.title }}雨情分析</div>
    <div class="river-item">
      <v-chart :options="options" :autoresize="true" style="width:100%;height:70%;"></v-chart>
      <div class="river-item-table">
        <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams" @get-page="getPage" @get-size="getSize"> </table-page>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { TablePage, TableNo } from "@/components";
import { publicApi } from "@/api";
import dayjs from "dayjs";

@Component({
  components: {
    TablePage,
    TableNo,
  },
})
export default class RiverWater extends Vue {
  @Prop() swData: any;
  @Prop() tableData: any;
  @Prop() pageParams: any;
  get options() {
    return {
      color: ["#5397ff", "#36b56e", "#ffab3d", "#c088ff"],
      title: {
        // text: "水情分析",
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
        type: "category",
        boundaryGap: false,
        data: this.swData.xAxisData,
        axisTick: {
          lineStyle: {
            color: "#acb1b7",
          },
        },
        axisLabel: {
          color: "#666",
        },
      },
      yAxis: {
        type: "value",
        name: "雨量(mm)",
        // max: 10,
        // min: 0,
        // splitNumber: 20,
        // boundaryGap: [0.2, 0.2],
        nameTextStyle: {
          color: "#333",
        },
        splitLine: {
          color: "#999",
        },
        axisLabel: {
          color: "#999",
        },
      },
      series: this.swData.seriesData,
    };
  }

  mounted() {
    // this.onpage();
  }

  //   查
  columns: any[] = [
    {
      type: "index",
      title: "序号",
      width: 60,
    },
    {
      title: "站点",
      key: "zdmc",
      width: 200,
    },
    {
      title: "日期",
      key: "date",
    },
    {
      title: "小时最大降雨量(mm)",
      key: "maxRain",
      with: 100,
    },
    {
      title: "最大降雨量时段",
      key: "maxDate",
    },
    {
      title: "日降雨量(mm)",
      key: "dayRain",
      with: 60,
    },
  ];
  async onpage() {}
  getPage(page: any) {
    this.pageParams.current = page;
    // this.onpage();
     this.$emit("mapSingClick", page)
  }
  getSize(size: any) {
    console.log(size,"[p[ppp");
    
    this.pageParams.current = 1;
    this.pageParams.pageSize = size;
    // this.onpage();
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
