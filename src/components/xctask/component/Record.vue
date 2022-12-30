<template>
  <div class="record-view">
    <panel-view heading="处理记录">
      <div class="recordStyle">
		  <el-timeline style="padding: 20px;">
			<el-timeline-item
			:timestamp="item.time"
			placement="top"
			v-for="(item, index) in recordList"
			:key="index"
			>
			<el-card>
				<h4>{{ item.content }}</h4>
				<p>{{item.sm}}</p>
				<viewer :images="item.zpids" style="display: flex; flex-wrap: wrap">
				<div
					v-for="(image, id) in item.zpids"
					:key="id"
					style="width: 20%"
				>
					<img
					style="height: 74px"
					:src="image"
					>
					</img>
				</div>
				</viewer>
			</el-card>
			</el-timeline-item>
		</el-timeline>
	  </div>
      <!-- <div class="record-content">
        <div
          class="record-item"
          v-for="(item, index) in recordList"
          :key="index"
        >
          <div class="record-item-sub">
            <div :class="item.icon"></div>
          </div>
          <div class="record-item-sub">
            <div>
              <span>{{ item.content }}</span>
            </div>
            <div class="time">
              <span>{{ item.time }}</span>
            </div>
          </div>
        </div>
      </div> -->
    </panel-view>
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
import { PanelView } from "@/components";
import { State } from "vuex-class";
import { envTaskApi } from "@/api";
import { onImageLoad } from "@/api/public";
import { Timeline, TimelineItem, Card, Image } from "element-ui";
@Component({
	components: {
		PanelView,
		ElTimeline: Timeline,
		ElTimelineItem: TimelineItem,
		ElCard: Card,
		ElImage: Image,
	},
})
export default class Record extends Vue {
	@State analysis: any;
	recordList: any[] = [];
	mounted() {
		this.getRecordList();
	}
	async getRecordList() {
		let that = this;
		that.recordList = [];
		let imgData = "";
		let id = that.analysis.taskItem.rwId;
		envTaskApi.getRecordList(id).then(async (data: any) => {
			that.recordList = await Promise.all(
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
						zpids: await this.getImg(e.zpids),
					};
				})
			);
		});
	}
	@Watch("analysis.taskItem.state", { immediate: true, deep: true })
	stateChange() {
		this.getRecordList();
	}
	async getImg(files: any) {
		let that = this;
		let fileList: any[] = [];
		// that.pendingData.imgs = [];
		if (files) {
			for (let i = 0; i < files.length; i++) {
				let url = `jnsw/task/downloadRecordPic/${files[i]}`;
				onImageLoad(url).then((res: any) => {
					fileList.push(res);
				});
			}
		}
		return fileList;
	}
}
</script>
<style lang="scss" scoped>
.record-view {
	width: 100%;
	height: 100%;
	background-color: #ffffff;
	//   padding: 15px;
	.recordStyle {
		overflow-y: auto;
		height: calc(100% - 54px);
	}
	.record-content {
		padding: 15px;
		border-top: 1px solid #dde4eb;
		.record-item {
			display: flex;
			align-items: flex-start;
			height: 71px;
			&-sub {
				&:first-of-type {
					position: relative;
					&::after {
						content: "";
						position: absolute;
						top: 21px;
						left: 10px;
						width: 1px;
						height: 55px;
						background-color: #cccccc;
					}
				}
				&:nth-of-type(2) {
					margin-left: 10px;
					font-size: 14px;
					color: #333333;
				}
			}
			.green-bg {
				color: #32bb53;
			}
			.blue-bg {
				color: #4eabff;
			}
			.time {
				font-size: 12px;
				color: #b7b7b7;
			}
		}
	}
}
</style>
