<template>
	<view class="appreciation-index">
		<status-bar></status-bar>
		<view class="top-header" :style="mpHeaderStyle">
			<view class="search-box">
				<image :src="getStaticFilePath('@/static/common/search.png')" class="icon"></image>
				<u--input placeholder="请输入内容" border="surround" @confirm="searchConfirm"></u--input>
			</view>
			<view class="select-bar" @click="selectShow">
				<text class="text">{{ selectListObj.text }}</text>
				<image :src="getStaticFilePath('@/static/appreciation/triangle.png')" class="icon"></image>
			</view>
		</view>
		<view class="con-wrap">
			<swiper class="swiper" acceleration :current="swiperCurrent" @change="swiperChange" easing-function="linear">
				<swiper-item v-for="(v, i) in list" :key="i" class="swiper-item item-wrap">
					<view class="item">
						<view class="bg"></view>
						<image :src="v.ipPic || getStaticFilePath('@/static/appreciation/picture.png')" class="picture"></image>
						<view class="info">
							<text class="title">{{ v.ipName }}</text>
							<text class="des">{{ v.ipDesc }}</text>
							<!-- 暂未开放 替换掉了原goDetail -->
							<view class="button" @click="more()"><text class="text">了解更多</text></view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<u-toast ref="seriesConfirm_uToast"></u-toast>
		<u-picker
			:show="topSelectShow"
			:columns="selectListObj.list"
			keyName="companyName"
			@confirm="selectConfirm"
			@close="selectClose"
			@cancel="selectCancel"
			closeOnClickOverlay
		></u-picker>
	</view>
</template>

<script>
import index from './index.js';
export default index;
</script>

<style lang="scss" scoped>
@import 'index.scss';
</style>
