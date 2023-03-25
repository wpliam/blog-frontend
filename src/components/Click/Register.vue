<template>
  <a class="register-btn">
    <svg-icon icon-class="register"/>
    <span class="ml05">注册</span>
  </a>
</template>

<script>
export default {
  name: "Register"
}
</script>

<style lang="less" scoped>
.register-btn {
  display: inline-block;
  padding: 5px 20px;
  color: #fff;
  vertical-align: middle;
  font-weight: 400;
  text-shadow: 0 0 0;
  text-align: center;
  border-radius: var(--main-border-radius);
  background: linear-gradient(135deg, #f59f54 10%, #ff6922 100%);
}
</style>