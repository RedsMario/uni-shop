import { getItem, setItem } from '../utils/storage.js'
export default {
	namespaced: true,
	state: () => ({
		address: getItem('address') || {},
		token: ''
	}),
	mutations: {
		updateAddress(state, address){
			state.address = address
			
			// 本地存储
			setItem('address', state.address)
		}
	},
	getters: {
		addstr(state){
			 if (!state.address.provinceName) return ''
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}