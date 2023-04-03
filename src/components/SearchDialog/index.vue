<template>
  <el-dialog
      :visible.sync="searchDrawer"
      title="搜索文章"
      width="600px"
      :show-close="false"
      :before-close="handleClose"
  >
    <Search></Search>
  </el-dialog>
</template>

<script>
import Search from "@/components/Search";

export default {
  name: "SearchDialog",
  components: {Search},
  data() {
    return {
      searchDrawer: true
    }
  },
  methods: {
    handleClose() {
      this.searchDrawer = false
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-dialog__body {
  padding: 10px 20px 30px 20px;
}
</style>