<template>
	<view>
		<view class="bg"></view>
		<status-bar></status-bar>
		<view class="page-header">
			<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
			<view class="title"><text class="text">余额</text></view>
		</view>
		<view class="balance">
			<image src="https://static.duolachaowan.com/static/my/balance.png" mode="" class="balanceimg"></image>
			<image src="https://static.duolachaowan.com/static/my/balance-icon.png" mode="" class="balance-icon" @click="showBalanceDetail"></image>
			<view class="text">
				<text>我的余额</text>
				<text class="num">{{loginUser.userBalance == null ? 0 : loginUser.userBalance}}</text>
			</view>
			<button class="refund" @click="tipsOpen()">退款</button>
		</view>
		<view class="balance-menu">
			<u-cell title="余额收支记录"  is-link size="large" icon="https://static.duolachaowan.com/static/my/balmenu1.png" url="./record"></u-cell>
			<u-cell title="余额充值" is-link  size="large" icon="https://static.duolachaowan.com/static/my/balmenu2.png" @click="openRecharge()"></u-cell>
		</view>
		
		<u-popup :show="showRecharge" mode="bottom"  @close="closeRecharge()" @open="openRecharge()"  overlayOpacity="0">
		    <view class="recharge-content">
		        <view :class="'numlist-item ' + (active == item.id ? 'active' : '')" v-for="item in numlist" :key="item.id" @click="choose(item)">
					<text>充值  ¥{{item.shownAmount ? item.shownAmount : '未知'}}</text><text>余额 +{{item.realAmount ? item.realAmount : '未知'}}</text>
				</view>
		    </view>
			<view class="tips">若扣款成功，但余额未到账，请<text @click="go()">联系客服</text></view>
			<view class="footer">
				<!-- <view class="alipay" @click="alipay">
					<image src="https://static.duolachaowan.com/static/common/ali-pay.png" class="icon"></image>
					<text class="name">支付宝支付</text>
				</view> -->
				<view class="wechatpay" @click="wechatpay">
					<image src="https://static.duolachaowan.com/static/common/wechat-pay.png" class="icon"></image>
					<text class="name">微信支付</text>
				</view>
			</view>
		</u-popup>
		
		
		<u-popup :show="showBD" mode="bottom"  @close="closeBD()">
		    <view class="balance-detail">
				<view class="title">说明</view>
				<view class="content">1.余额是什么?</view>
				<view class="content">答: 可通过平台充值或者回收后获得，可用于火潮星球平台内的购买和退款。</view>
				<view class="content">2.余额提现到账需要多久?</view>
				<view class="content">答: 提现一般为24小时到账，具体到账时间以微信或支付宝但处理时间为准。</view>
				<view class="content">3.余额提现手续费?</view>
				<view class="content">答: 提现会收取部分手续费，具体收取比例以提现时的比例为准。</view>
				<view class="content">4.余额退款到账时间需要多久?</view>
				<view class="content">答: 退款到账时间以微信或者支付宝的处理为准。</view>
				<view class="content">5.余额退款手续费?</view>
				<view class="content">答: 退款目前不收取手续费。</view>
				<view class="content">6.余额退款退到哪里去了?</view>
				<view class="content">答: 余额可进行退款操作，退款路径为原路退回。</view>
				<view class="content">7.余额为什么会分多笔退回？</view>
				<view class="content">答: 用户在消费时使用不同的平台有多笔充值与支付，在执行退款时为不同订单的退款，因此一笔退款可能会分为不同的平台和订单退回，可在微信或支付宝账单内通过“账单--有退款”进行查询。</view>
			</view>
		</u-popup>
		
		<u-popup :show="showTips" mode="center"  @close="tipsClose()" round="20">
			<view class="showtips">
				<view class="text">暂不支持小程序退款，请复制链接至浏览器下载app后进行退款。</view>
				<view class="text android">安卓端:(暂未开放)</view>
				<view class="text ios">ios端:(暂未开放)</view>
				<view class="text">如有问题请前往 <text class="go">“我的-客服”</text> 联系人工客服进行沟通。</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import index from './index.js';
	export default index;
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>