<template>
  <div class="read-article-container">
    <Nav></Nav>
    <div class="base-content-layout">
      <div class="left-aside">
        <div class="article-detail base-card">
          <div class="r-title">
            {{ article.title }}
          </div>
          <div class="r-header">
            <div class="flex">
              <span class="mr05">
                <svg-icon icon-class="date"/>
                于 {{ article.createTime|timeLayout }} 发布
              </span>
              <span class="ml10">
                <svg-icon icon-class="view"/>
                <span> 阅读 {{ article.viewCount }}</span>
              </span>
              <a class="ml10 h-count">
                <svg-icon icon-class="comment"/>
                <span> 评论 {{ commentCount }}</span>
              </a>
              <a class="ml10 h-count" @click.prevent="giveCollect(articleID)">
                <div v-if="article.isCollect">
                  <svg-icon icon-class="collect-red"/>
                  <span style="color: #d81e06"> 已收藏 {{ article.collectCount }}</span>
                </div>
                <div v-else>
                  <svg-icon icon-class="collect"/>
                  <span> 收藏 {{ article.collectCount }}</span>
                </div>
              </a>
            </div>
            <div class="flex mt05">
              <div class="r-category flex center">
                <span class="label">文章分类: </span>
                <a class="category-name">{{ article.categoryName }}</a>
              </div>
              <div class="r-tags flex center" v-if="tags">
                <span class="label">文章标签: </span>
                <a class="tag-item" v-for="(tag,index) in tags" :key="index">
                  <svg-icon icon-class="slidebar"/>
                  {{ tag.tagName }}
                </a>
              </div>
            </div>
          </div>
          <div class="r-content">
            <mavon-editor
                v-html="article.content"
                ref="md"
                :boxShadow="false"
                :toolbarsFlag="false"
                :subfield="false"
                :editable="false"
            >
            </mavon-editor>
          </div>
          <div class="r-actions">
            <div class="flex">
              <a class="post-like action" @click.prevent="giveThumb(articleID,0)">
                <div v-if="article.isLike" class="flex-column-center">
                  <svg-icon icon-class="like-red"/>
                  <span class="post-btn" style="color: #d81e06">已赞 {{ article.likeCount }}</span>
                </div>
                <div v-else class="flex-column-center">
                  <svg-icon icon-class="like" class-name="small-svg"/>
                  <span class="post-btn">点赞 {{ article.likeCount }}</span>
                </div>
              </a>
              <a class="post-collect action" @click.prevent="giveCollect(articleID)">
                <div v-if="article.isCollect" class="flex-column-center">
                  <svg-icon icon-class="collect-red" class-name="small-svg"/>
                  <span class="post-btn" style="color: #d81e06">已收藏 {{ article.collectCount }}</span>
                </div>
                <div v-else class="flex-column-center">
                  <svg-icon icon-class="collect" class-name="small-svg"/>
                  <span class="post-btn">收藏 {{ article.collectCount }}</span>
                </div>
              </a>
              <a class="post-share flex-column-center action">
                <svg-icon icon-class="share" class-name="small-svg"/>
                <span class="post-btn">分享</span>
              </a>
            </div>
          </div>
        </div>
        <div class="article-adjoin">
          <div class="base-card prev">
            <a @click.prevent="readArticle(prev)">
              <div class="label">
                <i class="el-icon-d-arrow-left"></i>
                上一篇
              </div>
              <div class="text-ellipsis-2 adjoin-title">
                <span v-if="prev">{{ prev.title }}</span>
                <span v-else>暂无更多文章</span>
              </div>
            </a>
          </div>
          <div class="base-card next">
            <a @click.prevent="readArticle(next)">
              <div class="label">
                <i class="el-icon-d-arrow-right"></i>
                下一篇
              </div>
              <div class="text-ellipsis-2 adjoin-title">
                <span v-if="next">{{ next.title }}</span>
                <span v-else>暂无更多文章</span>
              </div>
            </a>
          </div>
        </div>
        <Recommend class="mt20" v-if="recommend" :recommends="recommend">
          <p class="title-theme">推荐</p>
        </Recommend>
        <Comment class="mt20" :comments="comment">
          <p class="title-theme">评论</p>
        </Comment>
      </div>
      <div class="right-aside">
        <AuthorCard :uid="uid"></AuthorCard>
        <Lovely class="mt20"></Lovely>
      </div>
    </div>
    <FootWaveLine></FootWaveLine>
  </div>
</template>

<script>
import Nav from "@/layout/Nav";
import FootWaveLine from "@/layout/Footer/FootWaveLine";
import Comment from "@/layout/Comment";
import Recommend from "@/layout/Carousel/Recommend";
import AuthorCard from "@/layout/AuthorCard";
import Lovely from "@/layout/Lovely";
import {readArticle} from "@/api/article";
import {addViewCount, giveCollect, giveThumb} from "@/api/shared";

export default {
  name: "ReadArticle",
  components: {Lovely, AuthorCard, Recommend, Comment, FootWaveLine, Nav},
  data() {
    return {
      articleID: parseInt(this.$route.query.articleID.toString()),
      uid: parseInt(this.$route.query.uid.toString()),
      article: {},
      next: {},
      prev: {},
      tags: [],
      recommend: [],
      comment: [],
      commentCount: 0
    }
  },
  created() {
    this.getArticleInfo()
    addViewCount(this.articleID)
  },
  methods: {
    async getArticleInfo() {
      const res = await readArticle(this.articleID);
      if (res) {
        this.article = res.article
        this.next = res.next
        this.prev = res.prev
        this.tags = res.tags
        this.recommend = res.recommend
        this.comment = res.comment
      }
      if (this.comment) {
        this.commentCount = this.comment.length
        for (let item of this.comment) {
          if (item.subComment) {
            this.commentCount = this.commentCount + item.subComment.length
          }
        }
      }
    },
    async giveThumb(id, likeType) {
      const res = await giveThumb(id, likeType);
      if (res) {
        this.article.isLike = res.isLike
        this.article.likeCount = res.likeCount
      }
    },
    async giveCollect(id) {
      const res = await giveCollect(id);
      console.log("giveCollect res:", res)
      if (res) {
        this.article.isCollect = res.isCollect
        this.article.collectCount = res.collectCount
      }
    }
  }
}
</script>

<style lang="less" scoped>
.read-article-container {
  .article-detail {
    padding: 20px;

    .r-title {
      font-size: 22px;
      font-weight: 700;
      color: #4e5358;
    }

    .r-header {
      margin-top: 15px;
      padding: 5px;
      background: #f8f8f8;
      border-radius: var(--main-border-radius);
      color: #999aaa;
      font-size: 14px;
      overflow: hidden;

      .h-count {
        color: #999aaa;
        font-size: 14px;
      }

      .r-category {
        .category-name {
          margin-left: 3px;
          border-radius: var(--main-border-radius);
          font-size: 14px;
          color: #5094d5;
          padding: 1px 5px;
          background-color: #f2f6fc;
        }
      }

      .r-tags {
        margin-left: 10px;

        .tag-item {
          display: inline-block;
          cursor: pointer;
          flex-shrink: 0;
          position: relative;
          margin-right: 5px;
          font-size: 12px;
          background-color: #f2f6fc;
          color: #909399;
          border: 1px solid #f2f6fc;
          padding: 0 8px;
          height: 26px;
          line-height: 26px;
          border-radius: 13px;
          max-width: 125px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-transition: border .25s, color .25s;
          transition: border .25s, color .25s;
        }
      }
    }

    .r-content {
      margin-top: 20px;
    }

    .r-actions {
      display: flex;
      justify-content: center;
      margin-top: 30px;

      .action {
        cursor: pointer;
        opacity: .7;
      }

      .post-collect {
        margin: 0 30px;
      }

      .post-btn {
        margin-top: 3px;
      }
    }
  }

  .article-adjoin {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 10px 20px;
    margin-top: 20px;

    .prev {
      padding: 15px;
      text-align: left;
    }

    .next {
      padding: 15px;
      text-align: right;
    }

    .adjoin-title {
      color: #4e5358;
      font-weight: bold;
      margin-top: 5px;
      font-size: 14px;
    }

    .adjoin-title:hover {
      color: var(--wp--preset--color--title-hover);
    }
  }

  .label {
    color: #999;
    font-size: 14px;
  }
}

/deep/ .v-note-wrapper {
  border: 0;
}
</style>