<template>
  <div class="article-container">
    <div class="article-option flex center">
      <div class="a-sort">排序</div>
      <ul class="flex center">
        <li class="opt-item">更新</li>
        <li class="opt-item icon-spot">发布</li>
<!--        <li class="opt-item icon-spot">点赞</li>-->
      </ul>
    </div>
    <ArticleCard v-for="(article,index) in articles" :key="index" :article="article" class="base-card p15 mt10">
    </ArticleCard>
    <div class="article-page">
      <el-pagination
          layout="prev, pager, next"
          :total="20">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import ArticleCard from "@/components/ArticleCard";

export default {
  name: "ArticleDetail",
  components: {ArticleCard},
  data() {
    return {
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
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.article-container {
  .article-option {
    .a-sort {
      position: relative;
      font-size: 14px;
      font-weight: bold;
      color: var(--main-color);
      margin-right: 10px;
      padding-right: 10px;
    }

    .a-sort:after {
      position: absolute;
      content: "";
      width: 1px;
      height: 1em;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      background: var(--main-color);
    }

    .opt-item {
      color: #999;
      font-size: 14px;
      cursor: pointer;
      font-weight: bold;
    }

    .opt-item:hover {
      color: var(--wp--preset--color--title-hover);
    }

    .icon-spot:before {
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

  .article-page {
    margin-top: 15px;
    text-align: center;
  }
}
</style>