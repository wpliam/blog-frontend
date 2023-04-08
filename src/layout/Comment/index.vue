<template>
  <div class="comment-container">
    <slot></slot>
    <div class="comment-box" ref="comment-box">
      <div class="comment-respond flex" ref="respond-box" v-if="hasLogin">
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
              <el-button type="primary" round class="send-comment" size="small" @click="addComment">发表评论
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <Logged v-else :title="`请登录后发表评论`"></Logged>
      <div class="msg-comments" ref="list-dom">
        <div class="comment-show" v-if="comments">
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
                      {{ root.createTime|timeLayout }}
                    </div>
                  </div>
                  <div class="comment-content">
                    {{ root.content }}
                  </div>
                  <div class="comment-footer">
                    <div class="msg-replay">
                      <a href="#" class="msg-like" @click.prevent="giveThumb(root.id)">
                        <span v-if="root.isLike">
                          <svg-icon icon-class="like-red"></svg-icon>
                          <span style="color: #d81e06"> {{ root.likes }}</span>
                        </span>
                        <span v-else>
                          <svg-icon icon-class="like"/>
                          <span> {{ root.likes }}</span>
                        </span>
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
                        {{ sub.createTime|timeLayout }}
                      </div>
                    </div>
                    <div class="comment-content">
                      <a href="#" class="i-user">@{{ sub.replyUser.nickname }}</a>
                      {{ sub.content }}
                    </div>
                    <div class="comment-footer">
                      <a class="msg-like" @click.prevent="giveThumb(sub.id)">
                        <span v-if="sub.isLike">
                          <svg-icon icon-class="like-red"></svg-icon>
                          <span style="color: #d81e06"> {{ sub.likes }}</span>
                        </span>
                        <span v-else>
                          <svg-icon icon-class="like"/>
                          <span> {{ sub.likes }}</span>
                        </span>
                      </a>
                      <a @click.prevent="respondMsg($event,root,sub)" class="msg-replay">
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

import Logged from "@/components/Logged";
import {addComment, getComment} from "@/api/comment";
import {localUserInfo} from "@/util/storage";
import {giveThumb} from "@/api/shared";

export default {
  name: "Comment",
  components: {Logged},
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
      comments: [],
      user: {},
      content: "",
      replyInfo: {}
    }
  },
  created() {
    let userInfo = localUserInfo()
    if (userInfo) {
      this.user = userInfo
    }
    this.getComment(this.articleID)
  },
  methods: {
    async getComment(articleID) {
      const res = await getComment(articleID);
      if (res.code === 0) {
        this.comments = res.data.comment
      } else {
        this.$message.error("获取评论失败" + res.msg)
      }
    },
    async addComment() {
      let comment = {
        parentID: this.replyInfo.parentID,
        content: this.content,
        articleID: this.articleID,
        replyCommentID: this.replyInfo.replyCommentID,
        replyUserID: this.replyInfo.replyUserID
      }
      const res = await addComment(comment);
      if (res.code === 0) {
        this.$message.success("评论添加成功")
        this.reload()
      } else {
        this.$message.error("评论失败 " + res.msg)
      }
    },
    async giveThumb(id) {
      const res = await giveThumb(id, 1);
      if (res.code === 0) {
        this.reload()
      } else {
        this.$message.error("点赞失败 " + res.msg)
      }
    },
    // 回复
    respondMsg(e, root, sub) {
      if (!this.hasLogin) {
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