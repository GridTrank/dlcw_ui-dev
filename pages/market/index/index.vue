<template>
	<view>
		<status-bar></status-bar>
		<view class="page-header">
			<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
			<view class="title"><text class="text">活动</text></view>
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
		
		<view class="content">
			<view class="act">
				<!-- <view class="act-item" @click="show()">
					<view class="img-bg">
						<image src="@/static/act/item-bg.png" mode="" class="img"></image>
					</view>
					<view class="text">
						<text class="name">刮刮乐</text>
						<text class="date">2022.07.12 14:01:15</text>
					</view>
					<image :src="rightArrow" mode="" class="right-arrow"></image>
				</view> -->
				<view class="act-item" @click="show('0元抽')">
					<view class="img-bg">
						<image :src="getStaticFilePath('@/static/act/zerobuy.png')" mode="" class="img"></image>
					</view>
					<view class="text">
						<text class="name">0元抽</text>
						<text class="date">活动截止时间: 持续进行</text>
					</view>
					<image :src="rightArrow" mode="" class="right-arrow"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import index from '@/pages/market/index/index.js' 
export default index
</script>

<style lang="scss" scoped>
@import '@/pages/market/index/index.scss'
</style>
