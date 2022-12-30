<template>
  <!-- 调度指令 -->
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <div class="top-item-sub">
            <suc-date-picker
              v-model="hqclParams.startTime"
              :options="{
                type: 'date',
                clearable: true,
                placeholder: '开始时间',
              }"
              style="width: 150px"
            ></suc-date-picker>
            <label style="width: 50px"> -- </label>
            <suc-date-picker
              v-model="hqclParams.endTime"
              :options="{
                type: 'date',
                clearable: true,
                placeholder: '结束时间',
              }"
              style="width: 150px"
            ></suc-date-picker>
          </div>
          <div class="top-item-sub">
            <suc-select :config="{ placeholder: '应急响应类型', clearable: true }" v-model="hqclParams.type" @on-change="getLevel" :options="typeOptions" style="width: 200px"> </suc-select>
          </div>
          <div class="top-item-sub">
            <suc-select :config="{ placeholder: '预警等级', clearable: true }" v-model="hqclParams.dangerLevel" :options="levelOptions" style="width: 200px"> </suc-select>
          </div>
          <div class="top-item-sub">
            <suc-select :config="{ placeholder: '预警状态', clearable: true }" v-model="hqclParams.yaStatus" :options="yaStatusList" style="width: 200px"> </suc-select>
          </div>
          <div class="top-item-sub">
            <suc-button type="primary" @on-click="onSearch">搜索</suc-button>
          </div>
        </div>
        <div class="top-item">
          <suc-button type="primary" style="margin-right: 10px" :debounce="800" @on-click="onadd1">启用</suc-button>
          <suc-button type="success" :debounce="800" @on-click="clrearAll">一键解除</suc-button>
        </div>
      </div>
      <div class="content">
        <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams" size="medium" @get-page="getPage" @get-size="getSize">
          <!-- <template v-slot:condition="{ row }">
            <div class="btn1" @mouseenter="enterCondition(row)" @mouseleave="leaveCondition(row)">
              <span v-if="conditionId != row.id">
                {{ row.condition }}
              </span>
              <span v-if="conditionId == row.id">
                {{ row.condition1 }}
              </span>
            </div>
          </template>

          <template v-slot:response="{ row }">
            <div class="btn1" @mouseenter="enterResponse(row)" @mouseleave="leaveResponse(row)">
              <span v-if="reponseId != row.id">
                {{ row.response }}
              </span>
              <span v-if="reponseId == row.id">
                {{ row.response1 }}
              </span>
            </div>
          </template>
          <template v-slot:principal="{ row }">
            <div class="btn1" @mouseenter="enterPrincipal(row)" @mouseleave="leavePrincipal(row)">
              <span v-if="principalId != row.id">
                {{ row.principal }}
              </span>
              <span v-if="principalId == row.id">
                {{ row.principal1 }}
              </span>
            </div>
          </template> -->

          <template v-slot:yloperation="{ row }">
            <div>
              <span style="color:#5397ff;cursor: pointer;" @click="onWatch(row)">预览文件</span>
            </div>
          </template>
          <template v-slot:operation="{ row }">
            <div class="btn">
              <span @click="ondetail(row)">详情</span>
              <span style="color: #ccc" v-if="!row.self || row.status == 1">变更</span>
              <span @click="onedit1(row)" v-if="row.self && row.status == 0">变更</span>
              <span v-if="row.status == 0 && row.self" @click="onedit(row)">解除</span>
              <span style="color: #ccc" v-if="row.status == 0 && !row.self">解除</span>
              <span v-if="row.status == 1" style="color: #ccc">已解除</span>
            </div>
          </template>
        </table-page>
      </div>
    </div>

    <hqcl-modal :title="modalTitle" :model="model" :loading="loading" :formParams="formParams" @on-submit="oncreate" @toggle="toggle"></hqcl-modal>
    <!-- 详情弹框 -->
    <detail-modal :model1="detailmodel" :title="detailtitle" :loading="loading" :activeIndex="formParams1.type" :formParams1="formParams1"  @toggle1="toggle1"></detail-modal>
    <!-- 变更弹框 -->
    <kq-modal :model1="model1" :title="title" :loading="loading" :activeIndex="formParams2.type" :formParams2="formParams2" @on-submit="oncreate1" @toggle1="toggle1"></kq-modal>

    <div class="delete-view" v-show="delmodel">
      <jc-modal @getignore="cancel" @getsave="save" v-loading="delLoading"></jc-modal>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { SucButton, SucInput, SucDatePicker, SucSelect } from "@suc/ui";
import { SearchComponent, TablePage } from "@/components";
import { hqclModal, kqModal, JcModal, DetailModal } from "./model";
import { publicApi } from "@/api";
import { disable } from "ol/rotationconstraint";
import { TopBar } from "../../../layout/components";
@Component({
  components: {
    SucButton,
    SucInput,
    SearchComponent,
    TablePage,
    hqclModal,
    SucDatePicker,
    SucSelect,
    kqModal,
    JcModal,
    TopBar,
    DetailModal,
  },
})
export default class Enterprise extends Vue {
  model: boolean = false;
  model1: boolean = false;
  modalTitle: string = ""; //弹窗标题
  title: string = "";
  delmodel: boolean = false;
  delLoading: boolean = false;
  detailmodel: boolean = false; //详情弹框
  detailtitle: any = ""; //详情标题
  yaStatusList: any = [
    { label: "已解除", value: 1 },
    { label: "已启用", value: 0 },
  ]; //预案状态

  loading: boolean = false;
  tableData: any[] = [];
  params: any = {};
  rainOptions: any = [];
  levelOptions: any = [];
  typeOptions: any = [
    { label: "防汛抗旱应急预案", value: 0 },
    { label: "防台风应急预案", value: 1 },
  ];
  formParams: any = {};
  formParams1: any = {
    // type:"",
    // condition:"",
    // responseStr:"",
    // tongzhi:""
  };

  formParams2: any = {};

  mounted() {
    this.onpage();
    this.getRiver(); //应急响应类型
    this.getLevel(); //预警等级
  }

  //  启动
  onadd1() {
    this.title = "启动";
    this.model1 = true;
    this.formParams2 = {};
    this.formParams2 = {
      minIoFileList: [],
    };
  }

  //  变更
  onedit1(row: any) {
    this.model1 = true;
    this.title = "变更";
    this.editInfo2(row.id);
  }
  // 详情
  ondetail(row: any) {
    this.detailmodel = true;
    this.detailtitle = "详情";
    this.editInfo1(row.id);
  }

  onWatch(row: any) {
    // for (let index = 0; index < this.tableData.length; index++) {
    //   if (this.tableData[index].id == row.id) {
    //     let Imgurl = this.tableData[index].minIoFileList[0].previewUrl;
    //     console.log(Imgurl,"Imgurl");
    //     window.open(Imgurl);
    //   }
    // }
    if (row.minIoFileList.length != 0) {
      let Imgurl = row.minIoFileList[0].previewUrl;
      window.open(Imgurl);
    } else {
      this.$SucMessage.info("文件空");
    }
  }
  conditionId: any = "";
  enterCondition(row: any) {
    this.conditionId = row.id;
  }
  leaveCondition(row: any) {
    this.conditionId = "";
  }
  reponseId: any = "";
  enterResponse(row: any) {
    this.reponseId = row.id;
  }
  leaveResponse(row: any) {
    this.reponseId = "";
  }

  principalId: any = "";
  enterPrincipal(row: any) {
    this.principalId = row.id;
  }
  leavePrincipal(row: any) {
    this.principalId = "";
  }

  // 详情
  async editInfo1(params: any) {
    let url = "wjServer/fangxunjc/ermanager/planInfo";
    let detailParams = {
      id: params,
    };
    let data = await publicApi.getWithParam(url, detailParams);
    this.formParams1 = data.data;
    this.formParams1.ry = JSON.parse(localStorage.getItem("userInfo") || "").realname;
  }

  // 变更详情
  async editInfo2(params:any){
      let url = "wjServer/fangxunjc/ermanager/planInfo";
      let detailParams = {
           id: params,
      };
      let data = await publicApi.getWithParam(url, detailParams); 
      this.formParams2 = data.data;   
      this.formParams2.ry = JSON.parse(localStorage.getItem("userInfo") || "").realname;
  }

  async oncreate1() {
    if (this.title == "变更") {
      this.loading = true;
      let url = "wjServer/fangxunjc/ermanager/planEdit";
      publicApi.putWithParamJson(url, this.formParams2).then((data: any) => {
        if (data.result == true) {
          this.$SucMessage.info("变更成功");
          this.model = false;
          this.onpage();
          this.loading = false;
          let a = new TopBar(); //关键地方
          a.getFxleve();
          window.location.reload();
        } else {
          this.model = false;
          this.$SucMessage.error("变更失败");
          this.loading = false;
        }
      });
      this.onpage();
      this.model1 = false;
    } else {
      this.model1 = false;
      let url1 = "wjServer/fangxunjc/ermanager/recordIsExisted";
      publicApi.getWithParam(url1, { type: this.formParams2.type }).then((data: any) => {
        if (data.data) {
          this.$SucMessage.error("该应急响应类型已启用!");
        } else {
          this.loading = true;
          let url = "wjServer/fangxunjc/ermanager/planEnable";
          publicApi.postWithParamJson(url, this.formParams2).then((data: any) => {
            if (data.result == true) {
              this.$SucMessage.info("启用成功");
              this.model1 = false;
              this.onpage();
              this.loading = false;
              let a = new TopBar(); //关键地方
              a.getFxleve();
              window.location.reload();
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
  }

  async getRiver() {
    let url = "wjServer/dataCenter/baseinfo/riverinfo/getAllRiver";
    let data = await publicApi.getNoParam(url);
    this.rainOptions = data.data.map((e: any) => {
      let item = {
        value: e.rvCd,
        label: e.rvNm,
      };
      return item;
    });
  }
  async getLevel() {
    let url = "wjServer/fangxunjc/ermanager/dangerType";
    let data = await publicApi.getWithParam(url, {
      type: 0,
    });
    this.levelOptions = data.data.map((e: any) => {
      let item = {
        value: e.code,
        label: e.name,
      };
      return item;
    });
  }

  async oncreate() {
    this.setEdit();
    this.model = false;
  }
  // 更新
  async setEdit() {
    this.loading = true;
    let url = "wjServer/fangxunjc/ermanager/clearWarning";
    publicApi
      .putWithParamJson(url, {
        id: this.formParams.id,
        duanxin: this.formParams.duanxin,
      })
      .then((data: any) => {
        if (data.result == true) {
          this.$SucMessage.info("解除成功");
          this.model = false;
          this.onpage();
          this.loading = false;
        } else {
          this.model = false;
          this.$SucMessage.error("解除失败");
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
    this.detailmodel = val;
  }
  // 解除
  async onedit(row: any) {
    let url = "wjServer/fangxunjc/ermanager/clearWarning?id=" + row.id;
    let data = await publicApi.putNoParam(url);
    if (data.result) {
      this.$Message.success("解除成功");
      let a = new TopBar();
      a.getFxleve();
      window.location.reload();
    } else {
      this.$Message.error("解除失败");
    }
    this.onpage();
  }

  // 一键解除
  async clrearAll() {
    this.delmodel = true;
  }
  cancel(val: any) {
    this.delmodel = val;
  }

  async save() {
    this.delLoading = true;
    let url = "wjServer/fangxunjc/ermanager/clearWarningList";
    let data = await publicApi.putNoParam(url);
    if (data.result) {
      this.delmodel = false;
      this.delLoading = false;
      this.$Message.success("解除成功");
      this.onpage();
      let a = new TopBar(); //关键地方
      a.getFxleve();
      window.location.reload();
    } else {
      this.$Message.error("解除失败");
      this.delLoading = false;
      this.delmodel = false;
      this.onpage();
    }
  }

  // 详情
  // async editInfo(params: any) {
  //   let url = "wjServer/fangxunjc/ermanager/getClearMsg";
  //   let detailParams = {
  //     id: params,
  //   };
  //   let data = await publicApi.getWithParam(url, detailParams);

  //   this.formParams = data.data;
  // }

  columns: any[] = [
    {
      type: "index",
      title: "序号",
      width: 80,
    },
    {
      title: "应急响应类型",
      key: "type",
      width: 155,
    },
    {
      title: "预警等级",
      key: "dangerLevel",
      width: 120,
    },
    {
      title: "启动条件",
      key: "condition",
      // slot: "condition",
    },
    {
      title: "响应行动",
      key: "response",
      // slot: "response",
    },
    {
      title: "成员单位",
      key: "principal",
      // slot: "principal",
    },

    {
      title: "通知内容",
      key: "duanxin",
    },
    {
      title: "启动时间",
      key: "startTime",
      width: 150,
    },
    {
      title: "解除时间",
      key: "relieveTime",
      width: 150,
    },
    {
      title: "预览文件",
      slot: "yloperation",
    },

    {
      title: "操作",
      slot: "operation",
      width: 250,
    },
  ];

  pageParams: any = {
    total: 0,
    current: 1,
    pageSize: 10,
  };
  hqclParams: any = {
    pageNumber: "",
    pageSize: "",
    yaStatus: "",
  };

  // 列表
  async onpage() {
    this.hqclParams.pageNumber = this.pageParams.current;
    this.hqclParams.pageSize = this.pageParams.pageSize;
    this.hqclParams.startTime = this.$utils.dateFormat(new Date(this.hqclParams.startTime), "yyyy-MM-dd");
    this.hqclParams.endTime = this.$utils.dateFormat(new Date(this.hqclParams.endTime), "yyyy-MM-dd");
    let url = "wjServer/fangxunjc/ermanager/recordList";
    let data = await publicApi.getWithParam(url, this.hqclParams);
    this.pageParams.total = parseInt(data.data.total);
    let tableArray = data.data.rows;
    this.tableData = tableArray.map((e: any) => {
      return {
        condition: e.condition.length > 50 ? e.condition.substring(0, 50) + "....." : e.condition,
        condition1: e.condition,
        response1: e.response,
        response: e.response.length > 50 ? e.response.substring(0, 50) + "....." : e.response,
        createtime: e.createtime,
        dangerLevel: e.dangerLevel,
        duanxin: e.duanxin,
        id: e.id,
        laster: e.laster,
        minIoFileList: e.minIoFileList,
        principal: e.principal.length > 50 ? e.principal.substring(0, 50) + "....." : e.principal,
        principal1: e.principal,
        publisher: e.publisher,
        relieveTime: e.relieveTime != "" ? this.$utils.dateFormat(new Date(Number(e.relieveTime)), "yyyy-MM-dd HH:mm:ss") : "",
        self: e.self,
        startTime: this.$utils.dateFormat(new Date(Number(e.startTime)), "yyyy-MM-dd HH:mm:ss"),
        status: e.status,
        type: e.type,
        updatetime: this.$utils.dateFormat(new Date(Number(e.updatetime)), "yyyy-MM-dd"),
        warehouse: e.warehouse,
      };
    });
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
      .btn1 {
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
#{$deep}.table-view {
  .el-table {
    font-size: 22px;
  }
}
</style>
