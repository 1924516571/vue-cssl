<template>
  <div class="work-view">
    <div class="rotateImg">
      <!-- <map-manage @mapZoom="mapZoom" ref="maps">
            <template v-slot:markerlayer>
              <ol-flash v-for="(item, index) in coordList" :key="index" :coords="item" :loops="3" :duration="3000" :radius-range="[5, 30]"> </ol-flash>
            </template>
          </map-manage> -->
      <el-carousel autoplay height="218px" :interval="5000">
        <el-carousel-item v-for="(item, index) in picList" :key="index">
          <div>
            <img :src="item.src" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="work">
      <div class="work-tab">
        <div class="work-tab-item">
          <tab-switch :tabs="nav" @get-tab="getNav"></tab-switch>
        </div>

        <!-- <div
          :class="{ active: activeNav == index }"
          v-for="(item, index) in nav"
          :key="index"
          @click="getNav(index)"
        >
          <span>{{ item }}</span>
        </div> -->
      </div>
      <div class="work-content scroll">
        <div class="work-content-item" v-for="(item, index) in list" :key="index" @click="getItem(item)">
          <div class="title">
            <span>{{ item.title }}</span>
          </div>
          <div class="paragraph">
            <span>
              {{ item.content }}
            </span>
          </div>
          <div class="time">
            <span>发布时间</span>
            <span>{{ item.time }}</span>
          </div>
        </div>
      </div>
    </div>

    <news-detail :model="model" :row="newsItem" @toggle="toggle"></news-detail>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Carousel, CarouselItem } from "element-ui";
import { TabSwitch } from "@/components";
import NewsDetail from "./NewsDetail.vue";
import { getBzIcon } from "@/constants/mapIcon";

import { namespace } from "vuex-class";
import { coordinateTransform } from "@suc/monch";
import { onImageLoad } from "@/api/public";
import { infoApi } from "@/api";
import bus from "@/eventBus";
// import { getPage } from '../../../../api/news';

const mapStore = namespace("mapStore");
@Component({
  components: {
    TabSwitch,
    NewsDetail,
    ElCarousel: Carousel,
    ElCarouselItem: CarouselItem,
  },
})
export default class WorkDynamic extends Vue {
  nav: any = ["工作动态", "工作简报", "媒体聚焦"];
  activeNav: number = 0;
  pageParams: any = {
    type: "1",
  };
  model: boolean = false;
  newsItem: any = {};
  getItem(item: any) {
    // this.showImgNews(item.ID);
    console.log(item,"ooo");
    
    this.model = true;
    this.newsItem = item;
  }

  toggle(val: boolean) {
    this.model = val;
  }

  getNav(index: number) {
    this.activeNav = index;
    this.pageParams.type = index + 1;
    this.getPage();
  }
  name: any = [];
  series: any = [];
  @mapStore.State markers: any;
  @mapStore.Mutation setMarkers: any;
  MapInfo: any = {
    info: {},
    coords: [120.27869688218249, 31.685617674794585],
    offset: [0, -40],
    show: false,
  };

  list: any[] = [
    {
      title: "我市首个环境检测机构开放日活动成功举办",
      content: "10月25日，由南京市生态环境局组织的“环境检测机构开放日”活动在江苏雁蓝检测科技有限公司举行。活动日当天邀请了许多家相关机构参加",
      time: "2019-10-25 14:00",
    },
    {
      title: "我市首个环境检测机构开放日活动成功举办",
      content: "10月25日，由南京市生态环境局组织的“环境检测机构开放日”活动在江苏雁蓝检测科技有限公司举行。活动日当天邀请了许多家相关机构参加",
      time: "2019-10-25 14:00",
    },
    {
      title: "我市首个环境检测机构开放日活动成功举办",
      content: "10月25日，由南京市生态环境局组织的“环境检测机构开放日”活动在江苏雁蓝检测科技有限公司举行。活动日当天邀请了许多家相关机构参加",
      time: "2019-10-25 14:00",
    },
    {
      title: "我市首个环境检测机构开放日活动成功举办",
      content: "10月25日，由南京市生态环境局组织的“环境检测机构开放日”活动在江苏雁蓝检测科技有限公司举行。活动日当天邀请了许多家相关机构参加",
      time: "2019-10-25 14:00",
    },
    {
      title: "我市首个环境检测机构开放日活动成功举办",
      content: "10月25日，由南京市生态环境局组织的“环境检测机构开放日”活动在江苏雁蓝检测科技有限公司举行。活动日当天邀请了许多家相关机构参加",
      time: "2019-10-25 14:00",
    },
  ];

  //  地图点位数组
  coordList: any = [];
  mapZoom(nva: number, ona: number) {
    let scale = 0.5;
    if (nva == 13) {
      scale = 0.6;
    } else if (nva == 14) {
      scale = 0.7;
    } else if (nva >= 15) {
      scale = 1;
    }
    this.markers.forEach((it: any) => {
      it.style.image.icon.scale = scale;
    });
    this.setMarkers(this.markers);
  }
  colorList = ["#9effff", "#73DD39", "#fe9a", "#F56948", "#9E87FF"];

  mounted() {
    this.getBrother();
    this.getLocation([120.27869688218249, 31.685617674794585]);
    this.getInfo();
    // this.getCarouselImg(); //获取轮播图片
    // this.getPage();
  }

  async getPage() {
    this.list = [];
    //  const url = 'jnsw/news/page'
    //  	infoApi.getWithParam(url,this.pageParams).then((data: any) => {
    // 	this.list = data.data
    // 		? data.data.map((e: any) => {
    // 				let item = {
    // 					title: e.TITLE,
    // 					content: e.CONTENTNOSTYLE || e.CONTENT,
    // 					content1: e.CONTENT,
    // 					time: e.GMTCREATE,
    // 					PUBLISHER: e.PUBLISHER,
    // 					ID: e.ID,
    // 					FILEIDS: e.FILEIDS,
    // 				};
    // 				return item;
    // 		  })
    // 		: [];
    // });
    this.list = [
      {
        title: "江宁开发区防汛防台指挥部  防汛简报第一期",
        content: "江宁开发区防汛防台指挥部 防汛简报第一期\n",
        content1: "<p>江宁开发区防汛防台指挥部&nbsp;防汛简报第一期</p>",
        time: "2020-07-12 14:31:21",
        PUBLISHER: "",
        ID: "6768f2ff108d4c92ab326c09d15dfd83",
        FILEIDS: [
          {
            PATH: "newsfj",
            STOREFJMC: "16171012742836.jpg",
            ID: "a0dc456d720c42bca1d856e8cf57557b",
            MC: "6",
            WJGS: "jpg",
          },
        ],
      },
      {
        title: "南京市江宁区秣陵街道新跃泵站翻建工程（水下阶段）验收",
        content:
          "4月9日，江宁区水务局组织召开江宁新跃泵站翻建工程水下阶段验收技术性检查会，项目管理、设计等单位的代表和特邀专家参加了此次会议。 新跃泵站翻建工程位于江宁区秣陵街道西旺社区，云台山河右岸。新跃泵站采用堤后式布置，主要由前池、泵房、高位水池、出水箱涵、平配电房及管理房等组成， 泵房内安装有7台潜水轴流泵，总装机容量1960千瓦，设计抽水能力达到20m³/s。新跃泵站的建成将进一步提高云台山河流域的排灌能力，补齐流域防洪短板。 专家组查看了工程现场，听取了成成建设等单位的汇报，查阅了工程资料。经讨论，认为南京市江宁区秣陵街道新跃泵站翻建工程水下部分基本按批复实施完成，工程质量符合设计和规范要求，已具备水下阶段验收条件，可提交验收。\n",
        content1:
          "<p>4月9日，江宁区水务局组织召开江宁新跃泵站翻建工程水下阶段验收技术性检查会，项目管理、设计等单位的代表和特邀专家参加了此次会议。 新跃泵站翻建工程位于江宁区秣陵街道西旺社区，云台山河右岸。新跃泵站采用堤后式布置，主要由前池、泵房、高位水池、出水箱涵、平配电房及管理房等组成， 泵房内安装有7台潜水轴流泵，总装机容量1960千瓦，设计抽水能力达到20m³/s。新跃泵站的建成将进一步提高云台山河流域的排灌能力，补齐流域防洪短板。 专家组查看了工程现场，听取了成成建设等单位的汇报，查阅了工程资料。经讨论，认为南京市江宁区秣陵街道新跃泵站翻建工程水下部分基本按批复实施完成，工程质量符合设计和规范要求，已具备水下阶段验收条件，可提交验收。</p>",
        time: "2020-04-13 14:43:28",
        PUBLISHER: "江宁区水务局",
        ID: "9",
        FILEIDS: [],
      },
      {
        title: "江宁区水务局组织召开《江宁区小型水库和中型水闸工程划界工作技术设计书》评审会",
        content:
          "为推进江宁区小型水库和中型水闸确权划界工作，4月9日，江宁区水务局主持召开了《江宁区小型水库和中型水闸工程划界技术设计书》评审会，省市专家、市规划与自然资源局江宁分局、区财政局、各街道水务站、项目编制单位参加了会议。 会议成立了专家组，听取了编制单位江苏省工程勘测研究院有限公司关于技术设计书的汇报，各街道水务站对设计书的内容结合实际提出了问题和建议。经过认真讨论，专家组最终形成意见：编制单位编制的技术设计书符合相关技术标准，满足项目实施要求。并提出了相关建议：后期要完善基础资料，依据实施方案进一步复核水库管理范围线；加强项目实施过程中的质量控制，保证工作进度和成果质量。 在接下来的工作中，江宁区将以此次评审会为契机，结合江宁区小型水库和中型水闸工程划界实际，针对专家组提出的意见和建议，督促编制单位进行完善和整改，做好后期项目实施工作。\n",
        content1:
          "<p>为推进江宁区小型水库和中型水闸确权划界工作，4月9日，江宁区水务局主持召开了《江宁区小型水库和中型水闸工程划界技术设计书》评审会，省市专家、市规划与自然资源局江宁分局、区财政局、各街道水务站、项目编制单位参加了会议。 会议成立了专家组，听取了编制单位江苏省工程勘测研究院有限公司关于技术设计书的汇报，各街道水务站对设计书的内容结合实际提出了问题和建议。经过认真讨论，专家组最终形成意见：编制单位编制的技术设计书符合相关技术标准，满足项目实施要求。并提出了相关建议：后期要完善基础资料，依据实施方案进一步复核水库管理范围线；加强项目实施过程中的质量控制，保证工作进度和成果质量。 在接下来的工作中，江宁区将以此次评审会为契机，结合江宁区小型水库和中型水闸工程划界实际，针对专家组提出的意见和建议，督促编制单位进行完善和整改，做好后期项目实施工作。</p>",
        time: "2020-04-13 14:41:28",
        PUBLISHER: "江宁区水务局",
        ID: "10",
        FILEIDS: [],
      },
      {
        title: "“以战代训、学用结合”——江宁区退役军人事务局党员冬训实战在防疫主战场",
        content:
          "疫情期间，基层党员冬训如何进行？江宁区退役军人事务局将冬训课堂搬到了防疫一线，鼓励党员“以战代训”，践行初心使命，在防疫主战场亮身份、当先锋、作表率。 线上课堂讲好理论课 为抓实疫情防控期间党员冬训学习，江宁区退役军人事务局党总支变线下集中学为线上推送学，全体党员干部充分利用“学习强国”、微信工作群开展理论学习。每日推送学习任务，不间断跟进中央和省市区委的决策部署和会议精神，以及当前的疫情防控小知识、疫情最新动态等，线上课堂已成为退役军人事务局党员冬训学习的重要阵地。 此外，录制“点赞中国之治”演讲微视频、“清明云上祭”网上祭英烈活动、献血抗疫、网上捐款支援武汉等活动也在全区广泛动员进行，成为党员冬训理论学习的新内容。 疫情一线上好实践课 “若有战，召必回！”这是每一名退役军人内心庄重的承诺。疫情发生后，江宁区退役军人事务局向全区退役军人系统党员、退役军人发放《“抗击疫情党员先行”倡议书》。在党员带头的影响下，全区3000多名退役军人冲上一线，201个社区均成立民兵先锋队，全面参与疫情防控工作，奋战在疫情防控第一线。 杨柳湖社区张家渡村82岁、60年党龄的退役军人高功富，主动要求投入到疫情防控工作中，带头冲锋在防疫第一线。在湖熟街道服务站，44名退役军人参加对外省来宁人员排查461人次、22名退役军人参加对公共区域进行消毒、22名退役军人对外省来宁居家隔离人员代购物资等服务。他们用实际行动扮演着基层“逆行者”的角色。 党员带头诠释责任与担当 除了线上理论学习和疫情一线的实践外，疫情期间，党员和退役军人们也纷纷献出了自己的一份爱心，为冬训课堂注入暖心力量。 河西社区抗美援朝老战士老党员王义胜捐款2000元用于购买防疫物资。退役军人吴成新，免费腾出自家宾馆34个房间给湖熟街道作为集中医学观察点。秣陵街道退役军人钱昌福，为社区捐赠口罩5100个、84消毒液120瓶、电动喷雾器4个。据统计，江宁区退役军人共捐款28800元，捐赠口罩9310个、消毒水2.5吨、医用酒精200余升、方便面、八宝粥等食品830箱。 江宁区退役军人事务局相关负责人表示，广大党员在这场冬训中冲锋在前，志愿奉献，真正把疫情防控作为践行宗旨意识的“主战场”、锤炼理想信念的“大熔炉”、体现责任担当的“磨刀石”，取得了实实在在的冬训成效。\n",
        content1:
          "<p>疫情期间，基层党员冬训如何进行？江宁区退役军人事务局将冬训课堂搬到了防疫一线，鼓励党员“以战代训”，践行初心使命，在防疫主战场亮身份、当先锋、作表率。 线上课堂讲好理论课 为抓实疫情防控期间党员冬训学习，江宁区退役军人事务局党总支变线下集中学为线上推送学，全体党员干部充分利用“学习强国”、微信工作群开展理论学习。每日推送学习任务，不间断跟进中央和省市区委的决策部署和会议精神，以及当前的疫情防控小知识、疫情最新动态等，线上课堂已成为退役军人事务局党员冬训学习的重要阵地。 此外，录制“点赞中国之治”演讲微视频、“清明云上祭”网上祭英烈活动、献血抗疫、网上捐款支援武汉等活动也在全区广泛动员进行，成为党员冬训理论学习的新内容。 疫情一线上好实践课 “若有战，召必回！”这是每一名退役军人内心庄重的承诺。疫情发生后，江宁区退役军人事务局向全区退役军人系统党员、退役军人发放《“抗击疫情党员先行”倡议书》。在党员带头的影响下，全区3000多名退役军人冲上一线，201个社区均成立民兵先锋队，全面参与疫情防控工作，奋战在疫情防控第一线。 杨柳湖社区张家渡村82岁、60年党龄的退役军人高功富，主动要求投入到疫情防控工作中，带头冲锋在防疫第一线。在湖熟街道服务站，44名退役军人参加对外省来宁人员排查461人次、22名退役军人参加对公共区域进行消毒、22名退役军人对外省来宁居家隔离人员代购物资等服务。他们用实际行动扮演着基层“逆行者”的角色。 党员带头诠释责任与担当 除了线上理论学习和疫情一线的实践外，疫情期间，党员和退役军人们也纷纷献出了自己的一份爱心，为冬训课堂注入暖心力量。 河西社区抗美援朝老战士老党员王义胜捐款2000元用于购买防疫物资。退役军人吴成新，免费腾出自家宾馆34个房间给湖熟街道作为集中医学观察点。秣陵街道退役军人钱昌福，为社区捐赠口罩5100个、84消毒液120瓶、电动喷雾器4个。据统计，江宁区退役军人共捐款28800元，捐赠口罩9310个、消毒水2.5吨、医用酒精200余升、方便面、八宝粥等食品830箱。 江宁区退役军人事务局相关负责人表示，广大党员在这场冬训中冲锋在前，志愿奉献，真正把疫情防控作为践行宗旨意识的“主战场”、锤炼理想信念的“大熔炉”、体现责任担当的“磨刀石”，取得了实实在在的冬训成效。</p>",
        time: "2020-04-13 11:12:28",
        PUBLISHER: "区退役军人事务局",
        ID: "11",
        FILEIDS: [],
      },
      {
        title: "“以战代训、学用结合”——江宁区退役军人事务局党员冬训实战在防疫主战场",
        content:
          "疫情期间，基层党员冬训如何进行？江宁区退役军人事务局将冬训课堂搬到了防疫一线，鼓励党员“以战代训”，践行初心使命，在防疫主战场亮身份、当先锋、作表率。 线上课堂讲好理论课 为抓实疫情防控期间党员冬训学习，江宁区退役军人事务局党总支变线下集中学为线上推送学，全体党员干部充分利用“学习强国”、微信工作群开展理论学习。每日推送学习任务，不间断跟进中央和省市区委的决策部署和会议精神，以及当前的疫情防控小知识、疫情最新动态等，线上课堂已成为退役军人事务局党员冬训学习的重要阵地。 此外，录制“点赞中国之治”演讲微视频、“清明云上祭”网上祭英烈活动、献血抗疫、网上捐款支援武汉等活动也在全区广泛动员进行，成为党员冬训理论学习的新内容。 疫情一线上好实践课 “若有战，召必回！”这是每一名退役军人内心庄重的承诺。疫情发生后，江宁区退役军人事务局向全区退役军人系统党员、退役军人发放《“抗击疫情党员先行”倡议书》。在党员带头的影响下，全区3000多名退役军人冲上一线，201个社区均成立民兵先锋队，全面参与疫情防控工作，奋战在疫情防控第一线。 杨柳湖社区张家渡村82岁、60年党龄的退役军人高功富，主动要求投入到疫情防控工作中，带头冲锋在防疫第一线。在湖熟街道服务站，44名退役军人参加对外省来宁人员排查461人次、22名退役军人参加对公共区域进行消毒、22名退役军人对外省来宁居家隔离人员代购物资等服务。他们用实际行动扮演着基层“逆行者”的角色。 党员带头诠释责任与担当 除了线上理论学习和疫情一线的实践外，疫情期间，党员和退役军人们也纷纷献出了自己的一份爱心，为冬训课堂注入暖心力量。 河西社区抗美援朝老战士老党员王义胜捐款2000元用于购买防疫物资。退役军人吴成新，免费腾出自家宾馆34个房间给湖熟街道作为集中医学观察点。秣陵街道退役军人钱昌福，为社区捐赠口罩5100个、84消毒液120瓶、电动喷雾器4个。据统计，江宁区退役军人共捐款28800元，捐赠口罩9310个、消毒水2.5吨、医用酒精200余升、方便面、八宝粥等食品830箱。 江宁区退役军人事务局相关负责人表示，广大党员在这场冬训中冲锋在前，志愿奉献，真正把疫情防控作为践行宗旨意识的“主战场”、锤炼理想信念的“大熔炉”、体现责任担当的“磨刀石”，取得了实实在在的冬训成效。\n",
        content1:
          "<p>疫情期间，基层党员冬训如何进行？江宁区退役军人事务局将冬训课堂搬到了防疫一线，鼓励党员“以战代训”，践行初心使命，在防疫主战场亮身份、当先锋、作表率。 线上课堂讲好理论课 为抓实疫情防控期间党员冬训学习，江宁区退役军人事务局党总支变线下集中学为线上推送学，全体党员干部充分利用“学习强国”、微信工作群开展理论学习。每日推送学习任务，不间断跟进中央和省市区委的决策部署和会议精神，以及当前的疫情防控小知识、疫情最新动态等，线上课堂已成为退役军人事务局党员冬训学习的重要阵地。 此外，录制“点赞中国之治”演讲微视频、“清明云上祭”网上祭英烈活动、献血抗疫、网上捐款支援武汉等活动也在全区广泛动员进行，成为党员冬训理论学习的新内容。 疫情一线上好实践课 “若有战，召必回！”这是每一名退役军人内心庄重的承诺。疫情发生后，江宁区退役军人事务局向全区退役军人系统党员、退役军人发放《“抗击疫情党员先行”倡议书》。在党员带头的影响下，全区3000多名退役军人冲上一线，201个社区均成立民兵先锋队，全面参与疫情防控工作，奋战在疫情防控第一线。 杨柳湖社区张家渡村82岁、60年党龄的退役军人高功富，主动要求投入到疫情防控工作中，带头冲锋在防疫第一线。在湖熟街道服务站，44名退役军人参加对外省来宁人员排查461人次、22名退役军人参加对公共区域进行消毒、22名退役军人对外省来宁居家隔离人员代购物资等服务。他们用实际行动扮演着基层“逆行者”的角色。 党员带头诠释责任与担当 除了线上理论学习和疫情一线的实践外，疫情期间，党员和退役军人们也纷纷献出了自己的一份爱心，为冬训课堂注入暖心力量。 河西社区抗美援朝老战士老党员王义胜捐款2000元用于购买防疫物资。退役军人吴成新，免费腾出自家宾馆34个房间给湖熟街道作为集中医学观察点。秣陵街道退役军人钱昌福，为社区捐赠口罩5100个、84消毒液120瓶、电动喷雾器4个。据统计，江宁区退役军人共捐款28800元，捐赠口罩9310个、消毒水2.5吨、医用酒精200余升、方便面、八宝粥等食品830箱。 江宁区退役军人事务局相关负责人表示，广大党员在这场冬训中冲锋在前，志愿奉献，真正把疫情防控作为践行宗旨意识的“主战场”、锤炼理想信念的“大熔炉”、体现责任担当的“磨刀石”，取得了实实在在的冬训成效。</p>",
        time: "2020-04-13 11:12:28",
        PUBLISHER: "区退役军人事务局",
        ID: "11",
        FILEIDS: [],
      },
    ];
  }

  async getBrother() {
    bus.$on("sendEvent", (data: any) => {
      let markerArr = data.warningPoints.map((item: any, index: number) => {
        return [item.jd, item.wd];
      });
      this.coordList = markerArr;
      if (this.coordList.length > 0) {
        this.getLocation(this.coordList[0]);
      } else {
        this.getLocation([120.27869688218249, 31.685617674794585]);
      }
      let marker = data.warningPoints.map((item: any, index: number) => {
        return {
          id: "bz" + index,
          name: item.stationName,
          lon: item.jd,
          lat: item.wd,
          coords: [item.jd, item.wd],
          info: item,
          style: {
            image: {
              icon: {
                scale: 0.5,
                anchor: [0.5, 1],
                src: getBzIcon("在线", "N"),
              },
            },
          },
        };
      });
      this.setMarkers(marker);
    });
  }

  async getInfo() {
    bus.$on("sendEvent", (data: any) => {
      for (let i = 0; i < data.aqLineDtoList.length; i++) {
        this.name = data.aqLineDtoList[i].bznm;
        this.series.push({
          name: data.aqLineDtoList[i].bznm,
          type: "line",
          data: data.aqLineDtoList[i].line,
          symbolSize: 1,
          symbol: "circle",
          smooth: true,
          yAxisIndex: 0,
          showSymbol: false,
          lineStyle: {
            width: 4,
            color: this.colorList[i],
            shadowColor: this.colorList[i],
            shadowBlur: 10,
            shadowOffsetY: 20,
          },
          itemStyle: {
            normal: {
              color: this.colorList[i],
              borderColor: this.colorList[i],
            },
          },
        });
      }
    });
  }

  //地图定位
  getLocation(coords: any) {
    const maps: any = this.$refs.maps;
    const mapRoot: any = maps.$refs.mapObject;
    const tranPosN = coordinateTransform(coords, "EPSG:4326", "EPSG:3857");
    mapRoot.$view.animate({
      center: tranPosN,
    });
  }
  // 参数
  params: any = {
    userId: localStorage.getItem("userId"),
    roleName: localStorage.getItem("roleName"),
    areaCode: localStorage.getItem("areaCode"),
  };

  // 轮播图
  picList: any[] = [
    {
      src: require("@/assets/home/news.png"),
    },
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242326224L3-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647494755&t=255f07967e2fb3ae1893f73e703781aa",
    },
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F092919113248%2F1Z929113248-8-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647498373&t=dd2089f06e9f9307c83963d629bd4819",
    },
  ];
  async getCarouselInfo() {
    let url = "/jnsw/news/getImg";
    return this.$http
      .get(url)
      .then((res) => {
        return res.data;
      })
      .catch((err: any) => {
        console.log(err.data.message);
      });
  }

  async getCarouselImg() {
    let that = this;
    that.picList = [];
    // let data = await this.getCarouselInfo();
    let data = [
      {
        ID: "c9487f48542e4e859231cbaf0ad69445",
        MC: "5",
        GS: "jpg",
        DX: 5873530,
        SCR: "2",
        WZID: "10",
        STORENAME: "16171013871435.jpg",
        STOREPATH: "newsfm",
        GMT_CREATE: "2021-03-30 18:49:47",
        TITLE: "江宁区水务局组织召开《江宁区小型水库和中型水闸工程划界工作技术设计书》评审会",
      },
      {
        ID: "dc9f3a88442d47419b83651e4f5911f9",
        MC: "4",
        GS: "jpg",
        DX: 1763745,
        SCR: "2",
        WZID: "9",
        STORENAME: "16171013720384.jpg",
        STOREPATH: "newsfm",
        GMT_CREATE: "2021-03-30 18:49:32",
        TITLE: "南京市江宁区秣陵街道新跃泵站翻建工程（水下阶段）验收",
      },
      {
        ID: "3088a409a2f44b14b1590dc0ea11fb0a",
        MC: "2",
        GS: "jpg",
        DX: 4084932,
        SCR: "2",
        WZID: "5b229a97f61440d19582bd73aab97d8a",
        STORENAME: "16171013058602.jpg",
        STOREPATH: "newsfm",
        GMT_CREATE: "2021-03-30 18:48:26",
        TITLE: "江宁开发区智慧水务信息",
      },
      {
        ID: "5ebfcc9d758d4050a1f28b8a0ba28fe7",
        MC: "1",
        GS: "jpg",
        DX: 9787656,
        SCR: "2",
        WZID: "6768f2ff108d4c92ab326c09d15dfd83",
        STORENAME: "16171012724621.jpg",
        STOREPATH: "newsfm",
        GMT_CREATE: "2021-03-30 18:47:52",
        TITLE: "江宁开发区防汛防台指挥部  防汛简报第一期",
      },
    ];

    for (let i = 0; i < data.length; i++) {
      let url = `/jnsw/news/downloadImg/${data[i].ID}`;
      let q = await onImageLoad(url);
      // that.picList.push({
      //   id: data[i].WZID,
      //   src: q,
      // });
      // console.log(that.picList, "===");
      that.picList = [
        {
          id: "10",
          src: "blob:http://localhost:8081/639fb5ab-7bb6-41d2-8e89-66cb69ed5abc",
        },
        {
          id: "9",
          src: "blob:http://localhost:8081/7ccc46b3-be83-4f8d-b994-a0e6bf6ec450",
        },
        {
          id: "5b229a97f61440d19582bd73aab97d8a",
          src: "blob:http://localhost:8081/10d6288f-e29a-49f0-b0ce-d50eb7023c8e",
        },
        {
          id: "6768f2ff108d4c92ab326c09d15dfd83",
          src: "blob:http://localhost:8081/1b17ea4e-1439-4239-b434-4486aac53291",
        },
      ];
    }
  }

  //  async  showImgNews(){

  // }
}
</script>
<style lang="scss" scoped>
.work-view {
  width: 100%;
  height: 100%;
  padding: 14px;
  .rotateImg {
    // height: 30%;
    height: 218px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .work {
    padding-top: 15px;
    height: 75%;
    &-tab {
      display: flex;
      justify-content: center;
      border-bottom: 1px solid #dde4ed;
      font-size: 14px;
      color: #666;
      &-item {
        width: 86%;
      }
    }
    &-content {
      padding: 14px 0;
      // height: calc(100% - 32px);
      height: 100%;
      overflow: auto;
      &-item {
        // padding-bottom: 10px;
        padding: 5px 0 10px;
        border-bottom: 1px solid #dde4ed;
        cursor: pointer;
      }
      .title {
        font-size: 16px;
        color: #333;
      }
      .paragraph {
        padding: 8px 0;
        color: #666;
        // span {
        //   overflow: hidden;
        //   display: -webkit-box;
        //   -webkit-line-clamp: 3;
        //   -webkit-box-orient: vertical;
        // }
      }
      .time {
        color: #999;
      }
    }
  }
}
</style>
