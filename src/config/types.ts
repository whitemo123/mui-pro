export interface IMenu {
  path: string;
  name: string;
  component: string;
  children: string;
  meta: string;
  title: string;
  icon: string;
  keepAlive: string;
}

export interface IConfig {
  // 标题
  title: string;
  // logo
  logo: string;
  // 项目唯一键(用于localStorage等)
  code: string;
  // 首页
  homePath: string;
  // 接口超时时间
  apiTimeOut: number;
  // 请求头token
  authorization: string;
  // 接口业务code白名单
  codeWhiteList: number[];
  // 路由键映射关系
  menu: IMenu;
}
