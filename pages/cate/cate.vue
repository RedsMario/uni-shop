<template>
	<view class="cate">
		<my-search @click="goToSearch"></my-search>
		<!-- 搜索部分 -->
		<view class="cate-container">
			<!-- 左侧滚动栏 -->
			<scroll-view class="left-scroll" scroll-y :style="{height: scrollHeight + 'px'}">
				<!-- 一级分类列表 -->
				<view :class="['left-scroll-item', index === active ? 'active' : '' ]" v-for="(item,index) in saveCateList" :key="index" @click="onChange(index)" >
					<view class="left-title">{{item.cat_name}}</view>
				</view>
			</scroll-view >
			<!-- 右侧滚动栏 -->
			<scroll-view class="right-scroll" scroll-y :style="{height: scrollHeight + 'px'}" :scroll-top="scrollTop">
				<view class="right-scroll-item">
						<!-- 二级和三级分类列表 -->
						<view class="level-item" v-for="(item,index) in levelTwoList" :key="index">
							<!-- 二级分类列表 -->
							<view class="level2-item">/ {{item.cat_name}} /</view>
							<!-- 三级分类列表 -->
							<view class="level3-item">
								<view class="good-item" v-for="(subItem,index) in item.children" :key="index" @click="goGoodList(subItem)">
									<image :src="subItem.cat_icon"></image>
									<view class="text">{{subItem.cat_name}}</view>
								</view>
							</view>
						</view>
				</view>
			</scroll-view >
		</view>
	</view>
</template>

<script>
	import {getCateList} from '../../api/cate.js'
	export default {
		data() {
			return {
				// 滚动条高度
				scrollHeight: 0,
				// 商品分类列表
				saveCateList: [],
				// 激活的商品栏
				active: 0,
				// 二级分类列表
				levelTwoList: [],
				// 滚动条
				scrollTop: 0
			}
		},
		onLoad() {
			// 获取设备可用高度
			const res = uni.getSystemInfoSync()
			this.scrollHeight = res.windowHeight - 50
			// 获取分类列表
			this.getGoodsCateList()
		},
		methods: {
			// 获取商品分类列表
			async getGoodsCateList(){
				const {data: res} = await getCateList()
				if (res.meta.status !== 200) {
					uni.$showMsg('商品分类列表请求失败')
				}
				this.saveCateList = res.message
				this.levelTwoList = this.saveCateList[0].children
			},
			// 切换商品栏
			onChange(index){
				this.active = index
				this.levelTwoList = this.saveCateList[index].children
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			// 进入搜索页面
			goToSearch(){
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			},
			// 进入商品列表页面
			goGoodList(item){
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
				})
			}
		}
	}
</script>

<style lang="scss">
.cate-container{
	display: flex;
	font-size: 24rpx;
	letter-spacing: 3rpx;
	.left-scroll{
		width: 240rpx;
		.left-scroll-item {
			line-height: 100rpx;
			background-color: #f7f7f7;
			text-align: center;
			.left-title{
				width: 100%;
				height: 100%;
			}
			&.active {
				position: relative;
				background-color: #fff;
				&::before {
					content: '';
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
					width: 3px;
					height: 50%;
					background-color: red;
				}
			}
		}
	}
	.right-scroll {
		.level-item{
			display: flex;
			flex-direction: column;
			.level2-item{
				font-weight: bold;
				text-align: center;
				padding: 30rpx 0;
			}
			.level3-item {
				display: flex;
				flex-wrap: wrap;
				.good-item {
					flex-basis: 33.33%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					margin-bottom: 20rpx;
					image {
						width: 120rpx;
						height: 120rpx;
						margin-bottom: 15rpx;
					}
				}
			}
		}
	}
}
</style>
