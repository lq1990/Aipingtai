(function(t){function e(e){for(var n,i,o=e[0],l=e[1],c=e[2],d=0,f=[];d<o.length;d++)i=o[d],r[i]&&f.push(r[i][0]),r[i]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);u&&u(e);while(f.length)f.shift()();return s.push.apply(s,c||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],n=!0,o=1;o<a.length;o++){var l=a[o];0!==r[l]&&(n=!1)}n&&(s.splice(e--,1),t=i(i.s=a[0]))}return t}var n={},r={app:0},s=[];function i(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=n,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(a,n,function(e){return t[e]}.bind(null,n));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=l;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"07bb":function(t,e,a){},"150a":function(t,e,a){"use strict";var n=a("58c5"),r=a.n(n);r.a},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("097d");var n=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("el-row",{staticClass:"header-large hidden-xs-only"},[a("el-menu",{staticClass:"header-menu",attrs:{mode:"horizontal","background-color":"#fb5a52","text-color":"#fff","active-text-color":"#000",router:!0,"menu-trigger":"click"}},[a("el-menu-item",{staticClass:"header-title",attrs:{index:"/"}},[t._v("人工智能平台")]),a("el-menu-item",{attrs:{index:"/demo"}},[t._v("示例")]),a("el-menu-item",{attrs:{index:"tutorial"}},[t._v("教学")]),a("el-menu-item",{attrs:{index:"application"}},[t._v("应用")]),a("div",{staticClass:"header-split"},[t._v("|")]),a("div",{staticClass:"header-split"},[t._v("|")]),a("div",{staticClass:"header-split"},[t._v("|")]),a("div",{staticClass:"header-split"},[t._v("|")]),a("div",{staticClass:"header-split"},[t._v("|")]),a("el-menu-item",{attrs:{index:"about"}},[t._v("关于")])],1)],1),a("el-row",{staticClass:"header-small hidden-sm-and-up"},[a("router-link",{staticClass:"header-title",attrs:{to:"/",tag:"div"}},[t._v("人工智能平台")]),a("el-menu",{staticClass:"header-menu",attrs:{"default-active":"1",mode:"horizontal","background-color":"#fb5a52","text-color":"#fff","active-text-color":"#000",router:!0,"menu-trigger":"click"}},[a("el-submenu",{staticStyle:{width:"100%"},attrs:{index:"1"}},[a("template",{slot:"title"},[a("i",{staticClass:"el-icon-menu",staticStyle:{color:"#fff"}})]),a("el-menu-item",{attrs:{index:"demo"}},[t._v("示例")]),a("el-menu-item",{attrs:{index:"tutorial"}},[t._v("教学")]),a("el-menu-item",{attrs:{index:"application"}},[t._v("应用")]),a("el-menu-item",{attrs:{index:"about"}},[t._v("关于")])],2)],1)],1),a("router-view")],1)},s=[],i={name:"app",data:function(){return{}},methods:{},mounted:function(){},components:{},watch:{}},o=i,l=(a("150a"),a("b0a0"),a("2877")),c=Object(l["a"])(o,r,s,!1,null,"66eb62c4",null);c.options.__file="App.vue";var u=c.exports,d=a("8c4f"),f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[t._m(0),a("div",{staticClass:"large hidden-xs-only"},[a("el-row",{attrs:{type:"flex",justify:"space-around"}},[a("el-col",{attrs:{span:7}},[a("el-card",{staticClass:"card",attrs:{shadow:"always"}},[t._v("\n          示例\n          \n        ")])],1),a("el-col",{attrs:{span:7}},[a("el-card",{staticClass:"card",attrs:{shadow:"always"}},[t._v("教学")])],1),a("el-col",{attrs:{span:7}},[a("el-card",{staticClass:"card",attrs:{shadow:"always"}},[t._v("应用")])],1)],1)],1),a("div",{staticClass:"small hidden-sm-and-up"},[a("el-card",{staticClass:"card",attrs:{shadow:"always"}},[t._v("示例")]),a("el-card",{staticClass:"card",attrs:{shadow:"always"}},[t._v("教学")]),a("el-card",{staticClass:"card",attrs:{shadow:"always"}},[t._v("应用")])],1),t._m(1)])},p=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h2",[t._v("领略人工智能的魅力，\n    "),a("br"),t._v("让技术更好地服务我们。\n  ")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"footer"},[a("p",[t._v("©2019 文刀出品")])])}],v={name:"home",components:{}},m=v,_=(a("754a"),Object(l["a"])(m,f,p,!1,null,"587c3a1f",null));_.options.__file="Home.vue";var h=_.exports,b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"demo"},[a("el-row",{staticClass:"main-body",attrs:{gutter:0,type:"flex",justify:"space-around"}},[a("el-col",{attrs:{span:6}},[a("div",{},[t._v("main-left")])]),a("el-col",{attrs:{span:6}},[a("div",{},[t._v("main-right")])])],1),a("p",[t._v("\n    展示游乐场\n    左侧：画布\n    右侧上：模型选择\n    右侧下：模型参数\n    右侧底：训练 按钮\n  ")]),a("canvas",{attrs:{id:"cs",width:"600",height:"600"}},[t._v("\n    友情提示：此处是画布。为了更好地体验，请升级您的浏览器。\n  ")])],1)},w=[],x={name:"demo",data:function(){return{}}},y=x,C=Object(l["a"])(y,b,w,!1,null,"0577489a",null);C.options.__file="Demo.vue";var g=C.exports,j=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tutorial"},[t._v("\n  \n    针对对象：\n        初识机器学习算法，欲深入了解算法原理的人群。\n    所需基础：\n        高等数学、线性代数、概率论。\n        Python 或 Javascirpt\n    讲解方式：\n        以视频为主，轻松有趣。\n\n  \n    \n")])},O=[],$={name:"tutorial",data:function(){return{}}},E=$,k=Object(l["a"])(E,j,O,!1,null,"1477f399",null);k.options.__file="Tutorial.vue";var S=k.exports,P=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"application"},[t._v("\n  \n    平台助您实现轻松数据挖掘，将您手里的数据点石成金。\n\n    涵盖：数据挖掘、图像处理\n  \n    \n")])},T=[],M={name:"application",data:function(){return{}}},z=M,A=Object(l["a"])(z,P,T,!1,null,"8475758a",null);A.options.__file="Application.vue";var J=A.exports,D=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},H=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"about"},[a("h1",[t._v("This is an about page")])])}],I={name:"about",data:function(){return{}}},q=I,B=Object(l["a"])(q,D,H,!1,null,"7dce6d86",null);B.options.__file="About.vue";var F=B.exports;n["default"].use(d["a"]);var G=new d["a"]({routes:[{path:"/",name:"home",component:h},{path:"/demo",name:"demo",component:g},{path:"/tutorial",name:"tutorial",component:S},{path:"/application",name:"applicatioin",component:J},{path:"/about",name:"about",component:F}]}),K=a("2f62");n["default"].use(K["a"]);var L=new K["a"].Store({state:{},mutations:{},actions:{}}),N=a("5c96"),Q=a.n(N);a("0fae"),a("e05f");n["default"].use(Q.a,{zIndex:3e3}),n["default"].config.productionTip=!1,new n["default"]({router:G,store:L,render:function(t){return t(u)}}).$mount("#app")},"58c5":function(t,e,a){},"754a":function(t,e,a){"use strict";var n=a("ae4e"),r=a.n(n);r.a},ae4e:function(t,e,a){},b0a0:function(t,e,a){"use strict";var n=a("07bb"),r=a.n(n);r.a}});
//# sourceMappingURL=app.5510db0f.js.map