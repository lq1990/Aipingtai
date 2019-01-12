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

    <br>
    <input type="button" value="clear" @click="clickBtn">
  </div>
</template>

<script>
// 考虑到宽高在不同设备，以及横放、纵放时会不同。这里取宽高较小的。
const iWidth = (window.innerWidth / 3) * 2;
const iHeight = (window.innerHeight / 3) * 2;
const width = Math.min(iWidth, iHeight);
const height = width;
console.log("width:", width);
import Konva from "konva";

export default {
  name: "demo",
  data() {
    return {
      width,
      height,
      stageW: 0,
      stageH: 0
    };
  },
  methods: {
    handleClick(e) {
      console.log(e);
    },
    clickBtn(e) {
      console.log("button", e);

      // rect.clearRect(0, 0, this.width, this.height);

      // stage.clearRect(0, 0, this.width, this.height);
    },
    newCanvas() {
      var stage = new Konva.Stage({
        container: "container", // id of container <div>
        width: 500,
        height: 500
      });

      this.stageW = stage.getWidth();
      this.stageH = stage.height();

      var animLayer = new Konva.Layer();
      var staticLayer = new Konva.Layer();

      var blueHex = new Konva.RegularPolygon({
        x: 50,
        y: stage.height() / 2,
        sides: 6,
        radius: 40,
        fill: "#00d2ff",
        stroke: "black",
        strokeWidth: 4,
        draggable: true
      });

      var yellowHex = new Konva.RegularPolygon({
        x: stage.width() / 2,
        y: stage.height() / 2,
        sides: 6,
        radius: 30,
        fill: "yellow",
        stroke: "black",
        strokeWidth: 4,
        draggable: true
      });

      var redHex = new Konva.RegularPolygon({
        x: 250,
        y: stage.height() / 2,
        sides: 6,
        radius: 30,
        fill: "red",
        stroke: "black",
        strokeWidth: 4,
        offset: {
          x: 30,
          y: 0
        },
        draggable: true
      });

      var text = new Konva.Text({
        x: 10,
        y: 400,
        text: "static layer",
        fontSize: 30,
        fontFamily: "Calibri",
        fill: "black"
      });

      var period = 2000;
      var anim = new Konva.Animation(function(frame) {
        var scale = Math.sin((frame.time * 2 * Math.PI) / period) + 0.001;
        blueHex.scale({ x: scale, y: scale });
        yellowHex.scaleY(scale);
        redHex.scaleX(scale);
      }, animLayer);
      anim.start();

      staticLayer.add(text);
      animLayer.add(blueHex, yellowHex, redHex);
      stage.add(animLayer, staticLayer);

      var layer = new Konva.Layer();

      var circle = new Konva.Circle({
        radius: 10,
        fill: "red",
        id: "face",
        name: "red circle"

        // x: stage.getWidth() / 2,
        // y: stage.getHeight() / 2,

        // radius: 70,
        // fill: "red",
        // stroke: "black",
        // strokeWidth: 4
      });

      var triangle = new Konva.Shape({
        sceneFunc: function(ctx) {
          ctx.beginPath();
          ctx.moveTo(20, 50);
          ctx.lineTo(220, 80);
          ctx.quadraticCurveTo(150, 100, 260, 170);
          ctx.closePath();

          // special Konva.js method
          ctx.fillStrokeShape(this);
        },
        fill: "#00d2ff",
        stroke: "black",
        strokeWidth: 4
      });

      var pentagon = new Konva.RegularPolygon({
        x: stage.getWidth() / 2,
        y: stage.getHeight() / 2,
        sides: 5,
        radius: 70,
        fill: "red",
        stroke: "black",
        strokeWidth: 4,
        shadowOffsetX: 20,
        shadowOffsetY: 25,
        shadowBlur: 40,
        opacity: 0.5,
        draggable: true
      });

      var rect = new Konva.Rect({
        x: 50,
        y: 20,
        width: 100,
        height: 50,
        fill: "green",
        stroke: "black",
        strokeWidth: 2,
        opacity: 0.2
      });

      var star = new Konva.Star({
        innerRadius: 20,
        outerRadius: 50,
        fill: "red",
        stroke: "black",
        strokeWidth: 5,
        numPoints: 5,
        x: 60,
        y: 60,
        draggable: true,
        shadowOffset: { x: 5, y: 5 },
        shadowColor: "black",
        shadowBlur: 5,
        shadowOpacity: 0.5
      });

      pentagon.on("mouseout touchend", function() {
        console.log("use input");
      });

      pentagon.on("xChange", function() {
        console.log("position change");
      });

      pentagon.on("dragend", function() {
        console.log("drag stoppend");
      });

      layer.add(circle);
      layer.add(triangle);
      // layer.add(pentagon);
      layer.add(rect);
      layer.add(star);
      star.cache(); // cache ================================

      stage.add(layer);

      /*
      var clone;
      for (var n = 0; n < 10; n++) {
        clone = star.clone({
          x: Math.random() * stage.getWidth(),
          y: Math.random() * stage.getHeight()
        });
        clone.cache();
        layer.add(clone);
      }
      */

      layer.draw();

      // anim
      // var tween = new Konva.Tween({
      //   node: rect,
      //   duration: 1,
      //   x: 140,
      //   y: 90,
      //   fill: "#fb5a52",
      //   rotation: Math.PI * 2,
      //   opacity: 1,
      //   strokeWidth: 6,
      //   scalex: 1.5
      // });

      // setTimeout(function() {
      //   tween.play();
      // }, 1000);

      // 动画，简单的方式
      // circle.to({
      //   duration: 1,
      //   fill: "green"
      // });
    }
  },
  created() {},
  mounted() {
    this.newCanvas();
    console.log("stageW: " + this.stageW + ", stageH: " + this.stageH);
  }
};
</script>

<style lang="scss" scoped>
.demo {
  .cs {
    border: 1px solid #000;
    margin-left: 10%;
  }
}
</style>

<style lang="css">
div.konvajs-content {
  border: 1px solid #000 !important;
  margin: 0 auto !important;
}
</style>
