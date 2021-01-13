/**
 *  本地存储模块
 */

/**
 *  @param {String}  
 */
export const getItem = (key) => {
	const data = uni.getStorageSync(key)
	try{
		return JSON.parse(data)
	}catch(e){
		return data
	}
}


/**
 *  @param {String, Object}  
 */
export const setItem = (key, value) => {
	// 如果是一个对象 则将先将它序列化
	if(typeof value === 'object'){
		value = JSON.stringify(value)
	}
	// 存储到本地
	uni.setStorageSync(key, value)
}
