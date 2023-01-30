<template>
	<view>
		<view class="header">
			<status-bar></status-bar>
			<view class="page-header">
				<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
				<view class="title"><text class="text">0元抽</text></view>
			</view>
			<u-tabs
				:list="topTabList"
				@change="topTabClick"
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
			<view class="listitem" v-for="(item,index) in prodList" :key="index" @click.stop="lookDetail('SECKILL_DETAIL_PAGE',item)">
				<view class="info">
					<view class="img">
						<view class="img-bg"></view>
						<u--image :src="item.pic" class="img-pic" width="129.6rpx" height="129.6rpx" :showLoading="true" bgColor="transparent" mode="aspectFit">
							<template v-slot:loading>
								<u-loading-icon></u-loading-icon>
							</template>
						</u--image>
					</view>
					<view class="info-aside">
						<view class="name">{{item.title}}</view>
						<view class="people">{{item.participantNumber}}人已参与</view>
						<view class="price">{{item.price}}元</view>
					</view>
				</view>
				<view class="footer">
					<view class="total">中奖人数:{{item.prizeCount}}</view>
					<view class="start" v-if="item.seckillStatus === 0">{{item.startTime}} 自动抽取</view>
					<view class="start end" v-if="item.seckillStatus === 2">正在开奖...</view>
					<view class="start end" v-if="item.seckillStatus === 1">已结束</view>
				</view>
				<button class="button join" v-if="item.isParticipate === 0 && item.seckillStatus === 0">立即参与</button>
				<button class="button joined" v-if="item.isParticipate === 1 && item.seckillStatus === 0">已参与</button>
				<button class="button joined" v-if="item.seckillStatus === 2">正在开奖</button>
				<button class="button joinover" v-if="item.seckillStatus === 1">查看中奖</button>
			</view>
		</view>
	</view>
</template>

<script>
import index from '@/pages_active/zerobuy/index/index.js'
export default index;
</script>

<style lang="scss" scoped>
@import '@/pages_active/zerobuy/index/index.scss'
</style>