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
} from '@/shared';
import { 
	userinfoService,
	seckillThisDetailService,
	seckillThisCodeArrayService,
	seckillCodeRankService,
	seckillMyCodeRankService,
} from '@/service/index.js'

export default {
	data() {
		return {
			topTabList: [{
					name: '邀请排行',
				},
				{
					name: '我的签号',
				},
			],
			holderHeight:0,
			topTablineBg: ('https://static.duolachaowan.com/static/common/tabdot.png'),
			noCouponImg: ('https://static.duolachaowan.com/static/my/nocoupon.png'),
			topTabIndex: 0,
			prodDetail:{},
			userInfo:{},
			codeList:[],
			codeRankList:[],
			myCodeRank: ''
		};
	},
	computed: {

	},
	onShow() {
		this.pageOnLoad()
	},
	onLoad(options) {
		this.prodDetail = options;
		this.pageOnLoad();
		wx.showShareMenu({
		    withShareTicket:true,
		    //设置下方的Menus菜单，才能够让发送给朋友按钮可以点击
		    menus:["shareAppMessage"]
		})
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
	onReady() {
	},
	methods: {
		fuzzyPhone,
		pageOnLoad() {
			if(this.prodDetail){
				this.getProdDetail();
				this.getAndUpdateUserInfo()
				this.getMyCode();
				this.getCodeRankList();
				this.getMyCodeRank();
			}else{
				showToast('未获取到商品详情')
			}
			this.holderHeight = uni.getWindowInfo().statusBarHeight
		},
		goBack() {
			navigateBack();
		},
		topTabClick(i){
			this.topTabIndex = i.index;
		},
		//更新用户信息
		async getAndUpdateUserInfo() {
			try{
				const r = await userinfoService();
				this.userInfo = r.data.loginUser || {};
				this.$store.commit('user/UPDATE_USER_INFO', r.data.loginUser);
			}catch(e){
				console.log('更新用户信息失败 ==>>',e)
			}
		},
		//查询当前秒杀物品信息
		async getProdDetail(){
			try{
				const r = await seckillThisDetailService(this.prodDetail.id)
				this.prodDetail = r.data || {};
			}catch(e){
				console.log('查询当前秒杀物品信息失败 ==>>',e)
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
		//查询抽签码排名
		async getCodeRankList(){
			try{
				let params = {
					pageSize: 10,
					pageNum: 1,
					seckillId: this.prodDetail.id
				}
				const r = await seckillCodeRankService(params)
				this.codeRankList = r.data.list
			}catch(e){
				console.log('查询抽签码排名 ==>>',e)
			}
		},
		//查询自己抽签码的排名
		async getMyCodeRank(){
			try{
				const r = await seckillMyCodeRankService(this.prodDetail.id)
				this.myCodeRank = r.data.rownum
			}catch(e){
				console.log('查询自己抽签码的排名 ==>>',e)
			}
		}
	}
};
