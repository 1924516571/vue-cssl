<template>
  <!-- 联圩弹框-->
  <el-dialog :title="title" :visible.sync="model" close-on-click-modal:false :before-close="onCancel" v-if="model">
    <el-form :model="formParams" :rules="rules" ref="yinjForm" label-width="auto" size="small">
      <el-row class="table">
        <el-col :span="12">
          <div class="desc" style="color:red">市（镇）别</div>
          <div class="cont"><suc-select :options="townListData" :config="{ clearable: true }" v-model="formParams.town" style="width:100%" size="mini"></suc-select></div>
        </el-col>
        <el-col :span="12">
          <div class="desc" style="color:red">所属区域</div>
          <div class="cont"><suc-input v-model="formParams.area" style="width:100%" size="mini"></suc-input></div>
        </el-col>
        <el-col :span="12">
          <div class="desc" style="color:red">联圩名称</div>
          <div class="cont"><suc-input v-model="formParams.lwmc" style="width:100%" size="mini"></suc-input></div>
        </el-col>
        <el-col :span="12">
          <div class="desc" style="color:red">联圩类型</div>
          <div class="cont"><suc-input v-model="formParams.lwtype" style="width:100%" size="mini"></suc-input></div>
        </el-col>

        <el-col :span="4">
          <div class="desc ts">联圩总面积(亩)</div>
        </el-col>
        <el-col :span="20">
          <div class="desc">合计</div>
          <div class="cont"><suc-input v-model="formParams.total" style="width:100%" size="mini" type="number"></suc-input></div>
        </el-col>
        <el-col :span="20">
          <div class="desc">小计</div>
          <div class="cont"><suc-input v-model="formParams.gdxj" style="width:100%" size="mini" type="number"></suc-input></div>
        </el-col>
        <el-col :span="20">
          <div class="desc">水田</div>
          <div class="cont"><suc-input v-model="formParams.st" style="width:100%" size="mini" type="number"></suc-input></div>
        </el-col>
        <el-col :span="20">
          <div class="desc">旱田</div>
          <div class="cont"><suc-input v-model="formParams.ht" style="width:100%" size="mini" type="number"></suc-input></div>
        </el-col>
        <el-col :span="20">
          <div class="desc">水面积</div>
          <div class="cont"><suc-input v-model.number="formParams.sarea" style="width:100%" size="mini" type="number"></suc-input></div>
        </el-col>
        <el-col :span="20">
          <div class="desc">鱼池</div>
          <div class="cont"><suc-input v-model="formParams.yc" style="width:100%" size="mini"></suc-input></div>
        </el-col>
        <el-col :span="20">
          <div class="desc">其他</div>
          <div class="cont"><suc-input v-model="formParams.gdother" style="width:100%" size="mini"></suc-input></div>
        </el-col>

        <el-col :span="4">
          <div class="desc ts" style="height:210px;line-height:210px">其中</div>
        </el-col>
        <el-col :span="20">
          <div class="desc">小计</div>
          <div class="cont"><suc-input v-model="formParams.areaxj" style="width:100%" size="mini" type="number"></suc-input></div>
        </el-col>
        <el-col :span="20">
          <div class="desc">2.5米以下</div>
          <div class="cont"><suc-input v-model="formParams.areaa" style="width:100%" size="mini" type="number"></suc-input></div>
        </el-col>
        <el-col :span="20">
          <div class="desc">2.51~3.0</div>
          <div class="cont"><suc-input v-model="formParams.areab" style="width:100%" size="mini" type="number"></suc-input></div>
        </el-col>
        <el-col :span="20">
          <div class="desc">3.01~3.5</div>
          <div class="cont"><suc-input v-model="formParams.areac" style="width:100%" size="mini" type="number"></suc-input></div>
        </el-col>
        <el-col :span="20">
          <div class="desc">3.51~4.0</div>
          <div class="cont"><suc-input v-model.number="formParams.aread" style="width:100%" size="mini" type="number"></suc-input></div>
        </el-col>
        <el-col :span="20">
          <div class="desc">4.01以上</div>
          <div class="cont"><suc-input v-model="formParams.areae" style="width:100%" size="mini" type="number"></suc-input></div>
        </el-col>

        <el-col :span="4">
          <div class="desc ts" style="height:72px;line-height:72px">防洪圩堤</div>
        </el-col>
        <el-col :span="20">
          <div class="desc">总长(km)</div>
          <div class="cont"><suc-input v-model="formParams.totallen" style="width:100%" size="mini" type="number"></suc-input></div>
        </el-col>
        <el-col :span="20">
          <div class="desc">其中达标(km)</div>
          <div class="cont"><suc-input v-model="formParams.db" style="width:100%" size="mini" type="number"></suc-input></div>
        </el-col>

        <el-col :span="24">
          <div class="desc">排涝站数量(座)</div>
          <div class="cont"><suc-input v-model="formParams.plnum" style="width:100%" size="mini" type="number"></suc-input></div>
        </el-col>
        <el-col :span="24">
          <div class="desc">排涝动力(kw)</div>
          <div class="cont"><suc-input v-model="formParams.pldl" style="width:100%" size="mini" type="number"></suc-input></div>
        </el-col>
        <el-col :span="24">
          <div class="desc">排涝流量(m³/s)</div>
          <div class="cont"><suc-input v-model="formParams.plll" style="width:100%" size="mini" type="number"></suc-input></div>
        </el-col>


         <el-col :span="4">
          <div class="desc ts"  style="height:108px;line-height:108px">圩区三闸</div>
        </el-col>
        <el-col :span="20">
          <div class="desc">小计(座)</div>
          <div class="cont"><suc-input v-model="formParams.wqxj" style="width:100%" size="mini" type="number"></suc-input></div>
        </el-col>
        <el-col :span="20">
          <div class="desc">套闸(座)</div>
          <div class="cont"><suc-input v-model="formParams.tz" style="width:100%" size="mini" type="number"></suc-input></div>
        </el-col>
         <el-col :span="20">
          <div class="desc">防洪闸(座)</div>
          <div class="cont"><suc-input v-model="formParams.fhz" style="width:100%" size="mini" type="number"></suc-input></div>
        </el-col>

        
        <el-col :span="24">
          <div class="desc">圩内最低田面(m)</div>
          <div class="cont"><suc-input v-model="formParams.zdsw" style="width:100%" size="mini" type="number"></suc-input></div>
        </el-col>
        <el-col :span="24">
          <div class="desc">预降水位(m)</div>
          <div class="cont"><suc-input v-model="formParams.yjsw" style="width:100%" size="mini" type="number"></suc-input></div>
        </el-col>
        <el-col :span="24">
          <div class="desc">脱险水位(m)</div>
          <div class="cont"><suc-input v-model="formParams.txsw" style="width:100%" size="mini" type="number"></suc-input></div>
        </el-col>
       <el-col :span="24">
          <div class="desc">控制水位(m)</div>
          <div class="cont"><suc-input v-model="formParams.kzsw" style="width:100%" size="mini" type="number"></suc-input></div>
        </el-col>

       <el-col :span="24">
          <div class="desc">尚有活络坝(条)</div>
          <div class="cont"><suc-input v-model="formParams.syhl" style="width:100%" size="mini" type="number"></suc-input></div>
        </el-col>

        <el-col :span="24">
          <div class="desc bz">备注</div>
          <div class="cont bz"><suc-input v-model="formParams.bz" style="width:100%;height:100%" type="textarea"></suc-input></div>
        </el-col>
      </el-row>
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
import { SucModal, SucForm, SucFormItem, SucInput, SucSelect } from "@suc/ui";
import { ModalConfig } from "@suc/ui/interfaces";
import { SelectOptions } from "@suc/ui/interfaces";
import { infoApi, publicApi } from "@/api";
import { coordinateTransform } from "@suc/monch";
import { LoadingCom } from "@/components";
// import { Form } from "element-ui";
import arrowPng from "@/assets/arrow.png";
import { selectMcByType } from "../../../../api/assessment/plan";
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
  lwTypeData: any[] = [
    {
      value: "半高田",
      label: "半高田",
    },
    {
      value: "低洼",
      label: "低洼",
    },
    {
      value: "圩内",
      label: "圩内",
    },
    {
      value: "沿江联圩",
      label: "沿江联圩",
    },
  ];
  rules = {
    rvCd: [
      { required: true, message: "请输入河道编码", trigger: "blur" },
      { min: 0, max: 12, message: "长度在12个字符", trigger: "blur" },
    ],
    rvNm: [{ required: true, message: "请输入河道名称", trigger: "blur" }],
    // 穿梭框验证规则
    // xzqy: [{ required: true, message: "请选择区域", trigger: "change" }],
    // manholeDepth: [{ type: "number", message: "窨井必须为数字值", tigger: "blur" }],
    // waterDepth: [{ type: "number", message: "水深必须为数值", tigger: "blur" }],
  };
  // @Prop() dialogVisible!: boolean;    //测试

  @Prop() title: string | undefined; //  父组件传子组件的值
  @Prop() loading!: boolean; //控制加载
  @Prop() model!: boolean; //控制弹框显隐
  @Prop({ type: Object, default: () => {} })
  // formParams!: any; //新增接口需要的参数
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

.aa {
  display: flex;
}

.table {
  // margin-bottom: 30px;
  #{$deep} .suc-input .ivu-input {
    border: none;
    width: 100%;
  }

  #{$deep} .suc-select .ivu-select .ivu-select-selection {
    margin-bottom: 3px;
    border: none;
  }
  .desc {
    text-align: center;
    display: inline-block;
    border: 1px solid #ebeef5;
    height: 36px;
    line-height: 36px;
    width: 120px;
    vertical-align: top;
    color: #909399;
    margin-bottom: -1px;
    background: #fafafa;
  }

  .cont {
    border: 1px solid #ebeef5;
    height: 36px;
    line-height: 36px;
    width: calc(100% - 120px);
    display: inline-block;
    vertical-align: top;
    margin-bottom: -1px;
  }
  .ts {
    height: 246px;
    line-height: 246px;
  }
  .bz {
    height: 96px;
    line-height: 96px;
  }
}
</style>
