<template>
  <!-- 接警电话 -->
  <el-dialog :title="title" :visible.sync="model" close-on-click-modal:false :before-close="onCancel" v-if="model">
    <el-form :model="formParams" :rules="rules" ref="yjForm" label-width="auto" size="small" class="form scroll">
      <el-form-item label="记录单位" prop="jldw">
        <el-input disabled v-model="user.departmentName"></el-input>
      </el-form-item>

      <el-form-item label="来电时间" prop="ldsj">
        <suc-date-picker v-model="formParams.ldsj" :options="{ type: 'datetime', clearable: true, placeholder: '请选择时间' }"></suc-date-picker>
      </el-form-item>
      <el-form-item label="记录人" prop="jlr">
        <el-input disabled v-model="user.realname"></el-input>
      </el-form-item>
      <el-form-item label="险情类型" prop="xqlx">
        <suc-select
          v-model="formParams.xqlx"
          :options="xqOptions"
          :config="{
            clearable: false,
          }"
          style="width: 100%"
        >
        </suc-select>
      </el-form-item>

      <el-form-item label="来电人">
        <el-input v-model="formParams.ldr"></el-input>
      </el-form-item>

      <el-form-item label="来电号码" prop="ldhm">
        <el-input v-model="formParams.ldhm"></el-input>
      </el-form-item>

      <el-form-item label="来电单位">
        <el-input v-model="formParams.lddw"></el-input>
      </el-form-item>
      <el-form-item label="来电地址">
        <el-input v-model="formParams.lddz"></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="zt">
        <suc-select
          v-model="formParams.zt"
          :options="ztOptions"
          :config="{
            clearable: false,
          }"
          style="width: 100%"
        >
        </suc-select>
      </el-form-item>
      <el-form-item label="险情内容">
        <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5 }" style="height:50px" v-model="formParams.bz"></el-input>
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
export default class FxyaModal extends Vue {
  user: any = JSON.parse(localStorage.getItem("userInfo") || "");

  rules = {
    // jldw: [{ required: true, message: "请选择记录单位", trigger: "blur" }],
    // jlr: [{ required: true, message: "请选择记录人", trigger: "blur" }],
    ldsj: [{ required: true, message: "请选择时间", trigger: "change" }],
    xqlx: [{ required: true, message: "请选择险情类型", trigger: "change" }],
    ldhm: [{ required: true, message: "请输入来电号码", trigger: "blur" }],
    zt: [{ required: true, message: "请选择状态", trigger: "change" }],
  };
  xqOptions: any = [];
  ztOptions: any = []; //状态类型
  @Prop() title!: string;
  @Prop() loading!: boolean; //控制加载
  @Prop() model!: boolean; //控制弹框显隐
  @Prop({ type: Object, default: () => {} }) formParams!: any; //新增接口需要的参数
  @Emit()
  async onSubmit() {
    this.formParams.jldw = this.user.departmentName;
    this.formParams.jlr = this.user.realname;
  }
  @Emit()
  toggle(val: boolean) {
    return val;
  }

  onOk() {
    (this.$refs["yjForm"] as any).validate((valid: any) => {
      // 如果都填写回调函数返回true
      if (valid) {
        this.onSubmit();
      } else {
        return false;
      }
    });
  }

  mounted() {
    this.getxqtype(); //险情类型
    this.getztType(); //状态类型
  }
  async getxqtype() {
    const url = "wjServer/fangxunjc/ermanager/dangerType";
    const params = {
       type:"1"
    }
    const data = await publicApi.getWithParam(url,params);
    if ((data.result = true)) {
      this.xqOptions = data.data.map((item: any) => {
        let arr = {
          value: item.code,
          label: item.name,
        };
        return arr;
      });
    } else {
      this.$SucMessage.error("险情类型获取失败");
      this.xqOptions = [];
    }
  }
  getztType() {
    this.ztOptions = [
      { value: "1", label: "未处理" },
      { value: "2", label: "已处理" },
    ];
  }

  onCancel() {
    this.toggle(false);
    (this.$refs["yjForm"] as any).resetFields();
  }
  async handleChange(value: any) {
    this.formParams.area = value.toString();
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
  }
}

::v-deep.el-input--small .el-input__inner {
  margin: 3px 0;
}
</style>
