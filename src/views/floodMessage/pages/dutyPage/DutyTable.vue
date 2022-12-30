<template>
  <!--值班人员-->
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <div class="top-item-sub">
            <div class="nav-date">
              <span class="btn" @click="getPre">&lt;</span>
              <span>{{ headerDate + "年" }}</span>
              <span class="btn" @click="getNext">&gt;</span>
            </div>
          </div>
        </div>
        <div class="top-item" style="font-size:25px;letter-spacing: 5px;">{{ headerDate }}年度防汛值班通讯录</div>
        <div class="top-item">
          <!-- <suc-button type="primary" :debounce="800" :config="{ ghost: true }" @on-click="onadd">模板下载</suc-button> -->
          <el-button size="medium" type="primary" style="margin-right:10px" plain @click="downLoadTem">模板下载</el-button>
          <el-upload
            type="success"
            size="small"
            :headers="uploadHeaders"
            :on-success="PicSuccess"
            :on-exceed="handleExceed"
            :on-change="handleChange"
            :on-remove="handleRemove"
            action="api/wjServer/fangxunjc/zhibanTown/import"
            accept=".xls,.xlsx"
            :show-file-list="false"
          >
            <!-- :limit="1" -->
            <!-- <suc-button type="primary" :config="{ size: large }" :debounce="800" style="margin-right:10px">导入Excel</suc-button> -->
            <el-button size="medium" type="primary" style="margin-right:10px" @click="importExcel">导入Excel</el-button>
            <!-- <div style="position: absolute;z-index:1000;color:red;right:10px;top:52px;" slot="tip" class="el-upload__tip">(只 能 上 传 xlsx / xls 文 件)</div> -->
          </el-upload>
        </div>
      </div>
      <div class="content">
        <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams" @get-page="getPage" @get-size="getSize">
          <template v-slot:operation="{ row }">
            <div class="btn">
              <span @click="onedit(row)">编辑</span>
              <!-- <span @click="ondelete(row)">删除</span> -->
            </div>
          </template>
        </table-page>
      </div>
    </div>

    <zb-modal :title="modalTitle" :model="model" :loading="loading" :formParams="formParams" @on-submit="oncreate" @toggle="toggle"></zb-modal>

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
import { zbModal, DeleteModal } from "../model";
import { publicApi } from "@/api";
@Component({
  components: {
    SucButton,
    SucInput,
    SearchComponent,
    TablePage,
    zbModal,
    SucDatePicker,
    DeleteModal,
    SucSelect,
  },
})
export default class Enterprise extends Vue {
  headerDate: any = new Date().getFullYear();
  modalTitle: string = ""; //弹窗标题
  loading: boolean = false;
  delLoading: boolean = false;
  btnFlag: string = ""; //区分编辑和新增
  tableData: any[] = [];
  time: any = "";
  params: any = {};
  formParams: any = {};
  uploadHeaders: any = { Authorization: "bearer " + localStorage.getItem("refresh-token") };
  PicSuccess(file: any) {
    if (file.result) {
      this.$Message.success("导入成功");
      
    } else {
      this.$Message.error("导入失败");
    }
  }
  handleExceed() {
    this.$message.warning("只能导入一个文件");
  }
  fileTemp: any = null;
  handleChange(file: any, fileList: any) {
    this.fileTemp = file.raw;
    if (this.fileTemp) {
      console.log(this.fileTemp, "???");
      if (this.fileTemp.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && this.fileTemp.type !== "application/vnd.ms-excel") {
        this.$message({ type: "warning", message: "附件格式错误，请删除后重新上传！" });
      }
    } else {
      this.$message({ type: "warning", message: "请上传附件" });
    }
  }
  handleRemove(file: any, fileList: any) {
    this.fileTemp = null;
  }

  importExcel() {}

  //   删
  delmodel: boolean = false;
  delParams: any = {};

  mounted() {
    this.onpage(); //获取页面信息
    // this.init();
  }
  // init() {
  //   let { year } = this.getYearMonthDay(new Date());
  //   this.headerDate = year;
  // }

  // getYearMonthDay(date: any) {
  //   let year = date.getFullYear();
  //   let month = date.getMonth();
  //   let day = date.getDate();
  //   return { year, month, day };
  // }

  // 向前
  getPre() {
    this.headerDate--;
    this.onpage();
  }
  //向后
  getNext() {
    this.headerDate++;
    this.onpage();
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
    let url = "wjServer/fangxunjc/ondutyer/delInfo";
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
    this.formParams = {};
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
    let url = "wjServer/fangxunjc/ondutyer/addInfo";
    // this.formParams.dutydate = this.$utils.dateFormat(new Date(this.formParams.dutydate), "yyyy-MM-dd");
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
    let url = "wjServer/fangxunjc/zhibanTown/edit";
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
    let url = "wjServer/fangxunjc/zhibanTown/getDetail";
    let detailParams = { id: params };
    let data = await publicApi.getWithParam(url, detailParams);
    data.result ? (this.formParams = data.data) : this.$message.info(data.desc);

    // this.formParams = {
    //   dutydate: data.data.dutydate,
    //   skiller: data.data.skiller,
    //   dutyleader: data.data.dutyleader,
    //   dayshift: data.data.dayshift,
    //   id: data.data.id,
    //   nightshift: data.data.nightshift,
    //   type: data.data.type,
    //   tel: data.data.tel,
    //   task: data.data.task,
    // };
  }

  // 模板下载
  downLoadTem() {
    location.href = "api/wjServer/年度防汛值班通讯录（板块）导入模板.xlsx";
  }

  columns: any[] = [
    {
      type: "index",
      title: "序号",
      width: "80",
    },
    {
      title: "板块部门",
      key: "area",
    },
    {
      title: "防汛值班电话",
      key: "dutytel",
    },
    {
      title: "分管领导",
      key: "dutyleader",
    },
    {
      title: "联系电话",
      key: "leadertel",
    },
    {
      title: "技术负责人",
      key: "skiller",
    },
    {
      title: "联系电话",
      key: "skillertel",
    },
    {
      title: "联络员",
      key: "liaison",
    },
    {
      title: "联系电话",
      key: "liaisontel",
    },
    {
      title: "备注",
      key: "remark",
    },
    {
      title: "操作",
      slot: "operation",
      width: 120,
    },
  ];

  pageParams: any = {
    total: 0,
    current: 1,
    pageSize: 10,
  };
  zbParams: any = {
    pageNumber: "",
    pageSize: "",
    dutydate: "",
  };

  // 列表
  async onpage() {
    this.zbParams.pageNumber = this.pageParams.current;
    this.zbParams.pageSize = this.pageParams.pageSize;
    this.zbParams.dutydate = this.headerDate;
    // this.zbParams.dutyDate = this.$utils.dateFormat(new Date(this.zbParams.dutyDate), "yyyy-MM-dd");
    let url = "wjServer/fangxunjc/zhibanTown/infoList";
    let data = await publicApi.getWithParam(url, this.zbParams);
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

  // onSearch(val: string) {
  //   this.loading = true;
  //   this.pageParams.current = 1;
  //   // this.pageParams.pageSize = 10;
  //   this.zbParams.dutyer = val;
  //   this.onpage();
  // }
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
      padding: 10px;
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
  #{$deep}.table-view {
    .el-table {
      font-size: 16px;
    }
  }
  #{$deep}.el-table {
    th {
      color: #000;
      font-weight: 800;
    }
  }
}
.nav-date {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 24px;
  letter-spacing: 2px;
  .btn {
    display: inline-block;
    // width: 30px;
    cursor: pointer;
  }
}
</style>
