<template>
  <div class="main_view">
    <nav-bar></nav-bar>
    <geology-information></geology-information>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { geologyInformation, NavBar } from "./components";
@Component({
  components: {
    geologyInformation,
    NavBar,
  },
})
export default class ModuleView extends Vue {}
</script>
<style lang="scss" scoped></style>
