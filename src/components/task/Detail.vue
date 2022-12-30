<template>
  <!-- 任务事件详情 -->
  <div class="detail-view">
    <div class="detail-item">
      <div class="nav-item">
        <div class="nav-item-sub" @click="goback">
          <span class="iconfont icon-fanhui"></span>
          <!-- <span>返回</span> -->
        </div>
        <div class="nav-item-sub">
          <span>{{ detailList.baseInfo.problemName }}</span>
        </div>
        <div v-if="detailList.baseInfo.status != '已完成'" class="nav-item-sub yellow-bg">
          <span>{{ detailList.baseInfo.status }}</span>
        </div>
        <div v-if="detailList.baseInfo.status == '已完成'" class="nav-item-sub green-bg">
          <span>{{ detailList.baseInfo.status }}</span>
        </div>
      </div>
      <div class="nav-item">
        <div class="button-pannel" v-if="(roleName == 'manager' || roleName == 'admin') && detailList.baseInfo.status == '待审批'">
          <suc-button type="primary" :debounce="800" @on-click="onclick('审核')">审核 </suc-button>
        </div>
        <div class="button-pannel" v-if="roleName == '运维人员' && (detailList.baseInfo.status == '待处理' || detailList.baseInfo.status == '驳回')">
          <suc-button type="primary" :debounce="800" @on-click="onclick('处理')">处理 </suc-button>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="left-item">
        <div class="left-item-sub">
          <site-map :list="detailList.baseInfo"></site-map>
        </div>
        <div class="left-item-sub">
          <tabs-list :list="detailList"></tabs-list>
        </div>
      </div>
      <div class="right-item">
        <record :list="detailList"></record>
        <!-- <task-result></task-result> -->
      </div>
    </div>
    <create-task :model="model" @toggle-model="toggle" :list="detailList" :title="title" @on-submit="dealTask"></create-task>
    <forward-task :model="forwardModel" :list="detailList" @toggle-model="toggle1" @on-submit="dealTask"></forward-task>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { State, Mutation, Action, namespace } from "vuex-class";
import { SucButton } from "@suc/ui";
import { infoApi, publicApi } from "@/api";
import { SiteMap, TabsList, CreateTask, Record, TaskResult, AssignTask, ForwardTask, TaskReturn } from "./component";
@Component({
  components: {
    SucButton,
    SiteMap,
    TabsList,
    CreateTask,
    Record,
    TaskResult,
    AssignTask,
    ForwardTask,
    TaskReturn,
  },
})
export default class ModuleView extends Vue {
  // @State netWork:any;
  @State user: any;
  // @Mutation setDetailToggle:any;
  @State analysis: any;
  @Prop() taskId!: string;
  btnShow: boolean = true;
  model: boolean = false;
  forwardModel: boolean = false;
  show: boolean = false;
  title: any = "";
  recordKey: number = 0;
  detailList: any = {};
  returnModel: boolean = false;
  buttons: any = [
    {
      label: "审核",
      type: "primary",
    },
    {
      label: "退回",
      type: "primary",
      disabled: false,
    },
    {
      label: "处理",
      type: "primary",
      disabled: this.btnShow,
    },
  ];
  dealTask(taskData: any) {
    this.forwardModel = false;
    this.goback();
  }
  assignTask(msg: string) {
    if (msg) {
      this.$SucMessage.info("交办成功");
    } else {
      this.$SucMessage.info("交办失败");
    }
  }
  roleName: any = "";
  mounted() {
    this.roleName = localStorage.getItem("roleName");
    this.getDetail();
  }
  created() {}

  getDetail() {
    let url = "wjServer/hs/taskFlow/getDetail";
    infoApi
      .getWithParam(url, { taskId: this.taskId })
      .then((res: any) => {
        if (res.data) {
          this.detailList = res.data;
        }
      })
      .catch((err: any) => {
        this.$SucMessage.error(err.data.message);
      });
  }

  onclick(val: any, index: number) {
    this.title = val;
    if (val === "审核") {
      this.forwardModel = !this.model;
    } else {
      this.model = !this.model;
    }
  }
  toggle(state: boolean) {
    this.model = state;
    this.recordKey++;
  }
  toggle1(state: boolean) {
    this.forwardModel = state;
  }
  @Emit()
  goback() {
    return false;
    // this.netWork.detailToggle = false;
    // this.setDetailToggle(this.netWork.detailToggle);
  }
  change(state: boolean) {
    this.show = state;
    this.recordKey++;
  }
  change1(state: boolean) {
    this.returnModel = state;
  }
}
</script>

<style lang="scss" scoped>
.detail-view {
  width: 100%;
  height: 100%;
  pointer-events: auto;
  .detail-item {
    &:first-of-type {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      background-color: #ffffff;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
    }
    &:nth-of-type(2) {
      height: calc(100% - 60px);
      padding-top: 10px;
      .right-item {
        float: right;
        width: 25%;
        height: 100%;
        // background-color: #ffffff;
      }
      .left-item {
        float: left;
        padding-right: 10px;
        width: 75%;
        height: 100%;
        &-sub {
          background-color: #ffffff;
          &:first-of-type {
            margin-bottom: 10px;
            padding: 10px;
            height: calc(60% - 10px);
          }
          &:nth-of-type(2) {
            height: 40%;
          }
        }
      }
    }

    .nav-item {
      &:first-of-type {
        display: flex;
        align-items: center;
      }
      &:last-of-type {
        .button-pannel {
          display: inline-block;
          margin-right: 16px;
        }
      }
      &-sub {
        padding-left: 15px;
        font-size: 16px;
        color: #333;
        &:first-of-type {
          font-size: 14px;
          color: #3983f3;
          cursor: pointer;
        }
        &:nth-of-type(2) {
          position: relative;
          &::before {
            content: "";
            width: 1px;
            height: 100%;
            position: absolute;
            top: 0;
            left: 8px;
            background-color: #dde4eb;
          }
        }
        &:nth-of-type(3) {
          padding: 4px 8px;
          margin-left: 10px;
          font-size: 12px;

          color: #ffffff;
          border-radius: 2px;
          text-align: center;
        }
      }
      .yellow-bg {
        background-color: rgba(245, 154, 35, 1);
      }
      .green-bg {
        background-color: #5397ff;
      }
    }
  }
}
</style>
