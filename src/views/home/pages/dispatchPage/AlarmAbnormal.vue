<template>
  <!-- 异常报警 -->
  <vue-seamless-scroll :data="listData" class="alarm">
    <div
      class="alarm-item"
      v-for="(item, index) in listData"
      :key="item.id"
      @click="onRow(item)"
    >
      <span
        v-text="
          `${index + 1}. ${item.zdmc}${item.jcx}于${item.kssj}持续${
            item.cxsc
          }小时不更新，请及时处理`
        "
      ></span>
    </div>
  </vue-seamless-scroll>
</template>
<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import vueSeamlessScroll from "./myClass.vue";
// import vueSeamlessScroll from "vue-seamless-scroll";
import { homeApi } from "@/api";
@Component({
  components: {
    vueSeamlessScroll,
  },
})
export default class AlarmAbnormal extends Vue {
  @Mutation setFormParams: any;
  listData: any[] = [];

  @Emit()
  onRow(item?: any) {
    this.setFormParams({
      jcdid: item.sbid,
      jcdmc: item.zdmc,
      jcdlx: item.sbtp,
      pqid: item.pqid,
      jd: item.jd,
      wd: item.wd,
      rwlx: item.rwlx,
      rwmc: item.rwlx,
      rwms: ` ${item.zdmc}${item.jcx}于${item.kssj}持续${item.cxsc}小时不更新，请及时处理`,
    });
  }

  async getList() {
    let data1 = await homeApi.getYcList1();
    let data2 = await homeApi.getYcList2();
    let list1 = [];
    let list2 = [];
    Promise.all([data1, data2]).then((values: any) => {
      list1 = values[0].data.map((item: any) => {
        item.cxsc = item.cxsc.toFixed(3);
        return item;
      });
      list2 = values[1].data.map((item: any) => {
        item.cxsc = item.cxsc.toFixed(3);
        return item;
      });
      this.listData = list1.concat(list2);
    });
  }
  mounted() {
    this.getList();
  }
}
</script>
<style lang="scss" scoped>
.alarm {
  padding: 0 10px;
  height: calc(100% - 52px);
  border-top: 1px solid #dde4eb;
  overflow: hidden;
  .alarm-item {
    padding: 10px 4px;
    color: #515a6e;
    cursor: pointer;
    &:nth-of-type(2n) {
      background-color: #f8f7f8;
    }
  }
}
</style>
