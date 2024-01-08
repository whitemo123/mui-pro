import { createRouter, createWebHistory } from 'vue-router';
// 框架页面路由
import pages from './pages';
// 业务逻辑页面路由
import views from './views'

// 创建路由
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE),
  routes: [...pages, ...views]
})

export default router
