<template>
  <div class="class-result-container">
    <Nav></Nav>
    <div class="base-line-layout">
      <div class="class-header base-card">
        <div class="content-title">
          <svg-icon v-if="contentType===0" icon-class="category"/>
          <svg-icon v-if="contentType===1" icon-class="tag"/>
          <span class="content-name">教程分享</span>
          <span class="content-count">共23篇</span>
        </div>
      </div>
      <div class="class-result">
        <div class="result-list" v-if="articles.length > 0">
          <ArticleCard v-for="(article,index) in articles" :key="index" :article="article"
                       class="mt10 base-card result-item">
          </ArticleCard>
        </div>
        <el-empty v-if="articles.length === 0" description="暂无相关文章"></el-empty>
        <el-pagination
            class="page"
            background
            hide-on-single-page
            layout="prev, pager, next"
            :total="20">
        </el-pagination>
      </div>
    </div>
    <FootWaveLine></FootWaveLine>
  </div>
</template>

<script>

import Nav from "@/layout/Nav";
import FootWaveLine from "@/layout/Footer/FootWaveLine";
import ArticleCard from "@/components/ArticleCard";

export default {
  name: "ClassResult",
  components: {ArticleCard, FootWaveLine, Nav},
  data() {
    return {
      id: parseInt(this.$route.query.id.toString()),
      contentType: parseInt(this.$route.query.contentType.toString()),
      articles: [
        {
          id: 1,
          backgroundImg: "/image/20221122113917.jpg",
          title: "测试文章标题",
          abstract: "测试文章描述",
          createTime: "2023-01-01 12:23:34",
          viewCount: 1,
          collectCount: 2,
          likeCount: 3,
          category: {
            id: 1,
            categoryName: "java"
          },
          user: {
            nickname: "apple",
            avatar: "/image/avatar.jpg"
          }
        },
        {
          id: 2,
          backgroundImg: "/image/20221122113917.jpg",
          title: "测试文章标题2",
          abstract: "测试文章描述2",
          createTime: "2023-01-01 12:23:34",
          viewCount: 10,
          collectCount: 20,
          likeCount: 30,
          category: {
            id: 2,
            categoryName: "java"
          },
          user: {
            nickname: "apple",
            avatar: "/image/avatar.jpg"
          }
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.class-result-container {
  min-height: 100vh;

  .class-header {
    padding: 25px 10px;
    font-size: 18px;
    font-weight: bold;

    .content-title {
      display: flex;
      align-items: center;
      position: relative;
      padding-bottom: 10px;
    }

    .content-title:after {
      position: absolute;
      content: '';
      width: 60px;
      height: 3px;
      top: auto;
      left: 0;
      bottom: -1px;
      transition: .4s ease all;
      border-radius: 2px;
      background: rgba(18, 144, 219, .9);
    }

    .content-title:hover:after {
      width: 100px;
      transition: .4s ease all;
    }

    .content-name {
      margin-left: 5px;
    }

    .content-count:before {
      content: "";
      width: 4px;
      height: 4px;
      margin: 0 0.5em;
      border-radius: 50%;
      display: inline-block;
      background: var(--main-color);
      opacity: .3;
      vertical-align: 0.2em;
    }
  }

  .class-result {
    .result-list {
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 10px 20px;
      margin-top: 10px;

      .result-item {
        padding: 20px;
      }
    }
  }
}

/* 宽度小于 960px 的屏幕使用该样式*/
@media screen and (max-width: 980px) {
  .class-result-container {
    .class-result {
      .result-list {
        grid-template-columns: auto;
      }
    }
  }
}
</style>