<template>
  <div class="monitor-view">
    <panel-view heading="档案资料">
      <div class="content ">
        <!-- <v-chart
					:options="options"
					style="width:100%;height:100%"
				></v-chart> -->
        <el-tabs :tab-position="tabPosition" type="border-card" style="height:100%">
          <el-tab-pane>
            <span slot="label"><i class="iconfont icon-falvfagui tab-icon"></i>法律法规</span>
            <div class="fl-content scroll">
              <ul>
                <li class="fl-li" v-for="(item, index) in inforList" :key="index">
                  <span
                    ><a href="">{{ item.content }}</a></span
                  >
                  <span>{{ item.time }}</span>
                </li>
                <!-- <li class="fl-li">
                <span><a href="">法律法规</a></span>
                <span>2022-2-21</span>
              </li>
              <li class="fl-li">
                <span><a href="">法律法规</a></span>
                <span>2022-2-21</span>
              </li> -->
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="iconfont icon-biaozhun tab-icon"></i>规范标准</span>
            规范标准
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="iconfont icon-wenjianguanli tab-icon"></i>管理文件</span>
            管理文件
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="iconfont icon-qitawenjian tab-icon"></i>其他文件</span>
            其他文件
          </el-tab-pane>
        </el-tabs>
      </div>
    </panel-view>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { PanelView } from "@/components";
import bus from "@/eventBus";
@Component({
  components: {
    PanelView,
  },
})
export default class ModuleView extends Vue {
  data: any = [];
  total: any = 32;
  options: any = {};

  tabPosition: any = "left";
  inforList: any = [
    { content: "法律法规", time: "2022-2-20" },
    { content: "法律法规312312", time: "2022-2-21" },
    { content: "法律法规312", time: "2022-2-22" },
    { content: "法律法规", time: "2022-2-20" },
    { content: "法律法规312312", time: "2022-2-21" },
    { content: "法律法规312", time: "2022-2-22" },
    { content: "法律法规", time: "2022-2-20" },
    { content: "法律法规312312", time: "2022-2-21" },
    { content: "法律法规312", time: "2022-2-22" },
    { content: "法律法规", time: "2022-2-20" },
    { content: "法律法规312312", time: "2022-2-21" },
    { content: "法律法规312", time: "2022-2-22" },
    { content: "法律法规", time: "2022-2-20" },
    { content: "法律法规312312", time: "2022-2-21" },
    { content: "法律法规312", time: "2022-2-22" },
    { content: "法律法规", time: "2022-2-20" },
    { content: "法律法规312312", time: "2022-2-21" },
        { content: "法律法规", time: "2022-2-20" },
    { content: "法律法规312312", time: "2022-2-21" },
    { content: "法律法规312", time: "2022-2-22" },
    { content: "法律法规", time: "2022-2-20" },
    { content: "法律法规312312", time: "2022-2-21" },
    { content: "法律法规312", time: "2022-2-22" },
  ];

  async mounted() {
    this.getInfo();
  }

  getInfo() {
    bus.$on("sendEvent", (data: any) => {
      var probleList = data.reportProblems;
      var resolveList = data.solveProblems;
      var ratio = data.solveRatio;
      this.options = {
        tooltip: {
          trigger: "item",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "2%",
          right: "4%",
          bottom: "4%",
          top: "36%",
          containLabel: true,
        },
        legend: {
          data: ["上报问题数量", "解决问题数量"],
          left: "7%",
          top: "5%",
          textStyle: {
            color: "#666666",
          },
          itemWidth: 15,
          itemHeight: 10,
          itemGap: 25,
        },
        xAxis: {
          type: "category",
          data: ["报警任务", "故障任务", "异常上报", "巡查问题"],
          axisLine: {
            lineStyle: {
              color: "#cdd5e2",
            },
          },
          axisLabel: {
            textStyle: {
              color: "#666666",
            },
          },
        },

        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "#666666",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#cdd5e2",
              },
            },
          },
          {
            type: "value",
            name: "百分比",
            nameTextStyle: {
              color: "#666666",
            },
            position: "right",
            axisLine: {
              lineStyle: {
                color: "#cdd5e2",
              },
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              formatter: "{value} %", //右侧Y轴文字显示
              textStyle: {
                color: "#666666",
              },
            },
          },
        ],
        series: [
          {
            name: "上报问题数量",
            type: "bar",
            barWidth: "18px",
            barGap: "50%",
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#ccc",
                    fontSize: 10,
                  },
                },
                color: "#ffd680",
                barBorderRadius: 3,
              },
            },
            data: probleList,
          },
          {
            name: "解决问题数量",
            type: "bar",
            barWidth: "18px",
            barMaxWidth: "auto",
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#ccc",
                    fontSize: 10,
                  },
                },
                color: "#5dc1fd",
                barBorderRadius: 3,
              },
            },
            data: resolveList,
          },
          {
            name: "问题解决率",
            type: "line",
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: true, //平滑曲线显示
            // label: {
            //     show: true,
            //     formatter: '{c}%'
            // },
            symbol: "circle", //标记的图形为实心圆
            symbolSize: 6, //标记的大小
            itemStyle: {
              normal: {
                color: "#ffa43a",
                borderColor: "rgba(123, 224, 154, 0.5)", //圆点透明 边框
                borderWidth: 5,
              },
            },
            lineStyle: {
              color: "rgb(123,224,154)",
            },

            data: ratio,
          },
        ],
      };
    });
  }
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
.monitor-view {
  width: 100%;
  height: 100%;
  .content {
    padding: 10px;
    height: calc(100% - 52px);
    border-top: 1px solid #dde4eb;
    .fl-content {
      height: 540px;
      overflow: auto;
    }
    .fl-li {
      background: #f8f7f8;
      margin: 5px 0px;
      padding: 0px 10px;
      display: flex;
      justify-content: space-between;
      height: 25px;
      align-items: center;
      a{
         color: #000000;
      }
      a:hover{
         color: #2d8cf0;
         text-decoration: underline;
      }
    }
    .tab-icon {
      margin-right: 8px;
      font-size: 20px;
    }
  }
  #{$deep}.el-tabs--left.el-tabs--border-card .el-tabs__item.is-left {
    font-size: 18px;
    //  color:black;
  }
  //   #{$deep}.el-tabs--border-card > .el-tabs__content {
  //     height: 100%;
  //     overflow: auto;
  //   }
}
</style>
