<template>
	<!-- 新建事件 -->
	<div class="content">
		<suc-form @validate="onValidate" :config="{ 'label-width': 100 }">
			<suc-form-item :config="{ label: '指令编号：' }">
				<suc-input
					style="width: 98%"
					v-model="formParams.rwbh"
					:disabled="true"
					placeholder="20200003040 自动生成不可改"
				></suc-input>
			</suc-form-item>
			<suc-form-item :config="{ label: '发布人：' }">
				<suc-input
					style="width: 98%"
					v-model="user.account"
					:disabled="true"
					placeholder="系统账号识别不可改"
				></suc-input>
			</suc-form-item>
			<suc-form-item :config="{ label: '指令名称：' }">
				<suc-input
					style="width: 98%"
					v-model="formParams.rwmc"
				></suc-input>
			</suc-form-item>
			<suc-form-item :config="{ label: '片区选择：' }">
				<suc-select
					style="width: 98%"
					v-model="formParams.pqid"
					:config="{
						clearable: true,
						filterable: true,
						'label-in-value': true,
					}"
				>
					<i-option
						v-for="item in pqOptions"
						:key="item.value"
						:value="item.value"
						>{{ item.label }}</i-option
					>
				</suc-select>
			</suc-form-item>
			<suc-form-item :config="{ label: '接收人：' }" class="accOpt">
				<treeselect
					:clearable="true"
					:searchable="true"
					:disable-branch-nodes="true"
					:options="accOptions"
					:limit="4"
					:max-height="200"
					v-model="formParams.jsrid"
					style="width: 98%"
				/>
				<!-- <suc-select
            style="width: 98%"
            v-model="formParams.jsrid"
            :disabled="radioGroupValue != 'apple'"
            :config="{
              clearable: true,
              filterable: true,
              placeholder: '片长',
              'label-in-value': true,
            }"
            @on-change="getPzID"
          >
            <i-option
              v-for="item in pzOptions"
              :key="item.value"
              :value="item.value"
              >{{ item.label }}</i-option
            >
          </suc-select> -->
			</suc-form-item>
			<suc-form-item :config="{ label: '抄送人：' }" class="accOpt">
				<treeselect
					:multiple="true"
					:clearable="true"
					:disable-branch-nodes="true"
					:searchable="true"
					:options="accOptions"
					:limit="4"
					:max-height="200"
					v-model="formParams.cc"
					style="width: 98%"
				/>
				<!-- <suc-select
            style="width: 98%"
            v-model="formParams.cc"
            :disabled="radioGroupValue != 'apple'"
            :config="{
              clearable: true,
              filterable: true,
              placeholder: '片长',
              'label-in-value': true,
              multiple: true,
            }"
          >
            <i-option
              v-for="item in pzOptions"
              :key="item.value"
              :value="item.value"
              >{{ item.label }}</i-option
            >
          </suc-select> -->
			</suc-form-item>
			<suc-form-item :config="{ label: '指令描述：' }">
				<suc-input
					style="width: 98%"
					v-model="formParams.rwms"
					type="textarea"
				></suc-input>
			</suc-form-item>
			<suc-form-item :config="{ label: '上传附件：' }">
				<div class="file-btn">
					<input type="file" multiple @change="getFile" />
					<div class="file-btn-item">
						<span class="iconfont icon-shangchuan"></span>
						<span>点击上传</span>
					</div>
				</div>
			</suc-form-item>
			<suc-form-item :config="{ label: '相关监测点：' }">
				<suc-input
					style="width: 98%"
					v-model="formParams.jcdmc"
				></suc-input>
			</suc-form-item>
			<suc-form-item :config="{ label: '指令位置：' }">
				<suc-input
					style="width: 98%"
					v-model="formParams.rwwz"
					placeholder="请输入地点"
				></suc-input>
			</suc-form-item>
			<suc-form-item :config="{ label: '经纬度：' }">
				<suc-input
					style="width: 98%"
					v-model="coordstring"
					placeholder="在地图中点击显示经纬度，或输入经度,纬度"
					@on-change="getcoord"
				></suc-input>
			</suc-form-item>
			<suc-form-item>
				<div v-if="model" style="width: 98%; height: 159px">
					<template>
						<suc-map
							ref="mapObject"
							:options="olMap.map"
							v-bind.sync="olMap.map.view"
							@singleclick-blank="clickBlank"
						>
							<template>
								<ol-layer
									v-for="(layer, index) in olMap.baseLayer"
									:options="layer"
									:key="'layer' + index"
								></ol-layer>
							</template>
							<ol-markers>
								<ol-marker
									v-for="(marker, index) in markers"
									:options="marker"
									:key="'marker' + index"
								></ol-marker>
							</ol-markers>
						</suc-map>
					</template>
				</div>
			</suc-form-item>
			<div style="text-align: center">
				<suc-button
					type="primary"
					:disabled="loadingShow"
					:debounce="800"
					@on-click="onclick"
					>发布
				</suc-button>
			</div>
		</suc-form>
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
import { State, Mutation, Action, namespace } from "vuex-class";
import {
	SucModal,
	SucButton,
	SucForm,
	SucFormItem,
	SucInput,
	SucSelect,
	IOption,
	SucRadio,
	SucRadioGroup,
} from "@suc/ui";
import { FormItemConfig, ValidateResult } from "@suc/ui/interfaces";
import { ModalConfig } from "@suc/ui/interfaces";
import { SelectConfig, SelectOptions } from "@suc/ui/interfaces";
import { RadioConfig, RadioGroupConfig } from "@suc/ui/interfaces";
import { LoadingCom } from "@/components";
import { floodManageApi, taskApi } from "@/api";
import { getPqPz } from "@/api/datacenter/dataBase";
import Treeselect from "@riophae/vue-treeselect";
import { coordinateTransform } from "@suc/monch";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { getListReceiver1 } from "@/api/flood/floodmange";

const mapStore = namespace("mapStore");

@Component({
	components: {
		SucModal,
		SucForm,
		SucFormItem,
		SucButton,
		SucInput,
		SucSelect,
		IOption,
		SucRadio,
		SucRadioGroup,
		Treeselect,
		LoadingCom,
		// Upload,
		// MapManage
	},
})
export default class CreateTask extends Vue {
	@mapStore.State olMap: any;
	@State user: any;
	@Prop() model!: boolean;
	a: String = "";
	radioGroupValue: string = "apple";
	radioGroupOption: RadioGroupConfig = {
		vertical: true,
	};
	config: ModalConfig = {
		transfer: false,
		title: "新建事件",
		width: 640,
	};

	@Prop()
	issuesFlag!: boolean;

	// openModal () {
	//   this.model = true
	// }

	// closeModel () {
	//   this.model = false
	// }

	@Watch("model", { deep: true, immediate: true })
	getModel() {
		if (this.model) {
			this.formParams = {};
			// this.getBm();
			// this.getReleaser();
			this.getNum();
			// this.getReceiver();
		}
	}
	markers: any = [];
	test = "";
	formParams: any = {
		cc: [], // 抄送人
		file: [],
		jcdid: "", // 监测点
		jcdmc: "",
		jd: "",
		jsrid: "", // 接收人id
		rwbh: "", // 指令编号
		rwmc: "", // 指令名称
		rwms: "", // 指令描述
		rwwz: "", //指令位置
		wd: "",
		pqid: "", // 片区id
	};
	accOptions: any = [];
	//获取接收人
	async getReceiver() {
		this.accOptions = [];
		let data = await getListReceiver1();
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
	}

	// pqId: string = "";
	coordstring: string = "";

	onValidate(ev: ValidateResult) {
		console.log(ev);
	}
	receiveOptions: SelectOptions = [];

	mounted() {
		this.getPq();
		// this.getBm();
		// this.getPz();
		// this.getReleaser();
		this.getNum();
		// this.getPzFromPq();
		this.getReceiver();
	}

	files: any = [];
	// 文件
	getFile(file: any) {
		this.files = file.target.files;
	}
	pqOptions: SelectOptions = []; //片区
	// bmOptions: SelectOptions = []; //部门
	// pzOptions: SelectOptions = []; //片长
	// rwlxOptions:SelectOptions = []//指令类型
	// 片区
	async getPq() {
		this.pqOptions = [];
		let data = await taskApi.getPq();
		this.pqOptions = data.map((e: any) => {
			let item = {
				value: e[0],
				label: e[1],
			};
			return item;
		});
	}
	// 获取片区id
	// getPqID(item: any) {
	//   this.formParams.relPq = item.label;
	//   // this.getPzByPq(item.value);
	// }
	// 部门
	// async getBm() {
	//   this.bmOptions = [];
	//   let data = await taskApi.getBm();
	//   this.bmOptions = data.map((e: any) => {
	//     let item = {
	//       value: e[0],
	//       label: e[1],
	//     };
	//     return item;
	//   });
	// }
	// getDep(item: any) {
	//   this.formParams.depId = item;
	// }
	// 片长
	// async getPz() {
	//   this.pzOptions = [];
	//   let data = await taskApi.getPz();
	//   this.pzOptions = data.map((e: any) => {
	//     return {
	//       value: e.id,
	//       label: `${e.displayName} (${e.account})`,
	//     };
	//   });
	// }
	// getPzID(item: any) {
	//   // this.formParams.jsrid = item.label;
	//   this.getPzByPq(item.value);
	// }
	// 发布人
	// getReleaser() {
	//   this.formParams.releaser = this.user.account;
	//   this.formParams.releaserID = this.user.id;
	// }

	// 指令编号
	async getNum() {
		// let data = await taskApi.getNum();
		this.formParams.rwbh = this.$utils.dateFormat(
			new Date(),
			"yyyyMMddHHmmss"
		);
	}
	// 点击地图获取经纬度
	clickBlank(info: any) {
		this.markers = [];
		this.formParams.jd = info.coords[0];
		this.formParams.wd = info.coords[1];
		// this.formParams.coord = info.coord
		this.coordstring = info.coords[0] + "," + info.coords[1];
		this.markers.push({ lon: info.coords[0], lat: info.coords[1] });
	}
	getcoord(e: any) {
		this.markers = [];
		let value = e.target.value;
		let lon = value.split(",")[0];
		let lat = value.split(",")[1];
		this.markers.push({ lon: lon, lat: lat });
		this.formParams.jd = lon;
		this.formParams.wd = lat;
		this.getLocation([lon, lat]);
	}
	//地图定位
	getLocation(coords: any) {
		const mapRoot: any = this.$refs.mapObject;
		const tranPosN = coordinateTransform(coords, "EPSG:4326", "EPSG:3857");
		mapRoot.$view.animate({
			center: tranPosN,
			zoom: 18,
		});
	}
	async onclick() {
		let that = this;
		let arr: any = [];
		let params = {};
		let formdata: any = new FormData();
		for (let i = 0; i < this.files.length; i++) {
			formdata.append("file", this.files[i]);
		}
		params = that.formParams;
		this.$emit("onclick", formdata, params);
	}

	// pz: any = [];
	// pqTOpz: any = [];
	// //片区关联片长
	// async getPzFromPq() {
	//   this.pqOptions = [];
	//   this.pzOptions = [];
	//   let data = await getPqPz();
	//   this.pqOptions = data.pq.map((e: any) => {
	//     return {
	//       label: e[1],
	//       value: e[0],
	//     };
	//   });
	//   this.pz = data.pz;
	//   this.pqTOpz = data.pqTOpz;
	// }
	// //根据片区获取片长
	// getPzByPq(pqId: string) {
	//   let pzIndexList = this.pqTOpz[pqId];
	//   let pzList = this.pz.filter(
	//     (e: any, index: any) => pzIndexList.indexOf(index) != -1
	//   );
	//   this.pzOptions = pzList.map((e: any) => {
	//     return {
	//       value: e[0],
	//       label: `${e[2]} (${e[1]})`,
	//     };
	//   });
	// }
}
</script>

<style lang="scss" scoped>
.content {
	height: 462px;
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
