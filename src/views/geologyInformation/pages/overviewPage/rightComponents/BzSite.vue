<template>
  <!-- 泵站站点情况 -->
  <div class="site scroll">
    <div class="site-item">
      <panel-view heading="站点断面">
        <div class="content">
          <div class="content-item">
            <div>
              <span>警戒水位：</span>
              <span class="blue-font">{{ lists.warningZ }}</span>
              <span>m</span>
            </div>
            <div class="time">
              <span>时间：</span>
              <span>{{ lists.updateTime }}</span>
            </div>
          </div>
          <div class="content-item">
            <v-chart :options="options" :autoresize="true" style="width:100%;height:100%;"></v-chart>
          </div>
        </div>
      </panel-view>
    </div>
    <div class="site-item">
      <panel-view heading="简介">
        <div class="instruction">
          <div class="instruction-item">
            <suc-form :config="{ 'label-width': 100 }">
              <suc-form-item :config="{ label: '泵站名称：' }">
                <suc-input style="width: 100%" readonly v-model="lists.stationName"></suc-input>
              </suc-form-item>
              <suc-form-item :config="{ label: '行政区域：' }">
                <suc-input style="width: 100%" readonly v-model="lists.area"></suc-input>
              </suc-form-item>
              <suc-form-item :config="{ label: '所在河道:' }">
                <suc-input style="width: 100%" readonly v-model="lists.river"></suc-input>
              </suc-form-item>
              <suc-form-item :config="{ label: '水泵数量:' }">
                <suc-input style="width:100%" readonly v-model="lists.pumpNum"></suc-input>
              </suc-form-item>
              <suc-form-item :config="{ label: '总流量:' }">
                <suc-input style="width:100%" readonly v-model="lists.totalQ"></suc-input>
              </suc-form-item>
              <suc-form-item :config="{ label: '经度:' }">
                <suc-input style="width: 100%" readonly v-model="lists.lon"></suc-input>
              </suc-form-item>
              <suc-form-item :config="{ label: '纬度:' }">
                <suc-input style="width:100%" readonly v-model="lists.lat"></suc-input>
              </suc-form-item>

              <!-- <suc-form-item :config="{ label: '经纬度：' }">
                  <suc-input style="width: 100%" readonly :value="`${lists.lgtd},${lists.lttd}`"></suc-input>
                </suc-form-item>
                <suc-form-item :config="{label:`泵位${item.bwbm}：`}" v-for="(item) in lists.bjs" :key="item.bwbm">
                  <suc-input style="width: 100%" readonly :value="`泵位流量(m³/s):${item.bwll},泵位功率(kw):${item.bwgl}`"></suc-input>
                </suc-form-item> -->
            </suc-form>
          </div>
        </div>
      </panel-view>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { SucForm, SucFormItem, SucInput, SucSelect, SucButton } from "@suc/ui";
import { publicApi } from "@/api";
import { SelectConfig, SelectOptions } from "@suc/ui/interfaces";
import { Carousel, CarouselItem } from "iview";
import { PanelView, TabActive } from "@/components";
@Component({
  components: {
    SucForm,
    SucFormItem,
    SucInput,
    SucSelect,
    Carousel,
    CarouselItem,
    PanelView,
    TabActive,
    SucButton,
  },
})
export default class Site extends Vue {
  @Prop({
    type: Object,
    default: () => {},
  })
  row: any;
  selectOptions: SelectOptions = [];
  options: any = {
    grid: {
      top: "5%",
      right: "5%",
      left: "5%",
      bottom: "2%",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      data: [],
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
    series: [
      {
        name: "水位",
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: "#b29d7c",
        },
        areaStyle: {
          color: "#b29d7c",
        },
        markArea: {
          silent: true,
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "rgb(92, 193, 244,0)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgb(92, 193, 244,1)", // 100% 处的颜色
                },
              ],
            },
          },
          data: [
            [
              {
                yAxis: 0,
              },
              {
                name: "当前水位:20m",
                yAxis: 20,
              },
            ],
          ],
          label: {
            show: false,
            position: "insideTopRight",
            color: "#fff",
            backgroundColor: "#3a7bef",
            padding: [3, 5, 3, 5],
          },
        },
        markLine: {
          silent: true,
          symbol: "none",

          data: [
            {
              name: "警戒水位：",
              yAxis: "",
              lineStyle: {
                type: "solid",
                color: "#eb4e3c",
              },
              label: {
                position: "insideStartTop",
                color: "#fff",
                backgroundColor: "#eb4e3c",
                padding: [3, 5, 3, 5],
                formatter: "{b}",
              },
            },
            {
              name: "内河水位:",
              yAxis: 20,
              lineStyle: {
                type: "solid",
                color: "#3a7bef",
              },
              label: {
                position: "insideEndTop",
                color: "#fff",
                backgroundColor: "#3a7bef",
                padding: [3, 5, 3, 5],
                formatter: "{b}",
              },
            },
            {
              name: "外河水位:",
              yAxis: 20,
              lineStyle: {
                type: "solid",
                color: "#009900",
              },
              label: {
                position: "middle",
                color: "#fff",
                backgroundColor: "#009900",
                padding: [3, 5, 3, 5],
                formatter: "{b}",
              },
            },
          ],
        },
        data: [25, 2, 2, 2, 2, 25],
      },
    ],
  };
  lists: any = {}; //保存数据对象
  detailParams: any = {
    stationId: "", //点击每行对应的id
  };

  @Watch("row", { deep: true, immediate: true })
  getRow(row: any) {
    this.detailParams = {
      stationId: row.stationId,
    };
    this.getRiverInfo(); //获取河道信息
  }

  // 获取站点概况信息
  async getRiverInfo() {
    this.lists = {};
    let url = "wjServer/fangxunjc/zhabengzhanyx/stationSituation";
    let data = await publicApi.getWithParam(url, this.detailParams);
    if (data.result == true) {
      this.lists = data.data;
      this.options.series[0].markLine.data[0].yAxis = this.lists.warningZ || 0;
      this.options.series[0].markLine.data[0].name = "警戒水位：" + (this.lists.warningZ || "-") + "m";
      this.options.series[0].markLine.data[1].yAxis = this.lists.nhsw || 0;
      this.options.series[0].markLine.data[1].name = "内河水位：" + (this.lists.nhsw || "-") + "m";
      this.options.series[0].markLine.data[2].yAxis = this.lists.whsw || 0;
      this.options.series[0].markLine.data[2].name = "外河水位：" + (this.lists.whsw || "-") + "m";
    } else {
      this.lists = {};
    }
  }
}
</script>
<style lang="scss">
.instruction-item {
  .ivu-form-item {
    margin-bottom: 6px;
  }
}
.instruction-swipper {
  .ivu-carousel-list {
    height: 100%;
  }
}
</style>
<style lang="scss" scoped>
.site {
  position: relative;
  overflow: auto;
  .site-item {
    font-size: 14px;
    color: #666;
  }
  .content {
    .content-item {
      padding: 0 10px;
      &:first-of-type {
        display: flex;
        justify-content: space-between;
      }
      &:nth-of-type(2) {
        display: flex;
        justify-content: center;
        height: 200px;
        .duan-mian {
          display: flex;
          justify-content: center;
          position: relative;
          width: 121px;
          height: 100%;
          background: url("../../../../../assets/flood/duanmian.png") no-repeat center;
          background-size: cover;
          .duan-mian-item {
            &:first-of-type {
              position: absolute;
              bottom: 20px;
              width: 54px;
              height: 139px;
              background-image: linear-gradient(#5397ff, #ffffff);
              opacity: 0.4;
            }
            &:nth-of-type(2) {
              position: absolute;
              top: 15%;
              right: -100%;
              .txt {
                // position: relative;
                padding: 6px 10px;
                color: #fff;
                background-color: #3a7bef;
                border-radius: 2px;
                &:before {
                  position: absolute;
                  top: 15px;
                  left: -90px;
                  content: "";
                  width: 90px;
                  border: solid 1px #5397ff;
                }
              }
            }
            &:nth-of-type(3) {
              position: absolute;
              top: 25%;
              left: -100%;
              .txt {
                // position: relative;
                padding: 6px 10px;
                color: #fff;
                background-color: #eb4e3c;
                border-radius: 2px;
                &:before {
                  position: absolute;
                  top: 15px;
                  right: -90px;
                  content: "";
                  width: 90px;
                  border: solid 1px #ff5a47;
                }
              }
            }
          }
        }
      }
    }
    .blue-font {
      font-size: 20px;
      color: #3a7bef;
    }
    .time {
      color: #999;
    }
  }
  .instruction {
    .btn {
      margin: 0 10px 6px;
      width: 118px;
    }
    .swipper-img {
      display: flex;
      justify-content: center;
      height: 100%;
    }
    .instruction-swipper {
      display: flex;
      justify-content: center;
      height: 200px;
    }
    .instruction-item {
      padding: 0 10px;
    }
  }
}
</style>
