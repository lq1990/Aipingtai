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
export default {
  name: "chart",
  props: ["costArr", "logWval"],
  data() {
    let plotX = [];
    let plotY = [];
    this.costArr.forEach((item, index) => {
      plotX.push(index);
      plotY.push(item);
    });
    let w0 = [];
    let w1 = [];
    let w2 = [];
    for (let i = 0; i < this.logWval.length; i++) {
      w0.push(this.logWval[i][0][0]);
      w1.push(this.logWval[i][1][0]);
      w2.push(this.logWval[i][2][0]);
    }
    return {
      lineCost2: {
        legend: {},
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
            name: "cost",
            data: plotY,
            type: "line"
            // label: {
            //   normal: {
            //     show: true
            //   }
            // }
          },
          {
            name: "w0",
            data: w0,
            type: "line"
          },
          {
            name: "w1",
            data: w1,
            type: "line"
          },
          {
            name: "w2",
            data: w2,
            type: "line"
          }
        ]
      }
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
