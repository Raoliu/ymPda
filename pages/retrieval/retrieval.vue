<template>
	<view>
		<view class="title">
			<p>出库</p>
		</view>
		<view class="page_body">
			<form class="page_body_form" @submit="formSubmit">
				<view class="uni-form-item uni-column">
					<view>订单号</view>
					<input type="text" class="uni-input" placeholder="请输入订单号" name="orderNum" />
				</view>
				<view class="uni-form-item uni-column">
					<view>物流号</view>
					<input type="text" class="uni-input" placeholder="请输入物流号" name="expressNum" />
				</view>

				<view class="uni-form-item uni-column">
					<view><label class="uni-column-required">*</label>产品名</view>
					<view class="uni-input">
						<view>
							<picker @change="bindPickerChange1" :value="index" :range="array1">
								<view class="selector">{{array1[index1]}}</view>
							</picker>
						</view>
					</view>
					<image src="../../static/image/right.png" mode="aspectFill"></image>
				</view>
				<view class="uni-form-item uni-column">
					<view><label class="uni-column-required">*</label>经销商</view>
					<input type="text" class="uni-input" @click="chooseDealer" :value="dealerName" :disabled="true"
						placeholder="请选择经销商" name="dealerName" />
					<image src="../../static/image/right.png" mode="aspectFill"></image>
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
				<view class="uni-btn-v page_footer">
					<button form-type="submit">开始扫描</button>
				</view>
			</form>
		</view>
		<dealerList v-if="showDealer" @closeDealer="getData"></dealerList>
	</view>
</template>

<script>
	import dealerList from '@/pages/dealerList/dealerList'
	import {prefixInteger} from '@/utils/util.js'
	import {
		prodInfoList,
		addProdSyInfo
	} from '@/utils/api/api.js'
	export default {
		components:{
			dealerList
		},
		data() {
			return {
				array: ['请选择码级别', '单品码', '箱码'],
				array1: ['请选择产品名'],
				index: 0,
				index1: 0,
				dealerName: '',
				dealerId: '',
				data: [],
				showDealer:false,
			}
		},
		mounted() {
			this.getProdInfoList();
		},
		methods: {
			getData(e){
				this.showDealer = e.show
				if(e.dealerName){
					this.dealerName = e.dealerName
					this.dealerId = e.dealerId
				}
			},
			getProdInfoList() {
				prodInfoList().then(res => {
					console.log(res)
					this.data = res.data
					res.data.map(item => {
						this.array1.push(item.name)
					})
				})
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			bindPickerChange1: function(e) {
				this.index1 = e.target.value
			},
			chooseDealer() {
				this.showDealer = true
			},
			formSubmit(e) {
				var formdata = e.detail.value
				let proCode = ''
				let proName = ''
				let prodInfo = {
					id: ''
				}
				this.data.map(item => {
					if (this.array1[this.index1] === item.name) {
						prodInfo.id = item.id
						proName = item.name
						proCode = prefixInteger(item.code,2)
					}
				})
				formdata.prodInfo = prodInfo
				formdata.type = 2
				formdata.delearName = this.delearName
				formdata.dealerId = this.dealerId
				formdata.scanType = this.index  // 1 单品码 2 箱码
				if(formdata.scanType==''||formdata.delearName==''||formdata.prodInfo.id==''){
					uni.showToast({
						title:'请填写完整',
						icon:'none',
						duration:1500
					})
					return;
				}
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(formdata))
				addProdSyInfo(formdata).then(res => {
					console.log(res)
					let that = this
					if(res.data.id){
						let data = {
							id:res.data.id,
							orderNum:formdata.orderNum,
							expressNum:formdata.expressNum,
							delearName:formdata.dealerName,
							proCode,
							proName,
							scanType:formdata.scanType,
							scanStatus:'1',
							depId:that.dealerId,
						}
						uni.navigateTo({
							url: `/pages/sacn/sacn?data=${JSON.stringify(data)}`
						})
					}else{
						uni.showToast({
							title:'订单号重复！',
							icon:'none',
							duration:1500
						})
					}
					
				}).catch(err=>{
					console.log(err)
					uni.showToast({
						title:err.msg,
						icon:'none',
						duration:1500
					})
				})

			},
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
		width: 80%;
		margin: 40rpx auto;
	}

	.uni-column {
		display: flex;
		margin: 40rpx auto;
		position: relative;
	}

	.uni-column image {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: 10rpx;
		top: 20rpx;
	}

	.uni-column>view:first-child {
		width: 30%;
		text-align: center;
		padding: 6rpx;
		line-height: 58rpx;
	}

	.uni-input {
		border: 1px solid #CCCCCC;
		width: 70%;
		height: 58rpx;
		padding: 6rpx;
		padding-left: 30rpx;
		border-radius: 10rpx;
	}

	.selector {
		line-height: 58rpx;
		color: grey;
	}

	.uni-column-required {
		color: #EB2020;
	}

	.page_footer {
		width: 100%;
		position: fixed;
		bottom: 10%;
		left: 0;
	}

	.page_footer button {
		width: 90%;
		margin-left: auto;
		margin-right: auto;
		border-radius: 8rpx;
		background-color: #3854EA;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
</style>
