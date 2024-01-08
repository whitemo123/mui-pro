import FetchRequest from "./request"

/**
 * 业务http请求器
 */
export const webRequest = new FetchRequest({
  base: '/api'
});
