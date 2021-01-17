import { mapGetters } from 'vuex'

export default {
	computed:{
		...mapGetters('m_cart', ['total'])
	},
	onShow(){
		this.total && this.setBadge()
	},
	watch: {
		total: function(){
			this.total && this.setBadge()
		}
	},
	methods: {
		setBadge(){
			uni.setTabBarBadge({
				index: 2,
				text: this.total + ''
			})
		}
	}
}