<template>
	<uni-popup ref="popup" type="bottom" :maskClick="false">
		<view class="popup-wrap">
			<view class="popup-header">
				<text class="popup-header__item" @click="close">取消</text>
				<text class="popup-header__item" @click="sumbit">发布</text>
			</view>
			<view class="popup-content">
				<textarea class="popup-textarea" v-model="commentsValue" maxlength="200" fixed placeholder="请输入评论内容" />
				<view class="popup-count">{{ commentsValue.length }}/200</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	data() {
		return {
			// 输入框的值
			commentsValue: ''
		};
	},
	methods: {
		// 打开评论发布窗口
		open() {
			this.$refs.popup.open();
		},
		// 关闭弹窗
		close() {
			this.$refs.popup.close();
		},
		// 清空内容
		celar(){
			this.commentsValue= ''
		},
		// 点击发布按钮
		sumbit() {
			if (!this.commentsValue) {
				uni.showToast({
					title: '请输入评论内容',
					icon: 'none'
				});
				return;
			}
			this.$emit('submit', this.commentsValue);
		}
	}
};
</script>

<style lang="scss">
.popup-wrap {
	background-color: #fff;
	.popup-header {
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		color: #666;
		border-bottom: 1px #f5f5f5 solid;
		.popup-header__item {
			height: 50px;
			line-height: 50px;
			padding: 0 15px;
		}
	}
	.popup-content {
		width: 100%;
		padding: 15px;
		box-sizing: border-box;
		.popup-textarea {
			width: 100%;
			height: 200px;
		}
		.popup-count {
			display: flex;
			justify-content: flex-end;
			font-size: 12px;
			color: #999;
		}
	}
}
</style>
