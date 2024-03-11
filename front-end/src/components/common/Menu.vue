<template>
  <div class="menu">
    <div>
      <el-aside width="150px">
        <el-menu router :default-active="activePath" class="el-menu-vertical-demo" background-color="#0d0d0d"
          text-color="#fff" active-text-color="#ffd04b">
          <template v-for="(item, index) in menus">
            <el-submenu :index="index + ''" :key="index" v-if="!item.hidden">
              <template slot="title">
                <i :class="item.iconClass"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item-group v-for="(child, index) in item.children" :key="index">
                <el-menu-item :index="child.path">
                  <i :class="child.iconClass"></i>
                  {{ child.name }}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      menus: []
    }
  },
  created () {
    // console.log(this.$router.options.routes)
    this.menus = [...this.$router.options.routes]
    // console.log(this.$router.currentRoute.path)
    this.activePath = this.$router.currentRoute.path
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.menu {
  background-color: #0d0d0d;

  .el-aside {
    height: 100%;
    justify-content: center;
    /* 水平居中 */
    align-items: center;

    /* 垂直居中 */
    .el-menu {
      height: 100%;
    }

    .el-submenu .el-menu-item {
      min-width: 0;
    }
  }
}
</style>
