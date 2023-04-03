<template>
  <el-container>
    <el-header style="padding: 0">
      <Nav></Nav>
    </el-header>
    <el-main class="base-layout" style="padding: 20px 0">
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
    </el-main>
    <Footer></Footer>
    <FootWaveLine></FootWaveLine>
  </el-container>
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
import Footer from "@/layout/Footer";

export default {
  name: "Home",
  components: {Footer, TagCloud, Notice, HotArticle, FootWaveLine, ArticleList, Category, Banner, Nav}
}
</script>