<template>
	<view>
		<view class="title"><p>品箱关联监测</p></view>
		<view class="page_body">
			<view class="goods_box_code">箱品码: <span>{{goodsBoxCode}}</span></view>
			<view class="goods_goodList_code">单品码: <span>{{goodsCode}}</span></view>
			<view class="goods_goodList_code">单品码: <span>{{goodsCode}}</span></view>
			<view class="goods_goodList_code">单品码: <span>{{goodsCode}}</span></view>
			<view class="goods_goodList_code">单品码: <span>{{goodsCode}}</span></view>
			<view class="goods_goodList_code">单品码: <span>{{goodsCode}}</span></view>
			<view class="goods_goodList_code">单品码: <span>{{goodsCode}}</span></view>
			<view class="goods_goodList_code">单品码: <span>{{goodsCode}}</span></view>
			<view class="goods_goodList_code">单品码: <span>{{goodsCode}}</span></view>
			<view class="goods_goodList_code">单品码: <span>{{goodsCode}}</span></view>
			<view class="goods_goodList_code">单品码: <span>{{goodsCode}}</span></view>
			<view class="goods_goodList_code">单品码: <span>{{goodsCode}}</span></view>
			<view class="goods_goodList_code">单品码: <span>{{goodsCode}}</span></view>
			<view class="goods_goodList_code">单品码: <span>{{goodsCode}}</span></view>
			<view class="goods_goodList_code">单品码: <span>{{goodsCode}}</span></view>
			<view class="goods_goodList_code">单品码: <span>{{goodsCode}}</span></view>
		</view>
		<view class="page_footer">
			<button v-if="status==1" @click="scan">开始扫描</button>
			<button v-else-if="status==2" @click="scan">扫描中</button>
			<view v-else-if="status==3" class="status3">
				<button>停止扫描</button>
				<button @click="status=1">下一箱</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:1,
				goodsBoxCode:'3423545646',
				goodsCode:'10089784594378',
			}
		},
		methods: {
			scan(){
				this.status++
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
		padding: 20rpx;
		padding-left: 40rpx;
		border: 4rpx solid #DEDEDE;
		border-radius: 20rpx;
		max-height: 40vh;
		overflow: hidden;
		overflow-y: scroll;
		letter-spacing: 4rpx;
	}
	.goods_box_code{
		line-height: 80rpx;
		font-size: 40rpx;
		font-weight: 500;
		color: #333333;
	}
	.page_body span{
		color: #3854EA;
		padding-left: 10rpx;
	}
	.goods_goodList_code{
		line-height: 60rpx;
		font-size: 36rpx;
		font-weight: 500;
		color: #666666;
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
	.status3{
		display: flex;
		justify-content: space-between;
	}
	.status3 button:first-child{
		width: 45%;
		color: #EB2020;
		background-color: #FFFFFF;
	}
	.status3 button:last-child{
		width: 45%;
		color: #FFFFFF;
	}
</style>
