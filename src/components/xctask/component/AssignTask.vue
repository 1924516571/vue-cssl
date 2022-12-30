<template>
	<!-- 交办任务事件 -->
	<suc-modal
		:config="config"
		:value="model"
		@on-visible-change="toggleModel"
		@on-ok="setTask"
		@on-cancel="toggleModel(false)"
	>
		<div class="content">
			<suc-form @validate="onValidate" :config="{ 'label-width': 100 }">
				<template>
					<suc-form-item
						:config="{ label: '交办人：' }"
						class="accOpt"
					>
						<suc-select
							style="width: 98%"
							v-model="formParams.id"
							:config="{
								clearable: true,
								filterable: true,
								'label-in-value': true,
							}"
						>
							<i-option
								v-for="item in accOptions"
								:key="item.value"
								:value="item.value"
								>{{ item.label }}</i-option
							>
						</suc-select>
					</suc-form-item>
				</template>
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
	IOption,
	SucSelect,
} from "@suc/ui";
import { FormItemConfig, ValidateResult } from "@suc/ui/interfaces";
import { ModalConfig } from "@suc/ui/interfaces";
import { SelectConfig, SelectOptions } from "@suc/ui/interfaces";
import { envTaskApi, floodManageApi, taskApi, publicApi, homeApi } from "@/api";
import { getPqPz } from "@/api/datacenter/dataBase";
const mapStore = namespace("mapStore");
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { LoadingCom } from "@/components";
@Component({
	components: {
		SucModal,
		SucForm,
		SucFormItem,
		SucButton,
		SucInput,
		SucSelect,
		IOption,
		Treeselect,
		LoadingCom,
	},
})
export default class CreateTask extends Vue {
	@State analysis: any;
	@State user: any;
	@Prop() model!: boolean;
	loadingShow: boolean = false;
	config: ModalConfig = {
		transfer: false,
		title: "交办任务事件",
		width: 640,
	};

	openModal() {
		this.model = true;
	}

	closeModel() {
		this.model = false;
	}

	accOptions: any = [];
	//获取接收人
	async getReceiver() {
		this.accOptions = [];
		floodManageApi
			.getXcListReceiver({
				ywid: this.user.ywdwId,
			})
			.then((data: any) => {
				if (data.result == "success") {
					this.accOptions = data.data
						? data.data.map((item: any) => {
								return {
									value: item.uid,
									label: item.displayname,
								};
						  })
						: [];
				}
			});
	}

	@Emit()
	toggleModel(val: boolean) {
		this.formParams = {};
		this.formParams.taskId = this.analysis.taskItem.rwId;
	}
	markers: any = [];
	formParams: any = {
		taskId: "", // 任务id
		id: "", //交办人
		cc: [], // 抄送人
		desc: "", // 说明
	};

	onValidate(ev: ValidateResult) {}

	mounted() {
		this.formParams.taskId = this.analysis.taskItem.rwId;
		this.getReceiver();
	}
	async setTask() {
		this.loadingShow = true;
		let that = this;
		envTaskApi
			.getTaskJb(that.formParams)
			.then((data: any) => {
				if (data.success) {
					this.$SucMessage.info("交办成功");
					that.toggleModel(false);
				} else {
					this.$SucMessage.error("交办失败");
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
	height: 300px;
	width: 100%;
	overflow: auto;
}
$deep: "::v-deep";
#{$deep}.accOpt.ivu-form-item {
	.ivu-form-item-content {
		line-height: normal;
	}
}
</style>
