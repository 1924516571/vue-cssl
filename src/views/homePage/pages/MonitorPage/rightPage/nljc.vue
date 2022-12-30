<template>
    <!-- 内涝监测 -->
    <div class="mon-jc">
        <div class="mon-nav">
            <span :class="{'active':type=='1'}" @click="type='1'">统计</span>
            <span :class="{'active':type=='2'}" @click="type='2'">列表</span>
        </div>
        <div class="mon-chart" v-if="type=='1'">
            <alarm-analysis></alarm-analysis>
        </div>
        <div class="mon-chart" v-if="type=='2'">
            <table-page
                    :tableData="tableData"
                    :columns="columns"
                    :customHeight="tableHeight"
                    :tableRowClassName="tableRowClassName"
                    :pageParams="tableParams"
                    @row-click="rowClick"
                    @get-size="getSize"
                    @get-page="getPage">
            </table-page>
        </div>
        <suc-modal :config="config" v-model="model">
            <modal-con :rowList="rowList"></modal-con>
        </suc-modal>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Watch,Prop } from 'vue-property-decorator'
    import {TablePage} from '@/components'
    import { AlarmAnalysis,ModalCon } from "./components";
    import { SucModal } from '@suc/ui'
    import { ModalConfig } from '@suc/ui/interfaces'
    import { floodApi } from '@/api'
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
            key: 'sbmc'
        },
        {
            title: '实时水位',
            key: 'sw'
        },
        {
            title: '井深',
            key: 'sd'
        },
        {
            title: '水位比',
            key: 'swproportion'
        },
    ];
    @Component({
        components: {
            AlarmAnalysis,
            ModalCon,
            TablePage,
            SucModal
        }
    })
    export default class nljc extends Vue {
        model: boolean = false;
        type:string='1';
        rowClass:string='1';
        rowList:any = {};
        columns:Array<any>=columns;
        tableData:Array<any>=[];
        tableHeight: any = document.documentElement.children[1].clientHeight - 240
        config: ModalConfig = {
            transfer: false,
            'footer-hide':true,
            title: "积淹点信息",
            width: 1000
        };
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
            const data = await floodApi.getTableData(this.tableParams);
            this.tableData = data.data;
            this.tableParams.total = data.totalCount
        }
        tableRowClassName({row}:any){
            if(parseFloat(row.swproportion) < 10){
                return 'row-gray'
            }
            if(parseFloat(row.swproportion) >= 50 && parseFloat(row.swproportion) < 70){
                return 'row-yellow'
            }
            if(parseFloat(row.swproportion) >= 70 && parseFloat(row.swproportion) < 90){
                return 'row-blue'
            }
            if(parseFloat(row.swproportion) >= 90){
                return 'row-red'
            }
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
        toggleModel() {
            this.model = !this.model;
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
            #{$deep}.el-table table{
                width: auto !important;
                .row-gray{
                    color: #b7b7b7;
                }
                .row-yellow{
                    background-color: #ffedd5;
                    border: solid 1px #ff9100;
                    color: #ff9100;
                    td{
                        background-color: #ffedd5;
                    }
                }
                .row-red{
                    background-color: #ffe3e0;
                    border: solid 1px #ce1717;
                    color: #ce1717;
                    td{
                        background-color: #ffe3e0;
                    }
                }
                .row-blue{
                    background-color: #fff;
                    border: solid 1px #5397ff;
                    color: #5397ff;
                }
            }
        }
    }
</style>
