import request from '@/utils/request.js' 
 
 let requestUrl = ''
 
export function login(data){ 
	return request({
	    url: requestUrl+'auth/login',
		method: 'post',
		// contentType:'application/x-www-form-urlencoded',
		contentType:'application/json',
		data: data
	 })
}

export function getAuthCode(data){ 
	return request({
	    url: requestUrl+'auth/code',
		data: data
	 })
}

export function prodInfoList(data){ 
	return request({
	    url: requestUrl+'api/prodInfo/list',
		data: data
	 })
}
//部门列表
export function deptList(data){ 
	return request({
	    url: requestUrl+'api/dept',
		data: data
	 })
}