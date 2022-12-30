<template>
<!-- 雨量站雨量报表 -->
  <div class="table-detail">
    <div style="width:100%;height:100%">
      <div class="top">
        <tab-switch :tabs="tabs" @get-tab="getTab"></tab-switch>
      </div>
      <component :is="currentTabComponent" class="content" :row="row"></component>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Emit, Prop, Watch } from "vue-property-decorator";
import { PanelView, TabSwitch } from "@/components";
import { Site, Process, Feature, Water, YlzProcess, YlzFeature, YlzWater, BzSite, BzProcess, RunSite, WZCK } from "./rightComponents";
@Component({
  components: {
    PanelView,
    TabSwitch,
    Site,
    Process,
    Feature,
    Water,
    YlzProcess,
    YlzFeature,
    YlzWater,
    BzSite,
    BzProcess,
    RunSite,
    WZCK,
  },
})
export default class TableDetail extends Vue {
  @Prop({
    type: Object,
    default: () => {},
  })
  row: any;
  tabs: any[] = [];
  @Watch("row", { deep: true, immediate: true })
  onRow(val: any) {
    this.tabs = [];
    if (val.key == "HD") {
      this.tabs = ["站点情况", "过程线", "特征极值", "水情报表"];
      this.getTab(0, "站点情况");
    } else if (val.key == "YL") {
      this.tabs = ["雨量棒图", "特征雨量", "雨量报表"];
      this.getTab(0, "雨量棒图");
    } else if (val.key == "zbz") {
      this.tabs = ["站点概况", "水位过程线", "运行状态","特征极值","水情报表"];
      this.getTab(0, "站点概况");
    } else if (val.key == "WZCK") {
      this.tabs = [];
      this.currentTabComponent = "WZCK"; //物资仓库组件
    }
  }
  getTab(index: number, flag?: any) {
    switch (flag) {
      case "站点情况":
        this.currentTabComponent = "Site"; //站点情况
        break;
      case "过程线":
        this.currentTabComponent = "Process"; //过程线
        break;
      case "特征极值":
        this.currentTabComponent = "Feature"; //特征极值
        break;
      case "水情报表":
        this.currentTabComponent = "Water"; //水情报表
        break;
      case "雨量棒图":
        this.currentTabComponent = "YlzProcess";
        break;
      case "特征雨量":
        this.currentTabComponent = "YlzFeature";
        break;
      case "雨量报表":
        this.currentTabComponent = "YlzWater";
        break;
      case "站点概况":
        this.currentTabComponent = "BzSite";
        break;
      case "水位过程线":
        this.currentTabComponent = "BzProcess";
        break;
      case "运行状态":
        this.currentTabComponent = "RunSite";
        break;
    }
  }
  currentTabComponent: string = "";
}
</script>
<style lang="scss" scoped>
.table-detail {
  width: 100%;
  height: 100%;
  .top {
    padding-top: 14px;
    // border-bottom: 1px solid #dde4ed;
  }
  .content {
    // padding: 0 10px;
    // height: calc(100% - 46px);

    height: calc(100% - 92px);
    // height: calc(100% - 65px);
  }
}
</style>
