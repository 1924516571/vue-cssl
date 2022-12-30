<template>
	<!-- 地图 -->
	<div class="map-view">
		<div class="view-item">
			<map-manage ref="map"></map-manage>
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
import { State, Mutation, Action, namespace } from "vuex-class";
import { MapManage, PanelView } from "@/components";
import { networkApi, taskApi } from "@/api";
import { coordinateTransform } from "@suc/monch";
const mapStore = namespace("mapStore");
@Component({
	components: {
		MapManage,
		PanelView,
	},
})
export default class SiteMap extends Vue {
	@Prop() list!: any;
	@State analysis: any;
	@mapStore.Mutation setMarkers: any;
	amountList: any[] = [
		{
			label: "所属片区",
			result: "",
		},
		{
			label: "事件类型",
			result: "",
		},

		{
			label: "事件状态",
			result: "",
			class: "blue-label",
		},
		{
			label: "处理时间",
			result: "",
		},
		{
			label: "发布人",
			result: "",
			class: "blue-label",
		},
	];
	
	mounted() {
		this.setMarker(this.list)
	}

	//地图部分
	setMarker(data: any) {
		let markerArr: any = [];
		let markericon = require("@/assets/map/任务事件-待处理.png");
		if (data.status === "已完成") {
			markericon = require("@/assets/map/任务事件-已完成.png");
		}
		let marker = {
			id: data.problemCode,
			name: data.problemName,
			lon: data.lon,
			lat: data.lat,
			coords: [data.lon, data.lat],
			style: {
				image: {
					icon: {
						anchor: [0.5, 1],
						src: markericon,
					},
				},
			},
		};
		if (this.$utils.validCoords(data.lon, data.lat)) {
			markerArr.push(marker);
		}

		this.setMarkers(markerArr);
		if (data.lon && data.lat) {
			this.getLocation([data.lon, data.lat]);
		}
	}
	//地图定位
	getLocation(coords: any) {
		const map1: any = this.$refs.map;
		const mapRoot: any = map1.$refs.mapObject;
		const tranPosN = coordinateTransform(coords, "EPSG:4326", "EPSG:3857");
		mapRoot.$view.animate({
			center: tranPosN,
			zoom: 18,
		});
	}

}
</script>
<style lang="scss" scoped>
.map-view {
	width: 100%;
	height: 100%;
	position: relative;
	.view-item {
		&:first-of-type {
			height: 100%;
		}
	}
}
</style>
