<template>
  <el-dialog
    :title="title"
    :visible.sync="model"
    class="scroll"
    close-on-click-modal:false
    :before-close="onCancel"
    v-if="model"
  >
    <el-form
      :model="formParams"
      ref="zqxForm"
      label-width="auto"
      size="small"
      class="form"
    >
      <div class="bfContent title">
        <div>
          <el-form-item label="报表类型：">
            <suc-select
              v-model="formParams.type"
              :options="bbOptions"
              @on-change="formChangeList"
              :config="{
                clearable: true,
                filterable: true,
              }"
              style="width: 100%"
            >
            </suc-select>
          </el-form-item>
          <el-form-item label="年度：">
            <suc-date-picker
              v-model="formParams.year"
              :options="{
                type: 'year',
                clearable: true,
                placeholder: '请选择年份',
              }"
              style="width: 100%"
            ></suc-date-picker>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="地区：">
            <el-cascader
              v-model="formParams.area"
              :options="areaOptions"
              :props="{
                expandTrigger: 'hover',
                value: 'myId',
                label: 'name',
                children: 'children',
                checkStrictly: true,
              }"
              style="width: 100%"
              size="small"
              placeholder="所属区域"
              clearable
              @change="handleChange"
            ></el-cascader>
          </el-form-item>

          <el-form-item label="填报单位：">
            <el-input v-model="formParams.dept"></el-input>
          </el-form-item>
        </div>
      </div>

      <!-- 报表类型1 -->

      <div class="bfContent" v-if="formParams.type == '1'">
        <div>
          <el-form-item label="开始时间：">
            <suc-date-picker
              v-model="formParams.busiFxStFlooded.starttime"
              :options="{
                type: 'date',
                clearable: true,
                placeholder: '请选择日期',
              }"
              style="width: 100%"
            ></suc-date-picker>
          </el-form-item>
          <el-form-item label="受灾县(个)：">
            <el-input v-model="formParams.busiFxStFlooded.szXian"></el-input>
          </el-form-item>
          <el-form-item label="受灾乡镇(个)：">
            <el-input
              v-model="formParams.busiFxStFlooded.szXiangzhen"
            ></el-input>
          </el-form-item>
          <el-form-item label="受灾村(个)：">
            <el-input v-model="formParams.busiFxStFlooded.szCun"></el-input>
          </el-form-item>
          <el-form-item label="受灾街道(个)：">
            <el-input v-model="formParams.szJiedao"></el-input>
          </el-form-item>
          <el-form-item label="受灾居委会(个)：">
            <el-input v-model="formParams.busiFxStFlooded.juweihui"></el-input>
          </el-form-item>
          <el-form-item label="损坏房屋(万间)：">
            <el-input v-model="formParams.busiFxStFlooded.damaged"></el-input>
          </el-form-item>
          <el-form-item label="倒塌房屋(万间)：">
            <el-input v-model="formParams.busiFxStFlooded.collapsed"></el-input>
          </el-form-item>
          <el-form-item label="死亡人口(人)：">
            <el-input v-model="formParams.busiFxStFlooded.dead"></el-input>
          </el-form-item>
          <el-form-item label="失踪人口(人)：">
            <el-input v-model="formParams.busiFxStFlooded.missing"></el-input>
          </el-form-item>
          <el-form-item label="直接经济总损失(亿元)：">
            <el-input v-model="formParams.busiFxStFlooded.totalloss"></el-input>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="结束时间：">
            <suc-date-picker
              v-model="formParams.busiFxStFlooded.endtime"
              :options="{
                type: 'date',
                clearable: true,
                placeholder: '请选择日期',
              }"
              style="width: 100%"
            ></suc-date-picker>
          </el-form-item>
          <el-form-item label="受灾人口(万人)：">
            <el-input v-model="formParams.busiFxStFlooded.affected"></el-input>
          </el-form-item>
          <el-form-item label="洪水围困人口(万人)：">
            <el-input v-model="formParams.busiFxStFlooded.trapped"></el-input>
          </el-form-item>
          <el-form-item label="紧急转移人口(万人)：">
            <el-input
              v-model="formParams.busiFxStFlooded.transfered"
            ></el-input>
          </el-form-item>
          <el-form-item label="受淹城镇(个)：">
            <el-input v-model="formParams.busiFxStFlooded.syTown"></el-input>
          </el-form-item>
          <el-form-item label="城镇住宅受淹(万户)：">
            <el-input v-model="formParams.busiFxStFlooded.zzsyTown"></el-input>
          </el-form-item>
          <el-form-item label="农村住宅受淹(万户)：">
            <el-input
              v-model="formParams.busiFxStFlooded.zzsyVillage"
            ></el-input>
          </el-form-item>
          <el-form-item label="道路积水最大水深(米)：">
            <el-input v-model="formParams.busiFxStFlooded.ponding"></el-input>
          </el-form-item>
          <el-form-item label="受伤人口(人)：">
            <el-input
              v-model="formParams.busiFxStFlooded.ssrkSubtotal"
            ></el-input>
          </el-form-item>
          <el-form-item label="重伤人口(个)：">
            <el-input
              v-model="formParams.busiFxStFlooded.ssrkSerious"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="formParams.busiFxStFlooded.remark"></el-input>
          </el-form-item>
        </div>
      </div>

      <!-- 表报类型8 -->
      <div v-if="formParams.type == '8'">
        <h3>大型水库</h3>
        <div class="bfContent">
          <div>
            <el-form-item label="开始时间：">
              <suc-date-picker
                v-model="formParams.busiFxStWaterproject.starttime"
                :options="{
                  type: 'date',
                  clearable: true,
                  placeholder: '请选择日期',
                }"
                style="width: 100%"
              ></suc-date-picker>
            </el-form-item>
            <el-form-item label="数量(座)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.dxskCount"
              ></el-input>
            </el-form-item>
            <el-form-item label="兴利库容(亿立方米)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.dxskXlkr"
              ></el-input>
            </el-form-item>
            <el-form-item label="设计灌溉面积(万亩)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.dxskSjggmj"
              ></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="结束时间：">
              <suc-date-picker
                v-model="formParams.busiFxStWaterproject.endtime"
                :options="{
                  type: 'date',
                  clearable: true,
                  placeholder: '请选择日期',
                }"
                style="width: 100%"
              ></suc-date-picker>
            </el-form-item>
            <el-form-item label="总库容(亿立方米)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.dxskZkr"
              ></el-input>
            </el-form-item>
            <el-form-item label="死库容(亿立方米)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.dxskSkr"
              ></el-input>
            </el-form-item>
            <el-form-item label="有效灌溉面积(万亩)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.dxskYxggmj"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <h3>中型水库</h3>
        <div class="bfContent">
          <div>
            <el-form-item label="数量(座)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.zxskCount"
              ></el-input>
            </el-form-item>
            <el-form-item label="兴利库容(亿立方米)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.zxskXlkr"
              ></el-input>
            </el-form-item>
            <el-form-item label="设计灌溉面积(万亩)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.zxskSjggmj"
              ></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="总库容(亿立方米)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.zxskZkr"
              ></el-input>
            </el-form-item>
            <el-form-item label="死库容(亿立方米)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.zxskSkr"
              ></el-input>
            </el-form-item>
            <el-form-item label="有效灌溉面积(万亩)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.zxskYxggmj"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <h3>小型水库</h3>
        <div class="bfContent">
          <div>
            <el-form-item label="数量(座)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.xxskCount"
              ></el-input>
            </el-form-item>
            <el-form-item label="兴利库容(亿立方米)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.xxskXlkr"
              ></el-input>
            </el-form-item>
            <el-form-item label="设计灌溉面积(万亩)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.xxskSjggmj"
              ></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="总库容(亿立方米)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.xxskZkr"
              ></el-input>
            </el-form-item>
            <el-form-item label="死库容(亿立方米)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.xxskSkr"
              ></el-input>
            </el-form-item>
            <el-form-item label="有效灌溉面积(万亩)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.xxskYxggmj"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <h3>塘坝</h3>
        <div class="bfContent">
          <div>
            <el-form-item label="数量(座)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.tbCount"
              ></el-input>
            </el-form-item>
            <el-form-item label="灌溉面积(万亩)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.tbGgmj"
              ></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="蓄水总量(亿立方米)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.tbXszl"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <h3>机电井</h3>
        <div class="bfContent">
          <div>
            <el-form-item label="眼数(座)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.jdjYs"
              ></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="灌溉面积(万亩)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.jdjGgmj"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <h3>提灌泵站</h3>
        <div class="bfContent">
          <div>
            <el-form-item label="数量(座)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.tgbzCount"
              ></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="灌溉面积(万亩)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.tgbzGgmj"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <h3>引水工程</h3>
        <div class="bfContent">
          <div>
            <el-form-item label="数量(座)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.ysgcCount"
              ></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="灌溉面积(万亩)：">
              <el-input
                v-model="formParams.busiFxStWaterproject.ysgcGgmj"
              ></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onOk()"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import {
  SucModal,
  SucForm,
  SucFormItem,
  SucInput,
  SucSelect,
  SucDatePicker,
} from "@suc/ui";
import { infoApi, publicApi } from "@/api";
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
  },
})
export default class ZbModal extends Vue {
  bbOptions: any = [];
  areaOptions: any = [];
  // rules = {
  //   department: [{ required: true, message: "请选择科室", trigger: "change" }],
  //   // dutyer: [{ required: true, message: "请选择值班人员", trigger: "change" }],
  // };
  @Prop() title!: string;
  @Prop() loading!: boolean; //控制加载
  @Prop() model!: boolean; //控制弹框显隐
  @Prop({ type: Object, default: () => {} }) formParams!: any; //新增接口需要的参数
  @Emit()
  async onSubmit() {}
  @Emit()
  toggle(val: boolean) {
    return val;
  }

  formChangeList() {}

  onOk() {
    (this.$refs["zqxForm"] as any).validate((valid: any) => {
      if (valid) {
        this.onSubmit();
      } else {
        return false;
      }
    });
  }

  onCancel() {
    this.toggle(false);
    (this.$refs["zqxForm"] as any).resetFields();
  }
  async handleChange(value: any) {
    this.formParams.area = value.toString();
  }

  mounted() {
    this.getBb();
    this.getAreaCode();
  }

  //获取行政区域下拉框值
  async getAreaCode() {
    let data = await publicApi.getAreaCode();
    this.areaOptions = this.getTreeData([data.data]);
  }

  getTreeData(data: any) {
    // 循环遍历json数据
    for (var i = 0; i < data.length; i++) {
      if (data[i].children.length < 1) {
        // children若为空数组，则将children设为undefined
        data[i].children = undefined;
      } else {
        // children若不为空数组，则继续 递归调用 本方法
        this.getTreeData(data[i].children);
      }
    }
    return data;
  }

  async getBb() {
    let url = "wjServer/fangxunjc/disaster/reportType";
    let data = await publicApi.getNoParam(url);
    this.bbOptions = data.data.map((e: any) => {
      let item = {
        value: e.code,
        label: e.name,
      };
      return item;
    });
  }

  // @Watch("formParams.department")
  // getRyList(val: any) {
  //   // this.formParams.dutyer = ""
  //   let url = "wjServer/fangxunjc/ondutyer/dutyerList";
  //   publicApi.getWithParam(url, { code: val }).then((val) => {
  //     this.ryOptions = val.data.map((e: any) => {
  //       let item = {
  //         value: e.code,
  //         label: e.name,
  //       };
  //       return item;
  //     });
  //   });
  // }
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
      // height: 400px;
      min-height: 500px;
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

.form {
  h3 {
    width: 100%;
    text-align: center;
    margin: 15px 0;
  }
  .bfContent {
    display: flex;
    border-bottom: 1px solid #eee;
    div {
      flex: 1;
      margin-right: 5px;
      padding: 0 5px;
    }
  }
  .title {
    border-bottom: 1px solid #eee;
    margin-bottom: 15px;
  }
}
</style>
