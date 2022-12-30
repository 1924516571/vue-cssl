<template>
  <div class="module-view">
    <!-- 地图层 -->
    <div class="main-map">
      <map-manage ref="maps" :sxflag="sxflag" @onmarkerClick="onmarkerClick" @mapZoom="mapZoom" @mapSingClick="mapSingClick">
        <!-- 站点弹框 -->
        <template v-slot:markerlayer>
          <div>
            <div v-if="MapInfo.show">
              <ol-overlay class="pop" :position="MapInfo.coords" :offset="MapInfo.offset" category="clickLabel" ref="test">
                <!-- 雨量站 -->
                <div class="map-modal" v-if="ylzLine">
                  <div class="map-header">
                    <span class="cl">{{ MapInfo.data.name }}</span>
                    <span class="detail" @click="onDetail">详情</span>
                    <img src="../../../assets/gb.png" @click="mapClick" />
                  </div>
                  <div class="map-body">
                    <div style="position: relative;top:30px;font-size:20px;">今日累计雨量:{{ grandTotal + "mm" }}</div>
                    <div style="height: 600px;	width: 100%;">
                      <v-chart :options="options1" :autoresize="true" style="width: 100%;height: 100%;	"></v-chart>
                    </div>
                  </div>
                </div>
                <!-- 水位站 -->
                <div class="map-modal" v-if="swLine">
                  <div class="map-header">
                    <span class="cl"
                      >{{ MapInfo.data.name }}<span>{{ realWater ? realWater + "m" : "" }}</span></span
                    >
                    <span class="detail" @click="onsWDetail">详情</span>
                    <img src="../../../assets/gb.png" @click="mapClick" />
                  </div>
                  <div class="map-body">
                    <div style="height: 200px;	width: 100%;">
                      <div v-if="isDisplay" class="noData">暂无数据</div>
                      <v-chart :options="options" :autoresize="true" style="width: 100%;height: 100%;	"></v-chart>
                    </div>
                  </div>
                </div>
                  
                <div class="map-modal" v-if="hdLine">
                  <div class="map-header">
                    <span class="cl"
                      >{{ MapInfo.data.name }}<span>{{ realWater ? realWater + "m" : "" }}</span></span
                    >
                    <span class="detail" @click="onsWDetail">详情</span>
                    <img src="../../../assets/gb.png" @click="mapClick" />
                  </div>
                  <div class="map-body">
                    <div style="height: 200px;	width: 100%;">
                      <div v-if="isDisplay" class="noData">暂无数据</div>
                      <v-chart :options="hdoption" :autoresize="true" style="width: 100%;height: 100%;	"></v-chart>
                    </div>
                  </div>
                </div>
                <div class="map-modal" v-if="zbz">
                  <div class="map-header">
                    <span class="cl">{{ MapInfo.data.name }}</span>
                    <span class="detail" @click="onZbzDetail">详情</span>
                    <img src="../../../assets/gb.png" @click="mapClick" />
                  </div>
                  <div class="map-bottom">
                    <div class="zbzModal">
                      <div class="showImg">
                        <div class="img">
                          <el-image :src="imgurl" :preview-src-list="srcList" style="width:100%; height:100%"> </el-image>
                        </div>
                      </div>
                      <div class="textDes scroll" v-if="MapInfo.data.type == 'DP'">
                        <div>管理员：{{ zbzAlldata.kgr }}</div>
                        <div>行政区域:{{ zbzAlldata.xzqy }}</div>
                        <div>所在联圩:{{ zbzAlldata.lwmc }}</div>
                        <div>所在河道:{{ zbzAlldata.river }}</div>
                        <div>泵站类型:{{ zbzAlldata.zhantype }}</div>
                        <div>设计流量:{{ zbzAlldata.desnum }}</div>
                        <div>机组台数:{{ zbzAlldata.num }}</div>
                        <div>联系方式:{{ zbzAlldata.tel }}</div>
                      </div>
                      <div class="textDes scroll" v-if="MapInfo.data.type == 'DD'">
                        <div>管理员：{{ zzData.kgr }}</div>
                        <div>行政区域:{{ zzData.xzqy }}</div>
                        <div>所在联圩:{{ zzData.lwmc }}</div>
                        <div>所在河道:{{ zzData.river }}</div>
                        <div>水闸类型:{{ zzData.zhatype }}</div>
                        <div>闸门高度:{{ zzData.zhahei }}</div>
                        <div>闸门宽度:{{ zzData.zhawid }}</div>
                        <div>联系方式:{{ zzData.tel }}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="map-modal" v-if="wzck">
                  <div class="map-header">
                    <span class="cl">{{ MapInfo.data.name }}</span>
                    <span class="detail" @click="onWzkcDetail">详情</span>
                    <img src="../../../assets/gb.png" @click="mapClick" />
                  </div>
                  <div class="map-bottom">
                    <div class="wzkcModal">
                      <div>负责人:{{ MapInfo.data.ckFzr }}</div>
                      <div>行政区域:{{ MapInfo.data.ckAreaName }}</div>
                      <div>地址:{{ MapInfo.data.ckAddress }}</div>
                      <div>电话:{{ MapInfo.data.ckTel }}</div>
                    </div>
                  </div>
                </div>
                <div class="map-modal" v-if="qxdw">
                  <div class="map-header">
                    <span class="cl">{{ MapInfo.data.name }}</span>
                    <img src="../../../assets/gb.png" @click="mapClick" />
                  </div>
                  <div class="map-bottom">
                    <div class="wzkcModal">
                      <div>负责人:{{ MapInfo.data.dwFzr }}</div>
                      <div>行政区域:{{ MapInfo.data.dwAreaName }}</div>
                      <div>机构性质:{{ MapInfo.data.jgType }}</div>
                      <div>现有人数:{{ MapInfo.data.peopleNum }}</div>
                      <div>地址:{{ MapInfo.data.ckAddress }}</div>
                      <div>电话:{{ MapInfo.data.ckTel }}</div>
                    </div>
                  </div>
                </div>
              </ol-overlay>
            </div>

            <!-- 雨量站弹框 -->
            <div v-if="MapInfo.detailShow">
              <ylz-modal :info="info" @close="closeModal"></ylz-modal>
            </div>

            <!-- 水位弹框 -->
            <div v-if="MapInfo.swdetailShow">
              <sw-modal :info="swInfo" @close="sWcloseModal"></sw-modal>
            </div>

            <!-- 闸泵站弹框 -->
            <div v-if="MapInfo.zbzdetailShow">
              <zbz-modal :info="zbzInfo" @close="zbzcloseModal"></zbz-modal>
            </div>

            <!-- 物资仓库弹框 -->
            <div v-if="MapInfo.wzkcdetailShow">
              <wzck-modal :info="wzkcInfo" @close="wzckcloseModal"></wzck-modal>
            </div>

            <!-- 河道弹框
            <div v-if="MapInfo.swdetailShow">
              <sw-modal :info="swInfo" @close="sWcloseModal"></sw-modal>
            </div> -->

            <!--闪烁光圈  -->
            <ol-flash v-if="MapInfo.show" :coords="MapInfo.coords" :loops="1" :duration="2000" :radius-range="[0, 25]"></ol-flash>
          </div>
        </template>

        <!-- 常熟Gujson -->
        <template v-slot:wjLayer>
          <ol-layer v-for="(layer, index) in olMap.wjLayer" :options="layer" :key="'layer' + index"></ol-layer>
        </template>
      </map-manage>

      <!-- <suc-modal :config="config" :value="videoShow" @on-cancel="goBack(false)" @on-visible-change="goBack">
        <div class="map-modal1">
        </div>
      </suc-modal> -->
    </div>
    <!-- 左侧 -->
    <div class="left" ref="leftDiv">
      <div class="left_t" @click="onTc">图层</div>
      <div ref="left_sx">|</div>
      <div class="left_t" @click="onJc">监测</div>
      <div @click="onArrow">
        <i v-if="arrowLeft" class="el-icon-arrow-left"> </i>
        <i v-else-if="arrowLeft == false" class="el-icon-arrow-right"> </i>
      </div>
    </div>

    <!--图层信息  -->
    <div :class="flag ? 'tc' : 'tc1'">
      <overview-panel-yq :sendType="sendType" ref="child" @get-wq="getWq" @getSx="getSx" @childClick="getClickType"></overview-panel-yq>
    </div>

    <!-- 监测信息 -->
    <div class="jc" v-if="jcflag">
      <!-- <tab-switch :tabs="tabs" @get-tab="getTab"></tab-switch> -->
      <right-bar @rowEvents="rowEvents" :btnShow="btnShow" :type="type"></right-bar>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { State, Mutation, Action, namespace } from "vuex-class";
import { SearchComponent, TablePage, MapManage, TitleBar, TabSwitch, TabActive, CreateTask } from "@/components";
import { SucSelect, SucButton, SucInput, SucFormItem, SucDatePicker, SucModal, SucTabPane } from "@suc/ui";
import { OverviewPanel, YlzModal, SwModal, ZbzModal, WzckModal, OverviewPanelYq } from "./overviewPage";
import { coordinateTransform } from "@suc/monch";
import { RightBar } from "./MonitorPage";
import { getBzIcon, getZmIcon, getBjIcon, getYlzIcon } from "@/constants/mapIcon";
import { overview, networkApi, publicApi, infoApi } from "@/api";
import { ModalConfig } from "@suc/ui/interfaces";
import { values } from "lodash";

const mapStore = namespace("mapStore");
@Component({
  components: {
    MapManage,
    OverviewPanel,
    TabActive,
    TabSwitch,
    RightBar,
    SucButton,
    SucDatePicker,
    SucModal,
    YlzModal,
    SwModal,
    ZbzModal,
    WzckModal,
    OverviewPanelYq,
  },
})
export default class OverView extends Vue {
  // config: ModalConfig = {
  //   transfer: false,
  //   title: "视频",
  //   "footer-hide": true,
  //   width: 680,
  //   "mask-closable": false,
  // };
  grandTotal: any = ""; //今日累计雨量
  type: number = 0;
  // tabs: Array<any> = ["实时雨量", "重点水位", "重点工程", "河道", "运行简报"];
  tabs: Array<any> = ["雨情"];
  btnShow: boolean = false;
  sxflag: any = true;
  olMap = this.$getMapConfig();
  @mapStore.State markerFlag: any;
  @mapStore.Mutation setMarkers: any;
  @State netWork: any;
  @Mutation setRow: any;
  MapInfo: any = {
    info: {},
    coords: [],
    offset: [0, 350],
    show: false,
    data: {},
    detailShow: false,
    swdetailShow: false, //水位
    hddetailShow: false, //河道
    zbzdetailShow: false, //闸泵站弹框
    wzkcdetailShow: false, //物资仓库
  };

  gisPoint: any = [];
  newPoint: any = [];
  markers: any = [];
  arrowLeft = true;  //默认进来箭头点击事件的显示
  mapObject: any = [];
  // 实时水位
  realWater: any = "";
  imgurl: any = "";
  srcList: any = [];

  flag: Boolean = true;
  jcflag: Boolean = false;

  mapSingClick(e: any) {}

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
  }

  clickType: any = "";
  //  接收子组件传过来的值
  getClickType(type: any) {
    this.clickType = type;
  }
  @Watch("clickType", { immediate: true, deep: true })
  remove() {
    this.ylzLine = false;
    this.swLine = false;
    this.zbz = false;
    this.wzck = false;
    this.qxdw = false;
    this.MapInfo.detailShow = false;
    this.MapInfo.hddetailShow = false;
    this.MapInfo.zbzdetailShow = false;
    this.MapInfo.wzkcdetailShow = false;
    this.MapInfo.swdetailShow = false;
    this.markers = [];
    this.MapInfo.show = false;
    if (this.arrowLeft == false) {
      this.getLocation1([120.7918208331299, 31.66179903206833]);
    } else {
      this.getLocation1([120.76147510220207, 31.669030901614576]);
    }
    // this.getLocation1([120.75225, 31.65374]);
  }
  getLocation1(coords: any) {
    const maps: any = this.$refs.maps;
    const mapRoot: any = maps.$refs.mapObject;
    const tranPosN = coordinateTransform(coords, "EPSG:4326", "EPSG:3857");
    mapRoot.$view.animate({
      center: tranPosN,
      zoom: 11.5,
    });
  }

  getWq(a: any) {
    this.olMap.wjLayer[5].visible = a;
  }
  getSx(sx: any) {
    this.olMap.wjLayer[2].visible = sx;
  }

  sendType: any = false;
  onTc() {
    this.MapInfo.show = false;
    this.sendType = false;
    this.$nextTick(() => {
      this.sendType = true;
    });
    if (this.arrowLeft) {
      this.markers = [];
      this.jcflag = false;
      this.flag = true;
      (this.$refs.child as any).getRainPoint();
    }
  }
  // 监测
  onJc() {
    this.MapInfo.show = false;
    if (this.arrowLeft) {
      this.flag = false;
      this.jcflag = true;
      this.markers = []; //清空图层点位
      // this.setMarkers(this.markers);
      // this.getAllStation(); //获取所有点位
      this.getTab(1);
    }
  }

  getTab(index: any) {
    this.MapInfo.show = false;
    this.ylzLine = false;
    this.swLine = false;
    this.zbz = false;
    this.wzck = false;
    this.qxdw = false;
    this.MapInfo.detailShow = false;
    this.MapInfo.hddetailShow = false;
    this.MapInfo.zbzdetailShow = false;
    this.MapInfo.wzkcdetailShow = false;
    this.MapInfo.swdetailShow = false;
    this.markers = [];
    this.getLocation1([120.76147510220207, 31.669030901614576]);
    this.type = index;
    if (this.type == 0) {
      this.getAllSwStation();
    } else if (this.type == 1) {
      this.getAllYlStation();
    }
  }
  info: any = "";
  // 获取弹框详情数据
  onDetail() {
    this.MapInfo.show = false;
    this.$nextTick(() => {
      this.MapInfo.detailShow = true;
      this.info = this.MapInfo;
    });
  }
  swInfo: any = "";
  //水位详情
  onsWDetail() {
    this.MapInfo.show = false;
    this.$nextTick(() => {
      this.MapInfo.swdetailShow = true;
      this.swInfo = this.MapInfo;
    });
  }

  //地图弹框关闭
  mapClick() {
    this.MapInfo.show = false;
  }

  //  三级页面弹框关闭
  closeModal() {
    this.MapInfo.detailShow = false;
  }

  sWcloseModal() {
    this.MapInfo.swdetailShow = false;
  }

  zbzcloseModal() {
    this.MapInfo.zbzdetailShow = false;
  }

  wzckcloseModal() {
    this.MapInfo.wzkcdetailShow = false;
  }

  rowEvents(row: any) {
    this.ylzLine = false;
    this.swLine = false;
    this.zbz = false;
    this.wzck = false;
    this.qxdw = false;
    this.MapInfo.detailShow = false;
    this.MapInfo.hddetailShow = false;
    this.MapInfo.zbzdetailShow = false;
    this.MapInfo.wzkcdetailShow = false;
    this.MapInfo.swdetailShow = false;
    this.markers = [];
    this.MapInfo.show = false;
    this.$nextTick(() => {
      this.MapInfo.show = true;
    });

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
      if (row.type == "ZZ") {
        this.MapInfo.coords = [Number(jd) + 0.00001, Number(wd) + 0.00001];
        this.getSwzLine(); //水位
        this.getLocation(this.MapInfo.coords);
      } else {
        this.MapInfo.coords = [jd, wd];
        this.getYlzLine(); //雨量
        this.getLocation(this.MapInfo.coords);
      }
      // this.getMarkerInfo();
      // this.getSwzLine();
    }
  }
  //直线图参数
  markerParams: any = {
    stcd: "",
    type: "",
  };
  cardData: any = {
    info: {},
  };

  // 雨量站数据
  hisInfo: any = null;
  updateTime: any = "";

  // date: any = [new Date(new Date(new Date().getTime()).setHours(8, 0, 0, 0)), new Date()];
  date: any = [];
  color: any[] = ["#5f77ec", "#5397ff", "#58dde0", "#feb543"];
  // 雨量直线图
  options1: any = {
    color: this.color,
    title: {
      show: true,
      text: "",
      x: "right",
      y: "top",
      textStyle: {
        // 主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
        fontFamily: "Arial",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "normal",
        color: "#515a6e",
      },
    },
    tooltip: {
      trigger: "axis",
    },
    grid: {
      top: "15%",
      right: "2%",
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
      boundaryGap: true,
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
      max: function(value: any) {
        if (value.max < 5) {
          value.max = 5;
        } else {
          value.max = value.max;
        }
        return value.max;
      },
      axisLabel: {
        // rotate: -30,
        // show:true,
        color: "#666",
        // interval:1
        fontSize: "16",
      },
      splitLine: {
        show: false,
      },
      data: [],
    },
    yAxis: {
      name: "雨\n量\n(mm)",
      min: 0,
      max: 10,
      splitNumber: 10,
      // boundaryGap:[0.2,0.2],
      nameLocation: "left",
      nameTextStyle: {
        color: "#999",
        fontSize: 15,
        padding: [0, 120, 0, 0],
      },
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
      splitLine: {
        color: "#999",
      },
      axisLabel: {
        textStyle: {
          show: true,
          fontSize: "16",
          color: "#666",
        },
      },
    },
    series: [
      {
        name: "雨量",
        type: "bar",
        barMinHeight: 2,
        lineStyle: {},
        // barWidth: 30,
        // barGap: "20%",
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
      // {
      //   name: "雨量",
      //   type: "line",
      //   lineStyle: {
      //     color: "#95F204",
      //   },
      //   tooltip: {
      //     trigger: "item",
      //     show: false,
      //   },
      //   data: [],
      // },
    ],
  };

  //水文
  options: any = {
    color: this.color,
    title: {
      show: true,
      text: "",
      x: "right",
      y: "top",
      textStyle: {
        // 主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
        fontFamily: "Arial",
        fontSize: 12,
        fontStyle: "normal",
        fontWeight: "normal",
        color: "#999",
      },
    },
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
      name: "单位：m",
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
                color: "#eb4e3c",
                // backgroundColor: "#eb4e3c",
                padding: [3, 5, 3, 5],
                formatter: "{b}",
              },
            },
          ],
        },
        data: [],
      },
    ],
  };
  // 河道
  hdoption: any = {
    color: this.color,
    title: {
      show: true,
      text: "",
      x: "right",
      y: "top",
      textStyle: {
        // 主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
        fontFamily: "Arial",
        fontSize: 12,
        fontStyle: "normal",
        fontWeight: "normal",
        color: "#999",
      },
    },
    tooltip: {
      trigger: "axis",
    },
    grid: {
      top: "15%",
      bottom: "18%",
      containLable: true,
    },
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
      name: "单位：m",
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
        markLine: {
          silent: true,
          symbol: "none",
          label: {
            position: "end", //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
          },
          data: [
            {
              name: "警戒水位：",
              silent: false, //鼠标悬停事件  true没有，false有
              yAxis: "", //警戒水位的值
              lineStyle: {
                type: "solid",
                color: "#eb4e3c",
              },
              label: {
                position: "insideStartTop",
                color: "#eb4e3c",
                // backgroundColor: "#eb4e3c",
                padding: [3, 5, 3, 5],
                formatter: "{b}",
              },
            },
            {
              name: "保证水位",
              silent: false,
              yAxis: "", // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
              lineStyle: {
                type: "solid",
                color: "#feb543",
              },
              label: {
                position: "insideEndTop",
                color: "#fff",
                backgroundColor: "#feb543",
                padding: [3, 5, 3, 5],
                formatter: "{b}",
              },
            },
          ],
        },
        data: [],
      },
    ],
  };
  Yltimer: any = null; //雨量定时器名称
  mounted() {
    let timeArray = (this.$utils as any).getTodayDate();
    this.date = timeArray;
    this.onArrow();
  }
  beforeDestroy() {
    clearInterval(this.Yltimer);
    this.Yltimer = null;
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
      if (info.coords && info.coords.length > 0) {
        this.getLocation(this.MapInfo.coords);
      }
    });
    this.getMarkerInfo();
  }

  async getMarkerInfo() {
    this.ylzLine = false;
    this.swLine = false;
    this.zbz = false;
    this.wzck = false;
    this.qxdw = false;
    this.MapInfo.detailShow = false;
    this.MapInfo.hddetailShow = false;
    this.MapInfo.zbzdetailShow = false;
    this.MapInfo.wzkcdetailShow = false;
    this.MapInfo.swdetailShow = false;

    let { key } = this.MapInfo.data;
    switch (key) {
      case "ylz":
        this.getYlzLine();
        break;
      case "swz":
        this.getSwzLine();
        break;
      case "hd":
        this.getHdLine();
        break;
      case "yld":
        this.getSwzLine();
        break;
      case "zbz":
        this.getZbzModal();
        break;
      // 物资仓库
      case "qxkz1":
        this.getWzkc();
        break;
      // 抢险队伍
      case "qxkz2":
        this.getQxdw();
        break;
    }
  }

  //获取所有水位点位
  async getAllSwStation() {
    let url = "wjServer/fangxunjc/z/points";
    let data = await publicApi.getNoParam(url);
    this.getRiverGis(data.data.ZZ); //水位
  }

  //获取所有雨量点位
  async getAllYlStation() {
    let url = "wjServer/fangxunjc/z/points";
    let data = await publicApi.getNoParam(url);
    this.getRainGis(data.data.PP); //雨量
    // this.getStationGis(data.data.DP);
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
        sbzt: arr[4], //设备状态
        sjzt: arr[5], //数据状态
        mid: arr.stcd,
        mtype: "ZZ",
        key: "swz",
        ssData: arr.ssData,
      };
      return item;
    });
    let icon = "水位";
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
        key: "ylz",
        ssData: arr.ssData,
      };

      return item;
    });
    let icon = "雨量";
    that.getGisData(gisData, icon);
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

  // 地图
  getGisData(gisdata: any, icon: any) {
    gisdata = gisdata.filter((e: any) => e.lon && e.lat && e.id);
    let arr = gisdata.map((item: any) => {
      let src = "";
      if (icon == "泵站") {
        src = getBzIcon(item.zt, item.status);
      } else if (icon == "雨量") {
        src = require("@/assets/cs/iconylz/dw-ylz1.png");
        return Object.assign(item, {
          style: {
            image: {
              icon: {
                scale: 0.5,
                anchor: [0.5, 1],
                src: src,
              },
            },
            text: {
              font: "22px Calibri,sans-serif",
              text: `${item.name}:${item.ssData}mm`,
              fill: {
                // color: "white",
              },
              stroke: {
                // width: 6,
                color: "blue",
              },
            },
          },
        });
      } else if (icon == "水位") {
        src = require("@/assets/cs/iconswz/dw-sw1.png");
        return Object.assign(item, {
          style: {
            image: {
              icon: {
                scale: 0.5,
                anchor: [0.5, 1],
                src: src,
              },
            },
            text: {
              font: "14px Calibri,sans-serif",
              text: `${item.name}:${item.ssData}m`,
              fill: {
                // color: "white",
              },
              stroke: {
                // width: 3,
                color: "blue",
              },
            },
          },
        });
      }
    });
    this.markers = this.markers.concat(arr);
    this.setMarkers(this.markers);
    // this.gisPoint = JSON.parse(JSON.stringify(this.markers));
  }
  ylzLine: Boolean = false;
  swLine: Boolean = false;
  hdLine: Boolean = false;
  zbz: Boolean = false;
  wzck: Boolean = false;
  qxdw: Boolean = false;
  isDisplay: Boolean = false;

  //  雨量站直线图参数
  ylzLineParam = {
    zdbh: "",
    startTime: "",
    endTime: "",
  };

  //  雨量站直线图
  async getYlzLine() {
    this.MapInfo.detailShow = false;
    this.ylzLine = true; //显示雨量站图表
    this.options1.xAxis.data = [];
    this.options1.series[0].data = [];
    // this.options1.series[1].data = [];
    this.options1.title.text = "";

    this.ylzLineParam.zdbh = this.MapInfo.data.id; //站点编号
    this.ylzLineParam.startTime = this.$utils.dateFormat(new Date(this.date[0]), "yyyy-MM-dd HH:mm:ss");
    this.ylzLineParam.endTime = this.$utils.dateFormat(new Date(this.date[1]), "yyyy-MM-dd HH:mm:ss");
    let url = "wjServer/fangxunjc/yuqing/rainBarPc";
    let data = await publicApi.getWithParam(url, this.ylzLineParam);
    this.hisInfo = data.result ? data.data.dtos : [];
    this.options1.title.text = "更新时间:" + data.data.lastDate;
    this.grandTotal = data.data.grandTotal;
    if (this.hisInfo.length > 0) {
      this.hisInfo.forEach((e: any) => {
        this.options1.xAxis.data.push(e.date);
        this.options1.series[0].data.push(e.maxRain);
        // this.options1.series[1].data.push(e.maxRain);
      });
      let arr = this.options1.series[0].data;
      var max = Math.max(...arr);
      if (max != 0) {
        this.options1.yAxis.max = max;
      } else {
        this.options1.yAxis.max = 10;
      }
    }
  }

  //水位参数
  sWLineParam = {
    stcd: "",
    startTime: "",
    endTime: "",
  };

  // 水位
  async getSwzLine() {
    this.swLine = true;
    this.MapInfo.swdetailShow = false;
    this.options.xAxis.data = [];
    this.options.series[0].data = [];
    this.sWLineParam.stcd = this.MapInfo.data.id; //站点编号
    this.sWLineParam.startTime = this.$utils.dateFormat(new Date(this.date[0]), "yyyy-MM-dd HH:mm:ss");
    this.sWLineParam.endTime = this.$utils.dateFormat(new Date(this.date[1]), "yyyy-MM-dd HH:mm:ss");
    let url = "wjServer/fangxunjc/z/line";
    let data = await publicApi.getWithParam(url, this.sWLineParam);
    this.hisInfo = data.result ? data.data.tFcShuiweihistories : [];
    this.options.title.text = "更新时间:" + data.data.tm;
    this.realWater = data.data.z;
    this.options.series[0].markLine.data[0].name = "警戒水位：" + (data.data.warnZ || "-") + "m";
    this.options.series[0].markLine.data[0].yAxis = data.data.warnZ || 0;

    if (this.hisInfo.length > 0) {
      this.hisInfo.forEach((e: any) => {
        this.options.xAxis.data.push(e.jssj);
        this.options.series[0].data.push(e.jssw);
        // this.options1.series[1].data.push(e.maxRain);
      });
      let arr = this.options.series[0].data;
      var max = Math.max(...arr);
      var min = Math.min(...arr);

      if (Number(data.data.warnZ) > Number(max)) {
        this.options.yAxis.max = data.data.warnZ;
      } else {
        this.options.yAxis.max = max;
      }
      this.options.yAxis.min = min;
    }

    // this.isDisplay = false;
    // this.ylzLine = true;
    // this.tableData = this.hisInfo;
  }

  //河道参数
  hDLineParam = {
    stcd: "",
    startTime: "",
    endTime: "",
  };
  // 河道直线图
  async getHdLine() {
    this.hdLine = true;
    this.MapInfo.hddetailShow = false;
    this.hdoption.xAxis.data = [];
    this.hdoption.series[0].data = [];
    this.hDLineParam.stcd = this.MapInfo.data.id; //站点编号
    // this.hDLineParam.startTime = this.$utils.dateFormat(new Date(this.date[0]), "yyyy-MM-dd HH:mm:ss");
    // this.hDLineParam.endTime = this.$utils.dateFormat(new Date(this.date[1]), "yyyy-MM-dd HH:mm:ss");

    this.hDLineParam.startTime = "2022-03-26 08:45:30";
    this.hDLineParam.endTime = "2022-05-27 10:10:00";
    let url = "wjServer/fangxunjc/z/line";
    let data = await publicApi.getWithParam(url, this.hDLineParam);
    this.hisInfo = data.result ? data.data.tFcShuiweihistories : [];
    this.options.title.text = "更新时间:" + data.data.tm;
    this.realWater = data.data.z;
    this.options.series[0].markLine.data[0].name = "警戒水位：" + (data.data.warnZ || "-") + "m";
    this.options.series[0].markLine.data[0].yAxis = data.data.warnZ || 0;

    if (this.hisInfo.length > 0) {
      this.hisInfo.forEach((e: any) => {
        this.options.xAxis.data.push(e.jssj);
        this.options.series[0].data.push(e.jssw);
        // this.options1.series[1].data.push(e.maxRain);
      });
      let arr = this.options.series[0].data;
      var max = Math.max(...arr);
      var min = Math.min(...arr);

      if (Number(data.data.warnZ) > Number(max)) {
        this.options.yAxis.max = data.data.warnZ;
      } else {
        this.options.yAxis.max = max;
      }
      this.options.yAxis.min = min;
    }
  }

  //地图定位
  getLocation(coords: any) {
    const maps: any = this.$refs.maps;
    const mapRoot: any = maps.$refs.mapObject;
    const tranPosN = coordinateTransform(coords, "EPSG:4326", "EPSG:3857");
    mapRoot.$view.animate({
      center: tranPosN,
      zoom:11.5,
    });
  }

  zbzParam: any = {
    id: "",
  };
  // 泵站数据
  zbzAlldata: any = {};
  // 闸站站数据
  zzData: any = {};

  async getZbzModal() {
    let type = this.MapInfo.data.type;
    if (type == "DP") {
      this.MapInfo.zbzdetailShow = false;
      this.srcList = [];
      this.zbz = true; //闸泵站
      this.zbzParam.id = this.MapInfo.data.id;
      let url = "wjServer/dataCenter/tFcBengZhan/getInfoByBzcd";
      let data = await publicApi.getWithParam(url, this.zbzParam);
      if (data.result) {
        this.zbzAlldata = data.data;
        // this.zbzAlldata.minIoFileList = [
        //   { previewUrl: "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg" },
        //   { previewUrl: "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg" },
        // ];

        this.zbzAlldata.minIoFileList.forEach((e: any) => {
          this.srcList.push(e.previewUrl);
        });
        this.zbzAlldata["srcList"] = this.srcList;
        this.zbzAlldata["type"] = this.MapInfo.data.type;
        if (this.srcList.length > 0) {
          this.imgurl = this.srcList[0];
        } else {
          this.imgurl = "";
        }
        this.zbzAlldata.offset = [0, -40];
        if (data.data.jd != null && data.data.wd != null) {
          this.zbzAlldata["coords"] = [Number(data.data.jd) + 0.00001, Number(data.data.wd) + 0.00001];
        } else {
          this.zbzAlldata["coords"] = [0, 0];
        }
      } else {
        this.$Message.error("数据加载失败");
      }
    } else if (type == "DD") {
      this.MapInfo.zbzdetailShow = false;
      this.srcList = [];
      this.zbz = true; //闸泵站
      this.zbzParam.id = this.MapInfo.data.id;
      let url = "wjServer/dataCenter/tFcZha/getInfoByBzcd";
      let data = await publicApi.getWithParam(url, this.zbzParam);
      if (data.result) {
        this.zzData = data.data;
        this.zzData.minIoFileList.forEach((e: any) => {
          this.srcList.push(e.previewUrl);
        });
        this.zzData["srcList"] = this.srcList;
        this.zzData["type"] = this.MapInfo.data.type;

        if (this.srcList.length > 0) {
          this.imgurl = this.srcList[0];
        } else {
          this.imgurl = "";
        }
        this.zzData.offset = [0, -40];
        if (data.data.jd != null && data.data.wd != null) {
          this.zzData["coords"] = [Number(data.data.jd) + 0.00001, Number(data.data.wd) + 0.00001];
        } else {
          this.zzData["coords"] = [0, 0];
        }
      } else {
        this.$Message.error("数据加载失败");
      }
    }
  }

  zbzInfo: any = {};
  //闸泵站弹框
  onZbzDetail() {
    this.MapInfo.show = false;
    if (this.MapInfo.data.type == "DP") {
      this.$nextTick(() => {
        this.MapInfo.zbzdetailShow = true;
        this.zbzInfo = this.zbzAlldata;
      });
    } else {
      this.$nextTick(() => {
        this.MapInfo.zbzdetailShow = true;
        this.zbzInfo = this.zzData;
      });
    }
  }
  //  物资仓库
  getWzkc() {
    // this.wzck = false;
    // this.$nextTick(() => {
    //   this.wzck = true;
    // });
    this.wzck = true;
    this.MapInfo.wzkcdetailShow = false;
  }
  wzkcInfo: any = {};
  //物资仓库
  onWzkcDetail() {
    this.MapInfo.show = false;
    this.$nextTick(() => {
      this.MapInfo.wzkcdetailShow = true;
      this.wzkcInfo = this.MapInfo;
    });
  }

  // 抢险队伍
  getQxdw() {
    this.qxdw = true;
  }

  // 箭头点击
  onArrow() {
    this.arrowLeft = !this.arrowLeft;
    if (this.arrowLeft) {
      (this.$refs.left_sx as any).innerText = "|";
      (this.$refs.leftDiv as any).style.width = "24%";
      this.flag = true;
      this.jcflag = false;
      // this.getLocation1([120.76147510220207, 31.669030901614576]); //箭头向左的经纬度（地图中心右偏移）
    } else {
      (this.$refs.leftDiv as any).style.width = "8%";
      (this.$refs.left_sx as any).innerText = "/";
      this.flag = false;
      this.jcflag = false;
      // this.getLocation1([120.7918208331299, 31.66179903206833]); //箭头向右的经纬度（地图中心点左偏移）
    }
  }
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
.module-view {
  position: relative;
  .left {
    position: absolute;
    top: 1%;
    left: 0.5%;
    width: 300px;
    background: rgba($color: #1a82ff, $alpha: 0.8);
    //   color: rgba($color: #ffffff, $alpha: 0.2);
    color: #fff;
    font-size: 25px;
    width: 24%;
    display: flex;
    // justify-content: space-evenly;
    cursor: pointer;
    .left_t {
      flex: 1;
      text-align: center;
    }
  }
  .tc {
    position: absolute;
    z-index: 100;
    top: 6%;
    left: 0.5%;
    width: 24%;
    height: 30%;
    // pointer-events: none;
  }
  .tc1 {
    position: absolute;
    z-index: 100;
    top: 6%;
    left: 0.5%;
    width: 24%;
    height: 0%;
    // pointer-events: none;
  }
  .jc {
    position: absolute;
    z-index: 100;
    top: 6%;
    left: 0.5%;
    width: 24%;
    height: 90%;
    // box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
    box-shadow: 2px 0px 10px 0px rgba(0, 0, 0, 0.12);
    background: #fff;

    .tab-switch {
      width: 100%;
      height: 53px;
      border-bottom: 1px solid #dde4eb;
      padding-top: 20px;
    }
  }

  .map-modal {
    width: auto;
    box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.08);

    .map-header {
      width: auto;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #002060;
      color: #fff;
      padding: 0 15px;

      img {
        width: 10px;
        height: 10px;
        cursor: pointer;
      }
      .cl {
        color: #f7f40b;
      }
      .detail {
        position: absolute;
        right: 5%;
        cursor: pointer;
      }
    }

    .map-body {
      padding: 0 10px;
      height: auto;
      margin-top: 3%;
      .noData {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

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
    .map-bottom {
      padding: 10px 10px;
      height: auto;
      .zbzModal {
        height: 600px;
        width: 100%;
        display: flex;
        .showImg {
          width: 40%;
          height: 100%;
          // background: yellow;
          position: relative;
          overflow: hidden;
          .img {
            width: 100%;
            margin-top: 20%;
          }
        }
        .textDes {
          width: 60%;
          // background: pink;
          height: 100%;
          display: grid;
          padding-left: 5px;
          font-weight: 600;
        }
      }
      .wzkcModal {
        height: 200px;
        width: 100%;
        // background: pink;
        line-height: 30px;
        overflow: auto;
      }
    }
  }

  .pop1 {
    width: 600px !important;
  }
}
#{$deep}.el-image {
  .el-image__error,
  .el-image__inner,
  .el-image__placeholder {
    height: 150px;
  }
}
#{$deep}.vueol-overlay {
  width: 1100px;
  font-size: 20px;
}
</style>
