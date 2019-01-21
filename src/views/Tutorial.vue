<template>
    <div class="tutorial">
      
        针对对象：
            初识机器学习算法，欲深入了解算法原理的人群。
        所需基础：
            高等数学、线性代数、概率论。
            Python 或 Javascirpt
        讲解方式：
            以视频为主，轻松有趣。


        <div>
            <input type="button" value="button">
        </div>
      <!-- <chart class="ch"></chart> -->
        
    </div>
</template>

<script>
// import Chart from "../components/Chart.vue";
export default {
  name: "tutorial",
  data() {
    return {};
  },
  components: {
    // chart: Chart
  }
};
</script>

<style lang="scss" scoped>
.tutorial {
  .ch {
    margin: 50px;
    width: 500px;
    height: 300px;
  }
}
</style>
