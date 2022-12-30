<template>
  <!-- 排污企业 -->
  <div class="enterprise-view">
    <div class="enterprise-item">
      <search-component @input="getSearch"></search-component>
    </div>
    <div class="enterprise-item">
      <div class="site-amount flex-class">
        <div class="site-amount-item flex-class">
          <div v-for="(site, index) in enterpriseCount" :key="'site' + index">
            <div class="site-text flex-class">
              <span>{{ site.name }}</span>
              <span style="font-size:20px">{{ site.amount }}</span>
            </div>
            <div class="bg-icon">
              <span :class="site.iconClass"></span>
            </div>
          </div>
        </div>
        <div class="blue-bg site-text" @click="getToggle">
          <span
            style="font-size:20px"
            class="iconfont icon-jiancexiangqing"
          ></span>
        </div>
      </div>
    </div>
    <div class="table-item" @mouseenter="enterTable" @mouseleave="leaveTable">
      <table-page
        :tableData="tableData"
        :columns="enterpriseColumns"
        :customHeight="tableHeight"
        :pageParams="pageParams"
        @row-click="enterpriseClick"
        @get-page="getPage"
        @get-size="getSize"
      >
      </table-page>
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
import { TablePage, SearchComponent } from '@/components'
import {overview} from '@/api'
@Component({
  components: {
    TablePage,
    SearchComponent
  }
})
export default class Enterprise extends Vue {
  // @Prop({
  //   type: Array,
  //   default: () => []
  // })
  // tableData: any
  // @Prop({
  //   type: Array,
  //   default: () => []
  // })
  // columns: any
  // @Prop({
  //   type: Array,
  //   default: () => []
  // })
  // siteCountList: any
  // @Prop({
  //   type: Object,
  //   default: () => {
  //     return {
  //       current: 1,
  //       total: 0,
  //       pageSize: 10
  //     }
  //   }
  // })
  // pageParams: any
  // siteCountList: any[] = [
  //   {
  //     name: '排污企业个数：',
  //     amount: '666',
  //     iconClass: 'iconfont icon-qiye'
  //   }
  // ]
  enterpriseColumns: any[] = [
    {
      title: '序号',
      type: 'index'
    },
    {
      title: '区域',
      key: 'XZQY'
    },
    {
      title: '企业名称',
      key: 'QYMC',
      width: "230"
    },
    {
      title: '联系人',
      key: 'LXR'
    },
    {
      title: '联系电话',
      key: 'LXDH',
      width: "120"
    },
    {
      title: '许可证号',
      key: 'TYXYDM',
      width: "120"
    }
  ]
  tableData:any[] = []
  enterpriseCount: any[] = [
    {
      name: '排污企业数量：',
      amount: '0',
      iconClass: 'iconfont icon-qiye'
    }
  ]
  tableHeight: any = document.documentElement.children[1].clientHeight - 380
  @Emit()
  getToggle () {
    return true
  }
  @Emit()
  enterTable () {}
  @Emit()
  leaveTable () {}
  pageParams: any = {
    current: 1,
    total: 0,
    pageSize: 30
  }
   tableParams: any = {
    currentPage: 1,
    pageSize: 30,
    mc: ''
  }
  mounted(){
    this.getSewage()
  }
   async getSewage () {
    let that = this
    that.tableParams.currentPage = that.pageParams.current
    that.tableParams.pageSize = that.pageParams.pageSize
    let data = await overview.getSewage(that.tableParams)
    that.tableData = data.data
    that.enterpriseCount[0].amount = data.totalCount
    that.pageParams.total = data.totalCount
  }
  // @Emit()
  getSearch (val: string) {
    this.tableParams.mc = val
    this.getSewage()
  }
  // @Emit()
  getPage (page: number) {
    this.pageParams.current = page;
    this.getSewage()
  }
  // @Emit()
  getSize (size: number) {
    this.pageParams.current = 1;
    this.pageParams.pageSize = size
    this.getSewage()
  }

  enterpriseClick(row: any){
    console.log(row);
    this.$emit("rowClick", row)
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/commonVariables.scss';
.enterprise-view {
  width: 100%;
  height: 100%;
  padding-left: 14px;
  .enterprise-item {
    padding: 0 14px 14px 0;
  }
  .table-item {
    height: 100%;
    cursor: pointer;
  }
  .flex-class {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .site-amount {
    width: 100%;
    height: 50px;
    &-item {
      width: calc(100% - 40px);
      padding-right: 10px;

      > div {
        width: 100%;
        height: 100%;
        position: relative;
        padding: 10px 15px;
        &:first-child {
          background-image: $blue-gradient;
          border-radius: $border-radius;
        }
      }
      .bg-icon {
        position: absolute;
        top: 5%;
        right: 10px;
        color: rgba($color: #ffffff, $alpha: 0.2);
        .icon-qiye:before {
          font-size: 30px;
        }
      }
    }
    .site-text {
      font-size: $font-size-base;
      color: #ffffff;
    }
    .blue-bg {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 10px;
      height: 100%;
      background-image: $blue-gradient;
      border-radius: $border-radius;
      cursor: pointer;
    }
  }
}
</style>
