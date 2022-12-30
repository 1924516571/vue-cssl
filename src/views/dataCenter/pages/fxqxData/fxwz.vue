<template>
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <div class="top-item-sub">
            <suc-select v-model="stationParams.ckid" :options="szckData" :config="{ placeholder: '所在仓库', clearable: true }" style="width:160px"></suc-select>
          </div>
          <div class="top-item-sub">
            <search-component placeholderTxt="物资名称" @input="onSearch"> </search-component>
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
    <fxwz-modal :title="modalTitle" :model="model" :loading="loading" :formParams="formParams" @on-submit="oncreate" @toggle="toggle"></fxwz-modal>
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
import { DeleteModal, FxwzModal } from "../model";
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
    FxwzModal,
  },
})
export default class Enterprise extends Vue {
  olMap = this.$getMapConfig();
  url: string = "wjServer/dataCenter/baseinfo/getStationType";
  addvcd: any = "";
  modalTitle: string = ""; //弹窗标题
  loading: boolean = true;
  delLoading: boolean = false;
  btnFlag: string = ""; //区分编辑和新增
  tableData: any[] = [];

  szckData: Array<any> = []; //所在仓库

  formParams: any = {};
  //   删
  delmodel: boolean = false;
  delParams: any = {}; //删除的参数
  ondelete(row: any) {
    this.delmodel = true;
    this.delParams = {
      uuid: row.uuid,
    };
  }
  cancel(val: any) {
    this.delmodel = val;
  }
  async save() {
    this.delLoading = true;
    let url = "wjServer/dataCenter/wuzi";
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
    let url = "wjServer/dataCenter/wuzi";
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
    let url = "wjServer/dataCenter/wuzi";
    infoApi.jsonUpdate(this.formParams, url).then((data: any) => {
      if (data.result == true) {
        this.$SucMessage.info(data.desc);
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
    let uuid = row.uuid;
    this.editInfo(uuid);
  }
  newString: any = ""; //新的字符串
  oldName: any = "";
  // 详情
  async editInfo(uuidParams: any) {
    let url = "wjServer/dataCenter/wuzi";
    let params = {
      uuid: uuidParams,
    };
    let data = await infoApi.getInfo(params, url);
    if (data.result == true) {
      //   this.formParams.rkdate = dayjs(Number(data.data.rkdate)).format("YYYY-MM-DD");
      this.formParams = {
        name: data.data.name,
        num: data.data.num,
        dw: data.data.dw,
        ckid: data.data.ckid,
        price: data.data.price,
        totalprice: data.data.totalprice,
        xh: data.data.xh,
        company: data.data.company,
        nt: data.data.nt,
        rkdate: dayjs(Number(data.data.rkdate)).format("YYYY-MM-DD"),
        uuid:data.data.uuid
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
      width: 150,
    },
    {
      title: "物资名称",
      key: "name",
    },
    {
      title: "数量",
      key: "num",
    },
    {
      title: "单位",
      key: "dw",
    },
    {
      title: "单价",
      key: "price",
    },
    {
      title: "物资单价(总价)",
      key: "totalprice",
    },
    {
      title: "所在仓库",
      key: "cknm",
    },
    {
      title: "入库时间",
      key: "rkdate",
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
  pageYjParams: any = {
    total: 0,
    current: 1,
    pageSize: 10,
  };
  stationParams: any = {
    pageNumber: "",
    pageSize: "",
    name: "",
    ckid: "",
  };
  mounted() {
    this.getSzckData(); //所在仓库数据
    this.onpage(); //获取页面信息
  }

  //   所在仓库参数

  szckParams = {
    ckmc: "",
    areaCode: "",
  };
  async getSzckData() {
    const url = "wjServer/dataCeter/wareHouse/getCKList";
    const data = await publicApi.getWithParam(url, this.szckParams);
    if (data.result) {
      this.szckData = data.data.map((item: any) => {
        return {
          value: item.ckid,
          label: item.ckmc,
        };
      });
    } else {
      this.$SucMessage.info(data.desc);
      this.szckData = [];
    }
  }

  // 列表
  async onpage() {
    this.stationParams.pageNumber = this.pageParams.current; //当前页码
    this.stationParams.pageSize = this.pageParams.pageSize; //一页多少条
    let url = "wjServer/dataCenter/wuzi/page";
    let data = await publicApi.getWithParam(url, this.stationParams);
    if (data.result == true) {
      if (data.data.rows.length > 0) {
        data.data.rows.forEach((e: any) => {
          e.rkdate = dayjs(Number(e.rkdate)).format("YYYY-MM-DD-HH");
        });
      }
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
  onSearch(val: string) {
    this.loading = true;
    this.pageParams.current = 1;
    this.stationParams.name = val;
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
