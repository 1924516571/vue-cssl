<template>
	<!-- 资料搜索 -->
	<div class="source-search">
		<div class="title">
			<span>资料搜索</span>
		</div>
		<div class="content">
			<div>
				<search-component @input="search"></search-component>
			</div>
			<div class="content-file">
				<div
					class="file-item"
					v-for="(item, index) in list"
					:key="index"
				>
					<div>
						<img :src="item.icon" alt="icon" />
					</div>
					<div>
						<span>{{ item.name }}</span>
					</div>
					<div class="down-del">
						<div v-for="(button, index) in delbtns" :key="index">
							<suc-button
								:type="button.type"
								:config="button.iviewProps"
								:debounce="800"
								@on-click="onbtn(item, index)"
								>{{ button.label }}</suc-button
							>
						</div>
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
import { SearchComponent } from "@/components";
import { dataBaseApi } from "@/api";
import fileIcon from "@/constants/fileIcon";
import { SucButton } from "@suc/ui";
@Component({
	components: {
		SearchComponent,
		SucButton,
	},
})
export default class ModuleView extends Vue {
	list: any[] = [];

	fileIcon: any = fileIcon;

	// 下载删除文件
	delbtns: any[] = [
		{
			label: "下载",
			type: "primary",
			iviewProps: {
				ghost: true,
			},
		},
	];

	onbtn(item: any, index: number) {
		if (index == 0) {
			this.downloadFa(item.id, item.gs);
		}
	}

	downloadFa(id: string, gs: string) {
		const url = "jnsw/database/download/" + id;
		// let data = await transferFaApi.downloadFa(id,url)
		this.$http
			.get(url, { responseType: "blob" })
			.then((res: any) => {
				if (res.status == 200 && res.data) {
					let disposition = res.headers["content-disposition"];
					let fileName = decodeURI(
						disposition.substring(
							disposition.indexOf("filename=") + 9,
							disposition.length
						)
					);
					let blob = new Blob([res.data], {
						type: "application/octet-stream",
					});
					let link = URL.createObjectURL(blob);
					let alink = document.createElement("a");
					alink.href = link;
					alink.download = fileName + "." + gs;
					alink.click();
					alink.remove();
				}
			})
			.catch((err: any) => {
				this.$SucMessage.error(err.data.message);
			});
	}
	async getFaList(param: any) {
		this.list = [];
		dataBaseApi.getFaList(param).then((res: any) => {
			this.list = res.data
				? res.data.map((e: any) => {
						let item = {
							id: e["ID"],
							icon:
								this.fileIcon[e["GS"]] || this.fileIcon.default,
							name: e["MC"] + "." + e["GS"],
							gs: e["GS"],
						};
						return item;
				  })
				: [];
		});
	}
	async search(mc: string) {
		await this.getFaList({ mc: mc });
	}
}
</script>
<style lang="scss" scoped>
.source-search {
	width: 100%;
	height: 100%;
	.title {
		padding: 10px 10px 8px;
		font-size: 16px;
		color: #333;
	}
	.content {
		padding: 10px;
		border-top: 1px solid #dde4ed;
		.content-file {
			display: flex;
			flex-wrap: wrap;
			.file-item {
				padding: 10px;
				position: relative;
				// width: 10%;
				.down-del {
					display: none;
				}
				&:hover {
					.down-del {
						display: block;
						position: absolute;
						top: 15px;
						left: 15px;
						width: 100%;
						height: 100%;
						background-color: rgba(255, 255, 255, 0.85);
						> div {
							margin-bottom: 6px;
						}
					}
				}
			}
		}
	}
}
</style>