import router from '@/router'
import { useUserStore, useMenuStore } from '@/store'
import { getToken } from '@/utils/auth'
import config from '@/config'
import { useNProgress } from '@/hooks/useNProgress'
import { Base64 } from 'js-base64'

const { start, done } = useNProgress()

router.beforeEach(async (to, from, next) => {
  start()
  // 用户store
  const userStore = useUserStore()
  // 菜单store
  const menuStore = useMenuStore()

  // 白名单直接放行
  if (config.routerWhiteList.includes(to.name as string)) {
    next()
    return
  }

  // 跳转登录页
  if (to.path === '/login') {
    if (getToken()) {
      next({path: '/'})
      done()
    } else {
      next()
    }
    return
  }

  // 存在token
  if (getToken()) {
    if (!userStore.userInfo || !Object.keys(userStore.userInfo).length) {
      // 用户信息为空
      try {
        await userStore.getUserInfo()
      } catch(e) {
        await userStore.logOut()
        next({
          path: '/login',
          query: {
            url: Base64.encode(to.fullPath)
          },
          replace: true
        })
        done()
        return
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
  } else {
    next({
      path: '/login',
      query: {
        url: Base64.encode(to.fullPath)
      },
      replace: true
    })
    done()
  }
})

router.afterEach((to) => {
  document.title = to.meta.title as string || ''
  done()
})
