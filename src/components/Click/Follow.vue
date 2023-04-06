<template>
  <a class="follow click-btn" @click.prevent="giveFollow(authorID)">
    <span v-if="$store.getters.getFollow">
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
import {giveFollow} from "@/api/shared";

export default {
  name: "Follow",
  props: {
    authorID: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  methods: {
    async giveFollow(authorID) {
      const res = await giveFollow(authorID);
      if (res.code === 0) {
        let data = res.data
        this.$store.commit("setFollow", data.isFollow)
      }
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