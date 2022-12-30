<template>
<!--  人员  -->
    <div class="mon-body scroll">
        <el-tag class="type" size="small">{{list.type}}</el-tag>
        <div>
            值班日期：{{list.dutydate}}  
        </div>
        <div>
            值班领导：{{list.dutyleader}}
        </div>
        <div>
            技术员：{{list.skiller}}
        </div>
        <div>
            白班人员：{{list.dayshift}}
        </div>
        <div>
            晚班人员：{{list.nightshift}}
        </div>
        <div>
            <p>备注：</p> <p> {{list.task}}</p> 
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    import { publicApi } from '@/api'
    @Component({
        components: {
        }
    })
    export default class MainPanel extends Vue {
        list:any = {}
        mounted(){
            this.getData();
        }
        async getData(){
            let url  = 'wjServer/fangxunjc/ondutyer/getOndutyer';
            var  data = await publicApi.getNoParam(url)
            this.list = data.data;
           
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
            margin-left: 25px;
            font-size: 14px;
            word-wrap: break-word;
            vertical-align: top;
        }
        p:nth-child(2){
            width: 80%;
            display: inline-block;
        }
         p:nth-child(1){
            width: 42px;
            display: inline-block;
            vertical-align: top;
        }
        .type{
            position:absolute;
            left:66%;
            bottom: 25.5%;
        }
    }
</style>
