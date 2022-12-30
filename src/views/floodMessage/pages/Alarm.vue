<template>
  <!--报警事件-->
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <div class="top-item-sub">
            <el-date-picker
              v-model="daterangeData"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
              size="small"
              @change="dateChange"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </div>
          <div class="top-item-sub">
            <suc-select v-model="stationParams.warningType" :options="alarmLevData" :config="{ placeholder: '报警等级', clearable: true }" style="width: 160px"></suc-select>
          </div>
          <div class="top-item-sub">
            <suc-select v-model="stationParams.warningStatus" :options="alarmStaData" :config="{ placeholder: '报警状态', clearable: false }" style="width: 160px"></suc-select>
          </div>
          <!-- <div class="top-item-sub">
            <suc-select v-model="stationParams.areaCode" :options="areaArry" :config="{ placeholder: '所在街道', clearable: false }" style="width: 160px"></suc-select>
          </div> -->
          <div class="top-item-sub">
            <search-component placeholderTxt="站点名称" @input="onSearch"> </search-component>
          </div>
        </div>
      </div>
      <div class="content">
        <table-page :columns="columns" :tableData="tableData" size="medium" :pageParams="pageParams" v-loading="loading" @get-page="getPage" @get-size="getSize"> </table-page>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { SucSelect, SucButton, SucInput, SucFormItem } from "@suc/ui";
import { SearchComponent, TablePage } from "@/components";
import { publicApi } from "@/api";
import { values } from "lodash";
@Component({
  components: {
    SucSelect,
    SucButton,
    SucInput,
    SucFormItem,
    SearchComponent,
    TablePage,
  },
})
export default class Enterprise extends Vue {
  loading: boolean = true;

  tableData: any = [];

  //报警等级数据
  alarmLevData: any = [
    { value: 1, label: "报警" },
    { value: 2, label: "警戒" },
  ];
  // 报警状态
  alarmStaData: any = [
    { value: 1, label: "正在报警" },
    { value: 2, label: "历史报警" },
  ];
  // 区域数据
  areaData: any = [];
  model: boolean = false;
  daterangeData: any = "";
  //   查
  columns: any[] = [
    {
      type: "index",
      title: "序号",
      width: 80,
    },
    {
      title: "所在街道",
      key: "xzqy",
    },
    {
      title: "站点名称",
      key: "stationName",
    },

    {
      title: "报警等级",
      key: "warningType",
    },
    {
      title: "报警状态",
      key: "warningStatus",
    },
    {
      title: "报警内容",
      key: "warningContent",
    },
    {
      title: "报警开始时间",
      key: "warningStartTime",
    },
    {
      title: "报警结束时间",
      key: "warningEndTime",
    },
  ];

  pageParams: any = {
    total: 0,
    current: 1,
    pageSize: 10,
  };

  //  获取列表参数
  stationParams: any = {
    beginDate: "",
    endDate: "",
    warningType: "",
    warningStatus: "",
    stationName: "",
    pageNumber: "",
    pageSize: "",
    areaCode: "",
  };
  mounted() {
    // this.stationParams.areaCode = localStorage.getItem("areaCode");
    // this.getArea();
    this.onpage(); //获取页面信息
  }

  dateChange(val: any) {
    if (val) {
      this.stationParams.beginDate = val[0];
      this.stationParams.endDate = val[1];
    } else {
      this.stationParams.beginDate = "";
      this.stationParams.endDate = "";
    }
  }

  // 列表
  async onpage() {
    this.stationParams.pageNumber = this.pageParams.current;
    this.stationParams.pageSize = this.pageParams.pageSize;
    let url = "wjServer/wj/warning/infoList";
    let data = await publicApi.getWithParam(url,this.stationParams);
    this.pageParams.total = parseInt(data.data.total);
    this.tableData = data.data.rows;

    this.tableData.map((item: any) => {
      if (item.warningStatus == "1") {
        item.warningStatus = "正在报警";
      } else {
        item.warningStatus = "历史报警";
      }
    });
    this.loading = false;
  }

  areaArry: any = [];
  // 区域方法
  async getArea() {
    const url = "wjServer/wj/fault/getAreaListByUserArea";
    const areaParams = {
      areaCode: localStorage.getItem("areaCode"),
    };
    let data = await publicApi.getWithParam(url, areaParams);
    const areaObj = {
      myid: localStorage.getItem("areaCode"),
      fullName: "全部",
    };
    const newArray = data.data;
    newArray.unshift(areaObj);
    this.areaArry = newArray.map((item: any) => {
      return {
        value: item.myid,
        label: item.fullName,
      };
    });
    this.stationParams.areaCode = this.areaArry[0].value;
  }
  getPage(page: any) {
    this.loading = true;
    this.pageParams.current = page;
    this.onpage();
  }
  getSize(size: any) {
    this.loading = true;
    this.pageParams.current = 1;
    this.pageParams.pageSize = size;
    this.onpage();
  }
  onSearch(val: string) {
    this.loading = true;
    this.pageParams.current = 1;
    this.stationParams.stationName = val;
    this.onpage();
  }
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
.info {
  width: 100%;
  height: 100%;
  padding: 10px;
  position: relative;
  &-view {
    height: 100%;
    .top {
      padding: 15px;
      display: flex;
      justify-content: space-between;
      &-item {
        display: flex;
        &-sub {
          margin-right: 10px;
        }
      }
    }
    .content {
      height: calc(100% - 65px);
      border-top: 1px solid #dde4eb;
      .link-text {
        color: #5397ff;
        cursor: pointer;
      }
      .btn {
        color: #5397ff;
        cursor: pointer;
        span {
          display: inline-block;
          margin-right: 10px;
          &:nth-of-type(2) {
            color: #ff5a47;
          }
        }
      }
    }
  }
  .delete-view {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }
}
#{$deep}.el-date-editor .el-range-input {
  width: 50%;
}
#{$deep}.table-view {
  .el-table {
    font-size: 16px;
  }
}
</style>
