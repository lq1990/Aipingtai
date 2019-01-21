export default {
  state: {
    name: "abc"
  },
  mutations: {
    ChangeName(state, payload) {
      state.name = payload;
    }
  },
  getters: {
    getUNnameUpperCase(state) {
      return state.UName.toUpperCase();
    }
  },
  namespaced: true

  //   在 App.vue中调用时，
  //   computed: {
  //   ...mapState("demo",["name"]),
  //   ...mapGetters()

  // 需在 script中先 import {mapState, ...} from "vuex"
  //
};
