/*
function show(a, b) {
  console.log(this);
  console.log(a, b);
}

show.call(123, 1, 2); // [Number: 123] 1 2
// call可以改变函数执行时，里面的this
*/

function A() {
  this.abc = 123;
}

A.prototype.showA = function() {
  console.log("showA_content");
};

// 继承属性
function B() {
  // this -> new B()
  A.call(this); // 使得B 的this也有了 this.abc = 123
}
// 继承方法
for (var i in A.prototype) {
  console.log(i); // showA
  //   console.log(typeof i);
  B.prototype[i] = A.prototype[i];
  // 往B的原型 obj上动态添加，实现深度拷贝
}

var b1 = new B();
console.log(b1.abc); // 123
b1.showA();
