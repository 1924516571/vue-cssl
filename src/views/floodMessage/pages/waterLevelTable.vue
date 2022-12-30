<template>
  <!-- 泵机运行记录 -->
  <div class="outbox">
    <div class="top">
      <div class="top-sel">
        <el-cascader
          :options="areaOptions"
          v-model="report.areaID"
          :props="{ expandTrigger: 'hover', value: 'myId', label: 'name', children: 'children', checkStrictly: true }"
          style="width:100%;"
          size="small"
          placeholder="所属区域"
          clearable
          @change="handleChange"
        >
        </el-cascader>
      </div>
      <div class="top-sel">
        <label>河道级别：</label>
        <suc-select v-model="report.hdjb" :options="hdjbData" style="width: 150px"></suc-select>
      </div>
      <div class="top-sel">
        <label>时间选择：</label>
        <suc-date-picker v-model="report.bjjs" :options="{ type: 'date', clearable: false }" style="width: 150px"></suc-date-picker>
      </div>

      <div class="top-sel">
        <span style="margin-right:30px">
          <suc-button type="primary" :debounce="800" @on-click="onSearch">查询</suc-button>
        </span>
        <span>
          <suc-button type="primary" :config="{ ghost: true }" :debounce="800" @on-click="exportExcel">导出</suc-button>
        </span>
      </div>
    </div>
    <div class="content">
      <div class="bottom scroll">
        <table-no :columns="columns" :tableData="tableData"> </table-no>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { SucInput, SucSelect, SucButton, SucDatePicker } from "@suc/ui";
import { publicApi } from "@/api";
import { TableNo } from "@/components";
@Component({
  components: {
    SucSelect,
    SucInput,
    SucButton,
    SucDatePicker,
    TableNo,
  },
})
export default class ReportSelect extends Vue {
  areaOptions: any = [];
  hdjbData: any = [];
  tableData: any = [];

  report: any = {
    areaID: "",
    hdjb: "",
    bjjs: new Date(),
  };

  onloadParams: any = {
    areaID: "",
    hdjb: "",
    time: "",
  };

  columns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "流经区域",
      key: "qy",
    },
    {
      title: "河道级别",
      key: "hdjb",
    },
    {
      title: "河道名称",
      key: "hdmc",
    },
    {
      title: "0点",
      key: "zd",
    },
    {
      title: "2点",
      key: "jz",
    },
    {
      title: "4点",
      key: "ontime",
    },
    {
      title: "6点",
      key: "offtime",
    },
    {
      title: "8点",
      key: "runtime",
    },
    {
      title: "10点",
      key: "totalrain",
    },
    {
      title: "12点",
      key: "desigin",
    },
    {
      title: "14点",
      key: "outriver",
    },
    {
      title: "16点",
      key: "outriver",
    },
    {
      title: "18点",
      key: "outriver",
    },
    {
      title: "20点",
      key: "outriver",
    },
    {
      title: "22点",
      key: "outriver",
    },
    {
      title: "24点",
      key: "outriver",
    },
  ];

  mounted() {
    this.getAreaCode(); //获取行政区域
    // this.getHdjb();
    this.getonPageData(); //页面数据
  }
  onSearch() {
    this.getonPageData();
  }

  async getAreaCode() {
    let { data } = await publicApi.getAreaCode();
    this.areaOptions = this.getTreeData([data]);
  }
  getTreeData(receiveData: any) {
    for (var i = 0; i < receiveData.length; i++) {
      if (receiveData[i].children.length < 1) {
        receiveData[i].children = undefined;
      } else {
        this.getTreeData(receiveData[i].children);
      }
    }
    return receiveData;
  }

  async getHdjb() {
    let url = "wwww.cccc.com";
    let data = await publicApi.getNoParam(url);
    this.hdjbData = data.data.map((item: any) => {
      return {
        value: item.aa,
        label: item.bb,
      };
    });
  }

  async getonPageData() {
    this.onloadParams = {
      areaID: this.report.areaID,
      time: this.$utils.dateFormat(new Date(this.report.bjjs), "yyyy-MM-dd"),
    };
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

  //  导出表格
  exportExcel() {
    let url =
      process.env.VUE_APP_BASE +
      "/api/wjServer/hs/reportForm/monthFlowStatisticsExport?areaCode=" +
      this.report.areaCode +
      "&formType=" +
      this.report.bbSel +
      "&stationName=" +
      this.report.stationName +
      "&yearMonth=" +
      this.$utils.dateFormat(new Date(this.report.date), "yyyy-MM");
    window.location.href = url; //原窗口打开
    // window.open(url); // 重新打开新窗口
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
      &:nth-of-type(3) {
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
    .bottom:hover {
      overflow-y: auto;
    }
    #{$deep}.el-table::before {
      height: 0;
    }
  }
}
</style>
