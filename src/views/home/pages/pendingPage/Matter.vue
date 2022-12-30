<template>
	<!-- 事项 -->
	<div class="matter-view">
		<div class="top-nav">
			<div class="top-nav-item">
				<tab-switch :tabs="tabs" @get-tab="getTab"></tab-switch>
			</div>
		</div>
		<div class="content">
			<div class="content-item">
				<panel-view heading="投诉举报">
					<div class="lists scroll">
						<template v-if="matters.complaint.length">
							<div
								class="lists-item"
								v-for="(item, index) in matters.complaint"
								:key="index"
							>
								<div class="list-content">
									<div class="txt">
										<span>{{ item.RWMC }}</span>
									</div>
									<div
										class="state"
										:class="
											item.STATUS == '未处理'
												? 'orange-bg'
												: item.STATUS == '已交办' ||
												  item.STATUS == '已处理' ||
												  item.STATUS == '已上报' ||
												  item.STATUS == '已发布' ||
												  item.STATUS == '已审批'
												? 'blue-bg'
												: item.STATUS == '待审核'
												? 'green-bg'
												: 'gray-bg'
										"
									>
										<span>{{ item.STATUS }}</span>
									</div>
								</div>
								<div class="time">
									<span>{{ item.TIME }}</span>
								</div>
							</div>
						</template>
						<template v-if="!matters.complaint.length">
							<div class="nothing">
								<p>暂无需要处理的问题</p>
								<div class="nothing-item">
									<img
										src="@/assets/icon/nothing.png"
										alt="无"
									/>
								</div>
							</div>
						</template>
					</div>
				</panel-view>
			</div>
			<div class="content-item">
				<panel-view heading="巡查问题">
					<div class="lists scroll">
						<template v-if="matters.inspect.length">
							<div
								class="lists-item"
								style="cursor: pointer"
								v-for="(item, index) in matters.inspect"
								:key="index"
								@click="rwDetail1(item)"
							>
								<div class="list-content">
									<div class="txt">
										<span>{{ item.RWMC }}</span>
									</div>
									<div
										class="state"
										:class="
											item.STATUS == '未处理'
												? 'orange-bg'
												: item.STATUS == '已交办' ||
												  item.STATUS == '已处理' ||
												  item.STATUS == '已上报' ||
												  item.STATUS == '已发布' ||
												  item.STATUS == '已审批'
												? 'blue-bg'
												: item.STATUS == '待审核'
												? 'green-bg'
												: 'gray-bg'
										"
									>
										<span>{{ item.STATUS }}</span>
									</div>
								</div>
								<div class="time">
									<span>{{ item.TIME }}</span>
								</div>
							</div>
						</template>
						<template v-if="!matters.inspect.length">
							<div class="nothing">
								<p>暂无需要处理的问题</p>
								<div class="nothing-item">
									<img
										src="@/assets/icon/nothing.png"
										alt="无"
									/>
								</div>
							</div>
						</template>
					</div>
				</panel-view>
			</div>
			<div class="content-item">
				<panel-view heading="任务事件">
					<div class="lists scroll">
						<template v-if="matters.task.length">
							<div
								class="lists-item"
								style="cursor: pointer"
								v-for="(item, index) in matters.task"
								:key="index"
								@click="rwDetail(item)"
							>
								<div class="list-content">
									<div class="txt">
										<span>{{ item.RWMC }}</span>
									</div>
									<div
										class="state"
										:class="
											item.STATUS == '未处理'
												? 'orange-bg'
												: item.STATUS == '已交办' ||
												  item.STATUS == '已处理' ||
												  item.STATUS == '已上报' ||
												  item.STATUS == '已发布' ||
												  item.STATUS == '已审批'
												? 'blue-bg'
												: item.STATUS == '待审核'
												? 'green-bg'
												: 'gray-bg'
										"
									>
										<span>{{ item.STATUS }}</span>
									</div>
								</div>
								<div class="time">
									<span>{{ item.TIME }}</span>
								</div>
							</div>
						</template>
						<template v-if="!matters.task.length">
							<div class="nothing">
								<p>暂无需要处理的问题</p>
								<div class="nothing-item">
									<img
										src="@/assets/icon/nothing.png"
										alt="无"
									/>
								</div>
							</div>
						</template>
					</div>
				</panel-view>
			</div>
			<div class="content-item">
				<panel-view heading="工程管理">
					<div class="lists scroll">
						<template v-if="matters.project.length">
							<div
								class="lists-item"
								v-for="(item, index) in matters.project"
								:key="index"
							>
								<div class="list-content">
									<div class="txt">
										<span>{{ item.rwmc }}</span>
									</div>
									<div
										class="state"
										:class="
											item.STATUS == '未处理'
												? 'orange-bg'
												: item.STATUS == '已交办' ||
												  item.STATUS == '已处理' ||
												  item.STATUS == '已上报' ||
												  item.STATUS == '已发布' ||
												  item.STATUS == '已审批'
												? 'blue-bg'
												: item.STATUS == '待审核'
												? 'green-bg'
												: 'gray-bg'
										"
									>
										<span>{{ item.status }}</span>
									</div>
								</div>
								<div class="time">
									<span>{{ item.time }}</span>
								</div>
							</div>
						</template>
						<template v-if="!matters.project.length">
							<div class="nothing">
								<p>暂无需要处理的问题</p>
								<div class="nothing-item">
									<img
										src="@/assets/icon/nothing.png"
										alt="无"
									/>
								</div>
							</div>
						</template>
					</div>
				</panel-view>
			</div>
			<div class="content-item" v-if="!pqFlag">
				<panel-view heading="故障上报">
					<div class="lists scroll">
						<template v-if="matters.fault.length">
							<div
								class="lists-item"
								v-for="(item, index) in matters.fault"
								:key="index"
								@click="rwDetail(item)"
								style="cursor: pointer"
							>
								<div class="list-content">
									<div class="txt">
										<span>{{ item.RWMC }}</span>
									</div>
									<div
										class="state"
										:class="
											item.STATUS == '未处理'
												? 'orange-bg'
												: item.STATUS == '已交办' ||
												  item.STATUS == '已处理' ||
												  item.STATUS == '已上报' ||
												  item.STATUS == '已发布' ||
												  item.STATUS == '已审批'
												? 'blue-bg'
												: item.STATUS == '待审核'
												? 'green-bg'
												: 'gray-bg'
										"
									>
										<span>{{ item.STATUS }}</span>
									</div>
								</div>
								<div class="time">
									<span>{{ item.TIME }}</span>
								</div>
							</div>
						</template>
						<template v-if="!matters.fault.length">
							<div class="nothing">
								<p>暂无需要处理的问题</p>
								<div class="nothing-item">
									<img
										src="@/assets/icon/nothing.png"
										alt="无"
									/>
								</div>
							</div>
						</template>
					</div>
				</panel-view>
			</div>
			<div class="content-item" v-if="!pqFlag">
				<panel-view heading="应急任务">
					<div class="lists scroll">
						<template v-if="matters.emergency.length">
							<div
								class="lists-item"
								style="cursor: pointer"
								@click="rwDetail(item)"
								v-for="(item, index) in matters.emergency"
								:key="index"
							>
								<div class="list-content">
									<div class="txt">
										<span>{{ item.RWMC }}</span>
									</div>
									<div
										class="state"
										:class="
											item.STATUS == '未处理'
												? 'orange-bg'
												: item.STATUS == '已交办' ||
												  item.STATUS == '已处理' ||
												  item.STATUS == '已上报' ||
												  item.STATUS == '已发布' ||
												  item.STATUS == '已审批'
												? 'blue-bg'
												: item.STATUS == '待审核'
												? 'green-bg'
												: 'gray-bg'
										"
									>
										<span>{{ item.STATUS }}</span>
									</div>
								</div>
								<div class="time">
									<span>{{ item.TIME }}</span>
								</div>
							</div>
						</template>
						<template v-if="!matters.emergency.length">
							<div class="nothing">
								<p>暂无需要处理的问题</p>
								<div class="nothing-item">
									<img
										src="@/assets/icon/nothing.png"
										alt="无"
									/>
								</div>
							</div>
						</template>
					</div>
				</panel-view>
			</div>
		</div>
		<div class="detail" v-if="show">
			<detail :url="url" @goback="getshow"></detail>
		</div>
		<div class="detail" v-if="show1">
			<xc-detail :url="url" @goback="getshow1"></xc-detail>
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
import { State, Mutation, namespace } from "vuex-class";
import { PanelView, TabSwitch } from "@/components";
import { homeApi, taskApi } from "@/api";
import { XcDetail, Detail } from "@/components";
@Component({
	components: {
		PanelView,
		TabSwitch,
		Detail,
		XcDetail,
	},
})
export default class ModuleView extends Vue {
	tabs: any[] = ["待办事项", "已办事项"];
	@Mutation setTaskItem: any;
	@Prop() deptId!: number;
	@Prop() pqFlag!: boolean;
	show: boolean = false;
	show1: boolean = false;

	@Watch("pqFlag")
	changeActor(newdata: any, oldata: any) {
		var url = "";
		// console.log(this.pqFlag);
		if (this.pqFlag) {
			url =
				this.matterParams.status == 0
					? "jnsw/newtask/taskUnfinishedByUser"
					: "jnsw/newtask/taskFinishedByUser";
		} else {
			url =
				this.matterParams.status == 0
					? "jnsw/newtask/taskUnfinishedByDep"
					: "jnsw/newtask/taskFinishedByDep";
		}
		this.getInfo(url);
	}
	getTab(index: number) {
		this.matterParams.status = index;
		var url = "";
		if (index == 0) {
			url = this.pqFlag
				? "jnsw/newtask/taskUnfinishedByUser"
				: "jnsw/newtask/taskUnfinishedByDep";
		} else {
			url = this.pqFlag
				? "jnsw/newtask/taskFinishedByUser"
				: "jnsw/newtask/taskFinishedByDep";
		}
		this.getInfo(url);
	}
	// list: any[] = [
	//   {
	//     name: "二沟子河有恶臭味道，希望对方公司孙大发孙大 ",
	//     state: "待处理",
	//     time: "2020-01-12"
	//   },
	//   {
	//     name: "二沟子河有恶臭味道，希望",
	//     state: "待处理",
	//     time: "2020-01-12"
	//   }
	// ];
	matters: any = {
		complaint: [],
		project: [],
		task: [],
		inspect: [],
		emergency: [],
		fault: [],
	};
	matterParams: any = {
		deptId: "",
		endTime: "",
		manager: "",
		startTime: "",
		status: "0",
	};
	url: string = "";
	mounted() {
		this.getInfo("jnsw/newtask/taskUnfinishedByUser");
    this.url = this.$route.path
	}
	async getInfo(url: string) {
		homeApi.getNumber(url).then((data: any) => {
			this.matters = data;
		});
	}
	//跳转任务详情
	async rwDetail(item: any) {
		taskApi
			.getTaskDetail(item.ID)
			.then((data: any) => {
				if (data) {
					this.setTaskItem({
						rwId: item.ID,
						name: item.RWMC,
						state: item.STATUS,
						rwbh: item.RWBH,
						jd: data.jd,
						wd: data.wd,
					});
				}
			})
			.finally(() => {
				this.show = true;
			});

		// this.$router.push({
		//   path: "/main/pieNetwork/task",
		//   query: { rwid: item.id, status: item.status, rwbh: item.rwbh },
		// });
	}
	rwDetail1(item: any) {
		taskApi
			.getTaskDetail(item.ID)
			.then((data: any) => {
				if (data) {
					this.setTaskItem({
						rwId: item.ID,
						name: item.RWMC,
						state: item.STATUS,
						rwbh: item.RWBH,
						jd: data.jd,
						wd: data.wd,
					});
				}
			})
			.finally(() => {
				this.show1 = true;
			});
	}
	params: any = {};
	getshow() {
		this.show = false;
		this.getInfo("jnsw/newtask/taskUnfinishedByUser");
	}
	getshow1() {
		this.show1 = false;
		this.getInfo("jnsw/newtask/taskUnfinishedByUser");
	}
}
</script>
<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
.matter-view {
	// padding: 10px;
	width: 100%;
	height: 100%;
	.top-nav {
		padding: 10px 10px 0;
		border-bottom: 1px solid #dde4ed;
		&-item {
			width: 180px;
			cursor: pointer;
		}
	}
	.content {
		display: flex;
		flex-wrap: wrap;
		height: calc(100% - 43px);
		&-item {
			padding: 0 10px;
			width: 25%;
			height: 40%;
			&:first-of-type {
				padding-left: 0;
			}
			.lists {
				padding: 0 10px 10px;
				height: calc(100% - 52px);
				overflow: auto;
				&-item {
					padding: 5px 0;
					font-size: 14px;
					border-bottom: 1px solid #dde4ed;
					.list-content {
						display: flex;
						justify-content: space-between;
						color: #333;
					}
					.time {
						color: #999;
					}
					.txt {
						width: 200px;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
					.state {
						padding: 5px 8px;
						border-radius: 2px;
						font-size: 12px;
						color: #fff;
					}
					.orange-bg {
						background-color: #ffab3d;
					}
					.blue-bg {
						background-color: #5397ff;
					}
					.green-bg {
						background-color: #32bb53;
					}
					.gray-bg {
						background-color: #ccc;
					}
				}
				.nothing {
					height: 100%;
					p {
						color: #999;
					}
					&-item {
						height: calc(100% - 20px);
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}
		}
	}
}
.detail {
	width: 100%;
	height: 100%;
	padding: 10px;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 100;
	background-color: $pages-bg;
}
</style>
