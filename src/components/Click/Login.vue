<template>
  <a class="login-btn" @click.prevent="openLogin">
    <svg-icon icon-class="login"/>
    <span class="ml05">登录</span>
  </a>
</template>

<script>
export default {
  name: "Login",
}
</script>

<style lang="less" scoped>
.login-btn {
  display: inline-block;
  padding: 5px 20px;
  color: #fff;
  vertical-align: middle;
  font-weight: 400;
  text-shadow: 0 0 0;
  text-align: center;
  border-radius: var(--main-border-radius);
  background: linear-gradient(135deg, #59c3fb 10%, #268df7 100%);
}
</style>