<template>
	<view class="follow">
		<view class="follow-tab">
			<view class="follow-tab-box">
				<view class="follow-tab_item" :class="{ active: activeIndex === 0 }" @click="tab(0)">文章</view>
				<view class="follow-tab_item" :class="{ active: activeIndex === 1 }" @click="tab(1)">作者</view>
			</view>
		</view>

		<view class="follow-content">
			<list-scroll class="list-scroll" @loadmore="loadmore">
				<!-- 每一条数据 -->
				<list-card mode="base" :item="item" v-for="item in list" :key="item._id"></list-card>
			</list-scroll>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// tab切换
			activeIndex: 0,
			list: []
		};
	},
	onLoad() {
		this.getList();
	},
	methods: {
		// 切换选中标签
		tab(index) {
			this.activeIndex = index;
		},
		getList() {
			console.log(333332);
			this.$api.get_follow().then(res => {
				this.list = res.data;
				console.log(this.list);
			});
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
	display: flex;
}
.follow {
	flex: 1;
	height: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	// overflow: hidden;

	.follow-tab {
		height: 30px;
		padding: 10px 15px;
		font-size: 14px;
		.follow-tab-box {
			height: 100%;
			width: 100%;
			border: 1px solid $mk-base-color;
			border-radius: 5px;
			display: flex;
			.follow-tab_item {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #000;
				&:first-child {
					border-right: 1px solid $mk-base-color;
				}
				&.active {
					color: $mk-base-color;
				}
			}
		}
	}

	.follow-content {
		flex: 1;
	}
}
</style>
