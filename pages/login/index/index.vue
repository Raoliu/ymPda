<template>
	<view class='page_body'>
		<view class="logo">
			<image src="../../../static/image/logo.png" mode="aspectFit"></image>
			<p>易码追溯</p>
		</view>
		<view class="login_form">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<image src="../../../static/image/companyCode.png" mode="aspectFill"></image>
					<input type="text" class="uni-input" placeholder="企业编码" name="companyCode" />
				</view>
				<view class="uni-form-item uni-column">
					<image src="../../../static/image/user.png" mode="aspectFill"></image>
					<input type="text" class="uni-input" value="admin" placeholder="账号" name="userName" />
				</view>
				<view class="uni-form-item uni-column">
					<image src="../../../static/image/pwd.png" mode="aspectFill"></image>
					<input password="true" class="uni-input" value="123456" placeholder="密码" name="password" />
				</view>
				<view class="urlCode">
					<image class="codeImg" src="../../../static/image/code.png" mode="aspectFill"></image>
					<input type="text" class="uni-input" placeholder="验证码" name="code" />
					<image class="codeUrl" :src="codeUrl" @click="getAuthCode" mode="aspectFill"></image>
				</view>
				<view class="uni-btn-v">
					<button type="default" form-type="submit">登录</button>
				</view>
			</form>
		</view>
		<view class="page_footer">
			<image src="../../../static/image/foot_bgimg.png" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
	import {login,getAuthCode} from '@/utils/api/api.js'
	import {encrypt} from '../../../utils/js/encrypt.js'
	export default {
		data() {
			return {
				codeUrl:'',
				uuid:'',
			}
		},
		onLoad() {
			this.getAuthCode()
		},
		methods: {
			getAuthCode(){
				getAuthCode().then(res=>{
					console.log(res.data)
					this.codeUrl = res.data.img
					this.uuid = res.data.uuid
				})
			},
			formSubmit: function(e) {
			                console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
			                var formdata = e.detail.value
							formdata.uuid = this.uuid
							formdata.password = encrypt(formdata.password)
							console.log(formdata.password)
							login(formdata).then(res=>{
								console.log(res)
								if(res.data.token){
									uni.showToast({
										icon:'success',
										title:'登陆成功',
										duration:1500
									})
									sessionStorage.setItem('token',res.data.token)
									setTimeout(function(){
										uni.navigateTo({
											url:'../../homeIndex/homeIndex'
										})
									},1500)
								}else{
									uni.showToast({
										icon:'error',
										title:'登陆失败',
										duration:1500
									})
								}
							}).catch(err=>{
								console.log(err)
							})
			            },
			            formReset: function(e) {
			                console.log('清空数据')
			            }
		}
	}
</script>

<style>
	.page_body{
		width: 100%;
		height: 100%;
		background: linear-gradient(123deg, #1A33B8 0%, #3854EA 100%);
	}
	.logo{
		padding-top: 78rpx;
		width: 100%;
		text-align: center;
	}
	.logo p{
		font-size: 72rpx;
		letter-spacing: 10rpx;
		font-weight: 500;
		color: #FFFFFF;
	}
	.logo image{
		width: 200rpx;
		height: 200rpx;
	}
	.uni-form-item input{
		border: none;
		border-bottom: 1px solid #CCCCCC;
		padding-left: 50rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		color: #FFFFFF;
		opacity: 0.5;
		font-size: 36rpx;
	}
	.login_form{
		width: 80%;
		margin: 0 auto;
		padding-top: 80rpx;
		position: relative;
		z-index: 1;
	}
	.uni-btn-v{
		margin: 30rpx auto;
	}
	.uni-column{
		margin: 30rpx 0;
		position: relative;
	}
	.uni-column image,.codeImg{
		width: 36rpx;
		height: 36rpx;
		position: absolute;
		top: 28rpx;
		left: 0rpx;
	}
	.uni-btn-v button{
		letter-spacing: 20rpx;
		color: #3854EA;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		font-size: 36rpx;
		margin-top: 180rpx;
	}
	.page_footer{
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 0;
	}
	.urlCode{
		 display:flex;
		 line-height: 100rpx;
		 width: 100%;
		 position: relative;
	 }
	 .urlCode input{
		border-bottom: 1px solid #CCCCCC;
		color: #FFFFFF;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		padding-left: 50rpx;
		width: 60%;
	}
	.codeUrl{
		height: 65rpx;
		padding: 15rpx;
		padding-left: 5%;
		width: 35%;
		display: block;
	}
	.page_footer image{
		width: 100%;
		display:block;
	}
	
	image{will-change: transform}
</style>
