const math = require("mathjs");
// require("./LogReg"); 进来的是一个json对象，而不是直接的 LogReg
// es5 语法
const { ML } = require("./ML");

// es6
// import ML from "./ML";

var inp = [
  { pos: [87, 0], type: "B", color: "b" },
  { pos: [5, 90], type: "C", color: "c" },
  { pos: [5, 100], type: "C", color: "c" },
  { pos: [1, 2], type: "A", color: "a" },
  { pos: [2, 3], type: "A", color: "a" },
  { pos: [4, 2], type: "A", color: "a" },
  { pos: [3, 3], type: "A", color: "a" },
  { pos: [10, 10], type: "A", color: "a" },
  { pos: [6, 3], type: "A", color: "a" },
  { pos: [3, 8], type: "A", color: "a" },
  { pos: [100, 6], type: "B", color: "b" },
  { pos: [90, 10], type: "B", color: "b" },
  { pos: [88, 8], type: "B", color: "b" },
  { pos: [99, 4], type: "B", color: "b" },
  { pos: [70, 12], type: "B", color: "b" },
  { pos: [5, 70], type: "C", color: "c" },
  { pos: [9, 69], type: "C", color: "c" },
  { pos: [3, 99], type: "C", color: "c" },
  { pos: [70, 10], type: "B", color: "b" }
];

// var layerList = [2, 4, 2];

var alg = 1;
// 神经网络
if (alg == 0) {
  var nn = new ML.NN();
  var res = nn
    .inputTrainRaw(inp)
    .inputCS2MatXOneHotY(["a", "b", "c"])
    .featureScaling()
    .modelTrainCV([2, 10, 3], 0.1, 100, "Adadelta", 0);

  // console.log("res:", res);
}
// 逻辑回归;
if (alg == 1) {
  var lr = new ML.LogReg();
  var res = lr
    .inputTrainRaw(inp)
    .inputCS2Mat(["a", "b"])
    .featureScaling(1)
    .modelTrainCV(1, 3, "RMSProp", true);
  console.log("res:", res);
}

// for (var i = 0; i < 100 ** 2; i++) {
// var X = res.inputX;
// var W = res.W;
// var b = res.b;
// var Z1 = math.add(math.multiply(X, W[1]), b[1]); // (n,4)
// var A1 = nn.sigmoid(Z1); // (n,4)

// var Z2 = math.add(math.multiply(A1, W[2]), b[2]); // (n,3)
// var A2 = nn.softmax(Z2); // (n,3)
// // }
// console.log("A2:", A2);

// var prob = nn.calcProbInFP(res.inputX, res.W, res.b);

// console.log("prob:", prob);
// var classes = nn.classesOfOneHotOutput(prob);
// console.log("classes:\n", classes);

// var s1 = nn.softmax(res.inputX);
// console.log("res:", res);
// console.log("s1:", s1);
// var lr = new ML.LogReg();
// // 链式调用的核心是 return this;
// var res = lr
// .inputTrainRaw(inp)
// .inputCS2Mat()
// .featureScaling(1)
// .modelTrainCV(2, 10, "GD", true);
// .modelTrainCV(2, 10, "RMSProp", true);
// .modelTrainCV(2, 10, "Adadelta", true);

// var res = lr.inputRaw(inp).inputNew();
// console.log("res:", res);
// console.log("res.logWval:", res.logWval);
// var cost = lr.calcCostArr(res.logWval, res.inputX, res.inputY); // 计算cost是针对 scaling之后的inputx而言的。
// console.log("cost:", cost);

// lr.inputNew();
// lr.featureScaling();
// lr.modelTrainCV(0.001, 5000);
// var optW = lr.getOptWval();
// console.log("optW:", optW);

// var inp = [
//   { pos: [137, 43], type: "A" },
//   { pos: [75, 137], type: "A" },
//   { pos: [37, 219], type: "A" },
//   { pos: [275, 125], type: "B" },
//   { pos: [207, 211], type: "B" },
//   { pos: [143, 292], type: "B" }
// ];
// var inp = [
//   { pos: [2, 1], type: "A" },
//   { pos: [2, 2], type: "A" },
//   { pos: [5, 4], type: "B" },
//   { pos: [4, 5], type: "B" },
//   { pos: [2, 3], type: "A" },
//   { pos: [3, 2], type: "A" },
//   { pos: [6, 5], type: "B" },
//   { pos: [4, 1], type: "A" },
//   { pos: [6, 3], type: "B" },
//   { pos: [7, 4], type: "B" }
// ];

// var common = new ML.Common();
// var { X, Y } = common.canvas2MLmat(inp);
// console.log("X:", X);
// console.log("Y: ", Y);
// var res = common.scaling(X, 1);
// console.log("res:", res);
// var res = new ML.LogReg(X, Y, 0.001, 5001);
// console.log("res:", res);

// var Wdetails = res.getWdetails(res.optWval);
// console.log("details: ", Wdetails);

// ========================  改进 =================
// 为了应对不同的场景，
// LogReg的输入inp不针对于 canvas数据，
// 而是 直接是 X 和 label
// 这样在使用 新的 LogReg之前，要先把canvas过来的数据转换

// 当然针对canvas的数据转换 所用到的api，也可以在js文件中提前写好
