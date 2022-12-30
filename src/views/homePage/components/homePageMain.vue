<template>
    <div class="main-panel">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import bus from "@/eventBus";

@Component
export default class ApictureMain extends Vue {
    isRouterAlive:boolean = true;
    reloadRouter(){
        this.isRouterAlive = false;
        this.$nextTick(()=> this.isRouterAlive = true)
    }
    mounted(){
        bus.$on('reflashAlive',this.reloadRouter)
    }
}
</script>
 <style lang="scss" scoped>
  .main-panel{
    // width: calc(100% - 175px);
     width: calc(100% - 185px);
}
 </style>

