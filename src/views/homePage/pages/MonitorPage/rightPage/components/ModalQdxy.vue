<template>
<!--  启动响应  -->
    <div class="mon-zl">
        <div>
            <label>启动响应等级：</label>
            <suc-select
                    v-model="level"
                    :options="options"
                    :config="{ placeholder: '启动响应等级' }"
                    style="width:300px"
                    @on-change="levelChange"
            ></suc-select>
        </div>
        <p>
<!--            Ⅳ级响应（蓝色）<br/><br/>-->
<!--            1、出现下列情况之一者，启动Ⅳ级响应。<br/><br/>-->
<!--            （1）上级政府和有关部门发布的与本区防汛有关的Ⅳ级预警；<br/><br/>-->
<!--            （2）秦淮河东山水位8.80～9.50米；<br/><br/>-->
<!--            （3）河道水位上涨，部分河道超警戒水位；<br/><br/>-->
<!--            （4）局部地区出现内涝，内涝点位在5个以下。-->
            {{info}}
        </p>
        <div class="mon-btns" v-if="loadingShow" style="color: #ccc">
            启动应急响应
        </div>
        <div class="mon-btns" @click="onOk" v-else>
            启动应急响应
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Watch,Prop,Emit } from 'vue-property-decorator'
    import { SucSelect } from '@suc/ui'
    import {
        SelectConfig,
        SelectOptions
    } from '@suc/ui/interfaces'
    import {getEmergencyList} from '@/api/flood/floodmange'
    @Component({
        components: {
            SucSelect,
        }
    })
    export default class MainPanel extends Vue {
        @Prop()model!:boolean;
        @Prop() loadingShow!: boolean;
        level:string = "4";
        info:string = "";
        mc:string = "";
        list:Array<any>=[];
        options: SelectOptions = [
            {
                label:'Ⅳ级响应',
                value:'4'
            },
            {
                label:'Ⅰ级响应',
                value:'1'
            },
            {
                label:'Ⅱ级响应',
                value:'2'
            },
            {
                label:'Ⅲ级响应',
                value:'3'
            }
        ];

        mounted(){
            this.getLevel();
        }

        async getLevel(){
            let data = await getEmergencyList();
            this.list = data.data;
            if(this.list && this.list.length > 0){
                this.list.forEach((it:any)=>{
                    if(it.ID == this.level){
                        this.info = it.BZ;
                        this.mc = it.MC;
                    }
                })
            }
        }

        //启动响应等级选择
        levelChange(){
            if(this.list && this.list.length > 0){
                this.list.forEach((it:any)=>{
                    if(it.ID == this.level){
                        this.info = it.BZ;
                        this.mc = it.MC;
                    }
                })
            }
        }

        onOk(){
            this.$emit('onOk',this.level,this.mc)
        }

        @Watch('model',{deep:true,immediate:true})
        getInfo(){
            if (this.model) {
                this.level = "4";
                this.getLevel();
            }
        }
    }
</script>
<style lang="scss" scoped>
    $deep: '::v-deep';
    .mon-zl{
        width: 100%;
        height: 100%;
        label{
            margin-right: 10px;
        }
        p{
            margin-top: 15px;
        }
        .mon-btns{
            width: 560px;
            height: 53px;
            text-align: center;
            line-height: 53px;
            background: #F59A23;
            color: #fff;
            cursor: pointer;
            font-size: 16px;
            margin-top: 20px;
        }
    }
</style>
