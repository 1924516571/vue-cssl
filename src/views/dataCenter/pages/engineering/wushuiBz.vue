<template>
  <!--泵站信息 -->
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <div class="top-item-sub">
            <el-cascader
              v-model="stationParams.xzqy"
              :options="areaOptions"
              :props="{ expandTrigger: 'hover', value: 'myId', label: 'name', children: 'children', checkStrictly: true }"
              style="width:100%;"
              size="small"
              placeholder="所属区域"
              clearable
              @change="handleChange"
            ></el-cascader>
          </div>
          <div class="top-item-sub">
            <suc-select v-model="stationParams.type" :options="stationData" :config="{ placeholder: '泵站类型', clearable: true }" style="width:200px"></suc-select>
          </div>
          <div class="top-item-sub">
            <search-component placeholderTxt="泵站名称" @input="onSearch"> </search-component>
          </div>
        </div>
        <div class="top-item">
          <suc-button type="primary" :debounce="800" @on-click="onadd">新增</suc-button>
        </div>
      </div>
      <div class="content">
        <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams" v-loading="loading" element-loading-text="拼命加载中" @get-page="getPage" @get-size="getSize">
          <template v-slot:cezhan="{ row }">
            <div class="link-text" @click="getLink(row, 'cz')">
              <div>
                <span>关联</span>
              </div>
            </div>
          </template>
          <template v-slot:fzr="{ row }">
            <div class="link-text" @click="getLink(row, 'fzr')">
              <span>关联</span>
            </div>
          </template>
          <!-- <template v-slot:sb="{ row }">
            <div class="link-text" @click="getLink(row, 'sb')">
              <span>关联</span>
            </div>
          </template> -->
          <template v-slot:mt="{ row }">
            <div class="link-text" @click="getLink(row, 'mt')">
              <span>关联</span>
            </div>
          </template>
          <template v-slot:pwdw="{ row }">
            <div class="link-text" @click="getLink(row, 'pwdw')">
              <span>关联</span>
            </div>
          </template>
          <template v-slot:gc="{ row }">
            <div class="link-text" @click="getLink(row, 'gc')">
              <span>关联</span>
            </div>
          </template>
          <template v-slot:jk="{ row }">
            <div class="link-text" @click="getLink(row, 'jk')">
              <span>关联</span>
            </div>
          </template>
          <template v-slot:gs="{ row }">
            <div class="link-text" @click="getLink(row, 'gs')">
              <span>关联</span>
            </div>
          </template>
          <template v-slot:fj="{ row }">
            <div class="link-text" @click="getLink(row, 'fj')">
              <span>关联</span>
            </div>
          </template>
          <template v-slot:operation="{ row }">
            <div class="btn">
              <span @click="onedit(row)">编辑</span>
              <span @click="ondelete(row)">删除</span>
            </div>
          </template>
        </table-page>
      </div>
    </div>

    <!-- 新增数据弹框 -->
    <wushui-bz-modal :title="modalTitle" :model="model" :loading="loading" :formParams="formParams" @on-submit="oncreate" @toggle="toggle" :chuan="chuan"></wushui-bz-modal>

    <!-- 删除弹框 -->
    <div class="delete-view" v-show="delmodel">
      <delete-modal @getignore="cancel" @getsave="save" v-loading="delLoading"></delete-modal>
    </div>
    <!-- 测站关联上面带切换的   linkTitle：控制标题显示  linkshow：是否弹框 linkCol：列表数据  pagedfParams：分页的参数 czParams:请求的参数-->
    <link-with-modal
      :title="linkTitle"
      :url="url"
      :model="linkshow"
      :columns="linkCol"
      :tableData="linkData"
      :loading="linkLoading"
      :placeholder="placeholder"
      :pageParams="pagedfParams"
      :czParams="czParams"
      @toggle="linkupdate"
      @on-search="onLinkSearch"
      @on-check="onLinkCheck"
      @on-page="onLinkPage"
      @on-size="onLinkSize"
    >
      <!--  ref="sonV" -->
    </link-with-modal>

    <!-- 关联弹框默认的 -->
    <link-default
      :title="linkTitle"
      :placeholder="placeholder"
      :model="linkshow1"
      :columns="linkCol"
      :loading="linkLoading"
      :tableData="linkData"
      :pageParams="pagedfParams"
      :params="params"
      @toggle="linkupdate1"
      @on-search="onLinkSearch"
      @on-check="onLinkCheck"
      @on-page="onLinkPage"
      @on-size="onLinkSize"
    >
    </link-default>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { SucSelect, SucButton, SucInput, SucFormItem, SucMessage } from "@suc/ui";
import { SelectConfig, SelectOptions } from "@suc/ui/interfaces";
import { SearchComponent, TablePage } from "@/components";
import { Create, DeleteModal, LinkYj, LinkDefault, WushuiBzModal, LinkWithModal } from "../model";
import { infoApi, publicApi } from "@/api";
@Component({
  components: {
    SucSelect,
    SucButton,
    SucInput,
    SucFormItem,
    SearchComponent,
    TablePage,
    Create,
    LinkYj,
    DeleteModal,
    LinkDefault,
    WushuiBzModal,
    LinkWithModal,
  },
})
export default class Enterprise extends Vue {
  // dialogVisible:boolean = false;
  // 初始化数据 data可以声明成类属性形式
  // chuan:String="父传子的值"

  stationData: any = []; //泵站类型
  chuan: any = [];
  olMap = this.$getMapConfig();
  areaOptions: any = [];
  url: string = "wjServer/dataCenter/baseinfo/getStationType";
  modalTitle: string = ""; //弹窗标题
  linkTitle: string = ""; //关联弹窗标题
  placeholder: string = ""; //关联弹窗placeholder
  linkType: string = ""; //判断点击哪种关联表
  linkshow: boolean = false; //带modal关联弹框显隐
  loading: boolean = false;
  delLoading: boolean = false;
  linkLoading: boolean = false;
  linkshow1: boolean = false; //不带modal关联弹框显隐
  btnFlag: string = ""; //区分编辑和新增
  tableData: any[] = []; //页面表单的数据

  linkData: object[] = []; //关联表单的数据
  linkCol: object[] = []; //关联列
  params: any = {};
  czParams: any = {}; //测站关联表单参数
  fzrParams: any = {}; //负责人关联表单参数
  sbParams: any = {}; //设备关联表单参数
  mtParams: any = {}; // 綁定媒體需要參數
  gcParams: any = {}; // 工程需要的参数
  jkParams: any = {}; //监控需要的参数
  pwParams: any = {}; //绑定排污需要的参数
  czLinkParams: any = {}; //绑定测站参数
  fzrLinkParams: any = {}; //绑定负责人需要的参
  sbLinkParams: any = {}; //绑定设备需要的参数
  mtLinkParams: any = {}; //绑定媒体需要的参数
  gcLinkParams: any = {}; //绑定工程需要的参数
  jkLinkParams: any = {}; //绑定监控需要的参数

  gsParams: any = {};
  gsLinkParams: any = {};

  fjParams: any = {};
  fjLinkParams: any = {};

  formParams: any = {
    minIoFileList: [],
    // videoPath: "",
    bzbm: "",
    bzmc: "",
    xzqy: "",
    address: "",
    gcgm: "",
    zjll: "",
    jjsw: "",
    sjyc: "",
    sbsl: "",
    szsl: "",
    sgsl: "",
    gldw: "",
    bzgk: "",
    bz: "",
    bzlx: "L",
    jd: null,
    wd: null,
    lon: "",
    lat: "",
    location: "",
  };

  // 惠山水利项目
  riverLevelData: any = []; //河流等级数据

  pagedfParams: any = {
    total: 0,
    current: 1,
    pageSize: 10,
  };

  async handleChange(value: any) {
    this.stationParams.xzqy = value.toString();
  }

  // 搜索
  onLinkSearch(val: any) {
    console.log("搜索", val);
    if (Object.prototype.toString.call(val) == "[object String]") {
      if (this.linkType == "cz") {
        this.czParams.placeholder = val;
      } else if (this.linkType == "fzr") {
        this.fzrParams.placeholder = val;
      } else if (this.linkType == "sb") {
        this.sbParams.placeholder = val;
      } else if (this.linkType == "mt") {
        this.mtParams.placeholder = val;
      } else if (this.linkType == "gc") {
        this.gcParams.placeholder = val;
      } else if (this.linkType == "jk") {
        this.jkParams.placeholder = val;
      } else if (this.linkType == "gs") {
        this.gsParams.grilleName = val;
      } else if (this.linkType == "fj") {
        this.fjParams.fanName = val;
      }
    } else {
      if (this.linkType == "cz") {
        this.czParams.sttp = val.name;
      }
    }
    this.getInfo(this.linkType);
  }

  linkupdate(val: boolean) {
    this.linkshow = val;
  }
  linkupdate1(val: boolean) {
    this.linkshow1 = val;
  }
  // 分页
  onLinkPage(pageNum: number) {
    this.gsParams.pageNumber = pageNum; //格栅数据的页码
    this.fjParams.pageNumber = pageNum;
    this.czParams.pageNumber = pageNum;
    this.sbParams.pageNumber = pageNum;
    this.mtParams.pageNumber = pageNum;
    this.gcParams.pageNumber = pageNum;
    this.jkParams.pageNumber = pageNum;
    this.getInfo(this.linkType);
  }
  // 每页多少条
  onLinkSize(pageSize: number) {
    this.gsParams.pageSize = pageSize; //格栅分页数据每页多少条
    this.fjParams.pageSize = pageSize;
    this.czParams.pageSize = pageSize;
    this.sbParams.pageSize = pageSize;
    this.mtParams.pageSize = pageSize;
    this.gcParams.pageSize = pageSize;
    this.jkParams.pageSize = pageSize;
    this.getInfo(this.linkType);
  }

  // 绑定解绑
  async onLinkCheck(row: any) {
    if (this.linkType == "cz") {
      this.czLinkParams.stcd = row.stcd;
      let url = "wjServer/dataCenter/baseinfo/bindStation"; //绑定测站
      let url1 = "wjServer/dataCenter/baseinfo/unbindStation"; //解绑测站
      let res = row.checked ? await infoApi.onlink(this.czLinkParams, url) : await infoApi.ondeleteWithParams(this.czLinkParams, url1);
      let txt = row.checked ? "关联" : "取消关联";
      let info = res.result ? "成功" : "失败";
      this.$SucMessage.info(txt + info);
    } else if (this.linkType == "fzr") {
      this.fzrLinkParams.rybh = row.rybh;
      let url = "dataCenter/baseinfo/bindPerson"; //绑定负责人
      let url1 = "dataCenter/baseinfo/unbindPerson"; //解绑负责人
      let res = row.checked ? await infoApi.onlink(this.fzrLinkParams, url) : await infoApi.ondeleteWithParams(this.fzrLinkParams, url1);
      let txt = row.checked ? "关联" : "取消关联";
      let info = res.result ? "成功" : "失败";
      this.$SucMessage.info(txt + info);
    } else if (this.linkType == "sb") {
      this.sbLinkParams.eqcd = row.sbbm;
      let url = "wjServer/dataCenter/baseinfo/bindEquipment"; //绑定设备
      let url1 = "wjServer/dataCenter/baseinfo/unbindEquipment"; //解绑设备
      let res = row.checked ? await infoApi.onlink(this.sbLinkParams, url) : await infoApi.ondeleteWithParams(this.sbLinkParams, url1);
      let txt = row.checked ? "关联" : "取消关联";
      let info = res.result ? "成功" : "失败";
      this.$SucMessage.info(txt + info);
    } else if (this.linkType == "mt") {
      this.mtLinkParams.fileCd = row.fileCd;
      let url = "wjServer/dataCenter/baseinfo/bindMedia"; //绑定媒体
      let url1 = "wjServer/dataCenter/baseinfo/unbindMedia"; //解绑媒体
      let res = row.checked ? await infoApi.onlink(this.mtLinkParams, url) : await infoApi.ondeleteWithParams(this.mtLinkParams, url1);
      let txt = row.checked ? "关联" : "取消关联";
      let info = res.result ? "成功" : "失败";
      this.$SucMessage.info(txt + info);
    } else if (this.linkType == "gc") {
      this.gcLinkParams.engCded = row.engCded;
      this.gcLinkParams.pjcged = "L";
      let url = "wjServer/dataCenter/baseinfo/bindEng"; //绑定工程
      let url1 = "wjServer/dataCenter/baseinfo/unbindEng"; //解绑工程
      let res = row.checked ? await infoApi.onlink(this.gcLinkParams, url) : await infoApi.ondeleteWithParams(this.gcLinkParams, url1);
      let txt = row.checked ? "关联" : "取消关联";
      let info = res.result ? "成功" : "失败";
      this.$SucMessage.info(txt + info);
    } else if (this.linkType == "jk") {
      this.jkLinkParams.eqcd = row.zdbh;
      let url = "wjServer/dataCenter/baseinfo/bindEquipment"; //绑定监控
      let url1 = "wjServer/dataCenter/baseinfo/unbindEquipment"; //解绑监控
      let res = row.checked ? await infoApi.onlink(this.jkLinkParams, url) : await infoApi.ondeleteWithParams(this.jkLinkParams, url1);
      let txt = row.checked ? "关联" : "取消关联";
      let info = res.result ? "成功" : "失败";
      this.$SucMessage.info(txt + info);
    } else if (this.linkType == "gs") {
      this.linkData = this.linkData.map((item: any) => {
        return {
          name: item.name,
          checked: row.id == item.id ? true : false,
          id: item.id,
        };
      });
      this.gsLinkParams.id = row.id;
      if (!row.checked) {
        let url = "wjServer/dataCenter/basic/grille/bindBz";
        let res = await infoApi.onupdate({ bzid: "", id: this.gsLinkParams.id }, url);
        if (res.result == true) {
          this.$SucMessage.info(res.desc);
        } else {
          this.$SucMessage.info(res.desc);
        }
      } else {
        let url = "wjServer/dataCenter/basic/grille/bindBz";
        let res = await infoApi.onupdate(this.gsLinkParams, url);
        if (res.result == true) {
          this.$SucMessage.info("关联成功");
        } else {
          this.$SucMessage.info(res.desc);
        }
      }
    } else if (this.linkType == "fj") {
      this.linkData = this.linkData.map((item: any) => {
        return {
          name: item.name,
          checked: row.id == item.id ? true : false,
          id: item.id,
        };
      });
      this.fjLinkParams.id = row.id;
      if (!row.checked) {
        let url = "wjServer/dataCenter/basic/fan/bindBz";
        let res = await infoApi.onupdate({ bzid: "", id: this.fjLinkParams.id }, url);
        if (res.result == true) {
          this.$SucMessage.info(res.desc);
        } else {
          this.$SucMessage.info(res.desc);
        }
        this.getInfo(this.linkType);
      } else {
        let url = "wjServer/dataCenter/basic/fan/bindBz";
        let res = await infoApi.onupdate(this.fjLinkParams, url);
        if (res.result == true) {
          this.$SucMessage.info("关联成功");
        } else {
          this.$SucMessage.info(res.desc);
        }
        this.getInfo(this.linkType);
      }
    }
  }

  // 关联的方法
  getLink(row: any, flag: any) {
    this.linkType = flag; //选择的设备类型
    if (flag == "cz") {
      this.linkTitle = "测站关联";
      this.placeholder = "测站名称";
      this.czParams = {
        engCd: row.bzbm, //编码
        pjcg: row.pjcg, //类型
        sttp: this.czParams.sttp, //测站类型
        placeholder: "", //输入框的占位符
        pageNumber: "1",
        pageSize: "10",
      };
      this.czLinkParams = {
        engCd: row.bzbm,
        pjcg: row.pjcg,
      };
      this.linkCol = [
        {
          title: "",
          slot: "selection",
          width: 55,
        },
        {
          title: "测站名称",
          key: "stnm",
        },
        {
          title: "测站类型",
          key: "sttp",
        },
        {
          title: "测站编码",
          key: "stcd",
        },
      ];
      this.getInfo(flag);
      this.linkshow = true; //让关联弹框显示
    } else if (flag == "fzr") {
      this.linkTitle = "负责人关联";
      this.placeholder = "负责人名称";
      this.fzrParams = {
        engCd: row.rvCd, //工程代码
        pjcg: row.pjcg, //工程类型
        placeholder: "",
        pageNumber: "1",
        pageSize: "10",
      };
      this.fzrLinkParams = {
        engCd: row.manholeCode,
        pjcg: row.pjcg,
      };
      this.linkCol = [
        {
          title: "",
          slot: "selection",
          width: 55,
        },
        {
          title: "行政区域",
          key: "area",
        },
        {
          title: "负责人名称",
          key: "personName",
        },
        {
          title: "职务",
          key: "job",
        },
        {
          title: "联系方式",
          key: "contact",
        },
      ];
      this.getInfo(flag);
      this.linkshow1 = true;
    } else if (flag == "sb") {
      this.linkTitle = "设备关联";
      this.placeholder = "设备名称";
      this.sbParams = {
        engCd: row.bzbm,
        pjcg: row.pjcg,
        placeholder: "",
        pageNumber: "1",
        pageSize: "10",
      };
      this.sbLinkParams = {
        engCd: row.bzbm,
        pjcg: row.pjcg,
      };
      this.linkCol = [
        {
          title: "",
          slot: "selection",
          width: 55,
        },
        {
          title: "设备类型",
          key: "sblx",
        },
        {
          title: "设备名称",
          key: "sbmc",
        },
        {
          title: "设备编码",
          key: "sbbm",
        },
      ];
      this.getInfo(flag);
      this.linkshow1 = true;
    } else if (flag == "mt") {
      this.linkTitle = "媒体关联";
      this.placeholder = "媒体名称";
      this.mtParams = {
        engCd: row.bzbm, //工程编码
        pjcg: row.pjcg, //工程类型
        placeholder: "", //查询名
        pageNumber: "1", //当前页
        pageSize: "10", //每页条数
      };
      this.mtLinkParams = {
        engCd: row.bzbm,
        pjcg: row.pjcg,
      };
      this.linkCol = [
        {
          title: "",
          slot: "selection",
          width: 55,
        },
        {
          title: "工程类型",
          key: "fileType",
        },
        {
          title: "工程名称",
          key: "fileName",
        },
        {
          title: "管理单位",
          key: "uploadTime",
        },
      ];
      this.getInfo(flag);
      this.linkshow1 = true;
    } else if (flag == "gc") {
      this.linkTitle = "工程关联";
      this.placeholder = "工程名称";
      this.gcParams = {
        engCd: row.bzbm, //工程编码
        pjcg: row.pjcg, //工程类型
        pjcged: "L", //关联的工程类型
        placeholder: "", //查询名
        pageNumber: "1", //当前页
        pageSize: "10", //每页条数
      };
      // 工程河道绑定功能参数
      this.gcLinkParams = {
        engCd: row.bzbm,
        pjcg: row.pjcg,
      };
      this.linkCol = [
        {
          title: "",
          slot: "selection",
          width: 55,
        },
        {
          title: "工程名称",
          key: "engNameed",
        },
        {
          title: "工程类型",
          key: "engType",
        },
        // {
        //   title: "媒体名称",
        //   key: "fileName",
        // },
        // {
        //   title: "上传时间",
        //   key: "uploadTime",
        // },
      ];
      this.getInfo(flag);
      this.linkshow1 = true;
    } else if (flag == "jk") {
      this.linkTitle = "监控关联";
      this.placeholder = "监控名称";
      this.jkParams = {
        engCd: row.bzbm, //工程编码
        pjcg: row.pjcg, //工程类型
        placeholder: "", //查询名
        pageNumber: "1", //当前页
        pageSize: "10", //每页条数
      };
      this.jkLinkParams = {
        engCd: row.bzbm,
        pjcg: row.pjcg,
      };
      this.linkCol = [
        {
          title: "",
          slot: "selection",
          width: 55,
        },
        {
          title: "监控名称",
          key: "spdmc",
        },
        {
          title: "监控地址",
          key: "ip",
        },
        {
          title: "通道号",
          key: "channel",
        },
      ];
      this.getInfo(flag);
      this.linkshow1 = true;
    } else if (flag == "gs") {
      this.linkTitle = "格栅关联";
      this.placeholder = "格栅名称";
      this.gsParams = {
        grilleName: "", //查询名
        pageNumber: "1", //当前页
        pageSize: "10", //每页条数
        bzid: row.bzbm, //泵站编码
      };
      this.gsLinkParams.bzid = row.bzbm;
      this.linkCol = [
        {
          title: "",
          slot: "selection",
          width: 55,
        },
        {
          title: "格栅名称",
          key: "name",
        },
      ];
      this.getInfo(flag);
      this.linkshow1 = true;
    } else if (flag == "fj") {
      this.linkTitle = "风机关联";
      this.placeholder = "风机名称";
      this.fjParams = {
        fanName: "", // 子页面查询名称
        pageNumber: "1", //当前页
        pageSize: "10", //每页条数
        bzid: row.bzbm, //泵站id
      };
      this.fjLinkParams.bzid = row.bzbm;
      this.linkCol = [
        {
          title: "",
          slot: "selection",
          width: 55,
        },
        {
          title: "风机名称",
          key: "name",
        },
      ];
      this.getInfo(flag);
      this.linkshow1 = true;
    }
    this.pagedfParams = {
      total: 0,
      current: 1,
      pageSize: 10,
    };
  }

  //获取表单里面数据方法
  async getInfo(flag?: any) {
    this.linkLoading = true;
    if (flag == "cz") {
      let url = "wjServer/dataCenter/baseinfo/getStationListWithPage";
      let data = await infoApi.onpage(this.czParams, url);
      if (data.result) {
        this.pagedfParams.total = parseInt(data.data.total);
        this.linkData = data.data.rows.map((item: any) => {
          return {
            stcd: item.stcd,
            sttp: item.sttp,
            stnm: item.stnm,
            checked: item.bind,
          };
        });
      } else {
        this.$Message.error("获取失败");
      }
    } else if (flag == "fzr") {
      let url = "wjServer/dataCenter/baseinfo/getPersonListWithPage";
      let data = await infoApi.onpage(this.fzrParams, url);
      if (data.result) {
        (this.pagedfParams.total = data.data.total),
          (this.linkData = data.data.rows.map((item: any) => {
            return {
              area: item.area,
              personName: item.personName,
              job: item.job,
              contact: item.contact,
              rybh: item.rybh,
              checked: item.bind,
            };
          }));
      } else {
        this.$Message.error(data.desc);
      }
    } else if (flag == "sb") {
      let url = "wjServer/dataCenter/baseinfo/getEquipmentListWithPage";
      let data = await infoApi.onpage(this.sbParams, url);
      if (data.result) {
        (this.pagedfParams.total = parseInt(data.data.total)),
          (this.linkData = data.data.rows.map((item: any) => {
            return {
              sblx: item.channel,
              sbmc: item.spdmc,
              sbbm: item.zdbh,
              checked: item.bind,
            };
          }));
      } else {
        this.$Message.error("获取失败");
      }
    } else if (flag == "mt") {
      let url = "wjServer/dataCenter/baseinfo/getMediaListWithPage";
      let data = await infoApi.onpage(this.mtParams, url);
      if (data.result) {
        (this.pagedfParams.total = parseInt(data.data.total)),
          (this.linkData = data.data.rows.map((item: any) => {
            return {
              fileCd: item.fileCd,
              fileType: item.fileType,
              fileName: item.fileName,
              uploadTime: item.uploadTime,
              checked: item.bind,
            };
          }));
      } else {
        this.$Message.error(data.desc);
      }
    } else if (flag == "gc") {
      let url = "wjServer/dataCenter/baseinfo/getEngListWithPage";
      let data = await infoApi.onpage(this.gcParams, url);
      if (data.result) {
        (this.pagedfParams.total = parseInt(data.data.total)),
          (this.linkData = data.data.rows.map((item: any) => {
            return {
              engNameed: item.engNameed,
              engCded: item.engCded,
              pjcged: item.pjcged,
              checked: item.isbind,
              // 工程类型
              engType: "污水泵站",
            };
          }));
      } else {
        this.$Message.error(data.desc);
      }
    } else if (flag == "jk") {
      let url = "wjServer/dataCenter/baseinfo/getMonitorListWithPage";
      let data = await infoApi.onpage(this.jkParams, url);
      if (data.result) {
        (this.pagedfParams.total = parseInt(data.data.total)),
          (this.linkData = data.data.rows.map((item: any) => {
            return {
              spdmc: item.spdmc,
              ip: item.ip,
              channel: item.channel,
              checked: item.bind,
              zdbh: item.zdbh,
            };
          }));
      } else {
        this.$Message.error(data.desc);
      }
    } else if (flag == "gs") {
      let url = "wjServer/dataCenter/basic/grille/page";
      let data = await infoApi.onpage(this.gsParams, url);
      if (data.result) {
        (this.pagedfParams.total = parseInt(data.data.total)),
          (this.linkData = data.data.rows.map((item: any) => {
            return {
              name: item.name,
              checked: item.check,
              id: item.id,
            };
          }));
      } else {
        this.$Message.error(data.desc);
      }
    } else if (flag == "fj") {
      let url = "wjServer/dataCenter/basic/fan/page";
      let data = await infoApi.onpage(this.fjParams, url);
      if (data.result) {
        (this.pagedfParams.total = parseInt(data.data.total)),
          (this.linkData = data.data.rows.map((item: any) => {
            return {
              name: item.name,
              checked: item.check,
              id: item.id,
            };
          }));
      } else {
        this.$Message.error(data.desc);
      }
    }
    this.linkLoading = false;
  }

  //   删
  delmodel: boolean = false;
  delParams: any = {};
  ondelete(row: any) {
    this.delmodel = true;
    this.delParams = {
      bzbm: row.bzbm,
    };
  }
  cancel(val: any) {
    this.delmodel = val;
  }
  async save() {
    this.delLoading = true;
    let url = "wjServer/dataCenter/baseinfo/bengzhan/delInfo";
    infoApi.ondeleteWithParams(this.delParams, url).then((data: any) => {
      if (data.result == true) {
        this.delmodel = false;
        this.$SucMessage.info("删除成功");
        this.onpage();
        this.delLoading = false;
      } else {
        this.$SucMessage.error("删除失败");
        this.delLoading = false;
      }
    });
  }

  // 新增弹框
  onadd() {
    this.model = true;
    this.btnFlag = "add";
    this.modalTitle = "新增";
    this.formParams = {
      // a:"123"
      // imgList: [],
      minIoFileList: [],
      // xzqy: "",
    };
    this.markers = [];
  }

  // 判断是新增还是编辑
  async oncreate() {
    if (this.btnFlag == "add") {
      this.setCreate();
    } else if (this.btnFlag == "edit") {
      this.setEdit();
    }
    this.model = false;
  }
  //  新增
  async setCreate() {
    this.loading = true;
    let checkUrl = "wjServer/dataCenter/baseinfo/bengzhan/ifExist";
    let a = {
      bzbm: this.formParams.bzbm,
    };
    let checkData = await publicApi.getWithParam(checkUrl, a);
    if (checkData.data) {
      let url = "wjServer/dataCenter/baseinfo/bengzhan/addInfo";
      infoApi.oncreate(this.formParams, url).then((data: any) => {
        if (data.result == true) {
          this.$SucMessage.info("新增成功");
          this.model = false;
          this.onpage();
          this.loading = false;
        } else {
          this.$SucMessage.error("新增失败");
          this.model = false;
          this.loading = false;
        }
      });
    } else {
      this.model = false;
      this.$SucMessage.error("新增失败,窨井编码已存在,重新输入");
    }
    this.onpage();
  }
  // 更新
  async setEdit() {
    this.loading = true;
    let url = "wjServer/dataCenter/baseinfo/wushuiBz/editInfo";
    this.formParams.xzqy = this.formParams.xzqy.toString();
    infoApi.jsonUpdate(this.formParams, url).then((data: any) => {
      if (data.result == true) {
        this.$SucMessage.info("更新成功");
        this.model = false;
        this.onpage();
        this.loading = false;
      } else {
        this.model = false;
        this.$SucMessage.error("更新失败");
        this.loading = false;
      }
    });
    this.onpage();
  }
  model: boolean = false;
  toggle(val: boolean) {
    this.model = val;
  }
  // 编辑
  onedit(row: any) {
    this.model = true;
    this.formParams = {
      xzqy: "",
      imgList: [],
    };
    this.btnFlag = "edit";
    this.modalTitle = "编辑";
    let bzbm = row.bzbm;
    this.editInfo(bzbm);

    this.markers = [];
  }

  imgURL: any = [];
  // 详情
  async editInfo(bzbm: any) {
    let url = "wjServer/dataCenter/baseinfo/bengzhan/getInfoByBzcd";

    let a = {
      bzbm: bzbm,
    };

    let data = await infoApi.getInfo(a, url);
    // 区域
    let arrxzqy = data.data.xzqy.split(",");
    // 图片
    this.imgURL = [];

    //   const imgURL = data.data.minIoFileList.map((item: any) => {
    //   return {
    //     name: item.oldName,
    //     percentage: 100,
    //     uid: item.fileId,
    //     url: item.previewUrl,
    //     response: {
    //       data: {
    //         result: true,
    //         code: "0",
    //         fileId: item.fileId,
    //         oldName: item.oldName,
    //         bucket: "file",
    //         previewUrl: item.previewUrl,
    //       },
    //     },
    //   };
    // });

    this.formParams = {
      bzbm: data.data.bzbm,
      bzmc: data.data.bzmc,
      jjsw: data.data.jjsw,
      xzqy: arrxzqy,
      zjll: data.data.zjll,
      address: data.data.address,
      sjyc: data.data.sjyc,
      sbsl: data.data.sbsl,
      szsl: data.data.szsl,
      sgsl: data.data.sgsl,
      gldw: data.data.gldw,
      bzgk: data.data.bzgk,
      minIoFileList: data.data.minIoFileList,
      bz: data.data.bz,
      location: data.data.lon && data.data.lat ? data.data.lon + "," + data.data.lat : "",
      lon: data.data.lon,
      lat: data.data.lat,
      // imgList: this.imgURL,
      jwydz: data.data.jwydz,
      lhqydz: data.data.lhqydz,
    };

    // this.olMap.map.view.center.coord = [120.253076421672220,31.683506424358100];
    // let arr = data.location.split(",");
    // let lon = arr[0];
    // let lat = arr[1];
    // if (lon && lat) {
    //   this.markers.push({ lon: lon, lat: lat });
    //   this.olMap.map.view.center.coord = [lon,lat];
    // }
  }

  markers: any[] = [];
  // 点击地图获取经纬度

  //   查
  columns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "泵站编码",
      key: "bzbm",
    },
    {
      title: "泵站名称",
      key: "bzmc",
    },
    {
      title: "行政区域",
      key: "xzqy",
    },
    {
      title: "泵站类型",
      key: "type",
    },
    {
      title: "警戒水位",
      key: "jjsw",
    },
    {
      title: "装机流量",
      key: "zjll",
    },
    {
      title: "设计扬程",
      key: "sjyc",
    },
    {
      title: "水泵数量",
      key: "sbsl",
    },
    {
      title: "水闸数量",
      key: "szsl",
    },
    {
      title: "栅格数量",
      key: "sgsl",
    },
    {
      title: "测站",
      key: "cezhan",
      slot: "cezhan",
    },

    // {
    //   title: "负责人",
    //   key: "fzr",
    //   slot: "fzr",
    // },
    // {
    //   title: "设备",
    //   key: "sb",
    //   slot: "sb",
    // },

    {
      title: "媒体",
      key: "mt",
      slot: "mt",
    },
    {
      title: "工程",
      key: "gc",
      slot: "gc",
    },
    {
      title: "监控",
      key: "jk",
      slot: "jk",
    },
    {
      title: "格栅",
      key: "gs",
      slot: "gs",
    },
    {
      title: "风机",
      key: "fj",
      slot: "fj",
    },
    // {
    //   title: "排污单位",
    //   key: "pwdw",
    //   slot: "pwdw",
    // },
    {
      title: "操作",
      slot: "operation",
      width: 90,
    },
  ];

  pageParams: any = {
    total: 0,
    current: 1,
    pageSize: 10,
  };
  // pageYjParams: any = {
  //   total: 0,
  //   current: 1,
  //   pageSize: 10,
  // };
  stationParams: any = {
    pageNumber: "",
    pageSize: "",
    xzqy: "", //区域
    bzmc: "", //泵站名称
    type: "", //泵站类型
  };
  mounted() {
    this.getStationType(); //测站类型
    this.getBzType(); //泵站类型
    this.onpage(); //获取页面信息
    this.getAreaCode(); //获取所属区域
    this.olMap.map.view.center.coord = [120.27869688218249, 31.685617674794585];
  }

  //获取测站类型
  getStationType() {
    let url = "wjServer/dataCenter/baseinfo/getStationType";
    infoApi.getupdate(url).then((data: any) => {
      this.czParams.sttp = data.data[0].code; //拿到测站类型
    });
  }

  async getBzType() {
    const url = "wjServer/hs/maintain/getYhdxType";
    const data = await publicApi.getNoParam(url);
    if (data.result == true) {
      this.stationData = data.data.map((item: any) => {
        let arr = {
          value: item.codeMyid,
          label: item.name,
        };
        return arr;
      });
    } else {
      this.stationData = [];
    }
  }

  //获取下拉行政区域下拉
  async getAreaCode() {
    let data = await infoApi.getAreaCode();
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

  // 列表
  async onpage() {
    this.loading = true;
    this.stationParams.pageNumber = this.pageParams.current;
    this.stationParams.pageSize = this.pageParams.pageSize;
    let url = "wjServer/dataCenter/baseinfo/bengzhan/infoList";
    let data = await infoApi.onpage(this.stationParams, url);
    if ((data.result = true)) {
      this.pageParams.total = parseInt(data.data.total);
      let _arr: any = [];
      let arr = data.data.rows;
      arr.map((item: any, index: any) => {
        _arr.push(Object.assign({}, item, { bzlx: "污水泵站" })); //Object.assign()  合并成一个对象
      });
      this.tableData = _arr;
      this.loading = false;
    } else {
      this.$SucMessage.error(data.desc);
      this.loading = false;
    }
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
    this.stationParams.bzmc = val;
    this.onpage();
    this.loading = false;
  }

  // 关联负责人
  fzrshow: boolean = false;
  fzrRow: any = {};
  fzrupdate(val: boolean) {
    this.fzrshow = val;
  }
  getFzr(row: any) {
    this.fzrRow = row;
    this.fzrshow = true;
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
        // width: 50%;
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
