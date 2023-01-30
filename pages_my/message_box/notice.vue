<template>
	<view>
		<view class="header">
			<status-bar></status-bar>
			<view class="page-header">
				<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
				<view class="title"><text class="text">温馨提示</text></view>
			</view>
		</view>
		<view class="header-holder" :style="'height:' + (holderHeight + 36)*2 + 'rpx;'"></view>
		
		<view class="container">
			<image :src="notice.noticeImg" class="img"></image>
			
			<view class="title">{{ notice.title }}</view>
			
			<view class="content">
				<view class="content-title">尊敬的用户:</view>
				<view class="content-text">{{ notice.content }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { navigateBack, navigateTo,showToast,showLoading,hideLoading } from '@/shared';
import routerAlias from '@/routers/alias.js';
export default {
	data(){
		return {
			holderHeight:0,
			notice:{
				id: 1,
				noticeImg: "https://static.duolachaowan.com/c2baf45a-9185-49ac-903e-b4b0f9e4903f.jpeg",
				title: "一口仙气竟让女帝突破，被追着报恩！",
				content: "一口仙气就让女帝突破，被追着报恩！他怒吼：系统，我不是0级吗",
				noticeType: 0,
				noticeTime: "2022-10-27 11:05:52",
				lookStatus: 0
			}
		}
	},
	onLoad(){
		this.holderHeight = uni.getWindowInfo().statusBarHeight;
	},
	methods:{
		goBack() {
			navigateBack();
		},
	}
}
</script>

<style lang="scss" scoped>
	.header{
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: $uni-bg-color;
		.page-header {
			@include flex(row);height: new-sizing(36);
			align-items: center;
			padding: 0 new-sizing(15);
			position: relative;
			background-color: linear-gradient(119.4deg, #87D3FF 13.53%, #99A9FF 65.51%, #3F7CFF 111.38%);
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
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				.text {
					font-size: new-sizing(18);
					line-height: new-sizing(25);
				}
			}
		}
	}
	.header-holder{
		height: new-sizing(36);
	}
	.container{
		width: 100%;
		@include flex(column);
		align-items: center;
		.img{
			width: new-sizing(345);
			height: new-sizing(125);
			border-radius: new-sizing(6);
			margin: new-sizing(20) 0;
		}
		.title{
			font-weight: 700;
			font-size: new-sizing(18);
			text-align: center;
			margin: new-sizing(20) 0;
			&::after {
				content: '';
				height: 5px;
				background: #6556FD;
				border-radius: 0px 2px 0px 0px;
				display: block;
				margin-top: -10px;
			}
		}
		.content{
			width: 100%;
			@include flex(column);
			padding: 0 new-sizing(20);
			.content-title{
				font-weight: 700;
				font-size: new-sizing(14);
			}
			.content-text{
				font-weight: 600;
				font-size: new-sizing(12);
				text-indent: 2em;
			}
		}
	}
</style>