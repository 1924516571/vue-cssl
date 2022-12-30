<template>
	<!--无预警状态偷排分析-->
	<div class="steal-platoon-view">
		<div class="content-header">
			<div class="header-left-item"></div>
			<div class="header-right-item">
				<suc-button type="primary" @click="ShowAlarm"
					>查看当前分析报告</suc-button
				>
			</div>
		</div>
		<div class="content-info">
			<table-page
				:columns="columns"
				:tableData="tableData"
				:pageParams="pageParams"
				@get-page="getPage"
				@get-size="getSize"
			>
				<template v-slot:operation="{ row }">
					<div class="btn">
						<span @click="detail(row)">详情</span>
					</div>
				</template>
			</table-page>
		</div>
	</div>
</template>
<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import { SucButton } from "@suc/ui";
import { TablePage } from "@/components";
import { State, Mutation, Action, namespace } from "vuex-class";
@Component({
	components: {
		SucButton,
		TablePage,
	},
})
export default class AlarmStealPlatoon extends Vue {
	@State netWork: any;
	curId: string = "";
	columns: any[] = [
		{
			type: "index",
			title: "序号",
		},
		{
			title: "分析时间",
			key: "tm",
		},
		{
			title: "操作",
			slot: "operation",
		},
	];
	tableData: any[] = [];
	pageParams: any = {
		total: 0,
		current: 1,
		pageSize: 10,
	};
	@Emit("ShowAlarm")
	ShowAlarm() {
		return this.curId;
	}

	mounted() {
		this.getSteal();
	}
	getPage(page: number) {
		this.pageParams.current = page;
		this.getSteal();
	}
	getSize(size: number) {
		this.pageParams.current = 1;
		this.pageParams.pageSize = size;
		this.getSteal();
	}
	detail(row: any) {
		this.$emit("getDetail", row.id);
	}

	stateFlag: boolean = false;
	//获取历史分析列表
	getSteal() {
		this.tableData = [];
		let params = {
			sbid: this.netWork.row.SBID,
			currentPage: this.pageParams.current,
			pageSize: this.pageParams.pageSize,
		};
		let url = "/jnsw/pipenetwork/getHis";
		this.$http
			.get(url, { params })
			.then((res: any) => {
				this.pageParams.total = res.data.totalCount;
				if (res.data.data) {
					let data = res.data.data;
					this.curId = data[0].id;
					if (data[0].zt == "") {
						this.stateFlag = true;
						this.$emit("getState", [this.stateFlag, data[0].id]);
					}
					this.tableData = data.map((item: any) => item);
				}
			})
			.catch((err: any) => {
				this.$SucMessage.error(err.data.message);
			});
	}
}
</script>
<style lang="scss" scoped>
.steal-platoon-view {
	height: 100%;
	width: 100%;
	padding: 0 10px;
	font-size: 14px;
	.content-header {
		height: 30px;
		display: flex;
		justify-content: space-between;
		padding-bottom: 10px;
	}
	.content-info {
		height: calc(100% - 30px);
		padding: 10px 0 0;
		.btn {
			color: #5397ff;
			cursor: pointer;
			span {
				display: inline-block;
				margin-right: 10px;
				&:nth-of-type(2) {
					color: #ff5a47;
				}
			}
		}
	}
}
</style>