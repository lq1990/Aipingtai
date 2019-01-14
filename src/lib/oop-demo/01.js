/*
var obj = new Object();

console.log(obj);

obj.name = "blue";
obj.qq= "1191919";

obj.showName = function () {
    console.log("my name is "+this.name);
};
obj.showQQ = function () {
    console.log("my qq is "+this.qq);
}

obj.showName();
obj.showQQ();

// 上面为最基本的OOP，方法、属性，创建、使用都有了。
// 但缺点是：当有多个 对象时，创建会很麻烦
*/
// ============================== 改进 =================================
/*
// 起名：构造函数
// 为了构建一个对象。
// 此种构造的方式称为：工厂方式 （区别于设计模式中的工厂模式）。

function createPerson(name, qq) {
  // 原料
  var obj = new Object();

  // 加工
  obj.name = name;
  obj.qq = qq;

  obj.showName = function() {
    console.log("name is " + this.name);
  };
  obj.showQQ = function() {
    console.log("qq is " + this.qq);
  };

  // 出厂
  return obj;
}

var obj1 = createPerson("blue", "78787878");
obj1.showName();
obj1.showQQ();

var obj2 = createPerson("jkjk", "787873232323878");
obj2.showName();
obj2.showQQ();

// 以上方法缺点：1. 不能 new 一个， 2. 函数中有方法，费内存
 
//  ======================== 改进 ==========================================
function createPerson(name, qq) {
  // var this = new Ojbect(); // 系统偷偷地干了
  this.name = name;
  this.qq = qq;

  this.show = function() {
    console.log(this.name, this.qq);
  };

  //   return this; // 系统偷偷的干了
}

var obj1 = new createPerson("anna", "123");
var obj2 = new createPerson("beta", "789");

obj1.show();
obj2.show();

// 问题： 方法重复

// ========================== 改进 =================================
var arr1 = new Array(4, 6, 8, 9, 21, 45);
var arr2 = new Array(4, 6, 8);

// 给系统的类添加 方法
Array.prototype.sum = function() {
  var res = 0;
  for (var i = 0; i < this.length; i++) {
    res += this[i];
  }
  return res;
};

console.log(arr1.sum() + "\n");
console.log(arr2.sum() + "\n");
*/

function createPerson(name, qq) {
  // var this = new Ojbect(); // 系统偷偷地干了
  this.name = name;
  this.qq = qq;

  //   return this; // 系统偷偷的干了
}
// 往自己的类添加方法
createPerson.prototype.show = function() {
  console.log(this.name, this.qq);
};

var obj1 = new createPerson("anna", "123");
var obj2 = new createPerson("beta", "789");

obj1.show();
obj2.show();
