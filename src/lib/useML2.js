// require("./LogReg"); 进来的是一个json对象，而不是直接的 LogReg
// es5 语法
const { ML } = require("./ML.js");

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
