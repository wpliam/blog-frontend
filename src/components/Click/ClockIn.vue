<template>
  <div>
    <a class="click-btn already-click" v-if="$store.getters.getClock" @click.prevent="openClock">
      <svg-icon icon-class="already-clock"/>
      已签到
    </a>
    <a class="click-btn not-click" v-else @click.prevent="clockIn">
      <svg-icon icon-class="not-clock"/>
      {{ title }}
    </a>
  </div>
</template>

<script>
import {punchClock} from "@/api/shared";

export default {
  name: "ClockIn",
  props: {
    title: {
      type: String,
      default: "签到"
    }
  },
  data() {
    return {}
  },
  methods: {
    async clockIn() {
      if (this.$store.getters.getClock) {
        return
      }
      const res = await punchClock();
      if (res.code === 0) {
        this.$message.success("签到成功")
        this.$store.commit("setClock", true)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.not-click {
  width: 100%;
  color: #1296db;
  background: rgba(41, 151, 247, .1);
}

.already-click {
  width: 100%;
  color: #ff6f06;
  background: rgba(255, 111, 6, 0.1);
}
</style>