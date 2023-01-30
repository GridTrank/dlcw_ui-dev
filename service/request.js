import {
	navigateTo,
	serviceUrl,
	showToast,
	logError,
	logInfo
} from '@/shared'
import routerAlias from '@/routers/alias.js'
import {
	getLanguageStorage,
	getTokenStorage,
	setTokenStorage,
	removeTokenStorage
} from '@/storage'
import {
	redirectToLogin
} from '@/routers/login/index.js'

import store from '@/store'

// const accesstoken =
// 	'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0NDcyYzAwMi1kZjczLTRlYjctOWFiMi1hMmJhYzQyN2NkODgiLCJpZCI6MSwidG9rZW5SZWRpc0tleSI6IjExNDBhNDJkLTdhNWYtNGE1MS05ZDdjLTk3NjUzMmZjMzZmOSIsIm5iZiI6MTY2MTYwMDU5NSwiZXhwIjoxNjYxNjg2OTk1fQ.vz0ozbvgHdvse8a0KwfFoqn0b6qR6BXX7hYAoNR_m67rKaNTN1LOuA60ofRws36KZpL5l98mU_tMZ1UyQCrFrQ'
// setTokenStorage(accesstoken);

module.exports = (vm) => {
	console.log('request-引入')
	// 初始化请求配置
	uni.$u.http.setConfig((config) => {
		/* config 为默认全局配置*/
		config.baseURL = serviceUrl; /* 根域名 */
		config.timeout = 30000
		// config.header['x-access-token'] = accesstoken;
		// config.header['x-access-token'] = getTokenStorage();
		return config
	})

	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => {
		// 可使用async await 做异步操作
		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
		config.data = config.data || {}
		console.log('interceptors-request-config', config)
		// 根据custom参数中配置的是否需要token，添加对应的请求头
		if (config?.custom?.auth) {
			// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
			config.header['x-access-token'] = getTokenStorage();
			// config.header['x-access-token'] = accesstoken;
		}
		if (process.env.NODE_ENV !== 'production') {
			logInfo('@request', `open url: ${config.url} method: ${config.method}`, 'params:', config
				.params, 'data:', config.data, 'custom:', config.custom)
			console.log('request', `open url: ${config.url} method: ${config.method}`, config)
		}

		return config
	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})

	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => {
		/* 对响应成功做点什么 可使用async await 做异步操作*/
		// console.log('111',response);
		const data = response.data
		// 自定义参数
		const custom = response.config?.custom
		if (process.env.NODE_ENV !== 'production') {
			// logInfo('@response', `open url: ${response.config.url} method: ${response.config.method}`, data)
			console.log('response', `open url: ${response.config.url} method: ${response.config.method}`,
				data)
		}
		//如果请求存在refresh_access_token刷新动态token
		if(response.header.refresh_access_token){
			// console.log('response.header.refresh_access_token',response.header.refresh_access_token)
			setTokenStorage(response.header.refresh_access_token);
		}else{
			console.log('未获取到动态token')
		}
		//data.success 不等于true 弹出错误
		if (data.success != true) {

			// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
			if (custom.toast !== false) {
				uni.$u.toast(data.msg)
			}

			// 如果需要catch返回，则进行reject
			if (custom?.catch) {
				console.log('response-custom.catch')
				return Promise.reject(data)
			} else {
				console.log('response-custom.catch-else')
				// 否则返回一个pending中的promise，请求不会进入catch中
				return new Promise(() => {})
			}
		}
		

		return data === undefined ? {} : data
	}, (response) => {
		// 对响应错误做点什么 （statusCode !== 200）
		if (response.statusCode !== 200) {

			if (process.env.NODE_ENV !== 'production') {
				// logError('@response-error',
				// 	`open url: ${response.config.url} method: ${response.config.method}`,
				// 	response)
				console.log('response-error',
					`open url: ${response.config.url} method: ${response.config.method}`,
					response)
			}

			if (response.statusCode == 401) {
				uni.$u.toast(response.data.msg || '网络连接错误，请稍后重试。')
				store.dispatch('user/logout')
				redirectToLogin()
				return Promise.reject(response.data)
			}
			if (response.statusCode == 500 || response.statusCode == 502) {
				uni.$u.toast(response.data.error || '网络连接错误，请稍后重试。')
				return Promise.reject(response.data)
			}
			uni.$u.toast('网络连接错误，请稍后重试。')

		}

		return Promise.reject(response)
	})
}
