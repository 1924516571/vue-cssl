<template>
	<div class="content">
		<div id="capture">
			<div class="title">
				<h1>巡查问题记录</h1>
			</div>
			<div class="content-item">
				<horizontal-cell
					label="任务名称"
					:content="recordInfo.rwmc"
				></horizontal-cell>
				<horizontal-cell
					label="所属区域"
					:content="recordInfo.sspq ? recordInfo.sspq + '片区' : ''"
				></horizontal-cell>
			</div>
			<div class="content-item">
				<horizontal-cell
					label="时间"
					:content="recordInfo.time"
				></horizontal-cell>
				<horizontal-cell
					label="任务来源"
					:content="recordInfo.rwly"
				></horizontal-cell>
			</div>
			<div class="content-item">
				<horizontal-cell
					label="发布人"
					:content="recordInfo.fbr"
				></horizontal-cell>
				<horizontal-cell
					label="接收人"
					:content="recordInfo.jsr"
				></horizontal-cell>
			</div>
			<div class="content-item">
				<horizontal-cell
					label="处理情况"
					:content="recordInfo.status"
				></horizontal-cell>
			</div>
			<div class="content-item">
				<horizontal-cell
					label="任务类型"
					:content="recordInfo.rwlx"
				></horizontal-cell>
			</div>
			<div class="content-item">
				<vertical-cell label="任务描述" :min-height="120">
					<p class="describe">{{ recordInfo.rwms }}</p>
				</vertical-cell>
			</div>
			<div class="content-item">
				<vertical-cell label="任务图片" :min-height="120">
					<section class="img-container">
						<img
							v-for="(item, index) in zpids"
							:src="item.src"
							:key="index"
							alt="任务图片"
						/>
					</section>
				</vertical-cell>
			</div>
			<div
				class="content-item"
				style="page-break-inside: avoid !important"
			>
				<vertical-cell label="任务坐标" :min-height="260">
					<div class="map">
						<suc-map
							:options="olMap.map"
							v-bind.sync="olMap.map.view"
						>
							<template v-for="layer in olMap.baseLayer">
								<ol-layer
									:options="layer"
									:key="layer.id"
								></ol-layer>
							</template>
							<ol-markers>
								<template v-for="marker in markers">
									<ol-marker :options="marker"></ol-marker>
								</template>
							</ol-markers>
						</suc-map>
					</div>
				</vertical-cell>
			</div>
			<div class="content-item">
				<vertical-cell label="处理流程" :min-height="256">
					<div class="table">
						<Table
							size="small"
							:columns="tabColumns"
							:data="tableData"
							border
						></Table>
					</div>
				</vertical-cell>
			</div>
		</div>
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
import { State } from "vuex-class";
import { SucButton, SucModal } from "@suc/ui";
import { envTaskApi, taskApi } from "@/api";
import { Table } from "iview";
import HorizontalCell from "./HorizontalCell.vue";
import VerticalCell from "./VerticalCell.vue";
import { onImageLoad } from "@/api/public";
// import { HorizontalCell, VerticalCell } from "@/components/xctask/component";
@Component({
	components: {
		SucButton,
		SucModal,
		"horizontal-cell": HorizontalCell,
		"vertical-cell": VerticalCell,
		Table,
	},
})
export default class RecordModal extends Vue {
	@State analysis: any;
	olMap = this.$getMapConfig();
	markers: any = [];
	tabColumns: any = [
		{
			title: "时间",
			key: "time",
		},
		{
			title: "内容",
			key: "content",
		},
		{
			title: "描述",
			key: "sm",
		},
	];
	tableData: any[] = [];
	@Prop() model!: boolean;
	mounted() {
		this.getRecordInfo();
		this.getRecordList();
	}
	recordInfo: any = {};
	zpids: any = [];
	// 获取巡查记录详情页信息
	getRecordInfo() {
		let that = this;
		let id = that.analysis.taskItem.rwId;
		that.zpids = [];
		let imgData = "";
		taskApi.getTaskDetail(id).then(async (data: any) => {
			if (data) {
				this.recordInfo = data;
				if (data.zpids) {
					for (let i = 0; i < data.zpids.length; i++) {
						imgData = await this.getImg(data.zpids[i]);
						this.zpids.push({ src: imgData });
					}
				}
				this.setMarker(data);
			}
		});
	}
	async getImg(id: string) {
		let url = "/jnsw/task/downloadTaskPic/" + `${id}`;
		let src = await onImageLoad(url);
		return src;
	}
	// 获取处理记录
	getRecordList() {
		let that = this;
		let id = that.analysis.taskItem.rwId;
		envTaskApi.getRecordList(id).then(async (data: any) => {
			that.tableData = await Promise.all(
				data.map(async (e: any) => {
					return {
						content:
							e.clr +
							e.cz +
							(e.cz == "交办" || e.cz == "退回"
								? e.jbr
									? e.jbr
									: ""
								: ""),
						time: e.time,
						sm: e.sm,
					};
				})
			);
		});
	}
	//地图部分
	setMarker(data: any) {
		this.markers = [];
		let markericon = require("@/assets/map/任务事件-待处理.png");
		if (data.status === "已完成") {
			markericon = require("@/assets/map/任务事件-已完成.png");
		}
		if (data.jd && data.wd) {
			this.markers.push({
				id: data.rwlx + data.rwbh,
				name: data.rwlx,
				lon: data.jd,
				lat: data.wd,
				coords: [data.jd, data.wd],
				style: {
					image: {
						icon: {
							anchor: [0.5, 1],
							src: markericon,
						},
					},
				},
			});
			this.olMap.map.view.center.coord = [data.jd, data.wd];
		}
	}
}
</script>

<style lang="scss" scoped>
.content {
	margin-top: 100px;
}
#capture {
	width: calc(100% - 100px);
	padding: 50px;
	.title {
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 100px;
	}
	.content-item {
		width: 100%;
		display: flex;
		border: {
			right: solid 1px #dde4eb;
			top: solid 1px #dde4eb;
		}
		&:last-child {
			border-bottom: 1px solid #dde4eb;
		}
		.map {
			width: 100%;
			height: 280px;
			padding: 20px 18px;
		}
		.table {
			width: 100%;
			padding: 20px;
		}
		.img-container {
			padding: 20px;
			img {
				width: 200px;
				height: 150px;
				margin-right: 30px;
			}
		}
		.describe {
			padding: 15px;
			text-indent: 8px;
			font-family: Microsoft YaHei UI;
			font-size: 14px;
			line-height: 14px;
			letter-spacing: 1px;
			color: #333333;
		}
	}
}
</style>