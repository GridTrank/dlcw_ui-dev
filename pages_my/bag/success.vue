<template>
	<view class="">
		<status-bar></status-bar>
		<view class="page-header">
			<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
			<view class="title"><text class="text">寄售成功</text></view>
		</view>
		<view class="content">
			<image src="https://static.duolachaowan.com/static/my/sellsuccess.png" mode="" class="img"></image>
			<text class="title">寄售成功</text>
		</view>
	</view>
</template>

<script>
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
		showActionSheet
	} from '@/shared';
	export default{
		data(){
			return {
				
			}
		},
		onLoad(){
		},
		methods:{
			goBack() {
				navigateBack();
			},
		}
	}
</script>

<style lang="scss" scoped>
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
	.content{
		width: 100%;height: 500px;
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 400;
		@include flex(column)
		align-items: center;
		margin: auto;
		justify-content: center;
		.img{
			width: new-sizing(182);height: new-sizing(182);
			margin-bottom: new-sizing(10);
		}
		.title{
			font-weight: 600;
			font-size: new-sizing(18);
			color: $uni-text-color;
			margin-bottom: new-sizing(10);
		}
		.tips{
			width: 40%;
			text-align: center;
			opacity: 0.7;
			font-size: new-sizing(13);
		}
	}
</style>