<template>
  <div style="padding: 10px">
    <!--    功能区域-->
    <div style="margin: 10px 0">
      <el-button type="success" @click="my">我的车票</el-button>
      <el-input type="string" v-model="search1" placeholder="请输入目的地" style="width: 10%; margin-left: 10px"
                clearable/>
      <el-input type="string" v-model="search2" placeholder="请输入起点" style="width: 10%; margin-left: 10px"
                clearable/>
      <el-input type="string" v-model="search3" placeholder="请输入中转站" style="width: 10%; margin-left: 10px"
                clearable/>
      <el-button type="primary" style="margin-left: 10px" @click="load">查询</el-button>
    </div>
    <el-table :data="tableData" border stripe style="margin-top: 10px" fit="false">
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
          <el-popconfirm title="确定购买?" @confirm="buy(scope.row.id)">
            <template #reference>
              <el-button size="mini" type="danger">购买车票</el-button>
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
      <el-dialog title="我的车票" v-model="dialogVisible" width="50%">
        <el-table :data="myData" border stripe >
          <el-table-column prop="start" label="始发站"/>
          <el-table-column prop="middle" label="经停站"/>
          <el-table-column prop="end" label="到达站"/>
          <el-table-column prop="startTime" label="发车时间"/>
          <el-table-column prop="createTime" label="购票时间"/>
          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              <el-button type="primary" size="mini" @click="out(scope.row.id)">退票</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import request from "@/utils/request";

export default {
  name: 'User',
  components: {},
  created() {
    this.load()
  },
  methods: {
    out(carId){
      request.delete("/orders/"+carId).then(res=>{
        if (res.code === 1) {
          this.$message({
            type: "success",
            message: "退票成功"
          })
          this.my()
          this.load()
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    },
    load() {
      request.get("/car/list2", {
        params: {
          search1: this.search1,
          search2: this.search2,
          search3: this.search3,
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    my() {
      this.dialogVisible = true
      this.myData = []
      request.get("/orders").then(res=>{
        this.myData = res.data
        if (res.code===0){
          this.$message({
            type: "info",
            message: res.msg
          })
        }
      })
    },
    handleSizeChange() { //改变当前每页个数
      this.load()
    },
    handleCurrentChange() { //改变当前页码
      this.load()
    },
    buy(id) {
      request.get("/orders/"+ id).then(res=>{
        if (res.code === 1) {
          this.$message({
            type: "success",
            message: "购票成功"
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

  },
  data() {
    return {
      form: {},
      dialogVisible: false,
      total: 0,
      pageNum: 1,
      pageSize: 10,
      search1: '',
      search2: '',
      search3: '',
      tableData: [],
      myData: []
    }
  }
}
</script>
