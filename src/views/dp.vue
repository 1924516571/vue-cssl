<template>
  <div class="dp_main">
    <div class="dp_header">
      <div class="time">{{ time }} {{ day }}</div>
      常熟市防汛决策支持系统
      <div class="tz" @click="returnBack"></div>
    </div>
    <div class="dp_body">
      <div class="dp_body_left">
        <div class="dp_body_left_top">
          <div class="zdsw">
            <div>
              <span class="txt1">重点水位</span>
              <div class="biaoti flex-col"></div>
            </div>
            <!-- <div>
              <span class="gxsj">更新时间:2021-10-25&nbsp;09:20:34</span>
            </div> -->
          </div>
          <div class="table">
            <table-no :columns="columns" :tableData="tableData">
              <template v-slot:erty>
                <div>水位<span style="font-size:15px">(m)</span></div>
              </template>
              <template v-slot:sw="{ row }">
                {{ row.rZ }}
              </template>
            </table-no>
          </div>
        </div>
        <!-- <div class="dp_body_left_bom">
          <div class="zdsw">
            <div>
              <span class="txt1">防汛物资</span>
              <div class="biaoti flex-col"></div>
            </div>
            <div></div>
          </div>
          <div class="fxEcharts">
            <v-chart ref="fxwz" :options="options" :auto-resize="true" style="width: 100%; height: 100%"></v-chart>
          </div>
        </div> -->
      </div>
      <div class="dp_body_mid">
        <div class="dp_body_mid_top">
          <div>
            <p>{{ bigScreenNumObj.videoNum }}个</p>
            <p class="img1"></p>
            <p class="ms">视频监控</p>
          </div>
          <div>
            <p>{{ bigScreenNumObj.swNum }}座</p>
            <p class="img2"></p>
            <p class="ms">水位站</p>
          </div>
          <div>
            <p>{{ bigScreenNumObj.ylNum }}座</p>
            <p class="img3"></p>
            <p class="ms">雨量站</p>
          </div>
          <!-- <div>
            <p>{{ bigScreenNumObj.yldNum }}个</p>
            <p class="img4"></p>
            <p class="ms">易涝点</p>
          </div> -->
        </div>
        <!-- 水位 -->
        <div class="dp_body_mid_mid" v-if="flag == 0">
          <div :style="{ left: item.xoffset, top: item.yoffset }" v-for="(item, index) in swdw" :key="index">
            <div @click="getSwDialog(item)" @mouseenter="showMs(item.stnm)" @mouseleave="hideMs">
              <img class="flash imgSize" src="../assets/dp/danger.png" v-if="item.overWarn == true" />
              <!-- item.overWarn 判断是否是报警 -->
              <img src="../assets/dp/dtd.png" class="imgSize" v-if="item.overWarn == false" />
            </div>
            <div class="ms" v-if="tkms == item.stnm">
              <h2>{{ item.stnm }}</h2>
              <p>
                实时水位:<span>{{ item.rZ }}m</span>
              </p>
            </div>
          </div>
        </div>
        <!-- 雨量 -->
        <div class="dp_body_mid_mid" v-if="flag == 1">
          <div :style="{ left: `${item.xoffset}`, top: `${item.yoffset}` }" v-for="(item, index) in yldw" :key="index">
            <img src="../assets/dp/dtd.png" class="imgSize" @click="getYlDialog(item)" @mouseenter="showMs(item.stnm)" @mouseleave="hideMs" />
            <div class="ms" v-if="tkms == item.stnm">
              <h2>{{ item.stnm }}</h2>
              <p>
                累计雨量:<span>{{ item.ssData }}mm</span>
              </p>
            </div>
          </div>
        </div>
        <div class="dp_body_mid_mid" v-if="flag == 2">
          <div :style="{ left: `${item.xoffset}`, top: `${item.yoffset}` }" v-for="(item, index) in videoPointArray" :key="index">
            <img src="../assets/dp/dtd.png" class="imgSize" @click="getSpDialog(item)" @mouseenter="showMs(item.spdmc)" @mouseleave="hideMs" />
            <div class="ms" v-if="tkms == item.spdmc">
              <h2>{{ item.spdmc }}</h2>
            </div>
          </div>
        </div>
        <div class="dp_body_mid_bom">
          <div @click="changeFlag(0)" :class="flag == 0 ? 'bg xzh' : 'bg xzq'">
            <p class="tp dw1"></p>
            <p class="ms">水位</p>
          </div>
          <div @click="changeFlag(1)" :class="flag == 1 ? 'bg xzh' : 'bg xzq'">
            <p class="tp dw2"></p>
            <p class="ms">雨量</p>
          </div>
          <div @click="changeFlag(2)" :class="flag == 2 ? 'bg xzh' : 'bg xzq'">
            <p class="tp dw3"></p>
            <p class="ms">视频</p>
          </div>
          <!-- <div class="bg">
            <p class="tp dw3"></p>
            <p class="ms">水位站</p>
          </div> -->
        </div>
      </div>
      <div class="dp_body_left">
        <div class="dp_body_left_top">
          <div class="zdsw">
            <div>
              <span class="txt1">监测雨量</span>
              <div class="biaoti flex-col"></div>
            </div>
            <!-- <div>
              <span class="gxsj">更新时间:2021-10-25&nbsp;09:20:34</span>
            </div> -->
          </div>
          <div class="table">
            <table-no :columns="columns1" :tableData="tableData1">
              <template v-slot:erty>
                <div>雨量<span style="font-size:15px">(mm)</span></div>
              </template>
              <template v-slot:yl="{ row }">
                <div>
                  {{ row.ssData }}
                </div>
              </template>
            </table-no>
          </div>
        </div>
        <!-- <div class="dp_body_left_bom">
          <div class="zdsw">
            <div>
              <span class="txt1">防汛力量</span>
              <div class="biaoti flex-col"></div>
            </div>
            <div></div>
          </div>
          <div class="fxEcharts">
            <v-chart ref="fxll" :options="options1" :auto-resize="true" style="width: 100%; height: 100%;"></v-chart>
          </div>
        </div> -->
      </div>
    </div>

    <!-- 水位弹框 -->
    <dp-sw-modal :stcdId="stcd" :model="model" :title="modalTitle" @toggle="toggle"></dp-sw-modal>
    <!-- 雨量弹框 -->
    <dp-yl-modal :ylstcdId="ylstcd" :model="ylmodel" :title="ylmodalTitle" @toggle="toggle"> </dp-yl-modal>
    <!-- 视频弹框 -->
    <dp-sp-modal ref="aa" :model="spmodel" :title="spmodalTitle" @toggle="toggle"> </dp-sp-modal>
  </div>
</template>

<script lang="ts">
import qs from "qs";
import { Vue, Component } from "vue-property-decorator";
import { FormItem, Icon, Form, Input, Button, Switch, Message } from "iview";
import Axios from "axios";
import store from "@/stores";
import { TableNo } from "@/components";
import { publicApi } from "@/api";
import { DpSwModal, DpYlModal, DpSpModal } from "../views/homePage/pages/overviewPage";
import { get } from "lodash";
import { getServerTime } from "../utils/getTime";
@Component({
  components: {
    FormItem,
    Icon,
    Form,
    Input,
    Button,
    TableNo,
    DpSwModal,
    DpYlModal,
    DpSpModal,
  },
})
export default class dp extends Vue {
  src: any = require("@/assets/8069.mp3");
  //水位
  swdw: any = [];
  model: boolean = false;
  modalTitle: any = "";
  stcd: any = "";
  ylmodel: boolean = false;
  ylstcd: any = "";
  ylmodalTitle: any = "";
  spmodel: boolean = false;
  spmodalTitle: any = "";
  //  雨量
  yldw: any = [
    // {
    //   stnm: "海虞镇",
    //   rZ: "77",
    //   overWarn: true,
    //   xoffset: "50%",
    //   yoffset: "5%",
    // },
    // {
    //   stnm: "梅李镇",
    //   rZ: "77",
    //   overWarn: true,
    //   xoffset: "60%",
    //   yoffset: "15%",
    // },
    // {
    //   stnm: "碧溪街道",
    //   rZ: "77",
    //   overWarn: true,
    //   xoffset: "70%",
    //   yoffset: "0%",
    // },
    // {
    //   stnm: "董浜镇",
    //   rZ: "77",
    //   overWarn: true,
    //   xoffset: "87%",
    //   yoffset: "18%",
    // },
    // {
    //   stnm: "支塘镇",
    //   rZ: "77",
    //   overWarn: true,
    //   xoffset: "82%",
    //   yoffset: "37%",
    // },
    // {
    //   stnm: "沙家浜镇",
    //   rZ: "77",
    //   overWarn: true,
    //   xoffset: "57%",
    //   yoffset: "42%",
    // },
    // {
    //   stnm: "辛庄镇",
    //   rZ: "77",
    //   overWarn: true,
    //   xoffset: "31%",
    //   yoffset: "43%",
    // },
    // {
    //   stnm: "莫城街道",
    //   rZ: "77",
    //   overWarn: true,
    //   xoffset: "28%",
    //   yoffset: "33%",
    // },
    // {
    //   stnm: "常熟站",
    //   rZ: "77",
    //   overWarn: true,
    //   xoffset: "38%",
    //   yoffset: "13%",
    // },
    // {
    //   stnm: "尚湖镇",
    //   rZ: "77",
    //   overWarn: true,
    //   xoffset: "16%",
    //   yoffset: "20%",
    // },
  ];
  seri: any = [];
  tkms: any = "";
  dangerShow: any = true;
  tableData: any = [];
  flag: any = 0;
  tableData1: any = [];
  time: any = "";
  day: any = "";
  t: any = "";
  // test:any = "水位"+‘’

  // 大屏数量
  bigScreenNumObj: any = {
    // stationNum: "",
    // difangNum: "",
    // riverNum: "",
    // offLineStationNum: "",
  };

  columns: any[] = [
    // {
    //   type: "index",
    //   title: "序号",
    //   width: "60",
    // },
    {
      title: "站点名称",
      key: "stnm",
      width: "200",
    },
    {
      slot: "sw",
      width: "100",
      heading: "erty",
    },
    {
      title: "更新时间",
      key: "tm",
      width: "150",
    },
  ];

  columns1: any[] = [
    // {
    //   type: "index",
    //   title: "序号",
    //   width: "60",
    // },
    {
      title: "雨量站点",
      key: "stnm",
      width: "200",
    },
    {
      heading: "erty",
      slot: "yl",
      width: "100",
    },
    {
      title: "更新时间",
      key: "bgfrym",
      width: "150",
    },
  ];

  options: any = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
      confine: true,
      transitionDuration: 0, //解决鼠标悬浮Echarts浏览器页面抖动！！！
    },
    // legend: {
    //   // type: "scroll",
    //   // orient: "vertical",
    //   right:0,
    //   top: 0,
    //   data: ["rose 1", "rose 2", "rose 3"],
    //   textStyle: {
    //     color: "#fff",
    //   },
    //   icon:"roundRect"
    // },
    series: [
      {
        name: "防汛物资",
        type: "pie",
        radius: ["30%", "80%"],
        top: 5,
        center: ["50%", "50%"],
        roseType: "radius",
        itemStyle: {
          color: "#0733F1",
          normal: {
            // color: function(params: any) {
            //   let a = ["#3D7FFF", "#FFB77E", "#98CFFF", "#FC7193", "#8277E9"];
            //   return a[params.dataIndex];
            // },
            label: {
              show: true,
              position: "outside",
              lineHeight: 30,
              formatter: function(params: any) {
                if (params.name !== "") {
                  return "{title|" + params.name + "}{value| " + +params.value + "}" + "{w|" + "万}";
                } else {
                  return "";
                }
              },
              textStyle: {
                rich: {
                  title: {
                    // fontSize: 12,
                    color: "#fff",
                  },
                  value: {
                    // fontSize: 12,
                    fontFamily: "Bebas",
                    color: "#FFFFFF",
                  },
                  w: {
                    color: "#fff",
                  },
                },
              },
            },
            labelLine: {
              length: 10,
              length2: 10,
              show: true,
              color: "#00ffff",
            },
          },
        },
        data: [
          // { value: 40, name: "rose 1" },
          // { value: 33, name: "rose 2" },
          // { value: 28, name: "rose 3" },
          // { value: 22, name: "rose 4" },
          // { value: 20, name: "rose 5" },
          // { value: 15, name: "rose 6" },
          // { value: 12, name: "rose 7" },
          // { value: 10, name: "rose 8" },
        ],
      },
    ],
  };
  // color: any[] = ["#CC66FF", "#5397ff", "#58dde0", "#feb543","#33FF00","#FF33FF","#FF6600","#339966"];
  options1: any = {
    // color: this.color,
    textStyle: {
      fontSize: window.window.screen.width * 0.006,
      // color: "#40E7F4 ",
      color: "#fff",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
      transitionDuration: 0,
    },
    // legend: {
    //  //orient: "vertical",
    //  x: "0%",
    //  //y: "25%",
    //  //y: "5%",
    //  itemWidth: 22,
    //  itemHeight: 22,
    //  align: "left",
    //  textStyle: {
    //   color: "#fff"
    //  }
    // },
    series: this.seri,
  };

  returnBack() {
    this.$router.push("main/homePage/overView");
  }
  showMs(a: any) {
    this.tkms = a;
  }
  hideMs() {
    this.tkms = "";
  }
  // 点击事件
  changeFlag(a: any) {
    this.flag = a;
  }
  resizeTheChart() {
    if (this.$refs.fxwz) {
      (this.$refs.fxwz as any).resize();
    }
    if (this.$refs.fxll) {
      (this.$refs.fxll as any).resize();
    }
  }

  Swtimer: any = null;
  Yltimer: any = null;
  mounted() {
    // getServerTime(); //获取网络时间
    this.getBigScreenNum(); //大屏上泵站、堤防、离线泵站、河道、数量
    setInterval(() => {
      setTimeout(this.getSwData, 0);
      setTimeout(this.getYlData, 0);
    }, 1000 * 60 * 5);
    this.getSwData(); //水位数据
    this.getYlData(); //雨量数据
    this.getVideoPoint(); //视频点位
    // this.getFxwzData(); //防汛物资
    // this.getFxll(); // 防汛力量
  }

  created() {
    this.getTime(); // 获取时间
  }
  videoPointArray: any = []; //视频点位数据
  async getVideoPoint() {
    const url = "wjServer/dataCenter/device/image/bigVideoList";
    const data = await publicApi.getWithParam(url, { splb: "" });
    if (data.result) {
      this.videoPointArray = data.data;
    } else {
      this.$SucMessage.error("哇!获取视频列表失败哦！");
    }

    // this.videoPointArray = [
    //   {
    //     name: "老福山闸下游",
    //     id: "1ad181945e3b4d319532b1d6f81e3c11",
    //     xoffset: "57%",
    //     yoffset: "-8%",
    //   },
    //   {
    //     name: "北福山塘-肖家桥南侧",
    //     id: "1ad181945e3b4d319532b1d6f81e3c11",
    //     xoffset: "42%",
    //     yoffset: "0%",
    //   },
    //   {
    //     name: "耿泾闸外",
    //     id: "1ad181945e3b4d319532b1d6f81e3c11",
    //     xoffset: "54%",
    //     yoffset: "1%",
    //   },
    //   {
    //     name: "金泾闸门",
    //     id: "1ad181945e3b4d319532b1d6f81e3c11",
    //     xoffset: "85%",
    //     yoffset: "5%",
    //   },
    //   {
    //     name: "迈步塘闸",
    //     id: "1ad181945e3b4d319532b1d6f81e3c11",
    //     xoffset: "58%",
    //     yoffset: "13%",
    //   },
    //   {
    //     name: "盐铁塘-常浒河交汇处",
    //     id: "1ad181945e3b4d319532b1d6f81e3c11",
    //     xoffset: "69%",
    //     yoffset: "9%",
    //   },
    //   {
    //     name: "白茆塘-盐铁塘交汇处",
    //     id: "1ad181945e3b4d319532b1d6f81e3c11",
    //     xoffset: "78%",
    //     yoffset: "22%",
    //   },
    //   /***************************************** */
    //   {
    //     name: "望虞河海事所",
    //     id: "1ad181945e3b4d319532b1d6f81e3c11",
    //     xoffset: "28%",
    //     yoffset: "10%",
    //   },
    //   {
    //     name: "白龙江联丰南路",
    //     id: "1ad181945e3b4d319532b1d6f81e3c11",
    //     xoffset: "45%",
    //     yoffset: "3%",
    //   },
    //   {
    //     name: "山前塘枢纽",
    //     id: "1ad181945e3b4d319532b1d6f81e3c11",
    //     xoffset: "32%",
    //     yoffset: "15%",
    //   },
    //   {
    //     name: "梅园山庄一期石屋闸",
    //     id: "1ad181945e3b4d319532b1d6f81e3c11",
    //     xoffset: "40%",
    //     yoffset: "11%",
    //   },
    //   {
    //     name: "通河桥弄",
    //     id: "1ad181945e3b4d319532b1d6f81e3c11",
    //     xoffset: "47%",
    //     yoffset: "18%",
    //   },
    //   {
    //     name: "学文东路东端停车场",
    //     id: "1ad181945e3b4d319532b1d6f81e3c11",
    //     xoffset: "55%",
    //     yoffset: "8%",
    //   },
    //   {
    //     name: "常浒河枢纽",
    //     id: "1ad181945e3b4d319532b1d6f81e3c11",
    //     xoffset: "60%",
    //     yoffset: "14%",
    //   },
    //   {
    //     name: "青墩塘枢纽",
    //     id: "1ad181945e3b4d319532b1d6f81e3c11",
    //     xoffset: "63%",
    //     yoffset: "23%",
    //   },
    //   {
    //     name: "白茆塘枢纽",
    //     id: "1ad181945e3b4d319532b1d6f81e3c11",
    //     xoffset: "56%",
    //     yoffset: "33%",
    //   },
    //   // -------------------------------------------------------
    //   {
    //     name: "锡北运河王庄集镇",
    //     id: "1ad181945e3b4d319532b1d6f81e3c11",
    //     xoffset: "13%",
    //     yoffset: "10%",
    //   },
    //   {
    //     name: "望虞河管理所",
    //     id: "1ad181945e3b4d319532b1d6f81e3c11",
    //     xoffset: "18%",
    //     yoffset: "28%",
    //   },
    //   {
    //     name: "张家港大义集镇老桥处",
    //     id: "1ad181945e3b4d319532b1d6f81e3c11",
    //     xoffset: "33%",
    //     yoffset: "3%",
    //   },
    //   {
    //     name: "兴福寺破龙涧",
    //     id: "1ad181945e3b4d319532b1d6f81e3c11",
    //     xoffset: "42%",
    //     yoffset: "17%",
    //   },
    //   {
    //     name: "海洋泾枢纽上游",
    //     id: "1ad181945e3b4d319532b1d6f81e3c11",
    //     xoffset: "67%",
    //     yoffset: "13%",
    //   },
    //   {
    //     name: "浒浦节制闸",
    //     id: "1ad181945e3b4d319532b1d6f81e3c11",
    //     xoffset: "75%",
    //     yoffset: "8%",
    //   },
    //   {
    //     name: "白茆塘闸下游",
    //     id: "1ad181945e3b4d319532b1d6f81e3c11",
    //     xoffset: "88%",
    //     yoffset: "10%",
    //   },
    //   {
    //     name: "元和塘-界泾桥南侧",
    //     id: "1ad181945e3b4d319532b1d6f81e3c11",
    //     xoffset: "15%",
    //     yoffset: "51%",
    //   },
    // ];
  }
  async getBigScreenNum() {
    let url = "wjServer/fangxunjc/zhabengzhanyx/getBigScreenNum";
    let data = await publicApi.getNoParam(url);
    if (data.result) {
      this.bigScreenNumObj = data.data;
    } else {
      this.$Message.error("获取大屏数量数据失败");
    }
  }
  //  获取时间
  getTime() {
    var that = this;
    that.t = setInterval(function() {
      let day = new Date().getDay();
      that.time = that.$utils.dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss"); //时间
      var arr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      that.day = arr[day];
    }, 1000);
  }
  async getSwData() {
    let swParams = {
      pageNumber: "1",
      pageSize: "1000",
    };
    let url = "wjServer/fangxunjc/z/dtHome";
    let data = await publicApi.getWithParam(url, swParams);
    if (data.result) {
      let newTable = data.data.rows;
      this.swdw = newTable; //地图水位站点
      this.getNewTable(newTable);
    }
  }

  getNewTable(paramArray: any) {
    if (paramArray.length != 0) {
      paramArray.forEach((item: any) => {
        let newString = item.tm.slice(5);
        item.tm = newString.substring(0, 11);
      });
      this.getNewTableData(paramArray);
    }
  }
  itemObj: any = {};
  getNewTableData(paramArray: any) {
    for (let i = 0; i < paramArray.length; i++) {
      if (paramArray[i].stnm == "小东门站") {
        this.itemObj = paramArray[i];
        paramArray.splice(i, 1);
        break;
      }
    }
    paramArray.unshift(this.itemObj);
    this.tableData = paramArray;
  }
  // 雨量站数据
  async getYlData() {
    let ylParams = {
      condition: "ylz1,ylz2,ylz3,ylz4",
    };
    let url = "wjServer/wj/gis/bigP";
    let data = await publicApi.getWithParam(url, ylParams);
    if (data.result) {
      let newTable = data.data;
      let b = JSON.parse(JSON.stringify(newTable));
      this.yldw = b;
      this.getNewYlTable(newTable);
    }
  }
  getNewYlTable(ylParamsArray: any) {
    if (ylParamsArray.length != 0) {
      ylParamsArray.forEach((item: any) => {
        // item.bgfrym = item.bgfrym.slice(5);
        var newString = item.bgfrym.slice(5);
        item.bgfrym = newString.substring(0, 11);
      });
      this.tableData1 = ylParamsArray;
    }
  }
  async getFxwzData() {
    let url = "wjServer/dataCeter/wareHouse/ckStatistics";
    let data = await publicApi.getNoParam(url);
    if (data.result) {
      this.options.series[0].data = data.data.map((e: any) => {
        return {
          name: e.ckmc,
          value: e.wzTypeNum,
        };
      });
    }
  }
  //水位弹框
  getSwDialog(item: any) {
    this.stcd = item.stcd;
    this.model = true;
    this.modalTitle = item.stnm;
  }
  //  雨量弹框
  getYlDialog(item: any) {
    this.ylstcd = item.stcd;
    this.ylmodel = true;
    this.ylmodalTitle = item.stnm;
  }

  // 视频弹框
  getSpDialog(item: any) {
    (this.$refs.aa as any).getPlayUrl(item.zdbh);
    this.spmodel = true;
    this.spmodalTitle = item.spdmc;
  }
  toggle(val: boolean) {
    this.model = val;
    this.ylmodel = val;
    this.spmodel = val;
  }

  // 防汛力量
  // async getFxll() {
  //   let url = "wjServer/dataCenter/fxdw/getScreenFangXun";
  //   let data = await publicApi.getNoParam(url);
  //   if (data.result) {
  //     // var list = data.data;
  //     // console.log(list,"888");

  //     var list = [
  //         {
  //           name: "尚湖镇",
  //           value: "15",
  //         },
  //         {
  //           name: "琴川街道",
  //           value: "15",
  //         },
  //         {
  //           name: "虞山街道",
  //           value: "15",
  //         },
  //         {
  //           name: "碧溪街道",
  //           value: "88",
  //         },
  //          {
  //           name: "碧溪街道",
  //           value: "34",
  //         },
  //           {
  //           name: "碧溪街道",
  //           value: "99",
  //         },
  //          {
  //           name: "虞山街道",
  //           value: "35",
  //         },
  //         {
  //           name: "碧溪街道",
  //           value: "88",
  //         },
  //          {
  //           name: "碧溪街道",
  //           value: "34",
  //         },
  //           {
  //           name: "碧溪街道",
  //           value: "99",
  //         },
  //          {
  //           name: "碧溪街道",
  //           value: "99",
  //         },
  //          {
  //           name: "碧溪街道",
  //           value: "99",
  //         },
  //          {
  //           name: "碧溪街道",
  //           value: "99",
  //         },
  //          {
  //           name: "碧溪街道",
  //           value: "99",
  //         },
  //     ];
  //     list.forEach((item: any, index: any) => {
  //       var sum: any = 0;
  //       list.forEach((item: any, index: any) => {
  //         sum += Number(item.value);
  //       });
  //       var sum2: any = 0;
  //       if (index === 0) {
  //         sum2 = 0;
  //       } else {
  //         list.forEach((item: any, i: any) => {
  //           if (i >= index) return;
  //           sum2 += Number(item.value);
  //         });
  //       }
  //       this.seri.push({
  //         name: item.name,
  //         type: "pie",
  //         minAngle:5,
  //         radius: [(index + 1) * 11 + "%", (index + 1) * 11 + 5.5 + "%"],
  //         label: false,
  //         // startAngle: 24,
  //         center: ["42%", "50%"],
  //         // minShowLabelAngle: 20,
  //         avoidLabelOverlap: true,
  //         startAngle: (sum2 / sum) * 420,
  //         clockWise: false, //顺时加载
  //         hoverAnimation: true,
  //         hoverOffset: 3,
  //         itemStyle: {
  //           normal: {
  //             label: {
  //               show: true,
  //               color: "#65D5FF",
  //               fontSize: 12,
  //             },
  //             labelLine: {
  //               // smooth: 0.2,
  //               length: 50,
  //               length2: 10,
  //             },
  //           },
  //         },
  //         data: [
  //           {
  //             value: item.value,
  //             name: item.name,
  //             itemStyle: {
  //               color: "#0DDCFB",
  //               shadowColor: "rgba(0, 224, 255, 0.4)",
  //               shadowBlur: 12,
  //             },
  //             label: {
  //               show: true,
  //               color: "#65D5FF",
  //               fontSize: 12,
  //               lineHeight: 50,
  //               // formatter: ["{b| {b} }", "{c| {c}}", "{d| 万人}"].join(" "),
  //               formatter: ["{b| {b} }", "{c| {c}}", "{d| 人}"].join(" "),
  //               rich: {
  //                 d: {
  //                   fontSize: 12,
  //                   color: "#fff",
  //                   lineHeight: 30,
  //                 },
  //                 b: {
  //                   padding: [0, -10, 0, 0],
  //                   fontSize: 12,
  //                   color: "#fff",
  //                   lineHeight: 12,
  //                 },
  //                 c: {
  //                   padding: [0, -8, 0, 0],
  //                 },
  //               },
  //             },
  //             labelLine: {
  //               show: true,
  //               length: 50,
  //               length2: 10,
  //             },
  //             radius: ["20%", "40%"],
  //           },
  //           {
  //             value: sum,
  //             hoverAnimation: false, //鼠标移入变大
  //             legendHoverLink: false,
  //             labelLine: {
  //               show: false,
  //             },
  //             label: {
  //               show: false,
  //             },
  //             tooltip: {
  //               show: false,
  //             },

  //             itemStyle: {
  //               normal: {
  //                 color: "rgba(0, 151, 251, 0.19)",
  //                 shadowColor: "rgba(0, 224, 255, 0.4)",
  //                 shadowBlur: 24,
  //                 label: {
  //                   show: false,
  //                 },
  //                 labelLine: {
  //                   show: false,
  //                   color: "rgba(0,0,0,0)",
  //                 },
  //               },
  //               emphasis: {
  //                 color: "rgba(0, 151, 251, 0.09)",
  //               },
  //             },
  //           },
  //         ],
  //       });
  //     });
  //   } else {
  //     this.$Message.error("获取数据失败");
  //   }
  // }

  async getFxll() {
    var that = this;
    let url = "wjServer/dataCenter/fxdw/getScreenFangXun";
    let data = await publicApi.getNoParam(url);
    if (data.result) {
      var list = [data.data];
      list.map(function(data: any, idx: any) {
        that.seri.push({
          type: "pie",
          name: "防汛力量",
          redius: window.window.screen.width > 1300 ? "80%" : "50%",
          height: "100%",
          width: "100%",
          top: 5,
          right: 10,
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 1,
            normal: {
              label: {
                show: true,
                position: "outside",
                lineHeight: 30,
                formatter: function(params: any) {
                  if (params.name != "") {
                    return "{name|" + params.name + " " + "}{value|" + params.value + "人" + "}";
                  } else {
                    return " ";
                  }
                },
                textStyle: {
                  rich: {
                    name: {
                      fontSize: 16,
                      // color: "#fff",
                    },
                    value: {
                      fontSize: 16,
                      // color: "#fff",
                    },
                  },
                },
              },
            },
          },
          // label: {
          //   alignTo: "edge",
          //   formatter: "{name|{b}}\n{time|{c}人}",
          //   minMargin: 5,
          //   edgeDistance: 20,
          //   lineHeight: 20,
          //   rich: {
          //     time: {
          //       fontSize: 12,
          //       color: "#fff",
          //     },
          //   },
          //   // normal: {
          //   //   show: true,
          //   //   position: "outside",
          //   // },
          // },
          labelLine: {
            length: 15,
            length2: 0,
            show: true,
            maxSurfaceAngle: 80,
          },
          //   labelLayout: function (params:any) {
          //   const isLeft = params.labelRect.x < myChart.getWidth() / 2;
          //   const points = params.labelLinePoints;
          //   // Update the end point.
          //   points[2][0] = isLeft
          //     ? params.labelRect.x
          //     : params.labelRect.x + params.labelRect.width;
          //   return {
          //     labelLinePoints: points
          //   };
          // },
          data: data,
        });
      });
    }
  }

  beforeDestroy() {
    clearInterval(this.Swtimer);
    clearInterval(this.Yltimer);
    this.Yltimer = null;
    this.Swtimer = null;
    // window.removeEventListener("resize", this.resizeTheChart);
  }
  // 清除定时器
  destroyed() {
    clearInterval(this.t);
  }
}
</script>

<style lang="scss" scoped>
$deep: "::v-deep";
.dp_main {
  width: 100%;
  height: 100%;
  background: url("../assets/dp/bg.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  .dp_header {
    text-align: center;
    font-size: 42px;
    color: #19ecff;
    height: 96px;
    line-height: 96px;
    background: url("../assets/dp/top.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    .time {
      position: absolute;
      top: 8px;
      left: 22px;
      font-size: 22px;
      color: #fff;
      width: 330px;
      height: 17.6px;
      line-height: 17.6px;
    }
    .tz {
      position: absolute;
      top: 66px;
      right: 60px;
      width: 125px;
      height: 40px;
      background: url("../assets/dp/fxjc.png") no-repeat;
      background-size: cover;
      cursor: pointer;
    }
  }
  .dp_body {
    height: calc(100% - 96px);
    // padding: 40px;
    padding: 20px;
    display: flex;

    .dp_body_left {
      // width: 27;
      height: 100%;
      position: relative;
      .zdsw {
        width: 100%;
        height: 33px;
        display: flex;
        justify-content: space-between;
        span {
          width: 138px;
          height: 18px;
          color: rgba(255, 255, 255, 1);
          font-size: 28px;
          font-family: SourceHanSansCN-Bold;
          line-height: 18px;
          display: block;
        }
        .biaoti {
          width: 52px;
          height: 5px;
          background: url("../assets/dp/biaoti .png") 0px 0px no-repeat;
          margin-top: 10px;
        }
        .gxsj {
          width: 169px;
          height: 18px;
          margin-top: 18px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 12px;
          font-family: SourceHanSansCN-Light;
          white-space: nowrap;
        }
      }
      .dp_body_left_top {
        width: 100%;
        height: 70%;
        padding-top: 10%;
        .table {
          padding-top: 50px;
          overflow: auto;
          // height: calc(100% - 50px);
          height: 100%;
          ::v-deep.el-table {
            .cell {
              line-height: 45px;
            }
          }
          // 表头
          ::v-deep.el-table__header-wrapper {
            font-size: 22px;
          }
          // 表身
          ::v-deep.el-table__body-wrapper {
            font-size: 20px;
          }
          ::v-deep.el-table--scrollable-x .el-table__body-wrapper {
            overflow: hidden !important;
          }
          ::v-deep.el-table--scrollable-y .el-table__body-wrapper {
            overflow: auto !important;
          }
          ::v-deep .el-table,
          .el-table__expanded-cell {
            color: white;
            background-color: rgba(48, 232, 24, 0) !important;
          }
          ::v-deep .el-table tr,
          ::v-deep .el-table td {
            background-color: rgba(163, 128, 128, 0) !important;
          }

          ::v-deep .el-table th,
          ::v-deep .el-table tr:nth-child(2n) {
            color: white;
            background-color: rgba(52, 121, 235, 0.2) !important;
          }
          ::v-deep.el-table__body-wrapper::-webkit-scrollbar-thumb {
            background-color: rgb(41, 26, 26, 0.3);
            border-radius: 3px;
          }
        }
        #{$deep}.table-view {
          .el-table::before {
            height: 0;
          }
          .el-table--mini {
            font-size: 22px;
          }
        }
      }
      .dp_body_left_bom {
        width: 100%;
        height: 40%;
        padding-top: 50px;
        .fxEcharts {
          // height: 87%;
          // padding-top: 16px;
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
        }
      }
    }
    .dp_body_mid {
      width: 52%;
      height: 100%;
      // background-color: rgb(50, 112, 131);
      .dp_body_mid_top {
        height: 27%;
        // padding: 0px 160px;
        display: flex;
        justify-content: center;
        div {
          margin-right: 16%;
          p {
            width: 88px;
            text-align: center;
            height: 26px;
            font-size: 22px;
            font-family: Bebas;
            color: #66ffff;
            line-height: 26px;
            margin-bottom: 11px;
          }
          .ms {
            width: 88px;
            height: 19px;
            text-align: center;
            font-size: 22px;
            font-family: SourceHanSansCN-Medium, SourceHanSansCN;
            font-weight: 500;
            color: #ffffff;
            line-height: 17px;
          }
          .img1 {
            width: 88px;
            height: 88px;
            background: url("../assets/dp/1.png") no-repeat;
          }
          .img2 {
            width: 88px;
            height: 88px;
            background: url("../assets/dp/swz.png") no-repeat;
          }
          .img3 {
            width: 88px;
            height: 88px;
            background: url("../assets/dp/ylz.png") no-repeat;
          }
          .img4 {
            width: 88px;
            height: 88px;
            background: url("../assets/dp/yld.png") no-repeat;
          }
        }
        div:nth-last-child(1) {
          margin-right: 0;
        }
      }
      .dp_body_mid_mid {
        height: 53%;
        position: relative;
        // background-color: rgba(29, 23, 78,0.4);
        top: 30px;
        .imgSize {
          width: 40px;
          height: 40px;
        }
        div {
          position: absolute;
        }
        .ms {
          // height: 60px;
          width: 200px;
          color: white;
          background: url("../assets/dp/kk.png") no-repeat;
          background-size: cover;
          padding: 10px;
          left: 40px;
          top: 20px;
          z-index: 999;
          h2 {
            text-align: center;
          }
          p {
            text-align: center;
            // color: rgb(231, 229, 229);
            font-size: 16px;
          }
          span {
            // color: rgb(169, 165, 223);
            font-size: 14px;
            // color: #FFFFFF;
          }
        }

        @keyframes flash {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          25% {
            opacity: 0.5;
            transform: scale(0.8);
          }
          50% {
            opacity: 0;
          }
          75% {
            opacity: 0.5;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .flash {
          animation: flash 2.5s 0.5s infinite linear; //动画名称  执行时间  延迟时间  播放次数 执行方式
        }
      }
      .dp_body_mid_bom {
        height: 20%;
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex: 1;
        .bg {
          width: 150px;
          height: 150px;
          cursor: pointer;
          // background: url("../assets/dp/dwbg.png") no-repeat;
          text-align: center;
          .tp {
            width: 40px;
            height: 40px;
            margin: 55px 43px 5px 51px;
          }
          .dw1 {
            background: url("../assets/dp/dw3.png") no-repeat;
          }
          .dw2 {
            background: url("../assets/dp/dw2.png") no-repeat;
          }
          .dw3 {
            background: url("../assets/dp/video.png") no-repeat;
          }
          .ms {
            font-size: 22px;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #ffffff;
            // line-height: 18px;
            // margin: 10px 46px 0px 45px;
            margin-left: -5px;
          }
        }
        .xzq {
          background: url("../assets/dp/dwbg.png") no-repeat;
          background-size: cover;
        }
        .xzh {
          background: url("../assets/dp/gl.png") no-repeat;
          background-size: cover;
        }
      }
    }
  }
}
</style>
