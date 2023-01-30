<template>
	<view class="mp-menu-button" :style="height > 0 ? 'height:' + height + 'px' : ''"></view>
</template>

<script>
export default {
	name: 'status-bar',
	data() {
		return {
			height: 0
		};
	},
	created() {
		// #ifdef  MP-WEIXIN
		let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		console.log('menuButtonInfo', menuButtonInfo);
		this.height = menuButtonInfo.height + 5;
		// #endif
	},
	computed: {},
	methods: {}
};
</script>
