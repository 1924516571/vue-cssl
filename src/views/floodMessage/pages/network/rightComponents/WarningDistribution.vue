<template>
	<!-- 雨水管网旱流预警分布 -->
	<div class="distribution-view">
		<v-chart
			:options="options"
			:autoresize="true"
			style="width: 100%; height: 100%"
		></v-chart>
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
import { networkApi } from "@/api";
@Component
export default class WarningDistribution extends Vue {
	color: any[] = ["#5397ff", "#ff5a47"];
	options: any = {
		color: this.color,
		tooltip: {
			trigger: "axis",
		},
		grid: {
			top: "15%",
			containLable: true,
		},
		legend: {
			x: "right",
			icon: "circle",
			itemWidth: 10,
			itemHeight: 10,
			data: ["正常数量", "预警数量"],
		},
		xAxis: {
			type: "category",
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			axisLabel: {
				rotate: -30,
				color: "#666",
			},
			splitLine: {
				show: false,
			},
			data: [
				"A片区",
				"B片区",
				"C片区",
				"D片区",
				"E片区",
				"F片区",
				"G片区",
				"H片区",
			],
		},
		yAxis: {
			name: "单位：个",
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
				name: "正常数量",
				type: "bar",
				stack: "总量",
				barWidth: 14,
				data: [709, 917, 455, 610, 719, 433, 544, 285],
			},
			{
				name: "预警数量",
				type: "bar",
				stack: "总量",
				data: [9, 7, 5, 61, 19, 33, 44, 85],
			},
		],
	};

	mounted() {
		this.getDistribution();
	}
	async getDistribution() {
		let that = this;
		that.options.xAxis.data = [];
		that.options.series[0].data = [];
		that.options.series[1].data = [];
		let url = "jnsw/gwgl/map";
		this.$http
			.get(url)
			.then((res: any) => {
				let data = res.data;
				that.options.xAxis.data = data.map((e: any) => e.mc);
				that.options.series[0].data = data.map(
					(e: any) => e.alarm.normal
				);
				that.options.series[1].data = data.map(
					(e: any) => e.alarm.warn
				);
			})
			.catch((err: any) => {
				this.$SucMessage.error(err.data.message);
			});
	}
}
</script>
<style lang="scss" scoped>
.distribution-view {
	width: 100%;
	height: 100%;
}
</style>
