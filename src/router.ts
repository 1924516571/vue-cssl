import Vue from "vue";
import Router from "vue-router";

import homeRouters from "./router-config/home";
import homePageRouters from "./router-config/homePage"; //常熟首页
import dataCenterRouters from "./router-config/dataCenter";
import floodMessageRouters from "./router-config/floodMessage";
import geologyInformationRouters from "./router-config/geologyInformation";
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "",
      redirect: "/main",
    },
    {
      path: "/login",
      component: () => import("./views/Login.vue"),
    },
    {
      path: "/register",
      component: () => import("./views/Register.vue"),
    },
    {
      path: "/dp",
      component: () => import("./views/dp.vue"),
    },
    {
      //懒加载
      path: "/main",
      component: () => import("./layout/Main.vue"),
      children: [
        // {
        //   path: "",
        //   redirect: "home",
        // },
        {
          path: "",
          redirect: "homePage",
        },
        // 常熟首页
        {
          path: "homePage",
          meta: {
            name: "homePage",
          },
          component: () => import("@/views/homePage/Main.vue"),
          children: [...homePageRouters.routers], //这地方能取到数组中所有的值
        },
        {
          //首页
          path: "home",
          meta: {
            name: "home",
          },
          component: () => import("@/views/home/Main.vue"),
          children: [...homeRouters.routers],
        },
        {
          //数据中心
          path: "dataCenter",
          meta: {
            name: "dataCenter",
          },
          component: () => import("@/views/dataCenter/Main.vue"),
          children: [...dataCenterRouters.routers],
        },
        {
          //防汛决策
          path: "floodMessage",
          meta: {
            name: "floodMessage",
          },
          component: () => import("@/views/floodMessage/Main.vue"),
          children: [...floodMessageRouters.routers],
        },
        {
          //地理信息
          path: "geologyInformation",
          meta: {
            name: "geologyInformation",
          },
          component: () => import("@/views/geologyInformation/Main.vue"),
          children: [...geologyInformationRouters.routers],
        },
      ],
    },
  ],
});
