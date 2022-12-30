<template>
	<div class="branch-view">
		<panel-view heading="部门事件完成情况统计">
			<div class="chart">
				<v-chart
					:options="options"
					:autoresize="true"
					style="width: 100%; height: 100%"
				></v-chart>
			</div>
		</panel-view>
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
import { PanelView } from "@/components";
import { homeApi } from "@/api";
@Component({
	components: {
		PanelView,
	},
})
export default class StatisticArea extends Vue {
	color: any[] = [
		"#ff5a47",
		"#ffab3d",
		"#ff8355",
		"#58dde0",
		"#a287ff",
		"#5397ff",
	];
	get options() {
		return {
			color: this.color,
			grid: {
				top: "15%",
				right: "5%",
				left: "7%",
				bottom: "15%",
				containLable: true,
			},
			legend: {
				x: "right",
				icon: "circle",
				itemWidth: 8,
				itemHeight: 10,
				data: [
					"问题总数",
					"投诉举报",
					"巡查问题",
					"任务事件",
					"工程数",
				],
			},

			tooltip: {
				show: "true",
				trigger: "axis",
				axisPointer: {
					// 坐标轴指示器，坐标轴触发有效
					type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
				},
			},
			yAxis: {
				type: "value",
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
			xAxis: [
				{
					type: "category",
					axisTick: {
						show: false,
					},
					axisLine: {
						show: false,
						// lineStyle: {
						//   color: "#fff"
						// }
					},
					data: this.result.map((e: any) => e.deptName),
				},
				{
					type: "category",
					axisLine: {
						show: false,
					},
					axisTick: {
						show: false,
					},
					axisLabel: {
						show: false,
					},
					splitArea: {
						show: false,
					},
					splitLine: {
						show: false,
					},
					data: this.result.map((e: any) => e.deptName),
				},
			],
			series: [
				{
					name: "问题总数",
					type: "bar",
					xAxisIndex: 1,
					barWidth: 8,
					data: this.result.map((e: any) => e.total),
					// data: [53, 53, 53, 53]
				},
				{
					name: "投诉举报",
					type: "bar",
					xAxisIndex: 1,
					barWidth: 8,
					data: this.result.map((e: any) => e.tsjb),
					// data: [33, 33, 33, 33]
				},
				{
					name: "巡查问题",
					type: "bar",
					xAxisIndex: 1,
					barWidth: 8,
					data: this.result.map((e: any) => e.xcwt),
					// data: [43, 43, 43, 43]
				},
				{
					name: "任务事件",
					type: "bar",
					xAxisIndex: 1,
					barWidth: 8,
					data: this.result.map((e: any) => e.rwsj),
					// data: [33, 33, 33, 33]
				},
				{
					name: "工程数",
					type: "bar",
					xAxisIndex: 1,
					barWidth: 8,
					barGap: "100%",
					data: this.result.map((e: any) => e.gcjd),
					// data: [51, 51, 51, 51]
				},
				{
					name: "已处理总数",
					type: "bar",
					barWidth: 8,
					itemStyle: {
						color: "#5397ff",
					},
					data: this.result.map((e: any) => e.ycltotal),
					// data: [8, 15, 10, 5]
				},
				{
					name: "已处理投诉",
					type: "bar",
					barWidth: 8,
					itemStyle: {
						color: "#5397ff",
					},
					data: this.result.map((e: any) => e.ycltsjb),
					// data: [8, 15, 10, 5]
				},
				{
					name: "已处理巡查",
					type: "bar",
					barWidth: 8,
					itemStyle: {
						color: "#5397ff",
					},
					data: this.result.map((e: any) => e.yclxcwt),
					// data: [8, 15, 10, 5]
				},
				{
					name: "已处理任务",
					type: "bar",
					barWidth: 8,
					itemStyle: {
						color: "#5397ff",
					},
					data: this.result.map((e: any) => e.yclrwsj),
					// data: [8, 15, 10, 5]
				},
				{
					name: "已处理工程",
					type: "bar",
					barWidth: 8,
					barGap: "100%",
					itemStyle: {
						color: "#5397ff",
					},
					data: this.result.map((e: any) => e.gcjd),
					// data: [8, 17, 26, 6]
				},
			],
		};
	}
	mounted() {
		this.getInfo();
	}
	result: any = [];
	async getInfo() {
		let url = "jnsw/taskTotal/taskCompleteTotalDept";
		homeApi.getInfo({}, url).then((data: any) => {
			this.result = data;
		});
		// this.options.series[0].data = data.map((e:any))
	}
}
</script>
<style lang="scss" scoped>
.branch-view {
	width: 100%;
	height: 100%;
	.chart {
		padding: 14px;
		height: calc(100% - 52px);
		border-top: 1px solid #dde4eb;
	}
}
</style>
