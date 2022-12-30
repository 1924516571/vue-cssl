<template>
<!--  河道  -->
    <div class="mon-jc scroll">
        <div v-for="item in list" :key="item">
            <div class="jx"></div>
            <div class="des">
                <p >河道名称: {{item.rvnm}}</p>
                <p>河道级别: {{item.rvlv}}</p>
                <p>长度(km): {{item.rvLength}}</p>
                <p>站点名称: {{item.stnm}}</p>
                <p>实时内河水位(m): {{item.neiZ}}</p>
                <p>实时外河水位(m): {{item.neiZ}}</p>
            </div>
            
            <div class="charts">
                <v-chart
                        :options="ylOptions(item.neiZList,item.waiZList)"
                        :autoresize="true"
                        style="width:100%;height:100%;"
                ></v-chart>
            </div>
            <div class="charts bottom">
                <v-chart
                    :options="bzOptions(item.pList)"
                    :autoresize="true"
                    style="width:100%;height:100%;"
                ></v-chart>
            </div>
        </div>
        
            
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Watch,Prop } from 'vue-property-decorator'
    import { publicApi } from "@/api";
    
    @Component({
        components: {
        }
    })
    export default class MainPanel extends Vue {
        color: any[] = ["#5397ff", "#ff5a47"];
        bzList:any[]=[];
        ylList:any[]=[];
        list:any = [];
        mounted(){
            this.getList()
        }

        getList(){
            let url = "wjServer/fangxunjc/z/river"
            publicApi.getNoParam(url).then((data)=>{
                this.list = data.data
            })
        }

        bzOptions(yData:any){
            return {
                title:{
                    show:true,
                    text:'24小时雨量棒图',
                    textStyle: { 
                        fontSize: 14,
                    },
                },
                color: this.color,
                tooltip: {
                    trigger: "axis",
                },
                grid: {
                    top: "60px",
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
                        color: "#666"
                    },
                    splitLine: {
                        show: false
                    },
                    // data: this.bzList.map((it:any)=>{
                    //     return it.name
                    // })
                    // data: [1,2,3,4,5]
                    data: this.list[0]?.x
                },
                yAxis: {
                    name: "单位：mm",
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
                    // {
                    //     name: "实时雨量",
                    //     type: "bar",
                    //     stack: "总量",
                    //     barWidth: 14,
                    //     // data: this.bzList.map((it:any)=>{
                    //     //     return it.zds
                    //     // })
                    //     data:  [2,3,4,5,6]
                    // },
                    {
                        name: "累计雨量",
                        type: "bar",
                        stack: "总量",
                        // data: this.bzList.map((it:any)=>{
                        //     return it.yjzds
                        // })
                        data: yData
                        // data:  [4,1,3,2,1]

                    }
                ]
            }
        }

        ylOptions(neiData:any,waiData:any){
            return {
                color: this.color,
                title:{
                    show:true,
                    text:'内外河的24小时过程线',
                    textStyle: { 
                        fontSize: 14,
                    },
                },
                tooltip: {
                    trigger: "axis"
                },
                grid: {
                    top: "60px",
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
                        color: "#666"
                    },
                    splitLine: {
                        show: false
                    },
                    data: this.list[0]?.x
                },
                yAxis: {
                    name: "水位：m",
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
                        name: "内河",
                        type: "line",
                        stack: "总量",
                        barWidth: 14,
                        data:neiData
                    },
                    {
                        name: "外河",
                        type: "line",
                        stack: "总量",
                        data:waiData
                    }
                ]
            }
        }
    }
</script>
<style lang="scss" scoped>
    $deep: '::v-deep';
    .mon-jc{
        width: 100%;
        height: 100%;
        padding: 15px;
        overflow: auto;
        .jx{
            width: 50px;
            height: 5px;
            background-color: rgb(98, 98, 196);
        }
        p{
            font-size: 13px;
            color: rgb(115, 121, 119);
            margin-left: 10px;
            display: inline-block;
            width: calc(50% - 10px) ;
            margin-bottom: 5px;
        }
        .charts{
            height: 200px;
            border: 1px solid rgba(223, 219, 219,0.3);
            margin-bottom: 10px;
        }
        .bottom{
            margin-bottom: 40px;
        }
        .des{
            box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
            border-radius: 3px;
            background: #fff;
            padding: 10px;
        }
    }
</style>
