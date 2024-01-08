import { Message as message } from '@arco-design/web-vue';
import { useRouter } from 'vue-router';
import { useNProgress } from '@/hooks/useNProgress';
import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';
import config from '@/config';
import type { IFetchRequestOptions } from "./types";

export default class FetchRequest {

  // 请求配置
  private requestOptions!: IFetchRequestOptions;

  /**
   * 构造函数
   * @param options 初始化配置
   */
  constructor(options: IFetchRequestOptions) {
    this.requestOptions = { ...options }

    if (!options.timeOut) {
      // 超时时间默认10分钟
      this.requestOptions.timeOut = config.apiTimeOut
    }
  }

  /**
   * 判断http状态码是否正常
   * @param response 返回对象
   * @returns
   */
  _validateHttpError(response: Response) {
    if (response.ok) {
      return response
    }
    throw response
  }

  /**
   * 校验业务是否成功
   * @param response 返回对象
   * @param reject 拒绝
   * @returns 成功数据
   */
  async _validateSuccess(response: Response, reject: (reason?: any) => void) {
    // 返回数据类型
    const resType = response.headers.get('content-type')
    // res 返回数据
    let res;

    if (!resType || resType === 'application/json') {
      // json返回
      res = await response.clone().json()
    } else if (resType === 'application/octet-stream') {
      res = await response.clone().blob()
    }

    // code不为0
    if (resType === 'application/json' && (!res || !config.codeWhiteList.includes(res.code))) {
      if (res && res.code === 401) {
        const router = useRouter()
        const userStore = useUserStore()
        userStore.logOut().then(() => router.replace({path: '/login'}))
      }
      message.error(res.message)
      reject(res)
      return;
    }

    return { data: res, type: resType }
  }

  /**
   * 处理异常错误
   * @param error 错误信息
   * @param reject 拒绝
   */
  _processError(error: any, reject: (reason?: any) => void) {
    message.error('网络连接失败，请稍后重试')
    reject(error)
  }

  /**
   * request请求
   * @param url 请求地址
   * @param init 请求配置
   */
  request<T = any>(url: string, init: RequestInit): Promise<T> {
    return new Promise((resolve, reject) => {
      const { start, done } = useNProgress()
      // 接口地址
      const apiUrl = this.requestOptions.base + url;
      let headers: Record<string, any> = {};

      const token = getToken()

      // 如果有token
      if (token) {
        headers[config.authorization] = `${token}`
      }

      // 请求头合并
      if (init.headers && this.requestOptions.headers) {
        headers = Object.assign(headers, this.requestOptions.headers, init.headers);
      } else {
        headers = Object.assign(headers, (init.headers || this.requestOptions.headers || {}))
      }

      start()
      // 发起请求
      fetch(apiUrl, {
        ...this.requestOptions,
        ...init,
        headers
      })
      .then(this._validateHttpError)
      .then(response => this._validateSuccess(response, reject))
      .then((response: any) => {
        if (response.type === 'application/json') {
          resolve(response.data.data as T)
        } else if (response.type === 'application/octet-stream') {
          resolve(response.data as any)
        }
      })
      .catch(error => this._processError(error, reject))
      .finally(() => {
        done()
      })
    })
  }

  /**
   * http get请求
   * @param url 请求地址
   * @param data 请求数据
   * @returns Promise对象
   */
  get<T = any>(url: string, data?: Record<string, any>): Promise<T> {
    const body = data ? '?' + new URLSearchParams(data).toString() : ''

    return this.request(url + body, {
      method: 'GET'
    })
  }

  /**
   * http post x-www-form-urlencoded请求
   * @param url 请求地址
   * @param data 请求数据
   * @returns Promise对象
   */
  postW<T = any>(url: string, data?: Record<string, any>): Promise<T> {
    const body = data ? new URLSearchParams(data) : ''

    return this.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    })
  }

  /**
   * http post json请求
   * @param url 请求地址
   * @param data 请求数据
   * @returns Promise对象
   */
  postJ<T = any>(url: string, data?: any): Promise<T> {
    let body

    if ((typeof data === 'object') && (data !== null) && (Array.isArray(data) || !(data instanceof Array))) {
      body = JSON.stringify(data)
    } else {
      body = data
    }

    return this.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
  }
}
