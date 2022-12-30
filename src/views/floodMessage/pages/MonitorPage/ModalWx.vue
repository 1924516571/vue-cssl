<template>
	<!--  卫星云图弹框  -->
	<div class="mon-tf">
		<div class="main-map">
			<!-- <suc-map :options="olMap.map"> -->
			<!-- <ol-layer
					v-for="(layer, index) in olMap.baseLayer"
					:options="layer"
					:key="'layer' + index"
				>
				</ol-layer> -->
			<!-- <template>
					<ol-layer :options="wximg"></ol-layer>
				</template> -->
			<!-- </suc-map> -->
			<img :src="wximg1" alt="" />
		</div>
		<div class="play-action">
			<div class="line-progress">
				<suc-progress
					:stroke-width="5"
					:percentage="percentage"
					:show-text="false"
				></suc-progress>
			</div>
			<div class="play-btn">
				<img v-if="!type" src="@/assets/yt/1.png" @click="plays('1')" />
				<img v-if="type" src="@/assets/yt/2.png" @click="plays('2')" />
				<img src="@/assets/yt/3.png" @click="plays('3')" />
				<img src="@/assets/yt/4.png" @click="plays('4')" />
				<label>速度：</label>
				<suc-radio-group v-model="playRadio">
					<suc-radio label="500" style="margin-right: 15px"
						>0.5s</suc-radio
					>
					<suc-radio label="1000" style="margin-right: 15px"
						>1.0s</suc-radio
					>
					<suc-radio label="2000" style="margin-right: 15px"
						>2.0s</suc-radio
					>
				</suc-radio-group>
				<suc-select
					v-model="playSel"
					:options="ytOptions"
					style="width: 210px"
				></suc-select>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { getPicWxyt1 } from "@/api/flood/floodmange";
import { MapManage } from "@/components";
import { SucProgress, SucRadioGroup, SucRadio, SucSelect } from "@suc/ui";

@Component({
	components: {
		MapManage,
		SucProgress,
		SucRadioGroup,
		SucRadio,
		SucSelect,
	},
})
export default class MainPanel extends Vue {
	olMap = this.$getMapConfig();
	list: any = null;
	playRadio: string = "2000";
	playSel: number = 0;
	ytOptions: Array<any> = [];
	type: boolean = false;
	percentLen: number = 0;
	timer: any = null;
	wximg1: any = null;
	wximg: any = {
		name: "mapbox",
		source: {
			type: "ImageStatic",
			// type: "EsriJSON",
			// url: `/api/weather/1.png`,
			url: `/api/weather/wxyt/202012180830.JPG`,
			crossOrigin: "anonymous",
			projection: "EPSG:4326",
			imageExtent: [90, 0, 160, 45],
		},
		zIndex: 2,
		refresh: true,
		visible: true,
	};

	mounted() {
		this.getWxyt();
	}

	async getWxyt() {
		let wxytInfo = await getPicWxyt1();
		// this.list = this.getTotalMidValue(wxytInfo);
		this.list = wxytInfo.data;
		if (this.list.length > 0) {
			this.ytOptions = this.list.map((it: any, index: any) => {
				// let t = it.split(".")[0];
				// let time = t.replace(
				// 	/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})$/,
				// 	"$1-$2-$3 $4:$5"
				// );
				return {
					label: it.time,
					value: index,
				};
			});
		}
		this.percentLen = Number(100 / (this.list.length - 1));
		this.playSel = this.ytOptions[0].value;
		this.wximg.source.url = `/api/weather/wxyt/${
			this.list[this.playSel].name
		}`;
		this.wximg1 = `/api/weather/wxyt/${this.list[this.playSel].name}`;
	}
	getTotalMidValue(source: string) {
		if (source == null) return null;
		let arr = source.split("</N>");
		let trm: any = [];
		if (arr.length > 0) {
			arr.forEach((it: any) => {
				let s = it.match(/<N>(\S*)/);
				if (s) {
					trm.push(s[1]);
				}
			});
		}
		return trm;
	}
	plays(type: string) {
		if (type == "1") {
			this.type = true;
			this.getTimer();
		} else {
			this.type = false;
			window.clearInterval(this.timer);
			this.getStatus(type);
		}
	}
	@Watch("playRadio")
	getRadio() {
		this.type = false;
		window.clearInterval(this.timer);
	}
	get percentage() {
		let lens = this.percentLen * this.playSel;
		return lens;
	}
	@Watch("playSel")
	getPlaySel() {
		this.wximg.source.url = `/api/weather/wxyt/${
			this.list[this.playSel].name
		}`;
		this.wximg1 = `/api/weather/wxyt/${this.list[this.playSel].name}`;
	}
	//设置时间
	getTimer() {
		let vm = this;
		this.timer = setInterval(() => {
			if (vm.playSel >= vm.ytOptions.length - 1) {
				vm.playSel = 0;
			} else {
				vm.playSel++;
			}
		}, Number(vm.playRadio));
	}
	//前进、后退
	getStatus(num: string) {
		if (num == "3") {
			if (this.playSel < 0) {
				this.playSel = this.ytOptions.length - 1;
			} else {
				this.playSel--;
			}
		} else if (num == "4") {
			if (this.playSel >= this.ytOptions.length - 1) {
				this.playSel = 0;
			} else {
				this.playSel++;
			}
		}
	}
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
.mon-tf {
	width: 100%;
	height: 586px;
	.main-map {
		width: 100%;
		height: calc(100% - 50px);
		img {
			width: 100%;
		}
	}
	.play-action {
		width: 100%;
		height: 50px;
		.line-progress {
			width: 100%;
			height: 5px;
		}
		.play-btn {
			width: 100%;
			height: 45px;
			line-height: 35px;
			padding-top: 10px;
			img {
				width: 16px;
				height: 16px;
				vertical-align: middle;
				margin-right: 15px;
				cursor: pointer;
			}
			label {
				margin-left: 130px;
				margin-right: 10px;
			}
		}
	}
}
</style>
