/**
 *  商品请求模块
 */

import instance from '../utils/request.js'

// 获取分类
export const getGoodsCate = () => {
	return instance.request({
		method: 'GET',
		url: '/api/public/v1/home/catitems'
	})
}

export const getFloorList = () => {
	return instance.request({
		method: 'GET',
		url: '/api/public/v1/home/floordata'
	})
}