<template>
	<!-- 水务视频-->
	<div class="enterprise-view">
		<div class="enterprise-item">
			<search-component @input="getSearch"></search-component>
		</div>
		<div class="enterprise-item">
			<div class="site-amount flex-class">
				<div class="site-amount-item flex-class">
					<div
						v-for="(site, index) in siteCountList"
						:key="'site' + index"
					>
						<div class="site-text flex-class">
							<span>{{ site.name }}</span>
							<span style="font-size: 20px">{{
								site.amount
							}}</span>
						</div>
						<div class="bg-icon">
							<span :class="site.iconClass"></span>
						</div>
					</div>
				</div>
				<div class="blue-bg site-text" @click="getToggle">
					<span
						style="font-size: 20px"
						class="iconfont icon-jiancexiangqing"
					></span>
				</div>
			</div>
		</div>
		<div
			class="table-item"
			@mouseenter="enterTable"
			@mouseleave="leaveTable"
		>
			<table-page
				:tableData="tableData"
				:columns="columns"
				:customHeight="tableHeight"
				:pageParams="pageParams"
				@row-click="rowClick"
				@get-page="getPage"
				@get-size="getSize"
			></table-page>
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
import { TablePage, SearchComponent } from "@/components";
import { overview } from "@/api";
@Component({
	components: {
		TablePage,
		SearchComponent,
	},
})
export default class WaterVideo extends Vue {
	@Prop() type!: string;
	@Prop() flag!: boolean;
	@Watch("flag", { immediate: true })
	getHeight(val: any) {
		let h = document.documentElement.children[1].clientHeight - 400;
		this.tableHeight = val ? 300 : h;
		// this.getSewage();
	}
	siteCountList: any[] = [
		{
			name: "水务视频：",
			amount: "0",
			iconClass: "iconfont icon-qiye",
		},
	];
	columns: any[] = [
		{
			title: "序号",
			type: "index",
		},
		{
			title: "名称",
			key: "mc",
		},
		{
			title: "位置",
			key: "wz",
		},
	];
	tableData: any[] = [];
	tableHeight: any = document.documentElement.children[1].clientHeight - 400;
	@Emit()
	getToggle() {
		return true;
	}
	@Emit()
	enterTable() {}
	@Emit()
	leaveTable() {}
	pageParams: any = {
		current: 1,
		total: 0,
		pageSize: 30,
	};
	emergencyParams: any = {
		currentPage: 1,
		mc: "",
		pageSize: 30,
		type: "水务视频",
	};
	mounted() {
		this.getEmergencyTable();
	}
	async getEmergencyTable() {
		let that = this;
		that.tableData = [];
		that.emergencyParams.type = this.type;
		that.emergencyParams.currentPage = that.pageParams.current;
		that.emergencyParams.pageSize = that.pageParams.pageSize;
		let data = await overview.getWaterVideoTable(that.emergencyParams);
		that.tableData = data.data
			? data.data.map((it: any) => {
					return {
						id: it[0],
						mc: it[1],
						wz: it[2],
						jd: it[3],
						wd: it[4],
						type: "video",
					};
			  })
			: [];
		that.pageParams.total = data.totalCount;
		that.siteCountList[0].amount = data.totalCount;
	}
	//   @Emit()
	getSearch(val: string) {
		this.emergencyParams.mc = val;
		this.getEmergencyTable();
	}
	//   @Emit()
	getPage(page: number) {
		this.pageParams.current = page;
		this.getEmergencyTable();
	}
	//   @Emit()
	getSize(size: number) {
		this.pageParams.current = 1;
		this.pageParams.pageSize = size;
		this.getEmergencyTable();
	}
	@Emit()
	rowClick(row: any) {}
}
</script>
<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
.enterprise-view {
	width: 100%;
	height: 100%;
	padding-left: 14px;
	.enterprise-item {
		padding: 0 14px 14px 0;
	}
	.table-item {
		height: 100%;
	}
	.flex-class {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.site-amount {
		width: 100%;
		height: 50px;
		&-item {
			width: calc(100% - 40px);
			padding-right: 10px;

			> div {
				width: 100%;
				height: 100%;
				position: relative;
				padding: 10px 15px;
				&:first-child {
					background-image: $blue-gradient;
					border-radius: $border-radius;
				}
			}
			.bg-icon {
				position: absolute;
				top: 5%;
				right: 10px;
				color: rgba($color: #ffffff, $alpha: 0.2);
				.icon-qiye:before {
					font-size: 30px;
				}
			}
		}
		.site-text {
			font-size: $font-size-base;
			color: #ffffff;
		}
		.blue-bg {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 10px;
			height: 100%;
			background-image: $blue-gradient;
			border-radius: $border-radius;
			cursor: pointer;
		}
	}
}
</style>
