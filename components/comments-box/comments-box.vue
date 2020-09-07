<template>
	<view class="comments-box">
		<!-- header头部 -->
		<view class="comments-header">
			<!-- logo -->
			<view class="comments-header_logo">
				<image :src="comments.author.avatar" mode="aspectFill"></image>
			</view>
			<!-- 头部右侧 -->
			<view class="comments-header_info">
				<view class="title">
					{{comments.author.author_name}}
				</view>
				<view>{{new Date(comments.create_time).toLocaleString()}}</view>
			</view>
		</view>

		<view class="comments-content">
			{{comments.comment_content}}
			<view class="comments-info">
				<view class="comments-button" @click="reply(comments)">
					回复
				</view>
			</view>
			<view class="comments-relpy" v-for="(item,index) in comments.replys" :key="index">
				<comments-box :comments="item"></comments-box>
			</view>
		</view>
	</view>
</template>

<script>
	import commentsBox from '@/components/comments-box/comments-box.vue'
	export default {
		components:{commentsBox},
		props: {
			comments: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {

			};
		},
		methods:{
			reply(comment){
				this.$emit('reply',comment)
			}
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

			.comments-info {
				margin-top: 10px;
				display: flex;

				.comments-button {
					padding: 2px 10px;
					color: #999;
					border: 1px solid #ccc;
					border-radius: 20px;
				}
			}

			.comments-relpy {
				margin: 10px 0;
				padding: 0 10px;
				border: 1px solid #ccc;
			}
		}
	}
</style>
