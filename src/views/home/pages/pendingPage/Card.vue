<template>
	<!-- 片长名片 -->
	<div class="card-view">
		<div class="card-item">
			<div class="card-img">
				<img :src="pic" style="width: 60px; height: 60px" />
			</div>
			<div class="card-info" v-if="pqFlag">
				<div class="card-info-item">
					<span class="name">{{ cUser.displayName }}</span>
					<span>{{ cUser.pqmc }}{{ cUser.titleex }}</span>
				</div>
				<div class="card-info-item">
					<span
						>江宁开发区规划资源和建设局 {{ cUser.department }}</span
					>
				</div>
			</div>
			<div class="card-info" v-else>
				<div class="card-info-item">
					<span class="name">{{ cUser.displayName }}</span>
				</div>
				<div class="card-info-item">
					<span>{{ cUser.department }}(部门人员)</span>
				</div>
				<div class="card-info-item">
					<span>江宁开发区规划资源和建设局 </span>
				</div>
			</div>
		</div>
		<div class="card-item">
			<div class="total-todo">
				<div><span>待办事项</span></div>
				<div class="total">
					<span class="font-large">{{
						total.unprocessed ? total.unprocessed : 0
					}}</span
					><span>个</span>
				</div>
			</div>
			<div class="total-do">
				<div><span>已办事项</span></div>
				<div class="total">
					<span class="font-large">{{
						total.finished ? total.finished : 0
					}}</span
					><span>个</span>
				</div>
			</div>
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
import { homeApi, publicApi } from "@/api";
import pic from "@/assets/默认头像_男.png";

@Component
export default class Card extends Vue {
	pic: any = pic;

	@Prop() pqFlag!: boolean;

	@Watch("pqFlag", { deep: true, immediate: true })
	changeActor(newdata: any, oldata: any) {
		var url = "jnsw/newtask/taskCountByUser";
		if (this.pqFlag) {
			url = "jnsw/newtask/taskCountByUser";
		} else {
			url = "jnsw/newtask/taskCountByDep";
		}
		this.getTotal(url);
	}

	mounted() {
		// this.getCurUser();
		// this.getTotal("jnsw/newtask/taskCountByUser");
	}

	total: any = {
		finished: 0,
		unprocessed: 0,
	};
	cUser: any = {};

	async getCurUser() {
		publicApi.getCurUser().then((data: any) => {
			if (data) {
				this.cUser = data;
				this.$emit("getDept", this.cUser.departmentId);
			}
		});
	}
	async getTotal(url: string) {
		homeApi.getNumber(url).then((data: any) => {
			this.total = data;
		});
	}
}
</script>
<style lang="scss" scoped>
.card-view {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	width: 100%;
	height: 100%;
	.card-item {
		display: flex;
		align-items: center;
		font-size: 14px;
		&:first-of-type {
			color: #999999;
			.card-img {
				width: 70px;
				height: 70px;
				border-radius: 50%;
			}
			.card-info {
				&-item {
					.name {
						display: inline-block;
						padding-right: 10px;
						font-size: 18px;
						color: #333333;
						// border-right: 1px solid #dde4ed;
					}
				}
			}
		}
		&:nth-of-type(2) {
			.total-todo {
				padding-right: 15px;
				color: #ffac3d;
			}
			.total-do {
				padding-left: 15px;
				color: #666666;
			}
			.total {
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.font-large {
				display: inline-block;
				font-size: 28px;
				padding-right: 5px;
			}
		}
	}
}
</style>
