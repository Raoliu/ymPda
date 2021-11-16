export function prefixInteger(num, length) {
  return ('0000000000000000' + num).substr(-length)
}