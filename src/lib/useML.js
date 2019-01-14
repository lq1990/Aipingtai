const math = require("mathjs");
// 将data进行 二分类，使用逻辑回归

var X = [
  [1, 1, 2],
  [1, 2, 3],
  [1, 4, 2],
  [1, 100, 100],
  [1, 88, 88],
  [1, 99, 99]
]; // (6,2)
var Y = [[0], [0], [0], [1], [1], [1]];
var W = math.ones(3, 1);
console.log("W:", W);

var matX = math.matrix(X);
var matX_T = math.transpose(matX);

for (var i = 0; i < 1; i++) {
  var Z = math.multiply(matX, W); // (6,1)

  // console.log("Z:", Z);
  // console.log(math.dotDivide(1, Z));
  // console.log(math.add(Z, 1));
  // console.log(math.multiply(Z, -1));
  // console.log("dotPow(Z,2): ", math.dotPow(Z, 2));

  var H = sigmoid(Z);
  // console.log("H:", H);

  var matY = math.matrix(Y);
  var HminusY = math.subtract(H, matY);
  // console.log("matY:", matY);
  // console.log("HminusY:", HminusY);

  var dCdW = math.multiply(matX_T, HminusY);
  // console.log("dCdW: ", dCdW);

  // W = W - math.multiply(0.01, dCdW)
  W = math.subtract(W, math.multiply(0.01, dCdW));
  console.log("W: " + W + ", i: " + i + "============================");
}

function sigmoid(inp) {
  //   var out = 1 / (1 + Math.E ** -inp);
  var num = 1;
  var expMinusZ = math.dotPow(Math.E, math.multiply(-1, inp));
  var den = math.add(1, expMinusZ); // 加减可以直接进行 elementwise。但乘除必须用dot。
  var out = math.dotDivide(num, den);
  return out;
}
