import { getUserConsignmentService } from '@/service/index.js'
import { navigateBack, navigateTo,showToast,showLoading,hideLoading } from '@/shared';
import routerAlias from '@/routers/alias.js';


export default{
	data(){
		return {
			userConsignmentList:[
				// {
				// 	id:1,
				// 	productName:'YaBi契约精神',
				// 	createTime:'2022.07.12  14:01:15',
				// 	recycleAmount: 79,
				// 	productPic:'aaa'
				// }
			],
			noCouponImg: ('https://static.duolachaowan.com/static/my/nocoupon.png'),
			holderHeight:0,
			listTotal: 10
		}
	},
	onShow(){
		this.getUserConsignmentList();
		this.holderHeight = uni.getWindowInfo().statusBarHeight
	},
	onPullDownRefresh(){
		this.listTotal = this.listTotal + 10;
		this.getUserConsignmentList();
	},
	onReachBottom(){
		this.listTotal = this.listTotal + 10;
		this.getUserConsignmentList();
	},
	methods:{
		goBack() {
			navigateBack();
		},
		getUserConsignmentList(){
			showLoading('加载中');
			let params = {
				pageSize: this.listTotal,
				pageNum: 1
			}
			getUserConsignmentService(params).then(res => {
				hideLoading();
				console.log(res)
				if( this.userConsignmentList.length === res.data.total ){
					showToast('暂无更多加载信息哦~');
				}else{
					this.userConsignmentList = res.data.list;
				}
			})
		},
		goPage(r){
			let url = routerAlias[r];
			navigateTo(url);
		}
	}
}