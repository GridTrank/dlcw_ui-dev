<template>
	<view>
		<status-bar></status-bar>
		<view class="pd-lr-15">
			<view class="login-warp">
				<view class="bg"></view>
				<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
				<view class="logo"><image :src="getStaticFilePath('@/static/logo.png')" class="image"></image></view>

				<view class="login-form-warp">
					<!-- #ifndef MP-WEIXIN -->
					<view class="login-form">
						<view class="row">
							<view class="header">
								<image :src="getStaticFilePath('@/static/login/phone.png')" class="icon"></image>
								<text class="label">请输入手机号</text>
							</view>
							<input type="number" class="input" v-model="formData.phone" />
						</view>

						<view class="row verification">
							<view class="header">
								<image :src="getStaticFilePath('@/static/login/safety.png')" class="icon"></image>
								<input type="number" class="mar-l-10" v-model="formData.code" placeholder="请输入验证码" />
							</view>
							<view class="send">
								<text class="text" v-if="codeType == 0" @click="getcode">获取验证码</text>
								<text class="text" v-if="codeType == 1">已发送{{ count }}秒</text>
								<text class="text" v-if="codeType == 2" @click="getcode">重新获取</text>
							</view>
						</view>
					</view>
					<view class="submit" @click="submit"><text class="text">登录</text></view>
					<!-- #endif -->

					<!--  #ifdef  MP-WEIXIN	 -->
					<view class="submit" @click="getuserinfo" ><text class="text">微信登录</text></view>
					<!--  #endif -->
					
				</view>

				<view class="footer-wrap">
					<view class="agreement-row">
						<checkbox-group @change="checkboxChange">
							<label><checkbox value="" v-model="agreement" color="#6556FD" class="round" /></label>
						</checkbox-group>
						<text>登录即表明已同意</text>
						<text class="src" @click="goPage('MY_SETUP_AGREEMENT_PAGE')">《用户协议》</text>
						<text class="src" @click="goPage('MY_SETUP_PRIVACY_PAGE')">《隐私协议》</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import index from './index.js';
export default index;
</script>

<style lang="scss" scoped>
@import 'index.scss';
</style>
