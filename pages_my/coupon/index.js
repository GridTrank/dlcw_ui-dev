import { methods } from 'uview-ui/libs/mixin/mixin'
import {hideLoading, navigateBack, navigateTo, showLoading} from '@/shared';
import { userCouponService } from '@/service/index.js';
import routerAlias from '@/routers/alias';
export default{
	data(){
		return{
			topTabList: [{
					name: '可使用',
				},
				{
					name: '已使用',
				},
				{
					name: '已失效'
				}
			],
			topTablineBg: ('https://static.duolachaowan.com/static/common/tabdot.png'),
			noCouponImg: ('https://static.duolachaowan.com/static/my/nocoupon.png'),
			topTabIndex: 0,
			listTotal: 10,
			holderHeight:0,
			couponList:[
				// {
				// 	id:0,
				// 	couponLotteryType:0,
				// 	couponConditionAmount:40,
				// 	couponAmount:20,
				// 	couponExpireDate:'2022.9.27 23:59',
				// 	couponStatus: 0,
				// },
			]
		}
	},
	onShow(){
		this.getCouponList();
		this.holderHeight = uni.getWindowInfo().statusBarHeight;
	},
	onReachBottom(){
		showLoading('加载中')
		this.listTotal = this.listTotal + 10;
		this.getCouponList();
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
			showLoading('加载中')
			this.topTabIndex = i.index;
			this.getCouponList();
		},
		getCouponList(){
			let params = {
				pageSize: this.listTotal,
				pageNum: 1,
				couponStatus: this.topTabIndex
			}
			userCouponService(params).then(r => {
				console.log(r);
				this.couponList = r.data.list;
				hideLoading();
			})
		},
		goUse(r,item){
			let url = routerAlias[r];
			let obj = {id: item.groupId}
			console.log(url,obj);
			navigateTo(url,obj)
		}
	}
}