export default {
  state: {
    algArr: ["逻辑回归", "神经网络", "线性回归"],
    optimizerArr: ["GD", "RMSProp", "Adadelta"],
    curAlg: "",
    curAlgIdx: null, // 0,1,2 对应于 上面三个alg
    stepSize: 0.1,
    stepTotal: 100,
    curOptimizer: "GD",
    drawInterval: 40
  },
  mutations: {
    changeCurAlg(state, payload) {
      state.curAlg = payload;
    },
    changeCurAlgIdx(state, payload) {
      state.curAlgIdx = payload;
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
