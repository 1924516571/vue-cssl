<template>
  <!-- 特征极值 -->
  <div class="feature">
    <div class="feature-item">
      <suc-date-picker v-model="detailParams.startTime" :options="{ type: 'year' }" style="width: 280px; margin-right: 10px"></suc-date-picker>
      <span style="margin: 0 10px 0 5px; font-size: 20px">-</span>
      <suc-date-picker v-model="detailParams.endTime" :options="{ type: 'year' }" style="width: 280px; margin-right: 10px"></suc-date-picker>
      <suc-button type="primary" :debounce="800" @click="search">搜索</suc-button>
    </div>
    <div class="feature-item">
      <table-component :columns="columns" :tableData="tableData"></table-component>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { SucDatePicker, SucButton } from "@suc/ui";
import { TableComponent } from "@/components";
import { publicApi } from "@/api";
@Component({
  components: {
    SucButton,
    SucDatePicker,
    TableComponent,
  },
})
export default class Feature extends Vue {
  @Prop() row!: any;
  columns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "年份",
      key: "happenTime",
      width: "50",
    },
    {
      title: "年最高水位",
      key: "zgsw",
    },
    {
      title: "发生时间",
      key: "zgTime",
      width: "120",
    },
    {
      title: "年最低水位",
      key: "zdsw",
    },
    {
      title: "发生时间",
      key: "zdTime",
      width: "120",
    },
  ];
  tableData: any[] = [];
  //泵站参数
  detailParams: any = {
    startTime: "",
    endTime: "",
    stationId: "",
  };

  //河道参数
  hdDetailParams: any = {
    stcd: "",
    startYear: "",
    endYear: "",
  };

  difference: any = ""; 

  @Watch("row", { immediate: true, deep: true })
  stcdChange(row: any) {
    this.tableData = [];
    switch (row.key) {
      case "HD":
        this.getExtremum(); //河道
        this.difference = "HD";
        break;
      case "zbz":
        this.getInfo(); //泵站
        this.difference = "zbz";
        break;
    }
  }

  // 河道极值
  async getExtremum() {
    this.detailParams.startTime = this.detailParams.startTime ? new Date(this.detailParams.startTime).getFullYear() + "" : new Date(new Date()).getFullYear() - 3 + "";
    this.detailParams.endTime = this.detailParams.endTime ? new Date(this.detailParams.endTime).getFullYear() + "" : new Date(new Date()).getFullYear() + "";

    this.hdDetailParams.stcd = this.row.stcd;
    this.hdDetailParams.startYear = this.detailParams.startTime;
    this.hdDetailParams.endYear = this.detailParams.endTime;

    const url = "wjServer/fangxunjc/z/yearExtremum";
    const data = await publicApi.getWithParam(url, this.hdDetailParams);
    if (data.result == true && data.data.length > 0) {
      this.tableData = data.data.map((e: any) => {
        return {
          happenTime: e.year,
          zgsw: e.nzg,
          zgTime: e.fssj1,
          zdsw: e.nzd,
          zdTime: e.fssj2,
        };
      });
    } else {
      this.tableData = [];
    }
  }

  // 泵站极值
  async getInfo() {
    this.detailParams.startTime = this.detailParams.startTime ? new Date(this.detailParams.startTime).getFullYear() + "" : new Date(new Date()).getFullYear() - 3 + "";
    this.detailParams.endTime = this.detailParams.endTime ? new Date(this.detailParams.endTime).getFullYear() + "" : new Date(new Date()).getFullYear() + "";
    this.detailParams.stationId = this.row.stationId;
    const url = "wjServer/fangxunjc/zhabengzhanyx/extremum";
    const data = await publicApi.getWithParam(url, this.detailParams);
    if (data.result == true && data.data.length > 0) {
      this.tableData = data.data;
    } else {
      this.tableData = [];
    }
    // this.tableData = [
    //   { year: "2022", maxvalue: "7.79", maxtime: "03-01 14:47:08", minvalue: "66", mintime: "01-23 22:20:01" },
    //   { year: "2021", maxvalue: "7.79", maxtime: "03-01 14:47:08", minvalue: "66", mintime: "01-23 22:20:01" },
    //   { year: "2023", maxvalue: "7.79", maxtime: "03-01 14:47:08", minvalue: "66", mintime: "01-23 22:20:01" },
    // ];
  }

  search() {
    if (this.difference == "HD") {
      this.getExtremum();
    } else if (this.difference == "zbz") {
      this.getInfo();
    }
  }
}
</script>
<style lang="scss" scoped>
.feature {
  width: 100%;
  height: 100%;
  .feature-item {
    padding: 14px 0;
    &:first-of-type {
      padding: 14px 14px 0;
      display: flex;
      // padding-bottom: 15px;
    }
    &:nth-of-type(2) {
      height: calc(100% - 14px);
      // height: 100%;
    }
  }
}
</style>
