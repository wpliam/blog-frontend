<template>
  <a class="chat click-btn">
    <svg-icon icon-class="message"/>
    私信
  </a>
</template>

<script>
export default {
  name: "Chat"
}
</script>

<style lang="less" scoped>
.chat {
  color: #2997f7;
  background-color: rgba(41, 151, 247, .1);
  font-weight: bold;
}
</style>