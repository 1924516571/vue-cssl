<template>
  <!--应急预警-->
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <tab-active :btns="btns" @get-btn="getBtn" :activeIndex="activeIndex"></tab-active>
        </div>
      </div>
      <div class="top">
        <div class="top-item" v-if="activeIndex == 0">
          <div class="top-item-sub">
            <search-component placeholderTxt="物资名称" @input="onSearch"> </search-component>
          </div>
        </div>
        <div class="top-item" v-if="activeIndex == 1">
          <div class="top-item-sub">
            出入库时间:
            <suc-date-picker
              v-model="crkParams.startDate"
              :options="{
                type: 'date',
                clearable: true,
                placeholder: '开始时间',
              }"
              style="width: 150px"
            ></suc-date-picker>
            <label style="width: 50px"> -- </label>
            <suc-date-picker
              v-model="crkParams.endDate"
              :options="{
                type: 'date',
                clearable: true,
                placeholder: '结束时间',
              }"
              style="width: 150px"
            ></suc-date-picker>
          </div>
          <div class="top-item-sub">
            <suc-input
              placeholder="仓库名称"
              :config="{
                clearable: true,
              }"
              v-model="crkParams.cknm"
            ></suc-input>
          </div>
          <div class="top-item-sub">
            <search-component placeholderTxt="物资名称" @input="crkonSearch"> </search-component>
          </div>
          <div style="position:absolute;right:40px">
            <suc-button type="success" :debounce="800" @on-click="onadd">出入库操作</suc-button>
          </div>
        </div>
      </div>
      <div class="content">
        <table-component v-if="activeIndex == 0" :columns="fxwzcolumns" size="medium"  :tableData="fxwztableData" v-loading="loading"> </table-component>
        <table-page v-if="activeIndex == 1" :columns="crkcolumns" :tableData="crktableData"  size="medium"  :pageParams="pageParams" v-loading="loading" @get-page="getPage" @get-size="getSize"> </table-page>
      </div>
    </div>
    <crk-modal :model1="model" :loading="loading" :title="modalTitle" :activeIndex="activeIndex" :formParams1="formParams1" @on-submit="oncreate" @toggle1="toggle"></crk-modal>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { SucButton, SucInput, SucDatePicker, SucSelect } from "@suc/ui";
import { SearchComponent, TablePage, TabActive, JTable, TableComponent } from "@/components";
import { DeleteModal, planModal, crkModal } from "../model";
import { publicApi, infoApi } from "@/api";
@Component({
  components: {
    SucButton,
    SucInput,
    SearchComponent,
    TablePage,
    SucDatePicker,
    DeleteModal,
    SucSelect,
    TabActive,
    JTable,
    planModal,
    TableComponent,
    crkModal,
  },
})
export default class Plan extends Vue {
  modalTitle: string = ""; //弹窗标题
  loading: boolean = false;
  btnFlag: string = ""; //区分编辑和新增
  activeIndex: any = 0;
  formParams1: any = {};
  model: boolean = false;
  btns: any[] = ["防汛物资查询", "出入库管理"];
  //   删
  fxwzcolumns: any = [];
  fxwztableData: any = [];

  crkcolumns: any = [
    {
      type: "index",
      title: "序号",
      width:"80"
    },
    {
      title: "出入库类别",
      key: "type",
    },
    {
      title: "乡镇",
      key: "areaName",
    },
    {
      title: "仓库名称",
      key: "wareHouseName",
    },
    {
      title: "物资名称",
      key: "wuziName",
    },
    {
      title: "出入数量",
      key: "num",
    },
    {
      title: "库存量",
      key: "sumNum",
    },
    {
      title: "物资单位",
      key: "unit",
    },
    {
      title: "登记人",
      key: "creator",
    },
    {
      title: "出入库时间",
      key: "tmStr",
    },
    {
      title: "说明",
      key: "instructions",
    },
  ];
  mounted() {
    // 防汛物资查询不分页数据
    this.getfxwzNoPage();
  }

  fxwzParams: any = {
    wuziName: "",
  };

  async getfxwzNoPage() {
    let url = "wjServer/dataCeter/wareHouse/ckAndwzList";
    let data = await publicApi.getWithParam(url, this.fxwzParams);
    if (data.result) {
      this.fxwzcolumns = data.data.titles;
      this.fxwzcolumns[0].width = "150";
      this.fxwzcolumns[1].width = "150";
      this.fxwztableData = data.data.data;
      this.fxwzcolumns.unshift({
        type: "index",
        title: "序号",
        width:"80"
      });
    }
    this.loading = false;
  }

  crkParams: any = {
    startDate: "",
    endDate: "",
    cknm: "",
    wznm: "",
    pageSize: "",
    pageNumber: "",
  };
  crktableData: any = [];
  async getcrkPage() {
    let url = "wjServer/outAndInWareHouse/page";
    this.crkParams.startDate = this.$utils.dateFormat(new Date(this.crkParams.startDate), "yyyy-MM-dd");
    this.crkParams.endDate = this.$utils.dateFormat(new Date(this.crkParams.endDate), "yyyy-MM-dd");
    this.crkParams.pageNumber = this.pageParams.current;
    this.crkParams.pageSize = this.pageParams.pageSize;
    let data = await publicApi.getWithParam(url, this.crkParams);
    if (data.result) {
      this.crktableData = data.data.rows;
      this.pageParams.total = parseInt(data.data.total);
    } else {
      this.$message.error("获取数据失败");
      this.crktableData = [];
    }
    this.loading = false;
  }

  getBtn(index: number) {
    this.activeIndex = index;
    if (this.activeIndex == 0) {
      this.getfxwzNoPage();
    } else if (this.activeIndex == 1) {
      this.getcrkPage();
    }
  }

  onSearch(val: string) {
    this.loading = true;
    this.fxwzParams.wuziName = val;
    this.getfxwzNoPage();
  }

  crkonSearch(val: string) {
    this.loading = true;
    this.crkParams.wznm = val;
    this.getcrkPage();
  }

  // 新增弹框
  onadd() {
    this.model = true;
    this.btnFlag = "add";
    this.modalTitle = "出入库管理";
    this.formParams1 = {};
  }

  downLoad() {
    if (this.activeIndex == 0) {
      location.href = "api/wjServer/下达计划.xls";
    } else {
      location.href = "api/wjServer/绩效考核.xls";
    }
  }
  async oncreate() {
    console.log(this.formParams1, "我是对象");

    this.setCreate();
    this.model = false;
  }

  async setCreate() {
    let url = "wjServer/outAndInWareHouse";
    let data = await publicApi.postWithParamJson(url, this.formParams1);
    if (data.result) {
      this.$Message.success("添加成功");
    } else {
      this.$Message.error("添加失败");
    }
    this.getcrkPage();
  }

  toggle(val: boolean) {
    this.model = val;
  }

  pageParams: any = {
    total: 0,
    current: 1,
    pageSize: 10,
  };

  getPage(page: any) {
    this.loading = true;
    this.pageParams.current = page;
    this.getcrkPage();
  }
  getSize(size: any) {
    this.loading = true;
    this.pageParams.current = 1;
    this.pageParams.pageSize = size;
    this.getcrkPage();
  }
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";

.info {
  width: 100%;
  height: 100%;
  padding: 10px;
  position: relative;
  &-view {
    height: 100%;
    .top {
      padding: 15px;
      display: flex;
      justify-content: space-between;
      &-item {
        display: flex;
        // width: 50%;
        &-sub {
          margin-right: 10px;
        }
      }
    }
    .content {
      height: calc(100% - 130px);
      border-top: 1px solid #dde4eb;
      .link-text {
        color: #5397ff;
        cursor: pointer;
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
  .delete-view {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }
  //表格换行
  #{$deep}.el-table .cell {
    white-space: pre-line;
  }
  #{$deep}.table-view {
  .el-table {
    font-size: 16px;
  }
}
}
</style>
