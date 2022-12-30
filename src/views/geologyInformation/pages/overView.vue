<template>
  <div class="module-view">
    <!-- 地图层 -->
    <div class="main-map">
      <MapManage @onmarkerClick="onmarkerClick" @mapZoom="mapZoom" ref="maps">
        <template v-slot:markerlayer>
          <!-- 闪烁光圈 -->
          <ol-flash v-if="MapInfo.show" :coords="MapInfo.coords" :loops="1" :duration="2000" :radius-range="[0, 25]"></ol-flash>
        </template>
      </MapManage>

      <!-- 防汛预案 -->
      <div class="top-bg" v-if="yjxyObj.fxType == '0' || yjxyObj.tfType == '1'">
        <div class="top-bg-first" v-if="yjxyObj.fxType == '0'">
          <p>{{ yjxyObj.fxName }}</p>
          <div style="margin-top:5px;">
            <suc-button type="primary" :class="fxState" @on-click="fxClick(yjxyObj.fxErId)">{{ yjxyObj.fxDangertLevel }}</suc-button>
          </div>
        </div>
        <div class="top-bg-second" v-if="yjxyObj.tfType == '1'">
          <p>{{ yjxyObj.tfName }}</p>
          <div style="margin-top:5px">
            <suc-button type="primary" :class="tfState" @on-click="tfClick(yjxyObj.tfErId)">{{ yjxyObj.tfDangertLevel }}</suc-button>
          </div>
        </div>
      </div>

      <!-- 图层显示 -->
      <div class="bg tc-btn">
        <suc-button type="primary" class="sb tckz" @on-click="getTcinfo">图层<br />控制</suc-button>
      </div>
      <div class="bg yj-btn">
        <suc-button type="primary" class="sb yjxx" @on-click="getYjinfo">预警<br />信息</suc-button>
      </div>
      <div class="bg bj-btn">
        <suc-button type="primary" class="sb zzbj" @on-click="getBjinfo">报警<br />信息</suc-button>
      </div>
    </div>

    <!-- 总览悬浮层 -->
    <div class="main-overlay" v-if="istcShow == '1'">
     
      <overview-panel :tableDetailParams="MapInfo" @rowEvent="rowEvent" @toggle="toggle1"></overview-panel>
    </div>
    <!-- 预警信息 -->
    <div class="main-overlay" v-if="istcShow == '2'">
      <yj-overview-panel></yj-overview-panel>
    </div>
    <!-- 报警信息 -->
    <div class="main-overlay" v-if="istcShow == '3'">
      <bj-overview-panel></bj-overview-panel>
    </div>

    <!-- 防汛防旱 -->
    <div class="main-overlay">
      <fx-overview-panel :fxShow="fxShow" @toggle="toggle1" :id="id"></fx-overview-panel>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { State, Mutation, Action, namespace } from "vuex-class";
import { MapManage } from "@/components";
import { OverviewPanel, YjOverviewPanel, BjOverviewPanel, FxOverviewPanel } from "./overviewPage";
import { coordinateTransform } from "@suc/monch";
import { fromLonLat } from "ol/proj";
import { Point } from "ol/geom";
import { Icon, Stroke, Style } from "ol/style";
import arrowPng from "@/assets/arrow.png";
import { SucButton, SucModal } from "@suc/ui";
import TableDetail from "./overviewPage/TableDetail.vue";
import { overview, publicApi } from "@/api";
import { ModalConfig } from "@suc/ui/interfaces";
import { getGeodesicDistance } from "@suc/monch";
import Overview from "../../home/pages/Overview.vue";



const mapStore = namespace("mapStore");
@Component({
  components: {
    MapManage,
    OverviewPanel,
    SucButton,
    TableDetail,
    SucModal,
    YjOverviewPanel,
    BjOverviewPanel,
    FxOverviewPanel,
  },
})
export default class OverView extends Vue {
  olMap = this.$getMapConfig();

  @mapStore.State markers: any;
  @mapStore.State markerFlag: any;
  @mapStore.Mutation setMarkers: any;
  MapInfo: any = {
    info: {},
    coords: [],
    offset: [0, -40],
    show: true,
    data: "",
  };
  istcShow: any = "1";

  fxState: any = ""; //防汛状态
  tfState: any = ""; //台风状态

  state: any = ""; //防汛
  taifengState: any = ""; //台风
  id: any = ""; //传id

  //  页面的参数对象
  yjxyObj = {
    fxName: "",
    fxDangertLevel: "",
    fxType: "",
    fxErId: "",
    tfName: "",
    tfDangertLevel: "",
    tfType: "",
    tfErId: "",
  };
  mounted() {
    // this.getLocation([119.9395121120892, 31.703167754790485]);
    // this.setAreaLayer();
    // this.init();
    // this.showArrrow();
    // this.getRoom();
    // this.buttonType("success");
    this.getEmergencyPlan();
  }

  getTcinfo() {
    this.istcShow = "1";
  }
  getYjinfo() {
    this.istcShow = "2";
  }
  getBjinfo() {
    this.istcShow = "3";
  }
  fxShow: any = false; //控制防汛预案模块的显隐
  // 父组件的点击事件
  fxClick(id: any) {
    // const url = "wjServer/wj/warning/getFxErrecord";
    // const data = await publicApi.getWithParam(url, { erId: id });
    // console.log(data,"ppp");
    // if(data.result==true){

    // }
    this.id = id;
    this.fxShow = true;
  }
  async tfClick(id: any) {
    // console.log(id, "[[[[");
      this.id = id;
    this.fxShow = true;

    // this.fxShow = true;
    // const url = "wjServer/wj/warning/getFxErrecord";
    // const data = await publicApi.getWithParam(url, { erId: id });
    // console.log(data, ";;;;");
  }
  async getEmergencyPlan() {
    const url = "wjServer/fangxunjc/ermanager/getOnlinePlan";
    const data = await publicApi.getNoParam(url);
    if (data.result == true) {
      this.state = data.data.fxDangertLevel; //返回的状态区分背景颜色
      this.yjxyObj.fxName = data.data.fxName;
      this.yjxyObj.fxDangertLevel = data.data.fxDangertLevel;
      this.yjxyObj.fxType = data.data.fxType;
      this.yjxyObj.fxErId = data.data.fxErId;

      this.yjxyObj.tfName = data.data.tfName;
      this.yjxyObj.tfDangertLevel = data.data.tfDangertLevel;
      this.yjxyObj.tfType = data.data.tfType;
      this.yjxyObj.tfErId = data.data.tfErId;
      this.taifengState = data.data.tfDangertLevel;
      if (this.state.indexOf("一级") != -1) {
        this.fxState = "state-red";
      } else if (this.state.indexOf("二级") != -1) {
        this.fxState = "state-warn";
      } else if (this.state.indexOf("三级") != -1) {
        this.fxState = "state-yellow";
      } else if (this.state.indexOf("四级") != -1) {
        this.fxState = "state-purple";
      }

      if (this.taifengState.indexOf("一极") != -1) {
        this.tfState = "state-red";
      } else if (this.taifengState.indexOf("二级") != -1) {
        this.tfState = "state-warn";
      } else if (this.taifengState.indexOf("三级") != -1) {
        this.tfState = "state-yellow";
      } else if (this.taifengState.indexOf("四级") != -1) {
        this.tfState = "state-purple";
      }
    } else {
      this.$Message.error("获取失败");
    }
  }

  // 子页面的取消事件
  toggle1(val: boolean) {
    this.fxShow = val;
  }

  mapboxStyle: any = {
    fill: {
      color: "#3d78ef",
    },
    stroke: {
      width: 1,
      color: "#3d78ef",
    },
  };
  wsmapboxStyle = {
    fill: {
      color: "#ff5a47",
    },
    stroke: {
      width: 1,
      color: "#ff5a47",
    },
  };
  // 区域矢量图
  setAreaLayer() {
    this.olMap.areaLayer[0].source.style = (f: any) => {
      return {
        stroke: {
          width: 1,
          color: "#000",
        },
      };
    };
  }

  //地图zoom
  getRoom() {
    const maps: any = this.$refs.maps;
    const mapRoot: any = maps.$refs.mapObject;
    const tranPosN = coordinateTransform([119.9395121120892, 31.703167754790485], "EPSG:4326", "EPSG:3857");
    mapRoot.$view.animate({
      center: tranPosN,
    });
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

  init() {}
  showArrrow() {
    this.olMap.mapboxarrow.style = (feature: any) => {
      let prop = feature.properties_;

      let rotation = (prop.Direction * Math.PI) / 180;
      let dx = prop.GXQD_X + (prop.GXZD_X - prop.GXQD_X) / 2;
      let dy = prop.GXQD_Y + (prop.GXZD_Y - prop.GXQD_Y) / 2;

      let styles = [
        {
          stroke: {
            color: "#3d78ef",
            width: 2,
          },
        },
        {
          geometry: new Point(fromLonLat([dx, dy])),
          image: {
            icon: {
              src: arrowPng,
              anchor: [0.5, 0.5],
              rotateWithView: true,
              rotation: -rotation,
            },
          },
        },
      ];
      return styles;
    };
    this.olMap.wsmapboxarrow.style = (feature: any) => {
      let prop = feature.properties_;

      let rotation = (prop.Direction * Math.PI) / 180;
      let dx = prop.GXQD_X + (prop.GXZD_X - prop.GXQD_X) / 2;
      let dy = prop.GXQD_Y + (prop.GXZD_Y - prop.GXQD_Y) / 2;

      let styles = [
        {
          stroke: {
            color: "#ff5a47",
            width: 2,
          },
        },
        {
          geometry: new Point(fromLonLat([dx, dy])),
          image: {
            icon: {
              src: arrowPng,
              anchor: [0.5, 0.5],
              rotateWithView: true,
              rotation: -rotation,
            },
          },
        },
      ];
      return styles;
    };
    this.olMap.gwmaparrow.style = (feature: any) => {
      let prop = feature.properties_;

      let rotation = (prop.Direction * Math.PI) / 180;
      let dx = prop.GXQD_X + (prop.GXZD_X - prop.GXQD_X) / 2;
      let dy = prop.GXQD_Y + (prop.GXZD_Y - prop.GXQD_Y) / 2;

      let styles = [
        {
          stroke: {
            color: "#ff5a47",
            width: 2,
          },
        },
        {
          geometry: new Point(fromLonLat([dx, dy])),
          image: {
            icon: {
              src: arrowPng,
              anchor: [0.5, 0.5],
              rotateWithView: true,
              rotation: -rotation,
            },
          },
        },
      ];
      return styles;
    };
  }
  show: boolean = true; //雨水管网
  show1: boolean = true; //雨水管网
  wsShow: boolean = true; //污水管网
  wsShow1: boolean = true; //污水管网

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
  //点击地图方法
  onmarkerClick(info: any) {
    this.MapInfo.show = false;
    this.MapInfo.data = info;
    this.MapInfo.info = info.info ? info.info : null;
    this.MapInfo.coords = [];
    this.MapInfo.key = info.key;
    this.$nextTick(() => {
      this.MapInfo.show = true;
      this.MapInfo.coords = info.coords || [];
      // this.getRow()
      if (info.coords && info.coords.length > 0) {
        this.getLocation(this.MapInfo.coords);
      }
    });
  }
  rowEvent(row: any, tabIdx: string) {
    this.MapInfo.show = true;
    this.MapInfo.info = null;
    this.MapInfo.data = [];
    if ((row.jd && row.wd) || (row.JD && row.WD) || (row.LGTD && row.LTTD) || (row.lon && row.lat) || (row.lgtd && row.lttd)) {
      let jd = row.jd || row.JD || row.LGTD || row.lon || row.lgtd;
      let wd = row.wd || row.WD || row.LTTD || row.lat || row.lttd;
      this.MapInfo.coords = [jd, wd];
      this.getLocation(this.MapInfo.coords);
    } else {
      this.$SucMessage.info("经纬度缺失！");
    }
  }

  //地图弹框关闭
  mapClick() {
    this.MapInfo.show = false;
  }
  // 测距
  measureshow: boolean = false;
  onMeasure() {
    this.measureshow = !this.measureshow;
  }
  // 详情控制
  detailParams: any = {
    id: "35",
  };
  title: string = "";
  lists: any = [];
  toggle(val: boolean) {
    this.MapInfo.show = val;
  }
  getRow() {
    if (this.MapInfo.data.key == "DP") {
      this.detailParams.id = this.MapInfo.data.id;
      this.getStationDetail();
    } else if (this.MapInfo.data.key == "DD") {
      this.detailParams.id = this.MapInfo.data.id;
      this.getGateDetail();
    }
  }
  // 闸门
  async getGateDetail() {
    overview.getGateDetail(this.detailParams).then((data: any) => {
      this.lists = [
        {
          name: "河道或湖泊",
          value: data[0].rvnm,
        },
        {
          name: "涵闸功能",
          value: data[0].gn,
        },
        {
          name: "孔数",
          value: data[0].ks,
        },
        {
          name: "闸门结构",
          value: data[0].zmjg,
        },
        {
          name: "启闭形式",
          value: data[0].qbxs,
        },
        {
          name: "经纬度",
          value: data[0].lgtd + "," + data[0].lttd,
        },
      ];
      this.title = data[0].stnm;
    });
  }
  // 泵站
  async getStationDetail() {
    overview.getStationDetail(this.detailParams).then((data: any) => {
      this.lists = [
        {
          name: "建筑面积(㎡)",
          value: data[0].jzmj,
        },
        {
          name: "总功率(kw)",
          value: data[0].zgl,
        },
        {
          name: "流量(m³/s)",
          value: data[0].zll,
        },
        {
          name: "台套",
          value: data[0].tt,
        },
        {
          name: "总汇水面积(K㎡)",
          value: data[0].zhsmj,
        },
        {
          name: "调蓄量(万m³)",
          value: data[0].txl,
        },
        {
          name: "河道或湖泊",
          value: data[0].rvnm,
        },
        {
          name: "经纬度",
          value: data[0].lgtd + "," + data[0].lttd,
        },
        {
          name: "前池底标高",
          value: data[0].qcbg,
        },
        {
          name: "低水位(腾空水位)",
          value: data[0].dsw,
        },
        {
          name: "高水位(警戒水位)",
          value: data[0].gsw,
        },
        {
          name: "顶标高",
          value: data[0].dbg,
        },
        {
          name: "泵站描述",
          value: data[0].bz,
        },
      ];
      this.title = data[0].stnm;
    });
  }

  //范围分析
  markerInfo: any = [];
  distande: number = 1000;
  onearPtions: any = {
    center: [118.8, 31.9],
    radius: 1000,
    circleStyle: {
      fill: {
        color: [254, 83, 57, 0.2],
      },
      stroke: {
        width: 1,
        color: [254, 83, 57],
      },
    },
  };
  getMarkers() {
    let that = this;
    let point1 = that.onearPtions.center;
    let disMarkers = that.markers.map((it: any) => {
      let result: any = { ...it };
      let dis = getGeodesicDistance("EPSG:4326", point1, it.coords);
      if (dis <= Number(that.onearPtions.radius)) {
        result.style.image.icon.opacity = 1;
      } else {
        result.style.image.icon.opacity = 0.8;
      }
      return result;
    });
    that.markerInfo = that.markers.filter((it: any) => {
      let dis = getGeodesicDistance("EPSG:4326", point1, it.coords);
      return dis <= that.onearPtions.radius;
    });
    // console.log("markerInfo", that.markerInfo);
    that.setMarkers(disMarkers);
  }
  refreshRadius(data: number) {
    // this.onearPtions.radius = data.radius;
    this.distande = data;
    this.getMarkers();
  }
  //范围搜索
  sear() {
    this.onearPtions.radius = this.distande;
  }
}
</script>
<style lang="scss" scoped>
// @import "@/styles/commonVariables.scss";
.module-view {
  position: relative;
}
.main-map {
  .top-bg {
    width: 30%;
    height: 90px;
    position: absolute;
    left: 38%;
    top: 0;
    border: none;
    background: #fff;
    opacity: 0.9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 10px 0px;
    .state-red {
      background-color: #f04502;
      border: #f04502;
    }
    .state-warn {
      background-color: #ffab3d;
      border: #ffab3d;
    }
    .state-yellow {
      background-color: #656612;
      border: #656612;
    }
    .state-purple {
      background-color: #8400ff;
      border: #8400ff;
    }
    .top-bg-first {
      flex: 1;
      text-align: center;
      border-right: 1px solid #e4e7ed;
    }
    .top-bg-second {
      flex: 1;
      text-align: center;
    }
  }
  .bg {
    width: auto;
    height: auto;
    position: absolute;
    bottom: 50px;
    border: none;
    line-height: normal;
    padding: 0;
  }
  .sb {
    margin-bottom: 8px;
    color: #fff;
    font-size: 16px;
    border: 0;
    border-radius: 0;
    text-align: center;
    cursor: pointer;
    width: 100px;
    height: 100px;
    opacity: 0.8;
  }
  .tc-btn {
    // left: 560px;
    // left: 600px;
    left: 38%;
    .tckz {
      background-color: #02a7f0;
    }
  }

  .yj-btn {
    // left: 705px;
    // left: 745px;
    left: 48%;
    .yjxx {
      background-color: #f59a23;
    }
  }
  .bj-btn {
    // left: 850px;
    // left: 890px;
    left: 58%;
    .zzbj {
      background-color: #d61c45;
    }
  }
}
.left-list {
  position: absolute;
  top: 0;
  right: 0;
  width: 560px;
  height: 100%;
}
// .measure-btn{
//     position: absolute;
//     right: 175px;
//     bottom: 20px;
//     padding: 5px 15px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     color: #fff;
//     font-size: 14px;
//     border-radius: 4px;
//     background-color: #3a7bef;
// }
</style>
