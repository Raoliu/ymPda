<template>
	<view class="dealerList_body">
		<view class="selector">
			<view class="back" @click="back">
				<image src="../../static/image/left.png"></image>
			</view>
			<input type="text" placeholder="输入名称首字母或名称" />
		</view>
		<view class="page_body">
			<uni-indexed-list :options="list" :showSelect="false" @click="getInfo"></uni-indexed-list>
		</view>
	</view>
</template>

<script>
	import uniIndexedList from '../../components/uni-indexed-list/uni-indexed-list.vue'
	import {
		deptList
	} from '@/utils/api/api.js'
	import {
		initial
	} from '@/utils/js/chineseConversion.js'
	export default {
		components: {
			uniIndexedList
		},
		data() {
			return {
				list: [],
				data:[]
			}
		},
		mounted() {
			this.getdeptList();
		},
		methods: {
			getInfo(e) {
				console.log(e)
				let dealerId = ''
				this.data.map(item=>{
					if(item.name == e.item.name){
						dealerId = item.id
					}
				})
				this.$emit('closeDealer',{show:false,dealerName:e.item.name,dealerId})
			},
			getdeptList() {
				let letterList = []
				deptList({
					pid: -1
				}).then(res => {
					console.log(res)
					let data = res.data.content
					this.data = data
					for (let item of data) {
						let letter = initial(item.name)
						let index = letterList.indexOf(letter)
						if (index === -1) {
							letterList.push(letter)
							let obj = {
								letter: '',
								data: []
							}
							obj.letter = letter
							obj.data.push(item.name)
							this.list.push(obj)
						} else {
							this.list[index].data.push(item.name)
						}
					}
				})
			},
			back() {
				this.$emit('closeDealer',{show:false})
				// uni.navigateBack({
				// 	delta: 1
				// })
			}
		}
	}
</script>

<style>
	.dealerList_body{
		position: fixed;
		background-color: #FFFFFF;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		z-index: 999;
	}
	.selector {
		display: flex;
		padding-top: 20rpx;
	}

	.back {
		width: 10%;
		text-align: center;
		padding-top: 16rpx;
	}

	.selector image {
		width: 40rpx;
		height: 40rpx;
	}

	.selector input {
		border: 1rpx solid #CCCCCC;
		width: 80%;
		padding: 10rpx;
		padding-left: 30rpx;
		border-radius: 40rpx;
	}

	.page_body {
		width: 100%;
		height: 90vh;
		position: relative;
		bottom: 0;
		left: 0;
		margin: 20rpx auto;
	}

	.page_body_header,
	.page_body_bodys {
		font-size: 36rpx;
		font-weight: 500;
		color: #000000;
		line-height: 72rpx;
	}

	.page_body_bodys>view {
		border-bottom: 2rpx solid #E6E6E6;
	}
</style>
