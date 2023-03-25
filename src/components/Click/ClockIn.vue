<template>
  <div @click.prevent="clockIn">
    <a class="click-btn already-click" v-if="hasClock">
      <svg-icon icon-class="already-clock"/>
      已签到
    </a>
    <a class="click-btn not-click" v-else>
      <svg-icon icon-class="not-clock"/>
      {{ title }}
    </a>
  </div>
</template>

<script>
export default {
  name: "ClockIn",
  props: {
    title: {
      type: String,
      default: "签到"
    }
  },
  data() {
    return {
      hasClock: false
    }
  },
  methods: {
    clockIn() {
      this.hasClock = true
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