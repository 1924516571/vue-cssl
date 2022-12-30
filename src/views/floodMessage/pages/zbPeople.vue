<template>
  <!-- 值班  -->
  <div class="module-view">
    <div class="bg-shadow">
      <div class="top-nav">
        <div class="top-nav-item">
          <tab-active :btns="btns" @get-btn="getBtn" :activeIndex="activeIndex"></tab-active>
        </div>
      </div>
      <div class="content" v-if="activeIndex === 0">
        <calendar></calendar>
      </div>
      <div class="content" v-if="activeIndex === 1">
        <duty-table></duty-table>
      </div>
      <div class="content" v-if="activeIndex === 2">
         <fxzh-table></fxzh-table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { SucDatePicker, SucButton } from "@suc/ui";
import { DatePickerOptions } from "@suc/ui/interfaces";
import { SearchComponent, TabActive } from "@/components";
import { DutyTable, Calendar, FxzhTable } from "./dutyPage";
@Component({
  components: {
    SucDatePicker,
    SucButton,
    SearchComponent,
    TabActive,
    DutyTable,
    Calendar,
    FxzhTable,
  },
})
export default class Duty extends Vue {
  options: DatePickerOptions = {
    type: "date",
  };
  btns: any[] = ["市级", "板块", "防指成员单位"];
  activeIndex: number = 0;
  getBtn(val: number) {
    // 子组件getBtn点击事件，带一个索引过来
    this.activeIndex = val;
  }

  mounted() {
    // this.getDate();
  }
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
@import "@/styles/commonVariables.scss";
.module-view {
  padding: 10px;
  background-color: $pages-bg;
  .bg-shadow {
    height: 100%;
    background-color: #ffffff;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
  }
  .top-nav {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    &-item {
      display: flex;
      .btn {
        margin-right: 10px;
      }
    }
  }
  .content {
    height: calc(100% - 70px);
  }
}
#{$deep}.tab-active {
  font-size: 18px;
}
</style>
