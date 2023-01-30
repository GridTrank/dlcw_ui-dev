import routerAlias from '@/routers/alias' // 路由别名
import {
	navigateTo,
	redirectTo,
	switchTab,
	navigateBack,
	reLaunch,
	showToast,
	showLoading,
	hideLoading,
	showModal,
	showActionSheet,
	STATIC_URL,
	getRandomArray
} from '@/shared'
import {
	onLoad,
	onShow
} from './hooks'

export default {
	data() {
		return {
			routerAlias,
			STATIC_URL
		}
	},
	methods: { 
	},
	// onLoad(){
	// 	this.$store.dispatch('user/checkAuth');
	// 	console.log('page onShow user/checkAuth----onLoad');
	// },
	onShow() {
		this.$store.dispatch('user/checkAuth');
		console.log('page onShow user/checkAuth----onShow');
	},
	computed: {
	},
	
}
