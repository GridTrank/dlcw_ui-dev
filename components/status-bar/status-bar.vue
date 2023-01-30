<template>
	<view class="status-bar"><view class="status-bar-height" :style="height > 0 || important != '' ? 'height:' + height + `px${important}` : ''"></view></view>
</template>

<script>
export default {
	name: 'status-bar',
	data() {
		return {
			height: 0,
			important: ''
		};
	},
	created() {
		let systemInfo = uni.getSystemInfoSync();
		this.height = systemInfo.safeAreaInsets.top;
		//pc版小程序
		if (systemInfo.platform == 'windows') {
			this.height = 0;
			this.important = '!important';
		}
	},
	computed: {},
	methods: {}
};
</script>

<style scoped lang="scss">
.status-bar-height {
	height: var(--status-bar-height);
}
</style>
