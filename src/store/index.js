import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

import Demo from "./Demo"; // 从 ./Demo 文件夹中引入 子模块

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    demo: Demo
    //   在 App.vue中调用时，...mapState("demo",["name"])
  }
});
