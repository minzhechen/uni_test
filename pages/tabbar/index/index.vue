<template>
	<view class="home">
		<!-- 自定义导航栏 -->
		<navbar></navbar>
		<tab :list="tabList" :tabIndex="tabIndex"  @tab="tab"></tab>
		<view class="home-list">
			<list :tab="tabList" :activeIndex="activeIndex" @change="change"></list>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	// easyCom components/组件名/组件名.vue 局部引入
	export default {
		data() {
			return {
				title: 'Hello',
				tabList: [],
				tabIndex:0,
				activeIndex:0
			}
		},
		onLoad() {
			uni.$on('labelChange',(res)=>{
				this.tabList = []
				this.tabIndex = 0
				this.activeIndex = 0
				this.getLabel()
			})
			
		},
		watch:{
			userinfo(newVal){
				// 获取tab标签
				this.getLabel()
			}
		},
		computed:{
			...mapState([
			  // 映射 this.count 为 store.state.count
			  'userinfo'
			])
		},
		methods: {
			// 统一tab列和文章列的索引
			change(current){
				this.tabIndex = current
				this.activeIndex = current
				// console.log('当前swiper的值：',current);
			},
			tab({data,index}){
				console.log(data,index);
				this.activeIndex = index
			},
			// 获取tab标签
			getLabel() {
				// 调用云函数方法
				this.$api.get_label().then((res) => {
					const {
						data
					} = res
					console.log('标签 ',data);
					data.unshift({
						name:'全部'
					})
					this.tabList = data
					// 	console.log(this.tabList);
				})

			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}
	.home  {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		.home-list {
			flex:1;
			box-sizing: border-box;
		}
	}
</style>
