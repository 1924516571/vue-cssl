<template>
  <div class="table-view">
    <div>
      <suc-table
        :data="tableData"
        :height="tableHeight"
        stripe
        size="mini"
        :row-class-name="tableRowClassName"
      >
        <suc-table-column type="index" label="序号"></suc-table-column>
        <suc-table-column prop="area" label="区域"> </suc-table-column>
        <suc-table-column prop="name" label="管网名称"> </suc-table-column>
        <suc-table-column prop="site" label="站点名称"> </suc-table-column>
        <suc-table-column prop="level" label="最新水位">
          <template slot-scope="scope">
            <span>{{ scope.row.level }}</span>
            <span
              v-if="scope.row.state == '降'"
              class="iconfont icon-jiantouxia"
            ></span>
            <span
              v-else-if="scope.row.state == '升'"
              class="arrow-up iconfont icon-jiantou"
            ></span>
            <span v-else>-</span>
          </template>
        </suc-table-column>
      </suc-table>
    </div>
    <div>
      <suc-page :total="100" size="small" show-sizer show-elevator />
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
import { SucTable, SucTableColumn, SucPage } from '@suc/ui'

@Component({
  components: {
    SucTable,
    SucTableColumn,
    SucPage
  }
})
export default class ModuleView extends Vue {
  // tableHeight:number = 300;
  tableHeight: any = document.documentElement.children[1].clientHeight - 360
  tableHeader: any = [
    {
      title: '序号',
      type: 'index'
    },
    {
      title: '区域',
      key: 'area'
    },
    {
      title: '管网名称',
      key: 'name'
    },
    {
      title: '站点名称',
      key: 'site'
    },
    {
      title: '最新水位',
      key: 'water'
    }
  ]
  tableData: any = [
    {
      area: 'A片区',
      name: 'A-001',
      site: '和定桥点',
      level: '1.2',
      state: '升'
    },
    {
      area: 'A片区',
      name: 'A-001',
      site: '和定桥点',
      level: '1.2',
      state: '降'
    },
    {
      area: 'A片区',
      name: 'A-001',
      site: '和定桥点',
      level: '1.2',
      state: '-'
    },
    {
      area: 'A片区',
      name: 'A-001',
      site: '和定桥点',
      level: '1.2',
      state: '升'
    },
    {
      area: 'A片区',
      name: 'A-001',
      site: '和定桥点',
      level: '1.2',
      state: '升'
    },
    {
      area: 'A片区',
      name: 'A-001',
      site: '和定桥点',
      level: '1.2',
      state: '升'
    },
    {
      area: 'A片区',
      name: 'A-001',
      site: '和定桥点',
      level: '1.2',
      state: '升'
    },
    {
      area: 'A片区',
      name: 'A-001',
      site: '和定桥点',
      level: '1.2',
      state: '升'
    },
    {
      area: 'A片区',
      name: 'A-001',
      site: '和定桥点',
      level: '1.2',
      state: '升'
    },
    {
      area: 'A片区',
      name: 'A-001',
      site: '和定桥点',
      level: '1.2',
      state: '升'
    }
  ]
  tableRowClassName ({ row }: any) {
    if (row.state === '降') {
      return 'warning-row'
    }
    return ''
  }
  // mounted(){
  //   this.tableHeight = document.documentElement.children[1].clientHeight - 300;
  // }
}
</script>
<style lang="scss">
.table-view {
  .el-table .warning-row {
    color: #ff5a47;
  }
}
</style>
<style lang="scss" scoped>
.table-view {
  width: 100%;
  height: 100%;
  position: relative;
  > div {
    &:nth-of-type(2) {
      padding-top: 10px;
    }
  }
  .arrow-up {
    color: #32bb53;
  }
}
</style>
