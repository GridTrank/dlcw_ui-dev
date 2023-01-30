import {navigateBack,showLoading,showToast,hideLoading} from '@/shared';
import { getUserChargeService } from '@/service/index.js';
	export default{
		data(){
			return{
				topTabList:[{
							name: '全部',
						},
						{
							name: '收入',
						},
						{
							name: '支出'
						}],
				topTablineBg: ('https://static.duolachaowan.com/static/common/tabdot.png'),
				topTabIndex: 0,
				recordList:[
					// {
					// 	chargeAmount: "59.00",
					// 	chargeDirection: 2, //动账方向（1收入 2支出）
					// 	chargeType: 0, //动账类型（0. 抽奖消费 1. 余额充值 2.平台寄售回收）
					// 	orderNo: null, //订单编号（充值使用）
					// 	userId: 1, //用户id
					// 	createTime: "2022-08-31 01:28:26", //抽奖时间创建时间
					// 	groupName: "59抽高爆豪华品类丨一发入魂大体MOLLY丨MOLLY周年100%系列直出" ,//小组名称
					// },
				],
				holderHeight: 0,
				listTotal: 10
			}
		},
		onLoad(){
			this.getRecordList();
			this.holderHeight = uni.getWindowInfo().statusBarHeight
		},
		onPullDownRefresh(){
			this.listTotal = this.listTotal + 10;
			this.getRecordList();
		},
		onReachBottom(){
			this.listTotal = this.listTotal + 10;
			this.getRecordList();
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
			getRecordList(){
				showLoading('加载中')
				let params = {
					pageSize: this.listTotal,
					pageNum: 1,
					chargeDirection : null
				}
				getUserChargeService(params).then(res => {
					hideLoading();
					if( this.recordList.length === res.data.total ){
						showToast('暂无更多加载信息哦~');
					}else{
						this.recordList = res.data.list;
					}
				})
			}
		}
	}