function truncate(str, n) {
  return str.length > n ? `${str.slice(0, n - 1)}...` : str
}
function isNumeric(str) {
  if (typeof str !== 'string') return false
  return !Number.isNaN(str) && !Number.isNaN(parseFloat(str))
}
export { truncate, isNumeric }
