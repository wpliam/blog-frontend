<template>
  <el-container>
    <el-header style="padding: 0">
      <Nav></Nav>
    </el-header>
    <el-main class="base-line-layout" style="padding: 20px 0">
      <div class="panel-group">
        <div class="panel-item flex-between-center">
          <svg-icon icon-class="archive-article" class-name="panel-icon"/>
          <div class="flex-column-center archive-count">
            <p class="panel-text">文章数</p>
            <span class="panel-num">{{ articleCount }}</span>
          </div>
        </div>
        <div class="panel-item flex-between-center">
          <svg-icon icon-class="archive-category" class-name="panel-icon"/>
          <div class="flex-column-center archive-count">
            <p class="panel-text">分类数</p>
            <span class="panel-num">{{ categoryCount }}</span>
          </div>
        </div>
        <div class="panel-item flex-between-center">
          <svg-icon icon-class="archive-label" class-name="panel-icon"/>
          <div class="flex-column-center archive-count">
            <p class="panel-text">标签数</p>
            <span class="panel-num">{{ tagCount }}</span>
          </div>
        </div>
      </div>
      <div class="archive-label archive base-card mt20">
        <p class="label-title archive-title">标签</p>
        <ul class="label-list">
          <li v-for="(item,index) in tags" :key="index" class="label-item text-ellipsis">
            {{ item.tagName }}
          </li>
        </ul>
      </div>
      <div class="archive-group archive base-card mt20">
        <p class="time-title archive-title">时间轴</p>
        <ul class="archive-list">
          <li class="archive-item" v-for="(item,idx) in articles" :key="idx" @click="setActiveIdx(idx)">
            <div class="archive-wrapper">
              <div class="time-in flex-between-center">
                {{ item.timestamp }}
                <i class="el-icon-arrow-down" v-if="isActive(idx)"></i>
                <i class="el-icon-arrow-right" v-else></i>
              </div>
              <ol class="time-body" v-if="isActive(idx)">
                <li class="time-item text-ellipsis" v-for="(sub,index) in item.collapse" :key="index"
                    @click="readArticle(sub)">
                  <span>{{ sub.createTime|timeLayout }}:</span>
                  <span>{{ sub.title }}</span>
                </li>
              </ol>
            </div>
          </li>
        </ul>
      </div>
    </el-main>
    <FootWaveLine></FootWaveLine>
  </el-container>
</template>

<script>
import Nav from "@/layout/Nav";
import FootWaveLine from "@/layout/Footer/FootWaveLine";
import {getArticleArchive} from "@/api/article";

export default {
  name: "Archive",
  components: {FootWaveLine, Nav},
  data() {
    return {
      articleCount: 0,
      categoryCount: 0,
      tagCount: 0,
      likeCount: 0,
      tags: [],
      articles: [],
      activeIdx: [],
    }
  },
  created() {
    this.getArticleArchive()
  },
  methods: {
    async getArticleArchive() {
      const res = await getArticleArchive()
      if (res.code === 0) {
        let data = res.data
        this.articleCount = data.articleCount
        this.tagCount = data.tagCount
        this.categoryCount = data.categoryCount
        this.tags = data.tags
        let keys = []
        Object.keys(data.article).forEach(key => {
          keys.push(key)
        })
        keys.sort((a, b) => {
          return Date.parse(b) - Date.parse(a)
        })
        let articles = []
        for (let key of keys) {
          articles.push({
            timestamp: key,
            collapse: data.article[key]
          })
        }
        this.articles = articles
      }
    },
    setActiveIdx(index) {
      if (this.isActive(index)) {
        this.activeIdx.splice(this.activeIdx.indexOf(index), 1)
      } else {
        this.activeIdx.push(index)
      }
    },
    isActive(index) {
      return this.activeIdx.indexOf(index) > -1
    }
  }
}
</script>

<style lang="less" scoped>
.panel-group {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 10px 20px;

  .panel-item {
    padding: 20px;
    background: var(--main-bg-color);
    box-shadow: var(--main-box-show);
    cursor: pointer;

    .panel-text {
      line-height: 18px;
      color: rgba(0, 0, 0, .45);
      font-size: 16px;
      margin-bottom: 5px;
    }

    .panel-num {
      font-size: 20px;
    }
  }

  .panel-icon {
    width: 60px;
    height: 60px;
    padding: 10px;
    border-radius: var(--main-border-radius);
  }
}

.archive {
  position: relative;
}

.archive-title {
  position: absolute;
  top: 15px;
  left: 0;
  color: #fff;
  -webkit-box-shadow: 2px 5px 10px rgb(49 58 70 / 15%);
  box-shadow: 2px 5px 10px rgb(49 58 70 / 15%);
  height: 30px;
  line-height: 30px;
  padding: 0 12px;
  border-radius: 2px 2px 2px 0;
  user-select: none;
}

.archive-title:before {
  content: "";
  position: absolute;
  bottom: -10px;
  left: -10px;
  border-style: solid;
  border-width: 10px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.archive-label {
  .label-title {
    background: var(--wp--preset--color--brand);
  }

  .label-title:before {
    border-color: var(--wp--preset--color--brand) transparent transparent;
  }

  .label-list {
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    padding: 60px 15px 15px 15px;

    .label-item {
      user-select: none;
      background: #f2f6fc;
      height: 28px;
      line-height: 28px;
      border-radius: 14px;
      cursor: pointer;
      color: #606266;
      font-size: 12px;
      padding: 0 15px;
      text-align: center;
    }
  }
}

.archive-group {
  .time-title {
    background: var(--wp--preset--color--luminous-vivid-orange);
  }

  .time-title:before {
    border-color: var(--wp--preset--color--luminous-vivid-orange) transparent transparent;
  }

  .archive-list {
    padding: 60px 15px 15px 15px;

    .archive-item {
      position: relative;
      cursor: pointer;
      margin-bottom: 10px;

      .archive-wrapper {
        padding-left: 30px;
        overflow: hidden;
        transition: height .25s ease;

        .time-in {
          position: relative;
          color: #fb6c28;
          cursor: pointer;
          background: #f2f6fc;
          height: 40px;
          line-height: 40px;
          border-radius: 4px;
          padding: 0 5px;
          font-size: 14px;
        }

        .time-in:before {
          position: absolute;
          content: "";
          top: 50%;
          transform: translateY(-50%);
          left: -8px;
          width: 0;
          height: 0;
          border-right: 8px solid #f2f6fc;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
        }

        .time-body {
          padding: 15px 5px 0;
          transition: opacity .25s;

          .time-item {
            margin-bottom: 15px;
            max-width: 100%;
            color: #606266;
            font-size: 14px;
          }

          .time-item:hover {
            color: var(--wp--preset--color--vivid-purple);
          }
        }
      }
    }

    .archive-item:after {
      position: absolute;
      content: "";
      left: 6px;
      top: 25px;
      width: 1px;
      height: 100%;
      background: #ebeef5;
    }

    .archive-item:last-child:after {
      height: 0;
    }

    .archive-item:before {
      position: absolute;
      content: "";
      top: 14px;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: #ebeef5;
    }
  }
}
</style>
