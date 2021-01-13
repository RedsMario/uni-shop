<template>
		<view class="search-container" :style="{'background-color': bgcolor}">
			<view class="my-search" :style="{'border-radius': radius +'px' }" @click="onSearch">
				<uni-icons type="search"></uni-icons>
				<view class="search">搜索</view>
			</view>
		</view>
</template>

<script>
	export default {
		props: {
			bgcolor: {
				type: String,
				default: '#C00000'
			},
			radius: {
				type: Number,
				default: 25
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			onSearch(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
.search-container {
	position: sticky;
	top: 0;
	left: 0;
	z-index: 999;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 20rpx;
	height: 50px;
	// background-color: #C00000;
	box-sizing: border-box;
	.my-search{
		display: flex;
		width: 100%;
		height: 72rpx;
		border-radius: 50rpx;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		.search {
			margin-left: 10rpx;
		}
	}
}
</style>
