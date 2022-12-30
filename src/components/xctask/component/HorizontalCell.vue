<template>
  <div class="horizontal-cell">
    <div class="label">
      <span class="text" :title="label">{{label}}</span>
    </div>
    <div class="content">
      <span class="text" :title="content">{{content}}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class HorizontalCell extends Vue {
  @Prop({
    type: String,
    default: ""
  })
  label!: string;
  @Prop({
    type: [String,Number],
    default: ""
  })
  content: any;
}
</script>
<style lang="scss" scoped>
.horizontal-cell {
  display: flex;
  width: 100%;
  height: 100%;
  .label {
    width: 100px;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 20px;
    background-color: #f8f8f8;
    border: {
      right: solid 1px #dde4eb;
      left: solid 1px #dde4eb;
    }
  }
  .content {
    width: calc(100% - 100px);
    height: 100%;
    padding-left: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .text {
    font-family: Microsoft YaHei UI;
    font-size: 14px;
    line-height: 50px;
    letter-spacing: 1px;
    color: #333333;
  }
}
</style>