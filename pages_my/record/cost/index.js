import { getUserChargeService } from '@/service/index.js';
import { hideLoading, navigateBack, showLoading, showToast } from '@/shared';
	export default{
		data(){
			return{
				topTabList: [{
						name: '全部',
					},
					// {
					// 	name: '盲盒账单',
					// },
					// {
					// 	name: '运费账单'
					// }
				],
				rightArrow: ('https://static.duolachaowan.com/static/my/cost-arrow.png'),
				testImg: ('https://static.duolachaowan.com/static/my/costimg-test.png'),
				topTablineBg: ('https://static.duolachaowan.com/static/common/tabdot.png'),
				topTabIndex: 0,
				holderHeight: 0,
				costRecordList:[],
				listPage: 1,
				listTotal: 10,
			}
		},
		onShow(){
			this.getCostRecordList()
			this.holderHeight = uni.getWindowInfo().statusBarHeight
		},
		onPullDownRefresh(){
			this.listTotal = this.listTotal + 10;
			this.getCostRecordList();
		},
		onReachBottom(){
			this.listTotal = this.listTotal + 10;
			this.getCostRecordList();
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
			getCostRecordList(){
				showLoading('加载中')
				let params = {
					pageSize: this.listTotal,
					pageNum: 1,
					chargeDirection : 2
				}
				getUserChargeService(params).then(res => {
					hideLoading();
					if( this.costRecordList.length === res.data.total ){
						showToast('暂无更多加载信息哦~');
					}else{
						this.costRecordList = res.data.list;
					}
					// console.log(this.costRecordList)
				})
			}
		}
	}