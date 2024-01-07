import { RouteRecordRaw, Router } from "vue-router";
import { useTagsStore } from "@/store";
import config from "@/config";

// 拿到src目录下的所有vue文件
const modules = import.meta.glob('../**/**/*.vue')

let router: Router;

const install = (r: Router) => {
  router = r;

  // @ts-ignore
  router.$router = {
    /**
     * 设置标题
     * @param title 
     */
    setTitle: (title: string) => {
      document.title = title || ''
    },
    /**
     * 删除tag
     * @param value 
     */
    closeTag: (value: any) => {
      const tagsStore = useTagsStore()
      let tag = value || tagsStore.tag;
      if (typeof value === 'string') {
        tag = tagsStore.tagList.find((ele: any) => ele.fullPath === value)
      }
      tagsStore.delTag(tag)
    },
    /**
     * 转化路由数据
     * @param menus 路由数据
     * @param first 首路由
     * @returns 
     */
    formatRoutes: (menus: any = [], first: boolean) => {
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
            if (first) {
              return modules['../layouts/default-layout.vue']
            }
            // 判断是否为多层路由
            if (isChild && !first) {
              return modules['../layouts/page-layout.vue']
            }
            return modules[`../${component}.vue`]
          })(),
          redirect: (() => {
            if (!isChild && first) return `${path}`
            else return '';
          })(),
          children: !isChild ? (() => {
            if (first) {
              menu[menuConfig.path] = `${path}`
              return [{
                component: modules[`../${component}.vue`],
                name,
                path: '',
                meta
              }]
            }
            return []
          })() : (() => {
            // @ts-ignore
            return this.formatRoutes(children, false)
          })()
        }
        resultRouters.push(menuObj)
      }
      if (first) {
        resultRouters.forEach((ele) => router.addRoute(ele))
      } else {
        return resultRouters
      }
    }
  }
}

export default {
  install
}
