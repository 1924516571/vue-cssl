<template>
	<!-- 任务照片 -->
	<div class="company-view">
    <div class="noData" v-show="show2">暂无数据</div>
		<div class="companys flex-class">
			<viewer :images="qyList" style="display: flex; flex-wrap: wrap">
				<div
					class="company-item"
					v-for="(item, index) in qyList"
					:key="'qy' + index"
				>
					<img :src="item.src" alt="企业" />
				</div>
			</viewer>
		</div>
		<!-- <div>
			<suc-page
				:total="pageParams.total"
				:current="pageParams.current"
				:page-size="pageParams.pageSize"
				size="small"
				show-sizer
				show-elevator
				@on-change="getPage"
				@on-page-size-change="getSize"
			/>
		</div> -->
		<div v-show="btnFlag" class="switch-btn left-btn" @click="scrollIt(1)">
			<span>＜</span>
		</div>
		<div v-show="btnFlag" class="switch-btn right-btn" @click="scrollIt(0)">
			<span>＞</span>
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
import { State, Mutation } from "vuex-class";
import { SucPage } from "@suc/ui";
// import { SearchComponent } from '../../../public'
import { taskApi } from "@/api";
import { onImageLoad } from "@/api/public";

@Component({
	components: {
		SucPage,
		// SearchComponent
	},
})
export default class PeripheralCompanies extends Vue {
	@State analysis: any;
	qyList: any[] = [
		{
			src: "",
			// name: '南京景宁区发电厂',
			// license: '097874556',
			// address: 'XXX路501号'
		},
	];
	btnFlag: boolean = false;
	pageParams: any = {
		total: 0,
		pageSize: 10,
		current: 1,
	};
  show2: boolean = true;
	mounted() {
		this.getTaskDetail();
	}
	async getTaskDetail() {
		this.qyList = [];
		let imgData = "";
		let id = this.analysis.taskItem.rwId;
		taskApi.getTaskDetail(id).then(async (data: any) => {
			if (data.zpids) {
				for (let i = 0; i < data.zpids.length; i++) {
					imgData = await this.getImg(data.zpids[i]);
					this.qyList.push({ src: imgData });
				}
				if (this.qyList.length) {
				  this.show2 = false;
        } else {
				  this.show2 = true;
        }
			}
		});
	}

	async getImg(id: string) {
		let url = "/jnsw/task/downloadTaskPic/" + `${id}`;
		let src = await onImageLoad(url);
		return src;
	}
	// getTaskImg(id:string){
	//   let src =
	//     this.$http.defaults.baseURL +
	//     '/jnsw/task/downloadTaskPic/' +
	//     `${id}`
	//   return src
	// }
	getPage(page: number) {
		this.pageParams.current = page;
	}
	getSize(size: number) {
		this.pageParams.current = 1;
		this.pageParams.pageSize = size;
	}
	scrollIt(i: number) {
		if (i == 0) {
			document.getElementsByClassName("companys")[0].scrollLeft += 140;
		}
		if (i == 1) {
			document.getElementsByClassName("companys")[0].scrollLeft -= 140;
		}
	}
}
</script>
<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
.company-view {
	padding: 0 10px;
	position: relative;
	width: 100%;
	height: 260px;
	overflow-y: auto;
  .noData {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
	.flex-class {
		display: flex;
		align-items: center;
	}
	.nav {
		> div {
			width: 30%;
		}
	}
	.companys {
		padding: 10px 0;
		overflow: hidden;
		// height: calc(100% - 80px);
		.company-item {
			flex-shrink: 0;
			width: 240px;
			height: 220px;
			margin-right: 10px;
			border: 1px solid $border-color;
			overflow: hidden;
			img {
				width: 100%;
				// height: 130px;
			}
			// &-sub {
			//   padding: 5px 10px;
			//   font-size: $font-size-base;
			//   color: $help-color;

			//   .heading {
			//     font-size: $font-size-large;
			//     color: $heading-color;
			//   }
			// }
		}
	}
	.switch-btn {
		display: flex;
		align-items: center;
		width: 28px;
		height: 38px;
		background-color: rgba($color: #000000, $alpha: 0.5);
		color: #ffffff;
		font-size: 20px;
		border-radius: 5px;
		cursor: pointer;
	}
	.left-btn {
		position: absolute;
		top: 110px;
		left: 0;
	}
	.right-btn {
		position: absolute;
		top: 110px;
		right: 0;
	}
}
</style>
