<template>
    <!--  监控右侧tabs  -->
    <div class="mon-body">
        <!-- 实时雨量 -->
        <ssyl @rowEvents="rowEvents" v-if="type == 0"></ssyl>
        <!-- 重点水位 -->
        <zdsw @rowEvents="rowEvents" v-if="type == 1"></zdsw>
        <!-- 重点工程 -->
        <zdgc @rowEvents="rowEvents" v-if="type == 2"></zdgc>
        <!-- 河道 -->
        <hd v-if="type == 3"></hd>
        <!-- 运行简报 -->
        <yxjb v-if="type == 4"></yxjb>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Watch,Prop } from 'vue-property-decorator'
    import { ssyl, hd, yxjb, zdsw, zdgc, yljc } from './rightPage'
    @Component({
        components: {
            ssyl,
            hd,
            yxjb,
            zdsw,
            zdgc,
            yljc
        }
    })
    export default class MainPanel extends Vue {
        @Prop()type!: number
        @Prop() btnShow!: boolean
        @Prop() row!: any
        rowEvents(row: any) {
		    this.$emit("rowEvents", row);
	    }
    }
</script>
<style lang="scss" scoped>
    .mon-body{
        width: 100%;
        height: calc(100% - 53px);
    }
</style>
