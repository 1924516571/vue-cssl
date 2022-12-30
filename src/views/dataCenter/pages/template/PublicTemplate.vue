<template>
  <!--通用模板 -->
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="content">
        <table-no :columns="columns" :tableData="tableData" v-loading="loading">
          <template v-slot:operation="{ row }">
            <div class="btn">
              <span @click="onedit(row)">编辑</span>
              <!-- <span @click="ondelete(row)">删除</span> -->
            </div>
          </template>
        </table-no>
      </div>
    </div>

    <!-- 新增数据弹框 -->
    <publick-template-modal :title="modalTitle" :model="model" :loading="loading" :formParams="formParams" @on-submit="oncreate" @toggle="toggle" :areaOptions="areaOptions"></publick-template-modal>
    <!-- 删除弹框
    <div class="delete-view" v-show="delmodel">
      <delete-modal @getignore="cancel" @getsave="save" v-loading="delLoading"></delete-modal>
    </div> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { SucSelect, SucButton, SucInput, SucFormItem } from "@suc/ui";
// import { SelectConfig, SelectOptions } from "@suc/ui/interfaces";
import { SearchComponent, TableNo } from "@/components";
import { DeleteModal, PublickTemplateModal } from "../model";
import { infoApi, publicApi } from "@/api";
@Component({
  components: {
    SucSelect,
    SucButton,
    SucInput,
    SucFormItem,
    SearchComponent,
    TableNo,
    DeleteModal,
    PublickTemplateModal,
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
      templateId: row.id,
    };
  }
  cancel(val: any) {
    this.delmodel = val;
  }
  async save() {
    this.delLoading = true;
    let url = "wjServer/hs/template/delTemplate";
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
    let checkUrl = "wjServer/hs/template/checkNameWhenAdd";
    let checkParam = {
      templateName: this.formParams.name,
    };
    let checkData = await infoApi.onpage(checkParam, checkUrl);
    if (!checkData.data) {
      let url = "wjServer/hs/template/addTemplate";
      this.formParams.creater = localStorage.getItem("userId");
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
    } else {
      this.model = false;
      this.$SucMessage.error("新增失败,模板名称已经存在,重新输入");
    }

    this.onpage();
  }
  // 更新
  async setEdit() {
    this.loading = true;
    let checkUrl = "wjServer/hs/template/checkNameWhenEdit";
    let checkParam = {
      oldName: this.oldName,
      newName: this.formParams.name,
    };
    let checkData = await infoApi.onpage(checkParam, checkUrl);
    if (!checkData.data) {
      let url = "wjServer/hs/template/editTemplate";
      this.formParams.creater = localStorage.getItem("userId");
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
    } else {
       this.model = false;
       this.$SucMessage.error('更新失败，模板名称已经存在，重新输入');
    }

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

  oldName: any = "";
  // 详情
  async editInfo(id: any) {
    let url = "wjServer/hs/template/getTemplateInfo";
    let params = {
      templateId: id,
    };
    let data = await infoApi.getInfo(params, url);
    const list: any = [];
    data.data.yhnrList.forEach((item: any) => {
      list.push(item.id);
    });
    this.oldName = data.data.name;
    this.formParams = {
      name: data.data.name,
      yhnr: list,
      id: data.data.id,
    };
  }
  //   查
  columns: any[] = [
    {
      type: "index",
      title: "序号",
      width: 150,
    },
    {
      title: "模板名称",
      key: "name",
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
    userId: "",
  };
  mounted() {
    this.onpage(); //获取页面信息
  }

  // 列表
  async onpage() {
    let url = "wjServer/hs/template/getPublicTemplate";
    let data = await infoApi.onpage({}, url);
    this.tableData = data.data;
    this.loading = false;
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
