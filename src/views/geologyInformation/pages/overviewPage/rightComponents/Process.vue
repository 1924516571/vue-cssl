<template>
  <!-- 过程线 -->
  <div class="process">
    <div class="process-item">
      <suc-date-picker v-model="date" :options="{ type: 'datetimerange' }" @on-change="getDate" style="width: 340px; margin-right: 10px"></suc-date-picker>
      <suc-button type="primary" :debounce="800" @on-click="getAllData">搜索</suc-button>
    </div>
    <div class="process-item">
      <div class="heading">
        <span>{{ title }}</span>
      </div>
      <div class="line-item">
        <div v-if="flag" class="noData">暂无数据</div>
        <v-chart v-else :options="optionsSel" :autoresize="true" style="width: 100%; height: 100%"></v-chart>
      </div>
    </div>
    <div class="process-item">
      <div class="line-item">
        <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams" @get-size="getSize" @get-page="getPage"></table-page>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator";
import { SucDatePicker, SucButton } from "@suc/ui";
import { DatePickerOptions } from "@suc/ui/interfaces";
import { TablePage } from "@/components";
import { publicApi } from "@/api";

@Component({
  components: {
    SucButton,
    SucDatePicker,
    TablePage,
  },
})
export default class Process extends Vue {
  @Prop({
    type: Object,
    default: () => {},
  })
  row: any;
  title: string = "";
  date: any = [new Date(new Date(new Date().getTime()).setHours(8, 0, 0, 0)), new Date()];
  flag: boolean = true;
  tableData: any[] = [];
  columns: any[] = [
    {
      title: "序号",
      type: "index",
    },
    // {
    //   title: "站点名称",
    //   key: "zdmc",
    // },
    {
      title: "水位（m）",
      key: "jssw",
    },
    {
      title: "更新时间",
      key: "jssj",
    },
  ];
  color: any[] = ["#5f77ec", "#5397ff", "#58dde0", "#feb543"];
  optionsSel: any = {
    color: this.color,
    tooltip: {
      trigger: "axis",
    },
    grid: {
      top: "15px",
      right: "45px",
      left: "55px",
      bottom: "30px",
      containLable: true,
    },

    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        // rotate: -30,
        color: "#666",
        formatter: (params: any) => {
          let newParamsName = ""; // 最终拼接成的字符串
          let paramsNameNumber = params.length; // 实际标签的个数
          let provideNumber = 10; // 每行能显示的字的个数
          let rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
          /**
           * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
           */
          // 条件等同于rowNumber>1
          if (paramsNameNumber > provideNumber) {
            /** 循环每一行,p表示行 */
            for (let p = 0; p < rowNumber; p++) {
              let tempStr = ""; // 表示每一次截取的字符串
              let start = p * provideNumber; // 开始截取的位置
              let end = start + provideNumber; // 结束截取的位置
              // 此处特殊处理最后一行的索引值
              if (p == rowNumber - 1) {
                // 最后一次不换行
                tempStr = params.substring(start, paramsNameNumber);
              } else {
                // 每一次拼接字符串并换行
                tempStr = params.substring(start, end) + "\n";
              }
              newParamsName += tempStr; // 最终拼成的字符串
            }
          } else {
            // 将旧标签的值赋给新标签
            newParamsName = params;
          }
          //将最终的字符串返回
          return newParamsName;
        },
      },
      splitLine: {
        show: false,
      },
      data: [],
    },
    yAxis: {
      name: "单位：",
      nameTextStyle: {
        color: "#999",
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
    },
    series: [
      {
        name: "水位变化",
        type: "line",
        lineStyle: {},
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#5397ff", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(83,151,255,0.2)", // 100% 处的颜色
              },
            ],
          },
        },
        data: [],
      },
    ],
  };

  pageParams: any = {
    current: 1,
    total: 0,
    pageSize: 10,
  };
  hisInfo: any = null;
  detailParams: any = {
    stcd: "",
    startTime: "",
    endTime: "",
    pageSize: "",
    pageNum: "",
  };
  detailLineParams: any = {
    stcd: "",
    startTime: "",
    endTime: "",
  };

  @Watch("row", { deep: true, immediate: true })
  onRow(row: any) {
    this.getInfo();
    this.getInfoLine();
  }

  // 表单信息
  async getInfo() {
    this.tableData = [];
    this.detailParams = {
      stcd: this.row.stcd,
      startTime: this.$utils.dateFormat(new Date(this.date[0]), "yyyy-MM-dd HH:mm:ss"),
      endTime: this.$utils.dateFormat(new Date(this.date[1]), "yyyy-MM-dd HH:mm:ss"),
      pageSize: this.pageParams.pageSize,
      pageNum: this.pageParams.current,
    };
    let url = "wjServer/fangxunjc/z/linePage";
    let data = await publicApi.getWithParam(url, this.detailParams);
    if (data.result == true) {
      this.tableData = data.data.rows;
      this.pageParams.total = parseInt(data.data.total);
    } else {
      this.tableData = [];
    }
  }

  async getInfoLine() {
    this.optionsSel.xAxis.data = [];
    this.optionsSel.series[0].data = [];

    this.detailLineParams = {
      stcd: this.row.stcd,
      startTime: this.$utils.dateFormat(new Date(this.date[0]), "yyyy-MM-dd HH:mm:ss"),
      endTime: this.$utils.dateFormat(new Date(this.date[1]), "yyyy-MM-dd HH:mm:ss"),
    };
    let url = "wjServer/fangxunjc/z/line";
    let data = await publicApi.getWithParam(url, this.detailLineParams);
    if (data.data.length > 0) {
      data.data.reverse().forEach((e: any) => {
        this.optionsSel.xAxis.data.push(e.jssj);
        this.optionsSel.series[0].data.push(e.jssw);
      });
      this.flag = false;
    } else {
      this.flag = false;
    }
  }

  getAllData() {
    this.getInfoLine();
    this.getInfo(); //表格
  }
  getDate(date: any) {
    this.detailParams.startTime = date[0];
    this.detailParams.endTime = date[1];
    this.detailLineParams.startTime = date[0];
    this.detailLineParams.endTime = date[1];
  }

  getSize(size: number) {
    this.pageParams.current = 1;
    this.pageParams.pageSize = size;
    this.getInfo(); //表格
  }
  getPage(page: number) {
    this.pageParams.current = page;
    this.getInfo(); //表格
  }
}
</script>
<style lang="scss" scoped>
.process {
  width: 100%;
  height: 100%;

  .process-item {
    &:first-of-type {
      padding: 14px 14px 0;
      display: flex;
    }

    &:nth-of-type(2) {
      height: 40%;
    }

    &:nth-of-type(3) {
      height: 65%;
    }

    .heading {
      padding: 5px;
      font-size: 14px;
      color: #666;
    }

    .line-item {
      height: calc(100% - 45px);
      .noData {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
