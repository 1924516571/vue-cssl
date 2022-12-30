<template>
<!--  物资情况  -->
    <div class="mon-body scroll">
        <el-cascader
              v-model="areaCode"
              :options="areaOptions"
              class="sel"
              :props="{ expandTrigger: 'hover', value: 'myId', label: 'name', children: 'children', checkStrictly: true }"
              size="mini"
              placeholder="所属区域"
              clearable
              @change="handleChange"
            ></el-cascader>
        <div class="charts">
            <div v-if="list.filter(item => item.data.length > 0).length <= 0" class="noData">暂无数据</div>
            <v-chart v-else
                    :options="barOptions"
                    :autoresize="true"
                    style="width:100%;height:100%;"
            ></v-chart>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Watch } from 'vue-property-decorator'
    import {SucSelect} from "@suc/ui";
    import { publicApi } from '@/api'

    @Component({
        components: {
            SucSelect
        }
    })
    export default class MainPanel extends Vue {
        legendData:Array<any>=[];
        yAxisList:Array<any>=[];
        list:Array<any>=[];
        areaCode:any= ['cz'];
        areaOptions: any = [];
        get barOptions(){
            return {
                color: ['#2869d9', '#ff5a47', '#ffab3d', '#5397ff'],
                legend: {
                    left: '10%',
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
                    top: '30%',
                    right: '15%',
                    left: '21%',
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

        //获取下拉行政区域下拉
        async getAreaCode() {
            let data = await publicApi.getAreaCode();
            this.areaOptions = this.getTreeData([data.data]);
        }

        getTreeData(data: any) {
            // 循环遍历json数据
            for (var i = 0; i < data.length; i++) {
            if (data[i].children.length < 1) {
                // children若为空数组，则将children设为undefined
                data[i].children = undefined;
            } else {
                // children若不为空数组，则继续 递归调用 本方法
                this.getTreeData(data[i].children);
            }
            }
            return data;
        }

        async handleChange(value: any) {
            this.areaCode = value.toString();
            console.log("76767",this.areaCode);
            
            this.getData()
        }

        mounted(){
            this.getData();
            this.getAreaCode();
        }
        async getData(){
            this.list = [];
            this.yAxisList = [];
            let url = 'wjServer/dataCenter/wuzi/home'
           publicApi.getWithParam(url, {areaCode:this.areaCode.toString()}).then((res: any) => {
                if (res.result == true) {
                    let data = res.data;
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
                                res.data.push(it.num)
                            })
                        })
                    }
                } else {
                    this.$SucMessage.info(res.desc);
                }
                });
        }
    }
</script>
<style lang="scss" scoped>
    .mon-body{
        width: 102%;
        height: calc(100% - 50px);
        overflow: auto;
        .charts{
            width: 100%;
            height: 100%;
            .noData {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .sel{
            width: 7%;
            position:absolute;
            bottom:25.5%;
            left:47%;
            bottom: 25%;
        }
    }
</style>
