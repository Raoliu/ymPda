import request from '@/utils/request.js' 
 
export function login(data){ // 模拟登录
	return request({
	    url: 'test/login',
		method: 'post',
		contentType:'application/x-www-form-urlencoded',
		data: data
	 })
}