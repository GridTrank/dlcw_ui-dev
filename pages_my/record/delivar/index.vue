<template>
	<view>
		<view class="header">
			<status-bar></status-bar>
			<view class="page-header">
				<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
				<view class="title"><text class="text">发货记录</text></view>
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
				itemStyle="width:20%;height:44px"
			></u-tabs>
		</view>
		<view class="header-holder" :style="'height:' + (holderHeight + 80)*2 + 'rpx;'"></view>
			<u-transition :show="topTabIndex == 0">
				<view class="delivarlist">
					<view class="delivarlist-item" v-for="item in orderList" :key="item.createTime">
						<view class="time-status">
							<text class="time">{{item.createTime}}</text>
							<text class="status" v-if="item.orderStatus == 0">待发货</text>
							<text class="status" v-if="item.orderStatus == 1">已发货</text>
							<text class="status" v-if="item.orderStatus == 2">待确认</text>
							<text class="status" v-if="item.orderStatus == 3">已确认</text>
						</view>
						<view class="content">
							<view class="product">
								<image :src="item.productPic" mode="" class="img"></image>
								<text class="name">{{item.productName}}</text>
							</view>
							<view class="address">
								<text class="content">
									<text class="name">{{item.userName}}</text>
									<text class="add">{{item.receivePhone}} {{item.address}}</text>
								</text>
							</view>
						</view>
						<!-- <button	class="hurry" @click="hurry" v-show="ishurry">催促发货</button>
						<button class="hurried" disabled v-show="ishurry == false ? true : false">催促中...</button> -->
					</view>
				</view>
				
				<u-empty
				  :show="false"
				  :icon="noCouponImg"
				  text="暂无订单信息"
				></u-empty>
			</u-transition>
			
			<u-transition :show="topTabIndex == 1">
				<view class="delivarlist">
					<view class="delivarlist-item" v-for="item in orderList.filter(i => i.orderStatus == 0)" :key="item.createTime">
						<view class="time-status">
							<text class="time">{{item.createTime}}</text>
							<text class="status" v-if="item.orderStatus == 0">待发货</text>
							<text class="status" v-if="item.orderStatus == 1">已发货</text>
							<text class="status" v-if="item.orderStatus == 2">待确认</text>
							<text class="status" v-if="item.orderStatus == 3">已确认</text>
						</view>
						<view class="content">
							<view class="product">
								<image :src="item.productPic" mode="" class="img"></image>
								<text class="name">{{item.productName}}</text>
							</view>
							<view class="address">
								<text class="content">
									<text class="name">{{item.userName}}</text>
									<text class="add">{{item.receivePhone}} {{item.address}}</text>
								</text>
							</view>
						</view>
						<!-- <button	class="hurry" @click="hurry" v-show="ishurry">催促发货</button>
						<button class="hurried" disabled v-show="ishurry == false ? true : false">催促中...</button> -->
					</view>
				</view>
			</u-transition>
			
			<u-transition :show="topTabIndex == 2">
				<view class="delivarlist">
					<view class="delivarlist-item" v-for="item in orderList.filter(i => i.orderStatus == 1)" :key="item.createTime">
						<view class="time-status">
							<text class="time">{{item.createTime}}</text>
							<text class="status" v-if="item.orderStatus == 0">待发货</text>
							<text class="status" v-if="item.orderStatus == 1">已发货</text>
							<text class="status" v-if="item.orderStatus == 2">待确认</text>
							<text class="status" v-if="item.orderStatus == 3">已确认</text>
						</view>
						<view class="content">
							<view class="product">
								<image :src="item.productPic" mode="" class="img"></image>
								<text class="name">{{item.productName}}</text>
							</view>
							<view class="address">
								<text class="content">
									<text class="name">{{item.userName}}</text>
									<text class="add">{{item.receivePhone}} {{item.address}}</text>
								</text>
							</view>
						</view>
						<!-- <button	class="hurry" @click="hurry" v-show="ishurry">催促发货</button>
						<button class="hurried" disabled v-show="ishurry == false ? true : false">催促中...</button> -->
					</view>
				</view>
			</u-transition>
			
			<u-transition :show="topTabIndex == 3">
				<view class="delivarlist">
					<view class="delivarlist-item" v-for="item in orderList.filter(i => i.orderStatus == 2)" :key="item.createTime">
						<view class="time-status">
							<text class="time">{{item.createTime}}</text>
							<text class="status" v-if="item.orderStatus == 0">待发货</text>
							<text class="status" v-if="item.orderStatus == 1">已发货</text>
							<text class="status" v-if="item.orderStatus == 2">待确认</text>
							<text class="status" v-if="item.orderStatus == 3">已确认</text>
						</view>
						<view class="content">
							<view class="product">
								<image :src="item.productPic" mode="" class="img"></image>
								<text class="name">{{item.productName}}</text>
							</view>
							<view class="address">
								<text class="content">
									<text class="name">{{item.userName}}</text>
									<text class="add">{{item.receivePhone}} {{item.address}}</text>
								</text>
							</view>
						</view>
						<!-- <button	class="hurry" @click="hurry" v-show="ishurry">催促发货</button>
						<button class="hurried" disabled v-show="ishurry == false ? true : false">催促中...</button> -->
					</view>
				</view>
			</u-transition>
			
			<u-transition :show="topTabIndex == 4">
				<view class="delivarlist">
					<view class="delivarlist-item" v-for="item in orderList.filter(i => i.orderStatus == 3)" :key="item.createTime">
						<view class="time-status">
							<text class="time">{{item.createTime}}</text>
							<text class="status" v-if="item.orderStatus == 0">待发货</text>
							<text class="status" v-if="item.orderStatus == 1">已发货</text>
							<text class="status" v-if="item.orderStatus == 2">待确认</text>
							<text class="status" v-if="item.orderStatus == 3">已确认</text>
						</view>
						<view class="content">
							<view class="product">
								<image :src="item.productPic" mode="" class="img"></image>
								<text class="name">{{item.productName}}</text>
							</view>
							<view class="address">
								<text class="content">
									<text class="name">{{item.userName}}</text>
									<text class="add">{{item.receivePhone}} {{item.address}}</text>
								</text>
							</view>
						</view>
						<!-- <button	class="hurry" @click="hurry" v-show="ishurry">催促发货</button>
						<button class="hurried" disabled v-show="ishurry == false ? true : false">催促中...</button> -->
					</view>
				</view>
			</u-transition>
		<view class="footer-holder"></view>
		<button class="look" @click="goPage('MY_BAG_SENT_PAGE')">点击查看发货列表</button>
	</view>
</template>

<script>
import index from './index.js';
export default index;
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>