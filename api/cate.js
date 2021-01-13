/**
 * 商品分类模块
 */
import instance from '../utils/request.js'

export const getCateList = () => {
	return instance.request({
		method: 'GET',
		url: '/api/public/v1/categories'
	})
}
