/**
 *  home页面请求模块
 */
import instance from '../utils/request.js'

// 获取轮播图
export const getSwiper = () => {
	return instance.request({
		method: "GET",
		url: "/api/public/v1/home/swiperdata"
	})
}
