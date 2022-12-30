<template>
	<!-- 水质报警 -->
	<vue-seamless-scroll :data="listData" class="alarm">
		<div
			class="alarm-item"
			v-for="(item, index) in listData"
			:key="item.id"
			@click="onRow(item)"
		>
			<div>
				{{ index + 1 }}. {{ item.siteName }} {{ item.jcyzmc }}于{{
					item.gc[0].SJ
				}}起设定值<span style="color: red"
					>{{ item.gc[0].SDZ }}({{ item.gc[0].MBLB }})</span
				>,当前值<span style="color: red"
					>{{ item.gc[0].VAL }}({{ item.gc[0].LB }})</span
				>
			</div>
		</div>
	</vue-seamless-scroll>
</template>
<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import vueSeamlessScroll from "./myClass.vue";
// import vueSeamlessScroll from "vue-seamless-scroll";
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
		let data = await homeApi.getQulityList();
		this.listData = data.list;
	}
	mounted() {
		this.getList();
	}
	@Emit()
	onRow(item?: any) {
		this.setFormParams({
			jcdid: item.sbid,
			jcdmc: item.siteName,
			jcdlx: item.sbtp,
			pqid: item.area,
			jd: item.jd,
			wd: item.wd,
			rwlx: "水环境",
			rwmc: "水环境",
			rwms: `${item.siteName} ${item.jcyzmc}于${item.gc[0].SJ}起高于设定值${item.gc[0].SDZ}(${item.gc[0].MBLB})当前值${item.gc[0].VAL}(${item.gc[0].LB})`,
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
}
</style>
