var ML = {
  LR: LR
};
/**
 * Common中存储 所有ML算法公用的属性方法
 */
function Common() {}
Common.prototype.canvas2MLData = function() {};

function LR(inp, x, y) {
  this.inp = inp;
  this.x = x;
  this.y = y;
}

for (var i in Common.prototype) {
  LR.prototype[i] = Common.prototype[i];
}

LR.prototype.show = function() {
  console.log("in LR, this: ", this);
  console.log("in LR, " + this.x);
};

ML.NN = function(inp) {
  this.x = inp;
};

ML.NN.prototype.show = function() {
  console.log("in NN, " + this.x);
};

module.exports = {
  ML: ML
};
