<template>
	<view class="cart">
		<view class="empty-goods" v-if="cart.length === 0">
			<image src="../../static/cart_empty@2x.png" class="empty-img"></image>
			<view class="empty-text">
				空空如也
			</view>
		</view>
		<view class="goodsList" v-else>
			<view class="cart-container">
				<!-- 收货地址部分 -->
				<my-address></my-address>
				<!-- 购物车部分 -->
				<view class="shop-cart">
					<uni-icons type="shop"></uni-icons>
					<view class="shop-cart-title">购物车</view>
				</view>
				<uni-swipe-action>
					<!-- 购物车列表 -->
					<view v-for="(item, index) in cart" :key="index" class="goods-list">
						<uni-swipe-action-item :right-options="options" @click="onSwiper(item)" autoClose>
							<my-goods
								:item="item"
								:show-radio="true"
								:show-count="true"
								@click="onClick"
								@change-count="onChangeCount"
								:style="{width: '100%;'}"
							></my-goods>
						</uni-swipe-action-item>
					</view>
				</uni-swipe-action>
			</view>
			<my-settle></my-settle>
		</view>
	</view>
</template>

<script>
import badge from '@/mixins/tab_badge';
import { mapState, mapMutations } from 'vuex';
export default {
	mixins: [badge],
	computed: {
		...mapState('m_cart', ['cart'])
	},
	data() {
		return {
			// 右滑按钮
			options: [
				{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}
			]
		};
	},

	methods: {
		...mapMutations('m_cart', ['updateState', 'updateCount','deleteGoods']),
		// 更新状态
		onClick(e) {
			this.updateState(e);
		},
		// 更新个数
		onChangeCount(goods) {
			this.updateCount(goods);
		},
		// 删除商品
		onSwiper(goods){
			this.deleteGoods(goods)
		}
	}
};
</script>

<style lang="scss">
.cart{
	width: 100%;
	height: 100vh;
	overflow: auto;
}
.empty-goods{
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.empty-img{
		width: 90px;
		height: 90px;
	}
	.empty-text {
		font-size: 12px;
		color: gray;
		margin-top: 10px;
	}
}
.cart-container {
	padding-bottom: 50px;
	.shop-cart {
		display: flex;
		height: 40px;
		padding: 0 10px;
		align-items: center;
		border-bottom: 1px solid #ccc;
		.shop-cart-title {
			margin-left: 10px;
		}
	}
}
</style>
