<template>
  <div class='header'>
    <el-header>
      <div class='title'>美国车祸可视化分析</div>
      <div>21121157 卜钱平</div>
    </el-header>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">
.header {
  .el-header {
    background: #0d0d0d;
    /* 修改头部背景颜色 */
    color: #fefcfc;
    line-height: 20px;
    display: flex;
    justify-content: space-between;

    .title {
      width: 300px;
      font-size: 20px;
      color: #fff;
      /* 修改标题颜色 */
    }
  }
}</style>
