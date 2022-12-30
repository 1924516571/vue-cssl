<template>
<!--  防汛组织  -->
    <div class="mon-body scroll">
        <suc-select
            v-model="type"
            @on-change="changeType"
            :options="typeOptions"
            :config="{
              clearable: true,
              size:'small',
            }"
            class="sel"
          >
          </suc-select>
        <div v-for="(item) in list" :key="item">
            姓名：{{item.principal}}   手机号：{{item.phone}}
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
        type:any = '1';
        typeOptions:any = [
        ]
        list:any = [];
        mounted(){
            this.getDropDown();
            this.getData();
        }

        changeType(){
            this.getData()
        }

        async getDropDown(){
         let url  = 'wjServer/fangxunjc/contacts/fxDeptGrouping';
            var  data = await publicApi.getNoParam(url)
            this.type = data.data[0].code
            this.typeOptions = data.data.map((item:any,index:any)=>{
                return {
                    label:item.name,
                    value:item.code,
                }
            })
        }

        async getData(){
            let url  = 'wjServer/fangxunjc/contacts/fxDeptList';
            var  data = await publicApi.getWithParam(url,{group:this.type})
            console.log("8980",data);
            this.list = data.data
        }
    }
</script>
<style lang="scss" scoped>
    .mon-body{
        width: 102%;
        height: calc(100% - 60px);
        overflow: auto;
        margin-bottom: 10px;
        .charts{
            width: 100%;
            height: 100%;
        }
        div{
            margin-top: 15px;
            margin-left: 20px;
            font-size: 14px;
        }
        .sel{
            width: 8%;
            position:absolute;
            bottom:25.5%;
            left:75%;
        }
    }
</style>
