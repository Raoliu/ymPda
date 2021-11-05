<template>
	<view class="page_body">
		<view class="scaned_goods_number">53</view>
		<view class="scaned_goods_text"><p>已扫描</p></view>
		<view class="scaned_goods_text1">追溯码</view>
		<view class="scaned_goods_codeList">
			<view>1576548495438456786</view>
			<view>1576548495438456786</view>
			<view>1576548495438456786</view>
			<view>1576548495438456786</view>
			<view>1576548495438456786</view>
		</view>
		<view class="page_footer">
			<button @click="stop">停止扫描</button>
		</view>
		<myToast v-show="showDialog" @hideDialog="getToastData" :title="title" :status="status" :buttonText="buttonText"></myToast>
	</view>
</template>

<script>
	import myToast from '../../components/Toast.vue'
	export default {
		components:{
			myToast
		},
		data() {
			return {
				showDialog:false,
				title:'上传成功',
				// status:'error',
				status:'progress',
				// status:'success',
				// buttonText:'确定',
				buttonText:'停止扫描',
			}
		},
		methods: {
			getToastData(e){
				console.log(e)
				this.showDialog =e.show
			},
			stop(){
				this.showDialog=true
			}
		}
	}
</script>

<style scoped>
	.page_body{
		text-align: center;
	}
	.scaned_goods_text{
		font-size: 36rpx;
		font-weight: 500;
		color: #AAAAAA;
		line-height: 80rpx;
	}
	.scaned_goods_text1{
		line-height: 88rpx;
		font-size: 44rpx;
		font-weight: 500;
		color: #000000;
	}
	.scaned_goods_number{
		padding-top: 128rpx;
		font-size: 72rpx;
		font-weight: 500;
		color: #3854EA;
		line-height: 48rpx;	
	}
	.scaned_goods_codeList{
		line-height: 60rpx;
		width: 70%;
		margin: 0 auto;
	}
	.scaned_goods_codeList>view{
		border-bottom: 2rpx solid #E6E6E6;
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
