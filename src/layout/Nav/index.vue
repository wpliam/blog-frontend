<template>
  <div class="nav-container">
    <div class="horizontal base-card">
      <div class="horizontal-content base-layout">
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
          <a class="search-btn" @click.prevent="">
            <svg-icon icon-class="search"></svg-icon>
          </a>
          <el-popover
              class="bell-btn"
              placement="bottom"
              width="100"
              trigger="hover">
            <a slot="reference">
              <svg-icon icon-class="notice"></svg-icon>
            </a>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserCard from "@/layout/UserCard";

export default {
  name: "Nav",
  components: {UserCard},
  data() {
    return {
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
  }
}
</script>

<style lang="less" scoped>
.nav-container {
  height: 60px;
  width: 100%;

  .horizontal {
    width: 100%;
    height: 60px;
    line-height: 60px;
    position: fixed;
    top: 0;
    z-index: 1600;

    .horizontal-content {
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
          margin: 0 20px;
        }
      }
    }
  }
}
</style>