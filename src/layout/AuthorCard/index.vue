<template>
  <div class="author-card base-card">
    <div class="author-cover">
      <img src="http://localhost:8888/api/download/aaf3e53a68d34257a055e5f3e7dd78c0_20230406190756.jpeg" alt="" class="author-bg-img">
    </div>
    <div class="author-info">
      <el-avatar :src="user.avatar" :size="80"></el-avatar>
      <div class="line">
        <div class="flex">
          <a class="nickname text-ellipsis" @click.prevent="userCenter(1,uid)">{{ user.nickname }}</a>
        </div>
      </div>
      <div class="describe">
        <span v-if="user.describe">{{ user.describe }}</span>
        <span v-else>这个人很懒,什么都没有说</span>
      </div>
      <AuthorCount class="mt10"
                   :uid="uid"
                   :need-fans="true"/>
    </div>
    <div class="author-action" v-if="!youSelf(uid)">
      <div class="flex">
        <Follow class="mr05" :authorID="uid"></Follow>
        <Chat class="ml05"></Chat>
      </div>
    </div>
  </div>
</template>

<script>
import Follow from "@/components/Click/Follow";
import Chat from "@/components/Click/Chat";
import AuthorCount from "@/components/Click/AuthorCount";
import {getUserInfo} from "@/api/user";

export default {
  name: "AuthorCard",
  components: {AuthorCount, Chat, Follow},
  props: {
    uid: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      user: {},
    }
  },
  created() {
    getUserInfo(this.uid).then(res => {
      if (res.code === 0) {
        this.user = res.data.user
        this.$store.commit("setFollow", res.data.isFollow)
      }
    })
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