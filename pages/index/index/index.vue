<template>
	<view class="page-index">
		<!-- <mp-menu-button></mp-menu-button> -->
		<view class="pd-lr-15 header-tabs">
			<status-bar></status-bar>
			<view class="header" :style="mpHeaderStyle">
				<view class="search-box">
					<image :src="getStaticFilePath('@/static/common/search.png')" class="icon" :lazy-load="true"></image>
					<u--input placeholder="请输入内容" border="surround" @focus="goSearch" class="search-input"></u--input>
				</view>
				<view class="top-bar mar-l-10">
					<view class="im-bar" @click="goMenuPages('MESSAGE_BOX_PAGE')"><image :src="getStaticFilePath('@/static/common/im.png')" class="icon" :lazy-load="true"></image></view>

					<!-- 非小程序内 -->
					<!--  #ifndef  MP-WEIXIN -->
					<view class="server-bar"><image :src="getStaticFilePath('@/static/common/service.png')" class="icon" :lazy-load="true"></image></view>
					<!--  #endif -->

					<!-- 小程序内 -->
					<!--  #ifdef  MP-WEIXIN -->
					<button open-type="contact" class="button-contact">
						<view class="server-bar"><image :src="getStaticFilePath('@/static/common/service.png')" class="icon" :lazy-load="true"></image></view>
					</button>
					<!--  #endif -->
				</view>
			</view>
			
			<u-tabs
				:list="topTabList"
				@click="topTabClick"
				:current="topTabIndex"
				ref="tabs"
				keyName="name"
				lineWidth="12"
				lineHeight="12"
				:lineColor="`url(${topTablineBg}) 100% 100%`"
				itemStyle="height:32px;width:25%"
				:activeStyle="{
					'color': '#6556FD',
				}"
			></u-tabs>
		</view>
		<view class="header-holder" :style="'height:' + (holderHeight + 77 )*2 + 'rpx'"></view>
		<view class="pd-lr-15">
			<u-transition :show="topTabIndex == 0">
				<view class="banner-warp mar-t-5">
					<u-swiper
						:list="bannerList"
						keyName="picPath"
						autoplay
						circular
						height="250rpx"
						imgMode="aspectFill"
						:interval="5000"
						:duration="600"
						@change="e => (bannerCurrent = e.current)"
						@click="bannerClick"
					>
						<view slot="indicator" class="indicator">
							<view class="indicator__dot" v-for="(item, index) in bannerList" :key="index" :class="[index === bannerCurrent && 'indicator__dot--active']"></view>
						</view>
					</u-swiper>
				</view>
				<view class="menu">
					<view class="item welfare_club">
						<image :src="getStaticFilePath('@/static/index/zerobuy.png')" class="icon" @click="goMenuPages('ACTIVE_ZEROBUY_PAGE')" :lazy-load="true"></image>
						<text class="text">0元抽</text>
					</view>
					<view class="item invite_rebate">
						<image :src="getStaticFilePath('@/static/index/invite_rebate.png')" class="icon" @click="goMenuPages('INVITE_REBATE_INDEX')" :lazy-load="true"></image>
						<text class="text">邀请奖利</text>
					</view>
					<view class="item daily_sign">
						<image :src="getStaticFilePath('@/static/index/daily_sign.png')" class="icon" @click="goMenuPages('DAILY_SIGN')" :lazy-load="true"></image>
						<text class="text">每日签到</text>
					</view>
					<view class="item mission_accomplishments">
						<image :src="getStaticFilePath('@/static/index/mission_accomplishments.png')" @click="goMenuPages('MISSION_ACHIEVEMENT',false)" class="icon" :lazy-load="true"></image>
						<text class="text">任务成就</text>
					</view>
					<view class="item props_card" @click="goPage('MY_COUPON_PAGE')">
						<image :src="getStaticFilePath('@/static/index/props_card.png')" class="icon" @click="goMenuPages('MY_COUPON_PAGE')" :lazy-load="true"></image>
						<text class="text">卡券</text>
					</view>
				</view>

				<view class="oqi-fudai">
					<view class="bg"></view>
					<view class="header">
						<view class="title"> </view>
						<view>
							<text class="title-name"> </text>
							<text class="title-name-h"> </text>
						</view>
						<text class="title-eg"> </text>
					</view>
					<scroll-view class="swiper" scroll-x enable-flex>
						<view class="item-wrap" @click="goLottery(item)" v-for="(item, index) in lotteryList" :key="index" >
							<image :src="item.pic" class="image" :lazy-load="true"></image>
							<view class="info">
								<text class="title">{{ item.groupName }}</text>
								<view class="des">
									<text class="flag flag-new">新品</text>
									<view class="price">
										<text class="yuan">￥</text>
										<text class="amount">{{ numberToFixed(item.groupPrice) }}</text>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>

				<view class="product-wrap">
					<view class="item" v-for="(v, i) in indexOqibagListObj.list" :key="i" @click="goLottery(v)">
						<u--image :src="v.pic" class="image" width="100%" height="326rpx" :showLoading="true" bgColor="transparent" mode="aspectFit" radius="10rpx">
							<template v-slot:loading>
								<u-loading-icon mode="circle" inactive-color="#6556FD"></u-loading-icon>
							</template>
						</u--image>
						<view class="info">
							<text class="title">{{ v.groupName }}</text>
							<view class="des">
								<view class="price">
									<text class="current">{{ numberToFixed(v.groupPrice) }}</text>
									<text class="original">{{ numberToFixed(v.groupPrice * 1.5) }}</text>
								</view>
								<text class="button">购买</text>
							</view>
						</view>
					</view>
				</view>
			</u-transition>

			<u-transition :show="topTabIndex >= 1 && changeTopTabDataObj.length >= 1">
				<view class="product-wrap">
					<view class="item" v-for="(v, i) in changeTopTabDataObj.list" :key="i" @click="goLottery(v)">
						<u--image :src="v.pic" class="image" width="100%" height="326rpx" :showLoading="true" bgColor="transparent" mode="aspectFit" radius="10rpx">
							<template v-slot:loading>
								<u-loading-icon mode="circle" inactive-color="#6556FD"></u-loading-icon>
							</template>
						</u--image>
						<view class="info">
							<text class="title">{{ v.groupName }}</text>
							<view class="des">
								<view class="price">
									<text class="current">{{ numberToFixed(v.groupPrice) }}</text>
									<text class="original">{{ numberToFixed(v.groupPrice) }}</text>
								</view>
								<text class="button">购买</text>
							</view>
						</view>
					</view>
				</view>
			</u-transition>
		</view>

		<view @touchmove.stop.prevent="moveStop">
			<u-popup :show="popupScratchHappyShow" @close="scratchHappyClose" @open="scratchHappyOpen" mode="center" :closeable="true">
				<view class="popup-scratch-happy-wrap">
					<image class="wrap-bg" :style="{ backgroundImage: `url(${scratchHappyWrapBg})` }" :lazy-load="true"></image>

					<!-- <scratch-happy
						ref="scratch_happy"
						:height="scratchHappy.height"
						:width="scratchHappy.width"
						:watermark="scratchHappy.watermark"
						:title="scratchHappy.title"
						:init_show="scratchHappy.init_show"
						@scratchComplete="scratchComplete"
						@scratchInit="scratchInit"
						:percentage="scratchHappy.percentage"
						:style="{
							top: 75 * 2 + 'rpx',
							lett: 0,
							position: 'relative'
						}"
					>
						<view class="scratch-happy-result" v-if="scratchHappy.initComplete"><text>这里是刮出来的内容</text></view>
					</scratch-happy> -->

					<view class="scratch-happy">
						<view class="time"><text class="text">倒计时：08:08:03</text></view>
						<view class="images">
							<view class="unit unit1">
								<image :src="getStaticFilePath('@/static/index/scratch-card-front.png')" :class="['card', 'front', `front-on1`]" :lazy-load="true"></image>
								<!-- <image src="@/static/index/scratch-card-back.png" :class="['card', 'back', `back-on1`]"></image> -->
							</view>
							<view class="unit unit2">
								<image :src="getStaticFilePath('@/static/index/scratch-card-front.png')" :class="['card', 'front', `front-on2`]" :lazy-load="true"></image>
								<!-- <image src="@/static/index/scratch-card-back.png" :class="['card', 'back', `back-on2`]"></image> -->
							</view>
							<view class="unit unit3">
								<image :src="getStaticFilePath('@/static/index/scratch-card-front.png')" :class="['card', 'front', `front-on3`]" :lazy-load="true"></image>
								<!-- <image src="@/static/index/scratch-card-back.png" :class="['card', 'back', `back-on3`]"></image> -->
							</view>
						</view>
						<view class="des"><text class="text">选择你要打开的幸运碎片</text></view>
					</view>

					<view class="rules-intro">
						<text class="title">规则：</text>
						<view class="rules-image"><image :src="getStaticFilePath('@/static/index/scratch_happy_rules.png')" class="image" :lazy-load="true"></image></view>
						<view class="info"><text class="text">中奖者限倒计时内上传截图审核，逾期失效！</text></view>
					</view>

					<view class="buttons">
						<view class="button left">
							<text class="text">{{ scratchHappy.isComplete ? '刮完了' : '未刮完' }}</text>
						</view>

						<view class="button right"><text class="text">去邀请</text></view>
					</view>
				</view>
			</u-popup>
		</view>
		
<!-- 		<view class="seckill" id="seckill" :animation="seckillOpenCloseData" v-if="seckillHide" @click.stop="goPage('ACTIVE_ZEROBUY_PAGE')">
			<view class="header" :style="seckillOpen ? '' : 'display:none'"><text class="title">0元抽</text></view>
			<view class="button">
				<view id="seckill-close" class="seckill-close" :style="seckillOpen ? '' : 'display:none'" @click.stop="hideSeckillPop()" ><image :src="getStaticFilePath('@/static/index/seckill-close.png')" class="icon"></image></view>
				<view class="seckill-next" v-if="!seckillClose" @click.stop="closeSeckillPop()"><image :src="getStaticFilePath('@/static/index/seckill-next.png')" class="icon"></image></view>
			</view>
			<view class="count-down-warp" :style="seckillOpen ? '' : 'display:none'">
				<view class="count-down">
					<u-count-down :time="seckillCountDownEndTime" format="HH:mm:ss" autoStart @change="seckillCountDownOnChange">
						<view class="time">
							<view class="time__custom">
								<text class="time__custom__item">
									{{ seckillCountDownDate.hours > 10 ? seckillCountDownDate.hours : '0' + seckillCountDownDate.hours }}
								</text>
							</view>
							<text class="time__doc">:</text>
							<view class="time__custom">
								<text class="time__custom__item">{{ seckillCountDownDate.minutes }}</text>
							</view>
							<text class="time__doc">:</text>
							<view class="time__custom">
								<text class="time__custom__item">{{ seckillCountDownDate.seconds }}</text>
							</view>
						</view>
					</u-count-down>
				</view>
				<text class="text">后结束,冲冲冲！</text>
			</view> -->
			<!-- 收缩后 -->
			<!-- <view class="header-close" v-if="seckillClose">0元抽</view>
			<view class="countdown-close" v-if="seckillClose">01:01:59</view>
			<image :src="getStaticFilePath('@/static/index/seckill-close.png')" class="seckill-close-close" v-if="seckillClose" @click.stop="hideSeckillPop()"></image>
		</view> -->
		<!-- <u-popup :show="inviteShow" mode="center" :round="10" :closeable="false" @close="inviteShowClose()">
			<view class="inviteShow">
				<image :src="getStaticFilePath('@/static/common/invite.png')" mode="" class="img"></image>
			</view>
		</u-popup>
		<!-- <tab-bar :currentPage="currentPage"></tab-bar> -->
		
		<!-- 首页新人礼包弹窗 -->
		<u-popup :show="newGiftShow" mode="center" @close="newGiftShow = false">
			<view class="newgiftshow">
				<image :src="giftCard.pic" mode="" class="img" :lazy-load="true"></image>
				<image :src="getStaticFilePath('@/static/index/coupon-card-close.png')" mode="" class="img-close" @click="newGiftShow = false;zeroBuyShow = true" :lazy-load="true"></image>
				<view class="btn" @click="receiveGiftBag()">收下了</view>
			</view>
		</u-popup>
		
		<!-- 首页零元抽活动弹窗 -->
		<u-popup :show="zeroBuyShow" mode="center" @close="zeroBuyShow = false">
			<view class="zeroBuyShow">
				<image :src="getStaticFilePath('@/static/index/zerobuy-card.png')" mode="" class="img" :lazy-load="true"></image>
				<image :src="getStaticFilePath('@/static/index/zerobuy-card-close.png')" mode="" class="img-close"  @click="zeroBuyShow = false" :lazy-load="true"></image>
				<view class="btn" @click="goPage('ACTIVE_ZEROBUY_PAGE')" ></view>
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
