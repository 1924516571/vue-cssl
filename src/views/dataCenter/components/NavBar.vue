<template>
  <div class="side-menu-container">
    <suc-menu :config="option">
      <!-- v-authox="'dataCenter_info|access'" -->
      <suc-submenu name="1">
        <template slot="title">
          <span class="txt iconfont icon-guanwangjianbao"></span>
          <span class="txt">自然资源</span>
        </template>
        <suc-menu-item name="infoRiver" to="/main/dataCenter/infoRiver">
          <span class="txt">河湖信息</span>
        </suc-menu-item>
        <suc-menu-item name="infoGate" to="/main/dataCenter/infoGate">
          <span class="txt">闸门信息</span>
        </suc-menu-item>
        <suc-menu-item name="infoWei" to="/main/dataCenter/infoWei">
          <span class="txt">圩区信息</span>
        </suc-menu-item>
             <suc-menu-item name="infoGuan" to="/main/dataCenter/infoGuan">
          <span class="txt">灌区信息</span>
        </suc-menu-item>

        <!-- <suc-menu-item name="banben" to="/main/dataCenter/banben">
          <span class="txt">版本信息</span>
        </suc-menu-item> -->
      </suc-submenu>
      <suc-submenu name="2">
        <template slot="title">
          <span class="txt iconfont icon-shujuzhongxin-jigouguanli"></span>
          <span class="txt">养护模板</span>
        </template>
        <suc-menu-item name="mytemplate" to="/main/dataCenter/mytemplate"><span class="txt">我的模板</span></suc-menu-item>
        <suc-menu-item name="publictemplate" to="/main/dataCenter/publictemplate"><span class="txt">通用模板</span></suc-menu-item>
      </suc-submenu>

      <suc-submenu name="3">
        <!-- v-authox="'dataCenter_content|access'" -->
        <template slot="title">
          <span class="txt iconfont icon-yanghu"></span>
          <span class="txt">养护内容</span>
        </template>
        <suc-menu-item name="yhnr" to="/main/dataCenter/yhnr"><span class="txt">内容模板</span></suc-menu-item>
      </suc-submenu>
      <suc-submenu name="4">
        <!-- v-authox="'dataCenter_content|access'" -->
        <template slot="title">
          <span class="txt iconfont icon-biaozhun"></span>
          <span class="txt">工程设施</span>
        </template>
        <suc-menu-item name="infoPump" to="/main/dataCenter/pump">
          <span class="txt">泵机信息</span>
        </suc-menu-item>
        <suc-menu-item name="wushuibz" to="/main/dataCenter/wushuibz">
          <span class="txt">闸站信息</span>
        </suc-menu-item>
        <suc-menu-item name="infoDf" to="/main/dataCenter/infoDf">
          <span class="txt">堤防信息</span>
        </suc-menu-item>
        <suc-menu-item name="infoyld" to="/main/dataCenter/infoyld">
          <span class="txt">易涝点</span>
        </suc-menu-item>
      </suc-submenu>
      <suc-submenu name="5">
        <!-- v-authox="'dataCenter_content|access'" -->
        <template slot="title">
          <span class="txt iconfont icon-qitawenjian"></span>
          <span class="txt">防汛抢险</span>
        </template>
        <suc-menu-item name="fxwz" to="/main/dataCenter/fxwz">
          <span class="txt">防汛物资</span>
        </suc-menu-item>
        <suc-menu-item name="wzck" to="/main/dataCenter/wzck">
          <span class="txt">物资仓库</span>
        </suc-menu-item>
        <suc-menu-item name="qxdw" to="/main/dataCenter/qxdw">
          <span class="txt">抢险队伍</span>
        </suc-menu-item>
        <suc-menu-item name="bzcs" to="/main/dataCenter/bzcs">
          <span class="txt">避灾场所</span>
        </suc-menu-item>
      </suc-submenu>
      <suc-submenu name="6">
        <template slot="title">
          <span class="txt iconfont icon-pianchangguanli-pianchang"></span>
          <span class="txt">组织管理</span>
        </template>
        <!-- <suc-menu-item name="userManage" :to="`${backUrl}`" target="_blank">
          <span class="txt">用户管理</span>
        </suc-menu-item> -->

        <suc-menu-item name="userManage"  to="http://172.18.17.35:8089/back/" target="_blank">
          <span class="txt">用户管理</span>
        </suc-menu-item>
      </suc-submenu>
    </suc-menu>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { State, Mutation, Action, namespace } from "vuex-class";
import { SucIcon, SucMenu, SucMenuItem, SucSubmenu } from "@suc/ui";
import { MenuConfig } from "@suc/ui/interfaces";
import { backUrl } from "../../../../public/config.js";

// import {backUrl} from ""

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
  // activeNav: string = "";
  option: MenuConfig = {
    activeName: "",
    // theme: "light",
    openNames: ["1"], //@description 展开的 Submenu 的 name 集合
  };
  backUrl: any = backUrl;
  mounted() {
    this.option.activeName = this.$route.matched[2].meta.name;
  }
  @Watch("$route", { deep: true })
  changeRoute() {
    this.option.activeName = this.$route.matched[2].meta.name;
  }
}
</script>
<style lang="scss" scoped>
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
