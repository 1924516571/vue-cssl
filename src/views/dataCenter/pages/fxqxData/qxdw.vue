<template>
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <div class="top-item-sub">
            <!-- 行政区域 -->
            <el-cascader
              v-model="stationParams.areaCode"
              :options="areaOptions"
              :props="{ expandTrigger: 'hover', value: 'myId', label: 'name', children: 'children', checkStrictly: true }"
              style="width:100%;"
              size="small"
              placeholder="行政区域"
              clearable
              @change="handleChange"
            ></el-cascader>
          </div>
          <div class="top-item-sub">
            <suc-select v-model="stationParams.jgType" :options="organizeData" :config="{ placeholder: '机构性质', clearable: true }" style="width:160px"></suc-select>
          </div>

          <div class="top-item-sub">
            <search-component placeholderTxt="抢险队伍名称" @input="onSearch"> </search-component>
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
    <qxdw-modal :title="modalTitle" :model="model" v-loading="loading" :formParams="formParams" @on-submit="oncreate" @toggle="toggle"></qxdw-modal>
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
import { DeleteModal, QxdwModal } from "../model";
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
  organizeData: any = []; //机构性质

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
    let url = "wjServer/dataCenter/fxdw";
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
    let url = "wjServer/dataCenter/fxdw";
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
    let url = "wjServer/dataCenter/fxdw";
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
    let uuid = row.uuid;
    this.editInfo(uuid);
  }
  newString: any = "";

  // 详情
  async editInfo(ckidParams: any) {
    let url = "wjServer/dataCenter/fxdw";
    let params = {
      uuid: ckidParams,
    };
    let data = await infoApi.getInfo(params, url);

    if (data.result == true) {
      let arrxzqy = data.data.areacode.split(","); //转化成数组
      this.newString = data.data.lon + "," + data.data.lat;
      this.formParams = {
        name: data.data.name, //抢险队伍
        comtype: data.data.comtype, //抢险机构性质
        type: data.data.type, //抢险性质
        limitnum: data.data.limitnum, //机构人数
        nownum: data.data.nownum, //现有人数
        areacode: arrxzqy, //行政区域
        address: data.data.address, //地址
        reporttime: data.data.reporttime ? dayjs(Number(this.formParams.reporttime)).format("YYYY-MM-DD") : "",

        tel: data.data.tel, //电话
        nt: data.data.nt, //备注
        uuid: data.data.uuid, //id
        lon: data.data.lon, //经度
        lat: data.data.lat, //纬度
        location: this.newString, //经纬度
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
      title: "队伍名称",
      key: "name",
    },
    {
      title: "所属区域",
      key: "areaName",
    },
    {
      title: "现有人数",
      key: "nownum",
    },
    {
      title: "机构性质",
      key: "jgTypeName",
    },
    {
      title: "详细地址",
      key: "address",
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
    pageNum: "",
    pageSize: "",
    areaCode: "", //行政区域
    dwmc: "", //队伍名称
    jgType: "", //机构性质
  };

  //   级联下拉框
  async handleChange(value: any) {
    this.stationParams.areaCode = value.toString();
  }
  mounted() {
    this.getAreaCode(); //获取所属区域
    this.getOrganizeData(); //获取机构性质
    this.onpage(); //获取页面信息
  }
  // 机构性质
  async getOrganizeData() {
    const url = "wjServer/dataCenter/fxdw/jgType";
    const data = await publicApi.getNoParam(url);
    this.organizeData = data.data.map((e: any) => {
      return {
        value: e.codeMyid,
        label: e.name,
      };
    });
  }

  async getAreaCode() {
    let data = await publicApi.getAreaCode();
    this.areaOptions = this.getTreeData([data.data]);
  }
  getTreeData(data: any) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].children.length < 1) {
        data[i].children = undefined;
      } else {
        this.getTreeData(data[i].children);
      }
    }
    return data;
  }

  //   所在仓库参数
  szckParams = {
    dwmc: "",
    areaCode: "",
  };

  // 列表
  async onpage() {
    this.stationParams.pageNum = this.pageParams.current; //当前页码
    this.stationParams.pageSize = this.pageParams.pageSize; //一页多少条
    let url = "wjServer/dataCenter/fxdw/page";
    let data = await publicApi.getWithParam(url, this.stationParams);
    if (data.result == true) {
      this.tableData = data.data.rows;
      this.pageParams.total = parseInt(data.data.total);
    } else {
      this.loading = false;
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
    this.stationParams.dwmc = val;
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
