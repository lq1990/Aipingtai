<template>
  <div class="demo">
    <div class="demo-large hidden-xs-only">
      <demo-left></demo-left>

      <div class="demo-middle">demo-middle</div>
      <div class="demo-right">demo-right</div>
    </div>

    <div class="demo-small hidden-sm-and-up">
      <demo-left></demo-left>
      <div class="demo-middle">demo-middle</div>
      <div class="demo-right">demo-right</div>
    </div>
  </div>
</template>

<script>
import Demo3 from "./Demo3.vue";
export default {
  name: "demo",
  data() {
    return {};
  },
  components: {
    "demo-left": Demo3
  }
};
</script>

<style lang="scss" scoped>
.demo {
  .demo-large {
    display: flex;
    justify-content: space-around;
    .demo-middle {
      border: 1px solid #00f;
    }
    .demo-right {
      border: 1px solid #f00;
    }
  }

  .demo-small {
    display: flex;
    flex-direction: column;
    .demo-middle {
      background-color: #f66;
    }
    .demo-right {
      background-color: #ff9645;
    }
  }
}
</style>
