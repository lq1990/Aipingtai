<template>
  <div class="myfigure" >
    <div class="btnFigure">
      <el-button class="btn" type="danger" @click="handleFigure">Figure</el-button>
    </div>
    <div id="containerFigure" class="container"></div>
  </div>
</template>

<script>
// figure 用于画图
//  将算法优化过程中的 模型参数 w 记录，并可视化过程
//  横坐标为 迭代步数
//  纵坐标为 W值
// 使用Konva，自己做
import Konva from "konva";
export default {
  name: "myfigure",
  data() {
    return {
      stage: null,
      layer: null
    };
  },
  props: ["logWval", "width", "height"], // props 当做data用。可this指引
  // logWval: [] // 存储了模型参数 W 对应每一步的值. Array, [第i步][第j个w][0]
  components: {},
  methods: {
    handleFigure() {
      this.newCanvas();
      this.plot(this.logWval, 100);
    },
    plot(W, interval) {
      var x, w0, w1, w2;
      for (var i = 0; i < W.length; i += interval) {
        x = i;
        w0 = W[i][0][0];
        w1 = W[i][1][0];
        w2 = W[i][2][0];
        // console.log(x, w0, w1, w2);
        var circle = new Konva.Circle({
          x: x / 10,
          y: w0 * 10 + this.height / 2,
          radius: 2,
          fill: "#f00"
        });
        circle.cache();
        this.layer.add(circle);
        circle = new Konva.Circle({
          x: x / 10,
          y: w1 * 10 + this.height / 2,
          radius: 2,
          fill: "#0f0"
        });
        circle.cache();
        this.layer.add(circle);

        circle = new Konva.Circle({
          x: x / 10,
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
