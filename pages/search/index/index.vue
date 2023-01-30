<template>
	<view class="search">
		<div class="nav-bg"></div>
		<status-bar></status-bar>
		<view class="page-header" :style="mpHeaderStyle">
			<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
			<view class="search-box">
				<view class="search-input"><u--input placeholder="请输入搜索内容" border="none" v-model="searchValue"></u--input></view>
				<view class="search-button">
					<u-button color="#6556FD" size="mini" shape="circle" class="search-btn">搜索</u-button>
				</view>
			</view>
			<view class="tmp"><text>1</text></view>
		</view>

		<view class="search-tags-box">
			<view class="tag-title">
				<view class="tag-image"><u--image src="https://static.duolachaowan.com/static/common/tabdot.png" width="15" height="15"></u--image></view>
				<view><u-text text="热搜" :bold="true"></u-text></view>
			</view>
			<view class="tag-body">
				<view class="tag-item">BOB</view>
				<view class="tag-item">Smart</view>
				<view class="tag-item">July</view>
				<view class="tag-item">BOB</view>
				<view class="tag-item">Smart</view>
				<view class="tag-item">July</view>
			</view>
		</view>

		<view class="search-tags-box">
			<view class="tag-title">
				<view class="tag-image"><u--image src="https://static.duolachaowan.com/static/common/tabdot.png" width="15" height="15"></u--image></view>
				<view><u-text text="搜索历史" :bold="true"></u-text></view>
			</view>
			<view class="tag-body">
				<view class="tag-item">BOB</view>
				<view class="tag-item">Smart</view>
				<view class="tag-trash">
					<view class="bg-gray"><u-icon name="trash-fill" color="#6556FD" size="20"></u-icon></view>
				</view>
			</view>
		</view>
	</view>
</template>

<custom-tab-bar direction="" :show-icon="" :selected="" @onTabItemTap="" />
<script>
import index from './index.js';
export default index;
</script>

<style lang="scss" scoped>
@import 'index.scss';
</style>
