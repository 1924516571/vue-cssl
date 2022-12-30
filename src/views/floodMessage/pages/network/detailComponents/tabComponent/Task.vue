<template>
	<!-- 事件任务 -->
	<div class="table-chart-view">
		<div>
			<div class="flex-class">
				<div class="flex-class nav-item">
					<!-- <div
						:class="{ 'active-nav': navIndex == index }"
						v-for="(item, index) in navs"
						:key="index"
						@click="getNav(index)"
					>
						<span>{{ item.label }}</span>
					</div> -->
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
				<div>
					<search-component @input="getSearch"></search-component>
				</div>
			</div>
		</div>
		<div class="trend-item">
			<div v-if="navIndex == 1">
				<v-chart
					:options="lineOptions"
					:autoresize="true"
					style="width: 100%; height: 100%"
				></v-chart>
			</div>
			<div v-if="navIndex == 0">
				<table-page
					:columns="columns"
					:tableData="tableData"
					:pageParams="pageParams"
					@get-page="getPage"
					@get-size="getSize"
				></table-page>
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
import { SucDatePicker } from "@suc/ui";
import { DatePicker } from "element-ui";
import { DatePickerOptions } from "@suc/ui/interfaces";
import { SearchComponent } from "../../../public";
import { TablePage } from "@/components";
import { networkApi } from "../../../../../../api";
import { State } from "vuex-class";
@Component({
	components: {
		SucDatePicker,
		SearchComponent,
		TablePage,
		ElDatePicker: DatePicker,
	},
})
export default class Task extends Vue {
	@State netWork: any;
	@Watch("netWork", { immediate: true, deep: true })
	netWorkChange(data: any) {
		if (data.row) {
			this.taskParams.id = data.row.SBID;
		}
	}
	color: any[] = ["#5f77ec", "#5397ff", "#58dde0", "#feb543"];
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
			boundaryGap: false,
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			splitLine: {
				show: false,
			},
			data: [
				"10:00",
				"10:30",
				"11:00",
				"11:30",
				"12:00",
				"12:30",
				"13:00",
				"13:30",
				"14:00",
				"14:30",
				"15:00",
			],
		},
		yAxis: {
			type: "value",
			name: "单位",
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
				data: [20, 32, 901, 34, 290, 330, 320, 43, 23, 55, 333],
			},
		],
	};
	columns: any[] = [
		{
			title: "序号",
			type: "index",
		},
		{
			title: "片区",
			key: "PQMC",
		},
		{
			title: "任务名称",
			key: "RWMC",
		},
		// {
		// 	title: "周边自动监测站",
		// 	key: "zdmc",
		// },
		{
			title: "发布人",
			key: "FBR",
		},
		{
			title: "发布时间",
			key: "GMT_CREATE",
		},
		{
			title: "处理状态",
			key: "STATUS",
		},
		{
			title: "处理人",
			key: "JSR",
		},
		{
			title: "任务类型",
			key: "RWLX",
		},
		{
			title: "状态更新时间",
			key: "GMT_MODIFIED",
		},
	];
	tableData: any[] = [
		{
			area: "A片区",
			site: "河定桥北",
			level1: "+0.03",
			level3: "-0.03",
			level6: "-0.03",
			level12: "+0.03",
			time: "2019-12-12",
		},
	];
	date: any = "";
	// options: DatePickerOptions = {
	//   type: "datetimerange",
	// };
	navIndex: number = 0;
	navs: any[] = [
		{
			label: "事件详情",
		},
		{
			label: "统计分析",
		},
	];
	getNav(index: number) {
		this.navIndex = index;
	}
	pageParams: any = {
		current: 1,
		total: 0,
		pageSize: 10,
	};
	taskParams: any = {
		start: "",
		end: "",
		name: "",
		id: "",
		currentPage: 1,
		pageSize: 10,
	};
	mounted() {
		this.init();
		this.getTask();
	}
	init() {
		this.date = [
			new Date(new Date().setHours(0, 0, 0, 0)),
			new Date(new Date().setHours(23, 59, 59, 59)),
		];
		this.taskParams.start = this.$utils.dateFormat(
			this.date[0],
			"yyyy-MM-dd HH:mm:ss"
		);
		this.taskParams.end = this.$utils.dateFormat(
			this.date[1],
			"yyyy-MM-dd HH:mm:ss"
		);
	}
	async getTask() {
		let that = this;
		that.taskParams.currentPage = that.pageParams.current;
		that.taskParams.pageSize = that.pageParams.pageSize;
		const taskList = await networkApi.getJcdTaskList(that.taskParams);
		let { totalCount, data } = taskList;
		that.tableData = data;
		that.pageParams.total = totalCount;
	}
	getPage(page: number) {
		this.pageParams.current = page;
		this.getTask();
	}
	getSize(size: number) {
		this.pageParams.current = 1;
		this.pageParams.pageSize = size;
		this.getTask();
	}
	getDate(date: any) {
		this.taskParams.start = this.$utils.dateFormat(
			date[0],
			"yyyy-MM-dd HH:mm:ss"
		);
		this.taskParams.end = this.$utils.dateFormat(
			date[1],
			"yyyy-MM-dd HH:mm:ss"
		);
	}
	getSearch(val: string) {
		this.taskParams.name = val;
		this.getTask();
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
