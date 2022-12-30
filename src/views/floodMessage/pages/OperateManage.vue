<template>
  <!--计划清单 -->
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <div class="top-item-sub">
            <!-- 时间组件 -->
            <el-date-picker
              v-model="daterangeData"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
              size="small"
              @change="dateChange"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </div>
          <!-- 审批状态 -->
          <div class="top-item-sub">
            <suc-select v-model="stationParams.planStatus" :options="sblxDataArray" :config="{ placeholder: '审批状态', clearable: false }" style="width:160px"></suc-select>
          </div>
          <!-- 对象类型 -->
          <div class="top-item-sub">
            <suc-select v-model="stationParams.type" :options="objectTypeData" :config="{ placeholder: '对象类型', clearable: true }" style="width:160px"></suc-select>
          </div>
          <div class="top-item-sub">
            <search-component placeholderTxt="对象名称" @input="onSearch"> </search-component>
          </div>
        </div>
        <div class="top-item">
          <!-- v-if="this.roleName == '运维人员'" -->
          <suc-button type="primary" :debounce="800" @on-click="onadd" v-if="roleName == '运维人员'">新建计划</suc-button>
        </div>
      </div>
      <div class="content">
        <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams" v-loading="loading" @get-page="getPage" @get-size="getSize">
          <template v-slot:operation="{ row }">
            <div class="btn">
              <span @click="ondetail(row)">详情</span>
              <span @click="approve(row)" v-if="row.planStatus == '待审批' && roleName == 'manager'">审批</span>
              <span @click="onedit(row)" v-if="roleName !== 'manager'">编辑</span>
              <span @click="ondelete(row)" v-if="roleName !== 'manager' && row.approveStatus !== '审批通过'">删除</span>
            </div>
          </template>
        </table-page>
      </div>
    </div>

    <!-- 审批弹框 -->
    <div>
      <el-dialog title="计划审批" :visible.sync="isApproveModal" :close-on-click-modal="true" :before-close="onCancel">
        <el-form :model="form">
          <el-form-item label="原因:" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="form.approveMsg" autocomplete="off" :autosize="{ minRows: 5, maxRows: 6 }" placeholder="如果不通过填写原因"> </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="unAprrove">不通过</el-button>
          <el-button type="primary" @click="getAprrove">通过</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 新增数据弹框 -->
    <operate-manage-modal
      :title="modalTitle"
      :model="model"
      :loading="loading"
      :formParams="formParams"
      @on-submit="oncreate"
      @toggle="toggle"
      :areaOptions="areaOptions"
      :engData="engData"
      :isreadonly="isreadonly"
      :isChangeType="isChangeType"
    ></operate-manage-modal>

    <!-- 详情数据弹框 -->
    <!-- <detail-plan-modal :title="detailModalTitle"  :formParams="formParams" :dialogVisible="isModal" @toggle1="toggle1" :modal="modal"> </detail-plan-modal> -->

    <!-- 删除弹框 -->
    <div class="delete-view" v-show="delmodel">
      <delete-modal @getignore="cancel" @getsave="save" v-loading="delLoading"></delete-modal>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { SucSelect, SucButton, SucInput, SucFormItem } from "@suc/ui";
// import { SelectConfig, SelectOptions } from "@suc/ui/interfaces";
import { SearchComponent, TablePage } from "@/components";
import { DeleteModal, OperateManageModal, DetailPlanModal } from "./myModel";
import { infoApi, publicApi } from "@/api";
import { values } from "lodash";
import dayjs from "dayjs";
import { oncreate2 } from "../../../api/datacenter/info";
@Component({
  components: {
    SucSelect,
    SucButton,
    SucInput,
    SucFormItem,
    SearchComponent,
    TablePage,
    DeleteModal,
    OperateManageModal,
    DetailPlanModal,
  },
})
export default class Enterprise extends Vue {
  olMap = this.$getMapConfig();
  engData: any = [];
  areaOptions: any = [];
  url: string = "wjServer/dataCenter/baseinfo/getStationType";
  addvcd: any = "";
  modalTitle: string = ""; //弹窗标题
  isreadonly: boolean = false; //是否禁用
  loading: boolean = true;
  delLoading: boolean = false;
  btnFlag: string = ""; //区分编辑和新增
  tableData: any[] = [];
  isChangeType: boolean = true; //子页面的方法下拉框方法是否调用
  objectTypeData: any[] = []; //对象类型

  formParams: any = {};
  form: any = {
    approveMsg: "", //审核意见
    planId: "",
    userId: "",
    approveStatus: "",
  };

  modal: any = "";
  detailModalTitle: any = ""; //详情标题
  isModal: boolean = false; //是否弹框
  toggle1(val: any) {
    this.isModal = false;
  }

  // 存时间数据
  daterangeData: any = [];

  formLabelWidth = "80px";

  dateChange(val: any) {
    this.stationParams = {
      beginDate: val ? val[0] : "",
      endDate: val ? val[1] : "",
    };
  }

  //   删
  delmodel: boolean = false;
  delParams: any = {}; //删除的参数
  ondelete(row: any) {
    this.delmodel = true;
    this.delParams = {
      planId: row.planId,
    };
  }
  cancel(val: any) {
    this.delmodel = val;
  }
  async save() {
    this.delLoading = true;
    let url = "wjServer/hs/plan/delPlan";
    infoApi.ondeleteWithParams(this.delParams, url).then((data: any) => {
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
    this.isChangeType = true;
    this.formParams.yhnr = "";
    this.model = true;
    this.isreadonly = false;
    this.btnFlag = "add";
    this.modalTitle = "新增计划";
    this.formParams = {
      id: localStorage.getItem("reporter"),
      reporter: localStorage.getItem("userId"),
      ywdwMc: localStorage.getItem("departmentName"),
      ywdw: localStorage.getItem("departmentId"),
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
    this.formParams.starttime ? (this.formParams.starttime = dayjs(this.formParams.starttime).format("YYYY-MM-DD")) : null;
    this.formParams.overtime ? (this.formParams.overtime = dayjs(this.formParams.overtime).format("YYYY-MM-DD")) : null;
    this.loading = true;
    const url = "wjServer/hs/plan/addPlan";
    await infoApi.oncreate2(this.formParams, url).then((data: any) => {
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
    // const  data  = await publicApi.postWithParamJson(url,this.formParams);
    // console.log(data,"uuuu");

    this.onpage();
  }
  // 更新
  async setEdit() {
    this.formParams.starttime ? (this.formParams.starttime = dayjs(this.formParams.starttime).format("YYYY-MM-DD HH:mm:ss")) : null;
    this.formParams.overtime ? (this.formParams.overtime = dayjs(this.formParams.overtime).format("YYYY-MM-DD HH:mm:ss")) : null;
    this.loading = true;
    let url = "wjServer/hs/plan/editPlan";
    infoApi.jsonUpdate(this.formParams, url).then((data: any) => {
      if (data.result == true) {
        this.$SucMessage.info("更新成功");
        this.model = false;
        this.onpage();
        this.loading = false;
      } else {
        this.model = false;
        this.$SucMessage.error(data.desc);
        this.loading = false;
      }
    });
    this.onpage();
  }
  model: boolean = false;
  //子组件的点击事件，触发toggle,并传值给父组件
  toggle(val: boolean) {
    this.model = val;
  }

  // 编辑
  onedit(row: any) {
    this.isChangeType = false;
    this.model = true;
    this.isreadonly = false;
    this.formParams = {};
    this.btnFlag = "edit";
    this.modalTitle = "编辑计划";
    let planId = row.planId;
    this.editInfo(planId);
  }
  // 详情
  async editInfo(planId: any) {
    let url = "wjServer/hs/plan/getDetail/";
    let params = {
      planId: planId,
    };
    let data = await infoApi.getInfo(params, url);
    if (data) {
      this.formParams = {
        planId: data.data.planId,
        type: data.data.type,
        planMc: data.data.planMc,
        area: data.data.area,
        // object: data.data.object,
        templateId: data.data.templateId,
        ywdw: localStorage.getItem("departmentId"),
        ywdwMc: data.data.companyName,
        cycle: data.data.cycle,
        id: data.data.reporterName,
        reporter: localStorage.getItem("userId"),
        starttime: data.data.starttime,
        overtime: data.data.overtime,
        updateNumber: data.data.updateNumber,
        approve: data.data.approve,
        objectName: data.data.objectName,
        // yhnr: data.data.templateDto.yhnrList,
        // object:data.data.bzName
      };
      // let a: any = [];
      // let b = data.data.templateDto.yhnrList;
      // b.forEach((item: any, index: any) => {
      //   a.push(item.mc);
      // });
      // const s = a.toString();
      // this.formParams.yhnr = s;
      // console.log(this.formParams.yhnr,"8888");
    }
  }

  // 获取根据区域id  获取泵站名称数据
  // async getAreaId(id: any) {
  //   const engParams = {
  //     fieldId: id,
  //   };
  //   const url = "wjServer/task/field/getFieldEng";
  //   const { data } = await infoApi.getWithParam(url, engParams);
  //   this.engData = data
  //     ? data.map((item: any) => {
  //         return {
  //           value: item.engCded,
  //           label: item.engNameed,
  //         };
  //       })
  //     : [];
  // }

  // 详情页面
  ondetail(row: any) {
    this.isChangeType = false;
    this.model = true;
    this.isreadonly = true;
    this.formParams = {};
    this.btnFlag = "detail";
    this.modalTitle = "计划详情";
    let planId = row.planId;
    this.editInfo(planId);
  }
  onCancel() {
    this.isApproveModal = false;
  }
  isApproveModal: boolean = false;
  // 批准弹框页面
  approve(row: any) {
    this.form.approveMsg = "";
    this.isApproveModal = true;
    this.form.planId = row.planId;
    this.form.userId = localStorage.getItem("userId");
  }
  getAprrove() {
    this.form.approveStatus = "1";
    const url = "wjServer/hs/plan/approvePlan";
    infoApi.onupdate(this.form, url).then((data: any) => {
      if (data.result == true) {
        this.$SucMessage.info("提交成功");
        this.isApproveModal = false;
        this.onpage();
      } else {
        this.$SucMessage.info("提交失败");
        this.isApproveModal = false;
        this.onpage();
      }
    });
  }
  unAprrove() {
    this.form.approveStatus = "2";
    if (this.form.approveMsg == "") {
      // this.$SucMessage.warning("请填写原因");
      this.$message.error("请填写原因");
    } else {
      const url = "wjServer/hs/plan/approvePlan";
      infoApi.onupdate(this.form, url).then((data: any) => {
        if (data.result == true) {
          this.$SucMessage.info("提交成功");
          this.isApproveModal = false;
          this.onpage();
        } else {
          this.$SucMessage.info("提交失败");
          this.isApproveModal = false;
          this.onpage();
        }
      });
    }
  }

  //   查rowClick
  columns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "计划名称",
      key: "planName",
      // width:"200px",
      // sortable:"true"
    },
    {
      title: "对象名称",
      key: "objectName",
    },
    {
      title: "对象类型",
      key: "type",
    },
    {
      title: "区域",
      key: "area",
    },
    {
      title: "周期",
      key: "planCycle",
    },
    {
      title: "养护单位",
      key: "yhCompany",
    },
    {
      title: "上报人",
      key: "reporter",
    },
    {
      title: "审核状态",
      key: "approveStatus",
    },
    {
      title: "计划执行时间",
      key: "planTime",
    },
    {
      title: "操作",
      slot: "operation",
      width: 200,
    },
  ];

  pageParams: any = {
    total: 0,
    current: 1,
    pageSize: 10,
  };
  stationParams: any = {
    pageNumber: "",
    pageSize: "",
    beginDate: "",
    endDate: "",
    planStatus: "",
    bzName: "",
    type: "",
  };
  // 用户角色
  roleName: any = localStorage.getItem("roleName");

  mounted() {
    this.stationParams.planStatus = this.sblxDataArray[0].value;
    this.getType(); //对象类型
    this.onpage(); //获取页面信息
  }

  // 审批状态
  sblxDataArray: any = [
    { value: "待审批", label: "待审批" },
    { value: "审批完成", label: "审批完成" },
  ];

  async getType() {
    const url = "wjServer/hs/plan/getObjectType";
    const data = await publicApi.getNoParam(url);
    if (data.result == true) {
      this.objectTypeData = data.data.map((item: any) => {
        return {
          value: item.code,
          label: item.level,
        };
      });
    } else {
      this.objectTypeData = [];
    }
  }
  // 列表
  async onpage() {
    this.stationParams.pageNumber = this.pageParams.current; //当前页码
    this.stationParams.pageSize = this.pageParams.pageSize; //一页多少条
    let url = "wjServer/hs/plan/infoList";
    let data = await infoApi.onpage(this.stationParams, url);
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
  onSearch(val: string) {
    this.loading = true;
    this.pageParams.current = 1;
    this.stationParams.bzName = val;
    if (this.stationParams.planStatus == "审批完成") {
    }
    this.onpage();
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
        // width: 200px;
        span {
          display: inline-block;
          margin-right: 10px;
          &:nth-of-type(3) {
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

::v-deep.el-dialog__wrapper {
  .el-dialog {
    .el-dialog__header {
      background-color: #5993fa;
    }
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }
    .el-dialog__body {
      // height: 200px;
      overflow-y: auto;
    }
    .el-dialog__footer {
      border-top: 1px solid #e8eaec;
    }
  }
}
</style>
