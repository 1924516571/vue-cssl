<template>
  <!-- 河道弹框新增组件-->
  <el-dialog :title="title" :visible.sync="model" close-on-click-modal:false :before-close="onCancel" v-if="model">
    <el-form :model="formParams" :rules="rules" ref="yinjForm" label-width="auto" size="small">
      <el-form-item label="河流编码" prop="rvCd">
        <el-input v-model="formParams.rvCd" :disabled="title == '新增' ? false : true"></el-input>
      </el-form-item>
      <el-form-item label="河道名称" prop="rvNm">
        <el-input v-model="formParams.rvNm"></el-input>
      </el-form-item>
      <el-form-item label="市镇别">
        <suc-select v-model="formParams.town" :options="townListData" :config="{ placeholder: '市(镇)别', clearable: true }" style="width:100%" @on-change="townChange"> </suc-select>
      </el-form-item>
      <el-form-item label="所在村社区">
        <suc-select v-model="formParams.village" :options="villageListData" :config="{ placeholder: '所在村社区', clearable: true }" style="width:100%"> </suc-select>
      </el-form-item>

      <el-form-item label="河道长度(km)" prop="hlcd">
        <el-input v-model.number="formParams.hlcd" placeholder="河道长度" type="number"></el-input>
      </el-form-item>

      <el-form-item label="河口宽度">
        <el-input v-model.number="formParams.hkkd" placeholder="河口宽度" type="number"></el-input>
      </el-form-item>

      <el-form-item label="河底宽度">
        <el-input v-model.number="formParams.hdkd" placeholder="河底宽度" type="number"></el-input>
      </el-form-item>

      <el-form-item label="河道平均口宽(m)">
        <el-input v-model.number="formParams.hdaverage" placeholder="河道平均口宽" type="number"></el-input>
      </el-form-item>

      <el-form-item label="土壤类型">
        <el-input v-model="formParams.trlx" placeholder="土壤类型"></el-input>
      </el-form-item>

      <el-form-item label="坡比">
        <el-input v-model="formParams.pb" placeholder="坡比"></el-input>
      </el-form-item>

      <el-form-item label="底高程">
        <el-input v-model.number="formParams.dgc" placeholder="底高程" type="number"></el-input>
      </el-form-item>

      <el-form-item label="水塘面积(m2)">
        <el-input v-model.number="formParams.starea" placeholder="水塘面积" type="number"></el-input>
      </el-form-item>

      <el-form-item label="水塘水面积(m2)">
        <el-input v-model.number="formParams.waterarea" placeholder="水塘水面积" type="number"></el-input>
      </el-form-item>

      <el-form-item label="淤积深度(m)">
        <el-input v-model.number="formParams.yjsd" placeholder="淤积深度" type="number"></el-input>
      </el-form-item>

      <el-form-item label="淤积量(m3)">
        <el-input v-model.number="formParams.yjl" placeholder="淤积量" type="number"></el-input>
      </el-form-item>

      <el-form-item label="水质等级">
        <el-input v-model="formParams.waterlevel" placeholder="水质等级"></el-input>
      </el-form-item>

      <el-form-item label="地形">
        <el-input v-model="formParams.dx" placeholder="地形"></el-input>
      </el-form-item>
      <el-form-item label="河道照片">
        <el-upload
          class="upload-demo"
          :on-success="PicSuccess"
          action="api/wjBaseServer/minio/file/upload"
          :on-remove="handleRemove"
          :on-preview="handlePreview"
          :before-upload="beforeUpload"
          :on-exceed="handleExceed"
          :file-list="formParams.imgList"
          list-type="picture"
          accept=".jpg, .jpeg, .png, .JPG, .JPEG,"
          size="small"
          :limit="2"
        >
          <!-- <el-button class="upload_btn" size="small" type="primary"><span class="iconfont icon-shangchuan"></span>点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件,且不超过5MB</div> -->
        </el-upload>
      </el-form-item>

      <el-form-item label="备注">
        <el-input type="textarea" v-model="formParams.bz" placeholder="请输入内容" style="width:100%;" :rows="5"></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { State, Mutation, namespace } from "vuex-class";
import { SucModal, SucForm, SucFormItem, SucInput, SucSelect } from "@suc/ui";
import { infoApi, publicApi } from "@/api";
import { LoadingCom } from "@/components";
const mapStore = namespace("mapStore");
@Component({
  components: {
    SucModal,
    SucForm,
    SucFormItem,
    SucInput,
    SucSelect,
    LoadingCom,
  },
})
export default class CreatePolluters1 extends Vue {
  townListData: any = []; //市镇列表
  townListData2: any = [];
  villageListData: any = [];
  rules = {
    rvCd: [
      { required: true, message: "请输入河道编码", trigger: "blur" },
      { min: 0, max: 12, message: "长度在12个字符", trigger: "blur" },
    ],
    rvNm: [{ required: true, message: "请输入河道名称", trigger: "blur" }],
  };
  @Prop() title: string | undefined; //  父组件传子组件的值
  @Prop() loading!: boolean; //控制加载
  @Prop() model!: boolean; //控制弹框显隐
  @Prop({ type: Object, default: () => {} })
  @Prop()
  formParams!: any;
  @Emit()
  async onSubmit() {}
  @Emit()
  toggle(val: boolean) {
    return val;
  }

  onCancel() {
    this.toggle(false);
    (this.$refs["yinjForm"] as any).resetFields();
  }
  // 行政区域
  mounted() {
    this.getTownData(); //获取市镇级别
  }

  async getTownData() {
    let url = "wjServer/dataCenter/tFcBengZhan/getTownList";
    let data = await publicApi.getNoParam(url);
    this.townListData2 = data.data;
    this.townListData = data.data.map((e: any) => {
      return {
        value: e.townname,
        label: e.townname,
      };
    });
  }

  @Watch("formParams.town", { immediate: true, deep: true })
  townChange(val: any) {
    var id = "";
    for (let index = 0; index < this.townListData2.length; index++) {
      if (this.townListData2[index].townname == val) {
        id = this.townListData2[index].id;
      }
    }
    let url = "wjServer/dataCenter/tFcBengZhan/getVillageList";
    publicApi.getWithParam(url, { townId: id }).then((data: any) => {
      this.villageListData = data.data.map((e: any) => {
        return {
          value: e.valligename,
          label: e.valligename,
        };
      });
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

  //限制上传图片的数量
  handleExceed(files: any) {
    this.$message.warning("最多选择两张图片");
  }
  // 成功
  PicSuccess(file: any) {
    this.formParams.minIoFileList.push({ fileName: file.data.object, fileId: file.data.fileId, fileType: file.data.fileType, oldName: file.data.oldName });
  }
  //  预览
  handlePreview(file: any) {
    const Imgurl = file.response.data.previewUrl;
    window.open(Imgurl);
  }
  // 删除
  handleRemove(file: any, fileList: any) {
    var id: any = "";
    if (file.response.data.fileId) {
      id = file.response.data.fileId;
    } else {
      id = file.uid;
    }
    this.formParams.minIoFileList = this.formParams.minIoFileList.filter((item: any) => item.fileId != id); //数组过滤
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
    }
  }
}

::v-deep.el-input--small .el-input__inner {
  margin: 3px 0;
}
::v-deep .upload-demo {
  .el-upload-list .el-upload-list--picture {
    .el-upload-list__item {
      width: 300px;
    }
  }
}
</style>
