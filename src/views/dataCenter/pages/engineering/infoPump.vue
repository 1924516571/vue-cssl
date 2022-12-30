<template>
  <!--泵机信息 -->
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <!-- 泵机名称 -->
          <div class="top-item-sub">
            <search-component placeholderTxt="泵机名称" @input="onSearch"> </search-component>
          </div>
        </div>
        <div class="top-item">
          <suc-button type="primary" :debounce="800" @on-click="onadd">新增</suc-button>
        </div>
      </div>
      <div class="content">
        <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams" v-loading="loading" element-loading-text="拼命加载中" @get-page="getPage" @get-size="getSize">
          <template v-slot:bz="{ row }">
            <div class="link-text" @click="getLink(row, 'bz')">
              <span>关联</span>
            </div>
          </template>
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
    <pump-modal :title="modalTitle" :model="model" :loading="loading" :formParams="formParams" @on-submit="oncreate" @toggle="toggle" :chuan="chuan"></pump-modal>
    <!-- 删除弹框 -->
    <div class="delete-view" v-show="delmodel">
      <delete-modal @getignore="cancel" @getsave="save" v-loading="delLoading"></delete-modal>
    </div>
    <!-- 关联弹框默认的 -->
    <link-default
      :title="linkTitle"
      :placeholder="placeholder"
      :model="linkshow1"
      :columns="linkCol"
      :loading="linkLoading"
      :tableData="linkData"
      :pageParams="pagedfParams"
      :bjParams="bjParams"
      @toggle="linkupdate1"
      @on-search="onLinkSearch"
      @on-check="onLinkCheck"
      @on-page="onLinkPage"
      @on-size="onLinkSize"
    >
    </link-default>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { SucSelect, SucButton, SucInput, SucFormItem } from "@suc/ui";
// import { SelectConfig, SelectOptions } from "@suc/ui/interfaces";
import { SearchComponent, TablePage } from "@/components";
import { DeleteModal, PumpModal, LinkDefault } from "../model";
// import PumpModal from "../model/PumpModal.vue"
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
    PumpModal,
    LinkDefault,
  },
})
export default class Enterprise extends Vue {
  // dialogVisible:boolean = false;
  // 初始化数据 data可以声明成类属性形式
  // chuan:String="父传子的值"
  chuan: any = [];
  olMap = this.$getMapConfig();
  url: string = "wjServer/dataCenter/baseinfo/getStationType";
  areaCode: any = [];
  modalTitle: string = ""; //弹窗标题
  loading: boolean = true;
  delLoading: boolean = false;
  btnFlag: string = ""; //区分编辑和新增
  tableData: any[] = [];

  formParams: any = {};
  //   删
  delmodel: boolean = false;
  delParams: any = {};
  linkType: string = ""; //判断点击哪种关联表
  linkTitle: string = ""; //关联弹窗标题
  placeholder: string = ""; //关联弹窗placeholder
  linkshow1: boolean = false; //不带modal关联弹框显隐
  linkCol: object[] = []; //关联列
  linkLoading: boolean = false;
  linkData: object[] = []; //关联表单的数据
  bjParams: any = {}; //泵站关联表单参数
  bzLinkParams: any = {};
  params: any = {};
  pagedfParams: any = {
    total: 0,
    current: 1,
    pageSize: 10,
  };
  linkupdate1(val: boolean) {
    this.linkshow1 = val;
  }

  // 搜索
  onLinkSearch(val: any) {
    this.bjParams.stationName = val;
    this.getInfo(this.linkType);
  }
  getLink(row: any, flag: any) {
    this.linkType = flag; //选择的设备类型
    if (flag == "bz") {
      this.linkTitle = "泵站关联";
      this.placeholder = "泵站名称";
      this.bjParams = {
        areaCode: "",
        stationName: "",
        pumpId: row.bjbm,
        pageNumber: this.pagedfParams.current,
        pageSize: this.pagedfParams.pageSize,
      };
      this.bzLinkParams.pumpId = row.bjbm;
      this.linkCol = [
        {
          title: "",
          slot: "selection",
          width: 55,
        },
        {
          title: "泵站名称",
          key: "bzmc",
        },
        {
          title: "泵站编码",
          key: "bzbm",
        },
      ];

      this.getInfo(flag);
      this.linkshow1 = true;
    }
  }

  // 获取列表数据方法
  async getInfo(flag?: any) {
    if (flag == "bz") {
      let url = "wjServer/dataCenter/baseinfo/bengji/getStationList";
      let data = await publicApi.getWithParam(url, this.bjParams);
      if (data.result == true) {
        this.pagedfParams.total = parseInt(data.data.total);
        this.linkData = data.data.list.map((item: any) => {
          return {
            bzbm: item.bzbm,
            bzmc: item.bzmc,
            checked: item.bind,
          };
        });
      } else {
        this.$Message.error("获取失败");
      }
    }
  }
  async onLinkCheck(row: any) {
    if (this.linkType == "bz") {
      this.bzLinkParams.stationId = row.bzbm;
      let url = "wjServer/dataCenter/baseinfo/bindPump"; //绑定测站
      let url1 = "wjServer/dataCenter/baseinfo/unboundPump"; //解绑测站
      let res = row.checked ? await infoApi.onlink(this.bzLinkParams, url) : await infoApi.ondeleteWithParams(this.bzLinkParams, url1);
      let txt = row.checked ? "关联" : "取消关联";
      let info = res.result ? "成功" : "失败";
      this.$SucMessage.info(txt + info);
    }
  }
  // 分页
  onLinkPage(pageNum: number) {
    this.bjParams.pageNumber = pageNum;
    this.getInfo(this.linkType);
  }
  // 每页多少条
  onLinkSize(pageSize: number) {
    this.bjParams.pageSize = pageSize;
    this.bjParams.pageNumber = this.pagedfParams.current;
    this.getInfo(this.linkType);
  }
  ondelete(row: any) {
    this.delmodel = true;
    this.delParams = {
      bjbm: row.bjbm,
    };
  }
  cancel(val: any) {
    this.delmodel = val;
  }
  async save() {
    this.delLoading = true;
    let url = "wjServer/dataCenter/baseinfo/bengji/delInfo";
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
    let checkUrl = "wjServer/dataCenter/baseinfo/bengji/ifExist";
    let a = {
      bjbm: this.formParams.bjbm,
    };
    let checkData = await publicApi.getWithParam(checkUrl, a);
    if (checkData.data) {
      let url = "wjServer/dataCenter/baseinfo/bengji/addInfo";
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
      this.$SucMessage.error("新增失败,泵机编码已存在,重新输入");
    }
    this.onpage();
  }
  // 更新
  async setEdit() {
    this.loading = true;
    let url = "wjServer/dataCenter/baseinfo/bengji/editInfo";
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
    let bjbm = row.bjbm;
    this.editInfo(bjbm);
  }
  // 详情
  async editInfo(aa: any) {
    let url = "wjServer/dataCenter/baseinfo/bengji/getInfoByBjcd";
    let a = {
      bjbm: aa,
    };
    let data = await infoApi.getInfo(a, url);
    // 区域
    this.formParams = {
      bjbm: data.data.bjbm,
      bjmc: data.data.bjmc,
      sbxh: data.data.sbxh,
      sbcc: data.data.sbcc,
      djxh: data.data.djxh,
      dmgl: data.data.dmgl,
      djll: data.data.djll,
    };
  }

  //   查
  columns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "泵机名称",
      key: "bjmc",
    },
    {
      title: "泵机编码",
      key: "bjbm",
    },
    {
      title: "水泵型号",
      key: "sbxh",
    },
    {
      title: "水泵尺寸",
      key: "sbcc",
    },
    {
      title: "电机型号",
      key: "djxh",
    },
    {
      title: "电机功率(kw)",
      key: "dmgl",
    },
    {
      title: "单机流量(m^3/h)",
      key: "djll",
    },
    {
      title: "泵站",
      slot: "bz",
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
    bjmc: "", //泵机编号
  };
  mounted() {
    this.onpage(); //获取页面信息
  }

  // 列表
  async onpage() {
    this.stationParams.pageNumber = this.pageParams.current;
    this.stationParams.pageSize = this.pageParams.pageSize;
    let url = "wjServer/dataCenter/baseinfo/bengji/infoList";
    let data = await publicApi.getWithParam(url, this.stationParams);
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
    this.stationParams.bjmc = val;
    this.onpage();
  }

  // 关联负责人
  fzrshow: boolean = false;
  fzrRow: any = {};
  fzrupdate(val: boolean) {
    this.fzrshow = val;
  }
  getFzr(row: any) {
    this.fzrRow = row;
    this.fzrshow = true;
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
        .search-view {
          // width: 100%;
          display: flex;
          flex-grow: 2;
          align-items: center;
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
