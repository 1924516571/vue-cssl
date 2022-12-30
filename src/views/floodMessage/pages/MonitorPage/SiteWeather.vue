<template>
	<!-- 物资仓库 -->
	<div class="mon-body">
		<el-cascader
              v-model="areaCode"
              :options="areaOptions"
              class="sel"
              :props="{ expandTrigger: 'hover', value: 'myId', label: 'name', children: 'children', checkStrictly: true }"
              size="mini"
              placeholder="所属区域"
              clearable
              @change="handleChange"
            ></el-cascader>
			<div class="table">
        		<table-no :customHeight="tableHeight" :columns="columns" :tableData="tableData"> </table-no>
			</div>
	</div>
</template>
<script lang="ts">
import {
	Vue,
	Component,
} from "vue-property-decorator";
import { publicApi } from "@/api";
import { TableNo } from "@/components";
@Component({
  components: {
    TableNo,
  },
})
export default class ModuleView extends Vue {
	dataList: any = {};
	weatherData: any = {};
	areaCode:any= ['cz'];
    areaOptions: any = [];
  	tableData: any = [];
    tableHeight: any = document.getElementById('table');
	columns: any[] = [
    {
      title: "名称",
      key: "ckmc",
    },
    {
      title: "地址",
      key: "szd",
    },
    {
      title: "管理单位",
      key: "dwid",
    },
    {
      title: "电话",
      key: "tel",
    },
  ];
	mounted() {
        this.getAreaCode();
		this.getData();
	}

	 //获取下拉行政区域下拉
        async getAreaCode() {
            let data = await publicApi.getAreaCode();
            this.areaOptions = this.getTreeData([data.data]);
        }

        getTreeData(data: any) {
            // 循环遍历json数据
            for (var i = 0; i < data.length; i++) {
            if (data[i].children.length < 1) {
                // children若为空数组，则将children设为undefined
                data[i].children = undefined;
            } else {
                // children若不为空数组，则继续 递归调用 本方法
                this.getTreeData(data[i].children);
            }
            }
            return data;
        }

        async handleChange(value: any) {
            this.areaCode = value.toString();
            this.getData()
        }

		async getData(){
            let url = 'wjServer/dataCeter/wareHouse/getCKList'
           	publicApi.getWithParam(url, {areaCode:this.areaCode.toString()}).then((res: any) => {
                if (res.result == true) {
                    let data = res.data;
					this.tableData = data;
                };
        	})
		}
}
</script>
<style lang="scss" scoped>
	.mon-body{
        width: 100%;
        height: calc(100% - 15px);
        .table{
            width: 100%;
            height: 100%;
        }
        .sel{
            width: 7%;
            position:absolute;
            bottom:25.5%;
            left:31.6%;
            bottom: 25%;
        }
    }
</style>
