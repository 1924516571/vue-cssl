<template>
  <!-- 新建事件 -->
  <el-dialog title="新建事件" :visible.sync="model" close-on-click-modal:false :before-close="onCancel" v-if="model">
    <div class="content scroll">
      <el-form :model="formParams" ref="taskForm" label-width="auto" :rules="rules" size="small">
        <el-form-item label="任务名称" prop="problemName">
          <el-input v-model="formParams.problemName" placeholder="请输入任务名称" style="width: 98%"> </el-input>
        </el-form-item>

        <el-form-item label="任务类型" prop="taskType">
          <suc-select
            v-model="formParams.taskType"
            :options="taskOptions"
            :config="{
              clearable: true,
            }"
            style="width: 98%"
          >
          </suc-select>
        </el-form-item>

        <el-form-item label="对象类型" prop="engType">
          <suc-select
            v-model="formParams.engType"
            :options="objectTypeData"
            :config="{ placeholder: '对象类型', clearable: false, filterable: true }"
            style="width:100%"
            @on-change="getYhobj"
          ></suc-select>
        </el-form-item>

        <el-form-item label="对象名称" prop="objectName">
          <div class="view-action-box">
            <el-select popper-class="elselect" v-model="formParams.objectName" value-key="item" placeholder="请选择" @change="handleCommissioer" clearable filterable style="width:100%">
              <el-option v-for="(item, idx) of engData" :key="idx" :label="item.objectName" :value="item" />
            </el-select>
          </div>
        </el-form-item>

        <!-- <el-form-item label="站点名称">
          <suc-select
            v-model="formParams.engCode"
            :options="stationOptions"
            @on-change="
              (val) => {
                getJWd(val);
              }
            "
            :config="{
              clearable: true,
            }"
            style="width: 98%"
          >
          </suc-select>
        </el-form-item> -->

        <!-- <el-form-item label="设备">
          <suc-select
            v-model="formParams.deviceType"
            :options="sbOptions"
            :config="{
              clearable: true,
            }"
            style="width: 98%"
          >
          </suc-select>
        </el-form-item> -->

        <el-form-item label="上报人">
          <el-input v-model="userInfo.realname" placeholder="系统账号识别不可改" disabled readonly style="width:98%"></el-input>
        </el-form-item>

        <el-form-item label="处理人">
          <!-- <el-input v-model="userInfo.roleName" :disabled="true" placeholder="系统账号识别不可改"></el-input> -->
          <suc-select
            v-model="formParams.receiver"
            :options="receiverOptions"
            :config="{
              clearable: true,
            }"
            style="width: 98%"
          >
          </suc-select>
        </el-form-item>

        <el-form-item label="养护模板">
          <suc-select
            v-model="formParams.yhmbId"
            :options="yhOptions"
            :config="{
              clearable: true,
            }"
            style="width: 98%"
            @on-change="changeType"
          >
          </suc-select>
        </el-form-item>
        <el-form-item label="养护内容">
          <el-input v-model="yhnr" placeholder="养护内容" style="width: 98%" readonly> </el-input>
        </el-form-item>
        <el-form-item label="位置">
          <el-input style="width: 98%" v-model="formParams.address"> </el-input>
        </el-form-item>
        <el-form-item label="任务描述">
          <el-input style="width: 98%" v-model="formParams.content" type="textarea"> </el-input>
        </el-form-item>
        <el-form-item label="问题照片" prop="imgPath1">
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

        <!-- <el-form-item label="位置" >
					<el-input 
						style="width: 98%"
						v-model="formParams.address"
						placeholder="请输入地点"
					>
					</el-input>
				</el-form-item> -->

        <!-- <slot name="map">
          <el-form-item label="经纬度">
            <suc-input style="width: 100%" v-model="formParams.location" @on-change="getcoord"></suc-input>
          </el-form-item>

          <el-form-item>
            <div style="width:100%;height:259px">
              <template>
                <suc-map ref="mapObject" :options="olMap.map" v-bind.sync="olMap.map.view">
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
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onOk()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { State, Mutation, Action, namespace } from "vuex-class";
import { SucModal, SucButton, SucForm, SucFormItem, SucInput, SucSelect, IOption, SucRadio, SucRadioGroup } from "@suc/ui";
import { SelectConfig, SelectOptions } from "@suc/ui/interfaces";
import { coordinateTransform } from "@suc/monch";
import { infoApi, taskApi, publicApi } from "@/api";
import login from "../../views/Login.vue";

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
  olMap: any = this.$getMapConfig();
  @Prop() taskOptions!: any;
  @Prop() model!: boolean;
  @Prop() loading!: boolean; //控制加载
  rules = {
    problemName: [{ required: true, message: "请输入任务名称", trigger: "blur" }],
    taskType: [{ required: true, message: "请选择任务类型", trigger: "change" }],
    engType: [{ required: true, message: "请选择对象类型", trigger: "change" }],
    objectName: [{ required: true, message: "请选择对象名称", trigger: "change" }],
    // templateId: [{ required: true, message: "请选择养护单位", trigger: "change" }],
    // ywdw: [{ required: true, message: "请输入养护单位", trigger: "change" }],
    // reporter: [{ required: true, message: "请输入上报人", trigger: "blur" }],
    // cycle: [{ required: true, message: "请选择周期", trigger: "change" }],
    // time:[{required: true, message: "请选择计划时间", trigger: "blur" }]
  };

  objectTypeData: any = []; //对象类型
  flag: boolean = true;
  userInfo: any = JSON.parse(localStorage.getItem("userInfo") || ""); //将json数据转换成js 对象
  // markers: any = [];
  test = "";
  myArea: any = ""; //  用户自定义区域
  formParams: any = {
    minIoFileList: [],
  };
  receiverOptions: any = []; //接收人数据
  coordstring: string = "";
  accOptions: any = [];
  // stationOptions: any = [];
  sbOptions: any = [];
  yhOptions: any = [];
  yhnrData: any = []; //根据任务类型获取养护内容
  yhnr: string = "";

  async mounted() {
    this.olMap.map.view.center.coord = [119.9395121120892, 31.703167754790485];
    // this.getStationList();
    // this.getSbList();
    this.getYhList();
    this.getReceiver();
    this.getobjType(); //获取对象类型
  }

  async getobjType() {
    const url = "wjServer/hs/plan/getObjectType";
    const data = await publicApi.getNoParam(url);
    if (data.result == true) {
      this.objectTypeData = data.data.map((item: any) => {
        return {
          value: item.code,
          label: item.level,
        };
      });
    } else {
      this.objectTypeData = [];
    }
  }

  engData: any = []; //养护对象数据
  async getYhobj(val: any) {
    const url = "wjServer/hs/plan/getObjectListByType";
    const data = await publicApi.getWithParam(url, { objectType: val });
    if (data.result == true) {
      this.engData = data.data;
    } else {
      this.engData = [];
    }
  }

  // 养护对象下拉事件
  async handleCommissioer(val: any) {
    this.formParams.objectName = val.objectName;
    this.formParams.object = val.objectCode;
    this.formParams.area = val.area;
    this.formParams.lat = val.lat;
    this.formParams.lon = val.lon;
  }

  async changeType(val: any) {
    let url = "wjServer/hs/template/getTemplateInfo";
    let params = {
      templateId: val,
    };
    const { data } = await infoApi.getWithParam(url, params);
    let a: any = [];
    let b = data.yhnrList;
    b.forEach((item: any, index: any) => {
      a.push(item.mc);
    });
    const s = a.toString();
    this.yhnr = s;
    this.$set(this.formParams, "yhnr", s);
  }

  onCancel() {
    this.toggleModel(false);
    this.formParams = {};
    (this.$refs["taskForm"] as any).resetFields(); //表单重置
  }

  // getJWd(val: any, b: any) {
  //   for (let i = 0; i < this.stationOptions.length; i++) {
  //     if (val == this.stationOptions[i].value) {
  //       this.clickBlank({ coords: this.stationOptions[i].jwd });
  //     } else {
  //     }
  //   }
  // }

  handlePreview(file: any) {
    const Imgurl = file.response.data.previewUrl;
    window.open(Imgurl);
  }

  PicSuccess(file: any) {
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

  async onOk() {
    (this.$refs["taskForm"] as any).validate((valid: any) => {
      if (valid) {
        this.loading = true;
        // this.formParams.area = this.userInfo.diyPq !== null ? this.userInfo.diyPq : this.myArea; //用户的自定义区域
        this.formParams.reporter = this.userInfo.id;
        // this.formParams.receiver=this.userInfo.id;
        let url = "wjServer/hs/taskFlow/addInfo";
        infoApi.oncreate(this.formParams, url).then((data: any) => {
          if (data.result == true) {
            this.$SucMessage.info("新增成功");
            this.onSubmit(); //新增完重新刷新列表
          } else {
            this.$SucMessage.error(data.desc);
            this.loading = false;
            // alert(data.desc);
          }
        });
      } else {
        return false;
      }
    });
    this.formParams = {};
  }

  // @Watch("formParams", { immediate: true, deep: true })
  // getMap() {
  //   this.markers = [];
  //   if (this.formParams.location != undefined) {
  //     let arr = this.formParams.location.split(",");
  //     let lon = arr[0];
  //     let lat = arr[1];
  //     this.markers.push({
  //       lon,
  //       lat,
  //     });
  //     this.getLocation([lon, lat]);
  //   } else {
  //     this.olMap.map.view.center.coord = [120.27869688218249, 31.685617674794585];
  //     // this.olMap.baseLayer = [120.27869688218249, 31.685617674794585];
  //     this.getLocation([120.27869688218249, 31.685617674794585]);
  //   }
  // }
  //  获取接收人
  getReceiver() {
    let url = "wjServer/hs/taskFlow/getReceiverList";
    let params = {
      userId: this.userInfo.id,
      roleName: this.userInfo.roleName,
      diyPq: this.userInfo.diyPq !== null ? this.userInfo.diyPq : this.myArea,
    };
    infoApi.getWithParam(url, params).then((res: any) => {
      if (res.result == true) {
        let data = res.data;
        this.receiverOptions = data
          ? data.map((item: any) => {
              return {
                value: item.id,
                label: item.realname,
              };
            })
          : [];
      } else {
        this.$SucMessage.info(res.desc);
      }
    });
  }

  //获取站点列表
  // async getStationList() {
  //   // let url = "wjServer/task/field/getEngListByAreaCode";
  //   // infoApi
  //   //   .getWithParam(url, { areaCode: this.userInfo.areaCode })
  //   //   .then((res: any) => {
  //   //     let data = res.data;
  //   //     this.stationOptions = data
  //   //       ? data.map((item: any) => {
  //   //           return {
  //   //             label: item.engNameed,
  //   //             value: item.engCded,
  //   //             jwd: item.jwd,
  //   //           };
  //   //         })
  //   //       : [];
  //   //   })
  //   //   .catch((err: any) => {
  //   //     this.$SucMessage.error(err.data.message);
  //   //   });
  //   let bzParms = {
  //     areaCode: localStorage.getItem("areaCode"),
  //   };
  //   const url = "wjServer/dataCenter/baseinfo/bengzhan/getStationList";
  //   const data = await publicApi.getWithParam(url, bzParms);
  //   if ((data.result = true)) {
  //     this.stationOptions = data.data.map((e: any) => {
  //       return {
  //         value: e.bzbm,
  //         label: e.bzmc,
  //       };
  //     });
  //   } else {
  //     this.stationOptions = [];
  //     this.$SucMessage.error("获取失败");
  //   }
  // }

  //获取设备列表
  // async getSbList() {
  //   let url = "wjServer/hs/fault/getDeviceType";
  //   infoApi
  //     .getSelect(url)
  //     .then((res: any) => {
  //       let data = res.data;
  //       this.sbOptions = data
  //         ? data.map((item: any) => {
  //             return {
  //               label: item.level,
  //               value: item.code,
  //             };
  //           })
  //         : [];
  //     })
  //     .catch((err: any) => {
  //       this.$SucMessage.error(err.data.message);
  //     });
  // }

  //养护模块列表
  async getYhList() {
    let url = "wjServer/hs/template/getMyTemplateList";
    infoApi
      .getWithParam(url, { userId: this.userInfo.id, pageNumber: 1, pageSize: 10000 })
      .then((res: any) => {
        let data = res.data.rows;
        this.yhOptions = data
          ? data.map((item: any) => {
              return {
                label: item.name,
                value: item.id,
              };
            })
          : [];
      })
      .catch((err: any) => {
        this.$SucMessage.error(err.data.message);
      });
  }

  // 点击地图获取经纬度
  // clickBlank(info: any) {
  //   this.markers = [];
  //   this.formParams.lon = info.coords[0];
  //   this.formParams.lat = info.coords[1];
  //   this.formParams.location = info.coords[0] && info.coords[1] ? info.coords[0] + "," + info.coords[1] : "";
  //   if (info.coords[0] && info.coords[1]) {
  //     this.markers.push({ lon: info.coords[0], lat: info.coords[1] });
  //   }
  // }
  // getcoord(e: any) {
  //   this.markers = [];
  //   let value = e.target.value;
  //   let lon = value.split(",")[0];
  //   let lat = value.split(",")[1];
  //   if (lon && lat) {
  //     this.markers.push({ lon: lon, lat: lat });
  //   }
  //   this.formParams["deviceVo.jd"] = lon;
  //   this.formParams["deviceVo.wd"] = lat;
  //   this.formParams.jd = lon;
  //   this.formParams.wd = lat;
  //   this.getLocation([lon, lat]);
  // }
  //地图定位
  // getLocation(coords: any) {
  //   const mapRoot: any = this.$refs.mapObject;
  //   const tranPosN = coordinateTransform(coords, "EPSG:4326", "EPSG:3857");
  //   mapRoot.$view.animate({
  //     center: tranPosN,
  //     zoom: 18,
  //   });
  // }

  // 点击确定
  @Emit()
  async onSubmit() {
  
  }

  @Emit()
  async toggleModel(val: boolean) {
    return val;
  }
}
</script>

<style lang="scss" scoped>
$deep: "::v-deep";
.elselect {
  // background: #122856;

  color: #fff !important;
  // border: 1px solid rgba(149, 190, 255, 0.32);
  .el-select-dropdown__item {
    color: #182b51 !important;
    font-size: 15px;
    font-weight: normal !important;
    // text-align: center;
  }
  // .el-select-dropdown__item.hover,
  // .el-select-dropdown__item:hover {
  //   background: #0c1a546b;
  // }
}
</style>
<style lang="scss" scoped>
// .content {
//   height: 600px;
//   width: 100%;
//   overflow-y:auto;
// }
// $deep: "::v-deep";
// #{$deep}.accOpt.ivu-form-item {
//   .ivu-form-item-content {
//     line-height: normal;
//   }
// }

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
</style>
