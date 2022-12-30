<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="quxiao" width="30%" :close-on-click-modal="true">
    <el-form :model="formParams" >
      <el-form-item label="计划名称">
        <el-input v-model="formParams.planMc"></el-input>
      </el-form-item>
      <el-form-item label="养护区域" >
        <suc-select v-model="formParams.area" :options="planAreaData" :config="{ placeholder: '养护区域', clearable: true }" style="width:100%" @on-change="getAreaId"></suc-select>
      </el-form-item>
      <el-form-item label="泵站名称" >
        <suc-select v-model="formParams.object" :options="engData" :config="{ placeholder: '养护泵站', clearable: true }" style="width:100%"></suc-select>
      </el-form-item>
      <el-form-item label="养护模板" >
        <suc-select v-model="formParams.templateId" :options="maintainTempData" :config="{ placeholder: '养护模块', clearable: true }" style="width:100%"></suc-select>
      </el-form-item>

      <el-form-item label="养护单位" >
        <suc-select v-model="formParams.ywdw" :options="maintainUnitData" :config="{ placeholder: '养护单位', clearable: true }" style="width:100%"></suc-select>
      </el-form-item>

      <el-form-item label="上报人">
        <el-input v-model="formParams.id" :disabled="true"></el-input>
        <el-input v-model="formParams.reporter" v-show="false"></el-input>
      </el-form-item>
      <!-- <el-form-item label="养护人">
        <el-input v-model="formParams.yhUser"></el-input>
      </el-form-item> -->
      <el-form-item label="周期" >
        <suc-select v-model="formParams.cycle" :options="planCycleData" :config="{ placeholder: '计划周期', clearable: true }" style="width:100%"></suc-select>
      </el-form-item>
      <el-form-item label="有效期">
        <suc-date-picker v-model="formParams.starttime" :options="{ type: 'datetime' }"></suc-date-picker>
        <span>-</span>
        <suc-date-picker v-model="formParams.overtime" :options="{ type: 'datetime' }"></suc-date-picker>
      </el-form-item>
      <!-- <slot name="map">
        <el-form-item label="经纬度">
          <el-input style="width: 100%" v-model="formParams.location" @on-change="getcoord"></el-input>
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
      </slot> -->
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { State, Mutation, namespace } from "vuex-class";
import { SucModal, SucForm, SucFormItem, SucInput, SucSelect,SucDatePicker } from "@suc/ui";
import { infoApi } from "@/api";
const mapStore = namespace("mapStore");

@Component({
  components: {
    SucModal,
    SucForm,
    SucFormItem,
    SucInput,
    SucSelect,
    SucDatePicker
  },
})
export default class DetailPolluters extends Vue {
  olMap = this.$getMapConfig();
  @Prop() title!: string;
  @Prop() dialogVisible!: boolean;
  @Prop() modal!: boolean; //控制弹框显隐
    @Prop() engData!: any;

  quxiao() {
    this.$emit("toggle1");
  }

  @Prop({ type: Object, default: () => {} })
  test!: any; //
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数

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

  mounted() {
    this.olMap.map.view.center.coord = [120.27869688218249, 31.685617674794585];
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
