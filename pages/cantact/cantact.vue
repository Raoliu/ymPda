<template>
	<view>
		<view class="title">
			<p>品箱关联监测</p>
		</view>
		<view class="boxInput">
			<input v-if="scanType=='1'" @input="getInput" v-model="boxCode" placeholder="请扫描箱码" type="text"
				:focus="true" />
			<input v-else-if="scanType=='2'" @input="getsyCode" v-model="syCode" placeholder="请扫描单品码" type="text"
				:focus="true" />
		</view>
		<view class="page_body">
			<view class="goods_box_code">箱品码: <span>{{data.boxCode}}</span></view>
			<view class="goods_goodList_code" v-for="item in data.syCodeList">单品码: <span
					:style="item.ishaved?'color:green':''">{{item.syCode}}</span></view>
		</view>
		<view class="page_footer">
			<button v-if="status==1" @click="next">下一箱</button>
			<button v-else-if="status==2" @click="scan">扫描中</button>
			<view v-else-if="status==3" class="status3">
				<button>停止扫描</button>
				<button @click="status=1">下一箱</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryByBoxCode
	} from '@/utils/api/api.js'
	export default {
		data() {
			return {
				status: 1,
				goodsBoxCode: '3423545646',
				goodsCode: '10089784594378',
				scanType: '1',
				boxCode: '',
				syCode: '',
				data: {
					boxCode: '',
					syCodeList: []
				}
			}
		},
		methods: {
			next(){
				this.data = {boxCode:'',syCodeList:[]}
				this.scanType = '1'
			},
			scan() {
				this.status++
			},
			getInput(e) {
				console.log(e.detail.value)
				let value = e.detail.value.substr(-15)
				if (value.substring(0, 3) === uni.getStorageSync('deptCode')) {
					this.boxCode = value
					this.getByBoxCode()
				}
			},
			getsyCode(e) {
				let syCode = e.detail.value.substr(-17)
				if (syCode.substring(0, 3) === uni.getStorageSync('deptCode')) {
					this.data.syCodeList.map(item => {
						if (item.syCode == syCode) {
							item.ishaved = true
							this.music.success_music()
						}
					})
					if(JSON.stringify(this.data.syCodeList).indexOf(syCode) == -1){
						this.music.fail_music()
					}
					setTimeout(() => {
						this.syCode = ''
					}, 0)
				}
			},
			getByBoxCode() {
				let data = {
					boxCode: this.boxCode
				}
				queryByBoxCode(data).then(res => {
					console.log(res)
					if (res.statusCode == 200) {
						this.data.boxCode = this.boxCode
						res.data.map(item => {
							item.ishaved = false
						})
						this.data.syCodeList = res.data
						this.boxCode = ''
						this.scanType = '2'
					}
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

	.goods_box_code {
		line-height: 80rpx;
		font-size: 40rpx;
		font-weight: 500;
		color: #333333;
	}

	.page_body span {
		color: #3854EA;
		padding-left: 10rpx;
	}

	.goods_goodList_code {
		line-height: 60rpx;
		font-size: 36rpx;
		font-weight: 500;
		color: #666666;
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
		margin-top: 200rpx;
		border-radius: 8rpx;
		background-color: #3854EA;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}

	.status3 {
		display: flex;
		justify-content: space-between;
	}

	.status3 button:first-child {
		width: 45%;
		color: #EB2020;
		background-color: #FFFFFF;
	}

	.status3 button:last-child {
		width: 45%;
		color: #FFFFFF;
	}

	.boxInput input {
		width: 80%;
		margin: 0 auto;
		border-bottom: 2rpx solid #c7c7c7;
		text-align: center;
		font-size: 30rpx;
	}
</style>
