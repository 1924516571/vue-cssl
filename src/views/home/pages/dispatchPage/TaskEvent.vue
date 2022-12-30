<template>
  <!-- 任务事件 -->
  <vue-seamless-scroll :data="listData" class="alarm">
    <div
      class="alarm-item"
      v-for="(item, index) in listData"
      :key="item.id"
      @click="onRow(item)"
    >
      <span>{{ index + 1 }}. {{ item.RWMC }}</span>

      <!-- <span class="text-over">{{ item.content }}</span> -->

      <span>{{ item.STATUS }}</span>
    </div>
  </vue-seamless-scroll>
</template>
<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import vueSeamlessScroll from "./myClass.vue";
// import vueSeamlessScroll from "vue-seamless-scroll";
import { homeApi } from "@/api";
@Component({
  components: {
    vueSeamlessScroll,
  },
})
export default class AlarmAbnormal extends Vue {
  @Mutation setTaskItem: any;
  //   @Mutation setIssuesItem: any;
  listData: any[] = [];
  async getList() {
    let data = await homeApi.getTaskList();
    this.listData = data;
  }
  mounted() {
    this.getList();
  }
  getBG(id: string) {
    let bgstyle = "";
    if (id === "未处理") {
      bgstyle = "orange-state";
    } else if (id === "已交办") {
      bgstyle = "blue-state";
    } else if (id === "已处理") {
      bgstyle = "blue-state";
    } else if (id === "未完成") {
      bgstyle = "green-state";
    } else if (id === "已完成") {
      bgstyle = "gray-state";
    }
    return bgstyle;
  }

  @Emit()
  onRow(item: any) {
    let listItem = {
      rwbh: item.RWBH,
      rwId: item.ID,
      rwlx: item.RWLX,
      src: "",
      name: item.RWMC,
      state: item.STATUS,
      publisher: item.FBR,
      time: item.GMT_CREATE,
      bg: this.getBG(item.STATUS),
      files: item.FILES,
      jd: item.JD,
      wd: item.WD,
      jsr: item.JSR,
    };
    this.setTaskItem(listItem);
  }
  // mounted() {
  //   for (let i = 0; i < 10; i++) {
  //     this.listData.push({
  //       id: i,
  //       name: "管网液位异常",
  //       content:
  //         "当前天气晴朗，无雨，0101-02十字沟路管网内水位到达2.0米速度快了发掘拉斯科的房价当前天气晴朗，无雨，0101-02十字沟路管网",
  //       state: "处理中",
  //     });
  //   }
  // }
}
</script>
<style lang="scss" scoped>
.alarm {
  padding: 0 10px;
  height: calc(100% - 52px);
  border-top: 1px solid #dde4eb;
  overflow: hidden;
  .alarm-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 4px;
    color: #515a6e;
    cursor: pointer;
    &:nth-of-type(2n) {
      background-color: #f8f7f8;
    }
    .text-over {
      display: inline-block;
      width: 50%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
