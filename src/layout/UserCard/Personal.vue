<template>
  <div class="personal-box">
    <div class="base-info">
      <div class="flex-between-center personal-title">
        <span>基本资料</span>
        <div>
          <el-button @click.prevent="edit" v-if="disabled" type="text">编辑</el-button>
          <el-button @click.prevent="save" v-else type="text">保存</el-button>
        </div>
      </div>
      <el-form ref="personalForm" :model="personalForm" label-position="left" label-width="80px" :disabled="disabled">
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="personalForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="用户id" prop="username">
          <el-input v-model="personalForm.username" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="personalForm.sex" :label="0">男</el-radio>
          <el-radio v-model="personalForm.sex" :label="1">女</el-radio>
        </el-form-item>
        <el-form-item label="个人简介" prop="desc">
          <el-input v-model="personalForm.desc"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Personal",
  data() {
    return {
      disabled: true,
      personalForm: {
        id: 1,
        username: "apple",
        nickname: "苹果",
        desc: "我不想介绍自己",
        sex: 0
      }
    }
  },
  methods: {
    edit() {
      this.disabled = false
    },
    save() {
      this.disabled = true
    }
  }
}
</script>

<style lang="less" scoped>
.personal-box {
  .personal-title {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ebeef5;
    margin-bottom: 20px;
    font-size: 14px;
    color: #999999;
  }
}
</style>