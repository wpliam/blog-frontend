<template>
  <div class="login-box">
    <el-form ref="login-box" :model="loginForm" :rules="loginRules">
      <el-form-item prop="username">
        <el-input
            v-model="loginForm.username"
            placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
            v-model="loginForm.password"
            placeholder="密码"
            show-password
        >
        </el-input>
      </el-form-item>
      <div class="option">
        <a class="login-btn btn" v-if="true" @click.prevent="login">
          登录
        </a>
      </div>
    </el-form>
  </div>
</template>

<script>
import {setToken, setUserInfo} from "@/util/storage";
import {login} from "@/api/user";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePassword}]
      },
    }
  },
  methods: {
    async login() {
      const res = await login(this.loginForm.username, this.loginForm.password);
      if (res.code === 0) {
        setToken(res.data.token)
        setUserInfo(res.data.user)
        this.refreshCurrRoute()
      } else {
        console.log("用户名或密码错误")
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-box {
  .option {
    width: 100%;
    text-align: center;

    .btn {
      display: inline-block;
      width: 100%;
      height: 34px;
      line-height: 34px;
      border-radius: 17px;
      text-align: center;
      color: #fff;
      font-weight: 500;
    }

    .login-btn {
      background: linear-gradient(135deg, #59c3fb 10%, #268df7 100%);
    }
  }
}

/deep/ .el-checkbox__label {
  padding-left: 2px;
}
</style>