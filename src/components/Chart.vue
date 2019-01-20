<template>
  <div class="chart">
    <div class="btnChart">
        <!-- btnChart 不应放在这里，应该放在 父级，当点击按钮时，再计算cost 传给chart -->
      <el-button class="btn" type="danger" @click="handleFigure">Chart</el-button>
    </div>

    <v-chart :options="lineData"></v-chart>
  </div>
</template>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/legend";
export default {
  name: "chart",
  props: ["plotx", "ploty"],
  data() {
    let data_lirun = [920, 932, 901, 934, 1290, 1330, 1320];
    return {
      lineData: {
        legend: {},
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "利润",
            data: data_lirun,
            type: "line",
            label: {
              normal: {
                show: true
              }
            }
          },
          {
            name: "支出",
            data: [1820, 1932, 1901, 1934, 2290, 2330, 2320],
            type: "line"
          },
          {
            name: "收入",
            data: [80, 93, 90, 94, 290, 130, 320],
            type: "line"
          }
        ],
        animationDuration: 0
      }
    };
  },
  components: {
    "v-chart": ECharts
  }
};
</script>

<style lang="scss" scoped>
.chart {
  .btnChart {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
}
// 注意：只能通过这里的 .echarts 来改变 css 中图表的大小。
.echarts {
  //   border: 1px dashed #00f;
  width: 100%;
  height: 100%;
}
</style>
