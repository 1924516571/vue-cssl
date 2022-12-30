<template>
  <!-- 水质测站弹框组件-->
  <el-dialog :title="title" :visible.sync="model" :close-on-click-modal="true" :before-close="onCancel" v-if="model">
    <el-form :model="formParams" :rules="rules" ref="yinjForm" label-width="auto" size="small">
      <el-form-item label="测站编码" prop="stcd">
        <el-input v-model="formParams.stcd" :disabled="title == '新增' ? false : true"></el-input>
      </el-form-item>
      <el-form-item label="测站名称" prop="stnm">
        <el-input v-model="formParams.stnm"></el-input>
      </el-form-item>
      <el-form-item label="设备编号">
        <el-input v-model="formParams.tmdzdbh"></el-input>
      </el-form-item>
      <el-form-item label="测站类型" prop="sttp">
        <el-select v-model="formParams.sttp" placeholder="请选择测站类型" style="width:100%" @change="changeSelect">
          <el-option v-for="item in typeSttp" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="警戒水位(m)" v-if="Isdisplay">
        <el-input type="number" v-model="formParams.jjsw"></el-input>
      </el-form-item>

      <el-form-item label="大屏x轴偏移量(带百分号)">
        <el-input v-model="formParams.xoffset"></el-input>
      </el-form-item>
      <el-form-item label="大屏y轴偏移量(带百分号)">
        <el-input v-model="formParams.yoffset"></el-input>
      </el-form-item>

      <!-- <el-form-item label="流域名称">
        <el-input v-model="formParams.bsnm"></el-input>
      </el-form-item>
      <el-form-item label="水系名称">
        <el-input v-model="formParams.hnnm"></el-input>
      </el-form-item>
      <el-form-item label="河流名称">
        <el-input v-model="formParams.rvnm"></el-input>
      </el-form-item>
      <el-form-item label="站址">
        <el-input v-model="formParams.stlc"></el-input>
      </el-form-item>

      <el-form-item label="建站年月">
        <el-date-picker v-model="formParams.esstym" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="timestamp"> </el-date-picker>
      </el-form-item>
      <el-form-item label="撤站年月">
        <el-date-picker v-model="formParams.wdstym" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="timestamp"> </el-date-picker>
      </el-form-item> -->
      <slot name="map">
        <el-form-item label="经纬度">
          <suc-input style="width: 100%" v-model="formParams.location" @on-change="getcoord"></suc-input>
        </el-form-item>
        <el-form-item>
          <div style="width:100%;height:259px" v-if="model">
            <template>
              <suc-map ref="mapObject" :options="olMap.map" v-bind.sync="olMap.map.view" @singleclick-blank="clickBlank">
                <template>
                  <ol-layer v-for="(layer, index) in olMap.baseLayer" :options="layer" :key="'layer' + index"> </ol-layer>
                </template>
                <ol-markers>
                  <ol-marker v-for="(marker, index) in markers" :options="marker" :key="'marker' + index"></ol-marker>
                </ol-markers>
              </suc-map>
            </template>
          </div>
        </el-form-item>
      </slot>
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
import { coordinateTransform } from "@suc/monch";
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
  // 接收父组件传过来的值
  //   @Prop() areaOptions!: any;
  @Prop() centerOption!: any;
  olMap = this.$getMapConfig();
  rules = {
    sttp: [{ required: true, message: "请选择测站类型", trrigger: "change" }],
    stcd: [
      { required: true, message: "请输入测站编码", trigger: "blur" },
      { max: 20, message: "编码长度不能超过20位" },
    ],
    stnm: [{ required: true, message: "请输入测站名称", trigger: "blur" }],
  };
  @Prop() title!: string;
  @Prop() loading!: boolean; //控制加载
  @Prop() model!: boolean; //控制弹框显隐
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
  Isdisplay: boolean = false;
  typeSttp: any = [
    {
      value: "ZZ",
      label: "水位站",
    },
    {
      value: "PP",
      label: "雨量站",
    },
  ];
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
  @Watch("formParams.sttp", { immediate: true })
  changeSelect(value: any) {
    if (value == "ZZ") {
      this.Isdisplay = true;
    } else {
      this.Isdisplay = false;
    }
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
  mounted() {
    // this.getCenter();
    // console.log(this.olMap,"<<<");
    // this.olMap.map.view.center.coord = this.centerOption;
  }

  getCenter() {
    // this.olMap.map.view.center.coord = [120.75225, 31.65374];
  }
  getcoord(e: any) {
    this.markers = [];
    let value = e.target.value;
    let lon = value.split(",")[0];
    let lat = value.split(",")[1];
    if (lon && lat) {
      this.markers.push({ lon: lon, lat: lat });
    }
    this.getLocation([lon, lat]);
  }
  @Watch("formParams", { immediate: true, deep: true })
  getMap() {
    this.markers = [];
    if (this.formParams.location != undefined) {
      let arr = this.formParams.location.split(",");
      let lon = arr[0];
      let lat = arr[1];
      this.markers.push({
        lon,
        lat,
      });
      this.getLocation([lon, lat]);
    }
  }
  //地图定位
  getLocation(coords: any) {
    // const maps: any = this.$refs.maps;
    const mapRoot: any = this.$refs.mapObject;
    const tranPosN = coordinateTransform(coords, "EPSG:4326", "EPSG:3857");
    mapRoot.$view.animate({
      center: tranPosN,
      zoom: 18,
    });
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
