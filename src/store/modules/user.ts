import { ref } from 'vue'
import { defineStore } from 'pinia';
import { useTagsStore } from '..';
import { loginApi, getUserInfoApi } from '@/apis/core';
import { delToken, setToken } from '@/utils/auth';
import { ILoginData } from '@/apis/core/types';

export const useUserStore = defineStore("user", () => {
  const tagsStore = useTagsStore()

  // 用户信息
  const userInfo = ref<any>({})

  /**
   * 登录
   * @param form 表单数据 
   * @returns 
   */
  const login = (form: ILoginData) => {
    return new Promise(resolve => {
      loginApi(form).then(e => {
        setToken(`Bearer ${e}`)
        resolve(null)
      })
    })
  }

  /**
   * 获取用户信息
   * @returns 
   */
  const getUserInfo = () => {
    return new Promise(resolve => {
      getUserInfoApi().then(e => {
        userInfo.value = e;
        resolve(null)
      })
    })
  }

  /**
   * 退出登录
   */
  const logOut = () => {
    return new Promise(resolve => {
      tagsStore.delAllTag()
      delToken()
      resolve(null)
    })
  }

  return {
    userInfo,
    getUserInfo,
    login,
    logOut
  }
})
