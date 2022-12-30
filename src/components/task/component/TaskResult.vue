<template>
	<div class="result-view">
		<div class="record">
			<panel-view heading="处理记录">
				<div class="record-content">
					<div
						class="record-item"
						v-for="(item, index) in recordList"
						:key="index"
					>
						<div class="record-item-sub">
							<div :class="item.icon"></div>
						</div>
						<div class="record-item-sub">
							<div>
								<span>{{ item.content }}</span>
							</div>
							<div class="time">
								<span>{{ item.time }}</span>
							</div>
						</div>
					</div>
				</div>
			</panel-view>
		</div>
		<div class="result">
			<panel-view heading="处理结果">
				<div class="result-content">
					<div class="result-item">
						<span class="result-item-sub">处理人：</span>
						<span>{{ resultList.name }}</span>
					</div>
					<div class="result-item">
						<span class="result-item-sub">任务状态：</span>
						<span>{{ resultList.state }}</span>
					</div>
					<div class="result-item">
						<span class="result-item-sub">问题类型：</span>
						<span>{{ resultList.type }}</span>
					</div>
					<div class="result-item">
						<div>
							<span class="result-item-sub">处理状况：</span>
						</div>
						<div>
							<span>{{ resultList.result }}</span>
						</div>
					</div>
					<div class="result-item">
						<div>
							<span class="result-item-sub">相关图片：</span>
						</div>
					</div>
				</div>
			</panel-view>
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
import { PanelView } from "@/components";
@Component({
	components: {
		PanelView,
	},
})
export default class TaskResult extends Vue {
	recordList: any[] = [];
	resultList: any = {
		name: "李潇潇",
		state: "状态",
		type: "类型",
		result: "经排查为网管损坏，需要工程部安排人员进行维修。",
	};
}
</script>
<style lang="scss" scoped>
.result-view {
	width: 100%;
	height: 100%;
	.record {
		margin-bottom: 10px;
		// height: 30%;
		background-color: #fff;
		.record-content {
			padding: 15px;
			border-top: 1px solid #dde4eb;
			.record-item {
				display: flex;
				align-items: flex-start;
				height: 71px;
				&-sub {
					&:first-of-type {
						position: relative;
						&::after {
							content: "";
							position: absolute;
							top: 21px;
							left: 10px;
							width: 1px;
							height: 55px;
							background-color: #cccccc;
						}
					}
					&:nth-of-type(2) {
						margin-left: 10px;
						font-size: 14px;
						color: #333333;
					}
				}
				.green-bg {
					color: #32bb53;
				}
				.time {
					font-size: 12px;
					color: #b7b7b7;
				}
			}
		}
	}
	.result {
		height: calc(100% - 235px);
		background-color: #fff;
		&-content {
			padding: 15px;
			border-top: 1px solid #dde4eb;
			.result-item {
				display: flex;
				margin-bottom: 10px;
				font-size: 14px;
				color: #333333;
				&-sub {
					color: #999;
				}
			}
		}
	}
}
</style>
