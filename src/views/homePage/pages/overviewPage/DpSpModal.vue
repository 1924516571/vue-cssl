<template>
  <div>
    <!-- :close-on-click-modal=true   /***控制点击空白处是否关闭，默认是true */ 
        :show-close="false"          /***控制是否显示关闭按钮，默认是true */
     -->
    <el-dialog :title="title" :visible.sync="model" :close-on-click-modal="true" :before-close="onCancel">
      <div class="map-body" style="width:100%;height:100%">
        <!-- <video id="videoPlayer" class="video-js" width="" height="600"></video> -->
        <video id="videoPlayer" style="object-fit: fill; width: 100%; height: 100%" class="video-js"></video>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { SucSelect, SucButton, SucInput, SucFormItem, SucDatePicker, SucModal } from "@suc/ui";
import { overview, networkApi, publicApi } from "@/api";
import { TableComponent } from "@/components";
import Video from "video.js";

@Component({
  components: {
    SucButton,
    SucDatePicker,
    SucModal,
    TableComponent,
  },
})
export default class OverView extends Vue {
  @Prop() title: string | undefined;
  @Prop() model!: boolean;
  @Prop() spstcdId!: any;
  @Emit()
  toggle(val: boolean) {
    return val;
  }
  onCancel() {
    this.toggle(false);
  }

  options: any = {
    autoplay: true, // 如果true,浏览器准备好时开始播放。
    controls: true, //显示播放控件
    // aspectRatio: "16:9", //视频的比列
    muted: true, // 默认情况下将会消除任何音频。
    loop: true, // 导致视频一结束就重新开始。
    preload: "auto", // auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
    language: "zh-CN", //汉化
    notSupportedMessage: "视频加载中...", // 无法播放媒体源时显示的默认信息。
    controlBar: {
      timeDivider: true,
      durationDisplay: true, //视频时长时间显示
      remainingTimeDisplay: false, //剩余时间显示
      fullscreenToggle: true, // 全屏按钮
    },
    errorDisplay: false, //错误显示
    posterImage: false, //视频的预览海报图片显示
    bigPlayButton: false, //视频中间的播放按钮显示
    textTrackDisplay: false,
  };
  player: any = null;

  mounted() {}

  // 获取播放地址
  async getPlayUrl(zdbh: any) {
    if (zdbh != undefined) {
      let url = "wjServer/dataCenter/device/image/getInfoByCd";
      let data = await publicApi.getWithParam(url, { zdbh: zdbh });
      if (data.result) {
        this.getVideo(data.data.token);
      } else {
        this.$Message.info("暂无视频");
      }
    }
    return;
  }

  getVideo(nowPlayVideoUrl: any) {
    this.player = Video("videoPlayer", this.options);
    this.player.src([
      {
        src: nowPlayVideoUrl,
        type: "application/x-mpegURL", // 告诉videojs,这是一个hls流
      },
    ]);
  }
  beforeDestroy() {
    //  组件销毁时，清除播放器
    if (this.player) {
      this.player.dispose(); // 该方法会重置videojs的内部状态并移除dom
    }
  }
}
</script>

<style lang="scss" scoped>
$deep: "::v-deep";
::v-deep.el-dialog__wrapper {
  .el-dialog {
    width: 60%;
    // height: 75%;
    .el-dialog__header {
      background-color: #0d7680;
      height: 3rem;
      line-height: 3rem;
      padding: 0;
      .el-dialog__headerbtn {
        top: 0;
        font-size: 18px;
      }
    }
    .el-dialog__body {
      padding: 10px 10px;
      background: #e2e2e2 !important;
      height: 700px;
    }
    .el-dialog__title {
      color: #fff;
      padding-left: 1rem;
      line-height: 0;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }
    .el-dialog__footer {
      border-top: 1px solid #e8eaec;
    }
  }
}

.map-body {
  overflow: hidden;
  //   width: 80%;
  //   margin: 0 auto;
  //   background: pink;
  //   video:focus {
  //     outline: 0; //去掉选中蓝框
  //   }
  //   .video-js .vjs-big-play-button {
  //     /*对播放按钮的样式进行设置*/
  //     width: 100px;
  //     height: 60px;
  //     position: absolute;
  //     top: 50%;
  //     left: 50%;
  //     transform: translate3d(-50%, -50%, 0);
  //   }
}
</style>
