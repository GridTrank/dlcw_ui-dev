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
	showActionSheet
} from '@/shared';

export default {
	data() {
		return {
			searchValue: ''
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
			headerStyle = `margin-top:${top}px;width:calc(100% - ${witdh}px)`;
			// #endif
			return headerStyle;
		}
	},
	methods: {
		goBack() {
			navigateBack();
		}
	}
};
