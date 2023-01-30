import {
	mapGetters,
	mapState
} from 'vuex';
import {
	navigateTo,
	showToast,
	switchTab,
	navigateBack,
	redirectTo,
	showLoading,
	hideLoading,
	getStaticFilePath,
	getStorage
} from '@/shared';
import routerAlias from '@/routers/alias.js'
import {
	verificationCodeService,
	loginService,
	wehcatMiniLoginServer,
	bindingAddService
} from '@/service';
import { setTokenStorage } from '../../../storage';

export default {
	data() {
		return {
			formData: {
				phone: '',
				code: '',
				codeUuid: ''
			},
			timer: null,
			count: '',
			codeType: 0,
			agreement: 'reject'
		};
	},
	computed: {
		...mapGetters(['isLogged']),
		...mapState({
			currentPage: state => state.user.currentPage
		})
	},
	onLoad() {},
	methods: {
		goBack() {
			// navigateBack();
			let page = routerAlias.HOME_PAGE
			switchTab(page)
		},
		getcode() {
			if (!this.formData.phone) {
				showToast('请输入手机号')
				return;
			}
			const times = 60; // 倒计时时间

			verificationCodeService({
				phone: this.formData.phone
			}).then(res => {

				showToast('验证码发送成功')

				this.formData.codeUuid = res.data.codeUuid

				if (!this.timer) {
					this.count = times;
					this.codeType = 1;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= times) {
							this.count--;
						} else {
							this.codeType = 2;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)
				}

			})
		},
		checkboxChange(e) {
			// console.log('checkboxChange', e)
			this.agreement = this.agreement == 'reject' ? 'agree' : 'reject'
			// console.log('agreement', this.agreement)
		},
		submit() {
			if (!this.formData.phone) {
				showToast('请输入手机号')
				return;
			}
			if (!this.formData.code) {
				showToast('请输入验证码')
				return;
			}
			if (this.agreement !== 'agree') {
				showToast('请同意用户协议')
				return;
			}

			showLoading('登录中...')
			loginService({
				...this.formData
			}).then(res => {
				hideLoading()
				this.$store.dispatch('user/login', res.data)
				// this.$store.commit('user/SET_PAGE', 0)
				let page = routerAlias.HOME_PAGE
				switchTab(page)
			}).catch((r) => {
				hideLoading()
				// this.$store.dispatch('user/logout')
			})
		},
		goPage(r) {
			let url = routerAlias[r]
			navigateTo(url);
		},

		getuserinfo() {
			if (this.agreement !== 'agree') {
				showToast('请同意用户协议')
				return;
			}
			let that = this
			uni.getUserProfile({
				desc: '获取您的用户信息', //向用户展示的信息
				//用户点击了登录
				success: infoRes => {
					console.log('infoRes', infoRes);
					// const iv = infoRes.iv;
					// const encryptedData = infoRes.encryptedData;
					if (infoRes.errMsg === 'getUserProfile:ok') {
						//开始登录
						const appid = uni.getAccountInfoSync().miniProgram.appId;
						uni.login({
							provider: 'weixin',
							success: function(loginRes) {
								const code = loginRes.code;
								// let dd = {
								// 	code: code,
								// 	iv: infoRes.iv,
								// 	encryptedData: infoRes.encryptedData,
								// 	nickname: infoRes.userInfo.nickName,
								// 	avatar: infoRes.userInfo.avatarUrl
								// };
								console.log('loginRes:', loginRes)
								
								showLoading('登录中...')
								wehcatMiniLoginServer({
									params: {
										loginCode: code
									}
								}).then(r => {
									console.log('登录认证成功')
									hideLoading()
									that.$store.dispatch('user/login', r.data);
									console.log('r.data',r.data)
									setTokenStorage(r.data.xaccessToken)
									let page = routerAlias.HOME_PAGE
									
									//整一手自动接受邀请
									if(!r.data.loginUser.isInvited){
										let icode = getStorage('INVITECODE');
										let params = { inviteCode: icode };
										bindingAddService(params).then((r) => {
											if(r.success){
												console.log('自动绑定邀请成功~',r);
											}
										}).catch((r) => {
											console.log('邀请出错咯',r);
										})
									}
									
									//登录用户未绑定手机号的情况下跳转绑定手机号页面
									if(r.data.loginUser.phoneNo == '未绑定'){
										navigateTo(routerAlias.LOGIN_BIND,{code:code});
										return;
									}
									
									switchTab(page)
								}).catch((r) => {
									console.log('登录失败', r)
									hideLoading()
								})
							}
						});
					} else {
						uni.showToast({
							title: '授权失败',
							icon: 'none',
							duration: 2000
						});
					}
				},
				fail: err => {
					uni.showToast({
						title: '授权失败',
						icon: 'none',
						duration: 2000
					});
				}
			});
		},

		getPhoneNumber(e) {
			console.log('e', e)
		}
	}
};
