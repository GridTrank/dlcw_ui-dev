<template>
	<view>
		<status-bar></status-bar>
		<view class="pd-lr-15">
			<view class="login-warp">
				<view class="bg"></view>
				<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
				<view class="logo"><image :src="getStaticFilePath('@/static/logo.png')" class="image"></image></view>
	
				<view class="login-form-warp">
					<button class="submit" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" ><text class="text">一键获取绑定手机号码</text></button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
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
import { wechatBindMobilePhone } from '@/service/index.js';
export default {
	data(){
		return {
			formData: {
				phone: '',
				code: '',
				codeUuid: ''
			},
			timer: null,
			count: '',
			codeType: 0,
			agreement: 'reject',
			getPhoneData:{}
		}
	},
	onLoad(){
	},
	methods:{
		goBack() {
			// navigateBack();
			let page = routerAlias.HOME_PAGE
			switchTab(page)
		},
		getPhoneNumber(e){
			console.log('获取手机号',e)
			this.getPhoneData = e.detail
			console.log('绑定手机号',this.getPhoneData);
			wechatBindMobilePhone(this.getPhoneData.code).then(res => {
				hideLoading();
				if(res.success){
					showToast('绑定手机号成功~');
					setTimeout(() => {
						let page = routerAlias.HOME_PAGE;
						switchTab(page)
					},500)
				}else{
					showToast('未知错误，请稍后重试!');
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	.login-warp {
		position: relative;
		height: 100vh;
		@include flex(column);
		.bg {
			position: absolute;
			top: 0;
			left: sizing(-30);
			right: sizing(-30);
			width: 100vw;
			bottom: 59.24%;
			background: linear-gradient(196deg, #6556FD 0%, #ffffff 100%);
			opacity: 0.1;
			z-index: -1;
		}
		.back {
			margin-top: new-sizing(15);
			@include flex(row);
			align-items: center;
			.icon {
				width: new-sizing(28);
				height: new-sizing(28);
			}
		}
		.logo {
			position: absolute;
			top: new-sizing(120);
			left: 50%;
			transform: translateX(-50%);
			.image {
				width: new-sizing(78);
				height: new-sizing(78);
			}
		}
	
		.login-form-warp {
			margin: new-sizing(200) auto 0 auto;
			.login-form {
				width: new-sizing(315);
				height: new-sizing(150);
				background: transparent url(assets('@/static/login/from-bg.png')) no-repeat;
				background-size: 100%;
				padding: new-sizing(25);
				@include flex(column);
	
				.icon {
					width: new-sizing(15);
					height: new-sizing(17);
				}
				.label {
					margin-left: new-sizing(10);
					font-size: new-sizing(13);
					line-height: new-sizing(17);
					opacity: 0.5;
				}
	
				.row {
					.header {
						@include flex(row);
						align-items: center;
					}
					.input {
						border-bottom: 1px solid rgba(172, 176, 184, 0.5);
						line-height: new-sizing(30);
						height: new-sizing(30);
						padding: 0 new-sizing(2);
					}
				}
				.verification {
					@include flex(row);
					justify-content: space-between;
					align-items: center;
					margin-top: new-sizing(30);
					.input-placeholder {
						margin-left: new-sizing(10);
						font-size: new-sizing(13);
						line-height: new-sizing(17);
						opacity: 0.5;
						color: #333c4f;
					}
					.text {
						color: #6556FD;
						opacity: 0.5;
						font-size: new-sizing(13);
						line-height: new-sizing(17);
					}
				}
			}
			.submit {
				margin: new-sizing(40) auto 0 auto;
				width: new-sizing(306);
				height: new-sizing(48);
				text-align: center;
				background: #6556FD;
				border: new-sizing(2) solid rgba(255, 255, 255, 0.3);
				box-shadow: 0px new-sizing(3) new-sizing(4) rgba(101, 86, 253, 0.1);
				border-radius: new-sizing(33);
				@include flex(row);
				justify-content: center;
				align-items: center;
				.text {
					text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.6);
					color: #fff;
				}
			}
		}
		.footer-wrap {
			@include flex(row);
			align-items: center;
			justify-content: center;
			position: absolute;
			bottom: new-sizing(150);
			left: 0;
			width: 100%;
			.agreement-row {
				@include flex(row);
				align-items: center;
			}
			text {
				font-size: new-sizing(12);
				line-height: new-sizing(17);
				color: #999999;
				&.src {
					color: #6556FD;
				}
			}
		}
	}
	
	::v-deep {
		// .uni-checkbox-input,
		// .round{
			
		// }
		
		checkbox.round .wx-checkbox-input,
		checkbox.round .uni-checkbox-input {
			width: new-sizing(13);
			height: new-sizing(13);
			border-radius: 50%;
			&-checked::before {
				font-size: new-sizing(13);
			}
		}
	}
</style>