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
				<template v-if="analysis.taskItem.rwlx == '故障上报'">
					<suc-form-item :config="{ label: '交办部门：' }">
						<suc-select
							v-model="formParams.ywdwid"
							:options="ywList"
							style="width: 98%"
						></suc-select>
					</suc-form-item>
				</template>
				<template v-else>
					<suc-form-item
						:config="{ label: '交办人：' }"
						class="accOpt"
					>
						<treeselect
							:clearable="true"
							:searchable="true"
							:disable-branch-nodes="true"
							:options="accOptions"
							:limit="4"
							:max-height="200"
							v-model="formParams.id"
							style="width: 98%"
						/>
					</suc-form-item>
				</template>

				<suc-form-item :config="{ label: '抄送人：' }" class="accOpt">
					<treeselect
						:multiple="true"
						:clearable="true"
						:searchable="true"
						:disable-branch-nodes="true"
						:options="accOptions"
						:limit="4"
						:max-height="200"
						v-model="formParams.cc"
						style="width: 98%"
					/>
				</suc-form-item>
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
		Treeselect,
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
		title: "交办任务事件",
		width: 640,
	};

	openModal() {
		this.model = true;
	}

	closeModel() {
		this.model = false;
	}

	//   运维单位
	ywList: any[] = [];
	async getYwdw() {
		publicApi.getYwdw().then((data: any) => {
			this.ywList = data
				? data.map((item: any) => {
						return {
							value: item[0],
							label: item[1],
						};
				  })
				: [];
		});
	}

	accOptions: any = [];
	//获取接收人
	async getReceiver() {
		this.accOptions = [];
		floodManageApi.getListReceiver1().then((data: any) => {
			if (data) {
				if (data.data && data.data.length > 0) {
					data.data.forEach((it: any, index: any) => {
						it.ID = "小组" + it.ID;
						if (it.ryList.length > 0) {
							this.accOptions.push({
								id: it.ID,
								label: it.MC,
								children: [],
							});
							it.ryList.forEach((res: any) => {
								this.accOptions[index].children.push({
									id: res.UID,
									label: res.DISPLAYNAME,
								});
							});
						}
					});
				}
				this.getCcDetail();
			}
		});
	}

	@Emit()
	toggleModel(val: boolean) {
		this.formParams = {};
		this.formParams.taskId = this.analysis.taskItem.rwId;
		this.getCcDetail();
	}
	markers: any = [];
	formParams: any = {
		taskId: "", // 任务id
		id: "", //交办人
		ywdwid: "", //运维单位
		cc: [], // 抄送人
		desc: "", // 说明
	};

	onValidate(ev: ValidateResult) {}
	bmOptions: SelectOptions = []; //部门

	mounted() {
		this.formParams.taskId = this.analysis.taskItem.rwId;

		this.getReceiver();
		this.getYwdw();
	}
	// 获取交办抄送人详情
	async getCcDetail() {
		taskApi.getCcDetail(this.analysis.taskItem.rwId).then((data: any) => {
			if (data) {
				this.formParams.cc =
					data.length > 0 ? data.map((item: any) => item.id) : [];
			}
		});
	}
	// 部门
	// async getBm() {
	//   let data = await envTaskApi.getBm();
	//   this.bmOptions = data.map((e: any) => {
	//     let item = {
	//       value: e[0],
	//       label: e[1],
	//     };
	//     return item;
	//   });
	// }
	// getDep(item: any) {
	//   this.formParams.deptID = item;
	// }
	@Emit()
	async setTask() {
		this.loadingShow = true;
		let that = this;
		let data: any = {};
		if (this.analysis.taskItem.rwlx == "故障上报") {
			data = await envTaskApi
				.getTaskJbYw(that.formParams)
				.then(() => {
					that.toggleModel(false);
				})
				.finally(() => {
					this.loadingShow = false;
				});
		} else {
			data = await envTaskApi
				.getTaskJb(that.formParams)
				.then(() => {
					that.toggleModel(false);
				})
				.finally(() => {
					this.loadingShow = false;
				});
		}
		// const taskData = await networkApi.setTask(that.formParams)
		return data.success;
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
