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
 * 为了实现矩阵减法 [[ a, b ],[ c, d ],...] - [ [ aa, bb ] ] ，需扩展第二项。使得两者维度一样
 * @param {*} inp 为第二项即减数, math.matrix() 格式, 一行多列
 * @param {*} dir 扩充的方向，0：列方向， 1：行方向
 * @param {*} num 扩充到多少列、行
 */
Common.prototype.extendArr = function(inp, dir, num) {
  var arrNew = inp.clone();
  while (arrNew.size()[0] < num) {
    arrNew = math.concat(arrNew, inp, dir);
  }
  return arrNew;
};

/**
 * math自带的 math.std() 方法不能按照 列方向或行方向进行求值。
 * 自己写的，按照列方向求标准差。
 * @param {*} inp math.matrix 格式，多行多列
 * @param {*} dir 0: 列方向
 * @returns math vector 当为列方向时，输出为 一行的向量 [a,b,...]
 */
Common.prototype.myStd = function(inp, dir) {
  var direc = dir || 0;
  if (direc === 0) {
    // 按照列方向
    var rows = inp.size()[0];
    var cols = inp.size()[1];
    var listStd = [];
    for (var i = 0; i < cols; i++) {
      // 取出inp第i列所有的数
      var iColData = math.subset(inp, math.index(math.range(0, rows), i));
      var tempStd = math.std(iColData); // math.std 不能按照矩阵某一列计算标准差，所以只能自己写了
      listStd.push(tempStd);
    }
    return math.matrix(listStd);
  }
};

/**
 * 在scaling的两种方法中，都有分母为0的风险；
 * 若矩阵的某一列的数据完全相等时，会出现此风险。
 * 此时，把这一列的值改为1.
 */
Common.prototype.handleDenIs0InScaling = function(out, den) {
  // 找到den为0的那一列， 当den为0时，意味着这一行的值都是一样的，此种情况下这一行的数都被赋值为1
  var idx = null;
  math.forEach(den, (item, index) => {
    if (index[0] != 0) {
      return;
    }
    if (item == 0) {
      // console.log("index:", index);
      idx = index; // 赋值格式：[第几行，第几列]
    }
  });
  if (idx != null) {
    var colIs0 = idx[1]; // 找到这一列 colIs0
    var outNew = math.subset(
      out,
      math.index(math.range(0, out.size()[0]), colIs0),
      // 将out的这一列都改为1，否则out中这一列时NaN
      math.ones(out.size()[0], 1)
    );
    return outNew;
  } else {
    return out;
  }
};

/**
 * 对输入矩阵的每一列进行比例缩放;
 * 使得每一列的尺度在一个量纲;
 * 两种方式：
 * 1. (data-min)/(max-min)
 * 2. (data-mean)/std
 * @param inp 输入为矩阵，多行多列
 * @param scaleType maxmin, meanstd
 * @returns 将输入的矩阵 scaling之后的矩阵
 */
Common.prototype.scaling = function(inp, scaleType) {
  var type = scaleType || 1;
  var out;
  if (type === 1) {
    var minVal = math.min(inp, 0); // 格式 [a,b,...]
    var minValNew = math.reshape(minVal, [1, minVal.size()[0]]); // minValNew: math.matrix 一行多列
    var maxVal = math.max(inp, 0);
    var maxValNew = math.reshape(maxVal, [1, maxVal.size()[0]]); // maxVal: math.matrix 一行多列

    // 矩阵进行减法时，维度必须一样，故需要先对 minVal, maxVal 扩展
    var minArr = this.extendArr(minValNew, 0, inp.size()[0]);
    var maxArr = this.extendArr(maxValNew, 0, inp.size()[0]);
    var inpMinusMinArr = math.subtract(inp, minArr);
    var range = math.subtract(maxArr, minArr);

    out = math.dotDivide(inpMinusMinArr, range);
    out = this.handleDenIs0InScaling(out, range);
    return out;
  } else {
    var meanVal = math.mean(inp, 0); // 格式为：math的vector，并非一行多列
    var stdVal = this.myStd(inp, 0); // 格式为：math的vector，并非一行多列
    var meanValNew = math.reshape(meanVal, [1, meanVal.size()[0]]);
    var stdValNew = math.reshape(stdVal, [1, stdVal.size()[0]]);
    // extend
    var meanArr = this.extendArr(meanValNew, 0, inp.size()[0]);
    var stdArr = this.extendArr(stdValNew, 0, inp.size()[0]);
    // console.log("stdArr:", stdArr);
    var inpMinusMean = math.subtract(inp, meanArr);
    out = math.dotDivide(inpMinusMean, stdArr);
    out = this.handleDenIs0InScaling(out, stdArr);
    return out;
  }
};

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
 * 输入：canvas过来的数据，格式：[ {pos: [x, 1], type:"", color: ""}, {},...]
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
  this.stepSize = stepSize || 0.001;
  this.stepTotal = stepTotal || 5001;
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
