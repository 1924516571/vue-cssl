<template>
  <!-- 预警信息 -->
  <div class="table-chart-view">
    <div class="top-nav">
        <div class="top-nav-item">
          <div class="btn">
            <suc-select
              v-model="alarmParams.pqId"
              :options="pqOptions"
              :config="{ placeholder: '区域', clearable: true }"
              style="width:160px"
              @on-change="changePq"
            ></suc-select>
          </div>
          <div class="btn">
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="-"
              style="width: 320px; margin-right: 10px"
              size="small"
              format="yyyy-MM-dd HH:mm:ss"
              @change="getDate"
            ></el-date-picker>
          </div>
          <div class="btn">
            <search-component placeholderTxt="监测点名称" @input="onSearch"></search-component>
          </div>
         
        </div>
      </div>
      <div class="content">
        <div class="content-item">
          <table-page
            :columns="columns"
            :tableData="tableData"
            :pageParams="pageParams"
            @get-page="getPage"
            @get-size="getSize"
          ></table-page>
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
import {State,Mutation} from 'vuex-class'
import { SucSelect, SucButton, SucDatePicker } from '@suc/ui'
import {
  SelectConfig,
  SelectOptions
} from '@suc/ui/interfaces'
import { DatePickerOptions } from '@suc/ui/interfaces'
import { SearchComponent, TablePage } from '@/components'
import { alarmApi } from '@/api'
@Component({
  components: {
   SucButton,
    SucSelect,
    SucDatePicker,
    SearchComponent,
    TablePage
  }
})
export default class AbnormalRecord extends Vue {
  @State netWork: any
  pqOptions: SelectOptions = []
  changePq (id: any) {
    this.alarmParams.pqId = id
  }
  date: any = ''
  columns: any[] = [
    {
      type: 'index',
      title: '序号'
    },
    {
      title: '片区名称',
      key: 'pqmc'
    },
    {
      title: '管网名称',
      key: 'gwmc'
    },
    {
      title: "预警内容",
      key: "nr",
      width:'500'
    },
    {
      title: '预警开始时间',
      key: 'KSSJ'
    },
    {
      title: '预警结束时间',
      key: 'JSSJ'
    }
    // {
    //   title: "操作",
    //   slot: "operation"
    // }
  ]
  tableData: any[] = []
  alarmParams: any = {
    currentPage: 1,
    jssj: '',
    kssj: '',
    mc: '',
    pageSize: 10,
    pqId: '',
    sbId:''
  }
  pageParams: any = {
    total: 0,
    current: 1,
    pageSize: 10
  }
  mounted () {
    this.getPq()
    this.getAlarmInfo()
  }
  getDate (date: any) {
    this.alarmParams.kssj = this.$utils.dateFormat(date[0],"yyyy-MM-dd HH:mm:ss")
    this.alarmParams.jssj = this.$utils.dateFormat(date[1],"yyyy-MM-dd HH:mm:ss")
  }
  async getPq () {
    let data = await alarmApi.getPq()
    this.pqOptions = data.map((e: any) => {
      return {
        value: e[0],
        label: e[1]
      }
    })
  }
  async getAlarmInfo () {
    let url = 'jnsw/pipenetwork/alarm'
    this.tableData = []
    this.alarmParams.sbId = this.netWork.row.SBID
    this.alarmParams.currentPage = this.pageParams.current
    this.alarmParams.pageSize = this.pageParams.pageSize
    let data = await alarmApi.getAlarmInfo(this.alarmParams, url)
    this.pageParams.total = data.totalCount
    this.tableData = data.data.map((e:any) => {
      let item = {
        pqmc:e.qymc,
        gwmc:e.SBMC,
        KSSJ:e.KSSJ,
        JSSJ:e.JSSJ,
        nr:''
      }
      item.nr = e.SBMC + '于' + e.KSSJ + '起水位高于设定的' + e.TPSW + '米预警水位，开始水位' + e.KSZ
      return item
    })
    // this.tableData = data.data
  }
  getPage (page: number) {
    this.pageParams.current = page
    this.getAlarmInfo()
  }
  getSize (size: number) {
    this.pageParams.current = 1
    this.pageParams.pageSize = size
    this.getAlarmInfo()
  }
  // 搜索
  onSearch(val:string){
    this.alarmParams.mc = val;
    this.getAlarmInfo()
  }
}
</script>
<style lang="scss" scoped>
.table-chart-view {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  font-size: 14px;
  .top-nav {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    &-item {
      display: flex;
      .btn {
        margin-right: 10px;
      }
    }
  }
  .content {
    padding: 10px;
    height: calc(100% - 62px);
    
    &-item {
      height: 100%;
    }
  }
}
</style>
