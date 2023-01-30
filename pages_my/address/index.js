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
	import { userAddressService,deleteUserAddressService } from '@/service/index.js'
	export default{
		data(){
			return {
				noCouponImg: ('https://static.duolachaowan.com/static/my/nocoupon.png'),
				addressList: [
					{
						id:"",
						receiveDetail: '',
						receiveRegion:'',
						defaultAdd: "",
						receiveName:"",
						postma:'',
						receivePhone:"",
						receivePostalCode: '',
						isDefault: "",
						createTime: "",
						updateTime: "",
						userName: "",
					}
				],
				holderHeight:0
			}
		},
		onLoad(){
			// this.getAddress();
			this.holderHeight = uni.getWindowInfo().statusBarHeight;
		},
		onShow(){
			this.getAddress();
		},
		methods:{
			goBack() {
				navigateBack();
			},
			getAddress(){
				userAddressService().then(res => {
					this.addressList = res.data.list
				})
			},
			goPage(r){
				let url = routerAlias[r];
				navigateTo(url);
			},
			goUpdate(r,params){
				let url = routerAlias[r];
				navigateTo(url,params);
			},
			deleteUserAddress(id){
				deleteUserAddressService(id).then(res => {
					if(res.code == 1){
						showToast('删除成功~');
					}else{
						showToast('未知错误');
					}
				})
			}
		}
	}