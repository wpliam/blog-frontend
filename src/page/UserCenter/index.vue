<template>
  <el-container>
    <el-header style="padding: 0">
      <Nav></Nav>
    </el-header>
    <el-main class="base-line-layout" style="padding: 20px 0">
      <div class="user-header base-card">
        <div class="user-cover">
          <img :src="userBaseInfo.cover" alt="" class="user-bg">
          <div v-if="role===1" class="bg-count flex center">
            <el-tooltip effect="dark" :content="`人气值${userCountInfo.hotCount}`" placement="top">
              <span>
                <svg-icon icon-class="hot"/>
                <span class="count">{{ userCountInfo.hotCount }}</span>
              </span>
            </el-tooltip>
            <el-tooltip effect="dark" :content="`获得${userCountInfo.likeCount}个点赞`" placement="top"
                        style="margin: 0 10px">
              <span class="count">
                <svg-icon icon-class="like"/>
                <span class="count">{{ userCountInfo.likeCount }}</span>
              </span>
            </el-tooltip>
            <el-tooltip effect="dark" :content="`共${userCountInfo.fansCount}个粉丝`" placement="top">
              <span class="count">
                <svg-icon icon-class="fans"/>
                <span class="count">{{ userCountInfo.fansCount }}</span>
              </span>
            </el-tooltip>
          </div>
        </div>
        <div class="header-content base-layout">
          <div class="h-left">
            <el-avatar shape="square" :size="100" :src="userBaseInfo.avatar" style="margin-top: -60px"></el-avatar>
            <div class="user-info">
              <a class="nickname" @click.prevent="userCenter(1,userBaseInfo.id)">{{ userBaseInfo.nickname }}</a>
              <p class="user-desc mt05">
                <span v-if="userBaseInfo.desc">{{ userBaseInfo.desc }}</span>
                <span v-else>这个人很懒,什么都没有写</span>
              </p>
            </div>
          </div>
          <div class="h-right">
            <div v-if="role===0">
              <ClockIn ref="child" @click.native="$refs.child.clockIn()"></ClockIn>
            </div>
            <div v-if="role===1">
              <a v-if="youSelf(uid)" class="user-center-btn" @click.prevent="userCenter(0,uid)">
                <svg-icon icon-class="user"/>
                <span>用户中心</span>
              </a>
              <div v-else>
                <Follow class="mr05" :authorID="uid"></Follow>
                <Chat class="ml05"></Chat>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="user-content" v-if="role === 0">
        <div class="c-left">
          <el-card>
            <div class="user-count">
              <a class="flex-column-center">
                <div class="count">{{ userCountInfo.articleCount }}</div>
                <div class="name">文章</div>
              </a>
              <a class="flex-column-center">
                <div class="count">{{ userCountInfo.commentCount }}</div>
                <div class="name">评论</div>
              </a>
              <a class="flex-column-center">
                <div class="count">{{ userCountInfo.collectCount }}</div>
                <div class="name">收藏</div>
              </a>
              <a class="flex-column-center">
                <div class="count">{{ userCountInfo.fansCount }}</div>
                <div class="name">粉丝</div>
              </a>
            </div>
          </el-card>
        </div>
        <div class="c-right">
          <el-tabs type="border-card">
            <el-tab-pane label="个人资料">
              <div class="personal-box">
                <div class="flex-between-center personal-title">
                  <span>基本资料</span>
                  <div>
                    <el-button @click.prevent="edit" v-if="disabled" type="text">编辑</el-button>
                    <el-button @click.prevent="save" v-else type="text">保存</el-button>
                  </div>
                </div>
                <el-form ref="userForm" :model="userBaseInfo" label-position="left" label-width="80px"
                         :disabled="disabled">
                  <el-form-item label="用户昵称" prop="nickname">
                    <el-input v-model="userBaseInfo.nickname"></el-input>
                  </el-form-item>
                  <el-form-item label="用户id" prop="username">
                    <el-input v-model="userBaseInfo.username" :readonly="true"></el-input>
                  </el-form-item>
                  <el-form-item label="性别">
                    <el-radio v-model="userBaseInfo.sex" :label="0">男</el-radio>
                    <el-radio v-model="userBaseInfo.sex" :label="1">女</el-radio>
                  </el-form-item>
                  <el-form-item label="个人简介" prop="desc">
                    <el-input v-model="userBaseInfo.desc"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="author-content base-card" v-if="role === 1">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for="(tab,index) in option" :label="tab.label" :name="tab.name" :key="index">
            <div v-if="activeName==='article' || activeName==='collect'">
              <div v-if="!arrEmpty(articles)">
                <ul class="article-content">
                  <li v-for="(article,index) in articles" :key="index">
                    <img :src="article.cover" class="c-img" alt="">
                    <a class="text-ellipsis-2 c-title">{{ article.title }}</a>
                    <div class="flex-between-center mt10 c-option">
                      <div class="c-date">
                        {{ article.createTime|computeDate }}
                      </div>
                      <a>
                        <svg-icon icon-class="category"/>
                        {{ article.categoryName }}
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <el-pagination
                v-if="activeName==='article'"
                class="page"
                background
                hide-on-single-page
                layout="prev, pager, next"
                @current-change="handleCurrChange"
                :current-page="page.offset"
                :page-size="page.limit"
                :total="page.total">
            </el-pagination>
            <el-empty v-if="emptyText" :description="emptyText"></el-empty>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-main>
    <FootWaveLine></FootWaveLine>
  </el-container>
</template>

<script>
import Nav from "@/layout/Nav";
import FootWaveLine from "@/layout/Footer/FootWaveLine";
import Picture from "@/components/Picture";
import ClockIn from "@/components/Click/ClockIn";
import Follow from "@/components/Click/Follow";
import Chat from "@/components/Click/Chat";
import {getUserCollectList, getUserInfo, staticUserInfo} from "@/api/user";
import {searchArticleList} from "@/api/article";

export default {
  name: "UserCenter",
  components: {Chat, Follow, ClockIn, Picture, FootWaveLine, Nav},
  computed: {
    emptyText() {
      if (this.arrEmpty(this.articles) && this.activeName === 'article') {
        return "暂无文章内容"
      }
      if (this.arrEmpty(this.articles) && this.activeName === "collect") {
        return "暂无收藏内容"
      }
      if (this.arrEmpty(this.comments) && this.activeName === 'comment') {
        return '暂无评论内容'
      }
      if (this.arrEmpty(this.fans) && this.activeName === 'fans') {
        return "暂无粉丝"
      }
      return ""
    }
  },
  data() {
    return {
      role: parseInt(this.$route.query.role.toString()),
      uid: parseInt(this.$route.query.uid.toString()),
      activeName: "article",
      articles: [], // 文章
      comments: [], // 评论
      fans: [], // 粉丝
      searchArticleReq: {
        keyword: "",
        cid: 0,
        uid: 0,
        tagID: 0,
        order: 0,
        searchType: 0,
        page: {
          offset: 1,
          limit: 12,
          total: 0
        },
      },
      page: {
        offset: 1,
        limit: 12,
        total: 0,
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
      disabled: true, // 编辑,保存开关
      userBaseInfo: {}, // 用户基本信息
      userCountInfo: {} // 用户计数信息
    }
  },
  created() {
    this.getUserInfo(this.uid)
    this.staticUserInfo(this.uid)
    // 查询的是作者信息,初始化时需要获取一下作者的文章信息
    if (this.role === 1) {
      this.searchArticleReq.uid = this.uid
      this.searchArticleList(this.searchArticleReq)
    }
  },
  methods: {
    async getUserInfo(uid) {
      const res = await getUserInfo(uid);
      if (res) {
        this.userBaseInfo = res.user
        this.$store.commit("setFollow", res.isFollow)
        if (this.userBaseInfo.desc === "") {
          this.userBaseInfo.desc = "这个人很懒,什么都没有写"
        }
        this.userBaseInfo.cover = "/image/banner1.jpg"
      }
    },
    async staticUserInfo(uid) {
      const res = await staticUserInfo(uid);
      if (res) {
        this.userCountInfo = res
      }
    },
    // 搜索文章
    async searchArticleList(req) {
      const res = await searchArticleList(req);
      if (res && res.articles) {
        this.articles = res.articles
        this.page = res.page
      } else {
        this.articles = []
      }
    },
    handleCurrChange(offset) {
      let req = this.searchArticleReq
      req.page.offset = offset
      this.searchArticleList(req);
    },
    handleClick(tab, event) {
      if (tab.name === "article") {
        this.searchArticleReq.uid = this.uid
        this.searchArticleReq.page = {offset: 1, limit: 10}
        this.searchArticleList(this.searchArticleReq)
      } else if (tab.name === "collect") {
        getUserCollectList(this.uid).then(res => {
          if (res && res.articles) {
            this.articles = res.articles
          } else {
            this.articles = []
          }
        })
      }
    },
    // 个人资料编辑按钮
    edit() {
      this.disabled = false
    },
    // 个人资料保存按钮
    save() {
      this.disabled = true
    }
  }
}
</script>

<style lang="less" scoped>
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

    .border-card {
      .personal-box {
        .personal-title {
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #ebeef5;
          margin-bottom: 20px;
          font-size: 14px;
          color: #999999;
        }
      }
    }
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