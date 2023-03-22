<template>
  <div class="article-card flex">
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
            <li class="date">{{ article.createTime }}</li>
            <li class="m-item view">{{ article.viewCount }} 阅读</li>
            <li class="m-item collect">{{ article.collectCount }} 收藏</li>
            <li class="m-item like">{{ article.likeCount }} 点赞</li>
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
  overflow: hidden;

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
        .m-item:before {
          content: "/";
          color: #c0c4cc;
          padding: 0 5px;
        }
      }
    }
  }
}

/* 宽度小于 700px 的屏幕使用该样式*/
@media screen and (max-width: 700px) {
  .article-card {
    .article-info {
      .a-meta {
        .like {
          display: none;
        }
      }
    }
  }
}

/* 宽度小于 650px 的屏幕使用该样式*/
@media screen and (max-width: 650px) {
  .article-card {
    .article-info {
      .a-meta {
        .collect {
          display: none;
        }
      }
    }
  }
}

/* 宽度小于 650px 的屏幕使用该样式*/
@media screen and (max-width: 600px) {
  .article-card {
    .article-info {
      .a-meta {
        .view {
          display: none;
        }
      }
    }
  }
}

/* 宽度小于 650px 的屏幕使用该样式*/
@media screen and (max-width: 500px) {
  .article-card {
    .article-info {
      .a-last {
        display: none;
      }
    }
  }
}
</style>