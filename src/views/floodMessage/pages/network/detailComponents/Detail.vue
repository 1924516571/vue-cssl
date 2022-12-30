<template>
	<!-- 管网详情 -->
	<div class="detail-view">
		<div class="detail-item">
			<div class="nav-item">
				<div class="nav-item-sub" @click="goback">
					<span class="iconfont icon-fanhui"></span>
					<span>返回</span>
				</div>
				<div class="nav-item-sub">
					<span>{{ netWork.row.SBMC }}</span>
				</div>
			</div>
			<div class="nav-item" v-show="btnShow">
				<div
					class="button-pannel"
					v-for="(button, index) in buttons"
					:key="index"
				>
					<suc-button
						:type="button.type"
						:config="button.iviewProps"
						:debounce="800"
						@on-click="onclick(button, index)"
						>{{ button.label }}
					</suc-button>
				</div>
			</div>
		</div>
		<div class="detail-item">
			<div class="left-item">
				<div class="left-item-sub">
					<site-map></site-map>
				</div>
				<div class="left-item-sub">
					<tabs-list></tabs-list>
				</div>
			</div>
			<div class="right-item">
				<monitor-list></monitor-list>
			</div>
		</div>
		<create-task
			:model="model"
			@toggle-model="toggle"
			:sbParams="sbParams"
		></create-task>
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
import { SucButton } from "@suc/ui";
import { MonitorList, SiteMap, TabsList } from "./component";
import { CreateTask } from "@/components";
const mapStore = namespace("mapStore");
@Component({
	components: {
		SucButton,
		MonitorList,
		SiteMap,
		TabsList,
		CreateTask,
	},
})
export default class ModuleView extends Vue {
	@State netWork: any;
	pqid: string = "";
	// @Mutation setDetailToggle:any;
	@mapStore.Mutation setMarkerFlag: any;
	@mapStore.Mutation setMarkers: any;
	@Prop() url!: string;
	btnShow: boolean = false;
	buttons: any[] = [
		{
			label: "创建任务事件",
			type: "primary",
		},
		// {
		//   label: '偷排分析',
		//   type: 'primary',
		//   iviewProps: {
		//     ghost: true
		//   }
		// }
	];
	model: boolean = false;
	sbParams: any = {};
	@Watch("netWork", { immediate: true, deep: true })
	netWorkChange(data: any) {
		if (data.row) {
			this.sbParams = {
				sbid: data.row.SBID,
				sbmc: data.row.SBMC,
				jd: data.row.JD,
				wd: data.row.WD,
				pqid: data.row.PQID,
				rwlx: "管网",
			};
		}
	}

	onclick(val: any, index: number) {
		if (index == 0) {
			this.model = !this.model;
		}
	}
	toggle(state: boolean) {
		this.model = state;
	}
	@Emit()
	goback() {
		this.setMarkerFlag("apicture-network");
		this.setMarkers([]);
		return false;
		// this.netWork.detailToggle = false;
		// this.setDetailToggle(this.netWork.detailToggle);
	}
	created() {
	  this.hideBtn();
  }
	// 控制创建任务事件的显示和隐藏
  hideBtn() {
	  var questUrl = "";
	  if (this.url == "/main/aPicture/pieNetwork") {
	    questUrl = "aPicture_pieNetwork"
    }
	  if (this.url == "/main/pieNetwork/monitoring") {
      questUrl = "pieNetwork_monitoring"
    }
	  this.$http.get("jnsw/rest/authox/check?resource=" + questUrl + "&op=" + "manage").then((res: any) => {
      this.btnShow = res.data.allowed;
    })
  }
}
</script>

<style lang="scss" scoped>
.detail-view {
	width: 100%;
	height: 100%;
	pointer-events: auto;
	.detail-item {
		&:first-of-type {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 60px;
			background-color: #ffffff;
			box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
		}
		&:nth-of-type(2) {
			height: calc(100% - 60px);
			padding-top: 10px;
			.right-item {
				float: right;
				width: 25%;
				height: 100%;
				background-color: #ffffff;
			}
			.left-item {
				float: left;
				padding-right: 10px;
				width: 75%;
				height: 100%;
				&-sub {
					background-color: #ffffff;
					&:first-of-type {
						margin-bottom: 10px;
						padding: 10px;
						height: calc(60% - 10px);
					}
					&:nth-of-type(2) {
						height: 40%;
					}
				}
			}
		}

		.nav-item {
			&:first-of-type {
				display: flex;
				align-items: center;
			}
			&:last-of-type {
				.button-pannel {
					display: inline-block;
					margin-right: 16px;
				}
			}
			&-sub {
				padding-left: 15px;
				font-size: 16px;
				color: #333;
				&:first-of-type {
					font-size: 14px;
					color: #3983f3;
					cursor: pointer;
				}
				&:last-of-type {
					position: relative;
					&::before {
						content: "";
						width: 1px;
						height: 100%;
						position: absolute;
						top: 0;
						left: 8px;
						background-color: #dde4eb;
					}
				}
			}
		}
	}
}
</style>
