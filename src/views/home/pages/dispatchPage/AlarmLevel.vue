<template>
	<!-- 水位报警 -->
	<vue-seamless-scroll :data="listData" class="alarm">
		<div
			class="alarm-item"
			v-for="(item, index) in listData"
			:key="item.id"
			@click="onRow(item)"
		>
			<span class="text-over">{{ index + 1 }}. {{ item.SBMC }}</span>
			<div>
				报警限高<span style="color: red">{{ item.gc[0].SDSW }}</span
				>米
			</div>
			<div>
				当前水位<span style="color: red">{{ item.gc[0].VAL }}</span
				>米
			</div>
			<span>{{ item.KSSJ }}</span>
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
	@Mutation setFormParams: any;
	listData: any[] = [];
	async getList() {
		let data = await homeApi.getLevelList();
		this.listData = data.data
			? data.data.map((item: any) => {
					item.KSSJ = dayjs(item.KSSJ).format("MM-DD HH:mm");
					return item;
			  })
			: [];
	}
	mounted() {
		this.getList();
	}

	@Emit()
	onRow(item?: any) {
		this.setFormParams({
			jcdid: item.SBID,
			jcdmc: item.SBMC,
			jcdlx: item["SB_TP"],
			pqid: item.PQID,
			jd: item.JD,
			wd: item.WD,
			rwlx: "防汛",
			rwmc: "防汛",
			rwms: `${item.SBMC}于${item.gc[0].SJ}起超出设定水位${item.gc[0].SDSW}米,当前水位${item.gc[0].VAL}米`,
		});
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
		display: inline-block;
		max-width: 26%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>
