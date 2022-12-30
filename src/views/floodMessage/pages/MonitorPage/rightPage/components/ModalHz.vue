<template>
	<!--  涵闸列表弹框  -->
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
				<template v-slot:zt="{ row }">
					<img v-if="row.gtophgt > 0" src="@/assets/monFlood/3.gif" />
					<img v-else src="@/assets/monFlood/4.gif" />
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
					:config="{ placeholder: '涵闸' }"
					@on-change="getBzSel"
					style="width: 160px"
				></suc-select>
				<suc-select
					v-model="process.mc"
					:options="zmOptions"
					:config="{ placeholder: '闸门' }"
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
				<div class="line-item">
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
	@Prop({
		type: Object,
		default: () => {},
	})
	rowList!: any;
	type: string = "1";
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
		mc: "",
	};
	processPage: any = {
		total: 0,
		current: 1,
		pageSize: 10,
	};
	qyOptions: SelectOptions = [];
	selOptions: SelectOptions = [];
	zmOptions: SelectOptions = [];
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
			title: "涵闸名称",
			key: "stnm",
		},
		{
			title: "闸门名称",
			key: "zmmc",
		},
		{
			title: "运行状态",
			slot: "zt",
		},
		{
			title: "更新时间",
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
			title: "涵闸名称",
			key: "stnm",
		},
		{
			title: "闸门名称",
			key: "zmmc",
		},
		{
			title: "闸门高度",
			key: "value",
		},
		{
			title: "更新时间",
			width: 140,
			key: "tm",
		},
	];
	processData: any[] = [];
	options: any = {
		color: ["#5f77ec", "#5397ff", "#58dde0", "#feb543"],
		tooltip: {
			trigger: "axis",
		},
		grid: {
			top: "60px",
			left: "60px",
			right: "2%",
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
			name: "闸门开度过程线",
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
				lineStyle: {
					normal: {
						color: "#5397ff",
					},
				},
				itemStyle: {
					normal: {
						color: "#5397ff",
					},
				},
				data: [],
			},
		],
	};
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
			this.getZm("a");
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
		this.process.mc = "";
		this.getSite();
	}
	//获取站点
	async getSite() {
		this.selOptions = [];
		let data = await floodManageApi.getzzList({ pqid: this.process.qy });
		if (data.data && data.data.length > 0) {
			this.selOptions = data.data.map((it: any) => {
				return {
					value: it.stcd,
					label: it.stnm,
				};
			});
		}
	}
	//涵闸选择
	getBzSel() {
		this.process.mc = "";
		this.getZm("b");
	}
	//获取闸门
	async getZm(str: any) {
		this.zmOptions = [];
		let data = await floodManageApi.getzmList({ stcd: this.process.stcd });
		if (data.data && data.data.length > 0) {
			this.zmOptions = data.data.map((it: any) => {
				return {
					value: it.MC,
					label: it.MC,
				};
			});
			if (str == "a") {
				this.process.mc = this.zmOptions[0].value;
			}
		}
	}
	//获取实时数据
	async getData() {
		this.tableData = [];
		this.alarmParams.currentPage = this.pageParams.current;
		this.alarmParams.pageSize = this.pageParams.pageSize;
		let data = await floodManageApi.getzmReal(this.alarmParams);
		this.pageParams.total = data.count;
		this.tableData = data.data;
	}
	//获取历史数据-图表
	async getProData() {
		this.options.xAxis.data = [];
		this.options.series[0].data = [];
		this.process.beginTime = this.$utils.dateFormat(
			new Date(this.process.beginTime),
			"yyyy-MM-dd HH:mm:ss"
		);
		this.process.endTime = this.$utils.dateFormat(
			new Date(this.process.endTime),
			"yyyy-MM-dd HH:mm:ss"
		);
		let data = await floodManageApi.getgcxList(this.process);
		if (data.data && data.data.length > 0) {
			data.data.forEach((it: any) => {
				this.options.xAxis.data.push(it.tm);
				this.options.series[0].data.push(it.value);
			});
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
		let data = await floodManageApi.getgcxPage(this.process);
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
				height: 200px;
			}
			&:nth-of-type(3) {
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
