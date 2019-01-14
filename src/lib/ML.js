function ML(obj) {
  this._init(obj);
}

ML.prototype._init = function(obj) {
  this.a = obj.a || null;
  this.b = obj.b || 0;
};

ML.prototype.show = function() {
  console.log(this.a, this.b);
};

var m1 = new ML({});
m1.show();
