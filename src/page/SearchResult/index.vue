<template>
  <div class="search-result-container">
    <Nav></Nav>
    <div class="base-line-layout">
      <ul class="search-list">
        <li class=""></li>
      </ul>
    </div>
    <FootWaveLine></FootWaveLine>
  </div>
</template>

<script>
import Nav from "@/layout/Nav";
import FootWaveLine from "@/layout/Footer/FootWaveLine";

export default {
  name: "SearchResult",
  components: {FootWaveLine, Nav}
}
</script>

<style lang="less" scoped>
.search-result-container {
  .search-list {
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-gap: 10px 20px;
  }
}
</style>