<template>
  <div class="monitor-view">
    <panel-view heading="待办任务">
      <template v-slot:right>
        <div class="more" @click.stop="jumpTo()"><i class="el-icon-more"></i></div>
      </template>
      <alarm-flood></alarm-flood>
    </panel-view>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { AlarmFlood } from "../dispatchPage";
import { PanelView } from "@/components";
import { infoApi, floodApi } from "@/api";
import bus from "@/eventBus";
@Component({
  components: {
    PanelView,
    AlarmFlood,
  },
})
export default class ModuleView extends Vue {
  options: any = {};
  async mounted() {
    // this.getInfo();
  }
  //   async getInfo() {
  //     bus.$on("sendEvent", (data: any) => {
  //       var total = data.planProblem.totalNum;
  //       var data = data.planProblem.problemNums;
  //       this.options = {
  //         tooltip: {
  //           trigger: "item",
  //           formatter: "{b}:{c}条",
  //         },
  //         color: ["#5397ff", "#feb543"],
  //         title: {
  //           text: "总数",
  //           subtext: total,
  //           textStyle: {
  //             color: "#ccc",
  //             fontSize: 24,
  //           },
  //           subtextStyle: {
  //             fontSize: 20,
  //             color: ["#ff9d19"],
  //           },
  //           x: "center",
  //           y: "42%",
  //         },
  //         grid: {
  //           bottom: 200,
  //           left: 100,
  //           right: 300,
  //         },
  //         legend: {
  //           orient: "horizontal",
  //           bottom: "0%",
  //           textStyle: {
  //             fontSize: 16,
  //           },
  //           formatter: (value: string) => {
  //             var name = value;
  //             data.map((item: any) => {
  //               if (item.name == value) {
  //                 name = value + " " + item.value + "条";
  //               }
  //             });
  //             return name;
  //           },
  //           icon: "roundRect",
  //           data: data,
  //         },
  //         series: [
  //           // 主要展示层的
  //           {
  //             radius: ["45%", "55%"],
  //             center: ["50%", "50%"],
  //             type: "pie",
  //             label: {
  //               normal: {
  //                 show: true,
  //                 formatter: (param: { data: any }) => {
  //                   console.log("567", ((param.data.value / total) * 100).toFixed(2));

  //                   return ((param.data.value / total) * 100).toFixed(2) + "%";
  //                 },
  //                 textStyle: {
  //                   fontSize: 16,
  //                 },
  //                 position: "outside",
  //               },
  //               emphasis: {
  //                 show: true,
  //               },
  //             },
  //             labelLine: {
  //               normal: {
  //                 show: true,
  //                 length: 25,
  //                 length2: 25,
  //               },
  //               emphasis: {
  //                 show: true,
  //               },
  //             },
  //             name: "类型占比",
  //             data: data,
  //           },
  //         ],
  //       };
  //     });
  //   }

  jumpTo() {
    this.$router.push({ path: "/main/assessment/operateManage" });
  }
}
</script>
<style lang="scss" scoped>
.monitor-view {
  width: 100%;
  height: 100%;
  .more {
    float: right;
    padding-right: 10px;
    i {
      font-size: 18px;
      cursor: pointer;
      color: #5397ff;
    }
  }
}
</style>
