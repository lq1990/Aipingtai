const math = require("mathjs");

var ML = {
  Common: Common,
  LogReg: LogReg
};

// ========================================================================
// =========================== Common =====================================
// ========================================================================
/**
 * Common 中存储ML所有算法用到的通用的方法、属性。
 */
function Common() {}

/**
 * @param {} inpZ 输入格式为 math.matrix 或 普通数组
 */
Common.prototype.sigmoid = function(inpZ) {
  // 输出h = 1 / (1 + Math.E ** -输入z)
  var num = 1;
  var expMinusZ = math.dotPow(Math.E, math.multiply(-1, inpZ));
  var den = math.add(1, expMinusZ); // 加减可以直接进行 elementwise。但乘除必须用dot。
  var out = math.dotDivide(num, den);
  return out;
};

/**
 * canvas过来的json数据中有个type，对应于10类
 */
Common.prototype.labelOfType = function(type) {
  switch (type) {
    case "A":
      return [0];
    case "B":
      return [1];
    case "C":
      return [2];
    case "D":
      return [3];
    case "E":
      return [4];
    case "F":
      return [5];
    case "G":
      return [6];
    case "H":
      return [7];
    case "I":
      return [8];
    case "J":
      return [9];
    default:
      return null;
  }
};

/**
 * 输入：canvas过来的数据，格式：[{pos:[x,1],type:"",color:""}, {},...]
 *
 * 输出: { X: X, Y: Y } 给ML模型用的matrix格式。
 * 1. 输出X：Features, [[1,x,y],[1,x,y],...]
 * 2. 输出Y: Labels, [[0],[1],...]
 */
Common.prototype.canvas2MLmat = function(canvasData) {
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
    Y0.push(this.labelOfType(type));
  });
  var X = math.concat(math.ones(X0.length, 1), X0);
  var Y = math.matrix(Y0);
  return { X: X, Y: Y }; // 使用json存储
};

// ========================================================================
// =========================== LogReg =====================================
// ========================================================================
// LogReg先从Common处继承一些通用的方法
for (var i in Common.prototype) {
  LogReg.prototype[i] = Common.prototype[i];
}

/**
 * 前两个参数必填。
 * @param {[]} X Features: matrix，矩阵第一列都为1
 * @param {[]} Y Label: matrix
 * @param {Number} stepSize 0.01 as default
 * @param {Number} stepTotal 1001 as default
 * @param {Boolean} isLogW false as default
 */
function LogReg(X, Y, stepSize, stepTotal, isLogW) {
  // X: (10,3)
  // Y: (10,1)
  this.stepSize = stepSize || 0.01;
  this.stepTotal = stepTotal || 1001;
  this.isLogW = isLogW || false;
  // 初始化
  var W = math.ones(X.size()[1], 1); // 针对逻辑回归二分类问题
  var XT = math.transpose(X);
  this.logWval = [W.valueOf()]; // 记录W的变化
  // 迭代优化求W
  for (var i = 0; i < this.stepTotal; i++) {
    var Z = math.multiply(X, W); // Z = XW
    var H = this.sigmoid(Z);
    var HminusY = math.subtract(H, Y);
    var dCdW = math.multiply(XT, HminusY);
    // console.log("Z: ", Z.valueOf());
    // console.log("H: ", H.valueOf());
    // console.log("HminusY: ", HminusY.valueOf());
    // console.log("dCdW: ", dCdW.valueOf());
    W = math.subtract(W, math.multiply(this.stepSize, dCdW));
    if (this.isLogW) {
      // 记录每一步
      this.logWval.push(W.valueOf());
    }
  }
  this.optWval = W.valueOf();
}

LogReg.prototype.getOptWval = function() {
  return this.optWval;
};

/**
 * 输入：一个W
 *
 * 输出: 关于W的细节：w0、 w1、 w2、 x1的系数、纵截距、横截距。
 *
 * 目的：对于2个features即有3个w而言，给输入W时，输出细节。
 *
 * x2 = coefficientOfX1 * x1 + x2Intercept
 *
 * 另外：如果做动画时，由于记录了Wval，可以一一遍历Wval，
 * 利用此函数进而得到每一帧的 x2~x1方程
 */
LogReg.prototype.getWdetails = function(aWval) {
  // console.log("aWval", aWval);
  var w0 = aWval[0][0];
  var w1 = aWval[1][0];
  var w2 = aWval[2][0];
  var coefficientOfX1 = -w1 / w2;
  var x2Intercept = -w0 / w2; // value of x2, when x1 = 0 分界线在纵轴上的交点
  var x1Intercept = -w0 / w1; // value of x1, when x2 = 0 分界线在横轴上的交点
  return {
    w0: w0,
    w1: w1,
    w2: w2,
    coefficientOfX1: coefficientOfX1,
    x2Intercept: x2Intercept,
    x1Intercept: x1Intercept
  };
};

// ========================================================================
// =========================== LinReg =====================================
// ========================================================================

// ========================================================================
// =========================== NN =========================================
// ========================================================================

// ========================================================================
// ========================== 导出 ========================================
// ========================================================================
// es5写法：导出一个模块对象。 是一个json对象。
// 在其他文件使用时，也是import进了json对象
module.exports = {
  ML: ML
};

// es6
// export default ML;
