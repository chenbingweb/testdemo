import Vue from "vue";
import Router from "vue-router";
import store from "./store";
const Index = () => import("./view/index/index.vue");

Vue.use(Router);

const router = new Router({
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  base: "/",
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      component: Index,
      meta: {}
    },
    {
      path: "/index",
      name: "index",
      component: Index,
      meta: {}
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
  // scrollBehavior: () => ({ y: 0 }),
});

export default router;
