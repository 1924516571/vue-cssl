<template>
  <!--水质测站 -->
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <div class="top-item-sub">
            <search-component placeholderTxt="测站名称" @input="onSearch"> </search-component>
          </div>
        </div>
        <div class="top-item">
          <suc-button type="primary" :debounce="800" @on-click="onadd">新增</suc-button>
          <!-- <suc-button type="primary" v-show="btnShow" class="top-item-btn" :debounce="800" @on-click="exportModal">批量导出</suc-button> -->
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
    <water-qulity-modal
      :title="modalTitle"
      :model="model"
      :loading="loading"
      :formParams="formParams"
      @on-submit="oncreate"
      @toggle="toggle"
      :areaOptions="areaOptions"
      :centerOption="centerOption"
    ></water-qulity-modal>
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
import { DeleteModal, WaterQulityModal } from "../model";
import { infoApi, publicApi } from "@/api";
@Component({
  components: {
    SucSelect,
    SucButton,
    SucInput,
    SucFormItem,
    SearchComponent,
    TablePage,
    DeleteModal,
    WaterQulityModal,
  },
})
export default class Enterprise extends Vue {
  olMap = this.$getMapConfig();
  areaOptions: any = [];
  centerOption: any = [120.75225, 31.65374];
  url: string = "wjServer/dataCenter/baseinfo/getStationType";
  addvcd: any = "";
  modalTitle: string = ""; //弹窗标题
  loading: boolean = true;
  delLoading: boolean = false;
  btnFlag: string = ""; //区分编辑和新增
  tableData: any[] = [];
  btnShow: boolean = false;

  formParams: any = {
    stcd: "",
    stnm: "",
    bsnm: "",
    hnnm: "",
    rvnm: "",
    addvcd: "",
    esstym: "",
    lgtd: "", //经度
    lttd: "", //纬度
    location: "",
    wdstym: "",
    stlc: "",
  };
  //   删
  delmodel: boolean = false;
  delParams: any = {}; //删除的参数
  ondelete(row: any) {
    this.delmodel = true;
    this.delParams = {
      stcd: row.stcd,
    };
  }
  cancel(val: any) {
    this.delmodel = val;
  }
  async save() {
    this.delLoading = true;
    let url = "wjServer/dataCenter/stbprpb";
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

  async handleChange(value: any) {
    this.stationParams.addvcd = value.toString();
  }

  // 新增弹框
  onadd() {
    this.model = true;
    this.btnFlag = "add";
    this.modalTitle = "新增";
    this.formParams = {
      //   minIoFileList: [],
    };
    // this.markers = [];
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
    // this.loading = true;
    // let checkUrl = "wjServer/dataCenter/wq/station/check";
    // let a = {
    //   stnm: this.formParams.stnm,
    // };
    // let checkData = await infoApi.onpage(a, checkUrl);
    // if (!checkData.data) {
    //   let url = "wjServer/dataCenter/wq/station";
    //   infoApi.oncreate(this.formParams, url).then((data: any) => {
    //     if (data.result == true) {
    //       this.$SucMessage.info("新增成功");
    //       this.model = false;
    //       this.onpage();
    //       this.loading = false;
    //     } else {
    //       this.$SucMessage.error("新增失败");
    //       this.model = false;
    //       this.loading = false;
    //     }
    //   });
    // } else {
    //   this.model = false;
    //   this.$SucMessage.error("新增失败,测站名称已经存在,重新输入");
    // }
    this.loading = true;
    let url = "wjServer/dataCenter/stbprpb";
    infoApi.oncreate(this.formParams, url).then((data: any) => {
      if (data.result) {
        this.$SucMessage.info("新增成功");
        this.model = false;
        this.onpage();
        this.loading = false
      } else {
        this.$SucMessage.error("新增失败");
        this.model = false;
        this.onpage();
        this.loading =false
      }
    });
  }
  // 更新
  async setEdit() {
    this.loading = true;
    let url = "wjServer/dataCenter/stbprpb";
    // this.formParams.addvcd = this.formParams.addvcd.toString();
    infoApi.jsonUpdate(this.formParams, url).then((data: any) => {
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
    let stcd = row.stcd;
    this.editInfo(stcd);
  }
  newString: any = ""; //新的字符串
  // 详情
  async editInfo(stcd: any) {
    let url = "wjServer/dataCenter/stbprpb";
    let params = {
      stcd: stcd,
    };
    let data = await infoApi.getInfo(params, url);
    this.newString = data.data.lgtd + "," + data.data.lttd;
    this.formParams = {
      stcd: data.data.stcd,
      stnm: data.data.stnm,
      sttp: data.data.sttp,
      xoffset: data.data.xoffset,
      yoffset: data.data.yoffset,
      tmdzdbh:data.data.tmdzdbh, //测站编号
      jjsw:data.data.jjsw,
      lgtd: data.data.lgtd,
      lttd: data.data.lttd,
      location: this.newString,
    };
  }

//   getLocalTime(nS: any) {
//     return new Date(parseInt(nS))
//       .toLocaleString()
//       .replace(/年|月/g, "-")
//       .replace(/日/g, " ");
//   }

  //   查
  columns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "测站编码",
      key: "stcd",
    },
    {
      title: "测站名称",
      key: "stnm",
    },
    {
      title: "测站类型",
      key: "sttp",
    },
    {
      title: "经度",
      key: "lgtd",
    },
    {
      title: "纬度",
      key: "lttd",
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
    areaCode: "",
    stnm: "",
  };
  mounted() {
    this.onpage(); //获取页面信息
  }

  // 列表
  async onpage() {
    this.stationParams.pageNumber = this.pageParams.current;
    this.stationParams.pageSize = this.pageParams.pageSize;
    let url = "wjServer/dataCenter/stbprpb/page";
    let data = await infoApi.onpage(this.stationParams, url);
    this.pageParams.total = parseInt(data.data.total);
    this.tableData = data.data.list;
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
    this.stationParams.stnm = val;
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
