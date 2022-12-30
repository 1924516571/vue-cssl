<template>
  <!--风机信息 -->
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <div class="top-item-sub">
            <el-cascader
              v-model="stationParams.areaCode"
              :options="areaOptions"
              :props="{ expandTrigger: 'hover', value: 'myId', label: 'name', children: 'children', checkStrictly: true }"
              style="width:100%;"
              size="small"
              placeholder="所属区域"
              clearable
              @change="handleChange"
            ></el-cascader>
          </div>
          <!-- 泵机名称 -->
          <div class="top-item-sub">
            <search-component placeholderTxt="风机名称" @input="onSearch"> </search-component>
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
    <fan-modal :title="modalTitle" :model="model" :loading="loading" :areaOptions="areaOptions" :formParams="formParams" @on-submit="oncreate" @toggle="toggle" :chuan="chuan"></fan-modal>
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
import { DeleteModal,} from "../model";
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
  },
})
export default class Fan extends Vue {
  // dialogVisible:boolean = false;
  // 初始化数据 data可以声明成类属性形式
  // chuan:String="父传子的值"
  chuan: any = [];
  areaOptions: any = [];
  areaCode: any = [];
  modalTitle: string = ""; //弹窗标题
  loading: boolean = true;
  delLoading: boolean = false;
  btnFlag: string = ""; //区分编辑和新增
  tableData: any[] = [];

  formParams: any = {
    minIoFileList: [],
  };
  //   删
  delmodel: boolean = false;
  delParams: any = {};
  ondelete(row: any) {
    this.delmodel = true;
    this.delParams = {
      fanId: row.id,
    };
  }
  cancel(val: any) {
    this.delmodel = val;
  }
  async save() {
    this.delLoading = true;
    let url = "wjServer/dataCenter/basic/fan";
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
    this.formParams = {
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
    let url = "wjServer/dataCenter/basic/fan";
    this.formParams.areacode = this.formParams.areacode.toString();
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
    let url = "wjServer/dataCenter/basic/fan";
    this.formParams.areacode = this.formParams.areacode.toString();
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
    let id = row.id;
    this.editInfo(id);
  }
  // 详情
  async editInfo(id: any) {
    let url = "wjServer/dataCenter/basic/fan";
    let params = {
      fanId: id,
    };
    let data = await infoApi.getInfo(params, url);
    // 区域
    let arrxzqy = data.data.areacode.split(",");
    // 图片
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
      areacode: arrxzqy,
      imgList: imgURL,
      minIoFileList: data.data.minIoFileList,
      fancode: data.data.fancode,
      name: data.data.name,
      specifications: data.data.specifications,
      p: data.data.p,
      buytime: data.data.buytime,
      factory: data.data.factory,
      method: data.data.method,
      id: data.data.id,
    };
  }

  //   查
  columns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "风机编码",
      key: "fancode",
    },
    {
      title: "风机名称",
      key: "name",
    },
    {
      title: "行政区域",
      key: "areaName",
    },
    {
      title: "规格型号",
      key: "specifications",
    },
    {
      title: "功率",
      key: "p",
    },
    {
      title: "采购时间",
      key: "buyTimeStr",
    },
    {
      title: "生产厂家",
      key: "factory",
    },
    {
      title: "维护方法",
      key: "method",
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
  };
  mounted() {
    this.onpage(); //获取页面信息
    this.getAreaCode();
  }

  //获取下拉行政区域下拉
  async getAreaCode() {
    let data = await infoApi.getAreaCode();
    this.areaOptions = this.getTreeData([data.data]);
  }

  getTreeData(data: any) {
    // 循环遍历json数据
    for (var i = 0; i < data.length; i++) {
      if (data[i].children.length < 1) {
        // children若为空数组，则将children设为undefined
        data[i].children = undefined;
      } else {
        // children若不为空数组，则继续 递归调用 本方法
        this.getTreeData(data[i].children);
      }
    }
    return data;
  }

  async handleChange(value: any) {
    this.stationParams.areaCode = value.toString();
  }

  // 列表
  async onpage() {
    this.stationParams.pageNumber = this.pageParams.current;
    this.stationParams.pageSize = this.pageParams.pageSize;
    let url = "wjServer/dataCenter/basic/fan/page";
    let data = await infoApi.onpage(this.stationParams, url);
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
    this.stationParams.fanName = val;
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
        // width: 100%;
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
