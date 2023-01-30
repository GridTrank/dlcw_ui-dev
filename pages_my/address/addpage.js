import { addAddressService } from '@/service/index.js'
import { hideLoading, navigateBack, showLoading, showToast } from '@/shared';

export default {
	data() {
		return {
			model1: {
				userInfo: {
					receiveName: '',
					receivePhone: '',
					receiveRegion: '',
					receiveDetail: '',
					receivePostalCode: '',
					isDefault: '0'
				},
			},
			rules: {
				'userInfo.receiveName': {
					type: 'string',
					required: true,
					message: '名字不能为空哦~',
					trigger: ['blur', 'change']
				},
				'userInfo.receivePhone': {
					type: 'number',
					min: 11,
					max: 11,
					required: true,
					message: '请输入正确格式的手机号哦~',
					trigger: ['blur', 'change']
				},
				'userInfo.receiveDetail': {
					type: 'string',
					required: true,
					message: '详细地址不能为空哦~',
					trigger: ['blur', 'change']
				},
			},
			radio: '',
			switchVal: false
		};
	},
	methods: {
		goBack() {
			navigateBack();
		},
		areaSelect(e) {
			this.model1.userInfo.area = e.name
			this.$refs.form1.validateField('userInfo.area')
		},
		submit(){
			showLoading('加载中')
			this.$refs.form1.validate().then(res => {
				addAddressService(this.model1.userInfo).then(res => {
					hideLoading();
					showToast('添加成功~');
					navigateBack();
				})
			}).catch(errors => {
				hideLoading();
				console.log('校验失败');
			})
		},
		location(){
			let that = this;
			uni.chooseLocation({
				geocode: true,
				success: function (res) {
					let str = res.address.slice(0,res.address.indexOf('市')+1);
					that.model1.userInfo.receiveRegion = str.replace('省','省/');
					that.model1.userInfo.receiveDetail = res.address.slice(res.address.indexOf('市')+1) + res.name;
					uni.request({
						url: '/txapi/ws/geocoder/v1',
						data:{
							location: res.latitude + ',' + res.longitude,
							get_poi: 0,
							key: 'QRABZ-JR46O-AE3W2-SAGY5-DA5WT-6PBED'
						},
						success: (res) => {
							that.model1.userInfo.receivePostalCode = res.data.result.ad_info.adcode;
						}
					})
				}
			});
		},
		wxadd(){
		}
	},
};