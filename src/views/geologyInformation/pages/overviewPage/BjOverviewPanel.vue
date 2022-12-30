<template>
  <div class="overview-view">
    <div class="item-view left">
      <panel-view heading="报警信息">
        <!-- <template>
          <div><span>2022年2月14日8时</span><span>~</span><span>2022年2月15日8时</span></div>
        </template> -->
        <template>
          <div class="img-view">
            <span>当前报警总数：</span>
            <span>{{ count }}处</span>
          </div>
        </template>
        <div class="tab-btns">
          <div class="enterprise-view">
            <table-component :tableData="tableData" :columns="columns" @row-click="rowClick">
              <template v-slot:status="{ row }">
                <div :class="`${row.warningStatus == '1' ? 'aa' : 'bb'}`">
                  <span>{{ row.warningStatus == "1" ? "正在报警" : "历史报警" }}</span>
                </div>
              </template>
              <template v-slot:type="{ row }">
                <div :class="[row.warningType == '1' ? 'state-red' : 'state-green']">
                  <span>{{ row.warningType == "1" ? "报警" : "警戒" }}</span>
                </div>
              </template>
            </table-component>
          </div>
        </div>
      </panel-view>
    </div>

    <!-- <transition name="slide-fade" v-if="rightshow">
      <div class="item-view right">
        <div class="close-btn bg-shadow" @click="getRightshow">
          <span>×</span>
        </div>
        <bj-table-detail :row="rightRow"></bj-table-detail>
      </div>
    </transition> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { PanelView, TablePage, TableComponent } from "@/components";
import BjTableDetail from "./BjTableDetail.vue";
import { publicApi } from "@/api";

@Component({
  components: {
    PanelView,
    TablePage,
    BjTableDetail,
    TableComponent,
  },
})
export default class OverviewPanel extends Vue {
  count: any = "0";
  tableData: any = [];
  columns: any[] = [
    {
      title: "序号",
      type: "index",
    },

    {
      title: "河湖名称",
      key: "river",
      width: 120,
    },
    {
      title: "站点名称",
      key: "stationName",
    },
    // {
    //   title: "区域",
    //   key: "XZQY",
    //   width: 120,
    // },
    {
      title: "经度",
      key: "jd",
    },
    {
      title: "纬度",
      key: "wd",
    },
    {
      title: "报警状态",
      width: 120,
      slot: "status",
    },
    {
      title: "报警类型",
      width: 120,
      slot: "type",
    },
    {
      title: "报警开始时间",
      key: "warningStartTime",
      width: 120,
    },
    {
      title: "报警结束时间",
      key: "warningEndTime",
      width: 120,
    },
  ];

  rightshow: boolean = false;
  rightRow: any = {}; //传值给右边报警详情组件

  mounted() {
    this.getInfo();
  }

  detailParams: any = {
    warningStatus: "",
  };

  async getInfo() {
    let that = this;
    that.detailParams.warningStatus = "1";
    let url = "wjServer/wj/warning/getWarningInfos";
    const data = await publicApi.getWithParam(url, that.detailParams);
    if (data.result == true) {
      that.tableData = data.data.list;
      this.count = data.data.warnCount;
    } else {
      this.$Message.error("获取失败");
    }
  }

  rowClick(row: any) {
    this.rightshow = true;
    this.rightRow = row;
  }
  getRightshow() {
    this.rightshow = false;
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
.overview-view {
  width: 100%;
  height: 100%;
  position: relative;
  .item-view {
    height: 100%;
    background-color: #ffffff;
    box-shadow: 2px 0px 10px 0px rgba(0, 0, 0, 0.12);
    .img-view {
      font-size: 18px;
      height: 50px;
      margin-bottom: 10px;
      text-align: left;
      background-image: linear-gradient(269deg, #fb6a3d, #ffc144);
      color: #fff;
      width: 100%;
      padding-top: 15px;
      padding-left: 10px;
    }
    .tab-btns {
      height: 100%;
      .enterprise-view {
        width: 100%;
        height: 85%;
        .aa {
          display: inline-block;
          background-color: #ff5a47;
          padding: 5px 5px;
          color: #fff;
          font-weight: 600;
        }
        .bb {
          background-color: rgb(53, 214, 48);
        }
        .state-red {
          color: red;
        }
        .state-green {
          color: rgb(53, 12, 238);
        }
      }
    }
  }
  .left {
    width: 550px;
    // width: 680px;
    float: left;
  }
  .right {
    float: right;
    position: relative;
    width: 450px;
    height: 100%;
    pointer-events: auto;
    .close-btn {
      position: absolute;
      top: 0;
      left: -32px;
      padding: 15px 10px;
      color: #9a9a9a;
      font-size: 20px;
      cursor: pointer;
    }
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
}
</style>
