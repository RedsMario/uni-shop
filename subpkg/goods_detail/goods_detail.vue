<template>
	<view class="goods-detail" v-if="goodsInfo.goods_name">
		<!-- 轮播图部分 -->
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<swiper-item class="swiper-item" v-for="(item, index) in goodsInfo.pics" :key="index" @click="onPreview(i)">
				<image :src="item.pics_big" class="swiper-img"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息详情 -->
		<view class="goods-info">
			<!-- 商品价格 -->
			<view class="goods-price">￥{{ goodsInfo.goods_price }}</view>
			<view class="goods-item">
				<!-- 商品标题 -->
				<view class="goods-title">{{ goodsInfo.goods_name }}</view>
				<!-- 商品收藏 -->
				<view class="goods-collect">
					<uni-icons type="star" size="16" color="gray"></uni-icons>
					<text class="text">收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="shipping">快递：免运费</view>
		</view>
		<!-- 商品图片详情 -->
		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
		<!-- 商品导航 -->
		<uni-goods-nav
			class="fixed"
			:fill="true"
			:options="options"
			:buttonGroup="buttonGroup"
			@click="onClick"
			@buttonClick="buttonClick"
		/>
	</view>
</template>

<script>
import { getGoodsDetail } from '../../api/goods.js';
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
	computed: {
		...mapState('m_cart', ['cart']),
		...mapGetters('m_cart', ['total'])
	},
	data() {
		return {
			// 商品详情信息
			goodsInfo: {},
			// 商品导航
			options: [
				{
					icon: 'shop',
					text: '店铺'
				},
				{
					icon: 'cart',
					text: '购物车',
					info: 0
				}
			],
			buttonGroup: [
				{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}
			]
		};
	},
	watch:{
		total: {
			handler: function(newVal){
				this.options.forEach(item => {
					if(item.text === '购物车'){
						item.info = newVal
					}
				})
			},
			// 首次进入页面就会触发
			immediate: true
		}
	},
	onLoad(options) {
		this.getGoodsInfo(options.goods_id);
	},
	methods: {
		...mapMutations('m_cart', ['addTotal']),
		async getGoodsInfo(goods_id) {
			const { data: res } = await getGoodsDetail({
				goods_id
			});
			if (res.meta.status !== 200) {
				return uni.$showMsg('商品详情获取失败');
			}
			res.message.goods_introduce = res.message.goods_introduce
				.replace(/<img /g, '<img style="display:block;" ')
				.replace(/webp/g, 'jpg');
			this.goodsInfo = res.message;
		},
		// 预览图片
		onPreview(index) {
			uni.previewImage({
				current: index,
				urls: this.goodsInfo.pics.map(item => item.pics_big)
			});
		},
		// 跳转购物车
		onClick(e) {
			if (e.content.text === '购物车') {
				uni.switchTab({
					url: '/pages/cart/cart'
				});
			}
		},
		// 加入购物车
		buttonClick(e) {
			if (e.content.text === '加入购物车') {
				const goods = {
					goods_id: this.goodsInfo.goods_id,
					goods_name: this.goodsInfo.goods_name,
					goods_price: this.goodsInfo.goods_price,
					goods_count: 1,
					goods_small_logo: this.goodsInfo.goods_small_logo,
					goods_state: true
				};
				// 添加商品
				this.addTotal(goods);
			}
		}
	}
};
</script>

<style lang="scss">
.goods-detail {
	padding-bottom: 50px;
	.swiper {
		width: 100%;
		height: 700rpx;
		.swiper-img {
			width: 100%;
			height: 100%;
		}
	}
	.goods-info {
		display: flex;
		flex-direction: column;
		padding: 0 15px;

		margin-bottom: 10px;
		.goods-price {
			color: red;
			margin: 6px 0;
		}
		.goods-item {
			display: flex;
			justify-content: space-between;
			font-size: 13px;
			margin-bottom: 10px;
			.goods-title {
				padding-right: 10rpx;
			}
			.goods-collect {
				display: flex;
				flex-direction: column;
				justify-content: center;
				width: 120px;
				align-items: center;
				border-left: 1px solid #ccc;
				color: gray;
				.text {
					margin-top: 5px;
				}
			}
		}
		.shipping {
			font-size: 12px;
			color: gray;
		}
	}
	.fixed {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
}
</style>
