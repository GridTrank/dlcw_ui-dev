<template>
	<view>
		<view class="header">
			<status-bar></status-bar>
			<view class="page-header">
				<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
				<view class="title"><text class="text">寄售记录</text></view>
			</view>
		</view>
		<view class="header-holder" :style="'height:' + (holderHeight + 36)*2 + 'rpx;'"></view>
		<view class="selllist">
			<view class="selllist-item" v-for="item in userConsignmentList" :key="item.createTime">
				<!-- <image :src="item.productPic" mode="" class="img"></image> -->
				<u--image :src="item.productPic" class="img" width="172rpx" height="172rpx" :showLoading="true" bgColor="transparent" mode="aspectFit">
					<template v-slot:loading>
						<u-loading-icon mode="circle" inactive-color="#6556FD"></u-loading-icon>
					</template>
					<template v-slot:error>
						<u-icon name="error-circle"></u-icon>
					</template>
				</u--image>
				<view class="content">
					<text class="name">{{item.productName}}</text>
					<text class="time">{{item.createTime}}</text>
					<view>
						寄售价格:
						<text class="price">
							<text class="price-icon">¥</text>
							{{item.recycleAmount}}
						</text>
					</view>
				</view>
			</view>
			<view class="empty">
				<u-empty
				  :show="false"
				  :icon="noCouponImg"
				  text="暂无消费记录信息"
				></u-empty>
			</view>
		</view>
		<view class="footer-holder"></view>
		<button class="look" @click="goPage('MY_BAG_SELL_PAGE')">点击查看寄售列表</button>
	</view>
</template>

<script>
import index from './index.js';
export default index;
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>