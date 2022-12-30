<template>
  <div class="main">
    <div class="top bg-shadow">
      <div class="top-item">
        <tab-active :btns="btns" @get-btn="getBtn" :activeIndex="activeIndex"></tab-active>
      </div>
    </div>
     <div v-if="activeIndex == 0" scroll style="height:100%;padding-bottom:5%">
      <!-- https://weathernew.pae.baidu.com/weathernew/pc?query=%E8%8B%8F%E5%B7%9E%E5%B8%B8%E7%86%9F%E5%A4%A9%E6%B0%94&srcid=4982 -->
      <iframe width="100%" scrolling="auto" height="100%" frameborder="0" allowtransparency="true" src="http://www.cfntec.com/CFWeather/CFWx/Pages/StationMap.aspx"></iframe>
    </div>
    <div v-if="activeIndex == 1" scroll>
      <iframe width="100%" scrolling="auto" height="1000" frameborder="0" allowtransparency="true" src="http://www.nmc.cn/publish/forecast/AJS/changshu.html"></iframe>
    </div>
   
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { TabActive } from "@/components";
@Component({
  components: {
    TabActive,
  },
})
export default class Weather extends Vue {
  btns: any[] = ["常熟气象", "中国气象"];
  activeIndex: any = "0";
  getBtn(index: number) {
    this.activeIndex = index;
    // if (this.activeIndex == 0) {
    //   // this.getfxwzNoPage();
    // } else if (this.activeIndex == 1) {
    //   // this.getcrkPage();
    // }
  }
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  .top {
    padding: 15px;
    position: relative;
    &-item {
      display: flex;
      // width: 50%;
    }
  }
}
#{$deep}.tab-active {
  font-size: 20px;
}
#{$deep}.bg-shadow {
  background-color: #f3f3f3;
  box-shadow: 0px 0px 8px 0px #bfbfbf;
}
</style>
