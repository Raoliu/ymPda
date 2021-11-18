<template>
	<view class="page_body">
		<view style="margin: 10px auto;border-bottom:2rpx solid #c7c7c7;width: 70%;">
			<input type='text' v-model="formData.syCode" :auto-focus="true" @input="getNetwordStatus"
				:focus="autoFocus" />
		</view>
		<view class="scaned_goods_number">{{uploadList.length}}</view>
		<view class="scaned_goods_text">
			<p>已扫描</p>
		</view>
		<view class="scaned_goods_text1" @click="setFocus">追溯码</view>
		<view class="scaned_goods_codeList">
			<view v-for="item in uploadList">{{item}}</view>
		</view>
		<view class="page_footer">
			<button @click="stop">停止扫描</button>
		</view>
		<myToast v-show="showDialog" @hideDialog="getToastData" :title="dialog.title" :status="dialog.status"
			:buttonText="dialog.buttonText"></myToast>
	</view>
</template>

<script>
	import {
		getNowTime
	} from '@/utils/util.js'
	import {
		prodSyInfoSycode
	} from '@/utils/api/api.js'
	import myToast from '../../components/Toast.vue'
	export default {
		components: {
			myToast
		},
		data() {
			return {
				list: [],
				code: '',
				showDialog: false,
				dialog: {
					title: '上传成功',
					buttonText: '停止扫描',
					status: 'progress',
				},
				autoFocus: true,
				proCode: '',
				formData: {
					scanStatus: '',
					scanType: '',
					syCode: '',
					syInfoId: '',
					depId: '',
				},
				delearName: '',
				uploadList: [],
				innerAudioContext: '',
				dataSet: [],
				orderNum: "",
				expressNum: "",
				proName: ''
			}
		},
		onLoad(e) {
			this.autoFocus = true
			console.log(e)
			e = JSON.parse(e.data)
			this.formData.syInfoId = e.id
			this.formData.scanType = e.scanType
			this.formData.scanStatus = e.scanStatus
			this.formData.depId = e.depId
			this.delearName = e.delearName
			this.proCode = e.proCode
			this.orderNum = e.orderNum
			this.expressNum = e.expressNum
			this.proName = e.proName
		},
		methods: {
			getNetwordStatus() {
				let that = this
				console.log(that.formData.scanType,"----", that.formData.syCode)
				if (that.formData.syCode) {
					if (that.formData.scanType == '1') { //单品码
						that.formData.syCode = that.formData.syCode.substr(-17)
					} else { //箱码
						that.formData.syCode = that.formData.syCode.substr(-15)
					}
				}
				if ((that.formData.scanType == '1' && (that.formData.syCode.substr(0,3)==uni.getStorageSync('deptCode'))) || (that.formData.scanType ==
						'2' && (that.formData.syCode.substr(0,3)==uni.getStorageSync('deptCode')))) {
					uni.getNetworkType({
						success: function(res) {
							console.log('----------', res.networkType);
							// if (true) {
							if (res.networkType == 'none') {
								uni.showToast({
									title: '当前网络状况不佳',
									icon: 'none'
								})
								let createTime = getNowTime()
								console.log(getNowTime())
								let data = {
									...that.formData,
									...{
										proCode: that.proCode,
										createTime,
										delearName: that.delearName,
										orderNum: that.orderNum,
										expressNum: that.expressNum,
										proName: that.proName,
									}
								}
								that.dataSet.push(data)
								console.log(that.dataSet)
							} else {
								that.getCode()
							}
						},
						fail(err) {
							console.log('----------', err);
						}
					})

				}

			},
			getCode() {
				console.log(this.formData.syCode.substr(0, 5))
				console.log((uni.getStorageSync('deptCode') + this.proCode))

				if (this.formData.syCode.substr(0, 5) != (uni.getStorageSync('deptCode') + this.proCode)) {
					wx.showToast({
						title: '当前条码有误！',
						duration: 1500,
						icon: 'none'
					})
				} else {
					console.log(this.formData)
					prodSyInfoSycode(this.formData).then(res => {
						console.log(res)
						if (res.data.status == 200) {
							uni.showToast({
								title: '成功',
								icon: 'none',
								duration: 1500
							})
							this.music.success_music()
							this.uploadList.push(this.formData.syCode)
							this.formData.syCode = ''
							this.autoFocus = true
						} else {
							this.music.fail_music()
							uni.showToast({
								title: '失败',
								icon: 'none',
								duration: 1500
							})
						}
					}).catch(err => {
						this.music.fail_music()
						uni.showToast({
							title: '失败',
							icon: 'none',
							duration: 1500
						})
					})
				}
				// } else {
				// 	console.log("----")
				// }
			},
			getToastData(e) {
				console.log(e)
				this.showDialog = e.show
			},
			stop() {
				// this.showDialog = true
				console.log(JSON.stringify(this.dataSet))
				if (this.dataSet.length > 0) {
					let arr = JSON.parse(uni.getStorageSync('formData')) || []
					arr = arr.concat(this.dataSet)
					uni.setStorageSync('formData', JSON.stringify(arr))
				}
				uni.navigateBack({
					delta: 1
				})
			},
			setFocus() {
				this.autoFocus = true
			}
		}
	}
</script>

<style scoped>
	.page_body {
		text-align: center;
	}

	.scaned_goods_text {
		font-size: 36rpx;
		font-weight: 500;
		color: #AAAAAA;
		line-height: 80rpx;
	}

	.scaned_goods_text1 {
		line-height: 88rpx;
		font-size: 44rpx;
		font-weight: 500;
		color: #000000;
	}

	.scaned_goods_number {
		padding-top: 128rpx;
		font-size: 72rpx;
		font-weight: 500;
		color: #3854EA;
		line-height: 48rpx;
	}

	.scaned_goods_codeList {
		line-height: 60rpx;
		width: 70%;
		margin: 0 auto;
	}

	.scaned_goods_codeList>view {
		border-bottom: 2rpx solid #E6E6E6;
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
