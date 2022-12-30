<template>
  <!-- 待办 -->
  <div class="module-view">
    <div class="nav">
      <div class="nav-item">
        <tab-active :btns="tabs" @get-btn="getBtn" :activeIndex="activeIndex"></tab-active>
      </div>
    </div>
    <div class="content">
      <div class="content-item">
        <div class="content-item-sub bg-shadow">
          <card :pqFlag ="pqFlag" @getDept="getDept" ></card>
        </div>
        <div class="content-item-sub bg-shadow">
          <weather></weather>
        </div>
      </div>
      <div class="content-item">
        <div class="content-item-sub bg-shadow">
          <matter :pqFlag ="pqFlag" :deptId="deptId"></matter>
        </div>
        <div class="content-item-sub bg-shadow">
          <source-search></source-search>
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
import { TabActive } from '@/components'
import { Card, Matter, SourceSearch, Weather } from './pendingPage'
@Component({
  components: {
    TabActive,
    Card,
    Matter,
    SourceSearch,
    Weather
  }
})
export default class Pending extends Vue {
  tabs: any = ['片长', '部门']
  activeIndex: number = 0
  getBtn(index: number){
    this.activeIndex = index;
    if(index == 0){
      this.pqFlag = true;
    }
    else{
      this.pqFlag = false;
    }
  }
  pqFlag: boolean = true
  deptId: number = 0
  getDept(val: any){
    this.deptId = val;
  }

}
</script>
<style lang="scss" scoped>
@import '@/styles/commonVariables.scss';
.module-view {
  padding: 10px;
  background-color: $pages-bg;
  .nav {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    // &-item {
    //   // width: 160px;
    // }
  }
  .content {
    height: calc(100% - 42px);
    &-item {
      display: flex;
      &:first-of-type {
        height: 130px;
      }
      &:nth-of-type(2) {
        padding-top: 10px;
        height: calc(100% - 140px);
      }
      &-sub {
        &:first-of-type {
          margin-right: 10px;
          width: calc(80% - 10px);
        }
        &:nth-of-type(2) {
          width: 20%;
        }
      }
    }
  }
}
</style>
