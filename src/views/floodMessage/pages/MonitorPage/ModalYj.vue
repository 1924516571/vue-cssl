<template>
<!-- 气象预警 -->
    <div class="mon-wz">
        <!-- <div class="mon-nav">
            <span :class="{'active':type=='1'}" @click="type='1'">物资库存</span>
            <span :class="{'active':type=='2'}" @click="type='2'">出入明细</span>
        </div> -->
        <div class="mon-chart">
            <!-- <div class="process-item">
                <suc-select
                        v-model="wzPage.ckmc"
                        :options="ckList"
                        :config="{placeholder: '仓库名称',clearable: true}"
                        style="width:160px"
                ></suc-select>
                <suc-select
                        v-model="wzPage.wzmc"
                        :options="wzList"
                        :config="{placeholder: '物资名称',clearable: true}"
                        style="width:160px"
                ></suc-select>
                <suc-button type="primary" :debounce="800" @on-click="searchMc">搜索</suc-button>
            </div> -->
            <div class="process-item">
                <table-page
                        :columns="wzCol"
                        :tableData="wzData"
                        :pageParams="wzPage"
                        :customHeight="440"
                        @get-size="getWzSize"
                        @get-page="getWzPage"
                >
                <template v-slot:zhdj="{row}">
                    <div><span>{{zhdj[row.djys]}}</span></div>
                </template>
                </table-page>
            </div>
        </div>
        <!-- <div class="mon-chart" v-if="type=='2'">
            <div class="process-item">
                <suc-select
                        v-model="crPage.ckmc"
                        :options="ckList"
                        :config="{placeholder: '仓库名称',clearable: true}"
                        style="width:160px"
                ></suc-select>
                <suc-select
                        v-model="crPage.wzmc"
                        :options="wzList"
                        :config="{placeholder: '物资名称',clearable: true}"
                        style="width:160px"
                ></suc-select>
                <suc-select
                        v-model="crPage.crklb"
                        :options="crkList"
                        :config="{placeholder: '出入库类别',clearable: true}"
                        style="width:160px"
                ></suc-select>
                <suc-date-picker v-model="crPage.date" style="width:280px;margin-right:10px;" placeholder="出入库时间"></suc-date-picker>
                <suc-button type="primary" :debounce="800" @on-click="search">搜索</suc-button>
            </div>
            <div class="process-item">
                <table-page
                        :columns="crCol"
                        :tableData="crData"
                        :pageParams="crPage"
                        :customHeight="440"
                        @get-size="getCrSize"
                        @get-page="getCrPage"
                ></table-page>
            </div>
        </div> -->
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Watch,Prop } from 'vue-property-decorator'
    import { TablePage } from '@/components'
    import {
        SucDatePicker,
        SucButton,
        SucCol,
        SucCheckbox,
        SucCheckboxGroup,
        SucRow,
        SucSelect
    } from "@suc/ui";
    import {
        SelectConfig,
        SelectOptions
    } from '@suc/ui/interfaces'
    import {infoApi} from '@/api'
    import {getWzNums} from '@/api/flood/floodmange'
    @Component({
        components: {
            SucButton,
            SucDatePicker,
            SucCol,
            SucCheckbox,
            SucCheckboxGroup,
            SucRow,
            SucSelect,
            TablePage
        }
    })
    export default class MainPanel extends Vue {
        type:string='1';
        wzPage :any= {
            total: 0,
            current: 1,
            currentPage:1,
            pageSize: 10,
            wzmc:'',
            ckmc:''
        };
        // crPage :any= {
        //     total: 0,
        //     current: 1,
        //     currentPage:1,
        //     pageSize: 10,
        //     wzmc:'',
        //     ckmc:'',
        //     crklb:'',
        //     date:new Date()
        // };
        selOptions: SelectOptions = [];
        wzCol: any[] = [
            {
                title: "序号",
                type: "index"
            },
            {
                title: "行政区域",
                key: "xzqy"
            },
            {
                title: "标题",
                key: "bt"
            },
            {
                title: "灾害名称",
                key: "mc"
            },
            {
                title: "等级颜色",
                key: "djys",
                slot:"zhdj"
            },
            {
                title: "预警内容",
                key: "nr",
                width:200
            },
            {
                title: "防御指南",
                key: "fyzn"
            },
            {
                title: "发送人",
                key: "fsr"
            },
            {
                title: "预警时间",
                key: "tm"
            },
        ];
        wzData:any[] = [];
        // crCol: any[] =[
        //     {
        //         title: "序号",
        //         type: "index"
        //     },
        //     {
        //         title: "仓库名称",
        //         key: "ckmc"
        //     },
        //     {
        //         title: "物资名称",
        //         key: "wzmc"
        //     },
        //     {
        //         title: "物资数量",
        //         key: "sl"
        //     },
        //     {
        //         title: "计量单位",
        //         key: "dw"
        //     },
        //     {
        //         title: "出入库类别",
        //         key: "cz"
        //     },
        //     {
        //         title: "更新时间",
        //         key: "gxsj"
        //     }
        // ];
        // crData:any[] = [];
        // crkList:any=[
        //     {label:'出库',value:'出库'},
        //     {label:'入库',value:'入库'}
        // ];
        // ckList:any=[];
        // 气象灾害等级
        zhdj:any = {
            'RED':'红色',
            'ORANGE':'橙色',
            'YELLOW':'黄色',
            'BLUE':'蓝色',
            'GREEN':'综合'
        }
        wzList:any=[];
        getWzPage (page: number) {
            this.wzPage.current = page;
            this.wzPage.currentPage = page;
            this.onTableMc();
        }
        getWzSize (size: number) {
            this.wzPage.current = 1;
            this.wzPage.currentPage = 1;
            this.wzPage.pageSize = size;
            this.onTableMc();
        }
        // getCrPage (page: number) {
        //     this.crPage.current = page;
        //     this.crPage.currentPage = page;
        //     this.onTableMx();
        // }
        // getCrSize (size: number) {
        //     this.crPage.current = 1;
        //     this.crPage.currentPage = 1;
        //     this.crPage.pageSize = size;
        //     this.onTableMx();
        // }
        mounted(){
            // this.onlistCk();
            this.onlistMc();
            this.onTableMc();
            // this.onTableMx();
        }
        //获取物资仓库
        // async onlistCk () {
        //     let url = 'jnsw/wz/listCk';
        //     let data = await infoApi.onpage({}, url);
        //     this.ckList = data.data.map((it:any) => {
        //         return {
        //             value:it.ID,
        //             label:it.MC
        //         }
        //     });
        // }
        //获取物资名称
        async onlistMc () {
            let url = 'jnsw/wz/listWz';
            let data = await infoApi.onpage({}, url);
            this.wzList = data.data.map((it:any) => {
                return {
                    value:it.MC,
                    label:it.MC
                }
            });
        }
        //物资库存
        async onTableMc () {
            let url = 'jnsw/floodPrevention/warm';
            let data = await infoApi.onpage(this.wzPage, url);
            this.wzData = data.data;
            this.wzPage.total = data.totalCount
        }
        //出入明细
        // async onTableMx () {
        //     let url = 'jnsw/wz/wzcrkOfWzInfo';
        //     let data = await infoApi.onpage(this.crPage, url);
        //     this.crData = data.data;
        //     this.crPage.total = data.totalCount
        // }
        //出入明细搜索
        // search(){
        //     this.crPage.current = 1;
        //     this.crPage.currentPage = 1;
        //     this.onTableMx();
        // }
        //物资库存搜索
        searchMc(){
            this.wzPage.current = 1;
            this.wzPage.currentPage = 1;
            this.onTableMc();
        }
    }
</script>
<style lang="scss" scoped>
    $deep: '::v-deep';
    .mon-wz{
        width: 100%;
        height: 100%;
        .mon-nav{
            padding-bottom: 15px;
            span{
                display: inline-block;
                width: 80px;
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
            .process-item {
                &:first-of-type {
                    display: flex;
                    margin-bottom: 15px;
                    .suc-select{
                        margin-right: 15px;
                    }
                }
            }
        }
    }
</style>
