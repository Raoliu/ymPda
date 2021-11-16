function req(obj) {
  return new Promise((resolve, reject) => {
	// const HOST = 'http://admin.yimafw.com/'
	const HOST = 'http://lxtest.itkjb.com/'
	var method = obj.method || "GET"; 
	var url = HOST + obj.url || ""; 
	var data = obj.data || {}; 
	console.log(sessionStorage.getItem('token'))
	var header = obj.header || {
	    'Content-Type': obj.contentType || 'application/json',
		'Authorization': sessionStorage.getItem('token')
	}; 
	var success = obj.success; // 成功回调函数
	var fail = obj.fail; //表示失败后，要执行的回调函数
	uni.request({
		url: url,
		data: data,
        method: method,
		header: header,
		success: ((res) => {
		  if (res.statusCode === 403 || res.statusCode === 401) {
		   // 错误处理，返回登录页
            uni.reLaunch({url:'/pages/login/index/index'})
		  } else if (res.statusCode > 199 && res.statusCode<300) {
		     resolve(res)
		  }else if(res.statusCode===400){
			  reject(res.data)
		  }
		}),
		fail: ((err) => {
		  reject(err)
		})
	})
  })
}
export default req
