<template>
	<view class="goods-item">
		<!-- 商品图片 -->
		<view class="goods-img">
			<radio v-if="showRadio" :value="item.goods_count" :checked="item.goods_state" color="#C00000" @click="onChangeRadio"/>
			<image class="img" :src="item.goods_small_logo || defaultPic"></image>
		</view>
		<!-- 商品标题 -->
		<view class="goods-description">
			<view class="goods-title">{{ item.goods_name }}</view>
			<view class="goods-bottom">
				<view class="goods-price">￥{{ item.goods_price | toFiexd}}</view>
				<uni-number-box v-if="showCount" :min="1" :value="item.goods_count" @change="onChangeCount"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: {}
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showCount: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				// 默认的空图片
				defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		methods: {
			// 变化单选框
			onChangeRadio(){
				this.$emit('click', {
					goods_id: this.item.goods_id,
					goods_state: !this.item.goods_state,
				})
			},
			onChangeCount(newVal){
				this.$emit('change-count', {
					goods_id: this.item.goods_id,
					goods_count: +newVal
				})
			}
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
	  font-size: 13px;
		display: flex;
		box-sizing: border-box;
		padding: 10rpx;
		border-bottom: 1px solid #efefef;
		.goods-img{
			display: flex;
			align-items: center;
			.img {
				display: block;
				width: 100px;
				height: 100px;
			}
		}
		.goods-description {
			flex: 1;
			display: flex;
			margin-left: 15rpx;
			flex-direction: column;
			justify-content: space-between;
			.goods-bottom{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.goods-price {
					font-size: 16px;
					font-weight: bold;
					color: #9b372c;
				}
			}
		}
	}
</style>
