<template>
  <div class="side-menu-container">
    <suc-menu :config="option" @on-select="handleSelect" ref="ceshi">
      <suc-menu-item name="overview" to="/main/homePage/overview" v-authox="'csslsy|access'">
        <span style="padding-left:12px;vertical-align: middle;"><img src="@/assets/cs/1.png" alt=""/></span>
        <span class="txt"><span>首页概览</span></span>
      </suc-menu-item>
      <suc-submenu name="1" v-authox="'csslsssj|access'">
        <template slot="title">
          <span style="vertical-align:sub;"><img src="@/assets/cs/2.png" alt="" /> </span>
          <span class="txt">实时数据</span>
        </template>
        <suc-menu-item name="sq" v-authox="'csslsqxx|access'" to="/main/homePage/sq"><span class="txt">水情信息</span></suc-menu-item>
        <suc-menu-item name="yq" v-authox="'csslyqxx|access'" to="/main/homePage/yq"><span class="txt">雨情信息</span></suc-menu-item>
       <!-- <suc-menu-item name="jyd"  to="/main/homePage/jyd"><span class="txt">积淹点信息</span></suc-menu-item> -->
      </suc-submenu>
      <suc-submenu name="2" v-authox="'csslyjyb|access'">
        <template slot="title">
          <span style="vertical-align:sub;"><img src="@/assets/cs/3.png" alt="" /> </span>
          <span class="txt">预警预报</span>
        </template>
        <suc-menu-item v-authox="'csslqxxx|access'" name="weatherInfo" to="/main/homePage/weatherInfo"><span class="txt">气象信息</span></suc-menu-item>
        <suc-menu-item v-authox="'cssltflj|access'" name="tfInfo" to="/main/homePage/tfInfo"><span class="txt">台风路径</span></suc-menu-item>
      </suc-submenu>
      <suc-submenu name="3" v-authox="'csslfxgl|access'">
        <template slot="title">
          <span style="vertical-align: text-top;"><img src="@/assets/cs/5.png" alt="" /> </span>
          <span class="txt">防汛管理</span>
        </template>
        <suc-menu-item name="dispatchCom" v-authox="'csslddzl|access'" to="/main/homePage/dispatchCom"><span class="txt">应急预案</span></suc-menu-item>
        <suc-menu-item name="zbPeople" v-authox="'csslzzry|access'" to="/main/homePage/zbPeople"><span class="txt">防汛值班</span></suc-menu-item>
        <suc-menu-item name="wzcb" v-authox="'csslwzcb|access'" to="/main/homePage/wzcb"><span class="txt">物资储备</span></suc-menu-item>
        <suc-menu-item name="alarm" v-authox="'csslbjsj|access'" to="/main/homePage/alarm"><span class="txt">报警事件</span></suc-menu-item>

        <!-- <suc-menu-item name="yjyj" to="/main/homePage/yjyj"><span class="txt">应急预警管理</span></suc-menu-item> -->
        <!-- <suc-menu-item name="danger" to="/main/floodMessage/danger"><span class="txt">灾险情管理</span></suc-menu-item> -->
        <!-- <suc-menu-item name="yjPeople" to="/main/homePage/yjPeople"><span class="txt">应急联系人</span></suc-menu-item> -->
        <!-- <suc-menu-item name="fxya" to="/main/floodMessage/fxya"><span class="txt">防汛预案</span></suc-menu-item> -->
        <!-- <suc-menu-item name="hqcl" to="/main/floodMessage/hqcl"><span class="txt">后期处理</span></suc-menu-item> -->
        <!-- <suc-menu-item name="jxdh" to="/main/floodMessage/jxdh"><span class="txt">接险电话</span></suc-menu-item> -->
        <!-- <suc-menu-item name="qxdw" to="/main/homePage/qxdw"><span class="txt">抢险队伍</span></suc-menu-item> -->
      </suc-submenu>

      <suc-submenu name="4" v-authox="'csslspjk|access'">
        <template slot="title">
          <span style="vertical-align: text-top;"><img src="@/assets/cs/4.png" alt="" /> </span>
          <span class="txt">视频监控</span>
        </template>
        <suc-menu-item name="hdVideo" v-authox="'csslgghd|access'" to="/main/homePage/hdVideo"><span class="txt">骨干河道视频</span></suc-menu-item>
        <suc-menu-item name="wyhVideo" v-authox="'csslwyh|access'" to="/main/homePage/wyhVideo"><span class="txt">望虞河视频</span></suc-menu-item>
        <suc-menu-item name="cqVideo" v-authox="'csslcqdbw|access'" to="/main/homePage/cqVideo"><span class="txt">城区大包围视频</span></suc-menu-item>

        <!-- <suc-menu-item name="cj" to="http://222.92.8.77:13000/" target="_blank"><span class="txt">长江处视频</span></suc-menu-item> -->

        <suc-menu-item name="cjcVideo" v-authox="'csslcjc|access'" to="/main/homePage/cjcVideo"><span class="txt">长江处视频</span></suc-menu-item>
        <suc-submenu name="10" v-authox="'csslyld|access'">
          <template slot="title">
            <span class="txt">易涝点视频</span>
          </template>
          <suc-menu-item name="newYld" to="/main/homePage/newYldVideo">
            <span class="txt">易涝点1</span>
          </suc-menu-item>
          <suc-menu-item name="oldYld" to="http://www.189eyes.com:8000/" target="_blank">
            <span class="txt">易涝点2</span>
          </suc-menu-item>
          <suc-menu-item name="jyd"  to="/main/homePage/jyd"><span class="txt">积淹点信息</span></suc-menu-item>
        </suc-submenu>
         <suc-menu-item name="xcljVideo" v-authox="'cssljxcljsp|access'"  to="/main/homePage/xcljVideo"><span class="txt">下穿立交视频</span></suc-menu-item>
      </suc-submenu>
      <suc-menu-item name="video" to="https://cloudmeeting.189.cn/landing.html" v-authox="'csslsphs|access'" target="_blank">
        <span style="padding-left:10px;vertical-align: middle;"><img src="@/assets/cs/首页备份 5.png" alt=""/></span>
        <span class="txt"><span>视频会商</span></span>
      </suc-menu-item>
      <suc-menu-item name="yxjg" v-authox="'csslyxjg|access'" to="/main/homePage/yxjg">
        <span style="padding-left:10px;vertical-align: middle;"><img style="width:18px;height:18px" src="@/assets/cs/数据监管.png" alt=""/></span>
        <span class="txt"><span>运行监管</span></span>
      </suc-menu-item>
      <suc-submenu name="5" v-authox="'cssljbfx|access'">
        <template slot="title">
          <span style="vertical-align: text-top;"><img src="@/assets/cs/首页备份 6.png" alt="" /> </span>
          <span class="txt">简报分析</span>
        </template>
        <suc-menu-item name="waterAnalyse" v-authox="'csslsqfx|access'" to="/main/homePage/waterAnalyse"><span class="txt">水情分析</span></suc-menu-item>
        <suc-menu-item name="rainAnalyse" v-authox="'csslyqfx|access'" to="/main/homePage/rainAnalyse"><span class="txt">雨情分析</span></suc-menu-item>
        <suc-menu-item name="moreWaterAnalyse" v-authox="'cssldzsqfx|access'" to="/main/homePage/moreWaterAnalyse"><span class="txt">多站水情分析</span></suc-menu-item>
        <suc-menu-item name="moreRainAnalyse" v-authox="'cssldzyqfx|access'" to="/main/homePage/moreRainAnalyse"><span class="txt">多站雨情分析</span></suc-menu-item>
        <!-- <suc-menu-item name="rainRelationAnalyse" to="/main/homePage/rainRelationAnalyse"><span class="txt">雨水关系分析</span></suc-menu-item> -->

        <!-- <suc-menu-item name="moreWaterDateReport" to="/main/floodMessage/moreWaterDateReport"><span class="txt">多站水情日报</span></suc-menu-item>

        <suc-menu-item name="bzRun" to="/main/floodMessage/bzRun"><span class="txt">闸泵站运行状态</span></suc-menu-item>

        <suc-menu-item name="bzRunRecord" to="/main/floodMessage/bzRunRecord"><span class="txt">闸泵站运行统计</span></suc-menu-item>

        <suc-menu-item name="zbzRecord" to="/main/floodMessage/zbzRecord"><span class="txt">闸泵站运行记录表</span></suc-menu-item>

        <suc-menu-item name="reportflood" to="/main/floodMessage/reportflood"><span class="txt">防汛运行简报</span></suc-menu-item>

        <suc-menu-item name="waterLevelTable" to="/main/floodMessage/waterLevelTable"><span class="txt">河道水位表</span></suc-menu-item>

        <suc-menu-item name="disasterCount" to="/main/floodMessage/disasterCount"><span class="txt">灾情统计汇总</span></suc-menu-item>

        <suc-menu-item name="searchCount" to="/main/floodMessage/searchCount"><span class="txt">巡查统计</span></suc-menu-item> -->
      </suc-submenu>

      <suc-submenu name="6" v-authox="'csslsjzx|access'">
        <template slot="title">
          <span style="vertical-align: text-top;"><img src="@/assets/cs/首页备份 8.png" alt="" /> </span>
          <span class="txt">数据中心</span>
        </template>
        <suc-submenu name="7">
          <template slot="title">
            <span style="vertical-align: middle;"><img src="@/assets/cs/dataCenter/资源域.png" alt="" /> </span>
            <span class="txt1">自然资源</span>
          </template>
          <suc-menu-item name="infoRiver" to="/main/homePage/infoRiver">
            <span class="txt1">河道信息</span>
          </suc-menu-item>
          <suc-menu-item name="importantRiver" to="/main/homePage/importantRiver">
            <span class="txt1">重点河道</span>
          </suc-menu-item>
          <suc-menu-item name="infoLw" to="/main/homePage/infoLw">
            <span class="txt1">联圩信息</span>
          </suc-menu-item>
          <suc-menu-item name="infoNq" to="/main/homePage/infoNq">
            <span class="txt1">农桥信息</span>
          </suc-menu-item>
        </suc-submenu>
        <suc-submenu name="8">
          <template slot="title">
            <span style="vertical-align: middle;"><img src="@/assets/cs/dataCenter/工程.png" alt="" /> </span>
            <span class="txt1">工程设施</span>
          </template>
          <suc-menu-item name="infoWater" to="/main/homePage/infoWater">
            <span class="txt1">水闸信息</span>
          </suc-menu-item>
          <suc-menu-item name="infoBz" to="/main/homePage/infoBz">
            <span class="txt1">泵站信息</span>
          </suc-menu-item>
        </suc-submenu>
        <suc-submenu name="9">
          <template slot="title">
            <span style="vertical-align: middle;"><img src="@/assets/cs/dataCenter/防汛抢险.png" alt=""/></span>
            <span class="txt1">防汛抢险</span>
          </template>
          <suc-menu-item name="fxwz" to="/main/homePage/fxwz">
            <span class="txt1">防汛物资</span>
          </suc-menu-item>
          <suc-menu-item name="wzck" to="/main/homePage/wzck">
            <span class="txt1">物资仓库</span>
          </suc-menu-item>
          <suc-menu-item name="qxdw" to="/main/homePage/qxdw">
            <span class="txt1">抢险队伍</span>
          </suc-menu-item>
        </suc-submenu>
        <suc-submenu name="11">
          <template slot="title">
            <!-- <span style="vertical-align: middle;"><img src="@/assets/cs/dataCenter/防汛抢险.png" alt=""/></span> -->
            <span class="txt2 iconfont icon-shujuzhongxin-yunweiguanli"></span>
            <span class="txt1">设备管理</span>
          </template>
          <suc-menu-item name="videoCollect" to="/main/homePage/videoCollect">
            <span class="txt1">视频设备</span>
          </suc-menu-item>
        </suc-submenu>
        <suc-submenu name="12">
          <template slot="title">
            <span class="txt2 iconfont icon-shebei"></span>
            <span class="txt1">测站管理</span>
          </template>
          <suc-menu-item name="waterqulity" to="/main/homePage/waterqulity"><span class="txt1">测站管理</span></suc-menu-item>
        </suc-submenu>
      </suc-submenu>
    </suc-menu>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { State, Mutation, Action, namespace } from "vuex-class";
import { SucIcon, SucMenu, SucMenuItem, SucSubmenu, SucTabPane } from "@suc/ui";
import { MenuConfig } from "@suc/ui/interfaces";
const mapStore = namespace("mapStore");
import bus from "@/eventBus";
//@ts-ignore
// const Submenu = Menu.Sub;
@Component({
  components: {
    SucMenu,
    SucMenuItem,
    SucSubmenu,
    SucIcon,
  },
})
export default class topBar extends Vue {
  @mapStore.Mutation setMarkers: any;
  @mapStore.Mutation setMarkerFlag: any;
  // activeNav: string = "";
  option: MenuConfig = {
    activeName: "",
    openNames: [""],
  };

  mounted() {
    let a = this.$route.matched[2].meta.name;
    if (a == "sq" || a == "yq") {
      this.option.openNames = ["1"];
    } else if (a == "weatherInfo" || a == "tfInfo") {
      this.option.openNames = ["2"];
    } else if (a == "wzcb" || a == "alarm" || a == "dispatchCom" || a == "zbPeople" || a == "wzcb") {
      this.option.openNames = ["3"];
    } else if (a == ("hdVideo" || "wyhVideo" || "cqVideo" || "cjcVideo" || "newYld" || "oldYld")) {
      this.option.openNames = ["4"];
    }
    this.$nextTick(() => {
      (this.$refs.ceshi as any).updateOpened();
    });

    this.option.activeName = this.$route.matched[2].meta.name;
  }

  // 路由变化时让 地图上点位回到中心位置

  @Watch("$route", { deep: true })
  changeRoute(val: any) {
    this.option.activeName = this.$route.matched[2].meta.name;

    let reg = /overview|pieNetwork|riverLake|flood|personnel/g;

    if (val.path.match(reg)) {
      this.setMarkers([]);

      this.setMarkerFlag("");
    }
  }

  handleSelect(val: any) {
    if (val == this.option.activeName) {
      bus.$emit("reflashAlive");
    }
  }
}
</script>

<style lang="scss" scoped>
$deep: "::v-deep";

.side-menu-container {
  float: left;

  // width: 175px;

  width: 185px;

  height: 100%;

  // min-height: 225px;

  // margin: 18px auto 25px auto;

  // background-color: #091c37;

  background-color: rgb(0, 32, 96);

  border: solid 1px transparent;

  overflow: auto;

  #{$deep}.suc-menu .ivu-menu-light {
    background-color: rgb(0, 32, 96);
  }

  .txt {
    color: rgba($color: #fff, $alpha: 0.9);

    font-size: 18px;

    //  &:nth-of-type(1) {

    //   display: inline-block;

    //   padding-left: 10px;

    // }

    &:nth-of-type(2) {
      //:nth-of-type(n)  css 伪类匹配同类型中 第n个同级兄弟元素

      display: inline-block;

      padding-left: 6px;
    }
  }

  .txt2 {
    color: rgba($color: #fff, $alpha: 0.7);

    font-size: 16px;
  }

  .txt1 {
    color: rgba($color: #fff, $alpha: 0.9);

    font-size: 18px;

    display: inline-block;
  }

  #{$deep}.ivu-menu-vertical .ivu-menu-submenu-title-icon {
    right: 18px;
  }
}
</style>
