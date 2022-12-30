<template>
  <!-- 总览 -->
  <div class="module-view">
    <div class="content">
      <div class="left bg-shadow">
        <work-dynamic></work-dynamic>
      </div>
      <div class="center">
        <div class="center-item bg-shadow">
          <qulity-pie></qulity-pie>
        </div>
        <div class="center-item bg-shadow">
          <alarm-bar></alarm-bar>
        </div>
      </div>
      <div class="right">
        <div class="right-item bg-shadow">
          <alarm-monitor></alarm-monitor>
        </div>
        <div class="right-item bg-shadow">
          <status-bar></status-bar>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { AlarmBar, AlarmMonitor, QulityPie, StatusBar, WorkDynamic } from "./overviewPage";
import {infoApi } from "@/api";
import bus from "@/eventBus";
@Component({
  components: {
    AlarmBar,
    AlarmMonitor,
    QulityPie,
    StatusBar,
    WorkDynamic,
  },
})
export default class Overview extends Vue {
  // 参数
  params: any = {
    userId: localStorage.getItem("userId"),
    roleName: localStorage.getItem("roleName"),
    areaCode: localStorage.getItem("areaCode"),
  };

  // 传给兄弟左侧地图栏的值
  brotherValue: any = "";
  result: any = "";
  async getResult() {
    let url = "wjServer/hs/home/getHomeInfo";
    await infoApi.getWithParam(url, this.params).then((data: any) => {
      this.result = data.data;
      this.brotherValue = data.data;
      bus.$emit("sendEvent", this.brotherValue);
    });
  }
  mounted() {
    this.getResult();
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
.module-view {
  padding: 10px;
  background-color: $pages-bg;
  .content {
    display: flex;
    padding-top: 10px;
    // height: calc(100% - 83px);
    height: 100%;
    .left {
      width: 22%;
      height: 100%;
    }
    .center {
      //关键
      padding: 0 10px;
      width: 47%;
      height: 100%;
      &-item {
        &:first-of-type {
          height: 53%;
          margin-bottom: 10px;
        }
        &:nth-of-type(2) {
          height: calc(47% - 10px);
        }
      }
    }
    .right {
      width: 31%;
      height: 100%;
      &-item {
        &:first-of-type {
          height: 40%;
          margin-bottom: 10px;
        }
        &:nth-of-type(2) {
          height: calc(60% - 10px);
        }
      }
    }
  }
}
</style>
