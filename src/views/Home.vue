<template>
  <div class="home">
    <h2>领略人工智能的魅力，
      <br>让技术更好地服务我们。
    </h2>

    <div class="large hidden-xs-only">
      <el-row type="flex" justify="space-around">
        <el-col :span="7">
          <el-card class="card" shadow="hover">
            示例
            
          </el-card>
        </el-col>
        <el-col :span="7">
          <el-card class="card" shadow="hover">教学</el-card>
        </el-col>
        <el-col :span="7">
          <el-card class="card" shadow="hover">应用</el-card>
        </el-col>
      </el-row>
    </div>

    <div class="small hidden-sm-and-up">
      <el-card class="card" shadow="hover">示例</el-card>

      <el-card class="card" shadow="hover">教学</el-card>

      <el-card class="card" shadow="hover">应用</el-card>
    </div>

    <div class="footer">
      <p>&copy;2019 文刀出品</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {}
};
</script>

<style lang="scss" scoped>
.home {
  h2 {
    text-align: center;
    color: #2b2b2b;
  }
  .footer {
    background-color: #313e41;
    color: #fff;
    font-size: 14px;
    text-align: center;
    position: absolute;
    width: 100%;
    height: 10%;
    bottom: 0px;
  }
  .large {
    .card {
      text-align: center;
      height: 200px;
    }
  }
  .small {
    .card {
      margin: 10px;
      text-align: center;
    }
  }
}
</style>
