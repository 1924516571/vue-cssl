export default {
  routers: [
    {
      path: "",
      redirect: "overView",
    },
    {
      path: "overView",
      meta: {
        name: "overView",
      },
      component: () => import("@/views/floodMessage/pages/overView.vue"),
    },
    {
      path: "waterAnalyse",
      meta: {
        name: "waterAnalyse",
      },
      component: () => import("@/views/floodMessage/pages/waterAnalyse.vue"),
    },
    {
      path: "rainAnalyse",
      meta: {
        name: "rainAnalyse",
      },
      component: () => import("@/views/floodMessage/pages/rainAnalyse.vue"),
    },
    {
      path: "moreWaterAnalyse",
      meta: {
        name: "moreWaterAnalyse",
      },
      component: () => import("@/views/floodMessage/pages/moreWaterAnalyse.vue"),
    },
    {
      path: "moreRainAnalyse",
      meta: {
        name: "moreRainAnalyse",
      },
      component: () => import("@/views/floodMessage/pages/moreRainAnalyse.vue"),
    },
    {
      path: "moreWaterDateReport",
      meta: {
        name: "moreWaterDateReport",
      },
      component: () => import("@/views/floodMessage/pages/moreWaterDateReport.vue"),
    },
    {
      path: "rainRelationAnalyse",
      meta: {
        name: "rainRelationAnalyse",
      },
      component: () => import("@/views/floodMessage/pages/rainRelationAnalyse.vue"),
    },
    {
      path: "bzRun",
      meta: {
        name: "bzRun",
      },
      component: () => import("@/views/floodMessage/pages/bzRun.vue"),
    },
    {
      path: "bzRunRecord",
      meta: {
        name: "bzRunRecord",
      },
      component: () => import("@/views/floodMessage/pages/bzRunRecord.vue"),
    },
    {
      path: "zbzRecord",
      meta: {
        name: "zbzRecord",
      },
      component: () => import("@/views/floodMessage/pages/zbzRecord.vue"),
    },
    {
      path: "jianBao",
      meta: {
        name: "jianBao",
      },
      component: () => import("@/views/floodMessage/pages/jianBao.vue"),
    },
    {
      path: "reportflood",
      meta: {
        name: "reportflood",
      },
      component: () => import("@/views/floodMessage/pages/ReportFlood.vue"),
    },
    {
      path: "waterLevelTable",
      meta: {
        name: "waterLevelTable",
      },
      component: () => import("@/views/floodMessage/pages/waterLevelTable.vue"),
    },
    {
      path: "disasterCount",
      meta: {
        name: "disasterCount",
      },
      component: () => import("@/views/floodMessage/pages/disasterCount.vue"),
    },
    {
      path: "yjPeople",
      meta: {
        name: "yjPeople",
      },
      component: () => import("@/views/floodMessage/pages/yjPeople.vue"),
    },
    {
      path: "zbPeople",
      meta: {
        name: "zbPeople",
      },
      component: () => import("@/views/floodMessage/pages/zbPeople.vue"),
    },
    {
      path: "searchCount",
      meta: {
        name: "searchCount",
      },
      component: () => import("@/views/floodMessage/pages/searchCount.vue"),
    },
    {
      path: "danger",
      meta: {
        name: "danger",
      },
      component: () => import("@/views/floodMessage/pages/danger.vue"),
    },
    {
      path: "fxya",
      meta: {
        name: "fxya",
      },
      component: () => import("@/views/floodMessage/pages/fxya.vue"),
    },
    {
      path: "yjyj",
      meta: {
        name: "yjyj",
      },
      component: () => import("@/views/floodMessage/pages/yjyj.vue"),
    },
    {
      path: "hqcl",
      meta: {
        name: "hqcl",
      },
      component: () => import("@/views/floodMessage/pages/hqcl.vue"),
    },
    {
      path: "alarm",
      meta: {
        name: "alarm",
      },
      component: () => import("@/views/floodMessage/pages/Alarm.vue"),
    },
    {
      path: "fault",
      meta: {
        name: "fault",
      },
      component: () => import("@/views/floodMessage/pages/Fault.vue"),
    },
    {
      path: "record",
      meta: {
        name: "record",
      },
      component: () => import("@/views/floodMessage/pages/Record.vue"),
    },
    {
      path: "operateManage",
      meta: {
        name: "operateManage",
      },
      component: () => import("@/views/floodMessage/pages/OperateManage.vue"),
    },
    {
      path: "taskProcess",
      meta: {
        name: "taskProcess",
      },
      component: () => import("@/views/floodMessage/pages/TaskProcess.vue"),
    },
    {
      path: "video",
      meta: {
        name: "video",
      },
      component: () => import("@/views/floodMessage/pages/video.vue"),
    },
    {
      path: "jxdh",
      meta: {
        name: "jxdh",
      },
      component: () => import("@/views/floodMessage/pages/Jxdh.vue"),
    },
  ],
};
