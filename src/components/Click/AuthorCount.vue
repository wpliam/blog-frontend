<template>
  <div class="count-container">
    <a class="count-article count-base">
      <el-tooltip effect="dark" :content="`共${articleCount}篇文章`" placement="top">
        <span>
          <svg-icon icon-class="article"/>
          <span class="ml02">{{ articleCount }}</span>
        </span>
      </el-tooltip>
    </a>
    <a class="count-comment count-base">
      <el-tooltip effect="dark" :content="`共${commentCount}条评论`" placement="top">
        <span>
          <svg-icon icon-class="comment"/>
          <span class="ml02">{{ commentCount }}</span>
        </span>
      </el-tooltip>
    </a>
    <a class="count-hot count-base">
      <el-tooltip effect="dark" :content="`人气值${hotCount}`" placement="top">
        <span>
          <svg-icon icon-class="hot"/>
          <span class="ml02">{{ hotCount }}</span>
        </span>
      </el-tooltip>
    </a>
    <!--    <a class="count-fans count-base" v-if="needFans">-->
    <!--      <el-tooltip effect="dark" :content="`共${fansCount}个粉丝`" placement="top">-->
    <!--        <span>-->
    <!--          <svg-icon icon-class="solid-follow"/>-->
    <!--          <span class="ml02">{{ fansCount }}</span>-->
    <!--        </span>-->
    <!--      </el-tooltip>-->
    <!--    </a>-->
  </div>
</template>

<script>
import {censusUserInfo} from "@/api/user";

export default {
  name: "AuthorCount",
  props: {
    needFans: {
      type: Boolean,
      default: false
    },
    uid: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      articleCount: 0,
      commentCount: 0,
      hotCount: 0,
      fansCount: 0
    }
  },
  created() {
    if (this.uid > 0) {
      this.censusUserInfo(this.uid)
    }
  },
  methods: {
    async censusUserInfo(uid) {
      const res = await censusUserInfo(uid);
      if (res.code === 0) {
        let data = res.data
        this.articleCount = data.articleCount
        this.commentCount = data.commentCount
        this.hotCount = data.hotCount
        this.fansCount = data.fansCount
      }
    }
  }
}
</script>

<style lang="less" scoped>
.count-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
  grid-column-gap: 5px;

  .count-base {
    padding: 1px 10px;
    border-radius: var(--main-border-radius);
    text-align: center;
    overflow: hidden;
  }

  .count-article {
    color: #2997f7;
    background: rgba(41, 151, 247, .1);
  }

  .count-comment {
    color: #18a52a;
    background: rgba(18, 185, 40, .1);
  }

  .count-hot {
    color: #ff5473;
    background: rgba(255, 84, 115, .1);
  }

  .count-fans {
    color: #ff6f06;
    background: rgba(255, 11, 6, 0.1);
  }
}
</style>