<template>
  <!-- 报警信息又侧栏 -->
  <div class="table-detail">
    <div class="top">
      {{ topDataObj.type }}
    </div>
    <div class="top-1">
      <p>{{ topDataObj.dangerLevel }}</p>
      <p>已启动</p>
    </div>
    <div class="main">
      <div class="site scroll">
        <div class="site-item">
          <panel-view heading="启动条件">
            <div class="noData" v-show="show1">暂无数据</div>
            <div v-for="(item, index) in conditionData" :key="index" style="padding:8px 10px">
              {{ item }}
            </div>
          </panel-view>
        </div>
        <div class="site-item">
          <panel-view heading="响应行动">
            <div class="noData" v-show="show2">暂无数据</div>
            <div v-for="(item, index) in responsenData" :key="index" style="padding:8px 10px">
              {{ item }}
            </div>
          </panel-view>
        </div>

        <div class="site-item">
          <panel-view heading="短信接收人">
            <div class="noData" v-show="show3">暂无数据</div>
            <div v-for="(item, index) in principalData" :key="index" style="padding:8px 10px">
              {{ item }}
            </div>
          </panel-view>
        </div>
        <div class="site-item">
          <panel-view heading="防汛仓库">
            <div class="content">
              <div class="content-item">
                <span class="key">仓库名称:</span>
                <span class="value">{{ basicWarehouseObj.ckmc }}</span>
              </div>
              <div class="content-item">
                <span class="key">行政区:</span>
                <span class="value">{{ basicWarehouseObj.xzqy }}</span>
              </div>
              <div class="content-item">
                <span class="key">地址:</span>
                <span class="value">{{ basicWarehouseObj.szd }}</span>
              </div>
              <div class="content-item">
                <span class="key">管理单位:</span>
                <span class="value">{{ basicWarehouseObj.dwnm }}</span>
              </div>
              <div class="content-item">
                <span class="key">电话:</span>
                <span class="value">{{ basicWarehouseObj.tel }}</span>
              </div>
              <div class="content-item">
                <span class="key">经纬度:</span>
                <span class="value">{{ basicWarehouseObj.lon }},{{ basicWarehouseObj.lat }}</span>
              </div>
            </div>
          </panel-view>
        </div>
        <!-- <div class="site-item">
          <panel-view heading="抢险队伍">
            <div class="content">
              <div class="content-item">
                <span class="key">抢险队伍名称:</span>
                <span class="value">{{ basicQxdwObj.name }}</span>
              </div>
              <div class="content-item">
                <span class="key">所属行政区:</span>
                <span class="value">{{ basicQxdwObj.areacode }}</span>
              </div>
              <div class="content-item">
                <span class="key">电话:</span>
                <span class="value">{{ basicQxdwObj.tel }}</span>
              </div>
              <div class="content-item">
                <span class="key">现有人数:</span>
                <span class="value">{{ basicQxdwObj.limitnum }}</span>
              </div>
              <div class="content-item">
                <span class="key">机构性质:</span>
                <span class="value">{{ basicQxdwObj.jgTypeName }}</span>
              </div>
            </div>
          </panel-view>
        </div> -->
        <div class="site-item">
          <panel-view heading="发布信息">
            <div class="content">
              <div class="content-item">
                <span class="key">发布人:</span>
                <span class="value">{{ fbMessageObj.editor }}</span>
              </div>
              <div class="content-item">
                <span class="key">发布时间:</span>
                <span class="value">{{ fbMessageObj.editDate }}</span>
              </div>
            </div>
          </panel-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Emit, Prop, Watch } from "vue-property-decorator";
import { PanelView, TabSwitch } from "@/components";
import { Site, Process, Feature } from "./rightComponents";
import { values } from "lodash";
import { publicApi, dataBaseApi } from "@/api";
@Component({
  components: {
    PanelView,
    TabSwitch,
    Site,
    Process,
    Feature,
  },
})
export default class TableDetail extends Vue {
  @Prop() eid: any;
  show1: any = true;
  show2: any = true;
  show3: any = true;

  topDataObj: any = {}; //详情头部
  conditionData: any = []; //条件
  responsenData: any = []; //响应
  principalData: any = []; //负责人
  basicWarehouseObj: any = {}; //防汛仓库
  // basicQxdwObj: any = {}; // 抢险队伍

  fbMessageObj: any = {}; // 发布信息

  mounted() {}

  detailParm: any = {
    erId: "",
  };
  @Watch("eid", { deep: true, immediate: true })
  async ongetDetail(val: any) {
    this.detailParm.erId = val;
    const url = "wjServer/wj/warning/getFxErrecord";
    const data = await publicApi.getWithParam(url, this.detailParm);

    if (data.result == true) {
      if (data.result == true) {
        this.topDataObj.type = data.data.type;
        this.topDataObj.dangerLevel = data.data.dangerLevel;

        this.show1 = false;
      }
      if (data.result == true && data.data.condition.length > 0) {
        this.conditionData = data.data.condition;
        this.show1 = false;
      }
      if (data.result == true && data.data.response.length > 0) {
        this.responsenData = data.data.response;
        this.show2 = false;
      }

      if (data.result == true && data.data.principal.length > 0) {
        this.principalData = data.data.principal;
        this.show3 = false;
      }
      if (data.result == true) {
        this.basicWarehouseObj = data.data.basicWarehouse;
      }
      if (data.result == true) {
        this.fbMessageObj.editor = data.data.editor;
        this.fbMessageObj.editDate = data.data.editDate;
      }
    } else {
      this.$Message.error("获取失败");
    }
  }
}
</script>
<style lang="scss" scoped>
.table-detail {
  width: 100%;
  height: 100%;
  .top {
    padding-top: 14px;
    border-bottom: 1px solid #dde4ed;
    font-size: 16px;
    color: #3a7bef;
  }
  .top-1 {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    padding: 5px 5px;
    color: rgb(255, 18, 18);

    p:nth-child(1) {
      width: 50%;
      // background: red;
      // text-align: center;
    }
    p:nth-child(2) {
      color: rgb(255, 18, 18);
    }
  }
  .main {
    // padding: 0 10px;
    // height: calc(100% - 46px);
    height: calc(100% - 30px);
    padding-bottom: 60px;
    .noData {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .site {
      height: 100%;
      position: relative;
      overflow: auto;
      .site-item {
        font-size: 14px;
        color: #666;
        .key {
          color: #999;
        }
        .value {
          color: #333;
        }
        .content {
          .content-item {
            padding: 0 10px;
            display: flex;
            justify-content: space-between;
            padding: 8px 10px;
          }
        }
      }
    }
  }
}
</style>
