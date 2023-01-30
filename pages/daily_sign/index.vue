<template>
	<view>
		<view class="daily-sign">
			<div class="nav-bg"></div>
			<status-bar></status-bar>
			<view class="page-header" :style="mpHeaderStyle">
				<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
				<view class="title"><text class="text">每日签到</text></view>
				<view class="tmp"><text>1</text></view>
			</view>
			<view class="con">
				<view class="item" :class="[`item-${i}`]" v-for="(v, i) in 15" :key="i">
					<view class="box">
						<image :src="getStaticFilePath('@/static/daily_sign/giftcard.png')" mode="scaleToFill" class="image"></image>
						<view class="mask" v-if="i == 0"><text class="mask-text">已签</text></view>
					</view>
					<text class="text">{{ i == 0 ? '已领取' : i + 1 + '天' }}</text>
					<view class="dot" :class="{ finish: i == 0 }"></view>
					<view class="line"></view>
				</view>
			</view>
			<view class="footer">
				<view class="button"><text class="text">签到</text></view>
				<text class="tips">漏签1天会重置哦~</text>
			</view>
		</view>
		
		<u-popup :show="signSuccessShow" @close="closeSignSuccessShow()" mode="center" :round="20" :overlayOpacity="1">
			<view class="signsuccessshow">
				<image :src="getStaticFilePath('@/static/daily_sign/sign-success.png')" mode="" class="img"></image>
				<view class="title">签到成功</view>
				<view class="text">恭喜你获得 <text class="has">透视卡*1</text></view>
				<button class="button" >明日提醒</button>
			</view>
		</u-popup>
	</view>
	
</template>

<script>
import index from './index.js';
export default index;
</script>

<style lang="scss" scoped>
@import 'index.scss';
</style>
