<template>
  <div class="article-container">
    <div class="article-option flex center">
      <div class="a-sort">排序</div>
      <ul class="flex center">
        <li class="opt-item" @click.prevent="handleTabChange(2)">更新</li>
        <li class="opt-item icon-spot" @click.prevent="handleTabChange(1)">发布</li>
      </ul>
    </div>
    <ArticleCard v-for="(article,index) in articles" :key="index" :article="article" class="base-card p15 mt10"/>
    <el-pagination
        class="page"
        background
        hide-on-single-page
        layout="prev, pager, next"
        @current-change="handleCurrChange"
        :page-size="page.limit"
        :current-page="page.offset"
        :total="page.total">
    </el-pagination>
  </div>
</template>

<script>
import ArticleCard from "@/components/ArticleCard";
import {searchArticleList} from "@/api/article";

export default {
  name: "ArticleList",
  components: {ArticleCard},
  data() {
    return {
      searchArticleParam: {
        keyword: "",
        cid: 0,
        tagID: 0,
        order: 0,
        searchType: 0,
        page: {
          offset: 1,
          limit: 10,
          total: 0
        },
      },
      page: {
        offset: 1,
        limit: 10,
        total: 0
      },
      articles: []
    }
  },
  created() {
    this.searchArticle(this.searchArticleParam)
  },
  methods: {
    async searchArticle(searchArticleParam) {
      const res = await searchArticleList(searchArticleParam);
      if (res.code === 0) {
        this.articles = res.data.articles
        this.page = res.data.page
      }
    },
    handleCurrChange(offset) {
      let req = this.searchArticleParam
      req.page.offset = offset
      this.searchArticle(req);
    },
    // 选项切换触发 1:发布 2:更新
    handleTabChange(order) {
      let req = this.searchArticleParam
      req.order = order
      req.page = {offset: 1, limit: 10}
      this.searchArticle(req)
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
}
</style>