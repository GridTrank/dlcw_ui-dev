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
	mapViewSeriesListService,
	mapViewProductDetailService
} from '@/service';

export default {
	data() {
		return {
			picture: getStaticFilePath('@/static/appreciation/picture3.png'),
			detail: {
				// picture: getStaticFilePath('@/static/appreciation/picture3.png'),
				// title: 'TOYCITY彩虹糖系列',
				// desc:'TOYCITY彩虹糖系列',
			},
			seriesList: [
				// {
				// picture: getStaticFilePath('@/static/appreciation/picture3.png'),
				// name: 'TOYCITY彩虹糖系列',
				// total: 128,
				// count: 1
				// },
			],
			productId: 0,
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
	onReady() {},
	onShow() {

	},

	onLoad(option) {
		this.productId = option.id
		this.pageOnload()
	},
	methods: {
		pageOnload() {
			this.getDetail()
		},
		getDetail() {
			let params = {
				productId: this.productId
			}
			mapViewProductDetailService(params).then(r => {
				let data = r.data
				this.detail = {
					picture: data.pic,
					title: data.productName,
					desc: data.productDesc,
					...data
				}
				this.getList()
			})
		},

		goBack() {
			navigateBack();
		},
		scrolltolower() {
			this.getList()
		},
		getList() {
			let params = {
				ipId: this.detail.productIpId
			}
			mapViewSeriesListService(params).then(r => {
				this.seriesList = r.data
			})
		},
		goSeries(item) {
			let page = routerAlias.APPRECIATION_SERIES_PAGE
			navigateTo(page, {
				id: item.id,
				ipId: item.ipId,
			});
		}
	}
};
