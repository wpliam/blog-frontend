<template>
  <el-card class="notice-card" shadow="hover" :body-style="{ padding: '0 10px'}">
    <div slot="header">
      <span class="card-title">
        <svg-icon icon-class="bulletin"/>
        <span class="ml05">公告</span>
      </span>
    </div>
    <div class="notice-content">
      <vue-seamless-scroll :data="notices" :class-option="optionHover">
        <ul>
          <li v-for="(notice,index) in notices" class="notice-line">
            {{ notice.title }}
          </li>
        </ul>
      </vue-seamless-scroll>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Notice",
  data() {
    return {
      notices: [
        {
          title: "支撑点是支持你成功的梦想,只要你选择的,再苦再难都要高傲地挺住。兴奋点是成就你事业的动力,你的气场有多大," +
              "你未来的舞台就有多大。平衡点是平和你心态的比较,要把付出与多的人相比,把收获与少的人相比。专注点是凝聚你力量的方向," +
              "如果你一辈子就做一个事情,那你一定是个伟人"
        }
      ]
    }
  },
  computed: {
    optionHover() {
      return {
        step: 0.3, // 数值越大速度滚动越快
        limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  }
}
</script>

<style lang="less" scoped>
.notice-card {
  .notice-content {
    overflow: hidden;
    height: 210px;

    .notice-line {

    }
  }
}
/deep/ .el-card__header{
  padding: 12px 15px;
}
</style>