<template>
  <!-- 管网详情地图 -->
  <div class="map-view">
    <div class="view-item">
      <map-manage ref="maps">
        <template v-slot:tdt2>
          <div style="background-color:transparent;"></div>
        </template>
        <template v-slot:mapbox>
          <ol-layer :options="olMap.mapbox" :layer-style="mapboxStyle"></ol-layer>
        </template>
        <template v-slot:markerlayer>
          <!-- 闪烁光圈 -->
          <ol-flash :coords="MapInfo.coords" :loops="3" :duration="3000" :radius-range="[5, 30]"></ol-flash>
        </template>
      </map-manage>
    </div>
    <div class="view-item">
      <panel-view :heading="netWork.row.SBMC">
        <div class="amount-item">
          <div class="amount-item-sub" v-for="(item, index) in amountList" :key="index">
            <div>
              <span>{{ item.label }}</span>
            </div>
            <div :class="item.class">
              <span class="big-font">{{ item.amount }}</span>
              <span>{{ item.dw }}</span>
            </div>
          </div>
        </div>
      </panel-view>
    </div>
  </div>
</template>
<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Emit,
  Model,
  Watch,
} from "vue-property-decorator";
import { State, Mutation, Action, namespace } from "vuex-class";
import { MapManage, PanelView } from "@/components";
import { networkApi } from "@/api";
import { coordinateTransform } from "@suc/monch";

const mapStore = namespace("mapStore");
@Component({
  components: {
    MapManage,
    PanelView,
  },
})
export default class SiteMap extends Vue {
  @State netWork: any;
  @mapStore.Mutation setMarkers: any;
  olMap = this.$getMapConfig();
  amountList: any[] = [
    {
      label: "本月水流异常天数",
      amount: "",
      dw: "天",
      class: "red-label",
      key: "abnormal",
    },
    {
      label: "周边登记在册企业数",
      amount: "",
      dw: "家",
      class: "blue-label",
      key: "enterprisenums",
    },
    {
      label: "上游管网",
      amount: "",
      dw: "条",
      class: "blue-label",
      key: "upstreamnums",
    },
    {
      label: "下游管网",
      amount: "",
      dw: "条",
      class: "blue-label",
      key: "downstreamnums",
    },
    {
      label: "年平均水位",
      amount: "",
      dw: "米",
      class: "blue-label",
      key: "avgsw",
    },
  ];
  amountParams: any = {
    gwId: "1",
    sbId: "1",
  };
  MapInfo: any = {
    info: {},
    coords: [],
    offset: [0, -40],
  };
  mapboxStyle = {
    fill: {
      color: "#3d78ef",
    },
    stroke: {
      width: 1,
      color: "#3d78ef",
    },
  };

  mounted() {
    this.getAmount();
    this.getMarkers();
    this.init();
  }

  init() {}

  async getAmount() {
    let that = this;
    that.amountParams.yjId = that.netWork.row.YJID;
    that.amountParams.sbId = that.netWork.row.SBID;
    const amount = await networkApi.getSiteAmount(that.amountParams);
    that.amountList.forEach((e: any) => {
      e.amount = amount[e.key];
    });
  }

  //地图部分
  async getMarkers() {
    let that = this;
    let markerArr: any = [];
    let markericon = require("@/assets/map/管网-正常.png");
    that.amountParams.gwId = that.netWork.row.GWID;
    that.amountParams.sbId = that.netWork.row.SBID;
    const mapData = await networkApi.getCurrentSite(that.amountParams);
    let { currentdevice, upstreamdevice, enterprises } = mapData;
    let currentMarker = {
      id: "currentdevice",
      name: currentdevice.sbmc,
      lon: currentdevice.jd,
      lat: currentdevice.wd,
      coords: [currentdevice.jd, currentdevice.wd],
      style: {
        image: {
          icon: {
            anchor: [0.5, 1],
            src: markericon,
          },
        },
      },
    };
    this.MapInfo.coords = [currentdevice.jd, currentdevice.wd];
    markerArr.push(currentMarker);
    let upstreamMarker = {};
    let enterpriseMarker = {};
    if (upstreamdevice.length) {
      upstreamdevice.forEach((item: any, index: number) => {
        upstreamMarker = {
          id: "upstreamdevice" + index,
          name: item.sbmc,
          lon: item.jd,
          lat: item.wd,
          coords: [item.jd, item.wd],
          style: {
            image: {
              icon: {
                anchor: [0.5, 1],
                src: require("@/assets/map/河湖-正常.png"),
              },
            },
          },
        };
        markerArr.push(upstreamMarker);
      });
    }
    if (enterprises.length) {
      enterprises.forEach((item: any, index: number) => {
        enterpriseMarker = {
          id: "enterprise" + index,
          name: item.qymc,
          lon: item.jd,
          lat: item.wd,
          coords: [item.jd, item.wd],
          style: {
            image: {
              icon: {
                anchor: [0.5, 1],
                src: require("@/assets/map/企业.png"),
              },
            },
          },
        };
        markerArr.push(enterpriseMarker);
      });
    }
    that.setMarkers(markerArr);
    this.getRoom(markerArr[0]);
  }

  //地图zoom
  getRoom(str: any) {
    const maps: any = this.$refs.maps;
    const mapRoot: any = maps.$refs.mapObject;
    const tranPosN = coordinateTransform(
      [str.lon, str.lat],
      "EPSG:4326",
      "EPSG:3857"
    );
    mapRoot.$view.animate({
      center: tranPosN,
      zoom: 12,
    });
  }
}
</script>
<style lang="scss" scoped>
.map-view {
  width: 100%;
  height: 100%;
  position: relative;

  .view-item {
    &:first-of-type {
      height: 100%;
    }

    &:last-of-type {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 90px;
      background-color: rgba(255, 255, 255, 0.9);
      box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.08);
    }

    .amount-item {
      display: flex;
      align-items: center;

      &-sub {
        padding: 0 10px;
        display: flex;
        align-items: center;

        > div {
          padding-right: 10px;
          font-size: 14px;
          color: #333;
        }

        .big-font {
          font-size: 26px;
        }

        .red-label {
          color: #ff5a47;
        }

        .blue-label {
          color: #3a7bef;
        }
      }
    }
  }
}
</style>
