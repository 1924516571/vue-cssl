<template>
  <!-- 避灾场所 -->
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <div class="top-item-sub">
            <search-component placeholderTxt="堤防名称" @input="onSearch"> </search-component>
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
    <df-modal :title="modalTitle" :model="model" v-loading="loading" :formParams="formParams" @on-submit="oncreate" @toggle="toggle"></df-modal>
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
import { DeleteModal, QxdwModal, BzcsModal } from "../model";
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
    let url = "wjServer/dataCenter/baseinfo/difang/delInfo";
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
    let url = "wjServer/dataCenter/baseinfo/difang/addInfo";
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
    let url = "wjServer/dataCenter/baseinfo/difang/editInfo";
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
    let url = "wjServer/dataCenter/baseinfo/difang/getInfoById";
    let params = {
      id: ckidParams,
    };
    let data = await infoApi.getInfo(params, url);

    if (data.result == true) {
      // let  newArea =  data.data.area
      this.formParams = {
        dfmc: data.data.dfmc,
        cqgs: data.data.cqgs,
        gcglzt: data.data.gcglzt,
        sdglzt: data.data.sdglzt,
        hyzgbm: data.data.hyzgbm,
        ghzt: data.data.ghzt,
        szxzc: data.data.szxzc,
        wq: data.data.wq,
        id: data.data.id,

        dfjb: data.data.dfjb,
        spjb: data.data.spjb,
        dwhd: data.data.dwhd,
        dflx: data.data.dflx,
        dfqd: data.data.dfqd,
        dfzd: data.data.dfzd,
        dfcd: data.data.dfcd,
        pjdg: data.data.pjdg,

        pjdk: data.data.pjdk,
        hplx: data.data.hplx,
        jssj: data.data.jssj,
        sfhj: data.data.sfhj,
        bz: data.data.bz,
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
      title: "堤防名称",
      key: "dfmc",
    },
    {
      title: "产权归属",
      key: "cqgs",
    },
    {
      title: "工程管理主体",
      key: "gcglzt",
    },

    {
      title: "属地管理主体",
      key: "sdglzt",
    },
    {
      title: "行业主管部门",
      key: "hyzgbm",
    },
    {
      title: "管护主体",
      key: "ghzt",
    },
    {
      title: "所在行政村",
      key: "szxzc",
    },
    {
      title: "圩区",
      key: "wq",
    },

    {
      title: "堤防级别",
      key: "dfjb",
    },
    {
      title: "水普级别",
      key: "spjb",
    },
    {
      title: "堤外河道",
      key: "dwhd",
    },

    {
      title: "堤防类型",
      key: "dflx",
    },
    {
      title: "堤防起点",
      key: "dfqd",
    },
    {
      title: "堤防终点",
      key: "dfzd",
    },
    {
      title: "堤防长度(公里)",
      key: "dfcd",
    },
    {
      title: "平均顶高(米)",
      key: "pjdg",
    },

    {
      title: "平均顶宽(米)",
      key: "pjdk",
    },
    {
      title: "护坡类型",
      key: "hplx",
    },
    {
      title: "建设时间",
      key: "jssj",
    },
    {
      title: "是否划界",
      key: "sfhj",
    },
    {
      title: "备注",
      key: "bz",
    },
    {
      title: "操作",
      slot: "operation",
      width: 90,
      fixed: "right",
    },
  ];

  // 从新定一个变量
  newColumns = [
    {
      type: "index",
      title: "序号",
      width: 150,
    },
    {
      title: "堤防名称",
      key: "dfmc",
    },
    {
      title: "产权归属",
      key: "cqgs",
    },
    {
      title: "工程管理主体",
      key: "gcglzt",
    },

    {
      title: "属地管理主体",
      key: "sdglzt",
    },
    {
      title: "行业主管部门",
      key: "hyzgbm",
    },
    {
      title: "管护主体",
      key: "ghzt",
    },
    {
      title: "所在行政村",
      key: "szxzc",
    },
    {
      title: "圩区",
      key: "wq",
    },

    {
      title: "堤防级别",
      key: "dfjb",
    },
    {
      title: "水普级别",
      key: "spjb",
    },
    {
      title: "堤外河道",
      key: "dwhd",
    },

    {
      title: "堤防类型",
      key: "dflx",
    },
    {
      title: "堤防起点",
      key: "dfqd",
    },
    {
      title: "堤防终点",
      key: "dfzd",
    },
    {
      title: "堤防长度(公里)",
      key: "dfcd",
    },
    {
      title: "平均顶高(米)",
      key: "pjdg",
    },

    {
      title: "平均顶宽(米)",
      key: "pjdk",
    },
    {
      title: "护坡类型",
      key: "hplx",
    },
    {
      title: "建设时间",
      key: "jssj",
    },
    {
      title: "是否划界",
      key: "sfhj",
    },
    {
      title: "备注",
      key: "bz",
    },
    {
      title: "操作",
      slot: "operation",
      width: 90,
      fixed: "right",
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
    dfmc: "", //场所名称
  };

  mounted() {
    this.onpage(); //获取页面信息
  }

  // 列表
  async onpage() {
    this.stationParams.pageNumber = this.pageParams.current; //当前页码
    this.stationParams.pageSize = this.pageParams.pageSize; //一页多少条
    let url = "wjServer/dataCenter/baseinfo/difang/infoList";
    let data = await publicApi.getWithParam(url, this.stationParams);
    if (data.result == true) {
      this.tableData = data.data.rows;
      if (this.tableData.length == 0) {
        this.columns.pop();
      } else {
        this.columns = this.newColumns;
      }
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
    this.stationParams.dfmc = val;
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
