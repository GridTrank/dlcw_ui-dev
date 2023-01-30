import { seckillListService } from '@/service/index.js';
import { showToast,navigateBack,navigateTo,hideLoading,showLoading } from '@/shared';
import routerAlias from '@/routers/alias.js';
export default {
	data(){
		return {
			topTabList: [{
					name: '进行中',
				},
				{
					name: '已结束',
				},
			],
			topTablineBg: ('https://static.duolachaowan.com/static/common/tabdot.png'),
			noCouponImg: ('https://static.duolachaowan.com/static/my/nocoupon.png'),
			topTabIndex: 0,
			holderHeight: 0,
			prodList:[
				{	
					id:'',
					title:'',
					pic:'',
					price:'',
					participantNumber:'',
					prizeCount:'',
					startTime:'',
					seckillStatus: '',
					isParticipate: ''
				}
			],
			listTotal: 10
		}
	},
	onLoad(){
		// this.getProdList();
		this.holderHeight = uni.getWindowInfo().statusBarHeight
	},
	onShow(){
		this.topTabIndex = 0;
		showLoading('加载中')
		this.getProdList();
	},
	onReachBottom(){
		this.listTotal = this.listTotal + 10;
		this.getProdList();
	},
	methods:{
		goPage(r){
			let url = routerAlias[r];
			navigateTo(url);
		},
		lookDetail(r,item){
			let url = routerAlias[r];
			navigateTo(url,item);
		},
		topTabClick(i){
			showLoading('加载中');
			this.topTabIndex = i.index;
			this.getProdList();
		},
		goBack() {
			navigateBack();
		},
		//获取0元抽系列列表
		getProdList(){
			let params = {
				pageSize: this.listTotal,
				pageNum: 1,
				type: this.topTabIndex
			}
			seckillListService(params).then(r => {
				this.prodList = r.data.list;
				setTimeout(() => {
					hideLoading();
				},100)
			})
		}
	}
}