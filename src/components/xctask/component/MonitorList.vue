<template>
	<div class="module-view">
		<panel-view heading="上游管网监测点">
			<div class="list-container">
				<div
					class="list-item"
					v-for="(list, index) in listArr"
					:key="'list' + index"
				>
					<div class="list-item-site">
						<div>
							<span class="state-blue iconfont icon-dizhi"></span>
							<span>{{ list.site }}</span>
						</div>
						<div
							:class="[
								list.state == '异常'
									? 'state-red'
									: 'state-green',
							]"
						>
							<span style="color: #fff">{{ list.state }}</span>
						</div>
					</div>
					<div class="list-item-info">
						<div class="info-name"><span>所属片区</span></div>
						<div class="info-value">
							<span v-text="list.area">A片区</span>
						</div>
						<div class="info-value">
							<span>当前水位 </span
							><span class="state-blue" v-text="list.level"
								>1.5m</span
							>
						</div>

						<div class="info-name"><span>水位变化</span></div>
						<div class="info-value">
							<span>1h水位变化：</span
							><span
								:class="[
									list.state == '异常'
										? 'state-red-txt'
										: 'state-blue',
								]"
								v-text="list.level1"
								>+0.00m</span
							>
						</div>
						<div class="info-value">
							<span>3h水位变化：</span
							><span
								:class="[
									list.state == '异常'
										? 'state-red-txt'
										: 'state-blue',
								]"
								v-text="list.level3"
								>+0.00m</span
							>
						</div>

						<div class="info-name"></div>
						<div class="info-value">
							<span>6h水位变化：</span
							><span
								:class="[
									list.state == '异常'
										? 'state-red-txt'
										: 'state-blue',
								]"
								v-text="list.level6"
								>+0.00m</span
							>
						</div>
						<div class="info-value">
							<span>12h水位变化：</span
							><span
								:class="[
									list.state == '异常'
										? 'state-red-txt'
										: 'state-blue',
								]"
								v-text="list.level12"
								>+0.00m</span
							>
						</div>

						<div class="info-name"><span>更新时间</span></div>
						<div class="info-value">
							<span v-text="list.time">2020-01-01 12:30</span>
						</div>
					</div>
				</div>
			</div>
		</panel-view>
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
import { State, Mutation, Action, namespace } from "vuex-class";
import { PanelView } from "@/components";
import { networkApi } from "@/api";
@Component({
	components: {
		PanelView,
	},
})
export default class MonitorList extends Vue {
	@State netWork: any;
	listArr: any[] = [
		{
			site: "河定桥路口点",
			state: "正常",
			area: "A片区",
			level: "1.5m",
			level1: "+0.00m",
			level3: "+0.00m",
			level6: "+0.00m",
			level12: "+0.00m",
			time: "2020-01-01 12:30",
		},
	];
	monitorParams: any = {
		list: "1,2,3,4",
	};
	mounted() {
		this.getSbid();
		// this.getMonitor()
	}
	async getMonitor() {
		let that = this;
		that.listArr = [];
		networkApi.getMonitor(that.monitorParams).then((monitorData: any) => {
			if (monitorData) {
				let { data } = monitorData;
				if (data.length) {
					that.listArr = data
						? data.map((item: any) => {
								return {
									site: item.SBMC,
									state: item.data.status,
									area: item.PQMC,
									level: item.data.value,
									level1: item.data.hour1,
									level3: item.data.hour3,
									level6: item.data.hour6,
									level12: item.data.hour12,
									time: item.data.recordTime,
								};
						  })
						: [];
				}
			}
		});
	}
	// 获取list参数值（sbid）
	async getSbid() {
		let that = this;
		let idParams = {
			gwId: that.netWork.row.GWID,
		};
		networkApi.getOverviewData(idParams).then((sbidData: any) => {
			if (sbidData) {
				let { upstreamdevice } = sbidData;

				let sbids = upstreamdevice
					? upstreamdevice.map((item: any) => {
							return item.sbid;
					  })
					: [];
				that.monitorParams.list = sbids.join();
				that.getMonitor();
			}
		});
	}
}
</script>
<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
.module-view {
	width: 100%;
	height: 100%;
	.list-container {
		padding: 0 0 10px;
		height: calc(100% - 52px);
		border-top: 1px solid $border-color;
		overflow: auto;
		.list-item {
			padding: 10px;
			border-bottom: 1px solid $border-color;
			&-site {
				display: flex;
				align-items: center;
				justify-content: space-between;
				> div {
					&:first-of-type {
						font-size: $font-size-large;
						color: $heading-color;
					}
					&:last-of-type {
						padding: 3px 8px;
					}
				}
			}
			&-info {
				padding: 10px 0 0 14px;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				.info-name {
					width: 16%;
				}
				.info-value {
					padding-top: 5px;
					width: 42%;
				}
			}

			.state-blue {
				color: $state-blue;
			}
			.state-red-txt {
				color: $state-red;
			}
			.state-green {
				background-color: $state-green;
			}
			.state-red {
				background-color: $state-red;
			}
		}
	}
}
</style>
