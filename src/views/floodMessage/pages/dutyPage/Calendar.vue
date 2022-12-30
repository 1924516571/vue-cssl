<template>
  <!-- 日历组件 -->
  <div class="calendar-view bg-shadow scroll">
    <div class="nav-date">
      <span class="btn" @click="getPre">&lt;</span>
      <span>{{ headerDate }}</span>
      <span class="btn" @click="getNext">&gt;</span>
    </div>
    <div class="nav-week">
      <div class="week-item" v-for="j in 7" :key="j">
        <span>
          {{ week[j - 1] }}
        </span>
      </div>
    </div>
    <div class="content">
      <!-- <div class="content-row" v-for="i in 6" :key="i"> -->
      <div :class="{ 'row-item': true, notCurMonth: item.time.getMonth() !== curDate.getMonth() }" v-for="(item, j) in dateArr" :key="j">
        <!-- <div v-if="j < 7">
            <span>
              {{ dateArr[(i - 1) * 7 + j].time.getDate() }}
            </span>
          </div> -->
        <div class="row-item-sub">
          <div class="day-head">
            <span style="font-size: 20px">
              {{ item.time.getDate() }}
            </span>
          </div>
          <div class="day-info" v-if="item.data">
            <div class="day-content">
              <div class="day-content-item">
                <div>
                  <span>值班领导：</span>
                  <span>{{ item.data.dutyleader }}</span>
                </div>
                <!-- <div>
                  <span>技术员：</span>
                  <span>{{ item.data.skiller }}</span>
                </div> -->
                <div>
                  <span>白班人员：</span>
                  <span>{{ item.data.dayshift }}</span>
                </div>
                <div>
                  <span>晚班人员：</span>
                  <span>{{ item.data.nightshift }}</span>
                </div>
                <div>
                  <span>值班电话：</span>
                  <span>{{ item.data.tel }}</span>
                </div>
              </div>
            </div>
            <div class="day-foot" @click="onUpdate(item)">
              <!-- <span class="icon iconfont icon-hulve"></span> -->
              <span>编辑</span>
            </div>
          </div>
          <div class="day-info blackItem" v-else>
            <div class="day-content">
              <div class="day-foot" @click="onAdd(item)">
                <!-- <span class="icon iconfont icon-hulve"></span> -->
                <span>新增</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>
    <duty-modal :title="title" :model="model" :formParams="formParams" @on-submit="setOk" @toggle="toggle"></duty-modal>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { publicApi } from "@/api";
import { zbModal, DutyModal } from "../model";
@Component({
  components: {
    zbModal,
    DutyModal,
  },
})
export default class Calendar extends Vue {
  week: any[] = ["日", "一", "二", "三", "四", "五", "六"];
  dateArr: any[] = [];
  now: any = new Date();
  headerDate: string = ""; //头部日期
  time: any = {
    year: "",
    month: "",
  };

  calendarData: any[] = [];
  curDate: any;

  zeroPad(num: number, len: number, radix: number) {
    let str = num.toString(radix || 10);
    while (str.length < len) {
      str = "0" + str;
    }
    return str;
  }
  getYearMonthDay(date: any) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    return { year, month, day };
  }
  getDate(year: any, month: any, day: any) {
    return new Date(year, month, day);
  }
  async mounted() {
    this.init();
    await this.getDutyList();
    this.getDateArr(this.getDate(this.time.year, this.time.month, 1));
  }
  init() {
    let { year, month } = this.getYearMonthDay(this.now);
    this.headerDate = year + "年" + (month + 1) + "月";
    this.time = {
      year: year,
      month: month,
    };
    this.curDate = this.getDate(year, month, 1);
  }
  async getPre() {
    let data = this.getDate(this.time.year, this.time.month, 1);
    this.time.month = data.getMonth();
    this.time.month--;
    let { year, month, day } = this.getYearMonthDay(this.getDate(this.time.year, this.time.month, 1));
    this.time = {
      year: year,
      month: month,
    };

    this.headerDate = this.time.year + "年" + (this.time.month + 1) + "月";
    this.curDate = this.getDate(year, month, 1);
    await this.getDutyList();
    this.getDateArr(this.getDate(this.time.year, this.time.month, 1));
  }
  async getNext() {
    let data = this.getDate(this.time.year, this.time.month, 1);
    this.time.month = data.getMonth();
    this.time.month++;
    let { year, month, day } = this.getYearMonthDay(this.getDate(this.time.year, this.time.month, 1));
    this.time = {
      year: year,
      month: month,
    };

    this.headerDate = this.time.year + "年" + (this.time.month + 1) + "月";
    this.curDate = this.getDate(year, month, 1);
    await this.getDutyList();
    this.getDateArr(this.getDate(this.time.year, this.time.month, 1));
  }
  getDateArr(date: any) {
    let { year, month } = this.getYearMonthDay(date);
    //获取当前月的第一天
    let currentFirstDay: any = this.getDate(year, month, 1);
    //获取当前是周几 把天数往前移动几天
    let week = currentFirstDay.getDay();
    //当前开始的天数
    let startDay = currentFirstDay - week * 60 * 60 * 1000 * 24;

    //当前月的最后一天

    //获取到下一个月，++currentMonth表示本月+1，一元运算
    let nextMonth = month < 11 ? ++month : 0;
    //获取到下个月的第一天
    let nextMonthFirstDay: any = month < 11 ? new Date(date.getFullYear(), nextMonth, 1) : new Date(date.getFullYear() + 1, nextMonth, 1);
    //一天时间的毫秒数
    let oneDay = 1000 * 60 * 60 * 24;
    //获取当前月最后一天
    //nextMonthFirstDay-oneDay表示下个月的第一天减一天时间的毫秒数就是本月的最后一天
    let last = nextMonthFirstDay - oneDay;
    let lastDay = new Date(last);
    let monthTotalDay = lastDay.getDate();
    //判断当前月需要多少行日期
    let totalDay = 35;
    if (monthTotalDay === 31 && week > 4) {
      totalDay = 42;
    }
    if (monthTotalDay === 30 && week > 5) {
      totalDay = 42;
    }

    //循环35/42天
    this.dateArr = [];
    let curCalendar = 0;
    for (let i = 0; i < totalDay; i++) {
      let item = {
        time: new Date(startDay + i * 60 * 60 * 1000 * 24),
        data: "",
      };
      let { year, month, day } = this.getYearMonthDay(item.time);
      day = this.zeroPad(day, 2, 10);
      month = this.zeroPad(month + 1, 2, 10);
      let time1 = year + "-" + month + "-" + day;
      for (let j = curCalendar; j < this.calendarData.length; j++) {
        if (this.calendarData[j].time == time1) {
          item.data = this.calendarData[j].data;
        }
      }
      this.dateArr.push(item);
    }
  }

  //获取值班人员列表
  async getDutyList() {
    this.calendarData = [];
    let url = "wjServer/fangxunjc/ondutyer/calInfoList";
    let params = {
      date: this.$utils.dateFormat(this.curDate, "yyyy-MM"),
    };
    let data = await publicApi.getWithParam(url, params);
    for (let i = 0; i < data.data.length; i++) {
      const element = data.data[i];
      for (let key in element) {
        let item = {
          time: key,
          data: element[key],
        };
        this.calendarData.push(item);
      }
    }
  }

  //新增或删除
  updateFlag: boolean = false;
  title: string = "新增";
  model: boolean = false;
  formParams: any = {
    dutydate: "",
    dutyleader: "",
    skiller: "",
    dayshift: "",
    nightshift: "",
    type: "",
    tel: "",
    task: "",
  };

  async setOk() {
    this.formParams.dutydate = this.$utils.dateFormat(new Date(this.formParams.dutydate), "yyyy-MM-dd");
    if (this.updateFlag) {
      this.setEdit();
    } else {
      this.setCreate();
    }
    await this.getDutyList();
    this.getDateArr(this.getDate(this.time.year, this.time.month, 1));
  }
  toggle(val: boolean) {
    this.model = val;
  }

  //  新增
  async setCreate() {
    let url = "wjServer/fangxunjc/ondutyer/addInfo";
    this.formParams.dutydate = this.$utils.dateFormat(new Date(this.formParams.dutydate), "yyyy-MM-dd");
    publicApi.postWithParamJson(url, this.formParams).then((data: any) => {
      if (data.result == true) {
        this.$SucMessage.info("新增成功");
        this.model = false;
        this.getDateArr(this.getDate(this.time.year, this.time.month, 1));
      } else {
        this.$SucMessage.error("新增失败");
        this.model = false;
      }
    });
    this.getDateArr(this.getDate(this.time.year, this.time.month, 1));
    await this.getDutyList();
  }
  // 更新
  async setEdit() {
    let url = "wjServer/fangxunjc/ondutyer/editInfo";
    this.formParams.dutydate = this.$utils.dateFormat(new Date(this.formParams.dutydate), "yyyy-MM-dd");
    publicApi.putWithParamJson(url, this.formParams).then((data: any) => {
      if (data.result == true) {
        this.$SucMessage.info("更新成功");
        this.model = false;
        this.getDateArr(this.getDate(this.time.year, this.time.month, 1));
      } else {
        this.model = false;
        this.$SucMessage.error("更新失败");
      }
    });
    this.getDateArr(this.getDate(this.time.year, this.time.month, 1));
    await this.getDutyList();
  }

  //新增
  onAdd(item: any) {
    this.formParams = {};
    let date = this.$utils.dateFormat(item.time, "yyyy-MM-dd");
    this.formParams.dutydate = date;
    this.title = "新增";
    this.updateFlag = false;
    this.model = true;
  }

  //编辑
  async onUpdate(item: any) {
    this.title = "编辑";
    this.updateFlag = true;
    this.formParams = {};
    this.model = true;
    this.editInfo(item.data.id);
  }

  // 详情
  async editInfo(params: any) {
    let url = "wjServer/fangxunjc/ondutyer/getInfoById";
    let detailParams = {
      id: params,
    };
    let data = await publicApi.getWithParam(url, detailParams);
    this.formParams = {
      dutydate: data.data.dutydate,
      skiller: data.data.skiller,
      dutyleader: data.data.dutyleader,
      dayshift: data.data.dayshift,
      id: data.data.id,
      nightshift: data.data.nightshift,
      type: data.data.type,
      tel: data.data.tel,
      task: data.data.task,
    };
  }
}
</script>
<style lang="scss" scoped>
.calendar-view {
  padding: 10px;
  width: 100%;
  height: 100%;
  color: #333;
  overflow: auto;
  .flex-class {
    display: flex;
    align-items: center;
  }
  .nav-date {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-size: 24px;
    letter-spacing: 2px;
    .btn {
      display: inline-block;
      // width: 30px;
      cursor: pointer;
    }
  }
  .nav-week {
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    border-style: solid;
    border-width: 1px 0 1px 1px;
    border-color: #dde4eb;
    .week-item {
      width: 100%;
      padding: 8px 0;
      text-align: center;
      border-right: 1px solid #dde4eb;
    }
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    // height: calc(100% - 80px);
    border-left: 1px solid #dde4eb;

    .row-item {
      width: calc(100% / 7);
      height: 140px;
      // height: 16.6%;
      border-right: 1px solid #dde4eb;
      border-bottom: 1px solid #dde4eb;
      cursor: pointer;
      &-sub {
        padding: 0 8px;
        position: relative;
        width: 100%;
        height: 100%;
        font-size: 14px;
        color: #333;
        .icon {
          display: inline-block;
          padding-right: 6px;
        }
        .day-info {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          &:hover {
            background-color: #eff5ff;
            .day-foot {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 32px;
              color: #fff;
              background-color: rgba($color: #333, $alpha: 0.6);
            }
          }
          .day-head {
            display: flex;
            justify-content: space-between;
            padding: 8px 8px 0 0;
            color: #333;
          }
          .day-content {
            margin-top: 2px;
            &-item {
              justify-content: center;
              color: #888888;
              > div {
                padding-left: 40px;
              }
            }
          }
          .day-foot {
            display: none;
          }
        }
        .blackItem {
          height: 140px;
          .day-foot {
            position: absolute;
            bottom: 0;
          }
        }
        .day-info-ignore {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          color: #cecece;
          .day-head {
            display: flex;
            justify-content: space-between;
            padding: 8px 8px 0 0;
          }
          .day-content {
            display: flex;
            justify-content: space-between;
            margin: 8px 0;
            &-item {
              padding: 5px 8px;
              &:first-of-type {
                justify-content: center;
                width: 48%;

                border-right: 1px solid #dde4eb;
              }
              &:nth-of-type(2) {
                width: 50%;
              }
            }
          }
          .day-foot {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 32px;
            color: #888888;
            background-color: #eff5ff;
          }
        }
      }
    }
    .notCurMonth {
      background: #ececec;
    }
  }
}
</style>
