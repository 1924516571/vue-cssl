<template>
	<!-- 地图 -->
	<div class="map-view">
		<div class="view-item">
			<map-manage ref="map"></map-manage>
		</div>
		<div class="view-item">
			<panel-view :heading="'任务名称: ' + analysis.taskItem.name">
				<div class="amount-item">
					<div
						class="amount-item-sub"
						v-for="(item, index) in amountList"
						:key="index"
					>
						<div>
							<span>{{ item.label }}</span>
						</div>
						<div :class="item.class">
							<span class="big-font">{{ item.result }}</span>
						</div>
					</div>
				</div>
			</panel-view>
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
	amountParams: any = {
		gwId: "1",
		sbId: "1",
	};
	mounted() {
		this.getTaskDetail();
		// this.getAmount()
		// this.getMarkers()
	}
	async getTaskDetail() {
		let that = this;
		let id = that.analysis.taskItem.rwId;
		taskApi.getTaskDetail(id).then((data: any) => {
			if (data) {
				that.amountList[0].result = data.sspq;
				that.amountList[1].result = data.rwlx;
				that.amountList[2].result = data.status;
				that.amountList[3].result = data.time;
				that.amountList[4].result = data.fbr;
				that.amountList[4].label =
					data.rwly == "巡查事件" || data.rwlx == "故障上报"
						? "上报人"
						: "发布人";
			}
		});
		this.setMarker(that.analysis.taskItem);
	}

	//地图部分
	setMarker(data: any) {
		let markerArr: any = [];
		let markericon = require("@/assets/map/任务事件-待处理.png");
		if (data.state === "已完成") {
			markericon = require("@/assets/map/任务事件-已完成.png");
		}
		let marker = {
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
		};
		if (this.$utils.validCoords(data.jd, data.wd)) {
			markerArr.push(marker);
		}

		this.setMarkers(markerArr);
		if (data.jd && data.wd) {
			this.getLocation([data.jd, data.wd]);
		}
	}
	//地图定位
	getLocation(coords: any) {
		const map1: any = this.$refs.map;
		console.log(map1.$refs);
		const mapRoot: any = map1.$refs.mapObject;
		const tranPosN = coordinateTransform(coords, "EPSG:4326", "EPSG:3857");
		mapRoot.$view.animate({
			center: tranPosN,
			zoom: 18,
		});
	}

	// async getAmount () {
	//   let that = this
	//   that.amountParams.gwId = that.analysis.row.GWID
	//   that.amountParams.sbId = that.analysis.row.SBID
	//   const amount = await networkApi.getSiteAmount(that.amountParams)
	//   that.amountList.forEach((e: any) => {
	//     e.amount = amount[e.key]
	//   })
	// }
	//地图部分
	// async getMarkers () {
	//   let that = this
	//   let markerArr:any = []
	//   let markericon = require('@/assets/map/管网-正常.png')
	//   that.amountParams.gwId = that.analysis.row.GWID
	//   that.amountParams.sbId = that.analysis.row.SBID
	//   const mapData = await networkApi.getCurrentSite(that.amountParams)
	//   let { currentdevice, upstreamdevice, enterprises } = mapData
	//   let currentMarker = {
	//     id: 'currentdevice',
	//     name: currentdevice.sbmc,
	//     lon: currentdevice.jd,
	//     lat: currentdevice.wd,
	//     style: {
	//       image: {
	//         icon: {
	//           anchor: [0.5, 1],
	//           src: markericon
	//         }
	//       }
	//     }
	//   }
	//   markerArr.push(currentMarker);
	//   let upstreamMarker = {}
	//   let enterpriseMarker = {}
	//   if(upstreamdevice.length){
	//        upstreamdevice.forEach((item:any) => {
	//            upstreamMarker = {
	//               id: 'upstreamdevice',
	//               name: item.sbmc,
	//               lon: item.jd,
	//               lat: item.wd,
	//               style: {
	//                   image: {
	//                       icon: {
	//                       anchor: [0.5, 1],
	//                       src: require('@/assets/map/河湖-正常.png')
	//                       }
	//                   }
	//               }
	//            }
	//           markerArr.push(upstreamMarker)
	//        })
	//   }
	//   if(enterprises.length){
	//       enterprises.forEach((item:any) => {
	//           enterpriseMarker = {
	//                   id: 'enterprises',
	//                   name: item.qymc,
	//                   lon: item.jd,
	//                   lat: item.wd,
	//                   style: {
	//                       image: {
	//                           icon: {
	//                           anchor: [0.5, 1],
	//                           src: require('@/assets/map/企业.png')
	//                           }
	//                       }
	//                   }
	//           }
	//           markerArr.push(enterpriseMarker)
	//       })
	//   }
	//   that.setMarkers(markerArr)

	// }
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
		&:last-of-type {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 90px;
			background-color: rgba(255, 255, 255, 0.9);
			box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.08);
		}

		.amount-item {
			display: flex;
			align-items: center;
			&-sub {
				padding: 0 10px;
				display: flex;
				align-items: center;
				> div {
					padding-right: 10px;
					font-size: 14px;
					color: #333;
				}
				.big-font {
					font-size: 16px;
				}
				.red-label {
					color: #ff5a47;
				}
				.blue-label {
					color: #3a7bef;
				}
			}
		}
	}
}
</style>
