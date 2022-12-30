<template>
<!--  人员  -->
    <div class="mon-body scroll">
        <div v-for="(item) in list" :key="item" class="des">
           <span>{{item.stationName}}</span> 于 {{item.warningStartTime}} <span>{{item.stageType == '' ? '' :item.stageType == '1' ? '内河': '外河'}}</span>水位超出当前警戒水位预警等级的阀值<span>{{item.overWarning}}</span>米,请及时处理...
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Watch } from 'vue-property-decorator'
    import { publicApi } from '@/api'

    @Component({
        components: {
        }
    })
    export default class MainPanel extends Vue {
        list:any = [];
        mounted(){
            this.getData();
        }
        async getData(){
           let url  = 'wjServer/wj/warning/getWarningInfos';
            var  data = await publicApi.getNoParam(url)
            console.log('4123423',data);
            this.list = data.data.list;
            
        }
    }
</script>
<style lang="scss" scoped>
    .mon-body{
        width: 102%;
        height: calc(100% - 60px);
        overflow: auto;
        margin-bottom: 10px;
        .charts{
            width: 100%;
            height: 100%;
        }
        div{
            margin-top: 15px;
            margin-left: 20px;
            font-size: 14px;
        }

        .des{
            span{
                font-weight: 600;
            }
        }
    }
</style>
