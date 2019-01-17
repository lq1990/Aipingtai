<template>
  <div class="demo">
    <!-- <el-row :gutter="0" type="flex" justify="space-around" class="main-body">
      <el-col :span="6">
        <div class>main-left</div>
      </el-col>
      <el-col :span="6">
        <div class>main-right</div>
      </el-col>
    </el-row>-->
    <p style="text-align:center;">
      展示游乐场
      左侧：画布
      右侧上：模型选择
      右侧下：模型参数
      右侧底：训练 按钮
    </p>

    <div id="container"></div>

    <div style="display: flex; justify-content: center; margin: 15px 0;">
      <el-button type="danger" 
        @mousedown.native="handleRun"
        @touchstart.native="handleRun" style="width: 100px;">运行</el-button>
    </div>

    <div class="btn-wrap">
      <!-- PC、移动端区别对待点击事件。
      PC: click (== tap of Mobile),
      Mobile: touchstart (==mousedown of PC)-->
      <div class="btn-point">
        <input
          type="button"
          value="添加一点"
          @mousedown="statusAdd = true"
          @touchstart="statusAdd = true"
          :class="{showBtnBorder: statusAdd}"
        >
        <input
          type="button"
          value="移除某点"
          @mousedown="statusAdd = false"
          @touchstart="statusAdd = false"
          :class="{showBtnBorder: !statusAdd}"
        >
        <input type="button" value="清空所有" @mousedown="handleClearAll" @touchstart="handleClearAll">
        <input type="button" value="所有点信息" @mousedown="showAllDataInfo" @touchstart="showAllDataInfo">
      </div>
      <div class="btn-add-del-color-type">
        <input type="button" @mousedown="addColorType" @tap="addColorType" value="添加点类型">
        <input type="button" @mousedown="delColorType" @tap="delColorType" value="删除点类型">
      </div>

      <div class="color-type">
        <!-- 此处实现点击添加点类型按钮来 动态往页面添加元素 -->
        <div
          v-for="(item, index) in colorTypeArr"
          :key="index"
          :style="{backgroundColor: colorTypeStore[index], 
            width: '25px', 
            height: '25px',
            cursor: 'pointer',
            borderWidth: showWidthStore[index],
            borderStyle: 'solid',
            borderColor: colorTypeStore[index]
            }"
          @mousedown="changeColorType(index)"
          @touchstart="changeColorType(index)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
// 考虑到宽高在不同设备，以及横放、纵放时会不同。这里取宽高较小的。
const iWidth = parseInt((window.innerWidth / 3) * 2);
const iHeight = parseInt((window.innerHeight / 3) * 2);
const width = Math.min(iWidth, iHeight);
const height = width;
console.log("width:", width);
console.log("height:", height);
// 画布上的每个点所包含的的信息：坐标，样式
import Konva from "konva";
import * as math from "mathjs";
import ML from "../lib/ML.js";
// console.log("ML:", ML);
export default {
  name: "demo",
  data() {
    return {
      drawInterval: 10,
      // 对画布上的点进行分类后，用rect绘图时的间距，若间距为1则会延长计算渲染时长
      width: width,
      height: height,
      statusAdd: true, // 点增加、移除
      currentColor: "#fb5a52",
      showWidthStore: [
        "2px",
        "0px",
        "0px",
        "0px",
        "0px",
        "0px",
        "0px",
        "0px",
        "0px",
        "0px"
      ], // 10中颜色，被点击的颜色即当前用的颜色会有边框
      colorTypeStore: [
        "#fb5a52",
        "#32b900",
        "#ffcc00",
        "#0003a2",
        "#b900b3",
        "#cc5067",
        "#c0e700",
        "#1adccc",
        "#a48176",
        "#313e41"
      ], // 10种颜色
      // listPoints: [], // 存储点击的 点位置和点类别(不同类别对应颜色、样式不同)信息 [[x,y],[x,y],...]// 记录10种点类型(颜色、点形状)。为 后续 ML分为10类做准备
      listPointsPosType: [], // 存储了点的信息 [{pos:[x,1], color: ""}, {},...]
      // 有了点的信息 ，可以进一步用ML做分类、回归、聚类
      pointRadius: 3, // 点击时，画布上圆半径
      layer: null,
      stage: null,
      colorTypeArr: [0], // 此为协助colorTypeStore用的数组
      currentAlg: "LogReg"
    };
  },
  methods: {
    initListPoints() {
      this.listPointsPosType.push(
        {
          pos: [62, 261],
          color: "#fb5a52",
          type: "A"
        },
        {
          pos: [87, 196],
          color: "#fb5a52",
          type: "A"
        },
        {
          pos: [118, 145],
          color: "#fb5a52",
          type: "A"
        },
        {
          pos: [141, 196],
          color: "#fb5a52",
          type: "A"
        },
        {
          pos: [155, 261],
          color: "#fb5a52",
          type: "A"
        },
        {
          pos: [266, 145],
          color: "#32b900",
          type: "B"
        },
        {
          pos: [266, 196],
          color: "#32b900",
          type: "B"
        },
        {
          pos: [266, 261],
          color: "#32b900",
          type: "B"
        }
      );
    },
    /**
     * 每次点击画布时，都会把 listPointsPosType 中数据存储到 sessionStorage;
     * sessionStorage 当关闭页面时，数据就没了。
     * 或者点击 清空所有 按钮，也会清空 Storage.
     */
    saveListInStorage() {
      sessionStorage.setItem(
        "listPoints",
        JSON.stringify(this.listPointsPosType)
      );
    },
    /**
     * 在 mounted 时，加载
     */
    loadListFromStorage() {
      const data = sessionStorage.getItem("listPoints") || "[]";
      this.listPointsPosType = JSON.parse(data);
    },
    /**
     * 当点击清空所有时，sessionStorage 就会被清空
     */
    clearStorage() {
      sessionStorage.clear();
    },
    handleRun() {
      this.LogRegDrawColorArea();
    },
    LogRegDrawColorArea() {
      var lr = new ML.LogReg();
      var res = lr
        .inputTrainRaw(this.listPointsPosType)
        .inputCS2Mat()
        .featureScaling()
        .modelTrainCV(0.002, 5000, false);
      var optW = res.optW;
      var minVec = res.inputXScaleMinVec.valueOf();
      var maxVec = res.inputXScaleMaxVec.valueOf();

      for (var col = 0; col < this.width; col += this.drawInterval) {
        for (var row = 0; row < this.height; row += this.drawInterval) {
          var colNew = (col - minVec[0][1]) / (maxVec[0][1] - minVec[0][1]);
          var rowNew = (row - minVec[0][2]) / (maxVec[0][2] - minVec[0][2]);
          // 对当前的点进行 scaling
          var curMatNew = math.matrix([[1, colNew, rowNew]]);
          var z = math.multiply(curMatNew, optW).valueOf()[0][0];
          if (z < 0.5) {
            this.drawRect4OnePoint(this.layer, col, row, "#fb5a52");
          } else {
            this.drawRect4OnePoint(this.layer, col, row, "#32b900");
          }
        }
      }
      this.layer.draw();
    },
    drawRect4OnePoint(layer, x1, x2, color) {
      var rect = new Konva.Rect({
        x: x1,
        y: x2,
        width: this.drawInterval,
        height: this.drawInterval,
        fill: color,
        opacity: 0.35
      });
      rect.cache();
      layer.add(rect);
    },
    showAllDataInfo() {
      console.log("当前使用的算法：", this.currentAlg);
      console.log("所有点数据: ", this.listPointsPosType);
    },
    changeColorType(index) {
      this.currentColor = this.colorTypeStore[index];
      this.drawStageBorder();
      this.showWidthStore = [
        "0px",
        "0px",
        "0px",
        "0px",
        "0px",
        "0px",
        "0px",
        "0px",
        "0px",
        "0px"
      ];
      this.showWidthStore[index] = "2px";
    },
    /**
     * 不同算法能分类的类别数不同
     */
    numOfClass(alg) {
      switch (alg) {
        case "LogReg":
          return 2;

        default:
          return 10;
      }
    },
    addColorType() {
      if (this.colorTypeArr.length < this.numOfClass(this.currentAlg)) {
        this.colorTypeArr.push(1);
      }
    },
    delColorType(index) {
      if (this.colorTypeArr.length >= 2) {
        this.colorTypeArr.splice(index, 1);
      }
    },

    /**
     * 使用rect画白色矩形来清空舞台、层。
     * @param {Konva.Stage} stage
     * @param {Konva.Layer} layer
     */
    clearStage(stage, layer) {
      var rect = new Konva.Rect({
        x: 0,
        y: 0,
        width: stage.width(),
        height: stage.height(),
        fill: "white",
        stroke: this.currentColor
      });
      layer.add(rect);
      layer.draw();
    },
    /**
     * 在 layer 上画出 listPoints 存储的点。
     * listPoints 内部数据格式为 [[x1,y1],[x2,y2],...]
     */
    // drawPoints(layer, listPoints, color) {
    //   var circle;
    //   listPoints.forEach(item => {
    //     circle = new Konva.Circle({
    //       x: item[0],
    //       y: item[1],
    //       radius: this.pointRadius,
    //       fill: color
    //     });
    //     circle.cache();
    //     layer.add(circle);
    //   });

    //   layer.draw();
    // },
    drawPointsFromList(layer, listPointsPosType) {
      var circle;
      listPointsPosType.forEach(item => {
        circle = new Konva.Circle({
          x: item.pos[0],
          y: item.pos[1],
          radius: this.pointRadius,
          fill: item.color
        });
        circle.cache();
        layer.add(circle);
      });
      layer.draw();
    },
    /**
     * 点击button清空所有时，进行两项工作：
     * 1. 清空listPoints
     * 2. 清空舞台
     */
    handleClearAll() {
      this.listPointsPosType = [];
      this.clearStage(this.stage, this.layer);
      this.clearStorage();
    },
    /**
     * 10种颜色对应10类
     */
    typeOfColor(color) {
      switch (color) {
        case this.colorTypeStore[0]:
          return "A";
        case this.colorTypeStore[1]:
          return "B";
        case this.colorTypeStore[2]:
          return "C";
        case this.colorTypeStore[3]:
          return "D";
        case this.colorTypeStore[4]:
          return "E";
        case this.colorTypeStore[5]:
          return "F";
        case this.colorTypeStore[6]:
          return "G";
        case this.colorTypeStore[7]:
          return "H";
        case this.colorTypeStore[8]:
          return "I";
        case this.colorTypeStore[9]:
          return "J";

        default:
          return "";
      }
    },
    /**
     * 点击事件发生时，将点存储、删除、清空。
     *
     * PC、移动端的 点击移除点事件 区别对待
     * 1. PC端mouse可以准确点击，所以 removePoint时设定的扫描区域较小
     * 2. 移动端，touch事件有偏差，所以 removeDisThreshold 调大
     */
    stageOnEvent(event, removeDisThreshold) {
      this.stage.on(event, () => {
        const Pos = this.stage.getPointerPosition();
        const x = Math.round(Pos.x);
        const y = Math.round(Pos.y);
        console.log(x, y);

        if (this.statusAdd) {
          var type = this.typeOfColor(this.currentColor);
          this.listPointsPosType.push({
            pos: [x, y],
            color: this.currentColor,
            type: type
          });
        } else {
          // 在移除状态时，点击位置附近较近的一个点会被移除
          this.listPointsPosType.forEach((item, index) => {
            var distance = Math.sqrt(
              (item.pos[0] - x) ** 2 + (item.pos[1] - y) ** 2
            );
            if (distance < removeDisThreshold) {
              this.listPointsPosType.splice(index, 1);
            }
          });
        }

        // 画之前清空画布
        this.clearStage(this.stage, this.layer);

        this.drawPointsFromList(this.layer, this.listPointsPosType);
        this.drawStageBorder();
        this.saveListInStorage();
      });
    },
    /**
     * 画舞台边框。改变画笔颜色时，边框会变成相应颜色。以提示用户
     */
    drawStageBorder() {
      var before_draw = new Konva.Rect({
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
        stroke: "#fff",
        strokeWidth: 5
      });
      var stage_border = new Konva.Rect({
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
        stroke: this.currentColor
      });

      this.layer.add(before_draw, stage_border);
      this.layer.draw();
    },
    /**
     * 新建canvas
     *
     *    内部绑定有mouse、touch事件。
     *    可在舞台上点击画点，借助按钮实现移除某点，清空所有。
     */
    newCanvas() {
      this.stage = new Konva.Stage({
        container: "container",
        width: this.width,
        height: this.height
      });
      this.layer = new Konva.Layer();
      this.stage.add(this.layer);

      // canvas边框给颜色，currentColor，这样在画点时就知道那个颜色在用了
      this.drawStageBorder();
      // 在整个stage即canvas画布 上绑定点击事件
      // 点击事件触发后就会执行
      this.stageOnEvent("mousedown", this.pointRadius);
      this.stageOnEvent("touchstart", this.pointRadius * 3);

      this.drawPointsFromList(this.layer, this.listPointsPosType);

      /* 函数式编程，当第二个参数用function而非匿名函数时，this指向会有不同
      this.stage.on("mousemove", function() {
        console.log("mousemove");
        console.log(this); // this指向 Konva.Stage
      });
      */
    }
  },
  created() {},
  mounted() {
    console.log("mounted...");
    this.loadListFromStorage();
    this.initListPoints();
    this.newCanvas();
  }
};
</script>

<style lang="scss" scoped>
.demo {
  .btn-wrap {
    .btn-point {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      input {
        margin: 0 5px;
      }
      .showBtnBorder {
        border: 1.5px solid #333;
      }
    }
    .btn-add-del-color-type {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      input {
        margin: 0 5px;
      }
    }
    .color-type {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      div {
        margin: 0 5px;
      }
    }
  }
}
</style>

<style lang="css">
div.konvajs-content {
  /* border: 1px solid #000 !important; */
  margin: 0 auto !important;
}
html body div#app div.demo div button.el-button.el-button--danger {
  background-color: #fb5a52 !important;
}
html body div#app div.demo div button.el-button.el-button--danger:hover {
  background-color: #fa7c75 !important;
}
</style>
