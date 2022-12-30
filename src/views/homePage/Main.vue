<template>
<!-- 首页 -->
    <div class="main_view">
        <nav-bar></nav-bar>
        <home-page-main></home-page-main>
    </div>
</template>
<script lang="ts">
import { Vue,Component,Prop,Emit,Model,Watch } from "vue-property-decorator";
import {homePageMain,NavBar} from './components'
@Component({
    components:{
        homePageMain,
        NavBar
    }
})
export default class ModuleView extends Vue{} 
</script>
<style lang="scss" scoped>

</style>