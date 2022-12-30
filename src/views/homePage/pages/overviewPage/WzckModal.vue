<template>
  <div>
    <ol-overlay class="pop1" :position="info.coords" :offset="info.offset" category="clickLabel" ref="test">
      <div class="map-modal1">
        <div class="map-header">
          <span class="cl">{{ info.data.name }}</span>
          <img src="../../../../assets/gb.png" @click="mapClick" />
        </div>
        <div class="map-bottom">
          <div class="zbzModal scroll">
            <div class="site-item">
              <panel-view heading="物资概况">
                <div class="site-item-content">
                  <v-chart :options="options" :autoresize="true" style="width:100%;height:100%"></v-chart>
                </div>
              </panel-view>
              <!-- 表格 -->
              <div>
                <table-component :customHeight="customHeight" :columns="columns" :tableData="tableData"></table-component>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ol-overlay>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { SucSelect, SucButton, SucInput, SucFormItem, SucDatePicker, SucModal } from "@suc/ui";
import { overview, networkApi, publicApi } from "@/api";
import { PanelView, TableComponent } from "@/components";
import { Message } from "iview";
@Component({
  components: {
    SucButton,
    SucDatePicker,
    SucModal,
    PanelView,
    TableComponent,
  },
})
export default class OverView extends Vue {
  @Prop() info: any;
  mapClick() {
    this.$emit("close", false);
  }

  customHeight: any = 300;
  columns: any = [
    {
      title: "序号",
      type: "index",
    },
    {
      title: "物资名称",
      key: "wuziName",
    },
    {
      title: "数量",
      key: "num",
      //   width: 280,
    },
    {
      title: "所在仓库",
      key: "wareHouseName",
    },
    {
      title: "入库时间",
      key: "tmStr",
    },
  ];

  tableData: any = [];

  @Watch("info", { deep: true, immediate: true })
  getRow() {
    this.getEcharts();
    this.getTable();
  }
  xAxisData: any[] = [];
  seriesData: any[] = [];

  get options() {
    return {
      color: ["#ED7D31"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: "4%",
        right: "10%",
        bottom: "3%",
        containLabel: true, //防止容器覆盖其他组件
      },
      xAxis: [
        {
          type: "category",
          data: this.xAxisData,
          axisTick: {
            show: true,
            inside: true,
            lineStyle: {
              color: "#acb1b7",
            },
            alignWithLabel: true,
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#acb1b7",
            },
          },
          axisLabel: {
            color: "#666",
            interval: 0, //强制显示x轴
            rotate: -20,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            color: "#999",
            formatter: "{value}",
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            color: "#999",
          },
          splitNumber: 8,
        },
      ],
      series: [
        {
          name: "数量",
          type: "bar",
          barWidth: 22,
          data: this.seriesData,
        },
      ],
    };
  }

  //  参数
  detailParams: any = {
    ckid: "",
  };
  async getEcharts() {
    this.detailParams.ckid = this.info.data.id;
    const url = "wjServer/dataCeter/wareHouse/getWuziByCk";
    const data = await publicApi.getWithParam(url, this.detailParams);
    if (data.result == true) {
      this.xAxisData = data.data.x;
      this.seriesData = data.data.num;
    } else {
      this.$Message.error("获取数据失败");
    }
  }
  //   表格参数
  tableParams: any = {
    cknm: "",
    pageSize: "1",
    pageNumber: "1000",
  };
  async getTable() {
    this.tableParams.cknm = this.info.data.name;
    let url = "wjServer/outAndInWareHouse/page";
    let data = await publicApi.getWithParam(url, this.tableParams);
    if (data.result) {
      this.tableData = data.data.rows;
    } else {
      this.$Message.error("获取数据失败");
      this.tableData = [];
    }
  }

  mounted() {
    console.log(this.info, "kanzheli");
  }
}
</script>

<style lang="scss" scoped>
$deep: "::v-deep";
.pop1 {
  width: 1100px !important;
}
.map-modal1 {
  width: auto;
  box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.08);

  .map-header {
    width: auto;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #002060;
    color: #fff;
    padding: 0 15px;
    font-size: 20px;

    img {
      width: 10px;
      height: 10px;
      cursor: pointer;
    }
    .cl {
      color: #f7f40b;
    }
    .detail {
      position: absolute;
      right: 10%;
      cursor: pointer;
    }
  }

  .map-bottom {
    padding: 10px 10px;
    height: auto;
    .zbzModal {
      height: 600px;
      width: 100%;
      position: relative;
      overflow: auto;
      .site-item {
        font-size: 12px;
        color: #666;
        .site-item-content {
          width: 100%;
          height: 550px;
        }
      }
      //   display: flex;
      .showImg {
        width: 40%;
        height: 100%;
        // background: yellow;
        position: relative;
        padding-top: 40px;
        .img {
          width: 100%;
        }
      }
      .textDes {
        width: 60%;
        // background: pink;
        height: 100%;
        padding: 0 10px;
        line-height: 30px;
        overflow: auto;

        div {
          display: flex;
          justify-content: space-between;
          font-weight: 600;
          //   span:first-of-type {
          //     font-weight: 600;
          //   }
        }
      }
    }
  }

  .scrollsmall::-webkit-scrollbar {
    width: 4px;
  }
  .scrollsmall::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #e1e1e1;
  }
}
</style>
