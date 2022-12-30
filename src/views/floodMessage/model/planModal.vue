<template>
  <el-dialog
    :title="title"
    :visible.sync="model1"
    close-on-click-modal:false
    :before-close="onCancel"
    v-if="model1"
  >
    <el-form
      :model="formParams1"
      ref="kqForm"
      label-width="auto"
      size="small"
      class="form scroll"
    >
      <el-form-item label="预警等级">
        <suc-select
          v-model="dangerLevel"
          :options="levelOptions"
          style="width: 100%"
        >
        </suc-select>
      </el-form-item>

      <el-form-item label="启动条件">
        <!-- <suc-select
          :config="{ clearable: true, multiple: true }"
          v-model="formParams1.condition"
          :options="tjOptions"
          style="width: 100%"
        >
        </suc-select> -->
          <el-checkbox-group v-model="formParams1.condition" style="width: 100%">
            <el-checkbox v-for="list in tjOptions" :key="list" border style="display:block;margin-bottom:10px" :label="list"></el-checkbox>
          </el-checkbox-group>
        
      </el-form-item>

      <el-form-item label="响应行动">
        <!-- <suc-select
          :config="{ clearable: true, multiple: true }"
          v-model="formParams1.response"
          :options="xdOptions"
          style="width: 100%"
        >
        </suc-select> -->
         <!-- <el-checkbox-group v-model="formParams1.response" style="width: 100%">
            <el-checkbox v-for="list in xdOptions" :key="list" border style="display:block;margin-bottom:10px" :label="list"></el-checkbox>
          </el-checkbox-group> -->
          <el-input
            type="textarea"
            disabled
            v-model="formParams1.responseStr"
          ></el-input>
      </el-form-item>

      <el-form-item label="物资仓库">
        <suc-select
          :config="{ clearable: true }"
          v-model="formParams1.warehouse"
          :options="wzOptions"
          style="width: 100%"
        >
        </suc-select>
      </el-form-item>

      <el-form-item label="负责人员">
        <suc-select
          :config="{ clearable: true, multiple: true }"
          v-model="formParams1.principal"
          :options="ryOptions"
          style="width: 100%"
        >
        </suc-select>
      </el-form-item>

      <el-form-item label="短信指令">
        <el-input
          type="textarea"
          disabled
          v-model="formParams1.duanxin"
        ></el-input>
      </el-form-item>

      <el-form-item label="发布人">
        <el-input
          disabled
          v-model="formParams1.ry"
        ></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onOk()"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import {
  SucModal,
  SucForm,
  SucFormItem,
  SucInput,
  SucButton,
  SucSelect,
  SucDatePicker,
} from "@suc/ui";
import { publicApi } from "@/api";
import { LoadingCom } from "@/components";
// import { Form } from "element-ui";
@Component({
  components: {
    SucModal,
    SucForm,
    SucFormItem,
    SucInput,
    SucSelect,
    LoadingCom,
    SucDatePicker,
    SucButton,
  },
})
export default class KqModal extends Vue {
  rainOptions: any = [];
  levelOptions: any = [];
  tjOptions: any = [];
  xdOptions: any = [];
  tjcheckList:any =  [];
  xdcheckList:any =  [];
  wzOptions: any = [];
  ryOptions: any = [];
  dangerLevel: any = "";
  @Prop() loading!: boolean; //控制加载
  @Prop() activeIndex!: any;
  @Prop() title: any;
  @Prop() model1!: boolean; //控制弹框显隐
  @Prop() formParams1!: any; //新增接口需要的参数
  @Emit()
  async onSubmit() {}
  @Emit()
  toggle1(val: boolean) {
    return val;
  }

  //不直接给riverCode、dangerLevel使用formParams1是因为直接使用formParams1对象会导致选择时多执行一次监听导致数据丢失
  get value() {
    return {
      dangerLevel: this.dangerLevel,
    };
  }

  @Watch('formParams1.dangerLevel')
  getInfo(){
    this.getLevel();
    this.dangerLevel = this.formParams1.dangerLevel
  }

  @Watch("value")
  async getMes() {
    this.tjOptions = [];
    this.xdOptions = [];
    this.formParams1.duanxin = "";
    let url = "wjServer/fangxunjc/ermanager/getContentList";
    let data = await publicApi.getWithParam(url, {
      type:this.activeIndex,
      dangerLevel: this.dangerLevel,
    });
    // this.formParams1.condition = [];
    // this.formParams1.response = [];
    this.tjOptions = data.data.condition.map((e: any) => {
      return e;
    });
    // this.xdOptions = data.data.response.map((e: any) => {
    //   return e;
    // });
    this.formParams1.duanxin = data.data.duanxin
    this.formParams1.responseStr = data.data.responseStr
  }

  onOk() {
    (this.$refs["kqForm"] as any).validate((valid: any) => {
      if (valid) {
        this.formParams1.dangerLevel = this.dangerLevel;
        this.onSubmit();
      } else {
        return false;
      }
    });
  }

  onCancel() {
    this.dangerLevel = ""
    this.formParams1.dangerLevel = ""
    this.toggle1(false);
    (this.$refs["kqForm"] as any).resetFields();
  }

  // 行政区域
  mounted() {
    this.getLevel();
    this.getWz();
    this.getRy();
  }

  async getLevel() {
    let url = "wjServer//fangxunjc/ermanager/dangerType";
     let data = await publicApi.getWithParam(url,{'type':this.activeIndex});
    this.levelOptions = data.data.map((e: any) => {
      let item = {
        value: e.code,
        label: e.name,
      };
      return item;
    });
  }

  async getWz() {
    let url = "wjServer/dataCeter/wareHouse/getCKList";
    let data = await publicApi.getNoParam(url);
    this.wzOptions = data.data.map((e: any) => {
      let item = {
        value: e.ckid,
        label: e.ckmc,
      };
      return item;
    });
  }


  async getRy() {
    let url = "wjServer/fangxunjc/ermanager/getFXPerson";
    let data = await publicApi.getNoParam(url);
    this.ryOptions = data.data.map((e: any) => {
      let item = {
        value: e.id,
        label: e.realname,
      };
      return item;
    });
  }
}
</script>
<style lang="scss" scoped>
// $deep:"::v-deep";
::v-deep.el-dialog__wrapper {
  .el-dialog {
    .el-dialog__header {
      background-color: #5993fa;
    }
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }
    .el-dialog__body {
      height: 500px;
      overflow-y: auto;
    }
    .el-dialog__footer {
      border-top: 1px solid #e8eaec;
    }
    .lineForm {
      display: inline-block;
      width: calc(100% - 87px);
      margin-bottom: -10px;
      margin-right: 10px;
    }
    .el-checkbox{
      margin-left: 0;
      margin-right:0
    }
  }
}

::v-deep.el-input--small .el-input__inner {
  margin: 3px 0;
}
</style>
