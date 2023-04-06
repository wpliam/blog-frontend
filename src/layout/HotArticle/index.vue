<template>
  <el-card class="hot-card" shadow="hover" :body-style="{ padding: '10px'}">
    <div slot="header">
      <span class="card-title">
        <svg-icon icon-class="hot-red"/>
        <span class="ml05">热门文章</span>
      </span>
    </div>
    <ul class="hot-list">
      <li v-for="(article,index) in articles" :key="index" class="flex hot-item">
        <Picture :background-img="article.cover" :width="93" :height="65"></Picture>
        <div class="hot-content">
          <a class="h-title text-ellipsis-2" @click.prevent="readArticle(article)">
            {{ article.title }}
          </a>
          <div class="h-other flex-between-center">
            <div class="h-time">
              <svg-icon icon-class="date"/>
              {{ article.createTime|computeDate }}
            </div>
            <div class="h-view">
              <svg-icon icon-class="view"/>
              {{ article.viewCount }}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </el-card>
</template>

<script>
import Picture from "@/components/Picture";
import {getHotArticle} from "@/api/article";

export default {
  name: "HotArticle",
  components: {Picture},
  data() {
    return {
      articles: []
    }
  },
  created() {
    this.getHotArticle()
  },
  methods: {
    async getHotArticle() {
      const res = await getHotArticle()
      if (res.code === 0) {
        this.articles = res.data.articles
      }
    }
  }
}
</script>

<style lang="less" scoped>
.hot-card {
  .hot-list {
    .hot-item {
      margin-bottom: 10px;

      .hot-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        margin-left: 10px;

        .h-title {
          color: var(--main-color);
          font-size: 16px;
        }

        .h-title:hover {
          color: var(--wp--preset--color--title-hover);
        }

        .h-other {
          margin-top: auto;
          font-size: 12px;
          color: #909399;
        }
      }
    }

    .hot-item:last-child {
      margin-bottom: 0;
    }
  }
}

/deep/ .el-card__header {
  padding: 12px 15px;
}
</style>