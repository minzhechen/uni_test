<template>
	<view>
		<view class="feedback-title">
			意见反馈：
		</view>
		<view class="feedback-content">
			<textarea class="feedback-textarea" value="" placeholder="请输入您要反馈的问题" />
		</view>
		
		<view class="feedback-title">
			反馈图片：
		</view>
		
		<view class="feedback-image">
			
			<view class="feedback-image-item">
				<view class="close-icon">
					
				<uni-icons color="#fff" size="18" type="closeempty"></uni-icons>
				</view>
				<view class="image-box">
					<image src="../../static/logo.png" mode="aspectFill"></image>
				</view>
			</view>
			
			<view class="feedback-image-item">
				<view class="image-box">
					<uni-icons color="#eee" size="50" type="plusempty"></uni-icons>
				</view>
			</view>
			
		</view>
		
		<button class="submit-button" type="primary">提交反馈意见</button>
		
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
	.feedback-title{
		margin: 15px;
		font-size: 14px;
		color: #666;
	}
	.feedback-content{
		margin: 15px;
		padding: 10px;
		border: 1px solid #eee;
		.feedback-textarea{
			font-size: 12px;
			width: 100%;
			height: 100px;
		}
	}
	
	.feedback-image{
		margin: 10px;
		display: flex;
		flex-wrap: wrap;
		.feedback-image-item{
			box-sizing: border-box;
			width: 33.3%;
			height: 0;
			padding-top: 33.3%;
			position: relative;
			// 删除按钮
			.close-icon{
				position: absolute;
				top: 0;
				right: 0;
				width: 25px;
				height: 25px;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #ff5a5f;
				z-index: 2;
			}
			.image-box{
				position: absolute;
				top: 5px;
				bottom: 5px;
				left: 5px;
				right: 5px;
				overflow: hidden;
				border: 1px solid #eee;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	
	.submit-button{
		margin: 15px;
		background-color: $mk-base-color;
	}
</style>
