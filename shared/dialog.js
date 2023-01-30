/**
 * 常用的 dialog 能力封装
 * 简化传参或增强实现，参数基本与标准 API 一致。若存在差异，会在当前方法中说明。
 * 参考文档：https://uniapp.dcloud.io/api/ui/prompt
 */

import {
	DIALOG_DURATION
} from './constants'
import {
	logInfo,
	logError
} from './log'
import {
	isStr
} from './util'

/**
 * showToast
 * @param {Object | String} options 支持 String 类型，即 options.title 的值。
 */
export function showToast(options) {
	if (process.env.NODE_ENV !== 'production') {
		logInfo('@dialog', 'showToast', options)
	}
	if (isStr(options)) {
		options = {
			title: options
		}
	}
	if (options && !options.title) {
		return logError('@dialog', 'showToast title 不能为空')
	}
	options = {
		icon: 'none',
		duration: DIALOG_DURATION,
		mask: false,
		...options
	}
	uni.showToast(options)
}

/**
 * showLoading
 * @param {Object | String} options 支持 String 类型，即 options.title 的值。
 * @param {Boolean} options.autoClose 是否自动关闭 loading 提示框 | 默认为 false
 * @param {Number} options.duration 提示框的持续时间，仅在 options.autoClose 为 true 时生效，单位 ms。| 默认为 DIALOG_DURATION
 */
export function showLoading(options = '') {
	if (process.env.NODE_ENV !== 'production') {
		logInfo('@dialog', 'showLoading', options)
	}
	if (isStr(options)) {
		options = {
			title: options
		}
	}
	if (!options.title) {
		//#ifdef APP-PLUS
		plus.nativeUI.showWaiting()
		// #endif
		return
	}
	options = {
		mask: true,
		autoClose: false,
		...options
	}

	uni.showLoading(options)

	if (options.autoClose) {
		options = {
			duration: DIALOG_DURATION,
			...options
		}
		if (process.env.NODE_ENV !== 'production') {
			logInfo('@dialog', 'auto hideLoading', options.duration)
		}
		setTimeout(() => {
			uni.hideLoading()
		}, options.duration)
	}
}

// hideLoading
export function hideLoading() {
	if (process.env.NODE_ENV !== 'production') {
		logInfo('@dialog', 'hideLoading')
	}
	//#ifdef APP-PLUS
	plus && plus.nativeUI.closeWaiting()
	// #endif
	uni.hideLoading()
}

const modalTypes = {
	default: '#3cc51f',
	info: '#1989fa',
	warn: '#ff976a',
	danger: '#ee0a24'
}

/**
 * showModal
 * @param {Object} options 参数与标准规范一致
 */
export function showModal(options, confirmCallback, cancelCallback) {
	const type = options.type || 'default'
	const cancelText = options.confirmText || '确认'
	const confirmText = options.cancelText || '取消'
	options = {
		title: '提醒',
		showCancel: true,
		cancelColor: '#000000',
		confirmColor: modalTypes[type] || modalTypes['default'],
		...options,
		confirmText,
		cancelText,
		success: ($event) => {
			if ($event.cancel) {
				confirmCallback && confirmCallback()
			} else if ($event.confirm) {
				cancelCallback && cancelCallback()
			}
		}
	}
	if (process.env.NODE_ENV !== 'production') {
		logInfo('@dialog', 'showModal', options)
	}
	hideLoading()
	return uni.showModal(options)
}

/**
 * showActionSheet
 * @param {Object} options 参数与标准规范一致
 */
export function showActionSheet(options, callback) {
	if (process.env.NODE_ENV !== 'production') {
		logInfo('@dialog', 'showActionSheet', options)
	}
	plus.nativeUI.actionSheet({
		title: options.title || '',
		cancel: options.cancelText || '取消',
		buttons: options.buttonList || []
	}, ($event) => {
		callback && callback($event)
	})
}
