import {
	logInfo,
	STATIC_URL
} from '@/shared'

const _hasOwnPrototype = Object.prototype.hasOwnProperty

// 检测值的类型
function getClass(obj) {
	return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

// 检测对象自身属性中是否具有指定的属性
export function hasOwn(obj, key) {
	return _hasOwnPrototype.call(obj, key)
}

// 检测纯粹的对象 Object 类型
export function isPlainObject(obj) {
	return getClass(obj) === 'object'
}

// 检测空 Object 类型
export function isEmptyObject(obj) {
	for (const name in obj) {
		return false
	}
	return true
}

// 检测 Function 类型
export function isFn(obj) {
	return getClass(obj) === 'function'
}

// 检测 Array 类型
export function isArray(obj) {
	if (Array.isArray) {
		return Array.isArray(obj)
	} else {
		return obj instanceof Array
	}
}

// 检测 Undefined 类型
export function isUndef(obj) {
	return obj === void 0
}

// 检测 String 类型
export function isStr(obj) {
	return typeof obj === 'string'
}

// 检测 Number 类型
export function isNum(value) {
	return !isNaN(value) && typeof value === 'number'
}

// 检测 boolean 类型
export function isBool(value) {
	return typeof value === 'boolean'
}

// 检测 JSON 字符串类型
export function isJSON(str) {
	if (typeof str === 'string') {
		try {
			var obj = JSON.parse(str)
			if (typeof obj === 'object' && obj) {
				return true
			} else {
				return false
			}
		} catch (e) {
			console.log('error：' + str + '!!!' + e)
			return false
		}
	}
	return false
}

// 检测为有效值，即 thus 或等于 0
export function isEffectiveValue(value) {
	return !!value || value === 0
}

// 模糊手机号信息
export function fuzzyPhone(value) {
	if (!value) return ''
	return value.replace(/^\d{3}(\d+)\d{4}$/, (match, $1) => {
		return match.replace($1, '****')
	})
}

// 秒转换为分
export function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

// 格式化日期数值
function _formatDateValue(value) {
	return value > 9 ? value : '0' + value
}

// 获取日期字符串
export function getDateString(date) {
	date = date || new Date()

	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hours = date.getHours()
	const minutes = date.getMinutes()
	const seconds = date.getSeconds()

	return (
		year +
		'-' +
		_formatDateValue(month) +
		'-' +
		_formatDateValue(day) +
		' ' +
		_formatDateValue(hours) +
		':' +
		_formatDateValue(minutes) +
		':' +
		_formatDateValue(seconds)
	)
}

export function getWeekDate() {
	var now = new Date()
	var day = now.getDay()
	var weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
	var week = weeks[day]
	return week
}

// 获取倒计时时间
export function getCountDownTime(countDown) {
	let leftd = Math.floor(countDown / (1000 * 60 * 60 * 24)) // 计算天数
	if (leftd < 10) {
		leftd = `0${leftd}`
	}
	let lefth = Math.floor(countDown / (1000 * 60 * 60) % 24) // 计算小时数
	if (lefth < 10) {
		lefth = `0${lefth}`
	}
	let leftm = Math.floor(countDown / (1000 * 60) % 60) // 计算分钟数
	if (leftm < 10) {
		leftm = `0${leftm}`
	}
	let lefts = Math.floor(countDown / 1000 % 60) // 计算秒数
	if (lefts < 10) {
		lefts = `0${lefts}`
	}
	return {
		leftd,
		lefth,
		leftm,
		lefts
	}
}

// #start 地址信息
const queryParamPattern = /([^&]+)\=([^&]+)/
const invalidQueryValues = ['undefined', 'null']

/**
 * 序列化地址信息
 * @param {String} url 地址信息
 * @param {Object} [params={}] 参数信息
 * @param {Boolean} [share=false] 是否是分享
 * @return {String} 拼接完成后的完整地址
 */
export function serializeUrl(url, params = {}, share = false) {
	let queryString = ''
	if (!url.match(/\?/)) {
		queryString += '?'
	}
	for (const key in params) {
		const value = params[key]
		if (~invalidQueryValues.indexOf(value + '')) {
			continue
		}
		queryString += `&${key}=${value}`
	}
	url = url + queryString
	url = url.replace(/\?&/, '?').replace(/\?$/, '')
	if (share) {
		const prefix = url.match(/\?/) ? '&' : '?'
		url += `${prefix}pagePath=${encodeURIComponent(url)}`
	}
	return url
}

// 获取参数
export function getUrlParams(url) {
	const queryIndex = url.indexOf('?')
	if (~queryIndex) {
		const queryString = url.substring(queryIndex + 1)
		const params = {}
		queryString.split('&').forEach((param) => {
			const matches = param.match(queryParamPattern)
			if (matches) {
				const key = matches[1]
				const value = matches[2]
				// 过滤一下无效的值
				if (!~invalidQueryValues.indexOf(value)) {
					params[key] = value
				}
			}
		})
		return params
	}
	return {}
}

// #end
// 校验是否以 http/https 开头
export function isHttp(path) {
	return /^(http|https):\/\//.test(path)
}

// 拼接分享标题信息
export function joinShareTitle(title, desc) {
	return `${title} - ${desc}`
}

// 获取相对路径，即在 json 中配置的路径信息。
export function getRelativePagePath(pagePath) {
	// 掐头去尾
	return pagePath.replace(/^\//, '').replace(/\?.*/, '')
}

// 检查是否是空对象或者空数组，无效值
export function isEmpty(obj) {
	// 检验null和undefined
	if (!obj && obj !== 0 && obj !== '') {
		return true
	}
	// 检验数组
	if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
		return true
	}
	// 检验对象
	if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
		return true
	}
	// 检查是否是null或者undefined
	if (!obj) {
		return true
	}
	return false
}

// 尝试解析 JSON 串
export function parseJsonString(value) {
	try {
		value = JSON.parse(value)
	} catch (ex) {
		value = {
			text: value
		}
	}
	return value
}

// 获取当前路由
export function getCurrentPage() {
	const routes = getCurrentPages()
	const currentRoute = routes[routes.length - 1]
	return currentRoute
}



/**
 * @export  获取当前路由路径
 * @param {boolean} [options=true] 是否需要携带参数
 * @returns
 */
export function getCurrentPagePath(options = true) {
	const currentRoute = getCurrentPage()
	if (currentRoute) {
		const currentPagePath = currentRoute.route
		const currentOptions = currentRoute.options
		return options ? serializeUrl(currentPagePath, currentOptions) : currentPagePath
	}
	return
}

//是否有上一页
export function isLastPage() {
	const routers = getCurrentPages()
	return routers.length > 1
}

/**
 * 提取数组中每个对一个值为键名，一个为键值
 * @param {Array} array 原数组
 * @param {String} key 键名
 * @param {String} value 键值
 * @param {Object} [extra={}] 额外的参数
 * @returns {Object}
 */
export function getArrayKeyToValue(array, key, value, extra = {}) {
	const data = array.reduce(
		(_, keys) => ({
			..._,
			[keys[key]]: keys[value],
			...extra
		}), {}
	)
	if (process.env.NODE_ENV !== 'production') {
		logInfo('@getArrayKeyToValue', 'success', data)
	}
	return data
}

export function isIOS() {
	return plus.os.name === 'iOS'
}

export function interceptLastTwo(str) {
	if (!str) return str
	return str.substr(str.length - 2, 2)
}

export function interceptFirstTwo(str) {
	if (!str) return str
	return str.substr(0, 2)
}

export function interceptString(str, place, isEllipsis = true) {
	if (!str) return str
	if (str.length > place) {
		return str.substr(0, place) + (isEllipsis ? '...' : '')
	}
	return str.substr(0, place)
}

// 生成随机字符串
export function randomString(len) {
	len = len || 32
	const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
	/** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	const maxPos = $chars.length
	let pwd = ''
	for (let i = 0; i < len; i++) {
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
	}
	return pwd
}

// 获取元素宽高
export function getElementInfo(calssName) {
	return new Promise(resolve => {
		uni.getSystemInfo({
			success: () => {
				uni.createSelectorQuery()
					.select(`.${calssName}`)
					.boundingClientRect((size) => {
						resolve(size)
					})
					.exec()
			}
		})
	})
}

// 获取元素宽高
export function getElementInfoNvue(elementIDName, context) {
	return new Promise(resolve => {
		uni.getSystemInfo({
			success: () => {
				uni.createSelectorQuery().in(context).select(`#${elementIDName}`)
					.boundingClientRect(response => {
						resolve(response)
					}).exec()
			}
		})
	})
}

// 年月日时分秒 替换为 月日时分
export function filterTimexxxx(timeString) {
	if (!timeString) return
	const timesplit = timeString.split(' ')
	let time1 = timesplit[0].split('-')
	time1 = time1[1] + '-' + time1[2]
	let time2 = timesplit[1].split(':')
	time2 = time2[0] + ':' + time2[1]
	return time1 + ' ' + time2
}

// 检查是否支持iOS登录
export function checkIOSLogin() {
	if (isIOS()) {
		const systemInfo = uni.getSystemInfoSync()
		const system = systemInfo.system
		const mainSystem = system.split(' ')[1].split('.')[0]
		if (Number(mainSystem) > 13) {
			return true
		}
	}
	return false
}

// 是否安装应用
export function isApplicationExist(app) {
	switch (app) {
		case 'weixin':
			return plus.runtime.isApplicationExist({
				pname: 'com.tencent.mm',
				action: 'weixin://'
			})
		default:
			return false
	}
}

export function imgTagAddStyle(htmlstr) {
	htmlstr = htmlstr.replace(/\<img (src="((?!\").)+")\>/gi, '<img $1 style="max-width: 100%;">')
	htmlstr = htmlstr.replace(/(<img((?!style=").)+)(style="((?!\").)+)/gi, '$1$3display: block;')
	return htmlstr
}
export function testMobile(value) {
	return /^1[23456789]\d{9}$/.test(value)
}

export function stringToFixed(str, decimal = 2) {
	if (!str) return str
	return str.toFixed(decimal)
}

export function numberToFixed(number, decimal = 2) {
	if (!number) return number
	return number.toFixed(decimal)
}

export function secondToHour(num) {
	return '0'.repeat(2 - String(Math.floor(num / 60)).length) + Math.floor(num / 60) + ':' + '0'.repeat(2 - String(Math
		.floor(num % 60)).length) + Math.floor(num % 60)
}

/**
 * 格式化数字为kw
 * @param {Object} num 
 */
export function formatNumberToKw(num) {
	return num >= 1e3 && num < 1e4 ? (num / 1e3).toFixed(1) + 'k' : num >= 1e4 ? (num / 1e4).toFixed(1) + 'w' : num
}

/** 随机抽取数组数据
 * @param {Object} arr
 * @param {Object} length
 */
export function getRandomArray(arr, count) {
	let newArr = arr.slice(0)
	let i = arr.length
	let min = i - count
	let temp = null
	let index = null
	while (i-- > min) {
		index = Math.floor((i + 1) * Math.random())
		temp = newArr[index]
		newArr[index] = newArr[i]
		newArr[i] = temp
	}
	return newArr.slice(min)
}

/**
 * 图片素材地址格式化
 * @param {Object} path
 */
export function getStaticFilePath(path) {
	let net = STATIC_URL
	let ret = ''
	//全部改成线上cdn样式
	ret = net + path.replace('@', '')
	return ret
	//// #ifdef MP-WEIXIN	
	// ret = net + path.replace('@', '')
	// return ret
	//// #endif

	// ret = path.replace('@', '')
	// return ret
}
/**
 * 切分数组
 * @param {Object} arr
 * @param {Object} num
 */
export function splitArr(arr, num) {
	let res = [];
	for (let i = 0, len = arr.length; i < len; i += num) {
		res.push(arr.slice(i, i + num));
	}
	return res
}


/**
 * 乘法运算
 * @param {Object} arg1
 * @param {Object} arg2
 */
export function floatMul(arg1, arg2) {
	let m = 0
	let s1 = arg1.toString()
	let s2 = arg2.toString()
	try {
		m += s1.split('.')[1].length
	} catch (e) {}
	try {
		m += s2.split('.')[1].length
	} catch (e) {}
	return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}


/**
 * 除法运算
 * @param {Object} arg1
 * @param {Object} arg2
 * @param {number} n
 */
export function floaDiv(arg1, arg2, n = 2) {
	let t1 = 0
	let t2 = 0
	let r1, r2
	try {
		t1 = arg1.toString().split('.')[1].length
	} catch (e) {}
	try {
		t2 = arg2.toString().split('.')[1].length
	} catch (e) {}
	r1 = Number(arg1.toString().replace('.', ''))
	r2 = Number(arg2.toString().replace('.', ''))
	// 动态控制精度长度
	// n = (t1 >= t2) ? t1 : t2
	return Number(Number((r1 / r2) * Math.pow(10, t2 - t1)).toFixed(n))
}

/**
 * 减法运算
 * @param {Object} arg1
 * @param {Object} arg2
 * @param {number} n
 */
export function floatSub(arg1, arg2, n = 2) {
	let r1, r2, m
	try {
		r1 = arg1.toString().split('.')[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split('.')[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2))
	// 动态控制精度长度
	// n = (r1 >= r2) ? r1 : r2
	return Number(((arg1 * m - arg2 * m) / m).toFixed(n))
}

/**
 * 加法运算
 * @param {Object} arg1
 * @param {Object} arg2
 */
export function floatAdd(arg1, arg2) {
	let r1, r2, m
	try {
		r1 = arg1.toString().split('.')[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split('.')[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2))
	return Number((arg1 * m + arg2 * m) / m)
}
