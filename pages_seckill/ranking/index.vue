<template>
	<view>
		<view class="header">
			<status-bar></status-bar>
			<view class="page-header">
				<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
				<view class="title"><text class="text">排行榜</text></view>
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
		</view>
		<view class="header-holder" :style="'height:' + (holderHeight + 80)*2 + 'rpx;'"></view>
		
		<view class="content">
			<image :src="prodDetail.pic" mode="" class="banner"></image>
			<view class="you">
				<view class="yourinfo">
					<image :src="userInfo.headImg" mode="" class="img"></image>
					<view class="info">
						<view class="name">{{ fuzzyPhone(userInfo.nickName) }}</view>
						<view class="signnum">{{ codeList.length }}个签码</view>
					</view>
				</view>
				<view class="aside">第 {{ myCodeRank }} 名</view>
			</view>
			
			<u-transition :show="topTabIndex === 0">
				<view class="ranklist">
					<view class="title">
						<view class="nav1">排行</view>
						<view class="nav2">用户</view>
						<view class="nav3">中奖率</view>
					</view>
					<view class="ranklist-item" v-for="(item,index) in codeRankList" :key="index">
						<view :class="'top ' + 'top' + item.rownum">{{item.rownum}}</view>
						<view class="userinfo">
							<image :src="item.headImg" mode="" class="img"></image>
							<view class="info">
								<view class="name">{{ fuzzyPhone(item.nickName) }}</view>
								<view class="signnum">{{item.codeNumber}}个签码</view>
							</view>
						</view>
						<view class="total">{{item.codeNumber}}<text class="span">倍</text></view>
					</view>
				</view>
			</u-transition>
			
			<u-transition :show="topTabIndex === 1">
				<view class="signnumlist">
					<view class="signnumlist-item" v-for="(item,index) in codeList" :key="index">签号: {{item}}</view>
					<view class="signnumlist-item" v-for="(item,index) in codeList" :key="index">签号: {{item}}</view>
					<view class="signnumlist-item" v-for="(item,index) in codeList" :key="index">签号: {{item}}</view>
					<view class="signnumlist-item" v-for="(item,index) in codeList" :key="index">签号: {{item}}</view>
					<view class="signnumlist-item" v-for="(item,index) in codeList" :key="index">签号: {{item}}</view>
				</view>
			</u-transition>
		</view>
		
		<button class="invitebtn" open-type="share" :data-obj="prodDetail,userInfo">邀请好友助力</button>
	</view>
</template>

<script>
import index from '@/pages_seckill/ranking/index.js';
export default index;
</script>

<style lang="scss" scoped>
@import '@/pages_seckill/ranking/index.scss';
</style>
