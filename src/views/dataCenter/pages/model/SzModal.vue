<template>
  <!-- 河道弹框新增组件-->
  <el-dialog :title="title" :visible.sync="model" close-on-click-modal:false :before-close="onCancel" v-if="model">
    <el-form :model="formParams" :rules="rules" ref="yinjForm" label-width="auto" size="small">
      <el-form-item label="市镇别" prop="town">
        <suc-select v-model="formParams.town" :options="townListData" :config="{ placeholder: '市(镇)别', clearable: true }" style="width:100%"> </suc-select>
      </el-form-item>
      <el-form-item label="所在村社区" prop="village">
        <suc-select v-model="formParams.village" :options="villageListData" :config="{ placeholder: '所在村社区', clearable: true }" style="width:100%"> </suc-select>
      </el-form-item>

      <el-form-item label="所在联圩">
        <el-input v-model="formParams.lwmc"></el-input>
      </el-form-item>
      <el-form-item label="所在河道">
        <el-input v-model="formParams.river"></el-input>
      </el-form-item>
      <el-form-item label="水闸名称">
        <el-input v-model="formParams.zhamc"></el-input>
      </el-form-item>
      <el-form-item label="水闸类型">
        <suc-select v-model="formParams.shuizhatype" :options="shuizhatypeData" :config="{ placeholder: '所在村社区', clearable: true }" style="width:100%"> </suc-select>
      </el-form-item>
      <el-form-item label="水闸孔数">
        <el-input v-model="formParams.zhaks" type="number"></el-input>
      </el-form-item>
      <el-form-item label="单孔净宽（m）">
        <el-input v-model="formParams.dkwid" type="number"></el-input>
      </el-form-item>
      <el-form-item label="闸孔断面高度（m）">
        <el-input v-model="formParams.zkhei" type="number"></el-input>
      </el-form-item>
      <el-form-item label="闸门高度（m）" type="number">
        <el-input v-model="formParams.zhahei"></el-input>
      </el-form-item>
      <el-form-item label="闸门宽度(m)" type="number">
        <el-input v-model="formParams.zhawid"></el-input>
      </el-form-item>

      <el-form-item label="闸门类型">
        <el-input v-model="formParams.zhatype"></el-input>
      </el-form-item>
      <el-form-item label="闸门材料">
        <el-input v-model="formParams.zhacl"></el-input>
      </el-form-item>
      <el-form-item label="启闭机类型">
        <el-input v-model="formParams.octype"></el-input>
      </el-form-item>
      <el-form-item label="启闭机型号">
        <el-input v-model="formParams.qbjtype"></el-input>
      </el-form-item>
      <el-form-item label="总占地面积（m²）">
        <el-input v-model="formParams.allarea" type="number"></el-input>
      </el-form-item>
      <el-form-item label="新建时间或改建">
        <el-date-picker v-model="formParams.gjtime" type="year" placeholder="选择年" value-format="yyyy"> </el-date-picker>
      </el-form-item>
      <el-form-item label="看管人">
        <el-input v-model="formParams.kgr"></el-input>
      </el-form-item>
      <el-form-item label="看管人电话">
        <el-input v-model="formParams.tel" type="number"></el-input>
      </el-form-item>
      <el-form-item label="产权归属">
        <el-input v-model="formParams.gs"></el-input>
      </el-form-item>
      <el-form-item label="建设单位">
        <el-input v-model="formParams.jsdw"></el-input>
      </el-form-item>
      <el-form-item label="现状管理模式">
        <el-input v-model="formParams.xzgl"></el-input>
      </el-form-item>
      <el-form-item label="纬度">
        <el-input v-model="formParams.jd"></el-input>
      </el-form-item>
      <el-form-item label="经度">
        <el-input v-model="formParams.wd"></el-input>
      </el-form-item>

      <el-form-item label="农桥照片">
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
          <el-button class="upload_btn" size="small" type="primary"><span class="iconfont icon-shangchuan"></span>点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件,且不超过5MB</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="备注">
        <el-input type="textarea" v-model="formParams.bz" placeholder="请输入内容" style="width:100%;" :rows="5"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onOk">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { State, Mutation, namespace } from "vuex-class";
import { SucModal, SucForm, SucFormItem, SucInput, SucSelect, SucDatePicker } from "@suc/ui";
import { ModalConfig } from "@suc/ui/interfaces";
import { SelectOptions } from "@suc/ui/interfaces";
import { infoApi, publicApi } from "@/api";
import { coordinateTransform } from "@suc/monch";
import { LoadingCom } from "@/components";
// import { Form } from "element-ui";
import arrowPng from "@/assets/arrow.png";
const mapStore = namespace("mapStore");
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
export default class CreatePolluters1 extends Vue {
  townListData: any = []; //市镇列表
  townListData2: any = [];
  villageListData: any = [];

  shuizhatypeData: any = [
    { value: "防洪闸", label: "防洪闸" },
    { value: "套闸", label: "套闸" },
    { value: "节制闸", label: "节制闸" },
    { value: " 分级闸", label: "分级闸" },
  ];
  rules = {
    bh: [
      { required: true, message: "请输入编号", trigger: "blur" },
      { min: 0, max: 12, message: "长度在12个字符", trigger: "blur" },
    ],
    town: [{ required: true, message: "请选择市镇级别", trigger: "change" }],
    village: [{ required: true, message: "请选择村社区", trigger: "change" }],
    name: [{ required: true, message: "请输入河道名称", trigger: "blur" }],
    // 穿梭框验证规则

    // manholeDepth: [{ type: "number", message: "窨井必须为数字值", tigger: "blur" }],
    // waterDepth: [{ type: "number", message: "水深必须为数值", tigger: "blur" }],
  };
  // @Prop() dialogVisible!: boolean;    //测试

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

  onOk() {
    (this.$refs["yinjForm"] as any).validate((valid: any) => {
      if (valid) {
        this.onSubmit();
      } else {
        return false;
      }
    });
  }
  onCancel() {
    this.toggle(false);
    (this.$refs["yinjForm"] as any).resetFields();
  }

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
