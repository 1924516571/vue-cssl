<template>
  <div class="overview-view">
    <div class="item-view left">
      <panel-view heading="总览">
        <template v-slot:right>
          <div class="arrow-btn" @click="onFlag">
            <span v-if="!flag">展开</span>
            <span v-if="flag">收起</span>
          </div>
        </template>
        <template v-if="flag">
          <div class="img-view scroll">
            <div class="check-item">
              <el-checkbox class="boxStyle" :indeterminate="isIndeterminate" v-model="allCheckHl" @change="getAllhl">河流</el-checkbox>
              <el-checkbox-group v-model="checkboxGroupValue1" @change="getHlCheck">
                <div class="main-checkbox">
                  <el-checkbox v-for="city in cities" :label="city.label" :key="city.label">{{ city.value }}</el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
            <div class="check-item">
              <el-checkbox class="boxStyle" :indeterminate="YlzisIndeterminate" v-model="YlzallCheck" @change="YlzgetAll">雨量站</el-checkbox>
              <el-checkbox-group v-model="YlzcheckboxGroupValue" @change="YlzgetCheck">
                <div class="main-checkbox">
                  <el-checkbox v-for="city in YlzData" :label="city.label" :key="city.label">{{ city.value }}</el-checkbox>
                </div>
              </el-checkbox-group>
            </div>

            <div class="check-item">
              <el-checkbox class="boxStyle" :indeterminate="BzisIndeterminate" v-model="BzallCheck" @change="BzgetAll">闸泵站</el-checkbox>
              <el-checkbox-group v-model="BzcheckboxGroupValue" @change="BzgetCheck">
                <div class="main-checkbox">
                  <el-checkbox v-for="city in BzData" :label="city.label" :key="city.label">{{ city.value }}</el-checkbox>
                </div>
              </el-checkbox-group>
            </div>

            <div class="check-item">
              <el-checkbox class="boxStyle" :indeterminate="BjisIndeterminate" v-model="BjallCheck" @change="BjgetAll">泵机</el-checkbox>
              <el-checkbox-group v-model="BjcheckboxGroupValue" @change="BjgetCheck">
                <div class="main-checkbox">
                  <el-checkbox v-for="city in BjData" :label="city.label" :key="city.label">{{ city.value }}</el-checkbox>
                </div>
              </el-checkbox-group>
            </div>

            <!-- <div class="check-item">
              <el-checkbox class="boxStyle" :indeterminate="ZzIndeterminate" v-model="ZzallCheck" @change="ZzgetAll">闸站</el-checkbox>
              <el-checkbox-group v-model="ZzcheckboxGroupValue" @change="ZzgetCheck">
                <div class="main-checkbox">
                  <el-checkbox v-for="city in ZzData" :label="city.label" :key="city.label">{{ city.value }}</el-checkbox>
                </div>
              </el-checkbox-group>
            </div> -->

            <div class="check-item">
              <el-checkbox class="boxStyle" :indeterminate="QxkzIndeterminate" v-model="QxkzallCheck" @change="QxkzgetAll">抢险抗灾</el-checkbox>
              <el-checkbox-group v-model="QxkzcheckboxGroupValue" @change="QxkzgetCheck">
                <div class="main-checkbox">
                  <el-checkbox v-for="city in QxkzData" :label="city.label" :key="city.label">{{ city.value }}</el-checkbox>
                </div>
              </el-checkbox-group>
            </div>

            <div class="check-item">
              <el-checkbox class="boxStyle" :indeterminate="YldIndeterminate" v-model="YldallCheck" @change="YldgetAll">易捞点</el-checkbox>
              <el-checkbox-group v-model="YldcheckboxGroupValue" @change="YldgetCheck">
                <div class="main-checkbox">
                  <el-checkbox v-for="city in YldData" :label="city.label" :key="city.label">{{ city.value }}</el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
          </div>
        </template>

        <div class="tab-btns">
          <template>
            <suc-tabs style="height: 100%" @on-click="getTab">
              <suc-tab-pane label="河道">
                <enterprise :flag="flag" @row-click="getRow" :value="value"></enterprise>
              </suc-tab-pane>
              <suc-tab-pane label="雨量站">
                <rain-water :flag="flag" @row-click="getRow"></rain-water>
              </suc-tab-pane>
              <suc-tab-pane label="闸泵站">
                <plant :flag="flag" @row-click="getRow" :value="zbzValue"></plant>
              </suc-tab-pane>
              <!-- <suc-tab-pane label="闸站">
                <mani :flag="flag" @row-click="getRow"></mani>
              </suc-tab-pane> -->
              <suc-tab-pane label="物资仓库">
                <gate :flag="flag" @row-click="getRow"></gate>
              </suc-tab-pane>

              <suc-tab-pane label="抢险队伍">
                <station :flag="flag" @row-click="getRow"></station>
              </suc-tab-pane>
              <suc-tab-pane label="易涝点">
                <emergency :flag="flag" @row-click="getRow"></emergency>
              </suc-tab-pane>
            </suc-tabs>
          </template>
        </div>
      </panel-view>
    </div>
    <transition name="slide-fade" v-if="rightshow">
      <div class="item-view right">
        <div class="close-btn bg-shadow" @click="getRightshow">
          <span>×</span>
        </div>
        <table-detail :row="rightRow"></table-detail>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { State, Mutation, Action, namespace } from "vuex-class";
import { SucCol, SucCheckbox, SucCheckboxGroup, SucRow, SucTabs, SucTabPane, SucModal } from "@suc/ui";
import { PanelView, TablePage } from "@/components";
import { Enterprise, Emergency, RainWater, Station, Plant, Mani, Gate } from "./leftComponents";
import { overview, riverApi, publicApi } from "@/api";
import TableDetail from "./TableDetail.vue";
import qs from "qs";
import { getBzStyle, getBzIcon, getZzIcon } from "@/constants/mapIcon";
import { forIn } from "lodash";

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
    Enterprise,
    Emergency,
    RainWater,
    Plant,
    Mani,
    Gate,
    TableDetail,
    Station,
  },
})
export default class OverviewPanel extends Vue {
  	@State user: any;
  	@State userInfo: any;
  /****************************************************************** */
  isIndeterminate: boolean = false; //河流
  allCheckHl: boolean = true; //河流是否全选

  cities: any = [
    //河流数据
    { label: "hl1", value: "<3.0m" },
    { label: "hl2", value: "3.0~3.8m" },
    { label: "hl3", value: "3.8~4.3m" },
    { label: "hl4", value: ">4.3m" },
  ];
  checkboxGroupValue1: any = ["hl1", "hl2", "hl3", "hl4"];

  YlzisIndeterminate: boolean = false; //雨量站
  YlzallCheck: boolean = true; //雨量站是否全选

  //  雨量站数据
  YlzData: any = [
    { label: "ylz1", value: "0-9" },
    { label: "ylz2", value: "10-25" },
    { label: "ylz3", value: "25-50" },
    { label: "ylz4", value: "50-100" },
    { label: "ylz5", value: "100-250" },
    { label: "ylz6", value: ">=250" },
  ];
  YlzcheckboxGroupValue: any = ["ylz1", "ylz2", "ylz3", "ylz4", "ylz5", "ylz6"]; //绑定值

  BzisIndeterminate: boolean = false;
  BzallCheck: boolean = true;
  //  泵站数据
  BzData: any = [
    { label: "bz1", value: "超警戒" },
    // { label: "bz2", value: "超控制" },
    { label: "bz2", value: "正常" },
    { label: "bz3", value: "缺测" },
  ];
  BzcheckboxGroupValue: any = ["bz1", "bz2", "bz3"]; //绑定值

  BjisIndeterminate: boolean = false;
  BjallCheck: boolean = true;
  BjData: any = [
    { label: "bj1", value: "运行" },
    { label: "bj2", value: "正常" },
    { label: "bj3", value: "故障" },
    { label: "bj4", value: "缺测" },
  ];
  BjcheckboxGroupValue: any = ["bj1", "bj2", "bj3", "bj4"]; //绑定值

  // ZzIndeterminate: boolean = false;
  // ZzallCheck: boolean = true;
  // ZzData: any = [
  //   { label: "zz1", value: "运行" },
  //   { label: "zz2", value: "正常" },
  //   { label: "zz3", value: "故障" },
  //   { label: "zz4", value: "缺测" },
  // ];
  // ZzcheckboxGroupValue: any = ["zz1", "zz2", "zz3", "zz4"]; //绑定值

  QxkzIndeterminate: boolean = false;
  QxkzallCheck: boolean = true;
  QxkzData: any = [
    { label: "qxkz1", value: "物资仓库" },
    { label: "qxkz2", value: "抢险队伍" },
  ];
  QxkzcheckboxGroupValue: any = ["qxkz1", "qxkz2"]; //绑定值

  YldIndeterminate: boolean = false;
  YldallCheck: boolean = true;
  YldData: any = [
    { label: "yld1", value: "积水点" },
    { label: "yld2", value: "险工险峻" },
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
  // 河流全选点击
  getAllhl(val: any) {
    if (val) {
      var str: any = "";
      var newArr: any[] = [];
      this.cities.forEach((e: any) => {
        str += e.label + ",";
      });
      newArr = str.split(",");
      for (var i = 0; i < newArr.length; i++) {
        if (newArr[i] == "" || newArr[i] == null || typeof newArr[i] == undefined) {
          newArr.splice(i, 1);
          i = i - 1;
        }
      }
      // newArr.pop();
      this.checkboxGroupValue1 = newArr;
    } else {
      this.checkboxGroupValue1 = [];
    }
    this.isIndeterminate = false;
    // this.getRiverPoint();
    this.getInfo();
  }
  // 河流复选框点击
  getHlCheck(value: any) {
    let checkedCount = value.length;
    this.allCheckHl = checkedCount === this.cities.length;
    this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    // this.getRiverPoint();
    this.getInfo();
  }

  // 雨量全选点击
  YlzgetAll(val: any) {
    if (val) {
      var str: any = "";
      var newArr: any = [];
      this.YlzData.forEach((e: any) => {
        str += e.label + ",";
      });
      newArr = str.split(",");
      for (var i = 0; i < newArr.length; i++) {
        if (newArr[i] == "" || newArr[i] == null || typeof newArr[i] == undefined) {
          newArr.splice(i, 1);
          i = i - 1;
        }
      }
      // newArr.pop();
      this.YlzcheckboxGroupValue = newArr;
      this.YlzisIndeterminate = true;
    } else {
      this.YlzcheckboxGroupValue = [];
    }

    this.YlzisIndeterminate = false;
    // this.getRainPoint();
    this.getInfo();
  }

  YlzgetCheck(value: any) {
    let checkedCount = value.length;
    this.YlzallCheck = checkedCount === this.YlzData.length;
    this.YlzisIndeterminate = checkedCount > 0 && checkedCount < this.YlzData.length;
    // this.getRainPoint();
    this.getInfo();
  }

  // 泵站全选点击
  BzgetAll(val: any) {
    if (val) {
      var str: any = "";
      var newArr: any = [];
      this.BzData.forEach((e: any) => {
        str += e.label + ",";
      });
      newArr = str.split(",");
      for (var i = 0; i < newArr.length; i++) {
        if (newArr[i] == "" || newArr[i] == null || typeof newArr[i] == undefined) {
          newArr.splice(i, 1);
          i = i - 1;
        }
      }
      this.BzcheckboxGroupValue = newArr;
      // this.BzisIndeterminate = false;
    } else {
      this.BzcheckboxGroupValue = [];
    }
    this.BzisIndeterminate = false;
    // this.getBzPoint();
    this.getInfo();
  }

  BzgetCheck(value: any) {
    let checkedCount = value.length;
    this.BzallCheck = checkedCount === this.BzData.length;
    this.BzisIndeterminate = checkedCount > 0 && checkedCount < this.BzData.length;
    // this.getBzPoint();
    this.getInfo();
  }

  // 泵机全选点击
  BjgetAll(val: any) {
    if (val) {
      var str: any = "";
      var newArr: any = [];
      this.BjData.forEach((e: any) => {
        str += e.label + ",";
      });
      newArr = str.split(",");
      for (var i = 0; i < newArr.length; i++) {
        if (newArr[i] == "" || newArr[i] == null || typeof newArr[i] == undefined) {
          newArr.splice(i, 1);
          i = i - 1;
        }
      }
      this.BjcheckboxGroupValue = newArr;
    } else {
      this.BjcheckboxGroupValue = [];
    }
    this.BjisIndeterminate = false; //状态可以确定
    // this.getBjPoint();
    this.getInfo();
  }

  //  泵机复选框
  BjgetCheck(value: any) {
    let checkedCount = value.length;
    this.BjallCheck = checkedCount === this.BjData.length;
    this.BjisIndeterminate = checkedCount > 0 && checkedCount < this.BjData.length;
    // this.getBjPoint();
    this.getInfo();
  }

  // 闸站全选点击
  // ZzgetAll(val: any) {
  //   if (val) {
  //     var str: any = "";
  //     var newArr: any = [];
  //     this.ZzData.forEach((e: any) => {
  //       str += e.label + ",";
  //     });
  //     newArr = str.split(",");
  //     for (var i = 0; i < newArr.length; i++) {
  //       if (newArr[i] == "" || newArr[i] == null || typeof newArr[i] == undefined) {
  //         newArr.splice(i, 1);
  //         i = i - 1;
  //       }
  //     }
  //     this.ZzcheckboxGroupValue = newArr;
  //   } else {
  //     this.ZzcheckboxGroupValue = [];
  //   }
  //   this.ZzIndeterminate = false; //状态可以确定
  // }

  //  闸站复选框
  // ZzgetCheck(value: any) {
  //   let checkedCount = value.length;
  //   this.ZzallCheck = checkedCount === this.ZzData.length;
  //   this.ZzIndeterminate = checkedCount > 0 && checkedCount < this.ZzData.length;
  // }

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
    // this.getQxzhPoint();
    this.getInfo();
  }

  //抢险抗灾复选框
  QxkzgetCheck(value: any) {
    let checkedCount = value.length;
    this.QxkzallCheck = checkedCount === this.QxkzData.length;
    this.QxkzIndeterminate = checkedCount > 0 && checkedCount < this.QxkzData.length;
    // this.getQxzhPoint();
    this.getInfo();
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
    } else {
      this.YldcheckboxGroupValue = [];
    }
    this.YldIndeterminate = false; //状态可以确定
    this.getInfo();
  }

  YldgetCheck(value: any) {
    let checkedCount = value.length;
    this.YldallCheck = checkedCount === this.YldData.length;
    this.YldIndeterminate = checkedCount > 0 && checkedCount < this.YldData.length;
    this.getInfo();
  }

  /****************************************************************************** */
  show: boolean = false; //控制右侧模块显隐
  // tab内表格
  columns: any[] = [];
  tableData: any[] = [];

  tableHeight: any = document.documentElement.children[1].clientHeight - 400;

  markers: any = [];
  mounted() {
    this.getInfo();
  }

  dwParams: any = {
    hl: this.checkboxGroupValue1,
    ylz: this.YlzcheckboxGroupValue,
    bz: this.BzcheckboxGroupValue,
    bj: this.BjcheckboxGroupValue,
    // zz: this.ZzcheckboxGroupValue,
    qxkz: this.QxkzcheckboxGroupValue,
    yld: this.YldcheckboxGroupValue,
  };
  // 所有点位
  async getInfo() {
    this.getRiverPoint(); //河流点位
    this.getRainPoint(); //雨量点位
    this.getBzPoint(); //泵站点位
    this.getBjPoint(); //泵机点位
    // this.getZzPoint(); //闸站点位
    this.getQxzhPoint(); //抢险灾害
    this.getYldPoint(); //易捞点
  }

  /************************* */
  // 所有河流点位参数
  hlParamsObj: any = {
    condition: "",
  };

  // 雨量站点位参数
  ylzParamsObj: any = {
    condition: "",
  };
  // 闸泵站点位参数
  bzParamsObj: any = {
    condition: "",
  };
  // 泵机参数
  bjParamsObj: any = {
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
  bzPoint: any = []; //闸泵站
  bjPoint: any = []; //泵机
  qxkzPoint: any = []; //抢险抗灾
  yldPoint: any = []; //易捞点

  // 河道方法
  async getRiverPoint() {
    const url = "wjServer/wj/gis/river";
    this.markers = [];
    // this.setMarkers([]);
    // this.boxStyle.condition = qs.stringify(this.checkboxGroupValue1, { arrayFormat: 'repeat' });
    this.hlParamsObj.condition = this.checkboxGroupValue1.toString();
    const riveData = await publicApi.getWithParam(url, this.hlParamsObj);
    if (riveData.result == true) {
      this.hlPoint = riveData.data.map((e: any) => {
        return {
          id: e.stcd,
          name: `河流:${e.hnnm}<br/>测站:${e.stnm}`,
          //  info: `河流:${e.hnnm},测站:${e.stnm}`,
          lon: e.lgtd,
          lat: e.lttd,
          // coords: [parseFloat(e.lgtd), parseFloat(e.lttd)],
          coords: [Number(e.lgtd), Number(e.lttd)],
          key: "hl",
          style: {
            image: {
              icon: {
                scale: 0.5,
                anchor: [0.5, 1],
                // src: getZzIcon("在线", "N"),
                src: require("@/assets/map/河湖-正常.png"),
              },
            },
          },
        };
      });
    } else {
      this.$message.error("获取失败");
    }
    this.markers = this.markers.concat(this.hlPoint);
    this.setMarkers(this.markers);
  }

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
          name: `河流:${e.hnnm}<br/>测站:${e.stnm}`,
          //  info: `河流:${e.hnnm},测站:${e.stnm}`,
          lon: e.lgtd,
          lat: e.lttd,
          // coords: [parseFloat(e.lgtd), parseFloat(e.lttd)],
          coords: [Number(e.lgtd), Number(e.lttd)],
          key: "ylz",
          style: {
            image: {
              icon: {
                scale: 0.5,
                anchor: [0.5, 1],
                // src: getZzIcon("在线", "N"),
                src: require("@/assets/map/雨量-正常.png"),
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

  //闸泵站点位
  async getBzPoint() {
    const url = "wjServer/wj/gis/zbz";
    this.markers = [];
    this.bzParamsObj.condition = this.BzcheckboxGroupValue.toString();
    const bzData = await publicApi.getWithParam(url, this.bzParamsObj);
    if (bzData.result == true) {
      this.bzPoint = bzData.data.map((e: any) => {
        return {
          id: "zbz" + e.bzbm,
          name: e.bzmc,
          lon: e.lon,
          lat: e.lat,
          // coords: [parseFloat(e.lon), parseFloat(e.lat)],
          coords: [Number(e.lon), Number(e.lat)],
          key: "zbz",
          style: {
            image: {
              icon: {
                scale: 0.5,
                anchor: [0.5, 1],
                // src: getZzIcon("在线", "N"),
                src: require("@/assets/map/泵站-正常.png"),
              },
            },
          },
        };
      });
    } else {
      this.$message.error("获取失败");
    }
    this.markers = this.markers.concat(this.bzPoint);
    this.setMarkers(this.markers);
  }

  // 泵机
  async getBjPoint() {
    const url = "wjServer/wj/gis/bj";
    this.markers = [];
    this.bjParamsObj.condition = this.BjcheckboxGroupValue.toString();
    const bjData = await publicApi.getWithParam(url, this.bjParamsObj);
    if (bjData.result == true) {
      this.bjPoint = bjData.data.map((e: any) => {
        return {
          id: "bj" + e.bzbm,
          name: e.bzmc,
          lon: e.lon,
          lat: e.lat,
          // coords: [parseFloat(e.lon), parseFloat(e.lat)],
          coords: [Number(e.lon), Number(e.lat)],
          key: "bj",
          style: {
            image: {
              icon: {
                scale: 0.5,
                anchor: [0.5, 1],
                // src: getZzIcon("在线", "N"),
                src: require("@/assets/map/山塘-正常.png"),
              },
            },
          },
        };
      });
    } else {
      this.$message.error("获取失败");
    }
    this.markers = this.markers.concat(this.bjPoint);
    this.setMarkers(this.markers);
  }

  // 闸站
  // async getZzPoint() {
  //   let zzDwdata = [
  //     {
  //       id: "5",
  //       name: "泵机",
  //       lon: 118.93951211232,
  //       lat: 32.32,
  //       coords: [118.93951211208, 32],
  //       info: "我是泵机",
  //       style: {
  //         image: {
  //           icon: {
  //             scale: 0.5,
  //             anchor: [0.5, 1],
  //             src: require("@/assets/map/闸站-正常.png"),
  //           },
  //         },
  //       },
  //     },
  //   ];
  //   this.markers = this.markers.concat(zzDwdata);
  //   this.setMarkers(this.markers);
  // }

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
          lon: e.lon,
          lat: e.lat,
          // coords: [e.lon, e.lat],
          // coords: [parseFloat(e.lon), parseFloat(e.lat)],
          coords: [Number(e.lon), Number(e.lat)],
          key: "qxkz",
          style: {
            image: {
              icon: {
                scale: 0.5,
                anchor: [0.5, 1],
                src: require("@/assets/map/窨井-正常.png"),
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
          id: e.uuid,
          name: e.name,
          lon: e.lon,
          lat: e.lat,
          // coords: [parseFloat(e.lon), parseFloat(e.lat)],
          coords: [Number(e.lon), Number(e.lat)],
          key: "yld",
          style: {
            image: {
              icon: {
                scale: 1,
                anchor: [0.5, 1],
                src: require("@/assets/map/积水点-警戒.png"),
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
    // let yldDwdata = [
    //   {
    //     id: "7",
    //     name: "泵机",
    //     lon: 118.93951211232,
    //     lat: 32.32,
    //     coords: [118.5539512112, 31.44],
    //     info: "易捞点",
    //     style: {
    //       image: {
    //         icon: {
    //           scale: 0.5,
    //           anchor: [0.5, 1],
    //           src: require("@/assets/map/积水点-警戒.png"),
    //         },
    //       },
    //     },
    //   },
    // ];
    // this.markers = this.markers.concat(yldDwdata);
    // this.setMarkers(this.markers);
  }

  /************************* */

  // tab切换
  value: any = ""; //父组件给子组件传值 (河道)
  zbzValue: any = "";
  tabName: any = 0;
  getTab(name: any) {
    this.tabName = name;
    this.rightshow = false;
    this.value = name;
    this.zbzValue = name;
  }

  rightRow: any = {}; // 控制右侧详情对象

  rightshow: boolean = false; //控制右侧显隐

  getRightshow() {
    //右侧叉号
    this.rightshow = false;
  }
  // 子页面点击给父页面传值
  getRow(row: any) {
    this.rightRow = row;
    if (row.key == "QXDW" || row.key == "YLD") {
      this.rightshow = false;
    } else {
      this.rightshow = true;
    }
    this.$emit("rowEvent", row, this.tabName);
    this.$emit("toggle", false);
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
  .img-view {
    position: relative;
    padding: 0 10px;
    height: 280px;
    overflow: auto;
    .check-item {
      width: 100%;
      background: #f8f9fc;
      border: none;
      box-shadow: 2px 0px 10px 0px rgba(0, 0, 0, 0.12);
      border-radius: 3px;
      padding: 5px 5px;
      margin-top: 10px;
      #{$deep}.boxStyle {
        .el-checkbox__input.is-checked .el-checkbox__inner,
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
          border-color: #a6a6a7;
          background-color: #1fbe07;
          border-radius: 3px;
        }
      }

      .ft-weight {
        font-weight: 600 !important;
      }
      #{$deep}.suc-checkbox .ivu-checkbox-wrapper {
        font-size: 13px;
      }
      #{$deep}.ivu-checkbox + span {
        display: none;
      }
      .main-checkbox {
        margin: 12px 0px 12px 24px;
      }
      .bottom-checkbox {
        margin-top: 5px;
      }
    }
    .icon-xuanzhong::before {
      color: #3a7bef;
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
  }
  // #{$deep}.el-checkbox__input.is-checked .el-checkbox__inner,
  // .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  //   background-color: gray;
  //   border-color: gray;
  // }
  // .el-checkbox__input.is-checked + .el-checkbox__label {
  //   color: gray;
  // }
  // .el-checkbox.is-bordered.is-checked {
  //   border-color: gray;
  // }
  // .el-checkbox__input.is-focus .el-checkbox__inner {
  //   border-color: gray;
  // }
}
</style>
