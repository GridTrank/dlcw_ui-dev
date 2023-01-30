<template>
	<view class="invite_record">
		<status-bar></status-bar>
		<view class="page-header" :style="mpHeaderStyle">
			<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
			<view class="title"><text class="text">邀请记录</text></view>
			<view class="tmp"><text>1</text></view>
		</view>

		<view class="wrap wrap1">
			<view class="m1">
				<view class="bg"></view>
				<view class="col">
					<text class="text">15000</text>
					<text class="small">累计盲盒</text>
				</view>
				<view class="line"></view>
				<view class="col">
					<text class="text">15000</text>
					<text class="small">待开盲盒</text>
				</view>
			</view>
		</view>

		<view class="wrap">
			<view class="list-wrap">
				<view class="list-wrap-header">
					<view class="row"><text class="text">帐号</text></view>
					<view class="row">
						<text class="text">注册奖励</text>
						<u-icon name="question-circle" color="#808080" size="14"></u-icon>
					</view>
					<view class="row">
						<text class="text">金额</text>
						<u-icon name="question-circle" color="#808080" size="14"></u-icon>
					</view>
				</view>
			</view>

			<u-list @scrolltolower="scrolltolower" :height="listHeight">
				<u-list-item v-for="(item, index) in indexList" :key="index">
					<view class="box">
						<image :src="item.avatar" mode="" class="avatar"></image>
						<text class="box-text">{{ item.name }}--{{ index }}</text>
					</view>
					<text class="register text" :class="{ wait: item.register == 0, 'wait-get': item.register == 1, is: item.register == 2 }">
						{{ item.register == 0 ? '待获取' : item.register == 1 ? '待领取' : item.register == 2 ? '已领取' : '' }}
					</text>
					<text class="activation text" :class="{ 'wait-get': item.activation == 0, is: item.activation == 1 }">{{ item.activation == 0 ? '未激活' : '已激活' }}</text>
				</u-list-item>
			</u-list>
		</view>
	</view>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import routerAlias from '@/routers/alias';
import {
	navigateTo,
	redirectTo,
	switchTab,
	navigateBack,
	reLaunch,
	showLoading,
	hideLoading,
	showToast,
	showModal,
	showActionSheet,
	getRandomArray,
	getStaticFilePath
} from '@/shared';
export default {
	data() {
		return {
			systemInfo: {},
			listHeight: 500,
			indexList: [
				{
					avatar: getStaticFilePath('@/static/common/avatar.png'),
					name: 'July',
					register: 0,
					activation: 0
				},
				{
					avatar: getStaticFilePath('@/static/common/avatar.png'),
					name: 'July',
					register: 1,
					activation: 1
				},
				{
					avatar: getStaticFilePath('@/static/common/avatar.png'),
					name: 'July',
					register: 2,
					activation: 1
				}
			]
		};
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
			headerStyle = `margin-top:${top}px`;
			// #endif
			return headerStyle;
		}
	},
	onLoad() {
		this.loadmore();
	},
	onReady() {
		this.systemInfo = uni.getSystemInfoSync();
		this.resize();
	},
	methods: {
		goBack() {
			navigateBack();
		},
		scrolltolower() {
			this.loadmore();
		},
		loadmore() {
			for (let i = 0; i < 30; i++) {
				let arr = getRandomArray(this.indexList, 1);
				this.indexList = this.indexList.concat(arr);
			}
			// console.log('this.indexList', this.indexList)
		},
		async resize() {
			let allHeight = this.systemInfo.safeArea.height - this.systemInfo.safeAreaInsets.top;
			let header = await this.queryRect('.page-header');
			let con = await this.queryRect('.wrap1');
			let headerHeight = header.height;
			let conHeight = con.height;
			let height = allHeight - headerHeight - conHeight - 60;
			this.listHeight = height;
		},
		queryRect(el) {
			return new Promise((resolve, reject) => {
				let view = uni
					.createSelectorQuery()
					.in(this)
					.select(el);
				view.fields(
					{
						size: true,
						scrollOffset: true,
						rect: true
					},
					data => {
						// console.log(el + "得到节点信息" + JSON.stringify(data));
						resolve(data);
					}
				).exec();
			});
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
		.text {
			font-size: new-sizing(18);
			line-height: new-sizing(25);
		}
	}
	.tmp {
		text{
			color: transparent;
		}
	}
}

.wrap {
	margin-top: new-sizing(15);
	padding: 0 new-sizing(15);
	.m1 {
		width: 100%;
		height: new-sizing(86);
		position: relative;
		border-radius: new-sizing(6);
		@include flex(row);
		align-items: center;
		justify-content: space-around;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			width: 100%;
			background: linear-gradient(108.9deg, #4281f1 0.9%, #3244c7 53.55%, #9e1acd 100%);
			opacity: 0.6;
			border-radius: new-sizing(6);
			z-index: -1;
		}
		.small {
			font-size: new-sizing(10);
			line-height: new-sizing(14);
			color: #ffffff;
			opacity: 0.7;
		}
		.text {
			font-size: new-sizing(17);
			line-height: new-sizing(24);
			color: #ffffff;
		}

		.row {
			@include flex(row);
			align-items: baseline;
		}
		.col {
			@include flex(column);
		}
	}
}

.list-wrap {
	.list-wrap-header {
		@include flex(row);
		justify-content: center;
		align-items: center;
		.row {
			@include flex(row);
			flex: 1;
			justify-content: center;
			align-items: center;
		}
	}
	.left {
		justify-content: flex-start;
	}
	.middle {
		justify-content: center;
	}
	.right {
		justify-content: flex-end;
	}
}

::v-deep .u-list-item {
	@include flex(row);
	justify-content: center;
	align-items: center;
	margin: new-sizing(15) 0;
	.box {
		flex: 1;
		@include flex(row);
		justify-content: center;
		align-items: center;
		@include ellipsis;
		&-text {
			font-size: new-sizing(12);
			line-height: new-sizing(17);
			margin-left: new-sizing(5);
		}
	}
	.avatar {
		width: new-sizing(22);
		height: new-sizing(22);
		border-radius: 50%;
	}
	.text {
		font-size: new-sizing(12);
		line-height: new-sizing(17);
		@include flex(row);
		justify-content: center;
		align-items: center;
		@include ellipsis;
		flex: 1;
		&.wait {
			opacity: 0.7;
		}
		&.is {
			color: #1acdb8;
		}
		&.wait-get {
			color: #ff3f3f;
		}
	}
	.left {
		justify-content: flex-start;
	}
	.middle {
		justify-content: center;
	}
	.right {
		justify-content: flex-end;
	}
}
</style>
