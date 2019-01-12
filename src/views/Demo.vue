<template>
  <div class="demo">
    <el-row :gutter="0" type="flex" justify="space-around" class="main-body">
      <el-col :span="6">
        <div class>main-left</div>
      </el-col>
      <el-col :span="6">
        <div class>main-right</div>
      </el-col>
    </el-row>
    <p style="text-align:center;">
      展示游乐场
      左侧：画布
      右侧上：模型选择
      右侧下：模型参数
      右侧底：训练 按钮
    </p>

    <div class="div-cs">
      <canvas class="cs" :width="width" :height="height"></canvas>
    </div>

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

// import Konva from "konva";
export default {
  name: "demo",
  data() {
    return {
      width,
      height
    };
  },
  methods: {
    clickBtn(e) {
      console.log("button", e);

      // rect.clearRect(0, 0, this.width, this.height);

      // stage.clearRect(0, 0, this.width, this.height);
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.demo {
  .div-cs {
    .cs {
      border: 1px solid #000;
      margin: 0 auto;
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
