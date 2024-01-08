import { ref } from 'vue';
import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { getMenuApi } from '@/apis/core';
import { formatRoutes } from '@/utils/menu'

export const useMenuStore = defineStore('menu', () => {
  // 已经添加
  const added = ref(false)

  // menu数组
  const menus = ref<RouteRecordRaw[]>([])

  // 菜单收缩
  const collapsed = ref(false)

  /**
   * 设置菜单收缩状态
   * @param status 收缩状态
   */
  const setCollapsed = (status: boolean) => {
    collapsed.value = status;
  }

  /**
   * 设置菜单
   * @param data 
   */
  const getServerMenus = () => {
    return new Promise(resolve => {
      getMenuApi().then(e => {
        const arr = formatRoutes(e);
        menus.value = arr as RouteRecordRaw[];
        added.value = true
        resolve(null)
      })
    })
  }

  return {
    collapsed,
    added,
    menus,
    getServerMenus,
    setCollapsed
  }
})
