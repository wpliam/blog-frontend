<template>
  <div class="home-container">
    <Nav></Nav>
    <div class="base-content-layout">
      <div class="left-aside">
        <Banner></Banner>
        <Category class="mt20"></Category>
        <ArticleList class="mt20"></ArticleList>
      </div>
      <div class="right-aside">
        <Notice></Notice>
        <HotArticle class="mt20"></HotArticle>
        <TagCloud class="mt20"></TagCloud>
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
import TagCloud from "@/layout/TagCloud";

export default {
  name: "Home",
  components: {TagCloud, Notice, HotArticle, FootWaveLine, ArticleList, Category, Banner, Nav}
}
</script>