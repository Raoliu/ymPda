export function prefixInteger(num, length) {
  return ('0000000000000000' + num).substr(-length)
}
export function getNowTime(){
	let date = new Date();
	return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}