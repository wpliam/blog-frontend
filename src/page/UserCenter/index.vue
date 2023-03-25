<template>
  <div class="user-center-container">
    <Nav></Nav>
    <div class="base-line-layout">
      <div class="user-header base-card">
        <div class="user-cover">
          <img :src="user.cover" alt="" class="user-bg">
          <div v-if="role==='1'" class="bg-count flex center">
            <el-tooltip effect="dark" :content="`人气值${10}`" placement="top">
              <span>
                <svg-icon icon-class="hot"/>
                <span class="count">10</span>
              </span>
            </el-tooltip>
            <el-tooltip effect="dark" :content="`获得${10}个点赞`" placement="top" style="margin: 0 10px">
              <span class="count">
                <svg-icon icon-class="like"/>
                <span class="count">10</span>
              </span>
            </el-tooltip>
            <el-tooltip effect="dark" :content="`共${10}个粉丝`" placement="top">
              <span class="count">
                <svg-icon icon-class="fans"/>
                <span class="count">10</span>
              </span>
            </el-tooltip>
          </div>
        </div>
        <div class="header-content base-layout">
          <div class="h-left">
            <el-avatar shape="square" :size="100" :src="user.avatar" style="margin-top: -60px"></el-avatar>
            <div class="user-info">
              <a class="nickname">{{ user.nickname }}</a>
              <p class="user-desc mt05">{{ user.desc }}</p>
            </div>
          </div>
          <div class="h-right">
            <div v-if="role==='0'">
              <ClockIn ref="child" @click.native="$refs.child.clockIn()"></ClockIn>
            </div>
            <div v-if="role==='1'">
              <a v-if="youSelf" class="user-center-btn" @click.prevent="userCenter(0)">
                <svg-icon icon-class="user"/>
                <span>用户中心</span>
              </a>
              <div v-else>
                <Follow class="mr05"></Follow>
                <Chat class="ml05"></Chat>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="user-content" v-if="role === '0'">
        <div class="c-left">
          <el-card>
            <div class="user-count">
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
          </el-card>
        </div>
        <div class="c-right">
          <el-tabs type="border-card">
            <el-tab-pane label="个人资料">
              <Personal></Personal>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="author-content base-card" v-if="role === '1'">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for="(tab,index) in option" :label="tab.label" :name="tab.name" :key="index">
            <div v-if="activeName==='article' || activeName==='collect'">
              <div v-if="articles.length > 0">
                <ul class="article-content">
                  <li v-for="(article,index) in articles" :key="index">
                    <img :src="article.backgroundImg" class="c-img" alt="">
                    <a class="text-ellipsis-2 c-title">{{ article.title }}</a>
                    <div class="flex-between-center mt10 c-option">
                      <div class="c-date">
                        {{ article.createTime|computeDate }}
                      </div>
                      <a>
                        <svg-icon icon-class="category"/>
                        {{ article.category.categoryName }}
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <el-pagination
                class="page"
                background
                hide-on-single-page
                layout="prev, pager, next"
                :total="page.total">
            </el-pagination>
            <el-empty v-if="emptyText" :description="emptyText"></el-empty>
          </el-tab-pane>
        </el-tabs>
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
import Follow from "@/components/Click/Follow";
import Chat from "@/components/Click/Chat";
import {localUserInfo} from "@/util/storage";
import Personal from "@/layout/UserCard/Personal";

export default {
  name: "UserCenter",
  components: {Personal, Chat, Follow, ClockIn, Picture, FootWaveLine, Nav},
  computed: {
    emptyText() {
      if (this.articles.length === 0 && (this.activeName === 'article' || this.activeName === 'collect')) {
        return "暂无文章内容"
      }
      if (this.comments.length === 0 && this.activeName === 'comment') {
        return '暂无评论内容'
      }
      if (this.fans.length === 0 && this.activeName === 'fans') {
        return "暂无粉丝"
      }
      return ""
    },
    youSelf() {
      let userInfo = localUserInfo();
      if (userInfo && userInfo.user) {
        return userInfo.user.id === parseInt(this.uid)
      }
      return false
    }
  },
  data() {
    return {
      role: this.$route.query.role,
      uid: this.$route.query.uid,
      activeName: "article",
      articles: [
        {
          backgroundImg: "/image/20221122113917.jpg",
          title: "测试文章标题",
          abstract: "测试文章描述",
          createTime: "2023-01-01 12:23:34",
          viewCount: 1,
          collectCount: 2,
          likeCount: 3,
          category: {
            categoryName: "java"
          },
          user: {
            nickname: "apple",
            avatar: "/image/avatar.jpg"
          }
        },
        {
          backgroundImg: "/image/20221122113917.jpg",
          title: "测试文章标题2",
          abstract: "测试文章描述2",
          createTime: "2023-01-01 12:23:34",
          viewCount: 10,
          collectCount: 20,
          likeCount: 30,
          category: {
            categoryName: "java"
          },
          user: {
            nickname: "apple",
            avatar: "/image/avatar.jpg"
          }
        },
        {
          backgroundImg: "/image/20221122114204.jpg",
          title: "测试文章标题2",
          abstract: "测试文章描述2",
          createTime: "2023-01-01 12:23:34",
          viewCount: 10,
          collectCount: 20,
          likeCount: 30,
          category: {
            categoryName: "java"
          },
          user: {
            nickname: "apple",
            avatar: "/image/avatar.jpg"
          }
        },
        {
          backgroundImg: "/image/20221122114232.jpg",
          title: "测试文章标题2",
          abstract: "测试文章描述2",
          createTime: "2023-01-01 12:23:34",
          viewCount: 10,
          collectCount: 20,
          likeCount: 30,
          category: {
            categoryName: "java"
          },
          user: {
            nickname: "apple",
            avatar: "/image/avatar.jpg"
          }
        },
        {
          backgroundImg: "/image/20221122114232.jpg",
          title: "测试文章标题2",
          abstract: "测试文章描述2",
          createTime: "2023-01-01 12:23:34",
          viewCount: 10,
          collectCount: 20,
          likeCount: 30,
          category: {
            categoryName: "java"
          },
          user: {
            nickname: "apple",
            avatar: "/image/avatar.jpg"
          }
        }
      ], // 文章
      comments: [], // 评论
      fans: [], // 粉丝
      page: {
        offset: 1,
        limit: 10,
        total: 20
      },
      option: [
        {
          label: "文章",
          name: "article",
        },
        {
          label: "收藏",
          name: "collect",
        },
        {
          label: "评论",
          name: "comment",
        },
        {
          label: "粉丝",
          name: "fans",
        }
      ],
      user: {
        cover: "/image/banner1.jpg",
        avatar: "/image/avatar.jpg",
        nickname: "apple",
        desc: "我不想介绍自己"
      },
    }
  },
  methods: {
    handleClick(tab, event) {

    }
  }
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
      position: relative;

      .user-bg {
        width: 100%;
        height: 100%;
        object-fit: cover;
        overflow: hidden;
      }

      .bg-count {
        position: absolute;
        top: 1em;
        right: 0;
        border-radius: 50px 0 0 50px;
        text-shadow: none;
        box-shadow: 0 1px 5px rgba(0, 0, 0, .2);
        z-index: 1;
        padding: 3px 8px;
        color: white;
        background-color: black;
        opacity: .8;

        .count {
          margin-left: 2px;
          opacity: 1;
        }
      }
    }

    .header-content {
      margin-top: 10px;
      position: relative;

      .h-left {
        display: flex;

        .user-info {
          margin-left: 10px;
        }
      }

      .h-right {
        display: flex;
        align-items: center;

        .user-center-btn {
          display: inline-block;
          border-radius: var(--main-border-radius);
          font-size: 14px;
          font-weight: bold;
          padding: 2px 10px;
          color: #2997f7;
          background: rgba(41, 151, 247, .1);
        }
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
        align-items: center;
        justify-content: space-around;

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
    padding: 10px 15px;

    .article-content {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      grid-column-gap: 20px;
      grid-row-gap: 20px;

      .c-img {
        width: 100%;
        height: 180px;
        object-fit: cover;
        overflow: hidden;
        border-radius: var(--main-border-radius);
      }

      .c-title {
        font-size: 16px;
        font-weight: bold;
        color: var(--main-color);
      }

      .c-title:hover {
        color: var(--wp--preset--color--title-hover);
      }

      .c-option {
        font-size: 14px;
        color: #999;

        .c-date {

        }

        .c-date:before {
          content: "";
          width: 0.5em;
          height: 0.5em;
          border: 0.1em solid var(--wp--preset--color--vivid-purple);
          border-radius: 1em;
          vertical-align: 0.1em;
          display: inline-block;
        }

        .c-meta {

        }
      }
    }
  }
}

/deep/ .el-tabs__item {
  padding: 0 10px;
}

/deep/ .el-card__body {
  padding: 10px;
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