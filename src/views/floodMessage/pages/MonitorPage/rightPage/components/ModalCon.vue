<template>
	<!--  内涝监测弹框  -->
	<div class="mon-jc">
		<div class="mon-nav">
			<span :class="{ active: type == '1' }" @click="type = '1'"
				>预警分析</span
			>
			<span :class="{ active: type == '2' }" @click="type = '2'"
				>过程线</span
			>
		</div>
		<div class="mon-chart" v-if="type == '1'">
			<table-page
				:customHeight="400"
				:columns="columns"
				:tableData="tableData"
				:pageParams="pageParams"
				@get-page="getPage"
				@get-size="getSize"
			>
			</table-page>
		</div>
		<div class="mon-chart" v-if="type == '2'">
			<div class="process-item">
				<suc-select
					v-model="process.qy"
					:options="qyOptions"
					:config="{ placeholder: '区域', clearable: true }"
					@on-change="getChange"
					style="width: 150px"
				></suc-select>
				<suc-select
					v-model="sbids"
					:options="selOptions"
					:config="{
						placeholder: '站点（多选）',
						clearable: true,
						multiple: true,
						'max-tag-count': 1,
						filterable: true,
					}"
					style="width: 240px"
				></suc-select>
				<suc-date-picker
					v-model="process.beginTime"
					style="width: 200px"
					:options="{ type: 'datetime' }"
				></suc-date-picker>
				<span style="margin: 0 10px; line-height: 32px">~</span>
				<suc-date-picker
					v-model="process.endTime"
					style="width: 200px; margin-right: 10px"
					:options="{ type: 'datetime' }"
				></suc-date-picker>
				<suc-button type="primary" :debounce="800" @click="search"
					>搜索</suc-button
				>
			</div>
			<div class="process-item">
				<div class="heading">
					<div>
						<template>
							<suc-row>
								<suc-col>
									<suc-checkbox-group
										v-model="checkboxGroupValue"
										@on-change="getCheck"
									>
										<suc-checkbox label="jjsw"
											>警戒水位</suc-checkbox
										>
										<suc-checkbox label="maxsw"
											>历史最高水位</suc-checkbox
										>
									</suc-checkbox-group>
								</suc-col>
							</suc-row>
						</template>
					</div>
				</div>
				<div class="line-item">
					<v-chart
						v-if="options && options.series.length > 0"
						:options="options"
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
						:pageParams="processPage"
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
	@Prop({
		type: Object,
		default: () => {},
	})
	rowList!: any;
	type: string = "1";
	alarmParams: any = {
		currentPage: 1,
		pageSize: 10,
		sbid: "",
		yjid: "",
	};
	pageParams: any = {
		total: 0,
		current: 1,
		pageSize: 10,
	};
	process: any = {
		currentPage: 1,
		pageSize: 10,
		beginTime: new Date(new Date().getTime() - 3600 * 1000 * 24 * 3),
		endTime: new Date(),
		qy: "",
	};
	processPage: any = {
		total: 0,
		current: 1,
		pageSize: 10,
	};
	options: any = {
		color: ["#5f77ec", "#6907ee", "#58dde0", "#feb543"],
		tooltip: {
			trigger: "axis",
		},
		legend: {
			show: true,
			x: "90",
			top: "14%",
			icon: "circle",
			itemWidth: 10,
			itemHeight: 10,
			textStyle: {
				color: "#1bb4f6",
			},
			data: [],
		},
		grid: {
			top: "60px",
			left: "60px",
			right: "30px",
			bottom: "30px",
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
			splitLine: {
				show: false,
			},
			data: [],
		},
		yAxis: {
			type: "value",
			name: "单位：米",
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
		series: [],
	};
	sbids: Array<any> = [];
	qyOptions: Array<any> = [];
	selOptions: Array<any> = [];
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
			key: "yjmc",
		},
		{
			title: "实时水位（米）",
			key: "value",
		},
		{
			title: "水位占比（%）",
			key: "sw",
		},
		{
			title: "提醒比（%）",
			key: "txsw",
		},
		{
			title: "警戒比（%）",
			key: "jjsw",
		},
		{
			title: "预警比（%）",
			key: "yjsw",
		},
		{
			title: "预警时间",
			width: 140,
			key: "tm",
		},
	];
	tableData: any[] = [];
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
			key: "yjmc",
		},
		{
			title: "水位（米）",
			key: "value",
		},
		{
			title: "警戒水位（米）",
			key: "jjsw",
		},
		{
			title: "更新时间",
			width: 140,
			key: "tm",
		},
	];
	processData: any[] = [];
	opData: Array<any> = [];
	jjsw: Array<any> = [];
	maxsw: Array<any> = [];
	checkboxGroupValue: string[] = ["jjsw", "maxsw"];

	getCheck(val: any) {
		this.options.series = [];
		this.$nextTick(() => {
			this.options.series.push(...this.opData);
			if (val.length > 0) {
				val.forEach((it: any) => {
					if (it == "jjsw") {
						this.options.series.push(...this.jjsw);
					}
					if (it == "maxsw") {
						this.options.series.push(...this.maxsw);
					}
				});
			}
		});
	}
	getPage(page: number) {
		this.pageParams.current = page;
		this.getData();
	}
	getSize(size: number) {
		this.pageParams.current = 1;
		this.pageParams.pageSize = size;
		this.getData();
	}
	getProPage(page: number) {
		this.processPage.current = page;
		this.getProData();
	}
	getProSize(size: number) {
		this.processPage.current = 1;
		this.processPage.pageSize = size;
		this.getProData();
	}
	search() {
		this.getProData();
		this.getProChart();
	}

	@Watch("rowList", { deep: true, immediate: true })
	getRow() {
		this.sbids = [];
		if (this.rowList.sbid) {
			this.sbids.push(this.rowList.sbid);
			this.getData();
			this.getQy();
			this.getSite();
			this.getProData();
			this.getProChart();
		}
	}
	//预警分析
	async getData() {
		this.alarmParams.sbid = this.rowList.sbid;
		this.alarmParams.yjid = this.rowList.yjid;
		this.alarmParams.currentPage = this.pageParams.current;
		this.alarmParams.pageSize = this.pageParams.pageSize;
		let data = await floodManageApi.getYlHisList(this.alarmParams);
		this.pageParams.total = data.count;
		this.tableData = data.data;
	}

	//获取区域
	async getQy() {
		this.qyOptions = [];
		let data = await publicApi.getPq();
		if (data && data.length > 0) {
			this.qyOptions = data.map((it: any) => {
				return {
					value: it[0],
					label: it[1],
				};
			});
		}
	}
	//区域选择
	getChange() {
		this.getSite();
	}
	//获取站点
	async getSite() {
		this.selOptions = [];
		this.process.sbids = [];
		let data = await floodManageApi.getYjList({ pqid: this.process.qy });
		if (data.data && data.data.length > 0) {
			this.selOptions = data.data.map((it: any) => {
				return {
					value: it.sbid,
					label: it.yjmc,
				};
			});
		}
	}

	//过程线列表
	async getProData() {
		this.process.currentPage = this.processPage.current;
		this.process.pageSize = this.processPage.pageSize;
		this.process.beginTime = this.$utils.dateFormat(
			new Date(this.process.beginTime),
			"yyyy-MM-dd HH:mm:ss"
		);
		this.process.endTime = this.$utils.dateFormat(
			new Date(this.process.endTime),
			"yyyy-MM-dd HH:mm:ss"
		);
		let data = await floodManageApi.getGcxList(this.process, this.sbids);
		this.processPage.total = data.count;
		this.processData = data.data;
	}
	//过程线图表接口
	async getProChart() {
		this.process.currentPage = this.processPage.current;
		this.process.pageSize = this.processPage.pageSize;
		this.process.beginTime = this.$utils.dateFormat(
			new Date(this.process.beginTime),
			"yyyy-MM-dd HH:mm:ss"
		);
		this.process.endTime = this.$utils.dateFormat(
			new Date(this.process.endTime),
			"yyyy-MM-dd HH:mm:ss"
		);
		this.options.legend.data = [];
		this.options.series = [];
		this.opData = [];
		this.jjsw = [];
		this.maxsw = [];
		let data = await floodManageApi.getGcxChart(this.process, this.sbids);
		if (data.data && data.data.length > 0) {
			data.data.forEach((it: any) => {
				this.options.legend.data.push(it.yjmc);
				let list: any = [];
				let time: any = JSON.parse(JSON.stringify(data.time));
				list = it.list.reduce((pre: any, cur: any) => {
					let target = pre.find((ee: any) => ee.tm == cur.tm);
					if (target) {
						Object.assign(target, cur);
					} else {
						pre.push(cur);
					}
					return pre;
				}, time);
				this.opData.push({
					type: "line",
					name: it.yjmc,
					data: list ? list.map((it: any) => it.value) : [],
				});
				this.jjsw.push({
					type: "line",
					name: it.yjmc + "警戒水位",
					data:
						time && time.length > 0
							? time.map(() => {
									return it.jjsw;
							  })
							: [],
					lineStyle: {
						normal: {
							color: "red",
							type: "dashed",
						},
					},
					itemStyle: {
						normal: {
							color: "red",
						},
					},
					markPoint: {
						silent: true,
						data: [
							{
								yAxis: it.jjsw,
								x: "100%",
								symbolSize: 0.1,
								label: {
									textStyle: { color: "#333" },
									position: "insideTopRight",
									formatter: it.yjmc + "警戒水位",
								},
							},
						],
					},
				});
				this.maxsw.push({
					type: "line",
					name: it.yjmc + "历史最高水位",
					data:
						time && time.length > 0
							? time.map(() => {
									return it.max;
							  })
							: [],
					lineStyle: {
						normal: {
							color: "red",
							type: "dashed",
						},
					},
					itemStyle: {
						normal: {
							color: "red",
						},
					},
					markPoint: {
						silent: true,
						data: [
							{
								yAxis: it.max,
								x: "100%",
								symbolSize: 0.1,
								label: {
									textStyle: { color: "#333" },
									position: "insideTopRight",
									formatter: it.yjmc + "历史最高水位",
								},
							},
						],
					},
				});
			});
			this.options.series.push(
				...this.opData,
				...this.jjsw,
				...this.maxsw
			);
		}
		if (data.time && data.time.length > 0) {
			this.options.xAxis.data = data.time.map((it: any) => {
				return it.tm;
			});
		}
	}
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
.mon-jc {
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
		#{$deep}.el-table table {
			width: auto !important;
			.row-gray {
				color: #b7b7b7;
			}
			.row-yellow {
				background-color: #ffedd5;
				border: solid 1px #ff9100;
				color: #ff9100;
				td {
					background-color: #ffedd5;
				}
			}
			.row-red {
				background-color: #ffe3e0;
				border: solid 1px #ce1717;
				color: #ce1717;
				td {
					background-color: #ffe3e0;
				}
			}
			.row-blue {
				background-color: #fff;
				border: solid 1px #5397ff;
				color: #5397ff;
			}
		}
		.process-item {
			&:first-of-type {
				display: flex;
				.suc-select {
					margin-right: 15px;
				}
			}
			&:nth-of-type(2) {
				height: 200px;
			}
			&:nth-of-type(3) {
				margin-top: 10px;
			}
			.heading {
				display: flex;
				justify-content: space-between;
				padding: 5px;
				font-size: 14px;
				color: #666;
				float: right;
			}
			.line-item {
				padding: 0 5px;
				height: 100%;
			}
			#{$deep}.ivu-checkbox-checked .ivu-checkbox-inner:after {
				top: 2px;
				left: 5px;
				border-color: #fff;
			}
		}
	}
	#{$deep}.suc-select {
		.ivu-select {
			&.ivu-select-multiple {
				.ivu-tag {
					max-width: 78%;
				}
			}
		}
	}
}
</style>
