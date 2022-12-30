<template>
	<suc-modal :config="config" :value="model" @on-visible-change="toggle">
		<div class="content">
			<div class="content-item">
				<div class="title">
					<span v-text="row.title">标题</span>
				</div>
				<div class="time">
					<span v-text="row.time">日期</span>
				</div>
			</div>
			<div class="img" v-for="(item, index) in row.pics" :key="index">
				<img
					style="
						max-width: 100%;
						max-height: 100%;
						width: 100%;
						height: 100%;
					"
					:src="item.src"
				/>
			</div>
			<div class="editor">
				<!-- <quill-editor style="height:100%;" :content="row.content" :options="editorOption" @change="onEditorChange($event)"></quill-editor> -->
				<p v-html="row.content1" style="white-space: pre-wrap"></p>
			</div>
			<div class="content-item">
				<div
					class="file-item"
					v-for="(item, index) in row.FILEIDS"
					:key="index"
				>
					<a @click="download(item.id, item.gs)">
						<img
							:src="item.icon"
							alt="icon"
							style="height: 20px; width: 20px"
						/>
						<span v-text="item.name">附件名称</span>
					</a>
				</div>
			</div>
		</div>
	</suc-modal>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { SucModal } from "@suc/ui";
import { ModalConfig } from "@suc/ui/interfaces";
import { ondownload } from "@/api/public";
@Component({
	components: {
		SucModal,
	},
})
export default class NewsDetail extends Vue {
	@Prop() model!: boolean;
	@Prop() row: any;

	@Emit()
	toggle() {}
	//   model: boolean = false
	config: ModalConfig = {
		transfer: false,
		title: "新闻详情",
		width: 960,
		"footer-hide": true,
	};
	content: any = "<h2>I am Example</h2>";
	editorOption: any = {};
	onEditorChange({ quill, html, text }: any) {
		console.log("editorchange", quill, html, text);
	}
	async download(id: string, gs: string) {
		let url = `jnsw/news/download/${id}`;
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
}
</script>
<style lang="scss" scoped>
.content {
	height: 522px;
	width: 100%;
	overflow: auto;
	&-item {
		&:first-of-type {
			display: flex;
			justify-content: space-between;
		}
		.title {
			font-size: 16px;
			color: #333;
		}

		.time {
			color: #999;
		}
	}
	.img {
		padding: 8px;
	}
	.editor {
		padding: 8px;
		// height: 400px;
		font-size: 14px;
		color: #666;
	}
}
</style>
