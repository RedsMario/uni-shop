<script>
	import badge from '@/mixins/tab_badge'
	export default {
		mixins: [badge],
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page {
		overflow-x: hidden;
	}
</style>
