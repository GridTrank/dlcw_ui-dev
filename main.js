import Vue from 'vue'
import App from './App'
import store from './store'
import {
	getStaticFilePath,
	STATIC_URL
} from '@/shared';
// vuex

// 引入全局uView
import uView from '@/node_modules/uview-ui'

import mixins from './mixins'

Vue.prototype.$store = store
//图片素材地址格式化
Vue.prototype.getStaticFilePath = function(path) {
	return getStaticFilePath(path)
};

Vue.config.productionTip = false

App.mpType = 'app'
Vue.use(uView)

//自定义组件
// import tab-bar from '@/components/tab-bar/tab-bar'
// Vue.component('tab-bar', tab-bar)

// #ifdef MP
// 引入uView对小程序分享的mixin封装
const mpShare = require('@/node_modules/uview-ui/libs/mixin/mpShare.js')
Vue.mixin(mpShare)
// #endif

Vue.mixin(mixins)

const app = new Vue({
	store,
	...App
})

// 引入请求封装
require('@/service/request')(app) 

app.$mount()
