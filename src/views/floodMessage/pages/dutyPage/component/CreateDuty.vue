<template>
  <!--新增值班信息-->
  <suc-modal
    :config="config"
    :value="model"
    @on-ok="setOk"
    @on-cancel="toggle(false)"
  >
    <suc-form :config="{ 'label-width': 100 }">
      <suc-form-item :config="{ label: '值班日期' }">
        <suc-date-picker
          v-model="dutyParams.tm"
          :options="options"
          style="width: 94%"
        ></suc-date-picker>
      </suc-form-item>
      <suc-form-item :config="{ label: '值班领导' }">
        <suc-select
          :config="{ 'label-in-value': true }"
          :options="rylbOptions"
          v-model="dutyParams.zbldid"
          style="width: 94%"
          @on-change="changeLeader"
        ></suc-select>
      </suc-form-item>
      <suc-form-item :config="{ label: '技术员' }">
        <suc-select
          :config="{ 'label-in-value': true }"
          :options="rylbOptions"
          v-model="dutyParams.jsyid"
          style="width: 94%"
           @on-change="changeJSY"
        ></suc-select>
      </suc-form-item>
      <suc-form-item :config="{ label: '白班人员' }">
        <suc-select
          :config="{ 'label-in-value': true }"
          :options="rylbOptions"
          v-model="dutyParams.bbryid"
          style="width: 94%"
           @on-change="changeBBRY"
        ></suc-select>
      </suc-form-item>
      <suc-form-item :config="{ label: '晚班人员' }">
        <suc-select
          :config="{ 'label-in-value': true }"
          :options="rylbOptions"
          v-model="dutyParams.wbryid"
          style="width: 94%"
           @on-change="changeWBRY"
        ></suc-select>
      </suc-form-item>
      <suc-form-item :config="{ label: '值班电话' }">
        <suc-input v-model="dutyParams.tel" style="width: 94%"></suc-input>
      </suc-form-item>
    </suc-form>
    <loading-com :loadingShow="loadingShow"></loading-com>
  </suc-modal>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import {
  SucModal,
  SucForm,
  SucFormItem,
  SucSelect,
  SucInput,
  SucDatePicker,
} from "@suc/ui";
import { DatePickerOptions, ModalConfig } from "@suc/ui/interfaces";
import { dutyApi } from "@/api";
import { LoadingCom } from "@/components"
@Component({
  components: {
    SucModal,
    SucForm,
    SucFormItem,
    SucSelect,
    SucInput,
    SucDatePicker,
    LoadingCom
  },
})
export default class CreateDuty extends Vue {
  options: DatePickerOptions = {
    type: "date",
  };
  @Prop()
  title!: string;

  @Watch("title")
  changeTitle(){
    this.config.title = this.title;
  }

  config: ModalConfig = {
    transfer: false,
    title: "新增",
    width: 640,
  };


  @Prop({
    type: Object,
    default: () => {
      return {
        tm: "",
        zbld: "",
        zbldid:"",
        jsy: "",
        jsyid: "",
        bbry: "",
        bbryid: "",
        wbry: "",
        wbryid: "",
        tel: "",
      };
    },
  })
  dutyParams: any;
  rylbOptions: any[] = [];

  @Prop()
  model!: boolean;


  mounted() {
    this.getRyList();
    // this.config.title = this.title;
  }
  @Prop() loadingShow!: boolean;
  @Emit("setOk")
  setOk() {
    return this.dutyParams;
  }
  @Emit()
  toggle(val: false) {}

  //获取人员列表
  async getRyList() {
    let data = await dutyApi.getOptions();
    this.rylbOptions = data.map((item: any) => {
      return {
        label: item[1],
        value: item[0],
      };
    });
  }
  
  @Emit('changeLeader')
  changeLeader(val: any){
    return val;
  }
  @Emit('changeJSY')
  changeJSY(val: any){
    return val;
  }
  @Emit('changeBBRY')
  changeBBRY(val: any){
    return val;
  }
  @Emit('changeWBRY')
  changeWBRY(val: any){
    return val;
  }
}
</script>