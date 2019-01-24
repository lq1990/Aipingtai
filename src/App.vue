<template>
  <div id="app">
    <el-row class="header-large hidden-xs-only">
      <!-- <router-link to="/" tag="div" class="header-title">人工智能平台</router-link> -->
      <el-menu
        class="header-menu"
        mode="horizontal"
        background-color="#fb5a52"
        text-color="#fff"
        active-text-color="#000"
        :router="true"
        menu-trigger="click"
      >
        <el-menu-item index="/" class="header-title">平台</el-menu-item>
        <el-menu-item index="/demo">示例</el-menu-item>
        <el-menu-item index="tutorial">教学</el-menu-item>
        <el-menu-item index="application">应用</el-menu-item>
        <div class="header-split">|</div>
        <div class="header-split">|</div>
        <div class="header-split">|</div>
        <div class="header-split">|</div>
        <div class="header-split">|</div>
        <el-menu-item index="about">关于</el-menu-item>
      </el-menu>
    </el-row>

    <el-row class="header-small hidden-sm-and-up">
      <router-link to="/" tag="div" class="header-title">平台</router-link>

      <el-menu
        class="header-menu"
        default-active="1"
        mode="horizontal"
        background-color="#fb5a52"
        text-color="#fff"
        active-text-color="#fff"
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
  mounted() {
    console.log("%cApp.vue mounted...", "color:red");
  },
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
    align-items: center;
    font-size: 14px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);

    .header-menu {
      display: flex;
      justify-content: space-between;
      .header-title {
        text-align: center;
        font-size: 28px;
        line-height: 36px;
      }

      .header-split {
        color: #fb5a52 !important;
      }
    }
  }
  .header-small {
    background-color: #fb5a52;
    height: 48px;
    color: #fff;
    display: flex;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);

    .header-title {
      flex: 10 1 auto;
      font-size: 28px;
      line-height: 48px;
      text-align: center;
      cursor: pointer;
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
  /* 控制小屏幕下，导航高 */
  height: 48px !important;
  line-height: 48px !important;
  border-bottom: none !important;
  padding: 0px 0px !important;
}
html body #app div ul li.el-menu-item {
  /* 控制大屏幕下，顶部横向导航的高度 */
  height: 48px !important;
  line-height: 48px !important;
  /* border-bottom: none !important; */
}
html body #app div ul li div i.el-icon-menu {
  /* 控制小屏幕下，导航按钮细节 */
  margin-right: 0px !important;
}
</style>
