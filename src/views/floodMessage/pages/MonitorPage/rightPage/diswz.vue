<template>
<!--  防汛调度物资  -->
    <div class="mon-body">
        <div class="charts">
            <v-chart
                    :options="barOptions"
                    :autoresize="true"
                    style="width:100%;height:100%"
            ></v-chart>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Watch } from 'vue-property-decorator'
    import { getPlwzList } from '@/api/flood/floodmange'
    @Component({
        components: {
        }
    })
    export default class MainPanel extends Vue {
        legendData:Array<any>=[];
        yAxisList:Array<any>=[];
        list:Array<any>=[];
        get barOptions(){
            return {
                color: ['#2869d9', '#ff5a47', '#ffab3d', '#5397ff'],
                legend: {
                    left: '5%',
                    itemWidth: 10,
                    itemHeight: 10,
                    icon: 'circle',
                    textStyle: {
                        color: '#666666'
                    },
                    data: this.legendData
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    top: '40px',
                    right: '15%',
                    left: '10%',
                    bottom: '5%',
                    containLable: true
                },
                xAxis: {
                    type: 'value',
                    position: 'top',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#666'
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'category',
                    name: '数量',
                    nameTextStyle: {
                        padding: [0, 37, -8, 0],
                        color: '#999'
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        color: '#999'
                    },
                    data: this.yAxisList
                },
                series: this.list
            }
        }
        mounted(){
            this.getData();
        }
        async getData(){
            this.list = [];
            this.yAxisList = [];
            let data = await getPlwzList();
            data.list = data.list.reverse()
            data.tj = data.tj.reverse()
            this.legendData = data.list;
            if(this.legendData.length > 0){
                this.legendData.forEach((it:any)=>{
                    this.list.push({
                        name: it,
                        type: 'bar',
                        stack: '总量',
                        barWidth: 8,
                        data: []
                    });
                })
            }
            if(data.tj && data.tj.length > 0){
                data.tj.forEach((it:any)=>{
                    this.yAxisList.push(it.name);
                    this.list.forEach((res:any)=>{
                        res.data.push(it[res.name])
                    })
                })
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
