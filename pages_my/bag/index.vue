<template>
	<view class="">
		<view class="header">
			<status-bar></status-bar>
			<view class="page-header">
				<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
				<view class="title"><text class="text">我的背包</text></view>
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
				itemStyle="width:20%;height:44px"
			></u-tabs>
		</view>
		<view class="header-holder" :style="'height:' + (holderHeight + 80)*2 + 'rpx;'"></view>
		<view class="tablist">
			<u-transition :show="topTabIndex == 0">
				<view class="baglist">
					<view class="baglist-item" v-for="item in bagList" :key="item.id">
						<view :class="item.productLevel + ' item-border'" @click="showOpen(item)">
							<u--image :src="item.productPic" class="img" width="118.4rpx" height="118.4rpx" :showLoading="true" bgColor="transparent" mode="aspectFit">
								<template v-slot:loading>
									<u-loading-icon mode="circle" inactive-color="#6556FD"></u-loading-icon>
								</template>
								<template v-slot:error>
									<u-icon name="error-circle"></u-icon>
								</template>
							</u--image>
							<!-- <image :src="item.productPic" mode="" class="img"></image> -->
						</view>
						<view class="point" v-show="$store.state.user.sellList.some(i => item.id == i.id) || $store.state.user.sentList.some(i => item.id == i.id)"></view>
						<view class="locked" v-if="item.isConsignment === 1" @click="showOpen(item)">
							<image :src="getStaticFilePath('@/static/my/locked.png')" mode="" class="lock-img"></image>
						</view>
					</view>
				</view>
				<u-empty
					:icon="noCouponImg"
					text="哦吼~背包空空如也哦!"
					:show="false"
				></u-empty>
				
			</u-transition>
			
			<u-transition :show="topTabIndex == 1">
				<u-empty class="empty"
				  :icon="noCouponImg"
				  text="哦吼~背包空空如也哦!"
				></u-empty>
			</u-transition>
			
			<u-transition :show="topTabIndex == 2">
				<view class="">haha3</view>
			</u-transition>
			
			<u-transition :show="topTabIndex == 3">
				<view class="">haha4</view>
			</u-transition>
			
			<u-transition :show="topTabIndex == 4">
				<view class="">haha5</view>
			</u-transition>
			
			<u-transition :show="topTabIndex == 5">
				<view class="">haha6</view>
			</u-transition>
			
			<view class="footer-holder">
				<!-- <text class="more">上拉加载更多信息...</text> -->
			</view>
			<view class="footer">
				<view :class="'level-item' + (level === 'SSS' ? ' activeSSS' : '')" @click="chooseLevel('SSS')">SSS</view>
				<view :class="'level-item' + (level === 'S' ? ' activeS' : '')" @click="chooseLevel('S')">S</view>
				<view :class="'level-item' + (level === 'A' ? ' activeA' : '')" @click="chooseLevel('A')">A</view>
				<view :class="'level-item' + (level === 'B' ? ' activeB' : '')" @click="chooseLevel('B')">B</view>
				<button class="allsell" @tap="$u.throttle(allsell,500)">一键寄售</button>
			</view>
			
			<u-popup :show="showDetails" @close="showClose" mode="center" :round="10" bgColor="transparent">
			    <view class="showdetails">
			        <view class="title">
						物品信息
						<view class="cancel" @click="showClose()">x</view>
					</view>
					<u--image :src="details.productPic" class="img" width="500rpx" height="500rpx" :showLoading="true" bgColor="transparent" mode="aspectFit">
						<template v-slot:loading>
							<u-loading-icon></u-loading-icon>
						</template>
					</u--image>
					<!-- <image :src="details.productPic" mode="" class="img"></image> -->
					<view class="info">
						<text class="info-title">{{details.productName}}</text>
						<text class="info-time">{{details.createTime}}</text>
<!-- 						<view class="info-look">
							<view class="look">查看来源 ></view>
							<view class="look">查看图鉴 ></view>
						</view> -->
						<view class="tips">点击发货后,您的货品将在48小时内发出</view>
						<view class="tips" v-if="details.isConsignment === 1">*该物品为兑换礼品,暂不支持寄售和赠送*</view>
					</view>
					<view class="do">
						<button @click="sent('MY_BAG_SENT_PAGE',details)" v-if="!$store.state.user.sellList.some(i => details.id == i.id)">发货</button>
						<button @click="sell('MY_BAG_SELL_PAGE',details)" v-if="!$store.state.user.sentList.some(i => details.id == i.id)" :disabled="details.isConsignment === 1">寄售</button>
						<button @click="openGiveShow(details)" v-if="!$store.state.user.sentList.some(i => details.id == i.id) && !$store.state.user.sellList.some(i => details.id == i.id)" :disabled="details.isConsignment === 1">赠送</button>
					</view>
			    </view>
				
				<u-popup :show="giveShow" @close="closeGiveShow()" mode="center" bgColor="transparent" :round="10">
					<view class="giveshow">
						<view class="text">请输入你要赠送玩家的邀请码</view>
						<u--input
						    placeholder="请输入玩家邀请码"
						    border="surround"
						    v-model="giveCode"
						    @change="getGiveCode"
							customStyle="background:#fff;width:249px;height:26px;margin:20px"
						  ></u--input>
						<view class="do">
							<button @click="closeGiveShow()" class="cancel">取消</button>
							<button @click="give()" class="confirm">确认</button>
						</view>
					</view>
				</u-popup>
			</u-popup>
			
			
		</view>
	</view>
</template>

<script>
import index from '@/pages_my/bag/index.js';
export default index;
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>