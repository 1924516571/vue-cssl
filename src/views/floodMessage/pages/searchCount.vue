<template>
  <!-- 巡查统计表 -->
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
        <label>计划状态：</label>
        <suc-select v-model="report.planState" :options="planData" style="width: 150px"></suc-select>
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
        <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams" v-loading="loading" @get-page="getPage" @get-size="getSize"> </table-page>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { SucInput, SucSelect, SucButton, SucDatePicker } from "@suc/ui";
import { publicApi } from "@/api";
import { TableNo, TablePage } from "@/components";
@Component({
  components: {
    SucSelect,
    SucInput,
    SucButton,
    SucDatePicker,
    TableNo,
    TablePage,
  },
})
export default class ReportSelect extends Vue {
  areaOptions: any = [];
  tableData: any = [];
  planData: Array<any> = [];
  loading: boolean = true;
  report: any = {
    areaID: "",
    planState: "",
    bjks: new Date(new Date().getTime() - 7 * 1000 * 3600 * 24),
    bjjs: new Date(),
  };

  onloadParams: any = {
    areaID: "",
    starTime: "",
    endTime: "",
  };

  pageParams: any = {
    total: 0,
    current: 1,
    pageSize: 10,
  };

  getPage(page: any) {
    this.loading = true;
    this.pageParams.current = page;
    // this.onpage();
  }
  getSize(size: any) {
    this.loading = true;
    this.pageParams.current = 1;
    this.pageParams.pageSize = size;
    // this.onpage();
  }

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

  mounted() {
    this.getAreaCode(); //获取行政区域
    this.getPlanState();
    this.getonPageData(); //页面数据
  }
  onSearch() {
    this.getonPageData();
  }
  async getAreaCode() {
    let { data } = await publicApi.getAreaCode();
    this.areaOptions = this.getTreeData([data]);
  }
  async getPlanState() {
    // let url = "wwww.cccc.com";
    // let data = await publicApi.getNoParam(url);
    // this.planData = data.data.map((item: any) => {
    //   return {
    //     value: item.aa,
    //     label: item.bb,
    //   };
    // });
    this.planData = [
        {value:"quanbu",label:"全部"},
        {value:"0",label:"未完成"},
        {value:"1",label:"已完成"},
    ]
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

  async getonPageData() {
    this.onloadParams = {
      areaID: this.report.areaID,
      starTime: this.$utils.dateFormat(new Date(this.report.bjks), "yyyy-MM-dd"),
      endTime: this.$utils.dateFormat(new Date(this.report.bjjs), "yyyy-MM-dd"),
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
    if (this.tableData.length !== "") {
      this.loading = false;
    }
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
    .hover:hover {
      overflow-y: auto;
    }
    // #{$deep}.el-table::before {
    //   height: 0;
    // }
  }
}
</style>
