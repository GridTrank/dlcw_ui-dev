<template>
	<view class="mission-accomplishments">
		<status-bar></status-bar>
		<view class="page-header" :style="mpHeaderStyle">
			<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
			<u-tabs
				:list="topTabList"
				@click="topTabClick"
				:current="topTabIndex"
				lineWidth="12"
				lineHeight="12"
				:lineColor="`url(${topTablineBg}) 100% 100%`"
				:activeStyle="{
					'background-image': 'linear-gradient(98.88deg, #1ACDB8 16.46%, #198E96 90.06%)',
					'-webkit-background-clip': 'text',
					'-webkit-text-fill-color': 'transparent',
					'background-clip': 'text',
					'text-fill-color': 'transparent'
				}"
			></u-tabs>
			<view class="tmp"><text>111</text></view>
		</view>
		<view class="wrap">
			<u-transition :show="topTabIndex == 0">
				<view class="m1 mission">
					<view class="bg"></view>
					<view class="row a-i-c j-c-sb">
						<view class="col">
							<text class="title">我的哆啦币</text>
							<view class="row a-i-c">
								<image :src="getStaticFilePath('@/static/mission_achievement/gold.png')" class="gold"></image>
								<text class="amount">36</text>
							</view>
						</view>
						<view class="col">
							<text class="title">每日活跃度</text>
							<view class="steps">
								<u-steps current="2" dot activeColor="#1ACDB8">
									<u-steps-item title=" " desc=" ">
										<text class="slot-icon" slot="icon">3</text>
										<image :src="getStaticFilePath('@/static/mission_achievement/box1.png')" class="box1" slot="content"></image>
									</u-steps-item>
									<u-steps-item title=" " desc=" ">
										<text class="slot-icon" slot="icon">6</text>
										<image :src="getStaticFilePath('@/static/mission_achievement/box1.png')" class="box1" slot="content"></image>
									</u-steps-item>
									<u-steps-item title=" " desc=" ">
										<text class="slot-icon" slot="icon">10</text>
										<image :src="getStaticFilePath('@/static/mission_achievement/box1.png')" class="box1" slot="content"></image>
									</u-steps-item>
									<u-steps-item title=" " desc=" ">
										<text class="slot-icon" slot="icon">12</text>
										<image :src="getStaticFilePath('@/static/mission_achievement/box2.png')" class="box2" slot="content"></image>
									</u-steps-item>
									<u-steps-item title=" " desc=" "><text class="slot-icon" slot="icon">15</text></u-steps-item>
									<u-steps-item title=" " desc=" "><text class="slot-icon" slot="icon">20</text></u-steps-item>
								</u-steps>
							</view>
						</view>
					</view>
				</view>

				<view class="list-wrap">
					<view class="list-wrap-header"><text class="title normal">日常任务</text></view>
					<view class="item">
						<view class="row">
							<image :src="getStaticFilePath('@/static/mission_achievement/box.png')" class="box"></image>
							<view class="info">
								<view class="header">
									<text class="title">每日首开</text>
									<image :src="getStaticFilePath('@/static/mission_achievement/gold.png')" class="gold"></image>
									<text class="amount">+120</text>
								</view>
								<text class="text">完成: 0/1</text>
							</view>
						</view>
						<view class="button is"><text class="text">已领取</text></view>
					</view>
					<view class="item">
						<view class="row">
							<image :src="getStaticFilePath('@/static/mission_achievement/box.png')" class="box"></image>
							<view class="info">
								<view class="header">
									<text class="title">每日首开</text>
									<image :src="getStaticFilePath('@/static/mission_achievement/gold.png')" class="gold"></image>
									<text class="amount">+120</text>
								</view>
								<text class="text">完成: 0/1</text>
							</view>
						</view>
						<view class="button wait"><text class="text">领取</text></view>
					</view>
					<view class="item">
						<view class="row">
							<image :src="getStaticFilePath('@/static/mission_achievement/box.png')" class="box"></image>
							<view class="info">
								<view class="header">
									<text class="title">每日首开</text>
									<image :src="getStaticFilePath('@/static/mission_achievement/gold.png')" class="gold"></image>
									<text class="amount">+120</text>
								</view>
								<text class="text">完成: 0/1</text>
							</view>
						</view>
						<view class="button go"><text class="text">立即去玩</text></view>
					</view>
					<view class="item">
						<view class="row">
							<image :src="getStaticFilePath('@/static/mission_achievement/box.png')" class="box"></image>
							<view class="info">
								<view class="header">
									<text class="title">每日首开</text>
									<image :src="getStaticFilePath('@/static/mission_achievement/gold.png')" class="gold"></image>
									<text class="amount">+120</text>
								</view>
								<text class="text">完成: 0/1</text>
							</view>
						</view>
						<view class="button go"><text class="text">立即去玩</text></view>
					</view>
				</view>

				<view class="list-wrap">
					<view class="list-wrap-header"><text class="title daily">会员每日挑战任务</text></view>
					<view class="item">
						<view class="row">
							<image :src="getStaticFilePath('@/static/mission_achievement/box.png')" class="box"></image>
							<view class="info">
								<view class="header">
									<text class="title">每日首开</text>
									<image :src="getStaticFilePath('@/static/mission_achievement/gold.png')" class="gold"></image>
									<text class="amount">+120</text>
								</view>
								<text class="text">完成: 0/1</text>
							</view>
						</view>
						<view class="button is"><text class="text">已领取</text></view>
					</view>
					<view class="item">
						<view class="row">
							<image :src="getStaticFilePath('@/static/mission_achievement/box.png')" class="box"></image>
							<view class="info">
								<view class="header">
									<text class="title">每日首开</text>
									<image :src="getStaticFilePath('@/static/mission_achievement/gold.png')" class="gold"></image>
									<text class="amount">+120</text>
								</view>
								<text class="text">完成: 0/1</text>
							</view>
						</view>
						<view class="button wait"><text class="text">领取</text></view>
					</view>
					<view class="item">
						<view class="row">
							<image :src="getStaticFilePath('@/static/mission_achievement/box.png')" class="box"></image>
							<view class="info">
								<view class="header">
									<text class="title">每日首开</text>
									<image :src="getStaticFilePath('@/static/mission_achievement/gold.png')" class="gold"></image>
									<text class="amount">+120</text>
								</view>
								<text class="text">完成: 0/1</text>
							</view>
						</view>
						<view class="button go"><text class="text">立即去玩</text></view>
					</view>
					<view class="item">
						<view class="row">
							<image :src="getStaticFilePath('@/static/mission_achievement/box.png')" class="box"></image>
							<view class="info">
								<view class="header">
									<text class="title">每日首开</text>
									<image :src="getStaticFilePath('@/static/mission_achievement/gold.png')" class="gold"></image>
									<text class="amount">+120</text>
								</view>
								<text class="text">完成: 0/1</text>
							</view>
						</view>
						<view class="button go"><text class="text">立即去玩</text></view>
					</view>
				</view>

				<view class="list-wrap">
					<view class="list-wrap-header"><text class="title weekly">会员每周挑战任务</text></view>
					<view class="item">
						<view class="row">
							<image :src="getStaticFilePath('@/static/mission_achievement/box.png')" class="box"></image>
							<view class="info">
								<view class="header">
									<text class="title">每日首开</text>
									<image :src="getStaticFilePath('@/static/mission_achievement/gold.png')" class="gold"></image>
									<text class="amount">+120</text>
								</view>
								<text class="text">完成: 0/1</text>
							</view>
						</view>
						<view class="button is"><text class="text">已领取</text></view>
					</view>
					<view class="item">
						<view class="row">
							<image :src="getStaticFilePath('@/static/mission_achievement/box.png')" class="box"></image>
							<view class="info">
								<view class="header">
									<text class="title">每日首开</text>
									<image :src="getStaticFilePath('@/static/mission_achievement/gold.png')" class="gold"></image>
									<text class="amount">+120</text>
								</view>
								<text class="text">完成: 0/1</text>
							</view>
						</view>
						<view class="button wait"><text class="text">领取</text></view>
					</view>
					<view class="item">
						<view class="row">
							<image :src="getStaticFilePath('@/static/mission_achievement/box.png')" class="box"></image>
							<view class="info">
								<view class="header">
									<text class="title">每日首开</text>
									<image :src="getStaticFilePath('@/static/mission_achievement/gold.png')" class="gold"></image>
									<text class="amount">+120</text>
								</view>
								<text class="text">完成: 0/1</text>
							</view>
						</view>
						<view class="button go"><text class="text">立即去玩</text></view>
					</view>
					<view class="item">
						<view class="row">
							<image :src="getStaticFilePath('@/static/mission_achievement/box.png')" class="box"></image>
							<view class="info">
								<view class="header">
									<text class="title">每日首开</text>
									<image :src="getStaticFilePath('@/static/mission_achievement/gold.png')" class="gold"></image>
									<text class="amount">+120</text>
								</view>
								<text class="text">完成: 0/1</text>
							</view>
						</view>
						<view class="button go"><text class="text">立即去玩</text></view>
					</view>
				</view>
			</u-transition>
			<u-transition :show="topTabIndex == 1">
				<view class="achievement">
					<view class="bg"></view>
					<view class="f-row a-i-c j-c-sb">
						<view class="f-col trophy">
							<text class="trophy-title">我的成就</text>
							<image :src="getStaticFilePath('@/static/mission_achievement/trophy.png')" class="trophy-image"></image>
						</view>
						<view class="f-row a-i-c lottery">
							<view class="f-col j-c-sb">
								<text class="lottery-title">0元抽奖</text>
								<view class="button"><text class="button-text">立即参与</text></view>
							</view>
							<image :src="getStaticFilePath('@/static/mission_achievement/box3.png')" class="box3 mar-l-10"></image>
						</view>
					</view>
				</view>

				<view class="list-wrap">
					<view class="list-wrap-header"><text class="title achievement-title">成就</text></view>
					<view class="item">
						<view class="row">
							<image :src="getStaticFilePath('@/static/mission_achievement/box.png')" class="box"></image>
							<view class="info">
								<view class="header">
									<text class="title">拥有一个S级</text>
									<image :src="getStaticFilePath('@/static/mission_achievement/gold.png')" class="gold"></image>
									<text class="amount">+120</text>
								</view>
								<text class="text">完成: 0/1</text>
							</view>
						</view>
						<view class="button is"><text class="text">已领取</text></view>
					</view>
					<view class="item">
						<view class="row">
							<image :src="getStaticFilePath('@/static/mission_achievement/box.png')" class="box"></image>
							<view class="info">
								<view class="header">
									<text class="title">每日首开</text>
									<image :src="getStaticFilePath('@/static/mission_achievement/gold.png')" class="gold"></image>
									<text class="amount">+120</text>
								</view>
								<text class="text">完成: 0/1</text>
							</view>
						</view>
						<view class="button wait"><text class="text">领取</text></view>
					</view>
					<view class="item">
						<view class="row">
							<image :src="getStaticFilePath('@/static/mission_achievement/box.png')" class="box"></image>
							<view class="info">
								<view class="header">
									<text class="title">每日首开</text>
									<image :src="getStaticFilePath('@/static/mission_achievement/gold.png')" class="gold"></image>
									<text class="amount">+120</text>
								</view>
								<text class="text">完成: 0/1</text>
							</view>
						</view>
						<view class="button go"><text class="text">立即去玩</text></view>
					</view>
					<view class="item">
						<view class="row">
							<image :src="getStaticFilePath('@/static/mission_achievement/box.png')" class="box"></image>
							<view class="info">
								<view class="header">
									<text class="title">每日首开</text>
									<image :src="getStaticFilePath('@/static/mission_achievement/gold.png')" class="gold"></image>
									<text class="amount">+120</text>
								</view>
								<text class="text">完成: 0/1</text>
							</view>
						</view>
						<view class="button go"><text class="text">立即去玩</text></view>
					</view>
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
@import 'index.scss';
</style>
