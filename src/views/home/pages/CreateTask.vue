<template>
  <!-- 新建事件 -->
  <suc-modal
    :config="config"
    :value="model"
    @on-visible-change="toggleModel"
    @on-ok="setTask"
    @on-cancel="toggleModel(false)"
  >
    <div class="content">
      <suc-form @validate="onValidate" :config="{ 'label-width': 100 }">
        <suc-form-item :config="{ label: '任务编号：' }">
          <suc-input
            style="width: 98%"
            v-model="formParams.rwbh"
            :disabled="true"
            placeholder="20200003040 自动生成不可改"
          ></suc-input>
        </suc-form-item>
        <suc-form-item :config="{ label: '发布人：' }">
          <suc-input
            style="width: 98%"
            v-model="user.account"
            :disabled="true"
            placeholder="系统账号识别不可改"
          ></suc-input>
        </suc-form-item>
        <suc-form-item :config="{ label: '任务名称：' }">
          <suc-input style="width: 98%" v-model="formParams.rwmc"></suc-input>
        </suc-form-item>
        <suc-form-item :config="{ label: '任务类型：' }">
          <suc-select
            style="width: 98%"
            v-model="formParams.rwlx"
            :config="{
              clearable: true,
              filterable: true,
              'label-in-value': true,
            }"
          >
            <i-option v-for="item in rwlxOptions" :key="item.value" :value="item.value">{{
              item.label
            }}</i-option>
          </suc-select>
        </suc-form-item>
        <suc-form-item :config="{ label: '片区选择：' }">
          <suc-select
            style="width: 98%"
            v-model="formParams.pqid"
            :config="{
              clearable: true,
              filterable: true,
              'label-in-value': true,
            }"
          >
            <i-option v-for="item in pqOptions" :key="item.value" :value="item.value">{{
              item.label
            }}</i-option>
          </suc-select>
        </suc-form-item>
        <suc-form-item :config="{ label: '接收人：' }" class="accOpt">
          <treeselect
            :clearable="true"
            :searchable="true"
            :disable-branch-nodes="true"
            :options="accOptions"
            :limit="4"
            :max-height="200"
            v-model="formParams.jsrid"
            style="width: 98%"
          />
        </suc-form-item>
        <suc-form-item :config="{ label: '抄送人：' }" class="accOpt">
          <treeselect
            :multiple="true"
            :clearable="true"
            :disable-branch-nodes="true"
            :searchable="true"
            :options="accOptions"
            :limit="4"
            :max-height="200"
            v-model="formParams.cc"
            style="width: 98%"
          />
        </suc-form-item>

        <suc-form-item :config="{ label: '任务描述：' }">
          <suc-input
            style="width: 98%"
            v-model="formParams.rwms"
            type="textarea"
          ></suc-input>
        </suc-form-item>
        <suc-form-item :config="{ label: '上传附件：' }">
          <div class="file-btn">
            <input type="file" multiple @change="getFile" />
            <div class="file-btn-item">
              <span class="iconfont icon-shangchuan"></span>
              <span>点击上传</span>
            </div>
          </div>
        </suc-form-item>
        <suc-form-item :config="{ label: '相关监测点：' }">
          <suc-input style="width: 98%" v-model="formParams.jcdmc"></suc-input>
        </suc-form-item>
        <suc-form-item :config="{ label: '任务位置：' }">
          <suc-input
            style="width: 98%"
            v-model="formParams.rwwz"
            placeholder="请输入地点"
          ></suc-input>
        </suc-form-item>
        <suc-form-item :config="{ label: '经纬度：' }">
          <suc-input
            style="width: 98%"
            v-model="coordstring"
            placeholder="在地图中点击显示经纬度，或输入经度,纬度"
            @on-change="getcoord"
          ></suc-input>
        </suc-form-item>
        <suc-form-item>
          <div v-if="model" style="width: 98%; height: 159px">
            <template>
              <suc-map
                ref="mapObject"
                :options="olMap.map"
                v-bind.sync="olMap.map.view"
                @singleclick-blank="clickBlank"
              >
                <template>
                  <ol-layer
                    v-for="(layer, index) in olMap.baseLayer"
                    :options="layer"
                    :key="'layer' + index"
                  ></ol-layer>
                </template>
                <ol-markers>
                  <ol-marker
                    v-for="(marker, index) in markers"
                    :options="marker"
                    :key="'marker' + index"
                  ></ol-marker>
                </ol-markers>
              </suc-map>
            </template>
          </div>
        </suc-form-item>
      </suc-form>
    </div>
    <loading-com :loadingShow="loadingShow"></loading-com>
  </suc-modal>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { State, Mutation, Action, namespace } from "vuex-class";
import {
  SucModal,
  SucButton,
  SucForm,
  SucFormItem,
  SucInput,
  SucSelect,
  IOption,
  SucRadio,
  SucRadioGroup,
} from "@suc/ui";
import { FormItemConfig, ValidateResult } from "@suc/ui/interfaces";
import { ModalConfig } from "@suc/ui/interfaces";
import { SelectConfig, SelectOptions } from "@suc/ui/interfaces";
import { RadioConfig, RadioGroupConfig } from "@suc/ui/interfaces";

import { floodManageApi, taskApi } from "@/api";
import { LoadingCom } from "@/components";
const mapStore = namespace("mapStore");
import Treeselect from "@riophae/vue-treeselect";
import { coordinateTransform } from "@suc/monch";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

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
    Treeselect,
    LoadingCom,
    // Upload,
    // MapManage
  },
})
export default class CreateTask extends Vue {
  olMap: any = this.$getMapConfig();
  @State user: any;
  @State issues: any; //获取创建任务事件formParams
  @Prop() model!: boolean;
  loadingShow: boolean = false;
  a: String = "";
  radioGroupValue: string = "apple";
  radioGroupOption: RadioGroupConfig = {
    vertical: true,
  };
  config: ModalConfig = {
    transfer: false,
    title: "新建事件",
    width: 640,
  };

  @Emit()
  toggleModel(val: boolean) {
    this.init();
  }
  markers: any = [];
  test = "";
  formParams: any = {
    cc: [], // 抄送人
    file: [],
    jcdid: "", // 监测点
    jcdlx: "",
    jcdmc: "",
    jd: "",
    jsrid: null, // 接收人id
    pqid: "", // 片区id
    rwbh: "", // 任务编号
    rwlx: "", //任务类型
    rwmc: "", // 任务名称
    rwms: "", // 任务描述
    rwwz: "", //任务位置
    wd: "",
  };

  coordstring: string = "";

  onValidate(ev: ValidateResult) {
    console.log(ev);
  }
  accOptions: any = [];
  //获取接收人
  async getReceiver() {
    this.accOptions = [];
    let data = await floodManageApi.getListReceiver1();
    if (data.data && data.data.length > 0) {
      data.data.forEach((it: any, index: any) => {
        it.ID = "小组" + it.ID;
        if (it.ryList.length > 0) {
          this.accOptions.push({
            id: it.ID,
            label: it.MC,
            children: [],
          });
          it.ryList.forEach((res: any) => {
            this.accOptions[index].children.push({
              id: res.UID,
              label: res.DISPLAYNAME,
            });
          });
        }
      });
    }
  }

  files: any = [];
  // 文件
  getFile(file: any) {
    this.files = file.target.files;
  }
  pqOptions: SelectOptions = []; //片区

  rwlxOptions: SelectOptions = []; //任务类型
  async getType() {
    let data = await taskApi.getType();
    this.rwlxOptions = data.map((item: any) => {
      return {
        value: item,
        label: item,
      };
    });
  }
  // 片区
  async getPq() {
    this.pqOptions = [];
    let data = await taskApi.getPq();
    this.pqOptions = data.map((e: any) => {
      let item = {
        value: e[0],
        label: e[1],
      };
      return item;
    });
  }

  // 任务编号
  async getNum() {
    let data = await taskApi.getNum();
    this.formParams.rwbh = data;
  }
  // 点击地图获取经纬度
  clickBlank(info: any) {
    this.markers = [];
    this.formParams.jd = info.coords[0];
    this.formParams.wd = info.coords[1];
    // this.formParams.coord = info.coord
    this.coordstring = info.coords[0] + "," + info.coords[1];
    this.markers.push({ lon: info.coords[0], lat: info.coords[1] });
  }
  getcoord(e: any) {
    this.markers = [];
    let value = e.target.value;
    let lon = value.split(",")[0];
    let lat = value.split(",")[1];
    this.markers.push({ lon: lon, lat: lat });
    this.formParams.jd = lon;
    this.formParams.wd = lat;
    this.getLocation([lon, lat]);
  }
  //地图定位
  getLocation(coords: any) {
    const mapRoot: any = this.$refs.mapObject;
    if (mapRoot) {
      const tranPosN = coordinateTransform(coords, "EPSG:4326", "EPSG:3857");
      mapRoot.$view.animate({
        center: tranPosN,
        zoom: 18,
      });
    }
  }

  init() {
    let form = this.issues.formParams;
    for (let key in form) {
      this.$set(this.formParams, key, form[key]);
    }
    this.markers = [];
    this.$nextTick(() => {
      if (this.$utils.validCoords(form.jd, form.wd)) {
        this.coordstring = form.jd + "," + form.wd;
        this.markers.push({ lon: form.jd, lat: form.wd });
        this.getLocation([form.jd, form.wd]);
      } else {
        this.coordstring = "";
      }
    });
  }
  mounted() {
    this.init();
    this.getType();
    this.getPq();
    this.getNum();
    this.getReceiver();
  }
  // 点击确定
  @Emit()
  async setTask() {
    this.loadingShow = true;
    let url = "";
    let that = this;
    let arr: any = [];
    let params = {};
    let formdata: any = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      formdata.append("file", this.files[i]);
    }

    url = "jnsw/newtask/createTask";
    params = that.formParams;

    const taskData = await taskApi.createTask(params, formdata, url);
    if (taskData.rwid) {
      this.$Message.info("新建事件成功");
    } else {
      this.$Message.info("新建事件失败");
    }
    await that.toggleModel(false);
    this.loadingShow = false;
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 462px;
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
