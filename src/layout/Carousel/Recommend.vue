<template>
  <div class="recommend-container" v-if="recommends.length > 0">
    <slot></slot>
    <div class="recommend-content base-card">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide
            v-for="(item,index) in recommends"
            :key="index"
            class="recommend-item"
        >
          <img :src="item.cover" alt="" class="cover" :data-id="item.id">
          <div class="recommend-info">
            <p class="recommend-title text-ellipsis">{{ item.title }}</p>
          </div>
        </swiper-slide>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script>

export default {
  name: "Recommend",
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 15,
        preventLinksPropagation: false,
        on: {
          click: (e) => {
            let id = e.target.dataset.id
            if (id === undefined) {
              return
            }
          }
        }
      },
    }
  },
  mounted() {
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.recommend-container {
  width: 100%;

  .recommend-content {
    padding: 15px;
    --swiper-navigation-size: 25px;

    .swiper-button-disabled {
      display: none;
    }

    .recommend-item {
      height: 150px;
      border-radius: var(--main-border-radius);
      overflow: hidden;
      position: relative;
      cursor: pointer;

      .recommend-info {
        position: absolute;
        top: auto;
        bottom: 0;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, .2);
        border-radius: 0 0 5px 5px;

        .recommend-title {
          padding: 0 5px;
          height: 30px;
          line-height: 30px;
          color: white;
          font-weight: 500;
          font-size: 15px;
        }
      }
    }
  }
}
</style>