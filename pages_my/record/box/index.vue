<template>
	<view class="">
		<view class="header">
			<status-bar></status-bar>
			<view class="page-header">
				<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
				<view class="title"><text class="text">盲盒记录</text></view>
			</view>
			<u-tabs
				:list="topTabList"
				@click="topTabClick"A
				:current="topTabIndex"
				:is-scroll="false"
				lineWidth="12"
				lineHeight="12"
				:lineColor="`url(${topTablineBg}) 100% 100%`"
				:activeStyle="{
					'color': '#6556FD',
				}"
				itemStyle="width:33%;height:44px"
			></u-tabs>
		</view>
		<view class="header-holder" :style="'height:' + (holderHeight + 80)*2 + 'rpx;'"></view>
		<view class="recordlist">
			<view class="recordlist-item" v-for="item in lotteryRecordList" :key="item.productId">
				<view class="item-1">
					<text class="title">{{item.groupName}}</text>
					<text class="total">共{{item.productVoList.length}}件</text>
				</view>
				<view class="item-2">
					<text class="time">{{item.createTime}}</text>
				</view>
				<view class="item-3">
					<view class="childlist-item" v-for="citem in item.productVoList" :key="citem.isConsignment">
						<u--image :src="citem.pic" class="img" width="120rpx" height="120rpx" :showLoading="true" bgColor="transparent" mode="aspectFit">
							<template v-slot:loading>
								<u-loading-icon mode="circle" inactive-color="#6556FD"></u-loading-icon>
							</template>
							<template v-slot:error>
								<u-icon name="error-circle"></u-icon>
							</template>
						</u--image>
						<!-- <image :src="citem.pic" mode="" class="img"></image> -->
						<text class="unpost">{{citem.productName}}</text>
						<!-- <text v-show="citem.status == 1 ? true : false" class="ispost">寄存中</text>
						<text v-show="citem.status == 0 ? true : false" class="unpost">待处置</text> -->
					</view>
					<view class="childlist-item-empty" :v-show="item.productVoList > 0 ? true : false"></view>
				</view>
				<!-- <view class="item-4">
					<image :src="tipsIcon" mode="" class="icon"></image>
					<text class="text">99元特调附带·夏日来临快来把你心爱的玩具带回家吧！</text>
				</view> -->
				<button class="look" @click="goPage('MY_BAG_PAGE')">背包中查看</button>
			</view>
		</view>
	</view>
</template>

<script>
import index from './index.js';
export default index;
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>