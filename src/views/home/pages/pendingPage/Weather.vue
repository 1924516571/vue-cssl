<template>
	<!-- 天气 -->
	<div class="weather-view">
		<div class="weather">
			<div class="weather-item">
				<div>
					<span>天气情况</span>
				</div>
				<div>
					<span></span>
					<span>江宁</span>
				</div>
			</div>
			<div class="weather-item">
				<div class="status">
					<div>
						<img :src="dataList.src" alt="天气" />
					</div>
					<div>
						<!-- <div>
              <span style="font-size:20px;">{{weatherData.tem}}°</span>
              <span>当前</span>
              <span>{{weatherData.windcn}}</span>
              <span>风速</span>
              <span>{{weatherData.windf}}m/s</span>
            </div>
            <div class="status">
              <div class="status">
                <div>
                  <span>湿度</span>
                </div>
                <div>
                  <span>{{weatherData.hum}}%</span>
                </div>
              </div>
              <div class="status">
                <span>能见度</span>
                <span>{{weatherData.vis}}公里</span>
              </div>
              <div class="status">
                <span>气压</span>
                <span>{{weatherData.pre}}hPa</span>
              </div>
            </div> -->
						<div>
							<span>{{ dataList.temp }}</span>
							<span
								>{{
									dataList.minTemp == 9999
										? ""
										: dataList.minTemp
								}}℃~{{
									dataList.maxTemp == 9999
										? ""
										: dataList.maxTemp
								}}</span
							>
						</div>
						<div>
							<span>{{
								dataList.realTemp == 9999
									? ""
									: dataList.realTemp
							}}</span>
							<span>℃</span>
							<span>当前</span>
						</div>
					</div>
				</div>
				<div class="time">
					<div>
						<span>{{ dataList.nowWeek }}</span>
						<span style="margin-left: 10px">{{
							dataList.air
						}}</span>
					</div>
					<div>
						<span>{{ dataList.date }} {{ dataList.time }}</span>
					</div>
				</div>
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
import { homeApi } from "@/api";
@Component
export default class ModuleView extends Vue {
	dataList: any = {};
	weatherData: any = {};
	mounted() {
		this.getWeather();
		// this.getSiteWeather();
	}
	async getSiteWeather() {
		homeApi
			.getSiteWeather({ currentPage: 1, pageSize: 10 })
			.then((result: any) => {
				this.weatherData = result[0];
			});
	}
	async getWeather() {
		homeApi.getWeather().then((result: any) => {
			this.dataList = result.data.real || {};
			if (this.dataList.publish_time) {
				this.dataList.date = this.$utils.dateFormat(
					new Date(this.dataList.publish_time),
					"yyyy/MM/dd"
				);
				this.dataList.time = this.$utils.dateFormat(
					new Date(this.dataList.publish_time),
					"HH:mm"
				);
				let week =
					"星期" +
					"日一二三四五六".charAt(
						new Date(this.dataList.publish_time).getDay()
					);
				this.dataList.nowWeek = week;
				this.dataList.realTemp = this.dataList.weather.temperature; //实时温度
				this.dataList.temp = this.dataList.weather.info; //天气
				this.dataList.rain = this.dataList.weather.rain; //降雨量
				this.dataList.air = result.data.air.text; //空气质量
				if (result.data.tempchart && result.data.tempchart.length > 0) {
					result.data.tempchart.forEach((it: any) => {
						if (it.time == this.dataList.date) {
							this.dataList.maxTemp = it.max_temp; //最高温度
							this.dataList.minTemp = it.min_temp; //最低温度
						}
					});
				}
				this.dataList.src = require("@/assets/icon/" +
					this.dataList.weather.info +
					".png");
			}
		});
	}
}
</script>
<style lang="scss" scoped>
.weather-view {
	width: 100%;
	height: 100%;
	background-color: #5397ff;
	box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
	.blue-bg1 {
		background-color: #537dbe;
		box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
	}
	.weather {
		padding: 10px;
		height: 100%;
		font-size: 14px;
		color: #ffffff;
		background: url("../../../../assets/icon/weatherbg.png") no-repeat;
		background-size: cover;
		&-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			&:nth-of-type(2) {
				height: calc(100% - 22px);
			}
			.status {
				display: flex;
				// justify-content: space-around;
				margin-right: 6px;
				span {
					display: inline-block;
					margin-right: 5px;
				}
			}
		}
	}
}
</style>
