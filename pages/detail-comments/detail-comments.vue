<template>
	<view>
		<!-- 评论列表渲染 -->
		<view class="comment-content" v-for="(v, i) in commentsList" :key="v.author.comment_id"><comments-box :comments="v" @reply="reply"></comments-box></view>
		<!-- 如果数据大于0或者小于4的时候就不显示 -->
		<uni-load-more v-if="commentsList.length === 0 || commentsList.length > 5" iconType="snow" :status="loading"></uni-load-more>
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
			loading: 'loading'
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
