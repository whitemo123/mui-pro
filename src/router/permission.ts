import router from '@/router'
import { useUserStore, useMenuStore } from '@/store'
import { getToken } from '@/utils/auth'

router.beforeEach(async (to, from, next) => {
  // 用户store
  const userStore = useUserStore()
  // 菜单store
  const menuStore = useMenuStore()

  // 存在token
  if (getToken()) {
    if (to.path === '/login') {
      return next({path: '/'})
    } else {
      if (!userStore.userInfo || !Object.keys(userStore.userInfo).length) {
        // 用户信息为空
        try {
          await userStore.getUserInfo()
        } catch(e) {
          await userStore.logOut()
          return next({path: '/login'})
        }
      }
      if (!menuStore.added) {
        await menuStore.getServerMenus()
        menuStore.menus.forEach(item => {
          router.addRoute(item)
        })
        return next({...to, replace: true})
      }
      next()
    }
  } else {
    next('/login')
  }
})
