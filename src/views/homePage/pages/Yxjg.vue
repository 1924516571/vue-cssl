<template>
  <!--通用模板 -->
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <div class="top-item-sub">
            <suc-select v-model="stationParams.stationType" :options="listData" :config="{ placeholder: '请选择类型', clearable: false }" style="width:200px"></suc-select>
          </div>
          <!-- 泵机名称 -->
          <div class="top-item-sub">
            <search-component placeholderTxt="泵站名称" @input="onSearch"> </search-component>
          </div>
        </div>
      </div>
      <div class="content">
        <table-no :columns="columns" :tableData="tableData" v-loading="loading"> </table-no>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { SucSelect, SucButton, SucInput, SucFormItem } from "@suc/ui";
import { SearchComponent, TableNo } from "@/components";
import { infoApi, publicApi } from "@/api";
@Component({
  components: {
    SucSelect,
    SucButton,
    SucInput,
    SucFormItem,
    SearchComponent,
    TableNo,
  },
})
export default class Enterprise extends Vue {
  loading: boolean = true;
  listData: any = [
    { label: "水位", value: "ZZ" },
    { label: "雨量", value: "PP" },
  ];
  tableData: any[] = [];
  columns: any[] = [
    {
      type: "index",
      title: "序号",
      width: 150,
    },
    {
      title: "泵站名称",
      key: "stationName",
    },
    {
      title: "在线情况",
      key: "onlineSituation",
    },
    {
      title: "更新时间",
      key: "updateTime",
    },
  ];

  stationParams: any = {
    stationType: "",
    stationName: "",
  };
  mounted() {
    this.stationParams.stationType = "ZZ";
    this.onpage();
  }
  onSearch(val: any) {
    this.stationParams.stationName = val;
    this.onpage();
  }

  // 列表
  async onpage() {
    let url = "wjServer/dataCenter/stbprpb/stationOnlineSituation";
    let data = await publicApi.getWithParam(url, this.stationParams);
    if (data.result) {
      this.tableData = data.data;
    } else {
      this.$Message.error("获取数据失败");
      this.tableData = [];
    }
    this.loading = false;
  }
}
</script>
<style lang="scss" scoped>
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
</style>
