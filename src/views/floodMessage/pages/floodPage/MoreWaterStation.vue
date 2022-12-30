<template>
  <div class="river">
    <div class="river-item">多站水情分析</div>
    <div class="river-item">
      <v-chart :options="options" :autoresize="true" style="width:100%;height:70%;"></v-chart>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { TablePage } from "@/components";
import dayjs from "dayjs";

@Component({
  components: {
    TablePage,
  },
})
export default class RiverWater extends Vue {
  @Prop() swData: any;
  @Prop() bb: any;
  get options() {
    return {
      color: ["#5397ff", "#36b56e", "#ffab3d", "#c088ff", "#FF66CC"],
      title: {
        text: "多站水情分析",
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
        },
      },
      yAxis: {
        type: "value",
        name: "内河水位(m)",
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
        splitNumber: 15,
        boundaryGap: [0.5, 0.5],
      },
      series: this.swData.seriesData,
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
      width: 60,
    },
    {
      title: "时间",
      key: "mc",
    },
    {
      title: "南夏墅站",
      key: "dm",
    },
    {
      title: "湖塘镇站",
      key: "gl",
    },
    {
      title: "牛塘镇站",
      key: "hlmc",
    },
        {
      title: "牛塘镇站7777",
      key: "hlmc777",
    },
    {
      title: "最低水位",
      key: "zt",
      with: 60,
    },
    {
      title: "出现时间",
      key: "cx",
    },
    {
      title: "日均水位",
      key: "bz",
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
    this.pageParams.total = 150;
    this.tableData = [
      {
        id: "1",
        dm: "1",
        mc: "2022-1-27",
        gl: 7.5,
        hlmc: "2022-2-28",
        zt: "6.0",
        cx: "2011-21-23",
        bz: "2022-3-28",
        pq: "19片",
        flag: "提升井",
      },
      {
        id: "10",
        dm: "1",
        mc: "二环截流沟明渠1#提升井",
        gl: 3,
        hlmc: "二环截流沟",
        zt: "在用",
        bz: "1个2.5寸提升泵，功率3千瓦",
        pq: "18片",
        flag: "提升井",
      },
      {
        id: "100",
        dm: "17",
        mc: "牛首山河17#提升井",
        gl: 18.5,
        hlmc: "牛首山河",
        zt: "在用",
        bz: "2台DN150提升泵，每台功率18.5千瓦",
        pq: "15片",
        flag: "提升井",
      },
      {
        id: "101",
        dm: "10",
        mc: "太平十字沟10#提升井",
        gl: 5.5,
        hlmc: "太平十字沟",
        zt: "在用",
        bz: "2台5寸提升泵，每台功率5.5千瓦",
        pq: "08片",
        flag: "提升井",
      },
      {
        id: "102",
        dm: "5",
        mc: "太平十字沟5#提升井",
        gl: 3,
        hlmc: "太平十字沟",
        zt: "在用",
        bz: "2台3寸提升泵，每台功率3千瓦",
        pq: "08片",
        flag: "提升井",
      },
      {
        id: "103",
        dm: "3",
        mc: "太平十字沟3#提升井",
        gl: 4,
        hlmc: "太平十字沟",
        zt: "在用",
        bz: "2台4寸提升泵，每台功率4千瓦",
        pq: "08片",
        flag: "提升井",
      },
      {
        id: "104",
        dm: "6",
        mc: "太平十字沟6#提升井",
        gl: 4,
        hlmc: "太平十字沟",
        zt: "在用",
        bz: "2台4寸提升泵，每台功率4千瓦",
        pq: "08片",
        flag: "提升井",
      },
      {
        id: "105",
        dm: "7",
        mc: "太平十字沟7#提升井",
        gl: 4,
        hlmc: "太平十字沟",
        zt: "在用",
        bz: "2台4寸提升泵，每台功率4千瓦",
        pq: "08片",
        flag: "提升井",
      },
      {
        id: "106",
        dm: "4",
        mc: "太平十字沟4#提升井",
        gl: 4,
        hlmc: "太平十字沟",
        zt: "在用",
        bz: "2台4寸提升泵，每台功率4千瓦",
        pq: "08片",
        flag: "提升井",
      },
      {
        id: "107",
        dm: "9",
        mc: "太平十字沟9#提升井",
        gl: 4,
        hlmc: "太平十字沟",
        zt: "在用",
        bz: "2台4寸提升泵，每台功率4千瓦",
        pq: "08片",
        flag: "提升井",
      },
      {
        id: "108",
        dm: "8",
        mc: "太平十字沟8#提升井",
        gl: 15,
        hlmc: "太平十字沟",
        zt: "在用",
        bz: "2台6寸提升泵，每台功率15千瓦",
        pq: "08片",
        flag: "提升井",
      },
      {
        id: "109",
        dm: "1",
        mc: "太平十字沟1#提升井",
        gl: 4,
        hlmc: "太平十字沟",
        zt: "在用",
        bz: "2台4寸提升泵，每台功率4千瓦",
        pq: "08片",
        flag: "提升井",
      },
      {
        id: "11",
        dm: "8",
        mc: "东南大学护校沟8#提升井",
        gl: 2.5,
        hlmc: "东大护校沟",
        zt: "在用",
        bz: "2个3寸提升泵，每个功率2.5千瓦",
        pq: "14片",
        flag: "提升井",
      },
      {
        id: "110",
        dm: "2",
        mc: "高湖2#提升井",
        gl: 7.5,
        hlmc: "高湖",
        zt: "在用",
        bz: "2台4寸提升泵，每台功率7.5千瓦",
        pq: "07片",
        flag: "提升井",
      },
      {
        id: "111",
        dm: "9",
        mc: "庄排十字沟9#提升井",
        gl: 3,
        hlmc: "庄排十字沟",
        zt: "在用",
        bz: "2台3寸提升泵，每台功率3千瓦",
        pq: "03片",
        flag: "提升井",
      },
      {
        id: "112",
        dm: "8",
        mc: "庄排十字沟8#提升井",
        gl: 4,
        hlmc: "庄排十字沟",
        zt: "在用",
        bz: "2台4寸提升泵，每台功率4千瓦",
        pq: "03片",
        flag: "提升井",
      },
      {
        id: "113",
        dm: "1",
        mc: "高湖1#提升井",
        gl: 7.5,
        hlmc: "高湖",
        zt: "在用",
        bz: "2台4寸提升泵，每台功率7.5千瓦",
        pq: "07片",
        flag: "提升井",
      },
      {
        id: "114",
        dm: "7",
        mc: "庄排十字沟7#提升井",
        gl: 3,
        hlmc: "庄排十字沟",
        zt: "在用",
        bz: "1台3寸提升泵，每台功率3千瓦",
        pq: "03片",
        flag: "提升井",
      },
      {
        id: "115",
        dm: "6",
        mc: "庄排十字沟6#提升井",
        gl: 3,
        hlmc: "庄排十字沟",
        zt: "在用",
        bz: "2台3寸提升泵，每台功率3千瓦",
        pq: "03片",
        flag: "提升井",
      },
      {
        id: "116",
        dm: "5",
        mc: "庄排十字沟5#提升井",
        gl: 3,
        hlmc: "庄排十字沟",
        zt: "在用",
        bz: "2台3寸提升泵，每台功率3千瓦",
        pq: "03片",
        flag: "提升井",
      },
      {
        id: "116",
        dm: "5",
        mc: "庄排十字沟5#提升井",
        gl: 3,
        hlmc: "庄排十字沟",
        zt: "在用",
        bz: "2台3寸提升泵，每台功率3千瓦",
        pq: "03片",
        flag: "提升井",
      },
      {
        id: "116",
        dm: "5",
        mc: "庄排十字沟5#提升井",
        gl: 3,
        hlmc: "庄排十字沟",
        zt: "在用",
        bz: "2台3寸提升泵，每台功率3千瓦",
        pq: "03片",
        flag: "提升井",
      },
      {
        id: "116",
        dm: "5",
        mc: "庄排十字沟5#提升井",
        gl: 3,
        hlmc: "庄排十字沟",
        zt: "在用",
        bz: "2台3寸提升泵，每台功率3千瓦",
        pq: "03片",
        flag: "提升井",
      },
      {
        id: "116",
        dm: "5",
        mc: "庄排十字沟5#提升井",
        gl: 3,
        hlmc: "庄排十字沟",
        zt: "在用",
        bz: "2台3寸提升泵，每台功率3千瓦",
        pq: "03片",
        flag: "提升井",
      },
      {
        id: "116",
        dm: "5",
        mc: "庄排十字沟5#提升井",
        gl: 3,
        hlmc: "庄排十字沟",
        zt: "在用",
        bz: "2台3寸提升泵，每台功率3千瓦",
        pq: "03片",
        flag: "提升井",
      },
      {
        id: "116",
        dm: "5",
        mc: "庄排十字沟5#提升井",
        gl: 3,
        hlmc: "庄排十字沟",
        zt: "在用",
        bz: "2台3寸提升泵，每台功率3千瓦",
        pq: "03片",
        flag: "提升井",
      },
      {
        id: "116",
        dm: "5",
        mc: "庄排十字沟5#提升井",
        gl: 3,
        hlmc: "庄排十字沟",
        zt: "在用",
        bz: "2台3寸提升泵，每台功率3千瓦",
        pq: "03片",
        flag: "提升井",
      },
      {
        id: "116",
        dm: "5",
        mc: "庄排十字沟5#提升井",
        gl: 3,
        hlmc: "庄排十字沟",
        zt: "在用",
        bz: "2台3寸提升泵，每台功率3千瓦",
        pq: "03片",
        flag: "提升井",
      },
      {
        id: "116",
        dm: "5",
        mc: "庄排十字沟5#提升井",
        gl: 3,
        hlmc: "庄排十字沟",
        zt: "在用",
        bz: "2台3寸提升泵，每台功率3千瓦",
        pq: "03片",
        flag: "提升井",
      },
      {
        id: "116",
        dm: "5",
        mc: "庄排十字沟5#提升井",
        gl: 3,
        hlmc: "庄排十字沟",
        zt: "在用",
        bz: "2台3寸提升泵，每台功率3千瓦",
        pq: "03片",
        flag: "提升井",
      },
    ];
  }

  getPage(page: any) {
    this.pageParams.current = page;
    // this.onpage();
  }
  getSize(size: any) {
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
     
    }
  }
}
</style>
