<template>
  <!-- 灌区 -->
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <div class="top-item-sub">
            <search-component placeholderTxt="灌区名称" @input="onSearch"> </search-component>
          </div>
        </div>
        <div class="top-item">
          <suc-button type="primary" :debounce="800" @on-click="onadd">新增</suc-button>
        </div>
      </div>
      <div class="content">
        <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams" v-loading="loading" @get-page="getPage" @get-size="getSize">
          <template v-slot:operation="{ row }">
            <div class="btn">
              <span @click="onedit(row)">编辑</span>
              <span @click="ondelete(row)">删除</span>
            </div>
          </template>
        </table-page>
      </div>
    </div>

    <!-- 新增数据弹框 -->
    <gq-modal :title="modalTitle" :model="model" v-loading="loading" :formParams="formParams" @on-submit="oncreate" @toggle="toggle"></gq-modal>
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
import { DeleteModal, QxdwModal, BzcsModal, GqModal } from "../model";
import DfModal from "../model/DfModal.vue";
import { infoApi, publicApi } from "@/api";
import dayjs from "dayjs";
@Component({
  components: {
    SucSelect,
    SucButton,
    SucInput,
    SucFormItem,
    SearchComponent,
    TablePage,
    DeleteModal,
    QxdwModal,
    BzcsModal,
    DfModal,
    GqModal,
  },
})
export default class Enterprise extends Vue {
  olMap = this.$getMapConfig();
  areaOptions: any = [];
  modalTitle: string = ""; //弹窗标题
  loading: boolean = true;
  delLoading: boolean = false;
  btnFlag: string = ""; //区分编辑和新增
  tableData: any[] = [];

  formParams: any = {};
  //   删
  delmodel: boolean = false;
  delParams: any = {}; //删除的参数
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
    let url = "wjServer/dataCenter/baseinfo/GuanQu/delInfo";
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
    this.loading = true;
    let url = "wjServer/dataCenter/baseinfo/GuanQu/addInfo";
    infoApi.oncreate(this.formParams, url).then((data: any) => {
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
    let url = "wjServer/dataCenter/baseinfo/GuanQu/editInfo";
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
  toggle(val: boolean) {
    this.model = val;
  }
  // 编辑
  onedit(row: any) {
    this.model = true;
    this.formParams = {};
    this.btnFlag = "edit";
    this.modalTitle = "编辑";
    let id = row.id;
    this.editInfo(id);
  }

  // 详情
  async editInfo(ckidParams: any) {
    let url = "wjServer/dataCenter/baseinfo/GuanQu/getInfoById";
    let params = {
      id: ckidParams,
    };
    let data = await infoApi.getInfo(params, url);

    if (data.result == true) {
      // let  newArea =  data.data.area
      this.formParams = {
        id: data.data.id,
        gqmc: data.data.gqmc,
        gqglzt: data.data.gqglzt,
        gqyhzt: data.data.gqyhzt,
        djgl: data.data.djgl,
        ggzmc: data.data.ggzmc,
        ggzcqgs: data.data.ggzcqgs,
        ggzglzt: data.data.ggzglzt,
        ggzyhzt: data.data.ggzyhzt,
        sdglzt: data.data.sdglzt,

        hyglzt: data.data.hyglzt,
        ggzgldj: data.data.ggzgldj,
        szxzc: data.data.szxzc,
        qshd: data.data.qshd,
        jbzs: data.data.jbzs,
        jlss: data.data.jlss,
        sbxh: data.data.sbxh,
        djll: data.data.djll,

        zll: data.data.zll,
        zgl: data.data.zgl,
        qdcd: data.data.qdcd,
        fsqdcd: data.data.fsqdcd,
        zzjg: data.data.zzjg,

        ggmj: data.data.ggmj,
        lszw: data.data.lszw,
        jjzw: data.data.jjzw,
        jsnf: data.data.jsnf,
        zjgznf: data.data.zjgznf,
        area: data.data.area ? data.data.area.split(",") : [],
      };
    } else {
      this.$SucMessage.error("获取失败");
    }
  }
  //   查
  columns: any[] = [
    {
      type: "index",
      title: "序号",
      // width: 150,
    },
    {
      title: "灌区名称",
      key: "gqmc",
    },
    {
      title: "灌区管理主体",
      key: "gqglzt",
    },
    {
      title: "灌区管护主体",
      key: "gqyhzt",
    },

    {
      title: "灌溉站名称",
      key: "ggzmc",
    },
    {
      title: "灌溉站产权归属",
      key: "ggzcqgs",
    },
    {
      title: "灌溉站管理主体",
      key: "ggzglzt",
    },
    {
      title: "灌溉站管护主体",
      key: "ggzyhzt",
    },
    {
      title: "属地管理主体",
      key: "sdglzt",
    },

    {
      title: "行业管理主体",
      key: "hyglzt",
    },
    {
      title: "灌溉站管理等级",
      key: "ggzgldj",
    },
    {
      title: "所在行政村",
      key: "szxzc",
    },

    {
      title: "取水河道",
      key: "qshd",
    },
    {
      title: "机泵总数（台）",
      key: "jbzs",
    },
    {
      title: "计量设施",
      key: "jlss",
    },
    {
      title: "水泵型号",
      key: "sbxh",
    },
    {
      title: "单机流量（m3/s)",
      key: "djll",
    },

    {
      title: "总流量（m3/s)",
      key: "zll",
    },
    {
      title: "单机功率（kw）",
      key: "djgl",
    },
    {
      title: "总功率（kw）",
      key: "zgl",
    },
    {
      title: "渠道长度（米）",
      key: "qdcd",
    },
    {
      title: "防渗渠道长度（米）",
      key: "fsqdcd",
    },
    {
      title: "种植结构",
      key: "zzjg",
    },
    {
      title: "灌溉面积（亩）",
      key: "ggmj",
    },
    {
      title: "粮食作物（亩）",
      key: "lszw",
    },
    {
      title: "经济作物（亩）",
      key: "jjzw",
    },
    {
      title: "建设年份",
      key: "jsnf",
    },
    {
      title: "最近改造年份",
      key: "zjgznf",
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

  stationParams: any = {
    pageNumber: "",
    pageSize: "",
    gqmc: "", //灌区名称
  };

  mounted() {
    this.onpage(); //获取页面信息
  }

  // 列表
  async onpage() {
    this.stationParams.pageNumber = this.pageParams.current; //当前页码
    this.stationParams.pageSize = this.pageParams.pageSize; //一页多少条
    let url = "wjServer/dataCenter/baseinfo/GuanQu/infoList";
    let data = await publicApi.getWithParam(url, this.stationParams);
    if (data.result == true) {
      this.tableData = data.data.rows;
      this.pageParams.total = parseInt(data.data.total);
    } else {
      this.tableData = [];
    }

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
  //  点击查询拿到的值
  onSearch(val: string) {
    this.loading = true;
    this.pageParams.current = 1;
    this.stationParams.gqmc = val;
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
