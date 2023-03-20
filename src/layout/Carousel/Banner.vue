<template>
  <div class="banner" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide
          v-for="(item,index) in banners"
          :key="index"
          class="banner-item"
      >
        <img :src="item.backgroundImage" alt="" class="banner-cover">
        <!--        <div class="banner-content">-->
        <!--          <p class="banner-title">{{ item.bigTitle }}</p>-->
        <!--          <p class="banner-subtitle">{{ item.subTitle }}</p>-->
        <!--        </div>-->
      </swiper-slide>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>

export default {
  name: "Banner",
  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        effect: "fade", //默认slide(位移切换)，fade(淡入)，cube(方块)，coverflow(3d流)，flip(3D反转)
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
      },
      banners: [
        {
          backgroundImage: "/image/banner1.jpg",
          bigTitle: "",
          subTitle: ""
        },
        {
          backgroundImage: "/image/banner2.jpg",
          bigTitle: "",
          subTitle: ""
        },
        {
          backgroundImage: "/image/banner3.jpg",
          bigTitle: "",
          subTitle: ""
        }
      ]
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted() {
    this.swiper.navigation.$nextEl.addClass('hide')
    this.swiper.navigation.$prevEl.addClass('hide')
  },
  methods: {
    onMouseenter() {
      this.swiper.autoplay.stop()
      this.swiper.navigation.$nextEl.removeClass('hide')
      this.swiper.navigation.$prevEl.removeClass('hide')
    },
    onMouseleave() {
      this.swiper.autoplay.start()
      this.swiper.navigation.$nextEl.addClass('hide')
      this.swiper.navigation.$prevEl.addClass('hide')
    }
  }
}
</script>

<style lang="less" scoped>
.banner {
  width: 100%;
  height: 400px;
  border-radius: 5px;

  .banner-item {
    position: relative;
    width: 100%;
    height: 400px;
    overflow: hidden;
    border-radius: var(--main-border-radius);

    .banner-cover {
      width: 100%;
      height: 100%;
      object-fit: cover;
      overflow: hidden;
      border-radius: var(--main-border-radius);
    }

    .banner-content {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 60px;
      width: 100%;
      background: rgba(0, 0, 0, .4);
      padding: 10px 80px 10px 14px;
      border-radius: 0 0 5px 5px;

      .banner-title {
        color: #fff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 18px;
        font-weight: 700;
      }

      .banner-subtitle {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 14px;
        color: #b9b9b9;
      }
    }
  }

  .hide {
    opacity: 0;
  }
}

/* 宽度小于 1200px 的屏幕使用该样式*/
@media screen and (max-width: 1200px) {
  .banner {
    height: 400px;

    .banner-item {
      height: 400px;
    }
  }
}

/* 宽度小于 1200px 的屏幕使用该样式*/
@media screen and (max-width: 1100px) {
  .banner {
    height: 380px;

    .banner-item {
      height: 380px;
    }
  }
}

/* 宽度小于 990px 的屏幕使用该样式*/
@media screen and (max-width: 980px) {
  .banner {
    height: 360px;

    .banner-item {
      height: 360px;
    }
  }
}

@media screen and (max-width: 720px) {
  .banner {
    height: 340px;

    .banner-item {
      height: 340px;
    }
  }
}

@media screen and (max-width: 600px) {
  .banner {
    height: 320px;

    .banner-item {
      height: 320px;
    }
  }
}

@media screen and (max-width: 500px) {
  .banner {
    height: 300px;

    .banner-item {
      height: 300px;
    }
  }
}
</style>