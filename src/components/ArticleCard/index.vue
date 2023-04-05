<template>
  <div class="article-card flex">
    <Picture :background-img="article.cover"></Picture>
    <div class="article-info">
      <div>
        <a class="a-title text-ellipsis" @click.prevent="readArticle(article)" v-html="article.title">
          <!--          <text-highlight :queries="keyword">{{ article.title }}</text-highlight>-->
        </a>
      </div>
      <div class="a-abstract text-ellipsis-2" v-html="article.abstract">
        <!--        <text-highlight :queries="keyword">{{ article.abstract }}</text-highlight>-->
      </div>
      <div class="a-other flex-between-center">
        <div class="a-meta flex center">
          <a class="a-user flex center" @click.prevent="userCenter(1,article.uid)">
            <el-avatar :src="article.avatar" :size="20"></el-avatar>
            <span class="nickname ml05">{{ article.nickname }}</span>
          </a>
          <div class="a-date">
            {{ article.createTime|computeDate }}
          </div>
        </div>
        <a @click.prevent="goClassResult(article.cid,article.categoryName,0)">
          <svg-icon icon-class="category"/>
          {{ article.categoryName }}
        </a>
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
          cover: "",
          title: "",
          abstract: "",
          createTime: "",
          category: {
            id: 0,
            categoryName: ""
          },
          user: {
            id: 0,
            nickname: "",
            avatar: ""
          }
        }
      }
    }
  },
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
        .a-user {

        }

        .a-date {
          display: flex;
          align-items: center;
          margin-left: 10px;
        }

        .a-date:before {
          content: "";
          width: 0.5em;
          height: 0.5em;
          border: 0.1em solid var(--wp--preset--color--vivid-purple);
          border-radius: 1em;
          margin: 0 0.5em;
          vertical-align: 0.1em;
          display: inline-block;
        }
      }
    }
  }
}

/deep/ .text__highlight {
  color: var(--wp--preset--color--brand) !important;
  background: none !important;
}

/* 宽度小于 700px 的屏幕使用该样式*/
@media screen and (max-width: 700px) {
  .article-card {
    .article-info {
      .a-meta {
        .a-date {
          display: none;
        }
      }
    }
  }
}

</style>