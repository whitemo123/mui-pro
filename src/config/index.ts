import { IConfig } from "./types";

const config: IConfig = {
  // 标题
  title: 'MUI-PRO',
  // logo(src地址)
  logo: '',
  // 项目唯一键(用于localStorage等)
  code: 'muipro',
  // 首页
  homePath: '/wel/index',
  // 接口超时时间
  apiTimeOut: 60 * 1000,
  // 请求头token
  authorization: 'Authorization',
  // 接口业务code白名单
  codeWhiteList: [0],
  // router白名单(注意：这里需要填写的是route.name的值)
  routerWhiteList: [],
  // 路由键映射关系
  menu: {
    path: 'path',
    name: 'name',
    component: 'component',
    children: 'children',
    meta: 'meta',
    title: 'title',
    icon: 'icon',
    keepAlive: 'keepAlive'
  }
}

export default config
