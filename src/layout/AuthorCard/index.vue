<template>
  <div class="author-card base-card">
    <div class="author-cover">
      <img src="/image/20221122114242.jpg" alt="" class="author-bg-img">
    </div>
    <div class="author-info">
      <el-avatar :src="user.avatar" :size="80"></el-avatar>
      <div class="line">
        <div class="flex">
          <a class="nickname text-ellipsis" @click.prevent="userCenter(1)">{{ user.nickname }}</a>
        </div>
      </div>
      <AuthorCount class="mt10" :need-fans="true"></AuthorCount>
      <div class="describe">
        <span v-if="user.describe">{{ user.describe }}</span>
        <span v-else>这个人很懒,什么都没有说</span>
      </div>
    </div>
    <div class="author-action">
      <div class="flex">
        <Follow class="mr05"></Follow>
        <Chat class="ml05"></Chat>
      </div>
    </div>
  </div>
</template>

<script>
import Follow from "@/components/Click/Follow";
import Chat from "@/components/Click/Chat";
import AuthorCount from "@/components/Click/AuthorCount";

export default {
  name: "AuthorCard",
  components: {AuthorCount, Chat, Follow},
  data() {
    return {
      user: {
        avatar: "/image/avatar.jpg",
        nickname: "苹果",
        describe: "我不想介绍自己"
      }
    }
  },
  methods: {}
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
    }

    .describe {
      margin-top: 10px;
      font-size: 14px;
      color: #909399;
      opacity: .85;
    }
  }

  .author-action {
    display: flex;
    justify-content: center;
    padding-bottom: 15px;

  }
}
</style>