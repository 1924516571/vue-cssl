<template>
	<div class="info-view">
		<!-- <div><span>详细描述</span></div> -->
		<div class="info-item">
			<suc-input
				label="详细描述"
				label-position="top"
				type="textarea"
				disabled
				v-model="description"
				style="width: 100%"
			>
			</suc-input>
		</div>
		<!-- <div><span>接收人</span></div> -->
		<div class="info-item">
			<suc-input
				label="接收人"
				label-position="top"
				disabled
				v-model="receiver"
				style="width: 100%"
			>
			</suc-input>
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
import { State, Mutation, namespace } from "vuex-class";
import { SucInput } from "@suc/ui";
import { taskApi } from "@/api";
@Component({
	components: {
		SucInput,
	},
})
export default class TaskInfo extends Vue {
	@State analysis: any;
	description: string = "内容描述";
	receiver: string = "接收人";
	mounted() {
		this.getTaskDetail();
	}
	async getTaskDetail() {
		let id = this.analysis.taskItem.rwId;
		taskApi.getTaskDetail(id).then((data: any) => {
			if (data) {
				this.description = data.rwms;
				this.receiver = data.jsr;
			}
		});
	}
}
</script>
<style lang="scss" scoped>
.info-view {
	width: 100%;
	height: 100%;
	padding: 0 15px;
	.info-item {
		padding-bottom: 10px;
	}
}
</style>
