<template>
  <div class="author-card base-card">
    <div class="author-cover">
      <img src="/image/20221122114242.jpg" alt="" class="author-bg-img">
    </div>
    <div class="author-info">
      <el-avatar :src="user.avatar" :size="80"></el-avatar>
      <div class="line">
        <div class="flex">
          <a class="nickname text-ellipsis">{{ user.nickname }}</a>
        </div>
      </div>
      <div class="describe">
        <span v-if="user.describe">{{ user.describe }}</span>
        <span v-else>这个人很懒,什么都没有说</span>
      </div>
    </div>
    <div class="author-action">
      <div class="flex">
        <a class="follow action">
          <span v-if="isFollow">
            <svg-icon icon-class="solid-follow"/>
            已关注
          </span>
          <span v-else>
            <svg-icon icon-class="not-follow"/>
            关注
          </span>
        </a>
        <a class="chat action">
          <svg-icon icon-class="message"/>
          私信
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthorCard",
  data() {
    return {
      isFollow: false,
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
.author-card {
  .author-cover {
    height: 150px;
    overflow: hidden;
    object-fit: cover;
    border-radius: var(--main-border-radius) var(--main-border-radius) 0 0;

    .author-bg-img {
      width: 100%;
      height: 150px;
    }
  }

  .author-info {
    text-align: center;
    margin-top: -55px;
    padding: 15px;

    .line {
      margin-top: 5px;
      display: flex;
      justify-content: center;

      .nickname {

      }

      .nickname:hover {
        color: var(--wp--preset--color--title-hover);
      }
    }

    .describe {
      margin-top: 5px;
      font-size: 14px;
      color: #909399;
      opacity: .85;
    }
  }

  .author-action {
    display: flex;
    justify-content: center;
    padding-bottom: 15px;

    .action {
      display: inline-block;
      border-radius: var(--main-border-radius);
      vertical-align: middle;
      padding: 0.2em 0.6em;
      text-align: center;
      font-weight: 500;
      font-size: 14px;
    }

    .follow {
      margin-right: 5px;
      color: #ff5473;
      background-color: rgba(255, 84, 115, .1);
    }

    .chat {
      margin-left: 5px;
      color: #2997f7;
      background-color: rgba(41, 151, 247, .1);
    }
  }
}
</style>