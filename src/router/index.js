import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import LoginView from '../views/Login.vue'
import Layout from "../../layout/Layout.vue";
import UserView from '../views/User.vue';
const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: "/login",
    children:[
      {
        path: 'home',
        name: 'home',
        component: HomeView
      },
      {
        path: 'user',
        name: 'user',
        component: UserView
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
