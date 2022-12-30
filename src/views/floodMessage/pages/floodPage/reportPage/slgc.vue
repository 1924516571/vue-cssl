<template>
<!-- 水利工程 -->
  <div class="contain">
    <h1 class="contain_title">常州市武进区水利工程情况统计表</h1>
    <div class="contain_body">
      <div class="table">
        <el-table :data="tableData" :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }" height="100%">
          <el-table-column label="序号" type="index" width="50"> </el-table-column>
          <el-table-column prop="areaName" label="地区" width="180"> </el-table-column>
          <el-table-column label="大型水库">
            <el-table-column prop="xian" label="数量（座）" width="100"> </el-table-column>
            <el-table-column prop="xz" label="总库容(亿立方米)" width="100"> </el-table-column>
            <el-table-column prop="cun" label="兴利库容(亿立方米)" width="100"> </el-table-column>
            <el-table-column prop="jd" label="死库容(亿立方米)" width="100"> </el-table-column>
            <el-table-column prop="jwh" label="设计灌溉面积(万亩)" width="100"> </el-table-column>
            <el-table-column prop="jwh" label="有效灌溉面积(万亩)" width="100"> </el-table-column>
          </el-table-column>
          <el-table-column label="中型水库">
            <el-table-column prop="xian" label="数量（座）" width="100"> </el-table-column>
            <el-table-column prop="xz" label="总库容(亿立方米)" width="100"> </el-table-column>
            <el-table-column prop="cun" label="兴利库容(亿立方米)" width="100"> </el-table-column>
            <el-table-column prop="jd" label="死库容(亿立方米)" width="100"> </el-table-column>
            <el-table-column prop="jwh" label="设计灌溉面积(万亩)" width="100"> </el-table-column>
            <el-table-column prop="jwh" label="有效灌溉面积(万亩)" width="100"> </el-table-column>
          </el-table-column>
          <el-table-column label="小型水库">
            <el-table-column prop="xian" label="数量（座）" width="100"> </el-table-column>
            <el-table-column prop="xz" label="总库容(亿立方米)" width="100"> </el-table-column>
            <el-table-column prop="cun" label="兴利库容(亿立方米)" width="100"> </el-table-column>
            <el-table-column prop="jd" label="死库容(亿立方米)" width="100"> </el-table-column>
            <el-table-column prop="jwh" label="设计灌溉面积(万亩)" width="100"> </el-table-column>
            <el-table-column prop="jwh" label="有效灌溉面积(万亩)" width="100"> </el-table-column>
          </el-table-column>
          <el-table-column prop="hj" label="合计" width="100"> </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
@Component
export default class ReportSelect extends Vue {
  @Prop({
    type: String,
    default: "",
  })
  report!: any;

  @Prop({
    type: String,
    default: "",
  })
  title!: any;
  @Prop({ type: Boolean, default: "" }) clickShow!: boolean;
  tableData: any = [];
  mounted() {}
  async getData() {
    console.log("7777777");
    
    this.tableData = [
      {
        areaName: "武进",
        xian: "11",
        xz: "33",
        cun: "9",
        jwh: "3",
        jd: "12321",
        aa: 8,
        bb: "7",
        cc: "23",
        dd: "99",
        chengzhen: "3232",
        nongcun: "87",
        sunhuai: "4",
        daota: "12",
        daolu: "77723",
        siwang: "234",
        sizong: "2342234",
        xiaoji: "45645",
        zhongshang: "45645",
        total: "3454352131",
        hj: "121",
      },
      {
        areaName: "武进",
        xian: "11",
        xz: "33",
        cun: "9",
        jwh: "3",
        jd: "12321",
        aa: 8,
        bb: "7",
        cc: "23",
        dd: "99",
        chengzhen: "3232",
        nongcun: "87",
        sunhuai: "4",
        daota: "12",
        daolu: "77723",
        siwang: "234",
        sizong: "2342234",
        xiaoji: "45645",
        zhongshang: "45645",
        total: "3454352131",
        hj: "121",
      },
      {
        areaName: "武进",
        xian: "11",
        xz: "33",
        cun: "9",
        jwh: "3",
        jd: "12321",
        aa: 8,
        bb: "7",
        cc: "23",
        dd: "99",
        chengzhen: "3232",
        nongcun: "87",
        sunhuai: "4",
        daota: "12",
        daolu: "77723",
        siwang: "234",
        sizong: "2342234",
        xiaoji: "45645",
        zhongshang: "45645",
        total: "3454352131",
        hj: "121",
      },
      {
        areaName: "武进",
        xian: "11",
        xz: "33",
        cun: "9",
        jwh: "3",
        jd: "12321",
        aa: 8,
        bb: "7",
        cc: "23",
        dd: "99",
        chengzhen: "3232",
        nongcun: "87",
        sunhuai: "4",
        daota: "12",
        daolu: "77723",
        siwang: "234",
        sizong: "2342234",
        xiaoji: "45645",
        zhongshang: "45645",
        total: "3454352131",
        hj: "121",
      },
      {
        areaName: "武进",
        xian: "11",
        xz: "33",
        cun: "9",
        jwh: "3",
        jd: "12321",
        aa: 8,
        bb: "7",
        cc: "23",
        dd: "99",
        chengzhen: "3232",
        nongcun: "87",
        sunhuai: "4",
        daota: "12",
        daolu: "77723",
        siwang: "234",
        sizong: "2342234",
        xiaoji: "45645",
        zhongshang: "45645",
        total: "3454352131",
        hj: "121",
      },
      {
        areaName: "武进",
        xian: "11",
        xz: "33",
        cun: "9",
        jwh: "3",
        jd: "12321",
        aa: 8,
        bb: "7",
        cc: "23",
        dd: "99",
        chengzhen: "3232",
        nongcun: "87",
        sunhuai: "4",
        daota: "12",
        daolu: "77723",
        siwang: "234",
        sizong: "2342234",
        xiaoji: "45645",
        zhongshang: "45645",
        total: "3454352131",
        hj: "121",
      },
      {
        areaName: "武进",
        xian: "11",
        xz: "33",
        cun: "9",
        jwh: "3",
        jd: "12321",
        aa: 8,
        bb: "7",
        cc: "23",
        dd: "99",
        chengzhen: "3232",
        nongcun: "87",
        sunhuai: "4",
        daota: "12",
        daolu: "77723",
        siwang: "234",
        sizong: "2342234",
        xiaoji: "45645",
        zhongshang: "45645",
        total: "3454352131",
        hj: "121",
      },
      {
        areaName: "武进",
        xian: "11",
        xz: "33",
        cun: "9",
        jwh: "3",
        jd: "12321",
        aa: 8,
        bb: "7",
        cc: "23",
        dd: "99",
        chengzhen: "3232",
        nongcun: "87",
        sunhuai: "4",
        daota: "12",
        daolu: "77723",
        siwang: "234",
        sizong: "2342234",
        xiaoji: "45645",
        zhongshang: "45645",
        total: "3454352131",
        hj: "121",
      },
      {
        areaName: "武进",
        xian: "11",
        xz: "33",
        cun: "9",
        jwh: "3",
        jd: "12321",
        aa: 8,
        bb: "7",
        cc: "23",
        dd: "99",
        chengzhen: "3232",
        nongcun: "87",
        sunhuai: "4",
        daota: "12",
        daolu: "77723",
        siwang: "234",
        sizong: "2342234",
        xiaoji: "45645",
        zhongshang: "45645",
        total: "3454352131",
        hj: "121",
      },
      {
        areaName: "武进",
        xian: "11",
        xz: "33",
        cun: "9",
        jwh: "3",
        jd: "12321",
        aa: 8,
        bb: "7",
        cc: "23",
        dd: "99",
        chengzhen: "3232",
        nongcun: "87",
        sunhuai: "4",
        daota: "12",
        daolu: "77723",
        siwang: "234",
        sizong: "2342234",
        xiaoji: "45645",
        zhongshang: "45645",
        total: "3454352131",
        hj: "121",
      },
      {
        areaName: "武进",
        xian: "11",
        xz: "33",
        cun: "9",
        jwh: "3",
        jd: "12321",
        aa: 8,
        bb: "7",
        cc: "23",
        dd: "99",
        chengzhen: "3232",
        nongcun: "87",
        sunhuai: "4",
        daota: "12",
        daolu: "77723",
        siwang: "234",
        sizong: "2342234",
        xiaoji: "45645",
        zhongshang: "45645",
        total: "3454352131",
        hj: "121",
      },
      {
        areaName: "武进",
        xian: "11",
        xz: "33",
        cun: "9",
        jwh: "3",
        jd: "12321",
        aa: 8,
        bb: "7",
        cc: "23",
        dd: "99",
        chengzhen: "3232",
        nongcun: "87",
        sunhuai: "4",
        daota: "12",
        daolu: "77723",
        siwang: "234",
        sizong: "2342234",
        xiaoji: "45645",
        zhongshang: "45645",
        total: "3454352131",
        hj: "121",
      },
      {
        areaName: "武进",
        xian: "11",
        xz: "33",
        cun: "9",
        jwh: "3",
        jd: "12321",
        aa: 8,
        bb: "7",
        cc: "23",
        dd: "99",
        chengzhen: "3232",
        nongcun: "87",
        sunhuai: "4",
        daota: "12",
        daolu: "77723",
        siwang: "234",
        sizong: "2342234",
        xiaoji: "45645",
        zhongshang: "45645",
        total: "3454352131",
        hj: "121",
      },
      {
        areaName: "武进",
        xian: "11",
        xz: "33",
        cun: "9",
        jwh: "3",
        jd: "12321",
        aa: 8,
        bb: "7",
        cc: "23",
        dd: "99",
        chengzhen: "3232",
        nongcun: "87",
        sunhuai: "4",
        daota: "12",
        daolu: "77723",
        siwang: "234",
        sizong: "2342234",
        xiaoji: "45645",
        zhongshang: "45645",
        total: "3454352131",
        hj: "121",
      },
      {
        areaName: "武进",
        xian: "11",
        xz: "33",
        cun: "9",
        jwh: "3",
        jd: "12321",
        aa: 8,
        bb: "7",
        cc: "23",
        dd: "99",
        chengzhen: "3232",
        nongcun: "87",
        sunhuai: "4",
        daota: "12",
        daolu: "77723",
        siwang: "234",
        sizong: "2342234",
        xiaoji: "45645",
        zhongshang: "45645",
        total: "3454352131",
        hj: "121",
      },
      {
        areaName: "武进",
        xian: "11",
        xz: "33",
        cun: "9",
        jwh: "3",
        jd: "12321",
        aa: 8,
        bb: "7",
        cc: "23",
        dd: "99",
        chengzhen: "3232",
        nongcun: "87",
        sunhuai: "4",
        daota: "12",
        daolu: "77723",
        siwang: "234",
        sizong: "2342234",
        xiaoji: "45645",
        zhongshang: "45645",
        total: "3454352131",
        hj: "121",
      },
    ];
  }

  @Watch("clickShow", { deep: true, immediate: true })
  getReport() {
    if (this.clickShow == true) {
      this.getData();
    }
  }
}
</script>

<style lang="scss" scoped>
$deep: "::v-deep";
.contain {
  width: 100%;
  height: 100%;
  .contain_title {
    text-align: center;
    height: 100px;
    line-height: 100px;
  }
  .contain_body {
    width: 100%;
    height: calc(100% - 100px); //中间有空格
    .table {
      height: 100%;
      width: 100%;
      #{$deep}.el-table__body-wrapper::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      #{$deep}.el-table__body-wrapper::-webkit-scrollbar-thumb {
        background-color: rgb(149, 140, 140);
        border-radius: 3px;
      }
    }
  }
}
</style>
