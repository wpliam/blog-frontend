<template>
  <div class="fast-login">
    <p class="separator">社交账号登录</p>
    <div class="separator-btn">
      <a>
        <el-tooltip effect="dark" content="QQ登录" placement="top">
          <svg-icon icon-class="qq" class-name="medium-svg"/>
        </el-tooltip>
      </a>
      <a style="padding: 0 10px">
        <el-tooltip effect="dark" content="微信登录" placement="top">
          <svg-icon icon-class="wechat" class-name="medium-svg"/>
        </el-tooltip>
      </a>
      <a>
        <el-tooltip effect="dark" content="GitHub" placement="top">
          <svg-icon icon-class="github" class-name="medium-svg"/>
        </el-tooltip>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "FastLogin"
}
</script>

<style lang="less" scoped>
.fast-login {
  text-align: center;

  .separator {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1em;
    color: #b1b1b1;
  }

  .separator:after, .separator:before {
    content: "";
    background: #efefef;
    max-width: 20%;
    height: 1px;
    margin: 0 1em;
    flex: 1;
  }

  .separator-btn {
    margin-top: 10px;
  }
}
</style>