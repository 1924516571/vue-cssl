<template>
  <!-- 资料库 -->
  <div class="module-view">
    <div class="plan">
      <div class="bg-shadow left scroll">
        <div class="tree">
          <!-- expand-on-click-node:是否点击展开和收缩节点 -->
          <el-tree
            ref="checkTree"
            :data="data"
            default-expand-all
            @node-click="getNode"
            :expand-on-click-node="true"
            :props="defaultProps"
            highlight-current
            node-key="id"
            :current-node-key="currentNodekey"
          >
            <div class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <div v-if="data.disabled" class="disabled" @click.stop></div>
            </div>
          </el-tree>
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
        <div v-loading="loading" ref="test" class="right-content" v-if="rightTitle">
          <video style="object-fit: fill; width: 100%; height: 100%" id="videoPlayer" class="video-js"></video>
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
  data: any = [];
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

  options: any = {
    autoplay: true, // 如果true,浏览器准备好时开始播放。
    controls: true, //显示播放控件
    aspectRatio: "16:9", //视频的比列
    muted: true, // 默认情况下将会消除任何音频。
    loop: true, // 导致视频一结束就重新开始。
    preload: "auto", // auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
    language: "zh-CN", //汉化
    notSupportedMessage: "此视频暂无法播放，请稍后再试", // 无法播放媒体源时显示的默认信息。
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
  // 获取树
  async getTree() {
    let url = "wjServer/dataCenter/device/image/videos";
    let data = await publicApi.getWithParam(url, { splb: "骨干河道视频" });
    this.data = [data.data];
    // this.loopMuduleTreeDisabled(this.data, this);
  }

  loopMuduleTreeDisabled(arr: any[], that: any) {
    arr.forEach((item) => {
      that.$set(item, "disabled", true);
      if (item.children && item.children.length > 0) {
        this.loopMuduleTreeDisabled(item.children, that);
      }
    });
  }

  //点击树节点
  async getNode(data: any) {
    this.rightTitle = data.name;
    this.selectNodeId = data.id;
    let url = "wjServer/dataCenter/device/image/getInfoByCd";
    let a = await infoApi.getWithParam(url, { zdbh: data.id });
    if (a.data) {
      (this.$refs.test as any).style.visibility = "visible";
      this.getVideo(a.data.token);
    } else {
      this.$Message.error("暂无视频");
      (this.$refs.test as any).style.visibility = "hidden";
    }
  }
  player: any = null;
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
    if (this.player) {
      this.player.dispose(); // 该方法会重置videojs的内部状态并移除dom       //  组件销毁时，清除播放器
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
      // &-content {
      //   padding: 10px;
      //   overflow: hidden;
      //   display: flex;
      //   justify-content: center;
      // }
    }
  }
}

#{$deep}.suc-button.ivu-btn.ivu-btn-primary {
  color: #fff;
  background-color: #0093ff;
  border-color: #5584ff;
}
.el-tree-node__content {
  position: relative;
}
.disabled {
  cursor: not-allowed;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
}
// #{$deep}.
</style>
