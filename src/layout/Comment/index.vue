<template>
  <div class="comment-container">
    <slot></slot>
    <div class="comment-box" ref="comment-box">
      <div class="comment-respond flex" ref="respond-box" v-if="isLogin">
        <div class="comment-user" v-if="!isRespond">
          <el-avatar :src="user.avatar" fit="cover"></el-avatar>
        </div>
        <div class="comment-area">
          <div class="comment-text">
            <el-input
                type="textarea"
                :rows="3"
                placeholder="说点什么吧..."
                v-model="content"
            >
            </el-input>
          </div>
          <div class="comment-ctrl flex-between-center">
            <div class="comment-tips-left"></div>
            <div class="comment-tips-right">
              <el-button type="info" round v-show="isRespond" @click.prevent="removeRespond" size="small">取消回复
              </el-button>
              <el-button type="primary" round class="send-comment" size="small" @click="">发表评论
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="msg-comments" ref="list-dom">
        <div class="comment-show" v-if="comments.length > 0">
          <ul>
            <li class="comment-item" v-for="(root,index) in comments" :key="root.id">
              <div class="root-comment flex">
                <div class="comment-avatar">
                  <el-avatar :src="root.user.avatar" fit="cover" :size="40"></el-avatar>
                </div>
                <div class="comment-info">
                  <div class="comment-header flex-between-center">
                    <a href="#" class="i-user">{{ root.user.nickname }}</a>
                    <div class="i-time">
                      {{ root.createTime }}
                    </div>
                  </div>
                  <div class="comment-content">
                    {{ root.content }}
                  </div>
                  <div class="comment-footer">
                    <div class="msg-replay">
                      <a href="#" class="msg-like">
                        <svg-icon icon-class="like"/>
                        顶
                        <span v-if="root.likes">({{ root.likes }})</span>
                      </a>
                      <a href="#" @click.prevent="respondMsg($event,root)">
                        <svg-icon icon-class="message"/>
                        回复
                        <span v-if="root.subComment">({{ root.subComment.length }})</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <ul>
                <li v-for="(sub,index) in root.subComment" :key="sub.id" class="sub-comment-item flex">
                  <div class="comment-avatar">
                    <el-avatar :src="sub.user.avatar" fit="cover" :size="30"></el-avatar>
                  </div>
                  <div class="comment-info">
                    <div class="comment-header flex-between-center">
                      <a href="#" class="i-user">{{ sub.user.nickname }}</a>
                      <div class="i-time">
                        {{ sub.createTime }}
                      </div>
                    </div>
                    <div class="comment-content">
                      <a href="#" class="i-user">@{{ sub.replyUser.nickname }}</a>
                      {{ sub.content }}
                    </div>
                    <div class="comment-footer">
                      <a href="#" class="msg-like">
                        <svg-icon icon-class="like"/>
                        顶
                      </a>
                      <a href="#" @click.prevent="respondMsg($event,root,sub)" class="msg-replay">
                        <svg-icon icon-class="message"/>
                        回复
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <el-empty v-else description="暂无评论"></el-empty>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Comment",
  inject: ["reload"],
  props: {
    articleID: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isRespond: false,
      isLogin: true,
      user: {},
      content: "",
      comments: [
        {
          user: {
            nickname: "apple",
            avatar: "/image/avatar.jpg"
          },
          content: "测试评论内容",
          createTime: "2002-12-12 12:12:12"
        }
      ],
      replyInfo: {}
    }
  },
  created() {
  },
  methods: {
    setCommentInfo() {
      let comment = {
        parentID: this.replyInfo.parentID,
        content: this.content,
        articleID: this.articleID,
        status: 1,
        replyCommentID: this.replyInfo.replyCommentID,
        replyUserID: this.replyInfo.replyUserID
      }
      this.reload()
    },
    // 回复
    respondMsg(e, root, sub) {
      if (!this.isLogin) {
        this.openLogin()
        return
      }
      this.replyInfo.parentID = root.id
      this.replyInfo.replyUserID = root.user.id
      this.replyInfo.replyCommentID = root.id
      if (sub) {
        this.replyInfo.replyCommentID = sub.id
        this.replyInfo.replyUserID = sub.user.id
      }
      e.currentTarget.parentNode.appendChild(this.$refs["respond-box"])
      this.isRespond = true
    },
    //取消回复
    removeRespond() {
      this.replyInfo = {}
      this.isRespond = false
      this.$refs["comment-box"].insertBefore(this.$refs["respond-box"], this.$refs["list-dom"])
    }
  }
}
</script>

<style lang="less" scoped>
.comment-container {
  .comment-box {
    background: white;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 0 10px rgba(116, 116, 116, 0.08);
    overflow: hidden;

    .comment-respond {
      width: 100%;
      margin-top: 10px;

      .comment-user {
        margin-right: 5px;
      }

      .comment-area {
        width: 100%;

        .comment-ctrl {
          margin-top: 8px;
        }
      }
    }

    .msg-comments {
      margin-top: 30px;

      .comment-show {
        .comment-item {
          width: 100%;
          vertical-align: top;
          padding: 10px 0;
          border-bottom: 1px solid #efefef;

          .sub-comment-item {
            margin-left: 40px;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid #efefef;
          }

          .comment-avatar {
            margin-right: 8px;
          }

          .comment-info {
            flex: 1;

            .i-user {
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              cursor: pointer;
              font-weight: 700;
              color: #369;
              font-size: 16px;
            }


            .i-time {
              font-size: 14px;
              color: #999;
            }

            .comment-content {
              margin: 5px 0;
              font-size: 14px;
              color: #303133;
            }

            .comment-footer {
              a {
                font-size: 12px;
                color: #999;
                margin-right: 8px;
              }
            }
          }
        }
      }
    }
  }
}
</style>