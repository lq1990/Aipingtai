<template>
  <div class="demo">
    <!-- 不能把container同时放在两个 大小布局里，因为id是唯一的。
    这样的话，只能把container从大小布局抽离。 或者使用 v-if 惰性加载-->
    <div v-if="isLargeScreen" class="demo-large">
      <div class="demo-large-left">
        <div id="container"></div>
        <div class="btn-wrap">
          <div style="display: flex; justify-content: center; margin: 15px 0;">
            <el-button type="danger" @click="handleRun" :style="{width: width/3+'px'}">运行</el-button>
            <el-button type="danger" @click="handleParams">参数</el-button>
          </div>

          <div class="btn-point">
            <input
              type="button"
              value="添加一点"
              @mousedown="statusAdd = true"
              :class="{showBtnBorder: statusAdd}"
              :style="{ 
            backgroundColor: currentColor
            }"
            >
            <input
              type="button"
              value="移除某点"
              @mousedown="statusAdd = false"
              :class="{showBtnBorder: !statusAdd}"
            >
            <input type="button" value="清空所有" @mousedown="handleClearAll">
            <input type="button" value="所有点信息" @mousedown="showAllDataInfo">
          </div>
          <div class="btn-add-del-color-type">
            <input type="button" @mousedown="addColorType" value="添加点类型">
            <input type="button" @mousedown="delColorType" value="删除点类型">
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
            ></div>
          </div>
        </div>
      </div>

      <demo-model class="demo-model"></demo-model>
    </div>

    <div v-else class="demo-small">
      <div id="container"></div>
      <!-- 不能把container同时放在两个 大小布局里，因为id是唯一的。
      这样的话，只能把container从大小布局抽离-->
      <div class="btn-wrap">
        <div style="display: flex; justify-content: center; margin: 15px 0;">
          <el-button type="danger" @click="handleRun" :style="{width: width/3+'px'}">运行</el-button>
          <el-button type="danger" @click="handleParams">参数</el-button>
        </div>

        <div class="btn-point">
          <input
            type="button"
            value="添加一点"
            @mousedown="statusAdd = true"
            :class="{showBtnBorder: statusAdd}"
            :style="{ 
            backgroundColor: currentColor
            }"
          >
          <input
            type="button"
            value="移除某点"
            @mousedown="statusAdd = false"
            :class="{showBtnBorder: !statusAdd}"
          >
          <input type="button" value="清空所有" @mousedown="handleClearAll">
          <input type="button" value="所有点信息" @mousedown="showAllDataInfo">
        </div>
        <div class="btn-add-del-color-type">
          <input type="button" @mousedown="addColorType" value="添加点类型">
          <input type="button" @mousedown="delColorType" value="删除点类型">
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
          ></div>
        </div>
      </div>

      <demo-model class="demo-model"></demo-model>
    </div>

    <!-- chart 不在 大小布局里 -->
    <div class="chart-wrap">
      <div class="btnChart">
        <!-- 当点击按钮时，再计算 cost值，把cost画出来。 -->
        <el-button class="btn" type="danger" @click="handleChart">Chart On/Off</el-button>
      </div>
      <chart
        v-if="isShowChart"
        class="mychart"
        :cost-arr="costArr"
        :log-wval="logWval"
        :style="{width: width+'px', height:height*2/3+'px'}"
      ></chart>
      <!-- v-if为惰性加载，当点击 chart按钮时，costArr先计算，然后再加载 chart组件。
      就可以实现画图了-->
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

let isLarge = false;
if (window.innerWidth >= 992) {
  // 992 是 md 的界限，不同于以768为界。
  // 经过个人尝试后，感觉以992为界更方便操作。
  isLarge = true;
}
// 画布上的每个点所包含的的信息：坐标，样式
import Konva from "konva";
import * as math from "mathjs";
import ML from "../lib/ML.js";
import Chart from "../components/Chart.vue";
import DemoModel from "../components/DemoModel.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "demo",
  components: {
    chart: Chart,
    "demo-model": DemoModel
  },
  computed: {
    ...mapState("demo", ["curAlg"])
  },
  data() {
    return {
      isLargeScreen: isLarge,
      isShowChart: false,
      drawInterval: 20,
      // 对画布上的点进行分类后，用rect绘图时的间距，若间距为1则会延长计算渲染时长
      width: width, // 画布的宽
      height: height, // 画布的高
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
      ], // 10种颜色，被点击的颜色即当前用的颜色会有边框
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
      // currentAlg: "逻辑回归",
      currentOptimizer: "",
      logWval: [], // 存储了模型参数 W 对应每一步的值. Array, 多个 3行1列 [第i步][第j个w][0]
      inputX: [], // 画布上点数据对应的 Features, 格式: math.matrix
      inputY: [], // 画布上点数据对应的 Labels，格式：math.matrix
      costArr: [] // 将每一步迭代对应的 cost值存储，格式：普通的 array [,,,...]
    };
  },
  methods: {
    calcCostArr(Wval, X, Y) {
      let lr = new ML.LogReg();
      let costArr = lr.calcCostArr(Wval, X, Y);
      return costArr;
    },
    /**
     * 点击 Chart 按钮时，先计算costArr，再将其画出
     */
    handleChart() {
      this.costArr = this.calcCostArr(this.logWval, this.inputX, this.inputY);
      this.isShowChart = !this.isShowChart;
      // console.log("this.costArr.length:", this.costArr.length);
      // console.log("this.costArr:", this.costArr);
      // console.log("this.inputX:", this.inputX);
      // console.log("this.inputY:", this.inputY);
    },
    handleParams() {
      console.log(this.logWval); // [][][] 1：第i步，2：第j个w， 3：为0
      // console.log(this.logWval[967][0][0]);
    },
    initListPoints() {
      if (this.listPointsPosType.length != 0) {
        // 如果 list中已经有数据了，则刷新页面并不会 往list里push数据。
        return;
      }
      // 当list中没有数据时，会往list中push
      this.listPointsPosType.push(
        {
          pos: [this.width / 8, (this.height * 2) / 3],
          color: "#fb5a52",
          type: "A"
        },
        {
          pos: [(this.width * 3) / 16, this.height / 2],
          color: "#fb5a52",
          type: "A"
        },
        {
          pos: [(this.width * 4) / 16, (this.height * 1) / 3],
          color: "#fb5a52",
          type: "A"
        },
        {
          pos: [(this.width * 5) / 16, this.height / 2],
          color: "#fb5a52",
          type: "A"
        },
        {
          pos: [(this.width * 6) / 16, (this.height * 2) / 3],
          color: "#fb5a52",
          type: "A"
        },
        {
          pos: [(this.width * 2) / 3, (this.height * 1) / 3],
          color: "#32b900",
          type: "B"
        },
        {
          pos: [(this.width * 2) / 3, this.height / 2],
          color: "#32b900",
          type: "B"
        },
        {
          pos: [(this.width * 2) / 3, (this.height * 2) / 3],
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
      // 为了避免刷新页面时，存储的模型参数 logWval 被清除
      sessionStorage.setItem("params", JSON.stringify(this.logWval));
    },
    /**
     * 在 mounted 时，加载
     */
    loadListFromStorage() {
      const data = sessionStorage.getItem("listPoints") || "[]";
      this.listPointsPosType = JSON.parse(data);

      const params = sessionStorage.getItem("params") || "[]";
      this.logWval = JSON.parse(params);
    },
    /**
     * 当点击清空所有时，sessionStorage 就会被清空
     */
    clearStorage() {
      sessionStorage.clear();
    },
    handleRun(e) {
      console.log("run..., type: " + e.type);
      this.LogRegDrawColorArea();
      console.log("after LogRegDraw");

      // 运行时，把list和logWval保存
      this.saveListInStorage();
      console.log("after saveListInStorage");
    },
    handleRunTap() {
      console.log("run tap...");
      // this.LogRegDrawColorArea();
    },
    handleRunTouchend() {
      console.log("run touchend...");
    },
    handleRunTouchstart() {
      console.log("run touchstart...");
    },
    handleRunMousedown() {
      console.log("run mousedown...");
    },
    handleRunMouseup() {
      console.log("run mouseup...");
    },
    handleRunClick() {
      console.log("run Click...");
      // this.LogRegDrawColorArea();
    },

    LogRegDrawColorArea() {
      var lr = new ML.LogReg();
      var res = lr
        .inputTrainRaw(this.listPointsPosType)
        .inputCS2Mat()
        .featureScaling()
        .modelTrainCV(0.1, 100, "GD", true);
      // .modelTrainCV(1, 100, "RMSProp", true, 10);
      // .modelTrainCV(1, 100, "Adadelta", true, 10);

      this.logWval = res.logWval;
      this.inputX = res.inputX;
      this.inputY = res.inputY;

      // 注意：在画分界线阶段，就把cost计算了不好。在Figure阶段再计算cost。===========================
      // var costArr = lr.calcCostArr(res.logWval); // cost格式： [,,,]
      // console.log("costArr:", costArr);
      // this.costArr = costArr;

      // console.log("this.logWval:", this.logWval);

      // 将画布着色，即泛华，将画布上每一个点输入到模型，得到结果后来判定类别。
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
          if (z < -3) {
            // 当 z 为3时，h 即概率为 0.95
            this.drawRect4OnePoint(
              this.layer,
              col,
              row,
              this.drawInterval,
              "#fb5a52",
              0.4
            );
          } else if (z < 0) {
            this.drawRect4OnePoint(
              this.layer,
              col,
              row,
              this.drawInterval,
              "#fb5a52",
              0.37
            );
          } else if (z < 3) {
            this.drawRect4OnePoint(
              this.layer,
              col,
              row,
              this.drawInterval,
              "#32b900",
              0.37
            );
          } else {
            this.drawRect4OnePoint(
              this.layer,
              col,
              row,
              this.drawInterval,
              "#32b900",
              0.4
            );
          }
        }
      }
      this.layer.draw();
    },
    drawRect4OnePoint(layer, x1, x2, drawInterval, color, opacity) {
      // 以 x1、x2 为矩形的重心来画
      var rect = new Konva.Rect({
        x: x1 - 0.5 * drawInterval,
        y: x2 - 0.5 * drawInterval,
        width: drawInterval,
        height: drawInterval,
        fill: color,
        opacity: opacity
      });
      rect.cache();
      layer.add(rect);
    },
    showAllDataInfo() {
      console.log("当前使用的算法：", this.curAlg);
      console.log("所有点数据: ", this.listPointsPosType);
    },
    changeColorType(index) {
      this.currentColor = this.colorTypeStore[index];
      // this.drawStageBorder();
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
        case "逻辑回归":
          return 2;

        default:
          return 10;
      }
    },
    addColorType() {
      if (this.colorTypeArr.length < this.numOfClass(this.curAlg)) {
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
        fill: "white"
        // stroke: this.currentColor
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
        // this.drawStageBorder();
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
        x: 0 + 1,
        y: 0 + 1,
        width: this.width - 2,
        height: this.height - 2,
        stroke: this.currentColor,
        strokeWidth: 2
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
      console.log("newCanvas");
      this.stage = new Konva.Stage({
        container: "container",
        width: this.width,
        height: this.height
      });
      this.layer = new Konva.Layer();
      this.stage.add(this.layer);

      // canvas边框给颜色，currentColor，这样在画点时就知道那个颜色在用了
      // this.drawStageBorder();
      // 在整个stage即canvas画布 上绑定点击事件
      // 点击事件触发后就会执行
      this.stageOnEvent("mousedown", this.pointRadius * 2);
      this.stageOnEvent("touchstart", this.pointRadius * 4);

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
    console.log("demo mounted...");
    this.loadListFromStorage();
    this.initListPoints();
    this.newCanvas();

    console.log("isLargeScreen: ", this.isLargeScreen);
  },
  watch: {
    curAlg(val) {
      // 监控 当前算法的变化，当切换到 逻辑回归时，只能做 2分类，所以只有2个颜色可用
      // console.log("watch curAlg", val);
      if (val == "逻辑回归") {
        this.colorTypeArr = [0, 1]; // 当这个arr只有2个元素时
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.demo {
  .demo-large {
    display: flex;
    justify-content: center;
    .demo-large-left {
      flex: 1 1 auto;
    }
    .demo-model {
      flex: 2 1 auto;
    }
  }
  .demo-model {
    margin-top: 20px;
  }
  #container {
    margin: 20px 10px 10px 10px;
  }
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
  .chart-wrap {
    border-top: 1px solid #ccc;
    margin: 10px;
    padding-top: 10px;
    .btnChart {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
    .mychart {
      margin: 0 auto;
    }
  }
}
</style>

<style lang="css">
.konvajs-content {
  /* border: 1px solid #000 !important; */
  margin: 0 auto !important;
}
.konvajs-content canvas {
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.4);
}

button.el-button.el-button--danger {
  background-color: #fb5a52 !important;
}

button.el-button.el-button--danger:focus,
button.el-button.el-button--danger:hover {
  background-color: #fa7c75 !important;
}
button.el-button.el-button--danger.is-active,
button.el-button.el-button--danger:active {
  background-color: #fb5a52 !important;
}
</style>
