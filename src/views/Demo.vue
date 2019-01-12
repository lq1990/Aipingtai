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

    <div class="btn-wrap">
      
      <input type="button" value="addPoint" @click="statusAdd = true">
      <input type="button" value="removePoint" @click="statusAdd = false">
      <input type="button" value="clearAll" @click="handleClearAll">
      <input type="button" value="runML">
      
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
import Konva from "konva";

export default {
  name: "demo",
  data() {
    return {
      width: width,
      height: height,
      statusAdd: true, // 点增加、移除
      pointType: {}, // 记录10种点类型(颜色、点形状)。为 后续 ML分为10类做准备
      listPoints: [],
      pointRadius: 3,
      layer: null,
      stage: null
    };
  },
  methods: {
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
      });
      layer.add(rect);
      layer.draw();
    },
    /**
     * 在 layer 上画出 listPoints 存储的点。
     * listPoints 内部数据格式为 [[x1,y1],[x2,y2],...]
     */
    drawPoints(layer, listPoints) {
      var circle;
      listPoints.forEach(item => {
        circle = new Konva.Circle({
          x: item[0],
          y: item[1],
          radius: this.pointRadius,
          fill: "black"
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
      console.log("this.listPoints:", this.listPoints);
      this.listPoints = [];
      console.log("this.listPoints:", this.listPoints);
      this.clearStage(this.stage, this.layer);
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

      // 在整个stage即canvas画布 上绑定点击事件
      // 点击事件触发后就会执行
      this.stage.on("mousedown touchstart", () => {
        // 用匿名函数可以实现用this指向data中的值。
        // 若有function(){} 则this指向 Konva.stage
        const Pos = this.stage.getPointerPosition();
        const x = Math.round(Pos.x);
        const y = Math.round(Pos.y);
        console.log(x, y);

        if (this.statusAdd) {
          this.listPoints.push([x, y]);
        } else {
          // 在移除状态时，点击位置附近较近的一个点会被移除
          this.listPoints.forEach((item, index) => {
            var distance = Math.sqrt((item[0] - x) ** 2 + (item[1] - y) ** 2);
            if (distance < this.pointRadius) {
              this.listPoints.splice(index, 1);
            }
          });
        }
        console.log(this.listPoints);

        // 画之前清空画布
        this.clearStage(this.stage, this.layer);

        this.drawPoints(this.layer, this.listPoints);

        // 需要将点击的位置记录下来。
        // 否则当跳到别的页面时，就会丢失了。
        // 另外，记录下来，再使用ML算法
        // 尝试放在 localStorage or sessionStorage， 或vuex
      });

      // this.stage.on("mousemove", function() {
      //   console.log("mousemove");
      //   console.log(this); // this指向 Konva.Stage
      // });
    }
  },
  created() {},
  mounted() {
    this.newCanvas();
  }
};
</script>

<style lang="scss" scoped>
.demo {
  .btn-wrap {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    input {
      margin: 0 5px;
    }
  }
}
</style>

<style lang="css">
div.konvajs-content {
  border: 1px solid #000 !important;
  margin: 0 auto !important;
}
</style>
