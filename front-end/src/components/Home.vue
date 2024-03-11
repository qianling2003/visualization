<template>
  <div class="home">
    <Header></Header>
    <el-container class="content">
      <Menu></Menu>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index">
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <router-view> </router-view>
        <Footer></Footer>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from './common/Header'
import Footer from './common/Footer'
import Menu from './common/Menu'
export default {
  components: {
    Header,
    Footer,
    Menu
  },
  name: 'Home',
  data () {
    return {
    }
  },
  created () {
    console.log(this.$route)
  },
  methods: {
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
  .content {
    position: absolute;
    width: 100%;
    top: 40px;
    bottom: 0;

    .el-main {
      background-color: #181717;
      color: #333;
      height: 100%;
      text-align: center;
      line-height: 160px;
      .el-breadcrumb {
        color: #ffffff;  /* 设置面包屑文本颜色 */
        background-color: #161717;  /* 设置面包屑背景颜色 */
      }
    }
  }
}
</style>
