<template>
  <div class="overview-view">
    <div class="item-view left">
      <template v-if="flag">
        <div class="img-view scroll">
          <div class="check-item">
            <!-- <tab-switch ref="tabIndex" :tabs="tabs" @get-tab="getTab"> </tab-switch> -->
          </div>
          <!--水情 -->
          <div class="check-item" v-if="type == 0">
            <div class="yq">
              <span><i class="sx"></i>水情</span>
              <span class="dw">单位:m</span>
            </div>
            <!-- 水文站 -->
            <div class="yq_content">
              <el-checkbox class="boxStyle" :indeterminate="SwzisIndeterminate" v-model="allCheckSwz" @change="getAllSw">水位站</el-checkbox>
              <el-checkbox-group v-model="SwzcheckboxGroupValue" @change="getSwCheck">
                <div class="main-checkbox">
                  <el-checkbox v-for="city in swzData" :label="city.label" :key="city.label">
                    <span><img :src="city.src" class="imgStyle" alt="" /> </span>{{ city.value }}</el-checkbox
                  >
                </div>
              </el-checkbox-group>
            </div>
          </div>
          <!-- 雨情 -->
          <div class="check-item" v-if="type == 1">
            <div class="yq">
              <span><i class="sx"></i>雨情</span>
              <span class="dw">单位:mm</span>
            </div>
            <div class="yq_content">
              <el-checkbox class="boxStyle" :indeterminate="YlzisIndeterminate" v-model="YlzallCheck" @change="YlzgetAll">雨量站</el-checkbox>
              <el-checkbox-group v-model="YlzcheckboxGroupValue" @change="YlzgetCheck">
                <div class="main-checkbox">
                  <el-checkbox v-for="city in YlzData" :label="city.label" :key="city.label"
                    ><span><img :src="city.src" class="imgStyle"/></span>{{ city.value }}</el-checkbox
                  >
                </div>
              </el-checkbox-group>
            </div>
          </div>

          <!-- 工情 -->
          <div class="check-item" v-if="type == 2">
            <div class="yq">
              <span><i class="sx"></i>闸泵站</span>
            </div>
            <div class="yq_content">
              <el-checkbox class="boxStyle" :indeterminate="GqisIndeterminate" v-model="GqallCheck" @change="GqgetAll">闸泵站</el-checkbox>
              <el-checkbox-group v-model="GqcheckboxGroupValue" @change="GqgetCheck">
                <div class="main-checkbox">
                  <el-checkbox v-for="city in GqData" :label="city.label" :key="city.label"
                    ><span><img :src="city.src" class="imgStyle"/></span>{{ city.value }}</el-checkbox
                  >
                </div>
              </el-checkbox-group>
            </div>
            <!-- <div class="hx"></div> -->
          </div>

          <!-- 常熟抢险队伍 -->
          <div class="check-item" v-if="type == 3">
            <div class="yq">
              <span><i class="sx"></i>抢险抗灾</span>
            </div>
            <div class="yq_content">
              <el-checkbox class="boxStyle" :indeterminate="QxkzIndeterminate" v-model="QxkzallCheck" @change="QxkzgetAll">抢险抗灾</el-checkbox>
              <el-checkbox-group v-model="QxkzcheckboxGroupValue" @change="QxkzgetCheck">
                <div class="main-checkbox">
                  <el-checkbox v-for="city in QxkzData" :label="city.label" :key="city.label"
                    ><span><img :src="city.src" class="imgStyle"/></span>{{ city.value }}</el-checkbox
                  >
                </div>
              </el-checkbox-group>
            </div>
            <!-- <div class="hx"></div> -->
          </div>

          <!-- 基础图层 -->
          <div class="check-item" v-if="type == 4">
            <div class="yq">
              <span><i class="sx"></i>基础图层</span>
              <!-- <span class="dw">单位:mm</span> -->
            </div>
            <div class="yq_content">
              <!-- <el-checkbox class="boxStyle" :indeterminate="JctcisIndeterminate" v-model="JctcallCheck" @change="JctgetAll">全选</el-checkbox> -->
              <el-checkbox-group v-model="JctcheckboxGroupValue" @change="JctgetCheck">
                <div class="main-checkbox">
                  <el-checkbox v-for="city in JctcData" :label="city.label" :key="city.label">{{ city.value }}</el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
            <div class="hx"></div>
          </div>
          <!-- 易捞点 -->
          <div class="check-item" v-if="type == 5">
            <div class="yq">
              <span><i class="sx"></i>易捞点</span>
              <span class="dw">单位:m</span>
            </div>
            <div class="yq_content">
              <el-checkbox class="boxStyle" :indeterminate="YldIndeterminate" v-model="YldallCheck" @change="YldgetAll">易捞点站</el-checkbox>
              <el-checkbox-group v-model="YldcheckboxGroupValue" @change="YldgetCheck">
                <div class="main-checkbox">
                  <el-checkbox v-for="city in YldData" :label="city.label" :key="city.label">
                    <span><img :src="city.src" class="imgStyle" alt="" /> </span>{{ city.value }}</el-checkbox
                  >
                </div>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { State, Mutation, Action, namespace } from "vuex-class";
import { SucCol, SucCheckbox, SucCheckboxGroup, SucRow, SucTabs, SucTabPane, SucModal } from "@suc/ui";
import { PanelView, TablePage, TabSwitch } from "@/components";
// import { Enterprise, Emergency, RainWater, Station, Plant, Mani, Gate } from "./leftComponents";
import { overview, riverApi, publicApi } from "@/api";
import TableDetail from "./TableDetail.vue";
import qs from "qs";
import { getZzIcon, getYlzIcon, getSwzIcon, getZbzIcon, getYldIcon, getQxkzIcon, getHdIcon } from "@/constants/mapIcon";
import { divide, forIn } from "lodash";

const mapStore = namespace("mapStore");
@Component({
  components: {
    SucCheckbox,
    SucCheckboxGroup,
    SucRow,
    SucCol,
    SucTabs,
    SucTabPane,
    SucModal,
    PanelView,
    TablePage,
    TabSwitch,
    // Enterprise,
    // Emergency,
    // RainWater,
    // Plant,
    // Mani,
    // Gate,
    // TableDetail,
    // Station,
  },
})
export default class OverviewPanel extends Vue {
  @State user: any;
  @State userInfo: any;
  /****************************************************************** */

  olMap = this.$getMapConfig();
  @Prop() sendType!: any;
  @Prop() tssq!: any;
  @Emit()
  getWq(value: any) {
    return value;
  }
  @Watch("sendType", { immediate: true, deep: true })
  getClickIndex() {
    this.tabs = ["水情", "雨情", "闸泵站", "抢险抗灾", "基础图层"];
  }
  wq: any = false; //圩区默认进来不展示
  sx: boolean = false;
  YlzisIndeterminate: boolean = false; //雨量站
  YlzallCheck: boolean = true; //雨量站是否全选

  type: number = 5;
  tabs: Array<any> = ["水情", "雨情", "闸泵站", "抢险抗灾", "基础图层"];

  getTab(index: any) {
    this.type = index;
    this.$emit("childClick", this.type);
    this.getYldPoint();
    // if (this.type == 0) {
    //   this.getSwPoint();
    // } else if (this.type == 1) {
    //   this.getRainPoint();
    // } else if (this.type == 2) {
    //   this.getZbzPoint();
    // } else if (this.type == 3) {
    //   this.getQxzhPoint();
    // }else if (this.type == 5) {
    //   this.getYldPoint();
    // }
  }

  //  雨量站数据
  YlzData: any = [
    { label: "ylz1", value: "0-50", src: require("@/assets/cs/iconylz/ylz1.png") },
    { label: "ylz2", value: "50-100", src: require("@/assets/cs/iconylz/ylz2.png") },
    { label: "ylz3", value: "100-200", src: require("@/assets/cs/iconylz/ylz3.png") },
    { label: "ylz4", value: ">200", src: require("@/assets/cs/iconylz/ylz4.png") },
  ];
  YlzcheckboxGroupValue: any = ["ylz1", "ylz2", "ylz3", "ylz4"]; //绑定值

  //  工情
  GqisIndeterminate: boolean = false;
  GqallCheck: boolean = true;
  GqData: any = [
    { label: "DP", value: "泵站", src: require("@/assets/cs/icongq/bz.png") },
    { label: "DD", value: "闸站", src: require("@/assets/cs/icongq/zz.png") },
  ];
  GqcheckboxGroupValue: any = ["DP", "DD"];

  // 水文
  SwzisIndeterminate: boolean = false;
  allCheckSwz: boolean = true;
  swzData: any = [
    // { label: "sw1", value: "超控制", src: require("@/assets/map/河湖-正常.png") },
    { label: "sw2", value: "正常", src: require("@/assets/cs/iconswz/sw1.png") },
    { label: "sw3", value: "超警戒", src: require("@/assets/cs/iconswz/sw3.png") },
  ];
  SwzcheckboxGroupValue: any = ["sw2", "sw3"];

  isIndeterminate: boolean = false; //河流
  allCheckHl: boolean = true; //河流是否全选
  cities: any = [
    //河流数据
    { label: "hl1", value: "<3.0", icon: "iconfont icon-hedao blue1-color" },
    { label: "hl2", value: "3.0~3.8", icon: "iconfont icon-hedao green-color" },
    { label: "hl3", value: "3.8~4.3", icon: "iconfont icon-hedao orange-color" },
    { label: "hl4", value: ">4.3", icon: "iconfont icon-hedao red-color" },
  ];
  checkboxGroupValue1: any = ["hl1", "hl2", "hl3", "hl4"];

  // 基础图层
  // JctcisIndeterminate: any = false;
  // JctcallCheck: boolean = true;QxkzData
  JctcData: any = [
    { label: "sx", value: "水系" },
    { label: "wq", value: "圩区" },
    { label: "lw", value: "路网" },
    { label: "xz", value: "乡镇" },
  ];
  JctcheckboxGroupValue: any = ["sx"];

  BzcheckboxGroupValue: any = ["bz1", "bz2", "bz3"]; //绑定值

  QxkzIndeterminate: boolean = false;
  QxkzallCheck: boolean = true;
  QxkzData: any = [
    { label: "qxkz1", value: "物资仓库", src: require("@/assets/cs/iconqxkz/wzck.png") },
    { label: "qxkz2", value: "抢险队伍", src: require("@/assets/cs/iconqxkz/qxdw.png") },
  ];
  QxkzcheckboxGroupValue: any = ["qxkz1", "qxkz2"]; //绑定值

  // 易涝点
  YldIndeterminate: boolean = false;
  YldallCheck: boolean = true;
  YldData: any = [
    { label: "yld2", value: "正常", src: require("@/assets/cs/iconyld/yld2.png") },
    { label: "yld1", value: "超警戒", src: require("@/assets/cs/iconyld/yld1.png") },
  ];
  YldcheckboxGroupValue: any = ["yld1", "yld2"];

  /****************************************************************** */

  @mapStore.Mutation setMarkers: any;
  @mapStore.Mutation setMarkerFlag: any;
  // @Prop() tableDetailParams: any;
  // @Watch("tableDetailParams", { deep: true })
  // onDetailParams(val: any) {
  //   if (val.data.id) {
  //     if (val.data.type && val.data.type == "video") {
  //       this.rightshow = false;
  //     } else {
  //       this.rightRow = val;
  //       this.rightshow = true;
  //     }
  //   }
  // }
  flag: boolean = true;
  // flag1: boolean = true;
  flag2: boolean = true;
  flag3: boolean = true;
  flag4: boolean = true;
  flag5: boolean = true;
  onFlag() {
    this.flag = !this.flag;
  }

  /********************************************************************* */

  //  水文全选
  getAllSw(val: any) {
    if (val) {
      var str: any = "";
      var newArr: any = [];
      this.swzData.forEach((e: any) => {
        str += e.label + ",";
      });
      newArr = str.split(",");
      for (var i = 0; i < newArr.length; i++) {
        if (newArr[i] == "" || newArr[i] == null || typeof newArr[i] == undefined) {
          newArr.splice(i, 1);
          i = i - 1;
        }
      }
      this.SwzcheckboxGroupValue = newArr;
      this.SwzisIndeterminate = true;
    } else {
      this.SwzcheckboxGroupValue = [];
    }
    this.SwzisIndeterminate = false;
    this.getSwPoint();
  }

  // 水文复选框点击
  getSwCheck(value: any) {
    let checkedCount = value.length;
    this.allCheckSwz = checkedCount === this.swzData.length;
    this.SwzisIndeterminate = checkedCount > 0 && checkedCount < this.swzData.length;
    this.getSwPoint();
  }

  // 雨量全选点击
  YlzgetAll(val: any) {
    if (val) {
      var newArr: any = [];
      newArr = this.YlzData.map((e: any) => {
        return e.label;
      });
      this.YlzcheckboxGroupValue = newArr;
      this.YlzisIndeterminate = true;
    } else {
      this.YlzcheckboxGroupValue = [];
    }
    this.YlzisIndeterminate = false;
    this.getRainPoint();
  }

  YlzgetCheck(value: any) {
    let checkedCount = value.length;
    this.YlzallCheck = checkedCount === this.YlzData.length;
    this.YlzisIndeterminate = checkedCount > 0 && checkedCount < this.YlzData.length;
    this.getRainPoint();
  }

  //闸泵站
  GqgetAll(val: any) {
    if (val) {
      var newArr: any = [];
      newArr = this.GqData.map((e: any) => {
        return e.label;
      });
      this.GqcheckboxGroupValue = newArr;
      this.GqisIndeterminate = true;
    } else {
      this.GqcheckboxGroupValue = [];
    }

    this.GqisIndeterminate = false;
    this.getZbzPoint();
  }

  GqgetCheck(value: any) {
    let checkedCount = value.length;
    this.GqallCheck = checkedCount === this.GqData.length;
    this.GqisIndeterminate = checkedCount > 0 && checkedCount < this.GqData.length;
    this.getZbzPoint();
  }

  JctgetCheck(value: any) {
    if (value.includes("sx")) {
      this.sx = true;
      this.$emit("getSx", this.sx);
    } else {
      this.sx = false;
      this.$emit("getSx", this.sx);
    }
    if (value.includes("wq")) {
      this.wq = true;
      this.getWq(this.wq);
    } else {
      this.wq = false;
      this.getWq(this.wq);
    }
    if (value.includes("lw")) {
    }
    if (value.includes("xz")) {
    }
  }

  //抢险抗灾全选点击
  QxkzgetAll(val: any) {
    if (val) {
      var str: any = "";
      var newArr: any = [];
      this.QxkzData.forEach((e: any) => {
        str += e.label + ",";
      });
      newArr = str.split(",");
      for (var i = 0; i < newArr.length; i++) {
        if (newArr[i] == "" || newArr[i] == null || typeof newArr[i] == undefined) {
          newArr.splice(i, 1);
          i = i - 1;
        }
      }
      this.QxkzcheckboxGroupValue = newArr;
    } else {
      this.QxkzcheckboxGroupValue = [];
    }
    this.QxkzIndeterminate = false; //状态可以确定
    this.getQxzhPoint();
  }

  //抢险抗灾复选框
  QxkzgetCheck(value: any) {
    let checkedCount = value.length;
    this.QxkzallCheck = checkedCount === this.QxkzData.length;
    this.QxkzIndeterminate = checkedCount > 0 && checkedCount < this.QxkzData.length;
    this.getQxzhPoint();
  }

  //易捞点全选点击
  YldgetAll(val: any) {
    if (val) {
      var str: any = "";
      var newArr: any = [];
      this.YldData.forEach((e: any) => {
        str += e.label + ",";
      });
      newArr = str.split(",");
      for (var i = 0; i < newArr.length; i++) {
        if (newArr[i] == "" || newArr[i] == null || typeof newArr[i] == undefined) {
          newArr.splice(i, 1);
          i = i - 1;
        }
      }
      this.YldcheckboxGroupValue = newArr;
      this.YldIndeterminate = true;
    } else {
      this.YldcheckboxGroupValue = [];
    }
    this.YldIndeterminate = false;
    this.getYldPoint();
  }

  YldgetCheck(value: any) {
    let checkedCount = value.length;
    this.YldallCheck = checkedCount === this.YldData.length;
    this.YldIndeterminate = checkedCount > 0 && checkedCount < this.YldData.length;
    this.getYldPoint();
  }

  /****************************************************************************** */
  // tab内表格
  columns: any[] = [];
  tableData: any[] = [];

  tableHeight: any = document.documentElement.children[1].clientHeight - 400;

  markers: any = [];
  mounted() {
    this.getTab("5");
    this.getWq(this.wq);
  }

  // dwParams: any = {
  //   hl: this.checkboxGroupValue1,
  //   ylz: this.YlzcheckboxGroupValue,
  //   qxkz: this.QxkzcheckboxGroupValue,
  //   yld: this.YldcheckboxGroupValue,
  // };

  /************************* */
  // 所有河流点位参数
  hlParamsObj: any = {
    condition: "",
  };

  // 雨量站点位参数
  ylzParamsObj: any = {
    condition: "",
  };

  // 常熟闸泵站
  zbzParamsObj: any = {
    condition: "",
  };
  //水文站点参数
  swzParamsObj: any = {
    condition: "",
  };

  // 所有抢险抗灾点位参数
  qxkzParamsObj: any = {
    condition: "",
  };

  // 易捞点
  yldParamsObj: any = {
    condition: "",
  };

  hlPoint: any = []; //河流点位
  ylzPoint: any = []; //雨量站
  swzPoint: any = []; //水文站
  zbzPoint: any = []; //常熟闸泵站点位
  qxkzPoint: any = []; //抢险抗灾
  yldPoint: any = []; //易捞点

  //雨量站方法
  async getRainPoint() {
    const url = "wjServer/wj/gis/p";
    this.markers = [];
    this.ylzParamsObj.condition = this.YlzcheckboxGroupValue.toString();
    const ylzData = await publicApi.getWithParam(url, this.ylzParamsObj);
    if (ylzData.result == true) {
      this.ylzPoint = ylzData.data.map((e: any) => {
        return {
          id: e.stcd,
          name: e.stnm,
          lon: Number(e.lgtd) + 0.00001,
          lat: Number(e.lttd) + 0.00001,
          sttp: e.key,
          // coords: [parseFloat(e.lgtd), parseFloat(e.lttd)],
          coords: [Number(e.lgtd) + 0.00001, Number(e.lttd) + 0.00001],
          key: "ylz",
          style: {
            image: {
              icon: {
                scale: 0.5,
                anchor: [0.5, 1],
                src: getYlzIcon(e.rangeKey, "在线"),
                // src: require("@/assets/map/雨量-正常.png"),
              },
            },
          },
        };
      });
    } else {
      this.$message.error("获取失败");
    }
    this.markers = this.markers.concat(this.ylzPoint);
    this.setMarkers(this.markers);
  }

  // 水文数据
  async getSwPoint() {
    const url = "wjServer/wj/gis/z";
    this.markers = [];
    this.swzParamsObj.condition = this.SwzcheckboxGroupValue.toString();
    const swzData = await publicApi.getWithParam(url, this.swzParamsObj);
    if (swzData.result == true) {
      this.swzPoint = swzData.data.map((e: any) => {
        return {
          id: e.stcd,
          name: e.stnm,
          lon: Number(e.lgtd) + 0.00001,
          lat: Number(e.lttd) + 0.00001,
          sttp: e.key,
          coords: [Number(e.lgtd) + 0.00001, Number(e.lttd) + 0.00001],
          key: "swz",
          ssData: e.ssData,
          style: {
            image: {
              icon: {
                scale: 0.5,
                anchor: [0.5, 1],
                src: getSwzIcon(e.rangeKey),
              },
            },
            text: {
              font: "22px Calibri,sans-serif",
              text: `${e.stnm}:${e.ssData}m`,

              fill: {
                // color: "white",
              },
              stroke: {
                // width: 6,
                color: "blue",
              },
            },
          },
        };
      });
    } else {
      this.$message.error("获取失败");
    }
    this.markers = this.markers.concat(this.swzPoint);
    this.setMarkers(this.markers);
  }

  //常熟闸泵站数据
  async getZbzPoint() {
    const url = "wjServer/wj/gis/zbz";
    this.markers = [];
    this.zbzParamsObj.condition = this.GqcheckboxGroupValue.toString();
    const zbzData = await publicApi.getWithParam(url, this.zbzParamsObj);
    if (zbzData.result == true) {
      this.zbzPoint = zbzData.data.map((e: any) => {
        return {
          id: e.stcd,
          name: e.stnm,
          lon: Number(e.lgtd) + 0.00001,
          lat: Number(e.lttd) + 0.00001,
          coords: [Number(e.lgtd) + 0.00001, Number(e.lttd) + 0.00001],
          key: "zbz",
          type: e.rangeKey,
          style: {
            image: {
              icon: {
                scale: 0.5,
                anchor: [0.5, 1],
                src: getZbzIcon(e.rangeKey),
              },
            },
          },
        };
      });
    } else {
      this.$message.error("获取失败");
    }
    this.markers = this.markers.concat(this.zbzPoint);
    this.setMarkers(this.markers);
  }

  // 河道方法
  async getRiverPoint() {
    const url = "wjServer/wj/gis/river";
    this.markers = [];
    this.hlParamsObj.condition = this.checkboxGroupValue1.toString();
    const riveData = await publicApi.getWithParam(url, this.hlParamsObj);
    if (riveData.result == true) {
      this.hlPoint = riveData.data.map((e: any) => {
        return {
          id: e.stcd,
          // name: `河流:${e.hnnm}<br/>测站:${e.stnm}`,
          //  info: `河流:${e.hnnm},测站:${e.stnm}`,
          name: e.hnnm,
          lon: e.lgtd,
          lat: e.lttd,
          rvnm: e.rvnm,
          coords: [Number(e.lgtd), Number(e.lttd)],
          key: "hd",
          rangeKey: e.rangeKey,
          style: {
            image: {
              icon: {
                scale: 0.5,
                anchor: [0.5, 1],
                src: getHdIcon(e.rangeKey),
                // src: require("@/assets/map/河湖-正常.png"),
              },
            },
          },
        };
      });
      // var a= [];
      // this.hlPoint.forEach((e: any) => {
      //   a.push(e.rvnm);
      // });
    } else {
      this.$message.error("获取失败");
    }

    this.markers = this.markers.concat(this.hlPoint);

    this.setMarkers(this.markers);
  }

  // 抢险抗灾
  async getQxzhPoint() {
    const url = "wjServer/wj/gis/qxkz";
    this.markers = [];
    this.qxkzParamsObj.condition = this.QxkzcheckboxGroupValue.toString();
    const qxkzData = await publicApi.getWithParam(url, this.qxkzParamsObj);
    if (qxkzData.result == true) {
      this.qxkzPoint = qxkzData.data.map((e: any) => {
        return {
          id: e.uuid,
          name: e.name,
          lon: Number(e.lon) + 0.00001,
          lat: Number(e.lat) + 0.00001,
          coords: [Number(e.lon) + 0.00001, Number(e.lat) + 0.00001],
          key: e.key,
          ckFzr: e.ckFzr,
          ckAreaName: e.ckAreaName,
          ckAddress: e.ckAddress,
          ckTel: e.ckTel,
          // 抢险队伍信息

          dwFzr: e.dwFzr,
          dwAreaName: e.dwAreaName,
          address: e.address, //地址
          jgType: e.jgType, //机构性质
          peopleNum: e.peopleNum, //现有人数
          dwTel: e.dwTel,

          style: {
            image: {
              icon: {
                scale: 1,
                anchor: [0.5, 1],
                src: getQxkzIcon(e.key),
                // src: require("@/assets/map/窨井-正常.png"),
              },
            },
          },
        };
      });
    } else {
      this.$message.error("获取失败");
    }
    this.markers = this.markers.concat(this.qxkzPoint);
    this.setMarkers(this.markers);
  }

  // 易捞点
  async getYldPoint() {
    const url = "wjServer/wj/gis/yld";
    this.markers = [];
    this.yldParamsObj.condition = this.YldcheckboxGroupValue.toString();
    const yldData = await publicApi.getWithParam(url, this.yldParamsObj);
    if (yldData.result == true) {
      this.yldPoint = yldData.data.map((e: any) => {
        return {
          id: e.stcd,
          name: e.stnm,
          lon: Number(e.lgtd) + 0.00001,
          lat: Number(e.lttd) + 0.00001,
          coords: [Number(e.lgtd) + 0.00001, Number(e.lttd) + 0.00001],
          sttp: e.key,
          key: "yld",
          style: {
            image: {
              icon: {
                scale: 0.5,
                anchor: [0.5, 1],
                src: getYldIcon(e.rangeKey),
              },
            },
            text: {
              font: "22px Calibri,sans-serif",
              text: `${e.stnm}:${e.ssData}m`,

              fill: {
                // color: "white",
              },
              stroke: {
                // width: 6,
                color: "blue",
              },
            },
          },
        };
      });
    } else {
      this.$message.error("获取失败");
    }
    this.markers = this.markers.concat(this.yldPoint);
    this.setMarkers(this.markers);
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
$deep: "::v-deep";
.overview-view {
  width: 100%;
  height: 100%;
  position: relative;
  .item-view {
    height: 100%;
    background-color: #ffffff;
    box-shadow: 2px 0px 10px 0px rgba(0, 0, 0, 0.12);
  }
  .left {
    float: left;
    width: 100%;
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
    // .top {
    //   padding-top: 14px;
    // }
  }

  .check-btns {
    padding: 0 14px 14px;
    // border-bottom: 1px solid $border-color;
  }
  .tab-btns {
    padding: 14px 0;
    // height: calc(100% - 130px);
    height: calc(100% - 380px);
  }

  .item-panel {
    width: 100%;
    height: calc(100% - 60px);
    padding: 10px 14px;
    border-top: 1px solid $border-color;
  }

  .img-view {
    position: relative;
    // padding: 0 10px;
    height: 100%;
    overflow: auto;
    .check-item {
      width: 100%;
      padding: 10px 10px;
      #{$deep}.boxStyle {
        .el-checkbox__input.is-checked .el-checkbox__inner,
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
          border-color: #a6a6a7;
          // background-color: #1fbe07;
          border-radius: 3px;
        }
      }

      #{$deep}.boxStyle {
        .el-checkbox__input.is-checked + .el-checkbox__label {
          font-weight: 600;
        }
      }

      .yq {
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        .sx {
          display: inline-block;
          height: 25px;
          background: #4078f1;
          width: 4px;
          vertical-align: top;
          margin-right: 5px;
          border-radius: 8px;
        }
        .dw {
          padding-right: 5%;
          font-size: 16px;
        }
      }
      .yq_content {
        padding: 40px 0;
      }
      .hx {
        width: 100%;
        height: 1px;
        background: #e0dcdc;
      }

      .ft-weight {
        font-weight: 600 !important;
      }
      #{$deep}.suc-checkbox .ivu-checkbox-wrapper {
        font-size: 12px;
      }
      #{$deep}.ivu-checkbox + span {
        display: none;
      }
      .main-checkbox {
        margin-top: 25px;
        .imgStyle {
          width: 16px;
          margin-right: 5px;
        }
        .red-color {
          color: #ff5a47;
        }
        .orange-color {
          color: #ffab3d;
        }
        .blue-color {
          color: #3a7bef;
        }
        .blue1-color {
          color: #5397ff;
        }
        .green-color {
          color: #58dde0;
        }
      }
      .bottom-checkbox {
        margin-top: 5px;
      }
    }
    .icon-xuanzhong::before {
      color: #3a7bef;
    }
    #{$deep}.el-checkbox__label {
      font-size: 16px;
      vertical-align: middle;
    }
    .flex-class {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .csws {
      position: absolute;
      top: 37px;
      left: 58px;
      width: 507px;
      &-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 16px;
        height: 16px;
        border-radius: 50%;
      }
    }
    .csys {
      position: absolute;
      top: 41px;
      left: 59px;
      width: 507px;
    }
    .sxgc {
      position: absolute;
      top: 41px;
      left: 58px;
      width: 591px;
    }
    .cgwl {
      position: absolute;
      top: 37px;
      left: 59px;
      width: 506px;
    }
    .circle {
      width: 14px;
      height: 14px;
      background-color: #ffffff;
      border: solid 2px #999999;
      border-radius: 50%;
    }
  }
  .arrow-btn {
    font-size: 14px;
    color: #3a7bef;
    cursor: pointer;
  }
  #{$deep}.el-checkbox {
    width: 65px;
    font-size: 16px;
    vertical-align: middle;
  }
  #{$deep}.el-checkbox__input.is-checked + .el-checkbox__label {
    color: #2e2828;
    font-size: 16px;
    vertical-align: middle;
  }
}
</style>
