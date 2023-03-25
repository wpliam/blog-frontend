<template>
  <div class="search-result-container">
    <Nav></Nav>
    <div class="base-line-layout">
      <div class="base-card search-frame">
        <div class="flex">
          <Search style="width: 600px;overflow: hidden" @searchArticle="searchArticle" :value="keyword">
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
          <span class="highlight">{{ count }}</span>
          篇文章
        </div>
        <div class="search-article-list" v-if="articles.length > 0">
          <ArticleCard v-for="(article,index) in articles" :key="index" :article="article" :keyword="[keyword]"
                       class="mt10">
          </ArticleCard>
        </div>
        <el-empty description="未找到相关文章" v-if="articles.length===0"></el-empty>
      </div>
      <el-pagination
          class="page"
          background
          hide-on-single-page
          layout="prev, pager, next"
          :total="20">
      </el-pagination>
    </div>
    <FootWaveLine></FootWaveLine>
  </div>
</template>

<script>
import Nav from "@/layout/Nav";
import FootWaveLine from "@/layout/Footer/FootWaveLine";
import Search from "@/components/Search";
import ArticleCard from "@/components/ArticleCard";

export default {
  name: "SearchResult",
  components: {ArticleCard, Search, FootWaveLine, Nav},
  data() {
    return {
      keyword: "",
      searchTab: ["文章"],
      activeIndex: 0,
      count: 10,
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
        }
      ]
    }
  },
  created() {
    let keyword = this.$route.query.keyword
    if (keyword) {
      this.keyword = keyword
    }
  },
  methods: {
    changeTab(index) {
      this.activeIndex = index
    },
    searchArticle(item) {
      this.keyword = item.keyword
    }
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  .search-frame {
    margin-top: 20px;
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
      grid-gap: 10px 20px;
      margin-top: 10px;
    }
  }
}

/* 宽度小于 960px 的屏幕使用该样式*/
@media screen and (max-width: 980px) {
  .search-result-container {
    .search-result {
      .search-article-list {
        grid-template-columns: auto;
      }
    }
  }
}
</style>