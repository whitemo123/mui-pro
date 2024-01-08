import { webRequest } from "@/request";
import type { ILoginData, IUserInfo } from "./types";

/**
 * 登录接口
 * @param data 登录表单
 * @returns
 */
export const loginApi = (data: ILoginData) => webRequest.get<string>('/card/admin/login', data)

/**
 * 获取用户信息
 * @returns
 */
export const getUserInfoApi = () => webRequest.get<IUserInfo>('/card/admin/getAccountInfo')

/**
 * 获取菜单列表
 * @returns
 */
export const getMenuApi = () => webRequest.get('/card/admin/getMenuTree')
