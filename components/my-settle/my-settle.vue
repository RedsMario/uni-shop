<template>
	<view class="my-settle">
		<!-- 全选部分 -->
		<view class="all-select" @click="cancelSelect">
			<label class="radio">
				<radio :checked="checkState" color="#C00000"/><text>全选</text>
			</label>
		</view>
		<!-- 合计部分 -->
		<view class="amount">
			合计: <text class="price">￥{{totalPrice}}</text>
		</view>
		<!-- 结算部分 -->
		<view class="btn-settle" @click="onClickSettle">
			<text >结算({{checkCount}})</text>
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		computed: {
			...mapState('m_user', ['address','token']),
			...mapGetters('m_cart', ['checkCount','total','totalPrice']),
			checkState: function(){
				return this.checkCount === this.total
			}
		},
		data() {
			return {
			};
		},
		methods: {
			...mapMutations('m_cart', ['updateAllState']),
			// 更新全选或反选
			cancelSelect(){
				this.updateAllState(!this.checkState)
			},
			// 点击了结算
			onClickSettle(){
				// 判断是否勾选了商品
				if(!this.checkCount) return uni.$showMsg('请先勾选商品') 
				// 判断是否选择了收货地址
				if(!Object.keys(this.address).length) return uni.$showMsg('请先选择收货地址')
				// 判断用户是否登录
				if(!this.token) return uni.$showMsg('请先登录')
			}
		}
	}
</script>

<style lang="scss">
.my-settle {
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	background-color: #fff;
	z-index: 999;
	.amount{
		.price {
			color: #c00000;
			font-weight: bold;
		}
	}
	.btn-settle {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #cd1300;
		width: 100px;
		line-height: 50px;
		color: #fff;
	}
}
</style>
