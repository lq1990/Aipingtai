// 继承
function Stu(name, age) {
  var ss = 1; // 私有变量不会子类被继承
  this.name = name;
  this.age = age;
  this.alert = function() {
    console.log("alert " + this.name);
  };
}

Stu.prototype.show = function() {
  console.log(this.name, this.age);
};

function Dog(name, age) {}

function MidStu(name, age) {
  this.stu = Stu;
  this.stu(name, age); // js 中实际上是通过对象冒充，来实现对象继承。
  // 第二句不能少，因为js为动态语言，若无第二句则并不会真正的继承。
  // 注意：此种方法不会继承 Stu原型上的方法

  // 使用 对象冒充的方法，可以实现多重继承
  this.dog = Dog;
  this.dog(name, age);

  // 方法覆盖
  this.alert = function() {
    console.log("in midstu, alert: ");
  };
}

function Pupil(name, age) {
  this.stu = Stu;
  this.stu(name, age);
}

var s1 = new Stu("stu", "100");
console.log(s1.ss);
s1.show();
var m1 = new MidStu("midstu", "1");
console.log("m1:", m1);
m1.alert();
// m1.show(); // error
// console.log(m1);

// ================= 重载 ===============================
// function abc(a, b, c) {
//   if (arguments.length == 1) {
//     console.log("length=1", a);
//   } else if (arguments.length == 2) {
//     console.log("length=2,", a, b);
//   } else {
//     console.log("length>2");
//   }
// }

// abc(11, 22);
