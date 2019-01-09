<template>
  <div id="app">
    <div class="header">
      <span class="title">人工智能平台</span>
      <span class="header-middle">
        <router-link to="/demo" tag="span" class="demo">示例</router-link>
        <router-link to="/tutorial" tag="span" class="tutorial">教程</router-link>
        <router-link to="/application" tag="span" class="app">应用</router-link>
      </span>
      <router-link to="/about" tag="span" class="about">关于</router-link>
    </div>
    <router-view/>

    <div class="main-body">main body
      <div class="left-canvas"></div>
      <div class="right-body">
        <div class="right-model"></div>
        <div class="right-param"></div>
      </div>
    </div>

    <div class="footer"></div>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {}
};
</script>

<style lang="scss" scoped>
#app {
  position: absolute;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  .header {
    position: relative;
    height: 100px;
    background-color: #fb5a52;
    .title {
      position: absolute;
      color: #fff;
      font-size: 36px;
      bottom: 5px;
      left: 5px;
    }
    .header-middle {
      position: absolute;
      bottom: 8px;
      left: 300px;
      width: 50%;
      display: flex;
      justify-content: space-between;
      .demo,
      .tutorial,
      .app {
        color: #fff;
        font-size: 24px;
        // line-height: 24px;
      }
    }
    .about {
      position: absolute;
      bottom: 8px;
      right: 15px;
      color: #fff;
      font-size: 20px;
      // line-height: 20px;
    }
  }
}
</style>
