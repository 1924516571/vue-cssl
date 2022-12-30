const BASE_PATH = "views/dataCenter/pages";
export default {
  routers: [
    {
      path: "",
      redirect: "overview",
    },
    {
      path: "overview",
      meta: {
        name: "overview",
      },
      component: () => import("@/views/homePage/pages/Overview.vue"),
    },
    // 运行监管
    {
      path: "yxjg",
      meta: {
        name: "yxjg",
      },
      component: () => import("@/views/homePage/pages/Yxjg.vue"),
    },
    {
      path: "sq",
      meta: {
        name: "sq",
      },
      component: () => import("@/views/homePage/pages/Sq.vue"),
    },
    {
      path: "yq",
      meta: {
        name: "yq",
      },
      component: () => import("@/views/homePage/pages/Yq.vue"),
    },
    {
      path: "jyd",
      meta: {
        name: "jyd",
      },
      component: () => import("@/views/homePage/pages/Jyd.vue"),
    },
    {
      path: "weatherInfo",
      meta: {
        name: "weatherInfo",
      },
      component: () => import("@/views/homePage/pages/yjyb/WeatherInfo.vue"),
    },
    {
      path: "tfInfo",
      meta: {
        name: "tfInfo",
      },
      component: () => import("@/views/homePage/pages/yjyb/TfInfo.vue"),
    },
    // 防汛应急联系人
    {
      path: "yjPeople",
      meta: {
        name: "yjPeople",
      },
      component: () => import("@/views/floodMessage/pages/yjPeople.vue"),
    },
    // 直班人员
    {
      path: "zbPeople",
      meta: {
        name: "zbPeople",
      },
      component: () => import("@/views/floodMessage/pages/zbPeople.vue"),
    },
    // 应急预警管理
    {
      path: "yjyj",
      meta: {
        name: "yjyj",
      },
      component: () => import("@/views/floodMessage/pages/yjyj.vue"),
    },
    // 调度指令
    {
      path: "dispatchCom",
      meta: {
        name: "dispatchCom",
      },
      component: () => import("@/views/floodMessage/pages/dispatchCom.vue"),
    },
    // 物资储备
    {
      path: "wzcb",
      meta: {
        name: "wzcb",
      },
      component: () => import("@/views/floodMessage/pages/wzcb.vue"),
    },
    //  报警事件
    {
      path: "alarm",
      meta: {
        name: "alarm",
      },
      component: () => import("@/views/floodMessage/pages/Alarm.vue"),
    },
    // {
    //   path: "qxdw", //抢险队伍
    //   meta: {
    //     name: "qxdw",
    //   },
    //   component: () => import("@/views/dataCenter/pages/fxqxData/qxdw.vue"),
    // },
    // 水情分析
    {
      path: "waterAnalyse",
      meta: {
        name: "waterAnalyse",
      },
      component: () => import("@/views/floodMessage/pages/waterAnalyse.vue"),
    },
    // 雨情分析
    {
      path: "rainAnalyse",
      meta: {
        name: "rainAnalyse",
      },
      component: () => import("@/views/floodMessage/pages/rainAnalyse.vue"),
    },
    // 多站水情分析
    {
      path: "moreWaterAnalyse",
      meta: {
        name: "moreWaterAnalyse",
      },
      component: () => import("@/views/floodMessage/pages/moreWaterAnalyse.vue"),
    },
    // 多站雨情分析
    {
      path: "moreRainAnalyse",
      meta: {
        name: "moreRainAnalyse",
      },
      component: () => import("@/views/floodMessage/pages/moreRainAnalyse.vue"),
    },
    // 雨水关系
    {
      path: "rainRelationAnalyse",
      meta: {
        name: "rainRelationAnalyse",
      },
      component: () => import("@/views/floodMessage/pages/rainRelationAnalyse.vue"),
    },
    // 河道信息
    {
      path: "infoRiver",
      meta: {
        name: "infoRiver",
      },
      component: () => import("@/views/dataCenter/pages/basicData/infoRiver.vue"),
    },
    // 重点河道
    {
      path: "importantRiver",
      meta: {
        name: "importantRiver",
      },
      component: () => import("@/views/dataCenter/pages/basicData/importantRiver.vue"),
    },

    // 联圩信息
    {
      path: "infoLw",
      meta: {
        name: "infoLw",
      },
      component: () => import("@/views/dataCenter/pages/basicData/infoLw.vue"),
    },
    // 农桥信息
    {
      path: "infoNq",
      meta: {
        name: "infoNq",
      },
      component: () => import("@/views/dataCenter/pages/basicData/infoNq.vue"),
    },
    // 水闸信息
    {
      path: "infoWater",
      meta: {
        name: "infoWater",
      },
      component: () => import("@/views/dataCenter/pages/basicData/infoWater.vue"),
    },
    // 泵站基本信息
    {
      path: "infoBz",
      meta: {
        name: "infoBz",
      },
      component: () => import("@/views/dataCenter/pages/basicData/infoBz.vue"),
    },
    {
      path: "fxwz", //防汛物资
      meta: {
        name: "fxwz",
      },
      component: () => import(`@/${BASE_PATH}/fxqxData/fxwz.vue`),
    },
    {
      path: "wzck", //物资仓库
      meta: {
        name: "wzck",
      },
      component: () => import(`@/${BASE_PATH}/fxqxData/wzck.vue`),
    },
    {
      path: "qxdw", //抢险队伍
      meta: {
        name: "qxdw",
      },
      component: () => import(`@/${BASE_PATH}/fxqxData/qxdw.vue`),
    },
    {
      path: "videoCollect", //视频设备
      meta: {
        name: "videoCollect",
      },
      component: () => import(`@/${BASE_PATH}/basicData/VideoCollect.vue`),
    },
    {
      path: "waterqulity", //测站管理
      meta: {
        name: "waterqulity",
      },
      component: () => import(`@/${BASE_PATH}/basicData/Waterqulity.vue`),
    },
    {
      path: "hdVideo", //骨干河道
      meta: {
        name: "hdVideo",
      },
      component: () => import("@/views/video/pages/HdVideo.vue"),
    },
    {
      path: "wyhVideo", //望虞河视频
      meta: {
        name: "wyhVideo",
      },
      component: () => import("@/views/video/pages/WyhVideo.vue"),
    },
    {
      path: "cqVideo", //城区视频视频
      meta: {
        name: "cqVideo",
      },
      component: () => import("@/views/video/pages/CqVideo.vue"),
    },
    {
      path: "cjcVideo", //长江处视频
      meta: {
        name: "cjcVideo",
      },
      component: () => import("@/views/video/pages/CjcVideo.vue"),
    },
    {
      path: "newYldVideo", //新易涝点
      meta: {
        name: "newYldVideo",
      },
      component: () => import("@/views/video/pages/NewYldVideo.vue"),
    },
    {
      path: "xcljVideo", //下穿立交视频
      meta: {
        name: "xcljVideo",
      },
      component: () => import("@/views/video/pages/XcljVideo.vue"),
    },
  ],
};
