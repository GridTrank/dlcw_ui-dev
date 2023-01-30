<template>
	<view class="pageview">
		<view class="bg"></view>
		<status-bar></status-bar>
		<view class="content">
			<!-- <view class="user-holder"></view> -->
			<view class="tr-icon">
				<image :src="getStaticFilePath('@/static/my/Vector.png')" mode="" @click.native="goPage('MY_SETUP_PAGE')"></image>
				<image :src="getStaticFilePath('@/static/my/Frame1.png')" mode="" @click="goPage('MESSAGE_BOX_PAGE')"></image>
			</view>
			<view class="userinfo">
				<image :src="loginUser.headImg || defaultAvatarImg" mode="" class="userimg"></image>
				<view class="userinfo-aside">
					<text class="username">{{ fuzzyPhone(loginUser.nickName) }}</text>
					<text :user-select="true" class="usertel">{{ fuzzyPhone( loginUser.phoneNo )}}</text>
					<text :user-select="true" class="usertel">邀请码:{{ loginUser.inviteCode }}</text>
					<image :src="getStaticFilePath('@/static/my/copy.png')" class="copy" @click="copy(loginUser.inviteCode)"></image>
				</view>
				<!-- <view class="tr-icon">
					<image :src="getStaticFilePath('@/static/my/Frame1.png')" mode=""></image>
					<image :src="getStaticFilePath('@/static/my/Vector.png')" mode="" @click.native="goPage('MY_SETUP_PAGE')"></image>
				</view> -->
			</view>

			<view class="userinfo2">
				<view class="userinfo2-item" @click="goPage('MY_COUPON_PAGE')">
					<text class="num">{{loginUser.couponNum || 0}}</text>
					<text class="type">卡券</text>
				</view>
				<view class="userinfo2-item">
					<text class="num">{{loginUser.useDlb || 0}}</text>
					<text class="type">HCB</text>
				</view>
				<view class="userinfo2-item" @click="goPage('MY_BALANCE_PAGE')">
					<text class="num">{{loginUser.userBalance || 0}}</text>
					<text class="type">余额</text>
				</view>
			</view>

			<view class="userinfo2">
				<view class="userinfo2-item2" @click="goPage('MY_RECORD_COST_PAGE')">
					<image :src="getStaticFilePath('@/static/my/image 2.png')" mode="" class="img"></image>
					<text class="type">消费记录</text>
				</view>
				<view class="userinfo2-item2" @click="goPage('MY_RECORD_BOX_PAGE')">
					<image :src="getStaticFilePath('@/static/my/image 3.png')" mode="" class="img"></image>
					<text class="type">盲盒记录</text>
				</view>
				<view class="userinfo2-item2" @click="goPage('MY_RECORD_SELL_PAGE')">
					<image :src="getStaticFilePath('@/static/my/image 6.png')" mode="" class="img"></image>
					<text class="type">寄售记录</text>
				</view>
				<view class="userinfo2-item2" @click="goPage('MY_RECORD_DELIVAR_PAGE')">
					<image :src="getStaticFilePath('@/static/my/image 7.png')" mode="" class="img"></image>
					<text class="type">发货记录</text>
				</view>
			</view>

			<view class="userinfo3">
				<view class="userinfo3-item" @click="goPage('MY_BAG_PAGE')">
					<text class="name">我的背包</text>
					<text class="tips">贴心小能手</text>
					<view class="imglist"><image :src="getStaticFilePath('@/static/my/my1.png')" mode="" class="img"></image></view>
				</view>
				<view class="userinfo3-item">
					<text class="name">待开放</text>
					<text class="tips">未知</text>
					<view class="imglist2"><image :src="getStaticFilePath('@/static/my/my2.png')" mode="" class="img"></image></view>
				</view>
			</view>

			<view class="userinfo4">
				<u-cell-group :border="false">
					<u-cell title="兑换礼包" :clickable="true" is-link titleStyle="font-size:'13px',font-family:'PingFang SC'}" rightIconStyle="font-size:10px" @click="openBagCodeShow">
						<image slot="icon" :src="getStaticFilePath('@/static/my/icon1.png')" mode="" class="icon"></image>
					</u-cell>
					<u-cell
						title="收货地址管理"
						is-link
						titleStyle="font-size:'13px',font-family:'PingFang SC'}"
						rightIconStyle="font-size:10px"
						@click="goPage('MY_ADDRESS_PAGE')"
					>
						<image slot="icon" :src="getStaticFilePath('@/static/my/icon2.png')" mode="" class="icon"></image>
					</u-cell>
					<u-cell title="联合代理" is-link titleStyle="font-size:'13px',font-family:'PingFang SC'}" rightIconStyle="font-size:10px" :border="false" :clickable="true" @click="cooperation">
						<image slot="icon" :src="getStaticFilePath('@/static/my/icon3.png')" mode="" class="icon"></image>
					</u-cell>
				</u-cell-group>
			</view>
			
			<!-- <button @click="goPage('MY_SETUP_PAGE')" class="setup">设 置</button> -->
		</view>
		
		<view class="footer-holder"></view>
		<u-popup :show="bagCodeShow" mode="center" @close="closeBagCodeShow" round="20">
			<view class="bagCodeShow">
				<view class="title">请输入兑换码</view>
				<view class="input">
					<u--input
					   placeholder=" "
					   border="surround"
					   v-model="code"
					   @change="getCode"
					 ></u--input>
				</view>
				<view class="btn">
					<button class="cancel" @click="() => {this.bagCodeShow = false}">取消</button>
					<button class="confirm" @tap="$u.throttle(exchange,500)">确认</button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import index from './index.js';
export default index;
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
