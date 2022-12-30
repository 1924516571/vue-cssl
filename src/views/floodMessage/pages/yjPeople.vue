<template>
  <!--应急联系人 -->
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <div class="top-item-sub">
            <suc-select v-model="yjParams.group" :options="group" @on-change="changeGroup" style="width: 200px"> </suc-select>
          </div>
          <div class="top-item-sub" v-if="yjParams.group != 4">
            <suc-date-picker
              v-model="yjParams.year"
              :options="{
                type: 'year',
                clearable: true,
                placeholder: '请选择年份',
              }"
              style="width: 150px"
            ></suc-date-picker>
          </div>
          <div class="top-item-sub" v-if="yjParams.group == 1 || yjParams.group == 2">
            <el-cascader
              v-model="yjParams.areaId"
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
              placeholder="所属镇(区)"
              clearable
              @change="handleChange"
            ></el-cascader>
          </div>
          <div class="top-item-sub" v-if="yjParams.group == 1 || yjParams.group == 2">
            <suc-button type="primary" @on-click="onSearch1">搜索</suc-button>
          </div>
          <div class="top-item-sub" v-if="yjParams.group == 3">
            <search-component placeholderTxt="单位名称" @input="onSearch"> </search-component>
          </div>
          <div class="top-item-sub" v-if="yjParams.group == 4">
            <search-component placeholderTxt="抗排队名称" @input="onSearch"> </search-component>
          </div>
        </div>
        <div class="top-item">
          <suc-button type="primary" :debounce="800" @on-click="onadd">新增</suc-button>
        </div>
      </div>
      <div class="content">
        <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams" @get-page="getPage" @get-size="getSize">
          <template v-slot:operation="{ row }">
            <div class="btn">
              <span @click="onedit(row)">编辑</span>
              <span @click="ondelete(row)">删除</span>
            </div>
          </template>
        </table-page>
      </div>
    </div>

    <!-- 新增数据弹框  1:领导小组 2：防汛包大圩单位 3：防汛防旱指挥部-->
    <yj-modal1 :title="modalTitle" v-if="yjParams.group == 1" :model="model" :loading="loading" :formParams="formParams" @on-submit="oncreate" @toggle="toggle"></yj-modal1>

    <yj-modal2 :title="modalTitle" v-if="yjParams.group == 2" :model="model" :loading="loading" :formParams="formParams" @on-submit="oncreate" @toggle="toggle"></yj-modal2>

    <yj-modal3 :title="modalTitle" v-if="yjParams.group == 3" :model="model" :loading="loading" :formParams="formParams" @on-submit="oncreate" @toggle="toggle"></yj-modal3>

    <yj-modal4 :title="modalTitle" v-if="yjParams.group == 4" :model="model" :loading="loading" :formParams="formParams" @on-submit="oncreate" @toggle="toggle"></yj-modal4>

    <!-- 删除弹框 -->
    <div class="delete-view" v-show="delmodel">
      <delete-modal @getignore="cancel" @getsave="save" v-loading="delLoading"></delete-modal>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { SucButton, SucInput, SucDatePicker, SucSelect } from "@suc/ui";
import { SearchComponent, TablePage } from "@/components";
import { yjModal1, yjModal2, yjModal3, yjModal4, DeleteModal } from "./model";
import { publicApi } from "@/api";
@Component({
  components: {
    SucButton,
    SucInput,
    SearchComponent,
    TablePage,
    yjModal1,
    yjModal2,
    yjModal3,
    SucDatePicker,
    DeleteModal,
    SucSelect,
    yjModal4,
  },
})
export default class Enterprise extends Vue {
  group: any = [
    { label: "领导小组成员", value: 1 },
    { label: "防汛包大圩单位责任人", value: 2 },
    { label: "防汛防旱指挥部成员", value: 3 },
    { label: "抗排队", value: 4 },
  ];
  modalTitle: string = ""; //弹窗标题
  areaOptions: any = [];
  loading: boolean = false;
  delLoading: boolean = false;
  btnFlag: string = ""; //区分编辑和新增
  tableData: any[] = [];
  time: any = "";
  params: any = {};
  columns: any = [];

  formParams: any = {};

  //   删
  delmodel: boolean = false;
  delParams: any = {};

  mounted() {
    this.columns = this.columns1;
    this.onpage(); //获取页面信息
    this.getAreaCode();
  }

  //获取行政区域下拉框值
  async getAreaCode() {
    let data = await publicApi.getAreaCode();
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
    this.yjParams.areaId = value.toString();
  }

  changeGroup(val: any) {
    this.model = false;
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
    let url = "wjServer/fangxunjc/contacts/delInfo";
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
    let url = "wjServer/fangxunjc/contacts/addInfo";
    (this.formParams.years = this.$utils.dateFormat(new Date(this.formParams.years), "yyyy")), (this.formParams.grouping = this.yjParams.group.toString());
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
    let url = "wjServer/fangxunjc/contacts/editInfo";
    this.formParams.area = this.formParams.area.toString();
    (this.formParams.years = this.$utils.dateFormat(new Date(this.formParams.years), "yyyy")), (this.formParams.grouping = this.yjParams.group.toString());
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
    this.formParams = {};
    this.btnFlag = "edit";
    this.modalTitle = "编辑";
    this.editInfo(row.id);
  }
  // 详情
  async editInfo(params: any) {
    let url = "wjServer/fangxunjc/contacts/getInfoById";
    let detailParams = {
      id: params,
    };
    let data = await publicApi.getWithParam(url, detailParams);

    // 区域
    let arrxzqy = data.data.area.split(",");
    this.formParams = {
      area: arrxzqy,
      createtime: data.data.createtime,
      duty: data.data.duty,
      grouping: data.data.grouping,
      hometel: data.data.hometel,
      id: data.data.id,
      officetel: data.data.officetel,
      phone: data.data.phone,
      plodername: data.data.plodername,
      position: data.data.position,
      principal: data.data.principal,
      updatetime: data.data.updatetime,
      waterarea: data.data.waterarea,
      weidept: data.data.weidept,
      years: data.data.years,
    };
  }

  //领导小组成员表头
  columns1: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "年份",
      key: "years",
    },
    {
      title: "所属镇(区)",
      key: "area",
    },
    {
      title: "姓名",
      key: "principal",
    },
    {
      title: "领导小组职务",
      key: "position",
    },
    {
      title: "所在单位职务",
      key: "duty",
    },
    {
      title: "办公室电话",
      key: "officetel",
    },
    {
      title: "住宅电话",
      key: "hometel",
    },
    {
      title: "手机号",
      key: "phone",
    },
    {
      title: "操作",
      slot: "operation",
      width: 90,
    },
  ];

  //防汛包大圩单位责任人
  columns2: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "年份",
      key: "years",
    },
    {
      title: "圩 名",
      key: "plodername",
    },
    {
      title: "所属镇",
      key: "area",
    },
    {
      title: "集水面积(亩)",
      key: "waterarea",
    },
    {
      title: "包大圩单位",
      key: "weidept",
    },
    {
      title: "办公室电话",
      key: "officetel",
    },
    {
      title: "负责人姓名",
      key: "principal",
    },
    {
      title: "行政职务",
      key: "position",
    },
    {
      title: "办公室电话",
      key: "officetel",
    },
    {
      title: "住宅电话",
      key: "hometel",
    },
    {
      title: "手机号",
      key: "phone",
    },
    {
      title: "操作",
      slot: "operation",
      width: 90,
    },
  ];

  //防汛防旱指挥部成员
  columns3: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "单位名称",
      key: "weidept",
    },
    {
      title: "年份",
      key: "years",
    },
    {
      title: "姓名",
      key: "principal",
    },
    {
      title: "职务",
      key: "position",
    },
    {
      title: "办公室电话",
      key: "officetel",
    },
    {
      title: "住宅电话",
      key: "hometel",
    },
    {
      title: "手机号",
      key: "phone",
    },
    {
      title: "职责",
      key: "duty",
    },
    {
      title: "操作",
      slot: "operation",
      width: 90,
    },
  ];

  //抗排队
  columns4: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "抗排队组织名称",
      key: "weidept",
    },
    {
      title: "姓 名",
      key: "principal",
    },
    {
      title: "职 位",
      key: "position",
    },
    {
      title: "手 机 号",
      key: "phone",
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
  yjParams: any = {
    pageNumber: "",
    pageSize: "",
    group: 1,
    dept: "",
    year: "",
  };

  // 列表
  async onpage() {
    this.yjParams.pageNumber = this.pageParams.current;
    this.yjParams.pageSize = this.pageParams.pageSize;
    this.yjParams.year = this.$utils.dateFormat(new Date(this.yjParams.year), "yyyy");
    let url = "wjServer/fangxunjc/contacts/infoList";
    let data = await publicApi.getWithParam(url, this.yjParams);
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

  onSearch1() {
    this.loading = true;
    this.pageParams.current = 1;
    // this.pageParams.pageSize = 10;
    switch (this.yjParams.group) {
      case 1:
        this.columns = this.columns1;
        break;
      case 2:
        this.columns = this.columns2;
        break;
      case 3:
        this.columns = this.columns3;
        break;
    }
    this.onpage();
  }

  onSearch(val: string) {
    this.loading = true;
    this.pageParams.current = 1;
    // this.pageParams.pageSize = 10;
    switch (this.yjParams.group) {
      case 1:
        this.columns = this.columns1;
        break;
      case 2:
        this.columns = this.columns2;
        break;
      case 3:
        this.columns = this.columns3;
        this.yjParams.dept = val;
        break;
      case 4:
        this.columns = this.columns4;
        this.yjParams.name = val;
        break;
    }
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
