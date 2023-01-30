import { navigateTo, redirectTo } from '@/shared'
import routerAlias from '../alias'

/**
 * 重定向到登录 主要用于接口跳轉
 * @param {String} redirectPagePath=首页 登录成功后跳转的地址
 */
export function redirectToLogin() {
  redirectTo(routerAlias.LOGIN)
}

/**
 * 跳转到登录 主要用于路由跳转
 * @param {String} redirectPagePath=首页 登录成功后跳转的地址
 */
export function navigateToLogin() {
  navigateTo(routerAlias.LOGIN)
}
