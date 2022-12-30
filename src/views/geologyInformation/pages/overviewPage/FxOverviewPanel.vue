<template>
  <div class="overview-view">
    <transition name="slide-fade" v-if="fxShow">
      <div class="item-view right">
        <div class="close-btn bg-shadow" @click="getRightshow">
          <span>×</span>
        </div>
        <fx-table-detail :eid="this.id"></fx-table-detail>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { PanelView, TablePage, TableComponent } from "@/components";
import FxTableDetail from "./FxTableDetail.vue";
import { publicApi } from "@/api";
@Component({
  components: {
    PanelView,
    TablePage,
    TableComponent,
    FxTableDetail,
  },
})
export default class OverviewPanel extends Vue {
  @Prop() fxShow: any;
  @Prop() id: any;


  getRightshow() {
    this.$emit("toggle", false);
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
.overview-view {
  width: 100%;
  height: 100%;
  position: relative;
  .item-view {
    height: 100%;
    background-color: #ffffff;
    box-shadow: 2px 0px 10px 0px rgba(0, 0, 0, 0.12);
    .img-view {
      font-size: 18px;
      height: 50px;
      margin-bottom: 10px;
      text-align: left;
      background-image: linear-gradient(269deg, #fb6a3d, #ffc144);
      color: #fff;
      width: 100%;
      padding-top: 15px;
      padding-left: 10px;
    }
    .tab-btns {
      height: 100%;
      .enterprise-view {
        width: 100%;
        height: 85%;
        .aa {
          display: inline-block;
          background-color: #ff5a47;
          padding: 5px 5px;
          color: #fff;
          font-weight: 600;
        }
        .bb {
          background-color: rgb(53, 214, 48);
        }
        .state-red {
          color: red;
        }
        .state-green {
          color: rgb(53, 12, 238);
        }
      }
    }
  }
  .left {
    width: 550px;
    // width: 680px;
    float: left;
  }
  .right {
    float: right;
    position: relative;
    width: 450px;
    height: 100%;
    pointer-events: auto;
    .close-btn {
      position: absolute;
      top: 0;
      left: -32px;
      padding: 15px 10px;
      color: #9a9a9a;
      font-size: 20px;
      cursor: pointer;
    }
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
}
</style>
