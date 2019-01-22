<template>
  <div class="demo-model">
    <el-carousel
      class="cards"
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

    <div class="temp">
      <template v-if="curAlg=='逻辑回归'">
        <div class="hint">
          <span style="font-weight: bold">提醒</span>：使用逻辑回归做二分类时，请确保画布上只有
          <span style="background:#fb5a52;color:white">红</span>
          <span style="background:#32b900;color:white">绿</span>两类。
        </div>

        <div class="params-render">
          <div class="params">
            <h4>参数：</h4>
            <div class="params-items">学习率：
              <el-input size="mini" class="input" v-model="stepS"></el-input>
            </div>
            <div class="params-items">总步数：
              <el-input size="mini" class="input" v-model="stepT"></el-input>
            </div>
            <div class="params-items">优化器：
              <el-radio-group size="mini" v-model="curOpt" fill="#ff9f44">
                <el-radio-button v-for="(item, index) in optimizerArr" :key="index" :label="item"></el-radio-button>
              </el-radio-group>
            </div>
            <input type="button" value="显示参数" @click="handleParamsShow"> &nbsp;
            <input type="button" value="重置" @click="handleParamsReset">
          </div>
          <div class="render">
            <h4>画布渲染：</h4>
            <div style="text-align:center">
              <div>省时、粗糙</div>

              <div style="display: flex; justify-content:center;">
                <el-slider v-model="drawInt" :min="1" :max="50" vertical height="100px"></el-slider>
              </div>
              <div>精细、耗时</div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="curAlg=='神经网络'">
        <h4>参数：</h4>
        <p>层数</p>
      </template>
      <template v-if="curAlg=='线性回归'">
        <h4>参数：</h4>
        <p>惩罚系数</p>
      </template>
    </div>

    <br>
    <!-- curAlg in store: {{ curAlg }} -->
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
    ...mapState("demo", [
      "algArr",
      "curAlg",
      "stepSize",
      "stepTotal",
      "optimizerArr",
      "curOptimizer",
      "drawInterval"
    ]),
    stepS: {
      get() {
        return this.stepSize;
      },
      set(val) {
        this.changeStepSize(val);
      }
    },
    stepT: {
      get() {
        return this.stepTotal;
      },
      set(val) {
        this.changeStepTotal(val);
      }
    },
    curOpt: {
      get() {
        return this.curOptimizer;
      },
      set(val) {
        this.changeCurOptimizer(val);
      }
    },
    drawInt: {
      get() {
        return this.drawInterval;
      },
      set(val) {
        this.changeDrawInterval(val);
      }
    }
  },
  methods: {
    ...mapMutations("demo", [
      "changeCurAlg",
      "changeCurOptimizer",
      "changeStepSize",
      "changeStepTotal",
      "changeDrawInterval"
    ]),
    handleCardChange(cur) {
      // (cur, old) 传入参数为 索引
      this.changeCurAlg(this.algArr[cur]);
      console.log("%cthis.curAlg:", "color:blue", this.curAlg);
    },
    handleParamsShow() {
      console.log("this.stepSize:", this.stepSize);
      console.log("this.stepTotal:", this.stepTotal);
      console.log("this.curOptimizer:", this.curOptimizer);
      console.log("this.drawInterval:", this.drawInterval);
    },
    handleParamsReset() {
      this.changeStepSize(0.1);
      this.changeStepTotal(100);
      this.changeCurOptimizer("GD");
      this.changeDrawInterval(20);
    }
    // handleOptimizerChange(e) {
    //   console.log("e:", e);
    //   console.log("%cthis.curOptimizer:", "color:red", this.curOptimizer);
    //   console.log("this.curOpt:", this.curOpt);
    // }
  },
  mounted() {
    console.log("mounted...");
    console.log("%cthis.curOptimizer:", "color:red", this.curOptimizer);
  }
};
</script>

<style lang="scss" scoped>
.demo-model {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0 20px;
  .hint {
    padding: 5px 0;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .params-render {
    display: flex;
    .params {
      flex: 1 1 60%;
      // border: 1px solid #f66;
      .params-items {
        margin-bottom: 10px;
        .input {
          width: 100px;
          display: inline-block;
        }
      }
    }
    .render {
      flex: 1 1 40%;
      // border: 1px solid #66f;
    }
  }
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

.el-slider__bar {
  background-color: #ff9f44 !important;
}

.el-slider__button {
  border: 2px solid #ff9f44 !important;
}
</style>
