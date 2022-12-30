<template>
  <!--运行状态 -->
  <div class="site">
    <div class="site-item">
      
      <panel-view heading="实时泵机运行">
        <!-- <template slot="right">{{ dateTimes }}</template> -->
        <div v-show="flag" class="noData">暂无数据</div>
        <div class="content">
          <div class="content-item" v-for="item in bjyxData" :key="item">
            <div>
              <img :src="item == 1 ? bz1 : bz0" alt="bz" />
            </div>
            <!-- <div>
              <span>{{ item.bjnm }}</span>
            </div>
            <template>
              <div>
                <span>VAB：</span>
                <span>{{ item.vab || 0 }}</span>
              </div>
              <div>
                <span>VBC：</span>
                <span>{{ item.vbc || 0 }}</span>
              </div>
              <div>
                <span>VAC：</span>
                <span>{{ item.vac || 0 }}</span>
              </div>
            </template> -->
          </div>
        </div>
      </panel-view>
    </div>
    <!-- <div class="site-item">
      <panel-view heading="泵站视频">
        <div class="instruction">
          <div style="padding: 0 10px;">
            <video-play :bzId="bzId"></video-play>
          </div>
        </div>
      </panel-view>
    </div> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { SucForm, SucFormItem, SucInput, SucSelect, SucRadio, SucRadioGroup } from "@suc/ui";
import { Switch, Carousel, CarouselItem, Icon } from "iview";
import { PanelView, TabActive } from "@/components";
import VideoPlay from "./VideoPlay.vue";
import { SucModal } from "@suc/ui";
import { publicApi } from "@/api";

@Component({
  components: {
    VideoPlay,
    SucForm,
    SucFormItem,
    SucInput,
    SucSelect,
    ISwitch: Switch,
    Carousel,
    CarouselItem,
    PanelView,
    TabActive,
    SucModal,
    SucRadio,
    SucRadioGroup,
    Icon,
  },
})
export default class Site extends Vue {
  @Prop({
    type: Object,
    default: () => {},
  })
  row: any;   
  // 这地方坑
 	// @Prop() row!: string;
  // row: any="";   //坑，不能用空字符串
  bz0: any = require("@/assets/flood/bz.png");
  bz1: any = require("@/assets/flood/bz.gif");
  bzId: any = "";
  //btns: any[] = ["信息", "视频"];
  dateTimes: any = this.$utils.dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss");
  bjyxData: any[] = [];
  flag: boolean=true;

  // 详情控制

  detailParams: any = {
    stationId: "", //点击每行对应的id
  };
  @Watch("row", { deep: true, immediate: true })
  onRow (row: any) {
    this.detailParams = {
      stationId: row.stationId,
    };
    this.getInfo();
  }

  // 泵站
  async getInfo() {
    const url = "wjServer/fangxunjc/zhabengzhanyx/runningStatus";
    const data = await publicApi.getWithParam(url, this.detailParams);
    if (data.data.bjList.length > 0 && data.result == true) {
      this.bjyxData = data.data.bjList;
      this.flag = false;
    } else {
      this.bjyxData = [];
      this.flag = true;
    }

    // this.bjyxData = [
    //   {
    //     deviceCode: "xzl001",
    //     dt: "1647430310000",
    //     bjnm: "新洲路泵站1#泵机",
    //     bjsr: "1",
    //     sq: "0.000",
    //     qa: "",
    //     vab: "",
    //     vbc: "",
    //     vac: "",
    //     ia: "58.7",
    //     ib: "",
    //     ic: "",
    //     lastOpenTime: "1647430310000",
    //     lastCloseTime: "1647428545000",
    //     fp: "",
    //     fault: "",
    //     videoUrl: "",
    //     realTime: "2022-03-16 19:36:39",
    //   },
    // ];
  }
}
</script>
<style lang="scss">
.instruction-item {
  .ivu-form-item {
    margin-bottom: 6px;
  }
}

.instruction-swipper {
  .ivu-carousel-list {
    height: 100%;
  }
}
</style>
<style lang="scss" scoped>
.site {
  .site-item {
    font-size: 14px;
    color: #666;
    .noData {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .content {
    width: 100%;
    overflow: auto;
    display: flex;

    .content-item {
      text-align: center;
      width: 140px;
    }
  }

  .instruction {
    height: calc(100% - 52px);

    .btn {
      margin: 0 10px 6px;
      width: 118px;
    }

    .swipper-img {
      display: flex;
      justify-content: center;
      height: 100%;
    }

    .instruction-swipper {
      display: flex;
      justify-content: center;
      height: 200px;
    }

    .instruction-item {
      padding: 0 10px;
      // &:first-of-type {
      //   height: 200px;
      // }
      // &:nth-of-type(2) {
      // padding-top: 10px;
      overflow: auto;

      // }
    }
  }

  .ivu-switch {
    pointer-events: none;
    cursor: pointer;
  }

  .pswIcon {
    font-size: 30px;
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
