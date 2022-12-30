<template>
<!--  防汛调度涵闸  -->
    <div class="mon-jc">
        <div class="any-con">
            <table-page
                    :tableData="tableData"
                    :columns="columns"
                    :customHeight="tableHeight"
                    :pageParams="tableParams"
                    @row-click="rowClick"
                    @get-size="getSize"
                    @get-page="getPage">
                <template v-slot:zt="{ row }">
                    <img v-if="row.gtopnum && (row.gtopnum > 0)" src="@/assets/monFlood/3.gif"/>
                    <img v-else src="@/assets/monFlood/4.gif"/>
                </template>
            </table-page>
        </div>
        <suc-modal :config="config" v-model="model">
            <modal-hz></modal-hz>
        </suc-modal>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Watch,Prop } from 'vue-property-decorator'
    import { TablePage } from '@/components'
    import { ModalHz } from "./components";
    import { SucModal } from '@suc/ui'
    import { ModalConfig } from '@suc/ui/interfaces'
    import {floodData} from '@/api'
    import {getValidGate,getDispatchZz} from '@/api/flood/floodmange'
    const columns = [
        {
            type: 'index',
            title: '序号'
        },
        {
            title: '区域',
            key: 'mc'
        },
        {
            title: '站点名称',
            key: 'stnm'
        },
        {
            title: '闸门开度',
            slot: 'zt'
        },
        {
            title: '水位',
            key: 'gtp'
        }
    ];
    @Component({
        components: {
            TablePage,
            ModalHz,
            SucModal
        }
    })
    export default class MainPanel extends Vue {
        @Prop({
            type:Array,
            default:() => []
        })markerInfo:any;
        @Watch('markerInfo',{deep:true,immediate:true})
        getInfo(val:any){
            this.zzParams.bzids = val.map((e:any) => e.mid)
            this.getDisZz()
        }
        model:boolean=false;
        columns:Array<any>=columns;
        tableData:Array<any>=[];
        config: ModalConfig = {
            transfer: false,
            'footer-hide':true,
            title: "工情信息",
            width: 1000
        };
        tableHeight: any = document.documentElement.children[1].clientHeight * 0.3 - 135;
        tableParams:any = {
            current: 1,
            pageSize: 30,
            total:0
        };
        zzParams:any = {
            bzids:[],
            currentPage:1,
            pageSize:30
        }
        lists:Array<any>=[];
        mounted(){
            // this.getData()
            // this.getTableData()
        }
        async getDisZz(){
            let data = await getDispatchZz(this.zzParams);
            this.tableData = data.data;
            this.tableParams.total = data.totalCount
        }
        async getData () {
            this.lists = [];
            const data = await getValidGate();
            this.lists = data;
        }
        async getTableData () {
            this.tableData = [];
            let url = "jnsw/floodsituation/sluicegate/real";
            let data = await floodData.getFlood(url,this.tableParams);
            this.tableData = data.data;
            this.tableParams.total = data.totalCount
        }
        // 分页
        getSize (size: number) {
            this.tableParams.current = 1;
            this.tableParams.pageSize = size;
            this.getDisZz()
        }
        getPage (page: number) {
            this.tableParams.current = page;
            this.getDisZz()
        }
        rowClick(){
            this.model = false;
        }
    }
</script>
<style lang="scss" scoped>
    $deep: '::v-deep';
    .mon-jc{
        width: 100%;
        height: 100%;
        .any-con{
            width: 100%;
            height: 100%;
            #{$deep}.el-table table{
                width: auto !important;
            }
        }
    }
</style>
