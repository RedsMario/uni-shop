import { getItem, setItem } from '../utils/storage.js'
export default {
	// 开启命名空间
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
		},
		// 更新单选框状态
		updateState(state, goods){
			// some更高效
			state.cart.some(item => {
				if(item.goods_id === goods.goods_id){
					item.goods_state = goods.goods_state
					return true
				}
			})
			// 修改本地存储
			setItem('cart', state.cart)
		},
		// 更新次数
		updateCount(state, goods){
			state.cart.some(item => {
				if(item.goods_id === goods.goods_id){
					item.goods_count = goods.goods_count
					return true
				}
			})
			// 修改本地存储
			setItem('cart', state.cart)
		},
		// 删除商品
		deleteGoods(state, goods){
			state.cart = state.cart.filter(item => item.goods_id !== goods.goods_id)
			// 修改本地存储
			setItem('cart', state.cart)
		},
		// 更新所有单选框状态
		updateAllState(state, goodsState){
			state.cart.forEach(item => item.goods_state = goodsState)
			// 修改本地存储
			setItem('cart', state.cart)
		}
	},
	getters: {
		// 购物车商品总数
		total(state){
			return state.cart.reduce((count, item) => count += item.goods_count, 0)
		},
		// 勾选商品个数
		checkCount(state){
			// reduce:
			// 参数一： 累加器 用来存储累加值
			// 参数二： 循环的每一项
			return state.cart.reduce((total, item) => total += item.goods_state && item.goods_count, 0)
		},
		// 总价
		totalPrice(state){
			return state.cart.reduce((total, item) => total += item.goods_state && item.goods_count * item.goods_price, 0).toFixed(2)
		}
	}
}