<template>
	<!-- 退回任务事件 -->
	<suc-modal
		:config="config"
		:value="model"
		@on-visible-change="toggleModel"
		@on-ok="setTask"
		@on-cancel="toggleModel(false)"
	>
		<div class="content">
			<suc-form :config="{ 'label-width': 100 }">
				<suc-form-item :config="{ label: '说明：' }">
					<suc-input
						placeholder="说明"
						type="textarea"
						style="width: 98%"
						v-model="formParams.desc"
					>
					</suc-input>
				</suc-form-item>
			</suc-form>
		</div>
		<loading-com :show="loadingShow"></loading-com>
	</suc-modal>
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
import {
	SucModal,
	SucButton,
	SucForm,
	SucFormItem,
	SucInput,
	SucSelect,
} from "@suc/ui";
import { FormItemConfig, ValidateResult } from "@suc/ui/interfaces";
import { ModalConfig } from "@suc/ui/interfaces";
import { SelectConfig, SelectOptions } from "@suc/ui/interfaces";
import { envTaskApi, taskApi } from "@/api";
import { getPqPz } from "@/api/datacenter/dataBase";
const mapStore = namespace("mapStore");
import { LoadingCom } from "@/components";
@Component({
	components: {
		SucModal,
		SucForm,
		SucFormItem,
		SucButton,
		SucInput,
		SucSelect,
		LoadingCom,
	},
})
export default class CreateTask extends Vue {
	@State analysis: any;
	@Prop() model!: boolean;
	//   model: boolean = true
	loadingShow: boolean = false;
	config: ModalConfig = {
		transfer: false,
		title: "退回任务事件",
		width: 640,
	};

	openModal() {
		this.model = true;
	}

	closeModel() {
		this.model = false;
	}
	@Emit()
	toggleModel(val: boolean) {
		this.formParams.desc = "";
		this.formParams.id = this.analysis.taskItem.rwId;
	}
	markers: any = [];
	formParams: any = {
		id: "", // 任务事件id
		desc: "",
	};

	onValidate(ev: ValidateResult) {
		console.log(ev);
	}
	bmOptions: SelectOptions = []; //部门

	mounted() {
		this.formParams.id = this.analysis.taskItem.rwId;
	}
	async setTask() {
		this.loadingShow = true;
		let that = this;
		envTaskApi
			.getTaskReturn(that.formParams)
			.then((data: any) => {
				if (data.info == "success") {
					this.$Message.info("退回成功");
					that.toggleModel(false);
				} else {
					this.$Message.error("退回失败");
				}
			})
			.finally(() => {
				this.loadingShow = false;
			});
		// const taskData = await networkApi.setTask(that.formParams)
	}
}
</script>

<style lang="scss" scoped>
.content {
	height: 222px;
	width: 100%;
	overflow: auto;
}
</style>
