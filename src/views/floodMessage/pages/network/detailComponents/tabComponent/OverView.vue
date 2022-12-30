<template>
  <!-- 监测总览 -->
  <div class="overview-view">
    <div class="overview-item">
      <div class="heading">
        <span>总览</span>
      </div>
      <div class="content">
        <div class="amount-item blue-gradient">
          <div>
            <div><span>上游监测点</span></div>
            <div class="amount-item-sub statistic">
              <div><span style="font-size:28px">{{overviewNum.site}}</span><span>个</span></div>
              <div v-show="overviewNum.increase!=0">
                <div>
                  <span>{{overviewNum.increase}}</span><span class="iconfont icon-jiantou"></span>
                </div>
                <div><span>同比上周</span></div>
              </div>
            </div>
          </div>
          <div class="icon-bg iconfont icon-zhandian"></div>
        </div>
        <div class="amount-item green-gradient">
          <div>
            <div><span>周边及上游关联企业数</span></div>
            <div class="amount-item-sub">
              <span style="font-size:28px">{{overviewNum.qy}}</span><span>个</span>
            </div>
          </div>
          <div class="icon-bg iconfont icon-qiye"></div>
        </div>
      </div>
    </div>
    <div class="overview-item">
      <div class="heading"><span>上游监测点</span></div>
      <div class="content">
        <div class="content-item" v-for="(item,index) in siteList" :key="'site'+index">
          <span :class="item.icon"></span>
          <span>{{item.qy}}</span>
        </div>
      </div>
    </div>
    <div class="overview-item">
      <div class="heading"><span>周边企业</span></div>
      <div class="content">
        <div class="content-item" v-for="(item,index) in aroundQy" :key="'around'+index">
          <span :class="item.icon"></span>
          <span>{{item.qy}}</span>
        </div>
      </div>
    </div>
    <div class="overview-item">
      <div class="heading"><span>上游企业 </span></div>
      <div class="content">
        <div class="content-item" v-for="(item,index) in shangyouQy" :key="'shangyou'+index">
          <span :class="item.icon"></span>
          <span>{{item.qy}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Emit,
  Model,
  Watch
} from 'vue-property-decorator'
import {State,Mutation,Action,namespace} from 'vuex-class'
import {networkApi} from '@/api';
@Component
export default class OverView extends Vue {
  @State netWork:any;
  overviewNum:any = {};
  siteList:any[] = [
    {
      icon:'blue-state iconfont icon-dizhi',
      qy:'河定桥路口点'
    },
    {
      icon:'blue-state iconfont icon-dizhi',
      qy:'河定桥路口点'
    },
    {
      icon:'blue-state iconfont icon-dizhi',
      qy:'河定桥路口点'
    },
   
  ];
  aroundQy:any[] = [
    {
      icon:'blue-state iconfont icon-qiye',
      qy:'XXXX冶金有限公司'
    },
    {
      icon:'blue-state iconfont icon-qiye',
      qy:'XXXX冶金有限公司'
    },
    {
      icon:'blue-state iconfont icon-qiye',
      qy:'XXXX冶金有限公司'
    },
  ];
  shangyouQy:any[] = [
    {
      icon:'blue-state iconfont icon-qiye',
      qy:'XXXXX冶金有限公司'
    },
    {
      icon:'blue-state iconfont icon-qiye',
      qy:'XXXXX冶金有限公司'
    },
    {
      icon:'blue-state iconfont icon-qiye',
      qy:'XXXXX冶金有限公司'
    },
  ]
  // 监测总览
  overviewParams:any = {
    gwId:''
  }
  mounted(){
    this.getOverview();
  }
  async getOverview(){
    let that = this;
    that.siteList = [];
    that.aroundQy = [];
    that.shangyouQy = [];
    that.overviewParams.yjId = that.netWork.row.YJID;
    const overviewData = await networkApi.getOverviewData(that.overviewParams);
    let {increaserate,upstreamdevice,aroundenterprise,upstreamenterprise,devicenum,enterprisenum} = overviewData;
    that.siteList = upstreamdevice.map((item:any) => {
      return {icon:'blue-state iconfont icon-dizhi',qy:item.sbmc};
    });
    that.aroundQy = aroundenterprise.map((item:any) => {
      return {icon:'blue-state iconfont icon-qiye',qy:item.qymc};
    })
    that.shangyouQy = upstreamenterprise.map((item:any) => {
      return {icon:'blue-state iconfont icon-qiye',qy:item.qymc};
    })
    that.overviewNum = {
      site:devicenum,
      qy:enterprisenum,
      increase:increaserate
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/commonVariables.scss';
.overview-view {
  padding: 0 10px 10px;
  display: flex;
  height: 244px;
  overflow:auto;
  .flex-class {
    display: flex;
    align-items: center;
  }
  .overview-item {
    padding: 0 10px;
    width: 28%;
    height: 100%;
    border-right: 1px solid $border-color;
    &:first-of-type {
      padding-left: 0;
      width: 16%;
    }
    &:last-of-type {
      border-right: 0;
    }
    .heading {
      padding-bottom: 10px;
      font-size: $font-size-large;
      color: $heading-color;
    }
    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      font-size: $font-size-base;
      color: $heading-color;
      .content-item{
        padding: 5px 10px;
        margin-bottom: 10px;
        width: 48%;
        background-color: #f6f6f6;
      }
      .blue-state{
        color:$state-blue;
      }
      .amount-item {
        padding: 10px;
        margin-bottom: 10px;
        position: relative;
        width: 180px;
        height: 95px;
        border-radius: $border-radius;
        color: #ffffff;
        &-sub {
          padding: 10px 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .statistic {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .icon-bg {
          position: absolute;
          bottom: 0;
          right: 5px;
        }
        .icon-zhandian:before,
        .icon-qiye:before {
          font-size: 50px;
          color: rgba($color: #fff, $alpha: 0.15);
        }
      }
      .blue-gradient {
        background-image: $blue-gradient;
      }
      .green-gradient {
        background-image: $green-gradient;
      }
    }
  }
}
</style>
