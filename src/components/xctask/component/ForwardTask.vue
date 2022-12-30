<template>
	<!-- 审核任务事件 -->
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
				<suc-form-item :config="{ label: '审核：' }">
					<suc-radio-group v-model="audit" style="width: 98%">
						<suc-radio label="pass">审核通过</suc-radio>
						<suc-radio label="fail">审核不通过</suc-radio>
					</suc-radio-group>
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
	SucRadioGroup,
	SucRadio,
} from "@suc/ui";
import { FormItemConfig, ValidateResult } from "@suc/ui/interfaces";
import { ModalConfig } from "@suc/ui/interfaces";
import { SelectConfig, SelectOptions } from "@suc/ui/interfaces";
import { LoadingCom } from "@/components";
import { publicApi, taskApi } from "@/api";

@Component({
	components: {
		SucModal,
		SucForm,
		SucFormItem,
		SucButton,
		SucInput,
		SucSelect,
		SucRadio,
		SucRadioGroup,
		LoadingCom,
	},
})
export default class CreateTask extends Vue {
	@Prop() model!: boolean;
	@State analysis: any;
	loadingShow: boolean = false;
	config: ModalConfig = {
		transfer: false,
		title: "审核操作",
		width: 640,
	};
	btnText: any;
	@Emit()
	toggleModel(val: boolean) {
		if (val == false) {
			this.formParams = {};
			this.formParams.id = this.analysis.taskItem.rwId;
			this.audit = "pass";
		}
	}
	formParams: any = {
		id: "",
		desc: "",
	};
	audit: string = "pass";

	mounted() {
		this.init();
	}

	// 初始化数据
	async init() {
		this.formParams.id = this.analysis.taskItem.rwId;
	}

	async setTask() {
		this.loadingShow = true;
		const url =
			this.audit == "pass"
				? "jnsw/newtask/examineTaskPassByPz"
				: "jnsw/newtask/examineTaskFailByPz";
		taskApi
			.getTaskAudit(url, this.formParams)
			.then((data: any) => {
				if (data.info == "success") {
					this.$SucMessage.info("操作成功");
					this.toggleModel(false);
				} else {
					this.$SucMessage.error("操作失败");
				}
			})
			.finally(() => {
				this.loadingShow = false;
			});
	}
}
</script>

<style lang="scss" scoped>
.content {
	height: 267px;
	width: 100%;
	overflow: auto;
	.uplodadBtn {
		padding: 0 10px;
		border: 1px solid #dde4eb;
		border-radius: 4px;
		color: #3a7bef;
	}
}
</style>
