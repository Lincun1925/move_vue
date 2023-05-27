<template>
  <div>
    <el-row class="tac">
      <el-col :span="12">
<!--        <h5 class="mb-2">Default colors</h5>-->
        <el-menu
            :default-openeds="['1']"
            style="width: 180px;min-height: calc(100vh - 50px);"
            default-active="1"
            class="el-menu-vertical-demo"
        >
          <el-sub-menu index="0">
            <template #title>
              <el-icon><icon-menu /></el-icon>
              <span>微服务</span>
            </template>
            <el-menu-item index="1">
              <el-icon><icon-menu /></el-icon>
              <span>车票管理系统</span>
            </el-menu-item>
          </el-sub-menu>

        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Aside"
}
</script>

<style scoped>

</style>