<template>
	<view class="appreciation-detail-index">
		<status-bar></status-bar>
		<image class="nav-bg" :style="{ backgroundImage: `url(${detail.picture})` }"></image>
		<view class="page-header" :style="mpHeaderStyle">
			<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back-white.png')" class="icon"></image></view>
			<view class="title"><text class="text">ip详情</text></view>
			<view class="tmp"><text>1</text></view>
		</view>
		<view class="con-wrap">
			<view class="con">
				<image :src="detail.picture" class="picture"></image>
				<view class="intro">
					<text class="title">{{ detail.title }}</text>
					<text class="des">{{ detail.desc }}</text>
				</view>

				<view class="series-list-wrap">
					<view class="header">
						<text class="title">系列</text>
						<!-- <text class="text">搜索进度</text> -->
					</view>

					<u-list @scrolltolower="scrolltolower" class="series-list" :enableFlex="true" :enableBackToTop="true">
						<u-list-item v-for="(item, index) in seriesList" :key="index" class="item" @click="goSeries(item)">
							<view class="left" @click="goSeries(item)">
								<image :src="item.seriesPic" class="image"></image>
								<view class="info">
									<text class="title">{{ item.seriesDesc }}</text>
									<text class="text">前往系列详情 ></text>
								</view>
							</view>
							<!-- <view class="right" @click="goSeries(item)">
								<text class="count">{{ item.count || 0 }}</text>
								<text class="text">/</text>
								<text class="total">{{ item.total || 0 }}</text>
							</view> -->
						</u-list-item>
					</u-list>
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
@import 'index.scss';
</style>
