<template>
	<view>
		<uni-load-more v-if="list.length === 0 && !articleShow" iconType="snow" :status="loading"></uni-load-more>
		<view v-if="articleShow" class="no-data">没有数据</view>
		<list-card :item="item" v-for="item in list" :key="item._id"></list-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			loading: 'loading',
			articleShow: false
		};
	},
	onLoad() {
		// 获取列表
		this.getMyArticle();
	},
	methods: {
		getMyArticle() {
			this.$api.get_my_article().then(res => {
				console.log(res.data);
				let { data } = res;
				this.list = data;
				// 没有展示数据时
				if (this.list.length === 0) {
					this.articleShow = true;
				}
				// 返回数据为空时
				if (res.data.length === 0) {
					this.loading = 'noMore';
				}
			});
		}
	}
};
</script>

<style lang="scss">
.no-data {
	text-align: center;
	padding: 50px;
	font-size: 14px;
	color: #999;
}
</style>
