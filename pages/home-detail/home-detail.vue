<template>
	<view class="detail">
		<view class="detail-title">{{ formData.title }}</view>
		<view class="detail-header">
			<view class="detail-header__logo"><image :src="formData.author.avatar" mode="aspectFill"></image></view>
			<view class="detail-header__content">
				<view class="detail-header__content-title">{{ formData.author.author_name }}</view>
				<view class="detail-header__content-info">
					<text>{{ formData.create_time }}</text>
					<text>{{ formData.browse_count }} 浏览</text>
					<text>{{ formData.thumbs_up_count }} 赞</text>
				</view>
			</view>
			<view class="detail-header_button" @click="follow(formData.author.id)">{{ formData.is_author_like ? '取消关注' : '关注' }}</view>
		</view>
		<view class="detail-content">
			<view class="detail-html">
				<u-parse :content="formData.content" :noData="noData"></u-parse>
				<!-- 内容 -->
			</view>
			<view class="detail-comment">
				<view class="comment-title">最新评论</view>

				<!-- 评论列表渲染 -->
				<view class="comment-content" v-for="(v, i) in commentsList" :key="v.author.comment_id"><comments-box :comments="v" @reply="reply"></comments-box></view>
			</view>
		</view>

		<!-- 底部评价栏 -->
		<view class="detail-bottom">
			<view class="detail-bottom__input" @click="openComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#F07373"></uni-icons>
			</view>
			<view class="detail-bottom__icons">
				<view class="detail-bottom__icons-box" @click="open"><uni-icons type="chat" size="22" color="#F07373"></uni-icons></view>
				<view class="detail-bottom__icons-box" @click="likeTap(formData._id)">
					<uni-icons :type="formData.is_like ? 'heart-filled' : 'heart'" size="22" color="#F07373"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box" @click="thumbsup(formData._id)">
					<uni-icons :type="formData.is_thumbs_up ? 'hand-thumbsup-filled' : 'hand-thumbsup'" size="22" color="#F07373"></uni-icons>
				</view>
			</view>
		</view>

		<!-- 评论弹窗组件 -->
		<comment-popup ref="popup" @submit="submit"></comment-popup>
	</view>
</template>

<script>
import uParse from '@/components/gaoyia-parse/parse.vue';
export default {
	components: {
		uParse
	},
	data() {
		return {
			formData: {},
			noData: '<p style="text-align:center;color:#666">详情加载中...</p>',

			// 评论内容列表
			commentsList: [],
			// 被回复的评论的信息
			replyFormData: {},
			// 页数
			page: 1,
			// 每页条数
			pageSize: 5
		};
	},
	onLoad(query) {
		this.formData = JSON.parse(query.params);
		// 获取文章内容
		this.getDetail();
		// 获取评论内容列表
		this.getComments();

		uni.$on('update_article', res => {
			this.getComments();
		});
	},
	onReady() {},
	methods: {
		// 打开评论发布窗口
		openComment() {
			this.$refs.popup.open();
		},

		// 关闭弹窗清空数据
		close() {
			this.$refs.popup.close();
			this.$refs.popup.celar();
		},

		// 跳转评论详情页
		open() {
			// console.log(this.formData._id);
			// return
			uni.navigateTo({
				url: '/pages/detail-comments/detail-comments?id=' + this.formData._id
			});
		},

		// 点击关注作者
		follow(author_id) {
			console.log(author_id);
			this.setUpdateAuthor(author_id);
		},

		// 更新关注作者
		setUpdateAuthor(author_id) {
			uni.showLoading();
			this.$api
				.update_author({
					author_id
				})
				.then(res => {
					uni.hideLoading();
					this.formData.is_author_like = !this.formData.is_author_like;
					uni.$emit('update_author')
					uni.showToast({
						title: this.formData.is_author_like ? '关注作者成功' : '取消关注作者',
						icon: 'none'
					});
					console.log(res);
				});
		},

		// 收藏文章
		likeTap(article_id) {
			// 更新收藏文章
			this.setUpdateLike(article_id);
		},

		// 更新收藏文章
		setUpdateLike(article_id) {
			uni.showLoading();
			this.$api
				.update_like({
					article_id
				})
				.then(res => {
					console.log(res);
					uni.hideLoading();
					this.formData.is_like = !this.formData.is_like;
					uni.$emit('update_article','follow');
					uni.showToast({
						title: this.formData.is_like ? '收藏成功' : '取消收藏',
						icon: 'none'
					});
				});
		},

		// 点赞文章
		thumbsup(article_id) {
			this.setUpdateThumbs(article_id);
		},

		// 更新点赞文章
		setUpdateThumbs(article_id) {
			console.log(article_id);
			// return
			uni.showLoading();
			this.$api
				.update_thumbsup({
					article_id
				})
				.then(res => {
					console.log(res);
					uni.hideLoading();
					this.formData.is_thumbs_up = !this.formData.is_thumbs_up;
					if (this.formData.is_thumbs_up) {
						this.formData.thumbs_up_count++;
					} else {
						this.formData.thumbs_up_count--;
					}
					uni.$emit('update_article');
					uni.showToast({
						title: this.formData.is_thumbs_up ? '点赞成功' : '取消点赞',
						icon: this.formData.is_thumbs_up ? 'success' : 'none'
					});
				});
		},

		// 回复按钮事件
		reply(e) {
			console.log(e);
			this.replyFormData = {
				comment_id: e.comments.comment_id,
				is_reply: e.is_reply
			};
			// 回复 评论的对象的id
			if (e.comments.reply_id) {
				this.replyFormData.reply_id = e.comments.reply_id;
			}
			// 打开评论发布窗口
			this.openComment();
		},

		// 点击发布按钮
		submit(commentsValue) {
			// 发布评论
			this.setUpdateComment({ content: commentsValue, ...this.replyFormData });
		},

		// 发布评论
		setUpdateComment(content) {
			uni.showLoading();
			const formData = {
				article_id: this.formData._id,
				...content
			};
			// console.log(formData);
			// return
			this.$api.update_comment(formData).then(res => {
				console.log(res);
				uni.hideLoading();
				uni.showToast({
					title: '评论发布成功'
				});
				// 获取评论内容
				this.getComments();
				this.close();
				// 清空被回复的评论的信息
				this.replyFormData = {};
			});
		},

		// 获取评论内容
		getComments() {
			this.$api
				.get_comments({
					article_id: this.formData._id,
					page: this.page,
					pageSize: this.pageSize
				})
				.then(res => {
					console.log(res);
					this.commentsList = res.data;
				});
		},

		// 获取详情信息
		getDetail() {
			this.$api
				.get_detail({
					article_id: this.formData._id
				})
				.then(res => {
					const { data } = res;
					this.formData = data;
					console.log(res);
				});
		}
	}
};
</script>

<style lang="scss">
.detail {
	padding: 15px 0;
	padding-bottom: 54px;
}

.detail-title {
	padding: 0 15px;
	font-size: 18px;
	font-weight: bold;
	color: #333;
}

.detail-header {
	display: flex;
	align-items: center;
	margin-top: 10px;
	padding: 0 15px;

	.detail-header__logo {
		flex-shrink: 0;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.detail-header__content {
		width: 100%;
		padding-left: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 12px;

		.detail-header__content-title {
			font-size: 14px;
			color: #333;
		}

		.detail-header__content-info {
			color: #999;

			text {
				margin-right: 10px;
			}
		}
	}

	.detail-header_button {
		flex-shrink: 0;
		background-color: $mk-base-color;
		color: #fff;
		font-size: 12px;
		padding: 5px 15px;
		border-radius: 5px;
	}
}

.detail-content {
	margin-top: 20px;
	min-height: 500px;
	.detail-html {
		padding: 0 15px;
	}
	.detail-comment {
		margin-top: 30px;
		.comment-title {
			padding: 10px 15px;
			border-bottom: 1px solid #f5f5f5;
			font-size: 14px;
			color: #666;
		}
		.comment-content {
			border-top: 1px solid #eee;
			padding: 0 15px;
		}
	}
}

.detail-bottom {
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	align-items: center;
	width: 100%;
	height: 44px;
	border-top: 1px #f5f5f5 solid;
	background-color: #fff;
	box-sizing: border-box;

	.detail-bottom__input {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 10px;
		padding: 0 10px;
		width: 100%;
		height: 30px;
		border: 1px #ddd solid;
		border-radius: 5px;

		text {
			font-size: 14px;
			color: #999;
		}
	}

	.detail-bottom__icons {
		display: flex;
		flex-shrink: 0;
		padding: 0 10px;

		.detail-bottom__icons-box {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 44px;
		}
	}
}
</style>
