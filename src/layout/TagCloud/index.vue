<template>
  <el-card class="tag-card" shadow="hover" :body-style="{ padding: '10px'}">
    <div slot="header">
      <span class="card-title">
        <svg-icon icon-class="tag"/>
        <span class="ml05">标签</span>
      </span>
    </div>
    <div>
      <wordCloud
          :data="tags"
          nameKey="tagName"
          valueKey="id"
          :wordPadding="5"
          :color="myColors"
          :showTooltip="false"
          :fontSize="[10,20]"
          :wordClick="wordClickHandler">
      </wordCloud>
    </div>
  </el-card>
</template>
<script>
import wordCloud from 'vue-wordcloud'
import {getTagCard} from "@/api/tag";

export default {
  name: 'TagCloud',
  components: {wordCloud},
  computed: {
    myColors() {
      let colors = []
      for (let i = 0; i < 20; i++) {
        colors.push(this.randomColor())
      }
      return colors
    }
  },
  data() {
    return {
      tags: []
    }
  },
  created() {
    this.getTagCard()
  },
  methods: {
    async getTagCard() {
      const res = await getTagCard();
      if (res) {
        this.tags = res.tags
      }
    },
    wordClickHandler(name, value, vm) {
      this.goClassResult(value, 1)
    }
  },
}
</script>

<style lang="less" scoped>
/deep/ .el-card__header {
  padding: 12px 15px;
}

/deep/ .wordCloud {
  height: 0;
  min-height: 300px;
}

/deep/ .text {
  cursor: pointer;
}
</style>