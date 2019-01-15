const math = require("mathjs");

function ML() {}

ML.prototype.canvas2MLData = function(canvasData) {
  // canvasData: 从canvas过来的数据格式：
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
  canvasData.forEach(item => {
    var pos = item.pos;
    var type = item.type;
    X0.push(pos);
    Y0.push(this.label01OfTypeAB(type));
  });
  var X = math.concat(math.ones(X0.length, 1), X0);
  var Y = math.matrix(Y0);
  return { X: X, Y: Y }; // 使用json存储
};

/**
 * @param {*} X Features: matrix
 * @param {*} Y Label: matrix
 * @param {*} stepSize 0.01 as default
 * @param {*} stepTotal 1001 as default
 */
function LogReg(X, Y, stepSize, stepTotal, isLogW) {
  this.stepSize = stepSize || 0.01;
  this.stepTotal = stepTotal || 1001;
  this.isLogW = isLogW || false;
  // 初始化
  var W = math.ones(1 + X.size()[1], 1); // 针对逻辑回归二分类问题
  var XT = math.transpose(X);
  this.logWval = [W.valueOf()]; // 记录W的变化
  // 迭代优化求W
  for (var i = 0; i < this.stepTotal; i++) {
    var Z = math.multiply(X, W); // Z = XW
    var H = this.sigmoid(Z);
    var HminusY = math.subtract(H, Y);
    var dCdW = math.multiply(XT, HminusY);
    W = math.subtract(W, math.multiply(this.stepSize, dCdW));
    if (this.isLogW) {
      // 记录每一步
      this.logWval.push(W.valueOf());
    }
  }
  this.optWval = W.valueOf();
}

function LogReg0(inp, stepSize, stepTotal) {
  this.stepSize = stepSize || 0.01;
  this.stepTotal = stepTotal || 1001;
  var XY = this.canvasDataTransformToMLData(inp);
  var X = XY.X; // matrix 格式
  var Y = XY.Y; // matrix 格式

  // 初始化
  var W = math.ones(3, 1); // 针对逻辑回归二分类问题
  var XT = math.transpose(X);
  // 迭代优化求W
  for (var i = 0; i < this.stepTotal; i++) {
    var Z = math.multiply(X, W); // (6,1)
    var H = this.sigmoid(Z);
    var matY = math.matrix(Y);
    var HminusY = math.subtract(H, matY);
    var dCdW = math.multiply(XT, HminusY);
    W = math.subtract(W, math.multiply(this.stepSize, dCdW));
    if (i % 100 == 0) {
      console.log("W: " + W + ", i: " + i + " ============================");
    }
  }
  var W_data = W.valueOf();
  this.w0 = W_data[0][0];
  this.w1 = W_data[1][0];
  this.w2 = W_data[2][0];
  this.coefficientOfX1 = -this.w1 / this.w2;
  this.intercept = -this.w0 / this.w2; // value of x2, when x1 = 0
  this.valueX1WhenX2is0 = -this.w0 / this.w1;
  //   return { w0, w1, w2, coefficientOfX1, intercept, valueX1WhenX2is0 };
}

LogReg.prototype.getOptWval = function() {
  return this.optWval;
};

/**
 * 目的：对于2个features即有3个w而言，给输入W时，
 * 输出关于W的细节：w0, w1, w2, x1的系数，截距，当x2为0时x1的值。
 *
 * x2 = coefficientOfX1 * x1 + intercept
 *
 * 另外：如果做动画时，由于记录了Wval，可以一一遍历Wval，
 * 利用此函数进而得到每一帧的 x2~x1方程
 */
LogReg.prototype.getWdetails = function(aWval) {
  var w0 = aWval[0][0];
  var w1 = aWval[1][0];
  var w2 = aWval[2][0];
  var coefficientOfX1 = -w1 / w2;
  var intercept = -w0 / w2; // value of x2, when x1 = 0
  var valueX1WhenX2is0 = -w0 / w1;
  return {
    w0: w0,
    w1: w1,
    w2: w2,
    coefficientOfX1: coefficientOfX1,
    intercept: intercept,
    valueX1WhenX2is0: valueX1WhenX2is0
  };
};

LogReg.prototype.label01OfTypeAB = function(type) {
  switch (type) {
    case "A":
      return [0];
    case "B":
      return [1];
    default:
      return null;
  }
};

LogReg.prototype.canvasDataTransformToMLData = function(canvasData) {
  // canvasData: 从canvas过来的数据格式：
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
  canvasData.forEach(item => {
    var pos = item.pos;
    var type = item.type;
    X0.push(pos);
    Y0.push(this.label01OfTypeAB(type));
  });
  var X = math.concat(math.ones(X0.length, 1), X0);
  var Y = math.matrix(Y0);
  return { X: X, Y: Y }; // 使用json存储
};

LogReg.prototype.sigmoid = function(inpZ) {
  // 输出h = 1 / (1 + Math.E ** -输入z)
  var num = 1;
  var expMinusZ = math.dotPow(Math.E, math.multiply(-1, inpZ));
  var den = math.add(1, expMinusZ); // 加减可以直接进行 elementwise。但乘除必须用dot。
  var out = math.dotDivide(num, den);
  return out;
};

// es5写法：导出一个模块对象。 是一个json对象。
// 在其他文件使用时，也是import进了json对象
module.exports = {
  LogReg: LogReg
};
