<template>
  <!-- 任务事件 -->
  <div class="module-view">
    <div class="top bg-shadow">
      <div class="top-item flex-class">
        <div class="top-item-sub">
          <el-date-picker
            v-model="daterangeData"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
            size="small"
            @change="dateChange"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
        <div class="top-item-sub">
          <suc-select
            v-model="analysisParams.handleStatus"
            :options="statusOptions"
            :config="{
              placeholder: '处理状态',
              clearable: true,
            }"
            style="width:160px"
          ></suc-select>
        </div>
        <div class="top-item-sub">
          <suc-select
            v-model="analysisParams.taskType"
            :options="taskOptions"
            :config="{
              placeholder: '任务类型',
              clearable: true,
            }"
            style="width: 160px"
          ></suc-select>
        </div>
        <search-component @input="onSearch"></search-component>
      </div>
      <!-- v-show="addButton.roleName == 'manager' || addButton.roleName == '超级管理员'" -->
      <div class="top-item flex-class">
        <div class="top-item-sub">
          <suc-button type="primary" :debounce="800" @on-click="onclick" v-show="addButton.roleName == 'manager' || addButton.roleName == '运维人员'">新建事件</suc-button>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="noData" v-show="show2">暂无数据</div>
      <div class="list">
        <div class="list-item bg-shadow" v-for="(item, index) in listArr" :key="'list' + index" @click="getDetail(item)">
          <div class="list-item-img">
            <img :src="item.src" v-if="item.src" alt="img" style="height: 100%" />
            <div class="default-img" v-else>
              <img :src="require('@/assets/defaultImg.png')" alt="" />
            </div>
          </div>
          <div class="list-item-content">
            <div class="content-item">
              <div>
                <span class="iconfont icon-renwushijian icon-color"></span>
                <span class="task-name">{{ item.problemName }}</span>
              </div>
              <div class="state" :class="item.planName">
                <span>{{ item.status }}</span>
              </div>
            </div>
            <div class="content-item">
              <div>
                <span class="content-name">上报人:</span>
                <span>{{ item.reporter }}</span>
              </div>
              <div>
                <span class="content-name">{{ item.reportTime }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pages">
        <suc-page
          size="small"
          :total="pageParams.total"
          :current="pageParams.current"
          :page-size="pageParams.pageSize"
          :show-total="false"
          :show-sizer="true"
          :show-elevator="true"
          :page-size-opts="pageSizeOpts"
          @on-change="getPage"
          @on-page-size-change="getSize"
        />
      </div>
    </div>

    <div class="detail" v-if="show">
      <detail :taskId="taskId" @goback="getshow"></detail>
    </div>
    <!-- <div class="detail" v-if="show1">
			<xc-detail :url="url" @goback="getshow1"></xc-detail>
		</div> -->
    <create-task :model="model" :taskOptions="taskOptions" @toggle-model="toggle" @on-submit="setTask"></create-task>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { SucSelect, SucButton, SucInput, SucPage } from "@suc/ui";
import { SelectConfig, SelectOptions } from "@suc/ui/interfaces";
import { SearchComponent } from "@/components";
import { Detail, XcDetail, CreateTask } from "@/components";
import { onImageLoad } from "@/api/public";
import { State, Mutation, namespace } from "vuex-class";
import { infoApi } from "@/api";
@Component({
  components: {
    SucSelect,
    SucButton,
    SucInput,
    SucPage,
    SearchComponent,
    CreateTask,
    Detail,
    XcDetail,
  },
})
export default class TaskEvent extends Vue {
  @Emit()
  onBack() {}
  statusOptions: SelectOptions = [];
  taskOptions: SelectOptions = [];
  listArr: any[] = [];
  model: boolean = false;
  taskId: string = "";
  addButton: any = JSON.parse(localStorage.getItem("userInfo") || "");
  show: boolean = false;
  show1: boolean = false;
  show2: boolean = true;
  daterangeData: any = "";
  pageParams: any = {
    current: 1,
    total: 0,
    pageSize: 15,
  };
  pageSizeOpts: any[] = [5, 10, 15];
  onclick() {
    this.model = !this.model;
  }
  toggle(params: boolean) {
    this.model = params;
  }
  getDetail(item: any) {
    this.taskId = item.taskId;
    this.show = true;
  }
  getshow(val: boolean) {
    this.show = val;
    this.getTaskList();
  }
  getshow1(val: boolean) {
    this.show1 = val;
    this.getTaskList();
  }
  setTask() {
    this.model = false;
    this.getTaskList();
  }

  mounted() {
    this.getStatusList();
    this.getTaskTypeList();
    this.getTaskList();
  }
  analysisParams: any = {
    name: "",
  };

  dateChange(val: any) {
    if (val) {
      this.analysisParams = {
        beginDate: val[0],
        endDate: val[1],
      };
    } else {
      this.analysisParams.beginDate = "";
      this.analysisParams.endDate = "";
    }
  }

  //获取处理状态下拉框
  getStatusList() {
    let url = "wjServer/hs/taskFlow/getProblemStatus";
    infoApi
      .getSelect(url)
      .then((res: any) => {
        let data = res.data;
        this.statusOptions = data
          ? data.map((item: any) => {
              return {
                label: item.level,
                value: item.code,
              };
            })
          : [];
      })
      .catch((err: any) => {
        this.$SucMessage.error(err.data.message);
      });
  }

  //获取任务类型下拉框
  getTaskTypeList() {
    let url = "wjServer/hs/taskFlow/getTaskTypeList";
    infoApi
      .getSelect(url)
      .then((res: any) => {
        let data = res.data;
        this.taskOptions = data
          ? data.map((item: any) => {
              return {
                label: item.level,
                value: item.code,
              };
            })
          : [];
      })
      .catch((err: any) => {
        this.$SucMessage.error(err.data.message);
      });
  }

  getPage(page: number) {
    this.pageParams.current = page;
    this.getTaskList();
  }
  getSize(size: number) {
    this.pageParams.current = 1;
    this.pageParams.pageSize = size;
    this.getTaskList();
  }
  //获取任务事件
  getTaskList() {
    this.listArr = [];
    let url = "wjServer/hs/taskFlow/infoList";
    let params = {
      pageNumber: this.pageParams.current,
      pageSize: this.pageParams.pageSize,
      beginDate: this.analysisParams.beginDate,
      endDate: this.analysisParams.endDate,
      handleStatus: this.analysisParams.handleStatus,
      taskType: this.analysisParams.taskType,
      taskName: this.analysisParams.taskName,
    };
    infoApi
      .getWithParam(url, params)
      .then((res: any) => {
        this.listArr = res.data.rows
          ? res.data.rows.map((item: any) => {
              let lisItem = {
                problemName: item.problemName,
                status: item.status,
                reporter: item.reporter,
                src: item.firstImgUrl,
                reportTime: item.reportTime,
                planName: this.getBG(item.status),
                taskId: item.problemCode,
              };
              return lisItem;
            })
          : [];
        if (this.listArr.length) {
          this.show2 = false;
        } else {
          this.show2 = true;
        }
      })
      .catch((err: any) => {
        this.$SucMessage.error(err.data.message);
      });
  }

  onSearch(val: any) {
    this.analysisParams.taskName = val;
    this.getTaskList();
  }

  getBG(status: string) {
    let bgstyle = "";
    if (status == "待审批") {
      bgstyle = "orange-state";
    } else if (status == "已完成") {
      bgstyle = "green-state";
    } else if (status == "驳回") {
      bgstyle = "gray-state";
    } else if (status == "待处理") {
      bgstyle = "dblue-state";
    }
    return bgstyle;
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
.module-view {
  padding: 10px;
  position: relative;
  background-color: $pages-bg;
  .flex-class {
    display: flex;
    align-items: center;
  }
  .top {
    width: 100%;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    // background-color: #ffffff;
    // box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
    &-item {
      // &:nth-of-type(2) {
      //   border-radius: 4px;
      //   cursor: pointer;
      // }
      &-sub {
        margin-right: 10px;
      }
    }
  }
  .content {
    height: calc(100% - 62px);
    .noData {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .list {
      // margin-top: 10px;
      padding: 10px 0;
      width: 100%;
      height: calc(100% - 40px);
      // display: flex;
      // flex-wrap: wrap;
      &-item {
        padding: 10px 10px 0;
        margin: 0 10px 10px 0;
        float: left;
        width: calc((100% - 40px) / 5);
        height: calc(33% - 10px);
        // height: 305px;
        // background-color: #ffffff;
        // box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
        font-size: $font-size-base;
        color: $heading-color;
        cursor: pointer;
        &:nth-of-type(5n) {
          margin-right: 0;
        }
        &-img {
          height: calc(100% - 68px);
          > img {
            width: 100%;
          }
          .default-img {
            width: 100%;
            height: 100%;
            background-color: #e8f0ff;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        &-content {
          .content-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 10px;
            &:nth-of-type(2) {
              padding-left: 15px;
            }
            .icon-color {
              color: $state-blue;
            }
            .task-name {
              font-size: $font-size-large;
            }
            .content-name {
              color: $help-color;
            }
            .state {
              padding: 3px 10px;
              color: #ffffff;
              border-radius: 2px;
            }
            .green-state {
              background-color: $state-green;
            }
            .blue-state {
              background-color: $state-blue;
            }
            .orange-state {
              background-color: #ffab3d;
            }
            .gray-state {
              background-color: #ccc;
            }
            .dblue-state {
              background-color: #33ccff;
            }
          }
        }
      }
    }
  }

  .detail {
    width: 100%;
    height: 100%;
    padding: 10px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: $pages-bg;
  }
}
</style>
