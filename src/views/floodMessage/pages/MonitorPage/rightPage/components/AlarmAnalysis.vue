<template>
	<!-- 内涝监测统计 -->
	<div class="analysis-view">
		<div class="analysis">
			<div class="analysis-item">
				<div class="charts">
					<v-chart
						:options="rateOption"
						:autoresize="true"
						style="width: 100%; height: 100%"
					></v-chart>
				</div>
				<div class="note">
					<div class="title"><span>预警类型</span></div>
					<div v-for="(item, index) in alarmType" :key="index">
						<span>{{ item.name }}</span>
						<span style="font-size: 20px" :class="item.color">{{
							item.amount
						}}</span>
						<span :class="item.color">个</span>
					</div>
				</div>
			</div>
			<div class="analysis-item">
				<div class="title"><span>报警分布情况</span></div>
				<div>
					<span>报警总数：</span
					><span class="total" style="font-size: 20px">{{
						counts
					}}</span
					><span class="total">个</span>
				</div>
				<div class="charts" v-if="pqList.length > 0">
					<v-chart
						:options="distributionOption"
						:autoresize="true"
						style="width: 100%; height: 100%"
					></v-chart>
				</div>
			</div>
			<div class="analysis-item">
				<div class="title"><span>区域报警分类统计图</span></div>
				<div class="charts" v-if="pqList.length > 0">
					<v-chart
						:options="typeOption"
						:autoresize="true"
						style="width: 100%; height: 100%"
					></v-chart>
				</div>
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
import { getRjfxList } from "@/api/flood/floodmange";
const echarts = require("echarts");
@Component({
	components: {},
})
export default class AlarmAnalysis extends Vue {
	counts: number = 0;
	alarmType: any = [
		{
			name: "预警数：",
			amount: "10",
			color: "orange-color",
		},
		{
			name: "警戒数：",
			amount: "16",
			color: "red-color",
		},
		{
			name: "提醒数：",
			amount: "7",
			color: "blue-color",
		},
	];
	dataArr: any = [
		{
			value: 0,
			name: "监控报警率",
		},
	];
	color: any = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
		{
			offset: 0,
			color: "#ff5a47", // 0% 处的颜色
		},
		{
			offset: 0.9,
			color: "#ffab3d", // 100% 处的颜色
		},
		{
			offset: 1,
			color: "#ffab3d", // 100% 处的颜色
		},
	]);
	colorSet: any = [
		[0, this.color],
		[1, "#dde4eb"],
	];
	rich: any = {
		white: {
			fontSize: 16,
			color: "#333",
			padding: [-20, 0, 0, 0],
		},
		bule: {
			fontSize: 36,
			color: "#333",
			padding: [-20, 0, 0, 0],
		},
		radius: {
			fontSize: 14,
			color: "#999",
			textAlign: "center",
		},
		size: {
			padding: [100, 0, 0, 0],
		},
	};
	pqList: any = [];
	bjzsList: any = [];
	jjsList: any = [];
	sbzsList: any = [];
	yjsList: any = [];
	totalArr: any = [];
	get rateOption() {
		return {
			tooltip: {
				trigger: "axis",
				axisPointer: {
					type: "shadow",
				},
			},
			series: [
				{
					type: "gauge",
					name: "外层辅助",
					radius: "88%",
					startAngle: "225",
					endAngle: "-45",
					splitNumber: "100",
					pointer: {
						show: false,
					},
					detail: {
						show: false,
					},
					data: [
						{
							value: 1,
						},
					],

					axisLine: {
						show: true,
						lineStyle: {
							color: [[1, "#dde4eb"]],
							width: 2,
							opacity: 1,
						},
					},
					axisTick: {
						show: false,
					},
					splitLine: {
						show: false,
						length: 20,
						lineStyle: {
							color: "#051932",
							width: 0,
							type: "solid",
						},
					},
					axisLabel: {
						show: false,
					},
				},
				{
					type: "gauge",
					radius: "80%",
					startAngle: "225",
					endAngle: "-45",
					pointer: {
						show: false,
					},
					detail: {
						formatter: function (value: any) {
							var num = Math.round(value);
							return (
								"{bule|" +
								num +
								"}{white|%}" +
								"{size|" +
								"}\n{radius|监控报警率}"
							);
						},
						rich: this.rich,
						offsetCenter: ["0%", "0%"],
					},
					data: this.dataArr,
					title: {
						show: false,
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: this.colorSet,
							width: 20,
							shadowOffsetX: 0,
							shadowOffsetY: 0,
							opacity: 1,
						},
					},
					axisTick: {
						show: false,
					},
					splitLine: {
						show: false,
						length: 25,
						lineStyle: {
							color: "#00377a",
							width: 2,
							type: "solid",
						},
					},
					axisLabel: {
						show: false,
					},
				},
				{
					name: "灰色内圈", //刻度背景
					type: "gauge",
					z: 2,
					radius: "55%",
					startAngle: "225",
					endAngle: "-45",
					axisLine: {
						// 坐标轴线
						lineStyle: {
							// 属性lineStyle控制线条样式
							color: [[1, "#dde4eb"]],
							width: 2,
							opacity: 1, //刻度背景宽度
						},
					},
					splitLine: {
						show: false,
					},
					axisLabel: {
						show: false,
					},
					pointer: {
						show: false,
					},
					axisTick: {
						show: false,
					},
					detail: {
						show: 0,
					},
				},
				{
					name: "白色圈刻度",
					type: "gauge",
					radius: "54%",
					startAngle: 225, //刻度起始
					endAngle: -45, //刻度结束
					z: 4,
					axisTick: {
						show: false,
					},
					splitLine: {
						length: 10, //刻度节点线长度
						lineStyle: {
							width: 2,
							color: "#dde4eb",
						}, //刻度节点线
					},
					axisLabel: {
						color: "rgba(255,255,255,0)",
						fontSize: 12,
					}, //刻度节点文字颜色
					pointer: {
						show: false,
					},
					axisLine: {
						lineStyle: {
							opacity: 0,
						},
					},
					detail: {
						show: false,
					},
					data: [
						{
							value: 0,
							name: "",
						},
					],
				},
			],
		};
	}
	get distributionOption() {
		return {
			tooltip: {
				trigger: "axis",
				axisPointer: {
					type: "shadow",
				},
			},
			grid: {
				top: "3%",
				right: "15%",
				left: "14%",
				bottom: "1%",
				containLable: true,
			},

			xAxis: {
				type: "value",
				show: false,
			},
			yAxis: [
				{
					type: "category",
					axisLine: {
						show: false,
					},
					axisTick: {
						show: false,
					},
					splitLine: {
						show: false,
						// color: "#999"
					},
					data: this.pqList,
				},
				{
					type: "category",
					axisLine: {
						show: false,
					},
					axisTick: {
						show: false,
					},
					splitLine: {
						show: false,
					},
				},
			],
			series: [
				{
					type: "bar",
					yAxisIndex: 1,
					zlevel: 1,
					itemStyle: {
						color: "#eff5ff",
						barBorderRadius: 5,
					},
					barWidth: 8,
					data: this.totalArr,
				},
				{
					name: "个数",
					type: "bar",
					itemStyle: {
						color: "#f2604f",
						barBorderRadius: 5,
					},
					zlevel: 2,
					barWidth: 8,
					data: this.bjzsList,
				},
			],
		};
	}
	get typeOption() {
		return {
			color: ["#2869d9", "#ff5a47", "#ffab3d", "#5397ff"],
			legend: {
				left: 0,
				itemWidth: 10,
				itemHeight: 10,
				icon: "circle",
				textStyle: {
					color: "#666666",
				},
				data: ["设备总数", "报警数量", "预警数量", "警戒数量"],
			},
			tooltip: {
				trigger: "axis",
				axisPointer: {
					type: "shadow",
				},
			},
			grid: {
				top: "20%",
				right: "10%",
				left: "14%",
				bottom: "1%",
				containLable: true,
			},

			xAxis: {
				type: "value",
				position: "top",
				axisLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				axisLabel: {
					color: "#666",
				},
				splitLine: {
					show: false,
				},
			},
			yAxis: {
				type: "category",
				name: "数量",
				nameTextStyle: {
					padding: [0, 37, -8, 0],
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
				data: this.pqList,
			},
			series: [
				{
					name: "设备总数",
					type: "bar",
					stack: "总量",
					barWidth: 8,
					data: this.sbzsList,
				},
				{
					name: "报警数量",
					type: "bar",
					stack: "总量",
					barWidth: 8,
					data: this.bjzsList,
				},
				{
					name: "预警数量",
					type: "bar",
					stack: "总量",
					barWidth: 8,
					data: this.yjsList,
				},
				{
					name: "警戒数量",
					type: "bar",
					stack: "总量",
					barWidth: 8,
					data: this.jjsList,
				},
			],
		};
	}

	mounted() {
		this.getData();
	}
	async getData() {
		this.pqList = [];
		this.bjzsList = [];
		this.jjsList = [];
		this.sbzsList = [];
		this.yjsList = [];
		this.totalArr = [];
		let data = await getRjfxList();
		if (data) {
			let list: any = [];
			Object.keys(data).forEach((key: any) => {
				if (key == "countBjzs") {
					this.alarmType[1].amount = data["countBjzs"].jjs;
					this.alarmType[0].amount = data["countBjzs"].yjs;
					this.alarmType[2].amount = data["countBjzs"].txs;
					this.counts = data["countBjzs"].bjzs;
					this.dataArr[0].value =
						Number(data["countBjzs"].yjrate) * 100;
					this.colorSet[0][0] = Number(data["countBjzs"].yjrate);
				} else {
					list.push({
						name: key,
						bjzs: data[key].bjzs,
						jjs: data[key].jjs,
						sbzs: data[key].sbzs,
						txs: data[key].txs,
						yjs: data[key].yjs,
					});
				}
			});
			if (list && list.length > 0) {
				let datas: any = list.map((it: any) => {
					return Number(it.bjzs);
				});
				this.pqList = list.map((it: any) => {
					return it.name;
				});
				this.bjzsList = list.map((it: any) => {
					return it.bjzs;
				});
				this.yjsList = list.map((it: any) => {
					return it.yjs;
				});
				this.sbzsList = list.map((it: any) => {
					return it.sbzs;
				});
				this.jjsList = list.map((it: any) => {
					return it.yjs;
				});
				let zs = Math.max(...datas) + Math.min(...datas);
				list.forEach((it: any) => {
					this.totalArr.push(zs);
				});
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.analysis-view {
	width: 100%;
	height: 100%;
	.analysis {
		padding: 15px;
		height: 100%;
		&-item {
			height: 41%;
			.title {
				padding-bottom: 10px;
				font-size: 16px;
				line-height: 20px;
				color: #333333;
			}
			&:first-of-type {
				display: flex;
				align-items: center;
				height: 18%;
				.charts {
					width: 50%;
					height: 100%;
				}
				.note {
					font-size: 14px;
					color: #999;
				}
			}
			&:nth-of-type(2) {
				padding-bottom: 10px;
				font-size: 14px;
				.charts {
					height: calc(100% - 60px);
				}
				.total {
					color: #ff5a47;
				}
			}
			&:nth-of-type(3) {
				.charts {
					height: calc(100% - 30px);
				}
			}
			.red-color {
				color: #ff5a47;
			}
			.orange-color {
				color: #ffab3d;
			}
			.blue-color {
				color: #3a7bef;
			}
		}
	}
}
</style>
