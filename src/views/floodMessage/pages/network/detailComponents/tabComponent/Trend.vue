<template>
	<!-- 水位变化趋势 -->
	<div class="table-chart-view">
		<div>
			<div class="flex-class">
				<div class="flex-class nav-item">
					<div
						:class="{ 'active-nav': navIndex == index }"
						v-for="(item, index) in navs"
						:key="index"
						@click="getNav(index)"
					>
						<span>{{ item.label }}</span>
					</div>
				</div>
			</div>
			<div class="flex-class">
				<div>
					<template>
						<el-date-picker
							v-model="date"
							type="daterange"
							range-separator="-"
							style="width: 320px; margin-right: 10px"
							size="small"
							format="yyyy-MM-dd HH:mm:ss"
							@change="getDate"
						></el-date-picker>
					</template>
				</div>
				<!-- <div>
          <search-component></search-component>
        </div> -->
			</div>
		</div>
		<div class="trend-item">
			<div v-if="navIndex == 0">
				<v-chart
					:options="lineOptions"
					:auto-resize="true"
					style="width: 100%; height: 100%"
				></v-chart>
			</div>
			<div v-if="navIndex == 1">
				<table-page
					:columns="columns"
					:tableData="tableData"
					:pageParams="pageParams"
					@get-size="getSize"
					@get-page="getPage"
				>
					<!-- <template v-slot:level="{ row, index }">
						<v-chart
							:options="row.levelOption[index]"
							:auto-resize="true"
							style="width: 100%; height: 100%"
						></v-chart>
					</template> -->
				</table-page>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import {
	Vue,
	Component,
	Prop,
	Emit,
	Model,
	Watch,
} from "vue-property-decorator";
import { State, Mutation, Action, namespace } from "vuex-class";
import { SucDatePicker } from "@suc/ui";
import { DatePicker } from "element-ui";
import { DatePickerOptions } from "@suc/ui/interfaces";
import { SearchComponent } from "../../../public";
import { TablePage } from "@/components";
import { networkApi, infoApi } from "@/api";
@Component({
	components: {
		SucDatePicker,
		SearchComponent,
		TablePage,
		ElDatePicker: DatePicker,
	},
})
export default class Trend extends Vue {
	@State netWork: any;
	color: any[] = ["#5f77ec", "#5397ff", "#58dde0", "#feb543"];
	columns: any[] = [
		{
			title: "序号",
			type: "index",
		},
		{
			title: "时间",
			key: "time",
		},
		{
			title: "水位",
			key: "value",
		},
		{
			title: "水位变化",
			key: "hour1",
		},
		// {
		//   title: '3h水位涨幅',
		//   key: 'hour3'
		// },
		// {
		//   title: '6h水位涨幅',
		//   key: 'hour6'
		// },
		// {
		//   title: '12h水位涨幅',
		//   key: 'hour12'
		// },
		// {
		// 	title: "24h水位涨幅",
		// 	key: "hour24",
		// 	slot: "level",
		// },
	];
	lineOptions: any = {
		color: this.color,
		tooltip: {
			trigger: "axis",
		},
		grid: {
			top: "16%",
			left: "3%",
			bottom: "12%",
			containLable: true,
		},
		xAxis: {
			type: "category",
			// boundaryGap: false,
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			splitLine: {
				show: false,
			},
			data: [],
		},
		yAxis: {
			type: "value",
			name: "单位",
			min: 0,
			max: 10,
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
				type: "line",
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
								color: "#5397ff",
							},
							{
								offset: 1,
								color: "rgba(83,151,255,0.2)",
							},
						],
					},
				},
				data: [],
				markLine: {
					symbol: "none",
					silent: true,
					lineStyle: { normal: { type: "dashed" } },
					label: { position: "start" },
					data: [
						// {
						//   yAxis: 0.02,
						//   lineStyle: { width: 1.6, color: '#EE8262' },
						//   label: { show: false }
						// },
						// {
						//   yAxis: 0.05,
						//   lineStyle: { width: 1.6, color: '#B5C334' },
						//   label: { show: false }
						// },
						// {
						//   yAxis: 0.05,
						//   lineStyle: { width: 1.6, color: '#FCCE10' },
						//   label: { show: false }
						// },
						// {
						//   yAxis: 0.05,
						//   lineStyle: { width: 1.6, color: '#60C0DD' },
						//   label: { show: false }
						// },
						// {
						//   yAxis: 0.05,
						//   lineStyle: { width: 1.6, color: '#B4EEB4' },
						//   label: { show: false }
						// }
					],
				},
				markPoint: {
					silent: true,
					label: { fontSize: 13 },
					data: [
						{
							yAxis: 0.02,
							x: "20%",
							symbolSize: 0.1,
							label: {
								textStyle: { color: "#fff" },
								padding: [3, 8],
								fontSize: 16,
								borderRadius: 13,
								backgroundColor: "EE8262",
								position: "left",
								formatter: "井深：0.02",
							},
						},
						{
							yAxis: 0.05,
							x: "40%",
							symbolSize: 0.1,
							label: {
								textStyle: { color: "#fff" },
								padding: [3, 8],
								fontSize: 16,
								borderRadius: 13,
								backgroundColor: "#B5C334",
								position: "left",
								formatter: "报警水位：0.05",
							},
						},
						{
							yAxis: 0.05,
							x: "60%",
							symbolSize: 0.1,
							label: {
								textStyle: { color: "#fff" },
								padding: [3, 8],
								fontSize: 16,
								borderRadius: 13,
								backgroundColor: "#FCCE10",
								position: "left",
								formatter: "警戒水位：0.05",
							},
						},
						{
							yAxis: 0.05,
							x: "80%",
							symbolSize: 0.1,
							label: {
								textStyle: { color: "#fff" },
								padding: [3, 8],
								fontSize: 16,
								borderRadius: 13,
								backgroundColor: "#60C0DD",
								position: "left",
								formatter: "提醒水位：0.05",
							},
						},
						{
							yAxis: 0.05,
							x: "100%",
							symbolSize: 0.1,
							label: {
								textStyle: { color: "#fff" },
								padding: [3, 8],
								fontSize: 16,
								borderRadius: 13,
								backgroundColor: "#B4EEB4",
								position: "left",
								formatter: "预警水位：0.05",
							},
						},
					],
				},
			},
		],
	};
	tableData: any[] = [];
	date: any = [];
	options: DatePickerOptions = {
		type: "datetimerange",
	};
	navIndex: number = 0;
	navs: any[] = [
		{
			label: "过程线",
		},
		{
			label: "列表详情",
		},
	];
	getNav(index: number) {
		this.navIndex = index;
	}
	getDate(date: any) {
		let st = this.$utils.dateFormat(date[0], "yyyy-MM-dd HH:mm:ss");
		let et = this.$utils.dateFormat(date[1], "yyyy-MM-dd HH:mm:ss");
		this.trendParams.beginTime = st;
		this.trendParams.endTime = et;
		this.getTrend();
	}
	// 水位趋势图
	pageParams: any = {
		current: 1,
		total: 0,
		pageSize: 10,
	};
	trendParams: any = {
		beginTime: "2020-01-14 00:00:00",
		endTime: "2020-01-15 10:00:00",
		currentPage: 1,
		pageSize: 10,
		sbId: "1",
	};
	mounted() {
		this.init();
	}
	init() {
		let st = this.$utils.dateFormat(
			new Date(new Date().setHours(0, 0, 0)),
			"yyyy-MM-dd HH:mm:ss"
		);
		let et = this.$utils.dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss");
		this.date = [st, et];
		this.trendParams.beginTime = st;
		this.trendParams.endTime = et;
		this.getTrend();
	}
	async getTrend() {
		let that = this;
		that.lineOptions.xAxis.data = [];
		that.lineOptions.series[0].data = [];
		that.tableData = [];
		that.trendParams.sbId = that.netWork.row.SBID;
		that.trendParams.currentPage = that.pageParams.current;
		that.trendParams.pageSize = that.pageParams.pageSize;
		const trendData = await networkApi.getTrendData(that.trendParams);
		let { gwinfo, data, linelist } = trendData.data;
		that.pageParams.total = data.totalSum;
		that.lineOptions.xAxis.data = linelist[0];
		that.lineOptions.series[0].data = linelist[1];
		this.onYjLine();
		let optionArr: any = [];
		that.tableData = data.list.map((item: any, key: number) => {
			// optionArr.push({
			// 	id: key,
			// 	color: that.color,
			// 	// tooltip: {
			// 	//   trigger: 'axis',
			// 	//   formatter: '{c}'
			// 	// },
			// 	grid: {
			// 		top: "1%",
			// 		left: "3%",
			// 		bottom: "1%",
			// 		containLable: true,
			// 	},
			// 	xAxis: {
			// 		type: "category",
			// 		show: false,
			// 		data: item.hour24[0],
			// 	},
			// 	yAxis: {
			// 		type: "value",
			// 		show: false,
			// 	},
			// 	series: [
			// 		{
			// 			type: "line",
			// 			symbol: "none",
			// 			areaStyle: {
			// 				color: {
			// 					type: "linear",
			// 					x: 0,
			// 					y: 0,
			// 					x2: 0,
			// 					y2: 1,
			// 					colorStops: [
			// 						{
			// 							offset: 0,
			// 							color: "#5397ff",
			// 						},
			// 						{
			// 							offset: 1,
			// 							color: "rgba(83,151,255,0.2)",
			// 						},
			// 					],
			// 				},
			// 			},
			// 			data: item.hour24[1],
			// 		},
			// 	],
			// });
			return {
				gwmc: gwinfo[0].gwmc,
				pqmc: gwinfo[0].pqmc,
				time: item.time,
				hour1: item.hour1,
				// hour3: item.hour3 ? item.hour3 : 0,
				// hour6: item.hour6 ? item.hour6 : 0,
				// hour12: item.hour12 ? item.hour12 : 0,
				// hour24: item.hour24 ? item.hour24 : 0,
				// levelOption: optionArr,
				value: item.value,
			};
		});
	}
	async onYjLine() {
		let url = "jnsw/manhole/get/" + this.netWork.row.YJID;
		let data = await infoApi.onpage({}, url);
		this.lineOptions.series[0].markLine.data[0].yAxis = data.sd;
		this.lineOptions.series[0].markLine.data[1].yAxis = data.tpsw;
		this.lineOptions.series[0].markLine.data[2].yAxis = data.jjsw;
		this.lineOptions.series[0].markLine.data[3].yAxis = data.txsw;
		this.lineOptions.series[0].markLine.data[4].yAxis = data.yjsw;
		this.lineOptions.series[0].markPoint.data[0].yAxis = data.sd;
		this.lineOptions.series[0].markPoint.data[0].label.formatter =
			"井深：" + data.sd;
		this.lineOptions.series[0].markPoint.data[1].yAxis = data.tpsw;
		this.lineOptions.series[0].markPoint.data[1].label.formatter =
			"报警水位：" + data.tpsw;
		this.lineOptions.series[0].markPoint.data[2].yAxis = data.jjsw;
		this.lineOptions.series[0].markPoint.data[2].label.formatter =
			"警戒水位：" + data.jjsw;
		this.lineOptions.series[0].markPoint.data[3].yAxis = data.txsw;
		this.lineOptions.series[0].markPoint.data[3].label.formatter =
			"提醒水位：" + data.txsw;
		this.lineOptions.series[0].markPoint.data[4].yAxis = data.yjsw;
		this.lineOptions.series[0].markPoint.data[4].label.formatter =
			"预警水位：" + data.yjsw;
		this.lineOptions.yAxis.max = parseFloat(data.sd + 0.1).toFixed(1);
	}
	getSize(size: number) {
		this.pageParams.current = 1;
		this.pageParams.pageSize = size;
		this.getTrend();
	}
	getPage(page: number) {
		this.pageParams.current = page;
		this.getTrend();
	}
}
</script>
<style lang="scss" scoped>
.table-chart-view {
	width: 100%;
	height: 100%;
	padding: 0 10px;
	font-size: 14px;
	.flex-class {
		display: flex;
		align-items: center;
	}
	> div {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.nav-item {
		border-radius: 4px;
		border: solid 1px #3a7bef;
		color: #3a7bef;
		cursor: pointer;
		> div {
			padding: 5px 10px;
		}
	}
	.active-nav {
		background-color: #3a7bef;
		color: #fff;
	}
	.trend-item {
		height: calc(100% - 43px);
		padding: 10px 0 0;
		> div {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
