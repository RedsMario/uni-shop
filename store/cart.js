import { getItem, setItem } from '../utils/storage.js'
export default {
	// 开启命名空间  防
	namespaced: true,
	state: () => ({
		cart: getItem('cart') || []
	}),
	mutations: {
		addTotal(state, goods){
			const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
			if(!findResult){
				state.cart.push(goods)
			}else{
				findResult.goods_count++
			}
			// 本地存储
			setItem('cart', state.cart)
		}
	},
	getters: {
		total(state){
			let count = 0;
			state.cart.forEach(item => {
				count += item.goods_count
			})
			return count
		}
	}
}