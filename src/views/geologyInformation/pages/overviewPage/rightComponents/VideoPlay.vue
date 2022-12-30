<template>
  <div class="video-view">
    <div class="right-video">
      <suc-tabs :value="vSelect" @on-click="tabClick">
        <suc-tab-pane v-for="it in videoList" :label="it.name" :name="it.id" :key="it.id"> </suc-tab-pane>
      </suc-tabs>
      <div id="video-container" style="width:100%;height:250px"></div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { SucTabs, SucTabPane } from "@suc/ui";
import { getVideoList } from "@/api/flood/floodmange";
import EZUIKit from "ezuikit-js";

@Component({
  components: {
    SucTabs,
    SucTabPane,
  },
})
export default class Home1 extends Vue {
  videoList = [];
  vSelect = null;
  url = "";
  player = {};
  accessToken = "";
  @Prop() bzId;
  createVideo() {
    this.player = new EZUIKit.EZUIKitPlayer({
      autoplay: true,
      id: "video-container",
      accessToken: this.accessToken,
      url: this.url,
      template: "standard", // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
      // 视频上方头部控件
      //header: ["capturePicture", "save", "zoom"], // 如果templete参数不为simple,该字段将被覆盖
      //plugin: ['talk'],                       // 加载插件，talk-对讲
      // 视频下方底部控件
      // footer: ["talk", "broadcast", "hd", "fullScreen"], // 如果template参数不为simple,该字段将被覆盖
      // audio: 1, // 是否默认开启声音 0 - 关闭 1 - 开启
      // openSoundCallBack: data => console.log("开启声音回调", data),
      // closeSoundCallBack: data => console.log("关闭声音回调", data),
      // startSaveCallBack: data => console.log("开始录像回调", data),
      // stopSaveCallBack: data => console.log("录像回调", data),
      // capturePictureCallBack: data => console.log("截图成功回调", data),
      // fullScreenCallBack: data => console.log("全屏回调", data),
      // getOSDTimeCallBack: data => console.log("获取OSDTime回调", data),
    });
  }

  mounted() {
    this.getVideo(this.bzId);
  }
  //切换
  tabClick(name) {
    this.vSelect = name;
    document.getElementById("video-container").innerHTML = "";
    this.$nextTick(() => {
      if (this.videoList.length > 0) {
        this.videoList.forEach((it) => {
          if (it.id == name) {
            this.url = it.url;
            this.accessToken = it.token;
          }
        });
      }
      setTimeout(() => {
        this.createVideo();
      }, 1000);
    });
  }
  //获取视频列表
  async getVideo(it) {
    // let params = {
    //   stationId: it,
    // };
    // let data = await getVideoList(params);
    // this.videoList = data.data;
    // this.vSelect = data.data[0].id;
    // this.url = data.data[0].url;
    // this.accessToken = data.data[0].token;
    // setTimeout(() => {
    //   this.createVideo();
    // }, 1000);

    this.videoList = [
      {
        id: "xzl001",
        name: "新洲路泵站1号视频点",
        url: "ezopen://open.ys7.com/F43330725/1.hd.live",
        token: "at.5jhfz0jj54n3qw4qc3hm0ziqb66io5iq-4qqa1rvc5g-1ybrcdw-dscuaqgzx",
      },
      {
        id: "xzl002",
        name: "新洲路泵站2号视频点",
        url: "ezopen://open.ys7.com/F11336526/1.hd.live",
        token: "at.5jhfz0jj54n3qw4qc3hm0ziqb66io5iq-4qqa1rvc5g-1ybrcdw-dscuaqgzx",
      },
    ];
    setTimeout(() => {
      this.createVideo();
    }, 1000);
  }

  //watch弹框
  @Watch("bzId", { immediate: true, deep: true })
  radioWatch() {
    document.getElementById("video-container").innerHTML = "";
    this.getVideo(this.bzId);
  }
}
</script>
<style lang="scss" scoped>
button {
  padding: 5px 8px;
  cursor: pointer;
}
.right-video {
  width: 100%;
  height: 100%;
}
.video-view {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
