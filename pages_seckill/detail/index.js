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
	fuzzyPhone,
	serializeUrl
} from '@/shared';
import { seckillDrawService,
		 seckillThisDetailService,
		 userinfoService,
		 seckillThisCodeArrayService,
		 seckillGetPrizeListService,
		 seckillGetInviteProgressService,
		 seckillGetInviteAuthService,
		 seckillInviteUserListService,
		 seckillDlbBuyCode,
		 seckillInvitedToCodeService,
		 wechatGroupService,
} from '@/service/index.js';

export default {
	data() {
		return {
			holderHeight:0,
			joinSuccessShow: false,
			numShow: false,
			dlbBuyShow: false,
			shareShow: false,
			imgShow: false,
			assistSuccessShow:false,
			assistFailedShow:false,
			assistAgainShow:false,
			drawingShow:false,
			btnList:['中奖名单','商品详情'],
			current:0,
			winList:[],
			signNum:1,
			prodDetail:{},
			code: '',
			userInfo:{},
			codeList:[],
			inviteProgress:{},
			inviteUrl:'',
			InviteUserList:[],
			wechatGroupImgUrl:'',
			seckillTimeData:{
				days: 999,
				hours: 999,
				minutes: 999,
				seconds: 999
			},
			popupRuleShow: false,
		};
	},
	computed: {

	},
	onReady() {},
	async onShow() {
		await this.pageOnLoad();
		if(this.prodDetail.seckillStatus && this.prodDetail.seckillStatus == 2){
			this.opendrawingShow();
		}
		if(this.prodDetail.isParticipate == 1 && this.prodDetail.seckillStatus == 0){
			this.openNumShow();
		}
	},
	onShareAppMessage(res) {
	    if (res.from === 'button') {// 来自页面内分享按钮
			//获取用户邀请码
	        console.log(res.target)
	    }
	    return {
	        title: `您的好友正在参加0元抽${this.prodDetail.title},快去帮他助力！！！`, //分享的名称
	        path: `/pages/index/index/index?inviteCode=${this.userInfo.inviteCode}&seckillId=${this.prodDetail.id}`,
	        mpId:'wx82feab7fe80ba47a' ,//此处配置微信小程序的AppId
			imageUrl: `${this.prodDetail.pic}`
	    }
	},
	async onLoad(options) {
		this.holderHeight = uni.getWindowInfo().statusBarHeight
		this.prodDetail = options;
		console.log('跳转页面prodDetail信息',this.prodDetail);
		await this.checkParams(options);
		await this.pageOnLoad();
		wx.showShareMenu({
		    withShareTicket:true,
		    //设置下方的Menus菜单，才能够让发送给朋友按钮可以点击
		    menus:["shareAppMessage"]
		})
	},
	methods: {
		fuzzyPhone,
		serializeUrl,
		checkParams(obj){
			if(obj.inviteCode){
				this.prodDetail.id = obj.seckillId;
				this.getProdDetail();
				this.getAndUpdateUserInfo();
				showLoading('正在加载')
				let params = {
					inviteCode: obj.inviteCode,
					seckillId: obj.seckillId
				}
				this.inviteGetCode(params)
				this.getProdDetail();
				this.getMyCode();
				console.log('当前物品详情',this.prodDetail)
				hideLoading()
			}else{
				console.log('未获取到邀请助力信息')
			}
		},
		async pageOnLoad(){
			if(this.prodDetail){
				// await this.getProdDetail();
				await this.getWinList();
				await this.getInviteUserList();
				await this.getInviteProgress();
				if(this.prodDetail.isParticipate == 1){
					await this.getAndUpdateUserInfo()
					await this.getMyCode();
				}else{
					console.log('用户未参与或未登录');
				}
			}else{
				console.log('该物品不存在!',this.prodDetail)
			}
		},
		//基础配置类
		goBack() {
			navigateBack();
		},
		listChange(i){
			this.current = i;
		},
		goRanking() {
			let page = routerAlias.RANKING_INDEX_PAGE;
			navigateTo(page,this.prodDetail);
		},
		goPage(r){
			let url = routerAlias[r];
			navigateTo(url);
		},
		openJoinSuccessShow(){
			this.joinSuccessShow = true;
		},
		openNumShow(){
			this.joinSuccessShow = false;
			this.numShow = true;
		},
		closeNumShow(){
			this.numShow = false;
			let url = routerAlias['SECKILL_DETAIL_PAGE'];
			// navigateTo(url,this.prodDetail)
		},
		opendlbBuyShow(){
			this.getAndUpdateUserInfo();
			this.signNum = 1;
			this.dlbBuyShow = true;
		},
		closedlbBuyShow(){
			this.dlbBuyShow = false;
		},
		openShareShow(){
			this.shareShow = true;
		},
		closeShareShow(){
			this.shareShow = false;
		},
		openImgShow(){
			this.imgShow = true;
		},
		closeImgShow(){
			this.imgShow = false;
		},
		openAssistSuccessShow(){
			this.assistSuccessShow = true;
		},
		closeAssistSuccessShow(){
			this.assistSuccessShow = false;
		},
		openAssistFailedShow(){
			this.assistFailedShow = true;
		},
		closeAssistFailedShow(){
			this.assistFailedShow = false;
		},
		openAssistAgainShow(){
			this.assistAgainShow = true;
		},
		closeAssistAgainShow(){
			this.assistAgainShow = false
		},
		opendrawingShow(){
			this.drawingShow = true;
		},
		closedrawingShow(){
			
		},
		popupRuleOpen(){
			this.popupRuleShow = true;
		},
		popupRuleClose(){
			this.popupRuleShow = false;
		},
		valChange(e) {
			this.signNum = e.value;
			console.log('值',this.signNum)
		},
		seckillTimeChange(e){
			this.seckillTimeData = e;
			if(this.seckillTimeData.days == 0 && this.seckillTimeData.hours == 0 && this.seckillTimeData.minutes == 0 && this.seckillTimeData.seconds == 0){
				this.opendrawingShow()
			}
		},
		//开发功能类
		getSubscribeMessage(){
			let ary = [
				'NHVceicwu6cGqBfj-d4ZQFR52I8vPNRyMvqAnLbSNBQ'
			]
			wx.requestSubscribeMessage({
				tmplIds: ary,
				success: (res) => {
					console.log(res)
					this.openNumShow()
				},
				fail: (e) => {
					console.log(e)
				}
			})
		},
		share(){
			// uni.setClipboardData({
			// 	data: this.inviteUrl,
			// 	success: function () {
			// 		console.log('success');
			// 		showToast('链接复制成功，快去分享给你的好友吧~')
			// 	}
			// });
			 // wx.downloadFile({
			 //   url: "https://static.duolachaowan.com/8a5acb3a-fe79-43f5-8d04-09df3e5bf285.jpeg",
			 //   success: (res) => {
			 //     wx.showShareImageMenu({
			 //       path: res.tempFilePath
			 //     })
			 //   }
			 // })
		},
		//展示企业微信群二维码
		async showWechatGroupQRCode(){
			try{
				const r = await wechatGroupService()
				this.wechatGroupImgUrl = r.data;
				this.openShareShow();
			}catch(e){
				console.log('展示企业微信群二维码 ==>>',e)
			}
		},
		//去邀请
		invite(){
			console.log('生成连接:',this.inviteUrl)
		},
		//查询抽签的中奖列表
		async getWinList(){
			try{
				let params = {
					pageSize: 10, 
					pageNum: 1, 
					seckillId: this.prodDetail.id
				}
				const r = await seckillGetPrizeListService(params)
				this.winList = r.data.list
			}catch(e){
				console.log('查询抽签的中奖列表 ==>>',e)
			}
		},
		//查询抽签已邀请的用户列表
		async getInviteUserList(){
			try{
				let params = {
					pageSize: 10,
					pageNum: 1,
					seckillId: this.prodDetail.id
				}
				const r = await seckillInviteUserListService(params)
				this.InviteUserList = r.data.list;
			}catch(e){
				console.log('查询抽签已邀请的用户列表 ==>>',e)
			}
		},
		//参与抽奖
		joinDraw(){
			showLoading('正在拼命参与');
			//强制检测登录
			this.$store.dispatch('user/checkAuth', true);
			seckillDrawService(this.prodDetail.id).then(r => {
				if(r.code == 1){
					this.joinDrawSuccessBack(r.data);
				}
			})
		},
		async joinDrawSuccessBack(code){
			this.code = code;
			await this.getAndUpdateUserInfo();
			await this.getInviteProgress();
			await this.getInviteAuth();
			await this.getMyCode();
			await this.getProdDetail();
			console.log('更新后用户状态',this.userInfo);
			console.log('所持签号列表',this.codeList);
			console.log('当前进度条',this.inviteProgress);
			console.log('当前物品信息',this.prodDetail);
			console.log('邀请连接',this.inviteUrl);
			hideLoading();
			this.joinSuccessShow = true;
		},
		//更新用户信息
		async getAndUpdateUserInfo() {
			try{
				const r = await userinfoService();
				this.userInfo = r.data.loginUser || {};
				this.$store.commit('user/UPDATE_USER_INFO', r.data.loginUser);
			}catch(e){
				console.log('更新用户信息失败 ==>>',e)
				return
			}
		},
		//获取邀请助力进度条
		async getInviteProgress(){
			try{
				const r = await seckillGetInviteProgressService(this.prodDetail.id)
				this.inviteProgress = r.data || 0;
			}catch(e){
				console.log('获取邀请助力进度条失败 ==>>',e)
				return
			}
		},
		//获取邀请凭证
		async getInviteAuth(){
			try{
				const r = await seckillGetInviteAuthService(this.prodDetail.id)
				this.inviteUrl = r.data || '';
			}catch(e){
				console.log('获取邀请凭证失败 ==>>',e)
				return
			}
		},
		//查询秒杀活动已有抽签码
		async getMyCode(){
			try{
				const r = await seckillThisCodeArrayService(this.prodDetail.id)
				this.codeList = r.data || [];
			}catch(e){
				console.log('查询秒杀活动已有抽签码失败 ==>>',e)
			}
		},
		//查询当前秒杀物品信息
		async getProdDetail(){
			try{
				const r = await seckillThisDetailService(this.prodDetail.id)
				this.prodDetail = r.data || {};
				if(this.prodDetail.startTime && this.prodDetail.startTime != 0){
					this.countDownTime(this.prodDetail.startTime)
				}else{
					console.log('倒计时不存在或格式错误',this.prodDetail.startTime);
				}
				// console.log('当前物品信息111',this.prodDetail)
			}catch(e){
				console.log('查询当前秒杀物品信息失败 ==>>',e)
			}
		},
		//火潮币兑换签码
		async dlbBuy(){
			showLoading('加载中')
			try{
				let params = {
					number: this.signNum,
					seckillId: this.prodDetail.id
				}
				const r = await seckillDlbBuyCode(params);
				if(r.code == 1){
					showToast('兑换成功~');
				}else{
					showToast(r.msg)
				}
				this.getAndUpdateUserInfo();
				this.getMyCode();
				this.dlbBuyShow = false;
				hideLoading();
			}catch(e){
				hideLoading();
				console.log('火潮币兑换签码失败 ==>>',e)
				return
			}
		},
		//邀请获得抽签码
		async inviteGetCode(params){
			try{
				const r = await seckillInvitedToCodeService(params);
				if(r.code == 1){
					this.joinDraw()
					this.openAssistSuccessShow();
				}
			}catch(e){
				if(e.code == 119){
					console.log('119')
					this.openAssistAgainShow();
				}
				if(e.code == 120){
					console.log('120')
					this.openAssistFailedShow()
				}
				console.log('邀请获得抽签码失败 ==>>',e)
			}
		},
		//时间变为毫秒值
		countDownTime(time){
			let date = new Date()
			time = time.replace(/-/g,'/');
			let date2 = new Date(time)
			let countDown = Number(Date.parse(date2) - Date.parse(date))
			return countDown > 0 ? countDown : 0
		}
		//生成海报
		// drawPoster(){
		// 	let that = this;
		// 	let myCanvas = uni.createCanvasContext();
		// 	myCanvas.clearRect(0,0,,320,420);
		// 	myCanvas.setFillStyle('#ffffff');
		// 	myCanvas.fillRect(0,0,320,420);
			
		// 	myCanvas.drawImage(that.prodDetail.pic,0,0,320,190)
			
		// 	myCanvas.setFillStyle('#ffffff');
		// 	myCanvas.font = '20px'
		// 	myCanvas.fillText(that.prodDetail.startTime,85,67,148)
		// 	myCanvas.fillText('-自动抽选-',85,45,148)
			
		// 	myCanvas.drawImage(that.userInfo.headImg,20,221,35,35)
			
		// 	myCanvas.draw(false,(res) => {
		// 		wx.canvasToTempFilePath({
		// 			canvansId: '',
		// 			fileType: 'jpeg',
		// 			success: (res) => {
		// 				this.drawPoster()	
		// 			}
		// 		})
		// 	})
		// }
	}
};
