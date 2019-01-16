// 使用工厂模式
function Car(brand) {
  // this = {}
  this.brand = brand || "Not Found";
  this.__proto__.test = function() {
    console.log("test...");
  };
  //   return this
}

Car.prototype.logBrand = function() {
  console.log(this.brand);
};

// 可以轻易实现，创建多个实例
var c1 = new Car("VW");
c1.logBrand();
c1.test();

var c2 = new Car("BMW");
c2.logBrand();

// 原型链中 new很关键，new实现了constructor，constructor会先运行原型上的方法，然后再执行自定义的的，
// 当自定义的和原型上的冲突时，自定义的会覆盖原始的。

// 有了new，会先生成一个空 {}
// this = {}
// 再往this即{}中添加方法属性

// c1.__proto__ = Car.prototype
