<template>
  <!-- 闸泵站运行记录表 -->
  <div class="outbox">
    <div class="top">
      <div class="top-sel">
        <suc-select v-model="report.station" :options="stationData" :config="{ placeholder: '请选择泵站名称', clearable: false, size: 'default' }" style="width: 220px"></suc-select>
      </div>
      <div class="top-sel">
        <label>时间选择：</label>
        <suc-date-picker v-model="report.bjks" :options="{ type: 'date', clearable: false }" style="width: 150px"></suc-date-picker>
        <label>至</label>
        <suc-date-picker v-model="report.bjjs" :options="{ type: 'date', clearable: false }" style="width: 150px"></suc-date-picker>
      </div>
      <div class="top-sel">
        <span>
          <suc-button type="primary" :debounce="800" @on-click="onSearch">查询</suc-button>
        </span>
      </div>
    </div>
    <div class="content">
      <div class="bottom scroll">
        <table-page :columns="columns" :show-total=true     :tableData="tableData" :pageParams="pageParams" v-loading="loading" @get-page="getPage" @get-size="getSize"> </table-page>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { SucInput, SucSelect, SucButton, SucDatePicker } from "@suc/ui";
import { publicApi } from "@/api";
import { TablePage } from "@/components";
@Component({
  components: {
    SucSelect,
    SucInput,
    SucButton,
    SucDatePicker,
    TablePage,
  },
})
export default class ReportSelect extends Vue {
  tableData: any = [];
  stationData: any = [];
  report: any = {
    // station: this.stationData[0].value,
    station: "",
    // bjks: new Date(new Date().getTime() - 7 * 1000 * 3600 * 24),
    bjks: new Date(),
    bjjs: new Date(),
  };

  loading: boolean = true;

  pageParams: any = {
    //表单默认参数
    total: 0,
    current: 1,
    pageSize: 10,
  };

  onloadParams: any = {
    //列表的参数
    station: "",
    starTime: "",
    endTime: "",
    pageSize: "",
    pageNumber: "",
  };

  columns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "站名",
      key: "bzmc",
    },
    {
      title: "区域",
      key: "xzqy",
    },
    {
      title: "设计流量(m²/s)",
      key: "zjll",
    },
    {
      title: "运行流量(m²/s)",
      key: "yxll",
    },
    {
      title: "过水流量(m²/s)",
      key: "gsll",
    },
    {
      title: "闸门开度",
      key: "zmkd",
    },
    {
      title: "闸门开启数量",
      key: "zmkqsl",
    },
    {
      title: "运行时间",
      key: "yxTime",
    },
  ];

  async mounted() {   //同步异步问题
    await this.getStation();
    this.onpage(); //页面数据
  }
  onSearch() {
    this.loading = true;
    this.pageParams.current = 1;
    this.onpage();
  }

  getPage(page: any) {
    this.loading = true;
    this.pageParams.current = page;
    this.onpage();
  }

  getSize(size: any) {
    this.loading = true;
    this.pageParams.current = 1;
    this.pageParams.pageSize = size;
    this.onpage();
  }
  async getStation() {
    let bzParms = {
      areaCode: localStorage.getItem("areaCode"),
    };
    const url = "wjServer/dataCenter/baseinfo/bengzhan/getZhaBengZhanList";
    const data = await publicApi.getWithParam(url, bzParms);
    if ((data.result = true)) {
      this.stationData = data.data.map((e: any) => {
        return {
          value: e.bzbm,
          label: e.bzmc,
        };
      });
      this.report.station = this.stationData[0].value;
    } else {
      this.$SucMessage.error("获取失败");
    }
  }

  async onpage() {
    this.onloadParams = {
      startTime: this.$utils.dateFormat(new Date(this.report.bjks), "yyyy-MM-dd"),
      endTime: this.$utils.dateFormat(new Date(this.report.bjjs), "yyyy-MM-dd"),
      pageSize: this.pageParams.pageSize,
      pageNumber: this.pageParams.current,
      station: this.report.station,
    };
    const url = "wjServer/dataCenter/baseinfo/bengzhan/zbzRunningRecord";
    publicApi.getWithParam(url, this.onloadParams).then((data: any) => {
      if (data.result == true) {
        this.pageParams.total = parseInt(data.data.total);
        this.tableData = data.data.rows;
        this.loading = false;
      } else {
        this.tableData = [];
        this.loading = false;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
$deep: "::v-deep";
@import "@/styles/commonVariables.scss";
.outbox {
  width: 100%;
  height: 100%;
  padding: 10px;
  background: #efeff1;
  .top {
    width: 100%;
    height: 62px;
    line-height: 62px;
    display: flex;
    margin-bottom: 10px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
    border-radius: 3px;
    background: #fff;
    .top-sel {
      margin-right: 10px;
      &:nth-of-type(1) {
        margin-left: 10px;
      }
      &:nth-of-type(2) {
        margin-right: 50px;
      }
      label {
        margin: 0 10px;
      }
    }
  }
  .content {
    height: calc(100% - 72px);
    border-top: 1px solid #dde4eb;
    background: #fff;
    color: #666666;
    .bottom {
      height: 100%;
      width: 100%;
      overflow-x: hidden;
      overflow-y: hidden;
    }
    .hover:hover {
      overflow-y: auto;
    }
    #{$deep}.el-table::before {
      height: 0;
    }
  }
}
</style>
