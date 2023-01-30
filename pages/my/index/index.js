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
	showActionSheet,
	getStaticFilePath,
	setStorage,
	getStorage,
	fuzzyPhone
} from '@/shared';
import {
	mapGetters,
	mapState
} from 'vuex';
import {
	userinfoService,
	bindingAddService,
	ExchangeCodeService
} from '@/service/index.js'

export default {
	data() {
		return {
			defaultAvatarImg: getStaticFilePath('@/static/my/userImg.png'),
			bagCodeShow: false,
			code:''
		};
	},
	computed: {
		...mapState({
			currentPage: state => state.user.currentPage,
			loginUser: state => state.user.userInfo
		})
	},
	onLoad(options){
		if(options.inviteCode){
			setStorage('INVITECODE',options.inviteCode);
		}else{
			console.log('未获取到邀请码',options);
		}
		// this.pageOnLoad();
	},
	onShow() {
		this.getUserInfo();
	},
	methods: {
		fuzzyPhone,
		pageOnLoad(){
			this.getUserInfo();
		},
		goPage(r) {
			let url = routerAlias[r];
			navigateTo(url);
		},
		openBagCodeShow(){
			this.code = ''
			this.bagCodeShow = true;
		},
		closeBagCodeShow(){
			this.bagCodeShow = false;
		},
		getCode(e){
			this.code = e;
		},
		exchange(){
			console.log(this.code);
			if(!this.code){
				showToast('兑换码不能为空哦~');
				return;
			}else{
				ExchangeCodeService(this.code).then(r => {
					if(r.success == true){
						showToast('兑换成功~');
						this.bagCodeShow = false;
					}
					if(r.code == '111'){
						showToast(r.msg);
					}
				})
			}
		},
		//复制到粘贴板
		copy(data){
			uni.setClipboardData({
				data: data,
				success: function () {
					console.log('success');
				}
			});
		},
		
		//固定获取用户信息
		getUserInfo() {
			userinfoService().then(res => {
				console.log(res.data);
				
				//整一手自动接受邀请
				if(!res.data.loginUser.isInvited){
					let icode = getStorage('INVITECODE');
					//如果邀请码格式
					if(icode !== undefined && icode !== null && icode.length === 6){
						let params = { inviteCode: icode };
						bindingAddService(params).then((r) => {
							if(r.success){
								console.log('自动绑定邀请成功~',r);
							}
						}).catch((r) => {
							console.log('用户不存在或邀请码为本人',r);
						})
					}else{
						console.log('邀请码不存在或格式不正确！',icode);
					}
				}
				this.$store.dispatch('user/login', res.data)
			})
		},
		cooperation(){
			showToast('请咨询官方微信工作号:duola887766')
		},
	}
}
