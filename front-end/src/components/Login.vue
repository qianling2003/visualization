<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>美国车祸可视化</span>
      </div>
      <el-form :model="form" ref="form" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="form.usernmae"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        usernmae: '',
        password: ''
      }
    }
  },
  methods: {
    login (form) {
      console.log(form)
    }
  }
}

</script>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgb(40, 39, 40);

  .box-card {
    width: 450px;
    margin: 200px auto;

    .el-card_header {
      font-size: 34px;
    }

    .el-button {
      width: 33%;
    }
  }
}
</style>
