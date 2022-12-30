<template>
<!--  泵站监测  -->
    <div class="mon-jc">
        <div class="any-tit">
            <div class="flex-class">
                <span>监测站点：</span>
                <div>
                    <span>{{lists[0]}}</span>
                    <span>个</span>
                </div>
            </div>
            <div class="flex-class">
                <span>实时预警率</span>
                <span>{{lists[1]}}</span>
            </div>
        </div>
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
                        <template v-if="it[index+1] == 1">
                            <img src="@/assets/monFlood/1.gif" />
                        </template>
                        <template v-if="it[index+1] == 0">
                            <img src="@/assets/monFlood/2.gif" />
                        </template>
                        <template v-if="it[index+1] == 9">
                            <img src="@/assets/monFlood/9.png" />
                        </template>
                    </a>
                </template>
                <!-- <template v-slot:action="{ row }">
                    <span style="color: #5397ff;">远控</span>
                </template> -->
            </table-page>
        </div>
        <suc-modal :config="config" v-model="model">
            <modal-bz :rowList="rowList"></modal-bz>
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
        model:boolean=false;
        rowList:any = {};
        columns:Array<any>=columns;
        tableData:Array<any>=[];
        lists:Array<any>=[];
        config: ModalConfig = {
            transfer: false,
            'footer-hide':true,
            title: "工情信息",
            width: 1000
        };
        tableHeight: any = document.documentElement.children[1].clientHeight - 280;
        tableParams:any = {
            current: 1,
            pageSize: 30,
            total:0
        };
        mounted(){
            this.getData();
            this.getTableData();
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
            this.getTableData()
        }
        getPage (page: number) {
            this.tableParams.current = page;
            this.getTableData()
        }
        rowClick(row:any){
            this.rowList = row;
            this.model = true
        }
    }
</script>
<style lang="scss" scoped>
    $deep: '::v-deep';
    .mon-jc{
        width: 100%;
        height: 100%;
        padding: 15px;
        .any-tit{
            width: 100%;
            height: 60px;
            .flex-class{
                width: calc(50% - 5px);
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                float: left;
                background-image: linear-gradient(269deg,
                        #fb6a3d 0%,
                        #ffc144 100%);
                border-radius: 4px;
                padding: 10px;
                &:nth-child(1){
                    margin-right: 10px;
                    background-image: linear-gradient(272deg,
                            #2d65d6 0%,
                            #5196ff 100%);
                    border-radius: 4px;
                }
                div{
                    span{
                        font-size: 24px;
                        &:nth-child(2){
                            margin-left: 5px;
                            font-size: 16px;
                        }
                    }
                }
                span{
                    color: #fff;
                    &:nth-child(2){
                        font-size: 24px;
                    }
                }
            }
        };
        .any-con{
            width: 100%;
            height: calc(100% - 60px);
            margin-top: 15px;
            #{$deep}.el-table table{
                width: auto !important;
            }
        }
    }
</style>
