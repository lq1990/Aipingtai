<template>
  <div class="demo-model">
    <el-carousel
      @change="handleCardChange"
      :autoplay="false"
      trigger="click"
      type="card"
      height="100px"
    >
      <el-carousel-item v-for="(item,index) in algArr" :key="index">
        <h3>{{item}}</h3>
      </el-carousel-item>
    </el-carousel>

    <template v-if="curAlg=='逻辑回归'">
      <div><span style="font-weight: bold">提醒</span>：使用逻辑回归做二分类时，请确保画布上只有
        <span style="background:#fb5a52;color:white">红</span>
        <span style="background:#32b900;color:white">绿</span>两类。
      </div>
      
      <h4>参数：</h4>
      <p>学习率，迭代次数，优化器</p>
    </template>
    <template v-if="curAlg=='神经网络'">
      <h4>参数：</h4>
      <p>层数</p>
    </template>
    <template v-if="curAlg=='线性回归'">
      <h4>参数：</h4>
      <p>惩罚系数</p>
    </template>
    curAlg in store: {{ curAlg }}
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "demo-model",
  data() {
    return {};
  },
  computed: {
    ...mapState("demo", ["algArr", "curAlg"])
  },
  methods: {
    ...mapMutations("demo", ["changeCurAlg"]),
    handleCardChange(cur) {
      // (cur, old) 传入参数为 索引
      this.changeCurAlg(this.algArr[cur]);
      console.log("%cthis.curAlg:", "color:blue", this.curAlg);
      // console.log("cur:", cur, this.algArr[cur]);
      // console.log("old:", old, this.algArr[old]);
    }
  }
};
</script>

<style lang="scss" scoped>
.demo-model {
  //   display: flex;
  //   justify-content: center;
  // border: 1px solid #ccc;
  padding: 0 20px;
}
</style>

<style>
.el-carousel__item h3 {
  text-align: center;
  color: #fff;
  font-size: 24px;
  opacity: 1;
  line-height: 100px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  /* background-color: #99a9bf; */
  background-color: #fd7d46;
}

.el-carousel__item:nth-child(2n + 1) {
  /* background-color: #d3dce6; */
  background-color: #ff9f44;
}
</style>
