const BASE_PATH = "views/dataCenter/pages";

export default {
  routers: [
    {
      path: "",
      redirect: "infoRiver",
    },
    {
      path: "infoRiver", //河道信息
      meta: {
        name: "infoRiver",
      },
      component: () => import(`@/${BASE_PATH}/basicData/infoRiver.vue`),
    },
    {
      path: "infoGate", //闸门信息
      meta: {
        name: "infoGate",
      },
      component: () => import(`@/${BASE_PATH}/basicData/infoGate.vue`),
    },
    {
      path: "infoWei", //圩区信息
      meta: {
        name: "infoWei",
      },
      component: () => import(`@/${BASE_PATH}/basicData/infoWei.vue`),
    },
    {
      path: "infoGuan", //灌区信息
      meta: {
        name: "infoGuan",
      },
      component: () => import(`@/${BASE_PATH}/basicData/infoGuan.vue`),
    },
    //---------------------------- 防汛抢险
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
      path: "bzcs", //避灾场所
      meta: {
        name: "bzcs",
      },
      component: () => import(`@/${BASE_PATH}/fxqxData/bzcs.vue`),
    },

    // ----------------养护模板
    {
      path: "mytemplate", //我的模板
      meta: {
        name: "mytemplate",
      },
      component: () => import(`@/${BASE_PATH}/template/MyTemplate.vue`),
    },
    {
      path: "publictemplate", //通用模板
      meta: {
        name: "publictemplate",
      },
      component: () => import(`@/${BASE_PATH}/template/PublicTemplate.vue`),
    },
    // 养护内容
    {
      path: "yhnr",
      meta: {
        name: "yhnr",
      },
      component: () => import(`@/${BASE_PATH}/basicData/Yhnr.vue`),
    },

    // ---------------------------------工程设施
    {
      path: "pump", // 泵机信息
      meta: {
        name: "infoPump",
      },
      component: () => import(`@/${BASE_PATH}/engineering/infoPump.vue`),
    },
    {
      path: "wushuibz", //泵站信息
      meta: {
        name: "wushuibz",
      },
      component: () => import(`@/${BASE_PATH}/engineering/wushuiBz.vue`),
    },
    {
      path: "infoDf", //堤防
      meta: {
        name: "infoDf",
      },
      component: () => import(`@/${BASE_PATH}/engineering/infoDf.vue`),
    },
    {
      path: "infoyld", //易捞点
      meta: {
        name: "infoyld",
      },
      component: () => import(`@/${BASE_PATH}/engineering/infoyld.vue`),
    },


    // ---------------组织管理
    {
      path: "userManage", //用户管理
      meta: {
        name: "userManage",
      },
      component: () => import(`@/${BASE_PATH}/organization/userManage.vue`),
    },
  ],
};
