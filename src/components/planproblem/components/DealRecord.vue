<template>
    <div class="deal-record">
        <div class="head">处理记录</div>
        <div class="content scroll">
            <el-timeline>
                <el-timeline-item timestamp="问题上报" placement="top">
                    <div class="content-head">
                        <span>班组负责人：张三</span>
                        <span>2021-05-10 12:00</span>
                    </div>
                    <div class="status">已完结</div>
                    <el-card>
                        <h4>管道破损</h4>
                        <p>江宁区第一片区XX管道存在管道破损问题，导致水渗漏。已通过封堵、
                            维修、换新解决该问题。</p>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="总包公司巡查" placement="top">
                    <div class="content-head">
                        <span>总包公司</span>
                        <span>2021-05-10 12:00</span>
                    </div>
                    <div class="status">已巡查</div>
                    <el-card>
                        <h4>管道破损</h4>
                        <p>巡查完毕，渗漏问题已解决。管道换新。</p>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="监理单位考核" placement="top">
                    <div class="content-head">
                        <span>监理单位</span>
                        <span>2021-05-10 12:00</span>
                    </div>
                    <div class="status">已完结</div>
                    <el-card>
                        <h4>管道破损</h4>
                        <p>已检查，处置符合标准。</p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {Timeline, TimelineItem, Card} from "element-ui";

@Component({
    components: {
        ElTimeline: Timeline,
        ElTimelineItem: TimelineItem,
        ElCard: Card
    }
})
export default class DealRecord extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
$deep: "::v-deep";
.deal-record {
    width: 100%;
    height: 100%;
    padding: 0 60px;
    .head {
        font-size: 18px;
        color: #333333;
        line-height: 23px;
    }
    .content {
        width: 100%;
        height: calc(100% - 23px);
        overflow: hidden;
        padding: 20px 0;
        #{$deep}.el-timeline-item {
            position: relative;
            .content-head {
                font-size: 14px;
                margin: 12px 0;
                >span {
                    &:nth-child(1) {
                        color: #3a7bef;
                        margin-right: 24px;
                    }
                    &:nth-child(2) {
                        color: #666666;
                    }
                }
            }
            .status {
                position: absolute;
                top: 0;
                right: 0;
                width: 60px;
                height: 28px;
                background-color: #32bb53;
                border-radius: 2px;
                font-size: 14px;
                color: #ffffff;
                text-align: center;
                line-height: 28px;
            }
            &__timestamp {
                font-size: 16px;
                color: #333333;
            }
        }
    }
}
</style>