<template>
<!--  t台风路径弹框  -->
    <div class="mon-tf">
        <iframe :src="'http://typhoon.zjwater.gov.cn/default.aspx'" style="width: 100%;height: 650px;"></iframe>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Watch,Prop } from 'vue-property-decorator'
    @Component({
        components: {

        }
    })
    export default class MainPanel extends Vue {

    }
</script>
<style lang="scss" scoped>
    $deep: '::v-deep';
    .mon-tf{
        width: 100%;
        height: 650px;
    }
</style>
