<template>
  <el-dialog
      :visible.sync="searchDialog"
      title="搜索文章"
      width="600px"
      :show-close="false"
      :before-close="handleClose"
  >
    <Search :close-search-dialog="handleClose"></Search>
  </el-dialog>
</template>

<script>
import Search from "@/components/Search";

export default {
  name: "SearchDialog",
  components: {Search},
  data() {
    return {
      searchDialog: true
    }
  },
  methods: {
    handleClose() {
      this.searchDialog = false
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-dialog__body {
  padding: 10px 20px 30px 20px;
}
</style>