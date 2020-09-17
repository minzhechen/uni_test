<template>
	<view class="comments-box">
		<!-- header头部 -->
		<view class="comments-header">
			<!-- logo -->
			<view class="comments-header_logo"><image :src="comments.author.avatar" mode="aspectFill"></image></view>
			<!-- 头部右侧 -->
			<view class="comments-header_info">
				<view v-if="!comments.is_reply" class="title">{{ comments.author.author_name }}</view>
				<view v-else class="title">
					{{ comments.author.author_name }}
					<text class="reply-txt">回复</text>
					{{ comments.to }}
				</view>
				<view>{{ comments.create_time | formatTime }}</view>
			</view>
		</view>

		<view class="comments-content">
			{{ comments.comment_content }}
			<view class="comments-info"><view class="comments-button" @click="reply({ comments, is_reply })">回复</view></view>
			<view class="comments-relpy" v-for="(item, index) in comments.replys" :key="index"><comments-box :comments="item" :is_reply="true" @reply="reply"></comments-box></view>
		</view>
	</view>
</template>

<script>
import commentsBox from '@/components/comments-box/comments-box.vue'
import {parseTime} from '@/utils/index.js';
export default {
	name: 'comments-box',
	components: {
		commentsBox
	},
	props: {
		comments: {
			type: Object,
			default: () => {}
		},
		// 是否是子回复
		is_reply: {
			type: Boolean,
			default: false
		}
	},
	filters: {
	  formatTime(value) {
	    return parseTime(value)
	  }
	},
	data() {
		return {

		};
	},
	methods: {
		reply(comment) {
			// 子回复
			if (comment.is_reply) {
				// 因为传递的是对象comment，comment.is_reply为true,于是调用了两次，最下层赋值了两个子回复id，上一层重复赋值了一个子回复id以及赋值了一个父回复id。
				// 子评论id
				comment.comments.reply_id = comment.comments.comment_id
				// 主评论id
				comment.comments.comment_id = this.comments.comment_id
			}
			// 传递给父组件
			this.$emit('reply', comment)
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

				.reply-txt {
					font-weight: bold;
					margin: 0 10px;
					color: #000;
				}
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
			border: 1px solid #eee;
		}
	}
}
</style>
