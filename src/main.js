import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import store from "./store";
import "./assets/css/reset.css";
import "amfe-flexible";
import http from "@/utils/http";
import _interface from "@/utils/interface";
import cloneDeep from "lodash/cloneDeep";
Vue.use(Vue => {
  (requireContext => {
    const arr = requireContext.keys().map(requireContext);
    (arr || []).forEach(directive => {
      directive =
        directive.__esModule && directive.default
          ? directive.default
          : directive;
      Object.keys(directive).forEach(key => {
        Vue.directive(key, directive[key]);
      });
    });
  })(require.context("./directives", false, /^\.\/.*\.js$/));
});

Vue.prototype.http = http;
Vue.prototype.interface = _interface;
// Vue.component('paging',paging)
Vue.config.productionTip = false;

// 保存整站vuex本地储存初始状态
window.SITE_CONFIG.storeState = cloneDeep(store.state);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
