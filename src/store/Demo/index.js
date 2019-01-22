export default {
  state: {
    curAlg: "",
    algArr: ["逻辑回归", "神经网络", "线性回归"],
    stepSize: 0.1,
    stepTotal: 100,
    curOptimizer: "GD",
    optimizerArr: ["GD", "RMSProp", "Adadelta"],
    drawInterval: 20
  },
  mutations: {
    changeCurAlg(state, payload) {
      state.curAlg = payload;
    },
    changeCurOptimizer(state, payload) {
      state.curOptimizer = payload;
    },
    changeStepSize(state, payload) {
      state.stepSize = payload;
    },
    changeStepTotal(state, payload) {
      state.stepTotal = payload;
    },
    changeDrawInterval(state, payload) {
      state.drawInterval = payload;
    }
  },
  getters: {
    // getUNnameUpperCase(state) {
    //   return state.UName.toUpperCase();
    // }
  },
  namespaced: true

  //   在 .vue中调用时，
  //   computed: {
  //   ...mapState("demo",["name"]),
  //   ...mapGetters()

  // 需在 <script>中先 import {mapState, ...} from "vuex"
  //
};
