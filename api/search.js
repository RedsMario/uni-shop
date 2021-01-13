/**
 *  搜索请求模块
 */

import instance from '../utils/request.js'

/**
 *  @params {Object}
 */
export const getSearchResult = (params) => {
	return instance.request({
		method: 'GET',
		url: '/api/public/v1/goods/qsearch',
		params
	})
}