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
		<view class="btn-settle">
			<text>结算({{checkCount}})</text>
		</view>
	</view>
</template>

<script>
	import {mapGetters, mapMutations} from 'vuex'
	export default {
		computed: {
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
