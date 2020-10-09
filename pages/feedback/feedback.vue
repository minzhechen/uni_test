<template>
	<view>
		<view class="feedback-title">意见反馈：</view>
		<view class="feedback-content"><textarea class="feedback-textarea" :value="content" placeholder="请输入您要反馈的问题" /></view>

		<view class="feedback-title">反馈图片：</view>

		<view class="feedback-image">
			<view class="feedback-image-item" v-for="(item,index) in imageList" :key="index">
				<view class="close-icon" @click="del(index)">
					<uni-icons color="#fff" size="18" type="closeempty"></uni-icons>
				</view>
				<view class="image-box">
					<image :src="item.url" mode="aspectFit"></image>
				</view>
			</view>

			<view class="feedback-image-item" v-show="imageList.length < 5">
				<view class="image-box" @click="addImages">
					<uni-icons color="#eee" size="50" type="plusempty"></uni-icons>
					</view>
			</view>
		</view>

		<button class="submit-button" type="primary" @click="submit">提交反馈意见</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			imageList:[],
			content:''
		};
	},
	methods:{
		// 上传反馈意见
		async submit(){
			uni.showLoading()
			let imagesFile = []
			
			for(let k of this.imageList){
				let filePath = k.url
				let cloudPath = k.name
				console.log(filePath);
				let result = await this.uploadFiles(filePath,cloudPath)
				imagesFile.push(result)
			}

			this.updateFeedback({
				content:this.content,
				feedbackImages:imagesFile
			})
		
		},
		
		// 请求反馈意见接口
		updateFeedback({content,feedbackImages}){
			this.$api.update_feedback({
				content,
				feedbackImages
			}).then(res=>{
				uni.hideLoading()
				uni.showToast({
					title:'反馈提交成功'
				})
				setTimeout(()=>{
					uni.switchTab({
						url:'/pages/tabbar/my/my'
					})
				},2000)
			}).catch(err=>{
				uni.hideLoading()
				uni.showToast({
					title:'反馈提交失败',
					icon:'none'
				})
			})
		},
		
		// 上传图到云存储
		async uploadFiles(filePath,cloudPath){
			let result = await uniCloud.uploadFile({
				filePath,
				cloudPath,
			})
			console.log(result);
			// 返回上传云服务器后的图片链接
			return result.fileID
		},
		
		// 删除图片
		del(index){
			this.imageList.splice(index,1)
		},
		
		// 添加图片
		addImages(){
			console.log(1);
			// 限制图的数量
			let count = 5 - this.imageList.length
			uni.chooseImage({
				// 图片可选数量
				count,
				success:(res)=>{
					console.log(res);
					res.tempFilePaths.forEach((v,i)=>{
						// 因为 h5 对count不兼容，使用js过滤
						if( i >= count) return 
						this.imageList.push({
							url:v,
							name:res.tempFiles[i].name
						})
					})
					
				}
			})
		}
		
		
		
	}
};
</script>

<style lang="scss">
.feedback-title {
	margin: 15px;
	font-size: 14px;
	color: #666;
}
.feedback-content {
	margin: 15px;
	padding: 10px;
	border: 1px solid #eee;
	.feedback-textarea {
		font-size: 12px;
		width: 100%;
		height: 100px;
	}
}

.feedback-image {
	margin: 10px;
	display: flex;
	flex-wrap: wrap;
	.feedback-image-item {
		box-sizing: border-box;
		width: 33.3%;
		height: 0;
		padding-top: 33.3%;
		position: relative;
		// 删除按钮
		.close-icon {
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
		.image-box {
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
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
}

.submit-button {
	margin: 15px;
	background-color: $mk-base-color;
}
</style>
