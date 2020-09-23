<template>
	<view class="follow">
		<view class="follow-tab">
			<view class="follow-tab-box">
				<view class="follow-tab_item" :class="{ active: activeIndex === 0 }" @click="tab(0)">文章</view>
				<view class="follow-tab_item" :class="{ active: activeIndex === 1 }" @click="tab(1)">作者</view>
			</view>
		</view>

		<view class="follow-content">
			<swiper class="follow-content_swiper" :current="activeIndex" @change="change">
				<swiper-item>
					<view class="swiper-item">
						<list-scroll class="list-scroll"><list-card mode="base" :item="item" v-for="item in list" :key="item._id" types="follow"></list-card></list-scroll>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<list-author></list-author>
					</view>
					</swiper-item>
			</swiper>
			<uni-load-more v-if="list.length === 0 && !articleShow" :status="loading" iconType="snow"></uni-load-more>
			<view v-if="articleShow" class="no-data">没有数据</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// tab切换
			activeIndex: 0,
			list: [],
			// 加载状态
			loading: 'loading',
			articleShow: false
		};
	},
	onLoad() {
		// 初始化页面数据
		this.getList();
		// 更新页面
		uni.$on('update_article', res => {
			this.getList();
		});
	},
	methods: {
		// 切换选中标签
		tab(index) {
			this.activeIndex = index;
		},
		// 滑屏切索引
		change(e){
			this.activeIndex = e.target.current
		},
		// 获取列表
		getList() {
			// console.log(333332);
			this.$api.get_follow().then(res => {
				this.list = res.data;
				if (this.list.length === 0) {
					this.articleShow = true;
				}
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
	display: flex;
	flex-direction: column;
	flex: 1;
	// height: 100%;
	box-sizing: border-box;

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
				color: #666;
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
		overflow: hidden;
		.follow-content_swiper{
			height: 100%;
		}
		.list-scroll {
			height: 100%;
		}
	}

	.no-data {
		font-size: 14px;
		padding: 30px;
		text-align: center;
		color: #999;
	}
}
</style>
