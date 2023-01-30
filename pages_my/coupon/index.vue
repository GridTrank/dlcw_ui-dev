<template>
	<view>
		<view class="header">
			<status-bar></status-bar>
			<view class="page-header">
				<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
				<view class="title"><text class="text">优惠券</text></view>
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
		</view>
		<view class="header-holder" :style="'height:' + (holderHeight + 80)*2 + 'rpx;'"></view>
		
		<view class="content">
			
			<u-transition :show="topTabIndex == 0">
				<view class="couponlist">
					<view class="item" v-for="(item,index) in couponList" :key="index">
						<view class="left">
							<view class="num">
								<text class="number">{{ item.couponAmount }}</text>
								<text>元</text>
							</view>
							<view class="limit">满{{ item.couponConditionAmount }}元可用</view>
						</view>
						<view class="right">
							<view class="title" v-if="item.couponLotteryType == 1">
								<text>福袋优惠券</text>
								<text v-if="item.couponConditionType === 0" class="tips">(无门槛通用)</text>
								<text v-if="item.couponConditionType === 1" class="tips">(限“来一发”使用)</text>
								<text v-if="item.couponConditionType === 2" class="tips">(总消费满足可使用)</text>
							</view>
							<view class="title" v-if="item.couponLotteryType == 0">一番赏优惠券</view>
							<view class="date">有效期至{{ item.couponExpireDate }}</view>
						</view>
						<view class="use" v-if="item.couponStatus == 0" @click.stop="goUse('LOTTERY_PAGE',item)">使用</view>
						<image class="used" :src="getStaticFilePath('@/static/my/coupon-used.png')" v-if="item.couponStatus == 1"></image>
						<image class="invalid" :src="getStaticFilePath('@/static/my/coupon-invalid.png')" v-if="item.couponStatus == 2"></image>
					</view>
				</view>
				<view class="empty" v-if="couponList.length == 0">
					<u-empty
					  :icon="noCouponImg"
					  text="暂无优惠券信息"
					></u-empty>
				</view>
			</u-transition>
			
			<u-transition :show="topTabIndex == 1">
				<view class="couponlist">
					<view class="item" v-for="(item,index) in couponList" :key="index">
						<view class="left">
							<view class="num">
								<text class="number">{{ item.couponAmount }}</text>
								<text>元</text>
							</view>
							<view class="limit">满{{ item.couponConditionAmount }}元可用</view>
						</view>
						<view class="right">
							<view class="title" v-if="item.couponLotteryType == 1">
								<text>福袋优惠券</text>
								<text v-if="item.couponConditionType === 0" class="tips">(无门槛通用)</text>
								<text v-if="item.couponConditionType === 1" class="tips">(限“来一发”使用)</text>
								<text v-if="item.couponConditionType === 2" class="tips">(总消费满足可使用)</text>
							</view>
							<view class="title" v-if="item.couponLotteryType == 0">一番赏优惠券</view>
							<view class="date">有效期至{{ item.couponExpireDate }}</view>
						</view>
						<view class="use" v-if="item.couponStatus == 0" @click.stop="goUse('LOTTERY_PAGE',item)">使用</view>
						<image class="used" :src="getStaticFilePath('@/static/my/coupon-used.png')" v-if="item.couponStatus == 1"></image>
						<image class="invalid" :src="getStaticFilePath('@/static/my/coupon-invalid.png')" v-if="item.couponStatus == 2"></image>
					</view>
				</view>
				<view class="empty" v-if="couponList.length == 0">
					<u-empty
					  :icon="noCouponImg"
					  text="暂无优惠券信息"
					></u-empty>
				</view>
			</u-transition>
			
			<u-transition :show="topTabIndex == 2">
				<view class="couponlist">
					<view class="item" v-for="(item,index) in couponList" :key="index">
						<view class="left">
							<view class="num">
								<text class="number">{{ item.couponAmount }}</text>
								<text>元</text>
							</view>
							<view class="limit">满{{ item.couponConditionAmount }}元可用</view>
						</view>
						<view class="right">
							<view class="title" v-if="item.couponLotteryType == 1">
								<text>福袋优惠券</text>
								<text v-if="item.couponConditionType === 0" class="tips">(无门槛通用)</text>
								<text v-if="item.couponConditionType === 1" class="tips">(限“来一发”使用)</text>
								<text v-if="item.couponConditionType === 2" class="tips">(总消费满足可使用)</text>
							</view>
							<view class="title" v-if="item.couponLotteryType == 0">一番赏优惠券</view>
							<view class="date">有效期至{{ item.couponExpireDate }}</view>
						</view>
						<view class="use" v-if="item.couponStatus == 0" @click.stop="goUse('LOTTERY_PAGE',item)">使用</view>
						<image class="used" :src="getStaticFilePath('@/static/my/coupon-used.png')" v-if="item.couponStatus == 1"></image>
						<image class="invalid" :src="getStaticFilePath('@/static/my/coupon-invalid.png')" v-if="item.couponStatus == 2"></image>
					</view>
				</view>
				<view class="empty" v-if="couponList.length == 0">
					<u-empty
					  :icon="noCouponImg"
					  text="暂无优惠券信息"
					></u-empty>
				</view>
			</u-transition>

		</view>
	</view>
</template>

<script>
import index from './index.js';
export default index;
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>