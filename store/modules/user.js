import {
	logInfo,
	showToast,
	showLoading,
	hideLoading,
	getStorage,
	redirectTo,
	switchTab,
	navigateTo,
	isEmpty,
	getCurrentPagePath,
	getCurrentPage,
	fuzzyPhone,
	getRelativePagePath,
	isArray
} from '@/shared'
import {
	setTokenStorage,
	setUserStorage,
	removeUserStorage,
	removeTokenStorage,
	getTokenStorage,
	getUserStorage,
} from '@/storage'
import routerAlias from '@/routers/alias.js'
import {
	checkPagePermission,
	checkActionPermission,
	permissionMap,
	checkPageNeedLogin
} from '@/routers'

const state = {
	isLogged: getStorage('isLogged') || false,
	userInfo: getUserStorage() || null,
	currentPage: 0, // 0 home 1 图鉴 2市场 3 我的,
	token: getTokenStorage() || null,
	sellList: [],
	sentList: [],
	sentAdd: {}
}

const getters = {
	usertel: state => {
		let num = state.userInfo.phoneNo;
		fuzzyPhone(num);
		return num
	}
}

const mutations = {
	SET_LOGGED: (state, isLogged) => {
		state.isLogged = isLogged
	},
	SET_USER_INFO: (state, userInfo) => {
		// state.userInfo = Object.assign(state.userInfo, userInfo)
		state.userInfo = userInfo
	},
	UPDATE_USER_INFO: (state, userInfo) => {
		state.userInfo = Object.assign(state.userInfo, userInfo)
		setUserStorage(state.userInfo)
		console.log('UPDATE_USER_INFO', state.userInfo)
	},
	SET_PAGE: (state, page) => {
		state.currentPage = page
	},
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	ADD_USER_SELLLIST: (state,item) => {
		if(isArray(item)){
			item.forEach(i => {
				if(state.sellList.every(obj => obj.id != i.id) && state.sellList.length < 20){
					state.sellList.push(i)
				}
			})
			return ;
		}
		if(state.sellList.every(i => i.id != item.id)){
			state.sellList.push(item)
		}else{
			console.log('请勿重复添加')
		}
		console.log(state.sellList);
	},
	DELETE_USER_SELLLIST: (state,item) => {
		state.sellList.forEach((i,index) => {
			if(i.id == item.id){
				console.log('1',item);
				state.sellList.splice(index,1);
				return;
			}else{
				console.log('该数据已删除')
			}
		})
	},
	CLEAR_USER_SELLLIST: (state) => {
		state.sellList = [];
	},
	ADD_USER_SENTLIST: (state,item) => {
		if(state.sentList.every(i => i.id != item.id)){
			state.sentList.push(item)
		}else{
			console.log('请勿重复添加')
		}
		console.log(state.sentList)
	},
	DELETE_USER_SENTLIST: (state,item) => {
		state.sentList.forEach((i,index) => {
			if(i.id == item.id){
				console.log('1',item);
				state.sentList.splice(index,1);
				return;
			}else{
				console.log('该数据已删除')
			}
		})
		console.log(state.sentList);
	},
	CLEAR_USER_SENTLIST: (state) => {
		state.sentList = [];
	},
	UPDATE_SENT_ADDRESS: (state,item) => {
		state.sentAdd = item;
	}
}

const actions = {

	/**
	 * 登录
	 */
	login({
		commit
	}, data) {
		if (process.env.NODE_ENV !== 'production') {
			logInfo('@state', 'commit login', data)
		}
		loginCallback(data, commit)
	},

	/**
	 * 退出
	 */
	logout({
		commit
	}) {
		if (process.env.NODE_ENV !== 'production') {
			logInfo('@state', 'commit logout')
		}
		//清理缓存
		clearLoginInfo(commit)
	},

	/**
	 * 验证是否登录
	 */
	checkAuth({
		commit
	}, force = false) {
		if (process.env.NODE_ENV !== 'production') {
			logInfo('@state', 'commit checkAuth')
		}

		const page = getCurrentPagePath(false)
		const loginPage = routerAlias.LOGIN

		const isLogged = getStorage('isLogged')
		const token = getTokenStorage()

		// console.log('page',getCurrentPagePath(false))
		// console.log('isLogged', isLogged)
		// console.log('token', token)
		// console.log("loginPage",routerAlias.LOGIN)
		// console.log('isEmpty-token', isEmpty(token))

		//强制检测去登录
		if (page && page !== loginPage && force && (!isLogged || isEmpty(token))) {
			console.log('退回登录')
			navigateTo(routerAlias.LOGIN, {
				type: 'banBack',
			})
			return
		}

		page && console.log('checkPageNeedLogin', checkPageNeedLogin(page))

		//检查是否需要登录 在规则列表内则需要登录
		if (page && checkPageNeedLogin(page) && (!isLogged || isEmpty(token))) {
			console.log('页面需要登录')
			console.log('checkPageNeedLogin-page', page)
			navigateTo(routerAlias.LOGIN, {
				type: 'banBack',
				previous: page
			})
		}
	},
}

function loginCallback(userInfo, commit) {
	// console.log('loginCallback', userInfo)
	commit('SET_LOGGED', true)
	commit('SET_USER_INFO', userInfo.loginUser)
	setUserStorage(userInfo.loginUser)
	// setTokenStorage(userInfo.xaccessToken)
}


function clearLoginInfo(commit) {
	commit('SET_LOGGED', false)
	commit('SET_USER_INFO', null)
	removeUserStorage()
	removeTokenStorage()
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
