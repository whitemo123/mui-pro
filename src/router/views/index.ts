import { RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layouts/default-layout.vue'

const views: RouteRecordRaw[] = [
  {
    path: '/wel',
    name: 'Wel',
    redirect: '/wel/index',
    component: DefaultLayout,
    children: [
      {
        path: 'index',
        name: 'WelIndex',
        meta: {
          title: '首页'
        },
        component: () => import('@/views/wel/index.vue')
      }
    ]
  }
]

export default views

