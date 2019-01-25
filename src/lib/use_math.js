const math = require("mathjs");

// var res = math.ones(4, 3);
// console.log("res:", res);

var a = [[11, 2, 3]];
a.push([4, 55, 6]);
a.push([7, 8, 99]);
a.push([111, 22, 33]);
// console.log("a:", a);
var ma = math.matrix(a);
console.log("ma:", ma);
var res = math.sum(ma, 0);
math.reshape(res, [1, res.size()[0]]);
console.log("res:", res);
// var res = [math.mean(ma, 0).valueOf()];

// math.reshape(res, [1, 3]);
// console.log("res:", math.matrix(res));
// console.log("res1:", res1);
// var maVal = ma.valueOf();
// console.log("maVal:", maVal);

// maVal.forEach(function(item, index) {
//   console.log("item:", item);
//   console.log("index:", index);

//   var maxV = Math.max(...item);
//   var idx = item.indexOf(maxV);
//   console.log("idx:", idx);
// });

// var l = [3, 5, 7];
// var maxl = Math.max(...l);
// console.log("maxl:", maxl);

// console.log("ma:", ma);
// console.log("res:", res);

// 使用forEach会遍历 矩阵中每一个单一元素，
// math.forEach(ma, function(item, index, arr) {
//   console.log("item:", item);
//   console.log("index:", index);
//   console.log("arr:", arr);
// });

// var res = math.random([3, 2], -1, 1);
// console.log("res:", res, typeof res);
// var res = math.sum(ma, 1);
// console.log("res:", res);
// var ma1 = math.matrix(ma);
// console.log("ma1:", ma1);

// var size0 = ma.size()[0];
// var size1 = ma.size()[1];
// var size2 = ma.size()[2];
// console.log("ma.size():", ma.size());
// console.log("math.range(0,0):", math.range(0, 0));

// var res = ma.subset(
//   math.index(math.range(0, 0), math.range(0, size1), math.range(0, size2))
// );
// console.log("res.size():", res.size());
// console.log("res:", res.valueOf());
// console.log("ma:", ma);
// // var res = math.reshape(ma, [3, 3]);
// ma.reshape([a.length, 3]);
// // console.log("res:", res);
// console.log("ma:", ma);
// var mean_ma = math.mean(ma, 0).reshape([3, 1]);
// console.log("mean_ma:", mean_ma);
// var x = [
//   [1, 2],
//   [2, 3],
//   [4, 2],
//   [20, 40],
//   [19, 40],
//   [40, 20],
//   [40, 19],
//   [100, 60],
//   [90, 60],
//   [88, 88],
//   [99, 99],
//   [70, 70],
//   [59, 100],
//   [60, 101]
// ];

// var m1 = math.matrix(x);
// console.log("m1:", m1);
// var m1Val = m1.valueOf();
// console.log(m1Val[0][0]);
// // 使用 subset 替换
// var m1 = math.matrix(x);
// var res = math.subset(
//   m1,
//   math.index(math.range(0, m1.size()[0]), 0),
//   math.zeros(m1.size()[0], 1)
// );
// // console.log("res:", res);
// var idx;
// math.forEach(res, (item, index) => {
//   if (index[0] != 0) {
//     return;
//   }
//   if (item == 0) {
//     console.log("index:", index);
//     idx = index;
//   }
//   //   if (index[0] == 0) {
//   //     console.log("item:", item);
//   //     console.log("index:", index);
//   //   }
// });
// console.log("idx:", idx);
// console.log("idx[1]:", idx[1]);

// // console.log("m1:", m1);
// // var resMin = math.min(m1, 0); // 按照列
// // var resMax = math.max(m1, 0);
// // var resMean = math.mean(m1, 0);
// // console.log("resMin:", resMin);
// // console.log(resMin.size()[0]);

// // console.log("resMax:", resMax);
// // console.log("resMean:", resMean);

// // var resMinNew = math.reshape(resMin, [1, 2]);
// // var resMaxNew = math.reshape(resMax, [1, 2]);
// // console.log("resMinNew:", resMinNew);
// // console.log("resMaxNew:", resMaxNew);
// // console.log(math.range(0, 5));
// // /*

// /**
//  * math自带的 math.std() 方法不能按照 列方向或行方向进行求值。
//  * 自己写的，按照列方向求标准差。
//  * @param {*} inp math.matrix 格式
//  * @param {*} dir 0: 列方向
//  * @returns 当为列方向时，输出为 一行的向量 [a,b,...]
//  */
// function myStd(inp, dir) {
//   var direc = dir || 0;
//   if (direc === 0) {
//     // 按照列方向
//     var rows = inp.size()[0];
//     var cols = inp.size()[1];
//     var listStd = [];
//     for (var i = 0; i < cols; i++) {
//       // 取出inp第i列所有的数
//       var iColData = math.subset(inp, math.index(math.range(0, rows), i));
//       var tempStd = math.std(iColData); // math.std 不能按照矩阵某一列计算标准差，所以只能自己写了
//       listStd.push(tempStd);
//     }
//     return math.matrix(listStd);
//   }
// }

// var resStd = myStd(m1, 0);
// console.log("resStd:", resStd);
// // */

// /**
//  * 为了实现矩阵减法 [[a,b],[c,d],...] - [[aa,bb]] ，需扩展第二项。使得两者维度一样
//  * @param {*} inp 为第二项即减数, math.matrix() 格式
//  * @param {*} dir 扩充的方向，0：列方向， 1：行方向
//  * @param {*} num 扩充到多少列、行
//  */
// function extendArr(inp, dir, num) {
//   var arrNew = inp.clone();
//   while (arrNew.size()[0] < num) {
//     arrNew = math.concat(arrNew, inp, dir);
//   }
//   return arrNew;
// }

// var arr = math.matrix([[1, 2]]);
// var arrNew = extendArr(arr, 0, m1.size()[0]);

// res = math.subtract(m1, arrNew);
// console.log("res:", res);
