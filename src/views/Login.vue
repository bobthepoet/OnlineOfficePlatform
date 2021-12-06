<template>
  <div style="height: 100%; width: 100%">
    <el-form :rules="rules" ref="loginForm" :model="loginForm" v-loading="loading" class="loginContainer">
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" placeholder="请输入用户名" @keydown.enter.native="fnLogin"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" @keydown.enter.native="fnLogin"/>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input type="text" v-model="loginForm.captcha" placeholder="点击图片更换验证码" class="captcha" @keydown.enter.native="fnLogin"/>
        <img :src="captchaUrl" @click="fnUpdateCaptcha" class="captchaImg"/>
      </el-form-item>
      <el-checkbox v-model="checked" style="margin-bottom: 10px;text-align: left">记住我</el-checkbox>
      <el-button type="primary" style="width: 25%; margin-left: 70px;" @click="fnLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>

  export default {
    name: "Login",
    data () {
      return {
        captchaUrl: '/captcha?time=' + new Date(),
        checked: true,
        loginForm: {
          username: 'admin',
          password: '123',
          captcha: '' // 验证码
        },
        //校验规则(写法参考elementui)，其中的key对应el-form-item标签的prop项
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          captcha: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      fnLogin () {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.postRequest('/login', this.loginForm).then(res => {
              if (res) {
                this.loading = false;
                const tokenStr = res.obj.tokenHead + res.obj.token;
                // 存储token
                window.sessionStorage.setItem("tokenStr", tokenStr);
                // 跳转首页
                let path = this.$route.query.redirect;
                //replace
                this.$router.replace((path === '/' || path === undefined) ? '/home' : path);
              } else {
                this.fnUpdateCaptcha()
              }


            })
          } else {
            this.$message.error('请输入所有字段！')
            return false;
          }
        })
      },
      //更换验证码
      fnUpdateCaptcha () {
        this.captchaUrl = '/captcha?time=' + new Date()
      }
    }
  }
</script>

<style>
  .loginContainer {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 160px auto;
    width: 350px;
    padding: 15px 35px;
    background: #FFFFFF;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .loginTitle {
    margin: 0 auto 40px auto;
    text-align: center;
  }

  .captcha {
    width: 250px;
    margin-right: 10px;
  }

  .captchaImg {
    width: 100px;
  }

  .el-form-item__content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
