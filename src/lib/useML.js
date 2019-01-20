// const math = require("mathjs");
// require("./LogReg"); 进来的是一个json对象，而不是直接的 LogReg
// es5 语法
const { ML } = require("./ML");

// es6
// import ML from "./ML";

var inp = [
  { pos: [1, 2], type: "A", color: "" },
  { pos: [2, 3], type: "A", color: "" },
  { pos: [4, 2], type: "A", color: "" },
  { pos: [20, 40], type: "A", color: "" },
  { pos: [19, 40], type: "A", color: "" },
  { pos: [40, 20], type: "A", color: "" },
  { pos: [40, 19], type: "A", color: "" },
  { pos: [100, 60], type: "B", color: "" },
  { pos: [90, 60], type: "B", color: "" },
  { pos: [88, 88], type: "B", color: "" },
  { pos: [99, 99], type: "B", color: "" },
  { pos: [70, 70], type: "B", color: "" },
  { pos: [59, 100], type: "B", color: "" },
  { pos: [60, 100], type: "B", color: "" }
];
var lr = new ML.LogReg();
// // 链式调用的核心是 return this;
var res = lr
  .inputTrainRaw(inp)
  .inputCS2Mat()
  .featureScaling(1)
  // .modelTrainCV(2, 10, "GD", true);
  // .modelTrainCV(2, 10, "RMSProp", true, 100);
  .modelTrainCV(2, 10, "Adadelta", true, 100);

// var res = lr.inputRaw(inp).inputNew();
// console.log("res:", res);
// console.log("res.logWval:", res.logWval);
var cost = lr.calcCostArr(res.logWval);
console.log("cost:", cost);

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
