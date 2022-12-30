<template>
  <!-- 闸泵站运行统计表 -->
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
        >
          <!-- @change="handleChange" -->
        </el-cascader>
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
  tableData: any = [];
  report: any = {
    areaID: "",
    bjks: new Date(new Date().getTime() - 7 * 1000 * 3600 * 24),
    bjjs: new Date(),
  };

  onloadParams: any = {
    areaID: "",
    starTime: "",
    endTime: "",
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
      title: "累计流量(m²/s)",
      key: "totalQ",
    },
    {
      title: "开启时间",
      key: "beginTime",
    },
    {
      title: "关闭时间",
      key: "endTime",
    },
  ];

  mounted() {
    this.getAreaCode(); //获取行政区域
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

  // async handleChange(val: any) {
  //   this.report.areaID = val.toString();
  // }

  async getonPageData() {
    this.onloadParams = {
      areaCode: this.report.areaID.toString(),
      startTime: this.$utils.dateFormat(new Date(this.report.bjks), "yyyy-MM-dd"),
      endTime: this.$utils.dateFormat(new Date(this.report.bjjs), "yyyy-MM-dd"),
    };
    const url = "wjServer/dataCenter/baseinfo/bengzhan/stationRunningRecord";
    publicApi.getWithParam(url, this.onloadParams).then((data: any) => {
      if (data.result == true) {
        this.tableData = data.data;
      } else {
        this.tableData = [];
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
