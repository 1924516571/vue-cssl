<template>
  <!-- 泵站运行 -->
  <div class="survey-flood">
    <div class="top-item">
      <div class="top-sel">
        <el-cascader
          v-model="report.areaCode"
          :options="areaOptions"
          :props="{ expandTrigger: 'hover', value: 'myId', label: 'name', children: 'children', checkStrictly: true }"
          style="width:100%;"
          size="small"
          placeholder="所属区域"
          clearable
          @change="handleChange"
        ></el-cascader>
      </div>
      <div class="top-sel">
        <label>时间选择：</label>
        <suc-date-picker v-model="report.startTime" :options="{ type: 'date', clearable: false }" disabled style="width: 150px"></suc-date-picker>
        <label>至</label>
        <suc-date-picker v-model="report.endTime" :options="{ type: 'date', clearable: false }" style="width: 150px" @on-change="getDate"></suc-date-picker>
      </div>
      <div class="top-sel">
        <span style="margin-right:30px">
          <suc-button type="primary" :debounce="800" @on-click="onSearch">查询</suc-button>
        </span>
      </div>
    </div>

    <!-- 内容部分 -->
    <div class="content">
      <div style="text-align:center;font-size:20px;margin:20px 0">
        <h1>过去一周记录</h1>
      </div>
      <div style="height: calc(100% - 72px)">
        <table-no :columns="columns" :tableData="tableData">
          <!-- <template v-slot:index>
            <span>{{index}}</span>
          </template> -->
          <template v-slot:stationName="{ row }">
            <span>{{ row.stationName }}</span>
          </template>
          <template v-slot:one="{ row }">
            <span class="state" v-if="row.one == '0'">关</span>
            <span class="openState" v-else>开</span>
          </template>
          <template v-slot:two="{ row }">
            <span class="state" v-if="row.two == '0'">关</span>
            <span class="openState" v-else>开</span>
          </template>
          <template v-slot:three="{ row }">
            <span class="state" v-if="row.three == '0'">关</span>
            <span class="openState" v-else>开</span>
          </template>
          <template v-slot:four="{ row }">
            <span class="state" v-if="row.four == '0'">关</span>
            <span class="openState" v-else>开</span>
          </template>
          <template v-slot:five="{ row }">
            <span class="state" v-if="row.five == '0'">关</span>
            <span class="openState" v-else>开</span>
          </template>
          <template v-slot:six="{ row }">
            <span class="state" v-if="row.six == '0'">关</span>
            <span class="openState" v-else>开</span>
          </template>
          <template v-slot:seven="{ row }">
            <span class="state" v-if="row.seven == '0'">关</span>
            <span class="openState" v-else>开</span>
          </template>
        </table-no>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { SucInput, SucSelect, SucButton, SucDatePicker } from "@suc/ui";
import { RainStation } from "./floodPage";
import { TablePage, TableNo } from "@/components";
import { SelectConfig, SelectOptions } from "@suc/ui/interfaces";
import { infoApi, publicApi } from "@/api";

@Component({
  components: {
    SucSelect,
    SucInput,
    SucButton,
    SucDatePicker,
    RainStation,
    TablePage,
    TableNo,
  },
})
export default class ReportSelect extends Vue {
  areaOptions: any = []; //区域数据
  //   value:any = {
  //        '开':true,
  //        "关":false

  //   };
  // value:any = false
  // value1:any = true
  djColor: any = {
    Ⅰ: "#32bb53",
    Ⅱ: "#32bb53",
    Ⅲ: "#32bb53",
    Ⅳ: "#ffab3d",
    Ⅴ: "#ff5a47",
    劣Ⅴ: "#ce1717",
  };

  columns: any = [];
  tableData: any = [];
  report: any = {
    areaCode: "",
    startTime: new Date(new Date(new Date().getTime() - 6 * 1000 * 3600 * 24)),
    endTime: new Date(),
  };

  onloadParams: any = {
    ylzd: "",
    starTime: "",
    endTime: "",
  };
  mounted() {
    this.getAreaCode(); //获取行政区域
    this.getonPageData(); //页面数据
  }
  async getAreaCode() {
    let data = await publicApi.getAreaCode();
    this.areaOptions = this.getTreeData([data.data]);
  }
  getTreeData(data: any) {
    // 循环遍历json数据
    for (var i = 0; i < data.length; i++) {
      if (data[i].children.length < 1) {
        // children若为空数组，则将children设为undefined
        data[i].children = undefined;
      } else {
        // children若不为空数组，则继续 递归调用 本方法
        this.getTreeData(data[i].children);
      }
    }
    return data;
  }

  async handleChange(value: any) {
    this.report.areaCode = value.toString();
  }

  async getonPageData() {
    this.onloadParams = {
      areaCode: this.report.areaCode,
      endTime: this.$utils.dateFormat(new Date(this.report.endTime), "yyyy-MM-dd"),
    };
    const url = "wjServer/dataCenter/baseinfo/bengji/weekRunningStatus";
    publicApi.getWithParam(url, this.onloadParams).then((data: any) => {
      if (data.result == true) {
        data.data.columns.splice(0, 1);
        this.columns = data.data.columns.map((e: any) => {
          return {
            title: e.title,
            slot: e.key,
          };
        });
        this.tableData = data.data.datas;
      } else {
        this.$SucMessage.error("加载失败");
      }
    });
  }

  // 查询
  onSearch() {
    this.getonPageData();
  }

  getDate(date: any) {
    const test = new Date(date); //中国标准时间
    this.report.startTime = new Date(test.getTime() - 6 * 1000 * 3600 * 24);
  }
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
@import "@/styles/commonVariables.scss";

.survey-flood {
  width: 100%;
  height: 100%;
  // display: relative;
  padding: 10px;
  //   margin-bottom: 10px;
  //   background: #f8f8f9;
  background: #efeff1;
  .top-item {
    width: 100%;
    height: 62px;
    display: flex;
    line-height: 62px;
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
    padding-left: 14px;
    font-size: 14px;
    color: #666666;
    .bottom {
      height: 100%;
      width: 100%;
      overflow: auto;
    }
  }
  .state {
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    border-radius: 50%;
    color: #ffffff;
    background-color: #ccc;
  }
  .openState {
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    border-radius: 50%;
    color: #ffffff;
    background-color: rgb(97, 229, 30);
  }
}
</style>
