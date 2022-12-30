<template>
  <!--雨量棒图 -->
  <div class="process">
    <div class="process-item">
      <suc-date-picker v-model="date" :options="{ type: 'datetimerange' }" @on-change="getDate" style="width: 340px; margin-right: 10px"></suc-date-picker>
      <suc-button type="primary" :debounce="800" @on-click="getInfo">搜索</suc-button>
    </div>
    <div class="process-item">
      <div class="heading">
        <span style="line-height:30px;">所属河道:{{ river }}</span>
        <span
          >累计雨量:<i style="font-size:20px; color: #3a7bef;">{{ count }}</i
          >mm</span
        >
      </div>
      <div class="line-item">
        <div v-if="flag" class="noData">暂无数据</div>
        <v-chart v-else :options="optionsSel" :autoresize="true" style="width: 100%; height: 100%"></v-chart>
      </div>
    </div>
    <div class="process-item">
      <div class="line-item">
        <table-component :columns="columns" :tableData="tableData"></table-component>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator";
import { SucDatePicker, SucButton } from "@suc/ui";
import { DatePickerOptions } from "@suc/ui/interfaces";
import { TableComponent } from "@/components";
import { publicApi } from "@/api";
import { Style } from "ol/style";

@Component({
  components: {
    SucButton,
    SucDatePicker,
    TableComponent,
  },
})
export default class Process extends Vue {
  @Prop({
    type: Object,
    default: () => {},
  })
  row: any;
  count: any = 0;
  river: any = "";
  date: any = [new Date(new Date(new Date().getTime()).setHours(8, 0, 0, 0)), new Date()];
  flag: boolean = true;
  tableData: any[] = [];
  columns: any[] = [
    {
      title: "序号",
      type: "index",
    },
    {
      title: "站点名称",
      key: "zdmc",
    },
    {
      title: "累计雨量(mm)",
      key: "maxRain",
    },
    {
      title: "发生时间",
      key: "date",
    },
  ];
  color: any[] = ["#81D3F8", "#5f77ec", "#5397ff", "#58dde0", "#feb543"];
  optionsSel: any = {
    color: this.color,
    tooltip: {
      trigger: "axis",
      // axisPointer: {
      //   type: "bar",
      //   lineStyle: { color: "#333" },
      // },
      //  backgroundColor:'#333',
      //   formatter:function(params:any){
      //          console.log(params,"llll");
               
      //             //  let tip = auth.formatterTip(params);/*调用auth.js中的formatterTip函数，传入触发点信息参数params*/
      //              return "2342432" ;
      //          }
    },

    grid: {
      top: "15px",
      right: "45px",
      left: "55px",
      bottom: "30px",
      containLable: true,
    },

    xAxis: {
      type: "category", //x轴 的类目问题
      // boundaryGap: false,   //x轴两边留白问题
      // boundaryGap:['30%', '20%'],
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
        name: "雨量",
        type: "bar",
        lineStyle: {},
        barWidth: "20%",
        barGap: "20%",
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
      {
        name: "雨量",
        type: "line",
        lineStyle: {
          color: "#95F204",
        },
        tooltip: {
          trigger: "item",
          show: false,
        },
        data: [],
      },
    ],
  };

  hisInfo: any = null;
  detailParams: any = {
    zdbh: "",
    startTime: "",
    endTime: "",
  };
  @Watch("row", { deep: true, immediate: true })
  onRow(row: any) {
    this.getInfo();
  }

  async getInfo() {
    this.tableData = [];
    this.optionsSel.xAxis.data = [];
    this.optionsSel.series[0].data = [];
    this.optionsSel.series[1].data = [];
    this.detailParams = {
      zdbh: this.row.zdbh,
      // startTime: this.$utils.dateFormat(new Date(this.date[0]), "yyyy-MM-dd HH:mm:ss"),
      startTime: this.$utils.dateFormat(new Date(this.date[0]), "yyyy-MM-dd HH"),
      endTime: this.$utils.dateFormat(new Date(this.date[1]), "yyyy-MM-dd HH"),
    };
    let url = "wjServer/fangxunjc/yuqing/rainBarPc";
    let data = await publicApi.getWithParam(url, this.detailParams);
    this.hisInfo = data.result ? data.data.dtos : [];
    this.count = data.data.grandTotal ? data.data.grandTotal : 0;
    this.river = data.data.suoshu;
    if (this.hisInfo.length > 0) {
      this.hisInfo.forEach((e: any) => {
        this.optionsSel.xAxis.data.push(e.date);
        this.optionsSel.series[0].data.push(e.maxRain);
        this.optionsSel.series[1].data.push(e.maxRain);
      });
      this.flag = false;
      this.tableData = this.hisInfo;
    } else {
      this.flag = true;
    }
  }

  getDate(date: any) {
    this.detailParams.startTime = date[0];
    this.detailParams.endTime = date[1];
  }
}
</script>
<style lang="scss" scoped>
.process {
  width: 100%;
  height: 100%;

  .process-item {
    &:first-of-type {
      padding: 14px 14px 0; //padding 为四个参数是 代表从左--上---右---下
      display: flex;
    }

    &:nth-of-type(2) {
      height: 40%;
    }

    &:nth-of-type(3) {
      height: 65%;
    }

    .heading {
      display: flex;
      justify-content: space-between;
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
