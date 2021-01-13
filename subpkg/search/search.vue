<template>
	<view class="search-box">
		<uni-search-bar @input="input" cancelButton="none" :radius="18" />
		<!-- 搜索历史 -->
		<view class="history-box" v-if="showHistory">
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="delteSearchHistory"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<uni-tag :text="item" v-for="(item, index) in historyList" :key="index"></uni-tag>
			</view>
		</view>
		<!-- 搜索结果列表 -->
		<view class="search-list" v-else>
			<view class="search-item" v-for="(item, index) in searchResultList" :key="index" @click="goGoodsDetail(item)">
				<view class="goods-name">{{ item.goods_name }}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
			<view v-if="toolTip" class="more">没有更多了</view>
		</view>
	</view>
</template>

<script>
import { getSearchResult } from '../../api/search.js';
import { getItem, setItem } from '../../utils/storage.js'
export default {
	data() {
		return {
			// 搜索关键字
			keywords: '',
			// 控制定时器
			timer: null,
			// 存储搜索建议列表
			searchResultList: [],
			// 没有数据时提示
			toolTip: null,
			// 有数据显示
			showHistory: true,
			// 搜索关键词的历史记录
			historyList: getItem('KEY_HISTORY') || []
		};
	},
	methods: {
		input(e) {
			// 清除上一次定时器
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.keywords = e.value;
				// 判断输入框是否为空
				if (this.keywords.trim() === '') {
					return;
				}
				// 展示搜索结果  隐藏搜索历史
				this.showHistory = false;
				this.getSearchResultList();
			}, 500);
		},
		// 获取搜索结果列表
		async getSearchResultList() {
			this.saveSearchHistory()
			const { data: res } = await getSearchResult({
				query: this.keywords
			});
			if (res.meta.status !== 200) {
				uni.$showMsg('搜索结果获取失败');
			}
			this.searchResultList = res.message;
			// 如果搜索为空
			this.toolTip = this.searchResultList.length === 0;
		},
		// 保存搜索历史
		saveSearchHistory(){
			const index = this.historyList.findIndex(item => {
				return item === this.keywords
			})
			// 如果索引不为-1 就代表有重复的关键字
			if(index !== -1){
				this.historyList.splice(index,1)
			}
			// 向最前面添加
			this.historyList.unshift(this.keywords)
			// 本地存储
			setItem('KEY_HISTORY', this.historyList)
		},
		// 删除搜索历史
		delteSearchHistory(){
			this.historyList = []
			setItem('KEY_HISTORY', '')
		},
		// 跳转到商品详情页面
		goGoodsDetail(item) {
			uni.navigateTo({
				url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
			});
		}
	},
	watch: {
		keywords: function(newVal) {
			// 如果输入框为空
			if (!newVal) {
				this.showHistory = true;
				this.searchResultList = [];
			}
		}
	}
};
</script>

<style lang="scss">
.search-box {
	.search-list {
		padding: 10rpx;
		.search-item {
			display: flex;
			justify-content: space-between;
			font-size: 24rpx;
			padding: 26rpx 0;
			border-bottom: 2rpx solid #efefef;
			.goods-name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
		.more {
			width: 100%;
			height: 60rpx;
			line-height: 60rpx;
			margin-top: 20rpx;
			text-align: center;
			font-size: 30rpx;
			color: #ccc;
		}
	}
	.history-box {
		padding: 0 15rpx;
		.history-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
		}
		.history-list {
			display: flex;
			flex-wrap: wrap;
			.uni-tag {
				margin-top: 5px;
				margin-right: 5px;
			}
		}
	}
}
</style>
