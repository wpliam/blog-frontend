<template>
  <div class="search-container">
    <el-autocomplete
        class="search-text"
        ref="autocomplete"
        v-model="keyword"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        :trigger-on-focus="false"
        :withHeader="false"
        @select="handleAutoSelect"
    >
      <template slot-scope="{ item }">
        <div class="flex-between-center">
          <p class="text-ellipsis" v-html="item.keyword"></p>
          <p style="color: #999;font-size: 14px">{{ item.version }}人搜过</p>
        </div>
      </template>
      <el-button slot="append" icon="el-icon-search" @click="goSearch(keyword)"></el-button>
    </el-autocomplete>
    <div class="hot-search mt20" v-if="!arrEmpty(hotList)">
      <p class="muted">热门搜索</p>
      <div class="tags">
        <el-tag
            class="tag-item"
            type="info"
            size="small"
            v-for="(hot,index) in hotList" :key="index"
            @click="goSearch(hot.keyword)"
        >
          {{ hot.keyword }}
        </el-tag>
      </div>
    </div>
    <div class="history-search mt20" v-if="!arrEmpty(historyList)">
      <div class="flex-between-center">
        <p class="muted">历史搜索</p>
        <a @click.prevent="clearHistoryList"><i class="el-icon-delete"></i></a>
      </div>
      <div class="tags">
        <el-tag
            class="tag-item"
            type="info"
            size="small"
            v-for="(name,index) in historyList" :key="index"
            @click="goSearch(name)"
        >
          {{ name }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script>

import {searchArticleList, searchKeywordFlow} from "@/api/article";
import router from "@/router";

export default {
  name: "Search",
  props: {
    value: {
      type: String,
      default: ""
    },
    closeSearchDialog: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      keyword: "", // 搜索的值
      hotList: [], // 热门搜索列表
      historyList: [], // 历史搜索列表
    }
  },
  created() {
    // 如果有父组件有传值,这里直接赋值
    if (this.value) {
      this.keyword = this.value
    }
  },
  mounted() {
    // 历史列表有值,直接赋值
    if (JSON.parse(localStorage.getItem("historyList"))) {
      this.historyList = JSON.parse(localStorage.getItem("historyList"));
    }
    searchKeywordFlow("").then(res => {
      if (res) {
        this.hotList = res.flows
      }
    })
  },
  methods: {
    // 获取搜索列表,根据输入的值调用后台接口查询,cb将搜索到的结果回调
    querySearch(queryStr, callback) {
      searchKeywordFlow(queryStr).then(res => {
        if (res) {
          callback(res.flows)
        }
      })
    },
    // 搜索框选中之后,将选中的值赋值给searchVal
    handleAutoSelect(item) {
      let temp = document.createElement("div")
      temp.innerHTML = item.keyword
      let output = temp.innerText || temp.textContent
      temp = null
      this.keyword = output
      this.goSearch(output)
    },
    // 去搜索
    goSearch(keyword) {
      if (keyword === "") {
        this.$message.warning("搜索值不能为空")
        return
      }
      this.keyword = keyword
      // 关闭父组件弹窗
      if (this.closeSearchDialog) {
        this.closeSearchDialog()
      }
      // 隐藏输入框
      this.$refs.autocomplete.suggestions = []
      // 有搜索记录,删除之前的旧记录,将新的记录放在第一位
      if (this.historyList.includes(keyword)) {
        let index = this.historyList.indexOf(keyword)
        this.historyList.splice(index, 1)
      }
      this.historyList.unshift(keyword)
      localStorage.setItem("historyList", JSON.stringify(this.historyList))
      let target = "_blank"
      if (router.currentRoute.name === "SearchResult") {
        target = "_self"
      }
      let route = router.resolve({
        name: "SearchResult",
        query: {
          keyword: keyword
        }
      })
      window.open(route.href, target)
    },
    // 清理历史记录
    clearHistoryList() {
      this.$confirm("确认要清空全部搜索记录?", {
        confirmButtonText: "确定",
        cancelButtonClass: "取消",
        type: "warning"
      }).then(() => {
        localStorage.removeItem('historyList');
        this.historyList = [];
      }).catch(() => {

      })
    },
  }
}
</script>

<style lang="less" scoped>
.search-container {
  .search-text {
    width: 100%;
  }

  .tags {
    .tag-item {
      cursor: pointer;
      margin-right: 8px;
      margin-top: 8px;
    }
  }

  .muted {
    font-size: 14px;
    color: #777;
  }
}
</style>