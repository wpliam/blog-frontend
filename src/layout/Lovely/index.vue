<template>
  <el-card class="lovely-card" shadow="hover" :body-style="{ padding: '10px'}">
    <div slot="header">
      <span class="card-title">
        <svg-icon icon-class="lovely"/>
        <span class="ml05">猜你喜欢</span>
      </span>
    </div>
    <ul class="lovely-list">
      <li v-for="(article,index) in articles" :key="index" class="flex lovely-item">
        <Picture :background-img="article.backgroundImg" :width="93" :height="65"></Picture>
        <div class="lovely-content">
          <a class="l-title text-ellipsis-2">
            {{ article.title }}
          </a>
          <div class="l-other flex-between-center">
            <div class="l-user flex center">
              <el-avatar :src="article.user.avatar" :size="15"></el-avatar>
              <a class="nickname">{{ article.user.nickname }}</a>
            </div>
            <div class="l-view">
              {{ article.viewCount }}人已阅读
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
  name: "Lovely",
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
          },
          user: {
            avatar: "/image/avatar.jpg",
            nickname: "苹果",
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
          },
          user: {
            avatar: "/image/avatar.jpg",
            nickname: "苹果",
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
          },
          user: {
            avatar: "/image/avatar.jpg",
            nickname: "苹果",
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
          },
          user: {
            avatar: "/image/avatar.jpg",
            nickname: "苹果",
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
          },
          user: {
            avatar: "/image/avatar.jpg",
            nickname: "苹果",
          }
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.lovely-card {
  .lovely-list {
    .lovely-item {
      margin-bottom: 10px;

      .lovely-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        margin-left: 10px;

        .l-title {
          color: var(--main-color);
          font-size: 16px;
        }

        .l-title:hover {
          color: var(--wp--preset--color--title-hover);
        }

        .l-other {
          margin-top: auto;
          font-size: 12px;
          color: #909399;
        }
      }
    }

    .lovely-item:last-child {
      margin-bottom: 0;
    }
  }
}

/deep/ .el-card__header {
  padding: 12px 15px;
}
</style>