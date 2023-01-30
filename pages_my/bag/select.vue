<template>
	<view>
		<view class="header">
			<status-bar></status-bar>
			<view class="page-header">
				<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
				<view class="title"><text class="text">选择收货地址</text></view>
			</view>
		</view>
		<view class="header-holder" :style="'height:' + (holderHeight + 36)*2 + 'rpx;'"></view>
		<view class="content">
			<view class="addresslist-item" v-for="item in addressList" :key="item.id" @click="choose(item)">
				<view class="addresslist-item-content">
					<view class="content-body">
						<text class="default" v-if="item.isDefault == 1 ? true : false">默认</text>
						<text class="name">{{item.receiveName}}</text>
						<text class="tel">{{item.receivePhone}}</text>
					</view>
					<text class="content-add">{{item.receiveRegion}}</text>
					<text class="content-add">{{item.receiveDetail}}</text>
				</view>
				<image class="edit" src="https://static.duolachaowan.com/static/my/edit3.png" @click.stop="goUpdate('MY_ADDRESS_UPDATE_PAGE',item)"></image>
				<!-- <img class="delete" src="@/static/my/delete3.png"></img> -->
				<image class="delete" src="https://static.duolachaowan.com/static/my/delete3.png" mode="" @click.stop="deleteUserAddress(item.id)"></image>
				<image :src="getStaticFilePath('@/static/my/selectadd.png')" mode="" class="selectadd" v-show="backAdd.id == item.id"></image>
			</view>

			<u-empty class="empty"
			  :icon="noCouponImg"
			  text="暂无收货地址"
			  :show="addressList.length == 0 ? true : false"
			></u-empty>
		</view>
		<button class="add" @click="goPage('MY_ADDRESS_ADD_PAGE')">添加收获地址</button>
		<button class="confirm" @click="confirm('MY_BAG_SENT_PAGE')">确认</button>
	</view>
</template>

<script>
import select from '@/pages_my/bag/select.js';
export default select;
</script>

<style lang="scss" scoped>
@import '@/pages_my/bag/select.scss';
</style>