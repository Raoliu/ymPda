<template>
	<view>
		<view class="selector">
			<view class="back" @click="back">
				<image src="../../static/image/left.png"></image>
			</view>
			<input type="text" placeholder="输入名称首字母或名称" />
		</view>
		<view class="page_body">
			<view>
				<view class="page_body_header">A</view>
				<view class="page_body_bodys">
					<view>alibaba</view>
					<view>alibaba</view>
					<view>alibaba</view>
					<view>alibaba</view>
				</view>
			</view>
			<view>
				<view class="page_body_header">B</view>
				<view class="page_body_bodys">
					<view>alibaba</view>
					<view>alibaba</view>
					<view>alibaba</view>
					<view>alibaba</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			back(){
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style>
.selector{
	display: flex;
	margin-top: 20rpx;
}
.back{
	width: 10%;
	text-align: center;
	margin-top: 16rpx;
}
.selector image{
	width: 40rpx;
	height: 40rpx;
}
.selector input{
	border: 1rpx solid #CCCCCC;
	width: 80%;
	padding: 10rpx;
	padding-left: 30rpx;
	border-radius: 40rpx;
}
.page_body{
	width: 92%;
	margin: 20rpx auto;
}
.page_body_header,.page_body_bodys{
	font-size: 36rpx;
	font-weight: 500;
	color: #000000;
	line-height: 72rpx;
}
.page_body_bodys>view{
	border-bottom: 2rpx solid #E6E6E6;
}
</style>
