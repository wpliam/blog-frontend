<template>
  <div class="article-card base-card flex">
    <Picture :background-img="article.backgroundImg"></Picture>
    <div class="article-info">
      <div>
        <a class="a-title text-ellipsis" @click.prevent="readArticle(article)">{{ article.title }}</a>
      </div>
      <div class="a-abstract text-ellipsis-2">
        {{ article.abstract }}
      </div>
      <div class="a-other flex-between-center">
        <div class="a-meta">
          <ul class="flex">
            <li>{{ article.createTime }}</li>
            <li class="m-item">{{ article.viewCount }} 阅读</li>
            <li class="m-item">{{ article.collectCount }} 收藏</li>
            <li class="m-item">{{ article.likeCount }} 点赞</li>
          </ul>
        </div>
        <div class="a-last">
          <a class="category-name">
            <svg-icon icon-class="category"/>
            {{ article.category.categoryName }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Picture from "@/components/Picture";

export default {
  name: "ArticleCard",
  components: {Picture},
  props: {
    article: {
      type: Object,
      default() {
        return {
          backgroundImg: "",
          title: "",
          abstract: "",
          createTime: "",
          viewCount: 0,
          collectCount: 0,
          likeCount: 0,
          category: {
            categoryName: ""
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-card {
  margin-top: 10px;
  padding: 15px;

  .article-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    margin-left: 10px;

    .a-title {
      font-size: 20px;
      font-weight: bold;
      color: var(--main-color);
    }

    .a-title:hover {
      color: var(--wp--preset--color--title-hover);
    }

    .a-abstract {
      margin-top: 10px;
      color: #909399;
      opacity: .85;
    }

    .a-other {
      margin-top: auto;
      color: #909399;
      font-size: 13px;

      .a-meta {
        .m-item {

        }

        .m-item:before {
          content: "/";
          color: #c0c4cc;
          padding: 0 5px;
        }
      }
    }
  }
}
</style>