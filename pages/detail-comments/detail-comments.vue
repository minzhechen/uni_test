<template>
	<view>
		<!-- 评论列表渲染 -->
		<view class="comment-content" v-for="(v, i) in commentsList" :key="v.author.comment_id"><comments-box :comments="v" @reply="reply"></comments-box></view>
		<!-- 如果数据大于0或者小于4的时候就不显示 -->
		<uni-load-more v-if="commentsList.length === 0 || commentsList.length > 5" iconType="snow" :status="loading"></uni-load-more>

		<!-- 评论弹窗组件 -->
		<comment-popup ref="popup" @submit="submit"></comment-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 评论内容列表
			commentsList: [],
			// 文章id
			article_id: '',
			page: 1,
			pageSize: 5,
			loading: 'loading',
			// 被回复的评论的信息
			replyFormData: {}
		};
	},
	onLoad(query) {
		this.article_id = query.id;
		// 获取评论内容
		this.getComments(query.id);
	},
	// 滚动到底部的事件
	onReachBottom() {
		if (this.loading !== 'noMore') {
			this.page++;
			this.getComments(this.article_id);
		}
	},
	methods: {
		// 获取评论内容
		getComments(article_id) {
			this.$api
				.get_comments({
					article_id,
					page: this.page,
					pageSize: this.pageSize
				})
				.then(res => {
					let { data } = res;
					if (data.length === 0) {
						this.loading = 'noMore';
						return;
					}
					let arr = JSON.parse(JSON.stringify(this.commentsList));
					arr.push(...data);
					this.commentsList = arr;
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

		// 打开评论发布窗口
		openComment() {
			this.$refs.popup.open();
		},

		// 关闭弹窗清空数据
		close() {
			this.$refs.popup.close();
			this.$refs.popup.celar();
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
				article_id: this.article_id,
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
				// 初始化数据
				this.commentsList = []
				this.page = 1;
				this.loading = 'loading';
				// 获取评论内容
				this.getComments(this.article_id);
				uni.$emit('update_article')
				this.close();
				// 清空被回复的评论的信息
				this.replyFormData = {};
			});
		}
	}
};
</script>

<style lang="scss">
.comment-content {
	border-top: 1px solid #eee;
	padding: 0 15px;
}
</style>
