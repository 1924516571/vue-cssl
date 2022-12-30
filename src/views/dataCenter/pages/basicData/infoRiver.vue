<template>
  <!--河湖信息 -->
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <!-- <div class="top-item-sub">
            <suc-select v-model="stationParams.town" :options="townListData" :config="{ placeholder: '市(镇)别', clearable: true }" style="width:160px" @on-change="townChange"></suc-select>
          </div> -->
          <!-- 根据市镇选择村落 -->
          <!-- <div>
            <suc-select v-model="stationParams.village" :options="villageListData" :config="{ placeholder: '根据市镇选择村落', clearable: true }" style="width:160px"></suc-select>
          </div> -->

          <!-- 河湖名称 -->
          <div class="top-item-sub">
            <search-component placeholderTxt="河道名称" clearable="false" @input="onSearch"> </search-component>
          </div>
        </div>
        <div class="top-item">
          <el-upload
            type="success"
            size="small"
            :headers="uploadHeaders"
            :on-success="PicSuccess"
            action="api/wjServer/dataCenter/baseinfo/riverinfo/import"
            accept=".xls,.xlsx"
            :show-file-list="false"
          >
            <suc-button type="primary" :debounce="800" :config="{ ghost: true }" style="margin-right:10px">导入Excel</suc-button>
          </el-upload>

          <suc-button type="primary" :debounce="800" :config="{ ghost: true }" @on-click="exportExcel" style="margin-right:10px">导出数据</suc-button>
          <suc-button style="margin-right:10px" type="primary" :debounce="800" @on-click="downLoad">模板下载</suc-button>
          <suc-button type="primary" :debounce="800" @on-click="onadd">新增</suc-button>
        </div>
      </div>
      <div class="content">
        <z-table :tableData="tableData" v-loading="loading" :pageParams="pageParams" @get-page="getPage" @get-size="getSize">
          <template v-slot:column>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="town" label="市镇"></el-table-column>
            <el-table-column prop="village" label="所在村社区"></el-table-column>
            <el-table-column prop="rvNm" label="河道名称"></el-table-column>
            <el-table-column label="防洪圩堤">
              <el-table-column prop="hlcd" label="长度(m)"></el-table-column>
              <el-table-column prop="hkkd" label="河口宽度"></el-table-column>
              <el-table-column prop="hdaverage" label="平均口宽(m)"></el-table-column>
              <el-table-column prop="trlx" label="土壤类型"></el-table-column>
              <el-table-column prop="pb" label="坡比"></el-table-column>
              <el-table-column prop="hdkd" label="低宽"></el-table-column>
              <el-table-column prop="dgc" label="底高程"></el-table-column>
            </el-table-column>

            <el-table-column label="水塘">
              <el-table-column prop="starea" label="面积"></el-table-column>
              <el-table-column prop="waterarea" label="水面"></el-table-column>
            </el-table-column>

            <el-table-column prop="yjsd" label="淤积深度"></el-table-column>
            <el-table-column prop="yjl" label="淤积量"></el-table-column>
            <el-table-column prop="waterlevel" label="水质等级"></el-table-column>
            <el-table-column prop="dx" label="地形"></el-table-column>
            <el-table-column prop="bz" label="备注"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <span><el-button class="button_green" @click="onDetail(scope.row)" type="text" size="small">详情</el-button></span>
                <span> <el-button type="text" size="small" @click="onedit(scope.row)">编辑</el-button></span>
                <span>
                  <el-button class="button_red" type="text" size="small" @click="ondelete(scope.row)">删除</el-button>
                </span>
              </template>
            </el-table-column>
          </template>
        </z-table>
      </div>
    </div>

    <!-- 新增数据弹框 -->
    <he-dao-modal :title="modalTitle" :model="model" :loading="loading" :formParams="formParams" @on-submit="oncreate" @toggle="toggle"></he-dao-modal>
    <!-- 详情弹框 -->
    <hd-detail-modal :title="modalTitle" :model="detailModel" :loading="loading" :formParams="formParams" @toggle="Detailtoggle"></hd-detail-modal>
    <!-- 删除弹框 -->
    <div class="delete-view" v-show="delmodel">
      <delete-modal @getignore="cancel" @getsave="save" v-loading="delLoading" element-loading-text="拼命删除中"></delete-modal>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { SucSelect, SucButton, SucInput, SucFormItem } from "@suc/ui";
import { SelectConfig, SelectOptions } from "@suc/ui/interfaces";
import { SearchComponent, TablePage, JTable, ZTable } from "@/components";
import { Create, DeleteModal, LinkYj, LinkDefault, HeDaoModal, LinkWithModal, HdDetailModal } from "../model";
import { infoApi, publicApi } from "@/api";
import { url } from "../../../../../public/config.js";
import "../../../../styles/dataCenter.scss";
@Component({
  components: {
    SucSelect,
    SucButton,
    SucInput,
    SucFormItem,
    SearchComponent,
    TablePage,
    Create,
    LinkYj,
    DeleteModal,
    LinkDefault,
    HeDaoModal,
    LinkWithModal,
    JTable,
    ZTable,
    HdDetailModal,
  },
})
export default class Enterprise extends Vue {
  modalTitle: string = ""; //弹窗标题
  loading: boolean = true;
  delLoading: boolean = false;
  btnFlag: string = ""; //区分编辑和新增
  tableData: any[] = [];
  model: boolean = false;
  params: any = {};

  formParams: any = {
    minIoFileList: [],
    // videoPath: "",
    rvCd: "",
    rvNm: "",
    rvG: "",
    rvLen: "",
    ssly: "",
    xzqy: "",
    dmdgc: "",
    dmhkkd: "",
    dmhdkd: "",
    bhkzfwz: "",
    bhkzfwy: "",
    llmj: "",
    hywz: "",
    hkwz: "",
  };

  townListData: any = []; //市镇列表
  townListData2: any = []; //市镇列表
  villageListData: any = []; //村庄列表
  uploadHeaders: any = { Authorization: "bearer " + localStorage.getItem("refresh-token") };
  detailModel: boolean = false;

  pagedfParams: any = {
    total: 0,
    current: 1,
    pageSize: 10,
  };
  townChange(val: any) {
    var id = "";
    for (let index = 0; index < this.townListData2.length; index++) {
      if (this.townListData2[index].townname == val) {
        id = this.townListData2[index].id;
      }
    }

    let url = "wjServer/dataCenter/tFcBengZhan/getVillageList";
    publicApi.getWithParam(url, { townId: id }).then((data: any) => {
      this.villageListData = data.data.map((e: any) => {
        return {
          value: e.valligename,
          label: e.valligename,
        };
      });
    });
  }

  PicSuccess(file: any) {
    if (file.result) {
      this.$Message.success("导入成功");
    } else {
      this.$Message.error("导入失败");
    }
  }

  // 导出
  exportExcel() {
    let excelUrl = url + "/api/wjServer/dataCenter/baseinfo/riverinfo/export?riverName=" + this.stationParams.riverName;
    window.open(excelUrl);
  }

  // 模板下载
  downLoad() {
    location.href = "api/wjServer/河塘基本情况汇总表模板.xls";
  }

  //   删
  delmodel: boolean = false;
  delParams: any = {};
  ondelete(row: any) {
    this.delmodel = true;
    this.delParams = {
      rvcd: row.rvCd,
    };
  }
  cancel(val: any) {
    this.delmodel = val;
  }
  async save() {
    this.delLoading = true;
    let url = "wjServer/dataCenter/baseinfo/riverinfo/delInfo";
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
      imgList: [],
      minIoFileList: [],
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
    this.loading = true;
    let checkUrl = "wjServer/dataCenter/baseinfo/riverinfo/ifExist";
    let a = {
      rvcd: this.formParams.rvCd,
    };
    let checkData = await publicApi.getWithParam(checkUrl, a);
    if (checkData.data) {
      let url = "wjServer/dataCenter/baseinfo/riverinfo/addInfo";
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
    } else {
      this.model = false;
      this.$SucMessage.error("河湖编码已存在,重新输入");
    }
    this.onpage();
  }
  // 更新
  async setEdit() {
    this.loading = true;
    let url = "wjServer/dataCenter/baseinfo/riverinfo/editInfo";
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
  //详情
  onDetail(row: any) {
    this.detailModel = true;
    this.formParams = {};
    this.modalTitle = "详情";
    this.editInfo(row.rvCd);
  }
  Detailtoggle() {
    this.detailModel = false;
  }
  // 编辑
  onedit(row: any) {
    this.model = true;
    this.formParams = {};
    this.btnFlag = "edit";
    this.modalTitle = "编辑";
    this.editInfo(row.rvCd);
  }
  // 详情
  async editInfo(params: any) {
    let url = "wjServer/dataCenter/baseinfo/riverinfo/getInfoByRvcd";
    let detailParams = {
      rvcd: params,
    };
    let data = await publicApi.getWithParam(url, detailParams);
    const imgURL = data.data.minIoFileList.map((item: any) => {
      return {
        name: item.oldName,
        percentage: 100,
        uid: item.fileId,
        url: item.previewUrl,
        response: {
          data: {
            result: true,
            code: "0",
            fileId: item.fileId,
            oldName: item.oldName,
            bucket: "file",
            previewUrl: item.previewUrl,
          },
        },
      };
    });
    this.formParams = {
      rvCd: data.data.rvCd,
      rvNm: data.data.rvNm,
      town: data.data.town,
      village: data.data.village,
      hlcd: data.data.hlcd,
      hkkd: data.data.hkkd,
      hdkd: data.data.hdkd,
      trlx: data.data.trlx,
      pb: data.data.pb,
      dgc: data.data.dgc,
      starea: data.data.starea,
      waterarea: data.data.waterarea,
      yjl: data.data.yjl,
      yjsd: data.data.yjsd,
      waterlevel: data.data.waterlevel,
      hdaverage: data.data.hdaverage,
      dx: data.data.dx,
      bz: data.data.bz,
      imgList: imgURL,
    };
  }

  pageParams: any = {
    total: 0,
    current: 1,
    pageSize: 10,
  };
  stationParams: any = {
    pageNumber: "",
    pageSize: "",
    riverName: "",
  };
  mounted() {
    this.onpage(); //获取页面信息
    this.getTownData(); //获取市镇级别
  }

  async getTownData() {
    let url = "wjServer/dataCenter/tFcBengZhan/getTownList";
    let data = await publicApi.getNoParam(url);
    this.townListData2 = data.data;
    this.townListData = data.data.map((e: any) => {
      return {
        value: e.townname,
        label: e.townname,
      };
    });
  }

  // 列表
  async onpage() {
    this.loading = false;
    this.stationParams.pageNumber = this.pageParams.current;
    this.stationParams.pageSize = this.pageParams.pageSize;
    let url = "wjServer/dataCenter/baseinfo/riverinfo/infoList";
    let data = await publicApi.getWithParam(url, this.stationParams);
    this.pageParams.total = parseInt(data.data.total);
    this.tableData = data.data.rows;
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
    this.stationParams.riverName = val;
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
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }
  // #{$deep}.el-button--text:focus,
  // .el-button--text:not(nohover):hover {
  //   color: #ff5a47;
  //   border-color: transparent;
  //   background-color: transparent;
  // }
}
</style>
