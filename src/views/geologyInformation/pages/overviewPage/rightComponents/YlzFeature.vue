<template>
  <!-- 特征极值 -->
  <div class="feature">
    <div class="main">
      <span style="margin-left:5px">小时极值</span>
      <div class="feature-item">
        <suc-date-picker v-model="detailParams.startYear" :options="{ type: 'year' }" style="width: 280px; margin-right: 10px"></suc-date-picker>
        <span style="margin: 0 10px 0 5px; font-size: 20px">-</span>
        <suc-date-picker v-model="detailParams.endYear" :options="{ type: 'year' }" style="width: 280px; margin-right: 10px"></suc-date-picker>
        <suc-button type="primary" :debounce="800" @click="getInfo">搜索</suc-button>
      </div>
      <div class="feature-item">
        <table-component :columns="columns" :tableData="tableData"></table-component>
      </div>
    </div>
    <div class="main">
      <span style="margin-left:5px">时段极值</span>
      <div class="feature-item">
        <suc-date-picker v-model="rainDaydetailParams.startYear" :options="{ type: 'year' }" style="width: 280px; margin-right: 10px"></suc-date-picker>
        <span style="margin: 0 10px 0 5px; font-size: 20px">-</span>
        <suc-date-picker v-model="rainDaydetailParams.endYear" :options="{ type: 'year' }" style="width: 280px; margin-right: 10px"></suc-date-picker>
        <suc-button type="primary" :debounce="800" @click="getRainDayInfo">搜索</suc-button>
      </div>
      <div class="feature-item">
        <table-component :columns="rainDaycolumns" :tableData="rainDaytableData"></table-component>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { SucDatePicker, SucButton } from "@suc/ui";
import { DatePickerOptions } from "@suc/ui/interfaces";
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
      title: "时间",
      key: "year",
      width: "50",
    },
    {
      title: "1小时",
      key: "hourmax1",
    },
    {
      title: "3小时",
      key: "hourmax3",
    },
    {
      title: "6小时",
      key: "hourmax6",
    },
    {
      title: "12小时",
      key: "hourmax12",
    },
    {
      title: "24小时",
      key: "hourmax24",
    },
  ];

  rainDaycolumns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "时间",
      key: "year",
    },
    {
      title: "1天",
      key: "daymax1",
    },

    {
      title: "3天",
      key: "daymax3",
    },
    {
      title: "7天",
      key: "daymax7",
    },
    {
      title: "1月",
      key: "monthmax1",
    },
  ];
  tableData: any[] = [];
  rainDaytableData: any = [];
  detailParams: any = {
    //小时极值参数
    zdbh: "",
    startYear: "",
    endYear: "",
  };
  rainDaydetailParams: any = {
    //时段参数
    zdbh: "",
    startYear: "",
    endYear: "",
  };
  @Watch("row", { immediate: true, deep: true })
  onGet() {
    this.getInfo();
    this.getrainDayInfo();
  }

  // 小时极值数据
  async getInfo() {
    this.tableData = [];
    this.detailParams.startYear = this.detailParams.startYear ? new Date(this.detailParams.startYear).getFullYear() + "" : new Date(new Date()).getFullYear() - 3 + "";
    this.detailParams.endYear = this.detailParams.endYear ? new Date(this.detailParams.endYear).getFullYear() + "" : new Date(new Date()).getFullYear() + "";
    this.detailParams.zdbh = this.row.zdbh;
    let url = "wjServer/fangxunjc/yuqing/maxRainHourList";
    let data = await publicApi.getWithParam(url, this.detailParams);
    if (data.result == true) {
      this.tableData = data.data;
    } else {
      this.tableData = [];
    }
  }

  // 时段
  async getrainDayInfo() {
    this.rainDaytableData = [];
    this.rainDaydetailParams.startYear = this.rainDaydetailParams.startYear ? new Date(this.rainDaydetailParams.startYear).getFullYear() + "" : new Date(new Date()).getFullYear() - 3 + "";
    this.rainDaydetailParams.endYear = this.rainDaydetailParams.endYear ? new Date(this.rainDaydetailParams.endYear).getFullYear() + "" : new Date(new Date()).getFullYear() + "";
    this.rainDaydetailParams.zdbh = this.row.zdbh;
      let url = "wjServer/fangxunjc/yuqing/maxRainDayList";
    let data = await publicApi.getWithParam(url, this.rainDaydetailParams);
    if (data.result == true) {
      this.rainDaytableData = data.data;
    } else {
      this.rainDaytableData = [];
    }
  }

 
}
</script>
<style lang="scss" scoped>
.feature {
  width: 100%;
  height: 100%;
  .main {
    width: 100%;
    height: 50%;
    // &:nth-of-type(2) {
    //   margin-top: 50px;
    // }
    margin-top: 10px;

    .feature-item {
      &:first-of-type {
        padding: 5px 5px 0;
        display: flex;
        padding-bottom: 15px;
      }
      &:nth-of-type(2) {
        height: calc(100% - 70px);
      }
    }
  }
}
</style>
