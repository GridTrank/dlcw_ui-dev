import { mapGetters, mapState } from 'vuex';
import {navigateBack, showToast, setTokenStorage, showLoading, hideLoading} from '@/shared';
import { getChargeSettingAll,wechatMiniCreatePaymentServer,userinfoService,wechatQueryTransaction } from '@/service/index.js';
export default {
		data(){
			return {
				showRecharge: false,
				showBD: false,
				showTips: false,
				numlist:[],
				active: '',
				charge: ''
			}
		},
		computed:{
			...mapState({
				loginUser: state => state.user.userInfo
			}),
		},
		onLoad(){
			this.getNumList();
			this.getAndUpdateUserInfo();
		},
		methods:{
			goBack() {
				navigateBack();
			},
			//获取充值的金额额数
			getNumList(){
				let params = {
					pageSize: 100,
					pageNum: 1
				}
				getChargeSettingAll(params).then(res => {
					this.numlist = res.data.reverse()
					console.log(this.numlist)
				})
			},
			//点击选中对应充值的金额
			choose(item){
				this.active = item.id;
				this.charge = item.id;
				console.log(this.charge)
			},
			closeRecharge(){
				this.showRecharge = false;
			},
			openRecharge(){
				this.showRecharge = true;
			},
			go(){
				console.log('联系客服');
			},
			pay(){
				console.log('支付');
			},
			alipay(){
				this.pay;
			},
			//微信支付
			wechatpay(){
				showLoading('加载中');
				if(this.charge == ''){
					hideLoading();
					showToast('未选择充值金额哦~')
					return
				}
				let params = {
					paymentDescription: '哆啦潮玩充值余额',
					chargeSettingId: this.charge
				}
				console.log('wechatMiniPay-params', params)
				let that = this
				wechatMiniCreatePaymentServer(params).then(r => {
					console.log('调试1',r);
					const body = r.data.wechatResponseEntity.body;
					//获取订单号
					const orderNo = r.data.orderNo;
					//调起微信小程序支付界面
					uni.requestPayment({
						provider: 'wxpay',
						timeStamp: body.timeStamp,
						nonceStr: body.nonceStr,
						package: body.package,
						signType: body.signType,
						paySign: body.paySign,
						success: function(res) {
							console.log('requestPayment-success:',res);
							
							//查询支付后的订单以检查状态
							wechatQueryTransaction(orderNo).then(res => {
								if(res.success == true){
									hideLoading()
									showToast('支付订单成功')
									setTimeout(()=>{
										that.getAndUpdateUserInfo()
									},100)
								}else{
									hideLoading()
									showToast('订单支付失败或处于支付中')
									setTimeout(()=>{
										that.getAndUpdateUserInfo()
									},100)
								}
							})
							
						},
						fail: function(err) {
							hideLoading()
							showToast('取消或支付失败')
							setTimeout(()=>{
								that.getAndUpdateUserInfo()
							},100)
							console.log('requestPayment-fail:',err);
						}
					});
				})
			},
			/**
			 * 获取更新用户数据 主要是余额
			 */
			getAndUpdateUserInfo() {
				userinfoService().then(r => {
					this.$store.commit('user/UPDATE_USER_INFO', r.data.loginUser);
				})
			},
			showBalanceDetail(){
				this.showBD = true;
			},
			closeBD(){
				this.showBD = false;
			},
			tipsOpen(){
				this.showTips = true;
			},
			tipsClose(){
				this.showTips = false;
			}
		}
	}