<template>
	<view class="">
		<view class="header">
			<status-bar></status-bar>
			<view class="page-header">
				<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
				<view class="title"><text class="text">发货列表</text></view>
			</view>
		</view>
		<view class="header-holder" :style="'height:' + (holderHeight + 36)*2 + 'rpx;'"></view>
		<view class="bg"></view>
		<view class="content">
			<view class="address">
				<text class="title">{{address.receiveName ?  address.receiveName: addressDefault.receiveName}}  {{address.receivePhone ? address.receivePhone : addressDefault.receivePhone}}</text>
				<text class="details">{{address.receiveRegion ? address.receiveRegion : addressDefault.receiveRegion}}  {{address.receiveDetail ? address.receiveDetail : addressDefault.receiveDetail}}</text>
				<view class="add" @click="goPage('MY_BAG_SELECT_ADDRESS_PAGE')">
					<text>选择收获地址</text>
					<u-icon name="arrow-right" style="display: inline-block;"></u-icon>
				</view>
			</view>
			<view class="title">发货列表({{bagSentList.length}})</view>
			<view class="bagsentlist-item" v-for="item in bagSentList" :key="item.id">
				<view :class="item.productLevel + ' item-border'">
					<!-- <image :src="item.productPic" mode="" class="img"></image> -->
					<u--image :src="item.productPic" class="img" width="138rpx" height="138rpx" :showLoading="true" bgColor="transparent" mode="aspectFit">
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
		<view class="footer-holder"></view>
		<view class="footer">
			<view class="total">
				<text>邮费:<text class="sell"> ¥{{bagSentList.length > 2 ? '0.00' : '15.00' }}</text></text>
				<text class="tips">满三件包邮</text>
			</view>
			<button class="clear" @click="clear">一键撤销</button>
			<button class="do" @click="sent()">确认发货</button>
		</view>
	</view>
</template>

<script>
	import sent from './sent.js';
	export default sent;
</script>

<style lang="scss" scoped>
@import './sent.scss';
</style>