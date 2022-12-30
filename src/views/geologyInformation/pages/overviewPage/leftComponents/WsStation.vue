<template>
	<!-- 污水泵站-->
	<div class="enterprise-view">
		<div class="enterprise-item">
			<search-component @input="getSearch"   placeholderTxt="名称"></search-component>
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
			>
			</table-page>
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
import { overview, infoApi } from "@/api";
@Component({
	components: {
		TablePage,
		SearchComponent,
	},
})
export default class Enterprise extends Vue {
	@Prop() flag!: boolean;

	@Watch("flag", { immediate: true })
	getHeight(val: any) {
		let h = document.documentElement.children[1].clientHeight - 400;
		this.tableHeight = val ? 300 : h;
		// this.getSewage();
	}

	siteCountList: any[] = [
		{
			name: "泵站数量",
			amount: "0",
			iconClass: "iconfont icon-qiye",
		},
	];
	//   columns: any[] = [
	//     {
	//       type: "index",
	//       title: "序号",
	//     },
	//     {
	//       title: "名称",
	//       key: "MC",
	//       width: 120,
	//     },
	//     {
	//       title: "总功率/设计流量",
	//       key: "zglsjll",
	//       width: 120,
	//     },
	//     {
	//       title: "联系人",
	//       key: "LXR",
	//     },
	//     {
	//       title: "联系电话",
	//       key: "LXDH",
	//     },
	//   ];
	columns: any[] = [
		{
			type: "index",
			title: "序号",
		},
		// {
		// 	title: "所属区域",
		// 	key: "XZQY",
		// },
		{
			title: "泵站编号",
			key: "ID",
		},
		{
			title: "泵站名称",
			key: "MC",
		},
		{
			title: "设计规模(万m³/d)",
			key: "XZGM",
		},
		// {
		// 	title: "变压器容量",
		// 	key: "BYQRL",
		// },
		// {
		// 	title: "泵机台数",
		// 	key: "BJCOUNT",
		// },
		// {
		// 	title: "泵位数",
		// 	key: "BWCOUNT",
		// },
		// {
		// 	title: "栅格数",
		// 	key: "SGCOUNT",
		// },
		// {
		// 	title: "闸位数",
		// 	key: "ZMCOUNT",
		// },
		// {
		// 	title: "建造时间",
		// 	key: "JZSJ",
		// },
		// {
		// 	title: "是否信息化建设",
		// 	key: "SFXXH",
		// },
		// {
		// 	title: "负责人",
		// 	key: "fzr",
		// 	slot: "fzr",
		// },
		// {
		// 	title: "视频",
		// 	slot: "sp",
		// },
		// {
		// 	title: "操作",
		// 	slot: "operation",
		// },
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
	//   tableParams: any = {
	//     currentPage: 1,
	//     mc: "",
	//     pageSize: 30,
	//   };
	stationParams: any = {
		pageNum: 1,
		pageSize: 20,
		mc: "",
		stnm: "",
		pqid: "",
	};
	mounted() {
		this.getAmount();
		this.onpage();
		// this.getStationTable();
	}
	getAmount() {
		this.$http
			.get("jnsw/floodsituation/pump/view2")
			.then((res: any) => {
				this.siteCountList[0].amount = res.data.zds;
			})
			.catch((err: any) => {
				console.log(err.data.message);
			});
	}
	async onpage() {
		this.stationParams.pageNum = this.pageParams.current;
		this.stationParams.pageSize = this.pageParams.pageSize;
		let url = "jnsw/bz/pageWs";
		let data = await infoApi.onpage(this.stationParams, url);
		this.pageParams.total = data.totalCount;
		this.tableData = data.data
			? data.data.map((e: any) => {
					return Object.assign(e, { key: "DP" });
			  })
			: [];
	}
	//   async getStationTable() {
	//     let that = this;
	//     that.tableParams.currentPage = that.pageParams.current;
	//     that.tableParams.pageSize = that.pageParams.pageSize;
	//     let data = await overview.getStationTable(that.tableParams);
	//     that.tableData = data.data.map((e: any) => {
	//       return Object.assign(e, { key: "DP" });
	//     });
	//     if (that.tableData.length > 0) {
	//       that.tableData.forEach((it: any) => {
	//         it.zglsjll = it.ZGL ? it.ZGL + "kw /" + it.ZLL + "m3/s" : "-";
	//       });
	//     }
	//     that.siteCountList[0].amount = data.totalCount;
	//     that.pageParams.total = data.totalCount;
	//   }

	getSearch(val: string) {
		this.stationParams.mc = val;
		this.onpage();
	}

	getPage(page: number) {
		this.pageParams.current = page;
		this.onpage();
	}

	getSize(size: number) {
		this.pageParams.current = 1;
		this.pageParams.pageSize = size;
		this.onpage();
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
