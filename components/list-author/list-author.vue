<template>
	<view class="authorbox">
		<view class="authorbox-image"><image :src="item.avatar" mode="aspectFill"></image></view>
		<view class="authorbox-content">
			<view class="authorbox-content_title">{{item.author_name}}</view>
			<view class="authorbox-content_des">
				<view class="authorbox-content_des-label">{{item.professional}}</view>
				<view class="authorbox-content_des-info">
					<text>发帖 {{item.article_ids.length}}</text>
					<text>粉丝 {{item.fans_count}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props:{
		item:{
			type:Object,
			default:()=>{}
		}
	},
	data() {
		return {};
	},
	onLoad() {},
	methods: {}
};
</script>

<style lang="scss">
.authorbox {
	border-bottom: 1px solid #f5f5f5;
	padding: 10px;
	display: flex;
	justify-content: space-between;
	// margin: 10px 0;
	.authorbox-image {
		flex-shrink: 0;
		width: 40px;
		height: 40px;
		overflow: hidden;
		border-radius: 5px;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.authorbox-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-left: 10px;
		.authorbox-content_title {
			font-size: 14px;
			font-weight: bold;
			color: #000;
			line-height: 1.2;
		}
		.authorbox-content_des {
			font-size: 12px;
			color: #666;
			display: flex;
			justify-content: space-between;
			.authorbox-content_des-info {
				line-height: 1.5;
				color: #999;
				text:first-child {
					margin-right: 10px;
				}
			}
		}
	}
}
</style>
