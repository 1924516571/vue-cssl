<template>
  <!-- 创建任务事件 -->
  <suc-modal
    :config="config"
    :value="model"
    @on-visible-change="toggleModel"
    @on-ok="setTask"
    @on-cancel="toggleModel(false)"
  >
    <div class="content">
      <suc-form @validate="onValidate" :config="{ 'label-width': 100 }">
        <suc-form-item :config="{ label: '任务编号：' }">
          <suc-input
            style="width: 98%"
            v-model="formParams.taskSerialNum"
            :disabled="true"
            placeholder="20200003040 自动生成不可改"
          ></suc-input>
        </suc-form-item>
        <suc-form-item :config="{ label: '发布人：' }">
          <suc-input
            style="width: 98%"
            v-model="formParams.releaser"
            :disabled="true"
            placeholder="系统账号识别不可改"
          ></suc-input>
        </suc-form-item>
        <suc-form-item :config="{ label: '任务名称：' }">
          <suc-input
            style="width: 98%"
            v-model="formParams.taskName"
          ></suc-input>
        </suc-form-item>
        <suc-form-item :config="{ label: '接收人：' }">
          <suc-select
            style="width:98%"
            v-model="formParams.receiver"
            :options="receiveOptions"
            :config="{ clearable: true, filterable: true }"
            @on-change="getReceiverId"
          ></suc-select>
        </suc-form-item>
        <suc-form-item :config="{ label: '任务描述：' }">
          <suc-input
            style="width: 98%"
            v-model="formParams.taskDesc"
            type="textarea"
          ></suc-input>
        </suc-form-item>
        <suc-form-item :config="{ label: '上传附件：' }">
          <div class="file-btn">
            <input type="file" multiple @change="getFile" />
            <div class="file-btn-item">
              <span class="iconfont icon-shangchuan"></span>
              <span>点击上传</span>
            </div>
          </div>

          <!-- <Upload
            multiple
            :show-upload-list="true"
            :before-upload="handleUpload"
            :action="actionUrl"
          >
            <div class="uplodadBtn">
              <span class="iconfont icon-shangchuan"></span>
              <span>点击上传</span>
            </div>
          </Upload> -->
        </suc-form-item>
        <suc-form-item :config="{ label: '相关监测点：' }">
          <suc-input
            style="width: 98%"
            v-model="formParams.relPointID"
          ></suc-input>
        </suc-form-item>
        <suc-form-item :config="{ label: '任务位置：' }">
          <suc-input
            style="width: 98%"
            v-model="formParams.taskSite"
          ></suc-input>
        </suc-form-item>
        <suc-form-item>
          <div v-if="model" style="width:98%;height:159px">
            <!-- <map-manage></map-manage> -->
            <template>
              <suc-map
                ref="mapObject"
                :options="olMap.map"
                v-bind.sync="olMap.map.view"
                @singleclick="mapSingClick"
              >
                <template>
                  <ol-layer
                    v-for="(layer, index) in olMap.baseLayer"
                    :options="layer"
                    :key="'layer' + index"
                  >
                  </ol-layer>
                </template>
                <ol-markers>
                  <ol-marker
                    v-for="(marker, index) in markers"
                    :options="marker"
                    :key="'marker' + index"
                  ></ol-marker>
                </ol-markers>
              </suc-map>
            </template>
          </div>
        </suc-form-item>
      </suc-form>
    </div>
  </suc-modal>
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
import { State, Mutation, Action, namespace } from 'vuex-class'
import {
  SucModal,
  SucButton,
  SucForm,
  SucFormItem,
  SucInput,
  SucSelect
} from '@suc/ui'
import {
  FormItemConfig,
  ValidateResult,
  SelectConfig,
  SelectOptions,
  ModalConfig
} from '@suc/ui/interfaces'
import { Upload } from 'iview'
import { MapManage } from '@/components'
import { networkApi } from '@/api'
const mapStore = namespace('mapStore')

@Component({
  components: {
    SucModal,
    SucForm,
    SucFormItem,
    SucButton,
    SucInput,
    SucSelect,
    Upload,
    MapManage
  }
})
export default class CreateTask extends Vue {
  @mapStore.State olMap: any
  @State netWork: any
  @Prop() model!: boolean
  //   model: boolean = true

  config: ModalConfig = {
    transfer: false,
    title: '创建任务事件',
    width: 640
  }

  openModal () {
    this.model = true
  }

  closeModel () {
    this.model = false
  }

  @Emit()
  toggleModel (val: boolean) {}
  markers: any = []
  // formParams: any = {
  //   taskSeraiNum: '',
  //   releaser: '',
  //   taskName: '',
  //   receiver: '',

  //   taskDesc: '',
  //   file: '',
  //   relPoint: '',
  //   taskSite: ''
  // }
  formParams: any = {
    file: [],
    jd: '',
    receiver: '', //接收人
    receiverID: '',
    relPointId: '', //监测点
    relPqId: '', //片区
    releaser: '', //发布人
    releaserID: '',
    taskDesc: '', //任务描述
    taskName: '', //任务名称
    taskSerialNum: '', //任务编号
    taskSite: '', //任务位置
    wd: ''
  }

  // itemConfig: FormItemConfig = {
  //     label: 'Age',
  //     required: true,
  //     'label-width': 80
  // };

  // validator(rule: any, value: any, callback: any) {

  // }

  onValidate (ev: ValidateResult) {
    console.log(ev)
  }
  receiveOptions: SelectOptions = []
  // actionUrl: string = ''
  mapSingClick () {}
  mounted () {
    this.getMember()
    this.getNumber()
    this.getCurrentMember()
    //  this.init()
  }
  init () {
    let row = this.netWork.row
    this.formParams.relPointId = row.SBID
    this.formParams.relPqId = row.PQID
    // this.actionUrl = this.$http.defaults.baseURL + '/pipenetwork/createTaskIncident'
  }
  // 任务编号
  async getNumber () {
    this.formParams.taskSerialNum = await networkApi.getNumber(
      this.netWork.row.SBID
    )
    this.init()
  }
  // 发布人
  async getCurrentMember () {
    let that = this
    const currentMember = await networkApi.getCurrentMember()
    that.formParams.releaserID = currentMember.id
    that.formParams.releaser = currentMember.displayName
  }
  // 接收人
  async getMember () {
    let that = this
    const members = await networkApi.getMember()
    let { account } = members
    that.receiveOptions = account.map((item: any) => {
      return {
        label: item.displayName,
        value: item.id
      }
    })
  }
  getReceiverId (id: any) {
    this.formParams.receiverID = id
  }
  files: any = []
  // 文件
  getFile (file: any) {
    this.files = file.target.files
  }
  // 点击确定
  async setTask () {
    let that = this
    let arr: any = []
    let formdata: any = new FormData()
    for (let i = 0; i < this.files.length; i++) {
      formdata.append('file', this.files[i])
    }

    const taskData = await networkApi.setTask(that.formParams, formdata)

    that.toggleModel(false)
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 422px;
  width: 100%;
  overflow: auto;
  // .file-btn {
  //   position: relative;
  //   font-size: 14px;
  //   color: #3a7bef;
  //   input {
  //     margin-left: 16px;
  //   }
  //   &-item {
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     padding: 3px 8px;
  //     // width: 117px;

  //     background-color: #ffffff;
  //     border-radius: 4px;
  //     border: solid 1px #dde4eb;
  //     pointer-events: none;
  //   }
  // }
  // .uplodadBtn {
  //   padding: 0 10px;
  //   border: 1px solid #dde4eb;
  //   border-radius: 4px;
  //   color: #3a7bef;
  //   cursor: pointer;
  // }
}
</style>
