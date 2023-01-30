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
import { sellUserProductService } from '@/service/index.js';

export default{
	data(){
		return {
			// bagSellList:[
			// 	{id:1,productName:'YaBi 契约精神',price:'79.00',productPic:'aaa'},
			// 	{id:2,productName:'YaBi 契约精神',price:'79.00',productPic:'aaa'},
			// 	{id:3,productName:'YaBi 契约精神',price:'79.00',productPic:'aaa'},
			// ],
			pwdShow:false,
			holderHeight:0
		}
	},
	onLoad(){
		this.holderHeight = uni.getWindowInfo().statusBarHeight
	},
	computed:{
		...mapState({
			bagSellList: state => state.user.sellList,
			total: state => {
				let num = 0;
				state.user.sellList.forEach(i => {
					num = num + i.groupPrice
				})
				return num;
			}
		})
	},
	methods:{
		goBack() {
			navigateBack();
		},
		dopwdShow(){
			this.pwdShow = true;
		},
		nopwdShow(){
			this.pwdShow = false;
		},
		sell(){
			showLoading('加载中')
			if(this.$store.state.user.sellList.length > 0){
				let ary = [];
				this.$store.state.user.sellList.forEach(item => {
					ary.push(item.id);
				})
				sellUserProductService({
					knapsackIds: ary
				}).then(res => {
					if(res.success){
						this.pwdShow = false;
						this.$store.commit('user/CLEAR_USER_SELLLIST');
						let url = routerAlias['MY_BAG_SELL_SUCCESS_PAGE'];
						navigateTo(url);
						hideLoading();
					}
				})
			}else{
				hideLoading()
				showToast('列表中暂未添加商品哦~')
			}
		},
		cancel(item){
			showLoading('加载中');
			this.$store.commit('user/DELETE_USER_SELLLIST',item);
			hideLoading();
			showToast('删除成功~')
		},
		clear(){
			showLoading('加载中');
			this.$store.commit('user/CLEAR_USER_SELLLIST');
			hideLoading();
			showToast('撤销成功~')
		},
		getAndUpdateUserInfo() {
			userinfoService().then(r => {
				this.$store.commit('user/UPDATE_USER_INFO', r.data.loginUser);
			})
		},
	}
}