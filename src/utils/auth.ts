import config from '@/config'

// token键
const tokenKey = `${config.code}-token`;

/**
 * 存储token
 * @param token token
 */
export const setToken = (token: string) => {
  window.localStorage.setItem(tokenKey, token)
}

/**
 * 获取token
 * @returns token
 */
export const getToken = (): string => {
  return window.localStorage.getItem(tokenKey) || ''
}

/**
 * 移除token
 */
export const delToken = () => {
  window.localStorage.removeItem(tokenKey)
}
