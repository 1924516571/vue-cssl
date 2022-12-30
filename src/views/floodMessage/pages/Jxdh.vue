<template>
  <!--防汛预案-->
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <div class="top-item-sub">
            <!-- <suc-date-picker
              v-model="fxyaParams.belongTime"
              :options="{
                type: 'date',
                clearable: true,
                placeholder: '请选择年月',
              }"
              style="width: 150px"
            ></suc-date-picker> -->
            <suc-date-picker v-model="date" :options="{ type: 'daterange', clearable: true, placeholder: '时间段' }" style="width: 200px"></suc-date-picker>
          </div>
          <div class="top-item-sub">
            <!-- <search-component placeholderTxt="预案名称" @input="onSearch"> </search-component> -->
            <suc-select v-model="fxyaParams.recordStatus" :config="{ clearable: true }" :options="bbOptions" style="width:200px"> </suc-select>
          </div>

          <div class="top-item-sub">
            <suc-button type="primary" @on-click="onSearch">搜索</suc-button>
          </div>
          <div class="top-item-sub">
            <suc-button type="primary" :config="{ ghost: true }" @on-click="exportExcel">导出</suc-button>
          </div>
        </div>
        <div class="top-item">
          <suc-button type="primary" :debounce="800" @on-click="onadd">添加记录</suc-button>
        </div>
      </div>
      <div class="content">
        <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams" @get-page="getPage" @get-size="getSize">
          <template v-slot:operation="{ row }">
            <div class="btn">
              <span @click="onedit(row)">编辑</span>
              <span @click="ondelete(row)">删除</span>
            </div>
          </template>
        </table-page>
      </div>
    </div>

    <jxdh-modal :title="modalTitle" :model="model" :loading="loading" :formParams="formParams" @on-submit="oncreate" @toggle="toggle"></jxdh-modal>

    <!-- 删除弹框 -->
    <div class="delete-view" v-show="delmodel">
      <delete-modal @getignore="cancel" @getsave="save" v-loading="delLoading"></delete-modal>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { SucButton, SucInput, SucDatePicker, SucSelect } from "@suc/ui";
import { SearchComponent, TablePage } from "@/components";
import { jxdhModal, DeleteModal } from "./model";
import { publicApi } from "@/api";
@Component({
  components: {
    SucButton,
    SucInput,
    SearchComponent,
    TablePage,
    jxdhModal,
    SucDatePicker,
    DeleteModal,
    SucSelect,
  },
})
export default class Enterprise extends Vue {
  modalTitle: string = ""; //弹窗标题
  loading: boolean = false;
  delLoading: boolean = false;
  btnFlag: string = ""; //区分编辑和新增
  tableData: any[] = [];
  time: any = "";
  params: any = {};

  // date: any = ["", ""];

  date: any = [new Date(new Date().getTime() - 1 * 1000 * 3600 * 24), new Date()];

  formParams: any = {
    // jldw: "",
  };

  bbOptions: any = [
    { value: "1", label: "未处理" },
    { value: "2", label: "已处理" },
  ];

  //   删
  delmodel: boolean = false;
  delParams: any = {};

  mounted() {
    this.onpage(); //获取页面信息
  }

  ondelete(row: any) {
    this.delmodel = true;
    this.delParams = {
      id: row.id,
    };
  }
  cancel(val: any) {
    this.delmodel = val;
  }
  async save() {
    this.delLoading = true;
    let url = "wjServer/wj/phoneRecord/deleteInfo";
    await publicApi.deleteWithParam(url, this.delParams).then((data: any) => {
      if (data.result == true) {
        this.delmodel = false;
        this.$SucMessage.info("删除成功");
        this.onpage();
        this.delLoading = false;
      } else {
        this.delLoading = false;
        this.$SucMessage.error("删除失败");
      }
    });
  }

  // 新增弹框
  onadd() {
    this.model = true;
    this.btnFlag = "add";
    this.modalTitle = "新增";
    this.formParams = {
      // minIoFileList: [],
    };
  }

  // 判断是新增还是编辑
  async oncreate() {
    if (this.btnFlag == "add") {
      this.setCreate();
    } else if (this.btnFlag == "edit") {
      this.setEdit();
    }
    this.model = false;
  }
  //  新增
  async setCreate() {
    let url = "wjServer/wj/phoneRecord/addInfo";
    (this.formParams.ldsj = this.$utils.dateFormat(new Date(this.formParams.ldsj), "yyyy-MM-dd HH:mm:ss")),
      publicApi.postWithParamJson(url, this.formParams).then((data: any) => {
        if (data.result == true) {
          this.$SucMessage.info("新增成功");
          this.model = false;
          this.onpage();
          this.loading = false;
        } else {
          this.$SucMessage.error("新增失败");
          this.model = false;
          this.loading = false;
        }
      });
    this.onpage();
  }
  // 更新
  async setEdit() {
    this.loading = true;
    let url = "wjServer/wj/phoneRecord/editInfo";
    (this.formParams.ldsj = this.$utils.dateFormat(new Date(this.formParams.ldsj), "yyyy-MM-dd HH:mm:ss")),
      publicApi.putWithParamJson(url, this.formParams).then((data: any) => {
        if (data.result == true) {
          this.$SucMessage.info("更新成功");
          this.model = false;
          this.onpage();
          this.loading = false;
        } else {
          this.model = false;
          this.$SucMessage.error("更新失败");
          this.loading = false;
        }
      });
    this.onpage();
  }
  model: boolean = false;
  toggle(val: boolean) {
    this.model = val;
  }
  // 编辑
  onedit(row: any) {
    this.model = true;
    this.formParams = {};
    this.btnFlag = "edit";
    this.modalTitle = "编辑";
    this.editInfo(row.id);
  }
  // 详情
  async editInfo(params: any) {
    let url = "wjServer/wj/phoneRecord/getInfoById";
    let detailParams = {
      id: params,
    };

    let data = await publicApi.getWithParam(url, detailParams);
    if (data.result) {
      this.formParams = data.data;
    } else {
      this.$SucMessage.error("获取失败");
    }
  }

  columns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "记录单位",
      key: "jldw",
    },
    {
      title: "记录人",
      key: "jlr",
    },
    {
      title: "来电电话",
      key: "ldsj",
    },
    {
      title: "来电时间",
      key: "ldsj",
    },
    {
      title: "来电号码",
      key: "ldhm",
    },
    {
      title: "来电单位",
      key: "lddw",
    },
    {
      title: "来电地址",
      key: "lddz",
    },
    {
      title: "险情类型",
      key: "xqlx",
    },
    {
      title: "险情内容",
      key: "xqnr",
    },
    {
      title: "备注",
      key: "bz",
    },
    {
      title: "状态",
      key: "zt",
    },
    {
      title: "操作",
      slot: "operation",
      width: 90,
    },
  ];

  pageParams: any = {
    total: 0,
    current: 1,
    pageSize: 10,
  };
  fxyaParams: any = {
    pageNumber: "",
    pageSize: "",
    startTime: "",
    endTime: "",
    recordStatus: "",
  };

  // 列表
  async onpage() {
    this.fxyaParams.pageNumber = this.pageParams.current;
    this.fxyaParams.pageSize = this.pageParams.pageSize;
    this.fxyaParams.startTime = this.date[0] ? this.$utils.dateFormat(this.date[0], "yyyy-MM-dd") : "";
    this.fxyaParams.endTime = this.date[0] ? this.$utils.dateFormat(this.date[1], "yyyy-MM-dd") : "";

    // 给对象赋值两种方式是不同的

    // this.fxyaParams = {
    //   startTime: this.date[0] ? this.$utils.dateFormat(this.date[0], "yyyy-MM-dd") : "",
    //   endTime: this.date[0] ? this.$utils.dateFormat(this.date[1], "yyyy-MM-dd") : "",
    //   pageNumber: this.pageParams.current,
    //   pageSize: this.pageParams.pageSize,
    //   recordStatus: "",
    // };

    let url = "wjServer/wj/phoneRecord/infoList";
    let data = await publicApi.getWithParam(url, this.fxyaParams);
    this.pageParams.total = parseInt(data.data.total);
    this.tableData = data.data.rows;
    this.loading = false;
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

  onSearch() {
    this.loading = true;
    this.pageParams.current = 1;
    this.onpage();
  }

  // 导出表格
  async exportExcel() {
    let url =
      process.env.VUE_APP_BASE +
      "/api/wjServer/wj/phoneRecord/phoneRecordExport?startTime="+
      (this.date[0] ? this.$utils.dateFormat(this.date[0], "yyyy-MM-dd") : "") +
      "&endTime=" +
      (this.date[1] ? this.$utils.dateFormat(this.date[1], "yyyy-MM-dd") : "") +
      "&recordStatus=" +
      this.fxyaParams.recordStatus;

    window.location.href = url; //原窗口打开
    // window.open(url); // 重新打开新窗口
  }
}
</script>
<style lang="scss" scoped>
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
      height: calc(100% - 65px);
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
}
</style>
