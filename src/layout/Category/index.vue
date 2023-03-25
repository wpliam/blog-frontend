<template>
  <div class="category-container">
    <div class="base-card category-item" v-for="(item,index) in aggregations" :key="index">
      <div class="flex">
        <Picture :background-img="item.backgroundImg" :width="140" :height="98">
          <div class="c-badge">
            <svg-icon icon-class="hot"/>
            {{ item.viewCount }}
          </div>
        </Picture>
        <div class="category-content">
          <a class="category-name">{{ item.categoryName }}</a>
          <div class="category-meta flex-between-center">
            <span class="count">
              <i class="el-icon-document"></i>
              共{{ item.total }}篇文章
            </span>
            <a class="more">
              <i class="el-icon-arrow-right"></i>
              更多文章
            </a>
          </div>
        </div>
      </div>
      <ul class="mt20">
        <li class="c-article-item flex-between-center" v-for="(article,idx) in item.articles" :key="idx">
          <a class="c-article-title text-ellipsis">
            {{ article.title }}
          </a>
          <div class="c-article-date">
            <i class="el-icon-time"></i>
            {{ article.updateTime | computeDate }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Picture from "@/components/Picture";

export default {
  name: "Category",
  components: {Picture},
  data() {
    return {
      aggregations: [
        {
          categoryName: "测试分类名",
          total: 10,
          viewCount: 20,
          backgroundImg: "/image/20221122113917.jpg",
          articles: [
            {
              title: "测试文章1测试文章1测试文章1测试文章1测试文章1测试文章1测试文章1测试文章1测试文章1测试文章1",
              updateTime: "2022-01-03 12:12:13"
            },
            {
              title: "测试文章2",
              updateTime: "2022-01-03 12:12:13"
            },
            {
              title: "测试文章3",
              updateTime: "2022-01-03 12:12:13"
            }
          ]
        },
        {
          categoryName: "测试分类名2",
          total: 30,
          viewCount: 467,
          backgroundImg: "/image/20221122114150.jpg",
          articles: [
            {
              title: "测试文章4",
              updateTime: "2022-01-03 12:12:13"
            },
            {
              title: "测试文章5",
              updateTime: "2022-01-03 12:12:13"
            },
            {
              title: "测试文章6",
              updateTime: "2022-01-03 12:12:13"
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.category-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 20px;
  grid-row-gap: 15px;

  .category-item {
    padding: 10px;

    .c-badge {
      position: absolute;
      top: 0.6em;
      right: 0;
      border-radius: 50px 0 0 50px;
      text-shadow: none;
      box-shadow: 0 1px 5px rgba(0, 0, 0, .2);
      z-index: 1;
      padding: 1px 5px;
      background-color: #fe3459;
      color: #fff;
      font-size: 12px;
    }

    .category-content {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
      margin-left: 10px;

      .category-name {
        font-size: 1.2em;
        cursor: pointer;
        color: #333;
      }

      .category-name:hover {
        color: var(--wp--preset--color--brand);
      }

      .category-meta {
        margin-top: auto;

        .count {
          font-size: 12px;
          color: #b1b1b1;
        }

        .more {
          padding: 2px 10px;
          font-size: 12px;
          color: #2997f7;
          background-color: rgba(41, 151, 247, .1);
          cursor: pointer;
          border-radius: 4px;
          font-weight: 400;
        }
      }
    }

    .c-article-item {
      margin-top: 8px;

      .c-article-title {
        color: #4e5358;
        font-size: 14px;
        max-width: 80%;
      }

      .c-article-title:hover {
        color: var(--wp--preset--color--title-hover);
      }

      .c-article-title:before {
        content: "";
        width: 0.5em;
        height: 0.5em;
        border: 0.1em solid var(--wp--preset--color--vivid-purple);
        border-radius: 1em;
        margin-left: 0.5em;
        vertical-align: 0.1em;
        display: inline-block;
      }

      .c-article-date {
        font-size: 14px;
        color: #b1b1b1;
      }
    }
  }
}
</style>