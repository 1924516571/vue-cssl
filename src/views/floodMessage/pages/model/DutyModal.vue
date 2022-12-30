<template>
  <el-dialog :title="title" :visible.sync="model" close-on-click-modal:false :before-close="onCancel" v-if="model">
    <el-form :model="formParams" :rules="rules" ref="yjForm" label-width="auto" size="small" class="form scroll">
      <el-form-item label="值班日期">
        <suc-date-picker
          v-model="formParams.dutydate"
          :options="{
            type: 'date',
            clearable: true,
            placeholder: '请选择日期',
          }"
          style="width: 100%"
        ></suc-date-picker>
      </el-form-item>

      <el-form-item label="值班领导">
        <suc-select
          v-model="formParams.dutyleader"
          :options="ldOptions"
          :config="{
            clearable: true,
          }"
          style="width: 100%"
        >
        </suc-select>
      </el-form-item>

      <el-form-item label="技术员">
        <suc-select
          v-model="formParams.skiller"
          :options="jsyOptions"
          :config="{
            clearable: true,
          }"
          @on-change="getSkiller"
          style="width: 100%"
        >
        </suc-select>
      </el-form-item>

      <el-form-item label="白班人员">
        <suc-select
          v-model="formParams.dayshift"
          :options="bbOptions"
          :config="{
            clearable: true,
          }"
          @on-change="getDayshift"
          style="width: 100%"
        >
        </suc-select>
      </el-form-item>

      <el-form-item label="晚班人员">
        <suc-select
          v-model="formParams.nightshift"
          :options="wbOptions"
          :config="{
            clearable: true,
          }"
          @on-change="getNightshift"
          style="width: 100%"
        >
        </suc-select>
      </el-form-item>

      <el-form-item label="值班类型" prop="type">
        <suc-select
          v-model="formParams.type"
          :options="typeOptions"
          :config="{
            clearable: true,
          }"
          @on-change="getType"
          style="width: 100%"
        >
        </suc-select>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onOk()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { SucModal, SucForm, SucFormItem, SucInput, SucSelect, SucDatePicker } from "@suc/ui";
import { infoApi, publicApi } from "@/api";
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
  },
})
export default class ZbModal extends Vue {
  ldOptions: any = [];
  jsyOptions: any = [];
  bbOptions: any = [];
  wbOptions: any = [];
  typeOptions: any = [
    { value: "0", label: "汛期" },
    { value: "1", label: "非汛期" },
  ];

  rules = {
    type: [{ required: true, message: "请选择值班类型", trigger: "change" }],
  };
  @Prop() title!: string;
  @Prop() loading!: boolean; //控制加载
  @Prop() model!: boolean; //控制弹框显隐
  @Prop({ type: Object, default: () => {} }) formParams!: any; //新增接口需要的参数
  @Emit()
  async onSubmit() {}
  @Emit()
  toggle(val: boolean) {
    return val;
  }

  onOk() {
    (this.$refs["yjForm"] as any).validate((valid: any) => {
      if (valid) {
        this.onSubmit();
      } else {
        return false;
      }
    });
  }

  onCancel() {
    this.toggle(false);
    (this.$refs["yjForm"] as any).resetFields();
  }
  async handleChange(value: any) {
    this.formParams.area = value.toString();
  }
  //   值班领导;
  async getDutyleader(value: any) {
    if (value == undefined) {
      this.formParams.dutyleader = "";
    }
  }

  //   技术人员;
  async getSkiller(value: any) {
    if (value == undefined) {
      this.formParams.skiller = "";
    }
  }

  //   获取白班;
  async getDayshift(value: any) {
    if (value == undefined) {
      this.formParams.dayshift = "";
    }
  }
  //   改变晚班;
  async getNightshift(value: any) {
    if (value == undefined) {
      this.formParams.nightshift = "";
    }
  }

  //   值班类型;
  async getType(value: any) {
    if (value == undefined) {
      this.formParams.type = "";
    }
  }

  // 行政区域
  mounted() {
    this.getDrop(1);
    this.getDrop(2);
    this.getDrop(3);
    this.getDrop(4);
  }

  getDrop(id: any) {
    let url = "wjServer/fangxunjc/ondutyer/dutyerList";
    publicApi.getWithParam(url, { job: id }).then((val) => {
      switch (id) {
        case 1:
          this.ldOptions = val.data.map((e: any) => {
            let item = {
              value: e.code,
              label: e.name,
            };
            return item;
          });
          break;
        case 2:
          this.jsyOptions = val.data.map((e: any) => {
            let item = {
              value: e.code,
              label: e.name,
            };
            return item;
          });
          break;
        case 3:
          this.bbOptions = val.data.map((e: any) => {
            let item = {
              value: e.code,
              label: e.name,
            };
            return item;
          });
          break;
        case 4:
          this.wbOptions = val.data.map((e: any) => {
            let item = {
              value: e.code,
              label: e.name,
            };
            return item;
          });
          break;

        default:
          break;
      }
    });
  }
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
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
      padding: 10px;
    }
  }
}

::v-deep.el-input--small .el-input__inner {
  margin: 3px 0;
}
#{$deep}.el-button--primary {
  color: #fff;
  background-color: #5993fa;
  border-color: #409eff;
}
</style>
