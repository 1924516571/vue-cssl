<template>
  <!-- 圩区 -->
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <div class="top-item-sub">
            <search-component placeholderTxt="圩区名称" @input="onSearch"> </search-component>
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
    <wq-modal :title="modalTitle" :model="model" v-loading="loading" :formParams="formParams" @on-submit="oncreate" @toggle="toggle"></wq-modal>
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
import { DeleteModal, QxdwModal, BzcsModal, WqModal } from "../model";
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
   WqModal
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
    let url = "wjServer/dataCenter/baseinfo/WeiQu/delInfo";
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
    let url = "wjServer/dataCenter/baseinfo/WeiQu/addInfo";
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
    let url = "wjServer/dataCenter/baseinfo/WeiQu/editInfo";
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
    let url = "wjServer/dataCenter/baseinfo/WeiQu/getInfoById";
    let params = {
      id: ckidParams,
    };
    let data = await infoApi.getInfo(params, url);

    if (data.result == true) {
      // let  newArea =  data.data.area
      this.formParams = {
        id: data.data.id,
        wqmc: data.data.wqmc,
        wngdmj: data.data.wngdmj,
        wnsmmj: data.data.wnsmmj,
        wwhd: data.data.wwhd,
        wnhd: data.data.wnhd,
        wqdf: data.data.wqdf,
        dfzcd: data.data.dfzcd,
        hntfhqcd: data.data.hntfhqcd,
        tshhcd: data.data.tshhcd,

        tdcd: data.data.tdcd,
        wnplz: data.data.wnplz,
        plzzs: data.data.plzzs,
        zbzs: data.data.zbzs,
        wnplzdl: data.data.wnplzdl,
        plms: data.data.plms,
        bwfzr: data.data.bwfzr,
        zll: data.data.zll,

        djgl: data.data.djgl,
        lxfs: data.data.lxfs,
        bz: data.data.bz,
        dfqd: data.data.dfqd,
        dfzd: data.data.dfzd,

        dfcd: data.data.dfcd,
        dbwdbcd: data.data.dbwdbcd,
        dbwdbdg: data.data.dbwdbdg,
        dbwdbdk: data.data.dbwdbdk,
        wdbcd: data.data.wdbcd,
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
      title: "圩区名称",
      key: "wqmc",
    },
    {
      title: "圩内耕地面积（亩）",
      key: "wngdmj",
    },
    {
      title: "圩内水面面积（亩）",
      key: "wnsmmj",
    },

    {
      title: "圩外河道",
      key: "wwhd",
    },
    {
      title: "圩内河道",
      key: "wnhd",
    },
    {
      title: "圩区堤防",
      key: "wqdf",
    },
    {
      title: "堤防总长度",
      key: "dfzcd",
    },
    {
      title: "混凝土防洪墙长度",
      key: "hntfhqcd",
    },

    {
      title: "土石混合堤长度",
      key: "tshhcd",
    },
    {
      title: "土堤长度",
      key: "tdcd",
    },
    {
      title: "圩内排涝站",
      key: "wnplz",
    },

    {
      title: "排涝站总数",
      key: "plzzs",
    },
    {
      title: "机泵总数",
      key: "zbzs",
    },
    {
      title: "圩内排涝总动力（m3/s）",
      key: "wnplzdl",
    },
    {
      title: "排涝模数（m3/s·km2）",
      key: "plms",
    },
    {
      title: "包圩负责人",
      key: "bwfzr",
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
      title: "联系方式",
      key: "lxfs",
    },
    {
      title: "备注",
      key: "bz",
    },
    {
      title: "堤防起点",
      key: "dfqd",
    },
    {
      title: "堤防讫点",
      key: "dfzd",
    },
    {
      title: "堤防长度（公里）",
      key: "dfcd",
    },
    {
      title: "达标/未达标长度（公里）",
      key: "dbwdbcd",
    },
    {
      title: "达标/未达标顶高（米）",
      key: "dbwdbdg",
    },
    {
      title: "达标/未达标顶宽（米）",
      key: "dbwdbdk",
    },
    {
      title: "未达标长度（公里）",
      key: "wdbcd",
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
    wqmc: "", //灌区名称
  };

  mounted() {
    this.onpage(); //获取页面信息
  }

  // 列表
  async onpage() {
    this.stationParams.pageNumber = this.pageParams.current; //当前页码
    this.stationParams.pageSize = this.pageParams.pageSize; //一页多少条
    let url = "wjServer/dataCenter/baseinfo/WeiQu/infoList";
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
    this.stationParams.wqmc = val;
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
