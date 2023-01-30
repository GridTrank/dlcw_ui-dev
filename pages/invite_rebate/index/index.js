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
	getStorage
} from '@/shared';
import {
	bindingAddService,
	inviteInfoService,
	inviteListService
} from '@/service';

export default {
	data() {
		return {
			systemInfo: {},
			popupRuleShow: false,
			listHeight: 200,
			info: {},
			indexList: [{
				name: 'July',
				reward: '2.39K',
				amount: '2.39K',
			}, {
				name: 'July',
				reward: '2.39K',
				amount: '2.39K',
			}],
			listObj: {
				list: [],
				pageSize: 10,
				pageNum: 1,
				more: true
			},
			associateModal: {
				show: false,
				title: '请输入邀请码',
				code: ''
			},
			userInfo:{}
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
		// this.inviteInfo()
	},
	onShareAppMessage(res) {
	    if (res.from === 'button') {// 来自页面内分享按钮
			//获取用户邀请码
	        console.log(res.target)
	    }
	    return {
			// desc: '热门盲盒在线拆！潮玩好物应有尽有！哆啦潮玩',
	        title: `您的好友邀请您一起9.9元抽iphone 14!!!!!!!!!!`, //分享的名称
	        path: `/pages/index/index/index?inviteCode=${this.userInfo.inviteCode}`,
	        mpId:'wx82feab7fe80ba47a' ,//此处配置微信小程序的AppId
			imageUrl: getStaticFilePath('@/static/common/share.png')
	    }
	},
	onLoad(options) {
		this.systemInfo = uni.getSystemInfoSync();
		this.pageOnLoad();
		wx.showShareMenu({
		        withShareTicket:true,
		        //设置下方的Menus菜单，才能够让发送给朋友按钮可以点击
		        menus:["shareAppMessage"]
		    })
	},
	onReady() {
		this.resize()
	},
	methods: {
		goPage(r){
			let url = routerAlias[r];
			navigateTo(url);
		},
		pageOnLoad() {
			this.inviteInfo()
			this.userInfo = getStorage('USER')
			// this.loadmore()
		},
		goBack() {
			navigateBack();
		},
		toRecord() {
			let page = routerAlias.INVITE_RECORD_INDEX
			navigateTo(page);
		},
		popupRuleOpen() {
			this.popupRuleShow = true;
		},
		popupRuleClose() {
			this.popupRuleShow = false
		},
		scrolltolower() {
			this.loadmore()
		},
		loadmore() {
			let obj = this.listObj
			let params = {
				pageSize: obj.pageSize,
				pageNum: obj.pageNum,
			}

			if (obj.more) {
				inviteListService(params).then(r => {
					obj.list = obj.list.concat(r.data.list);

					if (r.data.list.length == 10) {
						obj.pageNum += 1
					}
					
					if (r.data.list.length < obj.pageSize) {
						obj.more = false
					}
				})
			}

			console.log('listObj', this.listObj)
		},

		inviteInfo() {
			inviteInfoService().then(r => {
				this.info = r.data
				console.log('this.info',this.info);
				this.loadmore();
			})
		},

		openAssociate() {
			this.associateModal.show = true
		},
		associateClose() {
			this.associateModal.show = false
		},
		associateConfirm() {
			let uToast = {}
			if (!this.associateModal.code) {
				uToast = {
					type: 'error',
					icon: false,
					message: "请输入邀请码",
				}
				this.showToast(uToast)
				return
			}

			let that = this

			bindingAddService({
				inviteUserPhoneNo: this.associateModal.code
			}).then(r => {
				uToast = {
					type: 'success',
					icon: false,
					message: r.msg
				}
				this.showToast(uToast, () => {
					this.associateClose()
				})

			}).catch(r => {
				uToast = {
					type: 'error',
					icon: false,
					message: r.msg
				}
				this.showToast(uToast)
			})
		},
		showToast(params, callback = null, ref = 'uToast') {
			this.$refs[ref].show({
				...params,
				complete() {
					callback && callback()
				}
			})
			return
		},
		async resize() {
			let allHeight = this.systemInfo.safeArea.height - this.systemInfo.safeAreaInsets.top
			let header = await this.queryRect('.page-header')
			let con = await this.queryRect('.warp1')
			let headerHeight = header.height
			let conHeight = con.height
			let height = allHeight - headerHeight - conHeight - 40;
			this.listHeight = height;
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
	}
};
