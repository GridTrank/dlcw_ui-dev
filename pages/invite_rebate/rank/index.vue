<template>
	<view>
		<view class="header">
			<status-bar></status-bar>
			<view class="page-header">
				<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
				<view class="title"><text class="text">排行榜</text></view>
			</view>
		</view>
		<view class="header-holder" :style="'height:' + (holderHeight + 36)*2 + 'rpx;'"></view>
		
		<view class="content">
			<image :src="getStaticFilePath('@/static/invite_rebate/rankhelp.png')" mode="" class="help"></image>
			<view class="listitem" v-for="(item,index) in topList" :key="index">
				<view class="bg1" v-if="item.id == 1"></view>
				<view class="bg2" v-if="item.id == 2"></view>
				<view class="bg3" v-if="item.id == 3"></view>
				<view class="bg4-10" v-if="item.id > 3"></view>
				<view class="top--name">
					<image :src="getStaticFilePath('@/static/invite_rebate/top1.png')" class="top" v-if="item.id == 1"></image>
					<image :src="getStaticFilePath('@/static/invite_rebate/top2.png')" class="top" v-if="item.id == 2"></image>
					<image :src="getStaticFilePath('@/static/invite_rebate/top3.png')" class="top" v-if="item.id == 3"></image>
					<view class="top4-10" v-if="item.id > 3">{{item.id}}</view>
					<view class="nickname">{{item.nickName}}</view>
				</view>
				<view class="dlb">{{item.dlb}}K</view>
			</view>
		</view>
		
		<view class="footer-holder"></view>
		<view class="footer">
			<view class="img--text">
				<image :src="yourself.imgUrl" class="yourimg"></image>
				<view class="text">您的返利</view>
			</view>
			<view class="dlb">{{yourself.dlb}}K</view>
		</view>
	</view>
</template>

<script>
import { navigateBack, navigateTo,showToast,showLoading,hideLoading,getStaticFilePath } from '@/shared';
export default {
	data(){
		return {
			holderHeight:0,
			topList:[
				{id:1,nickName:'aaaa1',dlb:120},
				{id:2,nickName:'aaaa2',dlb:110},
				{id:3,nickName:'aaaa3',dlb:100},
				{id:4,nickName:'aaaa4',dlb:90},
				{id:5,nickName:'aaaa5',dlb:80},
				{id:6,nickName:'aaaa6',dlb:70},
				{id:7,nickName:'aaaa7',dlb:60},
				{id:8,nickName:'aaaa8',dlb:50},
				{id:9,nickName:'aaaa9',dlb:40},
				{id:10,nickName:'aaaa10',dlb:30},
			],
			yourself:{
				id:100,
				nickName:'bbb',
				imgUrl: '',
				dlb:11.1
			}
		}
	},
	onLoad(){
		this.holderHeight = uni.getWindowInfo().statusBarHeight
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
.content{
	width: 100%;
	@include flex(column)
	align-items: center;
	.help{
		width: new-sizing(345);height: new-sizing(76);
		margin: new-sizing(10);
	}
	.listitem{
		width: new-sizing(345);height: new-sizing(49);
		border-radius: 2px;
		@include flex(row);
		align-items: center;
		justify-content: space-between;
		padding: new-sizing(0) new-sizing(30);
		margin-bottom: new-sizing(10);
		position: relative;
		.top--name{
			@include flex(row);
			.top{
				width: new-sizing(20);height: new-sizing(20);
			}
			.top4-10{
				width: new-sizing(20);
				text-align: center;
				font-size: new-sizing(18);
				color: $uni-text-color;
				opacity: 0.5;
			}
			.nickname{
				font-size: new-sizing(14);
				color: $uni-text-color;
				margin-left: new-sizing(30);
			}
		}
		.dlb{
			width: new-sizing(40);
			text-align: right;
			font-size: new-sizing(12);
			color: rgba(51, 60, 79, 0.7);
		}
		.bg1,.bg2,.bg3,.bg4-10{
			width: 100%;height: 100%;
			position: absolute;z-index: -1;
			top: 0;left: 0;
		}
		.bg1{
			background: linear-gradient(92.88deg, #FC7976 6.42%, #FCA9A7 52.4%);
			opacity: 0.1;
		}
		.bg2,.bg3{
			background: linear-gradient(92.88deg, #FBDF81 6.42%, #FFEAA2 52.4%);
			opacity: 0.15;
		}
		.bg4-10{
			background: #F0E9FF;
			opacity: 0.5;
		}
	}
	
	
}
.footer-holder{
	width: 100%;height: new-sizing(70);
}
.footer{
	width:100%;height: new-sizing(70);
	position: absolute;
	bottom: 0;left: 0;
	background: linear-gradient(97.11deg, rgba(255, 251, 233, 0.5) 2.4%, rgba(239, 98, 54, 0.25) 100%);
	@include flex(row);
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding: new-sizing(0) new-sizing(45) new-sizing(10) new-sizing(45);
	.img--text{
		@include flex(row);
		align-items: center;
		.yourimg{
			width: new-sizing(40);height: new-sizing(40);
			border-radius: 50%;
		}
		.text{
			margin-left: new-sizing(10);
			font-weight: 700;
			font-size: new-sizing(14);
			color: $uni-text-color;
		}	
	}
	.dlb{
		font-weight: 500;
		font-size: new-sizing(12);
		color: rgba(51, 60, 79, 0.7);
	}
}
</style>