<template>
  <el-dialog :title="title" :visible.sync="model" close-on-click-modal:false :before-close="onCancel" v-if="model">
    <el-form :model="formParams" :rules="rules" ref="yjyjForm" label-width="auto" size="small" class="form scroll">
      <el-form-item label="编辑人员">
        <el-input disabled v-model="formParams.ry"></el-input>
      </el-form-item>

      <el-form-item label="当前时间">
        <el-input disabled v-model="formParams.editDate"></el-input>
      </el-form-item>

      <el-form-item label="预警等级">
        <suc-select :config="{ clearable: true }" v-model="formParams.dangerLevel" :options="levelOptions" style="width: 100%"> </suc-select>
      </el-form-item>

      <el-form-item label="启动条件">
        <template v-for="(curitem, curindex) in formParams.condition">
          <el-form-item label="" :key="curindex + '-1'" class="lineForm">
            <el-input v-model="formParams.condition[curindex]"></el-input>
          </el-form-item>
          <suc-button type="primary" :key="curindex + '-2'" @click="add(1)">
            +
          </suc-button>
          <suc-button v-if="formParams.condition.length > 1" type="primary2" :key="curindex + '-3'" @click="reduce(1, [curitem, curindex])">
            -
          </suc-button>
        </template>
      </el-form-item>

      <el-form-item label="响应行动">
        <template v-for="(curitem, curindex) in formParams.response">
          <el-form-item label="" :key="curindex + '-1'" class="lineForm">
            <el-input v-model="formParams.response[curindex]"></el-input>
          </el-form-item>
          <suc-button type="primary" :key="curindex + '-2'" @click="add(2)">
            +
          </suc-button>
          <suc-button v-if="formParams.response.length > 1" type="primary2" :key="curindex + '-3'" @click="reduce(2, [curitem, curindex])">
            -
          </suc-button>
        </template>
      </el-form-item>

      <!-- <el-form-item label="短信指令">
        <el-input type="textarea" v-model="formParams.duanxin"></el-input>
      </el-form-item> -->

      <el-form-item label="成员单位">
        <el-input v-model="formParams.cydw"></el-input>
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
import { SucModal, SucForm, SucFormItem, SucInput, SucButton, SucSelect, SucDatePicker } from "@suc/ui";
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
    SucButton,
  },
})
export default class YjyjModal extends Vue {
  rainOptions: any = [];
  levelOptions: any = [];

  rules = {
    department: [{ required: true, message: "请选择科室", trigger: "change" }],
    // dutyer: [{ required: true, message: "请选择值班人员", trigger: "change" }],
  };
  @Prop() title!: string;
  @Prop() activeIndex!: any;
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
    (this.$refs["yjyjForm"] as any).validate((valid: any) => {
      if (valid) {
        this.onSubmit();
      } else {
        return false;
      }
    });
  }

  //动态添加组件
  add(type: any) {
    if (type == 1) {
      this.formParams.condition.push("");
    } else {
      this.formParams.response.push("");
    }
  }

  //动态减少组件
  reduce(type: any, info: any) {
    if (type == 1) {
      this.formParams.condition.splice(info[1], 1);
    } else {
      this.formParams.response.splice(info[1], 1);
    }
  }

  onCancel() {
    this.toggle(false);
    (this.$refs["yjyjForm"] as any).resetFields();
  }
  async handleChange(value: any) {
    this.formParams.area = value.toString();
  }

  // 行政区域
  mounted() {
    this.getLevel();
  }

  @Watch("activeIndex")
  async getLevel() {
    let url = "wjServer//fangxunjc/ermanager/dangerType";
    let data = await publicApi.getWithParam(url, { type: this.activeIndex });
    this.levelOptions = data.data.map((e: any) => {
      let item = {
        value: e.code,
        label: e.name,
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
      height: 400px;
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
  }
}

::v-deep.el-input--small .el-input__inner {
  margin: 3px 0;
}
</style>
