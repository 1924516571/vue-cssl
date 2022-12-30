<template>
  <div class="tabs-view">
    <suc-tabs>
      <suc-tab-pane v-if="list.baseInfo.taskType == '报警任务' || list.baseInfo.taskType == '故障任务'" label="任务信息" class="tabList scroll">
        <div class="contentL">
          <p>
            <label>任务类型22: {{ list.baseInfo.taskType }}</label>
          </p>
          <p>
            <label>对象名称: {{ list.baseInfo.engName }}</label>
          </p>
          <p>
            <label>处置内容:</label><br />
            <label v-for="(item, index) in list.baseInfo.yhnrList" :key="index" style="padding-left:55px">{{ index + 1 + ". " + item.mc }}<br /></label>
          </p>
        </div>
        <div class="contentL">
          <p>
            <label>运维单位: {{ list.baseInfo.companyName }}</label>
          </p>
          <p>
            <label>接收人: {{ list.baseInfo.receiver }}</label>
          </p>
          <p>
            <label>处理意见: {{ list.baseInfo.handleOpinion }}</label>
          </p>
          <p>
            <label>位置: {{ list.baseInfo.address }}</label>
          </p>
          <p>
            <label>发布人: {{ list.baseInfo.reporte }}</label>
          </p>
          <p>
            <label>经纬度:{{ list.baseInfo.lat }},{{ list.baseInfo.lon }}</label>
          </p>
          <p>
            <label>位置: {{ list.baseInfo.address }}</label>
          </p>
          <p>
            <label>模板内容: {{ yhnrString }}</label>
          </p>
        </div>
      </suc-tab-pane>

      <suc-tab-pane v-if="list.baseInfo.taskType == '报警任务'" label="报警信息" class="tabList scroll">
        <div class="contentL">
          <p>
            <label>泵站名称: {{ list.warningInfo.stationName }}</label>
          </p>
          <p>
            <label>泵站状态: {{ list.warningInfo.warningType }}</label>
          </p>
          <p>
            <label>实时水位: {{ list.warningInfo.realStage }}</label>
          </p>
          <p>
            <label>经纬度:{{ list.baseInfo.lat }},{{ list.baseInfo.lon }}</label>
          </p>
          <p>
            <label>位置: {{ list.baseInfo.address }}</label>
          </p>
          <p><label>防御指南: 请各单位做好防御准备</label></p>
        </div>
        <div class="contentL">
          <p>
            <label>超报警液位: {{ list.warningInfo.overWarning }}</label>
          </p>
          <p>
            <label>报警水位: {{ list.warningInfo.overWarning }}</label>
          </p>
          <p>
            <label>报警开始时间: {{ list.warningInfo.warningStartTime }}</label>
          </p>
          <p>
            <label>模板内容: {{ yhnrString }}</label>
          </p>
        </div>
      </suc-tab-pane>

      <suc-tab-pane v-if="list.baseInfo.taskType == '故障任务'" label="故障信息" class="tabList scroll">
        <div class="contentL">
          <p>
            <label>泵站名称: {{ list.faultInfo.stationName }}</label>
          </p>
          <p>
            <label>故障设备: {{ list.faultInfo.deviceType }}</label>
          </p>
          <p>
            <label>故障来源: {{ list.faultInfo.faultSource }}</label>
          </p>
          <p>
            <label>上报时间: {{ list.faultInfo.reportTimeStr }}</label>
          </p>
        </div>
        <div class="contentL">
          <p>
            <label>实时水位: {{ list.faultInfo.rZ }}</label>
          </p>
          <p>
            <label>警戒水位: {{ list.faultInfo.warnZ }}</label>
          </p>
          <p>
            <label>上报人: {{ list.faultInfo.reportUser }}</label>
          </p>
          <p>
            <label>接收人: {{ list.faultInfo.receiveUser }}</label>
          </p>
          <p>
            <label>经纬度:{{ list.baseInfo.lat }},{{ list.baseInfo.lon }}</label>
          </p>
          <p>
            <label>模板内容: {{ yhnrString }}</label>
          </p>
        </div>
      </suc-tab-pane>

      <suc-tab-pane label="基础信息" v-if="list.baseInfo.taskType == '异常上报' || list.baseInfo.taskType == '巡查问题'" class="tabList scroll">
        <div class="contentL" v-if="list.baseInfo.taskType == '异常上报'">
          <p>
            <label v-if="list.baseInfo.taskType == '异常上报'">对象名称: {{ list.baseInfo.engName }}</label>
          </p>
          <p>
            <!-- <label v-if="list.baseInfo.taskType == '异常上报'">设备类别: {{ list.baseInfo.deviceType }}</label> -->
          </p>
          <p>
            <label>上报人:{{ list.baseInfo.reporter }}</label>
          </p>
          <p>
            <label>接收人:{{ list.baseInfo.receiver }}</label>
          </p>
          <p>
            <label>经纬度:{{ list.baseInfo.lat }},{{ list.baseInfo.lon }}</label>
          </p>
          <p>
            <label>模板内容: {{ yhnrString }}</label>
          </p>
        </div>
        <div class="contentL" v-if="list.baseInfo.taskType == '巡查问题'">
          <p>
            <label v-if="list.baseInfo.taskType == '巡查问题'">关联计划: {{ list.baseInfo.planName }}</label>
          </p>
          <p>
            <label v-if="list.baseInfo.taskType == '巡查问题'">运维单位: {{ list.baseInfo.companyName }}</label>
          </p>
          <p>
            <label>上报人:{{ list.baseInfo.reporter }}</label>
          </p>
          <p>
            <label>接收人:{{ list.baseInfo.receiver }}</label>
          </p>
          <p>
            <label>经纬度:{{ list.baseInfo.lat }},{{ list.baseInfo.lon }}</label>
          </p>
        </div>
        <div class="contentL">
          <p>
            <label>问题描述: {{ list.baseInfo.content }}</label>
          </p>
          <p>
            <label>位置: {{ list.baseInfo.address }}</label>
          </p>
          <p>
            <label>上报时间: {{ list.baseInfo.reportTime }}</label>
          </p>
          <p>
            <label>任务类型: {{ list.baseInfo.taskType }}</label>
          </p>
        </div>
        <div class="contentL">
          <p>问题照片:</p>
          <!-- <div class="list" v-for="fit in list.baseInfo.minIoFileList" :key="fit"> -->
          <!-- <el-image style="width: 150px; height: 100px" :src="fit.previewUrl" :fit="contain"></el-image> -->
          <viewer style="display: flex; flex-wrap: wrap">
            <div class="list" v-for="(fit, index) in list.baseInfo.minIoFileList" :key="index">
              <img style="width: 150px; height: 100px" :src="fit.previewUrl" />
            </div>
          </viewer>
          <!-- </div> -->
        </div>
      </suc-tab-pane>
    </suc-tabs>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
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
export default class ModuleView extends Vue {
  @Prop() list!: any;
  yhnrList: Array<any> = this.list.baseInfo.yhnrList;
  yhnrString: any = "";
  mounted() {
    console.log("kanzheli", this.list);
    // var yhnrList: Array<any> = this.list.baseInfo.yhnrList;

    // if (this.yhnrList.length !== 0) {
    //   for (var i = 0; i < this.yhnrList.length; i++) {
    //     this.yhnrString = this.yhnrList[i].mc;
    //   }
    // } else {
    //   this.yhnrString = "";
    // }
    // console.log(this.yhnrString, "----");
    let a: any = [];
    let b = this.yhnrList;
    b.forEach((item: any, index: any) => {
      a.push(item.mc);
    });
    const s = a.toString();
    this.yhnrString = s;
  }
}
</script>
<style lang="scss">
.tabs-view {
  .suc-tabs .ivu-tabs-bar:after {
    height: 1px;
    background-color: #dde4eb;
  }
  .tabList {
    height: 268px;
    overflow-y: auto;
    .contentL {
      padding: 20px;
      font-size: 13px;
      display: inline-block;
      vertical-align: top;
      margin-left: 20px;
      .list {
        display: inline-block;
        margin-right: 10px;
      }
      p {
        margin-bottom: 15px;
      }
    }
    // .imgProblem {
    //   margin-top: -20px;
    //   margin-left: 40px;
    //   font-size: 13px;
    //   .list {
    //     display: inline-block;
    //     margin-right: 10px;
    //   }
    // }
  }
}
</style>
<style lang="scss" scoped>
.tabs-view {
  width: 100%;
  height: 100%;
}
</style>
