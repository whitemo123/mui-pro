import { RouteRecordRaw } from 'vue-router'

// 框架页面路由
const pages: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/index.vue'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/404',
    component: () => import( /* webpackChunkName: "page" */ '@/pages/error/404.vue'),
    name: '404',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/500',
    component: () => import( /* webpackChunkName: "page" */ '@/pages/error/500.vue'),
    name: '500',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/',
    redirect: '/wel'
  }
]

export default pages

