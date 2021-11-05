<template>
	<view>
		<view class="title"><p>未上传数据</p></view>
		<view class="page_body">
			<view class="dataList" v-if="arr.length>0">
				<view class="dataItem" v-for="item,index in arr">
					<view class="dataItem_title">{{item.title}}</view>
					<view class="dataItem_body">
						<view>订单号：</view>
						<view>11332553642</view>
					</view>
					<view class="dataItem_body">
						<view>物流号：</view>
						<view>46723528336663</view>
					</view>
					<view class="dataItem_body">
						<view>订产品名：</view>
						<view>费脑一号</view>
					</view>
					<view class="dataItem_body">
						<view>经销商：</view>
						<view>阿里巴巴</view>
					</view>
					<view class="dataItem_body">
						<view>结束时间：</view>
						<view>2021.12.23</view>
					</view>
				</view>
			</view>
			<view v-else>
				<view class="noData">
					<image src="../../static/image/noData.png" mode="aspectFit"></image>
					<p>暂无数据</p>
				</view>
			</view>
		</view>
		<view class="page_footer" v-if="arr.length>0">
			<button>上传全部</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arr:[{
					title:'出库'
				},{
					title:'入库'
				}],
			}
		},
		methods: {
			
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
		max-height: 55vh;
		overflow: hidden;
		overflow-y: scroll;
	}
	.dataItem{
		width: 80%;
		margin: 20rpx auto;
		border: 4rpx solid #DEDEDE;
		border-radius: 20rpx;
		padding: 20rpx;
	}
	.dataItem_title{
		text-align: center;
		font-size: 44rpx;
		font-weight: bold;
		color: #333333;
		line-height: 80rpx;
	}
	.dataItem_body{
		display: flex;
		font-size: 36rpx;
		color: #666666;
		font-weight: 400;
	}
	.dataItem_body view:first-child{
		width: 40%;
		text-align: right;
	}
	.dataItem_body view:last-child{
		width: 60%;
		text-align: left;
	}
	.noData{
		width: 100%;
		text-align: center;
	}
	.noData p{
		font-size: 32rpx;
		font-weight: 400;
		color: #333333;
		line-height: 48rpx;
	}
	.noData image{
		width: 80%;
	}
	.page_footer{
			width: 100%;
			position: fixed;
			bottom: 5%;
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
