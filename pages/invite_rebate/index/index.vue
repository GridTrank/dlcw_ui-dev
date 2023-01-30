<template>
	<view class="invite_rebate">
		<status-bar></status-bar>
		<view class="page-header" :style="mpHeaderStyle">
			<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
			<view class="title"><text class="text">我的返利</text></view>
			<view class="right" @click="popupRuleOpen"><text class="text">规则</text></view>
		</view>
		<view class="warp warp1">
			<view class="m1">
				<view class="top">
					<view class="bg"></view>
					<view class="left">
						<text class="small">24H返利</text>
						<view class="row">
							<text class="text">{{ info.rebate || 0 }}</text>
							<text class="small mar-l-5"></text>
						</view>
					</view>
					<view class="right">
						<text class="text">{{ info.benefitRate || 0 }}%</text>
						<text class="small">奖励比例</text>
					</view>
				</view>
				<view class="bottom">
					<view class="col">
						<text class="small">累计返利</text>
						<text class="row">
							<text class="text">{{ info.cumulativeRebate || 0 }}</text>
							<text class="small"></text>
						</text>
					</view>
					<view class="line"></view>
					<view class="col a-i-c">
						<text class="small">可提余额</text>
						<text class="text">{{ info.invitationNum || 0 }}</text>
					</view>
					<view class="line"></view>
					<view class="col a-i-c" @click="toRecord">
						<text class="small">累计邀请</text>
						<text class="text">{{ info.cumulativeInvitationNum || 0 }}</text>
					</view>
				</view>
			</view>

			<view class="m2">
				<view class="bg"></view>
				<view class="left" ><image :src="getStaticFilePath('@/static/invite_rebate/m2.png')" class="image"></image></view>
				<view class="right">
					<view class="item">
						<image :src="getStaticFilePath('@/static/invite_rebate/num-1.png')" class="image"></image>
						<view class="info">
							<text class="title">分享推广链接</text>
							<text class="text">分享至社群或者好友</text>
						</view>
					</view>
					<view class="line"></view>

					<view class="item">
						<image :src="getStaticFilePath('@/static/invite_rebate/num-2.png')" class="image"></image>
						<view class="info">
							<text class="title">好友充值成功</text>
							<text class="text">关联邀请码,在充值消费</text>
						</view>
					</view>
					<view class="line"></view>

					<view class="item">
						<image :src="getStaticFilePath('@/static/invite_rebate/num-3.png')" class="image"></image>
						<view class="info">
							<text class="title">获得奖励</text>
							<text class="text">邀请奖励立即到账</text>
						</view>
					</view>
				</view>
			</view>

			<view class="m3">
				<view class="right" @click="openAssociate"><text class="text">关联上级</text></view>
				<view class="middle" ><text class="text">提到余额</text></view>
				<button class="left" open-type="share" :data-obj="userInfo"><text class="text">去邀请</text></button>
			</view>

			<view class="users">
				<view class="bg"></view>
				<text class="text">好友({{ info.cumulativeInvitationNum || 0 }})</text>
			</view>
		</view>

		<view class="warp">
			<view class="list-wrap">
				<view class="list-wrap-header">
					<text class="text">帐号</text>
					<text class="text">
						奖励
						
						
					</text>
					<text class="text">金额</text>
				</view>
			</view>
			<u-list @scrolltolower="scrolltolower" :height="listHeight">
				<u-list-item v-for="(item, index) in listObj.list" :key="index">
					<text class="text left">{{ item.invitedUserName }}</text>
					<text class="text middle">{{ item.reward }}</text>
					<text class="text right">{{ item.amountMoney }}</text>
				</u-list-item>
			</u-list>
		</view>

		<u-popup :show="popupRuleShow" mode="bottom" :round="10" :closeable="true" @close="popupRuleClose">
			<view class="popup popup-rule-warp">
				<view class="popup-header"><text class="title">规则</text></view>
				<view class="con">
					<view class="text">1.您在火潮星球平台进行实名认证后可通过邀请新用户赚取佣金;</view>
					<view class="text">2.您邀请的新用户于火潮星球平台内消费(包括但不限于福袋、一番赏、直购商城、秒杀等 活动)的金额均可为您贡献3%~12%的提成奖励;</view>
					<view class="text">3.邀请为火潮星球的试验性功能之一，火潮星球 平台将可能随时对该功能的数值或部分数据进行一些必要的调整，您将对此无任何异议，具体规则以火潮星球平台最新的《火潮星球邀请返利规则为准》;</view>
					<view class="text">4.您获取的收益可进行提现以及在火潮星球平台中进行消费;</view>
					<view class="text">5.您在对获取的收益进行提现时，火潮星球平台可能会收取您一部分必要手续费;</view>
					<view class="text">6.您申请提现后，火潮星球平台将会在7个工作日内审核您的申请，并进行提现的打款操作;</view>
					<view class="text">7.您不可使用技术手段或其他违规违法行为进行收益的刷取，一旦发现此类违规违法行为，火潮星球平台将收集证据并保留追诉您的权利，请您务必严格遵守规则;</view>
					<view class="text">8.您使用获取的收益在火潮星球平台消费时，可获得与其他用户平等的消费权益;</view>
					<view class="text">9.本规则解释权最终归火潮星球平台所有，火潮星球平台享有增加、修改、 解释明除规则条文的权利。</view>
				</view>
			</view>
		</u-popup>

		<view class="dola-box-modal associate-modal">
			<u-modal
				ref="uModal"
				:show="associateModal.show"
				:title="associateModal.title"
				showCancelButton
				closeOnClickOverlay
				@close="associateClose"
				@cancel="associateClose"
				@confirm="associateConfirm"
			>
				<u-toast ref="uToast"></u-toast>
				<view class="slot-content"><input class="uni-input" v-model="associateModal.code" focus placeholder="邀请码" /></view>
			</u-modal>
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
