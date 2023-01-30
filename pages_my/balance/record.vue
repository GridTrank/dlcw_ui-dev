<template>
	<view>
		<view class="header">
			<status-bar></status-bar>
			<view class="page-header">
				<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
				<view class="title"><text class="text">余额收支记录</text></view>
			</view>
			<u-tabs
				:list="topTabList"
				@click="topTabClick"
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
		<u-transition :show="topTabIndex == 0">
			<view class="tablist">
				<view class="recordlist">
					<view class="recordlist-item" v-for="item in recordList" :key="item.createTime">
						<view class="item-1">
							<text class="name">{{item.groupName ? item.groupName : (item.chargeType == 1 ? '余额充值' : '平台寄售回收') }}</text>
							<text class="price"><text class="icon">¥</text>{{item.chargeAmount}}</text>
						</view>
						<view class="item-2">
							<text class="endtime">{{item.createTime}}</text>
							<text class="isend">已完成</text>
							<!-- <text class="noisend" v-show="item.isEnd ? false : true">未完成</text> -->
						</view>
					</view>
				</view>
			</view>
		</u-transition>
		
		<u-transition :show="topTabIndex == 1">
			<view class="tablist">
				<view class="recordlist">
					<view class="recordlist-item" v-for="item in recordList.filter(i => i.chargeDirection == 1)" :key="item.createTime">
						<view class="item-1">
							<text class="name">{{item.groupName ? item.groupName : (item.chargeType == 1 ? '余额充值' : '平台寄售回收') }}</text>
							<text class="price"><text class="icon">¥</text>{{item.chargeAmount}}</text>
						</view>
						<view class="item-2">
							<text class="endtime">{{item.createTime}}</text>
							<text class="isend">已完成</text>
							<!-- <text class="noisend" v-show="item.isEnd ? false : true">未完成</text> -->
						</view>
					</view>
				</view>
			</view>
		</u-transition>
		
		<u-transition :show="topTabIndex == 2">
			<view class="tablist">
				<view class="recordlist">
					<view class="recordlist-item" v-for="item in recordList.filter(i => i.chargeDirection == 2)" :key="item.createTime">
						<view class="item-1">
							<text class="name">{{item.groupName ? item.groupName : (item.chargeType == 1 ? '余额充值' : '平台寄售回收') }}</text>
							<text class="price"><text class="icon">¥</text>{{item.chargeAmount}}</text>
						</view>
						<view class="item-2">
							<text class="endtime">{{item.createTime}}</text>
							<text class="isend">已完成</text>
							<!-- <text class="noisend" v-show="item.isEnd ? false : true">未完成</text> -->
						</view>
					</view>
				</view>
			</view>
		</u-transition>
	</view>
</template>

<script>
import record from './record.js';
export default record;
</script>

<style lang="scss" scoped>
@import './record.scss';
</style>