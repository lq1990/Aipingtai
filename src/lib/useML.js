// require("./LogReg"); 进来的是一个json对象，而不是直接的 LogReg
// es5 语法
const LR = require("./ML").LogReg;

var inp = [
  { pos: [1, 2], type: "A", color: "" },
  { pos: [2, 3], type: "A", color: "" },
  { pos: [4, 2], type: "A", color: "" },
  { pos: [20, 40], type: "A", color: "" },
  { pos: [40, 20], type: "A", color: "" },
  { pos: [100, 60], type: "B", color: "" },
  { pos: [88, 88], type: "B", color: "" },
  { pos: [99, 99], type: "B", color: "" },
  { pos: [70, 70], type: "B", color: "" },
  { pos: [60, 100], type: "B", color: "" }
];

var res = new LR(inp).getResult();
console.log("res:", res);

// ========================  改进 =================
// 为了应对不同的场景，
// LogReg的输入inp不针对于 canvas数据，
// 而是 直接是 X 和 label
// 这样在使用 新的 LogReg之前，要先把canvas过来的数据转换

// 当然针对canvas的数据转换 所用到的api，也可以在js文件中提前写好
