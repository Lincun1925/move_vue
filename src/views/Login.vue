<template>
  <div style="width: 100%; height: 100vh;background-color: cadetblue;overflow: hidden">
    <div style="width: 350px;margin: 150px auto;text-align: center">
      <div style="color: whitesmoke;font-size: 30px; text-align: center;font-weight: bolder;padding: 10px">欢迎登录
      </div>
      <div style="color: whitesmoke;font-size: 20px; text-align: center;font-weight: bolder;padding: 20px">Believe and
        Love Yourself
      </div>
      <el-form ref="form" :model="form" size="large" :rules="rules1">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="用户名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="密码" show-password clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="large" style="width: 150px; margin-left: 5%; font-weight: bold" type="primary"
                     @click="login">登录
          </el-button>
          <el-button style="width: 150px; font-weight: bold" type="success" @click="func1">注册</el-button>
        </el-form-item>
      </el-form>
      <div style="color: rgba(56,44,44,0.75);font-size: 15px; text-align: center;font-weight: bolder;padding: 3px">
        更多
      </div>
      <el-button type="warning" icon="el-icon-edit" circle @click="chatFunc"></el-button>
    </div>
    <div>
      <el-dialog title="注册页面" v-model="dialogVisible" width="100%">
        <el-form ref="formRegister" :model="formRegister" label-width="25%" :rules="rules2">
          <el-form-item prop="username" label="用户名">
            <el-input v-model="formRegister.username" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input v-model="formRegister.password" show-password clearable></el-input>
          </el-form-item>
          <el-form-item prop="status" label="权限">
            <el-radio v-model="formRegister.status" label="0">管理员</el-radio>
            <el-radio v-model="formRegister.status" label="1">普通用户</el-radio>
          </el-form-item>
          <el-form-item prop="nickName" label="昵称">
            <el-input v-model="formRegister.nickName" clearable></el-input>
          </el-form-item>
          <el-form-item prop="age" label="年龄">
            <el-input v-model="formRegister.age" clearable></el-input>
          </el-form-item>
          <el-form-item prop="sex" label="性别">
            <el-radio v-model="formRegister.sex" label="男">男</el-radio>
            <el-radio v-model="formRegister.sex" label="女">女</el-radio>
            <el-radio v-model="formRegister.sex" label="未知">未知</el-radio>
          </el-form-item>
          <el-form-item prop="address" label="地址">
            <el-input type="textarea" v-model="formRegister.address" maxlength="30" show-word-limit></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="formRegister.email" clearable>
              <template #suffix>
                <el-button v-model:disabled="disabled" text type="primary" plain @click="send">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="emailCode" label="验证码">
            <el-input v-model="formRegister.emailCode" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-left: 20%; width: 20%; text-align: center; font-weight: bold" type="success"
                       @click="register">注册
            </el-button>
            <el-button style="width: 20%; text-align: center; font-weight: bold" type="info"
                       @click="this.dialogVisible = false">取消
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Login",
  data() {
    return {
      form: {},
      chat: {},
      formRegister: {},
      dialogVisible: false,
      disabled: false,
      rules1: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      rules2: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请输入性别', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '请输入地址', trigger: 'blur'}
        ]
        , status: [
          {required: true, message: '请选择权限', trigger: 'blur'}
        ],
        nickName: [
          {required: true, message: '请输入昵称', trigger: 'blur'}
        ]
        , email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
        emailCode: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ],
        age: [
          {required: true, message: '请输入年龄', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    chatFunc() {
      request.get("/user/chat").then(res => {
        if (res.code === 0) {
          this.$message({
            type: "error",
            message: res.msg
          })
        } else {
          this.$messageBox({
            type: "success",
            message: res.data
          })
        }
      })
    },
    send() {
      this.disabled = true
      request.get("/user/sendMsg/" + this.formRegister.email).then(res => {
        if (res.code === 1) {
          this.$message({
            type: "success",
            message: "验证码发送成功"
          })
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    },
    register() {
      this.$refs['formRegister'].validate((valid) => {
        if (valid) {
          request.post("/user/register", this.formRegister).then(res => {
            if (res.code === 1) {
              sessionStorage.setItem("token", res.data.token)
              this.$message({
                type: "success",
                message: "注册成功，欢迎" + res.data.nickName
              })
              if (res.data.status === 0) {//管理员登录
                this.$router.push("/home")//登录成功进行页面跳转，进入主页
              } else {//普通用户
                this.$router.push("/user")
              }
            } else {
              this.$message({
                type: "error",
                message: res.msg
              })
            }
          })
        } else {
          this.$message({
            type: "error",
            message: "请输入完整信息"
          })
        }
      })

    },
    func1() {
      this.formRegister = {}
      this.formRegister.status = "1"
      this.formRegister.sex = "男"
      this.dialogVisible = true
      this.disabled = false
    },
    login() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          request.post("/user/login", this.form).then(res => {
            if (res.code === 1) {
              sessionStorage.setItem("token", res.data.token)
              this.$message({
                type: "success",
                message: "登录成功，欢迎" + res.data.nickName
              })
              if (res.data.status === 0) {//管理员登录
                this.$router.push("/home")//登录成功进行页面跳转，进入主页
              } else {//普通用户
                this.$router.push("/user")
              }
            } else {
              this.$message({
                type: "error",
                message: "请输入用户名或密码"
              })
            }
          })
        } else {
          this.$message({
            type: "error",
            message: "请输入用户名或密码"
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>