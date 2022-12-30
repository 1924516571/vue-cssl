<template>
  <!-- 资料库 -->
  <div class="module-view">
    <div class="plan">
      <div class="bg-shadow left scroll">
        <div class="tree">
          <el-tree
            ref="checkTree"
            :data="treeData"
            default-expand-all
            @node-click="getNode"
            :expand-on-click-node="false"
            :props="defaultProps"
            highlight-current
            node-key="id"
            :current-node-key="currentNodekey"
          ></el-tree>
        </div>
      </div>
      <div class="bg-shadow right">
        <div class="right-title">
          <span class="titleStyle" v-text="rightTitle">B1片区</span>
          <span>
            <span style="padding-right:10px"><suc-button type="primary" :debounce="800" @on-click="downloadSoftware">下载控件</suc-button></span>
            <suc-button type="primary" :debounce="800" @on-click="getLinkUrl">云台控制</suc-button>
          </span>
        </div>
        <div v-loading="loading" class="right-content" v-if="rightTitle">
          <video id="videoPlayer" class="video-js" height="700"></video>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { SucButton, SucTree, SucModal, SucForm, SucFormItem, SucSelect, SucInput } from "@suc/ui";
import { SelectOptions } from "@suc/ui/interfaces";
import { SearchComponent } from "@/components";
import { dataBaseApi, infoApi, publicApi } from "@/api";
import flvjs from "flv.js";
import Video from "video.js";
@Component({
  components: {
    SucButton,
    SucTree,
    SucModal,
    SucForm,
    SucFormItem,
    SucSelect,
    SucInput,
    SearchComponent,
  },
})
export default class TransferPlan extends Vue {
  treeData: any = [];
  delLoading: boolean = false;
  currentNodekey: any = "";
  dirId: string = "";
  addName: string = "";
  editName: string = "";
  rightTitle: string = "";
  loading: boolean = false;
  fileList: any = [];
  fzdwOptions: any = [];
  qymcOptions: any = [];
  userOptions: any = [];
  formParams: any = {};
  areaOptions: any = [];
  isFirstFlag: boolean = false; //判断选中是否为第一节点
  selectNodeId: string = ""; //选中节点id
  ids: any = []; //删除树节点id
  searchParams: string = "";
  defaultProps: any = {
    label: "name",
    chilren: "children",
  };
  nodeData: any = {
    label: "",
    id: "",
  };
  url = "";
  accessToken = localStorage.getItem("refresh-token");
  mounted() {
    this.getTree();
  }
  player: any = null;
  getTreeData(data: any) {
    // 循环遍历json数据
    for (var i = 0; i < data.length; i++) {
      if (data[i].children.length < 1) {
        // children若为空数组，则将children设为undefined
        data[i].children = undefined;
      } else {
        // children若不为空数组，则继续 递归调用 本方法
        this.getTreeData(data[i].children);
      }
    }
    return data;
  }
  options: any = {
    autoplay: true, // 如果true,浏览器准备好时开始播放。
    controls: true, //显示播放控件
    muted: true, // 默认情况下将会消除任何音频。
    loop: true, // 导致视频一结束就重新开始。
    preload: "auto", // auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
    language: "zh-CN", //汉化
    // fluid: true, // 当true时，播放器将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
    // sources: [
    //   {
    //     type: "application/x-mpegURL",
    //     // src: "https://pps.sd-play.com/20220610/et3sWrbS/index.m3u8", //视频播放地址
    //     src: "",
    //   },
    // ],
    notSupportedMessage: "此视频暂无法播放，请稍后再试", // 无法播放媒体源时显示的默认信息。
    controlBar: {
      timeDivider: true,
      durationDisplay: true, //视频时长时间显示
      remainingTimeDisplay: false, //剩余时间显示
      fullscreenToggle: true, // 全屏按钮
    },
    errorDisplay: true, //错误显示
    posterImage: false, //视频的预览海报图片显示
    bigPlayButton: true, //视频中间的播放按钮显示
    textTrackDisplay: false,
  };
  // 获取树
  async getTree() {
    let url = "wjServer/dataCenter/device/image/videos";
    let data = await publicApi.getWithParam(url, { splb: "望虞河视频" });
    this.treeData = [data.data];
  }

  // createVideo() {
  //   if (document.getElementById("video-container") != null) {
  //     (document.getElementById("video-container") as any).innerHTML = "";
  //     this.$video(this.$refs.videoPlayer, this.options).play();
  //   }
  // }

  //点击树节点
  async getNode(data: any) {
    this.rightTitle = data.name;
    this.selectNodeId = data.id;
    let url = "wjServer/dataCenter/device/image/getInfoByCd";
    let a = await infoApi.getWithParam(url, { zdbh: data.id });
    if (a.result) {
      if (a.data.token != "") {
        this.getVideo(a.data.token);
        // this.loading = true;
        // setTimeout(() => {
        //   this.createVideo();
        //   this.loading = false;
        // }, 1000);
      } else {
        this.$Message.info("暂无视频");
      }
    }
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
  getLinkUrl() {
    window.open("http://112.25.132.104:18079?token=" + this.accessToken, "_blank");
  }
  downloadSoftware() {
    var url = "http://112.25.132.104:8088/api/wjBaseServer/minio/file/downloadFromFile?fileId=DPSDK_OCX_Win32&fileType=exe";
    window.open(url, "_blank");
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
$deep: "::v-deep";
.module-view {
  position: relative;
  padding: 10px;
  background-color: $pages-bg;
  .bg-shadow {
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
  }
  .plan {
    display: flex;
    // height: calc(100% - 70px);
    height: 95%;
    width: 100%;
    .left {
      width: 400px;
      padding: 20px 10px 10px 10px;
      // background: pink;
      height: 100%;
      overflow: auto;
    }
    .right {
      width: calc(100% - 400px);
      margin-left: 10px;
      // height: %;
      // overflow: hidden;
      &-title {
        line-height: 60px;
        height: 60px;
        padding: 0 10px;
        border-bottom: 1px solid $border-color;
        display: flex;
        justify-content: space-between;
        .titleStyle {
          font-size: 18px;
          font-weight: 800;
        }
      }
      &-content {
        padding: 10px;
        margin-right: 10px;
        overflow: hidden;
        display: flex;
        justify-content: center;
      }
    }
  }
}

#{$deep}.suc-button.ivu-btn.ivu-btn-primary {
  color: #fff;
  background-color: #0093ff;
  border-color: #5584ff;
}
</style>
