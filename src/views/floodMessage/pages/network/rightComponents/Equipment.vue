<template>
	<!-- 雨水管网自动监测设备情况 -->
	<div class="equipment-view">
		<div
			class="amount-item"
			v-for="(item, index) in amountList"
			:key="'amount' + index"
		>
			<div class="item-sub">
				<div class="item-sub">
					<span style="font-size: 20px">{{ item.amount }}</span>
					<span>{{ item.dw }}</span>
				</div>
				<div class="item-sub">
					<span>{{ item.name }}</span>
				</div>
			</div>
			<div :class="item.iconClass"></div>
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
import { networkApi } from "@/api";
@Component
export default class Equipment extends Vue {
	amountList: any[] = [
		{
			name: "旱流监测点数量",
			amount: "1000",
			dw: "个",
			iconClass: "iconfont icon-zhandian",
		},
		{
			name: "设备在线数量",
			amount: "980",
			dw: "个",
			iconClass: "iconfont icon-shebei",
		},
		{
			name: "设备在线率",
			amount: "90",
			// dw: '%',
			iconClass: "iconfont icon-shebei",
		},
	];
	mounted() {
		this.getAmount();
	}
	async getAmount() {
		let that = this;
		let url = "jnsw/gwgl/overview";
		this.$http
			.get(url)
			.then((res: any) => {
				let data = res.data;
				that.amountList[0].amount = data.sbsum;
				that.amountList[1].amount = data.onlinesum;
				that.amountList[2].amount = data.onlinerate;
			})
			.catch((err: any) => {
				this.$SucMessage.error(err.data.message);
			});
	}
}
</script>
<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
.equipment-view {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	.amount-item {
		position: relative;
		padding: 15px 0;
		width: 158px;
		height: 90%;
		border-radius: $border-radius;
		& .icon-zhandian:before,
		.icon-shebei:before {
			font-size: 50px;
		}

		> div {
			.item-sub {
				display: flex;
				justify-content: center;
				align-items: center;
			}
			&:first-of-type {
				width: 100%;
				height: 100%;

				color: #ffffff;
				font-size: $font-size-base;
			}
			&:nth-of-type(2) {
				position: absolute;
				bottom: -5px;
				right: 5px;
				color: rgba($color: #ffffff, $alpha: 0.2);
			}
		}

		&:first-of-type {
			background-image: $blue-gradient;
		}
		&:nth-of-type(2) {
			background-image: $red-gradient;
		}
		&:nth-of-type(3) {
			background-image: $green-gradient;
		}
	}
}
</style>
