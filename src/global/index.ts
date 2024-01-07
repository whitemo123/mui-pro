import { App } from 'vue'

// === 样式 ===
import 'normalize.css'
import '@/assets/css/index.less'
// ======

// store
import store from '@/store'
// 路由
import router from '@/router'
// vue 错误监听
import error from './plugins/error'

export default (app: App) => {
  // store
  app.use(store)
  // 路由
  app.use(router)
  // vue 错误监听
  app.use(error)
}
