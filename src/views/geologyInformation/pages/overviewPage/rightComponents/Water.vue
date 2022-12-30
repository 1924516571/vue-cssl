<template>
  <!-- 水情报表 -->
  <div class="water">
    <div class="water-item">
      <tab-active :btns="btns" :activeIndex="activeIndex" @get-btn="getBtn"></tab-active>
    </div>
    <div class="water-item">
      <div class="result" v-for="(item, index) in result" :key="index">
        <div>
          <span>{{ item.name }}</span>
        </div>
        <div>
          <span class="blue-font">{{ item.amount }}</span
          ><span>m</span><br /><span class="time">{{ item.time }}</span>
        </div>
      </div>
    </div>
    <div class="water-item">
      <table-component :columns="columns" :tableData="tableData"></table-component>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { TabActive, TableComponent } from "@/components";
import { publicApi } from "@/api";
@Component({
  components: {
    TabActive,
    TableComponent,
  },
})
export default class Water extends Vue {
  btns: any[] = ["今日", "本月", "本年"];
  result: any[] = [
    {
      name: "最高水位",
      amount: 0,
      time: "",
    },
    {
      name: "最低水位",
      amount: 0,
      time: "",
    },
  ];
  columns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "时间",
      key: "happenTime",
    },
    {
      title: "平均水位",
      key: "pjsw",
    },
  ];
  tableData: any[] = [];
  activeIndex: number = 0;
  @Prop({
    type: Object,
    default: () => {},
  })
  row: any;

  //泵站水情报表参数
  detailParams: any = {
    stationId: "",
    timeFlag: "",
  };
  //河道水情报表参数
  hdDetailParams: any = {
    stcd: "",
    tmFlag: "",
  };
  @Watch("row", { immediate: true, deep: true })
  onRow(row: any) {
    this.tableData = [];
    if (row.key == "zbz") {
      this.getInfo();
    } else if (row.key == "HD") {
      this.getWaterTable(); //河道水情报表
    }
  }
  // tab切换
  getBtn(val: any) {
    this.activeIndex = val;
    if (this.row.key == "HD") {
      this.getWaterTable();
    } else if (this.row.key == "zbz") {
      this.getInfo();
    }
  }
  // 获取表格数据
  async getInfo() {
    this.detailParams = {
      stationId: this.row.stationId,
    };
    switch (this.activeIndex) {
      case 0:
        this.detailParams.timeFlag = "day";
        break;
      case 1:
        this.detailParams.timeFlag = "month";
        break;
      case 2:
        this.detailParams.timeFlag = "year";
        break;
    }
    const url = "wjServer/fangxunjc/zhabengzhanyx/waterReport";
    const data = await publicApi.getWithParam(url, this.detailParams);
    if (data.result == true) {
      this.result[0].amount = data.data.zgsw ? data.data.zgsw : 0;
      this.result[0].time = data.data.zgTime ? data.data.zgTime : "";
      this.result[1].amount = data.data.zdsw ? data.data.zdsw : 0;
      this.result[1].time = data.data.zdTime ? data.data.zdTime : "";
      this.tableData = data.data.pjList;
    } else {
      this.tableData = [];
    }
  }

  async getWaterTable() {
    this.hdDetailParams = {
      stcd: this.row.stcd,
    };
    switch (this.activeIndex) {
      case 0:
        this.hdDetailParams.tmFlag = "day";
        this.columns = [
          {
            type: "index",
            title: "序号",
          },
          {
            title: "实时水位",
            key: "jssw",
          },
          {
            title: "时间",
            key: "mntm",
          },
        ];
        break;
      case 1:
        this.hdDetailParams.tmFlag = "month";
        this.columns = [
          {
            type: "index",
            title: "序号",
          },
          {
            title: "平均水位",
            key: "pjsw",
          },
          {
            title: "时间",
            key: "clsj",
          },
        ];
        break;
      case 2:
        this.hdDetailParams.tmFlag = "year";
        this.columns = [
          {
            type: "index",
            title: "序号",
          },
          {
            title: "最高水位",
            key: "yzg",
          },
          {
            title: "最高水位时间",
            key: "fssj1",
          },
          {
            title: "最低水位",
            key: "yzd",
          },
          {
            title: "最低水位时间",
            key: "fssj2",
          },
        ];

        break;
    }

    const url = "wjServer/fangxunjc/z/riverZReport";
    const data = await publicApi.getWithParam(url, this.hdDetailParams);
    if (data.result == true) {
      this.result[0].amount = data.data.zgsw ? data.data.zgsw : 0;
      this.result[0].time = data.data.zgtm ? data.data.zgtm : "";
      this.result[1].amount = data.data.zdsw ? data.data.zdsw : 0;
      this.result[1].time = data.data.zdtm ? data.data.zdTime : "";
      switch (this.hdDetailParams.tmFlag) {
        case "day":
          this.tableData = data.data.tFcShuiweihours;
          break;
        case "month":
          this.tableData = data.data.tFcShuiweidayList;
          break;
        case "year":
          this.tableData = data.data.tFcShuiweimonthList;
          break;
      }
    } else {
      this.tableData = [];
    }
  }
}
</script>
<style lang="scss" scoped>
.water {
  padding: 0 14px;
  width: 100%;
  height: 100%;
  .water-item {
    &:first-of-type {
      padding: 14px 0;
      width: 176px;
    }
    &:nth-of-type(2) {
      display: flex;
      justify-content: space-between;
      .result {
        padding: 0 15px;
        font-size: 14px;
        color: #666;
        // &:first-of-type {
        //   border-right: 1px solid #dde4eb;
        // }
        .blue-font {
          font-size: 20px;
          color: #3a7bef;
        }
        .time {
          // display: inline-block;
          // padding-left: 10px;
          color: #999;
        }
      }
    }
    &:last-of-type {
      padding-top: 15px;
      height: calc(100% - 122px);
    }
  }
}
</style>
