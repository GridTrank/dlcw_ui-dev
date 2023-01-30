<template>
	<view>
		<view class="header">
			<status-bar></status-bar>
			<view class="page-header">
				<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
				<view class="title"><text class="text">消费记录</text></view>
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
		<view class="tablist">
			<view class="recordlist">
				<view class="recordlist-item" v-for="item in costRecordList" :key="item.createTime">
					<view class="item-1">
						<image :src="testImg" mode=""></image>
					</view>
					<view class="item-2">
						<text class="name">{{item.groupName}}</text>
						<text class="endtime">{{item.createTime}}</text>
						<text class="price"><text class="icon">¥</text>{{item.chargeAmount}}</text>
					</view>
					<image :src="rightArrow" mode="" class="right-arrow"></image>
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
@import './index.scss';
</style>