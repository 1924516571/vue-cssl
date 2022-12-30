<template>
    <div class="problem-detail">
        <div class="problem-title bg-shadow">
            <div class="title-item">
                <div @click.stop.prevent="$emit('goBack')">
                    <i class="icon iconfont icon-fanhui"></i>
                    <span>返回</span>
                </div>
                <span>|</span>
                <span>问题详情</span>
            </div>
        </div>
        <div class="problem-content bg-shadow">
            <div class="content-left">
                <detail-info></detail-info>
            </div>
            <div class="content-right">
                <deal-record></deal-record>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {DetailInfo, DealRecord} from "./components";

@Component({
    components: {
        DetailInfo,
        DealRecord
    }
})
export default class Detail extends Vue {

}
</script>

<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
.problem-detail {
    width: 100%;
    height: 100%;
    pointer-events: auto;
    .problem-title {
        height: 60px;
        background-color: #ffffff;
        padding: 20px 15px;
        .title-item {
            display: flex;
            align-items: center;
            >div {
                font-size: 14px;
                color: #3983f3;
                letter-spacing: 1px;
                cursor: pointer;
                .icon {
                    margin-right: 6px;
                }
            }
            >span {
                &:nth-of-type(1) {
                    color: #dde4eb;
                    margin: 0 10px;
                    font-size: 14px;
                }
                &:nth-of-type(2) {
                    font-size: 16px;
                    color: #333333;
                    letter-spacing: 1px;
                }
            }
        }
    }

    .problem-content {
        width: 100%;
        height: calc(100% - 70px);
        background-color: #ffffff;
        margin-top: 10px;
        padding: 24px 10px;
        display: flex;
        justify-content: space-between;
        .content-left {
            width: calc(70% - 1px);
            height: 100%;
        }
        .content-right {
            height: 100%;
            width: 30%;
            border-left: 1px solid #dde4eb;
        }
    }
}
</style>