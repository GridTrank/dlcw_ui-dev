<template>
	<view>
		<view class="header">
			<status-bar></status-bar>
			<view class="page-header">
				<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
				<view class="title"><text class="text">收货地址</text></view>
			</view>
		</view>
		<view class="header-holder" :style="'height:' + (holderHeight + 36)*2 + 'rpx;'"></view>
		<view class="content">
			<view class="addresslist-item" v-for="item in addressList" :key="item.id">
				<view class="addresslist-item-content">
					<view class="content-body">
						<text class="default" v-if="item.isDefault == 1 ? true : false">默认</text>
						<text class="name">{{item.receiveName}}</text>
						<text class="tel">{{item.receivePhone}}</text>
					</view>
					<text class="content-add">{{item.receiveRegion}}</text>
					<text class="content-add">{{item.receiveDetail}}</text>
				</view>
				<image class="edit" src="https://static.duolachaowan.com/static/my/edit3.png" @click="goUpdate('MY_ADDRESS_UPDATE_PAGE',item)"></image>
				<!-- <img class="delete" src="@/static/my/delete3.png"></img> -->
				<image class="delete" src="https://static.duolachaowan.com/static/my/delete3.png" mode="" @click="deleteUserAddress(item.id)"></image>
			</view>

			<view class="empty">
				<u-empty
				  :icon="noCouponImg"
				  text="暂无收货地址"
				  :show="addressList.length == 0 ? true : false"
				></u-empty>
			</view>
		</view>
		<button class="add" @click="goPage('MY_ADDRESS_ADD_PAGE')">添加收货地址</button>
	</view>
</template>

<script>
import index from './index.js';
export default index;
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>