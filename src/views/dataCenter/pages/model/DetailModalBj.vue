<template>
	<!-- 新增/编辑带有地图，上传附件 -->
	<suc-modal
		:config="config"
		:value="model"
		@on-cancel="onCancel"
		@on-ok="onOk"
		@on-visible-change="toggle"
	>
		<template v-slot:header>
			<span class="title">{{ title }}</span>
		</template>
		<div class="content">
			<suc-form :config="{ 'label-width': 100 }">
				<suc-form-item
					v-for="(item, index) in formList"
					:key="index"
					:config="item.config"
				>
					<suc-input
						style="width: 100%"
						v-model="formParams[item.name]"
						:disabled="item.disabled"
					></suc-input>
				</suc-form-item>
				<slot></slot>

				<suc-form-item :config="{ label: '所属泵站' }">
					<suc-select
						v-model="formParams.stcd"
						:options="stcdOptions"
						:config="{ clearable: true }"
						style="width: 100%"
					></suc-select>
				</suc-form-item>
			</suc-form>
		</div>
		<loading-com :loadingShow="loadingShow"></loading-com>
	</suc-modal>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { State, Mutation, namespace } from "vuex-class";
import { SucModal, SucForm, SucFormItem, SucInput, SucSelect } from "@suc/ui";
import { ModalConfig } from "@suc/ui/interfaces";
import { SelectOptions } from "@suc/ui/interfaces";
import { publicApi } from "@/api";
import { getStcd } from "@/api/datacenter/infoStation";
const mapStore = namespace("mapStore");
import { LoadingCom } from "@/components";
@Component({
	components: {
		SucModal,
		SucForm,
		SucFormItem,
		SucInput,
		SucSelect,
		LoadingCom,
	},
})
export default class Create extends Vue {
	// @mapStore.State olMap: any
	olMap = this.$getMapConfig();
	@Prop() title!: string;
	@Prop() model!: boolean; //控制弹框显隐
	@Prop({
		type: Array,
		default: () => [],
	})
	formList: any; //包含formItem config,name对应formParams字段
	@Prop({
		type: Object,
		default: () => {},
	})
	formParams: any; //新增接口需要的参数
	@Prop({
		type: Array,
		default: () => [],
	})
	picList: any;
	// @Prop() url!: string //新增接口url
	//   model:boolean = false
	config: ModalConfig = {
		transfer: false,
		// title: '新增',
		width: 960,
	};
	@Prop() loadingShow!: boolean;
	@Emit()
	onOk() {}
	@Emit()
	toggle(val: boolean) {}
	@Emit("change-pic-id")
	changePicId() {}

	onCancel() {
		// this.region1 = ''
		// this.region2 = ''
		this.toggle(false);
	}

	mounted() {
		this.getStcd();
	}

	stcdOptions: SelectOptions = [];
	async getStcd() {
		getStcd().then((data: any) => {
			this.stcdOptions = data
				? data.map((it: any) => {
						return {
							value: it[0],
							label: it[1],
						};
				  })
				: [];
		});
	}
}
</script>
<style lang="scss" scoped>
.content {
	width: 100%;
	height: 422px;
	overflow: auto;
}
.title {
	font-size: 16px;
	color: #fff;
}
.file-item {
	span {
		display: inline-block;
		&:first-of-type {
			width: 240px;
		}
	}
}
</style>
