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
	getStaticFilePath,
} from '@/shared';

import {
	mapViewCompanyListService,
	mapViewIpListService
} from '@/service';

export default {
	data() {
		return {
			seriesList: [
				[
					'寻找独角兽1',
					'寻找独角兽2',
					'寻找独角兽3'
				]
			],
			selectListObj: {
				list: [],
				pageSize: 100,
				pageNum: 1,
				more: true,
				text: '',
				id: 0,
			},
			seriesIndex: 0,
			searchValue: '',
			topSelectShow: false,
			list: [
				// {
				// src: getStaticFilePath('@/static/appreciation/picture.png'),
				// name: 'TOYCITY 契约精神',
				// des: 'TOYCITY玩具城市还通过在多座城市打造超大体的城市IP地标,以及在各个城市核心商圈开设机器人商店、让潮玩走进普通消费者的生活场景'
				// },
			 ],
			swiperCurrent: 0
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
			return headerStyle
		},
	},
	onShow() {

	},

	onLoad() {
		this.pageOnLoad()
	},
	methods: {
		more(){
			showToast('暂未开放~')
		},
		pageOnLoad() {
			this.getSelectList()

		},
		searchConfirm(e) {
			this.searchValue = e
			this.changeRefresh()
		},
		selectShow() {
			this.topSelectShow = true
		},
		selectClose() {
			this.topSelectShow = false
		},
		selectCancel() {
			this.topSelectShow = false
		},
		selectConfirm(e) {
			// console.log('selectConfirm', e)

			let obj = this.selectListObj
			obj.text = e.value[0].companyName
			obj.id = e.value[0].id

			this.seriesIndex = e.indexs
			this.topSelectShow = false
			this.changeRefresh()
		},
		changeRefresh() {
			let toast = {
				type: 'loading',
				message: "加载中",
				duration: 100
			}
			let that = this
			this.$refs.seriesConfirm_uToast.show({
				...toast,
				complete() {
					that.loadmore()
				}
			})
		},
		getSelectList() {
			let obj = this.selectListObj
			let params = {
				pageSize: obj.pageSize,
				pageNum: obj.pageNum,
			}
			mapViewCompanyListService(params).then(r => {
				obj.id = r.data.list[0].id || 0
				obj.text = r.data.list[0].companyName || '无'
				obj.list = [r.data.list]
				this.loadmore()
			})
		},

		loadmore() {
			let obj = this.selectListObj
			let params = {
				companyId: obj.id,
			}
			mapViewIpListService(params).then(r => {
				this.list = r.data
			})
		},
		swiperChange(e) {
			// console.log('swiperChange', e);
			let length = this.list.length
			let detail = e.detail
			let current = detail.current
			// console.log('length', length, 'current', current)
			// if (length - current <= 3) {
			// 	let toast = {
			// 		type: 'loading',
			// 		message: "加载中",
			// 		duration: 300
			// 	}
			// 	let that = this
			// 	this.$refs.seriesConfirm_uToast.show({
			// 		...toast,
			// 		complete() {
			// 			that.loadmore()
			// 		}
			// 	})
			// }
		},
		goDetail(item) {
			let page = routerAlias.APPRECIATION_DETAIL_PAGE
			navigateTo(page, {
				id: item.id, 
				companyId: item.companyId
			});
		},

	}
};
