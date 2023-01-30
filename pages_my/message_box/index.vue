<template>
	<view class="page-message_box">
		<status-bar></status-bar>
		<view class="page-header" :style="mpHeaderStyle">
			<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
			<view class="title"><text class="text">消息盒子</text></view>
			<view class="tmp">1</view>
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
			itemStyle="width:50%;height:44px"
		></u-tabs>
		<view class="wrap">
			<u-transition :show="topTabIndex == 0">
				<view class="list-wrap">
					<view class="item">
						<view class="image"><image :src="getStaticFilePath('@/static/my/info.png')" class="icon"></image></view>
						<view class="f-col info j-c-sb mar-l-10 ">
							<text class="title">2022.07.12 14：01：15</text>
							<text class="des">温馨提示</text>
						</view>
						<view class="unread"></view>
					</view>

					<view class="item">
						<view class="image"><image :src="getStaticFilePath('@/static/my/info.png')" class="icon"></image></view>
						<view class="f-col info  j-c-sb mar-l-10 ">
							<text class="title">2022.07.12 14：01：15</text>
							<text class="des">温馨提示</text>
						</view>
					</view>
				</view>

				<u-empty v-show="isEmpty" class="empty" mode="message" icon="message" text="暂无信息"></u-empty>
			</u-transition>

			<u-transition :show="topTabIndex == 1"><u-empty v-show="isEmpty" class="empty" mode="message" icon="message" text="暂无信息"></u-empty></u-transition>
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
