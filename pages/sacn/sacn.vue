<template>
	<view class="page_body">
		<view>
			<input type='text' v-model="formData.syCode" :auto-focus="true" @blur="getCode" :focus="autoFocus" />
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
				proCode:'',
				formData:{
					scanStatus:'',
					scanType:'',
					syCode:'',
					syInfoId:'',
					depId:'',
				},
				uploadList:[],
				innerAudioContext:''
			}
		},
		onLoad(e) {
			this.autoFocus = true
			this.formData.syInfoId = e.id
			this.formData.scanType = e.scanType
			this.formData.scanStatus = e.scanStatus
			this.formData.depId = e.depId
			this.proCode = e.proCode
			// 102020021637067
			// 10202002163706605
		},
		mounted(){
			// this.innerAudioContext = uni.createInnerAudioContext();
			// console.log(this.innerAudioContext)
			// this.innerAudioContext.autoplay = false;
			// this.innerAudioContext.src = '@/static/audio/success.mp3';
			// this.innerAudioContext.onPlay(() => {
			//   console.log('开始播放');
			// });
			// this.innerAudioContext.onError((res) => {
			//   console.log(res);
			// });
		},
		methods: {
			getCode(){
				console.log(this.formData.syCode.substr(0,5))
				console.log((sessionStorage.getItem('deptCode')+this.proCode))
				if(this.formData.syCode){
					if(this.formData.syCode.substr(0,5)!=(sessionStorage.getItem('deptCode')+this.proCode)){
						wx.showToast({
							title:'当前条码有误！',
							duration:1500,
							icon:'none'
						})
					}else{
						if(this.formData.syCode.length==15){
							this.formData.syCode=this.formData.syCode.substr(-15)
						}else if(this.formData.syCode.length==17){
							this.formData.syCode=this.formData.syCode.substr(-17)
						}
						console.log(this.formData)
						prodSyInfoSycode(this.formData).then(res=>{
							console.log(res)
							this.uploadList.push(this.formData.syCode)
						})
					}
				}else{
					console.log("----")
				}
			},
			getToastData(e) {
				console.log(e)
				this.showDialog = e.show
			},
			stop() {
				this.showDialog = true
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
