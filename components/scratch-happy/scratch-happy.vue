<template>
	<view class="scratch-wrap">
		<text
			class="title"
			:style="{
				color: titleColor,
				size: titleSize * 2 + 'rpx'
			}"
		>
			{{ title }}
		</text>
		<view
			:id="canvasId"
			class="scratch-con wrap-bg"
			style="position: relative;"
			:style="{
				height: height * 2 + 'rpx',
				backgroundImage: `url(${scratchImageBg})`
			}"
		>
			<view
				:style="{
					width: '100%',
					height: '100%',
					position: 'relative'
				}"
			>
				<slot></slot>

				<!-- :style="{
						position: 'absolute',
						width: width * 2 - 40 + 'rpx',
						height: height * 2 - 20 + 'rpx',
						top: 10 + 'rpx',
						left: 10 + 'rpx'
					}" -->
				<canvas
					:style="{
						width: width * 2 - 64 + 'rpx',
						height: height * 2 - 24 + 'rpx'
					}"
					:disable-scroll="true"
					@touchstart="touchstart"
					@touchend="touchend"
					@touchmove="touchmove"
					:canvas-id="canvasId"
				></canvas>
			</view>
		</view>
	</view>
</template>

<script>
let ctx = null;
export default {
	name: 'scratch-happy',
	props: {
		canvasId: {
			type: String,
			default: 'scratch'
		},
		height: {
			type: Number,
			default: 200
		},
		width: {
			type: Number,
			default: 300
		},
		percentage: {
			//刮开百分之多少的时候开奖
			type: Number,
			default: 45
		},
		touchSize: {
			//触摸画笔大小
			type: Number,
			default: 20
		},
		fillColor: {
			//未刮开图层时的填充色
			type: String,
			default: '#ddd'
		},
		watermark: {
			//水印文字
			type: String,
			default: '刮一刮'
		},
		watermarkColor: {
			//水印文字颜色
			type: String,
			default: '#c5c5c5'
		},
		watermarkSize: {
			//水印文字大小
			type: Number,
			default: 14
		},
		title: {
			//提示文字
			type: String,
			default: '刮一刮开奖'
		},
		titleColor: {
			//提示文字颜色
			type: String,
			default: '#fff'
		},
		titleSize: {
			//提示文字大小
			type: Number,
			default: 12
		},
		disabled: {
			//是否禁止刮卡
			type: Boolean,
			default: false
		},
		init_show: {
			//是否初始化
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			startX: null,
			startY: null,
			computing: false,
			complete: false,
			reset: false,
			ready: false,
			storePoints: [],
			scratchImageBg: require('@/components/scratch-happy/scratch-image-bg.png')
		};
	},
	watch: {
		init_show(e) {
			if (e) {
				console.log('watch-init_show',e)
				this.initBlow();
			}
		}
	},
	mounted() {
		ctx = uni.createCanvasContext(this.canvasId, this);
		this.initBlow();
	},
	methods: {
		initBlow: function() {
			console.log('ctx', ctx);
			this.computing = false;
			this.complete = false;
			this.reset = false;
			this.ready = false;

			ctx.clearRect(0, 0, this.width, this.height);
			//绘制画布
			ctx.setFillStyle(this.fillColor);

			let width = this.width * 2 - 24;
			let height = this.height * 2 - 24;
			ctx.fillRect(0, 0, width, height);

			// console.log(this.width)
			// console.log(this.height)
			// ctx.fillRect(0, 0, this.width, this.height);

			this.ready = true;
			//绘制文字水印
			this.fillWatermark();
			//绘制标题
			// this.fillTitle();
			//绘制圆角
			ctx.draw();

			setTimeout(res => {
				let data = {};
				this.$emit('scratchInit', data);
			}, 50);
		},

		/**
		 * 绘制文字水印
		 */
		fillWatermark: function(e) {
			if (!this.watermark) {
				return;
			}
			var width = this.watermark.length * this.watermarkSize;
			ctx.save();
			ctx.rotate((-10 * Math.PI) / 180);
			let x = 0;
			let y = 0;
			let i = 0;
			while ((x <= this.width * 5 || y <= this.height * 5) && i < 300) {
				ctx.setFillStyle(this.watermarkColor);
				ctx.setFontSize(this.watermarkSize);
				ctx.fillText(this.watermark, x, y);
				x += width + width * 1.6;
				if (x > this.width && y <= this.height) {
					x = -Math.random() * 100;
					y += this.watermarkSize * 3;
				}
				i++;
			}
			ctx.restore();
		},

		/**
		 * 绘制标题
		 */
		fillTitle: function(e) {
			if (!this.title) {
				return;
			}
			ctx.setTextAlign('center');
			ctx.setTextBaseline('middle');
			ctx.setFillStyle(this.titleColor);
			ctx.setFontSize(this.titleSize);
			ctx.fillText(this.title, this.width / 2 / 2, this.height / 2 / 2); //因单位是rpx故再除以2
		},

		touchstart: function(e) {
			if (this.disabled) {
				return;
			}
			this.startX = e.touches[0].x;
			this.startY = e.touches[0].y;
		},

		touchend: function(e) {
			this.getFilledPercentage();
		},

		touchmove: function(e) {
			if (this.complete || this.disabled) {
				return;
			}
			// ctx.globalCompositeOperation = 'destination-out';
			ctx.moveTo(this.startX, this.startY);
			// ctx.beginPath();
			// ctx.arc(this.startX, this.startY, 20, 0, Math.PI * 20);
			// ctx.fill();
			ctx.clearRect(this.startX, this.startY, this.touchSize, this.touchSize);
			ctx.draw(true);
			//记录移动点位
			this.startX = e.touches[0].x;
			this.startY = e.touches[0].y;
		},

		getFilledPercentage: function(e) {
			if (this.computing) {
				return;
			}
			this.computing = true;
			uni.canvasGetImageData(
				{
					canvasId: this.canvasId,
					x: 0,
					y: 0,
					width: this.width,
					height: this.height,
					success: res => {
						let pixels = res.data;
						let transPixels = [];
						for (let i = 0; i < pixels.length; i += 4) {
							if (pixels[i + 3] < 128) {
								transPixels.push(pixels[i + 3]);
							}
						}
						var percent = ((transPixels.length / (pixels.length / 2)) * 100).toFixed(2);
						if (percent >= this.percentage) {
							this.success();
						}
						this.computing = false;
						console.log('getFilledPercentage-success-percent', percent);
					},
					fail: function(e) {
						console.log('getFilledPercentage-fail', e);
					}
				},
				this
			);
		},

		success: function(e) {
			this.complete = true;
			if (this.reset) {
				return;
			}
			this.reset = true;
			ctx.moveTo(0, 0);
			ctx.clearRect(0, 0, this.width, this.height);
			ctx.stroke();
			ctx.draw(true);
			console.log('scratch-success');
			this.$emit('scratchComplete', {});
		}
	}
};
</script>

<style lang="scss" scoped>
.scratch-wrap {
	position: relative;
	z-index: 9999999;
	width: calc(100% - 80rpx);
	margin: 0 new-sizing(20);
	padding: new-sizing(20) 0;
	// padding: new-sizing(20);
	background: rgba(26, 205, 184, 0.24);
	border-radius: new-sizing(4);
	text-align: center;
	.title {
		margin: new-sizing(10) auto;
		display: inline-block;
	}
	.wrap-bg {
		background-color: transparent;
		background-size: 100%;
		background-position: center center;
		background-repeat: no-repeat;
		// padding: new-sizing(5);
	}
	.scratch-con {
		// width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: new-sizing(6);
		width: calc(100% - 40rpx);
		margin: 0 auto;
	}
}
</style>
