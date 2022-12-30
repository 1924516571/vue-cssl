<template>
  <div class="survey-flood">
    <div class="top-item">
      <suc-select v-model="report.bbSel" :options="selectOptions" :config="{ placeholder: '选择报表' }" style="width: 200px" @on-change="bbSelChange"></suc-select>
    </div>
    <!--水位日报-->
    <div class="top-item" v-if="report.bbSel == '1'">
      <!-- <div class="top-sel">
				<label>类型：</label>
				<suc-select
					v-model="report.type"
					:options="typeOpt"
					style="width: 150px"
				></suc-select>
			</div> -->
      <!-- <div class="top-sel">
				<label>所属区域：</label>
				<suc-select
					v-model="report.qy"
					:options="options"
					:config="{ placeholder: '选择所属区域', clearable: true }"
					style="width: 150px"
				></suc-select>
			</div> -->
      <div class="top-sel">
        <label>日期：</label>
        <suc-date-picker v-model="report.date" :options="{ type: 'date', clearable: false }" style="width: 150px"></suc-date-picker>
      </div>
    </div>

    <!--水位月报-->
    <div class="top-item" v-if="report.bbSel == '2'">
      <div class="top-sel">
        <label>日期：</label>
        <suc-date-picker v-model="report.swdate" :options="{ type: 'month', clearable: false }" style="width: 150px"></suc-date-picker>
      </div>
    </div>

    <!-- 水位年报 -->
    <div class="top-item" v-if="report.bbSel == '3'">
      <div class="top-sel">
        <label>水位站点：</label>
        <suc-select
          v-model="report.swstcd"
          :options="swzdData"
          :config="{
            placeholder: '选择站点',
            'label-in-value': true,
          }"
          style="width: 150px"
          @on-change="changeswzd"
        ></suc-select>
      </div>
      <div class="top-sel">
        <label>日期：</label>
        <suc-date-picker v-model="report.swndate" :options="{ type: 'year', clearable: false }" style="width: 150px"></suc-date-picker>
      </div>
    </div>

    <!-- 雨量日报 -->
    <div class="top-item" v-if="report.bbSel == '4'">
      <div class="top-sel">
        <label>日期：</label>
        <suc-date-picker v-model="report.yldate" :options="{ type: 'date', clearable: false }" style="width: 150px"></suc-date-picker>
      </div>
    </div>

    <!-- 雨量月报 -->
    <div class="top-item" v-if="report.bbSel == '5'">
      <div class="top-sel">
        <label>日期：</label>
        <suc-date-picker v-model="report.ylydate" :options="{ type: 'month', clearable: false }" style="width: 150px"></suc-date-picker>
      </div>
    </div>

    <!-- 雨量年报 -->
    <div class="top-item" v-if="report.bbSel == '6'">
      <div class="top-sel">
        <label>雨情站点：</label>
        <suc-select
          v-model="report.stcd"
          :options="yqzdData"
          :config="{
            placeholder: '选择站点',
            'label-in-value': true,
          }"
          style="width: 150px"
          @on-change="changeSwSite"
        ></suc-select>
      </div>
      <div class="top-sel">
        <label>日期：</label>
        <suc-date-picker v-model="report.ylndate" :options="{ type: 'year', clearable: false }" style="width: 150px"></suc-date-picker>
      </div>
    </div>

    <!-- 台风汛期专报 -->
    <div class="top-item" v-if="report.bbSel == '7'">
      <div class="top-sel">
        <label>日期：</label>
        <suc-date-picker v-model="report.tfxqndate" :options="{ type: 'year', clearable: false }" style="width: 150px"></suc-date-picker>
      </div>
    </div>

    <!-- 台风专报 -->
    <div class="top-item" v-if="report.bbSel == '8'">
      <div class="top-sel">
        <label>日期：</label>
        <suc-date-picker v-model="report.tfndate" :options="{ type: 'year', clearable: false }" style="width: 150px"></suc-date-picker>
      </div>
    </div>

    <!-- 汛期专报 -->
    <div class="top-item" v-if="report.bbSel == '9'">
      <div class="top-sel">
        <label>日期：</label>
        <suc-date-picker v-model="report.xqndate" :options="{ type: 'year', clearable: false }" style="width: 150px"></suc-date-picker>
      </div>
    </div>

    <!-- 雨期专报 -->
    <div class="top-item" v-if="report.bbSel == '10'">
      <div class="top-sel">
        <label>日期：</label>
        <suc-date-picker v-model="report.yqndate" :options="{ type: 'year', clearable: false }" style="width: 150px"></suc-date-picker>
      </div>
    </div>

    <!--        水位年报-->
    <!-- <div class="top-item" v-if="report.bbSel == '2'">
			<div class="top-sel">
				<label>类型：</label>
				<suc-select
					v-model="report.ntype"
					:options="typeOpt"
					style="width: 150px"
					@on-change="changeType"
				></suc-select>
			</div>
			<div class="top-sel">
				<label>所属区域：</label>
				<suc-select
					v-model="report.nbqy"
					:options="options"
					:config="{ placeholder: '选择所属区域', clearable: true }"
					style="width: 150px"
				></suc-select>
			</div>
			<div class="top-sel">
				<label>水位站点：</label>
				<suc-select
					v-model="report.swzd"
					:options="swOptions"
					:config="{
						placeholder: '选择站点',
						'label-in-value': true,
					}"
					@on-change="nbzdChange"
					style="width: 150px"
				></suc-select>
			</div>
			<div class="top-sel">
				<label>年：</label>
				<suc-date-picker
					v-model="report.year"
					:options="{ type: 'year', clearable: false }"
					style="width: 150px"
				></suc-date-picker>
			</div>
		</div> -->
    <!--        水位历史数据报表-->
    <!-- <div class="top-item" v-if="report.bbSel == '3'">
      <div class="top-sel">
        <label>类型：</label>
        <suc-select v-model="report.lstype" :options="typeOpt" style="width: 150px"></suc-select>
      </div>
      <div class="top-sel">
        <label>监测时间间隔：</label>
        <suc-select v-model="report.sjjg" :options="jcsjjg" :config="{ placeholder: '选择站点' }" style="width: 150px"></suc-select>
      </div>
      <div class="top-sel">
        <label>时间选择：</label>
        <suc-date-picker v-model="report.sjxzks" :options="{ type: 'date', clearable: false }" style="width: 150px"></suc-date-picker>
        <label>至</label>
        <suc-date-picker v-model="report.sjxzjs" :options="{ type: 'date', clearable: false }" style="width: 150px"></suc-date-picker>
      </div>
    </div> -->

    <!--        雨量日报-->
    <!-- <div class="top-item" v-if="report.bbSel == '4'">
      <div class="top-sel">
        <label>所属区域：</label>
        <suc-select v-model="report.ylqy" :options="options" :config="{ placeholder: '选择所属区域', clearable: true }" style="width:150px;"></suc-select>
      </div>
      <div class="top-sel">
        <label>日期：</label>
        <suc-date-picker v-model="report.yldate" :options="{ type: 'date', clearable: false }" style="width: 150px"></suc-date-picker>
      </div>
    </div> -->
    <!--        雨量月报-->
    <!-- <div class="top-item" v-if="report.bbSel == '5'">
      <div class="top-sel">
        <label>所属区域：</label>
        <suc-select v-model="report.ylyqy" :options="options" :config="{ placeholder: '选择所属区域', clearable: true }" style="width:150px;"></suc-select>
      </div>
      <div class="top-sel">
        <label>日期：</label>
        <suc-date-picker v-model="report.ylydate" :options="{ type: 'month', clearable: false }" style="width: 150px"></suc-date-picker>
      </div>
    </div> -->
    <!--        雨量年报-->
    <!-- <div class="top-item" v-if="report.bbSel == '6'">
      <div class="top-sel">
        <label>水位站点：</label>
        <suc-select
          v-model="report.ylsw"
          :options="swzdOptions"
          :config="{
            placeholder: '选择站点',
            'label-in-value': true,
          }"
          style="width: 150px"
          @on-change="changeSwSite"
        ></suc-select>
      </div>
      <div class="top-sel">
        <label>日期：</label>
        <suc-date-picker v-model="report.ylndate" :options="{ type: 'year', clearable: false }" style="width: 150px"></suc-date-picker>
      </div>
    </div> -->
    <!--        雨量历史数据报表-->
    <!-- <div class="top-item" v-if="report.bbSel == '7'">
      <div class="top-sel">
        <label>监测时间间隔：</label>
        <suc-select v-model="report.ylsjjg" :options="jcsjjg" :config="{ placeholder: '选择站点' }" style="width: 150px"></suc-select>
      </div>
      <div class="top-sel">
        <label>时间选择：</label>
        <suc-date-picker v-model="report.ylsjxzks" :options="{ type: 'date', clearable: false }" style="width: 150px"></suc-date-picker>
        <label>至</label>
        <suc-date-picker v-model="report.ylsjxzjs" :options="{ type: 'date', clearable: false }" style="width: 150px"></suc-date-picker>
      </div>
    </div> -->
    <!--        小水库报汛表-->
    <!-- <div class="top-item" v-if="report.bbSel == '8'">
      <div class="top-sel">
        <label>时间：</label>
        <suc-date-picker v-model="report.xsksj" :options="{ type: 'date', clearable: false }" style="width: 150px"></suc-date-picker>
      </div>
    </div> -->
    <!--        工情综合统计报表-->
    <!-- <div class="top-item" v-if="report.bbSel == '9'">
      <div class="top-sel">
        <label>时间选择：</label>
        <suc-date-picker v-model="report.gqzhtjks" :options="{ type: 'datetime', clearable: false }" style="width: 210px"></suc-date-picker>
        <label>至</label>
        <suc-date-picker v-model="report.gqzhtjjs" :options="{ type: 'datetime', clearable: false }" style="width: 210px"></suc-date-picker>
      </div>
    </div> -->
    <!--        工情运行统计报表-->
    <!-- <div class="top-item" v-if="report.bbSel == '10'">
      <div class="top-sel">
        <label>站点：</label>
        <suc-select style="width: 400px" v-model="report.relZd" :options="zdOptions" class="mulSel" :config="{ clearable: true, multiple: true }"></suc-select>
        <label>时间：</label>
        <suc-date-picker v-model="report.gqyxtjks" :options="{ type: 'datetime', clearable: false }" style="width: 210px"></suc-date-picker>
        <label>至</label>
        <suc-date-picker v-model="report.gqyxtjjs" :options="{ type: 'datetime', clearable: false }" style="width: 210px"></suc-date-picker>
      </div>
    </div> -->
    <!--        工情泵站排水记录-->
    <div class="top-item" v-if="report.bbSel == '11'">
      <div class="top-sel">
        <label>时间：</label>
        <suc-date-picker v-model="report.gqbzpsks" :options="{ type: 'datetime', clearable: false }" style="width: 210px"></suc-date-picker>
        <label>至</label>
        <suc-date-picker v-model="report.gqbzpsjs" :options="{ type: 'datetime', clearable: false }" style="width: 210px"></suc-date-picker>
      </div>
    </div>
    <!--        降雨量同期对比统计报表-->
    <div class="top-item" v-if="report.bbSel == '12'">
      <div class="top-sel">
        <label>站点：</label>
        <suc-select
          style="width: 150px"
          v-model="report.jyltqZd"
          :options="jylOptions"
          :config="{
            placeholder: '选择站点',
            'label-in-value': true,
          }"
          @on-change="jylzdChange"
          class="mulSel"
        ></suc-select>
        <label>时间：</label>
        <suc-date-picker v-model="report.jyltqdbks" :options="{ type: 'month', clearable: false }" style="width: 150px"></suc-date-picker>
        <label>至</label>
        <suc-date-picker v-model="report.jyltqdbjs" :options="{ type: 'month', clearable: false }" style="width: 150px"></suc-date-picker>
      </div>
    </div>
    <!--        泵机运行时长统计-->
    <div class="top-item" v-if="report.bbSel == '13'">
      <div class="top-sel">
        <label>泵机编号：</label>
        <suc-select style="width: 150px" v-model="report.bjbh" :options="bjOptions" class="mulSel"></suc-select>
        <label>时间：</label>
        <suc-date-picker v-model="report.bjkssj" :options="{ type: 'datetime', clearable: false }" style="width: 210px"></suc-date-picker>
        <label>至</label>
        <suc-date-picker v-model="report.bjjssj" :options="{ type: 'datetime', clearable: false }" style="width: 210px"></suc-date-picker>
      </div>
    </div>
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
import { reportApi, overview, publicApi } from "@/api";
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
    bbSel: "1",
    swstcd: "", //水位code
    swmc: "", //水位下拉框的label
    date: new Date(), //水位日报
    swdate: new Date(), //水位月报
    swndate: new Date(), //水位年报
    tfxqndate: new Date(), //台风汛期专报
    tfndate: new Date(), //台风专报
    xqndate: new Date(), //汛期专报
    yqndate: new Date(), //雨期专报
    type: "DP",
    ntype: "DP",
    lstype: "DP",
    qy: "",
    swzd: "1",
    swzdmc: "",
    nbqy: "",
    ylqy: "",
    stcd: "", //雨量下拉框code
    yldate: new Date(), //雨量日报
    ylyqy: "",
    ylydate: new Date(), //雨量月报
    ylnqy: "",
    ylndate: new Date(), //雨量年报
    ylsw: "",
    ylswmc: "", //雨量年报下拉框传中文
    sjjg: "",
    sjxzks: new Date(new Date(new Date().getTime() - 3 * 1000 * 3600 * 24)),
    sjxzjs: new Date(),
    ylzdmc: "",
    ylsjjg: "",
    ylsjxzks: new Date(new Date(new Date().getTime() - 3 * 1000 * 3600 * 24)),
    ylsjxzjs: new Date(),
    xsksj: new Date(),
    gqzhtjks: new Date(new Date(new Date().getTime() - 3 * 1000 * 3600 * 24).setHours(0, 0, 0, 0)),
    gqzhtjjs: new Date(),
    relZd: [],
    gqyxtjks: new Date(new Date(new Date().getTime() - 3 * 1000 * 3600 * 24).setHours(0, 0, 0, 0)),
    gqyxtjjs: new Date(),
    gqbzpsks: new Date(new Date(new Date().getTime() - 3 * 1000 * 3600 * 24).setHours(0, 0, 0, 0)),
    gqbzpsjs: new Date(),
    jyltqZd: "",
    jyltqZdmc: "",
    jyltqdbks: new Date(new Date(new Date().getTime() - 365 * 1000 * 3600 * 24 * 3)),
    jyltqdbjs: new Date(),
    bjbh: "",
    bjkssj: new Date(new Date(new Date().getTime() - 3 * 1000 * 3600 * 24).setHours(0, 0, 0, 0)),
    bjjssj: new Date(),
    year: new Date(),
  };
  selectOptions: SelectOptions = [
    { label: "水位日报", value: "1" },
    { label: "水位月报", value: "2" },
    { label: "水位年报", value: "3" },
    { label: "雨量日报", value: "4" },
    { label: "雨量月报", value: "5" },
    { label: "雨量年报", value: "6" },
    { label: "台汛期专报", value: "7" },
    { label: "台风专报", value: "8" },
    { label: "汛期专报", value: "9" },
    { label: "雨期专报", value: "10" },

    // { label: "水位年报", value: "3" },
    // { label: "水位历史数据报表", value: "3" },
    // { label: "雨量日报", value: "4" },
    // { label: "雨量月报", value: "5" },
    // { label: "雨量年报", value: "6" },
    // { label: "雨量历史数据报表", value: "7" },
    // // {label: '小水库报汛表', value: '8'},
    // { label: "工情综合统计报表", value: "9" },
    // { label: "工情运行统计报表", value: "10" },
    // { label: "工情排水记录报表", value: "11" },
    // { label: "降雨量同期对比统计报表", value: "12" },
    // { label: "泵机运行时长统计", value: "13" },

    // { label: "防汛日报", value: "4" },
    // { label: "防汛月报", value: "5" },
    // { label: "汛期", value: "6" },
  ];
  swzdData: any = []; //水位站点数据
  yqzdData: any = []; //雨量站点数据
  typeOpt: SelectOptions = [];
  swOptions: SelectOptions = [];
  options: SelectOptions = [];
  jcsjjg: SelectOptions = [];
  zdOptions: SelectOptions = [];
  jylOptions: SelectOptions = [];
  bjOptions: SelectOptions = [];
  swzdOptions: SelectOptions = [];
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
    this.getData();
    this.getSwData();
    this.getSjjgData();
    this.getBzData();
    this.getGis();
    this.getBjData();
    this.getSwzdOptions();
    this.getSwzdData(); //水位站点数据
    this.getYlzd(); //获取雨量站点
  }

  //生成报表
  reportClick(index: any) {
    if (index == 0) {
      this.$emit("reportClick", this.report);
    } else if (index == 1) {
      switch (this.report.bbSel) {
        case "1":
          ondownload("/jnsw/flood/report/waterLevelDayExport?sttp=" + this.report.type + "&time=" + this.$utils.dateFormat(new Date(this.report.date), "yyyy-MM-dd"));
          break;
        case "3":
          ondownload("/jnsw/flood/report/waterLevelHisExport");
          break;
        case "4":
          ondownload("/jnsw/flood/report/rainDayDataExport");
          break;
        case "5":
          ondownload("/jnsw/flood/report/rainMonthDataExport");
          break;
        case "7":
          ondownload("/jnsw//flood/report/rainDataHisExport");
          break;
        case "9":
          ondownload("/jnsw/flood/report/pumpCompExport");
          break;
        case "10":
          ondownload("/jnsw/flood/report/pumpRunExport");
          break;
        case "11":
          ondownload("/jnsw/flood/report/pumpDischargeExport");
          break;
        case "12":
          // ondownload('');
          break;
        case "13":
          ondownload("/jnsw/flood/report/pumpTimeDataExport");
          break;
      }
    }
  }

  // 水位站点
  async getSwzdData() {
    this.swzdData = [];
    const url = "wjServer/dataCenter/stbprpb/zz";
    const data = await publicApi.getNoParam(url);
    this.swzdData =
      data.result == true
        ? data.data.map((e: any) => {
            return {
              value: e.stcd,
              label: e.stnm,
            };
          })
        : [];
    this.report.swstcd = this.swzdData[0].value;
    this.report.swmc = this.swzdData[0].label;
  }
  // 水位站点下拉框改变事件
  changeswzd(val: any) {
    if (val != undefined) {
      this.report.swmc = val.label;
    } else {
      this.report.swmc = "";
    }
  }
  // 雨量站点
  async getYlzd() {
    this.yqzdData = [];
    const url = "wjServer/dataCenter/stbprpb/pp";
    const data = await publicApi.getNoParam(url);
    this.yqzdData =
      data.result == true
        ? data.data.map((e: any) => {
            return {
              value: e.stcd,
              label: e.stnm,
            };
          })
        : [];
    this.report.stcd = this.yqzdData[0].value;
    this.report.ylswmc = this.yqzdData[0].label;
  }

  // 雨量站点下拉框改变事件
  changeSwSite(val: any) {
    if (val != undefined) {
      this.report.ylswmc = val.label;
    } else {
      this.report.ylswmc = "";
    }
  }
  //测站类型
  async getData() {
    this.typeOpt = [];
    const data = await reportApi.getCzType();
    if (data) {
      Object.keys(data).forEach((key: any) => {
        this.typeOpt.push({
          label: data[key],
          value: key,
        });
      });
    }
  }
  //水位站点
  async getSwData() {
    this.swOptions = [];
    let params = {
      sttp: "",
    };
    if (this.report.bbSel == "2") {
      params.sttp = this.report.ntype;
    }
    const data = await reportApi.getCzSimple(params);
    if (data && data.length > 0) {
      this.swOptions = data.map((it: any) => {
        return {
          label: it.stnm,
          value: it.stcd,
        };
      });
      this.report.swzd = this.swOptions[0].value;
      this.report.swzdmc = this.swOptions[0].label;
    }
  }
  //水位年报 泵站值更改
  async changeType(val: any) {
    this.swOptions = [];
    let params = {
      sttp: val,
    };
    const data = await reportApi.getCzSimple(params);
    if (data && data.length > 0) {
      this.swOptions = data.map((it: any) => {
        return {
          label: it.stnm,
          value: it.stcd,
        };
      });
      this.report.swzd = this.swOptions[0].value;
      this.report.swzdmc = this.swOptions[0].label;
    }
  }
  //报表类型更改
  bbSelChange(val: any) {
    if (val == "2") {
      this.changeType("DP");
    }
  }
  //泵站站点
  async getBzData() {
    this.zdOptions = [];
    const data = await overview.getStationGis();

    if (data && data.length > 0) {
      this.zdOptions = data.map((it: any) => {
        return {
          label: it[1],
          value: it[0],
        };
      });
    }
  }
  //监测时间间隔
  async getSjjgData() {
    this.jcsjjg = [];
    const data = await reportApi.getReportSjjg();
    if (data) {
      Object.keys(data).forEach((key: any) => {
        this.jcsjjg.push({
          label: data[key],
          value: key,
        });
      });
      this.report.sjjg = this.jcsjjg[0].value;
      this.report.ylsjjg = this.jcsjjg[0].value;
    }
  }
  //降雨量站点
  async getGis() {
    const data = await overview.getRainGis();
    if (data) {
      this.jylOptions = data.map((it: any) => {
        return {
          label: it[1],
          value: it[0],
        };
      });
      this.report.jyltqZd = this.jylOptions[0].value;
      this.report.jyltqZdmc = this.jylOptions[0].label;
    }
  }
  // 泵机
  async getBjData() {
    const data = await overview.getBjList();
    if (data) {
      this.bjOptions = data.map((it: any) => {
        return {
          label: it[2],
          value: it[0],
        };
      });
      this.report.bjbh = this.bjOptions[0].value;
    }
  }
  nbzdChange(item: any) {
    this.report.swzdmc = item.label;
  }
  jylzdChange(item: any) {
    this.report.jyltqZdmc = item.label;
  }

  getSwzdOptions() {
    let url = "jnsw/base/bList";
    let params = {
      sttp: "PP",
    };
    this.$http
      .get(url, { params })
      .then((res: any) => {
        let data = res.data.data;
        this.swzdOptions = data.map((e: any) => {
          return {
            label: e.stnm,
            value: e.stcd,
          };
        });
      })
      .catch((err: any) => {
        console.log(err.data.message);
      });
  }
  // changeSwSite(val: any) {
  //   this.report.ylswmc = val.label;
  // }
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
