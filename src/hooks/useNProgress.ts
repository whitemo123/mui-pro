import NProgress from 'nprogress'
import type { NProgressOptions } from 'nprogress'
import 'nprogress/nprogress.css'

export const useNProgress = () => {
  NProgress.configure({ showSpinner: false } as NProgressOptions)

  /**
   * 开始加载
   */
  const start = () => {
    NProgress.start()
  }

  /**
   * 结束加载
   */
  const done = () => {
    NProgress.done()
  }

  return {
    start,
    done
  }
}
