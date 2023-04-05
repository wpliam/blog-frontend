<template>
  <el-dialog
      :visible.sync="clockDialog"
      width="400px"
      :show-close="false"
      :before-close="handleClose"
  >
    <div class="clock-header">
      <div>
        <svg-icon icon-class="already-clock" class-name="medium-svg"/>
      </div>
      <div class="clock-title">签到领取奖励</div>
    </div>
    <div class="clock-content">
      <div class="flex-between-center">
        <div class="flex center">
          <el-avatar :src="user.avatar" :size="20"></el-avatar>
          <span class="nickname ml05">{{ user.nickname }}</span>
        </div>
        <div class="grand">本月已签到<span class="grand-count">{{ monthClockNum }}</span>天</div>
      </div>

      <div>
        <div class="flex-between-center mt20">
          <div class="grand">连续签到奖励</div>
          <div class="grand">已连续签到 <span class="grand-count">{{ continuousClockNum }}</span> 天</div>
        </div>
        <ul class="flex-between-center mt10">
          <li class="flex-column-center" v-for="day in days">
            <div class="badg" :class="day.isClock?'confirm-points':'points'">
              <svg-icon icon-class="points"/>
              <div>+{{ day.points }}</div>
            </div>
            <div class="badg" :class="day.isClock?'confirm-experience':'experience'">
              <svg-icon icon-class="experience"/>
              <div>+{{ day.experience }}</div>
            </div>
            <div class="day" :class="day.isClock?'confirm-day':'day'">
              第{{ day.day }}天
            </div>
          </li>
        </ul>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {censusClockInfo} from "@/api/shared";
import {getUserInfo} from "@/api/user";

export default {
  name: "ClockCard",
  data() {
    return {
      clockDialog: true,
      monthClockNum: 0,
      continuousClockNum: 0,
      days: [],
      user: {}
    }
  },
  methods: {
    handleClose() {
      this.clockDialog = false
    },
    execQuery(uid) {
      censusClockInfo(uid).then(res => {
        if (res) {
          this.monthClockNum = res.monthClockNum
          this.continuousClockNum = res.continuousClockNum
          this.days = res.days
        }
      })
      getUserInfo(uid).then(res => {
        if (res) {
          this.user = res.user
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.clock-header {
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(41, 151, 247, .1);
  text-align: center;

  .clock-title {
    margin-top: 10px;
    font-size: 18px;
    color: #ff6f06;
  }
}

.grand {
  font-size: 12px;
  color: black;

}

.grand-count {
  color: #409eff;
  margin: 0 2px;
}

.clock-content {
  padding: 15px;

  .badg {
    text-align: center;
    border-radius: 4px;
    line-height: 1.44;
    font-weight: 400;
    margin: 2px;
    padding: 4px 12px;
    font-size: .8em;
    vertical-align: 0.1em;
    min-width: 1.6em;
  }

  .points {
    color: #18a52a;
    background-color: rgba(18, 185, 40, .1);
  }

  .confirm-points {
    background-color: #18a52a;
    color: white;
    font-weight: 400;
  }

  .experience {
    color: #e434e1;
    background-color: rgba(213, 72, 245, 0.1);
  }

  .confirm-experience {
    background-color: #e434e1;
    color: white;
    font-weight: 400;
  }

  .day {
    margin-top: 5px;
    font-size: 12px;
    color: #999;
  }

  .confirm-day {
    margin-top: 5px;
    font-size: 12px;
    font-weight: bold;
    color: #2997f7;
  }

  .confirm-day:before {
    content: "✅";
  }
}

/deep/ .el-dialog__header {
  padding: 0;
}

/deep/ .el-dialog__body {
  padding: 0;
}
</style>