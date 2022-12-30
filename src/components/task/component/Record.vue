<template>
  <div class="record-view">
    <suc-tabs>
      <suc-tab-pane label="事件流">
        <div class="recordStyle scroll">
          <el-timeline style="padding: 20px;">
            <el-timeline-item :timestamp="item.handleTime" placement="top" v-for="(item, index) in list.eventFlow" :key="index">
              <div class="status">
                {{ item.remark }}
              </div>
              <el-card>
                <p>{{ item.content }}</p>
                <viewer :images="item.minIoFileList" style="display: flex; flex-wrap: wrap">
                  <div v-for="(image, id) in item.minIoFileList" :key="id" style="width: 20%">
                    <img style="height: 74px" :src="image.previewUrl" />
                  </div>
                </viewer>
                <p>{{ item.roleName}}:{{ item.userName }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </suc-tab-pane>
      <suc-tab-pane label="运维记录" v-if="list.baseInfo.planId != ''">
        <div class="yw scroll">
          <el-collapse @change="handleChange" accordion>
            <el-collapse-item v-for="(item, index) in historyData" :key="index" :name="item.end_time">
              <template slot="title">
                <span>{{ item.end_time }}</span>
              </template>
              <!-- 折叠面板的内容 -->
              <div class="daka" v-for="(item, index) in historyMaintainData" :key="index">
                <div>养护时间:{{ item.yhDate }}</div>
                <div>计划名称:{{ item.planMc }}</div>
                <div>
                  养护单位:{{ item.company }}<span class="position_right"><i class="el-icon-map-location" @click="getMapData(item.recordId)"></i></span>
                </div>
                <div class="daka_2">
                  <div>
                    <span><i class="el-icon-time"></i></span>
                    <span>{{ item.yhMin }}分钟</span>
                  </div>
                  <div>
                    <span><i class="el-icon-coordinate"></i></span>
                    <span>{{ item.distance }}公里</span>
                  </div>
                  <div>
                    <span><i class="el-icon-tickets"></i></span>
                    <span>问题</span><span>({{ item.problemNum }})</span>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </suc-tab-pane>
    </suc-tabs>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { PanelView } from "@/components";
import { State } from "vuex-class";
import { infoApi } from "@/api";
import { onImageLoad } from "@/api/public";
import { SucTabs, SucTabPane } from "@suc/ui";
import { Timeline, TimelineItem, Card, Image } from "element-ui";
@Component({
  components: {
    PanelView,
    ElTimeline: Timeline,
    ElTimelineItem: TimelineItem,
    ElCard: Card,
    ElImage: Image,
    SucTabs,
    SucTabPane,
  },
})
export default class Record extends Vue {
  @State analysis: any;
  recordList: any[] = [];
  @Prop() list!: any;

  //历史养护记录时间数据
  historyData: any = [];
  historyMaintainData: any = [];
  mounted() {
    this.getTimeList();
  }
  async getTimeList() {
    let url = "wjServer/hs/maintain/getHistoryList";
    infoApi
      .getWithParam(url, { planId: this.list.baseInfo.planId })
      .then((res: any) => {
        if (res.data) {
          this.historyData = res.data;
        }
      })
      .catch((err: any) => {
        this.$SucMessage.error(err.data.message);
      });
  }
  @Watch("analysis.taskItem.state", { immediate: true, deep: true })
  stateChange() {
    this.getTimeList();
  }

  // 点击折叠面板触发的函数
  handleChange(time: any) {
    console.log(time, "iiiiii");
    if (time) {
      let url = "wjServer/hs/maintain/getMonthHistory";
      infoApi
        .getWithParam(url, { planId: this.list.baseInfo.planId, yhMonth: time })
        .then((res: any) => {
          if (res.data) {
            this.historyMaintainData = res.data;
          }
        })
        .catch((err: any) => {
          this.$SucMessage.error(err.data.message);
        });
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";

$deep: "::v-deep";
.record-view {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  .suc-tabs .ivu-tabs-bar:after {
    height: 100%;
    background-color: #dde4eb;
  }
  //   padding: 15px;
  .recordStyle {
    overflow-y: auto;
    height: 745px;
    .status {
      position: absolute;
      right: 5px;
      top: 0px;
    }
  }

  .yw {
    margin: 0 10px;
    height: 745px;
    overflow: auto;
  }
  .el-collapse-item__content {
    padding-bottom: 5px;
    .daka {
      border: 1px solid #dcdde0;
      height: 100%;
      padding-left: 10px;
      padding-top: 5px;
      font-size: 16px;
      line-height: 35px;
      .position_right {
        position: absolute;
        right: 10px;
      }
      .daka_1 {
        font-size: 15px;
      }
      .daka_2 {
        display: flex;
        justify-content: space-evenly; //盒子平均分成五等分
        background: #ecececc7;
        margin-left: -10px;
      }
      .block {
        margin-top: 5px;
        .el-timeline {
          margin-bottom: 20px;
          font-size: 10px;
        }
      }
    }
  }
  #{$deep}.el-collapse-item__header {
    background-color: #ecececc7;
    //   background: #f4f9ff linear-gradient(to left, rgba(0, 255, 0, 0), #d0e6fd);
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    padding-left: 10px;
  }
}
</style>
