<template>
  <!--应急预警-->
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <tab-active :btns="btns" @get-btn="getBtn" :activeIndex="activeIndex"></tab-active>
        </div>
        <div class="top-item">
          <!-- <suc-button type="success" style="margin-right: 10px" :debounce="800" @on-click="onadd1">启用</suc-button> -->
          <suc-button type="primary" :debounce="800" @on-click="onadd">新增</suc-button>
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

    <yjyj-modal :title="modalTitle" :model="model" :activeIndex="activeIndex" :loading="loading" :formParams="formParams" @on-submit="oncreate" @toggle="toggle"></yjyj-modal>

    <!-- 开启弹框 -->
    <kq-modal :model1="model1" :loading="loading" title="开启" :activeIndex="activeIndex" :formParams1="formParams1" @on-submit="oncreate1" @toggle1="toggle1"></kq-modal>

    <!-- 删除弹框 -->
    <div class="delete-view" v-show="delmodel">
      <delete-modal @getignore="cancel" @getsave="save" v-loading="delLoading"></delete-modal>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { SucButton, SucInput, SucDatePicker, SucSelect } from "@suc/ui";
import { SearchComponent, TablePage, TabActive } from "@/components";
import { yjyjModal, DeleteModal, kqModal } from "./model";
import { publicApi } from "@/api";
@Component({
  components: {
    SucButton,
    SucInput,
    SearchComponent,
    TablePage,
    yjyjModal,
    SucDatePicker,
    DeleteModal,
    SucSelect,
    kqModal,
    TabActive,
  },
})
export default class Enterprise extends Vue {
  modalTitle: string = ""; //弹窗标题
  loading: boolean = false;
  delLoading: boolean = false;
  btnFlag: string = ""; //区分编辑和新增
  tableData: any[] = [];
  time: any = "";
  activeIndex: any = 0;
  params: any = {};
  bbType: any = [];
  levelOptions: any = [];
  formParams: any = {};
  formParams1: any = {};
  areaOptions: any = [];
  model: boolean = false;
  model1: boolean = false;
  btns: any[] = ["防汛应急预案", "防台风应急预案"];

  //   删
  delmodel: boolean = false;
  delParams: any = {};

  mounted() {
    this.onpage();
  }

  getBtn(index: number) {
    this.activeIndex = index;
    this.yjyjParams.type = index;
    this.onpage();
  }

  ondelete(row: any) {
    this.delmodel = true;
    this.delParams = {
      id: row.erId,
    };
  }
  cancel(val: any) {
    this.delmodel = val;
  }
  async save() {
    this.delLoading = true;
    let url = "wjServer/fangxunjc/ermanager/delInfo";
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
      condition: [""],
      basicWarehouse: {},
      response: [""],
      type: this.activeIndex,
      editor: JSON.parse(localStorage.getItem("userInfo") || "").id,
      ry: JSON.parse(localStorage.getItem("userInfo") || "").realname,
      editDate: this.$utils.dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss"),
    };
  }

  onadd1() {
    this.model1 = true;
    this.formParams1 = {
      dangerLevel: "",
      condition: [],
      response: [],
      type: this.activeIndex,
      editor: JSON.parse(localStorage.getItem("userInfo") || "").id,
      ry: JSON.parse(localStorage.getItem("userInfo") || "").realname,
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

  async oncreate1() {
    this.model1 = false;
    let url1 = "wjServer/fangxunjc/ermanager/recordIsExisted";
    publicApi.getWithParam(url1, { type: this.activeIndex }).then((data: any) => {
      if (data.data) {
        this.$SucMessage.error("该应急响应类型已启用!");
      } else {
        this.loading = true;
        let url = "wjServer/fangxunjc/ermanager/planEnable";
        publicApi.postWithParamJson(url, this.formParams1).then((data: any) => {
          if (data.result == true) {
            this.$SucMessage.info("启用成功");
            this.model1 = false;
            this.onpage();
            this.loading = false;
          } else {
            this.model1 = false;
            this.$SucMessage.error("启用失败");
            this.loading = false;
          }
        });
        this.onpage();
        this.model1 = false;
      }
    });
  }

  //  新增
  async setCreate() {
    let url1 = "wjServer/fangxunjc/ermanager/cdIsExisted";
    publicApi
      .getWithParam(url1, {
        type: this.activeIndex,
        dangerLevel: this.formParams.dangerLevel,
      })
      .then((data: any) => {
        if (data.data) {
          this.$SucMessage.error("该预警已设置");
        } else {
          let url = "wjServer/fangxunjc/ermanager/addInfo";
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
        }
      });
    this.onpage();
  }
  // 更新
  async setEdit() {
    this.loading = true;
    let url = "wjServer/fangxunjc/ermanager/editInfo";
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
  toggle(val: boolean) {
    this.model = val;
  }

  toggle1(val: boolean) {
    this.model1 = val;
  }
  // 编辑
  onedit(row: any) {
    this.model = true;
    this.formParams = {
      busiFxStWaterproject: {},
      busiFxStFlooded: {},
    };
    this.btnFlag = "edit";
    this.modalTitle = "编辑";
    this.editInfo(row.erId);
  }
  // 详情
  async editInfo(params: any) {
    let url = "wjServer/fangxunjc/ermanager/getInfoById";
    let detailParams = {
      id: params,
    };
    let data = await publicApi.getWithParam(url, detailParams);
    this.formParams = data.data;
    this.formParams.ry = data.data.editor;
  }

  columns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "预警等级",
      key: "dangerLevel",
    },
    {
      title: "成员单位",
      key: "cydw",
    },
    {
      title: "启动条件",
      key: "conditionStr",
    },
    {
      title: "响应行动",
      key: "responseStr",
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
  yjyjParams: any = {
    pageNumber: "",
    pageSize: "",
    type: 0,
  };

  // 列表
  async onpage() {
    this.yjyjParams.pageNumber = this.pageParams.current;
    this.yjyjParams.pageSize = this.pageParams.pageSize;
    let url = "wjServer/fangxunjc/ermanager/ePlanList";
    let data = await publicApi.getWithParam(url, this.yjyjParams);
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
  //表格换行
  #{$deep}.el-table .cell {
    white-space: pre-line;
  }
}
</style>
