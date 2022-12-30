<template>
  <el-dialog :title="title" :visible.sync="model1" :close-on-click-modal="true" :before-close="onCancel" v-if="model1">
    <el-form :model="formParams1" :rules="rules" ref="kqForm" label-width="auto" size="small" class="form scroll">
      <el-form-item label="出入库类型:" prop="type">
        <suc-select v-model="formParams1.type" :options="crkTypeOptions" @on-change="changeCrkType" style="width: 100%"> </suc-select>
      </el-form-item>
      <el-form-item label="市(镇)别:">
        <suc-input style="width: 100%" value="常熟市虞山街道" readonly></suc-input>
      </el-form-item>
      <el-form-item :label="text">
        <el-date-picker v-model="formParams1.ioTime" type="datetime" placeholder="选择开始时间" style="width:100%" @change="getTime"> </el-date-picker>
      </el-form-item>
      <el-form-item label="所属仓库:" prop="ckid">
        <suc-select v-model="formParams1.ckid" :options="allCkmcOptions" @on-change="getValue" style="width: 100%"> </suc-select>
      </el-form-item>
      <el-form-item label="物资名称:" prop="wzuuid">
        <suc-select v-model="formParams1.wzuuid" :options="allWzmcList" style="width: 100%" @on-change="getWzdw"> </suc-select>
      </el-form-item>
      <el-form-item label="登记人:">
        <suc-input style="width: 100%" v-model="user.realname" readonly></suc-input>
      </el-form-item>
      <el-form-item :label="crkNumber" prop="num">
        <suc-input v-model="formParams1.num" style="margin-right:10px"></suc-input>
        <suc-input v-model="danwei" style="width:5%;" readonly></suc-input>
      </el-form-item>

      <el-form-item label="说明:">
        <suc-input v-model="formParams1.instructions" type="textarea" style="width: 100%"></suc-input>
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
  wzOptions: any = [];
  text: any = "时间:";
  crkNumber: string = "数量:";
  crkTypeOptions: any = [
    { value: "出库", label: "出库" },
    { value: "入库", label: "入库" },
  ];
  user: any = JSON.parse(localStorage.getItem("userInfo") || "");
  allCkmcOptions: any = [];
  allWzmcList: any = [];
  danwei: any = "";
  @Prop() loading!: boolean; //控制加载
  @Prop() title: any;
  @Prop() model1!: boolean; //控制弹框显隐
  @Prop() formParams1!: any; //新增接口需要的参数

  rules = {
    type: [{ required: true, message: "请选择出入库类型", trigger: "change" }],
    ckid: [{ required: true, message: "请选择仓库名称", trigger: "change" }],
    wzuuid: [{ required: true, message: "请选择物资名称", trigger: "change" }],
    num: [{ required: true, message: "请输入物资数量", trigger: "blur" }],
  };
  @Emit()
  async onSubmit() {}
  @Emit()
  toggle1(val: boolean) {
    return val;
  }

  onOk() {
    (this.$refs["kqForm"] as any).validate((valid: any) => {
      if (valid) {
        this.onSubmit();
      } else {
        return false;
      }
    });
  }

  changeCrkType(val: any) {
    if (val == "出库") {
      this.text = "出库时间:";
      this.crkNumber = "出库数量";
    } else {
      this.text = "入库时间:";
      this.crkNumber = "入库数量";
    }
  }

  onCancel() {
    this.toggle1(false);
    (this.$refs["kqForm"] as any).resetFields();
  }

  // 行政区域
  mounted() {
    this.getWz();
    this.getAllCkmc(); //所有仓库名称
  }
  cklistParams: any = {
    ckmc: "",
    areaCode: "",
  };
  async getAllCkmc() {
    let url = "wjServer/dataCeter/wareHouse/getCKList";
    let data = await publicApi.getWithParam(url, this.cklistParams);
    if (data.result) {
      this.allCkmcOptions = data.data.map((e: any) => {
        let item = {
          value: e.ckid,
          label: e.ckmc,
        };
        return item;
      });
    } else {
      this.$message.error("获取数据失败");
    }
  }

  aa: any = [];
  async getValue(val: any) {
    let url = "wjServer/dataCenter/wuzi/list";
    let data = await publicApi.getWithParam(url, { ckId: val });
    this.aa = data.data;
    if (data.result) {
      this.allWzmcList = data.data.map((e: any) => {
        return {
          value: e.uuid,
          label: e.name,
        };
      });
    }
  }

  getWzdw(val: any) {
    for (let index = 0; index < this.aa.length; index++) {
      if (this.aa[index].uuid == val) {
        this.danwei = this.aa[index].dw;
        return;
      }
    }
  }
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
  //   时间转换
  getTime() {
    this.formParams1.ioTime = this.$utils.dateFormat(new Date(this.formParams1.ioTime), "yyyy-MM-dd HH:mm:ss");
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
</style>
