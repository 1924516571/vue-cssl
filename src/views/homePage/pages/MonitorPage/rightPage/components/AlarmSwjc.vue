<template>
<!--  水位监测统计  -->
    <div class="analysis-view">
        <div class="any-tit">
            <div class="flex-class">
                <span>监测站点：</span>
                <div>
                   <!--<span>{{tjList[0]}}</span>-->
                   <span>40</span>
                   <span>个</span>
                </div>
            </div>
            <div class="flex-class">
                <span>实时预警率</span>
                <span>{{tjList[1]}}</span>
            </div>
        </div>
        <div class="any-con">
            <title-bar :list="{heading:'泵站水情',linHe:'40px'}"></title-bar>
            <div class="any-c-t">
                <span>监测报警率</span>
                <span>{{bzRate}}</span>
                <span>%</span>
            </div>
            <div class="charts">
                <v-chart
                        :options="bzOptions"
                        :autoresize="true"
                        style="width:100%;height:100%;"
                ></v-chart>
            </div>
        </div>
        <div class="any-con">
            <title-bar :list="{heading:'涵闸水情',linHe:'40px'}"></title-bar>
            <div class="any-c-t">
                <span>监测报警率</span>
                <span>{{hzRate}}</span>
                <span>%</span>
            </div>
            <div class="charts">
                <v-chart
                        :options="hzOptions"
                        :autoresize="true"
                        style="width:100%;height:100%;"
                ></v-chart>
            </div>
        </div>
        <div class="any-con">
            <title-bar :list="{heading:'雨量站',linHe:'40px'}"></title-bar>
            <div class="any-c-t">
                <span>监测报警率</span>
                <span>{{ylRate}}</span>
                <span>%</span>
            </div>
            <div class="charts">
                <v-chart
                        :options="ylOptions"
                        :autoresize="true"
                        style="width:100%;height:100%;"
                ></v-chart>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Emit, Model, Watch } from 'vue-property-decorator'
    import { TitleBar } from '@/components'
    import {getStatisticZds,getStatisticBz,getStatisticZz,getStatisticYlz} from '@/api/flood/floodmange'
    const echarts = require('echarts');
    @Component({
        components: {
            TitleBar
        }
    })
    export default class AlarmAnalysis extends Vue {
        bzRate:string='';
        hzRate:string='';
        ylRate:string='';
        color: any[] = ["#5397ff", "#ff5a47"];
        tjList:any=[];
        bzList:any[]=[];
        hzList:any[]=[];
        ylList:any[]=[];
        get bzOptions(){
            return {
                color: this.color,
                tooltip: {
                    trigger: "axis"
                },
                grid: {
                    top: "40px",
                    left: "10%",
                    right: "5%",
                    bottom: "30px",
                    containLable: true
                },
                legend: {
                    x: "right",
                    icon: "circle",
                    itemWidth: 10,
                    itemHeight: 10
                },
                xAxis: {
                    type: "category",
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        rotate: -30,
                        color: "#666"
                    },
                    splitLine: {
                        show: false
                    },
                    data: this.bzList.map((it:any)=>{
                        return it.name
                    })
                },
                yAxis: {
                    name: "单位：个",
                    nameTextStyle: {
                        color: "#999"
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        color: "#999"
                    }
                },
                series: [
                    {
                        name: "监测数量",
                        type: "bar",
                        stack: "总量",
                        barWidth: 14,
                        data: this.bzList.map((it:any)=>{
                            return it.zds
                        })
                    },
                    {
                        name: "预警数量",
                        type: "bar",
                        stack: "总量",
                        data: this.bzList.map((it:any)=>{
                            return it.yjzds
                        })
                    }
                ]
            }
        }
        get hzOptions(){
            return {
                color: this.color,
                tooltip: {
                    trigger: "axis"
                },
                grid: {
                    top: "40px",
                    left: "10%",
                    right: "5%",
                    bottom: "30px",
                    containLable: true
                },
                legend: {
                    x: "right",
                    icon: "circle",
                    itemWidth: 10,
                    itemHeight: 10
                },
                xAxis: {
                    type: "category",
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        rotate: -30,
                        color: "#666"
                    },
                    splitLine: {
                        show: false
                    },
                    data: this.hzList.map((it:any)=>{
                        return it.name
                    })
                },
                yAxis: {
                    name: "单位：个",
                    nameTextStyle: {
                        color: "#999"
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        color: "#999"
                    }
                },
                series: [
                    {
                        name: "监测数量",
                        type: "bar",
                        stack: "总量",
                        barWidth: 14,
                        data: this.hzList.map((it:any)=>{
                            return it.zds
                        })
                    },
                    {
                        name: "预警数量",
                        type: "bar",
                        stack: "总量",
                        data: this.hzList.map((it:any)=>{
                            return it.yjzds
                        })
                    }
                ]
            }
        }
        get ylOptions(){
            return {
                color: this.color,
                tooltip: {
                    trigger: "axis"
                },
                grid: {
                    top: "40px",
                    left: "10%",
                    right: "5%",
                    bottom: "30px",
                    containLable: true
                },
                legend: {
                    x: "right",
                    icon: "circle",
                    itemWidth: 10,
                    itemHeight: 10
                },
                xAxis: {
                    type: "category",
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        rotate: -30,
                        color: "#666"
                    },
                    splitLine: {
                        show: false
                    },
                    data: this.ylList.map((it:any)=>{
                        return it.name
                    })
                },
                yAxis: {
                    name: "单位：个",
                    nameTextStyle: {
                        color: "#999"
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        color: "#999"
                    }
                },
                series: [
                    {
                        name: "监测数量",
                        type: "bar",
                        stack: "总量",
                        barWidth: 14,
                        data: this.ylList.map((it:any)=>{
                            return it.zds
                        })
                    },
                    {
                        name: "预警数量",
                        type: "bar",
                        stack: "总量",
                        data: this.ylList.map((it:any)=>{
                            return it.yjzds
                        })
                    }
                ]
            }
        }
        mounted(){
            this.getData();
            this.getBzData();
            this.getHzData();
            this.getYlData();
        }
        async getData(){
            let data = await getStatisticZds();
            this.tjList = data;
        }
        async getBzData(){
            this.bzList = [];
            let data = await getStatisticBz();
            if(data) {
                Object.keys(data).forEach((key: any) => {
                    if (key == 'rate') {
                        this.bzRate = (parseFloat(data['rate']) * 100).toString();
                    } else {
                        this.bzList.push({
                            name: data[key].pqmc,
                            zds: data[key].zds,
                            yjzds: data[key].yjzds
                        })
                    }
                });
            }
        }
        async getHzData(){
            this.hzList = [];
            let data = await getStatisticZz();
            if(data) {
                Object.keys(data).forEach((key: any) => {
                    if (key == 'rate') {
                        this.hzRate = (parseFloat(data['rate']) * 100).toString();
                    } else {
                        this.hzList.push({
                            name: data[key].pqmc,
                            zds: data[key].zds,
                            yjzds: data[key].yjzds
                        })
                    }
                });
            }
        }
        async getYlData(){
            this.ylList = [];
            let data = await getStatisticYlz();
            if(data) {
                Object.keys(data).forEach((key: any) => {
                    if (key == 'rate') {
                        this.ylRate = (parseFloat(data['rate']) * 100).toString();
                    } else {
                        this.ylList.push({
                            name: data[key].pqmc,
                            zds: data[key].zds,
                            yjzds: data[key].yjzds
                        })
                    }
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .analysis-view {
        width: 100%;
        height: 100%;
        padding: 5px 15px 15px 15px;
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
        }
        .any-con{
            width: 100%;
            height: calc((100% - 60px) / 3);
            .monitoring-view{
                padding: 0;
            }
        }
        .any-c-t{
            span{
                &:nth-child(1){
                    color: #666666;
                }
                &:nth-child(2){
                    margin-left: 20px;
                    color: #ff5a47;
                    font-size: 20px;
                }
                &:nth-child(3){
                    color: #ff5a47;
                }
            }
        }
        .charts {
            height: calc(100% - 70px);
        }
    }
</style>
