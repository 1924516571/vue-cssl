<template>
  <div class="table-detail">
    <div class="top">
      <!-- <tab-switch :tabs="tabs" @get-tab="getTab"></tab-switch> -->
      {{ row.ID }}调度方案
    </div>
    <!-- <component :is="currentTabComponent" class="content" ></component> -->
    <div class="main">
      <div class="site scroll">
        <div class="site-item">
          <panel-view heading="启动条件">
            <div class="noData" v-show="show2">暂无数据</div>
            <div>(1)启动条件</div>
            <div>(2)启动条件2</div>
            <div>(3)启动条件3</div>
          </panel-view>
        </div>
        <div class="site-item">
          <panel-view heading="响应行动">
            <div class="noData" v-show="show2">暂无数据</div>
            <div>(1)</div>
            <div>(2)</div>
            <div>(3)</div>
          </panel-view>
        </div>
        <div class="site-item">
          <panel-view heading="负责人员">
            <div class="noData" v-show="show2">暂无数据</div>
            <div>(1)</div>
            <div>(2)</div>
            <div>(3)</div>
          </panel-view>
        </div>
        <div class="site-item">
          <panel-view heading="防汛仓库">
            <div class="content">
              <div class="content-item">
                <span class="key">仓库名称:</span>
                <span class="value">hahaha</span>
              </div>
              <div class="content-item">
                <span class="key">行政区:</span>
                <span class="value">hahaha</span>
              </div>
              <div class="content-item">
                <span class="key">地址:</span>
                <span class="value">hahaha</span>
              </div>
              <div class="content-item">
                <span class="key">管理单位:</span>
                <span class="value">hahaha</span>
              </div>
              <div class="content-item">
                <span class="key">电话:</span>
                <span class="value">hahaha</span>
              </div>
              <div class="content-item">
                <span class="key">经纬度:</span>
                <span class="value">hahaha</span>
              </div>
            </div>
          </panel-view>
        </div>
          <div class="site-item">
          <panel-view heading="抢险队伍">
            <div class="content">
              <div class="content-item">
                <span class="key">抢险队伍名称:</span>
                <span class="value">hahaha</span>
              </div>
              <div class="content-item">
                <span class="key">所属行政区:</span>
                <span class="value">hahaha</span>
              </div>
              <div class="content-item">
                <span class="key">负责人:</span>
                <span class="value">hahaha</span>
              </div>
              <div class="content-item">
                <span class="key">电话:</span>
                <span class="value">hahaha</span>
              </div>
              <div class="content-item">
                <span class="key">现有人数:</span>
                <span class="value">hahaha</span>
              </div>
              <div class="content-item">
                <span class="key">机构性质:</span>
                <span class="value">hahaha</span>
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
  @Prop({
    type: Object,
    default: () => {},
  })
  row: any;
  yjDetailParams:any  = {
     id:""
  }
  show2: any = true;
  @Watch("row", { deep: true, immediate: true }) //子组件监听父组件的点击事件
  onRow(val: any) {
   this.yjDetailParams.id = val.ID;
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
  .main {
    // padding: 0 10px;
    // height: calc(100% - 46px);
    height: calc(100% - 15px);
    padding-bottom: 50px;
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
