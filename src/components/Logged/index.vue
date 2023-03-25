<template>
  <div class="logged-box">
    <div class="logged-title">请登录后发表评论</div>
    <div class="logged-btn flex content-center">
      <div class="flex">
        <Login class="mr05"></Login>
        <Register class="ml05"></Register>
      </div>
    </div>
    <div class="fast-login">
      <FastLogin></FastLogin>
    </div>
  </div>
</template>

<script>
import FastLogin from "@/components/FastLogin";
import Login from "@/components/Click/Login";
import Register from "@/components/Click/Register";

export default {
  name: "Logged",
  components: {Register, Login, FastLogin}
}
</script>

<style lang="less" scoped>
.logged-box {
  width: 100%;
  padding: 20px;
  background: #e1e1e1;
  text-align: center;

  .logged-title {
    color: #999999;
    height: 40px;
    line-height: 40px;
  }

  .logged-btn {
    margin-top: 10px;
  }

  .fast-login {
    margin-top: 20px;
  }
}
</style>