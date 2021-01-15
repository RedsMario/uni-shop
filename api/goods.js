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

// 获取电梯导航列表
export const getFloorList = () => {
	return instance.request({
		method: 'GET',
		url: '/api/public/v1/home/floordata'
	})
}

// 获取商品列表数据
export const getGoodsList = (params) => {
	return instance.request({
		method: 'GET',
		url: '/api/public/v1/goods/search',
		params
	})
}

// 获取商品详情
export const getGoodsDetail = (params) => {
	return instance.request({
		method: 'GET',
		url: '/api/public/v1/goods/detail',
		params
	})
}