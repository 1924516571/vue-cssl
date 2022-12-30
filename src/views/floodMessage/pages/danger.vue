<template>
  <!--值班人员-->
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <div class="top-item-sub">
            <suc-date-picker
              v-model="dangerParams.year"
              :options="{
                type: 'year',
                clearable: true,
                placeholder: '请选择年度',
              }"
              style="width: 200px"
            ></suc-date-picker>
          </div>
          <div class="top-item-sub">
            <el-cascader
              v-model="dangerParams.areaId"
              :options="areaOptions"
              :props="{
                expandTrigger: 'hover',
                value: 'myId',
                label: 'name',
                children: 'children',
                checkStrictly: true,
              }"
              style="width: 100%"
              size="small"
              placeholder="地区"
              clearable
              @change="handleChange"
            ></el-cascader>
          </div>
          <div class="top-item-sub">
            <suc-select
              v-model="dangerParams.type"
              :options="bbOptions"
              style="width: 200px"
            >
            </suc-select>
          </div>
          <div class="top-item-sub">
            <suc-button type="primary" @on-click="onSearch">搜索</suc-button>
          </div>
        </div>
        <div class="top-item">
          <suc-button type="primary" :debounce="800" @on-click="onadd"
            >新增</suc-button
          >
        </div>
      </div>
      <div class="content">
        <table-page
          :columns="columns"
          :tableData="tableData"
          :pageParams="pageParams"
          @get-page="getPage"
          @get-size="getSize"
        >
          <template v-slot:operation="{ row }">
            <div class="btn">
              <span @click="onedit(row)">编辑</span>
              <span @click="ondelete(row)">删除</span>
            </div>
          </template>
        </table-page>
      </div>
    </div>

    <danger-modal
      :title="modalTitle"
      :model="model"
      :loading="loading"
      :formParams="formParams"
      @on-submit="oncreate"
      @toggle="toggle"
    ></danger-modal>

    <!-- 删除弹框 -->
    <div class="delete-view" v-show="delmodel">
      <delete-modal
        @getignore="cancel"
        @getsave="save"
        v-loading="delLoading"
      ></delete-modal>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { SucButton, SucInput, SucDatePicker, SucSelect } from "@suc/ui";
import { SearchComponent, TablePage } from "@/components";
import { dangerModal, DeleteModal } from "./model";
import { publicApi } from "@/api";
@Component({
  components: {
    SucButton,
    SucInput,
    SearchComponent,
    TablePage,
    dangerModal,
    SucDatePicker,
    DeleteModal,
    SucSelect,
  },
})
export default class Enterprise extends Vue {
  modalTitle: string = ""; //弹窗标题
  loading: boolean = false;
  delLoading: boolean = false;
  btnFlag: string = ""; //区分编辑和新增
  tableData: any[] = [];
  time: any = "";
  params: any = {};
  bbType: any = [];
  bbOptions: any = [];
  formParams: any = {};
  areaOptions: any = [];

  //   删
  delmodel: boolean = false;
  delParams: any = {};

  mounted() {
    this.onpage();
    this.getAreaCode();
    this.getBb();
  }

  async getBb() {
    let url = "wjServer/fangxunjc/disaster/allReportType";
    let data = await publicApi.getNoParam(url);
    this.bbOptions = data.data.map((e: any) => {
      let item = {
        value: e.code,
        label: e.name,
      };
      return item;
    });
  }

  //获取行政区域下拉框值
  async getAreaCode() {
    let data = await publicApi.getAreaCode();
    this.areaOptions = this.getTreeData([data.data]);
  }

  async handleChange(value: any) {
    this.formParams.area = value.toString();
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
    let url = "wjServer/fangxunjc/disaster/delInfo";
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
      busiFxStWaterproject: {},
      busiFxStFlooded: {},
    };
  }

  // 判断是新增还是编辑
  async oncreate() {
    this.formParams.year = this.$utils.dateFormat(
      new Date(this.formParams.year),
      "yyyy"
    );
    this.formParams.area =  this.formParams.area.toString();
    switch (this.formParams.type) {
      case "1":
        this.formParams.busiFxStFlooded.starttime = this.$utils.dateFormat(
          new Date(this.formParams.busiFxStFlooded.starttime),
          "yyyy-MM-dd"
        );
        this.formParams.busiFxStFlooded.endtime = this.$utils.dateFormat(
          new Date(this.formParams.busiFxStFlooded.endtime),
          "yyyy-MM-dd"
        );
        break;
      case "8":
        this.formParams.busiFxStWaterproject.starttime = this.$utils.dateFormat(
          new Date(this.formParams.busiFxStWaterproject.starttime),
          "yyyy-MM-dd"
        );
        this.formParams.busiFxStWaterproject.endtime = this.$utils.dateFormat(
          new Date(this.formParams.busiFxStWaterproject.endtime),
          "yyyy-MM-dd"
        );
        break;

      default:
        break;
    }
    if (this.btnFlag == "add") {
      this.setCreate();
    } else if (this.btnFlag == "edit") {
      this.setEdit();
    }
    this.model = false;
  }
  //  新增
  async setCreate() {
    let url = "wjServer/fangxunjc/disaster/addInfo";
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
    let url = "wjServer/fangxunjc/disaster/editInfo";
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
  model: boolean = false;
  toggle(val: boolean) {
    this.model = val;
  }
  // 编辑
  onedit(row: any) {
    this.model = true;
    this.formParams = {
      busiFxStWaterproject: {},
      busiFxStFlooded: {},
    };
    this.btnFlag = "edit";
    this.modalTitle = "编辑";
    this.editInfo(row.id);
  }
  // 详情
  async editInfo(params: any) {
    let url = "wjServer/fangxunjc/disaster/getInfoById";
    let detailParams = {
      id: params,
    };
    let data = await publicApi.getWithParam(url, detailParams);
    this.formParams = data.data;
    this.formParams.area = data.data.area.split(",");
  }

  columns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "年份",
      key: "year",
    },
    {
      title: "地区",
      key: "area",
    },
    {
      title: "报表类型",
      key: "type",
    },
    {
      title: "填报单位",
      key: "dept",
    },
    {
      title: "填报人",
      key: "reporter",
    },
    {
      title: "编辑时间",
      key: "updatetime",
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
  dangerParams: any = {
    pageNumber: "",
    pageSize: "",
    areaId: "",
    type: "",
    year: "",
  };

  // 列表
  async onpage() {
    this.dangerParams.pageNumber = this.pageParams.current;
    this.dangerParams.pageSize = this.pageParams.pageSize;
    this.dangerParams.year = this.$utils.dateFormat(
      new Date(this.dangerParams.year),
      "yyyy"
    );
    let url = "wjServer//fangxunjc/disaster/infoList";
    let data = await publicApi.getWithParam(url, this.dangerParams);
    console.log("00", data);

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

  onSearch() {
    this.loading = true;
    this.pageParams.current = 1;
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
