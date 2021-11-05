<template>
	<view>
		<view class="background"></view>
		<view class="toast">
			<view class="toast_title">{{title}}</view>
			<view class="toast_body">
				<image v-if="status=='success'" src="../static/image/success.png" mode="aspectFit"></image>
				<image v-else-if="status=='error'" src="../static/image/error.png" mode="aspectFit"></image>
				<view v-else-if="status=='progress'" class="progress-box">
				    <progress percent="20" show-info stroke-width="3" />
				</view>
			</view>
			<view class="toast_button">
				<p :style="status=='progress'?'color:#EB2020':'color:#3854EA'" @click="confirm">{{buttonText}}</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"Toast",
		props:[
			'title',
			'status',
			'buttonText'
		],
		data() {
			return {
				
			};
		},
		methods:{
			confirm(){
				this.$emit('hideDialog',{show:false})
			}
		}
	}
</script>

<style scoped>
	.background{
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		opacity: 0.3;
		background-color: #000000;
	}
	.toast{
		width: 80%;
		background-color: #FFFFFF;
		border: 2rpx solid #CCCCCC;
		border-radius: 20rpx;
		position: absolute;
		top: 20vh;
		left: 10vw;
	}
	.toast_body{
		width: 100%;
	}
	.toast_body image{
		width: 100%;
		height: 200rpx;
		margin: 50rpx auto;
	}
	.toast_title{
		text-align: center;
		font-size: 44rpx;
		font-weight: bold;
		color: #333333;
		margin-top: 60rpx;
	}
	.toast_button{
		border-top: 2rpx solid #E6E6E6;
		line-height: 100rpx;
	}
	.progress-box{
		width: 90%;
		margin: 100rpx auto;
	}
</style>
