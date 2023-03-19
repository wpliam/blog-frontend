<template>
  <div class="recommend-container" v-if="recommendList.length > 0">
    <div class="recommend-content">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide
            v-for="(item,index) in recommendList"
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
  name: "RecommendArticle",
  props: {
    slidesPerView: {
      type: Number,
      default: 3
    },
    slidesPerGroup: {
      type: Number,
      default: 3
    },
    articleID: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      recommendList: [],
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        slidesPerView: this.slidesPerView,
        slidesPerGroup: this.slidesPerGroup,
        spaceBetween: 15,
        preventLinksPropagation: false,
        on: {
          click: (e) => {
            let id = e.target.dataset.id
            if (id === undefined) {
              return
            }
            console.log("id:", id)
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
    height: 180px;
    background: var(--main-bg-color);
    border-radius: var(--main-border-radius);
    padding: 15px;
    box-shadow: var(--main-box-show);
    overflow: hidden;
    --swiper-navigation-size: 25px;

    .swiper-button-disabled {
      display: none;
    }

    .recommend-item {
      height: 150px;
      overflow: hidden;
      position: relative;

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