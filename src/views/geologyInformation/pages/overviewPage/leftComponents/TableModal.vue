<template>
  <!-- 基础信息弹窗 -->
  <div class="modal-view">
    <suc-modal :config="config" :value="model" @on-visible-change="toggle">
      <div class="content">
        <panel-view heading="溧阳市别桥污水处理厂有限公司排污口">
          <div class="list">
            <div class="list-item" v-for="(item, index) in lists" :key="index">
              <div class="list-item-name">
                <span>{{ item.name }}</span>
              </div>
              <div class="list-item-value">
                <span>{{ item.value }}</span>
              </div>
            </div>
          </div>
        </panel-view>
      </div>
    </suc-modal>
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
import { SucModal } from '@suc/ui'
import { ModalConfig } from '@suc/ui/interfaces'
import { PanelView } from '@/components'
@Component({
  components: {
    SucModal,
    PanelView
  }
})
export default class ModuleView extends Vue {
  @Prop() model!: boolean
  config: ModalConfig = {
    transfer: false,
    title: '基础信息',
    width: 640
  }
  @Emit()
  toggle () {}
  lists: any[] = [
    {
      name: '建成时间',
      value: '2018-12-14'
    },
    {
      name: '设计排污能力(吨/天)',
      value: ''
    },
    {
      name: '排入水体名称',
      value: ''
    },
    {
      name: '排污口设置单位',
      value: ''
    },
    {
      name: '排污口运用情况',
      value: ''
    },
    {
      name: '所在河流名称',
      value: ''
    },
    {
      name: '岸别',
      value: ''
    },
    {
      name: '排放方式',
      value: ''
    },
    {
      name: '排放类型',
      value: ''
    },
    {
      name: '排放规律',
      value: ''
    },
    {
      name: '排放性质',
      value: ''
    },
    {
      name: '管理单位',
      value: ''
    },
    {
      name: '审批单位',
      value: ''
    },
    {
      name: '监测单位',
      value: ''
    },
    {
      name: '详细地址',
      value: ''
    }
  ]
}
</script>
<style lang="scss" scoped>
.modal-view {
    width: 100%;
    height: 100%;
  .content {
    width: 100%;
    height: 422px;
    overflow: auto;
    .list {
      height: calc(100% - 52px);
      &-item {
        padding: 8px 10px;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        &-name {
          color: #999999;
        }
        &-value {
          color: #333333;
        }
      }
    }
  }
}
</style>
