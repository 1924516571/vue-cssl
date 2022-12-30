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
      component: () => import("@/views/geologyInformation/pages/overView.vue"),
    },
  ],
};
