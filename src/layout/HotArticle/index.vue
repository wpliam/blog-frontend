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
        <Picture :background-img="article.backgroundImg" :width="93" :height="65"></Picture>
        <div class="hot-content">
          <a class="h-title text-ellipsis-2">
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

export default {
  name: "HotArticle",
  components: {Picture},
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
          }
        },
        {
          backgroundImg: "/image/20221122113935.jpg",
          title: "测试文章标题2",
          abstract: "测试文章描述2",
          createTime: "2023-01-01 12:23:34",
          viewCount: 10,
          collectCount: 20,
          likeCount: 30,
          category: {
            categoryName: "java"
          }
        },
        {
          backgroundImg: "/image/20221122114159.jpg",
          title: "测试文章标题2",
          abstract: "测试文章描述2",
          createTime: "2023-01-01 12:23:34",
          viewCount: 10,
          collectCount: 20,
          likeCount: 30,
          category: {
            categoryName: "java"
          }
        },
        {
          backgroundImg: "/image/20221122114139.jpg",
          title: "测试文章标题2",
          abstract: "测试文章描述2",
          createTime: "2023-01-01 12:23:34",
          viewCount: 10,
          collectCount: 20,
          likeCount: 30,
          category: {
            categoryName: "java"
          }
        },
        {
          backgroundImg: "/image/20221122113924.jpg",
          title: "测试文章标题2",
          abstract: "测试文章描述2",
          createTime: "2023-01-01 12:23:34",
          viewCount: 10,
          collectCount: 20,
          likeCount: 30,
          category: {
            categoryName: "java"
          }
        }
      ]
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
/deep/ .el-card__header{
  padding: 12px 15px;
}
</style>