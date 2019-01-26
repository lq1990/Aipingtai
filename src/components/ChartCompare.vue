<template>
  <div class="chart">
    <v-chart :options="lineCost2"></v-chart>
  </div>
</template>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/legend";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
export default {
  name: "chart",
  props: ["compareOptimizerCostArr"], // 当对比 优化器时，arr存储的是 [[],[],[]]
  data() {
    let plotX = [];
    let plotYgd = [];
    let plotYrms = [];
    let plotYadadelta = [];

    var gdArr = this.compareOptimizerCostArr[0];
    var rmsArr = this.compareOptimizerCostArr[1];
    var adadeltaArr = this.compareOptimizerCostArr[2];

    gdArr.forEach((item, index) => {
      plotX.push(index);
      plotYgd.push(item);
    });
    rmsArr.forEach((item, index) => {
      plotYrms.push(item);
    });
    adadeltaArr.forEach((item, index) => {
      plotYadadelta.push(item);
    });

    let ret = {
      title: {
        text: "对比使用不同优化器时的损失值变化"
      },
      legend: {
        x: "right",
        orient: "veritcal"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#ccc"
          }
        }
      },
      xAxis: {
        type: "category",
        // category 必须。不能换成value，否则有问题
        data: plotX
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "GD_cost",
          data: plotYgd,
          type: "line"
        },
        {
          name: "RMSProp_cost",
          data: plotYrms,
          type: "line"
        },
        {
          name: "Adadelta_cost",
          data: plotYadadelta,
          type: "line"
        }
      ]
    };

    return {
      lineCost2: ret
    };
  },
  computed: {},
  methods: {},
  components: {
    "v-chart": ECharts
  },
  mounted() {
    console.log("Chart mounted...");
    // console.log("this.costArr.length:", this.costArr.length);
    // console.log("this.logWval:", this.logWval);
  },
  watch: {}
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
