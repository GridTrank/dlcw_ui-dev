import {
	mapGetters,
	mapState
} from 'vuex';
import routerAlias from '@/routers/alias';
import {
	navigateTo,
	redirectTo,
	switchTab,
	navigateBack,
	reLaunch,
	showLoading,
	hideLoading,
	showToast,
	showModal,
	showActionSheet,
	getRandomArray,
	getStaticFilePath
} from '@/shared';
import {
	getDailySignInfoService,
	DailySignService,
} from '@/service/index.js'

export default {
	data() {
		return {
			imgList: [
				getStaticFilePath('@/static/daily_sign/d2.png'),
				getStaticFilePath('@/static/daily_sign/d3.png'),
				getStaticFilePath('@/static/daily_sign/d4.png'),
				getStaticFilePath('@/static/daily_sign/d5.png'),
			],
			list: [

			],
			signSuccessShow:true
		};
	},
	computed: {
		/**
		 * 小程序 自定义顶部样式
		 */
		mpHeaderStyle() {
			//小程序内
			let headerStyle = ''
			// #ifdef MP-WEIXIN
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// console.log('mpHeaderStyle-menuButtonInfo', menuButtonInfo)
			let systemInfo = uni.getSystemInfoSync()
			// console.log('mpHeaderStyle-systemInfo', systemInfo)
			let windowInfo = uni.getWindowInfo()
			// console.log('mpHeaderStyle-windowInfo', windowInfo)
			let top = (menuButtonInfo.top - systemInfo.safeAreaInsets.top)
			let witdh = menuButtonInfo.width
			//安卓
			if (systemInfo.safeAreaInsets.top == 0) {
				top = menuButtonInfo.top - windowInfo.statusBarHeight
			}
			//pc版小程序
			if (systemInfo.platform == 'windows') {
				top = 0
				witdh = 0
			}
			headerStyle = `margin-top:${top}px`;
			// #endif
			return headerStyle
		},
	},
	onShow() {},

	onLoad() {},
	onReady() {},
	methods: {
		goBack() {
			navigateBack();
		},

		queryRect(el) {
			return new Promise((resolve, reject) => {
				let view = uni.createSelectorQuery().in(this).select(el);
				view.fields({
						size: true,
						scrollOffset: true,
						rect: true
					},
					data => {
						// console.log(el + "得到节点信息" + JSON.stringify(data));
						resolve(data);
					}
				).exec();
			})
		},
		//获取签到查询
		async getDailySignList(){
			try{
				const r = await getDailySignInfoService()
			}catch(e){
				console.log('获取签到查询错误==>',e)
			}
		},
		openSignSuccessShow(){
			this.signSuccessShow = true;
		},
		closeSignSuccessShow(){
			this.signSuccessShow = false;
		}
	}
};
