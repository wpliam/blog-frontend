<template>
  <div class="home-container">
    <Nav></Nav>
    <div class="home-content base-layout">
      <div class="left-aside">
        <Banner></Banner>
        <Category class="mt20"></Category>
        <ArticleList class="mt20"></ArticleList>
      </div>
      <div class="right-aside">
        <Notice></Notice>
        <HotArticle class="mt20"></HotArticle>
      </div>
    </div>
    <FootWaveLine></FootWaveLine>
  </div>
</template>

<script>
import Nav from "@/layout/Nav";
import Banner from "@/layout/Carousel/Banner";
import Category from "@/layout/Category";
import ArticleList from "@/layout/ArticleList";
import FootWaveLine from "@/layout/Footer/FootWaveLine";
import HotArticle from "@/layout/HotArticle";
import Notice from "@/layout/Notice";

export default {
  name: "Home",
  components: {Notice, HotArticle, FootWaveLine, ArticleList, Category, Banner, Nav}
}
</script>

<style lang="less" scoped>
.home-container {
  .home-content {
    margin: 20px auto;
  }
}
</style>