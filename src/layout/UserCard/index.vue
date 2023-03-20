<template>
  <div class="user-card">
    <div v-if="isLogin">
      <div class="flex">
        <el-avatar :src="user.avatar"></el-avatar>
        <div class="ml10">
          <a class="nickname">{{ user.nickname }}</a>
          <p class="user-desc" v-if="user.describe">{{ user.describe }}</p>
          <p class="user-desc" v-else>这个人很懒,什么都没有写</p>
        </div>
      </div>
      <div class="user-btn mt20">
        <div class="flex">
          <a class="flex-column-center blue-color">
            <span class="small-circle blue-bg-1"> <svg-icon icon-class="user"/></span>
            <span class="mt05 fs12">用户中心</span>
          </a>
          <a class="flex-column-center green-color" style="margin: 0 30px" @click.prevent="writeArticle">
            <span class="small-circle green-bg-1"> <svg-icon icon-class="edit"/></span>
            <span class="mt05 fs12">发布文章</span>
          </a>
          <a class="flex-column-center red-color">
            <span class="small-circle red-bg-1"> <svg-icon icon-class="return"/></span>
            <span class="mt05 fs12">退出登录</span>
          </a>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="user-btn">
        <div class="flex">
          <a class="flex-column-center blue-color">
            <span class="small-circle blue-bg-1"> <svg-icon icon-class="login"/></span>
            <span class="mt05 fs12">登录</span>
          </a>
          <a class="flex-column-center green-color" style="margin: 0 30px">
            <span class="small-circle green-bg-1"> <svg-icon icon-class="register"/></span>
            <span class="mt05 fs12">注册</span>
          </a>
          <a class="flex-column-center red-color">
            <span class="small-circle red-bg-1"> <svg-icon icon-class="password"/></span>
            <span class="mt05 fs12">找回密码</span>
          </a>
        </div>
      </div>
      <div class="fast-login mt20" style="text-align: center">
        <p class="separator">快速登录</p>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  data() {
    return {
      isLogin: true,
      user: {
        avatar: "/image/avatar.jpg",
        nickname: "苹果",
        describe: "我不想介绍自己"
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-card {
  .user-btn {
    display: flex;
    justify-content: center;
  }

  .fast-login {
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

  .blue-color {
    color: #2997f7;
  }

  .blue-bg-1 {
    background: rgba(41, 151, 247, .1);
  }

  .green-color {
    color: #18a52a;
  }

  .green-bg-1 {
    background: rgba(18, 185, 40, .1);
  }

  .red-color {
    color: #ff5473;
  }

  .red-bg-1 {
    background: rgba(255, 84, 115, .1);
  }
}
</style>