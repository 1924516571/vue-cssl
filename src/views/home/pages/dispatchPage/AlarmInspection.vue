<template>
	<!-- 巡查问题 -->
	<vue-seamless-scroll :data="listData" class="alarm">
		<div
			class="alarm-item"
			v-for="(item, index) in listData"
			:key="item.id"
			@click="onRow(item)"
		>
			<span class="text-over">{{ index + 1 }}. {{ item.RWMC }}</span>
			<span>{{ item.GMT_MODIFIED }}</span>
		</div>
	</vue-seamless-scroll>
</template>
<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import vueSeamlessScroll from "./myClass.vue";
// import vueSeamlessScroll from "vue-seamless-scroll";
import dayjs from "dayjs";
import { homeApi } from "@/api";
@Component({
	components: {
		vueSeamlessScroll,
	},
})
export default class AlarmAbnormal extends Vue {
	@Mutation setTaskItem: any;
	//   @Mutation setIssuesItem: any;
	listData: any[] = [];
	async getList() {
		let data = await homeApi.getInsList();
		this.listData = data
			? data.map((item: any) => {
					item.GMT_MODIFIED = dayjs(item.GMT_MODIFIED).format(
						"MM-DD HH:mm"
					);
					return item;
			  })
			: [];
	}
	mounted() {
		this.getList();
	}
	getBG(status: string) {
		let bgstyle = "";
		if (status == "未处理") {
			bgstyle = "orange-state";
		} else if (status == "已交办") {
			bgstyle = "blue-state";
		} else if (status == "已处理") {
			bgstyle = "blue-state";
		} else if (status == "未完成") {
			bgstyle = "green-state";
		} else if (status == "已完成") {
			bgstyle = "gray-state";
		}
		return bgstyle;
	}
	@Emit()
	onRow(item: any) {
		let listItem: any = {
			rwId: item.ID,
			rwbh: item.RWBH,
			rwlx: item.RWLX,
			src: "",
			name: item.RWMC,
			state: item.STATUS,
			// publisher: item.JSR,
			// time: item.time,
			bg: this.getBG(item.STATUS),
			// zpids: item.zpids,
			jd: item.JD,
			wd: item.WD,
		};
		this.setTaskItem(listItem);
	}
}
</script>
<style lang="scss" scoped>
.alarm {
	padding: 0 10px;
	height: calc(100% - 52px);
	border-top: 1px solid #dde4eb;
	overflow: hidden;
	.alarm-item {
		display: flex;
		justify-content: space-between;
		padding: 10px 4px;
		color: #515a6e;
		cursor: pointer;
		&:nth-of-type(2n) {
			background-color: #f8f7f8;
		}
	}
	.text-over {
		max-width: calc(100% - 90px);
	}
}
</style>
