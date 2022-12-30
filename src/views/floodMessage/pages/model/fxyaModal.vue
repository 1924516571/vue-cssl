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
      class="form scroll"
    >
      <el-form-item label="所属年月">
        <suc-date-picker
          v-model="formParams.belongTime"
          :options="{
            type: 'year',
            clearable: true,
            placeholder: '请选择年月',
          }"
          style="width: 100%"
        ></suc-date-picker>
      </el-form-item>

      <el-form-item label="预案等级">
        <suc-select
          v-model="formParams.yaLevel"
          :options="yaOptions"
          :config="{
            clearable: true,
            filterable: true,
          }"
          style="width: 100%"
        >
        </suc-select>
      </el-form-item>

      <el-form-item label="防汛预案名称">
        <el-input v-model="formParams.fxyamc"></el-input>
      </el-form-item>

      <el-form-item label="通报人" prop="dutyer">
        <el-input disabled v-model="user.departmentName"></el-input>
      </el-form-item>

      <el-form-item label="预案描述">
        <el-input type="textarea" v-model="formParams.remark"></el-input>
      </el-form-item>

      <el-form-item label="文件上传" prop="imgPath1">
        <el-upload
          class="upload-demo"
          :on-success="PicSuccess"
          action="api/wjBaseServer/minio/file/upload"
          :on-remove="handleRemove"
          :on-preview="handlePreview"
          :before-upload="beforeUpload"
          :file-list="formParams.imgList"
          accept=".pdf,"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">请上传PDF文件</div>
        </el-upload>
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
export default class FxyaModal extends Vue {
  ryOptions: any = [];
  yaOptions: any = [
    { label: "一级预案", value: "一级预案" },
    { label: "二级预案", value: "二级预案" },
    { label: "三级预案", value: "三级预案" },
  ];
  user: any = JSON.parse(localStorage.getItem("userInfo") || "");
  rules = {
    department: [{ required: true, message: "请选择科室", trigger: "change" }],
    // dutyer: [{ required: true, message: "请选择值班人员", trigger: "change" }],
  };
  @Prop() title!: string;
  @Prop() loading!: boolean; //控制加载
  @Prop() model!: boolean; //控制弹框显隐
  @Prop({ type: Object, default: () => {} }) formParams!: any; //新增接口需要的参数
  @Emit()
  async onSubmit() {
    this.formParams.userId = this.user.id;
    this.formParams.departemtId = this.user.departmentId;
  }
  @Emit()
  toggle(val: boolean) {
    return val;
  }

  handlePreview(file: any) {
    const Imgurl = file.response.data.previewUrl;
    window.open(Imgurl);
  }

  PicSuccess(file: any) {
    this.formParams.minIoFileList.push({
      fileName: file.data.object,
      fileId: file.data.fileId,
      fileType: file.data.fileType,
      oldName: file.data.oldName,
    });
    
  }

  //  图片大小限制
  async beforeUpload(file: any) {
    let types = ["application/pdf"];
    const isImage = types.includes(file.type);
    if (!isImage) {
      this.$message.error("上传图片只能是 PDF格式!");
    }
  }

  async handleRemove(file: any, fileList: any) {
    var id = file.response.data.fileId;
    this.formParams.minIoFileList = this.formParams.minIoFileList.filter(
      (item: any) => item.fileId != id
    );
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
</style>
