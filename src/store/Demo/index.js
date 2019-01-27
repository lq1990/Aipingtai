export default {
  state: {
    algArr: ["逻辑回归", "神经网络", "线性回归"],
    optimizerArr: ["GD", "RMSProp", "Adadelta"],
    curAlg: "",
    curAlgIdx: null, // 0,1,2 对应于 上面三个alg
    stepSize: 0.1,
    stepTotal: 100,
    curOptimizer: "GD",
    lambda: 0, // 惩罚系数
    drawInterval: 20,
    isCompareOptimizer: false,
    hiddenLayerList: [6] // NN输入层、隐层、输出层 的元数目。
  },
  mutations: {
    changeCurAlg(state, payload) {
      state.curAlg = payload;
    },
    changeCurAlgIdx(state, payload) {
      state.curAlgIdx = payload;
    },
    changeStepSize(state, payload) {
      state.stepSize = payload;
    },
    changeStepTotal(state, payload) {
      state.stepTotal = payload;
    },
    changeCurOptimizer(state, payload) {
      state.curOptimizer = payload;
    },
    changeLambda(state, payload) {
      state.lambda = payload;
    },
    changeDrawInterval(state, payload) {
      state.drawInterval = payload;
    },
    changeIsCompareOptimizer(state, payload) {
      state.isCompareOptimizer = payload;
    },
    changeHiddenLayerList(state, payload) {
      state.hiddenLayerList = payload;
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
