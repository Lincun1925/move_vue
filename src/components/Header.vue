<template>
  <div style="height: 80px;line-height: 50px;border-bottom:1px solid #ccc;display: flex">
    <div style="width: 500px;padding-left: 30px;padding-top: 10px;
    font-size:x-large;font-weight: bold;color: darkslateblue">
      <span>当前时间：{{ newTime }}</span>
    </div>
    <div style="flex: 1"></div>
    <div style="width: 250px;padding-top: 25px">
      <el-dropdown>
    <span class="el-dropdown-link" style="font-size: x-large">
      当前用户：{{ myInformation.nickName }}
      <el-icon class="el-icon--right">
        <arrow-down/>
      </el-icon>
    </span>
        <template #dropdown>
          <el-dropdown-menu style="width: 100px; text-align: center">
            <el-dropdown-item @click="show" style="font-size: large">个人信息</el-dropdown-item>
            <el-dropdown-item @click="out" style="font-size: large">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Header",
  mounted() {
    this.getNowTime();
    clearInterval(myTimeDisplay);
    var myTimeDisplay = setInterval(() => {
      this.getNowTime();//每秒更新一次时间
    }, 1000);
  },
  created() {
    request.get("/user/information").then(res => {
      this.myInformation = res.data
    })
  },
  methods: {
    getNowTime() {
      var date = new Date();
      var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' '
          + date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds();
      this.newTime = time;
    },
    show() {
      if (this.myInformation.status === 1) {
        var user = "普通用户"
      } else {
        var user = "管理员"
      }
      this.$message({
        type: "info",
        message: "用户名:（" + this.myInformation.username + "）密码:（" +
            this.myInformation.password + "）邮箱:（" +
            this.myInformation.email + "）" + "身份:（" + user + "）"
      })
    },
    out() {
      request.get("/user/out").then(res => {
        if (res.code === 1) {
          this.$message({
            type: "success",
            message: "退出成功"
          })
        } else {
          this.$message({
            type: "error",
            message: "退出失败"
          })
        }
      })
      this.$router.push('/login')
    }
  },
  data() {
    return {
      myInformation: [],
      newTime: ""
    }
  }

}
</script>

<style scoped>

</style>