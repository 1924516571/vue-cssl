<template>
  <div class="overview-view">
    <div class="item-view left">
      <panel-view heading="预警信息">
        <template>
          <div>
          <!-- <span>2022年2月14日8时</span><span>~</span><span>2022年2月15日8时</span> -->
          </div>
        </template>
        <template>
          <div class="img-view">
            <span>预测河道水位超标：</span>
            <span>0处</span>
          </div>
        </template>
        <div class="tab-btns">
          <div class="enterprise-view">
            <table-page
              :tableData="tableData"
              :columns="enterpriseColumns"
              :customHeight="tableHeight"
              :pageParams="pageParams"
              @row-click="rowClick"
              @get-page="getPage"
              @get-size="getSize"
            ></table-page>
          </div>
        </div>
      </panel-view>
    </div>

    <transition name="slide-fade" v-if="rightshow">
      <div class="item-view right">
        <div class="close-btn bg-shadow" @click="getRightshow">
          <span>×</span>
        </div>
        <yj-table-detail :row="rightRow"></yj-table-detail>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { PanelView, TablePage } from "@/components";
import YjTableDetail from "./YjTableDetail.vue";
import { publicApi } from "@/api";

@Component({
  components: {
    PanelView,
    TablePage,
    YjTableDetail,
  },
})
export default class OverviewPanel extends Vue {
  tableData: any = [];
  enterpriseColumns: any[] = [
    {
      title: "序号",
      type: "index",
    },
    {
      title: "河道名称",
      key: "XZQY",
      width: 120,
    },
    {
      title: "实时水位(m)",
      key: "QYMC",
      width: 120,
    },
    {
      title: "预测水位(m)",
      key: "LXR",
      width: 120,
    },
    {
      title: "警戒水位(m)",
      key: "LXDH",
      width: 120,
    },
    {
      title: "更新时间",
      key: "LXDH",
      width: 120,
    },
  ];
  pageParams: any = {
    current: 1,
    total: 0,
    pageSize: 30,
  };
  tableParams: any = {
    currentPage: 1,
    pageSize: 30,
    mc: "",
  };

  rightshow: boolean = false;
  rightRow: any = {}; //传值给右边报警详情组件

  mounted() {
    this.getYjInfo();
  }

  // 获取预警信息
  async getYjInfo() {
    let that = this;
    let url = "";
    this.tableParams.currentPage = that.pageParams.current;
    that.tableParams.pageSize = that.pageParams.pageSize;
    //    publicApi.getWithParam(url, that.tableParams).then((data: any) => {
    //   if (data) {
    //   	that.tableData = data.data;
    //   	if (that.tableData && that.tableData.length > 0) {
    //   		that.tableData.forEach((it: any) => {
    //   			it.key = "FXDW";
    //   		});
    //   	}
    //   	that.enterpriseCount[0].amount = data.totalCount;
    //   	that.pageParams.total = data.totalCount;
    //   }
    // });




    
    // that.tableData = [
    //   {
    //     ID: "297e1e8e75266e6401753f7da9e60022",
    //     QYMC: "南京东华传动轴有限公司",
    //     XZQY: "",
    //     LXR: "",
    //     LXDH: "13312341234",
    //     TYXYDM: "320001002",
    //     JD: 118.7945611,
    //     WD: 31.9537388,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f7e85880023",
    //     QYMC: "南京东陶有限公司",
    //     XZQY: "",
    //     LXR: "倪红艳",
    //     LXDH: "15905157257",
    //     TYXYDM: "",
    //     JD: 118.8004322,
    //     WD: 31.9530583,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f7f9a930024",
    //     QYMC: "南京光明乳品公司",
    //     XZQY: "",
    //     LXR: "夏顺宁",
    //     LXDH: "52774566",
    //     TYXYDM: "",
    //     JD: 118.8512033,
    //     WD: 31.7855277,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f80acd60025",
    //     QYMC: "南京克莉丝汀食品有限公司",
    //     XZQY: "",
    //     LXR: "周龙飞",
    //     LXDH: "13851976390",
    //     TYXYDM: "",
    //     JD: 118.8012871,
    //     WD: 31.9133295,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f8152e30026",
    //     QYMC: "南京南瑞继保电气有限公司",
    //     XZQY: "",
    //     LXR: "",
    //     LXDH: "",
    //     TYXYDM: "",
    //     JD: 118.8065225,
    //     WD: 31.8968529,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f81fd3c0027",
    //     QYMC: "南京卫岗乳业有限公司",
    //     XZQY: "",
    //     LXR: "",
    //     LXDH: "",
    //     TYXYDM: "",
    //     JD: 118.7870994,
    //     WD: 31.9044623,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f82c2930028",
    //     QYMC: "南京同仁医院有限公司",
    //     XZQY: "",
    //     LXR: "屠志艳",
    //     LXDH: "13951079998",
    //     TYXYDM: "",
    //     JD: 118.8220036,
    //     WD: 31.8979825,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f844b9b0029",
    //     QYMC: "南京大旺食品有限公司",
    //     XZQY: "",
    //     LXR: "",
    //     LXDH: "",
    //     TYXYDM: "",
    //     JD: 118.816737,
    //     WD: 31.772075,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f859e22002a",
    //     QYMC: "南京天邦生物科技有限公司",
    //     XZQY: "",
    //     LXR: "",
    //     LXDH: "",
    //     TYXYDM: "",
    //     JD: 118.8441267,
    //     WD: 31.900287,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f864bdb002b",
    //     QYMC: "南京奥特佳祥云冷机有限公司",
    //     XZQY: "",
    //     LXR: "冯周",
    //     LXDH: "15051891193",
    //     TYXYDM: "",
    //     JD: 118.8156181,
    //     WD: 31.8700114,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f86fe4d002c",
    //     QYMC: "南京宏宝莱食品有限公司",
    //     XZQY: "",
    //     LXR: "刘子军",
    //     LXDH: "13003403729",
    //     TYXYDM: "79374700-7",
    //     JD: 118.8325854,
    //     WD: 31.9007525,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f87c51e002d",
    //     QYMC: "南京德朔实业有限公司",
    //     XZQY: "",
    //     LXR: "张翌",
    //     LXDH: "13813841603",
    //     TYXYDM: "",
    //     JD: 118.7982645,
    //     WD: 31.8628314,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f885b6f002e",
    //     QYMC: "南京旺旺食品有限公司",
    //     XZQY: "",
    //     LXR: "周义斌",
    //     LXDH: "13952021788",
    //     TYXYDM: "",
    //     JD: 118.813807,
    //     WD: 31.9510726,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f88f48c002f",
    //     QYMC: "南京海欣丽宁长毛绒有限公司",
    //     XZQY: "",
    //     LXR: "王骏",
    //     LXDH: "13951086625",
    //     TYXYDM: "",
    //     JD: 118.8043417,
    //     WD: 31.9294419,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f8970700030",
    //     QYMC: "南京爱立信熊猫通信有限公司",
    //     XZQY: "",
    //     LXR: "",
    //     LXDH: "",
    //     TYXYDM: "",
    //     JD: 118.8207818,
    //     WD: 31.9399249,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f8acc6b0031",
    //     QYMC: "南京百事可乐饮料有限公司",
    //     XZQY: "",
    //     LXR: "刘世清",
    //     LXDH: "18915952195",
    //     TYXYDM: "",
    //     JD: 118.8209035,
    //     WD: 31.9358351,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f8b69cc0032",
    //     QYMC: "南京福旺食品有限公司",
    //     XZQY: "",
    //     LXR: "李茜",
    //     LXDH: "13952021788",
    //     TYXYDM: "",
    //     JD: 118.7981498,
    //     WD: 31.9524253,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f8c04720033",
    //     QYMC: "南京群志光电有限公司",
    //     XZQY: "",
    //     LXR: "尤为玲",
    //     LXDH: "13585193491",
    //     TYXYDM: "",
    //     JD: 118.7732971,
    //     WD: 31.9102067,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f8c94190034",
    //     QYMC: "南京腾麟食品有限公司",
    //     XZQY: "",
    //     LXR: "",
    //     LXDH: "",
    //     TYXYDM: "3201150002",
    //     JD: 118.8314547,
    //     WD: 31.8890237,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f949d0f0035",
    //     QYMC: "南京造币有限公司",
    //     XZQY: null,
    //     LXR: "李剑",
    //     LXDH: "15850624483",
    //     TYXYDM: "13559699-9",
    //     JD: null,
    //     WD: null,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f9553be0036",
    //     QYMC: "吉宝通讯(南京)有限公司",
    //     XZQY: "",
    //     LXR: "",
    //     LXDH: "",
    //     TYXYDM: "",
    //     JD: 118.8021416,
    //     WD: 31.8905131,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f960a050037",
    //     QYMC: "国网电力科学研究院",
    //     XZQY: "",
    //     LXR: "朱舒谦",
    //     LXDH: "13814096260",
    //     TYXYDM: "73315806-7",
    //     JD: 118.7731609,
    //     WD: 31.9040656,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f969b6e0038",
    //     QYMC: "太平洋畜产有限公司",
    //     XZQY: "",
    //     LXR: "",
    //     LXDH: "",
    //     TYXYDM: "",
    //     JD: 118.8077583,
    //     WD: 31.9508051,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f9738a80039",
    //     QYMC: "延锋彼欧汽车外饰系统有限公司",
    //     XZQY: "",
    //     LXR: "顾军",
    //     LXDH: "13337734378",
    //     TYXYDM: "",
    //     JD: 118.7761224,
    //     WD: 31.8871073,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f97dba2003a",
    //     QYMC: "杰希思(南京)汽车空调有限公司",
    //     XZQY: "",
    //     LXR: "",
    //     LXDH: "",
    //     TYXYDM: "",
    //     JD: 118.7992073,
    //     WD: 31.9138021,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f988aa6003b",
    //     QYMC: "水阁垃圾处理厂",
    //     XZQY: "",
    //     LXR: "姜合龙",
    //     LXDH: "13915982929",
    //     TYXYDM: "",
    //     JD: 118.75598,
    //     WD: 31.9021017,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f98fce3003c",
    //     QYMC: "溢泰(南京)环保科技有限公司",
    //     XZQY: "",
    //     LXR: "",
    //     LXDH: "",
    //     TYXYDM: "",
    //     JD: 118.7975938,
    //     WD: 31.9272518,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f99b2b0003d",
    //     QYMC: "舍弗勒（南京）有限公司",
    //     XZQY: "",
    //     LXR: "姚太兵",
    //     LXDH: "15195975016",
    //     TYXYDM: "9132011557591580XD",
    //     JD: 118.9123182,
    //     WD: 31.9543011,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f9a1f14003e",
    //     QYMC: "航天晨光股份有限公司",
    //     XZQY: "",
    //     LXR: "",
    //     LXDH: "",
    //     TYXYDM: "",
    //     JD: 118.7892221,
    //     WD: 31.8917796,
    //   },
    //   {
    //     ID: "297e1e8e75266e6401753f9ad673003f",
    //     QYMC: "英华达(南京)科技有限公司",
    //     XZQY: "",
    //     LXR: "程晨",
    //     LXDH: "18952011985",
    //     TYXYDM: "75689151-x",
    //     JD: 118.787181,
    //     WD: 31.9048297,
    //   },
    // ];
  }

  rowClick(row: any) {
    this.rightshow = true;
    this.rightRow = row;
  }
  getRightshow() {
    this.rightshow = false;
  }

  getPage(page: number) {
    this.pageParams.current = page;
    this.getYjInfo();
  }
  getSize(size: number) {
    this.pageParams.current = 1;
    this.pageParams.pageSize = size;
    this.getYjInfo();
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
.overview-view {
  width: 100%;
  height: 100%;
  position: relative;
  .item-view {
    height: 100%;
    background-color: #ffffff;
    box-shadow: 2px 0px 10px 0px rgba(0, 0, 0, 0.12);
    .img-view {
      font-size: 18px;
      height: 50px;
      margin-bottom: 10px;
      text-align: left;
      background-image: linear-gradient(269deg, #fb6a3d, #ffc144);
      color: #fff;
      width: 100%;
      padding-top: 15px;
      padding-left: 10px;
    }
    .tab-btns {
      height: 100%;
      .enterprise-view {
        width: 100%;
        height: 80%;
      }
    }
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
}
</style>
