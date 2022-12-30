<template>
  <!--视频设备 -->
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <!-- <div class="top-item-sub">
            <suc-input placeholder="请输入视频点名称" v-model="stationParams.spdmc" :config="{ clearable: true, search: true }"></suc-input>
          </div> -->
          <div class="top-item-sub">
            <search-component placeholderTxt="请输入视频点名称" @input="onSearch"> </search-component>
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
    <video-modal :title="modalTitle" :model="model" :loading="loading" :formParams="formParams" @on-submit="oncreate" @toggle="toggle" :areaOptions="areaOptions" :chuan="chuan"></video-modal>
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
import { DeleteModal, VideoModal } from "../model";
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
    VideoModal,
  },
})
export default class Enterprise extends Vue {
  olMap = this.$getMapConfig();
  areaOptions: any = [];
  url: string = "wjServer/dataCenter/baseinfo/getStationType";
  addvcd: any = "";
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
      zdbh: row.zdbh,
    };
  }
  cancel(val: any) {
    this.delmodel = val;
  }
  async save() {
    this.delLoading = true;
    let url = "wjServer/dataCenter/device/image/delInfo";
    infoApi.ondeleteWithParams(this.delParams, url).then((data: any) => {
      if (data.result == true) {
        this.delmodel = false;
        this.$SucMessage.info("删除成功");
        this.onpage();
        this.delLoading = false;
      } else {
        this.delLoading = false;
        this.$SucMessage.error("删除失败");
        this.delLoading = false;
        this.onpage();
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
    // let checkUrl = "wjServer/dataCenter/device/image/cdIsExistedWhereAdd";
    // let a = {
    //   zdbh: this.formParams.zdbh,
    // };
    // let checkData = await infoApi.onpage(a, checkUrl);
    // if (checkData.data == 0) {
    //   let url = "wjServer/dataCenter/device/image/addInfo";
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
    //   this.$SucMessage.error("新增失败,设备编码已经存在,重新输入");
    // }
    let url = "wjServer/dataCenter/device/image/addInfo";
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
    let url = "wjServer/dataCenter/device/image/editInfo";
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
        this.onpage();
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
    let zdbh = row.zdbh;
    this.editInfo(zdbh);
  }
  // 详情
  async editInfo(zdbh: any) {
    let url = "wjServer/dataCenter/device/image/getInfoByCd";
    let params = {
      zdbh: zdbh,
    };
    let data = await infoApi.getInfo(params, url);
    // this.formParams = {
    //   spdmc: data.data.spdmc,
    //   splb: data.data.splb,
    //   spdwz: data.data.spdwz,
    //   sply: data.data.sply,
    //   tdh: data.data.tdh,
    //   ml: data.data.ml,
    //   ip: data.data.ip,
    //   nt: data.data.nt,
    //   zdbh: data.data.zdbh,
    // };
    this.formParams = data.data
  }

  //   查
  columns: any[] = [
    {
      type: "index",
      title: "序号",
      width: 60,
    },
    // {
    //   title: "站点编号",
    //   key: "zdbh",
    //   width: 100,
    // },
    {
      title: "视频点名称",
      key: "spdmc",
      width: 200,
    },
    {
      title: "一级目录",
      key: "splb",
    },
    {
      title: "二级目录",
      key: "spdwz",
    },
    {
      title: "IP地址（带端口号）",
      key: "ip",
    },
    {
      title: "设备编号",
      key: "sply",
    },
    {
      title: "通道ID",
      key: "sjid",
    },
    {
      title: "通道号",
      key: "tdh",
    },
    {
      title: "视频地址",
      key: "token",
    },

    // {
    //   title: "所属泵站",
    //   key: "bzmc",
    //   width: 200,
    // },
    // {
    //   title: "视频来源",
    //   key: "sply",
    //   width: 300,
    // },
    // {
    //   title: "视频点位置",
    //   key: "spdwz",
    //   //    width: 100,
    // },
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
  stationParams: any = {
    pageNumber: "",
    pageSize: "",
  };
  mounted() {
    this.getUserBz(); //获取用户对应的泵站
    this.onpage(); //获取页面信息
  }

  chuan: any = ""; //传给弹框组件的值

  //  获取用户对应的泵站类别
  async getUserBz() {
    const url = "wjServer/task/field/getEngListByAreaCode";
    let areaCode = {
      areaCode: localStorage.getItem("areaCode"),
    };

    let data = await infoApi.onpage(areaCode, url);
    if (data.result == true) {
      this.chuan = data.data.map((item: any) => {
        return {
          value: item.engCded,
          label: item.engNameed,
        };
      });
    } else {
      return;
    }
  }

  // 列表
  async onpage() {
    this.stationParams.pageNumber = this.pageParams.current; //当前页码
    this.stationParams.pageSize = this.pageParams.pageSize; //一页多少条
    let url = "wjServer/dataCenter/device/image/infoList";
    let data = await infoApi.onpage(this.stationParams, url);
    if (data.result == true) {
      this.loading = false;
      this.pageParams.total = parseInt(data.data.total);
      this.tableData = data.data.rows;
    } else {
      this.loading = false;
    }
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
    this.stationParams.spdmc = val;
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
