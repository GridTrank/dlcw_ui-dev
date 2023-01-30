<template>
	<view>
		<view class="header">
			<status-bar></status-bar>
			<view class="page-header">
				<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
				<view class="title"><text class="text">寄售列表</text></view>
			</view>
		</view>
		<view class="header-holder" :style="'height:' + (holderHeight + 36)*2 + 'rpx;'"></view>
		<view class="bg"></view>
		<view class="bagselllist">
			<view class="title">寄售列表({{bagSellList.length}})</view>
			<view class="bagselllist-item" v-for="item in bagSellList" :key="item.id">
				<view :class="item.productLevel + ' item-border'">
					<!-- <image :src="item.productPic" mode="" class="img"></image> -->
					<u--image :src="item.productPic" class="img" width="118rpx" height="118rpx" :showLoading="true" bgColor="transparent" mode="aspectFit">
						<template v-slot:loading>
							<u-loading-icon mode="circle" inactive-color="#6556FD"></u-loading-icon>
						</template>
						<template v-slot:error>
							<u-icon name="error-circle"></u-icon>
						</template>
					</u--image>
				</view>
				<view class="item-aside">
					<view class="name">{{item.productName}}</view>
					<view class="price">¥{{item.groupPrice}}</view>
				</view>
				<view class="cancel" @click="cancel(item)">
					<image :src="getStaticFilePath('@/static/my/cancel.png')" name="close" class="cancel-img"></image>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="total">
				<text>寄售价:<text class="sell"> ¥{{total.toFixed(2)}}</text></text>
			</view>
			<button class="clear" @click="clear">一键撤销</button>
			<button class="do" @tap="$u.throttle(sell,500)">确认寄售</button>
			<!-- <button class="do" @click="dopwdShow()">确认寄售</button> -->
		</view>
		<!-- <u-popup :show='pwdShow' mode="bottom" @close="nopwdShow" :round="20">
			<view class="pwdshow">
				<button class="confirm" @click="sell('MY_BAG_SELL_SUCCESS_PAGE')">确认</button>
			</view>
		</u-popup> -->
		<view class="footer-holder"></view>
	</view>
</template>

<script>
	import sell from './sell.js';
	export default sell;
</script>

<style lang="scss" scoped>
@import './sell.scss';
</style>