<template>
	<view>
		<!-- 新增收货地址 -->
		<view class="add-address" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" @click="addAcceptAddress">请选择收货地址+</button>
		</view>
		<!-- 收货地址 -->
		<view class="accept-address" v-else @click="addAcceptAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="accept-people">收货人：</view>
					<text>{{ address.userName }}</text>
				</view>
				<view class="row1-right">
					<view class="accept-tel">
						电话：
						<text>{{ address.telNumber }}</text>
					</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view>收货地址：</view>
				<view class="accept-addr">{{ addstr }}</view>
			</view>
		</view>
		<image src="/static/cart_border@2x.png" class="cart-border"></image>
	</view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { getItem, setItem } from '../../utils/storage.js';
export default {
	data() {
		return {
			// 收货地址
			// address: {}
		};
	},
	methods: {
		...mapMutations('m_user', ['updateAddress']),
		// 新增收货地址
		async addAcceptAddress() {
			const [err, succ] = await uni.chooseAddress();
			if (err === null && succ.errMsg === 'chooseAddress:ok') {
				this.updateAddress(succ);
			} else if (
				err &&
				(err.errMsg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response')
			) {
				this.reAuth();
			}
		},
		// 重新授权
		async reAuth() {
			const [err, succ] = await uni.showModal({
				content: '检测到您没打开地址权限，是否去设置打开？',
				confirmText: '确认',
				cancelText: '取消'
			});
			if (err) return;
			// 如果用户取消了
			if (succ.cancel) {
				return uni.$showMsg('您取消了地址授权！');
			}
			// 如果用户确定了
			if (succ.confirm) {
				return uni.openSetting({
					success: settingResult => {
						// 3.4.2 地址授权的值等于 true，提示用户 “授权成功”
						if (settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址');
						// 3.4.3 地址授权的值等于 false，提示用户 “您取消了地址授权”
						if (!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权！');
					}
				});
			}
		}
	},
	computed: {
		...mapState('m_user', ['address']),
		...mapGetters('m_user', ['addstr'])
		// addstr: function(){
		// 	return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
		// }
	}
};
</script>

<style lang="scss">
.add-address {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 13px;
	height: 90px;
}
.accept-address {
	display: flex;
	flex-direction: column;
	justify-content: center;
	font-size: 13px;
	height: 90px;
	padding: 0 5px;
	.row1 {
		display: flex;
		justify-content: space-between;
		.row1-left {
			display: flex;
		}
		.row1-right {
			display: flex;
			.accept-tel {
				margin: 0 5px;
			}
		}
	}
	.row2 {
		display: flex;
		margin-top: 10px;
	}
}
.cart-border {
	display: block;
	width: 100%;
	height: 5px;
}
</style>
