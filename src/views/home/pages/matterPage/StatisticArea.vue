<template>
	<div class="area-view">
		<panel-view heading="片区年度事件完成情况统计">
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
	color: any[] = ["#5397ff", "#ffab3d"];
	options: any = {
		color: this.color,
		tooltip: {
			trigger: "axis",
		},
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
			itemWidth: 10,
			itemHeight: 10,
			data: ["未处理数量", "已处理数量"],
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
			data: [],
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
				name: "未处理数量",
				type: "bar",
				stack: "总量",
				barWidth: 14,
				data: [],
			},
			{
				name: "已处理数量",
				type: "bar",
				stack: "总量",
				data: [],
			},
		],
	};

	mounted() {
		// this.getInfo();
	}
	async getInfo() {
		this.options.xAxis.data = [];
		this.options.series[0].data = [];
		this.options.series[1].data = [];
		let url = "jnsw/taskTotal/taskTotalOfArea";
		homeApi.getInfo({}, url).then((data: any) => {
			if (data) {
				this.options.xAxis.data = data.map((e: any) => e.mc);
				this.options.series[0].data = data.map(
					(e: any) => e.count - e.yclCount
				);
				this.options.series[1].data = data.map((e: any) => e.yclCount);
			}
		});
	}
}
</script>
<style lang="scss" scoped>
.area-view {
	width: 100%;
	height: 100%;
	.chart {
		padding: 14px;
		height: calc(100% - 52px);
		border-top: 1px solid #dde4eb;
	}
}
</style>
