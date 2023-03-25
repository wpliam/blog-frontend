<template>
  <div class="count-container">
    <a class="count-article count-base">
      <el-tooltip effect="dark" :content="`共${10}篇文章`" placement="top">
        <span>
          <svg-icon icon-class="article"/>
          <span class="ml02">10</span>
        </span>
      </el-tooltip>
    </a>
    <a class="count-comment count-base">
      <el-tooltip effect="dark" :content="`共${10}条评论`" placement="top">
        <span>
          <svg-icon icon-class="comment"/>
          <span class="ml02">10</span>
        </span>
      </el-tooltip>
    </a>
    <a class="count-hot count-base">
      <el-tooltip effect="dark" :content="`人气值${10}`" placement="top">
        <span>
          <svg-icon icon-class="hot"/>
          <span class="ml02">10</span>
        </span>
      </el-tooltip>
    </a>
    <a class="count-fans count-base" v-if="needFans">
      <el-tooltip effect="dark" :content="`共${10}个粉丝`" placement="top">
        <span>
          <svg-icon icon-class="solid-follow"/>
          <span class="ml02">10</span>
        </span>
      </el-tooltip>
    </a>
  </div>
</template>

<script>
export default {
  name: "AuthorCount",
  props: {
    needFans: {
      type: Boolean,
      default: false
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