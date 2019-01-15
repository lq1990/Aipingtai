const math = require("mathjs");
// 将data进行 二分类，使用逻辑回归

function label01OfTypeAB(type) {
  switch (type) {
    case "A":
      return [0];
    case "B":
      return [1];
    default:
      return null;
  }
}

function canvasDataTransformToMLData(inp) {
  // inp: 从canvas过来的数据格式：
  // [
  // { pos: [x, y], type: "A", color: "" },
  // {},
  // {},
  // ...
  // ]
  // out: ML模型(针对逻辑回归)需要的输入数据格式为:
  // X: [[1,x1,x2],[1,x1,x2],[1,x1,x2],...]
  // Y: [[0 | 1],[0 | 1],[],...]
  var X0 = new Array();
  var Y0 = new Array();
  inp.forEach(item => {
    var pos = item.pos;
    var type = item.type;
    X0.push(pos);
    Y0.push(label01OfTypeAB(type));
  });
  var X = math.concat(math.ones(X0.length, 1), X0);
  var Y = math.matrix(Y0);
  return { X: X, Y: Y }; // 使用json存储
}

/**
 * 逻辑回归中用到的sigmoid函数;
 * 神经网络用到的激活函数之一;
 * 1. 输出 = 1 / (1 + Math.E ** -输入)
 * 2. 注意：elementwise元素级的运算
 * @param inp 输入格式为 math.matrix()
 */
function sigmoid(inp) {
  var num = 1;
  var expMinusZ = math.dotPow(Math.E, math.multiply(-1, inp));
  var den = math.add(1, expMinusZ); // 加减可以直接进行 elementwise。但乘除必须用dot。
  var out = math.dotDivide(num, den);
  return out;
}

/**
 * inp: 从canvas传过的数据 [{pos:[x1,x2],type:"",color:""},{},...]
 * @param obj
 */
function LogisticRegression(inp, stepSize, stepTotal) {
  var XY = canvasDataTransformToMLData(inp);
  var X = XY.X; // matrix 格式
  var Y = XY.Y; // matrix 格式
  // 初始化
  var W = math.ones(3, 1); // 针对逻辑回归二分类问题
  var XT = math.transpose(X);
  // var stepSize = 0.01;
  // var stepTotal = 1;
  // 迭代优化求W
  for (var i = 0; i < stepTotal; i++) {
    var Z = math.multiply(X, W); // (6,1)
    var H = sigmoid(Z);
    var matY = math.matrix(Y);
    var HminusY = math.subtract(H, matY);
    var dCdW = math.multiply(XT, HminusY);
    W = math.subtract(W, math.multiply(stepSize, dCdW));
    if (i % 100 == 0) {
      console.log("W: " + W + ", i: " + i + " ============================");
    }
  }
  var W_data = W.valueOf();
  var w0 = W_data[0][0];
  var w1 = W_data[1][0];
  var w2 = W_data[2][0];
  var coefficientOfX1 = -w1 / w2;
  var intercept = -w0 / w2; // value of x2, when x1 = 0
  var valueX1WhenX2is0 = -w0 / w1;
  return { w0, w1, w2, coefficientOfX1, intercept, valueX1WhenX2is0 };
}

// ========================= 使用 =========================================
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
var W = LogisticRegression(inp, 0.01, 1001);
console.log("W:", W);

/*
var X_original = [
  [1, 2],
  [2, 3],
  [4, 2],
  [20, 40],
  [40, 20],
  [100, 60],
  [88, 88],
  [99, 99],
  [70, 70],
  [60, 100]
];

var X = math.concat(math.ones(X_original.length, 1), X_original);
var Y = [[0], [0], [0], [0], [0], [1], [1], [1], [1], [1]];

var W = math.ones(3, 1);
var matX = math.matrix(X);
var matX_T = math.transpose(matX);
var stepSize = 0.01;
var stepTotal = 1;
for (var i = 0; i < stepTotal; i++) {
  var Z = math.multiply(matX, W); // (6,1)
  var H = sigmoid(Z);
  var matY = math.matrix(Y);
  var HminusY = math.subtract(H, matY);
  var dCdW = math.multiply(matX_T, HminusY);
  W = math.subtract(W, math.multiply(stepSize, dCdW));
  if (i % 100 == 0) {
    console.log("W: " + W + ", i: " + i + " ============================");
  }
}
var W_data, w0, w1, w2;
W_data = W.valueOf();
w0 = W_data[0][0];
w1 = W_data[1][0];
w2 = W_data[2][0];
var coefficientOfX1 = -w1 / w2;
var intercept = -w0 / w2; // value of x2, when x1 = 0
var valueX1WhenX2is0 = -w0 / w1;
function sigmoid(inp) {
  //   var out = 1 / (1 + Math.E ** -inp);
  var num = 1;
  var expMinusZ = math.dotPow(Math.E, math.multiply(-1, inp));
  var den = math.add(1, expMinusZ); // 加减可以直接进行 elementwise。但乘除必须用dot。
  var out = math.dotDivide(num, den);
  return out;
}
*/
