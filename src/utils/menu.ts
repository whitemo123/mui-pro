import { RouteRecordRaw } from 'vue-router'
import config from "@/config";

// 拿到src目录下的所有vue文件
const modules = import.meta.glob('@/**/*.vue')


/**
 * 是否一级目录
 * @param row 数据
 * @returns 
 */
const isFirstlevelFolder = (row: any) => {
  if (row.menuType === 'M' && row.pid == 0) {
    return true
  }
  return false
}

/**
 * 是否多级目录
 * @param row 数据
 */
const isMultilevelFolder = (row: any) => {
  if (row.pid != 0 && row.menuType === 'M') {
    return true
  }
  return false
}

/**
 * 转化路由数据
 * @param menus 路由数据
 * @param first 首路由
 * @returns 
 */
export const formatRoutes = (menus: any = []) => {
  const menuConfig = config.menu;

  const resultRouters: RouteRecordRaw[] = []

  if (menus && !menus.length) return;
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]

    const path = menu[menuConfig.path],
      component = menu[menuConfig.component],
      name = menu[menuConfig.name],
      icon = menu[menuConfig.icon] || menu[menuConfig.meta][menuConfig.icon],
      children = menu[menuConfig.children],
      meta = menu[menuConfig.meta];

    const isChild = !!(children && children.length);

    const menuObj: RouteRecordRaw = {
      path,
      name,
      meta: {
        ...meta,
        icon
      },
      component: (() => {
        // 一级目录
        if (isFirstlevelFolder(menu)) {
          return modules['/src/views/layouts/default-layout.vue']
        }
        // 判断是否为多层路由
        if (isMultilevelFolder(menu)) {
          return modules['/src/views/layouts/page-layout.vue']
        }
        return modules[`/src/views${component}.vue`]
      })(),
      children: !isChild ? (() => {
        return []
      })() : (() => {
        // @ts-ignore
        return formatRoutes(children)
      })()
    }
    resultRouters.push(menuObj)
  }
  return resultRouters
}
