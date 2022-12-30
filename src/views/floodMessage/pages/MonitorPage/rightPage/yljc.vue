<template>
    <!-- 雨量监测 -->
    <div class="mon-jc">
        <div class="any-tit">
            <suc-date-picker v-model="timers" style="width:calc(100% - 70px);margin-right:10px;"></suc-date-picker>
            <suc-button style="vertical-align: top" type="primary" :config="{ghost: true}" @on-click="search">搜索</suc-button>
            <div class="chart">
                <v-chart
                        :options="barOptions"
                        :autoresize="true"
                        style="width:100%;height:100%"
                ></v-chart>
            </div>
        </div>
        <div class="any-con">
            <table-component :columns="columns" :customHeight="tableHeight" :tableData="tableData" @row-click="rowClick">
            </table-component>
        </div>
        <suc-modal :config="config" v-model="model">
            <modal-yl v-if="model"></modal-yl>
        </suc-modal>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Watch,Prop } from 'vue-property-decorator'
    import { TableComponent } from '@/components'
    import { ModalYl } from "./components";
    import { SucModal,SucDatePicker,SucButton } from '@suc/ui'
    import { ModalConfig } from '@suc/ui/interfaces'
    import {getRiverSta,getRainMon} from '@/api/flood/floodmange'
    const columns = [
        {
            type: 'index',
            title: '序号'
        },
        // {
        //     title: '区域',
        //     key: 'pqmc'
        // },
        {
            title: '点位名称',
            key: 'name'
        },
        {
            title: '累计雨量',
            key: 'value'
        }
    ];
    @Component({
        components: {
            TableComponent,
            ModalYl,
            SucModal,
            SucDatePicker,
            SucButton
        }
    })
    export default class yljc extends Vue {
        model:boolean=false;
        timers:any = new Date();
        total: number | string = 0; // 数据总数
        columns:Array<any>=columns;
        tableData:Array<any>=[];
        config: ModalConfig = {
            transfer: false,
            'footer-hide':true,
            title: "工情信息",
            width: 1000
        };
        category: any[] = []; // 类别
        datas: any[] = [];
        totalArr: any[] = [];
        params:any={};
        tableHeight: any = document.documentElement.children[1].clientHeight - 410;
        rowClick(){
            this.model = true;
        }
        get barOptions(){
            return {
                xAxis: {
                    max: this.total,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                grid: {
                    left: '30%',
                    top: '5%', // 设置条形图的边距
                    right: '20%',
                    bottom: '5%'
                },
                yAxis: [
                    {
                        type: 'category',
                        inverse: true,
                        data: this.category,
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        // 内
                        type: 'bar',
                        barWidth: 14,
                        legendHoverLink: false,
                        silent: true,
                        itemStyle: {
                            normal: {
                                color: '#5397ff'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'left',
                                formatter: '{b}',
                                textStyle: {
                                    color: '#666666',
                                    fontSize: 14
                                }
                            }
                        },
                        data: this.category,
                        z: 1,
                        animationEasing: 'elasticOut'
                    },
                    {
                        // 外边框
                        type: 'pictorialBar',
                        symbol: 'rect',
                        symbolBoundingData: this.total,
                        itemStyle: {
                            normal: {
                                color: 'none'
                            }
                        },
                        label: {
                            normal: {
                                formatter: (params: any) => {
                                    let text:any = '';
                                    text = '{f|  ' + params.data + '}'
                                    return text
                                },
                                rich: {
                                    a: {
                                        color: 'red'
                                    },
                                    b: {
                                        color: 'blue'
                                    },
                                    c: {
                                        color: 'yellow'
                                    },
                                    d: {
                                        color: 'green'
                                    },
                                    f: {
                                        color: '#666'
                                    }
                                },
                                position: 'right',
                                distance: 0, // 向右偏移位置
                                show: true
                            }
                        },
                        data: this.datas,
                        z: 0,
                        animationEasing: 'elasticOut'
                    },
                    {
                        name: '外框',
                        type: 'bar',
                        barGap: '-100%', // 设置外框粗细
                        data: this.totalArr,
                        barWidth: 14,
                        itemStyle: {
                            normal: {
                                color: '#ebf1f6', // 填充色
                                label: {
                                    // 标签显示位置
                                    show: false,
                                    position: 'top' // insideTop 或者横向的 insideLeft
                                }
                            }
                        },
                        z: 0
                    }
                ]
            }
        }
        mounted(){
            this.getData();
            // this.getTableData();
        }
        async getData(){
            this.category = [];
            this.datas = [];
            this.totalArr = [];
            this.total = 0;
            this.params = {
                time:this.$utils.dateFormat(new Date(this.timers),'yyyy-MM-dd')
            };
            let data = await getRiverSta(this.params);
            if(data && data.length > 0){
                this.category = data.map((it:any) => {
                    return {
                        name:it.rvnm,
                        value: parseFloat(it.jyl)
                    }
                });
                this.datas = data.map((it:any) => {
                    return parseFloat(it.jyl)
                });
                this.total = Math.max(...this.datas) + Math.min(...this.datas);
                if(this.total == 0)this.total=10
                data.forEach((it:any)=>{
                    this.totalArr.push(this.total)
                });
                this.tableData = this.category
            }
        }
        // async getTableData () {
        //     this.tableData = [];
        //     this.params = {
        //         time:this.$utils.dateFormat(new Date(this.timers),'yyyy-MM-dd')
        //     };
        //     let data = await getRainMon(this.params);
        //     this.tableData = data;
        // }
        //搜索
        search(){
            this.getData();
            // this.getTableData();
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
            height: 255px;
            .chart{
                width: 100%;
                height: 220px;
            }
        };
        .any-con{
            width: 100%;
            height: calc(100% - 255px);
            #{$deep}.el-table table{
                width: auto !important;
            }
        }
    }
</style>
