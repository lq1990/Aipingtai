(function(t){function e(e){for(var a,r,o=e[0],l=e[1],c=e[2],h=0,p=[];h<o.length;h++)r=o[h],i[r]&&p.push(i[r][0]),i[r]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);u&&u(e);while(p.length)p.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],a=!0,o=1;o<n.length;o++){var l=n[o];0!==i[l]&&(a=!1)}a&&(s.splice(e--,1),t=r(r.s=n[0]))}return t}var a={},i={app:0},s=[];function r(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=a,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(n,a,function(e){return t[e]}.bind(null,a));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=l;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0290":function(t,e,n){},"07bb":function(t,e,n){},"3fd1":function(t,e,n){"use strict";var a=n("7819"),i=n.n(a);i.a},"4d52":function(t,e,n){"use strict";var a=n("81f6"),i=n.n(a);i.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("097d");var a=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("el-row",{staticClass:"header-large hidden-xs-only"},[n("el-menu",{staticClass:"header-menu",attrs:{mode:"horizontal","background-color":"#fb5a52","text-color":"#fff","active-text-color":"#000",router:!0,"menu-trigger":"click"}},[n("el-menu-item",{staticClass:"header-title",attrs:{index:"/"}},[t._v("平台")]),n("el-menu-item",{attrs:{index:"/demo"}},[t._v("示例")]),n("el-menu-item",{attrs:{index:"tutorial"}},[t._v("教学")]),n("el-menu-item",{attrs:{index:"application"}},[t._v("应用")]),n("div",{staticClass:"header-split"},[t._v("|")]),n("div",{staticClass:"header-split"},[t._v("|")]),n("div",{staticClass:"header-split"},[t._v("|")]),n("div",{staticClass:"header-split"},[t._v("|")]),n("div",{staticClass:"header-split"},[t._v("|")]),n("el-menu-item",{attrs:{index:"about"}},[t._v("关于")])],1)],1),n("el-row",{staticClass:"header-small hidden-sm-and-up"},[n("router-link",{staticClass:"header-title",attrs:{to:"/",tag:"div"}},[t._v("平台")]),n("el-menu",{staticClass:"header-menu",attrs:{"default-active":"1",mode:"horizontal","background-color":"#fb5a52","text-color":"#fff","active-text-color":"#fff",router:!0,"menu-trigger":"click"}},[n("el-submenu",{staticStyle:{width:"100%"},attrs:{index:"1"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-menu",staticStyle:{color:"#fff"}})]),n("el-menu-item",{attrs:{index:"demo"}},[t._v("示例")]),n("el-menu-item",{attrs:{index:"tutorial"}},[t._v("教学")]),n("el-menu-item",{attrs:{index:"application"}},[t._v("应用")]),n("el-menu-item",{attrs:{index:"about"}},[t._v("关于")])],2)],1)],1),n("router-view")],1)},s=[],r={name:"app",data:function(){return{}},methods:{},mounted:function(){},components:{},watch:{}},o=r,l=(n("4d52"),n("b0a0"),n("2877")),c=Object(l["a"])(o,i,s,!1,null,"0fabe67a",null);c.options.__file="App.vue";var u=c.exports,h=n("8c4f"),p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[t._m(0),n("div",{staticClass:"large hidden-xs-only"},[n("el-row",{attrs:{type:"flex",justify:"space-around"}},[n("el-col",{attrs:{span:7}},[n("el-card",{staticClass:"card",attrs:{shadow:"always"}},[t._v("\n          示例\n          \n        ")])],1),n("el-col",{attrs:{span:7}},[n("el-card",{staticClass:"card",attrs:{shadow:"always"}},[t._v("教学")])],1),n("el-col",{attrs:{span:7}},[n("el-card",{staticClass:"card",attrs:{shadow:"always"}},[t._v("应用")])],1)],1)],1),n("div",{staticClass:"small hidden-sm-and-up"},[n("el-card",{staticClass:"card",attrs:{shadow:"always"}},[t._v("示例")]),n("el-card",{staticClass:"card",attrs:{shadow:"always"}},[t._v("教学")]),n("el-card",{staticClass:"card",attrs:{shadow:"always"}},[t._v("应用")])],1),t._m(1)])},d=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h2",[t._v("领略人工智能的魅力，\n    "),n("br"),t._v("让技术更好地服务我们。\n  ")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"footer"},[n("p",[t._v("©2019 文刀出品")])])}],f={name:"home",components:{}},v=f,g=(n("754a"),Object(l["a"])(v,p,d,!1,null,"587c3a1f",null));g.options.__file="Home.vue";var m=g.exports,y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"demo"},[n("p",{staticStyle:{"text-align":"center"}},[t._v("\n    展示游乐场\n    左侧：画布\n    右侧上：模型选择\n    右侧下：模型参数\n    右侧底：训练 按钮\n  ")]),n("div",{attrs:{id:"container"}}),n("div",{staticStyle:{display:"flex","justify-content":"center",margin:"15px 0"}},[n("el-button",{style:{width:t.width/3+"px"},attrs:{type:"danger"},on:{click:t.handleRun}},[t._v("运行")]),n("el-button",{attrs:{type:"danger"},on:{click:t.handleParams}},[t._v("参数")])],1),n("div",{staticClass:"btn-wrap"},[n("div",{staticClass:"btn-point"},[n("input",{class:{showBtnBorder:t.statusAdd},attrs:{type:"button",value:"添加一点"},on:{mousedown:function(e){t.statusAdd=!0}}}),n("input",{class:{showBtnBorder:!t.statusAdd},attrs:{type:"button",value:"移除某点"},on:{mousedown:function(e){t.statusAdd=!1}}}),n("input",{attrs:{type:"button",value:"清空所有"},on:{mousedown:t.handleClearAll}}),n("input",{attrs:{type:"button",value:"所有点信息"},on:{mousedown:t.showAllDataInfo}})]),n("div",{staticClass:"btn-add-del-color-type"},[n("input",{attrs:{type:"button",value:"添加点类型"},on:{mousedown:t.addColorType}}),n("input",{attrs:{type:"button",value:"删除点类型"},on:{mousedown:t.delColorType}})]),n("div",{staticClass:"color-type"},t._l(t.colorTypeArr,function(e,a){return n("div",{key:a,style:{backgroundColor:t.colorTypeStore[a],width:"25px",height:"25px",cursor:"pointer",borderWidth:t.showWidthStore[a],borderStyle:"solid",borderColor:t.colorTypeStore[a]},on:{mousedown:function(e){t.changeColorType(a)}}})}),0)]),n("div",{staticClass:"chart-wrap"},[n("div",{staticClass:"btnChart"},[n("el-button",{staticClass:"btn",attrs:{type:"danger"},on:{click:t.handleChart}},[t._v("Chart On/Off")])],1),t.isShowChart?n("chart",{staticClass:"mychart",style:{width:t.width+"px",height:2*t.height/3+"px"},attrs:{"cost-arr":t.costArr,"log-wval":t.logWval}}):t._e()],1)])},w=[],b=(n("ac6a"),n("f499")),C=n.n(b),x=n("e814"),S=n.n(x),_=n("faaf"),T=n.n(_),P=n("aabe"),A=n("aabe"),O={Common:W,LogReg:M};function W(){this.Procedure=["inputTrainRaw","inputCS2Mat","inputClean","featureEngineering","featureScaling","modelTrainCV","modelTest( testData )","visulization"]}function R(){this.pho=.9,this.epsilon=Math.pow(10,-8)}function M(){}for(var L in W.prototype={inputTrainRaw:function(t){return this.inputTrainRaw=t,this},inputCS2Mat:function(){var t=this.canvas2MLmat(this.inputTrainRaw),e=t.X,n=t.Y;return this.inputX=e,this.inputY=n,this},inputClean:function(){return this},featureEngineering:function(){return this},featureScaling:function(t){return this.scaleType=t,this.inputX=this.scaling(this.inputX,t),this},modelTrainCV:function(){return this},modelTest:function(){return this},visulization:function(){return this},testDataFromCanvas:function(t,e){for(var n=[],a=0;a<t;a++)for(var i=0;i<e;i++)n.push([a,i]);var s=A.matrix(n);return s},extendArr:function(t,e,n){var a=t.clone();while(a.size()[0]<n)a=A.concat(a,t,e);return a},myStd:function(t,e){var n=e||0;if(0===n){for(var a=t.size()[0],i=t.size()[1],s=[],r=0;r<i;r++){var o=A.subset(t,A.index(A.range(0,a),r)),l=A.std(o);s.push(l)}return A.matrix(s)}},handleDenIs0InScaling:function(t,e){var n=null;if(A.forEach(e,function(t,e){0==e[0]&&0==t&&(n=e)}),null!=n){var a=n[1],i=A.subset(t,A.index(A.range(0,t.size()[0]),a),A.ones(t.size()[0],1));return i}return t},scaling:function(t,e){var n,a=e||1;if(1===a){var i=A.min(t,0),s=A.reshape(i,[1,i.size()[0]]),r=A.max(t,0),o=A.reshape(r,[1,r.size()[0]]),l=this.extendArr(s,0,t.size()[0]),c=this.extendArr(o,0,t.size()[0]),u=A.subtract(t,l),h=A.subtract(c,l);return n=A.dotDivide(u,h),n=this.handleDenIs0InScaling(n,h),this.inputXScaleMinVec=i,this.inputXScaleMaxVec=r,n}var p=A.mean(t,0),d=this.myStd(t,0),f=A.reshape(p,[1,p.size()[0]]),v=A.reshape(d,[1,d.size()[0]]),g=this.extendArr(f,0,t.size()[0]),m=this.extendArr(v,0,t.size()[0]),y=A.subtract(t,g);return n=A.dotDivide(y,m),n=this.handleDenIs0InScaling(n,m),this.inputXScaleMeanVec=p,this.inputXScaleStdVec=d,n},sigmoid:function(t){var e=1,n=A.dotPow(Math.E,A.multiply(-1,t)),a=A.add(1,n),i=A.dotDivide(e,a);return i},labelOfType:function(t){switch(t){case"A":return[0];case"B":return[1];case"C":return[2];case"D":return[3];case"E":return[4];case"F":return[5];case"G":return[6];case"H":return[7];case"I":return[8];case"J":return[9];default:return null}},canvas2MLmat:function(t){var e=this,n=new Array,a=new Array;t.forEach(function(t){var i=t.pos,s=t.type;n.push(i),a.push(e.labelOfType(s))});var i=A.concat(A.ones(n.length,1),n),s=A.matrix(a);return{X:i,Y:s}}},R.prototype={GradientDescent:function(t,e,n){var a=A.subtract(t,A.multiply(e,n));return a},RMSProp:function(t,e,n,a){var i;if(this.pho=.9,this.epsilon=Math.pow(10,-8),0==a.length)return i=this.GradientDescent(t,e,n),i;var s=this.calcRMSgt(n,a,this.pho,this.epsilon),r=A.dotDivide(A.multiply(-e,n),s);return i=A.add(t,r),i},Adadelta:function(t,e,n,a,i){if(this.pho=.9,this.epsilon=Math.pow(10,-8),0==a.length){w=this.GradientDescent(t,e,n);var s=A.subtract(w,t);return{W:w,dW:s}}if(1==a.length)return w=this.RMSProp(t,e,n,a),s=A.subtract(w,t),{W:w,dW:s};var r=this.calcRMSgt(n,a,this.pho,this.epsilon),o=A.matrix(i),l=o.size()[0],c=o.size()[1],u=o.size()[2],h=o.subset(A.index(l-1,A.range(0,c),A.range(0,u))),p=A.matrix(h.valueOf()[0]),d=o.subset(A.index(A.range(0,l-1),A.range(0,c),A.range(0,u))),f=d.valueOf(),v=this.calcRMSgt(p,f,this.pho,this.epsilon),g=A.multiply(-1,A.dotMultiply(v,n)),m=r,y=A.dotDivide(g,m),w=A.add(t,y);return{W:w,dW:y}},calcRMSgt:function(t,e,n,a){var i=t.size()[0],s=A.dotPow(A.matrix(e),2),r=A.reshape(s,[e.length,i]),o=A.mean(r,0),l=A.reshape(o,[i,1]),c=A.dotPow(t,2),u=A.add(A.dotMultiply(n,l),A.dotMultiply(A.subtract(1,n),c)),h=A.sqrt(A.add(u,a));return h}},W.prototype)M.prototype[L]=W.prototype[L];for(var z in R.prototype)M.prototype[z]=R.prototype[z];M.prototype.modelTrainCV=function(t,e,n,a,i){this.stepSize=t||.1,this.stepTotal=e||100,this.optimizer=n||"GD",this.isLogW=a||!1,this.gxLen=i||100;var s=this.inputX,r=this.inputY,o=A.ones(s.size()[1],1),l=A.transpose(s);this.logWval=[o.valueOf()];for(var c=[],u=[],h=0;h<this.stepTotal;h++){var p=A.multiply(s,o),d=this.sigmoid(p),f=A.subtract(d,r),v=A.multiply(l,f);if("GD"==n||0==n)o=this.GradientDescent(o,this.stepSize,v);else if("RMSProp"==n||1==n){o=this.RMSProp(o,this.stepSize,v,c),c.push(v.valueOf());while(c.length>this.gxLen)c.shift()}else if("Adadelta"==n||2==n){var g=this.Adadelta(o,this.stepSize,v,c,u);o=g.W;var m=g.dW;c.push(v.valueOf());while(c.length>this.gxLen)c.shift();u.push(m.valueOf());while(u.length>this.gxLen)u.shift()}this.isLogW&&this.logWval.push(o.valueOf())}return this.optW=o,this.optWval=o.valueOf(),this.optWdetails=this.calcWdetails(this.optWval),this},M.prototype.modelTest=function(){return this},M.prototype.getOptWval=function(){return this.optWval},M.prototype.getOptWdetails=function(){return this.optWdetails},M.prototype.calcWdetails=function(t){var e=t[0][0],n=t[1][0],a=t[2][0],i=-n/a,s=-e/a,r=-e/n;return{w0:e,w1:n,w2:a,coefficientOfX1:i,x2Intercept:s,x1Intercept:r}},M.prototype.calcCostArr=function(t,e,n){for(var a,i,s,r,o,l,c,u=[],h=0;h<t.length;h++){a=A.multiply(e,t[h]),i=this.sigmoid(a),s=A.dotMultiply(A.multiply(-1,n),A.log(i)),o=A.subtract(n,1),l=A.log(A.subtract(1,i)),r=A.dotMultiply(o,l),c=A.add(s,r);var p=A.mean(c);u.push(p)}return u};var I=O,D=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"chart"},[n("v-chart",{attrs:{options:t.lineCost2}})],1)},E=[],k=n("9ca8"),j=(n("ef97"),n("d28f"),{name:"chart",props:["costArr","logWval"],data:function(){var t=[],e=[];this.costArr.forEach(function(n,a){t.push(a),e.push(n)});for(var n=[],a=[],i=[],s=0;s<this.logWval.length;s++)n.push(this.logWval[s][0][0]),a.push(this.logWval[s][1][0]),i.push(this.logWval[s][2][0]);return{lineCost2:{legend:{},xAxis:{type:"category",data:t},yAxis:{type:"value"},series:[{name:"cost",data:e,type:"line"},{name:"w0",data:n,type:"line"},{name:"w1",data:a,type:"line"},{name:"w2",data:i,type:"line"}]}}},computed:{},methods:{},components:{"v-chart":k["a"]},mounted:function(){console.log("Chart mounted...")},watch:{}}),X=j,B=(n("d74f"),Object(l["a"])(X,D,E,!1,null,"6713461a",null));B.options.__file="Chart.vue";var $=B.exports,V=S()(window.innerWidth/3*2),G=S()(window.innerHeight/3*2),F=Math.min(V,G),U=F;console.log("width:",F),console.log("height:",U);var Y={name:"demo",components:{chart:$},data:function(){return{isShowChart:!1,drawInterval:20,width:F,height:U,statusAdd:!0,currentColor:"#fb5a52",showWidthStore:["2px","0px","0px","0px","0px","0px","0px","0px","0px","0px"],colorTypeStore:["#fb5a52","#32b900","#ffcc00","#0003a2","#b900b3","#cc5067","#c0e700","#1adccc","#a48176","#313e41"],listPointsPosType:[],pointRadius:3,layer:null,stage:null,colorTypeArr:[0],currentAlg:"LogReg",currentOptimizer:"",logWval:[],inputX:[],inputY:[],costArr:[]}},methods:{calcCostArr:function(t,e,n){var a=new I.LogReg,i=a.calcCostArr(t,e,n);return i},handleChart:function(){this.costArr=this.calcCostArr(this.logWval,this.inputX,this.inputY),this.isShowChart=!this.isShowChart},handleParams:function(){console.log(this.logWval)},initListPoints:function(){0==this.listPointsPosType.length&&this.listPointsPosType.push({pos:[this.width/8,2*this.height/3],color:"#fb5a52",type:"A"},{pos:[3*this.width/16,this.height/2],color:"#fb5a52",type:"A"},{pos:[4*this.width/16,1*this.height/3],color:"#fb5a52",type:"A"},{pos:[5*this.width/16,this.height/2],color:"#fb5a52",type:"A"},{pos:[6*this.width/16,2*this.height/3],color:"#fb5a52",type:"A"},{pos:[2*this.width/3,1*this.height/3],color:"#32b900",type:"B"},{pos:[2*this.width/3,this.height/2],color:"#32b900",type:"B"},{pos:[2*this.width/3,2*this.height/3],color:"#32b900",type:"B"})},saveListInStorage:function(){sessionStorage.setItem("listPoints",C()(this.listPointsPosType)),sessionStorage.setItem("params",C()(this.logWval))},loadListFromStorage:function(){var t=sessionStorage.getItem("listPoints")||"[]";this.listPointsPosType=JSON.parse(t);var e=sessionStorage.getItem("params")||"[]";this.logWval=JSON.parse(e)},clearStorage:function(){sessionStorage.clear()},handleRun:function(t){console.log("run..., type: "+t.type),this.LogRegDrawColorArea(),console.log("after LogRegDraw"),this.saveListInStorage(),console.log("after saveListInStorage")},handleRunTap:function(){console.log("run tap...")},handleRunTouchend:function(){console.log("run touchend...")},handleRunTouchstart:function(){console.log("run touchstart...")},handleRunMousedown:function(){console.log("run mousedown...")},handleRunMouseup:function(){console.log("run mouseup...")},handleRunClick:function(){console.log("run Click...")},LogRegDrawColorArea:function(){var t=new I.LogReg,e=t.inputTrainRaw(this.listPointsPosType).inputCS2Mat().featureScaling().modelTrainCV(.1,100,"GD",!0);this.logWval=e.logWval,this.inputX=e.inputX,this.inputY=e.inputY;for(var n=e.optW,a=e.inputXScaleMinVec.valueOf(),i=e.inputXScaleMaxVec.valueOf(),s=0;s<this.width;s+=this.drawInterval)for(var r=0;r<this.height;r+=this.drawInterval){var o=(s-a[0][1])/(i[0][1]-a[0][1]),l=(r-a[0][2])/(i[0][2]-a[0][2]),c=P["matrix"]([[1,o,l]]),u=P["multiply"](c,n).valueOf()[0][0];u<-3?this.drawRect4OnePoint(this.layer,s,r,this.drawInterval,"#fb5a52",.4):u<0?this.drawRect4OnePoint(this.layer,s,r,this.drawInterval,"#fb5a52",.37):u<3?this.drawRect4OnePoint(this.layer,s,r,this.drawInterval,"#32b900",.37):this.drawRect4OnePoint(this.layer,s,r,this.drawInterval,"#32b900",.4)}this.layer.draw()},drawRect4OnePoint:function(t,e,n,a,i,s){var r=new T.a.Rect({x:e-.5*a,y:n-.5*a,width:a,height:a,fill:i,opacity:s});r.cache(),t.add(r)},showAllDataInfo:function(){console.log("当前使用的算法：",this.currentAlg),console.log("所有点数据: ",this.listPointsPosType)},changeColorType:function(t){this.currentColor=this.colorTypeStore[t],this.drawStageBorder(),this.showWidthStore=["0px","0px","0px","0px","0px","0px","0px","0px","0px","0px"],this.showWidthStore[t]="2px"},numOfClass:function(t){switch(t){case"LogReg":return 2;default:return 10}},addColorType:function(){this.colorTypeArr.length<this.numOfClass(this.currentAlg)&&this.colorTypeArr.push(1)},delColorType:function(t){this.colorTypeArr.length>=2&&this.colorTypeArr.splice(t,1)},clearStage:function(t,e){var n=new T.a.Rect({x:0,y:0,width:t.width(),height:t.height(),fill:"white",stroke:this.currentColor});e.add(n),e.draw()},drawPointsFromList:function(t,e){var n,a=this;e.forEach(function(e){n=new T.a.Circle({x:e.pos[0],y:e.pos[1],radius:a.pointRadius,fill:e.color}),n.cache(),t.add(n)}),t.draw()},handleClearAll:function(){this.listPointsPosType=[],this.clearStage(this.stage,this.layer),this.clearStorage()},typeOfColor:function(t){switch(t){case this.colorTypeStore[0]:return"A";case this.colorTypeStore[1]:return"B";case this.colorTypeStore[2]:return"C";case this.colorTypeStore[3]:return"D";case this.colorTypeStore[4]:return"E";case this.colorTypeStore[5]:return"F";case this.colorTypeStore[6]:return"G";case this.colorTypeStore[7]:return"H";case this.colorTypeStore[8]:return"I";case this.colorTypeStore[9]:return"J";default:return""}},stageOnEvent:function(t,e){var n=this;this.stage.on(t,function(){var t=n.stage.getPointerPosition(),a=Math.round(t.x),i=Math.round(t.y);if(console.log(a,i),n.statusAdd){var s=n.typeOfColor(n.currentColor);n.listPointsPosType.push({pos:[a,i],color:n.currentColor,type:s})}else n.listPointsPosType.forEach(function(t,s){var r=Math.sqrt(Math.pow(t.pos[0]-a,2)+Math.pow(t.pos[1]-i,2));r<e&&n.listPointsPosType.splice(s,1)});n.clearStage(n.stage,n.layer),n.drawPointsFromList(n.layer,n.listPointsPosType),n.drawStageBorder(),n.saveListInStorage()})},drawStageBorder:function(){var t=new T.a.Rect({x:0,y:0,width:this.width,height:this.height,stroke:"#fff",strokeWidth:5}),e=new T.a.Rect({x:0,y:0,width:this.width,height:this.height,stroke:this.currentColor});this.layer.add(t,e),this.layer.draw()},newCanvas:function(){console.log("newCanvas"),this.stage=new T.a.Stage({container:"container",width:this.width,height:this.height}),this.layer=new T.a.Layer,this.stage.add(this.layer),this.drawStageBorder(),this.stageOnEvent("mousedown",2*this.pointRadius),this.stageOnEvent("touchstart",4*this.pointRadius),this.drawPointsFromList(this.layer,this.listPointsPosType)}},created:function(){},mounted:function(){console.log("demo mounted..."),this.loadListFromStorage(),this.initListPoints(),this.newCanvas()}},J=Y,N=(n("3fd1"),n("c1db"),Object(l["a"])(J,y,w,!1,null,"e98456c8",null));N.options.__file="Demo.vue";var H=N.exports,q=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tutorial"},[t._v("\n  \n    针对对象：\n        初识机器学习算法，欲深入了解算法原理的人群。\n    所需基础：\n        高等数学、线性代数、概率论。\n        Python 或 Javascirpt\n    讲解方式：\n        以视频为主，轻松有趣。\n\n\n    "),t._m(0),n("chart",{staticClass:"ch"})],1)},K=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("input",{attrs:{type:"button",value:"button"}})])}],Q={name:"tutorial",data:function(){return{}},components:{chart:$}},Z=Q,tt=(n("9a3d"),Object(l["a"])(Z,q,K,!1,null,"1bdb75a3",null));tt.options.__file="Tutorial.vue";var et=tt.exports,nt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"application"},[t._v("\n  \n    平台助您实现轻松数据挖掘，将您手里的数据点石成金。\n\n    涵盖：数据挖掘、图像处理\n  \n    \n")])},at=[],it={name:"application",data:function(){return{}}},st=it,rt=Object(l["a"])(st,nt,at,!1,null,"8475758a",null);rt.options.__file="Application.vue";var ot=rt.exports,lt=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},ct=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"about"},[n("h1",[t._v("This is an about page")])])}],ut={name:"about",data:function(){return{}}},ht=ut,pt=Object(l["a"])(ht,lt,ct,!1,null,"7dce6d86",null);pt.options.__file="About.vue";var dt=pt.exports;a["default"].use(h["a"]);var ft=new h["a"]({routes:[{path:"/",name:"home",component:m},{path:"/demo",name:"demo",component:H},{path:"/tutorial",name:"tutorial",component:et},{path:"/application",name:"applicatioin",component:ot},{path:"/about",name:"about",component:dt}]}),vt=n("2f62"),gt={num:0,LoginUser:"aaa"},mt={},yt={},wt={getLoginUserName:function(t){return t.LoginUser?t.LoginUser:"not login"}},bt={state:{name:"abc"},mutations:{ChangeName:function(t,e){t.name=e}},getters:{getUNnameUpperCase:function(t){return t.UName.toUpperCase()}},namespaced:!0};a["default"].use(vt["a"]);var Ct=new vt["a"].Store({state:gt,mutations:mt,actions:yt,getters:wt,modules:{demo:bt}}),xt=n("7f16"),St=n.n(xt),_t=n("5c96"),Tt=n.n(_t);n("0fae"),n("e05f");a["default"].use(Tt.a,{zIndex:3e3}),a["default"].use(St.a),a["default"].use(T.a),a["default"].config.productionTip=!1,new a["default"]({router:ft,store:Ct,render:function(t){return t(u)}}).$mount("#app")},"754a":function(t,e,n){"use strict";var a=n("ae4e"),i=n.n(a);i.a},7819:function(t,e,n){},"81f6":function(t,e,n){},"9a3d":function(t,e,n){"use strict";var a=n("0290"),i=n.n(a);i.a},ae4e:function(t,e,n){},b0a0:function(t,e,n){"use strict";var a=n("07bb"),i=n.n(a);i.a},c1db:function(t,e,n){"use strict";var a=n("cf94"),i=n.n(a);i.a},cf94:function(t,e,n){},d74f:function(t,e,n){"use strict";var a=n("f58d"),i=n.n(a);i.a},f58d:function(t,e,n){}});
//# sourceMappingURL=app.93b220ec.js.map