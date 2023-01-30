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
	numberToFixed,
	stringToFixed,
	floatMul,
	floaDiv,
	floatSub,
	floatAdd
} from '@/shared';
import {
	lotterySingleDrawsService,
	lotteryFiveDrawsService,
	lotteryTenDrawsService,
	userinfoService,
	getLotteryPrizepoolListService,
	LotteryGroupProductListService,
	getLotteryDrawsPricesServer,
	wechatMiniCreatePaymentServer,
	sellUserProductService,
	wechatQueryTransaction,
	couponLuckDrawService,
	createBulletService,
	luckDrawOnLineService
} from '@/service';

import {
	setTokenStorage,
} from '@/storage'

// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation')
const dom = uni.requireNativePlugin('dom')
// #endif


export default {
	data() {
		return {
			id: 0,
			mainProduct: getStaticFilePath('@/static/lottery/product.png'),
			mainProductList: [],
			videoUrl: getStaticFilePath('@/video_lottery.mp4'),
			videoDuration: 4000,
			popupRuleShow: false,
			popupPrizePoolShow: false,
			popupPayShow: false,
			popupConfirmPayShow: false,
			popupCardShow: false,
			popupCardListShow: false,
			prizepoolTabList: {},
			prizepoolTabCurrent: 0,
			lotteryPlay: false,
			videoPlayStatus: false,
			enableEffect: true,
			systemInfo: {},
			displayResults: false,
			prizepoolCardList: [],
			lotteryResultsList: [],
			lotteryPlayCardCount: 0,
			lotteryPlayCardWrapHeight: 500,
			allFlippingState: false,
			showFlippingBut: false,
			showLotteryBut: true,
			oneClickSellState: false,
			confirmSellState: false,
			totalPrice: 0,
			userBalance: 0,
			payAmount: 399,
			payTitle: '',
			drawsPostFlag: false,
			music: {
				deal: {
					'title': '发牌',
					'src': getStaticFilePath('@/static/lottery/deal.mp3'),
					'duration': 157 //毫秒
				},
				flop: {
					'title': '翻牌',
					'src': getStaticFilePath('@/static/lottery/flop.mp3'),
					'duration': 366
				},
				sell: {
					'title': '寄售',
					'src': getStaticFilePath('@/static/lottery/sell.mp3'),
					'duration': 549
				},
				draw: {
					'title': '抽奖',
					'src': getStaticFilePath('@/static/lottery/draw-currency.mp3'),
					'duration': 758
				},
				sellde: {
					'title': '统一寄售',
					'src': getStaticFilePath('@/static/lottery/sell-currency.mp3'),
					'duration': 627
				}
			},
			innerAudioContext: null,
			lotteryDrawsButPrices: {
				fivePrice: 0,
				tenPrice: 0,
				onePrice: 0,
				originalPrice: 399,
			},
			oneSellPrice: 0,
			sellPricePercentage: 0.6,
			sellPriceTotal: 0,
			agreement: 'agree',
			payQuantity: 'SINGLE',
			count: 0,
			paymentParams: {},
			knapsackIdsArr: [],
			sellModalSuccessShow: false,
			popCard:{},
			popCardData:{},
			popCardList:[],
			bulletList:[],
			bulletDisplayList:[],
			positionList:[],
			bulletShow: true,
			bulletOnload: false,
			bulletSetIn: '',
			bulletAnimationList:[],
			cardResultSize: {
				width: 0,
				height: 0
			},
			sellConfirmShow: false,
			payChoose:'balpay',
			balanceVisiable: false,
			popupCancelPayShow: false,
			popupPrizePoolDetailShow: false,
			prizePoolDetail:{},
			couponList:[],
			couponListTotal: 1000,
			couponShow: false,
			coupon: 'none',
			onlineList:[],
			onlineNumber:0
		};
	},
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo,
		}),
	},
	onShow() {
		console.log('this.$store.state', this.$store.state.user)
		if (this.$store.state.user.isLogged) {
			this.getAndUpdateUserInfo()
		}
	},
	onLoad(option) {
		this.systemInfo = uni.getSystemInfoSync();
		this.id = option.id
		this.pageOnLoad();
		// this.createBullet();
		this.bulletSetIn = setInterval(() => {
			//关闭弹幕滚动和显示
			this.createBullet();
		},11000)
	},
	onReady() {
		this.innerAudioContext = uni.createInnerAudioContext();
	},
	onUnload(){
		clearInterval(this.bulletSetIn)
	},
	watch: {
		allFlippingState: {
			handler(newValue) {
				console.log('watch-allFlippingState', newValue);
			}
		}
	},
	methods: {
		numberToFixed,
		stringToFixed,
		pageOnLoad() {
			this.getLotteryDrawsPrices()
			this.getProductList()
			this.getLotteryPrizepoolList()
			this.luckDrawOnLine()
		},
		goBack() {
			navigateBack();
			clearInterval(this.bulletSetIn)
		},
		goMain() {
			clearInterval(this.bulletSetIn)
			this.displayResults = false
			this.showLotteryBut = true
			this.allFlippingState = false
		},
		goPages(r) {
			clearInterval(this.bulletSetIn)
			let page = routerAlias[r];
			navigateTo(page)
		},
		popupRuleOpen() {
			console.log('userBalance', this.userBalance)
			this.popupRuleShow = true;
		},
		popupRuleClose() {
			this.popupRuleShow = false
		},
		popupPrizePoolOpenAndSwitch(i) {
			this.prizepoolTabCurrent = i
			this.popupPrizePoolShow = true
		},
		popupPrizePoolOpen() {
			this.popupPrizePoolShow = true
		},
		popupPrizePoolClose() {
			this.popupPrizePoolShow = false
		},
		switchPrizepoolTab(i) {
			this.prizepoolTabCurrent = i
		},

		popupPayOpen(count) {
			hideLoading();
			this.popupPayShow = true
		},

		popupPayClose() {
			this.popupPayShow = false
		},
		popupConfirmPayOpen(count) {
			hideLoading();
			this.popupConfirmPayShow = true
		},
		
		popupConfirmPayClose() {
			this.popupConfirmPayShow = false
		},
		closeCardShow(){
			this.popupCardShow = false;
		},
		openCardShow(){
			this.popupCardShow = true;
		},
		nextPopCardShow(){
			if( this.popCardList.length > 0 ){
				this.closeCardListShow();
				console.log('当前剩余展示的高级卡牌组',this.popCardList);
				console.log('当前展示的卡牌',this.popCard);
				this.popCard = this.popCardList[0];
				this.popCardList.shift();
				this.openCardListShow();
			}else{
				console.log('无展示牌组',this.popCardList);
				this.closeCardListShow();
			}
		},
		openSellConfirmShow(){
			
		},
		openCardListShow(){
			this.popupCardListShow = true;
		},
		closeCardListShow(){
			this.popupCardListShow = false;
		},
		openCancelPayShow(){
			this.popupCancelPayShow = true;
		},
		closeCancelPayShow(){
			this.popupCancelPayShow = false;
		},
		closeDoubleShow(){
			this.closeCancelPayShow();
			this.popupPayShow = false;
			this.popupConfirmPayShow = false;
		},
		popupPrizePoolDetailOpen(item){
			this.prizePoolDetail = item;
			console.log(this.prizePoolDetail)
			this.popupPrizePoolDetailShow = true;
		},
		popupPrizePoolDetailClose(){
			this.popupPrizePoolDetailShow = false;
		},
		enablePlayEffect() {
			this.enableEffect = !this.enableEffect
			this.lotteryPlay = false
			this.videoPlayStatus = false
		},
		videoPlayStart(){
			console.log('videoPlayStart');
			hideLoading();
		},
		videoPlayEnd() {
			hideLoading();
			console.log('videoPlayEnd');
			setTimeout(() => {
				this.lotteryPlay = false
				this.videoPlayStatus = false
				this.showFlippingBut = true
				// this.showLotteryBut = false
				
				// this.showFlippingBut = false;
				this.showLotteryBut = true
				this.allFlippingState = true
				this.oneClickSellState = true
				
				this.resize()
				// this.playMusic('deal', this.lotteryPlayCardCount)
				this.allFlipping()
				this.playMusic('draw',1)
			}, 0)
			
			console.log('全部翻牌全部翻牌全部翻牌')
		},
		playEffect() {
			this.allFlippingState = false
			this.lotteryResultsList = []
			if (this.enableEffect) {
				this.lotteryPlay = true
				this.videoPlayStatus = true
			} else {
				setTimeout(() => {
					this.lotteryPlay = false
					this.videoPlayStatus = false
					this.showFlippingBut = true
					// this.showLotteryBut = false
					
					this.showLotteryBut = true
					this.allFlippingState = true
					this.oneClickSellState = true
					this.resize()
					//发牌特效
					// this.playMusic('deal', this.lotteryPlayCardCount)
					this.allFlipping()
					this.playMusic('draw',1)
				}, 0)
			}
			this.oneClickSellState = false
			this.confirmSellState = false
		},
		//当前奖池在线人数
		async luckDrawOnLine(){
			try{
				const r = await luckDrawOnLineService()
				this.onlineNumber = r.data.onlineNumber;
				for(let i = 0;i < 3;i++){
					this.onlineList.push(r.data.headImgList[i]);
				}
			}catch(e){
				console.log('当前奖池在线人数出错==>',e)
			}
		},
		//弹幕展示
		async createBullet(){
			//置空
			this.positionList = [];
			this.bulletList = [];
			this.bulletAnimationList = [];
			//新增随机数据值
			let params = {
				pageSize: parseInt(Math.random()*3 + 1),
				// pageSize: 3,
				pageNum: 1,
				groupId: this.id
			}
			try{
				const r = await createBulletService(params);
				this.bulletOnload = false;
				this.bulletList = r.data.list;
				//新增随机坐标
				for(let i = 0; i < this.bulletList.length ; i++){
					this.positionList.push({
						x: (this.systemInfo.screenWidth + Math.random()*this.systemInfo.screenWidth) * 2,
						y: Math.random()*252
					})
				}
				// this.getBulletAnimationData();
				this.bulletOnload = true;
				// console.log('监听动画数组',this.bulletAnimationList)
			}catch(e){
				console.log('获取弹幕数据错误==>',e);
				this.bulletOnload = false;
			}
		},
		// // 弹幕动画
		// getBulletAnimationData(){
		// 	//遍历为每一项赋予动画
		// 	for(let i = 0; i < this.bulletList.length ; i++){
		// 		// 创建动画实例
		// 		var aanimation = uni.createAnimation({
		// 			transformOrigin: "0% 100%",
		// 			duration: 10000,
		// 			timingFunction: 'linear',
		// 		})
		// 		this.animation = aanimation;
		// 		//获取起始位置XY轴
		// 		let trX = this.systemInfo.screenWidth
		// 		let trY = (24 * i)*2 + (i !== 0 ? 30 * i : 0) + 'rpx';
		// 		// 当0%时(初始状态)
		// 		// animation.translate(trX,trY).step();
		// 		// 当100%时(完成状态)
		// 		aanimation.translateX(-trX * 2).step();
		// 		let animationData = this.animation.export();
		// 		this.bulletAnimationList.push(animationData);
		// 	}
		// },
		//弹幕开关
		switchBullet(){
			clearInterval(this.bulletSetIn);
			if(this.bulletShow == true){
				this.bulletShow = false;
			}else{
				this.bulletShow = true;
				this.bulletSetIn =  setInterval(() => {
					this.createBullet();
				},11000)
			}
		},
		getLotteryPrizepoolList() {
			showLoading('加载中');
			let id = this.id
			getLotteryPrizepoolListService(id).then(r => {
				this.prizepoolTabList = r.data
				hideLoading()
			})
		},
		lotteryBefore(count){
			showLoading('加载中')
			this.count = count;
			this.coupon = 'none';
			this.couponShow = false;
			console.log(count+'连抽');
			if(count === 1){
				this.lotteryDrawsButPrices.originalPrice = floatMul(this.lotteryDrawsButPrices.onePrice, 1.5)
				this.payAmount = this.lotteryDrawsButPrices.onePrice
				this.payTitle = '单抽付款'
				this.payQuantity = 'SINGLE'
			}
			if(count === 5){
				this.lotteryDrawsButPrices.originalPrice = floatMul(this.lotteryDrawsButPrices.fivePrice, 1.5)
				this.payAmount = this.lotteryDrawsButPrices.fivePrice
				this.payTitle = '五抽付款'
				this.payQuantity = 'FIVE'
			}
			if(count === 10){
				this.lotteryDrawsButPrices.originalPrice = floatMul(this.lotteryDrawsButPrices.tenPrice, 1.5)
				this.payAmount = this.lotteryDrawsButPrices.tenPrice
				this.payTitle = '十抽付款'
				this.payQuantity = 'TEN'
			}
			this.getCouponList(count);
			this.popupPayOpen(count);
		},
		lottery(count) {
			//强制检测登录
			this.$store.dispatch('user/checkAuth', true);
			console.log('userBalance', this.userBalance);
			showLoading('加载中');
			this.bulletShow = false;
			//单抽
			if (count == 1) {
				this.lotteryDrawsButPrices.originalPrice = floatMul(this.lotteryDrawsButPrices.onePrice, 1.5)
				if(this.coupon !== 'none'){
					this.payAmount = (this.lotteryDrawsButPrices.onePrice - this.coupon.couponAmount) > 0 ? (this.lotteryDrawsButPrices.onePrice - this.coupon.couponAmount) : 0
				}else{
					this.payAmount = this.lotteryDrawsButPrices.onePrice
				}
				this.payTitle = '单抽付款'
				this.payQuantity = 'SINGLE'
				lotterySingleDrawsService({
					groupId: this.id,
					couponId: this.coupon.id
				}).then(r => {
					this.oneSellPrice = floatMul(this.lotteryDrawsButPrices.onePrice, this
						.sellPricePercentage)
					// this.sellPriceTotal = floatMul(this.lotteryDrawsButPrices.onePrice, this
					// 	.sellPricePercentage)
					this.lotteryPostSuccessCallback(count, r.data)
				}).catch(r => {
					this.lotteryPostErrorCallback(count, r)
				})
			}

			//5抽
			if (count == 5) {
				this.lotteryDrawsButPrices.originalPrice = floatMul(this.lotteryDrawsButPrices.fivePrice, 1.5)
				if(this.coupon !== 'none'){
					this.payAmount = (this.lotteryDrawsButPrices.fivePrice - this.coupon.couponAmount) > 0 ? (this.lotteryDrawsButPrices.fivePrice - this.coupon.couponAmount) : 0
				}else{
					this.payAmount = this.lotteryDrawsButPrices.fivePrice
				}
				this.payTitle = '五抽付款'
				this.payQuantity = 'FIVE'
				lotteryFiveDrawsService({
					groupId: this.id,
					couponId: this.coupon.id
				}).then(r => {
					this.oneSellPrice = floaDiv(floatMul(this.lotteryDrawsButPrices.fivePrice, this
						.sellPricePercentage), count)
					// this.sellPriceTotal = floatMul(this.lotteryDrawsButPrices.fivePrice, this
					// 	.sellPricePercentage)

					this.lotteryPostSuccessCallback(count, r.data)
				}).catch(r => {
					this.lotteryPostErrorCallback(count, r)
					hideLoading();
				})
			}

			//10抽
			if (count == 10) {
				this.lotteryDrawsButPrices.originalPrice = floatMul(this.lotteryDrawsButPrices.tenPrice, 1.5)
				if(this.coupon !== 'none'){
					this.payAmount = (this.lotteryDrawsButPrices.tenPrice - this.coupon.couponAmount) > 0 ? (this.lotteryDrawsButPrices.tenPrice - this.coupon.couponAmount) : 0
				}else{
					this.payAmount = this.lotteryDrawsButPrices.tenPrice
				}
				this.payTitle = '十抽付款'
				this.payQuantity = 'TEN'
				lotteryTenDrawsService({
					groupId: this.id,
					couponId: this.coupon.id
				}).then(r => {
					this.oneSellPrice = floaDiv(floatMul(this.lotteryDrawsButPrices.tenPrice, this
						.sellPricePercentage), count)
					// this.sellPriceTotal = floatMul(this.lotteryDrawsButPrices.tenPrice, this
					// 	.sellPricePercentage)
					this.lotteryPostSuccessCallback(count, r.data)
				}).catch(r => {
					this.lotteryPostErrorCallback(count, r)
				})
			}
		},

		again() {
			this.lottery(this.lotteryPlayCardCount);
		},

		/**
		 * 抽奖执行成功统一回调
		 * @param {Object} count
		 * @param {Object} results
		 */
		lotteryPostSuccessCallback(count, results) {
			console.log('lotteryPostSuccessCallback', count, results)
			clearInterval(this.bulletSetIn)
			this.getAndUpdateUserInfo()
			this.popupPayShow = false;
			this.doLotteryResultsHandle(count, results)
			setTimeout(() => {
				hideLoading()
			},500)
		},

		/**
		 * 抽奖错误回调
		 * @param {Object} count
		 * @param {Object} results
		 */
		lotteryPostErrorCallback(count, results) {
			console.log('lotteryPostErrorCallback', count, results)
			clearInterval(this.bulletSetIn)
			this.getAndUpdateUserInfo()
			if (results.code === 111 || results.code === 101) {
				this.wechatMiniPay()
				return
			}
		},

		/**
		 * 处理开奖结果
		 * @param {Object} count
		 * @param {Object} results
		 */
		doLotteryResultsHandle(count, results) {
			console.log('doLotteryResultsHandle', count, results)
			this.lotteryPlayCardCount = count
			this.playEffect();
			this.displayResults = true
			// this.lotteryResultsList = getRandomArray(this.prizepoolCardList, count)
			let resultsArr = [];
			this.totalPrice = 0

			results.map((item, index, arr) => {
				this.totalPrice = floatAdd(this.totalPrice, item.productMarketPrice)
				let obj = {
					card: item.productPic,
					flipping: false,
					select: false,
					sell: true,
					sellPrice: item.productMarketPrice,
					confirmSellState: false,
					...item
				}
				resultsArr[index] = obj
			})
			this.sellPriceTotal = floatMul(this.oneSellPrice, this.lotteryPlayCardCount)
			this.lotteryResultsList = resultsArr
			// this.resetPrizepoolCardList()
			// this.userBalance -= amount
			console.log(count, 'lottery-lotteryResultsList', this.lotteryResultsList)
			// console.log(count, 'lottery-prizepoolCardList', this.prizepoolCardList)
			console.log(count, 'this.userBalance', this.userBalance);
			console.log('this.totalPrice', this.totalPrice)
			console.log('this.oneSellPrice', this.oneSellPrice)
		},
		/**
		 * 获取更新用户数据 主要是余额
		 */
		getAndUpdateUserInfo() {
			userinfoService().then(r => {
				this.userBalance = r.data.loginUser.userBalance || 0
				this.$store.commit('user/UPDATE_USER_INFO', r.data.loginUser);
				// setTokenStorage(r.data.xaccessToken)
			})
		},
		/**
		 * 获取当前奖池可使用优惠券的列表
		 */
		getCouponList(count){
			let params = {
				pageSize: this.couponListTotal,
				pageNum: 1,
				couponLotteryType: 1,
				price: this.payAmount, 
				luckDrawNumber: count
			}
			couponLuckDrawService(params).then(r => {
				this.couponList = r.data.list
				console.log(this.couponList)
				// if(this.couponList.length > 0){
				// 	this.popupPayOpen(count);
				// }else{
				// 	console.log('未拥有可使用优惠券')
				// 	this.lottery(count)
				// }
			})
		},
		openCouponShow(){
			this.couponShow = true;
		},
		noChoose(){
			showLoading('正在计算')
			setTimeout(()=>{
				this.coupon = 'none';
				if(this.count == 1){
					this.payAmount = this.lotteryDrawsButPrices.onePrice
				}
				if(this.count == 5){
					this.payAmount = this.lotteryDrawsButPrices.fivePrice
				}
				if(this.count == 10){
					this.payAmount = this.lotteryDrawsButPrices.tenPrice
				}
				this.couponShow = false;
				hideLoading()
			},1000)
		},
		chooseCoupon(item){
			showLoading('正在计算')
			setTimeout(()=>{
				this.coupon = item;
				if(this.count == 1){
					this.payAmount = this.lotteryDrawsButPrices.onePrice;
					this.payAmount = (this.payAmount - item.couponAmount) > 0 ? (this.payAmount - item.couponAmount) : 0;
				}
				if(this.count == 5){
					this.payAmount = this.lotteryDrawsButPrices.fivePrice;
					this.payAmount = (this.payAmount - item.couponAmount) > 0 ? (this.payAmount - item.couponAmount) : 0;
				}
				if(this.count == 10){
					this.payAmount = this.lotteryDrawsButPrices.tenPrice;
					this.payAmount = (this.payAmount - item.couponAmount) > 0 ? (this.payAmount - item.couponAmount) : 0;
				}
				this.couponShow = false;
				hideLoading()
			},1000)
		},
		/**
		 * 舞台产品列表
		 */
		getProductList() {
			showLoading('加载中')
			let id = this.id
			LotteryGroupProductListService(id).then(r => {
				this.mainProductList = r.data
				hideLoading();
			})
		},

		/**
		 * 获取抽奖按钮价格
		 */
		getLotteryDrawsPrices() {
			showLoading('加载中')
			let id = this.id
			getLotteryDrawsPricesServer(id).then(r => {
				this.lotteryDrawsButPrices = r.data
				hideLoading();
			})
		},

		/**
		 * 点击卡牌
		 * @param {Object} i
		 */
		cardClick(i) {
			let item = this.lotteryResultsList[i];
			console.log('当前所翻卡牌 ',item);
			// this.playMusic('flop',1)
			//翻出S级或SSS级
			if(item.productGrade === 'S' || item.productGrade === 'SSS'){
				this.popCard = item;
				this.popupCardShow = true;
			}
			//翻牌 ->暂更改为默认翻牌
			// if (this.showFlippingBut) {
			// 	item.flipping = true
				// this.totalPrice = floatAdd(this.totalPrice, item.sellPrice)
				// this.sellPriceTotal = floatAdd(this.sellPriceTotal, this.oneSellPrice)
				// item.select = false
				// item.sell = true
				// console.log('this.sellPriceTotal', this.sellPriceTotal)
			// }
			//是否全部翻牌 ->暂更改为默认自动翻牌
			// if (this.lotteryResultsList.findIndex(t => t.flipping === false) == -1 && this.showFlippingBut) {
			// 	this.allFlippingState = true
			// 	this.showFlippingBut = false
			// 	this.showLotteryBut = true
			// 	this.oneClickSellState = true

			// 	item.select = false
			// 	item.sell = true
			// 	console.log('全部翻牌全部翻牌全部翻牌')
			// 	return
			// }

			
		},
		oneSellClick(i){
			this.playMusic('sellde',1)
			let item = this.lotteryResultsList[i];
			//如果全翻
			if (this.allFlippingState) {
			
				// console.log('this.allFlippingState', this.allFlippingState)
				// console.log('this.sellPriceTotal', this.sellPriceTotal, this.oneSellPrice)
				if (this.confirmSellState && item.confirmSellState) {
					return
				}
				if (this.oneClickSellState) {
					this.oneSell(item)
					// item.select = !item.select
					// item.sell = !item.sell
					// console.log('this.oneClickSellState', this.oneClickSellState)
				}
				// 取消选择寄售
				// if (item.select && item.sell == false) {
				// 	this.sellPriceTotal = floatSub(this.sellPriceTotal, this.oneSellPrice)
				// 	// console.log('this.sellPriceTotal-false', this.sellPriceTotal, this.oneSellPrice)
				// }
				// // 确定选择寄售
				// if (item.sell && item.select == false) {
				// 	this.sellPriceTotal = floatAdd(this.sellPriceTotal, this.oneSellPrice)
				// 	// console.log('this.sellPriceTotal-true', this.sellPriceTotal)
				// }
				// console.log('this.sellPriceTotal-end', this.sellPriceTotal, this.oneSellPrice)
			}
			// console.log('cardClick-this.lotteryResultsList', this.lotteryResultsList)
		},
		allFlipping() {
			// showLoading('加载中')
			// this.playMusic('flop',1);
			// this.allFlippingState = true
			// this.showFlippingBut = false
			// this.showLotteryBut = true
			// this.oneClickSellState = true
			// this.lotteryResultsList.forEach((item, index) => {
			// 	item.flipping = true
			// 	item.sell = true
			// 	item.select = false
			// 	// this.totalPrice = floatAdd(this.totalPrice, item.sellPrice)
			// 	// item.sellPrice = this.oneSellPrice
			// 	// this.sellPriceTotal += item.sellPrice 
			// })
			// this.sellPriceTotal = floatMul(this.oneSellPrice, this.lotteryPlayCardCount)
			// console.log('this.lotteryResultsList', this.lotteryResultsList)
			// console.log('this.sellPriceTotal', this.sellPriceTotal)
			//全部翻牌假设翻出高级卡牌
			this.popCardList = this.lotteryResultsList.filter(item => item.productGrade === 'SSS' || item.productGrade === 'S');
			console.log('popCardList',this.popCardList)
			if(this.popCardList.length !== 0){
				// this.popCard = this.popCardList[0];
				// console.log('第一次展示卡牌组的当前卡牌',this.popCard);
				// this.popupCardListShow = true;
				// this.popCardList.shift();
				this.nextPopCardShow();
			}
			// hideLoading();
		},
		resetPrizepoolCardList() {
			this.prizepoolCardList.forEach((item, index) => {
				item.flipping = false
				item.select = false
				item.sell = false
				item.confirmSellState = false
				item.sellPrice = 0

			});
			this.totalPrice = 0
			// this.sellPriceTotal = 0
		},

		oneClickSell() {
			this.oneClickSellState = true
			this.lotteryResultsList.forEach((item, index) => {
				item.sell = true
			});
		},
		openSellSuccessModal(time = 300) {
			this.sellModalSuccessShow = true
			setTimeout(() => {
				this.sellModalSuccessShow = false
			}, time)
		},
		sellModaClose() {
			this.sellModalSuccessShow = false
		},
		oneSell(item) {
			this.confirmSellState = true
			if (item.confirmSellState) {
				return
			}

			let that = this

			sellUserProductService({
				knapsackIds: [item.knapsackId]
			}).then(r => {
				item.confirmSellState = true
				this.sellPriceTotal = floatSub(this.sellPriceTotal, this.oneSellPrice)
				// this.playMusic('sell',1)
				this.openSellSuccessModal()
				// let uToast = {
				// 	type: 'success',
				// 	title: '寄售成功',
				// 	message: "寄售成功",
				// 	duration: 300
				// }
				// that.showUToast(uToast, null, 'confirmSell_uToast')
			})

		},
		allConfirmSell() {
			showLoading('加载中')
			this.playMusic('sellde',1)
			this.confirmSellState = true
			let surplus = 0
			this.lotteryResultsList.forEach((item, index) => {
				if (item.sell) {
					if (item.confirmSellState === false) {
						this.knapsackIdsArr.push(item.knapsackId)
					}
					if (item.confirmSellState) {
						return;
					}
					item.confirmSellState = true
				} else {
					item.sell = !item.sell
					item.select = !item.select
					surplus++
				}
			});

			// console.log('knapsackIdsArr', this.knapsackIdsArr)
			// console.log('surplus', surplus)

			let that = this

			if (!this.knapsackIdsArr.length >= 1) {
				hideLoading();
				return
			}

			sellUserProductService({
				knapsackIds: this.knapsackIdsArr
			}).then(r => {
				hideLoading()
				this.sellPriceTotal = floatMul(this.oneSellPrice, surplus)
				that.knapsackIdsArr = []
				// this.playMusic('sell',1)
				this.openSellSuccessModal()
				// let uToast = {
				// 	type: 'success',
				// 	title: '寄售成功',
				// 	message: "寄售成功",
				// 	duration: 300
				// }
				// that.showUToast(uToast, null, 'confirmSell_uToast')
			})

			console.log('confirmSell-this.lotteryResultsList', this.lotteryResultsList)
			// console.log('this.knapsackIdsArr', this.knapsackIdsArr)

		},

		playMusic(type, count) {
			return
			//先停止上一次的播放
			this.innerAudioContext.stop()
			//建立新的声音对象
			this.innerAudioContext = uni.createInnerAudioContext();
			// return
			// let src = this.music[type].src
			let src = this.music[type].src
			let duration = this.music[type].duration
			let allduration = duration * count
		
			this.innerAudioContext.src = src
			this.innerAudioContext.autoplay = false;
			
			if(count === 1){
				this.innerAudioContext.loop = false;
				this.innerAudioContext.play()
			}else if(count > 1){
				this.innerAudioContext.loop = true;
				this.innerAudioContext.play()
			}else{
				console.log('count参数错误:',count)
				return;
			}
			
			// for (let i = 0; i < count; i++) {
			// 	this.innerAudioContext.play()
			// }
		
			setTimeout(() => {
				this.innerAudioContext.stop()
			}, allduration)
		
			console.log('duration', duration, 'allduration', allduration, 'count', count)
			
		
			this.innerAudioContext.onPlay((e) => {
				console.log('开始播放',e)
			});
			
			// this.innerAudioContext.onCanplay(() => {
			// 	console.log('准备播放')
			// 	console.log('duration',this.innerAudioContext.duration);
			// 	console.log('currentTime',this.innerAudioContext.currentTime);
			// 	console.log('paused',this.innerAudioContext.paused);
			// 	console.log('buffered',this.innerAudioContext.buffered);
				
			// });
		
			this.innerAudioContext.onStop((e) => {
				console.log('停止播放',e)
			});
		
			
		
			this.innerAudioContext.onError((err) => {
				console.log('playMusic-onError', err)
			});
		},
		pay() {
			if(this.payChoose == 'balpay'){
				this.balpay(this.count);
			}else if(this.payChoose == 'wechatpay'){
				this.wechatMiniPay();
			}
		},
		alipay() {
			this.pay()
		},
		wechatpay() {
			this.pay()
		},
		payMethod(e){
			showLoading('加载中')
			setTimeout(() => {
				this.payChoose = e;
				console.log(this.payChoose);
				hideLoading()
			},500)
		},
		balpay(count){
			if(this.balpayCheck() === false){
				return
			}
			this.lottery(count);
		},
		wechatMiniPay() {
			if (this.wechatMiniPayCheck() === false) {
				return
			}
			let params = {
				// openId: this.userInfo.openId,
				// paymentAmount: this.payAmount,
				paymentDescription: this.payTitle,
				groupId: this.id,
				quantity: this.payQuantity,
				couponId: this.coupon.id,
				// 0主动选择微信支付 1余额不足时被动使用微信支付
				paymentMethod: this.payChoose == 'wechatpay' ? 0 : 1
			}
			console.log('wechatMiniPay-params', params)
			let that = this

			wechatMiniCreatePaymentServer(params).then(r => {
				console.log('调试1',r);
				if(r.code == 1 && r.data == null){
					hideLoading()
					showLoading('正在等待')
					setTimeout(() => {
						that.popupPayShow = false
						that.getAndUpdateUserInfo();
						that.getCouponList();
						hideLoading();
						showToast('余额充值成功~')
					},3000)
					return;
				}
				const body = r.data.wechatResponseEntity.body;
				//获取订单号
				const orderNo = r.data.orderNo;
				this.paymentParams = body
				//调起微信小程序支付界面
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: body.timeStamp,
					nonceStr: body.nonceStr,
					package: body.package,
					signType: body.signType,
					paySign: body.paySign,
					success: function(res) {
						console.log('requestPayment-success:' + JSON.stringify(res));
						
						//查询支付后的订单以检查状态
						wechatQueryTransaction(orderNo).then(res => {
							if(res.success == true){
									let uToast = {
										type: 'success',
										title: '支付成功',
										message: "支付成功",
										duration: 3000
									}
									console.log('已弹窗',uToast);
									that.showUToast(uToast, () => {
										that.popupPayShow = false
										that.getAndUpdateUserInfo()
										hideLoading();
									}, 'Pay_uToast')
							}else{
								let uToast = {
									type: 'error',
									title: '订单支付失败或处于支付中',
									message: "订单支付失败或处于支付中",
									duration: 3000
								}
								
								that.showUToast(uToast, () => {
									that.popupPayShow = false
									that.getAndUpdateUserInfo()
									hideLoading();
								}, 'Pay_uToast')
							}
						})
						
					},
					fail: function(err) {
						wechatQueryTransaction(orderNo).then(res => {
							let uToast = {
								type: 'error',
								title: '取消或支付失败',
								message: "取消或支付失败",
								duration: 3000
							}
							
							that.showUToast(uToast, () => {
								that.popupPayShow = false
								that.getAndUpdateUserInfo()
								hideLoading();
							}, 'Pay_uToast')
						})
					
						console.log('requestPayment-fail:' + JSON.stringify(err));
					}
				});
			})
		},
		balpayCheck(){
			if (this.agreement == 'reject') {
				uni.$u.toast('请阅读并勾选同意协议')
				return false
			}
			return true;
		},
		wechatMiniPayCheck() {
			if (this.agreement == 'reject') {
				uni.$u.toast('请阅读并勾选同意协议')
				return false
			}
			if (this.userInfo.openId == null) {
				uni.$u.toast('未绑定openId,请联系客服重新登录注册帐号')
				return false
			}
			return true

		},
		checkboxChange(e) {
			this.agreement = this.agreement == 'reject' ? 'agree' : 'reject'
			// console.log('this.agreement', this.agreement)
			// console.log('checkboxChange', e)
		},

		showUToast(params, callback = null, ref = 'uToast') {
			this.$refs[ref].show({
				...params,
				complete() {
					callback && callback()
				}
			})
			return
		},

		async resize() {
			//非小程序
			// #ifndef MP-WEIXIN
			let allHeight = this.systemInfo.safeArea.height - this.systemInfo.safeAreaInsets.top
			// #endif

			//小程序内
			// #ifdef MP-WEIXIN
			// let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			// let allHeight = this.systemInfo.screenHeight - this.systemInfo.safeAreaInsets.top - menuButtonInfo
			let allHeight = this.systemInfo.screenHeight - this.systemInfo.safeAreaInsets.top

			// #endif

			let header = await this.queryRect('.top-header')
			let footer = await this.queryRect('.wrap-footer')
			// let tmp_header = await this.queryRect('.tmp-header')
			let headerHeight = header.height
			let footerHeight = footer.height
			// let tmp_headerHeight = tmp_header.height
			let tmp_headerHeight = 87

			//底部定位高度
			let footerPositionHeight = this.systemInfo.screenHeight - footer.bottom
			let height = (allHeight - footerPositionHeight - headerHeight - footerHeight -
				tmp_headerHeight) - 10;

			// console.log('header', header)
			// console.log('footer', footer)
			// console.log('headerHeight', headerHeight)
			// console.log('footerHeight', footerHeight)
			// console.log('allHeight', allHeight)
			console.log('height', height)
			this.lotteryPlayCardWrapHeight = height;
		},
		// 获取尺寸
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
