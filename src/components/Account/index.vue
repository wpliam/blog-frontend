<template>
  <el-dialog
      :visible.sync="accountVisible"
      width="400px"
      :show-close="false"
      :before-close="handleClose"
  >
    <div class="account-container">
      <div class="tab-header">
        <div class="tab-title">
          <span v-if="true">登录</span>
          <span v-else>注册</span>
        </div>
        <a class="tab-change" @click.prevent="changeTab">
          <span v-if="true">没有账号？立即注册</span>
          <span v-else>已有账号,立即登录</span>
          <i class="el-icon-arrow-right"></i>
        </a>
      </div>
      <Login></Login>
    </div>
  </el-dialog>
</template>

<script>

import Login from "@/components/Account/Login";

export default {
  name: "Account",
  components: {Login},
  data() {
    return {
      accountVisible: true,
    }
  },
  methods: {
    handleClose() {
      this.accountVisible = false
    },
    changeTab() {
      this.$message.info("注册功能暂未开放")
    },
    withName(name) {
      console.log("name:", name)
    }
  }
}
</script>

<style lang="less" scoped>
.account-container {
  .tab-header {
    padding-bottom: 10px;

    .tab-title {
      position: relative;
      font-size: 1.8em;
      padding-bottom: 8px;
      margin-bottom: 8px;
    }

    .tab-title:after {
      position: absolute;
      content: '';
      width: 40px;
      height: 3px;
      top: auto;
      left: 0;
      bottom: -1px;
      transition: .4s ease all;
      border-radius: 2px;
      background: var(--wp--preset--color--vivid-purple);
    }

    .tab-title:hover:after {
      width: 60px;
      transition: .4s ease all;
    }

    .tab-change {
      font-size: var(--wp--preset-font-size-small);
      color: #777;
      cursor: pointer;
    }

    .tab-change:hover {
      color: red;
    }
  }
}

/deep/ .el-dialog__header {
  display: none;
}
</style>
