<template>
    <div class="main_view">
        <nav-bar></nav-bar>
        <flood-message-main></flood-message-main>
    </div>
</template>
<script lang="ts">
import { Vue,Component,Prop,Emit,Model,Watch } from "vue-property-decorator";
import {FloodMessageMain,NavBar} from './components';
@Component({
    components:{
        FloodMessageMain,
        NavBar
    }
})
export default class ModuleView extends Vue{} 
</script>
<style lang="scss" scoped>

</style>