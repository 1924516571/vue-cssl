<template>
    <!-- 水位监测 -->
    <div class="mon-jc">
        <div class="mon-nav">
            <span :class="{'active':type=='1'}" @click="type='1'">统计</span>
            <span :class="{'active':type=='2'}" @click="type='2'">列表</span>
        </div>
        <div class="mon-chart" v-if="type=='1'">
            <alarm-swjc></alarm-swjc>
        </div>
        <div class="mon-chart" v-if="type=='2'">
            <div style="padding: 0 15px;">
                <suc-select
                        v-model="hdModel"
                        :options="selOptions"
                        style="width: calc(100% - 75px);margin-right: 15px"
                ></suc-select>
                <suc-button style="vertical-align: top" type="primary" :config="{ghost: true}" @on-click="search">搜索</suc-button>
            </div>
            <div class="mon-table">
                <table-page
                        :tableData="tableData"
                        :columns="columns"
                        :customHeight="tableHeight"
                        :pageParams="tableParams"
                        @get-size="getSize"
                        @get-page="getPage">
                </table-page>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Watch,Prop } from 'vue-property-decorator'
    import {TablePage} from '@/components'
    import { AlarmSwjc } from "./components";
    import { SucSelect,SucButton } from '@suc/ui';
    import {
        SelectConfig,
        SelectOptions
    } from '@suc/ui/interfaces'
    import {getStatisticHd} from '@/api/flood/floodmange'
    import {floodData} from '@/api'
    const columns = [
        {
            type: 'index',
            title: '序号'
        },
        {
            title: '区域',
            key: 'pqmc'
        },
        {
            title: '站点名称',
            key: 'stnm'
        },
        {
            title: '实时水位',
            key: 'sw'
        },
        {
            title: '警戒水位',
            key: 'jjsw'
        },
        {
            title: '更新时间',
            key: 'gxsj',
            width:90
        }
    ];
    @Component({
        components: {
            AlarmSwjc,
            TablePage,
            SucSelect,
            SucButton
        }
    })
    export default class swjc extends Vue {
        type:string='1';
        rowClass:string='1';
        hdModel:string='1';
        columns:Array<any>=columns;
        tableData:Array<any>=[];
        selOptions: SelectOptions = [
            {label:'河道',value:'1'},
            {label:'水库',value:'2'},
            {label:'闸站',value:'3'},
            {label:'泵站',value:'4'}
        ];
        tableHeight: any = document.documentElement.children[1].clientHeight - 290;
        tableParams:any = {
            current: 1,
            pageSize: 30,
            total:0
        };
        mounted(){
            this.getTableData()
        }
        async getTableData () {
            this.tableData = [];
            let url:string = "";
            if(this.hdModel == "1"){
                url = "jnsw/floodsituation/riverway/real";
            }else if(this.hdModel == "2"){
                url = "jnsw/floodsituation/reservoir/real";
            }else if(this.hdModel == "3"){
                url = "jnsw/floodsituation/sluicegate/real";
            }else if(this.hdModel == "4"){
                url = "jnsw/floodsituation/pump/real";
            }
            let data = await floodData.getFlood(url, this.tableParams);
            if(data.data && data.data.length > 0){
                this.tableData = data.data.map((it:any) =>{
                    return {
                        pqmc:it.mc,
                        stnm:it.stnm,
                        sw:it.sw || it.ksw || it.gtq || it.upsw,
                        jjsw:(this.hdModel == "4") ? it.gsw:it.jjsw,
                        gxsj:it.gxsj
                    }
                });
            }

            this.tableParams.total = data.totalCount;
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
        //搜索
        search(){
            this.tableParams.current = 1;
            this.getTableData()
        }
    }
</script>
<style lang="scss" scoped>
    $deep: '::v-deep';
    .mon-jc{
        width: 100%;
        height: 100%;
        .mon-nav{
            padding: 15px;
            span{
                display: inline-block;
                width: 60px;
                height: 28px;
                text-align: center;
                line-height: 28px;
                background: #fff;
                color: #3a7bef;
                border-radius: 3px 0 0 3px;
                cursor: pointer;
                border: 1px solid #3a7bef;
                &:nth-child(2){
                    border-radius: 0 3px 3px 0;
                }
                &.active{
                    background: #3a7bef;
                    color: #fff;
                }
            }
        }
        .mon-chart{
            width: 100%;
            height: calc(100% - 58px);
            .suc-select{
                width: 100%;
                margin-bottom: 15px;
            }
            .mon-table{
                width: 100%;
                height: calc(100% - 50px);
            }
            #{$deep}.el-table table{
                width: auto !important;
            }
        }
    }
</style>
