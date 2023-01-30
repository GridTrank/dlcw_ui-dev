<template>
	<view class="tabbar">
		<view class="tabbar__fixed">
			<!-- <view class="lin-header-bg"><u-image mode="widthFix" width="100%" height="100%" src="/static/tabbar/navbg.png"></u-image></view> -->
			<view class="lin-header-nav">
				<view v-if="item.page != -1" @click="gotoLik(item.page, item.link)" class="lin-item-container" v-for="(item, index) in linNavList" :key="index">
					<view class="lin-item">
						<view class="lin-item-image">
							<!-- width:32px;height:32px; -->
							<image mode="aspectFit" style="width:60rpx;height:60rpx;" :src="item.page == currentPage ? item.iconSelect : item.icon"></image>
						</view>
						<view :class="item.page == currentPage ? 'lin-item-title-c' : 'lin-item-title'">{{ item.title }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { getTokenStorage } from '@/storage';
import routerAlias from '@/routers/alias';
import { navigateTo, redirectTo, switchTab, navigateBack, reLaunch, showLoading, hideLoading, showToast, showModal, showActionSheet } from '@/shared';
export default {
	name: 'tab-bar',
	props: {
		currentPage: {
			type: Number,
			default: 0
		},
		isAnthor: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			backLoading: false,
			linNavList: [
				{
					icon: '/static/tabbar/home.png',
					iconSelect: '/static/tabbar/home-ac.png',
					title: '首页',
					link: routerAlias.HOME_PAGE,
					page: 0
				},
				{
					icon: '/static/tabbar/appreciation.png',
					iconSelect: '/static/tabbar/appreciation-ac.png',
					title: '图鉴',
					link: routerAlias.APPRECIATION_PAGE,
					page: 1
				},
				{
					icon: '/static/tabbar/market.png',
					iconSelect: '/static/tabbar/market-ac.png',
					link: routerAlias.MARKET_PAGE,
					title: '活动',
					page: 2
				},
				{
					icon: '/static/tabbar/my.png',
					iconSelect: '/static/tabbar/my-ac.png',
					link: routerAlias.MY_PAGE,
					title: '我的',
					page: 3
				}
			]
		};
	},
	computed: {},
	methods: {
		back() {
			if (!this.backLoading) {
				this.backLoading = true;
				navigateBack();
			}
		},
		gotoLik(page, link) {
			console.log('link', link);
			if (this.currentPage == page) return;
			const token = getTokenStorage();
			// if (!token) {
			// 	redirectTo(routerAlias.LOGIN);
			// 	return;
			// }
			// if (page != -1) switchTab(link);
			// else navigateTo(link);
			// redirectTo(link);
			navigateTo(link);

			//主播不用记录
			// if (page != -1) this.$store.commit('user/SET_PAGE', page);
			this.$store.commit('user/SET_PAGE', page);
		},
		goHome() {
			if (!this.backLoading) {
				this.backLoading = true;
				switchTab(this.routerAlias.HOME_PAGE);
			}
		},
		getSlotRightWidth() {
			return new Promise(resolve => {
				getElementInfo('LD-header__back').then(size => {
					const { screenWidth } = uni.getSystemInfoSync();
					resolve(screenWidth - size.width - 10);
				});
			});
		}
	}
};
</script>
<style scoped lang="scss">
.tabbar {
	/*foot*/
	min-height: 150rpx;
	/*tabbar*/
	padding: 0;
	height: calc(150rpx + env(safe-area-inset-bottom) / 2);
	padding-bottom: calc(env(safe-area-inset-bottom) / 2);

	/*other*/
	
	position: fixed;
	width: 100%;
	min-height: 150rpx;
	bottom: 0;
	z-index: 1024;
}

.tabbar__fixed {
	position: fixed;
	width: 100%;
	min-height: 150rpx;
	bottom: 0;
	z-index: 1025;
	height: calc(100upx + env(safe-area-inset-bottom) / 2);
	padding-bottom: calc(env(safe-area-inset-bottom) / 2);
	background: #ffffff;
	box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.05);
	.lin-header-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0.8;
	}
	.lin-center-middle {
		width: 100%;
		top: 0;
		position: absolute;
		display: flex;
		justify-content: center;
	}
	.lin-header-nav {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;

		.lin-item-container {
			width: 25%;
			height: 100%;

			.lin-item {
				.lin-item-image {
					display: flex;
					justify-content: center;
					margin-bottom: 7px;
					margin-top: 12px;
				}

				.lin-item-title {
					display: flex;
					justify-content: center;
					font-size: sizing(22);
					line-height: sizing(26);
					letter-spacing: 0.02em;
					color: #333c4f;
				}

				.lin-item-title-c {
					display: flex;
					justify-content: center;
					font-size: sizing(22);
					line-height: sizing(26);
					color: #333c4f;
					letter-spacing: 0.02em;
				}
			}
		}
		.lin-item-container-zb {
			width: 20%;
			height: 100%;

			.lin-item {
				width: 100%;
				height: 100%;
				.lin-item-image {
					display: flex;
					justify-content: center;
					margin-bottom: 7px;
					margin-top: 12px;
				}

				.lin-item-title {
					display: flex;
					justify-content: center;
					font-size: 11px;
					line-height: 13px;
					letter-spacing: 0.02em;
					color: #333c4f;
				}

				.lin-item-title-c {
					display: flex;
					justify-content: center;
					font-size: 11px;
					line-height: 13px;
					letter-spacing: 0.02em;
					color: #333c4f;
				}
			}
		}
	}
}

.lin-header {
	width: 100%;
	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 9999;
	min-height: 120upx;
	height: calc(130upx + env(safe-area-inset-bottom) / 2);
	padding-bottom: calc(env(safe-area-inset-bottom) / 2);
}
</style>
