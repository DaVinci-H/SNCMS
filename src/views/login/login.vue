<template>
  <div id="login">
    <div class="login-model">
      <div class="head">SNCMS 后台登录</div>
      <div class="main">
        <el-input ref="username" class="username" placeholder="用户名" v-model="form.username" @keyup.enter.native="login">
          <i slot="prepend" class="fa fa-user"></i>
        </el-input>
        <el-input ref="password" class="password" type="password" placeholder="密码" v-model="form.password" @keyup.enter.native="login">
          <i slot="prepend" class="fa fa-lock"></i>
        </el-input>
        <div class="verify-item">
          <el-input ref="verify" class="verify" placeholder="验证码" v-model="form.verify" @keyup.enter.native="login"></el-input>
          <img :src="images.adminPng" @click="switchVerify">
        </div>
        <el-button type="primary" size="small" style="width:100%;" @click="login">登 录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import adminPng from '@/assets/images/login-admin.png'
export default {
  name: 'login',
  data() {
    return {
      images:{
        adminPng
      },
      form:{
        username:'',
        password:'',
        verify:''
      }
    }
  },
  methods: {
    login() {
      if(!this.form.username) {
        this.$message.error('请填写用户名');
        this.$refs.username.focus();
        return false;
      }
      if(!this.form.password) {
        this.$message.error('请填写密码');
        this.$refs.password.focus();
        return false;
      }
      if(!this.form.verify) {
        this.$message.error('请填写验证码');
        this.$refs.verify.focus();
        return false;
      }
      this.$router.push({name:'control-panel'});
    },
    switchVerify() {
      console.log('切换验证码')
    }
  }
}
</script>

<style lang="less">
  @import "../../assets/less/login/login.less";
</style>
