<template>
	<view class="props_card">
		<status-bar></status-bar>
		<view class="page-header" :style="mpHeaderStyle">
			<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
			<view class="title"><text class="text">道具卡</text></view>
			<view class="tmp"><text>111</text></view>
		</view>

		<view class="wrap">
			<view class="list-wrap">
				<view class="item f-row a-i-c j-c-sb">
					<view class="f-row a-i-c j-c-sb">
						<view class="card"><image :src="getStaticFilePath('@/static/props_card/card.png')" class="card-image"></image></view>
						<view class="f-col info  j-c-sb mar-l-10 ">
							<text class="title">透视卡</text>
							<text class="num">x1</text>
						</view>
					</view>
					<view class="button"><text class="text">使用</text></view>
				</view>

				<view class="item f-row a-i-c j-c-sb">
					<view class="f-row a-i-c j-c-sb">
						<view class="card"><image :src="getStaticFilePath('@/static/props_card/card.png')" class="card-image"></image></view>
						<view class="f-col info  j-c-sb mar-l-10 ">
							<text class="title">透视卡</text>
							<text class="num">x1</text>
						</view>
					</view>
					<view class="button"><text class="text">使用</text></view>
				</view>
			</view>

			<view class="use-button"><text class="text">使用</text></view>
		</view>
	</view>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import routerAlias from '@/routers/alias';
import { navigateTo, redirectTo, switchTab, navigateBack, reLaunch, showLoading, hideLoading, showToast, showModal, showActionSheet, getRandomArray } from '@/shared';

export default {
	data() {
		return {};
	},
	computed: {
		/**
		 * 小程序 自定义顶部样式
		 */
		mpHeaderStyle() {
			//小程序内
			let headerStyle = '';
			// #ifdef MP-WEIXIN
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			// console.log('menuButtonInfo', menuButtonInfo)
			let systemInfo = uni.getSystemInfoSync();
			// console.log('systemInfo', systemInfo)
			let top = menuButtonInfo.top - systemInfo.safeAreaInsets.top;
			let witdh = menuButtonInfo.width;
			headerStyle = `margin-top:${top}px;`;
			// #endif
			return headerStyle;
		}
	},
	methods: {
		goBack() {
			navigateBack();
		}
	}
};
</script>

<style scoped lang="scss">
.page-header {
	@include flex(row);
	align-items: center;
	justify-content: space-between;
	padding: 0 new-sizing(15);
	height: 32px;
	.back {
		@include flex(row);
		justify-content: center;
		align-items: center;
		.icon {
			width: new-sizing(28);
			height: new-sizing(28);
		}
	}
	.title {
		@include flex(row);
		justify-content: center;
		align-items: center;
		.text {
			font-size: new-sizing(18);
			line-height: new-sizing(25);
		}
	}
	.tmp {
		text {
			color: transparent;
		}
	}
}

.wrap {
	padding: 0 new-sizing(15);
	margin-top: new-sizing(15);
	.item {
		background: #ffffff;
		box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.07);
		border-radius: 6px;
		padding: new-sizing(8);
		margin-bottom: new-sizing(15);

		.card {
			@include square-image(50);
			background: rgba(70, 114, 170, 0.05);
			border-radius: new-sizing(6);
			@include flex(row);
			align-items: center;
			justify-content: center;
			&-image {
				@include square-image(43);
				background: linear-gradient(180deg, #c6e1ff 0%, #dcedff 100%);
				border-radius: new-sizing(6);
			}
		}
		.info {
			.title {
				font-size: new-sizing(13);
				line-height: new-sizing(18);
			}
			.num {
				font-size: new-sizing(11);
				line-height: new-sizing(15);
				opacity: 0.7;
			}
		}
		.button {
			background: linear-gradient(98.65deg, #6cebd4 29.71%, #3fdce6 86.05%);
			border: 1px solid rgba(255, 255, 255, 0.3);
			box-shadow: 0px new-sizing(3) new-sizing(4) rgba(26, 205, 184, 0.18);
			border-radius: new-sizing(33);
			height: new-sizing(27);
			padding: 0 new-sizing(5);
			min-width: new-sizing(60);

			@include flex(row);
			align-items: center;
			justify-content: center;
			.text {
				font-size: new-sizing(11);
				line-height: new-sizing(15);
				color: #ffffff;
			}
		}
	}

	.use-button {
		margin: new-sizing(20) auto;
		background: linear-gradient(98.65deg, #6cebd4 29.71%, #3fdce6 86.05%);
		border: 2px solid rgba(255, 255, 255, 0.3);
		box-shadow: 0px new-sizing(3) new-sizing(4) rgba(26, 205, 184, 0.18);
		border-radius: new-sizing(33);
		width: new-sizing(315);
		height: new-sizing(56);
		@include flex(row);
		align-items: center;
		justify-content: center;
		.text {
			font-size: new-sizing(14);
			line-height: new-sizing(20);
			color: #ffffff;
		}
	}
}
</style>
