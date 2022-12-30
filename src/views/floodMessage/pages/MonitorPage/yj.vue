<template>
<!-- 气象预警 -->
  <div class="mon-body">
    <div>
      <!-- <img src="@/assets/yj.png"/> -->
      <img :src="alarmData.src" />
      <div class="scroll">
        <span v-text="alarmData.nr">江宁区气象台发布暴雨黄色预警[Ⅲ级/较重]</span>
        <span v-text="alarmData.tm">2020-01-12 13:00</span>
      </div>
    </div>
    <!--<p></p>
        <div>
            <img src="@/assets/yj.png"/>
            <div>
                <span>江宁区气象台发布暴雨黄色预警[Ⅲ级/较重]</span>
                <span>2020-01-12  13:00</span>
            </div>
    </div>-->
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { PanelView, TabSwitch, SearchComponent, TablePage } from "@/components";
import { getWeatherAlarm } from "@/api/flood/floodmange";
@Component({
  components: {
    PanelView,
    TabSwitch,
    SearchComponent,
    TablePage,
  },
})
export default class MainPanel extends Vue {
  alarmData: any = {};
  async getWeatherAlarm() {
    let data = await getWeatherAlarm({
      currentPage: 1,
      pageSize: 10,
    });
    this.alarmData = data.data[0];
    if (data.data[0].img) {
      this.alarmData.src = require(`@/assets/warning/${data.data[0].img}.png`);
    } else {
      this.alarmData.src = require("@/assets/yj.png");
    }
  }
  mounted() {
    this.getWeatherAlarm();
  }
}
</script>
<style lang="scss" scoped>
.mon-body {
  width: 100%;
  height: calc(100% - 55px);
  div {
    width: 100%;
    height: calc((100% - 1px) / 2);
    display: flex;
    align-items: center;
    img {
      width: 54px;
      height: 44px;
      margin: 0 10px 0 27px;
    }
    div {
      display: inline-block;
      width: calc(100% - 100px);
      height: 44px;
      vertical-align: top;
      overflow-y: auto;
      span {
        display: block;
        color: #333333;
        &:nth-child(2) {
          color: #999999;
          margin-top: 8px;
        }
      }
    }
  }
  p {
    width: calc(100% - 40px);
    height: 1px;
    margin-left: 20px;
    background-color: #dde4eb;
  }
}
</style>
