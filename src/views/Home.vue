<template>
  <div style="padding: 10px">
    <!--    功能区域-->
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add">新增</el-button>
      <!--      <json-excel class="export-excel-wrapper" style="margin-left: 10px"-->
      <!--                  :data="tableData" :fields="jsonFields" name="res.xls" type="xls" >-->
      <!--        <el-button type="primary">导出</el-button>-->
      <!--      </json-excel>-->
      <el-button type="success" @click="exportToExcel">导出</el-button>
    </div>
    <!--    搜索区域-->
    <div>
      <el-input type="string" v-model="search" placeholder="请输入列车到达站" style="width: 20%" clearable/>
      <el-button type="primary" style="margin-left: 10px" @click="load">查询</el-button>
    </div>
    <el-table ref="tableData" :data="tableData" border stripe style="margin-top: 10px" fit="false">
      <el-table-column prop="id" label="ID" sortable/>
      <el-table-column prop="start" label="始发站"/>
      <el-table-column prop="middle" label="经停站"/>
      <el-table-column prop="end" label="到达站"/>
      <el-table-column prop="stock" label="剩余票数"/>
      <el-table-column prop="startTime" label="发车时间"/>
      <el-table-column prop="num" label="班车频次"/>
      <el-table-column prop="capacity" label="载客容量"/>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="确定删除?" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 10px 0">
      <el-pagination
          v-model:current-page="pageNum"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 20]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
      <el-dialog title="提示" v-model="dialogVisible" width="30%">
        <el-form ref="form" :model="form" label-width="120px" :rules="rules">
          <el-form-item label="始发站" prop="start">
            <el-input v-model="form.start" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="经停站" prop="middle">
            <el-input v-model="form.middle" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="到达站" prop="end">
            <el-input v-model="form.end" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="票数" prop="stock">
            <el-input v-model="form.stock" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="发车时间" prop="startTime">
            <!--            <el-input v-model="form.startTime" style="width: 80%"></el-input>-->
            <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期和时间"
                            style="width: 80%"></el-date-picker>
          </el-form-item>
          <el-form-item label="班车频次" prop="num">
            <el-input v-model="form.num" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="载客容量" prop="capacity">
            <el-input v-model="form.capacity" style="width: 80%"></el-input>
          </el-form-item>
          <!--          <el-form-item label="性别">-->
          <!--            <el-radio v-model="form.sex" label="男">男</el-radio>-->
          <!--            <el-radio v-model="form.sex" label="女">女</el-radio>-->
          <!--            <el-radio v-model="form.sex" label="未知">未知</el-radio>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="地址">-->
          <!--            <el-input type="textarea" v-model="form.address" style="width: 80%"></el-input>-->
          <!--          </el-form-item>-->
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import request from "@/utils/request";
import downloadExcel from "vue-json-excel";

export default {
  name: 'Home',
  components: {
    downloadExcel
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      request.get("/car/list1", {
        params: {
          search: this.search,
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    add() {
      this.dialogVisible = true
      this.form = {}
    },
    save() {
      this.$refs['form'].validate(valid => {
            if (valid) {
              if (this.form.id) {//更新
                request.put("/car", this.form).then(res => {
                  console.log(res)
                  if (res.code === 1) {
                    this.$message({
                      type: "success",
                      message: "更新成功"
                    })
                  } else {
                    this.$message({
                      type: "error",
                      message: res.msg
                    })
                  }
                  this.load() //刷新表格数据
                  this.dialogVisible = false //关闭弹窗
                })
              } else {//新增
                request.post("/car", this.form).then(res => {
                  console.log(res)
                  if (res.code === 1) {
                    this.$message({
                      type: "success",
                      message: "新增成功"
                    })
                  } else {
                    this.$message({
                      type: "error",
                      message: res.msg
                    })
                  }
                  this.load() //刷新表格数据
                  this.dialogVisible = false //关闭弹窗
                })
              }
            } else {
              this.$message({
                type: "error",
                message: "请输入完整信息"
              })
            }
          }
      )
    },
    handleSizeChange() { //改变当前每页个数
      this.load()
    }
    ,
    handleCurrentChange() { //改变当前页码
      this.load()
    }
    ,
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
    }
    ,
    handleDelete(id) {
      console.log(id)
      request.delete("/car/" + id).then(res => {
        if (res.code === 1) {
          this.$message({
            type: "success",
            message: "删除成功"
          })
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
        this.load() //重新加载删除后的数据
      })
    },
    exportToExcel() {
      location.href = "http://"+"localhost"+":9090/user/export";
    }
  },
  data() {
    return {
      // jsonFields: {
      //   ID: "id",
      //   始发站: "start",
      //   经停站: "middle",
      //   到达站: "end",
      //   票数: "stock",
      //   发车时间: "startTime",
      //   班车频次: "num",
      //   载客容量: "capacity"
      // },
      rules: {
        start: [
          {required: true, message: '请输入始发站', trigger: 'blur'}
        ],
        middle: [
          {required: true, message: '请输入经停站', trigger: 'blur'}
        ],
        end: [
          {required: true, message: '请输入到达站', trigger: 'blur'}
        ],
        stock: [
          {required: true, message: '请输入票数', trigger: 'blur'}
        ],
        startTime: [
          {required: true, message: '请输入发车时间', trigger: 'blur'}
        ],
        num: [
          {required: true, message: '请输入班车频次', trigger: 'blur'}
        ],
        capacity: [
          {required: true, message: '请输入载客容量', trigger: 'blur'}
        ]
      },
      form: {},
      dialogVisible: false,
      total: 0,
      pageNum: 1,
      pageSize: 10,
      search: '',
      tableData: [],
    }
  }
}
</script>
