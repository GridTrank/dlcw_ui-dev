<template>
	<view class="appreciation-series-index">
		<status-bar></status-bar>
		<image class="nav-bg" :style="{ backgroundImage: `url(${detail.picture})` }"></image>
		<view class="page-header" :style="mpHeaderStyle">
			<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back-white.png')" class="icon"></image></view>
			<view class="title"><text class="text">系列信息</text></view>
			<view class="tmp"><text>1</text></view>
		</view>
		<view class="con-wrap">
			<u-toast ref="seriesScroll_uToast"></u-toast>

			<view class="con">
				<image :src="detail.picture" class="main-picture"></image>
				<view class="intro">
					<text class="title">{{ detail.title }}</text>
					<text class="des">{{ detail.desc }}</text>
				</view>

				<scroll-view class="swiper" scroll-x="true" @scrolltolower="scrolltolower">
					<view v-for="(v, i) in list" :key="i" class="swiper-item item-wrap">
						<view class="item">
							<view class="img-box">
								<div class="bg"></div>
								<image :src="v.pic" class="picture"></image>
							</view>
							<!-- <view class="info">
								<text class="count">{{ v.count }}</text>
								<text class="text">/</text>
								<text class="total">{{ v.total }}</text>
							</view> -->
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
import index from './index.js';
export default index;
</script>

<style lang="scss" scoped>
@import 'index.scss';
</style>
