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
import { getUserKnapsackService,addGiftService } from '@/service/index.js';
import { mapGetters, mapState } from 'vuex';
	
export default{
		data(){
			return{
				topTabList: [{
						name: '全部',
					},
				],
				topTablineBg: ('https://static.duolachaowan.com/static/common/tabdot.png'),
				noCouponImg: ('https://static.duolachaowan.com/static/my/nocoupon.png'),
				topTabIndex: 0,
				bagList:[],
				bagListLevel:[],
				lastbaglength:0,
				showDetails:false,
				details: {},
				detailsImg: ('https://static.duolachaowan.com/static/my/details.png'),
				level: null,
				holderHeight: 0,
				listTotal: 50,
				giveShow: false,
				giveCode: '',
				giveItem: {}
			}
		},
		onShow(){
			this.getUserKnapsack();
			this.holderHeight = uni.getWindowInfo().statusBarHeight;
			console.log(this.listTotal);
		},
		onPullDownRefresh(){
			this.listTotal = this.listTotal + 10;
			this.getUserKnapsack();
			wx.stopPullDownRefresh();
		},
		onReachBottom(){
			this.listTotal = this.listTotal + 10;
			this.getUserKnapsack();
		},
		methods:{
			goBack() {
				navigateBack();
			},
			chooseLevel(l){
				showLoading('加载中')
				this.level = l;
				this.getUserKnapsack();
				hideLoading();
			},
			topTabClick(i) {
				showLoading('加载中...');
				this.topTabIndex = i.index;
				this.level = null;
				if(this.topTabIndex == 0){
					let params = {
						pageSize: this.listTotal, 
						pageNum: 1,
						rareLevel: this.level
					}
					getUserKnapsackService(params).then(res => {
						setTimeout(() => {
							hideLoading();
						}, 100)
						this.bagList = res.data.list
					})
				}else{
					setTimeout(() => {
						hideLoading();
					}, 500)
				}
			},
			showClose(){
				this.showDetails = false;
			},
			showOpen(item){
				this.details = item;
				this.showDetails = true;
			},
			openGiveShow(item){
				this.giveItem = item;
				this.giveShow = true;
				console.log('当前选中物品:',item)
			},
			closeGiveShow(){
				this.giveShow = false;
			},
			getGiveCode(e){
				this.giveCode = e;
			},
			sell(r,item){
				showLoading('加载中')
				if(this.$store.state.user.sellList.length >= 20){
					hideLoading();
					showToast('最大选择20个，请到“我的”-“寄售记录”下方点击查看寄售列表里进行查看哦~');
					return;
				}
				if(this.$store.state.user.sellList.every(i => i.id != item.id)){
					this.showDetails = false;
					this.$store.commit('user/ADD_USER_SELLLIST',item);
					hideLoading()
					showToast('添加成功~');
					let url = routerAlias[r];
					navigateTo(url)
				}else{
					hideLoading()
					showToast('已添加该物品，请到“我的”-“寄售记录”下方点击查看寄售列表里进行查看哦~')
				}
			},
			sent(r,item){
				showLoading('加载中')
				if(this.$store.state.user.sentList.length >= 20){
					hideLoading();
					showToast('最大选择20个，请到“我的”-“发货记录”下方点击查看发货列表里进行查看哦~');
					return;
				}
				if(this.$store.state.user.sentList.every(i => i.id != item.id)){
					this.showDetails = false;
					this.$store.commit('user/ADD_USER_SENTLIST',item);
					hideLoading()
					showToast('添加成功~');
					let url = routerAlias[r];
					navigateTo(url)
				}else{
					hideLoading()
					showToast('已添加该物品，请到“我的”-“发货记录”下方点击查看发货列表里进行查看哦~')
				}
			},
			give(){
				showLoading('加载中');
				console.log('所赠送的物品:',this.giveItem);
				let params = {
					knapsackIds: [this.giveItem.id],
					receiverId: this.giveCode
				}
				addGiftService(params).then(res => {
					if(res.code == 1){
						//刷新
						let params2 = {
							pageSize: this.listTotal,
							pageNum: 1,
							rareLevel: this.level
						}
						getUserKnapsackService(params2).then(res => {
							this.bagList = res.data.list
							hideLoading();
							showToast('赠送成功~');
						}).catch(r => {
							hideLoading();
							showToast('未知错误，请稍后重试')
						})
						//关闭弹窗重置状态
						this.giveShow = false;
						this.showDetails = false;
						this.giveItem = [];this.giveCode = '';
					}
				}).catch(r => {
					hideLoading();
					showToast('网络错误及其他错误，请稍后重试');
				})
			},
			getUserKnapsack(){
				showLoading('加载中');
				let params = {
					pageSize: this.listTotal, 
					pageNum: 1,
					rareLevel: this.level
				}
				getUserKnapsackService(params).then(res => {
					if(this.bagList.length === res.data.total){
						showToast('已经加载完了哦~')
					}
					this.bagList = res.data.list
					hideLoading();	
				}).catch(r => {
					hideLoading();
					showToast('网络请求出错，请稍后重试');
				})
			},
			allsell(){
				showLoading('加载中')
				if(this.$store.state.user.sellList.length >= 20){
					hideLoading();
					showToast('最大选择20个，请到“我的”-“寄售记录”下方点击查看寄售列表里进行查看哦~');
					return;
				}
				if(this.bagList.length > 0){
					let ary = [];
					this.bagList.forEach((item) => {
						if(this.$store.state.user.sentList.every(i => i.id != item.id) && this.$store.state.user.sellList.every(i => i.id != item.id) && item.isConsignment !== 1){
							ary.push(item);
						}
					})
					this.$store.commit('user/ADD_USER_SELLLIST',ary);
					hideLoading();
					showToast('操作成功~')
					navigateTo('/pages_my/bag/sell')
				}else{
					showToast('背包空空如也哦~')
				}
			}
		}
	}