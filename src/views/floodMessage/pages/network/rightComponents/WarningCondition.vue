<template>
	<!-- 雨水管网旱流预警情况 -->
	<div class="condition-view">
		<div>
			<v-chart
				:options="conditionOptions"
				:autoresize="true"
				style="width: 100%; height: 100%"
			></v-chart>
		</div>
		<div>
			<v-chart
				:options="distributionOptions"
				:autoresize="true"
				style="width: 100%; height: 100%"
			></v-chart>
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
import { networkApi } from "@/api";
@Component
export default class WarningCondition extends Vue {
	distributionColor: any[] = ["#5f77ec", "#5397ff", "#58dde0", "#feb543"];
	conditionColor: any[] = ["#5397ff", "#ff5a47"];
	xdata1: any[] = ["正常", "预警"];
	ydata1: any[] = [
		{
			name: "正常",
			value: 880,
		},
		{
			name: "预警",
			value: 120,
		},
	];
	xdata2: any[] = ["A片区", "B片区", "C片区", "D片区"];
	ydata2: any[] = [
		{
			name: "A片区",
			value: 9,
		},
		{
			name: "B片区",
			value: 15,
		},
		{
			name: "C片区",
			value: 40,
		},
		{
			name: "D片区",
			value: 30,
		},
	];
	conditionOptions: any = {
		color: this.conditionColor,
		tooltip: {
			show: true,
			trigger: "item",
		},
		title: {
			show: true,
			text: "全区预警情况",
			textAlign: "center",
			textVerticalAlign: "middle",
			right: "20%",
			bottom: "0",
			textStyle: {
				fontSize: 14,
				color: "#333333",
			},
		},
		legend: {
			orient: "vertical",
			top: "center",
			x: "right",
			icon: "circle",
			itemWidth: 10,
			itemHeight: 10,
			data: this.xdata1,
		},
		series: [
			{
				type: "pie",
				radius: ["55%", "70%"],
				center: ["40%", "45%"],
				label: {
					normal: {
						show: false,
						position: "center",
						formatter: "{d}{text|%}\n{text|预警率}",
						rich: {
							text: {
								fontSize: 12,
								color: "#999999",
								align: "center",
								verticalAlign: "middle",
							},
							value: {
								fontSize: 26,
								color: "#333",
								align: "center",
								verticalAlign: "middle",
								padding: 8,
							},
						},
					},
					emphasis: {
						show: true,
						textStyle: {
							fontSize: 26,
						},
					},
				},
				data: this.ydata1,
			},
		],
	};
	distributionOptions: any = {
		color: this.distributionColor,
		tooltip: {
			show: true,
			trigger: "item",
		},
		title: {
			show: true,
			text: "预警分布情况",
			textAlign: "center",
			textVerticalAlign: "middle",
			right: "20%",
			bottom: "0",
			textStyle: {
				fontSize: 14,
				color: "#333333",
			},
		},
		legend: {
			orient: "vertical",
			top: "center",
			x: "right",
			icon: "circle",
			itemWidth: 10,
			itemHeight: 10,
			data: this.xdata2,
		},
		series: [
			{
				type: "pie",
				radius: ["55%", "70%"],
				center: ["40%", "45%"],
				label: {
					normal: {
						show: false,
						position: "center",
						formatter: "{c}{text|个}\n{text|预警个数}",
						rich: {
							text: {
								fontSize: 12,
								color: "#999999",
								align: "center",
								verticalAlign: "middle",
							},
							value: {
								fontSize: 26,
								color: "#333",
								align: "center",
								verticalAlign: "middle",
								padding: 8,
							},
						},
					},
					emphasis: {
						show: true,
						textStyle: {
							fontSize: 26,
						},
					},
				},
				data: this.ydata2,
			},
		],
	};
	mounted() {
		this.getDistribution();
	}
	async getDistribution() {
		let that = this;
		that.conditionOptions.series[0].data = [];
		that.distributionOptions.series[0].data = [];
		that.distributionOptions.legend.data = [];
		let url = "jnsw/gwgl/map";
		this.$http
			.get(url)
			.then((res: any) => {
				let data = res.data;
				let normallist = res.data.map((e: any) => e.alarm.normal);
				let normal = eval(normallist.join("+"));
				let warnlist = res.data.map((e: any) => e.alarm.warn);
				let warn = eval(warnlist.join("+"));
				that.conditionOptions.series[0].data.push(
					{
						name: "正常",
						value: normal,
					},
					{
						name: "预警",
						value: warn,
					}
				);
				that.distributionOptions.legend.data = data.map(
					(e: any) => e.mc
				);
				console.log(that.distributionOptions.legend.data);
				that.distributionOptions.series[0].data = data.map((e: any) => {
					return {
						name: e.mc,
						value: e.alarm.warn,
					};
				});
			})
			.catch((err: any) => {
				this.$SucMessage.error(err.data.message);
			});
	}
}
</script>
<style lang="scss" scoped>
.condition-view {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	> div {
		width: 45%;
		height: 100%;
	}
}
</style>
