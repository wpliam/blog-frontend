<template>
  <a class="follow click-btn" @click.prevent="giveFollow">
    <span v-if="isFollow">
      <svg-icon icon-class="solid-follow"/>
      已关注
    </span>
    <span v-else>
      <svg-icon icon-class="not-follow"/>
      关注
    </span>
  </a>
</template>

<script>
export default {
  name: "Follow",
  data() {
    return {
      isFollow: false
    }
  },
  methods: {
    giveFollow() {
      this.isFollow = !this.isFollow
    }
  }
}
</script>

<style lang="less" scoped>
.follow {
  color: #ff5473;
  background-color: rgba(255, 84, 115, .1);
  font-weight: bold;
}
</style>