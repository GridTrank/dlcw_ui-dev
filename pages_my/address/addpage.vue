<template>
	<view>
		<status-bar></status-bar>
		<view class="page-header">
			<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
			<view class="title"><text class="text">添加收货地址</text></view>
		</view>
		<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
		<view class="addform">
			<u--form
					labelPosition="left"
					:model="model1"
					:rules="rules"
					ref="form1"
					labelWidth="100"
			>
				<u-form-item
						label="收货人"
						prop="userInfo.receiveName"
						borderBottom
						ref="item1"
				>
					<u--input
							v-model="model1.userInfo.receiveName"
							border="none"
							placeholder="您的姓名"
					></u--input>
				</u-form-item>
				<u-form-item
						label="号码"
						prop="userInfo.receivePhone"
						borderBottom
						ref="item1"
				>
					<u--input
							v-model="model1.userInfo.receivePhone"
							border="none"
							placeholder="手机号码"
					></u--input>
				</u-form-item>
				<u-form-item
						label="选择地区"
						prop="userInfo.receiveRegion"
						borderBottom
						@click="location"
						ref="item1"
				>
					<u--input
							v-model="model1.userInfo.receiveRegion"
							disabled
							disabledColor="#ffffff"
							placeholder="请选择地区"
							border="none"
					></u--input>
					<u-icon
							slot="right"
							name="arrow-right"
					></u-icon>
				</u-form-item>
				<u-form-item
						label="详细地址"
						prop="userInfo.receiveDetail"
						borderBottom
						ref="item1"
				>
					<u--input
							v-model="model1.userInfo.receiveDetail"
							border="none"
							placeholder="街道,小区,楼栋,单元,门牌号信息"
					></u--input>
					<view
						slot="right"
					> </view>
				</u-form-item>
				<u-form-item
						label="邮政编码"
						prop="userInfo.receivePostalCode"
						borderBottom
						ref="item1"
				>
					<u--input
							v-model="model1.userInfo.receivePostalCode"
							border="none"
							:disabled="true"
							disabledColor="none"
							placeholder="邮政编码(不可输入)"
					></u--input>
				</u-form-item>
				<u-form-item
						label="设置默认地址"
						prop="userInfo.isDefault"
						borderBottom
						ref="item1"
				>
					<u-switch slot="right" v-model="model1.userInfo.isDefault" @change="" activeColor="#6556FD" inactiveColor="#C8C8C8" size="20"
						activeValue="1" inactiveValue="0" ></u-switch>
				</u-form-item>
			</u--form>
		</view>
		<view class="tips">请准确详细地填写收货地址，否则将导致提货失败哦</view>
		<!-- <button class="wxadd" @click="wxadd">一键获取微信收货地址</button> -->
		<button class="submit" @click="submit">保存</button>
	</view>
</template>

<script>
import addpage from '@/pages_my/address/addpage.js';
export default addpage;
</script>

<style lang="scss" scoped>
@import '@/pages_my/address/addpage.scss';
</style>