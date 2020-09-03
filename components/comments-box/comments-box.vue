<template>
	<view class="comments-box">
		<!-- header头部 -->
		<view class="comments-header">
			<!-- logo -->
			<view class="comments-header_logo">
				<image src="../../static/logo.png" mode="aspectFill"></image>
			</view>
			<!-- 头部右侧 -->
			<view class="comments-header_info">
				<view class="title">
					god
				</view>
				<view>2020-09-02 11:11:11</view>
			</view>
		</view>

		<view class="comments-content">
			是个好东西
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.comments-box {
		margin: 15px 0;

		.comments-header {
			display: flex;

			// logo
			.comments-header_logo {
				flex-shrink: 0;
				width: 30px;
				height: 30px;
				border-radius: 5px;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			// 头部右侧
			.comments-header_info {
				display: flex;
				flex-direction: column;
				padding-left: 15px;
				color: #999;
				font-size: 12px;
				line-height: 1;

				.title {
					color: #333;
					font-size: 14px;
					margin-bottom: 10px;
				}
			}
		}

		// 主体内容
		.comments-content {
			margin-top: 10px;
			font-size: 14px;
			color: #000;
		}
	}
</style>
