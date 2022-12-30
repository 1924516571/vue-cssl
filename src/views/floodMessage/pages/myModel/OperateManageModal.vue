<template>
  <!--运维单位计划上报弹框-->
  <el-dialog :title="title" :visible.sync="model" :close-on-click-modal="true" :before-close="onCancel">
    <el-form :model="formParams" :rules="rules" ref="yinjForm" label-width="auto" size="small">
      <el-form-item label="计划名称" prop="planMc">
        <el-input v-model="formParams.planMc" :readonly="isreadonly"></el-input>
      </el-form-item>
      <!-- <el-form-item label="养护区域" prop="area">
        <suc-select v-model="formParams.area" :options="planAreaData" :config="{ placeholder: '养护区域', clearable: true }" style="width:100%" @on-change="getAreaId"></suc-select>
      </el-form-item> -->
      <el-form-item label="对象类型" prop="type">
        <suc-select
          v-model="formParams.type"
          :options="objectTypeData"
          :config="{ placeholder: '对象类型', clearable: false, filterable: true }"
          style="width:100%"
          :readonly="isreadonly"
          @on-change="getYhobj"
        ></suc-select>
      </el-form-item>

      <el-form-item label="养护对象" prop="objectName">
        <div class="view-action-box">
          <el-select
            popper-class="elselect"
            v-model="formParams.objectName"
            value-key="item"
            placeholder="请选择"
            @change="handleCommissioer"
            clearable
            filterable
            :readonly="isreadonly"
            style="width:100%"
          >
            <el-option v-for="(item, idx) of engData" :key="idx" :label="item.objectName" :value="item" />
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="养护模板">
        <suc-select v-model="formParams.templateId" :options="maintainTempData" :config="{ placeholder: '养护模块', clearable: true }" @on-change="changeType" style="width:100%"></suc-select>
      </el-form-item>
      <el-form-item label="养护内容">
        <el-input v-model="formParams.yhnr" placeholder="养护内容" style="width: 100%" readonly> </el-input>
      </el-form-item>
      <el-form-item label="运维单位" prop="ywdw">
        <el-input v-model="formParams.ywdwMc" :disabled="true"></el-input>
        <el-input v-model="formParams.ywdw" v-show="false"></el-input>
      </el-form-item>

      <el-form-item label="上报人" prop="reporter">
        <el-input v-model="formParams.id" :disabled="true"></el-input>
        <el-input v-model="formParams.reporter" v-show="false"></el-input>
      </el-form-item>
      <el-form-item label="周期" prop="cycle">
        <suc-select v-model="formParams.cycle" :options="planCycleData" :config="{ placeholder: '计划周期', clearable: true }" style="width:100%"></suc-select>
      </el-form-item>
      <el-form-item label="有效期" prop="starttime">
        <!--  <suc-date-picker v-model="formParams.starttime" :options="{ type: 'datetime' }"></suc-date-picker>   当类型为type: 'datetime' 时传时分秒-->
        <suc-date-picker v-model="formParams.starttime" :options="{ type: 'date' }"></suc-date-picker>
        <span>-</span>
        <suc-date-picker v-model="formParams.overtime" :options="{ type: 'date' }"></suc-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" v-if="this.title == '计划详情' ? false : true">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onOk()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { State, Mutation, namespace } from "vuex-class";
import { SucModal, SucForm, SucFormItem, SucInput, SucSelect, SucDatePicker } from "@suc/ui";
import { infoApi, publicApi } from "@/api";
import LayerGroup from "ol/layer/Group";
const mapStore = namespace("mapStore");
@Component({
  components: {
    SucModal,
    SucForm,
    SucFormItem,
    SucInput,
    SucSelect,
    SucDatePicker,
  },
})
export default class CreatePolluters1 extends Vue {
  // 接收父组件传过来的值
  @Prop() areaOptions!: any;
  @Prop() isChangeType!: boolean;
  // @Prop() engData!: any;
  olMap = this.$getMapConfig();
  // 校验结束时间
  validateLonlat: any = (rule: any, value: any, callback: any) => {
    if (value) {
      if (!this.formParams.overtime) {
        callback(new Error("请输入结束时间"));
      } else {
        callback();
      }
    } else {
      callback();
    }
  };
  rules = {
    planMc: [{ required: true, message: "请输入计划名称", trigger: "blur" }],
    // area: [{ required: true, message: "请选择养护区域", trigger: "change" }],
    type: [{ required: true, message: "请选择养护类型", trigger: "change" }],
    objectName: [{ required: true, message: "请选择养护对象", trigger: "change" }],
    templateId: [{ required: true, message: "请选择养护单位", trigger: "change" }],
    ywdw: [{ required: true, message: "请输入养护单位", trigger: "change" }],
    reporter: [{ required: true, message: "请输入上报人", trigger: "blur" }],
    cycle: [{ required: true, message: "请选择周期", trigger: "change" }],
    // time:[{required: true, message: "请选择计划时间", trigger: "blur" }]

    starttime: [
      { required: true, message: "请输入开始时间", trigger: "change" },
      { required: true, trigger: "change", validator: this.validateLonlat },
    ],
  };
  @Prop() title!: string;
  @Prop() isreadonly!: boolean;
  @Prop() loading!: boolean; //控制加载
  @Prop() model!: boolean; //控制弹框显隐
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
  @Emit()
  async onSubmit() {}
  @Emit()
  toggle(val: boolean) {
    return val; //子组件向父组件传值
  }

  mounted() {
    // this.getmaintainArea(); //养护区域方法
    this.getmaintainTemp(); //养护模板数据
    this.getPlanCycle(); //周期
    this.getYhdxList(); //获取对象类型

    // this.olMap.map.view.center.coord = [120.27869688218249, 31.685617674794585];
  }
  // 存时间数据
  daterangeData: any = [];

  //  养护区域数据
  // planAreaData: any = [];
  //  养护泵站数据
  engData: any = [];
  //周期数据
  planCycleData: any = [];

  // 计划对象类型
  planTypeData: any = "";
  //养护模板数据
  maintainTempData: any = "";

  // 获取养护模板方法
  async getmaintainTemp() {
    const url = "wjServer/hs/template/getMyTemplateList";
    const maintainTemplateParams = {
      userId: localStorage.getItem("userId"),
      pageNumber: 1,
      pageSize: 1000,
    };
    const { data } = await infoApi.getWithParam(url, maintainTemplateParams);
    this.maintainTempData = data.rows
      ? data.rows.map((item: any) => {
          return {
            value: item.id,
            label: item.name,
          };
        })
      : [];
  }

  // 获取养护区域下拉框列表
  // async getmaintainArea() {
  //   const url = "wjServer/hs/plan/getAreaList";
  //   const areaParams = {
  //     userId: localStorage.getItem("userId"),
  //   };
  //   const { data } = await infoApi.getWithParam(url, areaParams);
  //   this.planAreaData = data
  //     ? data.map((item: any) => {
  //         return {
  //           value: item.id,
  //           label: item.fieldName,
  //         };
  //       })
  //     : [];
  // }

  @Watch("formParams.templateId")
  async changeType(val: any) {
    let params = {
      templateId: "",
    };
    if (val == undefined) {
      params.templateId = this.formParams.templateId;
    } else {
      params.templateId = val;
    }
    let url = "wjServer/hs/template/getTemplateInfo";
    const { data } = await infoApi.getWithParam(url, params);
    let a: any = [];
    data.yhnrList.forEach((item: any, index: any) => {
      a.push(item.mc);
    });
    const s = a.toString(); //数组转字符串
    this.$set(this.formParams, "yhnr", s); //踩坑!!确保数据更新与页面渲染同步
  }
  // 周期下拉列表
  async getPlanCycle() {
    const url = "wjServer/hs/plan/getPlanCycle";
    const { data } = await infoApi.getSelect(url);
    this.planCycleData = data.map((itemObj: any) => {
      return {
        value: itemObj.code,
        label: itemObj.level,
      };
    });
  }

  objectTypeData: any = [];
  // 获取养护对象类型数据
  async getYhdxList() {
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

  async getYhobj(val: any) {
    const url = "wjServer/hs/plan/getObjectListByType";
    const data = await publicApi.getWithParam(url, { objectType: val });
    if (data.result == true) {
      this.engData = data.data;
    } else {
      this.engData = [];
    }
  }

  async handleCommissioer(val: any) {
    this.formParams.objectName = val.objectName;
    this.formParams.object = val.objectCode;
    this.formParams.area = val.area;
    this.formParams.lat = val.lat;
    this.formParams.lon = val.lon;
  }

  // @Watch("formParams.area")
  // 根据用户区域的id 获取泵站名称
  // async getAreaId(id: any) {
  //   const engParams = {
  //     fieldId: " ",
  //   };
  //   if (id == undefined) {
  //     engParams.fieldId = "";
  //   } else {
  //     engParams.fieldId = id;
  //   }
  //   const url = "wjServer/task/field/getFieldEng";
  //   const { data } = await infoApi.getWithParam(url, engParams);
  //   this.engData = data
  //     ? data.map((item: any) => {
  //         return {
  //           value: item.engCded,
  //           label: item.engNameed,
  //         };
  //       })
  //     : [];
  // }

  onOk() {
    // 在点击确定之前 对表单的数据进行验证，如果返回true 提交否则不提交
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
    (this.$refs["yinjForm"] as any).resetFields(); //表单置空
  }
  // async handleChange(value: any) {
  //   this.formParams.azqy = value.toString();
  // }
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
