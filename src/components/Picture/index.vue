<template>
  <div :style="img" class="picture">
    <img :src="backgroundImg" alt="" class="cover">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Picture",
  props: {
    backgroundImg: {
      type: String,
      default: ""
    },
    width: {
      type: Number,
      default: 190,
    },
    height: {
      type: Number,
      default: 130
    }
  },
  data() {
    return {
      img: {
        width: `${this.width}px`,
        height: `${this.height}px`,
      }
    }
  }
}
</script>

<style lang="less" scoped>
.picture {
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  border-radius: var(--main-border-radius);
  cursor: pointer;
}
</style>