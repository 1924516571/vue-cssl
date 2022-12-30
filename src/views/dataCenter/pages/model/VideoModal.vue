<template>
  <el-dialog :title="title" :visible.sync="model" :close-on-click-modal="true" :before-close="onCancel" v-if="model">
    <el-form :model="formParams" :rules="rules" ref="yinjForm" label-width="auto" size="small">
      <!-- <el-form-item label="视频点编号" prop="zdbh">
        <el-input v-model="formParams.zdbh" :disabled="title == '新增' ? false : true"></el-input>
      </el-form-item> -->
      <el-form-item label="视频点名称:">
        <el-input v-model="formParams.spdmc"></el-input>
      </el-form-item>
      <el-form-item label="一级目录:">
        <el-input v-model="formParams.splb"></el-input>
      </el-form-item>
      <el-form-item label="二级目录:">
        <el-input v-model="formParams.spdwz"></el-input>
      </el-form-item>
      <el-form-item label="设备编号:">
        <el-input v-model="formParams.sply"></el-input>
      </el-form-item>
      <el-form-item label="通道ID:">
        <el-input v-model="formParams.sjid"></el-input>
      </el-form-item>
      <el-form-item label="通道号:">
        <el-input v-model="formParams.tdh"></el-input>
      </el-form-item>
      <el-form-item label="视频码流:">
        <el-select v-model="formParams.ml" placeholder="请选择" style="width:100%" @change="changeSelect">
          <el-option v-for="item in typeOpt" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="IP地址（带端口号）:">
        <el-input v-model="formParams.ip"></el-input>
      </el-form-item>
      <!-- <el-form-item label="经度:">
        <el-input  type="number" v-model="formParams.lon"></el-input>
      </el-form-item>
      <el-form-item label="纬度:">
        <el-input type="number" v-model="formParams.lat"></el-input>
      </el-form-item> -->
      <el-form-item label="大屏x轴偏移量(带百分号)">
        <el-input type="number" v-model="formParams.xoffset">
          <!-- <i v-if="isIcon" style="font-size:20px" slot="suffix">%</i> -->
        </el-input>
      </el-form-item>
      <el-form-item label="大屏y轴偏移量(带百分号)">
        <el-input v-model="formParams.yoffset"></el-input>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input type="textarea" v-model="formParams.nt"></el-input>
      </el-form-item>

      <!-- <el-form-item label="视频来源">
        <el-input v-model="formParams.sply"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="视频点位置">
        <el-input v-model="formParams.spdwz"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="泵站名称">
        <suc-select v-model="formParams.bzbm" :options="chuan" :config="{ placeholder: '泵站名称', clearable: true }" style="width:100%"></suc-select>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onOk()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { State, Mutation, namespace } from "vuex-class";
import { SucModal, SucForm, SucFormItem, SucInput, SucSelect } from "@suc/ui";
import { infoApi } from "@/api";
const mapStore = namespace("mapStore");
@Component({
  components: {
    SucModal,
    SucForm,
    SucFormItem,
    SucInput,
    SucSelect,
  },
})
export default class CreatePolluters1 extends Vue {
  showValue: any = "";
  hiddenValue: any = "";
  // isIcon: boolean = true;

  // 接收父组件传过来的值
  @Prop() areaOptions!: any;
  @Prop() chuan!: any;
  olMap = this.$getMapConfig();
  typeOpt: any = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
  ];
  rules = {
    // zdbh: [{ required: true, message: "请输入站点编号", trigger: "blur" }],
  };
  @Prop() title!: string;
  @Prop() loading!: boolean; //控制加载
  @Prop() model!: boolean; //控制弹框显隐
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
  @Emit()
  async onSubmit() {}
  @Emit()
  toggle(val: boolean) {
    return val;
  }

  // //input  聚焦
  // handleFocus(event: any) {
  //   this.isIcon = false;
  //   this.$emit("focus", event);
  // }

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
  async handleChange(value: any) {
    this.formParams.azqy = value.toString();
  }

  markers: any[] = [];
  // 点击地图获取经纬度
  clickBlank(info: any) {
    this.markers = [];
    this.formParams.location = info.coords[0] && info.coords[1] ? info.coords[0] + "," + info.coords[1] : "";
    this.formParams.lgtd = info.coords[0];
    this.formParams.lttd = info.coords[1];

    if (info.coords[0] && info.coords[1]) {
      this.markers.push({ lon: info.coords[0], lat: info.coords[1] });
    }
  }
  getcoord(e: any) {
    this.markers = [];
    let value = e.target.value;
    let lon = value.split(",")[0];
    let lat = value.split(",")[1];
    if (lon && lat) {
      this.markers.push({ lon: lon, lat: lat });
    }
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
      height: 600px;
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
