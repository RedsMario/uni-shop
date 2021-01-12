import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false

App.mpType = 'app'

// 配置在每个页面都可以调用的通知消息
uni.$showMsg = function(title = '数据请求失败！', duration = 1500) {
	return uni.showToast({
		title,
		duration,
		icon: 'none'
	});
}
const app = new Vue({
	...App
})
app.$mount()
