<template>
    <panel-view heading="管道破损">
        <div class="status" slot="left">{{detailInfo.status}}</div>
        <div class="content scroll">
            <div class="content-item">
                <div>问题编号：</div>
                <div>{{detailInfo.rwbh}}</div>
            </div>
            <div class="content-item">
                <div>问题类型：</div>
                <div>{{detailInfo.rwlx}}</div>
            </div>
            <div class="content-item">
                <div>点位信息：</div>
                <div>{{detailInfo && detailInfo.jd && detailInfo.wd ? detailInfo.jd+','+detailInfo.wd:''}}</div>
            </div>
            <div class="content-item">
                <div>地址：</div>
                <div></div>
            </div>
            <div class="content-item">
                <div>发布人：</div>
                <div>{{detailInfo.fbr}}</div>
            </div>
            <div class="content-item">
                <div>所属片区：</div>
                <div>{{detailInfo && detailInfo.sspq ? detailInfo.sspq+"片区":''}}</div>
            </div>
            <div class="content-item">
                <div>发布时间：</div>
                <div>{{detailInfo.time}}</div>
            </div>
            <div class="content-item-ms">
                <div>问题描述：</div>
                <div>{{detailInfo.rwms}}</div>
            </div>
            <div class="content-item-picture">
                <div>图片：</div>
                <div>
                    <viewer :images="images" style="display: flex; flex-wrap: wrap">
                        <div
                            class="company-item"
                            v-for="(item, index) in images"
                            :key="'qy' + index"
                        >
                            <img :src="item.src" />
                        </div>
                    </viewer>
                </div>
            </div>
        </div>
    </panel-view>
</template>

<script lang="ts">
import {Vue, Component, Watch} from "vue-property-decorator";
import {PanelView} from "@/components";
import {taskApi} from "@/api";
import {onImageLoad} from "@/api/public";

@Component({
    components: {
        PanelView
    }
})
export default class DetailInfo extends Vue {
    id: string = "";
    detailInfo: any = {};
    images: any[] = [];

    @Watch("$store.state.plan.problemRow", {deep: true})
    problemChange(val: any) {
        this.id = val.id;
        this.getProblemDetail();
    }

    // 获取问题详情
    getProblemDetail() {
        this.images = [];
        taskApi.getTaskDetail(this.id).then(async (data: any) => {
            console.log(data.zpids)
            var imgData = "";
            for (let i = 0; i < data.zpids.length; i++) {
                imgData = await this.getImg(data.zpids[i]);
                this.images.push({ src: imgData });
            }
            this.detailInfo = data ? data : {};
        })
    }

    async getImg(id: string) {
        let url = "/jnsw/task/downloadTaskPic/" + `${id}`;
        let src = await onImageLoad(url);
        return src;
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
.status {
    width: 60px;
    height: 28px;
    background-color: #32bb53;
    border-radius: 2px;
    color: #ffffff;
    font-size: 14px;
    text-align: center;
    line-height: 28px;
    margin-left: 20px;
}
.content {
    width: 100%;
    height: calc(100% - 30px);
    padding: 0 20px;
    padding-bottom: 20px;
    overflow: hidden;
    &-item {
        display: flex;
        align-items: center;
        padding-right: 40px;
        margin-top: 12px;
        >div {
            &:first-child {
                width: 83px;
                font-size: 16px;
                color: #666666;
            }
            &:nth-child(2) {
                width: calc(100% - 83px);
                height: 40px;
                background-color: #f8f8f9;
                border-radius: 4px;
                font-size: 16px;
                color: #333333;
                line-height: 40px;
                padding-left: 12px;
            }
        }
    }
    &-item-ms {
        display: flex;
        margin-top: 12px;
        padding-right: 40px;
        >div {
            &:first-child {
                width: 83px;
                font-size: 16px;
                color: #666666;
                line-height: 40px;
            }
            &:nth-child(2) {
                width: calc(100% - 83px);
                padding: 12px;
                line-height: 30px;
                background-color: #f8f8f9;
                border-radius: 4px;
                font-size: 16px;
                color: #333333;
            }
        }
    }
    &-item-picture {
        display: flex;
        margin-top: 12px;
        padding-right: 40px;
        >div {
            &:first-child {
                width: 83px;
                font-size: 16px;
                color: #666666;
                line-height: 40px;
            }
            &:nth-child(2) {
                width: calc(100% - 83px);
                padding: 12px;
                padding-left: 0;
                img {
                    width: 120px;
                    height: 120px;
                    border-radius: 4px;
                    margin-right: 0 12px 12px 0;
                }
            }
        }
    }
}
</style>