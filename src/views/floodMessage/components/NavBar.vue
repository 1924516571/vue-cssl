<template>
  <div class="side-menu-container">
    <suc-menu :config="option">
      <suc-menu-item name="overView" to="/main/floodMessage/overView">
        <span class="txt iconfont icon-zonglan" ></span>
        <span class="txt"><span>监控</span></span>
      </suc-menu-item>
      <suc-submenu name="1">
        <template slot="title">
          <span class="txt iconfont icon-shebei"></span>
          <span class="txt">运行事件</span>
        </template>
        <suc-menu-item name="alarm" to="/main/floodMessage/alarm"><span class="txt">报警事件</span></suc-menu-item>
        <suc-menu-item name="fault" to="/main/floodMessage/fault"><span class="txt">故障事件</span></suc-menu-item>
      </suc-submenu>
      <suc-submenu name="2">
        <template slot="title">
          <span class="txt iconfont  icon-yanghu"></span>
          <span class="txt">养护巡查</span>
        </template>
        <suc-menu-item name="operateManage" to="/main/floodMessage/operateManage"><span class="txt">巡查计划</span></suc-menu-item>
        <suc-menu-item name="taskProcess" to="/main/floodMessage/taskProcess"><span class="txt">巡查任务</span></suc-menu-item>
        <suc-menu-item name="record" to="/main/floodMessage/record"><span class="txt">巡查记录</span></suc-menu-item>
      </suc-submenu>
      <suc-submenu name="3">
        <template slot="title">
          <span class="txt iconfont icon-yujingxinxi"></span>
          <span class="txt">应急响应</span>
        </template>
        <suc-menu-item name="danger" to="/main/floodMessage/danger"><span class="txt">灾险情管理</span></suc-menu-item>
        <suc-menu-item name="yjPeople" to="/main/floodMessage/yjPeople"><span class="txt">防汛应急联系人</span></suc-menu-item>
        <suc-menu-item name="zbPeople" to="/main/floodMessage/zbPeople"><span class="txt">值班人员</span></suc-menu-item>
        <suc-menu-item name="fxya" to="/main/floodMessage/fxya"><span class="txt">防汛预案</span></suc-menu-item>
        <suc-menu-item name="yjyj" to="/main/floodMessage/yjyj"><span class="txt">应急预警管理</span></suc-menu-item>
        <suc-menu-item name="hqcl" to="/main/floodMessage/hqcl"><span class="txt">后期处理</span></suc-menu-item>
        <suc-menu-item name="jxdh" to="/main/floodMessage/jxdh"><span class="txt">接险电话</span></suc-menu-item>
      </suc-submenu>

        <suc-menu-item
          name="video"
          to="http://10.32.226.57/license!getExpireDateOfDays.action"
          target='_blank'
          style="margin-left:10px"
        >
          <span class="txt iconfont icon-zonglan"></span>
          <span class="txt"><span>视频监控</span></span>
        </suc-menu-item>

      <suc-submenu name="5">
        <template slot="title">
          <span class="txt iconfont icon-guanwangjianbao"></span>
          <span class="txt">简报分析</span>
        </template>
        <suc-menu-item name="waterAnalyse" to="/main/floodMessage/waterAnalyse"><span class="txt">水情分析</span></suc-menu-item>
        <suc-menu-item name="rainAnalyse" to="/main/floodMessage/rainAnalyse"><span class="txt">雨情分析</span></suc-menu-item>
        <suc-menu-item name="moreWaterAnalyse" to="/main/floodMessage/moreWaterAnalyse"><span class="txt">多站水情分析</span></suc-menu-item>
        <suc-menu-item name="moreWaterDateReport" to="/main/floodMessage/moreWaterDateReport"><span class="txt">多站水情日报</span></suc-menu-item>
        <suc-menu-item name="moreRainAnalyse" to="/main/floodMessage/moreRainAnalyse"><span class="txt">多站雨情分析</span></suc-menu-item>
        <suc-menu-item name="rainRelationAnalyse" to="/main/floodMessage/rainRelationAnalyse"><span class="txt">雨水关系分析</span></suc-menu-item>
        <suc-menu-item name="bzRun" to="/main/floodMessage/bzRun"><span class="txt">闸泵站运行状态</span></suc-menu-item>
        <suc-menu-item name="bzRunRecord" to="/main/floodMessage/bzRunRecord"><span class="txt">闸泵站运行统计</span></suc-menu-item>
         <suc-menu-item name="zbzRecord" to="/main/floodMessage/zbzRecord"><span class="txt">闸泵站运行记录表</span></suc-menu-item>
        <!-- <suc-menu-item name="jianBao" to="/main/floodMessage/jianBao"><span class="txt">防汛运行简报</span></suc-menu-item> -->
              <suc-menu-item name="reportflood" to="/main/floodMessage/reportflood"><span class="txt">防汛运行简报</span></suc-menu-item>
        <suc-menu-item name="waterLevelTable" to="/main/floodMessage/waterLevelTable"><span class="txt">河道水位表</span></suc-menu-item>
        <suc-menu-item name="disasterCount" to="/main/floodMessage/disasterCount"><span class="txt">灾情统计汇总</span></suc-menu-item>
        <suc-menu-item name="searchCount" to="/main/floodMessage/searchCount"><span class="txt">巡查统计</span></suc-menu-item>
      </suc-submenu>
    </suc-menu>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { State, Mutation, Action, namespace } from "vuex-class";
import { SucIcon, SucMenu, SucMenuItem, SucSubmenu } from "@suc/ui";
import { MenuConfig } from "@suc/ui/interfaces";
const mapStore = namespace("mapStore");

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
  };
  mounted() {
    this.option.activeName = this.$route.matched[2].meta.name;
  }
  @Watch("$route", { deep: true })
  changeRoute(val: any) {
    this.option.activeName = this.$route.matched[2].meta.name;
    let reg = /overview|pieNetwork|riverLake|flood|personnel/g;
    if (val.path.match(reg)) {
      this.setMarkers([]);
      this.setMarkerFlag("");
    }
  }
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
.side-menu-container {
  float: left;
  width: 175px;
  height: 100%;
  // min-height: 225px;
  // margin: 18px auto 25px auto;
  background-color: #091c37;
  border: solid 1px transparent;
  overflow: auto;
  .txt {
    color: rgba($color: #fff, $alpha: 0.9);
    &:nth-of-type(2) {
      display: inline-block;
      padding-left: 6px;
    }
  }
}
</style>
