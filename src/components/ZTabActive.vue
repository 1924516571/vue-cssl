<template>
  <!-- 状态的按钮切换 -->
  <el-radio-group v-model="activeIndex" fill="#3a7bef" @change="getBtn">
    <el-radio-button :label="index" v-for="(item, index) in btns" :key="'btn' + index">{{ item }}</el-radio-button>
  </el-radio-group>
</template>
<script lang="ts">
import { values } from "lodash";
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { RadioGroup, RadioButton } from "element-ui";
@Component({
  components: {
    ElRadioGroup: RadioGroup,
    ElRadioButton: RadioButton,
  },
})
export default class TabActive extends Vue {
  @Prop({
    type: Array,
    default: () => [],
  })
  btns: any;
  @Prop() activeIndex!: number;
  @Emit()
  getBtn(index: number) {
    return index;
  }
}
</script>
<style lang="scss" scoped>
.tab-active {
  width: 100%;
  //display: flex;
  // width: 120px;
  //font-size: 14px;
  //border: solid 1px #3a7bef;
  //border-radius: 4px;
  //cursor: pointer;
  .btn-item {
    // width: 50%;
    padding: 5px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #3a7bef;
    border-left: 1px solid #3a7bef;
    &:nth-child(1) {
      border-left: none;
    }
  }
  .btn-active {
    background-color: #3a7bef;
    color: #ffffff;
  }
}
</style>
