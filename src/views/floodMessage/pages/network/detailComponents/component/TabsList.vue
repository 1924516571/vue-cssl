<template>
	<div class="tabs-view">
		<suc-tabs @on-click="tabClick">
			<suc-tab-pane label="监测总览">
				<over-view></over-view>
			</suc-tab-pane>
			<suc-tab-pane label="水位变化趋势">
				<trend v-if="vSelect == 1"></trend>
			</suc-tab-pane>
			<suc-tab-pane label="预警信息">
				<abnormal-record></abnormal-record>
			</suc-tab-pane>
			<suc-tab-pane label="事件任务">
				<task></task>
			</suc-tab-pane>
			<suc-tab-pane label="周边企业">
				<peripheral-companies></peripheral-companies>
			</suc-tab-pane>
			<suc-tab-pane label="偷排分析">
				<alarm-steal-platoon
					@showHis="showHis"
					v-if="alarmStatus"
					:curId="curId"
				></alarm-steal-platoon>
				<steal-platoon
					@getState="getState"
					@getDetail="getDetail"
					@ShowAlarm="ShowAlarm"
					v-else
				></steal-platoon>
			</suc-tab-pane>
		</suc-tabs>
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
import { SucTabs, SucTabPane } from "@suc/ui";
import {
	OverView,
	Trend,
	PeripheralCompanies,
	AbnormalRecord,
	Task,
	AlarmStealPlatoon,
	StealPlatoon,
} from "../tabComponent";
@Component({
	components: {
		SucTabs,
		SucTabPane,
		OverView,
		Trend,
		PeripheralCompanies,
		AbnormalRecord,
		Task,
		AlarmStealPlatoon,
		StealPlatoon,
	},
})
export default class ModuleView extends Vue {
	vSelect: any = null;
	curId: string = "";
	tabClick(nav: any) {
		this.vSelect = nav;
	}
	alarmStatus: boolean = false;
	ShowAlarm(val: any) {
		this.curId = val;
		this.alarmStatus = true;
	}
	showHis() {
		this.alarmStatus = false;
	}
	getState(val: any) {
		this.alarmStatus = false;
		if (val[0]) {
			this.alarmStatus = true;
			this.getDetail(val[1]);
		}
	}
	getDetail(val: any) {
		this.curId = val;
		this.alarmStatus = true;
	}
}
</script>
<style lang="scss">
.tabs-view {
	.suc-tabs .ivu-tabs-bar:after {
		height: 1px;
		background-color: #dde4eb;
	}
	//     .suc-tabs .ivu-tabs{
	//     overflow-y: visible;
	//     overflow-x: hidden;
	//   }
}
</style>
<style lang="scss" scoped>
.tabs-view {
	width: 100%;
	height: 100%;
}
</style>