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
          nameKey="name"
          valueKey="value"
          :color="myColors"
          :showTooltip="false"
          :fontSize="[10,30]"
          :wordClick="wordClickHandler">
      </wordCloud>
    </div>
  </el-card>
</template>
<script>
import wordCloud from 'vue-wordcloud'

export default {
  name: 'TagCloud',
  components: {wordCloud},
  computed: {
    myColors() {
      let colors = []
      for (let i = 0; i < 10; i++) {
        colors.push(this.randomColor())
      }
      return colors
    }
  },
  methods: {
    wordClickHandler(name, value, vm) {
      this.goClassResult(value, 1)
    }
  },
  data() {
    return {
      tags: [{
        "name": "Cat",
        "value": 26
      },
        {
          "name": "fish",
          "value": 19
        },
        {
          "name": "things",
          "value": 18
        },
        {
          "name": "look",
          "value": 16
        },
        {
          "name": "two",
          "value": 15
        },
        {
          "name": "fun",
          "value": 9
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.tag-card {

}

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