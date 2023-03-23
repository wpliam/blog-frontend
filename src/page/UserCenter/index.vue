<template>
  <div class="user-center-container">
    <Nav></Nav>
    <div class="base-line-layout">
      <div class="user-header base-card">
        <div class="user-cover">
          <img :src="user.cover" alt="" class="user-bg">
        </div>
        <div class="header-content base-layout">
          <div class="h-left">
            <el-avatar shape="square" :size="100" :src="user.avatar" style="margin-top: -50px"></el-avatar>
            <div class="user-info">
              <a class="nickname">{{ user.nickname }}</a>
              <p class="user-desc mt05">{{ user.desc }}</p>
            </div>
          </div>
          <div class="h-right">
            <ClockIn ref="child" @click.native="$refs.child.clockIn()"></ClockIn>
          </div>
        </div>
      </div>
      <div class="user-content" v-if="userType === '0'">
        <div class="c-left">
          <div class="base-card user-count">
            <a class="flex-column-center">
              <div class="count">0</div>
              <div class="name">文章</div>
            </a>
            <a class="flex-column-center">
              <div class="count">0</div>
              <div class="name">评论</div>
            </a>
            <a class="flex-column-center">
              <div class="count">0</div>
              <div class="name">收藏</div>
            </a>
            <a class="flex-column-center">
              <div class="count">1888</div>
              <div class="name">粉丝</div>
            </a>
          </div>
        </div>
        <div class="c-right">

        </div>
      </div>
      <div class="author-content base-card" v-if="userType === '1'">
        <ul class="flex author-tab">
          <li v-for="(tab,index) in ['文章','收藏','评论','粉丝']" :key="index" class="each-tab" @click.prevent=""
              :class="activeIndex===index?'active-tab':''">
            {{ tab }}
          </li>
        </ul>
        <el-empty description="暂无内容"></el-empty>
      </div>
    </div>
    <FootWaveLine></FootWaveLine>
  </div>
</template>

<script>
import Nav from "@/layout/Nav";
import FootWaveLine from "@/layout/Footer/FootWaveLine";
import Picture from "@/components/Picture";
import ClockIn from "@/components/Click/ClockIn";

export default {
  name: "UserCenter",
  components: {ClockIn, Picture, FootWaveLine, Nav},
  data() {
    return {
      userType: this.$route.query.userType,
      uid: this.$route.query.uid,
      activeIndex: 0,
      user: {
        cover: "/image/banner1.jpg",
        avatar: "/image/avatar.jpg",
        nickname: "apple",
        desc: "我不想介绍自己"
      },
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.user-center-container {
  .user-header {
    height: 400px;
    overflow: hidden;

    .user-cover {
      height: 320px;
      object-fit: cover;
      overflow: hidden;
      border-radius: var(--main-border-radius) var(--main-border-radius) 0 0;

      .user-bg {
        width: 100%;
        height: 100%;
        object-fit: cover;
        overflow: hidden;
      }
    }

    .header-content {
      margin-top: 10px;

      .h-left {
        display: flex;

        .user-info {
          margin-left: 8px;
        }
      }

      .h-right {
        display: flex;
        align-items: center;
      }
    }
  }

  .user-content {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .c-left {
      width: 28%;

      .user-count {
        display: flex;
        justify-content: space-around;
        padding: 10px;

        .count {
          font-size: 1.4em;
        }

        .name {
          font-size: 0.9em;
          opacity: .5;
          margin-top: 5px;
        }
      }
    }

    .c-right {
      width: 70%;
    }
  }

  .author-content {
    margin-top: 20px;
    padding: 15px;
    .author-tab {
      color: #999;
      border-bottom: 1px solid #ebeef5;
      padding-bottom: 15px;

      .each-tab {
        margin-right: 15px;
        cursor: pointer;
      }
    }
  }
}

/* 宽度小于 760px 的屏幕使用该样式*/
@media screen and (max-width: 760px) {
  .user-center-container {
    .user-header {
      .user-cover {
        height: 280px;
      }

      .header-content {
        .h-left {
          flex-direction: column;
        }
      }
    }
  }
}
</style>