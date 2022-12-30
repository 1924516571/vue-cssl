<template>
  <!--联圩信息 -->
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <div class="top-item-sub">
            <suc-select v-model="stationParams.town" :options="townListData" :config="{ placeholder: '市(镇)别', clearable: true }" style="width:160px"></suc-select>
          </div>
          <div class="top-item-sub">
            <suc-select v-model="stationParams.lwtype" :options="lwTypeData" :config="{ placeholder: '联圩类型', clearable: true }" style="width:160px"></suc-select>
          </div>

          <!-- 根据市镇选择村落 -->
          <!-- <div>
            <suc-select v-model="stationParams.village" :options="villageListData" :config="{ placeholder: '根据市镇选择村落', clearable: true }" style="width:160px"></suc-select>
          </div> -->

          <!-- 河湖名称 -->
          <div class="top-item-sub">
            <search-component placeholderTxt="联圩名称" clearable="false" @input="onSearch"> </search-component>
          </div>
        </div>
        <div class="top-item">
          <el-upload type="success" size="small" :headers="uploadHeaders" :on-success="PicSuccess" action="api/wjServer/dataCenter/tFcLw/import" accept=".xls,.xlsx" :show-file-list="false">
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
            <el-table-column prop="area" label="所属区域"></el-table-column>
            <el-table-column prop="lwmc" label="圩区名称"></el-table-column>
            <el-table-column prop="lwtype" label="联圩类型"></el-table-column>
            <el-table-column prop="total" label="联圩总面积(亩):合计"></el-table-column>
            <el-table-column prop="gdxj" label="联圩总面积按高程分类(亩):小计"></el-table-column>

            <el-table-column label="防洪圩堤">
              <el-table-column prop="totallen" label="小计(km)"></el-table-column>
              <el-table-column prop="db" label="其中达标(km)"></el-table-column>
            </el-table-column>

            <el-table-column label="排涝能力">
              <el-table-column prop="plnum" label="排涝站数量(座)"></el-table-column>
              <el-table-column prop="pldl" label="排涝动力(kw)"></el-table-column>
              <el-table-column prop="plll" label="排涝流量(m3/s)"></el-table-column>
            </el-table-column>

            <el-table-column label="圩区三闸(座)">
              <el-table-column prop="wqxj" label="小计"></el-table-column>
              <el-table-column label="其中">
                <el-table-column prop="tz" label="套闸"></el-table-column>
                <el-table-column prop="fhz" label="防洪闸"></el-table-column>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="zdsw" label="圩内最低田面（m）"></el-table-column>
            <el-table-column label="圩内河道">
              <el-table-column prop="yjsw" label="预降水位"></el-table-column>
              <el-table-column prop="txsw" label="脱险水位"></el-table-column>
              <el-table-column prop="kzsw" label="控制水位"></el-table-column>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <!-- <span><el-button @click="onDetail(scope.row)" type="text" size="small">详情</el-button></span> -->
                <span> <el-button type="text" size="small" @click="onedit(scope.row)">编辑</el-button></span>
                <span>
                  <el-button class="button_red"  type="text" size="small" @click="ondelete(scope.row)">删除</el-button>
                </span>
              </template>
            </el-table-column>
          </template>
        </z-table>
      </div>
    </div>

    <!-- 新增数据弹框 -->
    <lw-modal :title="modalTitle" :model="model" :loading="loading" :formParams="formParams" @on-submit="oncreate" @toggle="toggle"></lw-modal>

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
import { Create, DeleteModal, LinkYj, LinkDefault, HeDaoModal, LinkWithModal, HdDetailModal, LwModal } from "../model";
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
    LwModal,
  },
})
export default class Enterprise extends Vue {
  lwTypeData: any[] = [
    {
      value: "半高田",
      label: "半高田",
    },
    {
      value: "低洼",
      label: "低洼",
    },
    {
      value: "圩内",
      label: "圩内",
    },
    {
      value: "沿江联圩",
      label: "沿江联圩",
    },
  ];
  modalTitle: string = ""; //弹窗标题
  loading: boolean = true;
  delLoading: boolean = false;
  btnFlag: string = ""; //区分编辑和新增
  tableData: any[] = [];
  model: boolean = false;
  params: any = {};

  formParams: any = {
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

  PicSuccess(file: any) {
    if (file.result) {
      this.$Message.success("导入成功");
    } else {
      this.$Message.error("导入失败");
    }
  }

  // 导出
  exportExcel() {
    if (this.stationParams.town == undefined || this.stationParams.lwtype == undefined) {
      this.stationParams.town = "";
      this.stationParams.lwtype = "";
    }
    let excelUrl = url + "/api/wjServer/dataCenter/tFcLw/export?town=" + this.stationParams.town + "&lwtype=" + this.stationParams.lwtype + "&lwmc" + this.stationParams.lwmc;
    window.open(excelUrl);
  }

  // 模板下载
  downLoad() {
    window.location.href = "api/wjServer/联圩基本情况汇总表模板.xls";
  }

  //   删
  delmodel: boolean = false;
  delParams: any = {};
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
    let url = "wjServer/dataCenter/tFcLw/delInfo";
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
    let url = "wjServer/dataCenter/tFcLw/addInfo";
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
    let url = "wjServer/dataCenter/tFcLw/editInfo";
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
    this.editInfo(row.id);
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
    this.editInfo(row.id);
  }
  // 详情
  async editInfo(params: any) {
    let url = "wjServer/dataCenter/tFcLw/getInfoById";
    let detailParams = {
      id: params,
    };
    let data = await publicApi.getWithParam(url, detailParams);
    if (data.result) {
      // this.formParams = {
      //   town: data.data.town,
      //   area: data.data.area,
      //   lwmc: data.data.lwmc,
      //   lwtype: data.data.lwtype,
      //   total: data.data.total,
      //   gdxj: data.data.gdxj,
      //   st: data.data.st,
      //   ht: data.data.ht,
      //   sarea: data.data.sarea,
      //   yc: data.data.yc,
      //   gdother: data.data.gdother,
      //   areaxj: data.data.areaxj,
      //   areaa: data.data.areaa,
      //   areab: data.data.areab,
      //   areac: data.data.areac,
      //   aread: data.data.aread,
      //   areae: data.data.areae,
      //   totallen: data.data.totallen,
      //   db: data.data.db,
      //   plnum: data.data.plnum,
      //   pldl: data.data.pldl,
      //   plll: data.data.plll,
      //   wqxj: data.data.wqxj,
      //   tz: data.data.tz,
      //   fhz: data.data.fhz,
      //   zdsw: data.data.zdsw,
      //   yjsw: data.data.yjsw,
      //   txsw: data.data.txsw,
      //   kzsw: data.data.kzsw,
      //   syhl: data.data.syhl,
      //   bz: data.data.bz,
      // };
      this.formParams = data.data;
    } else {
      this.$Message.error("获取数据失败");
    }
  }

  pageParams: any = {
    total: 0,
    current: 1,
    pageSize: 10,
  };
  stationParams: any = {
    pageNumber: "",
    pageSize: "",
    lwtype: "",
    name: "",
    lwmc: "",
  };
  mounted() {
    console.log(url, "6666");
    this.getTownData(); //获取市镇级别
    this.onpage(); //获取页面信息
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
    let url = "wjServer/dataCenter/tFcLw/infoList";
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
    this.stationParams.lwmc = val;
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
}
</style>
