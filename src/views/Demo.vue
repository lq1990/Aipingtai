<template>
  <div class="demo">
    <el-row :gutter="0" type="flex" justify="space-around" class="main-body">
      <el-col :span="6">
        <div class>main-left</div>
      </el-col>
      <el-col :span="6">
        <div class>main-right</div>
      </el-col>
    </el-row>
    <p>
      展示游乐场
      左侧：画布
      右侧上：模型选择
      右侧下：模型参数
      右侧底：训练 按钮
    </p>
    <canvas id="cs" width="600" height="600">
      友情提示：此处是画布。为了更好地体验，请升级您的浏览器。
    </canvas>
  </div>
</template>

<script>
export default {
  name: "demo",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
</style>
