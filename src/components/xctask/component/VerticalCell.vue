<template>
  <div class="vertical-cell">
    <div class="head">
      <span class="text" :title="label">{{label}}</span>
    </div>
    <div class="content" :style="{'min-height':minHeight+'px'}">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class VerticalCell extends Vue {
  @Prop({
    type: Number,
    default: 200
  })
  minHeight!: number;
  @Prop({
    type: String,
    default: ""
  })
  label!: string;
}
</script>
<style lang="scss" scoped>
.vertical-cell {
  width: 100%;
  .head {
    width: 100%;
    height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 20px;
    background-color: #f8f8f8;
    border: {
      bottom: solid 1px #dde4eb;
      left: solid 1px #dde4eb;
    }
    .text {
      font-family: Microsoft YaHei UI;
      font-size: 14px;
      line-height: 50px;
      letter-spacing: 1px;
      color: #333333;
    }
  }
  .content {
    width: 100%;
    border: {
      left: solid 1px #dde4eb;
    }
  }
}
</style>