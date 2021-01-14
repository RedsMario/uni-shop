<template>
	<view>
		<view class="goods-list">
			<view class="goods-item" v-for="(item, index) in goodsList" :key="index" @click="goGoodsDetail(item)">
					<my-goods :item="item"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
import { getGoodsList } from '../../api/goods.js';
export default {
	data() {
		return {
			// 查询参数对象
			queryInfo: {
				query: '',
				cid: '',
				pagenum: 1,
				pagesize: 10
			},
			// 商品列表
			goodsList: [],
			// 总条数
			total: 0,
			// 节流阀
			isLoading: false
		};
	},
	onLoad(options) {
		this.queryInfo.query = options.query;
		this.queryInfo.cid = options.cid;
		this.getGoodsListSync();
	},
	// 上拉触底
	onReachBottom(){
		if(this.queryInfo.pagenum * this.queryInfo.pagesize >= this.total) return uni.$showMsg('数据加载完毕');
		if(this.isLoading){
			return
		}
		this.queryInfo.pagenum++
		this.getGoodsListSync()
	},
	// 下拉刷新
	onPullDownRefresh(){
		this.queryInfo.pagenum = 1
		this.total = 0
		this.isLoading = false
		// 重新发起请求
		this.getGoodsListSync(() => {
			this.goodsList = [] 
			uni.stopPullDownRefresh()
		})
	},
	methods: {
		// 获取商品列表
		async getGoodsListSync(cb) {
			this.isLoading = true
			const { data: res } = await getGoodsList(this.queryInfo);
			this.isLoading = false
			// 清空原数组 关闭下拉刷新
			cb && cb()
			if (res.meta.status !== 200) {
				return uni.$showMsg('商品列表数据请求失败');
			}
			console.log(res);
			this.goodsList = [...this.goodsList, ...res.message.goods];
			this.total = res.message.total;
		},
		// 跳转商品详情页面
		goGoodsDetail(item){
			uni.navigateTo({
				url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
			})
		}
	}
};
</script>

<style lang="scss">
.goods-list {
	font-size: 24rpx;
	padding: 10rpx;
}
</style>
