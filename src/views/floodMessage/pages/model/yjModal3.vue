<template>
  <el-dialog
    :title="title"
    :visible.sync="model"
    close-on-click-modal:false
    :before-close="onCancel"
    v-if="model"
  >
    <el-form
      :model="formParams"
      :rules="rules"
      ref="yjForm"
      label-width="auto"
      size="small"
      class="form"
    >
      <div>
        <el-form-item label="年份">
          <suc-date-picker
            v-model="formParams.years"
            :options="{
              type: 'year',
              clearable: true,
              placeholder: '请选择年份',
            }"
            style="width: 100%"
          ></suc-date-picker>
        </el-form-item>

        <el-form-item label="姓名" prop="principal">
          <el-input v-model="formParams.principal"></el-input>
        </el-form-item>

        <el-form-item label="办公室电话">
          <el-input v-model="formParams.officetel"></el-input>
        </el-form-item>

        <el-form-item label="手机号">
          <el-input v-model="formParams.phone"></el-input>
        </el-form-item>
      </div>

      <div>
        <el-form-item label="单位名称" prop="weidept">
          <el-input v-model="formParams.weidept"></el-input>
        </el-form-item>

        <el-form-item label="职务">
          <el-input v-model="formParams.position"></el-input>
        </el-form-item>

        <el-form-item label="住宅电话">
          <el-input v-model="formParams.hometel"></el-input>
        </el-form-item>

        <el-form-item label="职责">
          <el-input v-model="formParams.duty"></el-input>
        </el-form-item>
      </div>
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
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import {
  SucModal,
  SucForm,
  SucFormItem,
  SucInput,
  SucSelect,
  SucDatePicker,
} from "@suc/ui";
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
export default class YjModal1 extends Vue {
  areaOptions: any = [];

  rules = {
    principal: [{ required: true, message: "请输入姓名", trigger: "blur" }],
    weidept: [{ required: true, message: "请输入单位名称", trigger: "blur" }],
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

  // 行政区域
  mounted() {
    this.getAreaCode(); //获取行政区域
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
      height: 300px;
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

.form {
  display: flex;
  div {
    flex: 1;
    margin-right: 5px;
  }
}
</style>
