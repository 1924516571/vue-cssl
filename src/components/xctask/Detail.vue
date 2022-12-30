<template>
  <!-- 任务事件详情 -->
  <div class="detail-view">
    <div class="detail-item">
      <div class="nav-item">
        <div class="nav-item-sub" @click="goback">
          <span class="iconfont icon-fanhui"></span>
          <span>返回</span>
        </div>
        <div class="nav-item-sub">
          <span v-text="analysis.taskItem.rwbh">任务编号</span>
        </div>
        <div class="nav-item-sub blue-bg">
          <span v-text="analysis.taskItem.state">处理中</span>
        </div>
      </div>
      <div class="nav-item">
        <div class="button-pannel" v-for="(button, index) in buttons" :key="index">
          <suc-button :type="button.type" v-show="button.show" :config="button.iviewProps" :debounce="800" @on-click="onclick(button, index)" :disabled="button.disabled"
            >{{ button.label }}
          </suc-button>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="left-item">
        <div class="left-item-sub">
          <site-map></site-map>
        </div>
        <div class="left-item-sub">
          <tabs-list></tabs-list>
        </div>
      </div>
      <div class="right-item">
        <record :key="recordKey"></record>
        <!-- <task-result></task-result> -->
      </div>
    </div>
    <create-task :model="model" @toggle-model="toggle" @set-task="dealTask"></create-task>
    <forward-task :taskId="analysis.taskItem.rwId" :model="forwardModel" @toggle-model="toggle1"></forward-task>
    <assign-task :model="show" @toggle-model="change"></assign-task>
    <!-- <task-return :model="returnModel" @toggle-model="change1"></task-return> -->
    <record-modal></record-modal>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { State, Mutation, Action, namespace } from "vuex-class";
import { SucButton } from "@suc/ui";
import { publicApi } from "@/api";
import { getPdfFromHtml } from "@/common/utils/htmlToPdf";
import { SiteMap, TabsList, CreateTask, Record, TaskResult, AssignTask, ForwardTask, TaskReturn, RecordModal } from "./component";
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
    RecordModal,
  },
})
export default class ModuleView extends Vue {
  @State user: any;
  @State analysis: any;
  @Prop() url!: string;
  btnShow: boolean = false;
  buttons: any = [
    {
      label: "交办",
      type: "primary",
      iviewProps: {
        ghost: true,
      },
      show: false,
    },
    {
      label: "处理",
      type: "primary",
      iviewProps: {
        ghost: true,
      },
      disabled: false,
      show: false,
    },
    {
      label: "审核",
      type: "primary",
      show: false,
    },
    {
      label: "导出为pdf文件",
      type: "primary",
      show: true,
    },
  ];
  dealTask(taskData: any) {
    if (taskData.success) {
      this.$SucMessage.info("处理成功");
    } else {
      this.$SucMessage.error("处理失败");
    }
  }
  mounted() {
    // 交办按钮
    this.buttons[0].disabled =
      this.analysis.taskItem.state == "未处理" && ((this.user.titleex == "管养负责人" && this.analysis.taskItem.cz == "已交办") || this.user.titleex == "三级片长" || this.user.titleex == "二级片长")
        ? false
        : true;
    // 处理按钮
    this.buttons[1].disabled =
      (this.user.titleex == "管养人员" || (this.user.titleex == "管养负责人" && this.analysis.taskItem.cz == "审核通过") || this.user.id == "2") && this.analysis.taskItem.state == "未处理"
        ? false
        : true;
    // 审批按钮
    this.buttons[2].disabled = (this.analysis.taskItem.state == "待审核" || this.analysis.taskItem.state == "审批") && (this.user.titleex == "三级片长" || this.user.id == "2") ? false : true;
    this.$forceUpdate();
  }
  created() {
    this.hideBtn();
  }
  // 根据操作权限判断按钮的显示或隐藏
  hideBtn() {
    var questUrl = "";
    if ((this.url = "/main/home/pending")) {
      questUrl = "home_pending";
    }
    if ((this.url = "/main/home/dispatch")) {
      questUrl = "home_dispatch";
    }
    if ((this.url = "/main/pieNetwork/task")) {
      questUrl = "pieNetwork_task";
    }
    if ((this.url = "/main/environment/task")) {
      questUrl = "environment_task";
    }
    if ((this.url = "/main/floodmanage/dispatch")) {
      questUrl = "floodmanage_dispatch";
    }
    if ((this.url = "/main/film/reinstatement")) {
      questUrl = "film_reinstatement";
    }
    if ((this.url = "/main/film/issues")) {
      questUrl = "film_issues";
    }
    if ((this.url = "/main/film/record")) {
      questUrl = "film_record";
    }
    if ((this.url = "/main/film/task")) {
      questUrl = "film_task";
    }
    this.$http.get("jnsw/rest/authox/check?resource=" + questUrl + "&op=" + "manage").then((res: any) => {
      this.btnShow = res.data.allowed;
      this.buttons[0].show = this.btnShow;
      this.buttons[1].show = this.btnShow;
      this.buttons[2].show = this.btnShow;
    });
    console.log(this.url);
  }
  model: boolean = false;
  forwardModel: boolean = false;
  show: boolean = false;
  recordKey: number = 0;
  onclick(val: any, index: number) {
    if (index == 0) {
      this.show = !this.show;
    } else if (index == 1) {
      this.model = !this.model;
    } else if (index == 2) {
      this.forwardModel = !this.forwardModel;
    } else if (index == 3) {
      getPdfFromHtml((document as any).querySelector("#capture"), "巡查问题记录");
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
  // change1(state: boolean) {
  // 	this.returnModel = state;
  // }
  setTask(formParams: any) {
    // publicApi
    // 	.onDispatch(formParams)
    // 	.then((res: any) => {
    // 		this.$Message.success("转发成功");
    // 		this.$nextTick(() => {
    // 		});
    // 	})
    // 	.catch(() => {
    // 		this.$Message.error("转发失败");
    // 	});
    // this.forwardModel = false;
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
      .blue-bg {
        background-color: #5397ff;
      }
      .green-bg {
        background-color: #5397ff;
      }
    }
  }
}
</style>
