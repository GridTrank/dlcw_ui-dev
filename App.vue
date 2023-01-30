<script>
import { STATIC_URL } from '@/shared';
export default {
	onLaunch: function() {
		console.log('App Launch');
		//如果是app和小程序
		// #ifdef APP-PLUS || MP-WEIXIN
		// this.loadFontFaceFromLocal();
		// #endif

		//如果是app
		// #ifdef APP-PLUS
		plus.screen.lockOrientation('portrait-primary');
		// #endif
	},
	onShow: function() {
		console.log('App Show');

		//如果是app和小程序
		// #ifdef APP-PLUS || MP-WEIXIN
		// this.loadFontFaceFromLocal();
		// #endif
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
		/**
		 * 加载字体
		 */
		loadFontFaceFromLocal() {
			setTimeout(() => {
				let source = `${STATIC_URL}/static/font/PingFang_SC_Bold.ttf`;
				console.log('loadFontFaceFromLocal-source', source);
				uni.loadFontFace({
					global: true,
					family: 'PingFang SC-Bold',
					// 本地字体路径需转换为平台绝对路径
					// source: `url(${plus.io.convertLocalFileSystemURL('_www/static/font/PingFang_SC_Bold.ttf')})`,
					source: `url("${source}")`,
					success() {
						console.log('PingFang SC-Bold-success');
					},
					fail(e) {
						console.log('PingFang SC-Bold-fail', e);
					}
				});
			}, 300);
		}
	}
};
</script>

<style lang="scss">
	*::-webkit-scrollbar{
	width: 0;
	height: 0;
	color: transparent;
	}
</style>
