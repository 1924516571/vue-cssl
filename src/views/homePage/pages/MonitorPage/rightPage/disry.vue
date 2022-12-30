<template>
<!--  防汛调度人员  -->
    <div class="mon-body">
        <div class="charts" v-if="category.length > 0">
            <v-chart
                    :options="barOptions"
                    :autoresize="true"
                    style="width:100%;height:100%;"
            ></v-chart>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Watch } from 'vue-property-decorator'
    import { getRyList } from '@/api/flood/floodmange'
    @Component({
        components: {
        }
    })
    export default class MainPanel extends Vue {
        category: any[] = []; // 类别
        total: number | string = 0; // 数据总数
        datas: any[] = [];
        totalArr:any[] = [];
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
                    left: '15%',
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
                        barWidth: 10,
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
                                    text = '{f|  ' + params.data + '人}'
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
                        barWidth: 10,
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
        }
        async getData(){
            this.category = [];
            this.datas = [];
            this.totalArr = [];
            this.total = 0;
            let data = await getRyList();
            if(data && data.length > 0){
                this.category = data.map((it:any) => {
                    return {
                        name:it.mc,
                        value:it.rysl
                    }
                });
                this.datas = data.map((it:any) => {
                    return it.rysl
                });
                this.total = Math.max(...this.datas) + Math.min(...this.datas);
                data.forEach((it:any)=>{
                    this.totalArr.push(this.total)
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .mon-body{
        width: 100%;
        height: 100%;
        .charts{
            width: 100%;
            height: 100%;
        }
    }
</style>
