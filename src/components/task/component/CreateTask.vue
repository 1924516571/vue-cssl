<template>
  <el-dialog :title="title" :visible.sync="model" :modal-append-to-body="false" close-on-click-modal:false :before-close="onCancel" v-if="model">
    <div class="content scroll">
      <el-form :model="formParams" ref="shForm" label-width="auto" size="small">
        <el-form-item label="处理时间">
          <el-input v-model="time" :disabled="true" placeholder="系统账号识别不可改"></el-input>
        </el-form-item>

        <el-form-item label="处理人">
          <el-input v-model="userInfo.roleName" :disabled="true" placeholder="系统账号识别不可改"></el-input>
        </el-form-item>

        <el-form-item label="所属组织">
          <el-input v-model="userInfo.areaCode" :disabled="true" placeholder="系统账号识别不可改"></el-input>
        </el-form-item>

        <el-form-item :label="clfsTitleName">
          <el-switch @change="clfsChange" v-model="formParams.clfs"> </el-switch>
        </el-form-item>

        <el-form-item :label="remarkTitleName">
          <el-input v-model="formParams.content" placeholder="请填写说明" type="textarea"> </el-input>
        </el-form-item>

        <el-form-item :label="picTitleName" prop="imgPath1">
          <el-upload
            class="upload-demo"
            :on-success="PicSuccess"
            action="api/wjBaseServer/minio/file/upload"
            :on-remove="handleRemove"
            :on-preview="handlePreview"
            :before-upload="beforeUpload"
            :file-list="formParams.imgList"
            list-type="picture"
            accept=".jpg, .jpeg, .png, .JPG, .JPEG,"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5MB</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" v-if="!formParams.clfs" @click="onOk()">提交</el-button>
      <el-button type="primary" v-if="formParams.clfs" @click="onOk(2)">完成</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { SucModal, SucButton, SucForm, SucFormItem, SucInput, SucSelect, IOption, SucRadio, SucRadioGroup } from "@suc/ui";
import { infoApi } from "@/api";

@Component({
  components: {
    SucModal,
    SucForm,
    SucFormItem,
    SucButton,
    SucInput,
    SucSelect,
    IOption,
    SucRadio,
    SucRadioGroup,
  },
})
export default class CreateTask extends Vue {
  @Prop() model!: boolean;
  @Prop() list!: any;
  @Prop() title!: any;
  time: any = "";
  userInfo: any = JSON.parse(localStorage.getItem("userInfo") || "");
  formParams: any = {
    minIoFileList: [],
    clfs: false,
    handleType: "",
  };

  clfsTitleName: string = "处理方式(上报)";
  picTitleName: string = "添加图片";
  remarkTitleName: string = "说明";

  mounted() {
    let nowDate = new Date();
    this.time = nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate();
  }

  clfsChange(val: any) {
    if (val) {
      this.clfsTitleName = "处理方式(自处理)";
      this.picTitleName = "处理图片";
      this.remarkTitleName = "处理措施";
    } else {
      this.clfsTitleName = "处理方式(上报)";
      this.picTitleName = "添加图片";
      this.remarkTitleName = "说明";
    }
  }

  onCancel() {
    this.toggleModel(false);
    this.formParams = {};
    (this.$refs["shForm"] as any).resetFields();
  }

  handlePreview(file: any) {
    const Imgurl = file.response.data.previewUrl;
    window.open(Imgurl);
  }

  PicSuccess(file: any) {
    console.log("88", file);
    this.formParams.minIoFileList.push({
      fileName: file.data.object,
      fileId: file.data.fileId,
      fileType: file.data.fileType,
      oldName: file.data.oldName,
    });
  }

  //  图片大小限制
  async beforeUpload(file: any) {
    let types = ["image/jpeg", "image/jpg", "image/png"];
    const isImage = types.includes(file.type);
    if (!isImage) {
      this.$message.error("上传图片只能是 JPG、JPEG、PNG 格式!");
    }
    const isLt2M = file.size / 1024 / 1024 < 5; //这里做文件大小限制
    if (!isLt2M) {
      this.$message.error("上传图片大小不能超过5MB!");
      return isLt2M;
    }
  }

  async handleRemove(file: any, fileList: any) {
    var id = file.response.data.fileId;
    this.formParams.minIoFileList = this.formParams.minIoFileList.filter((item: any) => item.fileId != id);
  }

  onOk(status: any) {
    (this.$refs["shForm"] as any).validate((valid: any) => {
      if (valid) {
        if (this.formParams.clfs) {
          this.formParams.handleType = "2";
        } else {
          this.formParams.handleType = "";
        }
        this.formParams.problemId = this.list.baseInfo.problemCode;
        this.formParams.handleType = status;
        this.formParams.userId = this.userInfo.id;
        console.log("kanzheli66", this.formParams);
        let url = "wjServer/hs/taskFlow/approveInfo";
        infoApi.oncreate(this.formParams, url).then((data: any) => {
          if (data.result == true) {
            this.$SucMessage.info(status == 2 ? "审核成功" : "提交成功");

            this.onSubmit();
          } else {
		   this.$SucMessage.info(status == 2 ? "审核失败" : "提交失败");
          }
        });
      } else {
        return false;
      }
    });
  }

  // 点击确定
  @Emit()
  async onSubmit() {}

  @Emit()
  async toggleModel(val: boolean) {
    return val;
  }
}
</script>

<style lang="scss" scoped>
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
      height: 600px;
      overflow-y: auto;
    }
    .el-dialog__footer {
      border-top: 1px solid #e8eaec;
    }
  }
}
.content {
  height: 362px;
  width: 100%;
  overflow: auto;
}
$deep: "::v-deep";
#{$deep}.accOpt.ivu-form-item {
  .ivu-form-item-content {
    line-height: normal;
  }
}
</style>
