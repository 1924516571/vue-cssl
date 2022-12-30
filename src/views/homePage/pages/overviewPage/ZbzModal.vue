<template>
  <div>
    <div v-if="info.type == 'DP'">
      <ol-overlay class="pop1" :position="info.coords" :offset="info.offset" category="clickLabel" ref="test">
        <div class="map-modal1">
          <div class="map-header">
            <span class="cl">{{ info.bengmc }}</span>
            <img src="../../../../assets/gb.png" @click="mapClick" />
          </div>
          <div class="map-bottom">
            <div class="zbzModal">
              <div class="showImg">
                <el-image :src="info.srcList[0]" :preview-src-list="info.srcList" style="width:100%; height:100%"></el-image>
              </div>
              <div class="textDes scrollsmall">
                <div>
                  <span>所在镇:{{ info.town }}</span>
                  <span>所在村:{{ info.village }}</span>
                </div>
                <div>
                  <span>经度:{{ info.jd }}</span>
                  <span>纬度:{{ info.wd }}</span>
                </div>
                <div>
                  <span>泵站类型:{{ info.zhantype }}</span>
                  <span>机组台数:{{ info.num }}</span>
                </div>
                <div>
                  <span>装机容量:{{ info.capacity }}</span>
                  <span>设计流量:{{ info.desnum }}</span>
                </div>
                <div>
                  <span>水泵类型:{{ info.bengtype }}</span>
                  <span>水泵型号:{{ info.model }}</span>
                </div>
                <div>
                  <span>进水池尺寸:{{ info.insize }}</span>
                  <span>出水池尺寸:{{ info.outsize }}</span>
                </div>

                <div>
                  <span>泵房面积:{{ info.barea }}</span>
                  <span>管理房面积:{{ info.glarea }}</span>
                </div>

                <div>
                  <span>占地面积:{{ info.zdarea }}</span>
                  <span>进水河道:{{ info.inriver }}</span>
                </div>

                <div>
                  <span>出水河道 :{{ info.outriver }}</span>
                  <span>受益面积（亩）:{{ info.syarea }}</span>
                </div>

                <div>
                  <span>新建时间或改建 :{{ info.gztime }}</span>
                  <span>建设单位:{{ info.until }}</span>
                </div>

                <div>
                  <span> 现状管理模式 :{{ info.glmodel }}</span>
                  <span>产权归属:{{ info.gs }}</span>
                </div>

                <div>
                  <span> 电度 :{{ info.power }}</span>
                  <span>电度更新日期:{{ info.powertime }}</span>
                </div>

                <div>
                  <span> 看管人 :{{ info.kgr }}</span>
                  <span>看管人电话:{{ info.tel }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ol-overlay>
    </div>

    <div v-if="info.type == 'DD'">
      <ol-overlay class="pop1" :position="info.coords" :offset="info.offset" category="clickLabel" ref="test">
        <div class="map-modal1">
          <div class="map-header">
            <span class="cl">{{ info.zhamc }}</span>
            <img src="../../../../assets/gb.png" @click="mapClick" />
          </div>
          <div class="map-bottom">
            <div class="zbzModal">
              <div class="showImg">
                <el-image :src="info.srcList[0]" :preview-src-list="info.srcList" style="width:100%; height:100%"></el-image>
              </div>
              <div class="textDes scrollsmall">
                <div>
                  <span>所在镇:{{ info.town }}</span>
                  <span>所在村:{{ info.village }}</span>
                </div>
                <div>
                  <span>经度:{{ info.jd }}</span>
                  <span>纬度:{{ info.wd }}</span>
                </div>
                <div>
                  <span>水闸类型:{{ info.shuizhatype }}</span>
                  <span>水闸孔数 :{{ info.zhaks }}</span>
                </div>
                <div>
                  <span>单孔净宽:{{ info.dkwid }}</span>
                  <span>闸孔断面高度:{{ info.zkhei }}</span>
                </div>
                <div>
                  <span>闸门高度:{{ info.zhahei }}</span>
                  <span>闸门宽度:{{ info.zhawid }}</span>
                </div>
                <div>
                  <span> 闸门类型:{{ info.zhatype }}</span>
                  <span>闸门材料:{{ info.zhacl }}</span>
                </div>

                <div>
                  <span>泵房面积:{{ info.barea }}</span>
                  <span>管理房面积:{{ info.glarea }}</span>
                </div>

                <div>
                  <span>启闭机类型 :{{ info.octype }}</span>
                  <span>启闭机型号:{{ info.qbjtype }}</span>
                </div>

                <div>
                  <span>总占地面积 :{{ info.allarea }}</span>
                  <span>新建时间或改建:{{ info.gjtime }}</span>
                </div>

                <div>
                  <span>现状管理模式 :{{ info.xzgl }}</span>
                  <span>产权归属:{{ info.gs }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ol-overlay>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { SucSelect, SucButton, SucInput, SucFormItem, SucDatePicker, SucModal } from "@suc/ui";
import { overview, networkApi, publicApi } from "@/api";

@Component({
  components: {
    SucButton,
    SucDatePicker,
    SucModal,
  },
})
export default class OverView extends Vue {
  @Prop() info: any;
  mapClick() {
    this.$emit("close", false);
  }
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
$deep: "::v-deep";
.pop1 {
  width: 1100px !important;
}
.map-modal1 {
  width: auto;
  box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.08);

  .map-header {
    width: auto;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #002060;
    color: #fff;
    padding: 0 15px;
    font-size:20px;

    img {
      width: 10px;
      height: 10px;
      cursor: pointer;
    }
    .cl {
      color: #f7f40b;
    }
    .detail {
      position: absolute;
      right: 10%;
      cursor: pointer;
    }
  }
  .process-item {
    padding: 10px 10px;
    display: flex;
    position: relative;
    .icon {
      position: absolute;
      // font-size: 20px;
      right: 20px;
      cursor: pointer;
      .iconsize {
        font-size: 25px;
      }
    }
  }

  .map-body {
    padding: 0 10px;
    // height: auto;
    margin-top: 3%;
    .noData {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    div {
      height: 30px;
      display: flex;
      align-items: center;
      // &:last-child {
      //   justify-content: space-between;
      // }
    }
  }

  .map-bottom {
    padding: 10px 10px;
    height: auto;
    .zbzModal {
      height: 600px;
      width: 100%;
      display: flex;
      .showImg {
        width: 40%;
        height: 100%;
        // background: yellow;
        position: relative;
        padding-top: 20%;
      }
      .textDes {
        width: 60%;
        // background: pink;
        height: 100%;
        padding: 0 10px;
        overflow: auto;
        font-size: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        div {
          display: flex;
          justify-content: space-between;
          font-weight: 600;
          //   span:first-of-type {
          //     font-weight: 600;
          //   }
        }
      }
    }
  }

  .scrollsmall::-webkit-scrollbar {
    width: 4px;
  }
  .scrollsmall::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #e1e1e1;
  }

  .map-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 0;
  }
}

#{$deep}.el-image {
  .el-image__error,
  .el-image__inner,
  .el-image__placeholder {
    height: 150px;
  }
}
</style>
