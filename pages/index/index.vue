<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<!-- <view class="text-area">
			<text class="title">{{title}}</text>
		</view> -->
		<view class="page_body">
			<input type="text" auto-focus="true" :value='code' placeholder="请对准条码按下扫描按钮">
		</view>
		<view class="page_footer">
			<view class="page_footer_child"><button type="primary">出库</button></view>
			<view class="page_footer_child"><button type="warn">入库</button></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				code:'',
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.page_body {
		display: flex;
		width: 90%;
		justify-content: center;
	}
	.page_body input{
		margin-top: 10rem;
		border: 1px solid #eee;
		padding: 5px;
		border-radius: 5px;
		width: 100%;
		text-align: center;
	}
	
	.page_footer{
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	.page_footer_child{
		width: 50%;
		text-align: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
