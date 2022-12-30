<template>
<!--  防汛预案  -->
    <div class="mon-body">
        <div v-for="(it,idx) in fileList" :key="idx">
            <span :title="it.mc">{{it.mc}}</span>
            <span>{{it.sj}}</span>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Watch } from 'vue-property-decorator'
    import { transferYaApi } from '@/api'
    @Component({
        components: {
        }
    })
    export default class MainPanel extends Vue {
        faParams: any = {
            mc: '',
            pqID: ''
        };
        fileList:any = [];
        mounted(){
            this.getFaList();
        }
        async getFaList () {
            this.fileList = [];
            let data = await transferYaApi.getFaList(this.faParams)
            this.fileList = data.map((e: any) => {
                return {
                    mc:e[1],
                    sj:e[4]
                }
            })
        }
    }
</script>
<style lang="scss" scoped>
    .mon-body{
        width: 100%;
        height: calc(100% - 50px);
        overflow: auto;
        div{
            width: 100%;
            padding: 0 15px;
            height: 30px;
            line-height: 30px;
            display: flex;
            align-items: center;
            span{
                color: #333;
                display: inline-block;
                width: 60%;
                text-align: left;
                &:nth-child(1){
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    word-break: break-all;
                }
                &:nth-child(2){
                    width: 40%;
                    color: #999999;
                    text-align: right;
                }
            }
        }
    }
</style>
