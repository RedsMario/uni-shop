<template>
	<view class="home-container">
		<my-search @click="goToSearch"></my-search>
		<!-- 轮播图部分 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'../../subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 商品分类列表 -->
		<view class="cate-list">
			<view class="cate-item" v-for="(item, index) in cateList" :key="index" @click="handleNavJump(item)">
				<image :src="item.image_src"></image>
			</view>
		</view>
		<!-- 楼层部分 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item, index) in floorList" :key="index">
				<!-- 标题部分 -->
				<view class="top"><image :src="item.floor_title.image_src" class="floor-title"></image></view>
				<view class="bottom">
					<navigator class="left-box" :url="item.product_list[0].url">
						<image
							:src="item.product_list[0].image_src"
							mode="widthFix"
							:style="{ width: item.product_list[0].image_width + 'rpx' }"
						></image>
					</navigator>
					<view class="right-box">
						<navigator
							class="right-item"
							v-for="(subItem, index) in item.product_list"
							:key="index"
							v-if="index !== 0"
							:url="subItem.url"
						>
							<image :src="subItem.image_src" :style="{ width: subItem.image_width + 'rpx' }" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getSwiper } from '../../api/home.js';
import { getGoodsCate, getFloorList } from '../../api/goods.js';
import badge from '@/mixins/tab_badge';
export default {
	mixins: [badge],
	data() {
		return {
			// 轮播图列表
			swiperList: [],
			// 分类列表
			cateList: [],
			// 楼层列表
			floorList: []
		};
	},
	onLoad() {
		this.getSwiperList();
		this.getCateList();
		this.getFloorList();
	},
	methods: {
		// 获取轮播图列表
		async getSwiperList() {
			const { data: res } = await getSwiper();
			if (res.meta.status !== 200) {
				return uni.$showMsg('轮播图数据请求失败');
			}
			this.swiperList = res.message;
		},
		// 获取商品分类列表
		async getCateList() {
			const { data: res } = await getGoodsCate();
			if (res.meta.status !== 200) {
				return uni.$showMsg('分类列表请求失败');
			}
			this.cateList = res.message;
		},
		// 获取楼层列表
		async getFloorList() {
			const { data: res } = await getFloorList();
			if (res.meta.status !== 200) {
				return uni.$showMsg('楼层列表请求失败');
			}
			res.message.forEach(item => {
				item.product_list.forEach(subItem => {
					subItem.url = '/subpkg/goods_list/goods_list?' + subItem.navigator_url.split('?')[1];
				});
			});
			this.floorList = res.message;
		},
		// 导航跳转
		handleNavJump(item) {
			if (item.name === '分类') {
				uni.switchTab({
					url: '/pages/cate/cate'
				});
			}
		},
		// 进入搜索页面
		goToSearch() {
			uni.navigateTo({
				url: '/subpkg/search/search'
			});
		}
	}
};
</script>

<style lang="scss">
.home-container {
	.swiper-item {
		height: 330rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.cate-list {
		display: flex;
		margin: 15rpx;
		.cate-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			image {
				width: 128rpx;
				height: 140rpx;
			}
		}
	}
	.floor-list {
		padding: 10rpx;
		.floor-title {
			height: 60rpx;
			width: 100%;
			display: flex;
		}
	}
	.bottom {
		display: flex;
		.right-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}
}
</style>
