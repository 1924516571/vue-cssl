<template>
	<div class="module-view">
		<!-- 地图层 -->
		<div class="main-map">
			<MapManage ref="maps"></MapManage>
		</div>
		<!-- 调度监控悬浮层 -->
		<div class="main-overlay">
			<div class="panel-view">
				<div class="panel-left bg-shadow">
					<div class="left-item">
						<panel-view heading="异常报警">
							<alarm-abnormal @on-row="getRow"></alarm-abnormal>
						</panel-view>
					</div>
					<div class="left-item">
						<panel-view heading="水位报警">
							<template #right>
								<div @click="getAlarmSw">
									<span
										class="iconfont icon-chakanliebiao blue-color"
									></span>
								</div>
							</template>
							<alarm-level @on-row="getRow"></alarm-level>
						</panel-view>
					</div>
					<div class="left-item">
						<panel-view heading="内涝报警">
							<template #right>
								<div @click="getAlarmNl">
									<span
										class="iconfont icon-chakanliebiao blue-color"
									></span>
								</div>
							</template>
							<alarm-flood @on-row="getRow"></alarm-flood>
						</panel-view>
					</div>
				</div>
				<div class="panel-center">
					<div class="center-item">
						<suc-checkbox-group
							v-model="group"
							@on-change="changeCheck"
						>
							<suc-checkbox label="水质报警"></suc-checkbox>
							<suc-checkbox label="偷排报警"></suc-checkbox>
							<suc-checkbox label="水位报警"></suc-checkbox>
							<suc-checkbox label="内涝报警"></suc-checkbox>
							<suc-checkbox label="巡查问题"></suc-checkbox>
						</suc-checkbox-group>
						<suc-button type="primary" v-show="btnShow" @click="showTask"
							>创建任务事件</suc-button
						>
					</div>
					<div class="center-item bg-shadow">
						<panel-view heading="任务事件">
							<template #right>
								<div @click="getTaskList">
									<span
										class="iconfont icon-chakanliebiao blue-color"
									></span>
								</div>
							</template>
							<task-event @on-row="getTask"></task-event>
						</panel-view>
					</div>
				</div>
				<div class="panel-right bg-shadow">
					<div class="right-item">
						<panel-view heading="偷排报警">
							<template #right>
								<div @click="getAlarmGw">
									<span
										class="iconfont icon-chakanliebiao blue-color"
									></span>
								</div>
							</template>
							<alarm-pipe @on-row="getRow"></alarm-pipe>
						</panel-view>
					</div>
					<div class="right-item">
						<panel-view heading="水质报警">
							<template #right>
								<div @click="getAlarmSz">
									<span
										class="iconfont icon-chakanliebiao blue-color"
									></span>
								</div>
							</template>
							<alarm-qulity @on-row="getRow"></alarm-qulity>
						</panel-view>
					</div>
					<div class="right-item">
						<panel-view heading="巡查问题">
							<template #right>
								<div @click="getInsList">
									<span
										class="iconfont icon-chakanliebiao blue-color"
									></span>
								</div>
							</template>
							<alarm-inspection
								@on-row="getInspection"
							></alarm-inspection>
						</panel-view>
					</div>
				</div>
			</div>
		</div>
		<template>
			<suc-modal :config="warnConfig" v-model="showWarn">
				<template #buttons>
					<suc-button
						type="primary"
						:config="{ ghost: true }"
						@click="showWarn = false"
						>取消</suc-button
					>
					<suc-button type="primary" @click="toggleWarn"
						>创建</suc-button
					>
				</template>
				<div class="content">
					<suc-form :config="{ 'label-width': 80 }">
						<suc-form-item :config="{ label: '说明：' }">
							<suc-input
								type="textarea"
								v-model="description"
								readonly
								style="width: 98%"
							></suc-input>
						</suc-form-item>
					</suc-form>
				</div>
			</suc-modal>
		</template>

		<create-task :model="show" @toggle-model="toggle"></create-task>

		<template v-if="onAlarmGw">
			<div class="main-overlay" style="pointer-events: auto">
				<early-warning
					@on-back="toggleAlarmGw"
					:showBack="onAlarmGw"
				></early-warning>
			</div>
		</template>
		<template v-if="onAlarmSz">
			<div class="main-overlay" style="pointer-events: auto">
				<alarm-info-sz
					@on-back="toggleAlarmSz"
					:showBack="onAlarmSz"
				></alarm-info-sz>
			</div>
		</template>
		<template v-if="onAlarmSw">
			<div class="main-overlay" style="pointer-events: auto">
				<alarm-info-flood
					@on-back="toggleAlarmSw"
					:showBack="onAlarmSw"
					dispatchType="sw"
				></alarm-info-flood>
			</div>
		</template>
		<template v-if="onAlarmNl">
			<div class="main-overlay" style="pointer-events: auto">
				<alarm-info-flood
					@on-back="toggleAlarmNl"
					:showBack="onAlarmNl"
					dispatchType="nl"
				></alarm-info-flood>
			</div>
		</template>
		<template v-if="onInspection">
			<div class="main-overlay bg-color" style="pointer-events: auto">
				<xc-detail :url="url" @goback="toggleInspection"></xc-detail>
			</div>
		</template>
		<template v-if="onInsList">
			<div class="main-overlay" style="pointer-events: auto">
				<inspection-list
					@on-back="toggleInsList"
					:showBack="onInsList"
				></inspection-list>
			</div>
		</template>
		<template v-if="onTask">
			<div class="main-overlay bg-color" style="pointer-events: auto">
				<detail :url="url" @goback="toggleTask"></detail>
			</div>
		</template>
		<template v-if="onTaskList">
			<div class="main-overlay" style="pointer-events: auto">
				<task-list
					@on-back="toggleTaskList"
					:showBack="onTaskList"
				></task-list>
			</div>
		</template>
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
import {
	SucCheckbox,
	SucCheckboxGroup,
	SucButton,
	SucModal,
	SucForm,
	SucFormItem,
	SucInput,
} from "@suc/ui";
import { ModalConfig } from "@suc/ui/interfaces";
import { MapManage, PanelView, Detail, XcDetail } from "@/components";
import { coordinateTransform, getGeodesicDistance } from "@suc/monch";
import dayjs from "dayjs";
import { homeApi } from "@/api";
import {
	AlarmAbnormal,
	AlarmLevel,
	AlarmFlood,
	AlarmPipe,
	AlarmQulity,
	AlarmInspection,
	TaskEvent,
} from "./dispatchPage";
import CreateTask from "./CreateTask.vue";
import EarlyWarning from "@/views/pipeNetwork/pages/EarlyWarning.vue";
import AlarmInfoSz from "@/views/environment/pages/AlarmInfo.vue";
import AlarmInfoFlood from "@/views/flood/pages/AlarmInfo.vue";
import InspectionList from "@/views/film/pages/Issues.vue";
import TaskList from "@/views/film/pages/Task.vue";
const mapStore = namespace("mapStore");
@Component({
	components: {
		SucCheckbox,
		SucCheckboxGroup,
		SucButton,
		SucModal,
		SucForm,
		SucFormItem,
		SucInput,
		MapManage,
		PanelView,
		CreateTask,
		AlarmAbnormal,
		AlarmLevel,
		AlarmFlood,
		AlarmPipe,
		AlarmQulity,
		AlarmInspection,
		TaskEvent,
		EarlyWarning,
		AlarmInfoSz,
		AlarmInfoFlood,
		Detail,
		InspectionList,
		TaskList,
		XcDetail,
	},
})
export default class Dispatch extends Vue {
	@mapStore.Mutation setMarkers: any;
	@State issues: any;
	@Mutation setFormParams: any;
	btnShow: boolean = false;
	url: string = "";
	group: any[] = ["水质报警", "偷排报警", "水位报警", "内涝报警", "巡查问题"];
	description: string = ""; //任务描述
	showWarn: boolean = false;
	warnConfig: ModalConfig = {
		transfer: false,
		title: "任务事件",
		width: 960,
		"ok-text": "创建",
	};
	show: boolean = false; //创建任务事件
	onAlarmGw: boolean = false; //预警信息管网（偷排）
	onAlarmSz: boolean = false; //预警水质
	onAlarmSw: boolean = false; //预警水位
	onAlarmNl: boolean = false; //预警内涝
	onInspection: boolean = false; //巡查问题详情
	onInsList: boolean = false; //巡查问题列表
	onTask: boolean = false; //任务事件详情
	onTaskList: boolean = false;

	showTask() {
		this.setFormParams({
			cc: [], // 抄送人
			file: [],
			jcdid: "", // 监测点
			jcdlx: "",
			jcdmc: "",
			jd: "",
			jsrid: null, // 接收人id
			pqid: "", // 片区id
			rwbh: "", // 任务编号
			rwlx: "", //任务类型
			rwmc: "", // 任务名称
			rwms: "", // 任务描述
			rwwz: "", //任务位置
			wd: "",
		});
		this.show = true;
	}
	toggle(val: boolean) {
		this.show = val;
	}
	getRow() {
		this.showWarn = true;
		this.description = this.issues.formParams.rwms;

		// this.show = true;
	}
	toggleWarn() {
		this.showWarn = false;
		this.show = true;
	}
	toggleAlarmGw() {
		this.onAlarmGw = false;
	}
	getAlarmGw() {
		this.onAlarmGw = true;
	}
	toggleAlarmSz() {
		this.onAlarmSz = false;
	}
	getAlarmSz() {
		this.onAlarmSz = true;
	}
	toggleAlarmSw() {
		this.onAlarmSw = false;
	}
	getAlarmSw() {
		this.onAlarmSw = true;
	}
	toggleAlarmNl() {
		this.onAlarmNl = false;
	}
	getAlarmNl() {
		this.onAlarmNl = true;
	}
	toggleInspection() {
		this.onInspection = false;
		this.changeCheck(this.group);
	}
	getInspection() {
		this.onInspection = true;
	}
	toggleInsList() {
		this.onInsList = false;
		this.changeCheck(this.group);
	}
	getInsList() {
		this.onInsList = true;
	}
	toggleTask() {
		this.onTask = false;
		this.changeCheck(this.group);
	}
	getTask() {
		this.onTask = true;
	}
	toggleTaskList() {
		this.onTaskList = false;
		this.changeCheck(this.group);
	}
	getTaskList() {
		this.onTaskList = true;
	}
	/**
	 *  地图点位
	 */
	gisObj: any = {};
	markers: any = [];
	// 水质
	async getSzGis() {
		let data = await homeApi.getQulityList();
		let icon = require("@/assets/map/河湖-预警.png");
		let gis = data.list
			? data.list.map((item: any) => {
					if (this.$utils.validCoords(item.jd, item.wd)) {
						return {
							id: "sz_" + item.id,
							name: item.siteName,
							coords: [item.jd, item.wd],
							info: item,
							style: {
								image: {
									icon: {
										scale: 0.6,
										anchor: [0.5, 1],
										src: icon,
									},
								},
							},
						};
					}
			  })
			: [];
		this.gisObj = Object.assign(this.gisObj, { 水质报警: gis });
	}
	// 管网（偷排）
	async getGwGis() {
		let data = await homeApi.getPipeList();
		let icon = require("@/assets/map/管网-预警.png");
		let gis = data.data
			? data.data.map((item: any) => {
					if (this.$utils.validCoords(item.JD, item.WD)) {
						return {
							id: "gw_" + item.ID,
							name: item.SBMC,
							coords: [item.JD, item.WD],
							info: item,
							style: {
								image: {
									icon: {
										scale: 0.6,
										anchor: [0.5, 1],
										src: icon,
									},
								},
							},
						};
					}
			  })
			: [];
		this.gisObj = Object.assign(this.gisObj, { 偷排报警: gis });
	}
	// 水位
	async getSwGis() {
		let data = await homeApi.getLevelList();
		let icon = require("@/assets/map/雨量-预警.png");
		let gis = data.data
			? data.data.map((item: any) => {
					if (this.$utils.validCoords(item.JD, item.WD)) {
						return {
							id: "sw_" + item.SBID,
							name: item.SBMC,
							coords: [item.JD, item.WD],
							info: item,
							style: {
								image: {
									icon: {
										scale: 0.6,
										anchor: [0.5, 1],
										src: icon,
									},
								},
							},
						};
					}
			  })
			: [];
		this.gisObj = Object.assign(this.gisObj, { 水位报警: gis });
	}
	// 内涝
	async getNlGis() {
		let data = await homeApi.getFloodList();
		let icon = require("@/assets/map/窨井-预警.png");
		let gis = data.data
			? data.data.map((item: any) => {
					if (this.$utils.validCoords(item.JD, item.WD)) {
						return {
							id: "nl_" + item.SBID,
							name: item.SBMC,
							coords: [item.JD, item.WD],
							info: item,
							style: {
								image: {
									icon: {
										scale: 0.6,
										anchor: [0.5, 1],
										src: icon,
									},
								},
							},
						};
					}
			  })
			: [];
		this.gisObj = Object.assign(this.gisObj, { 内涝报警: gis });
	}
	// 巡查
	async getXcGis() {
		let data = await homeApi.getInsList();
		let icon = require("@/assets/map/任务事件-待处理.png");
		let gis = data
			? data.map((item: any) => {
					if (this.$utils.validCoords(item.JD, item.WD)) {
						return {
							id: "xc_" + item.ID,
							name: item.RWMC,
							coords: [item.JD, item.WD],
							info: item,
							style: {
								image: {
									icon: {
										scale: 0.6,
										anchor: [0.5, 1],
										src: icon,
									},
								},
							},
						};
					}
			  })
			: [];
		this.gisObj = Object.assign(this.gisObj, { 巡查问题: gis });
	}
	changeCheck(arr: any) {
		this.markers = [];
		for (let i = 0; i < arr.length; i++) {
			this.markers.push(this.gisObj[arr[i]]);
		}
		this.markers = this.markers.flat().filter((item: any) => item);
		this.setMarkers(this.markers);
	}
	mounted() {
	  this.url = this.$route.path;
		Promise.all([
			this.getXcGis(),
			this.getNlGis(),
			this.getSwGis(),
			this.getGwGis(),
			this.getSzGis(),
		]).then((res: any) => {
			this.changeCheck(this.group);
		});
	}
  created() {
    this.hideBtn();
  }
	// 创建任务事件按钮的显示和隐藏
  hideBtn() {
    this.$http.get("jnsw/rest/authox/check?resource=" + "home_dispatch" + "&op=" + "manage").then((res: any) => {
      this.btnShow = res.data.allowed;
    })
  }
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";

.panel-view {
	width: 100%;
	height: 100%;
	padding: 14px;
	position: relative;
	display: flex;
	.panel-left {
		width: 25%;
		height: 100%;
		pointer-events: auto;
		.left-item {
			height: 32%;
			&:nth-of-type(2) {
				margin: 14px 0;
			}
		}
	}
	.panel-right {
		width: 25%;
		height: 100%;
		pointer-events: auto;
		.right-item {
			height: 32%;
			&:nth-of-type(2) {
				margin: 14px 0;
			}
		}
	}
	.panel-center {
		position: relative;
		padding: 0 14px;
		width: 50%;
		height: 100%;
		.center-item {
			&:first-of-type {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 14px;
				background-color: rgba($color: #ffffff, $alpha: 0.8);
				pointer-events: auto;
			}
			&:last-of-type {
				position: absolute;
				bottom: 0;
				width: calc(100% - 30px);
				height: 300px;
			}
		}
	}
	.blue-color {
		color: #3983f3;
	}
}
.bg-color {
	padding: 10px;
	background-color: #f8f8f9;
}
</style>
