<template>
  <!--故障事件-->
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
            <suc-select v-model="stationParams.handleStatus" :options="statusData" :config="{ placeholder: '处理状态', clearable: true }" style="width: 160px"></suc-select>
          </div>
          <div class="top-item-sub">
            <suc-select v-model="stationParams.deviceType" :options="deviceData" :config="{ placeholder: '设备类型', clearable: true }" style="width: 160px"></suc-select>
          </div>
          <!-- <div class="top-item-sub">
            <suc-select v-model="stationParams.faultSource" :options="alarmStaData" :config="{ placeholder: '故障来源', clearable: true }" style="width: 160px"></suc-select>
          </div> -->
          <!-- <div class="top-item-sub">
            <suc-select v-model="stationParams.areaCode" :options="areaArry" :config="{ placeholder: '所在街道', clearable: false }" style="width: 160px"></suc-select>
          </div> -->
          <div class="top-item-sub">
            <search-component placeholderTxt="站点名称" @input="onSearch"> </search-component>
          </div>
        </div>
      </div>
      <div class="content">
        <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams" v-loading="loading" @get-page="getPage" @get-size="getSize"> </table-page>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { SucSelect, SucButton, SucInput, SucFormItem } from "@suc/ui";
import { SearchComponent, TablePage } from "@/components";
import { infoApi, publicApi } from "@/api";
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
  tableData: any[] = [];

  //状态数据
  statusData: any = [
    { value: 1, label: "未处理" },
    { value: 2, label: "已完成" },
  ];
  // 设备类型
  // deviceData: any = [
  //   { value: 1, label: "水泵" },
  //   { value: 2, label: "风机" },
  //   { value: 3, label: "格栅" },
  //   { value: 4, label: "闸门" },
  // ];
  deviceData: any = [];
  //故障来源
  alarmStaData: any = [
    { value: 1, label: "实时监测" },
    { value: 2, label: "异常上报" },
  ];
  model: boolean = false;
  daterangeData: any = "";
  //   查
  columns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "所在街道",
      key: "xzqy",
    },
    {
      title: "站点名称",
      key: "stationName",
    },

    // {
    //   title: "任务名称",
    //   key: "taskName",
    // },
    {
      title: "故障设备",
      key: "deviceType",
    },
    {
      title: "故障描述",
      key: "faultDesc",
    },
    // {
    //   title: "问题类别",
    //   key: "problemType",
    // },
    // {
    //   title: "故障来源",
    //   key: "faultSource",
    // },
    // {
    //   title: "上报人",
    //   key: "reportUser",
    // },
    // {
    //   title: "接收人",
    //   key: "receiveUser",
    // },
    // {
    //   title: "上报时间",
    //   key: "reportTimeStr",
    // },

    {
      title: "故障开始时间",
      key: "faultStartDate",
    },
    {
      title: "故障解决时间",
      key: "faultEndDate",
    },
    {
      title: "处理状态",
      key: "handleStatus",
    },
  ];

  pageParams: any = {
    total: 0,
    current: 1,
    pageSize: 10,
  };

  //  获取列表参数
  stationParams: any = {
    beginDate: "", //开始时间
    endDate: "", //结束时间
    handleStatus: "", //处理状态
    deviceType: "", //设备类型
    faultSource: "", //故障来源
    pageNumber: "",
    pageSize: "",
  };
  mounted() {
    this.stationParams.areaCode = localStorage.getItem("areaCode");
    this.getArea();
    this.onpage(); //获取页面信息
    this.getDevice(); //获取设备类型
  }

  async getDevice() {
    let data = await infoApi.getDevice();
    if (data.result == true) {
      this.deviceData = data.data.map((item: any) => {
        return {
          value: item.code,
          label: item.level,
        };
      });
    } else {
      this.deviceData = [];
    }
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
    let url = "wjServer/wj/fault/infoList";
    let data = await infoApi.onpage(this.stationParams, url);
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
    let data = await infoApi.onpage(areaParams, url);
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
</style>
