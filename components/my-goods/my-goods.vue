<template>
	<view class="goods-item">
		<!-- 商品图片 -->
		<view class="goods-img"><image class="img" :src="item.goods_big_logo || defaultPic"></image></view>
		<!-- 商品标题 -->
		<view class="goods-description">
			<view class="goods-title">{{ item.goods_name }}</view>
			<view class="goods-price">￥{{ item.goods_price | toFiexd}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
							// 默认的空图片
				defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		filters: {
			toFiexd(price){
				return price.toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
.goods-item {
		display: flex;
		box-sizing: border-box;
		padding: 10rpx;
		border-bottom: 1px solid #efefef;
		.img {
			display: block;
			width: 100px;
			height: 100px;
		}
		.goods-description {
			display: flex;
			margin-left: 15rpx;
			flex-direction: column;
			justify-content: space-between;
		}
		.goods-price {
			font-weight: bold;
			color: #9b372c;
		}
	}
</style>
