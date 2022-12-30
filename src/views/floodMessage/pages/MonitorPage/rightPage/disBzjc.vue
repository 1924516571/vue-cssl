<template>
<!--  防汛调度泵站  -->
    <div class="mon-jc" ref="disBzjc">
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
                    <a v-for="(it,index) in row.bjzts" :key="index">
                        <a v-for="(res,idx) in it" :key="idx">
                            <img v-if="res == 1" src="@/assets/monFlood/1.gif"/>
                            <img v-else src="@/assets/monFlood/2.gif"/>
                        </a>
                    </a>
                </template>
                <!-- <template v-slot:action="{ row }">
                    <span style="color: #5397ff;">远控</span>
                </template> -->
            </table-page>
        </div>
        <suc-modal :config="config" v-model="model">
            <modal-bz></modal-bz>
        </suc-modal>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Watch,Prop } from 'vue-property-decorator'
    import { TablePage } from '@/components'
    import { ModalBz } from "./components";
    import { SucModal } from '@suc/ui'
    import { ModalConfig } from '@suc/ui/interfaces'
    import {getStatisticBzsbs} from '@/api/flood/floodmange'
    import {floodData} from '@/api'
    import {getDispatchBz} from '@/api/flood/floodmange'
    const columns = [
        {
            type: 'index',
            title: '序号',
            width:60
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
            title: '泵机状态',
            slot: 'zt',
            width:90
        },
        {
            title: '水位',
            key: 'upsw',
            width:60
        },
        // {
        //     title: '操作',
        //     slot: 'action',
        //     width:60
        // },
    ];
    @Component({
        components: {
            TablePage,
            ModalBz,
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
            this.bzParams.bzids = val.map((e:any) => e.mid)
            this.getDisBz()
        }

        model:boolean=false;
        columns:Array<any>=columns;
        tableData:Array<any>=[];
        lists:Array<any>=[];
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
        bzParams:any = {
            bzids:[],
            currentPage:1,
            pageSize:30
        }
        mounted(){
            // this.getData()
            // this.getTableData()
        }
        async getDisBz(){
            let data = await getDispatchBz(this.bzParams);
            this.tableData = data.data;
            this.tableParams.total = data.totalCount
        }
        async getData () {
            this.lists = [];
            const data = await getStatisticBzsbs();
            this.lists = data;
        }
        async getTableData () {
            this.tableData = [];
            let url = "jnsw/floodsituation/pump/real";
            let data = await floodData.getFlood(url,this.tableParams);
            this.tableData = data.data;
            this.tableParams.total = data.totalCount
        }
        // 分页
        getSize (size: number) {
            this.tableParams.current = 1;
            this.tableParams.pageSize = size;
            this.getDisBz()
        }
        getPage (page: number) {
            this.tableParams.current = page;
            this.getDisBz()
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
