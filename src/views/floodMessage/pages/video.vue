<template>
  <!-- 视频监控 -->
  <div class="module-view">
    <a href="http://10.32.226.57/license!getExpireDateOfDays.action"></a>
  </div>
</template>
<script lang="ts">
import {
  Vue,
  Component,
} from 'vue-property-decorator'
import {
  SucButton,
  SucTree,
  SucModal,
  SucForm,
  SucFormItem,
  SucSelect,
  SucInput
} from '@suc/ui'
import { SearchComponent } from '@/components'
import { infoApi } from '@/api'
import EZUIKit from "ezuikit-js";
import fileIcon from '@/constants/fileIcon'

@Component({
  components: {
    SucButton,
    SucTree,
    SucModal,
    SucForm,
    SucFormItem,
    SucSelect,
    SucInput,
    SearchComponent
  }
})
export default class TransferPlan extends Vue {
  
  url = '';
  mounted () {
  }

  
 
}
</script>
<style lang="scss" scoped>
@import '@/styles/commonVariables.scss';

</style>
