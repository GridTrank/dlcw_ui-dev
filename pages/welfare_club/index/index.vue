<template>
	<view>
		<status-bar></status-bar>
		<view class="wrap">
			<view class="back" :style="mpHeaderStyle" @click="goBack"><image src="https://static.duolachaowan.com/static/common/back.png" class="icon"></image></view>
			<view class="image-box"><image :style="{ backgroundImage: 'url(' + image + ')' }" class="image"></image></view>
		</view>
	</view>
</template>

<script>
import { navigateTo, redirectTo, switchTab, navigateBack, reLaunch, showLoading, hideLoading, showToast, showModal, showActionSheet } from '@/shared';
import { clubService } from '@/service/index.js';
export default {
	data() {
		return {
			image: 'https://static.duolachaowan.com/static/welfare_club/bg.png'
		};
	},
	computed: {
		/**
		 * 小程序 自定义顶部样式
		 */
		mpHeaderStyle() {
			//小程序内
			let headerStyle = ''
			// #ifdef MP-WEIXIN
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// console.log('menuButtonInfo', menuButtonInfo)
			let systemInfo = uni.getSystemInfoSync()
			// console.log('systemInfo', systemInfo)
			let top = (menuButtonInfo.top - systemInfo.safeAreaInsets.top)
			let witdh = menuButtonInfo.width
			headerStyle = `margin-top:${top}px`;
			// #endif
			return headerStyle
		},
	},
	
	onLoad() {
		this.pageOnLoad();
	},
	methods: {
		pageOnLoad() {
			this.clubImg();
		},
		clubImg() {
			clubService().then(res => {
				this.image = res.data[0].picPath;
			});
		},
		goBack() {
			navigateBack();
		}
	}
};
</script>

<style scoped lang="scss">
.wrap {
	width: 100vw;
	height: 100vh;
	position: relative;
	.back {
		@include flex(row);
		align-items: center;
		padding: 0 new-sizing(15);
		.icon {
			width: new-sizing(28);
			height: new-sizing(28);
		}
	}
	.image-box {
		position: absolute;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		z-index: -1;
		.image {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-size: cover;
			object-fit: cover;
			background-repeat: no-repeat;
			background-position: 50% 50%;
		}
	}
}
</style>
