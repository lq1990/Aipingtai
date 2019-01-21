<template>
  <div class="myfigure" >
    <div class="btnFigure">
      <el-button class="btn" type="danger" @click="handleFigure">Figure</el-button>
    </div>
    <div id="containerFigure" class="container"></div>
  </div>
</template>

<script>
// 刚开始想自己 diy做 作图工具，但考虑到效率。还是决定用 echarts
// figure 用于画图
//  将算法优化过程中的 模型参数 w 记录，并可视化过程
//  横坐标为 迭代步数
//  纵坐标为 W值
// 使用Konva，自己做
import Konva from "konva";
import math from "mathjs";
export default {
  name: "myfigure",
  data() {
    return {
      stage: null,
      layer: null
    };
  },
  props: ["logWval", "costArr", "width", "height"], // props 当做data用。可this指引
  // logWval: [] // 存储了模型参数 W 对应每一步的值. Array, [第i步][第j个w][0]
  components: {},
  methods: {
    handleFigure() {
      this.newCanvas();
      this.plot(this.logWval, 2);
    },
    plot(W, interval) {
      var x, w0, w1, w2;
      for (var i = 0; i < W.length; i += interval) {
        // var cost = this.calcOneCost(W[i]);
        // var costi = this.costArr[i];
        // var circle = new Konva.Circle({
        //   x: x / 1,
        //   y: costi * 500 + this.height / 2,
        //   radius: 2,
        //   fill: "#000"
        // });
        // circle.cache();
        // this.layer.add(circle);
        // console.log("cost:", cost);
        x = i;
        w0 = W[i][0][0];
        w1 = W[i][1][0];
        w2 = W[i][2][0];
        // console.log(x, w0, w1, w2);
        var circle = new Konva.Circle({
          x: x / 1,
          y: w0 * 10 + this.height / 2,
          radius: 2,
          fill: "#f00"
        });
        circle.cache();
        this.layer.add(circle);
        circle = new Konva.Circle({
          x: x / 1,
          y: w1 * 10 + this.height / 2,
          radius: 2,
          fill: "#0f0"
        });
        circle.cache();
        this.layer.add(circle);

        circle = new Konva.Circle({
          x: x / 1,
          y: w2 * 10 + this.height / 2,
          radius: 2,
          fill: "#00f"
        });
        circle.cache();
        this.layer.add(circle);
      }
      this.layer.draw();
    },
    drawStageBorder() {
      var stage_border = new Konva.Rect({
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
        stroke: "#333",
        strokeWidth: 2
      });

      this.layer.add(stage_border);
      this.layer.draw();
    },
    newCanvas() {
      this.stage = new Konva.Stage({
        container: "containerFigure",
        width: this.width,
        height: this.height
      });
      this.layer = new Konva.Layer();
      this.stage.add(this.layer);
      this.drawStageBorder();
    },
    calcOneCost(w) {
      var Z, H;
      var X = this.inputX;
      var Y = this.inputY;
      var left, right, temp1, temp2, cost;
      Z = math.multiply(X, w);
      H = this.sigmoid(Z);
      left = math.dotMultiply(-Y, math.log(H));
      // right = -(1-Y)*log(1-H)
      temp1 = math.subtract(Y, 1);
      temp2 = math.log(math.subtract(1, H));
      right = math.dotMultiply(temp1, temp2);
      cost = math.add(left, right);
      return cost;
    }
  },
  mounted() {
    console.log("Figure mounted...");
  }
};
</script>


<style lang="scss" scoped>
.myfigure {
  .btnFigure {
    display: flex;
    justify-content: center;
  }
  .container {
    margin-top: 10px;
  }
}
</style>
