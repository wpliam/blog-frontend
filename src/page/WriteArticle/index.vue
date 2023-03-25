<template>
  <div class="write-article-container">
    <Nav></Nav>
    <div class="base-line-layout">
      <el-form ref="form" :model="writeForm" class="article-form">
        <div class="content-layout show">
          <el-input class="title"
                    v-model="writeForm.title"
                    placeholder="输入文章标题"
                    minlength="5"
                    maxlength="20"
                    show-word-limit
          ></el-input>
          <el-input class="abstract"
                    v-model="writeForm.abstract"
                    placeholder="输入文章导语"
                    maxlength="50"
                    show-word-limit
          ></el-input>
          <mavon-editor class="content"
                        v-model="content"
                        :boxShadow="false"
                        ref="md"
                        :toolbarsFlag="true"
                        :subfield="false"
                        :editable="true"
                        @change="changeContent"
          >
          </mavon-editor>
        </div>
        <div class="option-layout show">
          <el-form-item label="文章来源:">
            <el-radio v-model="writeForm.source" :label="0">原创</el-radio>
            <el-radio v-model="writeForm.source" :label="1">转载</el-radio>
          </el-form-item>
          <el-form-item label="文章分类:">
            <el-select v-model="writeForm.categoryID" size="small" clearable placeholder="请选择">
              <el-option
                  v-for="item in categoryList"
                  :key="item.id"
                  :label="item.categoryName"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文章标签:" class="opt-tag">
            <el-tag
                :key="tag"
                v-for="tag in writeForm.dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
              {{ tag }}
            </el-tag>
            <el-input
                class="input-new-tag"
                v-if="tagVisible"
                v-model="tagValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">New Tag</el-button>
          </el-form-item>
          <el-form-item label="文章配图:" class="opt-img">
            <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
              <img v-if="writeForm.cover" :src="writeForm.cover" class="avatar" alt="">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="文章推荐:" class="opt-recommend">
            <el-button size="small" @click="dialogVisible=true">添加文章</el-button>
            <el-dialog
                :visible.sync="dialogVisible"
                @close="recommendArticlePageClose"
                :destroy-on-close="true"
                title="设置相关文章"
                width="950px"
            >
              <div class="add-article">
                <div class="add-content">
                  <div class="source-area">
                    <div class="search-area">
                      <div class="one-line flex-between-center">
                        <el-input v-model="searchVal" placeholder="输入文章标题" size="small"></el-input>
                      </div>
                      <div class="two-line flex-between-center">
                        <el-select v-model="searchCategoryName" size="small" clearable placeholder="请选择">
                          <el-option
                              v-for="item in categoryList"
                              :key="item.id"
                              :label="item.categoryName"
                              :value="item.categoryName">
                          </el-option>
                        </el-select>
                        <el-button size="small" type="primary" @click="searchArticle">搜索</el-button>
                      </div>
                    </div>
                    <div class="result-area">
                      <el-table
                          ref="multipleTable"
                          :data="sourceData"
                          :row-key="getRowKeys"
                          @selection-change="handleSelectionChange"
                          size="small"
                      >
                        <el-table-column
                            type="selection"
                            reserve-selection
                            width="50">
                        </el-table-column>
                        <el-table-column
                            fixed
                            show-overflow-tooltip
                            prop="title"
                            label="标题"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            fixed
                            prop="user.nickname"
                            label="作者"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            fixed
                            prop="createTime"
                            label="发布时间"
                            width="200">
                          <template slot-scope="scope">
                            {{ scope.row.createTime }}
                          </template>
                        </el-table-column>
                      </el-table>
                      <el-pagination
                          style="text-align: center;margin-top: 15px"
                          @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :hide-on-single-page="true"
                          :current-page="page.offset"
                          :page-sizes="[10, 20, 30]"
                          :page-size="page.limit"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="page.total">
                      </el-pagination>
                    </div>
                  </div>
                  <div class="target-area">
                    <ul>
                      <li v-for="(item,index) in targetData" :key="index" class="target-item flex-between-center">
                        <div class="i-left">
                          <a class="title">{{ item.title }}</a>
                        </div>
                        <div class="i-right">
                          <a @click.prevent="removeTarget(item)" class="remove-btn">删除</a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="showTargetData">确 定</el-button>
              </div>
            </el-dialog>
            <div v-if="writeForm.recommendArticles.length > 0">
              <el-table
                  :data="writeForm.recommendArticles"
                  size="mini"
              >
                <el-table-column
                    prop="title"
                    label="标题"
                >
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="50">
                  <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        @click.native.prevent="deleteRow(scope.$index, writeForm.recommendArticles)"
                    >
                      移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="post-settings">
      <div class="settings base-card">
        <div class="base-layout flex-between-center">
          <div class="post-left"></div>
          <div class="post-right">
            <a href="#" class="draft btn">保存草稿</a>
            <a href="#" class="push btn" @click.prevent="setArticleInfo">提交发布</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/layout/Nav";

export default {
  name: "WriteArticle",
  components: {Nav},
  data() {
    return {
      getRowKeys(row) {
        return row.id
      },
      tagVisible: false,
      tagValue: '', // 文章标签值
      dialogVisible: false, // 文章推荐窗开关
      content: "", // 文章内容

      searchVal: "",
      searchCategoryName: "",

      page: {
        offset: 1,
        limit: 10,
        total: 0
      },

      writeForm: {
        title: "",
        abstract: "",
        content: "",
        cover: "",
        dynamicTags: [],
        recommendArticles: [],
        categoryID: 0,
        source: 0,
      },
      categoryList: [
        {
          id: 0,
          categoryName: ""
        },
        {
          id: 1,
          categoryName: "java"
        }
      ],

      sourceData: [], // 搜索当前页的文章
      targetData: [] // 选中的文章
    }
  },
  mounted() {

  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    // table表格数据变化时触发
    handleSelectionChange(rows) {
      this.targetData = [];
      if (rows) {
        rows.forEach(row => {
          this.targetData.push(row);
        })
      }
    },
    // 搜索文章
    searchArticle() {

    },
    // 文章推荐页,每页数量调整时触发
    handleSizeChange(val) {
      this.page.limit = val
      this.searchArticle()
    },
    // 文章推荐页,页面跳转时触发
    handleCurrentChange(val) {
      this.page.offset = val
      this.searchArticle()
    },
    // 文章内容改变时触发
    changeContent(value, render) {
      this.writeForm.content = render
    },
    // 保存文章或者保存草稿
    setArticleInfo() {
      let article = {
        userID: 0,
        title: this.writeForm.title,
        abstract: this.writeForm.abstract,
        content: this.writeForm.content,
        status: 1,
        cover: "/image/20221122114139.jpg",
        categoryID: this.writeForm.categoryID,
      }
      let tags = this.writeForm.dynamicTags
      let recommendArticle = this.writeForm.recommendArticles

    },
    // 标签移除
    handleClose(tag) {
      this.writeForm.dynamicTags.splice(this.writeForm.dynamicTags.indexOf(tag), 1);
    },
    // 显示标签
    showInput() {
      this.tagVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.tagValue;
      if (inputValue) {
        if (!this.writeForm.dynamicTags.includes(inputValue)) {
          this.writeForm.dynamicTags.push(inputValue);
        }
      }
      this.tagVisible = false;
      this.tagValue = '';
    },
    handleAvatarSuccess(res, file) {
      this.writeForm.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 移除推荐文章
    removeTarget(item) {
      this.targetData.forEach(i => {
        if (item.id === i.id) {
          // 移除选中状态
          this.$refs.multipleTable.toggleRowSelection(i, false)
        }
      })
    },
    recommendArticlePageClose() {
      this.searchVal = ""
      this.targetData = []
      this.sourceData = []
    },
    showTargetData() {
      this.writeForm.recommendArticles = this.writeForm.recommendArticles.concat(this.targetData)
      this.dialogVisible = false
    },
    removeArticle(item) {
      for (let i = 0; i < this.writeForm.recommendArticles.length; i++) {
        if (this.writeForm.recommendArticles[i].id === item.id) {
          this.writeForm.recommendArticles.splice(i, 1)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.write-article-container {
  .article-form {

    .content-layout {
      /deep/ .el-input__inner {
        border: 0;
        padding: 0;
      }

      .title {
        font-size: 20px !important;
        margin-bottom: 10px;
      }

      .title, .abstract {
        position: relative;
        border-bottom: 2px solid #efefef;
      }

      .title:after {
        content: "";
        position: absolute;
        height: 2px;
        background: #F56C6C;
        width: 0;
        transition: 2s ease all;
        left: 0;
        bottom: -2px;
        border-radius: 2px;
      }

      .abstract:after {
        content: "";
        position: absolute;
        height: 2px;
        background: #409EFF;
        width: 0;
        transition: 2s ease all;
        left: 0;
        bottom: -2px;
        border-radius: 2px;
      }

      .title:hover:after, .abstract:hover:after {
        width: 100%;
        transition: 2s ease all;
      }

      .content {
        margin-top: 30px;
      }
    }

    .option-layout {
      margin-top: 30px;

      .opt-tag {
        .el-tag {
          margin-right: 10px;
        }

        .button-new-tag {
          height: 32px;
          line-height: 30px;
          padding-top: 0;
          padding-bottom: 0;
        }

        .input-new-tag {
          width: 80px;
          vertical-align: bottom;
        }
      }

      .opt-img {
        .avatar-uploader {
          /deep/ .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }

          /deep/ .el-upload:hover {
            border-color: #409EFF;
          }
        }

        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }

        .avatar {
          width: 178px;
          height: 178px;
          display: block;
        }
      }

      .opt-recommend {
        .add-article {
          .add-content {
            display: flex;

            .source-area {

              .search-area {
                padding: 10px;
                border: 1px solid #d0d9e0;
              }

              .result-area {
                margin-top: 20px;
                padding: 10px;
                border: 1px solid #d0d9e0;
              }
            }
          }
        }

        .target-area {
          padding: 10px;
          flex: 1;
          border: 1px solid #d0d9e0;

          .target-item {
            overflow: hidden;
            border-bottom: 1px solid #E8E8E8;
            height: 24px;
            line-height: 24px;
            padding: 2px;
            white-space: nowrap;
            text-overflow: ellipsis;

            .i-left {
              .title {
                color: #369;
                font-size: 12px;
              }
            }

            .i-right {
              a {
                color: SaddleBrown;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }

  .post-settings {
    width: 100%;
    height: 60px;

    .settings {
      position: fixed;
      height: 60px;
      line-height: 60px;
      width: 100%;
      background: var(--main-bg-color);
      z-index: 999;
      bottom: 0;
      left: 0;
    }

    .post-right {
      .btn {
        display: inline-block;
        width: 100px;
        height: 34px;
        line-height: 34px;
        border-radius: 17px;
        text-align: center;
        color: #fff;
        font-size: 14px;
      }

      .draft {
        background: linear-gradient(135deg, #60e464 10%, #5cb85b 100%);;
      }

      .push {
        margin-left: 20px;
        background: linear-gradient(135deg, #59c3fb 10%, #268df7 100%);;
      }
    }
  }

  .show {
    padding: 15px 30px;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 0 10px rgba(116, 116, 116, 0.08);
  }
}

/deep/ .v-note-wrapper {
  border: 0;

  .v-note-panel {
    .v-note-edit.divarea-wrapper {
      .content-input-wrapper {
        padding: 10px 0;
      }
    }
  }
}

/deep/ .el-dialog__body {
  padding: 0 20px;
}
</style>