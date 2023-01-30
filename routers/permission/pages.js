import routerExclude from '@/routers/exclude'
import {
	permissionMap
} from './options'
import {
	invokeAuthorize,
	checkPermission
} from './core'

/**
 * 检测用户是否可访问目标页面
 * @param {String} pagePath 页面相对路径，即在 page.json 中定义的值。
 * @param {Function} callback 要执行的函数
 */
export function checkPagePermission(pagePath, callback) {
	console.log('+++checkPagePermission+++')
	if (process.env.NODE_ENV !== 'production') {
		console.log(`checkPagePermission [${pagePath}]`)
	}
	let authorized = false
	// 先校验登录
	let permission = permissionMap.LOGIN
	authorized = !routerExclude.login || !routerExclude.login.includes(pagePath) || checkPermission(permission)
	console.log('+++checkPagePermission+++', 'permission', permission, 'authorized', authorized, 'callback', callback)
	invokeAuthorize(permission, authorized, callback)
}

/**
 * 检查当前页面是否需要登录 是否不在 routerExclude 列表内
 * @param {Object} pagePath
 * @param {Object} callback
 */
export function checkPageNeedLogin(pagePath, callback) {
	console.log('+++checkPageNeedLogin+++')
	if (process.env.NODE_ENV !== 'production') {
		console.log(`checkPageNeedLogin [${pagePath}]`)
	}
	let authorized = false
	// 先校验登录
	let permission = permissionMap.LOGIN
	authorized = !routerExclude.login || routerExclude.login.includes(pagePath)
	return authorized
}
