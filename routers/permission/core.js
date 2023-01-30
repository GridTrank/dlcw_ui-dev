import { navigateToLogin } from '@/routers'
import { setAuthCallback } from '@/storage'
import { permissionMap } from './options'
import store from '@/store'

// 检测是否有权限
export function checkPermission(permission) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`checkPermission [${permission}]`)
  }
  if (permission === permissionMap.LOGIN) {
    // return getApp().$store.getters.isLogged
    return store.getters.isLogged
  }
}

/**
 * 授权回调
 * @param {String} permission 授权类型 LOGIN 登录 PHONE 手机号 TEACHER 老师 STUDENT 学生
 * @param {Boolean} authorized 是否允许登录  true 允许 false 反之
 * @param {String} pagePath 需要跳转的页面
 * @param {Function} callback 允许登录的授权回调
 */
export function invokeAuthorize(permission, authorized, callback) {
  if (authorized) {
    callback && callback()
  } else {
    if (permission === permissionMap.LOGIN) {
      setAuthCallback(callback)
      navigateToLogin()
    }
  }
}
