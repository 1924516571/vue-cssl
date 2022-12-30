<template>
  <div class="module-view">
    <div class="bg-shadow">
      <div class="top-nav">
        <div class="top-nav-item">
          <!-- <div class="btn">
            <el-cascader
              :options="areaOptions"
              v-model="formParams.areaCode"
              :props="{ expandTrigger: 'hover', value: 'myId', label: 'name', children: 'children', checkStrictly: true }"
              style="width:100%;"
              size="small"
              placeholder="所属区域"
              clearable
              @change="handleChange"
            >
            </el-cascader>
          </div> -->

          <div class="btn">
            <suc-date-picker v-model="date" :options="options" style="width:340px"></suc-date-picker>
          </div>
          <div class="btn">
            <suc-select
              v-model="formParams.yhType"
              :options="xcType"
              :config="{
                placeholder: '巡查类型',
                clearable: true,
              }"
              style="width:160px"
            ></suc-select>
          </div>
          <div class="btn">
            <!-- <suc-input placeholder="请输入泵站名称" v-model="formParams.bzName"></suc-input> -->
              <suc-select
              v-model="formParams.yhdxType"
              :options="yhdxType"
              :config="{
                placeholder: '对象类型',
                clearable: true,
              }"
              style="width:160px"
            ></suc-select>
          </div>
          <div class="btn">
            <search-component :value="formParams.stationName" placeholderTxt="对象名称" @input="search"></search-component>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="content-item">
          <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams" @get-page="getPage" @get-size="getSize">
            <template v-slot:task="{ row }">
              <div :class="['status', row.problemStatus == '异常' ? 'red-state' : 'green-state']">{{ row.problemStatus }}</div>
            </template>
            <template v-slot:operation="{ row }">
              <a @click="goRecords(row)">查看详情</a>
            </template>
          </table-page>
        </div>
      </div>
    </div>

    <!-- 养护记录 -->
    <suc-modal :config="inspectConfig" v-model="inspectModel" @on-visible-change="oninspecttoggle">
      <inspect-modal v-if="inspectModel" ref="inspect" :inspectId="inspectId" :loadingShow="loadingShow"></inspect-modal>
    </suc-modal>
    <!-- 养护问题 -->
    <suc-modal :config="config" v-model="model" @on-visible-change="ontoggle">
      <problem-modal v-if="model" ref="problem" :inspectId="inspectId" target="养护"></problem-modal>
    </suc-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { SearchComponent, TablePage } from "@/components";
import { SucButton, SucSelect, SucDatePicker, SucModal, SucInput } from "@suc/ui";
import { maintenanceApi, publicApi, infoApi } from "@/api";
import dayjs from "dayjs";
import { InspectModal } from "./recordPage";
import { Mutation } from "vuex-class";
import { ModalConfig } from "@suc/ui/interfaces/index";

@Component({
  components: {
    SearchComponent,
    TablePage,
    SucButton,
    SucSelect,
    SucDatePicker,
    SucModal,
    SucInput,
    InspectModal,
  },
})
export default class MaintenanceRecord extends Vue {
  @Mutation setPlanItem: any;
  // areaOptions: Array<any> = [];
  loadingShow: boolean = false;
  columns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "区域",
      key: "areaName",
    },
    {
      title: "对象名称",
      key: "stationName",
    },
      {
      title: "巡查类型",
      key: "yhType",
    },
      {
      title: "对象类型",
      key: "engType",
    },
    {
      title: "养护人",
      key: "yhUser",
      // width:200
    },
    {
      title: "养护单位",
      key: "yhCompany",
    },
    {
      title: "养护时间",
      key: "yhTime",
    },
    {
      title: "问题情况",
      slot: "task",
    },
    {
      title: "操作",
      slot: "operation",
      align: "right",
    },
  ];

  tableData: any[] = [];
  pageParams: any = {
    total: 0,
    current: 1,
    pageSize: 10,
  };
  formParams: any = {
    // areaCode: "",
    endDate: "",
    beginDate: "",
    stationName: "", //对象名称
    yhType: "", //巡查类型
    yhdxType:"" //对象类型
  };
  options: any = {
    type: "datetimerange",
    clearable: true,
    placeholder: "请选择时间段",
  };
  show: boolean = false;
  date: any[] = ["", ""];
  config: ModalConfig = {
    transfer: false,
    title: "养护问题",
    width: 640,
    "footer-hide": true,
  };
  inspectConfig: ModalConfig = {
    transfer: false,
    title: "养护记录问问",
    width: 1000,
    "footer-hide": true,
  };
  model: boolean = false;
  inspectModel: boolean = false;
  inspectId: string = "";

  ontoggle(val: boolean) {
    this.model = val;
  }
  oninspecttoggle(val: boolean) {
    this.inspectModel = val;
  }

  // 查看详情

  goRecords(item: any) {
    this.inspectId = item.recordId;
    this.loadingShow = true;
    this.inspectModel = true;
    this.$nextTick(() => {
      (this.$refs.inspect as any).init(); //关键地方
    });
  }

  search(val: string) {
    this.pageParams.current = 1;
    this.formParams.stationName = val;
    this.getTableData();
  }

  getPage(page: number) {
    this.pageParams.current = page;
    this.getTableData();
  }

  getSize(size: number) {
    this.pageParams.current = 1;
    this.pageParams.pageSize = size;
    this.getTableData();
  }
  // 参数
  onpageParams = {};

  async getTableData() {
    this.onpageParams = {
      // areaCode: this.formParams.areaCode,
      // beginDate: this.date[0] ? dayjs(this.date[0]).format("YYYY-MM-DD HH:mm:ss") : "",
      // endDate: this.date[1] ? dayjs(this.date[1]).format("YYYY-MM-DD HH:mm:ss") : "",
      beginDate: this.date[0] ? this.$utils.dateFormat(this.date[0], "yyyy-MM-dd HH:mm:ss") : " ",
      endDate: this.date[1] ? this.$utils.dateFormat(this.date[1], "yyyy-MM-dd HH:mm:ss") : " ",
      pageNumber: this.pageParams.current,
      pageSize: this.pageParams.pageSize,
      // bzName: this.formParams.bzName,
      companyName: this.formParams.companyName,
    };
    const url = "wjServer/hs/maintain/infoList";
    const data = await publicApi.getWithParam(url, this.onpageParams);
    if ((data.result = true)) {
      this.tableData = data.data.rows;
      this.pageParams.total = parseInt(data.data.total);
    } else {
      this.$Message.error("获取数据列表失败");
      this.tableData = [];
    }
  }

  mounted() {
    this.init();
  }

  init() {
    // this.getAreaCode();
    this.getTableData();
    this.getxcType(); //巡查类型
    this.getyhdxType()//对象类型
  }
  xcType: any = []; 

  async getxcType() {
    const url = "wjServer/hs/maintain/getYhType";
    const data = await publicApi.getNoParam(url);
    if (data.result == true) {
      this.xcType = data.data.map((item: any) => {
        return {
          value: item.code,
          label: item.level,
        };
      });
    } else {
      this.xcType = [];
    }
  }
     yhdxType:any = [];
    async getyhdxType() {
    const url = "wjServer/hs/plan/getObjectType";
    const data = await publicApi.getNoParam(url);
    if (data.result == true) {
      this.yhdxType = data.data.map((item: any) => {
        return {
          value: item.code,
          label: item.level,
        };
      });
    } else {
      this.yhdxType = [];
    }
  }

  //获取下拉行政区域下拉
  // async getAreaCode() {
  //   let data = await publicApi.getAreaCode();
  //   this.areaOptions = this.getTreeData([data.data]);
  // }
  // getTreeData(data: any) {
  //   // 循环遍历json数据
  //   for (var i = 0; i < data.length; i++) {
  //     if (data[i].children.length < 1) {
  //       data[i].children = undefined;
  //     } else {
  //       this.getTreeData(data[i].children);
  //     }
  //   }
  //   return data;
  // }

  // async handleChange(value: any) {
  //   this.formParams.areaCode = value.toString();
  // }
}
</script>

<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
.module-view {
  padding: 10px;
  background-color: $pages-bg;
  position: relative;
  .bg-shadow {
    height: 100%;
    background-color: #ffffff;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
  }
  .top-nav {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    &-item {
      display: flex;
      .btn {
        margin-right: 10px;
      }
    }
  }
  .content {
    padding: 10px;
    height: calc(100% - 62px);
    border-top: 1px solid $border-color;
    &-item {
      height: 100%;
      .status {
        display: flex;
        justify-content: center;
        padding: 3px 8px;
        width: 50px;
        border-radius: 2px;
        color: #ffffff;
      }
      .green-state {
        background-color: $state-green;
      }
      .red-state {
        background-color: $state-red;
      }
      .btn {
        color: #5397ff;
        cursor: pointer;
        span {
          display: inline-block;
          margin-right: 10px;
          &:nth-of-type(2) {
            color: #ff5a47;
          }
        }
      }
    }
  }
  .detail {
    width: 100%;
    height: 100%;
    padding: 10px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: $pages-bg;
  }
}
</style>
