<template>
	<!--预警状态偷排分析-->
	<div class="alarm-platoon-view">
		<div class="content-header">
			<div class="header-left-item">
				<span>分析时间：{{ analysisTime }}</span>
			</div>
			<div class="header-right-item flex-class">
				<suc-button type="text"></suc-button>
				<suc-button type="primary" @click="showHis"
					>历史分析</suc-button
				>
			</div>
		</div>
		<div class="content-info scroll">
			<div class="info-item">
				<div class="title">
					<span>1 收集关联数据</span>
				</div>
				<div class="detail">
					<span>分析关联窨井</span>
				</div>
				<div class="detail">
					<span
						>分析涉及到的周边排污单位（{{ stealData.zbqys }}）</span
					>
				</div>
			</div>
			<div class="info-item">
				<div class="title">
					<span>2 数据关系建立</span>
				</div>
				<div class="detail">
					<span>收集各类站点时间序列数据</span>
				</div>
				<div class="detail">
					<span>处理异常数据</span>
				</div>
			</div>
			<div class="info-item">
				<div class="title">
					<span>3 水流来源初步判断</span>
				</div>
				<div class="detail">
					<span>上游窨井水流分析：</span>
					<span v-for="(item, index) in stealData.syyj" :key="index">
						<span>窨井{{ item.mc }}站点水位为{{ item.sw }}，</span>
						<span v-if="item.stat == 'D'"
							>水位异常，需要关注；</span
						>
						<span v-else>水位正常；</span>
					</span>
				</div>
			</div>
			<div class="info-item">
				<div class="title">
					<span>4 污染源推断结果</span>
				</div>
				<div class="detail">
					<span
						>经过站点时间序列数据与上游窨井水位分析，初步推断，{{
							stealData.knyy
						}}</span
					>
				</div>
				<div class="detail">
					<span>重点排查点：</span>
					<span
						class="detail-item"
						v-for="(item, index) in stealData.zdpc"
						:key="index"
						>{{ index + 1 }}: {{ item.mc }}</span
					>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { Vue, Component, Emit, Prop } from "vue-property-decorator";
import { SucButton } from "@suc/ui";
import { State, Mutation, Action, namespace } from "vuex-class";
@Component({
	components: {
		SucButton,
	},
})
export default class AlarmStealPlatoon extends Vue {
	@State netWork: any;
	@Prop() curId!: string;
	stealData: any = {
		knyy: "",
		syyjs: "",
		zbqys: "",
		syyj: [],
		zdpc: [],
	};

	analysisTime: string = "2010-09-09 12：00";
	@Emit("showHis")
	showHis() {}
	mounted() {
		this.getCurSteal();
	}
	//获取查看分析报告
	getCurSteal() {
		this.analysisTime = "";
		this.stealData = {
			knyy: "",
			syyjs: "",
			zbqys: "",
			syyj: [],
			zdpc: [],
		};
		let params = { id: this.curId };
		let url = "/jnsw/pipenetwork/getAnalysis";
		this.$http
			.get(url, { params })
			.then((res: any) => {
				let data = res.data.data;
				this.analysisTime = res.data.tm;
				this.stealData.knyy = data.knyy;
				this.stealData.syyjs = data.syyj.length;
				this.stealData.zbqys = data.zbqys;
				this.stealData.syyj = data.syyj.map((item: any) => item);
				this.stealData.zdpc = data.zdpc.map((item: any) => item);
			})
			.catch((err: any) => {
				this.$SucMessage.error(err.data.message);
			});
	}
}
</script>
<style lang="scss" scoped>
.alarm-platoon-view {
	height: 100%;
	width: 100%;
	padding: 0 10px;
	font-size: 14px;
	.content-header {
		height: 40px;
		display: flex;
		justify-content: space-between;
		.flex-class {
			display: flex;
			align-items: center;
		}
	}
	.content-info {
		height: calc(60% - 20px);
		padding: 10px 0;
		overflow: scroll;
		.info-item {
			.title {
				font-weight: 600;
			}
			.detail {
				text-indent: 2em;
				.detail-item {
					display: block;
				}
			}
		}
	}
}
</style>