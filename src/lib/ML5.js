/**
 * 此库文件用到 mathjs，官网：http://mathjs.org/
 * 安装方式：npm install mathjs --save
 */

const math = require("mathjs");

var ML = {
  Common: Common,
  LogReg: LogReg,
  NN: NN
};

// ========================================================================
// =========================== Common =====================================
// ========================================================================
/**
 * Common 中存储ML所有算法用到的通用的方法、属性。
 *
 * 使用机器学习进行数据挖掘，对流程的说明：
 * 1. inputTrainRaw: 原始输入
 * 2. inputCS2Mat: 将原始输入进行转变格式
 * 3. inputClean: 对输入进行数据清洗
 * 4. featureEngineering: 特征工程，提取有效特征
 * 5. featureScaling: 使每一个特征对应的 矩阵每一列数据量纲相等
 * 6. modelTrainCV: 模型训练、交叉验证，得到最优的模型参数
 * 7. modelTest: 模型使用，对未知的数据进行预测
 * 8. visulization: 可视化
 *
 */
function Common() {
  this.Procedure = [
    "inputTrainRaw",
    "inputCS2Mat",
    "inputClean",
    "featureEngineering",
    "featureScaling",
    "modelTrainCV",
    "modelTest( testData )",
    "visulization"
  ];
}

Common.prototype = {
  inputTrainRaw: function(inp) {
    this.inputTrainRaw = inp;
    return this;
  },
  /**
   * 将canvas过来的数据inputTrainRaw转成 矩阵格式的 inputX, inputY
   *
   * inputX: Features, inputX会被不断改造，直到最终输入给model，格式
   * inputY: Labels, 多行1列
   */
  inputCS2Mat: function(usedColorList) {
    var { X, Y } = this.canvas2MLmat(this.inputTrainRaw, usedColorList);
    this.inputX = X;
    this.inputY = Y;
    return this;
  },
  /**
   * 为了多分类问题，使用 onehot.
   * 将canvas过来的数据转成 矩阵格式的inputX, onehot类型的 inputY
   * inputX 2列，区别于lr中的3列。 Features
   * inputY onehot格式, 多行 3列，如果是3分类问题的话，
   */
  inputCS2MatXOneHotY: function(usedColorList) {
    var { X, Y } = this.canvas2MLmatOneHot(this.inputTrainRaw, usedColorList);
    this.inputX = X;
    this.inputY = Y;
    return this;
  },
  /**
   * 输入：canvas过来的数据，
   * 输入格式：[ {pos: [x, y], type:"A | B | ...", color: "", classes: }, {},...]
   * 输出 inputX 多行2列，不同于 逻辑回归的 多行3列。
   * 输出 inputY 多行3列（3类的话） 都是 math.matrix格式
   * @param {*} inputTrainRaw
   */
  canvas2MLmatOneHot: function(inputTrainRaw, usedColorList) {
    // var num_classes = inputTrainRaw[inputTrainRaw.length - 1].classes;
    var num_classes = usedColorList.length;

    var xArr = [];
    var yArr = [];
    inputTrainRaw.forEach(item => {
      var pos = item.pos;
      xArr.push(pos);

      // 类别 根据当前的颜色在usedColorList中的位置来决定。
      var type = usedColorList.indexOf(item.color);

      var zeros = this.zerosOne(num_classes, type);
      yArr.push(zeros);
    });

    var X = math.matrix(xArr);
    var Y = math.matrix(yArr);
    return { X: X, Y: Y };
  },

  /**
   * 生成onehot辅助函数
   * @param {*} classes 类别总数
   * @param {*} idx 第idx号位是1，剩下位置为0
   */
  zerosOne: function(classes, idx) {
    var zeros = [];
    for (let i = 0; i < classes; i++) {
      if (i != idx) {
        zeros.push(0);
      } else {
        zeros.push(1);
      }
    }
    return zeros;
  },

  inputClean: function() {
    return this;
  },
  featureEngineering: function() {
    return this;
  },
  /**
   * 对 inputX 进行比例缩放,
   * 两种方式：
   * 1. (data-min)/(max-min)，对应 inputXScaleMinVec, inputXScaleMaxVec;
   * 2. (data-mean)/std, 对应 inputXScaleMeanVec, inputXScaleStdVec;
   *
   * Vec格式：[ a,b,c,...]
   * @param scaleType 1、2
   */
  featureScaling: function(type) {
    this.scaleType = type;
    this.inputX = this.scaling(this.inputX, type);
    return this;
  },
  modelTrainCV: function() {
    return this;
  },
  modelTest: function() {
    return this;
  },
  visulization: function() {
    return this;
  },
  /**
   * 为test所用.
   *
   * test时，将画布上的每一点进行使用已得模型来预测。
   * 分类后，就可以描色了。
   */
  testDataFromCanvas: function(csWidth, csHeight) {
    var tempArr = [];
    for (var col = 0; col < csWidth; col++) {
      for (var row = 0; row < csHeight; row++) {
        tempArr.push([col, row]);
      }
    }

    var testData = math.matrix(tempArr);
    return testData;
  },
  /**
   * 在 scaling 中用到。
   * 为了实现矩阵减法 [[ a, b ],[ c, d ],...] - [ [ aa, bb ] ] ，需扩展第二项。使得两者维度一样
   * @param {*} inp 为第二项即减数, math.matrix() 格式, 一行多列
   * @param {*} dir 扩充的方向，0：列方向， 1：行方向
   * @param {*} num 扩充到多少列、行
   */
  extendArr: function(inp, dir, num) {
    var arrNew;
    if (dir == 0) {
      arrNew = inp.clone();
      while (arrNew.size()[0] < num) {
        arrNew = math.concat(arrNew, inp, 0);
      }
    } else {
      arrNew = inp.clone();
      while (arrNew.size()[1] < num) {
        arrNew = math.concat(arrNew, inp);
      }
    }

    return arrNew;
  },
  /**
   * math自带的 math.std() 方法不能按照 列方向或行方向进行求值。
   * 自己写的，按照列方向求标准差。
   * @param {*} inp math.matrix 格式，多行多列
   * @param {*} dir 0: 列方向
   * @returns math vector 当为列方向时，输出为 一行的向量 [ a,b,...]
   */
  myStd: function(inp, dir) {
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
  },
  /**
   * 在scaling的两种方法中，都有分母为0的风险；
   * 若矩阵的某一列的数据完全相等时，会出现此风险。
   * 此时，把这一列的值改为1.
   */
  handleDenIs0InScaling: function(out, den) {
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
  },
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
  scaling: function(inp, scaleType) {
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
      this.inputXScaleMinVec = minVal;
      this.inputXScaleMaxVec = maxVal;
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
      this.inputXScaleMeanVec = meanVal;
      this.inputXScaleStdVec = stdVal;
      return out;
    }
  },
  /**
   * @param {} inpZ 输入格式为 math.matrix 或 普通数组
   */
  sigmoid: function(inpZ) {
    // 输出h = 1 / (1 + Math.E ** -输入z)
    var num = 1;
    var expMinusZ = math.dotPow(Math.E, math.dotMultiply(-1, inpZ));
    var den = math.add(1, expMinusZ); // 加减可以直接进行 elementwise。但乘除必须用dot。
    var out = math.dotDivide(num, den);
    return out;
  },

  /**
   * 输入：canvas过来的数据，格式：[ {pos: [x, 1], type:"", color: ""}, {},...]
   *
   * 输出: { X: X, Y: Y } 给ML模型用的matrix格式。
   * 1. 输出X：Features, [[1,x,y],[1,x,y],...]
   * 2. 输出Y: Labels, [[0],[1],...]
   */
  canvas2MLmat: function(canvasData, usedColorList) {
    // canvasData: 从canvas过来的数据格式：
    // [
    // { pos: [x, y], color: "" },
    // {},
    // {},
    // ...
    // ]
    // out: ML模型(针对逻辑回归)需要的输入数据格式为:
    // X: math.matrix, [[1,x1,x2],[1,x1,x2],[1,x1,x2],...]
    // Y: math.matrix, [[0 | 1],[0 | 1],[],...]
    var X0 = new Array();
    var Y0 = new Array();
    canvasData.forEach(item => {
      var pos = item.pos;
      let type = usedColorList.indexOf(item.color); // 返回itemcolor在 colorlist中位置，位置当做类别
      X0.push(pos);
      Y0.push([type]);
    });
    var X = math.concat(math.ones(X0.length, 1), X0);
    var Y = math.matrix(Y0);
    return { X: X, Y: Y }; // 使用json存储
  }
};

// ========================================================================
// =========================== Optimizer ==================================
// ========================================================================
/**
 * Optimizer 只负责 W = W - alpha* dCdW 中 W的优化。
 * 不同算法计算 dCdW方式不同。
 *
 * 输入：学习率alpha, 梯度dCdW
 * @returns 输出：当前迭代步对应的 W
 *
 * 优化器 涉及到：
 * 0. Gradient Descent 标准梯度下降法
 * 1. RMSProp
 * 2. Adadelta
 */
function Optimizer() {
  this.pho = 0.9; // 表示梯度下降的动力
  this.epsilon = 10 ** -8; // 最小自然数。防止分母为0.
}

Optimizer.prototype = {
  /**
   *
   * @param {*} oldW 上一步的W，格式：math.matrix
   * @param {*} stepSize 学习率、步长
   * @param {*} gt gradient of 当前步, 格式：math.matrix
   * @returns 经过当前步 改进后的W，格式：math.matrix
   */
  GradientDescent: function(oldW, stepSize, gt) {
    var W = math.subtract(oldW, math.multiply(stepSize, gt));
    // var newW = curW - stepSize * gt;
    return W;
  },
  /**
   * 公式：
   * dwt = - alpha  /  RMS[ g ]_ t  * gt
   *
   * rmsProp取前几个 gt，而非所有之前的gt。
   * @param {*} oldW 上一个W，格式：math.matrix
   * @param {*} stepSize 步长、学习率
   * @param {*} gt 当前这一步的 g，格式：math.matrix ，多行1列
   * @param {*} gt_1 前几步中的g的arr，不算当前这一个
   * @returns W
   */
  RMSProp: function(oldW, stepSize, gt, gt_1Arr) {
    // gt_1Arr里面存储了之前所有的g，不算当前的。已经在LogReg中被裁剪了

    this.pho = 0.9;
    this.epsilon = 10 ** -8;
    let W;
    // 最开始第一步时，gt_1Arr是空的，用标准梯度下降法.
    if (gt_1Arr.length == 0) {
      W = this.GradientDescent(oldW, stepSize, gt);
      return W;
    }

    var rms_gt = this.calcRMSgt(gt, gt_1Arr, this.pho, this.epsilon);

    // var dxt = (-stepSize * gt) / rms_gt;
    var dxt = math.dotDivide(math.multiply(-stepSize, gt), rms_gt);
    // var W = oldW + dxt; W每次迭代变化的值是 dxt
    W = math.add(oldW, dxt);
    return W;
  },

  RMSProp_new: function(oldW, stepSize, dCdW, dCdWArr, gxLen) {
    // RMSProp
    let W = this.RMSProp(oldW, stepSize, dCdW, dCdWArr); // 多行1列
    dCdWArr.push(dCdW.valueOf()); // dCdWArr 刚开始时空的list，在迭代时记录了 梯度。

    // dCdW不需要存储所有值钱的梯度，只用前几个。
    while (dCdWArr.length > gxLen) {
      dCdWArr.shift();
    }

    return W;
  },

  /**
   * Adadelta 从 Adagrad, RMSProp 升级而来;
   * Adadelta 不需要设置初始学习率，自适应;
   *
   *公式：
   * dwt = - RMS[ dx ]_ t-1  /  RMS[ g ]_ t  * gt
   *
   * @param oldW 格式：3行1列
   * @param dxArr 格式：多个3行1列
   */
  Adadelta: function(oldW, stepSize, gt, gt_1Arr, dxArr) {
    this.pho = 0.9;
    this.epsilon = 10 ** -8;
    // 最开始的第1，2步，dxArr 还不够多，是不能直接运行 Adadelta。需借助于 进行前两步。

    if (gt_1Arr.length == 0) {
      W = this.GradientDescent(oldW, stepSize, gt);
      var dW01 = math.subtract(W, oldW);
      return { W: W, dW: dW01 };
    }
    if (gt_1Arr.length == 1) {
      W = this.RMSProp(oldW, stepSize, gt, gt_1Arr);
      dW01 = math.subtract(W, oldW);
      return { W: W, dW: dW01 };
    }

    var rms_gt = this.calcRMSgt(gt, gt_1Arr, this.pho, this.epsilon);

    var dxArrnew = math.matrix(dxArr);
    var size0 = dxArrnew.size()[0];
    var size1 = dxArrnew.size()[1];
    var size2 = dxArrnew.size()[2];

    var curdx_temp = dxArrnew.subset(
      math.index(size0 - 1, math.range(0, size1), math.range(0, size2))
    );
    var curdx = math.matrix(curdx_temp.valueOf()[0]);

    var boforedxArr_temp = dxArrnew.subset(
      math.index(
        math.range(0, size0 - 1),
        math.range(0, size1),
        math.range(0, size2)
      )
    );

    var beforedxArr = boforedxArr_temp.valueOf();
    var rms_dxt_1 = this.calcRMSgt(curdx, beforedxArr, this.pho, this.epsilon);

    var dxt_num = math.multiply(-1, math.dotMultiply(rms_dxt_1, gt));
    var dxt_den = rms_gt;
    var dxt = math.dotDivide(dxt_num, dxt_den);
    var W = math.add(oldW, dxt);
    return { W: W, dW: dxt };
  },

  Adadelta_new: function(oldW, stepSize, dCdW, dCdWArr, dWArr, gxLen) {
    var obj = this.Adadelta(oldW, stepSize, dCdW, dCdWArr, dWArr);
    let W = obj.W;
    var dW = obj.dW;

    dCdWArr.push(dCdW.valueOf());
    while (dCdWArr.length > gxLen) {
      dCdWArr.shift();
    }

    dWArr.push(dW.valueOf());
    while (dWArr.length > gxLen) {
      dWArr.shift();
    }
    return W;
  },
  /**
   * 计算RMS为 rmsProp, adadelta 服务。
   * 1. E[ g^2 ]_ t = pho * E[ g^2 ]_ (t-1) + (1-pho)*(g_t)^2
   * 2. RMS[ g ]_t = sqrt( E[ g^2 ]_t + epsilon )
   * @param {*} curGt 当前这一步的 gradient dCdW。格式：math.matrix
   * @param {*} beforeGArr 格式：多个3行1列，不是math.matrix格式
   * @param {*} pho 动力 0.9
   * @param {*} epsilon 最小值 1e-8, 防止分母为0
   */
  calcRMSgt: function(curGt, beforeGArr, pho, epsilon) {
    // 求 beforeGArr中 数据每一个位置的均值，即 math.add() / num
    var sum = 0;
    beforeGArr.forEach(item => {
      let item2 = math.dotPow(item, 2); // 先平方
      sum = math.add(sum, item2); // 求和
    });
    // 求均值
    var mean_beforeGArr2 = math.dotDivide(sum, beforeGArr.length);

    var g2t = math.dotPow(curGt, 2); // 当前gt的平方。 结果 3行1列

    // var E_g2t = this.pho * E_g2t_1 + (1 - this.pho) * g2t;
    var E_g2t = math.add(
      math.dotMultiply(pho, mean_beforeGArr2),
      math.dotMultiply(math.subtract(1, pho), g2t)
    );
    var rms_gt = math.sqrt(math.add(E_g2t, epsilon));

    /*
    var len = curGt.size()[0];
    // console.log("==beforeGArr:", beforeGArr, typeof beforeGArr);
    // console.log("===beforeGArr.length:", beforeGArr.length);
    // console.log("===len:", len);
    // 因为 math.matrix格式的原因，gt_1Arr内数据格式：多个 3行1列。
    // 为了计算 E[g^2]_(t-1) 的值，求 pow、mean elemetwise。就要借助于 reshape
    var g2t_1 = math.dotPow(math.matrix(beforeGArr), 2);
    // console.log("===g2t_1:", g2t_1);
    var g2t_1_reshape = math.reshape(g2t_1, [beforeGArr.length, len]); // reshape原因是：把三维的数组变成二维的。
    // console.log("====g2t_1_reshape:", g2t_1_reshape);
    var E_g2t_1_old = math.mean(g2t_1_reshape, 0);
    var E_g2t_1 = math.reshape(E_g2t_1_old, [len, 1]); // 前几个 g的平方的平均值（不算当前gt）。结果 3行1列

    var g2t = math.dotPow(curGt, 2); // 当前gt的平方。 结果 3行1列

    // var E_g2t = this.pho * E_g2t_1 + (1 - this.pho) * g2t;
    var E_g2t = math.add(
      math.dotMultiply(pho, E_g2t_1),
      math.dotMultiply(math.subtract(1, pho), g2t)
    );
    var rms_gt = math.sqrt(math.add(E_g2t, epsilon));
    */
    return rms_gt;
  }
};
// ========================================================================
// =========================== LogReg =====================================
// ========================================================================
/**
 * 流程如下：
 * 1. inputTrainRaw( inp ),
 * 2. inputCS2Mat(),
 * 3. inputClean(),
 * 4. featureEngineering(),
 * 5. featureScaling( 1 as default | 2 ),
 * 6. modelTrainCV(),
 * 7. modelTest(),
 * 8. visulization()
 */
function LogReg() {}

// LogReg先从Common处继承方法
for (let i in Common.prototype) {
  LogReg.prototype[i] = Common.prototype[i];
}

for (let j in Optimizer.prototype) {
  LogReg.prototype[j] = Optimizer.prototype[j];
}

/**
 *
 * @param {*} stepSize 0.1 as default
 * @param {*} stepTotal 100 as default
 * @param {*} optimizer 优化算法的选择. 0: GD as default, 1: RMSProp, 2: Adadelta
 * @param {*} isLogW 是否记录每一步的模型参数W，false as default
 * @param gxLen 使用 RMSProp, Adadelta算法时，需要存储之前多少个gradient,dW
 */
LogReg.prototype.modelTrainCV = function(
  stepSize,
  stepTotal,
  optimizer,
  isLogW,
  gxLen
) {
  this.stepSize = stepSize || 0.1;
  this.stepTotal = stepTotal || 100;
  this.optimizer = optimizer || "GD";
  this.isLogW = isLogW || true;
  this.gxLen = gxLen || 50;
  var X = this.inputX;
  var Y = this.inputY;
  // 初始化
  var W = math.ones(X.size()[1], 1); // 针对逻辑回归二分类问题
  var XT = math.transpose(X);
  this.logWval = [W.valueOf()]; // 记录W的变化，从初始值开始记录
  // 迭代优化求W
  var dCdWArr = []; // 记录每一步的 dCdW 即gt.
  var dWArr = []; // 记录 dW，为 Adadelta用。
  for (var i = 0; i < this.stepTotal; i++) {
    var Z = math.multiply(X, W); // Z = XW

    var H = this.sigmoid(Z);
    var HminusY = math.subtract(H, Y);
    var dCdW = math.multiply(XT, HminusY); // 不同ML算法得到的 dCdW 不同。
    // console.log("dCdW:", dCdW);

    if (optimizer == "GD" || optimizer == 0) {
      // 使用传统的梯度下降法, W -= alpha * dCdW
      // W = math.subtract(W, math.multiply(this.stepSize, dCdW));
      W = this.GradientDescent(W, this.stepSize, dCdW);
    } else if (optimizer == "RMSProp" || optimizer == 1) {
      // 在次封装 RMSProp_new
      W = this.RMSProp_new(W, this.stepSize, dCdW, dCdWArr, this.gxLen);

      // // RMSProp
      // W = this.RMSProp(W, this.stepSize, dCdW, dCdWArr); // 多行1列
      // dCdWArr.push(dCdW.valueOf());

      // // dCdW不需要存储所有值钱的梯度，只用前几个。
      // while (dCdWArr.length > this.gxLen) {
      // dCdWArr.shift();
      // }
    } else if (optimizer == "Adadelta" || optimizer == 2) {
      // 重新封装 Adadelta
      W = this.Adadelta_new(W, this.stepSize, dCdW, dCdWArr, dWArr, this.gxLen);

      // var obj = this.Adadelta(W, this.stepSize, dCdW, dCdWArr, dWArr);
      // W = obj.W;
      // var dW = obj.dW;

      // dCdWArr.push(dCdW.valueOf());
      // while (dCdWArr.length > this.gxLen) {
      //   dCdWArr.shift();
      // }

      // dWArr.push(dW.valueOf());
      // while (dWArr.length > this.gxLen) {
      //   dWArr.shift();
      // }
    }
    if (this.isLogW) {
      // 记录每一步
      this.logWval.push(W.valueOf());
    }
  }
  this.optW = W;
  this.optWval = W.valueOf();
  this.optWdetails = this.calcWdetails(this.optWval);
  return this;
};

LogReg.prototype.modelTest = function() {
  return this;
};
LogReg.prototype.getOptWval = function() {
  return this.optWval;
};
LogReg.prototype.getOptWdetails = function() {
  return this.optWdetails;
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
LogReg.prototype.calcWdetails = function(aWval) {
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

/**
 * wArr 输入，格式：多个 3行1列
 * @returns costArr, 格式：[ v1,v2, v3,... ]
 */
LogReg.prototype.calcCostArr = function(wArr, X, Y) {
  // var wArr = this.logWval;
  // var X = this.inputX;
  // var Y = this.inputY;
  var costArr = [],
    Z,
    H;
  var left, right, temp1, temp2, cost;
  for (var i = 0; i < wArr.length; i++) {
    Z = math.multiply(X, wArr[i]);
    H = this.sigmoid(Z);
    // left = -Y* log(H)
    left = math.dotMultiply(math.multiply(-1, Y), math.log(H));

    // right = -(1-Y)*log(1-H)
    temp1 = math.subtract(Y, 1);
    temp2 = math.log(math.subtract(1, H));
    right = math.dotMultiply(temp1, temp2);
    cost = math.add(left, right); // cost此时时 多行1列

    // 每个点都有一个cost，计算平均值
    var cost_mean = math.mean(cost);

    costArr.push(cost_mean);
  }
  // console.log("costArr of LR:", costArr);
  return costArr;
};

LogReg.prototype.calcOneCost = function(w, X, Y) {
  var Z, H;
  var left, right, temp1, temp2, cost;
  Z = math.multiply(X, w);
  H = this.sigmoid(Z);
  // left = -Y * log(H)
  left = math.dotMultiply(math.multiply(-1, Y), math.log(H));
  // right = -(1-Y)*log(1-H)
  temp1 = math.subtract(Y, 1);
  temp2 = math.log(math.subtract(1, H));
  right = math.dotMultiply(temp1, temp2);
  cost = math.add(left, right);
  return cost;
};

// ========================================================================
// =========================== NN =========================================
// ========================================================================
/**
 * 流程如下：
 * 1. inputTrainRaw( inp ),
 * 2. inputCS2MatXOneHotY()
 * 3. inputClean(),
 * 4. featureEngineering(),
 * 5. featureScaling( 1 as default | 2 ),
 *
 * 6. modelTrainCV(),
 * 7. modelTest(),
 * 8. visulization()
 */
function NN() {}

for (let i in Common.prototype) {
  NN.prototype[i] = Common.prototype[i];
}

for (let j in Optimizer.prototype) {
  NN.prototype[j] = Optimizer.prototype[j];
}

NN.prototype.softmax = function(inpZ) {
  var cols = inpZ.size()[1];
  // 首先，对Z中元素预处理：每一个元素都减去所在行的max，防止exp后溢出。
  var maxCurRow = math.max(inpZ, 1);
  var maxCurRow_reshape = math.reshape(maxCurRow, [maxCurRow.size()[0], 1]);
  var maxCurRow_reshape_clone = this.extendArr(maxCurRow_reshape, 1, cols); // inp, dir, num
  // console.log("inpZ: ", inpZ);
  // console.log("maxCurRow_reshape_clone:", maxCurRow_reshape_clone);
  var inpZ_shift = math.subtract(inpZ, maxCurRow_reshape_clone);
  // 先对Z每一个元素 exp(z)
  // 再 expZ 中每一个元素都除以 所在行的sum
  var expZ = math.exp(inpZ_shift);
  var expZSum = math.sum(expZ, 1);
  var expZSum_reshape = math.reshape(expZSum, [expZSum.size()[0], 1]);
  var expZSumExtend = this.extendArr(expZSum_reshape, 1, cols);
  var outZ = math.dotDivide(expZ, expZSumExtend);
  return outZ;
};

/**
 * 将一个list中最大的数的 位置输出。
 * 1. 输入：普通list;
 * 2. 输出：类别，"A", "B",...
 */
NN.prototype.classOfAOnehot = function(aOnehot, classesStore) {
  var maxOfRow = Math.max(...aOnehot);
  var idxOfMax = aOnehot.indexOf(maxOfRow); // 得到当前行最大数的位置，为num格式
  var cl = classesStore[idxOfMax];
  return cl;
};

/**
 * 计算前传得到的输出 概率
 * @param X 输入，输入为一个样本
 * @param W
 * @param b 一行多列
 */
NN.prototype.calcProbInFP = function(X, W, b) {
  // Z1 = X*W + b
  var Z1 = math.add(math.multiply(X, W[1]), b[1]); // (n,4)
  // console.log("Z1:", Z1);
  var A1 = this.sigmoid(Z1); // (n,4)
  // console.log("A1:", A1);

  var Z2 = math.add(math.multiply(A1, W[2]), b[2]); // (n,3)
  // console.log("Z2:", Z2);
  var A2 = this.softmax(Z2); // (n,3)
  // console.log("A2:", A2);
  return A2;
};

/**
 * NN解决多分类问题。
 * 输入到此的数据格式：
 * inputX: 被scaling后的。
 * inputY：onehot
 * @param layerList 存储NN每一层的信息 [ 输入Features个数，L1层神经元数目，L2层，，，输出层元数即分类数]
 */
NN.prototype.modelTrainCV = function(
  layerList,
  stepSize,
  stepTotal,
  optimizer,
  lambda,
  isLogW,
  gxLen
) {
  this.layerList = layerList; // 包含 输入层、所有隐层、输出层, [numOfFeatures, m1,m2,..., numOfClass]
  // 注意list存储的每一层的神经元个数，但不包括 bias元。
  var len_layerList = this.layerList.length; // 隐层数目为 len - 2
  // var numOfFeatures = this.layerList[0];
  // var numOfClass = this.layerList[len_layerList - 1];

  this.stepSize = stepSize || 0.1;
  this.stepTotal = stepTotal || 100;
  this.optimizer = optimizer || "GD";
  this.lambda = lambda || 0; // 惩罚项的系数
  this.isLogW = isLogW || true;
  this.gxLen = gxLen || 50;
  // 为了 RMSProp, Adadelta 等优化器设置的，梯度计算时需要考虑到之前的梯度或dw 的个数。

  var X = this.inputX; // 多行2列，因为只有2个Features
  var XT = math.transpose(X);
  var Y = this.inputY; // 多行3列（若3类的话）

  // 初始化 W,b
  var W = []; // 用 W 存储所有的w, [empty, [], [],...]
  var b = []; // 用 b 存储所有的b, [empty, [], [],...]
  var ZStore = []; // 存储 Z1, Z2,...
  var AStore = []; // 存储 A1, A2,...
  var dCdWStore = []; // 存储 dCdW1, dCdW2, ...
  var dCdbStore = [];
  var dWStore = []; // 存储 dW1, dW2, ...
  var dbStore = [];
  this.ALarr = []; // 存储每一步NN模型前向的输出 多行3列，用作计算cost
  for (let i = 1; i < len_layerList; i++) {
    // 层数从 0开始计数，L0, L1, L2。
    W[i] = math.random([layerList[i - 1], layerList[i]], -1, 1);
    b[i] = math.random([1, layerList[i]], -1, 1); // b的维度：n行多列，n为样本数目

    // 初始化 Store
    dCdWStore[i] = [];
    dCdbStore[i] = [];
    dWStore[i] = [];
    dbStore[i] = [];
  }

  // 迭代优化参数
  var dCdW2Arr = []; // 记录每一步的 dCdW 即gt. 在 dCdWStore[2]
  var dCdb2Arr = []; // dCdbStore[2]
  var dCdW1Arr = []; // dCdWStore[1]
  var dCdb1Arr = []; // dCdbStore[1]

  var dW2Arr = []; // 记录了每一步迭代时，dW2, dWStore[2]
  var db2Arr = []; // dbStore[2]
  var dW1Arr = []; // dWStore[1]
  var db1Arr = []; // dbStore[1]
  for (let i = 0; i < this.stepTotal; i++) {
    // ================= 前向传播 ====================
    // 输入为 X

    // L1
    // var Z1 = X * W[1] + b[1]; // (n,4)
    // var b = this.extendArr(b[i],0,X.size()[0]);
    var Z1 = math.add(
      math.multiply(X, W[1]),
      this.extendArr(math.matrix(b[1]), 0, X.size()[0])
    ); // (n,4)
    var A1 = this.sigmoid(Z1); // (n,4)

    // L2
    // var Z2 = A1 * W[2] + b[2];
    var Z2 = math.add(
      math.multiply(A1, W[2]),
      this.extendArr(math.matrix(b[2]), 0, X.size()[0])
    ); // (n,3)
    var A2 = this.softmax(Z2); // (n,3)
    this.ALarr.push(A2);
    // softmax输出为概率

    // ================== 反向传播 =========================
    var A1T = math.transpose(A1);
    // var delta2 = A2i - 1; // 注意此处是 label对应类处 才减一。 比如 [a,b-1,c] 第二类为label类，则只在第二类 减一。

    // 尝试2 ==========================
    // =================传播的起点，核心 ===
    var delta2 = math.subtract(A2, Y); // 这是对的了。正确的类别位置减一，其它位置不变。

    // var dCdW2 = A1T * delta2 + lambda * W[2];
    var dCdW2 = math.add(
      math.multiply(A1T, delta2),
      math.dotMultiply(this.lambda, W[2])
    ); // (4,3)
    // var dCdb2 = delta2; // (n,3)
    var dCdb2 = math.sum(delta2, 0);
    math.reshape(dCdb2, [1, dCdb2.size()[0]]);

    // var delta1 = delta2 * W2T .* ( sz1*(1-sz1) );
    var delta1_left = math.multiply(delta2, math.transpose(W[2])); // (n,3)(3,4)=(n,4)
    var sigmoid_Z1 = this.sigmoid(Z1); // (n,4)
    var delta1_right = math.dotMultiply(
      sigmoid_Z1,
      math.subtract(1, sigmoid_Z1)
    ); // (n,4)
    var delta1 = math.dotMultiply(delta1_left, delta1_right); // (n,4)
    // console.log("delta1:", delta1);
    // var dW1 = XT * delta1 + lambda * W[1];
    var dCdW1 = math.add(
      math.multiply(XT, delta1), // (2,n)(n,4)=(2,4)
      math.multiply(this.lambda, W[1]) // (2,4)
    ); // (2,4)
    // var db1 = delta1; // (n,4)
    var dCdb1 = math.sum(delta1, 0);
    math.reshape(dCdb1, [1, dCdb1.size()[0]]);

    // ============== 更新 W，b ==================

    if (this.optimizer == "GD" || this.optimizer == 0) {
      // console.log("当前优化器 GD");
      W[2] = this.GradientDescent(W[2], this.stepSize, dCdW2);
      b[2] = this.GradientDescent(b[2], this.stepSize, dCdb2);
      W[1] = this.GradientDescent(W[1], this.stepSize, dCdW1);
      b[1] = this.GradientDescent(b[1], this.stepSize, dCdb1);
    } else if (this.optimizer == "RMSProp" || this.optimizer == 1) {
      // console.log("当前优化器 RMSProp new", i);
      W[2] = this.RMSProp_new(W[2], this.stepSize, dCdW2, dCdW2Arr, this.gxLen);
      b[2] = this.RMSProp_new(b[2], this.stepSize, dCdb2, dCdb2Arr, this.gxLen);
      W[1] = this.RMSProp_new(W[1], this.stepSize, dCdW1, dCdW1Arr, this.gxLen);
      b[1] = this.RMSProp_new(b[1], this.stepSize, dCdb1, dCdb1Arr, this.gxLen);
    } else if (this.optimizer == "Adadelta" || this.optimizer == 2) {
      W[2] = this.Adadelta_new(
        W[2],
        this.stepSize,
        dCdW2,
        dCdW2Arr,
        dW2Arr,
        this.gxLen
      );
      b[2] = this.Adadelta_new(
        b[2],
        this.stepSize,
        dCdb2,
        dCdb2Arr,
        db2Arr,
        this.gxLen
      );
      W[1] = this.Adadelta_new(
        W[1],
        this.stepSize,
        dCdW1,
        dCdW1Arr,
        dW1Arr,
        this.gxLen
      );
      b[1] = this.Adadelta_new(
        b[1],
        this.stepSize,
        dCdb1,
        dCdb1Arr,
        db1Arr,
        this.gxLen
      );
    }
  }
  // console.log("A2:", A2);
  // console.log(this.optimizer);
  this.W = W;
  this.b = b;

  return this;
};
/**
 * 有了模型的softmax输出的关于概率数据的矩阵后，使用 -log 计算cost
 * @param ALarr 模型的输出 作为这里的输入，多行3列，若3类的话。
 * @param Y Labels，onehot格式
 * @returns 输出每一个迭代步所对应的 cost
 */
NN.prototype.calcCostArr = function(ALarr, Y) {
  // cost = -log(ALi)
  let costArr = [];
  // console.log("ALarr:", ALarr);
  // console.log("Y:", Y);
  ALarr.forEach(item => {
    // console.log("item.valueOf():", item.valueOf());
    let cost_mean = this.calcOneCost(item, Y);
    costArr.push(cost_mean);
  });

  return costArr;
};
NN.prototype.calcOneCost = function(AL, Y) {
  // lost = -y*log(h) - (1-y)*log(1-h) 但考虑到 一行中 概率和为1，
  // 故可简化为只考虑真实类别位置，求 -log(ALi)
  // 先对AL -log
  var minuslogAL = math.multiply(-1, math.log(AL));
  var minuslogALy = math.dotMultiply(Y, minuslogAL);
  var cost_mean = math.mean(minuslogALy);

  // let hy = math.dotMultiply(AL, Y);
  // console.log("hy:", hy);
  // let cost = math.dotMultiply(-1, math.log(hy));
  // let cost_mean = math.mean(cost);
  return cost_mean;
};
// ========================================================================
// ========================== 导出 ========================================
// ========================================================================
// es5写法：导出一个模块对象。 是一个json对象。
// 在其他文件使用时，也是import进了json对象
// module.exports = {
// ML: ML
// };

// es6
export default ML;
