<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			let hideTime = uni.getStorageSync('hideTime')
			let showTime = new Date().getTime()
			let leaveTime=(showTime-hideTime)/1000
			if(leaveTime>(1*60*1000)){
				console.log(leaveTime)
				uni.reLaunch({
					url:'/pages/login/index/index'
				})
			}
		},
		onHide: function() {
			console.log('App Hide')
			let date = new Date().getTime()
			console.log(date)
			uni.setStorageSync('hideTime',date)
		}
	}
</script>

<style>
	/*每个页面公共css */
	body{
		font-family: "PingFang SC";
	}
</style>
