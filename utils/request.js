// 导入luch-request
import Request from 'luch-request'

// 创建实例对象
const instance = new Request()

// 配置BaseURL
instance.setConfig((config) => {
	config.baseURL = 'https://www.uinav.com'
	return config
})

// 配置请求拦截器
instance.interceptors.request.use((config) => {
	// 显示弹框
	uni.showLoading({
		title: '数据加载中...'
	})
  return config
}, config => {
  return Promise.reject(config)
})

// 配置响应拦截器
instance.interceptors.response.use((response) => {
	uni.hideLoading()
  return response
}, (response) => {
	uni.hideLoading()
  return Promise.reject(response)
})


export default instance