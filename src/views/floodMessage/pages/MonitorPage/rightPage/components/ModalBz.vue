<template>
	<!--  泵站列表弹框  -->
	<div class="mon-bz">
		<div class="mon-nav">
			<span :class="{ active: type == '1' }" @click="type = '1'"
				>实时</span
			>
			<span :class="{ active: type == '2' }" @click="type = '2'"
				>历史</span
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
				<template v-slot:bjbm="{ row }">
					<span>{{ row.bjbm + "号泵" }}</span>
				</template>
				<template v-slot:rs="{ row }">
					<img v-if="row.rs == 1" src="@/assets/monFlood/1.gif" />
					<img v-else src="@/assets/monFlood/2.gif" />
				</template>
			</table-page>
		</div>
		<div class="mon-chart" v-if="type == '2'">
			<div class="process-item">
				<suc-select
					v-model="process.qy"
					:options="qyOptions"
					:config="{ placeholder: '区域', clearable: true }"
					@on-change="getChange"
					style="width: 160px"
				></suc-select>
				<suc-select
					v-model="process.stcd"
					:options="selOptions"
					:config="{ placeholder: '泵站' }"
					@on-change="getBzSel"
					style="width: 160px"
				></suc-select>
				<suc-select
					v-model="process.bjbm"
					:options="bjOptions"
					:config="{ placeholder: '泵机' }"
					style="width: 160px"
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
				<span>泵机运行时长统计</span>
				<span>累计时长：{{ ljsc }}</span>
			</div>
			<div class="process-item" style="overflow: auto">
				<div
					class="line-item"
					:style="{ height: category.length * 30 + 'px' }"
				>
					<v-chart
						:options="options"
						:auto-resize="true"
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
					>
						<template v-slot:bjbm="{ row }">
							<span>{{ row.bjbm + "号泵" }}</span>
						</template>
					</table-page>
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
	@Prop({
		type: Object,
		default: () => {},
	})
	rowList!: any;
	type: string = "1";
	ljsc: string = "0";
	total: number | string = 10; // 数据总数
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
		currentPage: 1,
		pageSize: 10,
		beginTime: new Date(new Date().getTime() - 3600 * 1000 * 24),
		endTime: new Date(),
		qy: "",
		stcd: "",
		bjbm: "",
	};
	processPage: any = {
		total: 0,
		current: 1,
		pageSize: 10,
	};
	qyOptions: SelectOptions = [];
	selOptions: SelectOptions = [];
	bjOptions: SelectOptions = [];
	tableData: any[] = [];
	processData: any[] = [];
	category: any[] = []; // 类别
	datas: any[] = [];
	datas2: any[] = [];
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
			key: "stnm",
		},
		{
			title: "泵机名称",
			slot: "bjbm",
		},
		{
			title: "运行状态",
			slot: "rs",
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
			title: "泵站名称",
			key: "stnm",
		},
		{
			title: "泵机名称",
			slot: "bjbm",
		},
		{
			title: "A相电流",
			key: "a",
		},
		{
			title: "B相电流",
			key: "b",
		},
		{
			title: "C相电流",
			key: "c",
		},
		{
			title: "AB电压",
			key: "ab",
		},
		{
			title: "AC电压",
			key: "ac",
		},
		{
			title: "BC电压",
			key: "bc",
		},
		{
			title: "更新时间",
			width: 140,
			key: "tm",
		},
	];
	//echart时长
	get options() {
		return {
			xAxis: {
				max: this.total,
				splitLine: {
					show: false,
				},
				axisLine: {
					show: false,
				},
				axisLabel: {
					show: false,
				},
				axisTick: {
					show: false,
				},
			},
			grid: {
				left: "160px",
				top: "10px", // 设置条形图的边距
				right: "120px",
				bottom: "10px",
			},
			yAxis: [
				{
					type: "category",
					inverse: true,
					data: this.category,
					axisLine: {
						show: false,
					},
					axisTick: {
						show: false,
					},
					axisLabel: {
						show: false,
					},
				},
			],
			series: [
				{
					// 内
					type: "bar",
					barWidth: 14,
					legendHoverLink: false,
					silent: true,
					itemStyle: {
						normal: {
							color: "#5bc172",
						},
					},
					label: {
						normal: {
							show: true,
							position: "left",
							formatter: "{b}",
							textStyle: {
								color: "#666666",
								fontSize: 14,
							},
						},
					},
					data: this.category,
					z: 1,
					animationEasing: "elasticOut",
				},
				{
					// 外边框
					type: "pictorialBar",
					symbol: "rect",
					symbolBoundingData: this.total,
					itemStyle: {
						normal: {
							color: "none",
						},
					},
					label: {
						normal: {
							formatter: (params: any) => {
								let text: any = "";
								text =
									"{f|  " +
									(params.data && params.data.name) +
									"}";
								return text;
							},
							rich: {
								f: {
									color: "#666",
								},
							},
							position: "right",
							distance: 0, // 向右偏移位置
							show: true,
						},
					},
					data: this.datas,
					z: 0,
					animationEasing: "elasticOut",
				},
				{
					name: "外框",
					type: "bar",
					barGap: "-100%", // 设置外框粗细
					data: this.datas2,
					barWidth: 14,
					itemStyle: {
						normal: {
							color: "#ebf1f6", // 填充色
							label: {
								// 标签显示位置
								show: false,
								position: "top", // insideTop 或者横向的 insideLeft
							},
						},
					},
					z: 0,
				},
			],
		};
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
		this.getProTable();
	}
	getProSize(size: number) {
		this.processPage.current = 1;
		this.processPage.pageSize = size;
		this.getProTable();
	}
	search() {
		this.getProData();
		this.getProTable();
	}

	created() {
		this.getQy();
		this.getSite();
	}

	@Watch("rowList", { deep: true, immediate: true })
	getRow() {
		if (this.rowList.stcd) {
			this.process.stcd = this.rowList.stcd;
			this.getBj("a");
			this.getData();
			this.getProData();
			this.getProTable();
		}
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
		this.process.stcd = "";
		this.process.bjbm = "";
		this.getSite();
	}
	//获取站点
	async getSite() {
		this.selOptions = [];
		let data = await floodManageApi.getbzList({ pqid: this.process.qy });
		if (data.data && data.data.length > 0) {
			this.selOptions = data.data.map((it: any) => {
				return {
					value: it.stcd,
					label: it.stnm,
				};
			});
		}
	}
	//泵站选择
	getBzSel() {
		this.process.bjbm = "";
		this.getBj("b");
	}
	//获取泵机
	async getBj(str: any) {
		this.bjOptions = [];
		let data = await floodManageApi.getbwList({ stcd: this.process.stcd });
		if (data.data && data.data.length > 0) {
			this.bjOptions = data.data.map((it: any) => {
				return {
					value: it.MC,
					label: it.MC + "号泵",
				};
			});
			if (str == "a") {
				this.process.bjbm = this.bjOptions[0].value;
			}
		}
	}
	//获取实时数据
	async getData() {
		this.tableData = [];
		this.alarmParams.currentPage = this.pageParams.current;
		this.alarmParams.pageSize = this.pageParams.pageSize;
		let data = await floodManageApi.getrealBw(this.alarmParams);
		this.pageParams.total = data.count;
		this.tableData = data.data;
	}
	//获取历史数据-图表
	async getProData() {
		this.category = [];
		this.datas = [];
		this.datas2 = [];
		let num: number = 0;
		this.process.beginTime = this.$utils.dateFormat(
			new Date(this.process.beginTime),
			"yyyy-MM-dd HH:mm:ss"
		);
		this.process.endTime = this.$utils.dateFormat(
			new Date(this.process.endTime),
			"yyyy-MM-dd HH:mm:ss"
		);
		let data = await floodManageApi.gettimeHis(this.process);
		this.ljsc = data.sum;
		if (data.data && data.data.length > 0) {
			let arr = JSON.parse(JSON.stringify(data.data));
			num = Number(
				arr.sort((a: any, b: any) => {
					return b.yxsc - a.yxsc;
				})[0].yxsc
			);
			data.data.forEach((it: any) => {
				this.category.push({
					name: it.tm,
					value: it.yxsc,
				});
				this.datas.push({
					name: it.yxsc2,
					value: it.yxsc,
				});
				this.datas2.push(num);
			});
			this.total = num;
		}
	}
	//获取历史数据-表格
	async getProTable() {
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
		let data = await floodManageApi.gettimeHisPage(this.process);
		this.processData = data.data;
		this.processPage.total = data.count;
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
				height: 100%;
			}
		}
	}
}
</style>
