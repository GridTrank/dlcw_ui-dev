import {
	checkPermission,
	invokeAuthorize,
	checkRolePermission
} from './core'
import {
	permissionMap
} from './options'
import {
	isBool,
	isStr,
	isArray
} from '@/shared'

/**
 * 检测用户是否有操作的权限
 * @param {String | Array} permission 权限名称
 * @param {Function} callback 要执行的函数
 * @param {Object | Boolean} options 其他选项，支持传 Boolean 值，即 options.exec 的值。
 * @param {Boolean} options.exec 授权成功后是否自动执行回调函数，默认为 false
 */
export function checkActionPermission(
	permission,
	callback,
	options = {
		exec: true
	}
) {
	if (isBool(options)) {
		options = {
			exec: options
		}
	}
	if (process.env.NODE_ENV !== 'production') {
		console.log(`checkActionPermission [${permission}]`)
	}
	// 手机号权限校验的前提是已登录，所以检测手机号需要先检测登录状态。
	let authorized = false
	if (isStr(permission)) {
		if (permission === permissionMap.LOGIN) {
			authorized = checkPermission(permissionMap.LOGIN)
		}
	}
	invokeAuthorize(permission, authorized, authorized || options.exec ? callback : null)
}
