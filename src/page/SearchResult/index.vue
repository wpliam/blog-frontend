<template>
  <el-container>
    <el-header style="padding: 0">
      <Nav></Nav>
    </el-header>
    <el-main class="base-line-layout" style="padding: 20px 0">
      <div class="base-card search-frame">
        <div class="flex">
          <Search style="width: 600px;overflow: hidden" :value="keyword">
          </Search>
        </div>
      </div>
      <div class="search-result base-card">
        <ul class="flex search-tab">
          <li v-for="(tab,index) in searchTab" :key="index" class="each-tab" @click.prevent="changeTab(index)"
              :class="activeIndex===index?'active-tab':''">
            {{ tab }}
          </li>
        </ul>
        <div class="search-count">
          搜索
          <span class="highlight">{{ keyword }}</span>
          共找到
          <span class="highlight">{{ page.total }}</span>
          篇文章
        </div>
        <div class="search-article-list" v-if="!arrEmpty(articles)">
          <ArticleCard v-for="(article,index) in articles" :key="index" :article="article" :keyword="[keyword]"
                       class="mt10">
          </ArticleCard>
        </div>
        <el-empty description="未找到相关文章" v-else></el-empty>
      </div>
      <el-pagination
          class="page"
          background
          hide-on-single-page
          layout="prev, pager, next"
          @current-change="handleCurrChange"
          :current-page="page.offset"
          :page-size="page.limit"
          :total="page.total">
      </el-pagination>
    </el-main>
    <FootWaveLine></FootWaveLine>
  </el-container>
</template>

<script>
import Nav from "@/layout/Nav";
import FootWaveLine from "@/layout/Footer/FootWaveLine";
import Search from "@/components/Search";
import ArticleCard from "@/components/ArticleCard";
import {searchArticleList} from "@/api/article";

export default {
  name: "SearchResult",
  components: {ArticleCard, Search, FootWaveLine, Nav},
  data() {
    return {
      keyword: "",
      searchTab: ["文章"],
      activeIndex: 0,
      searchArticleReq: {
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
      count: 10,
      articles: []
    }
  },
  created() {
    let keyword = this.$route.query.keyword
    this.keyword = keyword
    this.searchArticleReq.keyword = keyword
    this.searchArticleList(this.searchArticleReq)
  },
  methods: {
    changeTab(index) {
      this.activeIndex = index
    },
    handleCurrChange(offset) {
      let req = this.searchArticleReq
      req.page.offset = offset
      this.searchArticleList(req);
    },
    async searchArticleList(req) {
      const res = await searchArticleList(req);
      if (res) {
        this.articles = res.articles
        this.page = res.page
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-frame {
  display: flex;
  justify-content: center;
  padding: 15px 0;
  overflow: hidden;
}

.search-result {
  margin-top: 20px;
  padding: 15px;

  .search-tab {
    color: #999;
    border-bottom: 1px solid #ebeef5;
    padding-bottom: 15px;

    .each-tab {
      margin-right: 10px;
      cursor: pointer;
    }
  }

  .search-count {
    margin-top: 10px;
    color: #888;
    font-size: 14px;
  }

  .search-article-list {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 10px 30px;
    margin-top: 10px;
  }
}

/* 宽度小于 960px 的屏幕使用该样式*/
@media screen and (max-width: 980px) {
  .search-result {
    .search-article-list {
      grid-template-columns: auto;
    }
  }
}
</style>