<template>
  <div id="app">
    <el-row class="header-large hidden-xs-only">
      <div class="header-title">人工智能平台</div>

      <div class="header-demo">示例</div>
      <div class="header-tuto">教学</div>
      <div class="header-appl">应用</div>
      <div class="header-split">|</div>
      <div class="header-split">|</div>
      <div class="header-split">|</div>

      <span class="header-about">关于</span>
    </el-row>

    <el-row class="header-small hidden-sm-and-up">
      <div class="header-title">人工智能平台</div>
      <el-menu
        class="header-menu"
        default-active="1"
        mode="horizontal"
        background-color="#fb5a52"
        text-color="#fff"
        active-text-color="#0000ff"
        :router="true"
        menu-trigger="click"
      >
        <el-submenu index="1" style="width:100%;">
          <template slot="title">
            <i class="el-icon-menu" style="color:#fff"></i>
          </template>
          <el-menu-item index="demo">示例</el-menu-item>
          <el-menu-item index="tutorial">教学</el-menu-item>
          <el-menu-item index="application">应用</el-menu-item>
          <el-menu-item index="about">关于</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-row>

    <router-view/>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  components: {},
  watch: {}
};
</script>

<style lang="scss" scoped>
#app {
  .header-large {
    background-color: #fb5a52;
    height: 48px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    .header-title {
      font-size: 28px;
      line-height: 36px;
    }
    .header-split {
      color: #fb5a52;
    }
  }
  .header-small {
    background-color: #fb5a52;
    height: 48px;
    color: #fff;
    display: flex;

    .header-title {
      flex: 10 1 auto;
      font-size: 28px;
      line-height: 48px;
      text-align: center;
    }
    .header-menu {
      flex: 1 1 auto;
    }
  }
}
</style>
<style lang="css">
/* 覆盖 elem 原始的数据，style不能用scoped，即必须设置全局样式。
另外：加 !important */
html body #app div ul li div.el-submenu__title {
  height: 48px !important;
  line-height: 48px !important;
  border-bottom: none !important;
  padding: 0px 0px !important;
}
html body #app div ul li div i.el-icon-menu {
  margin-right: 0px !important;
}
</style>
