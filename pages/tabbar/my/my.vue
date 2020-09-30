<template>
	<view>
		<view class="my-header">
			<view class="my-header__background"><image :src="userinfo.avatar" mode="aspectFill"></image></view>
			<view class="my-header__logo">
				<view class="my-header__logo-image"><image :src="userinfo.avatar" mode="aspectFill"></image></view>
				<text class="my-header__logo-text">{{userinfo.author_name}}</text>
			</view>

			<view class="my-header__info">
				<view class="my-header__info-box">
					<text>关注</text>
					<text class="my-header__info-bottom">{{userinfo.author_likes_ids.length}}</text>
				</view>
				<view class="my-header__info-box">
					<text>粉丝</text>
					<text class="my-header__info-bottom">{{userinfo.fans_count}}</text>
				</view>
				<view class="my-header__info-box">
					<text>积分</text>
					<text class="my-header__info-bottom">{{userinfo.integral_count || 0}}</text>
				</view>
			</view>
		</view>
		<!-- 主体 -->
		<view class="my-content">
			<view class="my-content__list" @click="open">
				<view class="my-content__list-box">
					<uni-icons type="contact-filled" size="14"></uni-icons>
					<text>我的文章</text>
				</view>
				<uni-icons type="arrowright" size="14"></uni-icons>
			</view>

			<view class="my-content__list">
				<view class="my-content__list-box" @click="feedback">
					<uni-icons type="help" size="14"></uni-icons>
					<text>意见反馈</text>
				</view>
				<uni-icons type="arrowright" size="14"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {};
	},
	onLoad() {
		console.log(this.userinfo);
	},
	computed: {
		...mapState(['userinfo'])
	},
	methods: {
		open() {
			uni.navigateTo({
				url: '/pages/my-article/my-article'
			});
		},
		feedback(){
			uni.navigateTo({
				url:'/pages/feedback/feedback'
			})
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
	background-color: #f5f5f5;
	color: #333;
}
.my-header {
	display: flex;
	flex-direction: column;
	padding: 20px 0;
	position: relative;
	.my-header__background {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		filter: blur(8px);
		opacity: 0.2;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.my-header__logo {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		.my-header__logo-image {
			flex-shrink: 0;
			width: 60px;
			height: 60px;
			overflow: hidden;
			border-radius: 50%;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.my-header__logo-text {
			padding: 20px 0;
			font-weight: bold;
			font-size: 16px;
		}
	}

	.my-header__info {
		font-size: 14px;
		display: flex;
		justify-content: space-around;
		.my-header__info-box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.my-header__info-bottom {
				color: #999;
			}
		}
	}
}
.my-content {
	color: #666;
	.my-content__list {
		background-color: #ffffff;
		padding: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
		.my-content__list-box {
			text {
				margin-left: 5px;
			}
		}
	}
}
</style>
