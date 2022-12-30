<template>
  <!-- 雨量站报表 -->
  <div class="water">
    <div class="water-item">
      <!-- getBtn 这个方法是子组件触发的get-btn 方法传过来的，能拿到数组的索引 -->
      <tab-active :btns="btns" :activeIndex="activeIndex" @get-btn="getBtn"></tab-active>
    </div>
    <!-- <div class="water-item">
      <div class="result" v-for="(item, index) in result" :key="index">
        <div>
          <span>{{ item.name }}</span>
        </div>
        <div>
          <span class="blue-font">{{ item.amount }}</span
          ><span>m</span><br /><span class="time">{{ item.time }}</span>
        </div>
      </div>
    </div> -->
    <div class="water-item">
      <table-component :columns="columns" :tableData="tableData"></table-component>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { TabActive, TableComponent } from "@/components";
import { floodManageApi, publicApi } from "@/api";
@Component({
  components: {
    TabActive,
    TableComponent,
  },
})
export default class Water extends Vue {
  btns: any[] = ["今日", "本月", "本年"];
  // result: any[] = [
  //   {
  //     name: "最高水位",
  //     amount: 0,
  //     time: "",
  //   },
  //   {
  //     name: "最低水位",
  //     amount: 0,
  //     time: "",
  //   },
  // ];
  columns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "时间",
      key: "jssj",
    },
    {
      title: "雨量",
      key: "jsyl",
    },
  ];
  tableData: any[] = [];
  activeIndex: number = 0;
  detailParams: any = {
    zdbh: "",
    type: "",
  };
  @Prop({
    type: Object,
    default: () => {},
  })
  row: any;
  @Watch("row", { immediate: true, deep: true })
  onRow(row: any) {
    this.getInfo();
  }
  getBtn(val: any) {
    this.activeIndex = val;
    this.getInfo();
  }

  async getInfo() {
    this.detailParams = {
      zdbh: this.row.zdbh,
    };
    switch (this.activeIndex) {
      case 0:
        this.detailParams.type = "1";
        break;
      case 1:
        this.detailParams.type = "2";
        break;
      case 2:
        this.detailParams.type = "3";
        break;
    }
    const url = "wjServer//fangxunjc/yuqing/rainReport";
    const data = await publicApi.getWithParam(url, this.detailParams);
    if (data.result == true) {
      //  this.result[0].amount = data.data.zgsw ? data.data.zgsw : 0;
      // this.result[0].time = data.data.zgTime ? data.data.zgTime : "";
      // this.result[1].amount = data.data.zdsw ? data.data.zdsw : 0;
      // this.result[1].time = data.data.zdTime ? data.data.zdTime : "";
      this.tableData = data.data; //拿到表格中的数据
    } else {
      this.tableData = [];
    }

    // this.tableData = [
    //   { time: 4.7, sw: "6.4257926" },
    //   { time: 4324, sw: "7" },
    //   { time: 4.7, sw: "6.4257926" },
    //   { time: 4324, sw: "7" },
    //   { time: 4.7, sw: "6.4257926" },
    //   { time: 4324, sw: "7" },
    //   { time: 4.7, sw: "6.4257926" },
    //   { time: 4324, sw: "7" },
    //   { time: 4.7, sw: "6.4257926" },
    //   { time: 4324, sw: "7" },
    //   { time: 4.7, sw: "6.4257926" },
    //   { time: 4324, sw: "7" },
    // ];
  }
}
</script>
<style lang="scss" scoped>
.water {
  padding: 0 14px;
  width: 100%;
  height: 100%;
  .water-item {
    &:first-of-type {
      padding: 14px 0;
      width: 176px;
    }
    &:nth-of-type(2) {
      display: flex;
      justify-content: space-between;
      .result {
        padding: 0 15px;
        font-size: 14px;
        color: #666;
        // &:first-of-type {
        //   border-right: 1px solid #dde4eb;
        // }
        .blue-font {
          font-size: 20px;
          color: #3a7bef;
        }
        .time {
          // display: inline-block;
          // padding-left: 10px;
          color: #999;
        }
      }
    }
    &:last-of-type {
      padding-top: 15px;
      height: calc(100% - 122px);
    }
  }
}
</style>
