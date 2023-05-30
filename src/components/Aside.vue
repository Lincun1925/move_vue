<template>
  <div>
    <el-row class="tac">
      <el-col :span="12">
        <!--        <h5 class="mb-2">Default colors</h5>-->
        <el-menu
            :default-openeds="['1']"
            style="width: 200px;min-height: calc(100vh - 50px);"
            default-active="1"
            class="el-menu-vertical-demo"
        >
          <el-sub-menu index="0">
            <template #title>
              <el-icon>
                <icon-menu/>
              </el-icon>
              <span>今日热搜</span>
            </template>
            <el-menu-item v-for="(n,i) in news" :key="i" index="i">
              <el-icon>
                <icon-menu/>
              </el-icon>
              <!--              <span v-for="(n,index) in news" :key="index" @click="goToUrl(urls[index])">{{ n }}</span>-->
              <span style="font-size: small" @click="goToUrl(urls[i])">{{news[i]}}</span>
            </el-menu-item>
<!--            <el-menu-item index="2">-->
<!--              <el-icon>-->
<!--                <icon-menu/>-->
<!--              </el-icon>-->
<!--              &lt;!&ndash;              <span v-for="(n,index) in news" :key="index" @click="goToUrl(urls[index])">{{ n }}</span>&ndash;&gt;-->
<!--              <span style="font-size: small" @click="goToUrl(urls[1])">{{news[1]}}</span>-->
<!--            </el-menu-item>-->
          </el-sub-menu>

        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Aside",
  created() {
    request.get("/user/news").then(res => {
      const data = JSON.parse(res.data);
      this.news = Object.keys(data);
      this.urls = Object.values(data);
    })
  },
  methods: {
    goToUrl(url) {
      window.location.href = url;
    }
  },
  data() {
    return {
      news: [],
      urls: []
    }
  }
}
</script>

<style scoped>

</style>