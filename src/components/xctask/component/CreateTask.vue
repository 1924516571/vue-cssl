<template>
	<!-- 处理任务事件 -->
	<suc-modal
		:config="config"
		:value="model"
		@on-visible-change="toggleModel"
		@on-ok="setTask"
		@on-cancel="toggleModel(false)"
	>
		<div class="content">
			<suc-form @validate="onValidate" :config="{ 'label-width': 100 }">
				<suc-form-item :config="{ label: '处理状况：' }">
					<suc-input
						style="width: 98%"
						v-model="formParams.desc"
						type="textarea"
					></suc-input>
				</suc-form-item>
				<suc-form-item :config="{ label: '添加图片：' }">
					<div class="file-btn">
						<input type="file" multiple @change="getFile" />
						<div class="file-btn-item">
							<span class="iconfont icon-shangchuan"></span>
							<span>点击上传</span>
						</div>
					</div>
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
import { LoadingCom } from "@/components";
import { envTaskApi } from "@/api";

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
	@State user: any;
	@State analysis: any;
	@Prop() model!: boolean;
	//   model: boolean = true
	loadingShow: boolean = false;
	config: ModalConfig = {
		transfer: false,
		title: "处理任务事件",
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
		this.formParams.taskId = this.analysis.taskItem.rwId;
	}
	markers: any = [];
	formParams: any = {
		desc: "",
		taskId: "",
		// clr:'',
		// time:''
	};

	// itemConfig: FormItemConfig = {
	//     label: 'Age',
	//     required: true,
	//     'label-width': 80
	// };

	// validator(rule: any, value: any, callback: any) {

	// }

	onValidate(ev: ValidateResult) {
		console.log(ev);
	}
	receiveOptions: SelectOptions = [];
	files: any[] = [];
	getFile(file: any) {
		this.files = file.target.files;
	}
	mounted() {
		this.init();
	}
	init() {
		this.formParams.taskId = this.analysis.taskItem.rwId;
		// this.formParams.clr = this.user.account;
		// this.formParams.status = 5;
		// this.formParams.time = this.$utils.dateFormat(
		//   new Date(),
		//   "yyyy-MM-dd HH:mm:ss"
		// );
	}
	@Emit()
	async setTask() {
		this.loadingShow = true;
		let that = this;
		let formdata: any = new FormData();
		for (let i = 0; i < that.files.length; i++) {
			formdata.append("file", that.files[i]);
		}
		let url = "jnsw/newtask/dealInspect";
		if (!this.user.titleex) {
			url = "jnsw/newtask/deal";
		}
		let taskData = await envTaskApi
			.createTask(that.formParams, formdata, url)
			.then(() => {
				that.toggleModel(false);
			})
			.finally(() => {
				this.loadingShow = false;
			});

		return taskData;
	}
}
</script>

<style lang="scss" scoped>
.content {
	height: 222px;
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
