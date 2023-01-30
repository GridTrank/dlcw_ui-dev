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
	getStaticFilePath,
	setStorage,
	splitArr
} from '@/shared';

import {
	bannerService,
	lotteryService,
	yfsService,
	userinfoService
} from '@/service';
import {
	setUserStorage
} from '@/storage';


export default {
	data() {
		return {
			topTabIndex: 0,
			topTabList: [{
					name: '全部',
				},
				{
					name: '消息',
				},
			],
			topTablineBg: getStaticFilePath('@/static/common/tabdot.png'),
			isEmpty: false
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
			headerStyle = `margin-top:${top}px;)`;
			// #endif
			return headerStyle
		},
	},
	onShow() {},

	onLoad() {
		this.onLoad();
	},
	methods: {
		onLoad() {

		},
		goBack() {
			navigateBack();
		},

		topTabClick(i) {
			this.topTabIndex = i.index;
			if (this.topTabIndex == 1) {
				this.isEmpty = true
			} else {
				this.isEmpty = false
			}
		},

	}
};
