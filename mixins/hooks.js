export function onLoad(options) {
	// #ifdef APP-PLUS
	this.pagePath = this.$scope.$page.fullPath
	this.pageRoute = this.$scope.$page.route
	// #endif
	this.pageOptions = options
	this.systemInfo = uni.getSystemInfoSync()
	this.windowInfo = uni.getWindowInfo()
	if (process.env.NODE_ENV !== 'production') {
		console.log('this.systemInfo', this.systemInfo)
		console.log('this.windowInfo', this.windowInfo)
	}
}
