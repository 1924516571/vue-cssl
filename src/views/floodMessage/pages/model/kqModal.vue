<template>
  <el-dialog :title="title" :visible.sync="model1" close-on-click-modal:false :before-close="onCancel" v-if="model1">
    <el-form :model="formParams2" ref="kqForm" :rules="rules" label-width="auto" size="medium" class="form scroll">
      <el-form-item label="应急响应类型">
        <suc-select v-model="formParams2.type"  @on-change="getLevel1" :options="xytypeOptions"  style="width: 100%"> </suc-select>
      </el-form-item>
      <el-form-item label="预警等级">
        <suc-select v-model="dangerLevel"  :options="levelOptions"  style="width: 100%"> </suc-select>
      </el-form-item>
      <el-form-item label="启动条件">
        <el-checkbox-group v-model="formParams2.condition" v-for="list in tjOptions"  :key="list" size="medium" style="width: 100%;">
          <el-checkbox   size="medium"   border style="display:block;margin-bottom:10px;" :label="list"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="响应行动">
        <el-input type="textarea" readonly v-model="formParams2.responseStr" :autosize="{ minRows: 10, maxRows: 10}"></el-input>
      </el-form-item>
      <el-form-item label="通知">
        <el-input type="textarea" v-model="formParams2.tongzhi" size="medium"></el-input>
      </el-form-item>

      <el-form-item label="成员单位">
        <el-input v-model="formParams2.cydw" size="medium"></el-input>
      </el-form-item>
       <el-form-item label="启动时间"  prop="editDate">
          <el-date-picker v-model="formParams2.editDate" type="datetime"   format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择开始时间" style="width:100%" @change="getTime"> </el-date-picker>
       </el-form-item>

        <el-form-item label="文件上传">
        <el-upload
          class="upload-demo"
          :on-success="PicSuccess"
          action="api/wjBaseServer/minio/file/upload"
          :on-remove="handleRemove"
          :on-preview="handlePreview"
          :before-upload="beforeUpload"
          :file-list="formParams2.imgList"
          :on-exceed="handleExceed"
          accept=".pdf,"
          :limit="1"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">请上传PDF文件</div>
        </el-upload>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onOk()">确 定</el-button>
    </div>
  </el-dialog>
</template>""
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { SucModal, SucForm, SucFormItem, SucInput, SucButton, SucSelect, SucDatePicker } from "@suc/ui";
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
  xytypeOptions: any = [
    { value: "0", label: "防汛抗旱应急预案" },
    { value: "1", label: "防台风应急预案" },
  ];
  tjOptions: any = [];
  tjcheckList: any = [];
  xdcheckList: any = [];
  wzOptions: any = [];
  ryOptions: any = [];
  dangerLevel: any = "";
  @Prop() loading!: boolean; //控制加载
  @Prop({type:String,default:"0"}) activeIndex!: any;
  @Prop() title: any;
  @Prop() model1!: boolean; //控制弹框显隐
  @Prop() formParams2!: any; //新增接口需要的参数
  @Emit()
  async onSubmit() {}
  @Emit()
  toggle1(val: boolean) {
    return val;
  }

  rules:any = {
       editDate: [{ required: true, message: "请选择时间", trigger: "change" }],
  }

  //不直接给riverCode、dangerLevel使用formParams1是因为直接使用formParams1对象会导致选择时多执行一次监听导致数据丢失
  // get value() {
  //   return {
  //     dangerLevel: this.dangerLevel,
  //   };
  // }

  @Watch("formParams2.dangerLevel")
  getInfo() {
    this.getLevel1();
    this.dangerLevel = this.formParams2.dangerLevel;
  }

  @Watch("dangerLevel")
  async getMes() {    
    this.tjOptions = [];
    this.formParams2.duanxin = "";
    this.formParams2.responseStr = "";
    this.formParams2.cydw="";
    // this.formParams2.tongzhi = ""
    let url = "wjServer/fangxunjc/ermanager/getContentList";
    let data = await publicApi.getWithParam(url, {
      type: this.activeIndex,
      dangerLevel: this.dangerLevel,
    });
    this.tjOptions = data.data.condition.map((e: any) => {
      return e;
    });
    this.formParams2.duanxin = data.data.duanxin;
    this.formParams2.responseStr = data.data.responseStr;
    this.formParams2.condition = data.data.condition;
    this.formParams2.cydw = data.data.cydw;
    if(this.title=='启动'){
       this.formParams2.editDate = this.$utils.dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss");
    }
  }

//时间转换
  getTime() {
    this.formParams2.editDate = this.$utils.dateFormat(new Date(this.formParams2.editDate), "yyyy-MM-dd HH:mm:ss");
  }

  onOk() {
    (this.$refs["kqForm"] as any).validate((valid: any) => {
      if (valid) {
        this.formParams2.dangerLevel = this.dangerLevel;
        this.onSubmit();
      } else {
        return false;
      }
    });
  }

  onCancel() {
    this.dangerLevel = "";
    this.formParams2.dangerLevel = "";
    this.toggle1(false);
    (this.$refs["kqForm"] as any).resetFields();
  }
  savaImage:any = ""
  PicSuccess(file: any) {
    this.formParams2.minIoFileList.push({
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
    handlePreview(file: any) {
    const Imgurl = file.response.data.previewUrl;
    window.open(Imgurl);
  }
    async handleRemove(file: any, fileList: any) {      
    var id = file.response.data.fileId;
    this.formParams2.minIoFileList = this.formParams2.minIoFileList.filter(
      (item: any) => item.fileId != id
    );
  }
  handleExceed(){
    this.$message.warning("只能上传一个")
  }

  mounted() {
    // this.getLevel();
    this.getWz();
    this.getRy();
  }
  

  async getLevel1() {
   this.dangerLevel = ""
    let url = "wjServer/fangxunjc/ermanager/dangerType";
    let data = await publicApi.getWithParam(url, {
      type: this.formParams2.type,
    });
    this.levelOptions = data.data.map((e: any) => {
      let item = {
        value: e.code,
        label: e.name,
      };
      return item;
    });
  }
  // async getLevel() {
  //   let url = "wjServer/fangxunjc/ermanager/dangerType";
  //   let data = await publicApi.getWithParam(url, { type: this.activeIndex });
  //   this.levelOptions = data.data.map((e: any) => {
  //     let item = {
  //       value: e.code,
  //       label: e.name,
  //     };
  //     return item;
  //   });
  // }

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
$deep:"::v-deep";
::v-deep.el-dialog__wrapper {
  .el-dialog {
    width:60%;
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
    .lineForm {
      display: inline-block;
      width: calc(100% - 87px);
      margin-bottom: -10px;
      margin-right: 10px;
    }
    .el-checkbox {
      margin-left: 0;
      margin-right: 0;
    }
  }
}

::v-deep.el-input--small .el-input__inner {
  margin: 3px 0;
}

#{$deep}.el-form{
        .el-form-item{
          .el-form-item__label-wrap{
            .el-form-item__label{
               font-size: 20px;
            }
          }
        }
       
  }
  #{$deep}.el-textarea{
    .el-textarea__inner{
       font-size: large;
       color: #000000;
    }
  }
  
#{$deep}.el-checkbox__input {
   	display: inline-grid;
    white-space: pre-line;
    word-wrap: break-word;
    overflow: hidden;
    line-height: 20px;
}
#{$deep}.el-checkbox{
  .el-checkbox__input.is-checked+.el-checkbox__label{
       font-size: 17px;
    }
 .el-checkbox__label{
    white-space: pre-line;
    display: inline-grid;
    word-wrap: break-word;
    overflow: hidden;
   }
}
#{$deep}.el-checkbox.is-bordered.el-checkbox--medium{
   height: 45px;
}

</style>
