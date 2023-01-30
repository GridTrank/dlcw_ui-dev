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
import { mapGetters, mapState } from 'vuex';
import { addUserOrderService, userAddressService } from '@/service/index.js';

export default{
	data(){
		return {
			addressDefault:{
				receiveName:'暂无默认收货地址',
				receivePhone: '',
				receiveRegion: '',
				receiveDetail: ''
			},
			holderHeight:0
		}
	},
	onLoad(){
		this.getAddress();
		this.holderHeight = uni.getWindowInfo().statusBarHeight
	},
	computed:{
		...mapState({
			bagSentList: state => state.user.sentList,
			address: state => state.user.sentAdd
		})
	},
	methods:{
		goBack() {
			navigateBack();
		},
		cancel(item){
			showLoading('加载中')
			this.$store.commit('user/DELETE_USER_SENTLIST',item);
			hideLoading()
			showToast('删除成功~')
		},
		getAddress(){
			userAddressService().then(res => {
				res.data.list.forEach(i => {
					if(i.isDefault == 1){
						this.addressDefault = i;
					}
				})
			})
		},
		goPage(r){
			let url = routerAlias[r];
			navigateTo(url)
		},
		sent(){
			showLoading('加载中');
			if(this.$store.state.user.sentList.length > 0){
				let ary = [];
				this.$store.state.user.sentList.forEach(item => {
					ary.push(item.id);
				})
				addUserOrderService({
					knapsackIds: ary,
					addressId: this.address.id ? this.address.id : this.addressDefault.id
				}).then(res => {
					if(res.success){
						this.$store.commit('user/CLEAR_USER_SENTLIST');
						hideLoading()
						showToast('操作成功~');
						navigateBack();
					}
				})
			}else{
				hideLoading();
				showToast('列表中暂未添加商品哦~')
			}
		},
		clear(){
			showLoading('加载中')
			this.$store.commit('user/CLEAR_USER_SENTLIST');
			hideLoading();
			showToast('撤销成功~')
		}
	}
}