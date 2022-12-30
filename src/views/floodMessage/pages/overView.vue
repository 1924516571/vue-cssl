<template>
  <!-- 监控 -->
  <div class="info">
    <div class="title">
      <title-bar :list="{ heading: '防汛监测', linHe: '60px' }"></title-bar>
      <div class="l-h">
        <suc-button type="primary" :config="{ ghost: true }" @click="details('http://www.nmc.cn/publish/radar/jiang-su/chang-zhou.htm')">雷达图</suc-button>
        <suc-button type="primary" :config="{ ghost: true }" @click="details('http://www.nmc.cn/publish/observations/hourly-winds.html')">风场图</suc-button>
        <suc-button type="primary" :config="{ ghost: true }" @click="details('http://www.nmc.cn/publish/satellite/FY4A-true-color.htm')">卫星云图</suc-button>
        <suc-button type="primary" :config="{ ghost: true }" @click="details('http://typhoon.nmc.cn/web.html   ')">台风路径</suc-button>
      </div>
    </div>
    <div class="left">
      <tab-switch :tabs="tabs" @get-tab="getTab"></tab-switch>
      <right-bar @rowEvents="rowEvents" :btnShow="btnShow" :type="type"></right-bar>
    </div>
    <div class="right">
      <div class="l-t">
        <div class="l-map">
          <div>
            <div>
              <MapManage :tabActiveIndex="btnActive" @onmarkerClick="onmarkerClick" @mapZoom="mapZoom" ref="maps">
                <!-- 影像图插槽 -->
                <template v-slot:yxt v-if="btnActive == 1">
                  <ol-layer v-for="(layer, index) in olMap.tdt2" :options="layer" :key="'tdt2' + index"></ol-layer>
                </template>
                <!-- <template v-slot:arealayer>
                                  <ol-layer
                                    v-for="(layer, index) in areaLayer"
                                    :options="layer"
                                    :key="'area' + index"
                                  ></ol-layer>
                				</template>-->
                <template v-slot:heat v-if="btnActive == 2">
                  <ol-heat-map v-bind="heatConfig" :z-index="2"></ol-heat-map>
                </template>

                <template v-slot:tdt2>
                  <div style="display: none"></div>
                </template>

                <template v-slot:wjLayer> </template>

                <!-- 站点弹框 -->
                <template v-slot:markerlayer>
                  <ol-overlay class="pop" v-if="MapInfo.show" :position="MapInfo.coords" :offset="MapInfo.offset" category="clickLabel">
                    <div class="map-modal">
                      <div class="map-header">
                        <span>站点信息</span>
                        <img src="../../../assets/gb.png" @click="mapClick" />
                      </div>
                      <div class="map-body">
                        <div>
                          <label>站点名称：</label>
                          <span>{{ MapInfo.data.name }}</span>
                        </div>
                        <template v-if="cardData.info.zmzt">
                          <div>
                            <label>闸门状态：</label>
                            <a v-for="(zm, index) in cardData.info.zmzt" :key="index">
                              <template v-if="zm != 0">
                                <img src="@/assets/monFlood/3.gif" />
                              </template>
                              <template v-if="zm == 0">
                                <img src="@/assets/monFlood/4.gif" />
                              </template>
                            </a>
                          </div>
                        </template>
                        <div>
                          <div
                            style="
															margin-right: 15px;
															width: auto;
														"
                          >
                            <label>经度：</label>
                            <span>{{ MapInfo.data.lon }}</span>
                          </div>
                          <div style="width: auto">
                            <label>纬度：</label>
                            <span>{{ MapInfo.data.lat }}</span>
                          </div>
                        </div>
                        <div
                          style="
														height: 200px;
														width: 100%;
													"
                        >
                          <v-chart
                            :options="options"
                            :autoresize="true"
                            style="
															width: 100%;
															height: 100%;
														"
                          ></v-chart>
                        </div>
                      </div>
                    </div>
                  </ol-overlay>
                  <!--:circle-style="{image:{circle:{fill:{color:[0,0,0]}}}}"-->
                </template>
              </MapManage>
              <!-- <div class="l-btn">
							</div> -->

              <!-- 地图按钮切换 -->
              <div class="l-map-btn bg-shadow">
                <tab-active :btns="btns" @get-btn="getBtn" :activeIndex="btnActive"></tab-active>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="l-b">
        <div class="tq">
          <title-bar :list="{ heading: '物资仓库', linHe: '50px' }"></title-bar>
          <site-weather></site-weather>
          <!-- <tq></tq> -->
        </div>
        <div class="wz">
          <title-bar :list="{ heading: '物资情况', linHe: '50px' }"></title-bar>
          <wz></wz>
        </div>
        <div class="wz">
          <title-bar :list="{ heading: '值班人员', linHe: '50px' }"></title-bar>
          <ry></ry>
        </div>
        <div class="wz">
          <title-bar :list="{ heading: '防汛组织', linHe: '50px' }"></title-bar>
          <fx></fx>
        </div>
        <div class="ry">
          <title-bar :list="{ heading: '警情信息', linHe: '50px' }"></title-bar>
          <jq></jq>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { State, Mutation, Action, namespace } from "vuex-class";
import { Checkbox, CheckboxGroup } from "iview";
import { SucSelect, SucInput, SucButton, SucRadio, SucRadioGroup, SucFormItem, SucCheckboxGroup, SucCheckbox, SucModal } from "@suc/ui";
import { SearchComponent, TablePage, MapManage, TitleBar, TabSwitch, TabActive, CreateTask } from "@/components";
import { wz, ry, yj, ya, fx, jq, tq, SiteWeather, RightBar, DispatchPage, ModalWz, ModalWx, ModalTf, ModalLd, ModalYj } from "./MonitorPage";
import { ModalConfig } from "@suc/ui/interfaces";
import { overview, networkApi, publicApi } from "@/api";
import { coordinateTransform } from "@suc/monch";
import { getBzIcon, getZmIcon, getBjIcon } from "@/constants/mapIcon";
import dayjs from "dayjs";
const mapStore = namespace("mapStore");
@Component({
  components: {
    SucSelect,
    SucInput,
    SucButton,
    SearchComponent,
    TablePage,
    SucRadio,
    SucRadioGroup,
    SucFormItem,
    MapManage,
    TitleBar,
    TabSwitch,
    TabActive,
    SucCheckboxGroup,
    SucCheckbox,
    wz,
    ry,
    fx,
    jq,
    yj,
    ya,
    tq,
    SiteWeather,
    RightBar,
    CreateTask,
    DispatchPage,
    SucModal,
    ModalWz,
    ModalWx,
    ModalTf,
    ModalLd,
    ModalYj,
    Checkbox,
    CheckboxGroup,
  },
})
export default class Enterprise extends Vue {
  type: number = 0;
  model: boolean = false;
  mapData: any = [];
  btnShow: boolean = false;
  show: boolean = false;
  wzShow: boolean = false;
  modalType: string = "wz";
  tabs: Array<any> = ["实时雨量", "重点水位", "重点工程", "河道", "运行简报"];
  config: ModalConfig = {
    transfer: false,
    "footer-hide": true,
    title: "",
    width: "85%",
  };
  markers: any = [];
  newPoint: any = [];
  gisPoint: any = [];
  olMap = this.$getMapConfig();
  @mapStore.State markerFlag: any;
  @mapStore.Mutation setMarkers: any;
  @State netWork: any;
  @Mutation setRow: any;
  MapInfo: any = {
    info: {},
    coords: [],
    offset: [0, -40],
    show: false,
  };

  btnActive: number = 0;
  btns: any[] = ["天地图", "影像图"];

  rowEvents(row: any) {
    this.MapInfo.show = true;
    let name = row.zdmc || row.stnm || row.stationName;
    let lon = row.lgtd || row.lon;
    let lat = row.lttd || row.lat;
    let id = row.stcd || row.zdbh || row.stationId;
    this.MapInfo.data = {
      name: name,
      lon: lon,
      lat: lat,
      id: id,
      mtype: row.type,
    };
    this.MapInfo.info = row;
    this.MapInfo.coords = [];
    if (lon && lat) {
      let jd = lon;
      let wd = lat;
      if (row.key == "YL") {
        this.MapInfo.coords = [Number(jd) + 0.00001, Number(wd) + 0.00001];
      } else {
        this.MapInfo.coords = [jd, wd];
      }
      this.getMarkerInfo();
      this.getLocation(this.MapInfo.coords);
    }
  }

  //地图定位
  getLocation(coords: any) {
    const maps: any = this.$refs.maps;
    const mapRoot: any = maps.$refs.mapObject;
    const tranPosN = coordinateTransform(coords, "EPSG:4326", "EPSG:3857");
    mapRoot.$view.animate({
      center: tranPosN,
      zoom: 16,
    });
  }

  getBtn(index: number) {
    this.btnActive = JSON.parse(JSON.stringify(index));
  }

  mounted() {
    // this.getAllStation();
     var a  = [
      //  {lgtd:120.607923,lttd:31.715686,id:1,stcd:'走马塘尚湖镇段'},
      //  {lgtd:120.756667,lttd:31.736092,id:2,stcd:2,},
      //  {lgtd: 120.790102,lttd:31.808945,id:3,stcd:3,},
      //  {lgtd:120.881541,lttd:31.709237,id:4,stcd:4,},
      //  {lgtd:120.705625,lttd:31.621941,id:5,stcd:5,},
      //  {lgtd:120.739976,lttd:31.610144,id:6,stcd:6,},
      //  {lgtd:120.698982,lttd:31.546337,id:7,stcd:7,},
      //  {lgtd:120.748548,lttd:31.637017,id:8,stcd:8,},
      //  {lgtd:120.740891,lttd:31.654446,id:9,stcd:9,},
      //  {lgtd:120.739976,lttd:31.600144,id:10,stcd:10,},
      //  {lgtd:120.758275,lttd:31.693042,id:11,stcd:11,},
      //  {lgtd:120.610592,lttd:31.620587,id:12,stcd:'望虞河吉家桥',},
      //  {lgtd:120.582965,lttd:31.689787,id:12,stcd:'锡北运河王庄',},
      //  {lgtd:120.951804,lttd:31.661056,id:12,stcd:'金泾塘徐市段',},
      //  {lgtd:120.962254,lttd:31.536423,id:12,stcd:'七浦塘杏泾站',},
      //  {lgtd:120.684654,lttd:31.677103,id:13,stcd:'尚湖站',},
      //  {lgtd:120.883954,lttd:31.597368,id:13,stcd:'白茆塘站',},
      //  {lgtd:120.754217,lttd:31.819143,id:13,stcd:'横塘东闸',},
       {lgtd:120.963106,lttd:31.753766,id:13,stcd:'徐六泾站',},
      ]

    this. getRainGis(a)
  }

  getTab(index: number) {
    this.type = index;
  }

  details(url: string) {
    window.open(url);
  }

  //获取所有点位
  async getAllStation() {
    let url = "wjServer/fangxunjc/z/points";
    let data = await publicApi.getNoParam(url);
    this.getRiverGis(data.data.ZZ);
    this.getRainGis(data.data.PP);
    this.getStationGis(data.data.DP);
  }

  // 泵站
  async getStationGis(data: any) {
    let that = this;
    let gisData = data.map((arr: any) => {
      let item = {
        id: arr.stcd,
        name: arr.stnm,
        lon: arr.lgtd,
        lat: arr.lttd,
        type: "",
        coords: [arr.lgtd, arr.lttd],
        sbzt: arr[4], //设备状态
        sjzt: arr[5], //数据状态
        mid: arr.stcd,
        mtype: "DP",
      };
      return item;
    });
    let icon = "泵站";
    that.newPoint = gisData[0];
    that.getGisData(gisData, icon);
  }

  //雨量
  getRainGis(data: any) {
    let that = this;
    let gisData = data.map((arr: any) => {
      let item = {
        id: arr.stcd,
        name: arr.stnm,
        lon: Number(arr.lgtd) + 0.00001,
        lat: Number(arr.lttd) + 0.00001,
        type: "",
        coords: [Number(arr.lgtd) + 0.00001, Number(arr.lttd) + 0.00001],
        sbzt: arr[4], //设备状态
        sjzt: arr[5], //数据状态
        mid: arr.stcd,
        mtype: "PP",
      };

      return item;
    });
    let icon = "雨量";
    that.getGisData(gisData, icon);
  }

  // 水位
  getRiverGis(data: any) {
    let that = this;
    let gisData = data.map((arr: any) => {
      let item = {
        id: arr.stcd,
        name: arr.stnm,
        lon: arr.lgtd,
        lat: arr.lttd,
        type: "",
        coords: [arr.lgtd, arr.lttd],
        // sbzt: arr[4], //设备状态
        // sjzt: arr[5], //数据状态
        mid: arr.stcd,
        mtype: "ZZ",
      };

      return item;
    });
    let icon = "水位";
    that.getGisData(gisData, icon);
  }

  // 地图
  getGisData(gisdata: any, icon: any) {
    // gisdata = gisdata.filter((e: any) => e.lon && e.lat);
    let arr = gisdata.map((item: any) => {
      let src = "";
      src = require("@/assets/map/雨量-正常.png");
      return Object.assign(item, {
        style: {
          image: {
            icon: {
              scale: 0.5,
              anchor: [0.5, 1],
              src: src,
            },
          },
        },
      });
    });
    this.markers = this.markers.concat(arr);
    this.setMarkers(this.markers);
    this.gisPoint = JSON.parse(JSON.stringify(this.markers));
  }

  //监听地图变化
  mapZoom(nva: number, ona: number) {
    let scale = 0.5;
    if (nva == 13) {
      scale = 0.6;
    } else if (nva == 14) {
      scale = 0.7;
    } else if (nva >= 15) {
      scale = 1;
    }
    this.markers.forEach((it: any) => {
      it.style.image.icon.scale = scale;
    });
    this.setMarkers(this.markers);
  }

  //点位点击
  onmarkerClick(info: any) {
    this.MapInfo.show = false;
    this.MapInfo.data = info;
    this.MapInfo.info = info.info ? info.info : null;
    this.MapInfo.coords = [];
    this.$nextTick(() => {
      this.MapInfo.show = true;
      this.MapInfo.coords = info.coords || [];
    });
    this.getMarkerInfo();
  }

  //地图弹框关闭
  mapClick() {
    this.MapInfo.show = false;
  }

  markerParams: any = {
    stcd: "",
    type: "",
  };
  /**
   * 水位-ZZ
   * 泵站-DP
   * 降雨-PP
   */
  cardData: any = {
    info: {},
  };

  async getMarkerInfo() {
    let { mtype, id } = this.MapInfo.data;
    this.markerParams.type = mtype;
    this.markerParams.stcd = id;
    let url = "wjServer/wj/gis/line";
    let data = await publicApi.getWithParam(url, this.markerParams);
    this.options.xAxis.data = [];
    this.options.series[0].data = [];
    switch (mtype) {
      case "ZZ":
        if (data.data) {
          this.options.xAxis.data = data.data.zX;
          this.options.series[0].data = data.data.neiheY;
        }
        break;

      case "DP":
        if (data.data) {
          this.cardData.info.zmzt = data.data.tFcZmkdssds.map((e: any) => {
            for (let key in e) {
              console.log(e.zmkd);
              return e.zmkd;
            }
          });
          this.options.xAxis.data = data.data.zbzX;
          this.options.series[0].data = data.data.zbzNeiY;
        }

        break;
      case "PP":
        if (data.data) {
          this.options.xAxis.data = data.data.pX;
          this.options.series[0].data = data.data.pY;
        }
        break;
    }
  }

  // 24小时水位过程线
  color: any[] = ["#5f77ec", "#5397ff", "#58dde0", "#feb543"];
  options: any = {
    color: this.color,
    tooltip: {
      trigger: "axis",
    },
    grid: {
      top: "15%",
      // right:'1%',
      // left:'1%',
      bottom: "18%",
      containLable: true,
    },
    // legend: {
    //   x: 'right',
    //   icon: 'circle',
    //   itemWidth: 10,
    //   itemHeight: 10,
    //   data: ['监控数量', '预警数量']
    // },

    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        // rotate: -30,
        color: "#666",
      },
      splitLine: {
        show: false,
      },
      data: [],
    },
    yAxis: {
      name: "单位：",
      min: 0,
      max: 10,
      nameTextStyle: {
        color: "#999",
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        color: "#999",
      },
    },
    series: [
      {
        name: "水位变化",
        type: "line",
        lineStyle: {},
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#5397ff", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(83,151,255,0.2)", // 100% 处的颜色
              },
            ],
          },
        },
        data: [],
      },
    ],
  };
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
#{$deep} .point-info {
  position: absolute;
  top: 68px;
  right: 20px;
  // width: 232px;
  pointer-events: auto;
}
#{$deep} .measure-btn {
  position: absolute;
  top: 138px;
  right: 20px;
}
.info {
  width: 100%;
  height: 100%;
  padding: 10px;
  background: #efeff1;
  display: flex;
  flex-wrap: wrap;
  .title {
    width: 100%;
    height: 60px;
    margin-bottom: 10px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
    border-radius: 3px;
    background: #fff;
    position: relative;
    .l-h {
      width: auto;
      height: auto;
      position: absolute;
      top: 0;
      right: 15px;

      .ivu-btn {
        float: right;
        margin: 14px 0 0 14px;
      }
    }
  }
  .left {
    width: 24%;
    height: calc(100% - 70px);
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
    border-radius: 3px;
    background: #fff;

    .tab-switch {
      width: 100%;
      height: 53px;
      border-bottom: 1px solid #dde4eb;
      padding-top: 20px;
    }
  }
  .right {
    width: calc(76% - 10px);
    height: calc(100% - 80px);
    margin-left: 10px;

    .l-t {
      width: 100%;
      height: 68%;
      margin-bottom: 10px;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
      border-radius: 3px;
      background: #fff;
      position: relative;

      .l-map {
        width: 100%;
        height: 100%;
        // border-top: 1px solid #dde4eb;
        // padding: 15px;
        // filter: grayscale(100%) invert(100%) !important;
        filter:hue-rotate(20deg) saturate(2) brightness(.5) !important;

        div {
          width: 100%;
          height: 100%;
          border: solid 1px rgba(112, 112, 112, 0.1);
          position: relative;

          div {
            width: 100%;
            height: 100%;
            .main-map {
              width: 100%;
              height: 100%;
              border: none;
              line-height: normal;
              padding-left: 0;

              div {
                border: none;
                line-height: normal;
                padding-left: 0;
              }
            }

            .l-btn {
              width: auto;
              height: auto;
              position: absolute;
              right: 20px;
              top: 20px;
              border: none;
              line-height: normal;
              padding: 0;
            }

            .l-map-btn {
              position: absolute;
              right: 20px;
              width: auto;
              height: auto;
              bottom: 20px;
              //   border: solid 1px #3a7bef;
              //   border-radius: 4px;
              //   background: chartreuse;
            }

            .map-modal {
              width: auto;
              box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.08);

              .map-header {
                width: auto;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: #3a7bef;
                color: #fff;
                padding: 0 15px;

                img {
                  width: 10px;
                  height: 10px;
                  cursor: pointer;
                }
              }

              .map-body {
                padding: 0 15px;
                height: auto;

                div {
                  height: 30px;
                  display: flex;
                  align-items: center;
                  // &:last-child {
                  //   justify-content: space-between;
                  // }
                }
              }

              .map-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 15px 0;
              }
            }
          }
        }
      }
    }

    .l-b {
      width: 100%;
      height: 32%;
      display: flex;
      .wz,
      .ry,
      .l-b-r,
      .tq {
        width: 20%;
        // width: calc((70% - 30px) / 3);
        height: 100%;
        margin-right: 10px;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
        border-radius: 3px;
        background: #fff;
      }
      .ry {
        margin-right: 0px;
      }
      .l-b-r {
        box-shadow: none;
        background: none;
      }

      .yj,
      .ya {
        width: 100%;
        height: calc(45% - 5px);
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
        border-radius: 3px;
        background: #fff;
      }

      .yj {
        height: calc(55% - 5px);
        margin-bottom: 10px;
      }

      .l-b-t {
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding: 0 15px;
      }
    }
  }
}
</style>
