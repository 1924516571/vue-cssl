<template>
<!--  天气  -->
    <div class="mon-body">
        <div class="tq-items">
            <weather></weather>
        </div>
        <div class="tq-items">
            <div class="tq-wlqt" v-for="(it,idx) in dataList" :key="idx">
                <div>{{it.week}}</div>
                <div>{{it.date}}</div>
                <div>{{it.qw}}</div>
                <div>{{it.dtq == 9999?'-':it.dtq}}</div>
                <div>{{it.ntq == 9999?'-':it.ntq}}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Watch } from 'vue-property-decorator'
    import { PanelView, TabSwitch, SearchComponent, TablePage } from '@/components'
    import Weather from './Weather.vue'
    import { homeApi } from "@/api";
    @Component({
        components: {
            PanelView,
            TabSwitch,
            SearchComponent,
            TablePage,
            Weather
        }
    })
    export default class MainPanel extends Vue {
        dataList:any = [];
        mounted(){
            this.getWeather()
        }

        async getWeather() {
            let result = await homeApi.getWeather();
            this.dataList = result.data.predict.detail || [];
            if(this.dataList.length > 0){
                this.dataList.forEach((it:any)=>{
                    let week = "星期" + "日一二三四五六".charAt(new Date(it.date).getDay());
                    it.week = week;
                    it.date = this.$utils.dateFormat(new Date(it.date),'MM-dd');
                    if(parseFloat(it.day.weather.temperature) > parseFloat(it.night.weather.temperature)){
                        it.qw = (it.day.weather.temperature == 9999?'':it.day.weather.temperature) + '/' + (it.night.weather.temperature == 9999?'':it.night.weather.temperature) + '℃';
                    }else{
                        it.qw = (it.night.weather.temperature == 9999?'':it.night.weather.temperature) + '/' + (it.day.weather.temperature == 9999?'':it.day.weather.temperature) + '℃';
                    }
                    it.dtq = it.day.weather.info
                    it.ntq = it.night.weather.info
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .mon-body{
        width: 100%;
        height: calc(100% - 50px);
        padding: 0 15px;
        .tq-items{
            width: 100%;
            height: 60px;
            &:nth-child(2){
                height: calc(100% - 60px);
                display: flex;
                color: #fff;
                .tq-wlqt{
                    width: 100%;
                    height: 100%;
                    background-image: -webkit-linear-gradient(top, rgb(13, 104, 188), rgb(114, 173, 224));
                    padding-top: 5px;
                    border-right: 1px solid rgba(255,255,255,0.15);
                    text-align: center;
                    &:nth-last-child(1){
                        border-right: none;
                    }
                }
            }
        }
    }
</style>
