<template>
	<!-- 事项 -->
	<div class="module-view">
		<div class="top">
			<div
				class="amount"
				v-for="(item, index) in amountList"
				:key="'amount' + index"
			>
				<div class="amount-item bg-shadow">
					<div>
						<div>
							<span class="second-color">{{ item.name }}</span>
						</div>
						<div>
							<span class="icon" :class="item.icon"></span>
							<span style="font-size: 26px">{{
								item.number
							}}</span>
							<span class="font-large">{{ item.dw }}</span>
						</div>
					</div>

					<div class="amount-item-sub">
						<div>
							<span class="font-large" :class="item.color"
								>{{ item.property.toFixed(2) / 1 }}%</span
							>
							<span :class="item.icon1"></span>
						</div>
						<div>
							<span class="help-color">{{
								item.propertyName
							}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="content">
			<div class="content-item">
				<div class="statistic bg-shadow">
					<statistic-pie
						title="本年任务量统计"
						:echartData="echartsAll"
					></statistic-pie>
				</div>
				<div class="statistic bg-shadow">
					<statistic-pie
						title="年度待办统计"
						:echartData="echartsTodo"
					></statistic-pie>
				</div>
				<div class="statistic bg-shadow">
					<statistic-pie
						title="年度已办统计"
						:echartData="echartsDo"
					></statistic-pie>
				</div>
			</div>
			<div class="content-item">
				<div class="statistic bg-shadow">
					<statistic-pie
						title="部门年度任务量统计"
						:echartData="echartsBm"
					></statistic-pie>
				</div>
				<div class="statistic bg-shadow">
					<statistic-area></statistic-area>
				</div>
				<div class="statistic bg-shadow">
					<statistic-branch></statistic-branch>
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
import { StatisticPie, StatisticArea, StatisticBranch } from "./matterPage";
import { homeApi } from "@/api";
@Component({
	components: {
		StatisticPie,
		StatisticArea,
		StatisticBranch,
	},
})
export default class Matter extends Vue {
	get amountList() {
		return [
			{
				name: "本月总事件数",
				icon: "iconfont icon-guanwangjianbao blue-color",
				number: this.amountData.total,
				dw: "件",
				property: Math.abs(this.amountData.totalRatio) * 100,
				icon1:
					this.amountData.totalRatio > 0
						? "iconfont icon-jiantou red-color"
						: this.amountData.totalRatio == 0
						? ""
						: "iconfont icon-jiantouxia green-color",
				propertyName: "同比上月",
				color:
					this.amountData.totalRatio > 0
						? "red-color"
						: "green-color",
			},
			{
				name: "本月巡查问题数",
				icon: "iconfont icon-shouye-xunchawentishu red-color",
				number: this.amountData.xcwt,
				dw: "件",
				property: Math.abs(this.amountData.xcwtRatio) * 100,
				icon1:
					this.amountData.xcwtRatio > 0
						? "iconfont icon-jiantou red-color"
						: this.amountData.xcwtRatio == 0
						? ""
						: "iconfont icon-jiantouxia green-color",
				propertyName: "同比上月",
				color:
					this.amountData.xcwtRatio > 0 ? "red-color" : "green-color",
			},
			{
				name: "本月管网事件数",
				icon: "iconfont icon-guanwang blue-color",
				number: this.amountData.gwsj,
				dw: "件",
				property: Math.abs(this.amountData.gwsjRatio) * 100,
				icon1:
					this.amountData.gwsjRatio > 0
						? "iconfont icon-jiantou red-color"
						: this.amountData.gwsjRatio == 0
						? ""
						: "iconfont icon-jiantouxia green-color",
				propertyName: "同比上月",
				color:
					this.amountData.gwsjRatio > 0 ? "red-color" : "green-color",
			},
			{
				name: "本月内涝事件数",
				icon: "iconfont icon-fangxun blue-color",
				number: this.amountData.nlsj,
				dw: "件",
				property: Math.abs(this.amountData.nlsjRatio) * 100,
				icon1:
					this.amountData.nlsjRatio > 0
						? "iconfont icon-jiantou red-color"
						: this.amountData.nlsjRatio == 0
						? ""
						: "iconfont icon-jiantouxia green-color",
				propertyName: "同比上月",
				color:
					this.amountData.nlsjRatio > 0 ? "red-color" : "green-color",
			},
			{
				name: "本周水环境事件数",
				icon: "iconfont icon-hehu blue-color",
				number: this.amountData.shjsj,
				dw: "件",
				property: Math.abs(this.amountData.shjsjRatio) * 100,
				icon1:
					this.amountData.shjsjRatio > 0
						? "iconfont icon-jiantou red-color"
						: this.amountData.shjsjRatio == 0
						? ""
						: "iconfont icon-jiantouxia green-color",
				propertyName: "同比上周",
				color:
					this.amountData.shjsjRatio > 0
						? "red-color"
						: "green-color",
			},
			{
				name: "本周投诉举报数",
				icon: "iconfont icon-shouye-tousujubaoshu orange-color",
				number: this.amountData.tsjb,
				dw: "件",
				property: Math.abs(this.amountData.tsjbRatio) * 100,
				icon1:
					this.amountData.tsjbRatio > 0
						? "iconfont icon-jiantou red-color"
						: this.amountData.tsjbRatio == 0
						? ""
						: "iconfont icon-jiantouxia green-color",
				propertyName: "同比上周",
				color:
					this.amountData.tsjbRatio > 0 ? "red-color" : "green-color",
			},
		];
	}

	// create () {
	//   this.getEchart()
	// }
	mounted() {
		this.getInfo();
		this.getEchart();
		this.getBm();
	}
	amountData: any = {};
	async getInfo() {
		let url = "jnsw/taskTotal/taskOverview";
		homeApi.getInfo({}, url).then((data: any) => {
			this.amountData = data;
		});
	}
	echartsAll: any[] = []; //本年任务统计
	echartsTodo: any[] = []; //年度待办统计
	echartsDo: any[] = []; //年度已办统计
	echartsBm: any[] = []; //部门年度任务量统计
	async getEchart() {
		let url = "jnsw/taskTotal/taskTotalOfYear";
		homeApi.getInfo({}, url).then((allData: any) => {
			if (allData) {
				this.echartsAll = [
					{
						value: allData.gcjd,
						name: "工程进度",
					},
					{
						value: allData.gwsj,
						name: "管网事件",
					},
					{
						value: allData.nlsj,
						name: "内涝事件",
					},
					// {
					//   value: allData.rwsj,
					//   name: "任务事件",
					// },
					{
						value: allData.shjsj,
						name: "水环境事件",
					},
					{
						value: allData.tsjb,
						name: "投诉举报",
					},
					{
						value: allData.xcwt,
						name: "巡查问题",
					},
				];
			}
		});
		homeApi.getInfo({ status: "0" }, url).then((todoData: any) => {
			if (todoData) {
				this.echartsTodo = [
					{
						value: todoData.gcjd,
						name: "工程进度",
					},
					{
						value: todoData.gwsj,
						name: "管网事件",
					},
					{
						value: todoData.nlsj,
						name: "内涝事件",
					},
					// {
					//   value: todoData.rwsj,
					//   name: "任务事件",
					// },
					{
						value: todoData.shjsj,
						name: "水环境事件",
					},
					{
						value: todoData.tsjb,
						name: "投诉举报",
					},
					{
						value: todoData.xcwt,
						name: "巡查问题",
					},
				];
			}
		});
		homeApi.getInfo({ status: "1" }, url).then((doData: any) => {
			if (doData) {
				this.echartsDo = [
					{
						value: doData.gcjd,
						name: "工程进度",
					},
					{
						value: doData.gwsj,
						name: "管网事件",
					},
					{
						value: doData.nlsj,
						name: "内涝事件",
					},
					// {
					//   value: doData.rwsj,
					//   name: "任务事件",
					// },
					{
						value: doData.shjsj,
						name: "水环境事件",
					},
					{
						value: doData.tsjb,
						name: "投诉举报",
					},
					{
						value: doData.xcwt,
						name: "巡查问题",
					},
				];
			}
		});
	}
	async getBm() {
		let url = "jnsw/taskTotal/taskTotalOfDepartment";
		homeApi.getInfo({}, url).then((data: any) => {
			if (data) {
				for (let key in data) {
					if (key != "total") {
						this.echartsBm.push({
							value: data[key],
							name: key,
						});
					}
				}
			}
		});
	}
}
</script>
<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
.module-view {
	padding: 10px;
	background-color: $pages-bg;
	.top {
		display: flex;
		padding-bottom: 10px;
		// height: 100px;
		.amount {
			padding-right: 10px;
			width: calc(100% / 6);

			&:last-of-type {
				padding-right: 0;
			}
			&-item {
				padding: 10px 0;
				display: flex;
				justify-content: space-around;
				font-size: $font-size-base;
				color: #333;
				&-sub {
					padding-top: 10px;
				}
			}
			.font-large {
				display: inline-block;
				padding-right: 6px;
				font-size: $font-size-large;
			}
			.icon {
				display: inline-block;
				padding-right: 6px;
			}
			.second-color {
				color: #666;
			}
			.help-color {
				color: #999;
			}
			.blue-color {
				color: #3a7bef;
			}
			.green-color {
				color: #32bb53;
			}
			.red-color {
				color: #ff5a47;
			}
			.orange-color {
				color: #ffab3d;
			}
		}
	}
	.content {
		height: calc(100% - 100px);
		&-item {
			display: flex;
			&:first-of-type {
				height: 50%;
				padding-bottom: 10px;
			}
			&:nth-of-type(2) {
				height: 50%;
			}
			.statistic {
				width: 32%;
				&:nth-of-type(2) {
					margin: 0 10px;
					width: calc(36% - 20px);
				}
			}
		}
	}
}
</style>
