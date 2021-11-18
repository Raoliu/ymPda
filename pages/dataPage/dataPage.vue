<template>
	<view>
		<view class="title">
			<p>未上传数据</p>
		</view>
		<view class="page_body">
			<view class="dataList" v-if="arr.length>0">
				<view class="dataItem" v-for="item,index in arr">
					<view class="dataItem_title">{{item.scanStatus=='1'?'出库':'入库'}}</view>
					<view class="dataItem_body" v-if="item.orderNum">
						<view>订单号：</view>
						<view>{{item.orderNum}}</view>
					</view>
					<view class="dataItem_body" v-if="item.expressNum">
						<view>物流号：</view>
						<view>{{item.expressNum}}</view>
					</view>
					<view class="dataItem_body" v-if="item.proName">
						<view>产品名：</view>
						<view>{{item.proName}}</view>
					</view>
					<view class="dataItem_body" v-if="item.delearName">
						<view>经销商：</view>
						<view>{{item.delearName}}</view>
					</view>
					<view class="dataItem_body" v-if="item.createTime">
						<view>结束时间：</view>
						<view>{{item.createTime}}</view>
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
			<button @click="submitAll">上传全部</button>
		</view>
	</view>
</template>

<script>
	import {
		prodSyInfoSycode
	} from '@/utils/api/api.js'
	export default {
		data() {
			return {
				arr: [],
			}
		},
		mounted() {
			if (uni.getStorageSync('formData')) {
				this.arr = JSON.parse(uni.getStorageSync('formData'))
			}
		},
		methods: {
			submitAll() {
				let that = this
				uni.getNetworkType({
					success: function(res) {
						console.log(res.networkType)
						if (res.networkType != 'none') {
							for (let i in that.arr) {
								prodSyInfoSycode(that.arr[i]).then(res => {
									console.log(res)
								})
							}
							that.arr = []
							that.music.success_music()
							uni.removeStorageSync('formData')
						}
					},
				})
			}
		}
	}
</script>

<style>
	.title {
		text-align: center;
		font-size: 52rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #000000;
		margin: 60rpx auto;
	}

	.page_body {
		max-height: 55vh;
		overflow: hidden;
		overflow-y: scroll;
	}

	.dataItem {
		width: 80%;
		margin: 20rpx auto;
		border: 4rpx solid #DEDEDE;
		border-radius: 20rpx;
		padding: 20rpx;
	}

	.dataItem_title {
		text-align: center;
		font-size: 44rpx;
		font-weight: bold;
		color: #333333;
		line-height: 80rpx;
	}

	.dataItem_body {
		display: flex;
		font-size: 32rpx;
		color: #666666;
		font-weight: 400;
	}

	.dataItem_body view:first-child {
		width: 40%;
		text-align: right;
	}

	.dataItem_body view:last-child {
		width: 60%;
		text-align: left;
	}

	.noData {
		width: 100%;
		text-align: center;
	}

	.noData p {
		font-size: 32rpx;
		font-weight: 400;
		color: #333333;
		line-height: 48rpx;
	}

	.noData image {
		width: 80%;
	}

	.page_footer {
		width: 100%;
		position: fixed;
		bottom: 5%;
		left: 0;
	}

	.page_footer button {
		width: 90%;
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
