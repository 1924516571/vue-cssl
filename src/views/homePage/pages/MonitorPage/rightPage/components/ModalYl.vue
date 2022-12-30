<template>
	<!--  雨量弹框  -->
	<div class="mon-bz">
		<div class="mon-nav">
			<span :class="{ active: type == '1' }" @click="type = '1'"
				>时段雨量</span
			>
			<span :class="{ active: type == '2' }" @click="type = '2'"
				>点雨量</span
			>
		</div>
		<div class="mon-chart" v-if="type == '1'">
			<div class="process-item">
				<suc-date-picker
					v-model="comDateKs"
					style="width: 180px"
					:options="{ type: 'datetime' }"
				></suc-date-picker>
				<span style="margin: 0 10px; line-height: 32px">~</span>
				<suc-date-picker
					v-model="comDateJs"
					style="width: 180px; margin-right: 10px"
					:options="{ type: 'datetime' }"
				></suc-date-picker>
				<suc-button type="primary" :debounce="800" @click="sdSearch"
					>搜索</suc-button
				>
			</div>
			<div class="process-item">
				<span>雨量统计</span>
				<span>全区面雨量：{{ qqmyl }}mm</span>
			</div>
			<div class="process-item">
				<div class="line-item">
					<v-chart
						:options="options"
						:autoresize="true"
						style="width: 100%; height: 100%"
						ref="char"
					></v-chart>
				</div>
			</div>
			<div class="process-item">
				<div class="line-item">
					<table-page
						:customHeight="220"
						:columns="columns"
						:tableData="tableData"
						:pageParams="pageParams"
						@get-page="getPage"
						@get-size="getSize"
					>
					</table-page>
				</div>
			</div>
		</div>
		<div class="mon-chart" v-if="type == '2'">
			<div class="process-item">
				<suc-select
					v-model="process.qy"
					:options="pqList"
					:config="{ placeholder: '区域', clearable: true }"
					@on-change="pqChange"
					style="width: 160px"
				></suc-select>
				<suc-select
					v-model="process.bz"
					:options="ylList"
					:config="{ placeholder: '站点' }"
					style="width: 160px"
				></suc-select>
				<suc-date-picker
					v-model="process.stm"
					style="width: 180px"
				></suc-date-picker>
				<span style="margin: 0 10px; line-height: 32px">~</span>
				<suc-date-picker
					v-model="process.etm"
					style="width: 180px; margin-right: 10px"
				></suc-date-picker>
				<suc-button type="primary" :debounce="800" @click="dylSearch"
					>搜索</suc-button
				>
			</div>
			<div class="process-item">
				<span>单站点雨量棒图</span>
				<span>累计雨量：{{ dyl }}mm</span>
			</div>
			<div class="process-item">
				<div class="line-item">
					<v-chart
						:options="optionsPro"
						:autoresize="true"
						style="width: 100%; height: 100%"
					></v-chart>
				</div>
			</div>
			<div class="process-item">
				<div class="line-item">
					<table-page
						:columns="processCol"
						:tableData="processData"
						:pageParams="process"
						:customHeight="220"
						@get-size="getProSize"
						@get-page="getProPage"
					></table-page>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { TablePage } from "@/components";
import {
	SucDatePicker,
	SucButton,
	SucCol,
	SucCheckbox,
	SucCheckboxGroup,
	SucRow,
	SucSelect,
} from "@suc/ui";
import { SelectConfig, SelectOptions } from "@suc/ui/interfaces";
import { floodManageApi, publicApi } from "@/api";
@Component({
	components: {
		SucButton,
		SucDatePicker,
		SucCol,
		SucCheckbox,
		SucCheckboxGroup,
		SucRow,
		SucSelect,
		TablePage,
	},
})
export default class MainPanel extends Vue {
	type: string = "1";
	qqmyl: number = 0;
	dyl: number = 0;
	comDateKs: any = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3);
	comDateJs: any = new Date();
	alarmParams: any = {
		currentPage: 1,
		pageSize: 10,
	};
	pageParams: any = {
		total: 0,
		current: 1,
		pageSize: 10,
	};
	process: any = {
		current: 1,
		pageSize: 10,
		total: 0,
		stm: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3),
		etm: new Date(),
		qy: "all",
		bz: "",
	};
	selOptions: SelectOptions = [];
	pqList: any[] = [];
	ylList: any[] = [];
	tableData: any[] = [];
	processData: any[] = [];
	columns: any[] = [
		{
			type: "index",
			title: "序号",
		},
		{
			title: "区域",
			key: "pqmc",
		},
		{
			title: "站点名称",
			key: "rvnm",
		},
		{
			title: "雨量",
			key: "value",
		},
		{
			title: "更新时间",
			width: 140,
			key: "tm",
		},
	];
	processCol: any[] = [
		{
			title: "序号",
			type: "index",
		},
		{
			title: "区域",
			key: "pqmc",
		},
		{
			title: "站点名称",
			key: "rvnm",
		},
		{
			title: "雨量",
			key: "value",
		},
		{
			title: "更新时间",
			width: 120,
			key: "gxsj",
		},
	];
	optData: any[] = [];
	proOptData: any[] = [];

	mounted() {
		this.getPq();
		this.getData();
		this.getTable();
	}

	//获取片区
	async getPq() {
		this.pqList = [];
		this.process.qy = "all";
		let data = await publicApi.getPq();
		if (data.length > 0) {
			this.pqList = data.map((e: any) => {
				return {
					value: e[0],
					label: e[1],
				};
			});
			this.pqList.unshift({ value: "all", label: "全部" });
		}
		this.getYl();
	}
	//获取雨量站点
	async getYl() {
		this.ylList = [];
		this.process.bz = "";
		let params = {
			pqid: this.process.qy == "all" ? "" : this.process.qy,
		};
		let data = await floodManageApi.getYlzList(params);
		if (data.data && data.data.length > 0) {
			this.ylList = data.data.map((e: any) => {
				return {
					value: e.RVNM,
					label: e.RVNM,
				};
			});
			this.process.bz = this.ylList[0].value;
			this.getProTable();
			this.getProChart();
		}
	}
	//片区选择
	pqChange() {
		this.getYl();
	}
	getPage(page: number) {
		this.pageParams.current = page;
		this.getTable();
	}
	getSize(size: number) {
		this.pageParams.current = 1;
		this.pageParams.pageSize = size;
		this.getTable();
	}
	getProPage(page: number) {
		this.process.current = page;
		this.getProTable();
	}
	getProSize(size: number) {
		this.process.current = 1;
		this.process.pageSize = size;
		this.getProTable();
	}
	get options() {
		return {
			tooltip: {
				trigger: "axis",
				axisPointer: {
					type: "shadow",
				},
			},
			grid: {
				top: "10%",
				right: "5%",
				left: "5%",
				bottom: "10%",
				containLable: true,
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
					// rotate: -30,
					color: "#666",
				},
				splitLine: {
					show: false,
				},
				data: this.optData.map((it: any) => it.rvnm),
			},
			yAxis: {
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
					name: "雨量",
					type: "bar",
					itemStyle: {
						color: "#5bc172",
					},
					// stack: '总量',
					barWidth: 14,
					data: this.optData.map((it: any) => it.jyl),
				},
			],
		};
	}
	get optionsPro() {
		return {
			tooltip: {
				trigger: "axis",
				axisPointer: {
					type: "shadow",
				},
			},
			grid: {
				top: "10%",
				right: "5%",
				left: "5%",
				bottom: "10%",
				containLable: true,
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
					// rotate: -30,
					color: "#666",
				},
				splitLine: {
					show: false,
				},
				data: this.proOptData.map((it: any) => it.gxsj),
			},
			yAxis: {
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
					name: "雨量",
					type: "bar",
					itemStyle: {
						color: "#5bc172",
					},
					// stack: '总量',
					barWidth: 14,
					data: this.proOptData.map((it: any) => it.value),
				},
			],
		};
	}

	//时段雨量搜索
	sdSearch() {
		this.pageParams.current = 1;
		this.getData();
		this.getTable();
	}

	async getData() {
		let params: any = {
			end: this.$utils.dateFormat(
				new Date(this.comDateJs),
				"yyyy-MM-dd HH:mm:ss"
			),
			start: this.$utils.dateFormat(
				new Date(this.comDateKs),
				"yyyy-MM-dd HH:mm:ss"
			),
			type: "11",
		};
		this.qqmyl = 0;
		let data = await floodManageApi.getYlSjdChart(params);
		this.qqmyl = data.count;
		if (data.data && data.data.length > 0) {
			this.optData = data.data;
		}
	}
	async getTable() {
		let params: any = {
			end: this.$utils.dateFormat(
				new Date(this.comDateJs),
				"yyyy-MM-dd HH:mm:ss"
			),
			start: this.$utils.dateFormat(
				new Date(this.comDateKs),
				"yyyy-MM-dd HH:mm:ss"
			),
			currentPage: this.pageParams.current,
			pageSize: this.pageParams.pageSize,
			type: "11",
		};
		let data = await floodManageApi.getYlDyTable(params);
		this.pageParams.total = data.count;
		if (data.data && data.data.length > 0) {
			this.tableData = data.data;
		}
	}

	//点雨量搜索
	dylSearch() {
		this.process.current = 1;
		this.getProTable();
		this.getProChart();
	}
	async getProTable() {
		if (this.process.bz) {
			let params: any = {
				end: this.$utils.dateFormat(
					new Date(this.process.etm),
					"yyyy-MM-dd"
				),
				start: this.$utils.dateFormat(
					new Date(this.process.stm),
					"yyyy-MM-dd"
				),
				currentPage: this.process.current,
				pageSize: this.process.pageSize,
				mc: this.process.bz,
				type: "31",
			};
			let data = await floodManageApi.getYlDyTable(params);
			this.process.total = data.count;
			if (data.data && data.data.length > 0) {
				this.processData = data.data;
				this.processData.forEach((it: any) => {
					if (it.tm) {
						it.gxsj = it.tm.slice(0, 10);
					}
				});
			}
		} else {
			this.$Message.success("请选择站点！");
		}
	}

	async getProChart() {
		if (this.process.bz) {
			let params: any = {
				end: this.$utils.dateFormat(
					new Date(this.process.etm),
					"yyyy-MM-dd"
				),
				start: this.$utils.dateFormat(
					new Date(this.process.stm),
					"yyyy-MM-dd"
				),
				mc: this.process.bz,
				type: "31",
			};
			this.dyl = 0;
			let data = await floodManageApi.getYlDyChart(params);
			this.dyl = data.sum;
			if (data.data && data.data.length > 0) {
				this.proOptData = data.data;
				this.proOptData.forEach((it: any) => {
					if (it.tm) {
						it.gxsj = it.tm.slice(0, 10);
					}
				});
			}
		}
	}
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
.mon-bz {
	width: 100%;
	height: 100%;
	.mon-nav {
		padding-bottom: 15px;
		span {
			display: inline-block;
			width: 80px;
			height: 28px;
			text-align: center;
			line-height: 28px;
			background: #fff;
			color: #3a7bef;
			border-radius: 3px 0 0 3px;
			cursor: pointer;
			border: 1px solid #3a7bef;
			&:nth-child(2) {
				border-radius: 0 3px 3px 0;
			}
			&.active {
				background: #3a7bef;
				color: #fff;
			}
		}
	}
	.mon-chart {
		width: 100%;
		height: calc(100% - 58px);
		padding: 5px 15px 15px 15px;
		.process-item {
			&:first-of-type {
				display: flex;
				.suc-select {
					margin-right: 15px;
				}
			}
			&:nth-of-type(2) {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 10px 20px 0 20px;
				font-weight: bold;
			}
			&:nth-of-type(3) {
				height: 200px;
			}
			&:nth-of-type(4) {
				margin-top: 10px;
			}
			.line-item {
				padding: 0 5px;
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
