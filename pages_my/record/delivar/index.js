import { getUserOrderService } from '@/service/index.js';
import { showToast,navigateBack,navigateTo,hideLoading,showLoading } from '@/shared';
import routerAlias from '@/routers/alias.js';
	
	export default{
		data(){
			return{
				topTabList: [{
						name: '全部',
					},
					{
						name: '待发货',
					},
					{
						name: '已发货'
					},
					{
						name: '待确认'
					},
					{
						name: '已确认'
					}
					
				],
				topTablineBg: ('https://static.duolachaowan.com/static/common/tabdot.png'),
				noCouponImg: ('https://static.duolachaowan.com/static/my/nocoupon.png'),
				topTabIndex: 0,
				orderList:[],
				orderStatusList:[],
				ishurry: true,
				holderHeight: 0,
				listPage: 0,
				listTotal: 10
			}
		},
		onLoad(){
			this.holderHeight = uni.getWindowInfo().statusBarHeight
		},
		onShow(){
			this.getOrderList()
			this.holderHeight = uni.getWindowInfo().statusBarHeight
		},
		onPullDownRefresh(){
			this.listTotal = this.listTotal + 10;
			this.getOrderList();
		},
		onReachBottom(){
			this.listTotal = this.listTotal + 10;
			this.getOrderList();
		},
		methods:{
			goBack() {
				navigateBack();
			},
			topTabClick(i) {
				// showLoading('加载中...');
				// setTimeout(() => {
				// 	this.topTabIndex = i.index;
				// 	hideLoading();
				// }, 500)
				this.topTabIndex = i.index;
			},
			getOrderList(){
				showLoading('加载中');
				let params = {
					pageSize: this.listTotal, 
					pageNum: 1
				}
				getUserOrderService(params).then(res => {
					hideLoading();
					if( this.orderList.length === res.data.total ){
						showToast('暂无更多加载信息哦~');
					}else{
						this.orderList = res.data.list;
					}
				})
			},
			hurry(){
				showToast('催促成功~');
				this.ishurry = false;
				setTimeout(function(){
					this.ishurry = true;
				},86400000)
			},
			goPage(r){
				let url = routerAlias[r];
				navigateTo(url);
			}
		}
	}