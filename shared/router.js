/**
 * 路由与页面跳转
 * 简化传参或增强实现，参数基本与标准 API 一致。若存在差异，会在当前方法中说明。
 * 参考文档：https://uniapp.dcloud.io/api/router?id=navigateto
 */
import routerAlias from '@/routers/alias.js'
import {
	checkPagePermission
} from '@/routers'
import {
	logInfo
} from './log'
import {
	serializeUrl,
	isStr,
	isNum,
	getRelativePagePath
} from './util'

export function resolveAbsolutePagePath(pagePath) {
	if (pagePath.match(/^pages\//) && !pagePath.match(/^\//)) {
		pagePath = `/${pagePath}`
	}
	return pagePath
}

/**
 * navigateTo 跳转
 * @param {Object | String} options 支持 String 类型，即 options.url 的值。
 * @param {Object} params 跳转时携带的参数
 */
export function navigateTo(options, params = {}) {

	if (isStr(options)) {
		options = {
			url: options,
			fail: r => {
				console.log('uni.navigateTo-fail', r)
			}
		}
	}
	options = Object.assign({
		animationType: 'pop-in',
		animationDuration: 300,
	}, options);
	
	// 转换为绝对路径
	options.url = resolveAbsolutePagePath(options.url)
	options.url = serializeUrl(options.url, params)
	if (process.env.NODE_ENV !== 'production') {
		logInfo('@router', 'navigateTo', options.url, options)
	}
	checkPagePermission(getRelativePagePath(options.url), () => {
		uni.navigateTo(options)
	})
}

/**
 * redirectTo 关闭当前页面，跳转到应用内的某个页面。
 * @param {Object | String} options 支持 String 类型，即 options.url 的值。
 * @param {Object} params 跳转时携带的参数
 */
export function redirectTo(options, params = {}) {
	if (isStr(options)) {
		options = {
			url: options
		}
	}
	// 转换为绝对路径
	options.url = resolveAbsolutePagePath(options.url)

	options.url = serializeUrl(options.url, params)
	if (process.env.NODE_ENV !== 'production') {
		logInfo('@router', 'redirectTo', options.url)
	}
	checkPagePermission(getRelativePagePath(options.url), () => {
		uni.redirectTo(options)
	})
}

/**
 * navigateBack
 * @param {Object | Number} [options=1] 支持 Number 类型，即 options.delta 的值。
 */
export function navigateBack(options) {
	options = options || 1
	if (isNum(options)) {
		options = {
			delta: options
		}
	}
	options = Object.assign(options, {
		animationType: 'pop-out',
		animationDuration: 100,
	});
	if (process.env.NODE_ENV !== 'production') {
		logInfo('@router', 'navigateBack', options.delta, options)
	}
	let pages = getCurrentPages();
	if (pages.length > 1) {
		uni.navigateBack(options)
	} else {
		uni.switchTab({
			url: resolveAbsolutePagePath(routerAlias.HOME_PAGE)
		})
	}
}

/**
 * switchTab
 * @param {Object | String} options 支持 String 类型，即 options.url 的值。
 */
export function switchTab(options) {
	if (isStr(options)) {
		options = {
			url: options
		}
	}
	// 转换为绝对路径
	options.url = resolveAbsolutePagePath(options.url)
	if (process.env.NODE_ENV !== 'production') {
		logInfo('@router', 'switchTab', options.url)
	}
	uni.switchTab(options)
}

/**
 * reLaunch
 * @param {Object | String} options 支持 String 类型，即 options.url 的值。
 * @param {Object} params 跳转时携带的参数
 */
export function reLaunch(options, params = {}) {
	if (isStr(options)) {
		options = {
			url: options
		}
	}
	// 转换为绝对路径
	options.url = resolveAbsolutePagePath(options.url)

	options.url = serializeUrl(options.url, params)
	if (process.env.NODE_ENV !== 'production') {
		logInfo('@router', 'reLaunch', options.url)
	}

	uni.reLaunch(options)
}
