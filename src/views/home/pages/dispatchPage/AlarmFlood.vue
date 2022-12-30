<template>
  <!-- 待办任务 -->
  <div class="alarm scroll" :data="listData">
    <!-- <vue-seamless-scroll :data="listData">
      <div class="alarm-item" v-for="(item, index) in listData" :key="index">
        <div class="alarm-title">
          <span class="text-over">任务名称:{{ item.name }}</span>
          <span>
            <el-tag size="mini" :type="item.status == '待审批' ? 'warning' : ' '">{{ item.status }}</el-tag>
          </span>
        </div>
        <div class="alarm-body">
          发布人:{{ item.reporter }} <span class="alarm-body-time">发布时间:{{ item.reportTime }}</span>
        </div>
      </div>
    </vue-seamless-scroll> -->
    <div class="alarm-item" v-for="(item, index) in listData" :key="index">
      <div class="alarm-title">
        <span class="text-over">任务名称:{{ item.name }}</span>
        <span class="alarm-tag">
          <el-tag size="mini" :type="item.status == '待审批' ? 'warning' : ' '">{{ item.status }}</el-tag>
        </span>
        <span>
          <suc-button  type="primary" :debounce="500"  @click="doDetail()">处理</suc-button>
        </span>
      </div>
      <div class="alarm-body">
        发布人:{{ item.reporter }} <span class="alarm-body-time">发布时间:{{ item.reportTime }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import vueSeamlessScroll from "./myClass.vue";
import { SucButton } from "@suc/ui";
import bus from "@/eventBus";
import { infoApi } from "@/api";
@Component({
  components: {
    vueSeamlessScroll,
    SucButton,
  },
})
export default class AlarmAbnormal extends Vue {
  listData: any[] = [];
  user: any = JSON.parse(localStorage.getItem("userInfo") || "");
  bgtype: any = "";

  async getList() {
    bus.$on("sendEvent", (data: any) => {
      this.listData = data.needDoInfo.list;
    });
  }
  doDetail(){
     console.log("我是处理事件");
     this.$router.push({path:"/main/assessment/operateManage"})
     
  }
  mounted() {
    this.getList();
  }
}
</script>
<style lang="scss" scoped>
.alarm {
  padding: 0 10px;
  height: calc(100% - 52px);
  border-top: 1px solid #dde4eb;
  overflow: auto;
  .alarm-item {
    padding: 10px 4px;
    // font-size: 14px;
    color: #515a6e;
    position: relative;
    cursor: pointer;
    &:nth-of-type(2n) {
      background-color: #f8f7f8;
    }
    .alarm-title {
      display: flex;
      justify-content: space-between;
      .alarm-tag {
        position: absolute;
        left: 50%;
      }
    }
    .alarm-body {
      position: relative;
      .alarm-body-time {
        display: block;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
  .text-over {
    max-width: calc(100% - 90px);
    margin-right: 20px;
    font-weight: bold;
  }
}
</style>
