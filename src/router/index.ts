import { createRouter, createWebHistory } from 'vue-router';
// 框架页面路由
import pages from './pages';
// 业务逻辑页面路由
import views from './views'

import RouterUtil from './util';

// 创建路由
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE),
  routes: [...pages, ...views]
})

RouterUtil.install(router)

export default router
