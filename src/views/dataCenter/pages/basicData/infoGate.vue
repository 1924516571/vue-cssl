<template>
  <!--闸门信息 -->
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <div class="top-item-sub">
            <el-cascader
              v-model="stationParams.areaCode"
              :options="areaOptions"
              :props="{ expandTrigger: 'hover', value: 'myId', label: 'name', children: 'children', checkStrictly: true }"
              style="width:100%;"
              size="small"
              placeholder="所属区域"
              clearable
              @change="handleChange"
            ></el-cascader>
          </div>

          <!-- 河流名称 -->
          <div class="top-item-sub">
            <suc-select v-model="stationParams.riverCode" :options="riverNameArry" :config="{ placeholder: '河流名称', clearable: true }" style="width:160px"></suc-select>
          </div>
          <!-- 闸站名称 -->
          <div class="top-item-sub">
            <search-component placeholderTxt="闸站名称" @input="onSearch"> </search-component>
          </div>
        </div>
        <div class="top-item">
          <suc-button type="primary" :debounce="800" @on-click="onadd">新增</suc-button>
        </div>
      </div>
      <div class="content">
        <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams" v-loading="loading" @get-page="getPage" @get-size="getSize">
          <template v-slot:cezhan="{ row }">
            <div class="link-text" @click="getLink(row, 'bz')">
              <div>
                <span>关联</span>
              </div>
            </div>
          </template>
          <!-- <template v-slot:fzr="{ row }">
            <div class="link-text" @click="getLink(row, 'fzr')">
              <span>关联</span>
            </div>
          </template>
          <template v-slot:sb="{ row }">
            <div class="link-text" @click="getLink(row, 'sb')">
              <span>关联</span>
            </div>
          </template>
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
          </template> -->
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
    <gate-modal :title="modalTitle" :model="model" :loading="loading" :formParams="formParams" @on-submit="oncreate" @toggle="toggle" :chuan="chuan"></gate-modal>

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
import { SucSelect, SucButton, SucInput, SucFormItem } from "@suc/ui";
import { SelectConfig, SelectOptions } from "@suc/ui/interfaces";
import { SearchComponent, TablePage } from "@/components";
import { Create, DeleteModal, LinkYj, LinkDefault, GateModal, LinkWithModal } from "../model";
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
    GateModal,
    LinkWithModal,
  },
})
export default class Enterprise extends Vue {
  // dialogVisible:boolean = false;
  // 初始化数据 data可以声明成类属性形式
  // chuan:String="父传子的值"
  chuan: any = [];
  olMap = this.$getMapConfig();
  areaOptions: any = [];
  url: string = "wjServer/dataCenter/baseinfo/getStationType";
  areaCode: any = [];
  modalTitle: string = ""; //弹窗标题
  linkTitle: string = ""; //关联弹窗标题
  placeholder: string = ""; //关联弹窗placeholder
  linkType: string = ""; //判断点击哪种关联表
  linkshow: boolean = false; //带modal关联弹框显隐
  loading: boolean = true;
  // loading: boolean = false;
  delLoading: boolean = false;
  linkLoading: boolean = false;
  linkshow1: boolean = false; //不带modal关联弹框显隐
  btnFlag: string = ""; //区分编辑和新增
  tableData: any[] = [];

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

  formParams: any = {
    gateCd: "",
    gateNm: "",
    szlb: "",
    szly: "",
    ssly: "",
    gczt: "",
    szhl: "",
    jzlb: "",
    zdgzll: "",
    gldw: "",
    zgdw: "",
    gsbm: "",
    loc: "",
    projScal: "",
    gateHoleNum: "",
    gateTw: "",
    desGateQ: "",
    gk: "",
    nt: "",
    xzqq: "",
    minIoFileList: [],
    // videoPath: "",
  };
  newObj: any = {
    basicGate: {
      gateCd: "",
      gateNm: "",
      szlb: "",
      ssly: "",
      gczt: "",
      szhl: "",
      jzlb: "",
      zdgzll: "",
      gldw: "",
      zgdw: "",
      gsbm: "",
      loc: "",
      projScal: "",
      gateHoleNum: "",
      gateTw: "",
      desGateQ: "",
      gk: "",
      nt: "",
      xzqq: "",
      lon: "",
      lat: "",
    },
    minIoFileList: this.formParams.minIoFileList,
  };

  // 惠山水利项目
  //   riverLevelData: any = []; //河流等级数据

  riverNameArry: any = []; //河流名称数据

  pagedfParams: any = {
    total: 0,
    current: 1,
    pageSize: 10,
  };

  async handleChange(value: any) {
    this.stationParams.areaCode = value.toString();
  }

  // 搜索
  onLinkSearch(val: any) {
    if (Object.prototype.toString.call(val) == "[object String]") {
      if (this.linkType == "bz") {
        this.czParams.bzmc = val;
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
      }
    } else {
      if (this.linkType == "bz") {
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
    this.czParams.pageNumber = pageNum;
    this.sbParams.pageNumber = pageNum;
    this.mtParams.pageNumber = pageNum;
    this.gcParams.pageNumber = pageNum;
    this.jkParams.pageNumber = pageNum;
    this.getInfo(this.linkType);
  }
  // 每页多少条
  onLinkSize(pageSize: number) {
    this.czParams.pageSize = pageSize;
    this.sbParams.pageSize = pageSize;
    this.mtParams.pageSize = pageSize;
    this.gcParams.pageSize = pageSize;
    this.jkParams.pageSize = pageSize;
    this.getInfo(this.linkType);
  }

  //获取测站类型
  getStationType() {
    let url = "wjServer/dataCenter/baseinfo/getStationType";
    infoApi.getupdate(url).then((data: any) => {
      this.czParams.sttp = data.data[0].code; //拿到测站类型
    });
  }

  // 绑定解绑
  async onLinkCheck(row: any) {
    if (this.linkType == "bz") {
      this.czLinkParams.stcd = row.bzbm;
      let url = "wjServer/dataCenter/baseinfo/bindStationOld"; //绑定测站
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
    }
  }

  // 关联的方法
  getLink(row: any, flag: any) {
    this.linkType = flag; //选择的设备类型
    if (flag == "bz") {
      this.linkTitle = "测站关联";
      this.placeholder = "测站名称";
      this.czParams = {
        bzmc: "",
        pageNumber: "1",
        pageSize: "10",
        deviceType :'1',
        deviceCode : row.gateCd
      };
      this.czLinkParams = {
        engCd: row.gateCd,
        pjcg: row.gclb,
      };
      this.linkCol = [
        {
          title: "",
          slot: "selection",
          width: 55,
        },
        {
          title: "泵站名称",
          key: "bzmc",
        },
        {
          title: "泵站类型",
          key: "type",
        },
      ];
      this.getInfo(flag);
      this.linkshow1 = true; //让关联弹框显示
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
        pjcg: row.engType,
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
        engCd: row.gateCd,
        pjcg: row.gclb,
        placeholder: "",
        pageNumber: "1",
        pageSize: "10",
      };
      this.sbLinkParams = {
        engCd: row.gateCd,
        pjcg: row.gclb,
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
        engCd: row.gateCd, //工程编码
        pjcg: row.gclb, //工程类型
        placeholder: "", //查询名
        pageNumber: "1", //当前页
        pageSize: "10", //每页条数
      };
      this.mtLinkParams = {
        engCd: row.gateCd,
        pjcg: row.gclb,
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
        engCd: row.gateCd, //工程编码
        pjcg: row.gclb, //工程类型
        pjcged: "L", //关联的工程类型
        placeholder: "", //查询名
        pageNumber: "1", //当前页
        pageSize: "10", //每页条数
      };
      // 工程河道绑定功能参数
      this.gcLinkParams = {
        engCd: row.gateCd,
        pjcg: row.gclb,
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
        engCd: row.gateCd, //工程编码
        pjcg: row.gclb, //工程类型
        placeholder: "", //查询名
        pageNumber: "1", //当前页
        pageSize: "10", //每页条数
      };
      this.jkLinkParams = {
        engCd: row.gateCd,
        pjcg: row.gclb,
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
    }
    //  else if (flag == "pwdw") {
    //   this.linkTitle = "排污单位关联";
    //   this.placeholder = "排污名称";
    //   this.pwParams = {
    //     engCd: row.manholeCode, //工程编码
    //     pjcg: row.engType, //工程类型
    //     pjcged:row.
    //     placeholder: "", //查询名
    //     pageNumber: "1", //当前页
    //     pageSize: "10", //每页条数
    //   };
    //   this.mtLinkParams = {
    //     engCd: row.manholeCode,
    //     pjcg: row.engType,
    //   };
    //   this.linkCol = [
    //     {
    //       title: "",
    //       slot: "selection",
    //       width: 55,
    //     },
    //     {
    //       title: "媒体类型",
    //       key: "fileType",
    //     },
    //     {
    //       title: "媒体名称",
    //       key: "fileName",
    //     },
    //     {
    //       title: "上传时间",
    //       key: "uploadTime",
    //     },
    //   ];
    //   this.getInfo(flag);
    //   this.linkshow1 = true;
    // }

    this.pagedfParams = {
      total: 0,
      current: 1,
      pageSize: 10,
    };
  }

  //获取表单里面数据方法
  async getInfo(flag?: any) {
    this.linkLoading = true;
    if (flag == "bz") {
      let url = "wjServer/dataCenter/baseinfo/bengzhan/infoList";
      let data = await infoApi.onpage(this.czParams, url);
      if (data.result) {
        this.pagedfParams.total = parseInt(data.data.total);
        this.linkData = data.data.rows.map((item: any) => {
          return {
            bzmc: item.bzmc,
            bzlx: item.bzlx,
            bzbm: item.bzbm,
            type: item.type,
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
    }
    this.linkLoading = false;
  }

  //   删
  delmodel: boolean = false;
  delParams: any = {};
  ondelete(row: any) {
    this.delmodel = true;
    this.delParams = {
      gateCd: row.gateCd, //闸站编码
      engType: row.gclb, //闸站类别
    };
  }
  cancel(val: any) {
    this.delmodel = val;
  }
  async save() {
    this.delLoading = true;
    let url = "wjServer/dataCenter/baseinfo/gate/delGate";
    infoApi.ondeleteWithParams(this.delParams, url).then((data: any) => {
      if (data.result == true) {
        this.delmodel = false;
        this.$SucMessage.info("删除成功");
        this.onpage();
        this.delLoading = false;
      } else {
        this.delLoading = false;
        this.$SucMessage.error("删除失败");
      }
    });
  }

  // 新增弹框
  onadd() {
    this.model = true;
    this.btnFlag = "add";
    this.modalTitle = "新增";
    this.formParams = {};
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

  // 新的字符串
  newString: any = "";
  //  新增
  async setCreate() {
    this.newObj.basicGate = {
      gateCd: this.formParams.gateCd,
      gateNm: this.formParams.gateNm,
      szlb: this.formParams.szlb,
      ssly: this.formParams.ssly,
      gczt: this.formParams.gczt,
      szhl: this.formParams.szhl,
      jzlb: this.formParams.jzlb,
      zdgzll: this.formParams.zdgzll,
      gldw: this.formParams.gldw,
      zgdw: this.formParams.zgdw,
      gsbm: this.formParams.gsbm,
      loc: this.formParams.loc,
      projScal: this.formParams.projScal,
      gateHoleNum: this.formParams.gateHoleNum,
      gateTw: this.formParams.gateTw,
      desGateQ: this.formParams.desGateQ,
      gk: this.formParams.gk,
      nt: this.formParams.nt,
      xzqq: this.formParams.xzqq,
      szly: this.formParams.szly,
      lon: this.formParams.lon, //经度
      lat: this.formParams.lat, //纬度
      location: this.formParams.location,
    };

    this.loading = true;
    let checkUrl = "wjServer/dataCenter/baseinfo/gate/cdIsExistedWhereAdd";
    let a = {
      gateCd: this.formParams.gateCd,
    };
    let checkData = await infoApi.onpage(a, checkUrl);
    if (!checkData.data) {
      let url = "wjServer/dataCenter/baseinfo/gate/addGate";
      infoApi.oncreate(this.newObj, url).then((data: any) => {
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
    let url = "wjServer/dataCenter/baseinfo/gate/editInfo";
    this.formParams.xzqq = this.formParams.xzqq.toString();
    this.newObj.basicGate = {
      gateCd: this.formParams.gateCd,
      gateNm: this.formParams.gateNm,
      szlb: this.formParams.szlb,
      ssly: this.formParams.ssly,
      gczt: this.formParams.gczt,
      szhl: this.formParams.szhl,
      jzlb: this.formParams.jzlb,
      zdgzll: this.formParams.zdgzll,
      gldw: this.formParams.gldw,
      zgdw: this.formParams.zgdw,
      gsbm: this.formParams.gsbm,
      loc: this.formParams.loc,
      projScal: this.formParams.projScal,
      gateHoleNum: this.formParams.gateHoleNum,
      gateTw: this.formParams.gateTw,
      desGateQ: this.formParams.desGateQ,
      gk: this.formParams.gk,
      nt: this.formParams.nt,
      xzqq: this.formParams.xzqq,
      szly: this.formParams.szly,
      lon: this.formParams.lon, //经度
      lat: this.formParams.lat, //纬度
      location: this.formParams.location,
    };
    infoApi.jsonUpdate(this.newObj, url).then((data: any) => {
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
      xzqq: "", //行政区域
      imgList: [],
    };
    this.btnFlag = "edit";
    this.modalTitle = "编辑";
    let gateCd = row.gateCd; //闸门编码
    let engType = row.gclb; //工程类别
    this.editInfo(gateCd, engType);
    this.markers = [];
  }
  // 详情
  async editInfo(ArgcGateCd: any, ArgcEngType: any) {
    let url = "wjServer/dataCenter/baseinfo/gate/getDetail";
    let params = {
      gateCd: ArgcGateCd,
      engType: ArgcEngType,
    };
    let data = await infoApi.getInfo(params, url);
    // 区域
    let arrxzqy = data.data.basicGate.xzqq.split(",");
    this.newString = data.data.basicGate.lon + "," + data.data.basicGate.lat;
    this.formParams = {
      gateCd: data.data.basicGate.gateCd,
      gateNm: data.data.basicGate.gateNm,
      szlb: data.data.basicGate.szlb,
      ssly: data.data.basicGate.ssly,
      gczt: data.data.basicGate.gczt,
      szhl: data.data.basicGate.szhl,
      jzlb: data.data.basicGate.jzlb,
      zdgzll: data.data.basicGate.zdgzll,
      gldw: data.data.basicGate.gldw,
      zgdw: data.data.basicGate.zgdw,
      gsbm: data.data.basicGate.gsbm,
      loc: data.data.basicGate.loc,
      projScal: data.data.basicGate.projScal,
      gateHoleNum: data.data.basicGate.gateHoleNum,
      gateTw: data.data.basicGate.gateTw,
      desGateQ: data.data.basicGate.desGateQ,
      gk: data.data.basicGate.gk,
      nt: data.data.basicGate.nt,
      szly: data.data.basicGate.szly, //所在流域
      xzqq: arrxzqy,
      lon: data.data.basicGate.lon,
      lat: data.data.basicGate.lat,
      location: this.newString,
    };
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
      title: "水闸编码",
      key: "gateCd",
    },
    {
      title: "水闸名称",
      key: "gateNm",
    },
    {
      title: "行政区域",
      key: "xzqq",
    },
    {
      title: "河流名称",
      key: "szhl",
    },
    {
      title: "闸孔数量",
      key: "gateHoleNum",
    },
    {
      title: "闸孔总净宽",
      key: "gateTw",
    },
    {
      title: "工程状态",
      key: "gczt",
    },
    {
      title: "泵站",
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

    // {
    //   title: "媒体",
    //   key: "mt",
    //   slot: "mt",
    // },
    // {
    //   title: "工程",
    //   key: "gc",
    //   slot: "gc",
    // },
    // {
    //   title: "监控",
    //   key: "jk",
    //   slot: "jk",
    // },
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
  stationParams: any = {
    pageNumber: "",
    pageSize: "",
    areaCode: "",
    riverCode: "",
    gateName: "",
  };
  mounted() {
    this.getStationType(); //测站类型
    this.onpage(); //获取页面信息
    this.getAreaCode(); //获取所属区域
    this.getRiverName(); //获取河流的名称
  }

  //获取下拉行政区域下拉
  async getAreaCode() {
    let data = await infoApi.getAreaCode();
    this.areaOptions = this.getTreeData([data.data]);
  }
  //   获取河流的名称
  async getRiverName() {
    let data = await infoApi.getRiverName();
    this.riverNameArry = data.data.map((item: any) => {
      return {
        value: item.rvCd,
        label: item.rvNm,
      };
    });
    //传给子组件选择框的数据
    this.chuan = this.riverNameArry;
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
    this.stationParams.pageNumber = this.pageParams.current;
    this.stationParams.pageSize = this.pageParams.pageSize;
    let url = "wjServer/dataCenter/baseinfo/gate/infoList";
    let data = await infoApi.onpage(this.stationParams, url);
    this.pageParams.total = parseInt(data.data.total);
    this.tableData = data.data.rows;
    this.loading = false;
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
    this.stationParams.gateName = val;
    this.onpage();
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
