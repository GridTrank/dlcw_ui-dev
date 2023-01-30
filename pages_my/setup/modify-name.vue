<template>
	<view>
		<status-bar></status-bar>
		<view class="page-header">
			<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
			<view class="title"><text class="text">昵称修改</text></view>
		</view>
		<view class="bg"></view>
		<view class="content">
			<view class="name">
				<u--input
				    placeholder="请输入内容"
				    border="bottom"
				    v-model="name"
					shape='circle'
					font-size="16px"
					max-length="-1"
					:clearable="true"
				    @blur="change"
				></u--input>
			</view>
			<view class="err" v-show="err">昵称不能小于3个字符!</view>
			<button class="submit" @click="submit">确认修改</button>
		</view>
	</view>
</template>

<script>
import { updateUserinfoService,userinfoService } from '@/service/index.js';
import { isLastPage,navigateBack,showToast,showLoading,hideLoading } from '@/shared';
import { setUserStorage } from '@/storage';
export default{
	data(){
		return {
			name: '',
			err: false
		}
	},
	methods:{
		goBack() {
			navigateBack();
		},
		change(){
			this.err = this.name.length > 3 ? false : true
		},
		submit(){
			if(this.name.length > 3){
				showLoading('加载中');
				updateUserinfoService({nickName:this.name}).then(res => {
					hideLoading();
					userinfoService().then(res => {
						// this.$store.commit('user/SET_USER_INFO', res.data);
						// setUserStorage(res.data)
						showToast('修改成功~')
						setTimeout(() => {
							navigateBack()
						},1000)
					})
				})
			}else{
				showToast('用户名不符合规范哦~');
			}
		}
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
	.bg{
		position: absolute;
		z-index: -1;
		width: 100%;height: 100%;
		background-color: $uni-bg-color-grey;
	}
	.content{
		width: 90%;height: 100%;
		margin: auto;
		padding-top: new-sizing(10);
		.name{
			width: 100%;
			background-color: $uni-bg-color;
			border-radius: new-sizing(5);
		}
	}
	.err{
		color: #EF6130;
	}
	.submit{
		width: new-sizing(200);
		height: new-sizing(40);
		background: #EF6130;
		font-size: new-sizing(14);
		line-height: new-sizing(40);
		margin-top: 10px;
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 400;
		color: $uni-text-color-inverse;
	}
</style>