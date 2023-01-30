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
						id:1,
						receiveDetail: 'dasdasda',
						receiveRegion:'广东',
						defaultAdd: "Yes",
						receiveName:"asdasdasdas",
						postma:'123456',
						receivePhone:"12345678971",
						receivePostalCode: '1111111',
						isDefault: 0,
						createTime: "2022-08-26 10:22:16",
						updateTime: null,
						userName: "Arsin",
					}
				],
				backAdd: {},
				holderHeight:0
			}
		},
		onShow(){
			this.getAddress();
			this.holderHeight = uni.getWindowInfo().statusBarHeight;
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
			},
			choose(item){
				this.backAdd = item;
				showToast('选择成功~');
			},
			confirm(r){
				showLoading('加载中');
				let url = routerAlias[r];
				if(this.backAdd != {} || this.backAdd != ''){
					this.$store.commit('user/UPDATE_SENT_ADDRESS',this.backAdd)
					hideLoading();
					navigateBack();
					return ;
				}
				hideLoading();
				navigateBack()
			}
		}
	}