import Vue from "vue";
import Vuex from "vuex";
import cloneDeep from "lodash/cloneDeep";
import user from "./modules/user";
import Cookies from "js-cookie";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: undefined,
    uid: undefined,
    num: 0
  },
  getters: {
    
  },
  mutations: {
  },
  actions: {
    
  },
  modules: {
    user
  }
});
