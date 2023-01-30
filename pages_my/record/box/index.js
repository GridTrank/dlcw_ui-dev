import {navigateBack, navigateTo, showLoading,hideLoading, showToast} from '@/shared';
import { getLotteryRecordService } from '@/service/index.js'
import routerAlias from '@/routers/alias.js';
	export default{
		data(){
			return {
				topTabList: [{
						name: '全部',
					},
					// {
					// 	name: '单盒购买',
					// },
					// {
					// 	name: '玩法抽取'
					// }
				],
				topTablineBg: ('https://static.duolachaowan.com/static/common/tabdot.png'),
				tipsIcon: ('https://static.duolachaowan.com/static/my/tipsicon.png'),
				topTabIndex: 0,
				lotteryRecordList:[],
				listPage: 0,
				listTotal:10
			}
		},
		onShow(){
			this.getLotteryRecordList();
			this.holderHeight = uni.getWindowInfo().statusBarHeight
		},
		onPullDownRefresh(){
			this.listTotal = this.listTotal + 10;
			this.getLotteryRecordList();
		},
		onReachBottom(){
			this.listTotal = this.listTotal + 10;
			this.getLotteryRecordList();
		},
		methods:{
			goBack() {
				navigateBack();
			},
			goPage(r){
				let url = routerAlias[r];
				navigateTo(url);
			},
			topTabClick(i) {
				// showLoading('加载中...');
				// setTimeout(() => {
				// 	this.topTabIndex = i.index;
				// 	hideLoading();
				// }, 500)
				this.topTabIndex = i.index;
			},
			getLotteryRecordList(){
				showLoading('加载中');
				let params = {
					pageSize: this.listTotal, 
					pageNum: 1
				}
				getLotteryRecordService(params).then(res => {
					hideLoading();
					if(this.lotteryRecordList.length === res.data.total){
						showToast('暂无更多加载信息哦~');
					}else{
						this.lotteryRecordList = res.data.list;
					}
				})
			}
		}
	}