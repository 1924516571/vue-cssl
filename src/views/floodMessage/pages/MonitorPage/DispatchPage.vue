<template>
  <!-- 防汛调度 -->
  <div class="dis">
    <map-manage ref="maps" @onmarkerClick="onmarkerClick">
      <template v-slot:nearby>
        <ol-nearby
          :center="onearPtions.center"
          :circle-style="onearPtions.circleStyle"
          :radius.sync="onearPtions.radius"
          @update:radius="refreshRadius"
        ></ol-nearby>
      </template>
    </map-manage>
    <div class="dis-t">
      <img @click="goBack()" src="@/assets/monFlood/5.png" />
      <span @click="goBack()">返回</span>
      <span></span>
      <span>防汛调度</span>
    </div>
    <div class="dis-l">
      <div class="dis-l-t">
        <div style="padding: 20px 15px 0 15px;">
          <span>周边距离(m):</span>
          <suc-input style="width: 120px" v-model="distande"></suc-input>
          <suc-button type="primary" :debounce="800" @on-click="sear">搜索</suc-button>
        </div>
        <title-bar :list="{heading:'泵站',linHe:'40px'}"></title-bar>
        <div class="dis-table">
          <disBzjc :markerInfo="markerInfo"></disBzjc>
        </div>
        <title-bar :list="{heading:'闸站',linHe:'40px'}"></title-bar>
        <div class="dis-table">
          <dishz :markerInfo="markerInfo"></dishz>
        </div>
        <title-bar :list="{heading:'防汛人员',linHe:'40px'}"></title-bar>
        <div class="dis-table" style="height: calc(20% - 54px)">
          <disry></disry>
        </div>
        <title-bar :list="{heading:'物资仓库',linHe:'40px'}"></title-bar>
        <div class="dis-table" style="height: calc(20% - 54px)">
          <diswz></diswz>
        </div>
      </div>
      <div class="dis-l-b" @click="onclick" v-show="btnShow">创建调度指令</div>
    </div>
    <create-task :model="model" @toggle-model="toggle" :dispatPoint="dispatPoint"></create-task>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { State, Mutation, Action, namespace } from "vuex-class";
import {
  SucSelect,
  SucInput,
  SucButton,
  SucRadio,
  SucRadioGroup,
  SucFormItem,
  SucCheckboxGroup,
  SucCheckbox,
} from "@suc/ui";
import {
  SearchComponent,
  TablePage,
  MapManage,
  TitleBar,
  TabSwitch,
  TableComponent,
} from "@/components";
import { CreateTask } from "./";
import { disBzjc, dishz, disry, diswz } from "./rightPage";
import { getGeodesicDistance } from "@suc/monch";
import { mapMutations } from "vuex";
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
    SucCheckboxGroup,
    SucCheckbox,
    CreateTask,
    TableComponent,
    disBzjc,
    dishz,
    disry,
    diswz,
  },
})
export default class Enterprise extends Vue {
  @mapStore.State markers: any;
  @mapStore.Mutation setMarkers: any;
  @Prop() show!: any;
  @Prop({
    type: Object,
    default: () => {},
  })
  @Prop() btnShow!: boolean;
  dispatPoint: any;
  model: boolean = false;
  distande: number = 5000;
  markerInfo: any = [];
  //   total: number | string = 1000; // 数据总数
  //   bzCol: Array<any> = [
  //     {
  //       type: "index",
  //       title: "序号",
  //     },
  //     {
  //       title: "区域",
  //       key: "qy",
  //     },
  //     {
  //       title: "站点名称",
  //       key: "mc",
  //     },
  //     {
  //       title: "泵机状态",
  //       slot: "zt",
  //     },
  //     {
  //       title: "水位",
  //       key: "sw",
  //     },
  //   ];
  //   jzCol: Array<any> = [
  //     {
  //       type: "index",
  //       title: "序号",
  //     },
  //     {
  //       title: "区域",
  //       key: "qy",
  //     },
  //     {
  //       title: "站点名称",
  //       key: "mc",
  //     },
  //     {
  //       title: "闸门开度",
  //       slot: "zt",
  //     },
  //     {
  //       title: "水位",
  //       key: "sw",
  //     },
  //   ];
  //   bzData: Array<any> = [];
  //   jzData: Array<any> = [];
  //   category: any[] = [
  //     {
  //       name: "xx街道",
  //       value: 100,
  //     },
  //     {
  //       name: "xx街道",
  //       value: 150,
  //     },
  //   ]; // 类别
  datas: any[] = [100, 150];
  onearPtions: any = {
    center: [118.83, 31.95],
    radius: 5000,
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
  created() {
    this.init();
  }
  init() {
    // this.bzData = [];
    // this.jzData = [];
    // for (let i = 0; i < 5; i++) {
    //   this.bzData.push({
    //     qy: "01片区",
    //     mc: "和定桥点",
    //     sw: "4.0",
    //   });
    // }
    // this.jzData = this.bzData;
    let info = this.dispatPoint;
    if (info && info.lat && info.lon) {
      this.onearPtions.center = [info.lon, info.lat];
      this.getMarkers();
    }
  }
  goBack() {
    // let disMarkers = this.markers.map((it:any) => {
    //     // let result: any = { ...it };
    //     it.style.image.icon.opacity = 1;
    // })
    // this.setMarkers(disMarkers);
    this.$emit("goBack");
  }
  toggle(state: boolean) {
    this.model = state;
  }
  onclick() {
    this.model = !this.model;
  }
  //范围搜索
  sear() {
    this.onearPtions.radius = this.distande;
  }
  onmarkerClick(info: any) {
    this.onearPtions.center = info.coords;
    this.getMarkers();
  }
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
    console.log("markerInfo", that.markerInfo);
    that.setMarkers(disMarkers);
  }

  refreshRadius(data:number ) {
    // this.onearPtions.radius = data.radius;
    this.distande = data;
    this.getMarkers();
  }
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
.dis {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background: white;
  .main-map {
    width: 100%;
    height: 100%;
  }
  .dis-t {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #ffffff;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    padding: 0 15px;
    img {
      vertical-align: middle;
      cursor: pointer;
    }
    span {
      display: inline-block;
      vertical-align: middle;
      &:nth-child(2) {
        color: #3983f3;
        padding-left: 5px;
        cursor: pointer;
      }
      &:nth-child(3) {
        width: 1px;
        height: 14px;
        background-color: #dde4eb;
        margin: 0 10px;
      }
      &:nth-child(4) {
        font-size: 16px;
      }
    }
  }
  .dis-l {
    width: 500px;
    height: calc(100% - 70px);
    position: absolute;
    left: 10px;
    top: 60px;
    background-color: #ffffff;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
    .dis-l-t {
      width: 100%;
      height: calc(100% - 40px);
      .suc-input {
        margin: 0 15px;
        vertical-align: middle;
      }
      .dis-table {
        width: 100%;
        padding: 0 15px;
        height: calc(30% - 54px);
        #{$deep}.el-table table {
          width: auto !important;
        }
      }
    }
    .dis-l-b {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: #3a7bef;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
