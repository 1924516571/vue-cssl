<template>
  <!-- 周边企业 -->
  <div class="company-view">
    <!-- <div class="flex-class nav">
      <div>
        <search-component></search-component>
      </div>
    </div> -->
    <div class="companys flex-class">
      <div
        class="company-item"
        v-for="(item, index) in qyList"
        :key="'qy' + index"
      >
        <div>
          <img :src="item.src" alt="企业" />
        </div>
        <div class="company-item-sub">
          <div class="heading">
            <span>{{ item.name }}</span>
          </div>
          <div>
            <span>区域：</span>
            <span>{{ item.xzqy }}</span>
          </div>
          <!-- <div>
            <span>排水许可证：</span>
            <span>{{ item.license }}</span>
          </div>
          <div>
            <span>地址：</span>
            <span>{{ item.address }}</span>
          </div> -->
        </div>
      </div>
    </div>
    <div>
      <suc-page
        :total="pageParams.total"
        :current="pageParams.current"
        :page-size="pageParams.pageSize"
        size="small"
        show-sizer
        show-elevator
        @on-change="getPage"
        @on-page-size-change="getSize"
      />
    </div>
    <div v-show="btnFlag" class="switch-btn left-btn" @click="scrollIt(1)">
      <span>＜</span>
    </div>
    <div v-show="btnFlag" class="switch-btn right-btn" @click="scrollIt(0)">
      <span>＞</span>
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
import {State} from 'vuex-class'
import { SucPage } from '@suc/ui'
import { SearchComponent } from '../../../public'
import { networkApi } from '@/api'

@Component({
  components: {
    SucPage,
    SearchComponent
  }
})
export default class PeripheralCompanies extends Vue {
  @State netWork:any;
  qyList: any[] = []
  btnFlag: boolean = true
  pageParams: any = {
    total: 0,
    pageSize: 10,
    current: 1
  }
  companyParams: any = {
    yjId: '',
    currentPage: 1,
    pageSize: 10
  }

  mounted () {
    this.getCompanies()
  }

  async getCompanies () {
    let that = this
    that.qyList = []
    that.companyParams.yjId = that.netWork.row.YJID;
    that.companyParams.currentPage = that.pageParams.current
    that.companyParams.pageSize = that.pageParams.pageSize
    const companyData = await networkApi.getConpany(that.companyParams)
    let { list, totalSum } = companyData
    that.pageParams.total = totalSum
    list.map((item: any) => {
      that.getImg(item)
    })
    if (that.qyList.length > 5) {
      that.btnFlag = true
    } else {
      that.btnFlag = false
    }
  }
  async getImg (item: any) {
    let that = this
    const res = await networkApi.getImg(item.id)
    if (res.status == 200 && res.data) {
      that.qyList.push({
        // src:res,
        src:
          that.$http.defaults.baseURL +
          '/jnsw/pipenetwork/enterprisepicture?qyId=' +
          `${item.id}`,
        name: item.qymc,
        xzqy: item.xzqy,
        license: '097874556',
        address: 'XXX路502号'
      })
    }
  }
  getPage(page:number){
    this.pageParams.current = page;
    this.getCompanies();
  }
  getSize(size:number){
    this.pageParams.current = 1;
    this.pageParams.pageSize = size;
    this.getCompanies();
  }
  scrollIt (i: number) {
    if (i == 0) {
      document.getElementsByClassName('companys')[0].scrollLeft += 140
    }
    if (i == 1) {
      document.getElementsByClassName('companys')[0].scrollLeft -= 140
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/commonVariables.scss';
.company-view {
  padding: 0 10px;
  position: relative;
  width: 100%;
  //   height: 260px;
  .flex-class {
    display: flex;
    align-items: center;
  }
  .nav {
    > div {
      width: 30%;
    }
  }
  .companys {
    padding: 10px 0;
    overflow: hidden;
    // height: calc(100% - 80px);
    .company-item {
      flex-shrink: 0;
      width: 240px;
      height: 220px;
      margin-right: 10px;
      border: 1px solid $border-color;
      > div {
        img {
          width: 100%;
          height: 130px;
        }
      }
      &-sub {
        padding: 5px 10px;
        font-size: $font-size-base;
        color: $help-color;

        .heading {
          font-size: $font-size-large;
          color: $heading-color;
        }
      }
    }
  }
  .switch-btn {
    display: flex;
    align-items: center;
    width: 28px;
    height: 38px;
    background-color: rgba($color: #000000, $alpha: 0.5);
    color: #ffffff;
    font-size: 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  .left-btn {
    position: absolute;
    top: 110px;
    left: 0;
  }
  .right-btn {
    position: absolute;
    top: 110px;
    right: 0;
  }
}
</style>
