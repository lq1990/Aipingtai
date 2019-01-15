const math = require("mathjs");
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
// console.log(X_original.length);
// var Ones = math.ones(X_original.length, 1);
// var X_trans = math.concat(Ones, X_original);
// console.log(X_trans);

var m1 = math.matrix(X_original);
// console.log("m1:", m1.valueOf());

var arr = [];
arr.push(math.ones(3, 1).valueOf());
arr.push(math.zeros(3, 1).valueOf());
arr.push(math.ones(3, 1).valueOf());
arr.push(math.zeros(3, 1).valueOf());
console.log("arr:", arr);
