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
	splitArr,
	numberToFixed,
	stringToFixed,
	getStorage
} from '@/shared';

import {
	bannerService,
	lotteryService,
	yfsService,
	userinfoService,
	oqibagListService,
	indexGroupTypeServer,
	getHomeNewGiftInfoService,
	homeNewGiftService
} from '@/service';
import {
	setUserStorage,
	setTokenStorage
} from '@/storage';


export default {
	data() {
		return {
			systemInfo: {},
			bannerList: [
				getStaticFilePath('@/static/index/banner-1.jpg'),
				getStaticFilePath('@/static/index/banner-2.jpg'),
				getStaticFilePath('@/static/index/banner-3.jpg')
			],
			bannerCurrent: 0,
			lotteryList: [],
			yfsList: [],
			seckillCountDownDate: {},
			seckillCountDownEndTime: 0,
			topTabIndex: 0,
			topTabList: [{}],
			changeTopTabDataObj: {
				list: [],
				pageSize: 10,
				pageNum: 1,
				more: true,
				groupProductTypeId: 0,
				length: 0
			},
			topTablineBg: getStaticFilePath('@/static/common/tabdot.png'),
			scratchHappy: {
				height: 80,
				width: 290,
				percentage: 40,
				watermark: '刮刮赏',
				title: '快动手刮一刮吧',
				init_show: false,
				initComplete: false,
				isComplete: false
			},
			popupScratchHappyShow: false,
			scratchHappyWrapBg: getStaticFilePath('@/static/index/scratch-wrap-bg.png'),
			indexOqibagListObj: {
				list: [],
				pageSize: 10,
				pageNum: 1,
				more: true,
				groupProductTypeId: 0,
			},
			userInfo:{},
			inviteShow:false,
			invitedCode: '',
			seckillHide: true,
			seckillOpen: true,
			seckillOpenCloseData:{},
			seckillClose: false,
			newGiftShow: false,
			zeroBuyShow: false,
			giftCard:{},
			giftnum:0
		};
	},
	computed: {
		...mapGetters(['isLogged']),
		...mapState({
			currentPage: state => state.user.currentPage
		}),
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
		holderHeight(){
			return uni.getWindowInfo().statusBarHeight
		}
	},
	onShow() {
		console.log('index-onShow');
		//3秒后再弹出
		// setTimeout(() => {
		// 	this.scratchHappyOpen()
		// }, 3000)
	},
	onLoad(options) {
		console.log('index-onLoad');
		this.systemInfo = uni.getSystemInfoSync();
		this.checkParams(options)
		this.pageOnLoad();
		this.popupCardOpen();
	},
	onReady() {},
	methods: {
		goPage(r){
			let url = routerAlias[r];
			navigateTo(url);
		},
		checkParams(obj){
			console.log(obj)
			if(!obj){
				console.log('未携带任何参数',obj);
				return;
			}
			//只存在邀请码，走受他人邀请逻辑
			if(obj.inviteCode){
				this.invite(obj.inviteCode);
			}
			//存在邀请码且秒杀id，走秒杀助力逻辑
			if(obj.inviteCode && obj.seckillId){
				this.goSeckillAssist(obj);
			}
		},
		goSeckillAssist(obj){
			showLoading('加载中')
			setTimeout(() => {
				hideLoading();
				let url = routerAlias['SECKILL_DETAIL_PAGE'];
				navigateTo(url,obj)
			},1000)
		},
		invite(code){
			if(code){
				this.invitedCode = code;
				setStorage('INVITECODE',code);
				this.inviteShow = true;
			}
		},
		inviteShowClose(){
			this.inviteShow = false;
		},
		numberToFixed,
		pageOnLoad() {
			//秒杀所剩时间 毫秒 8小时后
			this.seckillCountDownEndTime = 8 * 3600 * 1000
			this.getTopTabList()
			this.banner()
			this.lottery()
			// this.yfs()
			// this.userinfo()
			this.indexOqibagGetList('init')
		},
		//首页弹出新人礼包卡片
		async popupCardOpen(){
			let isLogged = getStorage('isLogged',false) || false;
			if(!isLogged){
				isLogged = getStorage('isLogged--dev',false) || false;
			}
			if(isLogged){
				try{
					let params = {
						pageSize: 10,
						pageNum: 1,
						popUpPage: 0 
					}
					const r = await getHomeNewGiftInfoService(params);
					if(r.data.list[this.giftnum]){
						this.giftCard = r.data.list[this.giftnum];
						console.log('当前可领取礼包',this.giftCard);
						this.newGiftShow = true;
					}else{
						console.log('当前暂无可领取礼包:',r.data.list);
						this.zeroBuyShow = true;
					}
				}catch(e){
					console.log("首页弹出新人礼包卡片==>",e)
				}
			}else{
				this.zeroBuyShow = true;
			}
			console.log('当前登录状态:',isLogged);
		},
		//去搜索
		goSearch() {
			let page = routerAlias.SEARCH_PAGE
			navigateTo(page);
		},
		goSeckill(item) {
			let page = routerAlias.SECKILL_DETAIL_PAGE
			navigateTo(page, {
				id: item.id
			});
		},
		//秒杀倒计时
		hideSeckillPop(){
			this.seckillHide = false;
		},
		closeSeckillPop(){
			this.seckillOpen = false;
			let animation = uni.createAnimation({
				duration: 500,
				timingFunction: 'ease'
			})
			this.animation = animation;
			animation.width('120rpx').left('84%').step();
			this.seckillOpenCloseData = animation.export();
			this.seckillClose = true;
		},
		seckillCountDownOnChange(e) {
			// console.log('this.seckillCountDownDate', e)
			this.seckillCountDownDate = e
		},
		goMenuPages(r, enable = true) {
			if (enable) {
				let page = routerAlias[r];
				navigateTo(page)
			} else {
				uni.$u.toast('暂未开放')
				return
			}
		},
		topTabClick(i) {
			let index = i.index
			this.topTabIndex = index;
			if (index >= 1) {
				this.changeTopTabDataObj.groupProductTypeId = this.topTabList[index].id
				this.changeTopTabDataObj.length = 0
				this.changeTopTabDataObj.more = true
				this.changeTopTabDataObj.pageNum = 1
				this.getChangeTopTabDataList('init')
			}
		},
		goLottery(item) {
			let page = routerAlias.LOTTERY_PAGE
			navigateTo(page, {
				id: item.id,
			});
		},
		scratchInit() {
			console.log('scratchInit')
			this.scratchHappy.initComplete = true
		},
		scratchHappyOpen() {
			this.popupScratchHappyShow = true
		},
		scratchHappyClose() {
			this.popupScratchHappyShow = false
		},
		scratchComplete() {
			console.log('scratchComplete')
			this.scratchHappy.isComplete = true
		},
		/**
		 * 禁止弹出层页面滚动
		 */
		moveStop() {
			return false
		},

		banner() {
			bannerService().then(res => {
				// this.bannerList = res.data.map(v => v.picPath)
				this.bannerList = res.data
			})
		},
		bannerClick(index) {
			if(!this.bannerList[index].groupId){
				return;
			}else{
				let page = routerAlias.LOTTERY_PAGE
				navigateTo(page, {
					id: this.bannerList[index].groupId,
				});
			}
		},
		lottery() {
			lotteryService().then(res => {
				this.lotteryList = res.data
			})
		},
		yfs() {
			yfsService().then(res => {
				this.yfsList = res.data;
			})
		},
		indexOqibagGetList(type) {
			let obj = this.indexOqibagListObj
			if (type == 'load') {
				obj.pageNum += 1
			}
			let params = {
				pageSize: obj.pageSize,
				pageNum: obj.pageNum,
				// groupProductTypeId: obj.groupProductTypeId,
			}

			if (obj.more) {
				oqibagListService(params).then(r => {
					obj.list = obj.list.concat(r.data);

					if (r.data.length < obj.pageSize) {
						obj.more = false
					}
				})
			}

			console.log('this.indexOqibagListObj', this.indexOqibagListObj, type)
		},
		//页面滚动到底部
		onReachBottom() {
			if (this.topTabIndex == 0) {
				this.indexOqibagGetList('load')
			} else {
				this.getChangeTopTabDataList('load')
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			if (this.topTabIndex == 0) {
				let obj = {
					list: [],
					pageSize: 10,
					pageNum: 1,
					more: true
				}
				this.indexOqibagListObj = Object.assign(this.indexOqibagListObj, obj)
				this.indexOqibagGetList('init')
			} else {
				let obj = {
					list: [],
					pageSize: 10,
					pageNum: 1,
					more: true,
					length: 0,
				}
				this.changeTopTabDataObj = Object.assign(this.changeTopTabDataObj, obj)
				this.getChangeTopTabDataList('init')
			}

			// this.banner()
			// this.lottery()

			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000)
		},
		//获取顶部 tabs
		getTopTabList() {
			let params = {
				pageSize: 10,
				pageNum: 1,
			}
			indexGroupTypeServer(params).then(r => {
				r.data.list.map((item, index, arr) => {
					let obj = {
						name: item.groupTypeName,
						...item
					}
					this.topTabList[index] = obj
				})
				// console.log('this.$refs.tabs', this.$refs.tabs)
				setTimeout(() => {
					this.$refs.tabs.init()
				}, 1)
				this.topTabIndex = 0
				// this.indexOqibagListObj.groupProductTypeId = this.topTabList[0].id
				// this.indexOqibagGetList('init')
			})
			console.log('this.topTabList', this.topTabList)
		},
		//tabs 切换后内容列表
		getChangeTopTabDataList(type) {
			let obj = this.changeTopTabDataObj
			if (type == 'init') {
				obj.list = []
			}

			if (type == 'load') {
				obj.pageNum += 1
			}

			let params = {
				pageSize: obj.pageSize,
				pageNum: obj.pageNum,
				groupProductTypeId: obj.groupProductTypeId,
			}

			if (obj.more) {
				oqibagListService(params).then(r => {
					if (type == 'init') {
						obj.list = r.data;
					}

					if (type == 'load') {
						obj.list = obj.list.concat(r.data)
					}

					if (type == 'load' && r.data.length < obj.pageSize) {
						obj.more = false
					}

					obj.length = this.changeTopTabDataObj.list.length
				})
			}

			console.log('this.changeTopTabDataObj', this.changeTopTabDataObj, type)
		},
		// 首页领取礼包(不仅仅是新人礼包)
		async receiveGiftBag(){
			let params = { id:this.giftCard.id }
			try{
				const r = await homeNewGiftService(params);
				if(r.success){
					showToast('领取成功~')
					this.newGiftShow = false;
					this.popupCardOpen();
				}
			}catch(e){
				console.log('首页领取礼包出错==>',e);
			}
		}
	}
};
