// oop：封装
function Person(name, agei, sal) {
  this.name = name; // 公开的
  var age = agei; // 私有
  var salary = sal; // 私有

  // 若希望操作私有属性，可用公开方法实现
  this.show = function() {
    console.log(age);
  };

  // 私有方法。不能被实例调用。
  function show2() {}
}

var p1 = new Person("sp", 20, 50000);
console.log(p1.name, p1.age, p1.salary);
p1.show();
