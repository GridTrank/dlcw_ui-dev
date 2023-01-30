<template>
	<view class="content">
		<status-bar></status-bar>
		<view class="page-header">
			<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
			<view class="title"><text class="text">个人设置</text></view>
		</view>
		<view class="tt">个人设置</view>
		<u-cell-group :border="false">
			<u-cell>
				<view slot="title" class="t-title">头像</view>
				<template #right-icon>
					<image :src="loginUser.headImg" mode="" class="userimg" @click="openImg"></image>
				</template>
			</u-cell>
			<u-cell size="large" :arrow="false" :clickable="true" @click="goPage('MY_SETUP_MODIFYNAME_PAGE')">
				<view slot="title" class="t-title">昵称</view>
				<view slot="value" class="t-value">{{fuzzyPhone(loginUser.nickName)}}</view>
				<u-icon name="arrow-right" slot="right-icon" size="12"></u-icon>
			</u-cell>
			<u-cell size="large" :arrow="false" :clickable="true" @click="openSex">
				<view slot="title" class="t-title">性别</view>
				<view slot="value" class="t-value">{{loginUser.sex == 0 ? '男' : '女'}}</view>
				<u-icon name="arrow-right" slot="right-icon" size="12"></u-icon>
			</u-cell>
			<u-cell size="large" :arrow="false" :clickable="false">
				<view slot="title" class="t-title">绑定手机号</view>
				<view slot="value" class="t-value">{{ fuzzyPhone( loginUser.phoneNo )}}</view>
			</u-cell>
			<u-cell size="large" :arrow="false" :clickable="false">
				<view slot="title" class="t-title">邀请码</view>
				<view slot="value" class="t-value">{{ loginUser.inviteCode }}</view>
				<image :src="getStaticFilePath('@/static/my/copy-black.png')" mode="" class="t-copy" slot="right-icon" @click.stop="copy(loginUser.inviteCode)"></image>
			</u-cell>
			<u-cell size="large" :arrow="false" :clickable="false">
				<view slot="title" class="t-title">推广链接</view>
				<view slot="value" class="t-value">{{ loginUser.inviteUrl }}</view>
				<image :src="getStaticFilePath('@/static/my/copy-black.png')" mode="" class="t-copy" slot="right-icon" @click.stop="copy(loginUser.inviteUrl)"></image>
			</u-cell>
			<u-cell size="large" :arrow="false" :clickable="true" @click="err()">
				<view slot="title" class="t-title">安全密码</view>
				<view slot="value" class="t-value">去设置</view>
				<u-icon name="arrow-right" slot="right-icon" size="12"></u-icon>
			</u-cell>
		</u-cell-group>
		<view class="tt tt2">其他设置</view>
		<u-cell-group :border="false">
			<u-cell size="large" :arrow="false" :clickable="true" :center="true" @click="err()">
				<view slot="title" class="t-title">推送设置</view>
				<view slot="label" class="t-label">点击去设置隐藏通知</view>
				<u-icon name="arrow-right" slot="right-icon" size="12"></u-icon>
			</u-cell>
			<u-cell size="large" :arrow="false" :clickable="true" @click="goPage('MY_SETUP_PRIVACY_PAGE')">
				<view slot="title" class="t-title">隐私政策</view>
				<u-icon name="arrow-right" slot="right-icon" size="12"></u-icon>
			</u-cell>
			<u-cell size="large" :arrow="false" :clickable="true" @click="goPage('MY_SETUP_AGREEMENT_PAGE')">
				<view slot="title" class="t-title">服务协议</view>
				<u-icon name="arrow-right" slot="right-icon" size="12"></u-icon>
			</u-cell>
		</u-cell-group>
		<button type="primary" class="logout" @click="logout">退出登录</button>
		
		<u-popup :show="showImgM" @close="closeImg" mode="center">
		    <view class="imgchoose">
				<text>点击上传个人头像</text>
				<image :src="imageList" mode="" class="imgchoose-img" @click="test"></image>
				<button @click="imgM" class="imgchoose-button">应用</button>
		    </view>
		</u-popup>
		
		<u-popup :show="showPhone" @close="closePhone" mode="bottom">
		    <view class="getphoneshow">
				<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="getphone">点击获取手机号码信息</button>
			</view>
		</u-popup>
		
		<u-action-sheet
		    :show="showSexM"
		    :actions="actions"
		    title="请选择性别"
		    @close="showSexM = false"
		    @select="sexSelect"
		>
		</u-action-sheet>
	</view>
</template>

<script>
import index from './index.js';
export default index;
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>