function Drag(id) {
  // var this = new Object();
  var _this = this;
  console.log("Drag: ", this); // Drag
  this.disX = 0;
  this.disY = 0;
  this.oDiv = document.getElementById(id);
  this.oDiv.onmousedown = function(ev) {
    _this.fnDown(ev); // 此处不能直接用this，此处的this指向的不是Drag而是oDiv
    console.log("oDiv.onmousedown: ", this); //  oDiv
    return false; // 防止div框中被选中
  };
  // return this;
}

Drag.prototype.fnDown = function(ev) {
  var _this = this;
  var oEvent = ev || event;
  console.log("oEvent.clientX:", oEvent.clientX);
  console.log("this.oDiv.offsetLeft:", this.oDiv.offsetLeft);

  this.disX = oEvent.clientX - this.oDiv.offsetLeft;
  // clientX: 鼠标点击位置的X，
  // offsetLeft：div框左侧距离
  // disX：鼠标点击位置 相对于div框左上角点 的位置
  this.disY = oEvent.clientY - this.oDiv.offsetTop;

  document.onmousemove = function(ev) {
    _this.fnMove(ev);
  };

  document.onmouseup = function() {
    _this.fnUp();
  };
};

Drag.prototype.fnMove = function(ev) {
  var oEvent = ev || event;
  this.oDiv.style.left = oEvent.clientX - this.disX + "px";
  this.oDiv.style.top = oEvent.clientY - this.disY + "px";
};

Drag.prototype.fnUp = function() {
  document.onmousemove = null;
  document.onmouseup = null;
};
