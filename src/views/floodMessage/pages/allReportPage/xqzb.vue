<template>
  <div class="survey-flood">
    <div class="table">
      <el-table :data="tableData" height="100%" :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }" v-loading="loading" element-loading-text="拼命加载中">
        <el-table-column type="index" width="50"> </el-table-column>
        <!-- <el-table-column prop="areaName" label="街道" width="180"> </el-table-column> -->
        <el-table-column prop="stnm" label="站点名称" width="180"> </el-table-column>
        <el-table-column label="五月">
          <el-table-column label="水位">
            <el-table-column prop="maxZ5,maxZTm5" label="最高(m/日)" width="100">
              <!-- 关键地方 -->
              <template slot-scope="scope"> {{ scope.row.maxZ5 }}/{{ scope.row.maxZTm5 }} </template>
            </el-table-column>
            <el-table-column prop="minZ5,minZTm5" label="最低(m/日)" width="100">
              <template slot-scope="scope"> {{ scope.row.minZ5 }}/{{ scope.row.minZTm5 }} </template>
            </el-table-column>

            <el-table-column prop="warnDays5" label="超警戒水位天数" width="100"> </el-table-column>
          </el-table-column>
          <el-table-column label="雨量">
            <el-table-column prop="p5" label="月雨量" width="100"> </el-table-column>
            <el-table-column prop="days5" label="月降雨天数" width="100"> </el-table-column>
            <el-table-column prop="maxP5,maxPTm5" label="最大雨量(mm/日)" width="100">
              <template slot-scope="scope"> {{ scope.row.maxZ5 }}/{{ scope.row.maxPTm5 }} </template>
            </el-table-column>
          </el-table-column>
        </el-table-column>

        <el-table-column label="六月">
          <el-table-column label="水位">
            <el-table-column prop="maxZ6,maxZTm6" label="最高(m/日)" width="100">
              <!-- 关键地方 -->
              <template slot-scope="scope"> {{ scope.row.maxZ6 }}/{{ scope.row.maxZTm6 }} </template>
            </el-table-column>
            <el-table-column prop="minZ6,minZTm6" label="最低(m/日)" width="100">
              <template slot-scope="scope"> {{ scope.row.minZ6 }}/{{ scope.row.minZTm6 }} </template>
            </el-table-column>
            <el-table-column prop="warnDays6" label="超警戒水位天数" width="100"> </el-table-column>
          </el-table-column>
          <el-table-column label="雨量">
            <el-table-column prop="p6" label="月雨量" width="100"> </el-table-column>
            <el-table-column prop="days6" label="月降雨天数" width="100"> </el-table-column>
            <el-table-column prop="maxP6,maxPTm6" label="最大雨量(mm/日)" width="100">
              <template slot-scope="scope"> {{ scope.row.maxZ6 }}/{{ scope.row.maxPTm6 }} </template>
            </el-table-column>
          </el-table-column>
        </el-table-column>

        <el-table-column label="七月">
          <el-table-column label="水位">
            <el-table-column prop="maxZ7,maxZTm7" label="最高(m/日)" width="100">
              <!-- 关键地方 -->
              <template slot-scope="scope"> {{ scope.row.maxZ7 }}/{{ scope.row.maxZTm7 }} </template>
            </el-table-column>
            <el-table-column prop="minZ7,minZTm7" label="最低(m/日)" width="100">
              <template slot-scope="scope"> {{ scope.row.minZ7 }}/{{ scope.row.minZTm7 }} </template>
            </el-table-column>
            <el-table-column prop="warnDays7" label="超警戒水位天数" width="100"> </el-table-column>
          </el-table-column>
          <el-table-column label="雨量">
            <el-table-column prop="p7" label="月雨量" width="100"> </el-table-column>
            <el-table-column prop="days7" label="月降雨天数" width="100"> </el-table-column>
            <el-table-column prop="maxP7,maxPTm7" label="最大雨量(mm/日)" width="100">
              <template slot-scope="scope"> {{ scope.row.maxZ7 }}/{{ scope.row.maxPTm7 }} </template>
            </el-table-column>
          </el-table-column>
        </el-table-column>

        <el-table-column label="八月">
          <el-table-column label="水位">
            <el-table-column prop="maxZ8,maxZTm8" label="最高(m/日)" width="100">
              <!-- 关键地方 -->
              <template slot-scope="scope"> {{ scope.row.maxZ8 }}/{{ scope.row.maxZTm8 }} </template>
            </el-table-column>
            <el-table-column prop="minZ8,minZTm8" label="最低(m/日)" width="100">
              <template slot-scope="scope"> {{ scope.row.minZ8 }}/{{ scope.row.minZTm8 }} </template>
            </el-table-column>
            <el-table-column prop="warnDays8" label="超警戒水位天数" width="100"> </el-table-column>
          </el-table-column>
          <el-table-column label="雨量">
            <el-table-column prop="p8" label="月雨量" width="100"> </el-table-column>
            <el-table-column prop="days8" label="月降雨天数" width="100"> </el-table-column>
            <el-table-column prop="maxP8,maxPTm8" label="最大雨量(mm/日)" width="100">
              <template slot-scope="scope"> {{ scope.row.maxZ8 }}/{{ scope.row.maxPTm8 }} </template>
            </el-table-column>
          </el-table-column>
        </el-table-column>

        <el-table-column label="九月">
          <el-table-column label="水位">
            <el-table-column prop="maxZ9,maxZTm9" label="最高(m/日)" width="100">
              <!-- 关键地方 -->
              <template slot-scope="scope"> {{ scope.row.maxZ9 }}/{{ scope.row.maxZTm9 }} </template>
            </el-table-column>
            <el-table-column prop="minZ9,minZTm9" label="最低(m/日)" width="100">
              <template slot-scope="scope"> {{ scope.row.minZ9 }}/{{ scope.row.minZTm9 }} </template>
            </el-table-column>
            <el-table-column prop="warnDays9" label="超警戒水位天数" width="100"> </el-table-column>
          </el-table-column>
          <el-table-column label="雨量">
            <el-table-column prop="p9" label="月雨量" width="100"> </el-table-column>
            <el-table-column prop="days9" label="月降雨天数" width="100"> </el-table-column>
            <el-table-column prop="maxP9,maxPTm9" label="最大雨量(mm/日)" width="100">
              <template slot-scope="scope"> {{ scope.row.maxZ9 }}/{{ scope.row.maxPTm9 }} </template>
            </el-table-column>
          </el-table-column>
        </el-table-column>

        <el-table-column label="十月">
          <el-table-column label="水位">
            <el-table-column prop="maxZ10,maxZTm10" label="最高(m/日)" width="100">
              <!-- 关键地方 -->
              <template slot-scope="scope"> {{ scope.row.maxZ10 }}/{{ scope.row.maxZTm10 }} </template>
            </el-table-column>
            <el-table-column prop="minZ10,minZTm10" label="最低(m/日)" width="100">
              <template slot-scope="scope"> {{ scope.row.minZ10 }}/{{ scope.row.minZTm10 }} </template>
            </el-table-column>
            <el-table-column prop="warnDays10" label="超警戒水位天数" width="100"> </el-table-column>
          </el-table-column>
          <el-table-column label="雨量">
            <el-table-column prop="p10" label="月雨量" width="100"> </el-table-column>
            <el-table-column prop="days10" label="月降雨天数" width="100"> </el-table-column>
            <el-table-column prop="maxP10,maxPTm10" label="最大雨量(mm/日)" width="100">
              <template slot-scope="scope"> {{ scope.row.maxZ10 }}/{{ scope.row.maxPTm10 }} </template>
            </el-table-column>
          </el-table-column>
        </el-table-column>

        <el-table-column label="总计">
          <el-table-column label="水位">
            <el-table-column prop="qiMaxZ,qiMaxZTm" label="最高水位(m/日)" width="100">
              <!-- 关键地方 -->
              <template slot-scope="scope"> {{ scope.row.qiMaxZ }}/{{ scope.row.qiMaxZTm }} </template>
            </el-table-column>
            <el-table-column prop="qiMinZ,qiMinZTm" label="最低水位(m/日)" width="100">
              <template slot-scope="scope"> {{ scope.row.qiMinZ }}/{{ scope.row.qiMinZTm }} </template>
            </el-table-column>
            <el-table-column prop="qiWarnDays" label="全年超警戒天数" width="100"> </el-table-column>
          </el-table-column>
          <el-table-column label="雨量">
            <el-table-column prop="qiP" label="累计雨量" width="100"> </el-table-column>
            <el-table-column prop="qiPdayNum" label="降雨累计天数" width="100"> </el-table-column>
            <el-table-column prop="qiMaxP,qiMaxPDay" label="最大雨量(mm/日)" width="100">
              <template slot-scope="scope"> {{ scope.row.qiMaxP }}/{{ scope.row.qiMaxPDay }} </template>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { TableComponent } from "@/components";
import { publicApi, reportApi } from "@/api";
import { SucMessage } from "@suc/ui";
import { score } from "../../../../api/maintenance/index";
import Loading from "../../../../components/LoadingCom.vue";

@Component({
  components: {
    TableComponent,
  },
})
export default class MainPanel extends Vue {
  @Prop({
    type: Object,
    default: () => {},
  })
  report!: any;
  loading: boolean = true;
  @Prop() clickShow!: boolean;
  tableData: Array<any> = [];
  async getData() {
    let params = {
      year: this.$utils.dateFormat(new Date(this.report.xqndate), "yyyy"),
    };
    const url = "wjServer/fangxunjc/z/zXunQiReport";
    const data = await publicApi.getWithParam(url, params);
    if (data.result == true) {
      this.tableData = data.data;
    } else {
      this.tableData = [];
      this.$SucMessage.error("获取失败");
    }
    // this.tableData = [
    //   {
    //     stnm: "测试测站名称",
    //     maxZ5: "55",
    //     maxZTm5: "12点",
    //     minZ5: "33",
    //     minZTm5: "22",
    //     warnDays5: "5",
    //     p5: "88",
    //     days5: "5天",
    //     maxP5: "33",
    //     maxPTm5: "28号",
    //     maxZ6: "55",
    //     maxZTm6: "12点",
    //     minZ6: "33",
    //     minZTm6: "22",
    //     warnDays6: "5",
    //     p6: "88",
    //     days6: "5天",
    //     maxP6: "33",
    //     maxPTm6: "28号",

    //     maxZ7: "55",
    //     maxZTm7: "12点",
    //     minZ7: "33",
    //     minZTm7: "22",
    //     warnDays7: "5",
    //     p7: "88",
    //     days7: "5天",
    //     maxP7: "33",
    //     maxPTm7: "28号",

    //     maxZ8: "55",
    //     maxZTm8: "12点",
    //     minZ8: "33",
    //     minZTm8: "22",
    //     warnDays8: "5",
    //     p8: "88",
    //     days8: "5天",
    //     maxP8: "33",
    //     maxPTm8: "28号",

    //     maxZ9: "55",
    //     maxZTm9: "12点",
    //     minZ9: "33",
    //     minZTm9: "22",
    //     warnDays9: "5",
    //     p9: "88",
    //     days9: "5天",
    //     maxP9: "33",
    //     maxPTm9: "28号",

    //     maxZ10: "55",
    //     maxZTm10: "12点",
    //     minZ10: "33",
    //     minZTm10: "22",
    //     warnDays10: "5",
    //     p10: "88",
    //     days10: "5天",
    //     maxP10: "33",
    //     maxPTm10: "28号",

    //     qiMaxZ: "55",
    //     qiMaxZTm: "12点",
    //     qiMinZ: "33",
    //     qiMinZTm: "22",
    //     qiWarnDays: "5",
    //     qiP: "88",
    //     qiPdayNum: "5天",
    //     qiMaxP: "33",
    //     qiMaxPDay: "28号",
    //   },
    // ];
    this.loading = false;
  }
  @Watch("clickShow", { deep: true, immediate: true })
  getReport() {
    if (this.report.bbSel && this.clickShow) {
      this.loading = true;
      this.getData();
    }
  }
}
</script>
<style lang="scss" scoped>
.survey-flood {
  width: 100%;
  height: 100%;
  .table {
    width: 100%;
    height: 100%;
    // overflow: auto;
  }
}
</style>
