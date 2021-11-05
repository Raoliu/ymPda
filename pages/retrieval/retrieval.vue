<template>
	<view>
		<view class="title"><p>出库</p></view>
		<view class="page_body">
			<form class="page_body_form" @submit="formsubmit">
				<view class="uni-form-item uni-column">
					<view>订单号</view>
					<input type="text" class="uni-input" placeholder="请输入订单号" name="orderNum" />
				</view>
				<view class="uni-form-item uni-column">
					<view>物流号</view>
					<input type="text" class="uni-input" placeholder="请输入物流号" name="code" />
				</view>
				<view class="uni-form-item uni-column">
					<view><label class="uni-column-required">*</label>码级别</view>
					<view class="uni-input">
						<view>
							<picker @change="bindPickerChange" :value="index" :range="array">
							    <view class="selector">{{array[index]}}</view>
							</picker>
						</view>
					</view>
					<image src="../../static/image/right.png" mode="aspectFill"></image>
				</view>
				<view class="uni-form-item uni-column">
					<view><label class="uni-column-required">*</label>产品名</view>
					<view class="uni-input">
						<view>
							<picker @change="bindPickerChange" :value="index" :range="array1">
							    <view class="selector">{{array1[index]}}</view>
							</picker>
						</view>
					</view>
					<image src="../../static/image/right.png" mode="aspectFill"></image>
				</view>
				<view class="uni-form-item uni-column">
					<view><label class="uni-column-required">*</label>经销商</view>
					<input type="text" class="uni-input" @click="chooseDealer" :disabled="true" placeholder="请选择经销商" name="code" />
					<image src="../../static/image/right.png" mode="aspectFill"></image>
				</view>
			</form>
		</view>
		<view class="page_footer">
			<button @click="scan">开始扫描</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: ['请选择码级别','中国', '美国', '巴西', '日本'],
				array1: ['请选择产品名','中国', '美国', '巴西', '日本'],
				array2: ['请选择经销商','中国', '美国', '巴西', '日本'],
				index: 0,
			}
		},
		methods: {
			bindPickerChange: function(e) {
			    console.log('picker发送选择改变，携带值为', e.target.value)
			    this.index = e.target.value
			},
			chooseDealer(){
				uni.navigateTo({
					url:'/pages/dealerList/dealerList'
				})
			},
			scan(){
				uni.navigateTo({
					url: '/pages/sacn/sacn'
				})
			}
		}
	}
</script>

<style>
	.title{
		text-align: center;
		font-size: 52rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #000000;
		margin: 60rpx auto;
	}
	.page_body{
		width: 80%;
		margin: 40rpx auto;
	}
	.uni-column{
		display: flex;
		margin: 40rpx auto;
		position: relative;
	}
	.uni-column image{
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: 10rpx;
		top: 20rpx;
	}
	.uni-column>view:first-child{
		width: 30%;
		text-align: center;
		padding: 6rpx;
		line-height: 58rpx;
	}
	.uni-input{
		border: 1px solid #CCCCCC;
		width: 70%;
		height: 58rpx;
		padding: 6rpx;
		padding-left: 30rpx;
		border-radius: 10rpx;
	}
	.selector{
		line-height: 58rpx;
		color: grey;
	}
.uni-column-required{
	color: #EB2020;
}

.page_footer{
		width: 100%;
		position: fixed;
		bottom: 10%;
		left: 0;
	}
.page_footer button{
	width:90%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 200rpx;
	border-radius: 8rpx;
	background-color: #3854EA;
	font-size: 36rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
}
</style>
