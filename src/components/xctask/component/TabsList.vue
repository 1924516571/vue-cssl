<template>
  <div class="tabs-view">
    <suc-tabs>
      <suc-tab-pane label="任务信息">
        <task-info></task-info>
      </suc-tab-pane>
      <suc-tab-pane label="任务照片">
        <peripheral-companies></peripheral-companies>
      </suc-tab-pane>
    </suc-tabs>
  </div>
</template>
<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Emit,
  Model,
  Watch,
} from "vue-property-decorator";
import { SucTabs, SucTabPane } from "@suc/ui";
import { PeripheralCompanies, TaskInfo } from "../tabComponent";
@Component({
  components: {
    SucTabs,
    SucTabPane,
    PeripheralCompanies,
    TaskInfo,
  },
})
export default class ModuleView extends Vue {}
</script>
<style lang="scss">
.tabs-view {
  .suc-tabs .ivu-tabs-bar:after {
    height: 1px;
    background-color: #dde4eb;
  }
}
</style>
<style lang="scss" scoped>
.tabs-view {
  width: 100%;
  height: 100%;
}
</style>
