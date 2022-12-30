<template>
  <!--  汛情报表条件搜索  -->
  <div class="survey-flood">
    <!-- 水位日报-->
    <div class="top-item">
      <div class="top-sel">
        <label>多站水情站点：</label>
        <el-select v-model="report.stcd" multiple collapse-tags style="margin-left: 10px;" placeholder="请选择" clearable size="mini" @change="changeSelect">
          <el-checkbox v-model="checked" @change="selectAll">全选</el-checkbox>
          <el-option v-for="item in typeOpt" :label="item.label" :value="item.value" :key="item.value"> </el-option>
        </el-select>
      </div>
      <div class="top-sel">
        <label>日期：</label>
        <suc-date-picker v-model="report.date" :options="{ type: 'date', clearable: false }" style="width: 150px"></suc-date-picker>
      </div>
    </div>

    <!-- 遍历数组的时候 index  能拿到数组的索引 -->
    <div class="top-item">
      <div class="btn" v-for="(button, index) in buttons" :key="index">
        <suc-button :type="button.type" :config="button.iviewProps" :debounce="800" @on-click="reportClick(index)">{{ button.label }} </suc-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { SucInput, SucSelect, SucButton, SucDatePicker } from "@suc/ui";
import { SelectConfig, SelectOptions } from "@suc/ui/interfaces";
import { publicApi, overview } from "@/api";
import { ondownload } from "@/api/public";
@Component({
  components: {
    SucSelect,
    SucInput,
    SucButton,
    SucDatePicker,
  },
})
export default class ReportSelect extends Vue {
  report: any = {
    stcd: "", //下拉框绑定的值
    date: new Date(),
  };

  checked: boolean = false;

  typeOpt: SelectOptions = [];
  buttons: any[] = [
    {
      label: "生成报表",
      type: "primary",
    },
    {
      label: "原样导出",
      type: "primary",
      iviewProps: {
        ghost: true,
      },
    },
  ];
  mounted() {
    this.getZdData();
    this.reportClick("0")
  }

  //生成报表
  reportClick(index: any) {
    if (index == 0) {
      // 子传父，并传一个对象给父组件
      this.$emit("reportClick", this.report);
    } else if (index == 1) {
      ondownload("/jnsw/flood/report/waterLevelDayExport?sttp=" + this.report.stcd + "&time=" + this.$utils.dateFormat(new Date(this.report.date), "yyyy-MM-dd"));
    }
  }
  //全区站点名称
  async getZdData() {
    this.typeOpt = [];
    const url = "wjServer/dataCenter/stbprpb/zz";
    const data = await publicApi.getNoParam(url);
    this.typeOpt =
      data.result == true
        ? data.data.map((e: any) => {
            return {
              value: e.stcd,
              label: e.stnm,
            };
          })
        : [];
  }

  // 选择下面的时候  选择的长度等于数组的长度，那么选择框的就应该全选上
  changeSelect(val: any) {
    if (val.length === this.typeOpt.length) {
      this.checked = true;
    } else {
      this.checked = false;
    }
  }

  // 1.全选上或者不全选
  selectAll() {
    this.report.stcd = [];
    if (this.checked) {
      this.typeOpt.map((item: any) => {
        this.report.stcd.push(item.value);
      });
    } else {
      this.report.stcd = [];
    }
  }
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
@import "@/styles/commonVariables.scss";

.survey-flood {
  width: 100%;
  height: 100%;
  display: flex;
  .top-item {
    display: flex;
    margin-right: 10px;
    .top-sel {
      margin-right: 10px;
      label {
        margin: 0 10px;
      }
    }
  }
  .btn {
    margin-right: 10px;
  }
  #{$deep}.mulSel {
    .ivu-select-selection {
      height: 30px;
      overflow: hidden;
    }
  }
}
</style>
