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

//溯源信息
export function addProdSyInfo(data){ 
	return request({
	    url: requestUrl+'api/prodSyInfo',
		method: 'post',
		data: data
	 })
}

//出库、入库
export function prodSyInfoSycode(data){ 
	return request({
	    url: requestUrl+'api/prodSyInfoSycode',
		method: 'post',
		data: data
	 })
}