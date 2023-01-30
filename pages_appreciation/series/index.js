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
	mapViewProductDetailService,
	mapViewProductListService
} from '@/service';

export default {
	data() {
		return {
			picture: getStaticFilePath('@/static/appreciation/picture2.png'),
			list: [
				// {
				// src: getStaticFilePath('@/static/appreciation/picture4.png'),
				// total: 128,
				// count: 1
				// },
			 ],
			swiperCurrent: 0,
			productId: 0,
			detail: {
				// picture: getStaticFilePath('@/static/appreciation/picture3.png'),
				// title: 'TOYCITY彩虹糖系列',
				// desc: 'TOYCITY彩虹糖系列',
			},
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
		goBack() {
			navigateBack();
		},
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
		getList() {
			let params = {
				seriesId: this.detail.productSeriesId
			}
			mapViewProductListService(params).then(r => {
				let data = r.data
				this.list = data
			})
		},
		swiperChange(e) {

		},
		scrolltolower(e) {
			console.log('scrolltolower', e)
			// let toast = {
			// 	type: 'loading',
			// 	message: "加载中",
			// 	duration: 300
			// }
			// let that = this
			// this.$refs.seriesScroll_uToast.show({
			// 	...toast,
			// 	complete() {
			// 		that.getList()
			// 	}
			// })
		}

	}
};
