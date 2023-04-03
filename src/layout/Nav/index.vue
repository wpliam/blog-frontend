<template>
  <div class="nav-horizontal">
    <div class="base-layout">
      <div class="switch">
        <a>
          <svg-icon icon-class="s-fold"></svg-icon>
        </a>
      </div>
      <div class="menus">
        <a
            v-for="(tab,index) in menus" :key="index"
            @click.prevent="handleCommand(tab)"
            class="menu-item">
          <svg-icon :icon-class="tab.icon"></svg-icon>
          {{ tab.name }}
        </a>
      </div>
      <div class="option">
        <el-popover
            class="user-btn"
            placement="bottom"
            width="250"
            trigger="hover">
          <a slot="reference">
            <svg-icon icon-class="female"></svg-icon>
          </a>
          <UserCard></UserCard>
        </el-popover>
        <a class="search-btn" @click.prevent="openSearch">
          <svg-icon icon-class="search"></svg-icon>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import UserCard from "@/layout/UserCard";
import Search from "@/components/Search";

export default {
  name: "Nav",
  components: {Search, UserCard},
  data() {
    return {
      searchDrawer: false,
      activeIndex: 0,
      menus: [
        {
          name: "首页",
          path: "Home",
          icon: "home"
        },
        {
          name: "归档",
          path: "Archive",
          icon: "archive"
        },
      ]
    }
  },
  methods: {
    handleCommand(tab) {
      let route = this.$router.resolve({
        name: tab.path
      })
      let target = "_blank"
      if (tab.path === "Home") {
        target = "_self"
      }
      window.open(route.href, target)
    },
    handleClose() {
      this.searchDrawer = false
    }
  }
}
</script>

<style lang="less" scoped>
.nav-horizontal {
  line-height: 60px;
  width: 100%;
  position: fixed;
  z-index: 1600;
  background: var(--main-bg-color);
  box-shadow: var(--main-box-show);

  .switch {
    display: none;
  }

  .menus {
    .menu-item {
      margin-right: 15px;
      font-size: var(--wp--preset--spacing--40);
      color: var(--main-color);
      cursor: pointer;
    }

    .menu-item:hover {
      color: var(--wp--preset--color--brand);
    }
  }

  .option {
    .search-btn {
      margin-left: 20px;
    }
  }
}
</style>